import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

const TR_DELAYS: Record<number, number> = {
  1: 1,  // J+1 — onboarding / partage
  2: 2,  // J+2 — urgence "expire demain"
  3: 3,  // J+3 — dernier jour "expire ce soir"
};
const NC_DELAYS: Record<number, number> = {
  1: 10 / 1440,  // 10 minutes — confirmation email
  2: 1 / 24,     // 1 heure
  3: 1,          // 1 jour
  4: 2,          // 2 jours — breakup
};
const BR_DELAYS: Record<number, number> = {
  1: 1 / 24,  // 1 heure
  2: 1,       // 1 jour
  3: 3,       // 3 jours
  4: 5,       // 5 jours
  5: 7,       // 7 jours
  6: 9,       // 9 jours
};
const VU_DELAYS: Record<number, number> = {
  1:  1,   // J+1
  2:  3,   // J+3
  3:  7,   // J+7
  4:  10,  // J+10
  5:  15,  // J+15
  6:  18,  // J+18
  7:  22,  // J+22
  8:  25,  // J+25
  9:  28,  // J+28
  10: 35,  // J+35
  11: 42,  // J+42
  12: 50,  // J+50
};

function msSince(ts: string | null | undefined): number {
  if (!ts) return -1;
  return Date.now() - new Date(ts).getTime();
}

