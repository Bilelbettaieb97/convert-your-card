import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe, PRICE_IDS } from "@/lib/stripe";
import { adminSupabase } from "@/lib/supabase-admin";

const schema = z.object({
  plan: z.enum(["essentielle", "vitrine"]),
  billing: z.enum(["monthly", "yearly"]),
  email: z.string().email(),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
    const priceId = PRICE_IDS[data.plan][data.billing];

    if (!priceId) throw new Error(`Prix introuvable pour ${data.plan}/${data.billing}`);

    const isVitrine = data.plan === "vitrine";

    // Vérifier si ce compte a déjà consommé son essai — server-side, non falsifiable
    let hadTrial = false;
    let existingCustomerId: string | null = null;

    if (isVitrine) {
      const { data: profile } = await adminSupabase
        .from("nfc_profiles")
        .select("user_id")
        .eq("email", data.email)
        .maybeSingle();

      if (profile?.user_id) {
        const { data: sub } = await adminSupabase
          .from("subscriptions")
          .select("stripe_customer_id")
          .eq("user_id", profile.user_id)
          .maybeSingle();

        // Si une subscription Stripe existe déjà → cet utilisateur a déjà fait un checkout (trial consommé)
        hadTrial = !!sub?.stripe_customer_id;
        existingCustomerId = sub?.stripe_customer_id ?? null;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      // Réutiliser le customer Stripe existant si disponible (évite les doublons)
      ...(existingCustomerId
        ? { customer: existingCustomerId }
        : { customer_email: data.email }),
      payment_method_collection: isVitrine && !hadTrial ? "if_required" : "always",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan: data.plan, billing: data.billing, email: data.email },
      success_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan: data.plan, email: data.email },
        // Trial uniquement si Vitrine ET jamais essayé — impossible à contourner côté client
        ...(isVitrine && !hadTrial ? {
          trial_period_days: 3,
          trial_settings: {
            end_behavior: { missing_payment_method: "cancel" },
          },
        } : {}),
      },
    } as Parameters<typeof stripe.checkout.sessions.create>[0]);

    return { url: session.url };
  });
