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
  const { users, step } = body as {
    users: { user_id: string; email: string; builder_step_name?: string | null }[];
    step: number;
  };
  if (!users?.length || ![1, 2, 3, 4, 5, 6].includes(step)) {
    return new Response(JSON.stringify({ error: "Invalid body" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const resendKey   = process.env.RESEND_API_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  let sent = 0, skipped = 0, errors = 0;

  for (const u of users) {
    const clickToken = crypto.randomUUID();
    const trackUrl   = `${appUrl}/api/builder-relance-click?t=${clickToken}`;
    const stepName   = u.builder_step_name ?? null;

    const { error: insertErr } = await admin.from("builder_relance_series").insert({
      email: u.email,
      step,
      click_token: clickToken,
    });
    if (insertErr) { skipped++; continue; }

    const { subject, html } = buildEmail(step, stepName, trackUrl);

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
      await admin.from("builder_relance_series").delete().eq("click_token", clickToken).catch(() => {});
    }
  }

  return new Response(JSON.stringify({ sent, skipped, errors }), { headers: { "Content-Type": "application/json" } });
});

// ─── Router ───────────────────────────────────────────────────────────────────

function buildEmail(step: number, stepName: string | null, trackUrl: string): { subject: string; html: string } {
  // stripe-checkout = lead ultra-chaud, séquence dédiée courte
  if (stepName === "stripe-checkout") {
    if (step === 1) return emailStripe1(trackUrl);
    if (step === 2) return emailStripe2(trackUrl);
    return emailStripe3(trackUrl); // steps 3-6 → même email final
  }
  // résultat vu mais pas activé
  if (stepName === "builderia-resultat") {
    if (step === 1) return emailResultat1(trackUrl);
    if (step === 2) return emailResultat2(trackUrl);
    if (step === 3) return emailSocialProof(trackUrl);
    if (step === 4) return emailObjections(trackUrl);
    if (step === 5) return emailCalcul(trackUrl);
    return emailBreakup(trackUrl);
  }
  // a lancé la page prompt mais pas généré
  if (stepName === "builderia") {
    if (step === 1) return emailPrompt1(trackUrl);
    if (step === 2) return emailPrompt2(trackUrl);
    if (step === 3) return emailSocialProof(trackUrl);
    if (step === 4) return emailObjections(trackUrl);
    if (step === 5) return emailCalcul(trackUrl);
    return emailBreakup(trackUrl);
  }
  // jamais ouvert Builderia
  if (step === 1) return emailNull1(trackUrl);
  if (step === 2) return emailNull2(trackUrl);
  if (step === 3) return emailSocialProof(trackUrl);
  if (step === 4) return emailObjections(trackUrl);
  if (step === 5) return emailCalcul(trackUrl);
  return emailBreakup(trackUrl);
}

// ─── Shared layout ────────────────────────────────────────────────────────────

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

function cta(label: string, url: string, color = "#0f0f14"): string {
  return `<tr><td align="center" style="padding:0 36px 10px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" bgcolor="${color}" style="border-radius:50px;">
<a href="${url}" style="display:inline-block;background:${color};padding:15px 38px;border-radius:50px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;">${label}</a>
</td></tr></table>
</td></tr>`;
}

function statsRow(a: string, labelA: string, b: string, labelB: string): string {
  return `<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td width="48%" style="padding:16px;background:#f9fafb;border-radius:8px;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:24px;font-weight:900;color:#0f0f14;">${a}</p>
<p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;">${labelA}</p>
</td>
<td width="4%"></td>
<td width="48%" style="padding:16px;background:#f9fafb;border-radius:8px;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:24px;font-weight:900;color:#7c3aed;">${b}</p>
<p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;">${labelB}</p>
</td>
</tr></table>
</td></tr>`;
}

// ─── Groupe "jamais sur Builderia" ────────────────────────────────────────────

function emailNull1(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Décris ton activité en 1 phrase. L'IA fait le reste.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Ta carte t'attend</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu décris ce que tu fais.<br>L'IA génère ta carte entière.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Pas de formulaires à remplir champ par champ. Pas de templates à personnaliser pendant des heures.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#7c3aed;">Comment ça marche :</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">① Tu tapes une phrase : <em>"Électricien à Lyon, spécialisé rénovation"</em></p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">② L'IA génère ta carte complète en temps réel devant toi</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">③ Tu vois le résultat, tu actives. C'est tout.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 26px;" align="center">
<p style="margin:0;font-size:44px;font-weight:900;color:#0f0f14;line-height:1;">30 secondes.</p>
<p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">C'est le temps que ça prend pour voir ta carte générée.</p>
</td></tr>
${cta("Générer ma carte avec l'IA →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Sans engagement · Aucune CB requise</p></td></tr>
${footer()}
`),
  };
}

function emailNull2(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Voici ce que l'IA génère avec une seule phrase.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Un exemple concret.<br>Pour que tu voies exactement ce qui se passe.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Quelqu'un tape : <strong style="color:#0f0f14;">"Coach sportif à Paris, spécialiste perte de poids et remise en forme"</strong></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0f0f14;">L'IA génère automatiquement :</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ Un accroche pro : <em>"Transformez votre corps, changez votre vie"</em></p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ 3 offres détaillées avec prix et durées</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ 3 avis clients réalistes pour crédibiliser</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✦ Des statistiques clés qui inspirent confiance</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">✦ Un thème visuel adapté à ton activité</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Et tout ça en <strong style="color:#0f0f14;">moins de 30 secondes.</strong> Tu peux modifier chaque détail après. Mais le plus dur — partir de zéro — l'IA le fait pour toi.</p>
</td></tr>
${cta("Essayer maintenant →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · 30 secondes · Modifiable à vie</p></td></tr>
${footer()}
`),
  };
}

// ─── Groupe "builderia" — vu le prompt, pas généré ────────────────────────────

function emailPrompt1(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Tu étais à 30 secondes de voir ta carte.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;">Tu es passé tout près</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu as vu le générateur.<br>Tu n'as pas encore tapé ta description.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ce n'est pas un reproche. Parfois on arrive sur une page, on regarde, et on repart. C'est humain.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#92400e;">Ce qu'il te reste à faire :</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">① Retourne sur le générateur</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">② Tape une phrase sur ton activité — n'importe laquelle</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">③ Regarde l'IA générer ta carte en direct</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ce n'est pas grave si ta première phrase n'est pas parfaite. L'IA comprend même les descriptions imprécises. Tu peux toujours modifier après.</p>
</td></tr>
${cta("Générer ma carte →", trackUrl, "#d97706")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">30 secondes · Gratuit · Modifiable</p></td></tr>
${footer()}
`),
  };
}

function emailPrompt2(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Pas sûr de quoi écrire ? Voici des exemples.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">La seule question que tu dois te poser :<br><em>"Qu'est-ce que je fais ?"</em></p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Des exemples de descriptions qui ont généré de belles cartes :</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0f0f14;">Exemples testés :</p>
<p style="margin:0 0 8px;font-size:13px;color:#374151;line-height:1.7;padding:8px 0;border-bottom:1px solid #e5e7eb;"><span style="color:#7c3aed;font-weight:600;">→</span> "Plombier chauffagiste à Marseille, urgences 7j/7"</p>
<p style="margin:0 0 8px;font-size:13px;color:#374151;line-height:1.7;padding:8px 0;border-bottom:1px solid #e5e7eb;"><span style="color:#7c3aed;font-weight:600;">→</span> "Coach business pour freelances, je t'aide à trouver tes 3 premiers clients"</p>
<p style="margin:0 0 8px;font-size:13px;color:#374151;line-height:1.7;padding:8px 0;border-bottom:1px solid #e5e7eb;"><span style="color:#7c3aed;font-weight:600;">→</span> "Photographe mariage et portrait à Bordeaux"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.7;padding:8px 0;"><span style="color:#7c3aed;font-weight:600;">→</span> "Avocat spécialisé droit du travail, Paris 8e"</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Pas besoin de faire mieux que ça. L'IA s'occupe du reste : l'accroche, les services, les avis, le design. Toi, tu valides.</p>
</td></tr>
${cta("Générer ma carte →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">30 secondes · Gratuit · Résultat visible immédiatement</p></td></tr>
${footer()}
`),
  };
}

