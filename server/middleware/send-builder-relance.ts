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
  const { users, step } = body as { users: { user_id: string; email: string; builder_step?: number }[]; step: number };
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
    const builderStep = u.builder_step ?? 1;

    const { error: insertErr } = await admin.from("builder_relance_series").insert({
      email: u.email,
      step,
      click_token: clickToken,
      builder_step_at_send: step === 1 ? builderStep : null,
    });
    if (insertErr) { skipped++; continue; }

    const { subject, html } = buildEmail(step, builderStep, trackUrl);

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
      await admin.from("builder_relance_series").delete().eq("click_token", clickToken);
    }
  }

  return new Response(JSON.stringify({ sent, skipped, errors }), { headers: { "Content-Type": "application/json" } });
});

function builderVersion(builderStep: number): "A" | "B" | "C" {
  if (builderStep <= 3) return "A";
  if (builderStep <= 5) return "B";
  return "C";
}

function buildEmail(step: number, builderStep: number, trackUrl: string): { subject: string; html: string } {
  if (step === 1) return buildEmail1(builderVersion(builderStep), trackUrl);
  if (step === 2) return buildEmail2(trackUrl);
  if (step === 3) return buildEmail3(trackUrl);
  if (step === 4) return buildEmail4(trackUrl);
  if (step === 5) return buildEmail5(trackUrl);
  return buildEmail6(trackUrl);
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

function cta(label: string, url: string, color = "#0f0f14"): string {
  return `<tr><td align="center" style="padding:0 36px 10px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td align="center" bgcolor="${color}" style="border-radius:50px;">
<a href="${url}" style="display:inline-block;background:${color};padding:15px 38px;border-radius:50px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;">${label}</a>
</td></tr></table>
</td></tr>`;
}

/* ─── Email 1 — J+1 (3 versions) ────────────────────────────────────── */

function buildEmail1(version: "A" | "B" | "C", trackUrl: string): { subject: string; html: string } {
  if (version === "A") {
    return {
      subject: "La plupart abandonnent là où tu en es. Les meilleurs continuent.",
      html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 8px;">
<p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Pour toi</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">La plupart s'arrêtent là où tu es.<br>Très peu continuent.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu t'es arrêté au début de ta carte. Tu as vu comment ça marchait, tu as choisi ton univers visuel — et puis quelque chose t'a distrait.</p>
</td></tr>
<tr><td style="padding:0 36px 24px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">La vérité : <strong style="color:#0f0f14;">80 % des gens qui s'inscrivent sur CVD ne terminent jamais leur carte.</strong> Pas parce qu'ils n'en ont pas besoin. Parce qu'ils remettent à demain.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0f0f14;">Ce que tu obtiens en terminant :</p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">Un lien unique : <span style="color:#7c3aed;font-weight:600;">cartevisitedigitale.fr/ton-nom</span></p>
<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.6;">Un QR code que tu peux partager ou imprimer</p>
<p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">Tes contacts dans le téléphone de tes clients en 1 tap</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 6px;" align="center"><p style="margin:0;font-size:13px;color:#9ca3af;">Temps restant pour terminer :</p></td></tr>
<tr><td style="padding:0 36px 26px;" align="center"><p style="margin:0;font-size:44px;font-weight:900;color:#0f0f14;line-height:1;">3 minutes.</p></td></tr>
${cta("Continuer ma carte →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Sans engagement · Modifiable à vie</p></td></tr>
${footer()}
`),
    };
  }

  if (version === "B") {
    return {
      subject: "Bonne nouvelle : tes infos sont toujours là.",
      html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tes infos sont toujours là.<br>Tu n'as pas à recommencer.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu t'es arrêté en plein milieu. Et je sais exactement ce que tu penses maintenant : <em>"Si je reviens, est-ce que je dois tout recommencer ?"</em></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
<tr><td style="padding:20px;" align="center">
<p style="margin:0 0 6px;font-size:28px;color:#15803d;font-weight:900;">✓</p>
<p style="margin:0 0 4px;font-size:16px;font-weight:800;color:#15803d;">Tout est sauvegardé.</p>
<p style="margin:0;font-size:14px;color:#166534;line-height:1.6;">Ton thème, ton style, les infos que tu as déjà remplies — tout t'attend. Tu reprends exactement là où tu t'es arrêté.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Le seul vrai risque ? Attendre trop longtemps. Plus les jours passent, plus c'est difficile de revenir. Et pendant ce temps, des clients potentiels ne trouvent pas ta carte.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Il te reste probablement <strong style="color:#0f0f14;">moins de 5 minutes</strong> pour finir.</p>
</td></tr>
${cta("Reprendre ma carte →", trackUrl, "#15803d")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Tes données sont sauvegardées · Plan gratuit disponible</p></td></tr>
${footer()}
`),
    };
  }

  // Version C — steps 6-7
  return {
    subject: "Tu as vu ta carte. Elle existe.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Tu as vu ta carte finie.<br>Et tu n'as pas cliqué.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Là, je ne vais pas te mentir.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu as fait tout le travail. Tu as choisi ton style, rempli tes infos, vu ta carte avec ton nom dessus. Et à la dernière étape — tu es parti.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#9a3412;">Ce que tu as construit en entrant dans le builder :</p>
<p style="margin:0 0 6px;font-size:14px;color:#7c2d12;">✓ Ton profil personnalisé</p>
<p style="margin:0 0 6px;font-size:14px;color:#7c2d12;">✓ Ton lien unique prêt à partager</p>
<p style="margin:0 0 6px;font-size:14px;color:#7c2d12;">✓ Ton QR code généré</p>
<p style="margin:0 0 12px;font-size:14px;color:#7c2d12;">✓ Ton style visuel choisi</p>
<p style="margin:0;font-size:14px;font-weight:700;color:#9a3412;">Ce qu'il te reste à faire : activer. C'est gratuit.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Est-ce que c'est la peur que ça ne marche pas ? La distraction ? Le prix ? Le plan de base est <strong style="color:#0f0f14;">100 % gratuit, pour toujours.</strong> Pas d'essai, pas de CB.</p>
</td></tr>
${cta("Activer ma carte maintenant →", trackUrl, "#ea580c")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Ta carte est prête · Activation en 30 secondes</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 2 — J+3 "Le pont" ───────────────────────────────────────── */

function buildEmail2(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Imagine : quelqu'un te demande ta carte. Tu souris et tu tends ton téléphone.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">La scène que tu pourrais vivre dès ce soir.</p>
</td></tr>
<tr><td style="padding:0 36px 18px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu es à un événement. Un salon. Un chantier. Une réunion. Quelqu'un te dit : <em>"T'as une carte ?"</em></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #7c3aed;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;">Au lieu de chercher dans ton portefeuille une carte froissée — ou pire, de dire <em>"j'en ai plus sur moi"</em> — tu sors ton téléphone. Tu fais glisser.</p>
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong style="color:#0f0f14;">En 3 secondes, tes coordonnées sont dans leur téléphone.</strong> Ton nom. Ton numéro. Tes réseaux. Ton lien de prise de RDV.</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 18px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">C'est ça, une carte digitale. Pas une "appli". Pas un truc compliqué. Juste une page web à ton nom, toujours dans ta poche, toujours à jour.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td width="48%" style="padding:16px;background:#f9fafb;border-radius:8px;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:24px;font-weight:900;color:#0f0f14;">2 400+</p>
<p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;">Pros l'utilisent déjà</p>
</td>
<td width="4%"></td>
<td width="48%" style="padding:16px;background:#f9fafb;border-radius:8px;text-align:center;border:1px solid #f0f0f0;">
<p style="margin:0;font-size:24px;font-weight:900;color:#7c3aed;">4.9 ★</p>
<p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;">487 avis vérifiés</p>
</td>
</tr>
</table>
</td></tr>
${cta("Créer cette scène →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · 3 minutes · Partageable immédiatement</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 3 — J+6 "La preuve" ─────────────────────────────────────── */

function buildEmail3(trackUrl: string): { subject: string; html: string } {
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
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong style="color:#0f0f14;">Thomas, électricien à Lyon.</strong> Aucun site web. Aucun profil en ligne. Juste du bouche-à-oreille et des cartes papier oubliées à la maison.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">En janvier, il crée sa carte en 4 minutes. Il imprime le QR code, le colle sur son van. Ses anciens clients peuvent maintenant transmettre ses coordonnées d'un tap. Ses nouveaux clients trouvent son numéro en scannant le sticker sur son véhicule.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
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
</tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Thomas n'est pas une exception. Il a juste fait ce que 2 400 autres professionnels ont fait : <strong style="color:#0f0f14;">il a terminé sa carte.</strong></p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">La tienne est à 80 % prête. Il reste moins de 5 minutes.</p>
</td></tr>
${cta("Faire comme Thomas →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · 2 400+ pros · 4.9★ sur 487 avis</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 4 — J+10 "L'objection" ──────────────────────────────────── */

function buildEmail4(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Les 5 raisons de ne pas créer sa carte (et pourquoi elles sont toutes fausses)",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je sais pourquoi tu n'as pas terminé.</p>
</td></tr>
<tr><td style="padding:0 36px 22px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ça fait 10 jours. J'ai envoyé 3 messages. Tu n'as pas terminé ta carte. Alors j'ai décidé de répondre directement aux vraies objections — celles que personne ne dit à voix haute.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
<tr><td style="padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je n'ai pas le temps"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">3 minutes chrono, montre en main. C'est moins long que de lire cet email.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je ne suis pas sûr que ça marche pour mon secteur"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">2 400+ pros l'utilisent : artisans, coachs, avocats, restaurateurs, consultants. Si ton secteur existe, ça marche.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"C'est payant, je ne veux pas m'engager"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Le plan Essentielle est <strong>gratuit pour toujours</strong>. Aucune CB, aucun engagement, aucune date d'expiration.</p>
</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"J'attends d'avoir une belle photo"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Tu peux activer ta carte sans photo et en ajouter une après. Les infos comptent plus que la photo.</p>
</td></tr>
<tr><td style="padding:10px 0;">
<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#374151;text-decoration:line-through;opacity:0.6;">"Je le ferai quand j'aurai plus de temps"</p>
<p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">Tu avais le temps quand tu t'es inscrit. Tu l'as maintenant. Demain ressemble à aujourd'hui.</p>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Quelle que soit la vraie raison — <strong style="color:#0f0f14;">elle ne justifie pas de continuer à manquer des contacts.</strong></p>
</td></tr>
${cta("Terminer maintenant →", trackUrl)}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · 3 minutes · Modifiable à vie</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 5 — J+14 "La carte qui travaille" ───────────────────────── */

function buildEmail5(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "Pendant que tu dors, ta carte peut ramener des clients. La tienne ne fait rien.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Une carte digitale travaille 24h/24.<br>La tienne est en pause.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Chaque semaine, des dizaines de personnes rencontrent un professionnel, lui demandent sa carte — et repartent les mains vides parce que ce pro n'en a pas.</p>
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
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ce n'est pas un reproche. C'est une réalité que la plupart des professionnels n'ont jamais calculée.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">La carte digitale ne fait pas de miracle. Elle fait juste une chose : <strong style="color:#0f0f14;">elle permet à quelqu'un qui veut te contacter de le faire facilement.</strong> C'est suffisant pour changer beaucoup de choses.</p>
</td></tr>
${cta("Activer ma carte gratuitement →", trackUrl, "#7c3aed")}
<tr><td style="padding:8px 36px 28px;" align="center"><p style="margin:0;font-size:12px;color:#9ca3af;">Gratuit · Activée en 3 minutes · Fonctionne 24h/24</p></td></tr>
${footer()}
`),
  };
}

/* ─── Email 6 — J+21 "Breakup" ──────────────────────────────────────── */

function buildEmail6(trackUrl: string): { subject: string; html: string } {
  return {
    subject: "C'est la dernière fois que je t'écris.",
    html: wrap(`
${logo()}
<tr><td style="padding:28px 36px 22px;">
<p style="margin:0;font-size:28px;font-weight:800;line-height:1.25;color:#0f0f14;letter-spacing:-0.4px;">Je ne t'enverrai plus de messages après celui-ci.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Ça fait 3 semaines. 5 messages. Tu n'as pas terminé ta carte. Et c'est OK — tout le monde n'est pas prêt au même moment.</p>
</td></tr>
<tr><td style="padding:0 36px 16px;">
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Je ne sais pas ce qui s'est passé. Peut-être que le timing n'était pas le bon. Peut-être que tu avais d'autres priorités. Peut-être que tu n'as tout simplement pas eu envie.</p>
</td></tr>
<tr><td style="padding:0 36px 26px;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:3px solid #e5e7eb;background:#fafafa;border-radius:0 8px 8px 0;">
<tr><td style="padding:18px 20px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;">Ce que je sais : si un jour tu veux une carte digitale, le lien sera toujours là. Ton profil est sauvegardé. Tu peux revenir dans 6 mois et reprendre en 2 minutes.</p>
<p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Et si c'est maintenant — <strong style="color:#0f0f14;">3 minutes, c'est tout ce qu'il faut.</strong></p>
</td></tr>
</table>
</td></tr>
${cta("Terminer ma carte (dernière chance)", trackUrl)}
<tr><td style="padding:16px 36px 28px;">
<p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#6b7280;">Quoi qu'il arrive — bonne continuation dans ton activité.</p>
</td></tr>
${footer()}
`),
  };
}
