import { defineEventHandler, readBody } from "h3";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

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

export default defineEventHandler(async (event) => {
  if (event.path !== "/api/checkout-embedded" || event.method !== "POST") return;

  const body = await readBody(event);
  const { plan, billing, email } = body ?? {};

  if (!plan || !billing || !email) {
    return new Response(JSON.stringify({ error: "plan, billing et email requis" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const priceId = PRICE_IDS[plan]?.[billing];
  if (!priceId) {
    return new Response(JSON.stringify({ error: "Plan ou billing invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
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
  });

  return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
    headers: { "Content-Type": "application/json" },
  });
});