// ─── Groupe "builderia-resultat" — vu la carte, pas activé ────────────────────

function emailResultat1(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Ta carte générée t'attend. Elle ne sera plus là indéfiniment.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:1px;">Ta carte est prête</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu as vu ta carte.<br>Tu as cliqué ailleurs.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Je ne sais pas ce qui s'est passé dans ta tête à ce moment-là. Peut-être un doute. Peut-être une distraction. Peut-être le prix.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1d4ed8;">Ce que tu avais déjà :</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✓ Ta carte générée par l'IA avec ton activité</p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✓ Ton lien prêt : <span style="color:#3b82f6;font-weight:600;">cartevisitedigitale.fr/ton-nom</span></p>
<p style="margin:0 0 7px;font-size:14px;color:#374151;line-height:1.6;">✓ Tes services, avis clients, stats — tout généré</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">✓ Un essai de 3 jours gratuit, sans CB</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Il ne manquait qu'un clic pour que ta carte soit en ligne et partageable ce soir.</p>
</td></tr>
${cta("Activer ma carte — 3 jours gratuits →", trackUrl, "#1d4ed8")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Sans CB · Sans engagement · Résiliable à tout moment</p></td></tr>
${footer()}
`),
  };
}

function emailResultat2(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Ce que tes clients voient sur ta carte Vitrine.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Voici ce qu'un client voit<br>quand tu lui partages ta carte.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f0f14;border-radius:10px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.6px;">Sur ta carte Vitrine</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✦ <strong style="color:#ffffff;">Ton accroche pro</strong> — celle qui retient l'attention en 3 secondes</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✦ <strong style="color:#ffffff;">Tes offres détaillées</strong> — ils savent exactement ce que tu proposes et à quel prix</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✦ <strong style="color:#ffffff;">Tes avis clients</strong> — la preuve sociale qui convertit</p>
<p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">✦ <strong style="color:#ffffff;">Tes stats clés</strong> — années d'expérience, projets, satisfaction</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;">✦ <strong style="color:#ffffff;">Un bouton Calendly</strong> — ils prennent RDV directement depuis ta carte</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Un lien. Partagé sur WhatsApp, Instagram, ou en signature email. Et ton prospect a tout ce qu'il lui faut pour te choisir toi plutôt qu'un concurrent.</p>
</td></tr>
${statsRow("2 400+", "Pros l'utilisent", "4.9 ★", "487 avis")}
${cta("Voir ma carte Vitrine →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Essai 3 jours gratuit · Sans CB · 4,80 €/mois ensuite</p></td></tr>
${footer()}
`),
  };
}

