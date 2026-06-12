import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

const schema = z.object({
  finish: z.enum(["mat", "brillant", "metal"]),
  color: z.string(),
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  userId: z.string().optional(),
});

export const createNfcCheckoutSession = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
    const unitAmount = data.finish === "metal" ? 3900 : 2900;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: data.email,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Carte NFC physique personnalisée",
              description: `Couleur : ${data.color} · Finition : ${data.finish} · Nom : ${data.name} · ${data.role}`,
              images: ["https://www.cartevisitedigitale.fr/og-image.jpg"],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "nfc_card",
        color: data.color,
        finish: data.finish,
        name: data.name,
        role: data.role,
        email: data.email,
        user_id: data.userId ?? "",
      },
      success_url: `${appUrl}/dashboard?nfc=success`,
      cancel_url: `${appUrl}/carte-physique`,
      allow_promotion_codes: true,
    });

    return { url: session.url };
  });
