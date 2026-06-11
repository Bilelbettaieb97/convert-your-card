import { defineEventHandler, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";

type TrialUser = {
  user_id: string;
  email: string;
  nom?: string;
  slug?: string;
  trial_end?: string;
};

function getFirstName(nom: string, email: string): string {
  if (nom && nom.trim() && nom !== email.split("@")[0]) return nom.split(" ")[0];
  const prefix = email.split("@")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function daysLeft(trialEnd: string | undefined): number {
  if (!trialEnd) return 0;
  return Math.ceil((new Date(trialEnd).getTime() - Date.now()) / 86_400_000);
}

function buildStep1Email(firstName: string, slug: string, appUrl: string): string {
  const cardUrl = `${appUrl}/${slug}?utm_source=email&utm_medium=relance&utm_campaign=trial-relance&utm_content=step1`;
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Votre carte est prête</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#c026d3,#7c3aed);padding:32px 40px 28px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">Carte Visite Digitale</p>
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.3;">${firstName}, votre carte est en ligne 🎉</h1>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
            Bravo ! Votre carte de visite digitale est <strong style="color:#c026d3;">maintenant accessible en ligne</strong>. Il vous reste <strong>2 jours d'essai gratuit</strong> — voici comment en tirer le maximum :
          </p>

          <!-- Tips -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
            ${[
              ["📲", "WhatsApp", "Copiez votre lien et envoyez-le à vos contacts pro. Taux d'ouverture : 98 %."],
              ["📸", "Instagram & Stories", "Ajoutez le lien en bio et mentionnez-le dans vos stories."],
              ["✉️", "Signature email", "Ajoutez votre lien dans la signature de tous vos emails professionnels."],
              ["🖨", "QR code", "Téléchargez votre QR code depuis le dashboard et imprimez-le."],
            ].map(([icon, title, desc]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:22px;padding-right:14px;vertical-align:middle;">${icon}</td>
                    <td>
                      <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#111827;">${title}</p>
                      <p style="margin:0;font-size:13px;color:#6b7280;">${desc}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`).join("")}
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
            <tr>
              <td align="center">
                <a href="${cardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;">
                  Voir ma carte →
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:8px;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">${cardUrl}</p>
              </td>
            </tr>
          </table>

          <!-- Tip box -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#fdf4ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#7c3aed;">💡 Conseil du jour</p>
                <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;">
                  Personnalisez votre carte depuis le dashboard : ajoutez votre photo, vos offres et connectez votre agenda Calendly pour que vos clients puissent prendre RDV directement.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Bilel · Carte Visite Digitale</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">On lit tous les emails. N'hésite pas à répondre directement.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildStep2Email(firstName: string, slug: string, appUrl: string, trialEndStr: string | undefined): string {
  const cardUrl = `${appUrl}/${slug}`;
  const pricingUrl = `${appUrl}/dashboard/account?utm_source=email&utm_medium=relance&utm_campaign=trial-relance&utm_content=step2`;
  const days = daysLeft(trialEndStr);
  const urgencyText = days <= 0 ? "expire aujourd'hui" : days === 1 ? "expire demain" : `expire dans ${days} jour${days > 1 ? "s" : ""}`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Votre carte expire bientôt</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <!-- Urgency header -->
      <tr>
        <td style="background:#dc2626;padding:16px 40px;text-align:center;">
          <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
            ⏰ Votre essai gratuit ${urgencyText}
          </p>
        </td>
      </tr>
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1c1917,#292524);padding:32px 40px 28px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.3;">
            ${firstName}, ne perdez pas votre carte
          </h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.6);">Activez votre abonnement pour continuer à être visible en ligne</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
            Votre carte vitrine — avec vos services, vos avis clients et votre agenda — <strong style="color:#dc2626;">sera désactivée</strong> à la fin de votre essai. Vos futurs clients ne pourront plus la voir.
          </p>

          <!-- What they lose -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.5px;">Ce que vous perdrez</p>
                ${[
                  "Votre lien de carte partageable",
                  "Vos services et offres détaillées",
                  "Vos avis clients intégrés",
                  "Votre agenda Calendly connecté",
                  "Vos statistiques de visites",
                ].map(item => `
                <p style="margin:0 0 6px;font-size:13px;color:#374151;">
                  <span style="color:#dc2626;margin-right:8px;">✕</span>${item}
                </p>`).join("")}
              </td>
            </tr>
          </table>

          <!-- Price -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;">
            <tr>
              <td style="padding:20px 24px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;color:#15803d;">Pour garder tout ça actif :</p>
                <p style="margin:0;font-size:32px;font-weight:900;color:#111827;">4,80€<span style="font-size:16px;font-weight:500;color:#6b7280;">/mois</span></p>
                <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Résiliable à tout moment · Sans engagement</p>
              </td>
            </tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
            <tr>
              <td align="center">
                <a href="${pricingUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:50px;">
                  Activer mon abonnement →
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;">
            Ou <a href="${cardUrl}" style="color:#c026d3;text-decoration:none;">voir ma carte</a> avant qu'elle expire
          </p>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Bilel · Carte Visite Digitale</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">Des questions ? Répondez directement à cet email.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildStep3Email(firstName: string, slug: string, appUrl: string): string {
  const pricingUrl = `${appUrl}/dashboard/account?utm_source=email&utm_medium=relance&utm_campaign=trial-relance&utm_content=step3`;
  const cardUrl = `${appUrl}/${slug}`;
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Votre carte expire ce soir</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <tr>
        <td style="background:#7f1d1d;padding:14px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;font-weight:800;color:#fca5a5;letter-spacing:1px;text-transform:uppercase;">⚠️ Dernier jour — expire ce soir à minuit</p>
        </td>
      </tr>
      <tr>
        <td style="background:linear-gradient(135deg,#450a0a,#7f1d1d);padding:32px 40px 28px;text-align:center;">
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.3;">${firstName}, c'est ce soir ou jamais.</h1>
          <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.65);">Votre carte sera désactivée à minuit</p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
            Votre essai gratuit de 3 jours se termine <strong style="color:#dc2626;">ce soir à minuit</strong>. Après ça, votre carte est désactivée et vos clients verront une page vide à votre place.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border-radius:12px;overflow:hidden;border:2px solid #fca5a5;">
            <tr>
              <td style="background:#fef2f2;padding:20px 24px;text-align:center;">
                <p style="margin:0 0 6px;font-size:13px;color:#991b1b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Pour garder votre carte active</p>
                <p style="margin:0;font-size:40px;font-weight:900;color:#111827;line-height:1;">4,80€<span style="font-size:18px;font-weight:500;color:#6b7280;">/mois</span></p>
                <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">= 16 centimes par jour · moins qu'un café par mois</p>
                <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">Sans engagement · Résiliable en 1 clic</p>
              </td>
            </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#c2410c;">Ce qui disparaît ce soir si vous n'activez pas :</p>
                ${[
                  "Votre lien public (vos clients voient une erreur)",
                  "Votre QR code (ne fonctionne plus)",
                  "Vos services, offres et avis clients",
                  "Votre agenda et prise de RDV",
                ].map(item => `<p style="margin:0 0 6px;font-size:13px;color:#374151;"><span style="color:#ea580c;margin-right:8px;">✕</span>${item}</p>`).join("")}
              </td>
            </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
            <tr>
              <td align="center">
                <a href="${pricingUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;padding:18px 44px;border-radius:50px;">
                  Activer maintenant — 4,80€/mois →
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0 0 24px;font-size:12px;color:#9ca3af;text-align:center;">
            Ou <a href="${cardUrl}" style="color:#c026d3;text-decoration:none;">voir ma carte</a> une dernière fois
          </p>
          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
            Si vous activez après minuit, vos données sont conservées — il suffit de s'abonner pour remettre la carte en ligne instantanément.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Bilel · Carte Visite Digitale</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">Des questions ? Répondez directement à cet email.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/send-trial-relance")) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const resendKey  = process.env.RESEND_API_KEY ?? "";
  const appUrl     = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const authHeader = event.headers.get("authorization") ?? "";
  if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await readBody(event) as { users: TrialUser[]; step: number };
  const { users, step } = body;

  if (!users?.length) return new Response(JSON.stringify({ sent: 0 }), { headers: { "Content-Type": "application/json" } });

  const admin = createClient(
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "",
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  let sent = 0;

  for (const user of users) {
    const firstName = getFirstName(user.nom ?? "", user.email);
    const slug = user.slug ?? user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const subjects: Record<number, string> = {
      1: `${firstName}, votre carte est en ligne — partagez-la ce soir 🚀`,
      2: `⏰ ${firstName}, votre carte expire demain soir`,
      3: `⚠️ ${firstName}, votre carte est désactivée ce soir à minuit`,
    };
    const htmlBuilders: Record<number, () => string> = {
      1: () => buildStep1Email(firstName, slug, appUrl),
      2: () => buildStep2Email(firstName, slug, appUrl, user.trial_end),
      3: () => buildStep3Email(firstName, slug, appUrl),
    };
    const subject = subjects[step] ?? subjects[2];
    const html = (htmlBuilders[step] ?? htmlBuilders[2])();

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Bilel · Carte Visite Digitale <bilel@cartevisitedigitale.fr>",
          to: user.email,
          subject,
          html,
        }),
      });

      if (!res.ok) {
        console.error(`[send-trial-relance] Resend error for ${user.email}: ${res.status}`);
        continue;
      }

      await admin.from("trial_relance_series").upsert(
        { email: user.email, user_id: user.user_id || null, step, sent_at: new Date().toISOString() },
        { onConflict: "email,step", ignoreDuplicates: false }
      );

      sent++;
    } catch (err) {
      console.error(`[send-trial-relance] Error for ${user.email}:`, err);
    }
  }

  return new Response(JSON.stringify({ sent }), { headers: { "Content-Type": "application/json" } });
});
