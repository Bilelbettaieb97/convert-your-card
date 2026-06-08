import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

export const createPortalSession = createServerFn({ method: "POST" })
  .validator(z.object({ customerId: z.string(), returnUrl: z.string() }))
  .handler(async ({ data }) => {
    const session = await stripe.billingPortal.sessions.create({
      customer: data.customerId,
      return_url: data.returnUrl,
    });
    return { url: session.url };
  });
