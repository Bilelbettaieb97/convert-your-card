import { defineEventHandler, readRawBody, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

async function verifyStripeSignature(
  body: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const parts = signature.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const sig = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!timestamp || !sig) return false;
  const payload = `${timestamp}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const computed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  const computedHex = Array.from(new Uint8Array(computed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return computedHex === sig;
}

async function sendTrialEndingEmail(email: string, nom: string, trialEndDate: Date) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const firstName = nom.split(" ")[0];
  const dateStr = trialEndDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Bilel · Carte Visite Digitale <bilel@convertilab.com>",
      to: email,
      subject: `⏰ Ton essai gratuit Carte Visite Digitale se termine demain`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
        <h1 style="color:#1a1a2e">Ton essai se termine demain 🕐</h1>
        <p style="color:#6b7280">Salut ${firstName}, ton essai gratuit Carte Visite Digitale se termine le <strong>${dateStr}</strong>.</p>
        <p style="color:#6b7280">À partir de là, ton abonnement sera automatiquement activé et ta carte bancaire sera débitée.</p>
        <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:12px;padding:20px;margin:24px 0">
          <p style="margin:0;color:#92400e;font-weight:600">Tu veux annuler ?</p>
          <p style="margin:8px 0 0;color:#92400e;font-size:14px">Rends-toi dans ton dashboard → Abonnement → Annuler avant minuit ce soir.</p>
        </div>
        <a href="${appUrl}/dashboard/abonnement" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600">Gérer mon abonnement →</a>
        <p style="margin-top:24px;color:#9ca3af;font-size:12px">Si tu continues, merci de nous faire confiance. Annulable à tout moment depuis ton dashboard.</p>
      </div>`,
    }),
  });
}

async function sendAdminNotification(email: string, plan: string, slug: string) {
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
      subject: `🆕 Nouveau client CVD — ${email} (${plan})`,
      html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px 20px;background:#f9fafb;border-radius:12px">
        <h2 style="color:#1a1a2e;margin:0 0 16px">Nouveau client 🎉</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px">Email</td><td style="font-weight:600;color:#1a1a2e">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Plan</td><td style="font-weight:600;color:#c026d3;text-transform:capitalize">${plan}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Carte</td><td><a href="${appUrl}/${slug}" style="color:#c026d3">${appUrl}/${slug}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="color:#1a1a2e">${now}</td></tr>
        </table>
      </div>`,
    }),
  });
}

async function sendWelcomeEmail(
  email: string,
  nom: string,
  slug: string,
  plan: string,
) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const cardUrl = `${appUrl}/${slug}`;
  const dashboardUrl = `${appUrl}/dashboard`;
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const firstName = nom.split(" ")[0];

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Bilel · Carte Visite Digitale <bilel@convertilab.com>",
      to: email,
      subject: `Bienvenue ${firstName} — ta carte est en ligne 🎉`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:580px;margin:40px auto;padding:0 16px 40px">

    <!-- Header gradient -->
    <div style="background:linear-gradient(135deg,#c026d3,#7c3aed);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50px;padding:6px 18px;font-size:12px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;margin-bottom:20px">Carte Visite Digitale</div>
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.3">Bienvenue, ${firstName} ! 🎉</h1>
      <p style="margin:12px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Ta carte de visite digitale est prête et en ligne.</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">

      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7">
        Félicitations pour ton plan <strong style="color:#c026d3">${planLabel}</strong> — tu fais maintenant partie des professionnels qui partagent leur profil en 1 tap. 🚀
      </p>

      <!-- Card URL block -->
      <div style="background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;border-radius:12px;padding:24px;margin-bottom:28px;text-align:center">
        <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px">🔗 Ton lien public</p>
        <a href="${cardUrl}" style="font-size:16px;font-weight:700;color:#7c3aed;text-decoration:none;word-break:break-all">${cardUrl}</a>
        <p style="margin:10px 0 0;font-size:12px;color:#9ca3af">Partage ce lien ou génère un QR code depuis ton dashboard</p>
      </div>

      <!-- Steps -->
      <p style="margin:0 0 14px;font-size:14px;font-weight:600;color:#1a1a2e">3 premières choses à faire :</p>
      <div style="margin-bottom:10px;display:flex;align-items:flex-start;gap:12px">
        <div style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed;text-align:center;line-height:28px">1</div>
        <div style="padding-top:4px;color:#374151;font-size:14px">Ajoute ta photo, ton logo et tes coordonnées dans <strong>Ma carte</strong></div>
      </div>
      <div style="margin-bottom:10px;display:flex;align-items:flex-start;gap:12px">
        <div style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed;text-align:center;line-height:28px">2</div>
        <div style="padding-top:4px;color:#374151;font-size:14px">Génère ton QR code et enregistre-le dans tes favoris</div>
      </div>
      <div style="margin-bottom:28px;display:flex;align-items:flex-start;gap:12px">
        <div style="min-width:28px;height:28px;background:#f3e8ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed;text-align:center;line-height:28px">3</div>
        <div style="padding-top:4px;color:#374151;font-size:14px">Partage ton lien dans ta bio Instagram, ta signature email et tes messages</div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:32px">
        <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:#ffffff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(192,38,211,0.35)">
          Accéder à mon dashboard →
        </a>
      </div>

      <!-- Signature -->
      <div style="border-top:1px solid #f3f4f6;padding-top:24px;display:flex;align-items:center;gap:14px">
        <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#c026d3,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;text-align:center;line-height:44px">B</div>
        <div>
          <div style="font-weight:600;color:#1a1a2e;font-size:14px">Bilel, fondateur de Carte Visite Digitale</div>
          <div style="color:#6b7280;font-size:13px;margin-top:2px">Une question ? Réponds directement à cet email, je lis tout. 🙏</div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0;line-height:1.6">
      Tu reçois cet email car tu viens d'activer ton abonnement Carte Visite Digitale.<br>
      <a href="${appUrl}/dashboard" style="color:#9ca3af">Se désabonner</a>
    </p>

  </div>
</body>
</html>`,
    }),
  });
}