// ─── Groupe "stripe-checkout" — a cliqué, abandonné Stripe ───────────────────

function emailStripe1(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Ta carte est créée. Il manque juste l'activation.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:1px;">Action requise</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Ta carte existe.<br>Elle n'est pas encore publiée.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu es allé jusqu'à la page de paiement. Tu n'as pas finalisé. C'est normal d'hésiter.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
<tr><td style="padding:20px 22px;" align="center">
<p style="margin:0 0 6px;font-size:28px;color:#15803d;font-weight:900;">0 €</p>
<p style="margin:0 0 8px;font-size:16px;font-weight:800;color:#15803d;">Pour les 3 premiers jours.</p>
<p style="margin:0;font-size:14px;color:#166534;line-height:1.6;">Pas de CB demandée pour démarrer l'essai.<br>Tu vois ta carte publiée, tu partages, tu testes.<br>Ensuite : <strong>4,80 €/mois</strong>, résiliable à tout moment.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Le seul risque : passer les 3 prochains jours sans carte digitale, alors que la tienne est déjà prête.</p>
</td></tr>
${cta("Publier ma carte — 3 jours gratuits →", trackUrl, "#15803d")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Sans CB · Résiliable à tout moment · 4,80 €/mois après l'essai</p></td></tr>
${footer()}
`),
  };
}

function emailStripe2(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Pas de CB. 3 jours gratuits. Voici pourquoi tu peux y aller.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je vais répondre à chaque objection.<br>Une par une.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"J'ai peur de renseigner ma CB"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Pas de CB demandée pour démarrer. Stripe sécurise tout. 0 € prélevé pendant 3 jours.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Et si je veux annuler ?"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">1 clic depuis ton dashboard. Aucun préavis. Aucun engagement. Résiliation instantanée.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"4,80 € par mois c'est trop cher"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">C'est 16 centimes par jour. Moins qu'un café. Si ça t'apporte 1 client dans l'année, c'est rentabilisé 50 fois.</p>
</td></tr>
<tr><td style="padding:10px 0;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je ne suis pas sûr que ça marche pour moi"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">C'est exactement pour ça qu'il y a 3 jours d'essai. Tu testes, tu partages, tu vois. Si ça ne te convient pas : tu annules.</p>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Démarrer l'essai gratuit →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">0 € pendant 3 jours · Puis 4,80 €/mois · Résiliable à tout moment</p></td></tr>
${footer()}
`),
  };
}

