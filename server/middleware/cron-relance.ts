import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

const DAY = 86400000;

function firstName(email: string): string {
  const prefix = email.split("@")[0].split(".")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function buildEmail(step: number, name: string, trackUrl: string): string {
  if (step === 1) return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#c026d3,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">😅</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Il te manque juste un clic, ${name}</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Ta carte de visite digitale t'attend depuis quelques jours</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Tu t'es inscrit sur <strong>Carte Visite Digitale</strong> mais tu n'as pas encore activé ton accès. Ton profil est en attente — il ne reste qu'un clic.</p>
    <div style="background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;border-radius:12px;padding:20px;margin-bottom:28px;text-align:center">
      <p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600">Ce que tu vas avoir — gratuitement</p>
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-top:8px">
        <tr><td style="padding:3px 0;color:#374151;font-size:14px;text-align:left">✅ Ta carte de visite numérique en ligne</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px;text-align:left">✅ Lien partageable + QR code</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px;text-align:left">✅ Statistiques de visites</td></tr>
      </table>
    </div>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#c026d3" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Activer mon accès gratuit →</a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;text-align:center">Ce lien est valable 24h. <a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Se désabonner</a></p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;

  if (step === 2) return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#0ea5e9,#7c3aed);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">💼</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">Ta carte attend encore, ${name}</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Chaque contact manqué = une opportunité perdue</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Les pros qui partagent leur carte numérique obtiennent <strong>3× plus de contacts</strong> que ceux qui donnent une carte papier. Et c'est gratuit pour toi.</p>
    <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:28px">
      <p style="margin:0 0 10px;color:#374151;font-size:14px;font-weight:600">🎯 En 2 minutes tu peux :</p>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Ajouter ta photo, ton logo, tes réseaux</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Partager ton lien dans ta bio Instagram</td></tr>
        <tr><td style="padding:3px 0;color:#374151;font-size:14px">→ Créer ton QR code à imprimer</td></tr>
      </table>
    </div>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#0ea5e9" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#7c3aed);padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Accéder à ma carte →</a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center"><a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Me désabonner</a></p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;padding:0 16px 40px">
  <div style="background:linear-gradient(135deg,#374151,#1f2937);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
    <div style="font-size:36px;margin-bottom:12px">✌️</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3">C'est le dernier email, ${name}</h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.7);font-size:15px">Promis, après je te laisse tranquille</p>
  </div>
  <div style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px">
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7">Je t'ai envoyé 2 relances. Je ne t'enverrai plus rien après aujourd'hui.<br><br>Si tu veux toujours ta carte gratuite, c'est maintenant.</p>
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
      <tr><td align="center" bgcolor="#374151" style="border-radius:50px">
        <a href="${trackUrl}" style="display:inline-block;background:#374151;padding:16px 36px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px">Activer mon compte gratuitement →</a>
      </td></tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center"><a href="mailto:bilel@convertilab.com?subject=Désabonnement" style="color:#9ca3af">Me désabonner définitivement</a></p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;
}

export default defineEventHandler(async (event) => {
  if (event.path !== "/api/cron-relance" || event.method !== "GET") return;

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
  const nonCliques = ((data as any[]) || []).filter(r => !r.email_confirme_le);

  const batches: [number, any[]][] = [
    [3, nonCliques.filter(r =>
      r.relance_step === 2 && !r.relance_clicked_at &&
      r.relance_sent_at && now - new Date(r.relance_sent_at).getTime() >= 4 * DAY_MS
    )],
    [2, nonCliques.filter(r =>
      r.relance_step === 1 && !r.relance_clicked_at &&
      r.relance_sent_at && now - new Date(r.relance_sent_at).getTime() >= 3 * DAY_MS
    )],
    [1, nonCliques.filter(r =>
      !r.relance_step &&
      now - new Date(r.inscrit_le).getTime() >= DAY_MS
    )],
  ];

  const results: Record<string, { sent: number; skipped: number }> = {};

  for (const [step, users] of batches) {
    let sent = 0, skipped = 0;
    for (const u of users) {
      const clickToken = crypto.randomUUID();
      const trackUrl = `${appUrl}/api/relance-click?t=${clickToken}`;
      const name = firstName(u.email);

      const { error: insertErr } = await admin.from("email_relance_series").insert({
        user_id: u.user_id || null, email: u.email, step, click_token: clickToken,
      });
      if (insertErr) { skipped++; continue; }

      const subject = step === 1
        ? `${name}, tu as oublié quelque chose 👀`
        : step === 2
        ? `Ta carte est toujours là, ${name} 👋`
        : `Dernier message, ${name} — après je n'insiste plus`;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: "Bilel · Carte Visite Digitale <bilel@convertilab.com>", to: u.email, subject, html: buildEmail(step, name, trackUrl) }),
      });
      if (res.ok) { sent++; }
      else {
        await admin.from("email_relance_series").delete().eq("click_token", clickToken);
      }
    }
    results[`step${step}`] = { sent, skipped };
  }

  return new Response(JSON.stringify({ ok: true, ...results }), { headers: { "Content-Type": "application/json" } });
});
