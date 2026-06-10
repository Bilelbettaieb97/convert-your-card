import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const schema = z.object({
  email: z.string().email(),
  userId: z.string(),
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
      from: "Bilel · Carte Visite Digitale <bilel@convertilab.com>",
      to: email,
      subject: `Bienvenue ${firstName} — ta carte est en ligne 🎉`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:580px;margin:40px auto;padding:0 16px 40px">
    <div style="background:linear-gradient(135deg,#c026d3,#7c3aed);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50px;padding:6px 18px;font-size:12px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;margin-bottom:20px">Carte Visite Digitale</div>
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.3">Bienvenue, ${firstName} ! 🎉</h1>
      <p style="margin:12px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Ta carte de visite digitale est prête et en ligne.</p>
    </div>
    <div style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7">
        Félicitations pour ton plan <strong style="color:#c026d3">Essentielle (gratuit)</strong> — tu fais maintenant partie des professionnels qui partagent leur profil en 1 tap. 🚀
      </p>
      <div style="background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;border-radius:12px;padding:24px;margin-bottom:28px;text-align:center">
        <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px">🔗 Ton lien public</p>
        <a href="${cardUrl}" style="font-size:16px;font-weight:700;color:#7c3aed;text-decoration:none;word-break:break-all">${cardUrl}</a>
        <p style="margin:10px 0 0;font-size:12px;color:#9ca3af">Partage ce lien ou génère un QR code depuis ton dashboard</p>
      </div>
      <p style="margin:0 0 14px;font-size:14px;font-weight:600;color:#1a1a2e">3 premières choses à faire :</p>
      <div style="margin-bottom:10px">
        <span style="display:inline-flex;align-items:center;gap:12px">
          <span style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed">1</span>
          <span style="color:#374151;font-size:14px">Ajoute ta photo, ton logo et tes coordonnées dans <strong>Ma carte</strong></span>
        </span>
      </div>
      <div style="margin-bottom:10px">
        <span style="display:inline-flex;align-items:center;gap:12px">
          <span style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed">2</span>
          <span style="color:#374151;font-size:14px">Génère ton QR code et enregistre-le dans tes favoris</span>
        </span>
      </div>
      <div style="margin-bottom:28px">
        <span style="display:inline-flex;align-items:center;gap:12px">
          <span style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed">3</span>
          <span style="color:#374151;font-size:14px">Partage ton lien dans ta bio Instagram, ta signature email et tes messages</span>
        </span>
      </div>
      <div style="text-align:center;margin-bottom:32px">
        <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:#ffffff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(192,38,211,0.35)">
          Accéder à mon dashboard →
        </a>
      </div>
      <div style="border-top:1px solid #f3f4f6;padding-top:24px">
        <div style="display:inline-flex;align-items:center;gap:14px">
          <div style="width:44px;height:44px;border-radius:50%;background:#c026d3;text-align:center;line-height:44px;color:#fff;font-weight:700;font-size:14px">CVD</div>
          <div>
            <div style="font-weight:600;color:#1a1a2e;font-size:14px">L'équipe Carte Visite Digitale</div>
            <div style="color:#6b7280;font-size:13px;margin-top:2px">Une question ? Réponds directement à cet email, on lit tout. 🙏</div>
          </div>
        </div>
      </div>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0;line-height:1.6">
      Tu reçois cet email car tu viens d'activer ton compte Carte Visite Digitale (plan gratuit).
    </p>
  </div>
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
      from: "CVD Notifs <bilel@convertilab.com>",
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

    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");

    const adminSupabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { email, userId } = data;
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