function emailStripe3(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Dernière relance. Ta carte sera désactivée sous peu.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je ne t'enverrai plus de messages après celui-ci.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ta carte a été générée. Tu es allé jusqu'à la page de paiement. Et tu t'es arrêté là.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #e5e7eb;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;">Si un jour tu changes d'avis, ta carte est sauvegardée. Tu peux revenir et l'activer en 1 clic.</p>
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Mais si c'est maintenant — <strong style="color:#0f0f14;">3 jours gratuits, pas de CB, résiliable à tout moment.</strong></p>
</td></tr>
</table>
</td></tr>
${cta("Activer ma carte (dernière chance)", trackUrl)}
<tr><td style="padding:16px 36px 28px;">
<p style="margin:0;font-size:14px;line-height:1.75;color:#6b7280;">Quoi qu'il arrive, bonne continuation.</p>
</td></tr>
${footer()}
`),
  };
}

// ─── Emails communs (J+3, J+7, J+14, J+21) ───────────────────────────────────

function emailSocialProof(trackUrl: string): { subject: string; html: string } {
  return {
    subject: `"Mon QR code sur mon van m'a rapporté 3 chantiers en 2 semaines."`,
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 6px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Témoignage client</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:26px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">"Mon QR code sur mon van m'a rapporté 3 chantiers en 2 semaines."</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong style="color:#0f0f14;">Thomas, électricien à Lyon.</strong> Aucun site web. Aucune pub. Juste du bouche-à-oreille et une carte digitale générée en 30 secondes.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Il colle le QR code de sa carte sur son van. Ses anciens clients transmettent ses coordonnées d'un tap. Les nouveaux scannent en passant devant le chantier.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="padding:14px 12px;background:#f9fafb;border-radius:8px 0 0 8px;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:26px;font-weight:900;color:#0f0f14;">3</p>
<p style="margin:3px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;">Chantiers</p>
</td>
<td style="padding:14px 12px;background:#f9fafb;text-align:center;border:1px solid #f0f0f0;border-right:none;">
<p style="margin:0;font-size:26px;font-weight:900;color:#0f0f14;">2</p>
<p style="margin:3px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;">Semaines</p>
</td>
<td style="padding:14px 12px;background:#f9fafb;border-radius:0 8px 8px 0;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:26px;font-weight:900;color:#7c3aed;">0 €</p>
<p style="margin:3px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;">Investis</p>
</td>
</tr></table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Thomas n'est pas une exception. Il a juste fait ce que 2 400 autres pros ont fait : <strong style="color:#0f0f14;">il a activé sa carte.</strong></p>
</td></tr>
${cta("Faire comme Thomas →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Essai 3 jours gratuit · 2 400+ pros · 4.9★ sur 487 avis</p></td></tr>
${footer()}
`),
  };
}

