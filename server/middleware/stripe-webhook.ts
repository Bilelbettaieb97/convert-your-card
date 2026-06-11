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
  const MAX_AGE_SECONDS = 300;
  if (Math.floor(Date.now() / 1000) - parseInt(timestamp, 10) > MAX_AGE_SECONDS) {
    return false;
  }
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

async function sendAdminNotification(email: string, plan: string, slug: string) {
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

function getFirstName(nom: string, email: string): string {
  const trimmed = (nom || "").trim();
  const first = trimmed.split(" ")[0] || "";
  if (!first || (first === first.toLowerCase() && !trimmed.includes(" "))) {
    const prefix = email.split("@")[0];
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
  return first.charAt(0).toUpperCase() + first.slice(1);
}

async function sendWelcomeEmail(
  email: string,
  nom: string,
  slug: string,
  _plan: string,
) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const cardUrl = `${appUrl}/${slug}`;
  const dashboardUrl = `${appUrl}/dashboard`;
  const firstName = getFirstName(nom, email);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Carte Visite Digitale <contact@cartevisitedigitale.fr>",
      to: email,
      subject: `${firstName}, ta carte Vitrine est en ligne. Ton essai démarre maintenant.`,
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
    <p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Plan Vitrine · Essai 3 jours</p>
  </td></tr>
  <tr><td style="padding-bottom:22px;">
    <p style="margin:0;font-size:30px;font-weight:800;line-height:1.2;color:#0f0f14;letter-spacing:-0.5px;">Ta carte est en ligne.<br>Ton essai démarre maintenant.</p>
  </td></tr>
  <tr><td style="padding-bottom:24px;">
    <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Merci pour ta confiance. Ton essai de 3 jours commence maintenant — tu peux annuler à tout moment depuis ton dashboard, sans frais.</p>
  </td></tr>

  <tr><td style="padding-bottom:22px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
    <tr><td style="padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.6px;">Ton lien public</p>
      <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f0f14;word-break:break-all;">${cardUrl}</p>
      <p style="margin:0;font-size:12px;color:#6b7280;">Partage ce lien ou génère ton QR code depuis le dashboard.</p>
    </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding-bottom:24px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;">
    <tr><td style="padding:18px 20px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0f0f14;">Ce que tu as en plus avec Vitrine :</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="padding:4px 0;font-size:14px;color:#374151;">&#10003; &nbsp;Bouton WhatsApp direct sur ta carte</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#374151;">&#10003; &nbsp;Galerie photos / portfolio</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#374151;">&#10003; &nbsp;Statistiques avancées (clics, sources)</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#374151;">&#10003; &nbsp;Lien de prise de RDV intégré</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#374151;">&#10003; &nbsp;Suppression de la mention CVD</td></tr>
      </table>
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
    <p style="margin:0;font-size:12px;color:#9ca3af;">Essai 3 jours · Annulable à tout moment · Aucun frais avant la fin de l'essai</p>
  </td></tr>

  <tr><td style="border-top:1px solid #f3f4f6;padding:20px 0 32px;">
    <p style="margin:0;font-size:14px;font-weight:600;color:#0f0f14;">L'équipe Carte Visite Digitale</p>
    <p style="margin:4px 0 0;font-size:13px;color:#9ca3af;">On lit tous les emails. N'hésite pas à répondre directement.</p>
  </td></tr>
</table></td></tr></table>
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

    // Find user by email via RPC — évite la limite de pagination listUsers() (50 max par défaut)
    const { data: userIdData } = await adminSupabase.rpc("get_user_id_by_email", { email_param: email });
    const userId: string | null = userIdData ?? null;
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

    // Fetch real subscription status + trial_end from Stripe
    let subscriptionStatus = "trialing"; // défaut sécurisé : on ne facture pas par erreur
    let trialEnd: string | null = null;
    if (stripeSubscriptionId) {
      try {
        const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
        if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not set");
        const subRes = await fetch(`https://api.stripe.com/v1/subscriptions/${stripeSubscriptionId}`, {
          headers: { Authorization: `Bearer ${stripeKey}` },
        });
        if (!subRes.ok) throw new Error(`Stripe API ${subRes.status}`);
        const stripeSub = await subRes.json() as { status?: string; trial_end?: number };
        if (stripeSub.status) subscriptionStatus = stripeSub.status;
        if (stripeSub.trial_end) trialEnd = new Date(stripeSub.trial_end * 1000).toISOString();
        console.log("[stripe-webhook] Subscription status from Stripe:", subscriptionStatus, "trial_end:", trialEnd);
      } catch (e) {
        console.error("[stripe-webhook] Could not fetch subscription, defaulting to trialing:", e);
      }
    }

    // Upsert subscription — CRITIQUE : retourne 500 si échec → Stripe retry automatique
    if (userId) {
      const { error: upsertErr } = await adminSupabase.from("subscriptions").upsert(
        { user_id: userId, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, plan, status: subscriptionStatus, current_period_end: trialEnd, had_trial: trialEnd !== null, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
      if (upsertErr) {
        console.error("[stripe-webhook] CRITICAL: subscription upsert failed:", upsertErr.message);
        return new Response("DB write failed", { status: 500 });
      }
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
    const inactiveStatuses = ["past_due", "canceled", "incomplete_expired", "unpaid"];
    const isInactive = inactiveStatuses.includes(sub.status);

    const { data: subRow } = await adminSupabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", sub.id)
      .maybeSingle();

    const updatePayload: Record<string, unknown> = {
      plan: isInactive ? "free" : (sub.metadata?.plan ?? "essentielle"),
      status: sub.status,
      current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    };
    if (sub.trial_end) updatePayload.had_trial = true;

    await adminSupabase.from("subscriptions")
      .update(updatePayload)
      .eq("stripe_subscription_id", sub.id);

    if (isInactive && subRow?.user_id) {
      await adminSupabase.from("nfc_profiles")
        .update({ actif: false, plan: "free" })
        .eq("user_id", subRow.user_id);
      console.log(`[stripe-webhook] Subscription ${sub.status} — card deactivated for user:`, subRow.user_id);
    }

  } else if (stripeEvent.type === "customer.subscription.deleted") {
    const sub = stripeEvent.data.object;
    const { data: subRow } = await adminSupabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", sub.id)
      .maybeSingle();
    await Promise.all([
      adminSupabase.from("subscriptions")
        .update({ plan: "free", status: "canceled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", sub.id),
      subRow?.user_id
        ? adminSupabase.from("nfc_profiles")
            .update({ actif: false, plan: "free" })
            .eq("user_id", subRow.user_id)
        : Promise.resolve(),
    ]);
    console.log("[stripe-webhook] Subscription canceled — card deactivated for user:", subRow?.user_id ?? "unknown");
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
