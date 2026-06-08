import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

export const getStripeInvoices = createServerFn({ method: "POST" })
  .validator(z.object({ customerId: z.string() }))
  .handler(async ({ data }) => {
    const list = await stripe.invoices.list({ customer: data.customerId, limit: 12 });
    return list.data.map((inv) => ({
      id: inv.id,
      number: inv.number ?? inv.id,
      amount: inv.amount_paid,
      currency: inv.currency,
      status: inv.status,
      created: inv.created,
      pdf: inv.invoice_pdf ?? null,
      period_start: inv.period_start,
      period_end: inv.period_end,
    }));
  });