function emailObjections(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Les 5 raisons de ne pas activer sa carte (et pourquoi elles sont fausses)",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je sais pourquoi tu n'as pas encore activé.</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ta carte a été générée par l'IA. Elle est belle. Elle est prête. Et pourtant, elle n'est toujours pas en ligne. Alors je vais répondre directement aux vraies objections.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je n'ai pas le temps"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Ta carte est déjà générée. L'activer prend 30 secondes.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je ne suis pas sûr que ça marche pour mon secteur"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">2 400+ pros l'utilisent : artisans, coachs, avocats, restaurateurs, consultants. L'IA s'adapte à tous les métiers.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"C'est payant, je ne veux pas m'engager"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">3 jours gratuits, sans CB. Ensuite 4,80 €/mois — résiliable en 1 clic, sans préavis.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"J'attends d'avoir une belle photo"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Active ta carte maintenant. Tu ajoutes ta photo après. Le contenu compte plus que la photo.</p>
</td></tr>
<tr><td style="padding:10px 0;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je le ferai quand j'aurai plus de temps"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Ta carte est prête. Demain ressemble à aujourd'hui. 30 secondes maintenant.</p>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
${cta("Activer ma carte →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Essai 3 jours gratuit · Sans CB · 4,80 €/mois ensuite</p></td></tr>
${footer()}
`),
  };
}

function emailCalcul(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Pendant que tu dors, ta carte peut ramener des clients. La tienne ne fait rien.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Une carte digitale travaille 24h/24.<br>La tienne est en pause.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Chaque semaine, des dizaines de personnes rencontrent un professionnel, lui demandent sa carte. Et repartent les mains vides parce que ce pro n'en a pas.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f0f14;border-radius:10px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.6px;">Le calcul simple</p>
<p style="margin:0 0 6px;font-size:14px;color:#e2e8f0;">Si tu rates <strong style="color:#ffffff;">1 contact</strong> par semaine</p>
<p style="margin:0 0 6px;font-size:14px;color:#e2e8f0;">= <strong style="color:#ffffff;">52 contacts</strong> par an qui s'évaporent</p>
<p style="margin:0 0 6px;font-size:14px;color:#e2e8f0;">= même si <strong style="color:#ffffff;">1 sur 10</strong> aurait signé avec toi</p>
<p style="margin:10px 0 0;font-size:18px;font-weight:800;color:#a78bfa;">= 5 clients perdus cette année.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ta carte est générée. Elle attend d'être publiée. <strong style="color:#0f0f14;">4,80 €/mois après l'essai gratuit.</strong> Si elle t'apporte 1 seul client dans l'année, elle est rentabilisée 20 fois.</p>
</td></tr>
${cta("Activer ma carte gratuitement →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Essai 3 jours gratuit · 4,80 €/mois · Résiliable à tout moment</p></td></tr>
${footer()}
`),
  };
}

function emailBreakup(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "C'est la dernière fois que je t'écris.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je ne t'enverrai plus de messages après celui-ci.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ça fait 3 semaines. Ta carte a été générée par l'IA. Elle n'est toujours pas en ligne. Et c'est OK. Tout le monde n'est pas prêt au même moment.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Je ne sais pas ce qui s'est passé. Peut-être que le timing n'était pas le bon. Peut-être d'autres priorités. Peut-être que tu n'as simplement pas eu envie.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #e5e7eb;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;">Si un jour tu veux ta carte digitale, elle est sauvegardée. Tu reviens, tu actives en 30 secondes.</p>
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Et si c'est maintenant : <strong style="color:#0f0f14;">3 jours gratuits, sans CB.</strong></p>
</td></tr>
</table>
</td></tr>
${cta("Activer ma carte (dernière chance)", trackUrl)}
<tr><td style="padding:16px 36px 28px;">
<p style="margin:0 0 0;font-size:14px;line-height:1.75;color:#6b7280;">Bonne continuation dans ton activité.</p>
</td></tr>
${footer()}
`),
  };
}
