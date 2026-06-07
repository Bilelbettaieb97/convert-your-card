import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe, PRICE_IDS } from "@/lib/stripe";

const schema = z.object({
  plan: z.enum(["starter", "pro", "premium"]),
  billing: z.enum(["monthly", "annual"]),
  email: z.string().email(),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
    const priceId = PRICE_IDS[data.plan][data.billing];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: data.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan: data.plan, billing: data.billing, email: data.email },
      success_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/inscription/selection-de-plan`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan: data.plan, email: data.email },
        ...( ["pro", "premium"].includes(data.plan) ? { trial_period_days: 7 } : {} ),
      },
    });

    return { url: session.url };
  });
