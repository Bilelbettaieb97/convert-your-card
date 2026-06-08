import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe, PRICE_IDS } from "@/lib/stripe";

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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: data.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan: data.plan, billing: data.billing, email: data.email },
      success_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan: data.plan, email: data.email },
        ...(data.plan === "vitrine" ? { trial_period_days: 7 } : {}),
      },
    });

    return { url: session.url };
  });
