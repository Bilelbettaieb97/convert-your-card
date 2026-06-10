import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { isDisposableEmail } from "@/lib/is-disposable-email";

const schema = z.object({
  email: z.string().email(),
  accessToken: z.string().min(10),
});

function getFirstName(nom: string, email: string): string {
  const trimmed = (nom || "").trim();
  const first = trimmed.split(" ")[0] || "";
  // If single all-lowercase word (likely a test/placeholder), fall back to email prefix
  if (!first || (first === first.toLowerCase() && !trimmed.includes(" "))) {
    const prefix = email.split("@")[0];
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
  return first.charAt(0).toUpperCase() + first.slice(1);
}

async function sendWelcomeEmail(email: string, nom: string, slug: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const cardUrl = `${appUrl}/${slug}`;
  const dashboardUrl = `${appUrl}/dashboard`;
  const firstName = getFirstName(nom, email);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Carte Visite Digitale <contact@cartevisitedigitale.fr>",
      to: email,
      subject: `${firstName}, ta carte est en ligne. Voilà la suite.`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;">
<tr><td align="center" style="padding:40px 20px 0;">
<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;width:100%;">

  <tr><td style="padding-bottom:28px;">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background:#7c3aed;border-radius:6px;padding:4px 10px;"><span style="font-size:11px;font-weight:800;color:#fff;letter-spacing:0.5px;">CVD</span></td>
      <td style="padding-left:8px;font-size:12px;color:#9ca3af;">cartevisitedigitale.fr</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding-bottom:6px;">
    <p style="margin:0;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:1px;">C'est en ligne</p>
  </td></tr>
  <tr><td style="padding-bottom:22px;">
    <p style="margin:0;font-size:30px;font-weight:800;line-height:1.2;color:#0f0f14;letter-spacing:-0.5px;">Ta carte est prête.<br>Elle t'attend.</p>
  </td></tr>
  <tr><td style="padding-bottom:24px;">
    <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Tu rejoins <strong style="color:#0f0f14;">2 400+ professionnels</strong> qui partagent leurs coordonnées en 1 tap. Ton lien est live dès maintenant.</p>
  </td></tr>

  <tr><td style="padding-bottom:26px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
    <tr><td style="padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.6px;">Ton lien public</p>
      <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f0f14;word-break:break-all;">${cardUrl}</p>
      <p style="margin:0;font-size:12px;color:#6b7280;">Partage ce lien partout. Génère ton QR code depuis le dashboard.</p>
    </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding-bottom:24px;">
    <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#0f0f14;">3 choses à faire maintenant :</p>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#7c3aed;color:#fff;font-size:11px;font-weight:800;text-align:center;line-height:22px;">1</span></td>
          <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;vertical-align:top;"><strong style="color:#0f0f14;">Partage ton lien</strong> en réponse à ta prochaine demande de contact — WhatsApp, Instagram, email</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#7c3aed;color:#fff;font-size:11px;font-weight:800;text-align:center;line-height:22px;">2</span></td>
          <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;vertical-align:top;"><strong style="color:#0f0f14;">Télécharge ton QR code</strong> et mets-le sur ton support, ton van, ta vitrine, tes flyers</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#7c3aed;color:#fff;font-size:11px;font-weight:800;text-align:center;line-height:22px;">3</span></td>
          <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;vertical-align:top;"><strong style="color:#0f0f14;">Ajoute le lien à ta bio Instagram</strong> — chaque visiteur de ton profil peut maintenant te contacter en 1 tap</td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding-bottom:10px;" align="center">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      <td align="center" bgcolor="#0f0f14" style="border-radius:50px;">
        <a href="${dashboardUrl}" style="display:inline-block;background:#0f0f14;padding:15px 38px;border-radius:50px;color:#fff;text-decoration:none;font-weight:700;font-size:15px;">Accéder à mon dashboard &#8594;</a>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="padding-bottom:36px;" align="center">
    <p style="margin:0;font-size:12px;color:#9ca3af;">Des questions ? Réponds directement à cet email.</p>
  </td></tr>

  <tr><td style="border-top:1px solid #f3f4f6;padding:20px 0 32px;">
    <p style="margin:0;font-size:14px;font-weight:600;color:#0f0f14;">L'équipe Carte Visite Digitale</p>
    <p style="margin:4px 0 0;font-size:13px;color:#9ca3af;">On lit tous les emails. N'hésite pas.</p>
  </td></tr>
</table></td></tr></table>
</body>
</html>`,
    }),
  });
}

async function sendAdminNotification(email: string, slug: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const now = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "full", timeStyle: "short" });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "CVD Notifs <contact@cartevisitedigitale.fr>",
      to: "Convertilab@gmail.com",
      subject: `🆕 Nouveau compte CVD — ${email} (gratuit)`,
      html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px 20px;background:#f9fafb;border-radius:12px">
        <h2 style="color:#1a1a2e;margin:0 0 16px">Nouveau compte gratuit 🎉</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px">Email</td><td style="font-weight:600;color:#1a1a2e">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Plan</td><td style="font-weight:600;color:#6b7280">Essentielle (gratuit)</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Carte</td><td><a href="${appUrl}/${slug}" style="color:#c026d3">${appUrl}/${slug}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="color:#1a1a2e">${now}</td></tr>
        </table>
      </div>`,
    }),
  });
}

export const activateFree = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY ?? "";

    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");

    // Vérifier l'identité du caller via son token JWT — ne jamais faire confiance au userId client
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${data.accessToken}` } },
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: { user: callerUser }, error: authError } = await userClient.auth.getUser();
    if (authError || !callerUser) throw new Error("Unauthorized");

    const adminSupabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const userId = callerUser.id;
    const email = callerUser.email ?? data.email;

    if (isDisposableEmail(email)) {
      throw new Error("Les adresses email temporaires ne sont pas acceptées.");
    }
    const nom = email.split("@")[0];

    // Check existing profile
    const { data: existing } = await adminSupabase
      .from("nfc_profiles")
      .select("id, slug, nom")
      .eq("user_id", userId)
      .maybeSingle();

    let profileSlug: string;
    let profileNom = nom;

    if (existing) {
      profileSlug = existing.slug;
      if (existing.nom) profileNom = existing.nom;
      await adminSupabase
        .from("nfc_profiles")
        .update({ plan: "essentielle", actif: true })
        .eq("id", existing.id);
    } else {
      const slugBase = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 25);
      let slug = slugBase;
      let attempt = 0;
      while (true) {
        const { data: taken } = await adminSupabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
        if (!taken) break;
        attempt++;
        slug = `${slugBase}-${attempt}`;
      }
      profileSlug = slug;

      const { data: newProfile } = await adminSupabase
        .from("nfc_profiles")
        .insert({
          slug,
          nom,
          email,
          telephone: "",
          entreprise: "",
          fonction: "",
          plan: "essentielle",
          boutons: [],
          reseaux: [],
          actif: true,
          user_id: userId,
        })
        .select("slug, nom")
        .single();

      if (newProfile) {
        profileSlug = newProfile.slug;
        if (newProfile.nom) profileNom = newProfile.nom;
      }
    }

    // Upsert subscription without Stripe
    await adminSupabase.from("subscriptions").upsert(
      {
        user_id: userId,
        stripe_customer_id: null,
        stripe_subscription_id: null,
        plan: "essentielle",
        status: "active",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    // Emails non-bloquants
    sendWelcomeEmail(email, profileNom, profileSlug).catch(console.error);
    sendAdminNotification(email, profileSlug).catch(console.error);

    return { url: "/bienvenue" };
  });
