import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

const PRICE_IDS: Record<string, Record<string, string>> = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_STARTER_ANNUAL ?? "",
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL ?? "",
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL ?? "",
  },
};

const TRIAL_PLANS = ["pro", "premium"];

const schema = z.object({
  plan: z.enum(["starter", "pro", "premium"]),
  billing: z.enum(["monthly", "annual"]),
  email: z.string().email(),
});

export const createEmbeddedCheckout = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const { plan, billing, email } = data;
    const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
    const priceId = PRICE_IDS[plan]?.[billing];

    if (!priceId) throw new Error(`Prix introuvable pour ${plan}/${billing}`);

    const hasTrial = TRIAL_PLANS.includes(plan);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan, billing, email },
      return_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan, email },
        ...(hasTrial ? { trial_period_days: 7 } : {}),
      },
    } as unknown as Parameters<typeof stripe.checkout.sessions.create>[0]);

    return { clientSecret: session.client_secret ?? "" };
  });
