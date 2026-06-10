import {
  defineEventHandler,
  readBody,
  getHeader,
  setResponseStatus,
  sendError,
  createError,
} from "h3";
import { createClient } from "@supabase/supabase-js";

const EMAIL_TEMPLATES: Record<
  number,
  (firstName: string, trackUrl: string) => { subject: string; html: string }
> = {
  1: (firstName, trackUrl) => ({
    subject: `${firstName}, tu as oublié quelque chose 👀`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
    <div style="background:linear-gradient(135deg,#c026d3,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
      <div style="font-size:36px;margin-bottom:12px">😅</div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Il te manque juste un clic, ${firstName}</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Ta carte de visite digitale t'attend depuis quelques jours</p>
    </div>
    <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">
        Tu t'es inscrit sur <strong>Carte Visite Digitale</strong> mais tu n'as pas encore activé ton accès.
        Ton profil est en attente — il ne reste qu'un clic.
      </p>
      <div style="background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;border-radius:12px;padding:20px;margin-bottom:28px;text-align:center">
        <p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600">Ce que tu vas avoir — gratuitement</p>
        <div style="display:inline-block;text-align:left;margin-top:8px">
          <div style="color:#374151;font-size:14px;margin-bottom:6px">✅ Ta carte de visite numérique en ligne</div>
          <div style="color:#374151;font-size:14px;margin-bottom:6px">✅ Lien partageable + QR code</div>
          <div style="color:#374151;font-size:14px">✅ Statistiques de visites</div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:28px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:#fff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(192,38,211,0.35)">
          Activer mon accès gratuit →
        </a>
      </div>
      <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;text-align:center">
        Ce lien est valable 24h. Si tu ne veux plus recevoir nos emails,
        <a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">clique ici</a>.
      </p>
    </div>
  </div>
</body>
</html>`,
  }),

  2: (firstName, trackUrl) => ({
    subject: `Ta carte est toujours là, ${firstName} 👋`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
    <div style="background:linear-gradient(135deg,#0ea5e9,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
      <div style="font-size:36px;margin-bottom:12px">💼</div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Ta carte attend encore, ${firstName}</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Chaque contact manqué = une opportunité perdue</p>
    </div>
    <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">
        Les pros qui partagent leur carte numérique obtiennent <strong>3× plus de contacts</strong> que ceux qui donnent une carte papier.
        Et c'est gratuit pour toi.
      </p>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:28px">
        <div style="color:#374151;font-size:14px;margin-bottom:10px;font-weight:600">🎯 En 2 minutes tu peux :</div>
        <div style="color:#374151;font-size:14px;margin-bottom:6px">→ Ajouter ta photo, ton logo, tes réseaux</div>
        <div style="color:#374151;font-size:14px;margin-bottom:6px">→ Partager ton lien dans ta bio Instagram</div>
        <div style="color:#374151;font-size:14px">→ Créer ton QR code à imprimer ou mettre sur ton stand</div>
      </div>
      <div style="text-align:center;margin-bottom:28px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:#fff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(14,165,233,0.35)">
          Accéder à ma carte →
        </a>
      </div>
      <p style="margin:0;color:#9ca3af;font-size:13px;text-align:center">
        <a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Me désabonner</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  }),

  3: (firstName, trackUrl) => ({
    subject: `Dernier message, ${firstName} — après je n'insiste plus`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
    <div style="background:linear-gradient(135deg,#374151,#1f2937);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
      <div style="font-size:36px;margin-bottom:12px">✌️</div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">C'est le dernier email, ${firstName}</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.7);font-size:15px">Promis, après je te laisse tranquille</p>
    </div>
    <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">
        Je t'ai envoyé 2 relances. Je ne t'enverrai plus rien après aujourd'hui.<br><br>
        Si tu veux toujours ta carte gratuite, c'est maintenant. Sinon, pas de problème — on se croise peut-être une prochaine fois.
      </p>
      <div style="text-align:center;margin-bottom:28px">
        <a href="${trackUrl}" style="display:inline-block;background:#374151;color:#fff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px">
          Activer mon compte gratuitement →
        </a>
      </div>
      <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;text-align:center">
        — Bilel, fondateur de Carte Visite Digitale<br>
        <a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Me désabonner définitivement</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  }),
};

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/send-relance")) return;
  if (event.method !== "POST") return;

  // Auth : service role key dans le header
  const authHeader = getHeader(event, "Authorization");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!authHeader || authHeader !== `Bearer ${serviceKey}`) {
    setResponseStatus(event, 401);
    return { error: "Unauthorized" };
  }

  const body = await readBody(event);
  const users: Array<{ user_id: string; email: string }> = body?.users ?? [];
  const step: number = body?.step ?? 1;

  if (!users.length || !EMAIL_TEMPLATES[step]) {
    setResponseStatus(event, 400);
    return { error: "Missing users or invalid step" };
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const resendKey = process.env.RESEND_API_KEY ?? "";
  const appUrl =
    process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const user of users) {
    try {
      // Insérer (ignorer si déjà envoyé pour cet email+step)
      const { data: inserted, error: insertErr } = await admin
        .from("email_relance_series")
        .insert({
          user_id: user.user_id || null,
          email: user.email,
          step,
        })
        .select("id, click_token")
        .single();

      if (insertErr) {
        // Contrainte UNIQUE = déjà envoyé
        skipped++;
        continue;
      }

      const trackUrl = `${appUrl}/api/relance-click?t=${inserted.click_token}`;
      const firstName =
        user.email.split("@")[0].split(".")[0];
      const capitalized =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);

      const { subject, html } = EMAIL_TEMPLATES[step](capitalized, trackUrl);

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bilel · Carte Visite Digitale <bilel@convertilab.com>",
          to: user.email,
          subject,
          html,
        }),
      });

      if (!resp.ok) {
        const err = await resp.text();
        errors.push(`${user.email}: ${err}`);
        // Supprimer l'enregistrement pour pouvoir réessayer
        await admin
          .from("email_relance_series")
          .delete()
          .eq("id", inserted.id);
      } else {
        sent++;
      }
    } catch (err) {
      errors.push(`${user.email}: ${String(err)}`);
    }
  }

  return { sent, skipped, errors };
});
