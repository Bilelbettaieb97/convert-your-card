import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

export type CardInfo = {
  customerId: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
};

export const getStripeCard = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), customerId: z.string().optional() }))
  .handler(async ({ data }): Promise<CardInfo | null> => {
    let customerId = data.customerId;

    if (!customerId) {
      const customers = await stripe.customers.list({ email: data.email, limit: 1 });
      if (!customers.data.length) return null;
      customerId = customers.data[0].id;
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
      limit: 1,
    });

    const pm = paymentMethods.data[0];
    if (!pm?.card) return null;

    return {
      customerId,
      brand: pm.card.brand,
      last4: pm.card.last4,
      exp_month: pm.card.exp_month,
      exp_year: pm.card.exp_year,
    };
  });
