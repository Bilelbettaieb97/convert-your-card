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
  1: (firstName, trackUrl) => ({
    subject: `${firstName}, tu as déjà fait le plus dur. Il reste 3 minutes.`,
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 6px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Bienvenue</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu as déjà fait le plus dur.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu t'es inscrit sur CVD. Tu as confirmé ton email. <strong style="color:#0f0f14;">85 % des gens s'arrêtent là.</strong> Ils voient un formulaire, se disent "plus tard" — et "plus tard" n'arrive jamais.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Toi, tu es allé jusqu'au bout de l'inscription. Il te reste une seule chose à faire : créer ta carte. Ça prend 3 minutes.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#0f0f14;">Ce qui t'attend dans le builder :</p>
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">1</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f0f14;">Choisis ton style</strong> — thème, couleurs, mise en page</td>
</tr></table>
</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">2</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f0f14;">Remplis tes infos</strong> — nom, métier, numéro, réseaux</td>
</tr></table>
</td></tr>
<tr><td style="padding:8px 0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#7c3aed;color:#fff;font-size:10px;font-weight:800;text-align:center;line-height:20px;">3</span></td>
<td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0f0f14;">Active ta carte</strong> — lien live + QR code prêts à partager</td>
</tr></table>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Créer ma carte maintenant →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · 3 minutes · Partageable immédiatement</p></td></tr>
${footer()}
`),
  }),

  2: (_firstName, trackUrl) => ({
    subject: `Depuis que tu t'es inscrit, 47 pros ont mis leur carte en ligne.`,
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Ces 4 derniers jours,<br>47 pros ont mis leur carte en ligne.</p>
</td></tr>
<tr><td style="padding:0 36px 18px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Un plombier à Bordeaux. Une coach à Paris. Un restaurateur à Lyon. Un consultant à Marseille. Ils ont tous fait la même chose : ils ont pris 3 minutes pour créer leur carte.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #7c3aed;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#0f0f14;">Ce qu'ils font maintenant :</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">→ Ils partagent leur lien en réponse à chaque demande de contact</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">→ Leur QR code est sur leur véhicule, leur vitrine, leurs supports</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">→ Leurs anciens clients transmettent leurs coordonnées d'un tap</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">La différence entre eux et toi ? Ils ont cliqué sur le bouton. C'est tout.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td style="padding:14px 10px;background:#f9fafb;border-radius:8px 0 0 8px;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:22px;font-weight:900;color:#0f0f14;">2 400+</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">Pros actifs</p>
</td>
<td style="padding:14px 10px;background:#f9fafb;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:22px;font-weight:900;color:#0f0f14;">3 min</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">Pour créer</p>
</td>
<td style="padding:14px 10px;background:#f9fafb;border-radius:0 8px 8px 0;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:22px;font-weight:900;color:#7c3aed;">0 €</p>
<p style="margin:3px 0 0;font-size:10px;color:#9ca3af;text-transform:uppercase;">À vie</p>
</td>
</tr>
</table>
</td></tr>
${cta("Créer ma carte en 3 minutes →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Sans CB · Modifiable à vie</p></td></tr>
${footer()}
`),
  }),

  3: (firstName, trackUrl) => ({
    subject: `Je ne t'enverrai plus rien après ça, ${firstName}.`,
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">C'est le dernier message. Promis.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ça fait 8 jours. Deux messages. Tu n'as pas créé ta carte. Et c'est OK — peut-être que le timing n'est pas le bon, peut-être que tu as changé d'avis.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Je ne vais pas t'envoyer un quatrième email. Mais avant de partir, deux choses.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:0 0 16px;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f0f14;">1 — Ton compte est toujours là.</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">Si tu veux créer ta carte dans 3 mois, tes informations de connexion fonctionnent toujours. Tu reprends là où tu t'es arrêté.</p>
</td></tr>
<tr><td style="padding:16px 0 0;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f0f14;">2 — Si c'est maintenant, c'est 3 minutes.</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">Le plan gratuit ne nécessite aucune carte bancaire. Tu vas dans le builder, tu remplis tes infos, tu actives. Voilà.</p>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Créer ma carte (dernière chance)", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit pour toujours · Sans engagement</p></td></tr>
<tr><td style="padding:0 36px 32px;border-top:1px solid #f3f4f6;">
<p style="margin:16px 0 10px;font-size:14px;line-height:1.75;color:#6b7280;">Quoi qu'il arrive — bonne continuation.</p>
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
          from: "Bilel · Carte Visite Digitale <contact@cartevisitedigitale.fr>",
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
