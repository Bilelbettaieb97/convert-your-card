import {
  defineEventHandler,
  readBody,
  getHeader,
  setResponseStatus,
  setResponseHeaders,
} from "h3";
import { createClient } from "@supabase/supabase-js";

const EMAIL_TEMPLATES: Record<
  number,
  (firstName: string, trackUrl: string) => { subject: string; html: string }
> = {
  // J+10min — confirmation email (relance)
  1: (firstName, trackUrl) => ({
    subject: firstName
      ? `${firstName}, confirme ton adresse email pour créer ta carte →`
      : "Confirme ton adresse email pour créer ta carte →",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 6px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;">Action requise</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu es à 1 clic<br>de ta carte digitale.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu viens de t'inscrire sur Carte Visite Digitale — mais ton adresse email n'est pas encore confirmée. Sans ça, on ne peut pas créer ta carte.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:10px;">
<tr><td style="padding:18px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:6px 0;font-size:14px;color:#374151;line-height:1.6;">
<span style="color:#f59e0b;margin-right:8px;font-weight:700;">→</span>Clique sur le bouton ci-dessous pour confirmer ton email</td></tr>
<tr><td style="padding:6px 0;font-size:14px;color:#374151;line-height:1.6;">
<span style="color:#f59e0b;margin-right:8px;font-weight:700;">→</span>Tu es immédiatement redirigé vers ton générateur de carte</td></tr>
<tr><td style="padding:6px 0;font-size:14px;color:#374151;line-height:1.6;">
<span style="color:#f59e0b;margin-right:8px;font-weight:700;">→</span>L'IA génère ta carte en 30 secondes</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Confirmer mon email et créer ma carte →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Si tu n'as pas créé de compte, tu peux ignorer cet email.</p></td></tr>
${footer()}
`),
  }),

  // J+1h — découverte du générateur IA
  2: (firstName, trackUrl) => ({
    subject: firstName
      ? `${firstName}, une phrase suffit. L'IA génère ta carte entière.`
      : "Une phrase suffit. L'IA génère ta carte entière.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 6px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Ta carte t'attend</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu décris ce que tu fais.<br>L'IA fait tout le reste.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Pas de formulaire à remplir champ par champ. Pas de template à personnaliser pendant des heures. Tu écris une phrase — l'IA génère ta carte complète en 30 secondes.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#7c3aed;">Comment ça marche :</p>
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:8px 0;border-bottom:1px solid #ede9fe;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">1</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;">Tu tapes une phrase : <em>"Électricien à Lyon, spécialisé rénovation"</em></td>
</tr></table>
</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #ede9fe;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">2</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f0f14;">L'IA génère</strong> : accroche, services, avis clients, design — tout</td>
</tr></table>
</td></tr>
<tr><td style="padding:8px 0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">3</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;">Tu <strong style="color:#0f0f14;">valides et actives</strong> — lien live et QR code prêts</td>
</tr></table>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 26px;" align="center">
<p style="margin:0;font-size:44px;font-weight:900;color:#0f0f14;line-height:1;">30 secondes.</p>
<p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">Pour voir ta carte générée. Gratuit, sans CB.</p>
</td></tr>
${cta("Générer ma carte avec l'IA →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Sans engagement · Partageable immédiatement</p></td></tr>
${footer()}
`),
  }),

  // J+1 — FOMO + exemples concrets
  3: (_firstName, trackUrl) => ({
    subject: "Voici ce qu'un plombier a généré en tapant une seule phrase.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Ce que l'IA génère<br>avec une seule phrase.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Marc, plombier à Nantes, a tapé : <strong style="color:#0f0f14;">"Plombier chauffagiste, urgences 7j/7, Nantes et périphérie"</strong></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0f0f14;">L'IA a généré automatiquement :</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ <strong style="color:#0f0f14;">Accroche</strong> : "Urgence plomberie ? Je suis là en moins d'1h."</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ <strong style="color:#0f0f14;">3 offres</strong> avec prix et délais d'intervention</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ <strong style="color:#0f0f14;">Avis clients</strong> réalistes pour crédibiliser</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">✦ <strong style="color:#0f0f14;">Design adapté</strong> à son activité</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Il partage maintenant son lien sur WhatsApp. Quand un client lui demande ses coordonnées, il envoie juste l'URL. <strong style="color:#0f0f14;">Ça lui a rapporté 2 nouveaux chantiers en une semaine.</strong></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="padding:14px 10px;background:#f9fafb;border-radius:8px 0 0 8px;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:22px;font-weight:900;color:#0f0f14;">30 sec</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">Pour générer</p>
</td>
<td style="padding:14px 10px;background:#f9fafb;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:22px;font-weight:900;color:#0f0f14;">2 400+</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">Pros actifs</p>
</td>
<td style="padding:14px 10px;background:#f9fafb;border-radius:0 8px 8px 0;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:22px;font-weight:900;color:#7c3aed;">0 €</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">Pour commencer</p>
</td>
</tr></table>
</td></tr>
${cta("Voir ce que l'IA génère →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Sans CB · Résultat visible en 30 secondes</p></td></tr>
${footer()}
`),
  }),

  // J+2 — breakup
  4: (firstName, trackUrl) => ({
    subject: firstName
      ? `${firstName}, c'est mon dernier message.`
      : "C'est mon dernier message.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je ne t'enverrai plus de messages après celui-ci.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu t'es inscrit. Tu n'as pas encore généré ta carte. Et c'est OK — peut-être que le timing n'était pas le bon.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #e5e7eb;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#0f0f14;">Avant de partir, deux choses :</p>
<p style="margin:0 0 12px;font-size:14px;color:#374151;line-height:1.6;"><strong style="color:#0f0f14;">1. Ton compte est toujours là.</strong> Si tu veux générer ta carte dans 3 mois, tu te reconnectes et c'est parti.</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;"><strong style="color:#0f0f14;">2. Si c'est maintenant</strong> : une phrase sur ton activité, l'IA génère tout en 30 secondes. Gratuit, sans CB.</p>
</td></tr>
</table>
</td></tr>
${cta("Générer ma carte (dernière chance)", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit pour toujours · Sans engagement</p></td></tr>
<tr><td style="padding:0 36px 32px;border-top:1px solid #f3f4f6;">
<p style="margin:16px 0 10px;font-size:14px;line-height:1.75;color:#6b7280;">Bonne continuation.</p>
<p style="margin:0;font-size:13px;color:#9ca3af;">— L'équipe CVD &nbsp;·&nbsp; <a href="https://www.cartevisitedigitale.fr/unsubscribe" style="color:#d1d5db;font-size:12px;text-decoration:none;">Se désabonner définitivement</a></p>
</td></tr>
`),
  }),
};

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f4f6;">
<tr><td align="center" style="padding:40px 16px;">
<table cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
${body}
</table>
</td></tr>
</table>
</body>
</html>`;
}

function logo(): string {
  return `<tr><td style="padding:32px 36px 0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:#7c3aed;border-radius:6px;padding:4px 10px;"><span style="font-size:11px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">CVD</span></td>
<td style="padding-left:8px;font-size:12px;color:#9ca3af;">cartevisitedigitale.fr</td>
</tr></table>
</td></tr>`;
}

function footer(): string {
  return `<tr><td style="padding:20px 36px 32px;border-top:1px solid #f3f4f6;">
<p style="margin:0;font-size:13px;color:#9ca3af;">— L'équipe CVD &nbsp;·&nbsp; <a href="https://www.cartevisitedigitale.fr/unsubscribe" style="color:#d1d5db;font-size:12px;text-decoration:none;">Se désabonner</a></p>
</td></tr>`;
}

function cta(label: string, url: string, color = "#0f0f14"): string {
  return `<tr><td align="center" style="padding:0 36px 10px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" bgcolor="${color}" style="border-radius:50px;">
<a href="${url}" style="display:inline-block;background:${color};padding:15px 38px;border-radius:50px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;">${label}</a>
</td></tr></table>
</td></tr>`;
}

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/send-relance")) return;

  // CORS — autorise le domaine de prod + les fichiers HTML locaux (file:// → origin: null)
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const requestOrigin = getHeader(event, "origin") ?? "";
  const corsOrigin = requestOrigin === "null" || requestOrigin === appUrl ? requestOrigin : appUrl;
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Preflight OPTIONS
  if (event.method === "OPTIONS") return null;

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

      const trackUrl = `${appUrl}/api/relance-click?t=${inserted.click_token}&utm_source=email&utm_medium=relance&utm_campaign=email-non-clique&utm_content=step${step}`;
      const rawFirst = user.email.split("@")[0].split(".")[0];
      const capitalized = rawFirst.length >= 3
        ? rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1)
        : "";

      const { subject, html } = EMAIL_TEMPLATES[step](capitalized, trackUrl);

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Carte Visite Digitale <contact@cartevisitedigitale.fr>",
          to: user.email,
          subject,
          html,
        }),
      });

      if (!resp.ok) {
        const err = await resp.text();
        errors.push(`${user.email}: ${err}`);
        // Supprimer l'enregistrement pour pouvoir réessayer
        try {
          await admin.from("email_relance_series").delete().eq("id", inserted.id);
        } catch (delErr) {
          console.error(`[send-relance] DELETE failed for ${user.email} step ${step}:`, delErr);
        }
      } else {
        sent++;
      }
    } catch (err) {
      errors.push(`${user.email}: ${String(err)}`);
    }
  }

  return { sent, skipped, errors };
});
