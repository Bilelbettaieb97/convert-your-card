import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

const DAY = 86400000;

function firstName(email: string, nom?: string): string {
  const n = (nom || "").trim();
  const first = n.split(" ")[0] || "";
  if (first && (first !== first.toLowerCase() || n.includes(" "))) {
    return first.charAt(0).toUpperCase() + first.slice(1);
  }
  const prefix = email.split("@")[0].split(".")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function buildEmail(step: number, trackUrl: string): string {
  if (step === 1) return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#c026d3,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">⚡</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Ta carte est presque prête !</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Il te manque juste une étape pour la mettre en ligne</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Tu as commencé à créer ta carte de visite digitale mais tu n'as pas encore choisi ton plan. <strong>Le plan Essentielle est 100% gratuit</strong>, pour toujours.</p>
    <div style="background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;border-radius:12px;padding:20px;margin-bottom:28px">
      <p style="margin:0 0 10px;font-size:13px;color:#7c3aed;font-weight:600;text-align:center">Ce que tu obtiens gratuitement</p>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
        <tr><td style="padding:4px 0;color:#374151;font-size:14px">✅ Ta carte en ligne avec ton lien perso</td></tr>
        <tr><td style="padding:4px 0;color:#374151;font-size:14px">✅ QR code à partager ou imprimer</td></tr>
        <tr><td style="padding:4px 0;color:#374151;font-size:14px">✅ Statistiques de visites</td></tr>
      </table>
    </div>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#c026d3" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Choisir mon plan →</a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center">Gratuit pour toujours · Aucune carte bancaire requise</p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;

  if (step === 2) return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#0ea5e9,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">👀</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Tes futurs clients cherchent tes infos</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Ta carte est prête — il manque juste ton plan</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Il y a quelques jours, tu as commencé ta carte de visite digitale. D'autres professionnels partagent déjà la leur et obtiennent <strong>3× plus de contacts</strong>. Ta carte est prête — il suffit de choisir un plan.</p>
    <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:28px">
      <p style="margin:0 0 12px;color:#374151;font-size:14px;font-weight:600">🎯 En 2 minutes tu peux :</p>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Mettre ta carte en ligne</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Partager ton lien dans ta bio Instagram</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Générer ton QR code</td></tr>
      </table>
    </div>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#0ea5e9" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#7c3aed);padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Activer ma carte →</a>
      </td></tr>
    </table>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#374151,#1f2937);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">🎯</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Dernier message — ta carte est prête</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.7);font-size:15px">Après ça, je te laisse tranquille</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Je t'ai envoyé 2 messages. Je ne t'enverrai plus rien après aujourd'hui.<br><br>Ta carte est prête. Le plan gratuit ne nécessite <strong>aucune carte bancaire</strong>. C'est maintenant ou jamais.</p>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#374151" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:#374151;padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Activer gratuitement →</a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center">
      <a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Me désabonner</a>
    </p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;
}

export default defineEventHandler(async (event) => {
  if (event.path !== "/api/cron-builder-relance" || event.method !== "GET") return;

  const cronSecret = process.env.CRON_SECRET ?? "";
  if (cronSecret) {
    const auth = getHeader(event, "authorization") ?? "";
    if (auth !== `Bearer ${cronSecret}`) return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const resendKey   = process.env.RESEND_API_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await admin.rpc("get_user_funnel");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });

  const now = Date.now();
  const DAY_MS = DAY;
  const inBuilder = ((data as any[]) || []).filter(r => r.email_confirme_le && !r.plan);

  const batches: [number, any[]][] = [
    [3, inBuilder.filter(r =>
      r.builder_relance_step === 2 && !r.builder_relance_clicked_at &&
      r.builder_relance_sent_at && now - new Date(r.builder_relance_sent_at).getTime() >= 4 * DAY_MS
    )],
    [2, inBuilder.filter(r =>
      r.builder_relance_step === 1 && !r.builder_relance_clicked_at &&
      r.builder_relance_sent_at && now - new Date(r.builder_relance_sent_at).getTime() >= 3 * DAY_MS
    )],
    [1, inBuilder.filter(r =>
      !r.builder_relance_step &&
      now - new Date(r.email_confirme_le).getTime() >= DAY_MS
    )],
  ];

  const results: Record<string, { sent: number; skipped: number }> = {};

  for (const [step, users] of batches) {
    let sent = 0, skipped = 0;
    for (const u of users) {
      const clickToken = crypto.randomUUID();
      const trackUrl = `${appUrl}/api/builder-relance-click?t=${clickToken}`;
      const { error: insertErr } = await admin.from("builder_relance_series").insert({ email: u.email, step, click_token: clickToken });
      if (insertErr) { skipped++; continue; }

      const subject = step === 1
        ? `Tu n'es plus qu'à une étape, choisis ton plan ⚡`
        : step === 2
        ? `Ta carte digitale t'attend encore 👀`
        : `Dernier message — ta carte est prête 🎯`;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: "Carte Visite Digitale <bilel@convertilab.com>", to: u.email, subject, html: buildEmail(step, trackUrl) }),
      });
      if (res.ok) { sent++; } else { await admin.from("builder_relance_series").delete().eq("click_token", clickToken); }
    }
    results[`step${step}`] = { sent, skipped };
  }

  return new Response(JSON.stringify({ ok: true, ...results }), { headers: { "Content-Type": "application/json" } });
});
