import { defineEventHandler, readBody, getHeader, setHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (event.method === "OPTIONS") {
    setHeader(event, "Access-Control-Allow-Origin", "*");
    setHeader(event, "Access-Control-Allow-Methods", "POST, OPTIONS");
    setHeader(event, "Access-Control-Allow-Headers", "Content-Type, Authorization");
    return new Response(null, { status: 204 });
  }

  if (event.path !== "/api/send-vitrine-relance" || event.method !== "POST") return;

  setHeader(event, "Access-Control-Allow-Origin", "*");

  const authHeader = getHeader(event, "authorization") ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }

  const body = await readBody(event);
  const { users, step } = body as {
    users: { user_id: string; email: string; nom?: string; entreprise?: string; fonction?: string; slug?: string }[];
    step: number;
  };

  if (!users?.length || step < 1 || step > 12) {
    return new Response(JSON.stringify({ error: "Invalid body" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const resendKey   = process.env.RESEND_API_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  let sent = 0, skipped = 0, errors = 0;

  for (const u of users) {
    const clickToken = crypto.randomUUID();
    const trackUrl   = `${appUrl}/api/vitrine-upgrade-click?t=${clickToken}`;

    const { error: insertErr } = await admin.from("vitrine_upgrade_series").insert({
      email: u.email,
      step,
      click_token: clickToken,
    });
    if (insertErr) { skipped++; continue; }

    const prenom    = (u.nom ?? "").split(/\s+/)[0].trim() || null;
    const metier    = (u.fonction ?? "").trim() || "professionnel(le)";
    const entreprise = (u.entreprise ?? "").trim() || null;
    const carteUrl  = u.slug ? `${appUrl}/${u.slug}` : `${appUrl}/pricing`;

    const { subject, html } = buildEmail(step, { prenom, metier, entreprise, carteUrl, trackUrl, appUrl });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Carte Visite Digitale <contact@cartevisitedigitale.fr>",
        to: u.email,
        subject,
        html,
      }),
    });

    if (res.ok) {
      sent++;
    } else {
      errors++;
      await admin.from("vitrine_upgrade_series").delete().eq("click_token", clickToken);
    }
  }

  return new Response(JSON.stringify({ sent, skipped, errors }), { headers: { "Content-Type": "application/json" } });
});

/* ─── Types ─────────────────────────────────────────────────────────── */

interface P {
  prenom: string | null;
  metier: string;
  entreprise: string | null;
  carteUrl: string;
  trackUrl: string;
  appUrl: string;
}

function hi(prenom: string | null): string {
  return prenom ? `Bonjour ${prenom},` : "Bonjour,";
}

/* ─── Shared layout ─────────────────────────────────────────────────── */

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
<td style="padding-left:8px;"><span style="font-size:12px;color:#9ca3af;">cartevisitedigitale.fr</span></td>
</tr></table>
</td></tr>`;
}

function footer(): string {
  return `<tr><td style="padding:20px 36px 32px;border-top:1px solid #f3f4f6;">
<p style="margin:0;font-size:13px;color:#9ca3af;">— L'équipe CVD &nbsp;·&nbsp; <a href="https://www.cartevisitedigitale.fr/unsubscribe" style="color:#d1d5db;font-size:12px;text-decoration:none;">Se désabonner</a></p>
</td></tr>`;
}

function cta(label: string, url: string, color = "#7c3aed"): string {
  return `<tr><td align="center" style="padding:0 36px 10px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" bgcolor="${color}" style="border-radius:50px;">
<a href="${url}" style="display:inline-block;background:${color};padding:15px 38px;border-radius:50px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;">${label}</a>
</td></tr></table>
</td></tr>`;
}

function badge(text: string, color = "#7c3aed"): string {
  return `<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:1px;">${text}</p>
