import { defineEventHandler, readBody, getHeader, setHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (event.method === "OPTIONS") {
    setHeader(event, "Access-Control-Allow-Origin", "*");
    setHeader(event, "Access-Control-Allow-Methods", "POST, OPTIONS");
    setHeader(event, "Access-Control-Allow-Headers", "Content-Type, Authorization");
    return new Response(null, { status: 204 });
  }

  if (event.path !== "/api/send-builder-relance" || event.method !== "POST") return;

  setHeader(event, "Access-Control-Allow-Origin", "*");

  const authHeader = getHeader(event, "authorization") ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }

  const body = await readBody(event);
  const { users, step } = body as { users: { user_id: string; email: string }[]; step: number };
  if (!users?.length || ![1, 2, 3].includes(step)) {
    return new Response(JSON.stringify({ error: "Invalid body" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const resendKey   = process.env.RESEND_API_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  let sent = 0, skipped = 0, errors = 0;

  for (const u of users) {
    const clickToken = crypto.randomUUID();
    const trackUrl = `${appUrl}/api/builder-relance-click?t=${clickToken}`;

    const { error: insertErr } = await admin.from("builder_relance_series").insert({
      email: u.email, step, click_token: clickToken,
    });
    if (insertErr) { skipped++; continue; }

    const subject = step === 1
      ? `Tu n'es plus qu'à une étape, choisis ton plan ⚡`
      : step === 2
      ? `Ta carte digitale t'attend encore 👀`
      : `Dernier message — ta carte est prête 🎯`;

    const html = buildEmail(step, u.email, trackUrl, appUrl);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Carte Visite Digitale <bilel@convertilab.com>", to: u.email, subject, html }),
    });

    if (res.ok) { sent++; } else { errors++; await admin.from("builder_relance_series").delete().eq("click_token", clickToken); }
  }

  return new Response(JSON.stringify({ sent, skipped, errors }), { headers: { "Content-Type": "application/json" } });
});

function buildEmail(step: number, email: string, trackUrl: string, appUrl: string): string {
  const pricingUrl = `${appUrl}/pricing`;

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
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0">— L'équipe Carte Visite Digitale</p>
</div>
</body></html>`;
}
