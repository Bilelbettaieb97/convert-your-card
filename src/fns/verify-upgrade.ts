import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { adminSupabase } from "@/lib/supabase-admin";

export const verifyUpgrade = createServerFn({ method: "POST" })
  .validator(z.object({ sessionId: z.string().min(10) }))
  .handler(async ({ data }) => {
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(data.sessionId);
    } catch {
      return { ok: false, reason: "stripe_error" };
    }

    // Only upgrade if payment is confirmed
    if (session.status !== "complete" && session.payment_status !== "paid") {
      return { ok: false, reason: "not_paid" };
    }

    const email: string = session.metadata?.email || session.customer_email || "";
    const plan: string  = session.metadata?.plan  || "vitrine";
    const stripeCustomerId   = session.customer as string | null;
    const stripeSubId        = session.subscription as string | null;

    if (!email) return { ok: false, reason: "no_email" };

    // Find profile by email
    const { data: profile } = await adminSupabase
      .from("nfc_profiles")
      .select("id, user_id")
      .eq("email", email)
      .maybeSingle();

    if (!profile) return { ok: false, reason: "profile_not_found" };

    // Force plan update — idempotent if webhook already ran
    await adminSupabase.from("nfc_profiles")
      .update({ plan, actif: true })
      .eq("id", profile.id);

    if (profile.user_id && stripeCustomerId) {
      await adminSupabase.from("subscriptions").upsert(
        {
          user_id: profile.user_id,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubId,
          plan,
          status: "active",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    }

    return { ok: true, plan };
  });
