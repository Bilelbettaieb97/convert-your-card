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

async function sendWelcomeEmail(
  email: string,
  nom: string,
  slug: string,
  plan: string,
) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
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
      from: "Bilel · ConvertiLab <bilel@convertilab.com>",
      to: email,
      subject: `🎉 Ta carte OneTap est prête, ${firstName} !`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px"><h1 style="color:#1a1a2e">Ta carte est prête ! 🚀</h1><p style="color:#6b7280">Salut ${firstName}, bienvenue sur OneTap. Ton plan <strong>${planLabel}</strong> est actif.</p><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px"><p style="font-weight:600;margin:0 0 8px;color:#1a1a2e">Ta carte de visite digitale :</p><a href="${cardUrl}" style="color:#c026d3">${cardUrl}</a></div><a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600">Accéder à mon dashboard →</a></div>`,
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
    const plan: string = session.metadata?.plan || "starter";
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
    console.log("[stripe-webhook] User found:", userId ? "yes" : "no (email:", email, ")");

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
    if (userId) {
      const { data: existing } = await adminSupabase.from("nfc_profiles").select("id,slug").eq("user_id", userId).maybeSingle();
      if (existing) {
        profileSlug = existing.slug;
        await adminSupabase.from("nfc_profiles").update({ plan, actif: true }).eq("id", existing.id);
        console.log("[stripe-webhook] Updated existing profile:", profileSlug);
      } else {
        const { data: newProfile } = await adminSupabase
          .from("nfc_profiles")
          .insert({ slug, nom: email.split("@")[0], email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true, user_id: userId })
          .select("slug").single();
        if (newProfile) profileSlug = newProfile.slug;
        console.log("[stripe-webhook] Created new profile:", profileSlug);
      }
    } else {
      // User hasn't signed up yet — create profile without user_id
      const { data: newProfile } = await adminSupabase
        .from("nfc_profiles")
        .insert({ slug, nom: email.split("@")[0], email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true })
        .select("slug").single();
      if (newProfile) profileSlug = newProfile.slug;
      console.log("[stripe-webhook] Created profile (no user):", profileSlug);
    }

    // Upsert subscription
    if (userId) {
      await adminSupabase.from("subscriptions").upsert(
        { user_id: userId, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, plan, status: "active", updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email, email.split("@")[0], profileSlug, plan);
      console.log("[stripe-webhook] Welcome email sent to:", email);
    } catch (e) {
      console.error("[stripe-webhook] Email error:", e);
    }

  } else if (stripeEvent.type === "customer.subscription.updated") {
    const sub = stripeEvent.data.object;
    await adminSupabase.from("subscriptions")
      .update({ plan: sub.metadata?.plan ?? "starter", status: sub.status, current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null, updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", sub.id);

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