</td></tr>`;
}

/* ─── Router ─────────────────────────────────────────────────────────── */

function buildEmail(step: number, p: P): { subject: string; html: string } {
  switch (step) {
    case 1:  return email1(p);
    case 2:  return email2(p);
    case 3:  return email3(p);
    case 4:  return email4(p);
    case 5:  return email5(p);
    case 6:  return email6(p);
    case 7:  return email7(p);
    case 8:  return email8(p);
    case 9:  return email9(p);
    case 10: return email10(p);
    case 11: return email11(p);
    default: return email12(p);
  }
}

/* ─── Email 1 — J+1 : Offre 50% (72h) ──────────────────────────────── */

function email1(p: P): { subject: string; html: string } {
  return {
    subject: p.prenom
      ? `${p.prenom}, voici une offre réservée 24h pour vous`
      : "Votre carte est active — voici une offre réservée 24h",
    html: wrap(`
${logo()}
${badge("Offre exclusive · 72h seulement")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Votre carte est en ligne.<br>Voici ce que vous ratez encore.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Votre carte digitale est en ligne. C'est déjà un bon début. Mais le plan Essentielle, c'est la version de base — celle qu'on donne gratuitement pour vous laisser tester.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.5px;">Plan Vitrine — ce que vous débloquez :</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">✦ Sections Services, Galerie, Témoignages, Calendly</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">✦ Analytics : qui visite votre carte, quand, d'où</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">✦ 15+ thèmes premium pour vous démarquer</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">✦ Suppression du badge "CVD" sur votre carte</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">✦ Personnalisation avancée (couleurs, polices, layout)</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 8px;" align="center">
<p style="margin:0;font-size:13px;color:#6b7280;">Prix normal : <span style="text-decoration:line-through;">4,80€/mois</span></p>
</td></tr>
<tr><td style="padding:0 36px 6px;" align="center">
<p style="margin:0;font-size:36px;font-weight:900;color:#7c3aed;line-height:1;">2,40€ <span style="font-size:16px;font-weight:500;color:#6b7280;">le 1er mois</span></p>
</td></tr>
<tr><td style="padding:0 36px 24px;" align="center">
<p style="margin:0;font-size:12px;color:#9ca3af;">Offre valable 72h · Sans engagement · Résiliable à tout moment</p>
</td></tr>
${cta("Passer Vitrine à -50% →", p.trackUrl)}
<tr><td style="padding:10px 36px 28px;" align="center">
<p style="margin:0;font-size:12px;color:#9ca3af;">Votre carte actuelle : <a href="${p.carteUrl}" style="color:#7c3aed;text-decoration:none;">${p.carteUrl}</a></p>
</td></tr>
${footer()}
`),
  };
}

/* ─── Email 2 — J+3 : Curiosité — stats manquantes ─────────────────── */

function email2(p: P): { subject: string; html: string } {
  return {
    subject: p.prenom
      ? `${p.prenom}, quelqu'un a regardé votre carte. Vous ne saurez jamais qui.`
      : "Quelqu'un a regardé votre carte. Vous ne saurez jamais qui.",
    html: wrap(`
${logo()}
${badge("Ce que vous ne voyez pas")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Votre carte reçoit des visites.<br>Vous ne le verrez jamais.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Chaque fois que vous partagez votre carte — à un client, dans une signature mail, sur un sticker — des gens cliquent. Ils regardent. Parfois ils reviennent.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f0f14;border-radius:10px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.6px;">Sur votre plan actuel (Essentielle)</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✗ Nombre de visites : <strong style="color:#f87171;">invisible</strong></p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✗ Qui a cliqué sur votre numéro : <strong style="color:#f87171;">invisible</strong></p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✗ D'où viennent vos visiteurs : <strong style="color:#f87171;">invisible</strong></p>
<p style="margin:0;font-size:14px;color:#e2e8f0;">✗ Quel appareil ils utilisent : <strong style="color:#f87171;">invisible</strong></p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Sur le plan Vitrine, vous avez accès à un tableau de bord complet : visites par jour, taux de clic sur votre numéro, source de trafic. Vous savez enfin si votre carte travaille pour vous.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0;font-size:14px;color:#166534;line-height:1.6;">Imaginez savoir que votre carte a été vue 23 fois cette semaine, que 8 personnes ont cliqué votre numéro, et que 5 venaient de votre signature Gmail. <strong>Vous sauriez exactement ce qui fonctionne.</strong></p>
</td></tr>
</table>
</td></tr>
${cta("Débloquer les analytics →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Sans engagement</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 3 — J+7 : Structure manquante ───────────────────────────── */

function email3(p: P): { subject: string; html: string } {
  return {
    subject: `Votre carte n'a pas de section Services, ni de galerie, ni de prise de RDV`,
    html: wrap(`
${logo()}
${badge("Fonctionnalités manquantes")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Votre carte fait le minimum.<br>Voici ce qu'elle pourrait faire.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} En tant que ${p.metier}, votre carte devrait montrer ce que vous faites, vos références, vos services, et permettre à un prospect de prendre rendez-vous directement. Pour l'instant, elle ne fait rien de tout ça.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td width="48%" style="padding:16px;background:#f9fafb;border-radius:8px;vertical-align:top;border:1px solid #e5e7eb;">
<p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;">Plan Essentielle</p>
<p style="margin:0 0 6px;font-size:13px;color:#6b7280;">✓ Nom &amp; coordonnées</p>
<p style="margin:0 0 6px;font-size:13px;color:#6b7280;">✓ Lien vers vos réseaux</p>
<p style="margin:0 0 6px;font-size:13px;color:#6b7280;">✓ QR code</p>
<p style="margin:0 0 6px;font-size:13px;color:#d1d5db;">✗ Section Services</p>
<p style="margin:0 0 6px;font-size:13px;color:#d1d5db;">✗ Galerie photos</p>
<p style="margin:0 0 6px;font-size:13px;color:#d1d5db;">✗ Témoignages clients</p>
<p style="margin:0 0 6px;font-size:13px;color:#d1d5db;">✗ Bouton Calendly/RDV</p>
<p style="margin:0;font-size:13px;color:#d1d5db;">✗ Portfolio / Projets</p>
</td>
<td width="4%"></td>
<td width="48%" style="padding:16px;background:#faf5ff;border-radius:8px;vertical-align:top;border:1px solid #e9d5ff;">
<p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#7c3aed;text-transform:uppercase;">Plan Vitrine</p>
<p style="margin:0 0 6px;font-size:13px;color:#374151;">✓ Nom &amp; coordonnées</p>
<p style="margin:0 0 6px;font-size:13px;color:#374151;">✓ Lien vers vos réseaux</p>
<p style="margin:0 0 6px;font-size:13px;color:#374151;">✓ QR code</p>
<p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600;">✦ Section Services</p>
<p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600;">✦ Galerie photos</p>
<p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600;">✦ Témoignages clients</p>
<p style="margin:0 0 6px;font-size:13px;color:#7c3aed;font-weight:600;">✦ Bouton Calendly/RDV</p>
<p style="margin:0;font-size:13px;color:#7c3aed;font-weight:600;">✦ Portfolio / Projets</p>
</td>
</tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Un prospect qui tombe sur votre carte Vitrine voit vos services, vos photos de travail, ce que disent vos clients — et peut prendre rendez-vous en un tap. C'est une carte qui convertit.</p>
</td></tr>
${cta("Ajouter ces sections →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Résiliable à tout moment</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 4 — J+10 : ROI brutal ───────────────────────────────────── */

function email4(p: P): { subject: string; html: string } {
  return {
    subject: "4,80€/mois. Voici ce que ça représente vraiment.",
    html: wrap(`
${logo()}
${badge("Le calcul honnête")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">4,80€ par mois.<br>0,16€ par jour.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Je vais faire le calcul avec vous.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f0f14;border-radius:10px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 6px;font-size:14px;color:#a78bfa;font-weight:700;">Plan Vitrine = 4,80€/mois</p>
<p style="margin:0 0 6px;font-size:14px;color:#e2e8f0;">÷ 30 jours = <strong style="color:#ffffff;">0,16€ par jour</strong></p>
<p style="margin:0 0 14px;font-size:14px;color:#9ca3af;">= moins qu'un café. Moins qu'un SMS. Moins qu'un timbre.</p>
<p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-style:italic;">Et si vous décrochez un seul client supplémentaire grâce à votre carte améliorée…</p>
<p style="margin:0;font-size:18px;font-weight:800;color:#a78bfa;">L'abonnement est rentabilisé pour l'année entière.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">En tant que ${p.metier}, combien vaut une prestation pour vous ? 50€ ? 200€ ? Plus ?</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td style="padding:14px;background:#f0fdf4;border-radius:8px;text-align:center;border:1px solid #bbf7d0;">
<p style="margin:0 0 4px;font-size:22px;font-weight:900;color:#15803d;">+1 client</p>
<p style="margin:0;font-size:12px;color:#166534;">= ROI positif dès le 1er mois</p>
</td>
<td width="16px"></td>
<td style="padding:14px;background:#faf5ff;border-radius:8px;text-align:center;border:1px solid #e9d5ff;">
<p style="margin:0 0 4px;font-size:22px;font-weight:900;color:#7c3aed;">0,16€/j</p>
<p style="margin:0;font-size:12px;color:#6b7280;">Le coût réel</p>
</td>
</tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">La vraie question n'est pas "est-ce que ça vaut 4,80€ ?" La vraie question : <strong style="color:#0f0f14;">est-ce que votre carte actuelle vous fait rater des opportunités ?</strong></p>
</td></tr>
${cta("Passer au plan Vitrine →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Sans engagement · Résiliable à tout moment · CB sécurisée</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 5 — J+15 : Design / thèmes ─────────────────────────────── */

function email5(p: P): { subject: string; html: string } {
  return {
    subject: "Votre carte ressemble à celle de tout le monde. Voici comment changer ça.",
    html: wrap(`
${logo()}
${badge("Design & différenciation")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">En 3 secondes, on juge.<br>Votre carte fait quelle impression ?</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Quand quelqu'un ouvre votre carte, il ne lit pas d'abord. Il regarde. Le thème, les couleurs, la mise en page — tout ça communique quelque chose avant même le premier mot.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0f0f14;">Plan Essentielle : 3 thèmes de base</p>
<p style="margin:0 0 10px;font-size:14px;color:#6b7280;line-height:1.6;">Des options standard, identiques pour tous les utilisateurs. Propre. Fonctionnel. Mais pas mémorable.</p>
<div style="height:1px;background:#e5e7eb;margin:12px 0;"></div>
<p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#7c3aed;">Plan Vitrine : 15+ thèmes premium</p>
<p style="margin:0 0 6px;font-size:14px;color:#374151;line-height:1.6;">✦ Thèmes dark &amp; premium (idéal pour les métiers du luxe)</p>
<p style="margin:0 0 6px;font-size:14px;color:#374151;line-height:1.6;">✦ Thèmes minimalistes &amp; corporate</p>
<p style="margin:0 0 6px;font-size:14px;color:#374151;line-height:1.6;">✦ Thèmes colorés &amp; créatifs</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">✦ Personnalisation couleurs &amp; polices</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">En tant que ${p.metier}, votre image professionnelle vaut bien plus que 4,80€/mois. Une carte qui vous ressemble vraiment, c'est une carte dont on se souvient.</p>
</td></tr>
${cta("Choisir mon thème Vitrine →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">15+ thèmes premium · Sans engagement</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 6 — J+18 : Histoire vraie ───────────────────────────────── */

function email6(p: P): { subject: string; html: string } {
  return {
    subject: `"Mon client m'a dit : votre carte m'a convaincu avant même qu'on se parle."`,
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 6px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Témoignage client · ${p.metier}</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:26px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">"Mon client m'a dit : votre carte m'a convaincu avant même qu'on se parle."</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong style="color:#0f0f14;">Sophie, consultante RH à Paris.</strong> Plan Essentielle pendant 3 semaines. Puis plan Vitrine.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Elle a ajouté sa section Services avec ses 4 offres. Une galerie avec ses certifications. Deux témoignages clients. Et un bouton Calendly pour réserver un call découverte.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #7c3aed;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;font-style:italic;">"La semaine d'après, un prospect que je ne connaissais pas m'a contactée. Il avait reçu mon lien par une connaissance commune. Il m'a dit qu'il avait regardé ma carte trois fois avant de prendre contact — parce que ça lui semblait très sérieux."</p>
<p style="margin:0;font-size:13px;color:#9ca3af;">— Sophie M., consultante RH, Paris 8e</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Vous avez déjà la carte. Il vous manque juste les sections qui transforment un visiteur en prospect.</p>
</td></tr>
${cta("Construire ma carte Vitrine →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Annulable à tout moment</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 7 — J+22 : Données manquantes ───────────────────────────── */

function email7(p: P): { subject: string; html: string } {
  return {
    subject: "Votre carte travaille en ce moment. Mais vous volez à l'aveugle.",
    html: wrap(`
${logo()}
${badge("Analytics & pilotage")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Votre carte travaille.<br>Vous ne savez pas comment.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Vous partagez votre carte. Des gens la reçoivent. Certains cliquent votre numéro. D'autres regardent mais ne font rien. Certains reviennent plusieurs fois.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Sans analytics, vous ne savez pas :</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 8px;font-size:14px;color:#991b1b;">✗ Si votre carte est vue 2 fois ou 200 fois par mois</p>
<p style="margin:0 0 8px;font-size:14px;color:#991b1b;">✗ Si les gens cliquent votre numéro ou votre lien WhatsApp</p>
<p style="margin:0 0 8px;font-size:14px;color:#991b1b;">✗ Quelle source vous envoie le plus de trafic (Google ? Instagram ? bouche-à-oreille ?)</p>
<p style="margin:0;font-size:14px;color:#991b1b;">✗ Si votre carte convertit mieux depuis que vous avez changé votre photo</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Avec le plan Vitrine, vous avez accès à un tableau de bord complet mis à jour en temps réel. Chaque partage, chaque visite, chaque clic — tout est tracé. Vous savez exactement ce qui fonctionne.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
<tr><td style="padding:16px 20px;" align="center">
<p style="margin:0 0 4px;font-size:22px;font-weight:900;color:#15803d;">Données en temps réel</p>
<p style="margin:0;font-size:14px;color:#166534;">Visites · Clics · Sources · Appareils · Heures de pointe</p>
</td></tr>
</table>
</td></tr>
${cta("Voir mes analytics →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Données en temps réel</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 8 — J+25 : Objections ───────────────────────────────────── */

function email8(p: P): { subject: string; html: string } {
  return {
    subject: "Les 3 vraies raisons de ne pas passer Vitrine (et mes réponses directes)",
    html: wrap(`
${logo()}
${badge("Questions directes")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je sais ce qui vous retient.<br>Voici ma réponse.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Ça fait 25 jours que vous êtes sur le plan Essentielle. J'ai vu assez de profils pour comprendre ce qui bloque. Alors autant être direct.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#374151;padding-bottom:12px;border-bottom:1px solid #e5e7eb;">"C'est cher pour ce que c'est."</p>
<p style="margin:0 0 18px;font-size:14px;color:#374151;line-height:1.6;">→ 0,16€/jour. Moins qu'un café. Et une carte Vitrine qui décroche un seul client de plus rembourse l'abonnement pour toute l'année.</p>

<p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#374151;padding-bottom:12px;border-bottom:1px solid #e5e7eb;">"Ma carte actuelle me convient."</p>
<p style="margin:0 0 18px;font-size:14px;color:#374151;line-height:1.6;">→ Si vous ne savez pas combien de personnes visitent votre carte, ni ce qu'ils font dessus, elle ne vous "convient" pas — vous n'avez tout simplement pas les données pour le savoir.</p>

<p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#374151;padding-bottom:12px;border-bottom:1px solid #e5e7eb;">"Je n'en ai pas vraiment besoin maintenant."</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">→ Chaque semaine sans analytics, sans section Services, sans thème différenciant, c'est une semaine où votre carte est moins efficace qu'elle pourrait l'être. Il n'y a pas de "bon moment" pour améliorer son image professionnelle.</p>
</td></tr>
</table>
</td></tr>
${cta("Passer Vitrine maintenant →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Résiliable en 1 clic · Aucun engagement minimum</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 9 — J+28 : Carte qui convainc ───────────────────────────── */

function email9(p: P): { subject: string; html: string } {
  const entStr = p.entreprise ? ` — et ${p.entreprise}` : "";
  return {
    subject: p.prenom
      ? `${p.prenom}, votre carte parle de vous avant que vous parliez.`
      : "Votre carte parle de vous avant que vous parliez.",
    html: wrap(`
${logo()}
${badge("Image professionnelle")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Votre carte, c'est votre première impression.<br>Qu'est-ce qu'elle dit de vous${entStr} ?</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Avant que vous parliez, avant que vous envoyiez un devis, avant même une poignée de main — quelqu'un a ouvert votre carte. Et il a déjà formé une opinion.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td width="48%" style="padding:16px;background:#fef2f2;border-radius:8px;text-align:center;border:1px solid #fecaca;vertical-align:top;">
<p style="margin:0 0 8px;font-size:24px;">😐</p>
<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#991b1b;">Plan Essentielle</p>
<p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">"C'est basique. Propre, mais rien de mémorable. Comme tout le monde."</p>
</td>
<td width="4%"></td>
<td width="48%" style="padding:16px;background:#faf5ff;border-radius:8px;text-align:center;border:1px solid #e9d5ff;vertical-align:top;">
<p style="margin:0 0 8px;font-size:24px;">🤩</p>
<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#7c3aed;">Plan Vitrine</p>
<p style="margin:0;font-size:12px;color:#374151;line-height:1.5;">"Wow, c'est soigné. Ce professionnel-là prend son image au sérieux."</p>
</td>
</tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">En tant que ${p.metier}, votre crédibilité passe par les détails. Une carte avec votre galerie, vos témoignages, votre charte graphique — c'est une carte qui rassure avant même que vous parliez.</p>
</td></tr>
${cta("Améliorer mon image →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Sans engagement</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 10 — J+35 : 5 sections FOMO ─────────────────────────────── */

function email10(p: P): { subject: string; html: string } {
  return {
    subject: "5 sections que votre carte n'a pas — et pourquoi ça coûte des clients",
    html: wrap(`
${logo()}
${badge("Ce que vous ne montrez pas")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">5 sections absentes de votre carte.<br>5 raisons de ne pas rappeler.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Quand un prospect hésite entre deux professionnels, il compare. Et souvent, c'est la carte la plus complète qui l'emporte — pas la plus chère, pas la plus connue. Celle qui répond aux questions avant qu'il les pose.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#7c3aed;">1. Section Services</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">→ Sans elle, le prospect ne sait pas exactement ce que vous faites. Il suppose. Et souvent, il part chercher ailleurs.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#7c3aed;">2. Galerie photos</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">→ Les gens achètent ce qu'ils voient. Votre travail mérite d'être montré — pas juste décrit.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#7c3aed;">3. Témoignages clients</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">→ Un avis d'un client vaut 10 fois votre discours commercial. C'est la section qui rassure le plus.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#7c3aed;">4. Bouton Calendly / Prise de RDV</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">→ Moins il y a de friction pour vous contacter, plus les gens passent à l'action. Un bouton "Réserver un appel" change tout.</p>
</td></tr>
<tr><td style="padding:10px 0;">
<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#7c3aed;">5. Portfolio / Projets</p>
<p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">→ Pour les métiers créatifs, artisans, consultants : montrer des réalisations concrètes crée une confiance immédiate.</p>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Ajouter ces 5 sections →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Toutes les sections incluses</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 11 — J+42 : Concurrence ─────────────────────────────────── */

function email11(p: P): { subject: string; html: string } {
  return {
    subject: "Un autre professionnel dans votre secteur a déjà une carte qui vend.",
    html: wrap(`
${logo()}
${badge("Benchmark concurrentiel")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Pendant que vous attendez,<br>votre concurrent avance.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} Je ne vais pas vous montrer des noms. Mais je vous garantis qu'en ce moment, d'autres ${p.metier}s ont déjà une carte digitale complète, avec leurs services détaillés, leurs photos, leurs avis clients — et qu'ils la partagent à chaque contact.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f0f14;border-radius:10px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.5px;">Le scénario réaliste</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;line-height:1.7;">Un prospect cherche un ${p.metier}. Il reçoit deux liens : le vôtre et celui d'un concurrent. Le vôtre = nom, numéro, réseaux. Le concurrent = services détaillés, galerie, témoignages, bouton RDV direct.</p>
<p style="margin:0;font-size:14px;font-weight:700;color:#a78bfa;">Qui rappelle-t-il en premier ?</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ce n'est pas une question de talent. C'est une question de première impression. Et votre carte est votre première impression digitale.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">4,80€/mois pour ne plus être le professionnel avec la carte basique — <strong style="color:#0f0f14;">c'est l'investissement le plus simple que vous pouvez faire aujourd'hui.</strong></p>
</td></tr>
${cta("Ne pas laisser le champ libre →", p.trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Plan Vitrine · 4,80€/mois · Activé en 2 minutes</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 12 — J+50 : Dernière offre ──────────────────────────────── */

function email12(p: P): { subject: string; html: string } {
  return {
    subject: "Dernier message : 14 jours Vitrine offerts, sans CB.",
    html: wrap(`
${logo()}
${badge("Offre finale · Dernière chance")}
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">14 jours pour tester Vitrine.<br>Sans CB. Sans risque.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">${hi(p.prenom)} C'est le dernier email que je vous envoie sur ce sujet. Et je voulais le terminer avec quelque chose de différent.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Pas un argument. Pas une liste de fonctionnalités. Juste une offre simple :</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf5ff;border:2px solid #7c3aed;border-radius:12px;">
<tr><td style="padding:24px 28px;" align="center">
<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.5px;">Offre d'essai exclusive</p>
<p style="margin:0 0 10px;font-size:36px;font-weight:900;color:#0f0f14;line-height:1;">14 jours gratuits</p>
<p style="margin:0 0 16px;font-size:15px;color:#374151;">Accès complet au plan Vitrine, toutes les fonctionnalités, sans renseigner de CB.</p>
<p style="margin:0;font-size:13px;color:#9ca3af;">Après les 14 jours : 4,80€/mois, ou retour automatique sur Essentielle.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">En 14 jours, vous pourrez construire votre carte complète, voir vos analytics, choisir votre thème premium — et décider vous-même si ça vaut 4,80€/mois. Je suis convaincu que oui. Mais c'est vous qui décidez.</p>
</td></tr>
${cta("Commencer mon essai gratuit →", p.trackUrl, "#7c3aed")}
<tr><td style="padding:10px 36px 28px;">
<p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#6b7280;">Quoi qu'il arrive — merci d'avoir créé votre carte sur CVD. Bonne continuation dans votre activité.</p>
<p style="margin:0;font-size:13px;color:#9ca3af;">— L'équipe cartevisitedigitale.fr</p>
</td></tr>
${footer()}
`),
  };
}