async function sendAlertEmail(resendKey: string, subject: string, body: string) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "CVD Monitoring <contact@cartevisitedigitale.fr>",
      to: "convertilab@gmail.com",
      subject,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 20px;">
        <h2 style="color:#dc2626;margin:0 0 16px">⚠️ CVD — Alerte email automatique</h2>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 20px;font-size:14px;line-height:1.7;color:#374151;">${body}</div>
        <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">Envoyé automatiquement par le cron cartevisitedigitale.fr</p>
      </div>`,
    }),
  });
}

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/cron-daily")) return;

  const cronSecret = process.env.CRON_SECRET ?? "";
  const auth = getHeader(event, "authorization") ?? "";
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const resendKey   = process.env.RESEND_API_KEY ?? "";

  if (!serviceKey) {
    return new Response(JSON.stringify({ error: "SUPABASE_SERVICE_ROLE_KEY not set" }), { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ── Watchdog : vérifier la dernière exécution ─────────────────────────────
  if (resendKey) {
    const { data: lastLogs } = await admin
      .from("cron_execution_logs")
      .select("ran_at, errors")
      .order("ran_at", { ascending: false })
      .limit(1);

    if (lastLogs && lastLogs.length > 0) {
      const last = lastLogs[0];
      const hoursSince = (Date.now() - new Date(last.ran_at).getTime()) / 3_600_000;

      if (hoursSince > 25) {
        await sendAlertEmail(
          resendKey,
          "⚠️ CVD Cron — exécution manquée",
          `Le cron n'a pas tourné depuis <strong>${Math.round(hoursSince)}h</strong>.<br>
           Dernière exécution : <strong>${new Date(last.ran_at).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</strong><br>
           Des emails ont peut-être été manqués.`
        ).catch(console.error);
      } else if (last.errors) {
        await sendAlertEmail(
          resendKey,
          "⚠️ CVD Cron — erreur à la dernière exécution",
          `La dernière exécution (${new Date(last.ran_at).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}) a retourné une erreur :<br><br>
           <code style="background:#f3f4f6;padding:4px 8px;border-radius:4px;">${last.errors}</code>`
        ).catch(console.error);
      }
    }
  }

  const startTime = Date.now();
  const results: Record<string, number> = {};
  let cronError: string | null = null;

  try {
    // Valider la clé Resend avant de traiter les users
    if (resendKey) {
      const pingRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: "x@x.com", to: "x@x.com", subject: "ping", html: "ping" }),
      });
      if (pingRes.status === 401) {
        throw new Error("RESEND_API_KEY invalide ou expirée — aucun email envoyé");
      }
    }

    // ── Réconciliation plans : corrige les mismatches Stripe ↔ Supabase ──────
    // Si subscriptions.status = active/trialing mais nfc_profiles.plan != vitrine
    // → le webhook a raté → on corrige et on alerte
    {
      const { data: mismatches } = await admin
        .from("subscriptions")
        .select("user_id, plan, status, stripe_customer_id")
        .in("status", ["active", "trialing"]);

      const toFix = (mismatches ?? []).filter((s) => s.user_id && s.plan === "vitrine");

      if (toFix.length > 0) {
        // Récupérer les profils concernés pour vérifier lesquels sont mal synchronisés
        const { data: profiles } = await admin
          .from("nfc_profiles")
          .select("user_id, email, plan")
          .in("user_id", toFix.map((s) => s.user_id));

        const broken = (profiles ?? []).filter((p) => p.plan !== "vitrine");

        if (broken.length > 0) {
          // Corriger silencieusement
          await admin
            .from("nfc_profiles")
            .update({ plan: "vitrine", actif: true })
            .in("user_id", broken.map((p) => p.user_id));

          results["plan_reconciled"] = broken.length;
          console.warn(`[cron-daily] Plan reconciliation: fixed ${broken.length} mismatch(es)`, broken.map((p) => p.email));

          // Alerte email si correctif appliqué
          if (resendKey) {
            const list = broken.map((p) => `<li>${p.email} (était: ${p.plan})</li>`).join("");
            await sendAlertEmail(
              resendKey,
              `⚠️ CVD — ${broken.length} plan(s) Vitrine corrigé(s) automatiquement`,
              `Le cron a détecté un décalage entre Stripe et Supabase et a corrigé ${broken.length} compte(s) :<br><ul>${list}</ul>
               Cause probable : webhook Stripe raté. Vérifiez les logs Stripe.`
            ).catch(console.error);
          }
        }
      }
    }

    const { data: users, error } = await admin.rpc("get_user_funnel");
    if (error || !users) throw new Error(error?.message ?? "get_user_funnel returned null");

    const authHeader = { "Content-Type": "application/json", Authorization: `Bearer ${serviceKey}` };

    // ── Série email non cliqué (J+1 / J+4 / J+8) ───────────────────────────
    const nonCliques = users.filter((r: any) => !r.email_confirme_le);

    for (const [stepStr, minDays] of Object.entries(NC_DELAYS)) {
      const step = Number(stepStr);
      const toSend = nonCliques.filter((r: any) =>
        msSince(r.inscrit_le) >= minDays * 86_400_000 &&
        (!r.relance_step || r.relance_step < step)
      ).slice(0, 200);
      if (toSend.length === 0) continue;

      console.log(`[cron-daily] NC step ${step}: ${toSend.length} destinataire(s)`);
      const resp = await fetch(`${appUrl}/api/send-relance`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          users: toSend.map((r: any) => ({ user_id: r.user_id, email: r.email })),
          step,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text().catch(() => "unknown");
        console.error(`[cron-daily] NC step ${step} HTTP ${resp.status}: ${errText}`);
        results[`nc_step_${step}_err`] = 1;
        continue;
      }
      const result = await resp.json().catch(() => ({}));
      results[`nc_step_${step}`] = result.sent ?? 0;
    }

    // ── Série builder-relance (J+1h / J+1 / J+3 / J+5 / J+7 / J+9) ─────────
    // Exclut builder_step_name = null : ces anciens users n'ont jamais ouvert
    // Builderia et ne convertiront plus. Le funnel actuel set le step_name dès
    // la confirmation email (magic link → /builderia).
    const builder = users.filter((r: any) => r.email_confirme_le && !r.plan && r.builder_step_name);

    for (const [stepStr, minDays] of Object.entries(BR_DELAYS)) {
      const step = Number(stepStr);
      const toSend = builder.filter((r: any) =>
        msSince(r.email_confirme_le) >= minDays * 86_400_000 &&
        (!r.builder_relance_step || r.builder_relance_step < step)
      ).slice(0, 200);
      if (toSend.length === 0) continue;

      console.log(`[cron-daily] Builder step ${step}: ${toSend.length} destinataire(s)`);
      const resp = await fetch(`${appUrl}/api/send-builder-relance`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          users: toSend.map((r: any) => ({
            user_id: r.user_id,
            email: r.email,
            builder_step_name: r.builder_step_name ?? null,
          })),
          step,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text().catch(() => "unknown");
        console.error(`[cron-daily] Builder step ${step} HTTP ${resp.status}: ${errText}`);
        results[`br_step_${step}_err`] = 1;
        continue;
      }
      const result = await resp.json().catch(() => ({}));
      results[`br_step_${step}`] = result.sent ?? 0;
    }

    // ── Série trial (J+1 onboarding / J+2 urgence) ──────────────────────────
    // Inclut aussi les "active" sans CB : Stripe crée parfois active au lieu de
    // trialing selon la config checkout, ce qui faisait ignorer ces users.
    const trialUsers = users.filter((r: any) =>
      r.subscription_status === "trialing" ||
      (r.subscription_status === "active" && r.had_trial && !r.payment_method_set)
    );

    for (const [stepStr, minDays] of Object.entries(TR_DELAYS)) {
      const step = Number(stepStr);
      const toSend = trialUsers.filter((r: any) =>
        msSince(r.subscription_cree_le) >= minDays * 86_400_000 &&
        (!r.trial_relance_step || r.trial_relance_step < step)
      ).slice(0, 200);
      if (toSend.length === 0) continue;

      console.log(`[cron-daily] Trial step ${step}: ${toSend.length} destinataire(s)`);
      const resp = await fetch(`${appUrl}/api/send-trial-relance`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          users: toSend.map((r: any) => ({
            user_id: r.user_id,
            email: r.email,
            nom: r.nom,
            slug: r.slug,
            trial_end: r.trial_end,
          })),
          step,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text().catch(() => "unknown");
        console.error(`[cron-daily] Trial step ${step} HTTP ${resp.status}: ${errText}`);
        results[`tr_step_${step}_err`] = 1;
        continue;
      }
      const result = await resp.json().catch(() => ({}));
      results[`tr_step_${step}`] = result.sent ?? 0;
    }

    // ── Série upgrade Vitrine (J+1 → J+50, 12 emails) ───────────────────────
    // Inclut les anciens trials expirés (plan=free, had_trial=true) pour leur envoyer la série upgrade
    const vitrineUsers = users.filter((r: any) => r.plan === "essentielle" || (r.plan === "free" && r.had_trial));

    for (const [stepStr, minDays] of Object.entries(VU_DELAYS)) {
      const step = Number(stepStr);
      const toSend = vitrineUsers.filter((r: any) => {
        // Pour les anciens trials : délai depuis trial_end (pas profil_cree_le)
        // Évite le double-fire : à l'expiration du trial J+3, steps 1 et 2 auraient
        // tous les deux leur seuil dépassé depuis profil_cree_le → 2 emails simultanés
        const ref = (r.had_trial && r.trial_end) ? r.trial_end : r.profil_cree_le;
        return msSince(ref) >= minDays * 86_400_000 &&
          (!r.vitrine_relance_step || r.vitrine_relance_step < step);
      }).slice(0, 200);
      if (toSend.length === 0) continue;

      console.log(`[cron-daily] Vitrine upgrade step ${step}: ${toSend.length} destinataire(s)`);
      const resp = await fetch(`${appUrl}/api/send-vitrine-relance`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          users: toSend.map((r: any) => ({
            user_id: r.user_id,
            email: r.email,
            nom: r.nom,
            entreprise: r.entreprise,
            fonction: r.fonction,
            slug: r.slug,
          })),
          step,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text().catch(() => "unknown");
        console.error(`[cron-daily] Vitrine step ${step} HTTP ${resp.status}: ${errText}`);
        results[`vu_step_${step}_err`] = 1;
        continue;
      }
      const result = await resp.json().catch(() => ({}));
      results[`vu_step_${step}`] = result.sent ?? 0;
    }

  } catch (err: any) {
    cronError = err?.message ?? "Unknown error";
    console.error("[cron-daily] Error:", cronError);
  }

  const totalSent = Object.values(results).reduce((a, b) => a + b, 0);
  const durationMs = Date.now() - startTime;

  // ── Logger l'exécution dans Supabase ─────────────────────────────────────
  try {
    await admin.from("cron_execution_logs").insert({
      total_sent: totalSent,
      results: Object.keys(results).length > 0 ? results : null,
      errors: cronError,
      duration_ms: durationMs,
    });
  } catch (logErr) {
    console.error("[cron-daily] Failed to write log:", logErr);
  }

  // ── Alerte si erreur sur cette exécution ─────────────────────────────────
  if (cronError && resendKey) {
    await sendAlertEmail(
      resendKey,
      "⚠️ CVD Cron — erreur détectée",
      `Une erreur s'est produite lors de l'exécution du cron :<br><br>
       <code style="background:#f3f4f6;padding:4px 8px;border-radius:4px;">${cronError}</code><br><br>
       Durée avant erreur : ${durationMs}ms`
    ).catch(console.error);
  }

  console.log("[cron-daily] Done:", results, "| duration:", durationMs, "ms");

  if (cronError) {
    return new Response(JSON.stringify({ ok: false, error: cronError, results }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, total_sent: totalSent, results, duration_ms: durationMs }), {
    headers: { "Content-Type": "application/json" },
  });
});