export default defineEventHandler(async (event) => {
  // Only intercept POST /webhook/stripe — let everything else pass through
  if (event.path !== "/webhook/stripe" || event.method !== "POST") {
    return;
  }

  const body = await readRawBody(event, "utf8");
  if (!body) {
    return new Response("No body", { status: 400 });
  }

  const signature = getHeader(event, "stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return new Response("Misconfigured", { status: 500 });
  }

  const isValid = await verifyStripeSignature(body, signature, webhookSecret);
  if (!isValid) {
    console.error("[stripe-webhook] Invalid Stripe signature");
    return new Response("Invalid signature", { status: 400 });
  }

  const stripeEvent = JSON.parse(body);
  console.log("[stripe-webhook] Event received:", stripeEvent.type);

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!serviceKey) {
    console.error("[stripe-webhook] SUPABASE_SERVICE_ROLE_KEY not set");
    return new Response("Misconfigured", { status: 500 });
  }

  const adminSupabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const email: string = session.metadata?.email || session.customer_email;
    const plan: string = session.metadata?.plan || "essentielle";
    const stripeCustomerId: string = session.customer;
    const stripeSubscriptionId: string = session.subscription;

    if (!email) {
      console.error("[stripe-webhook] No email in session");
      return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user by email
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const user = users?.find((u: { email?: string }) => u.email === email);
    const userId = user?.id ?? null;
    console.log("[stripe-webhook] User found:", userId ? "yes" : "no (email: " + email + ")");

    // Generate unique slug
    const slugBase = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 25);
    let slug = slugBase;
    let attempt = 0;
    while (true) {
      const { data: existing } = await adminSupabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      attempt++;
      slug = `${slugBase}-${attempt}`;
    }

    // Create or update nfc_profile
    let profileSlug = slug;
    let profileNom = email.split("@")[0];
    if (userId) {
      const { data: existing } = await adminSupabase.from("nfc_profiles").select("id,slug,nom").eq("user_id", userId).maybeSingle();
      if (existing) {
        profileSlug = existing.slug;
        if (existing.nom) profileNom = existing.nom;
        await adminSupabase.from("nfc_profiles").update({ plan, actif: true }).eq("id", existing.id);
        console.log("[stripe-webhook] Updated existing profile:", profileSlug);
      } else {
        const { data: newProfile } = await adminSupabase
          .from("nfc_profiles")
          .insert({ slug, nom: profileNom, email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true, user_id: userId })
          .select("slug,nom").single();
        if (newProfile) { profileSlug = newProfile.slug; if (newProfile.nom) profileNom = newProfile.nom; }
        console.log("[stripe-webhook] Created new profile:", profileSlug);
      }
    } else {
      // User hasn't signed up yet — create profile without user_id
      const { data: newProfile } = await adminSupabase
        .from("nfc_profiles")
        .insert({ slug, nom: profileNom, email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true })
        .select("slug,nom").single();
      if (newProfile) { profileSlug = newProfile.slug; if (newProfile.nom) profileNom = newProfile.nom; }
      console.log("[stripe-webhook] Created profile (no user):", profileSlug);
    }

    // Upsert subscription
    if (userId) {
      await adminSupabase.from("subscriptions").upsert(
        { user_id: userId, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, plan, status: "active", updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    }

    // Send welcome email + admin notification
    try {
      await sendWelcomeEmail(email, profileNom, profileSlug, plan);
      console.log("[stripe-webhook] Welcome email sent to:", email);
    } catch (e) {
      console.error("[stripe-webhook] Email error:", e);
    }
    try {
      await sendAdminNotification(email, plan, profileSlug);
      console.log("[stripe-webhook] Admin notification sent");
    } catch (e) {
      console.error("[stripe-webhook] Admin notification error:", e);
    }

  } else if (stripeEvent.type === "customer.subscription.updated") {
    const sub = stripeEvent.data.object;
    await adminSupabase.from("subscriptions")
      .update({ plan: sub.metadata?.plan ?? "essentielle", status: sub.status, current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null, updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", sub.id);

  } else if (stripeEvent.type === "customer.subscription.trial_will_end") {
    const sub = stripeEvent.data.object;
    const trialEnd = new Date(sub.trial_end * 1000);
    // Find user by stripe customer ID
    const { data: subscription } = await adminSupabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", sub.id)
      .maybeSingle();
    if (subscription?.user_id) {
      const { data: { user } } = await adminSupabase.auth.admin.getUserById(subscription.user_id);
      if (user?.email) {
        const nom = user.email.split("@")[0];
        await sendTrialEndingEmail(user.email, nom, trialEnd);
        console.log("[stripe-webhook] Trial ending email sent to:", user.email);
      }
    }

  } else if (stripeEvent.type === "customer.subscription.deleted") {
    const sub = stripeEvent.data.object;
    await adminSupabase.from("subscriptions")
      .update({ plan: "free", status: "canceled", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", sub.id);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
