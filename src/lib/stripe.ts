import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

export function generateSlug(nom: string): string {
  return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
}

export async function ensureUniqueSlug(
  baseSlug: string,
  checkExists: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = baseSlug;
  let attempt = 0;
  while (await checkExists(slug)) {
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
  return slug;
}

export const PRICE_IDS = {
  essentielle: {
    monthly: process.env.STRIPE_PRICE_ESSENTIELLE_MONTHLY ?? "",
    yearly: process.env.STRIPE_PRICE_ESSENTIELLE_YEARLY ?? "",
  },
  vitrine: {
    monthly: process.env.STRIPE_PRICE_VITRINE_MONTHLY ?? "",
    yearly: process.env.STRIPE_PRICE_VITRINE_YEARLY ?? "",
  },
} as const;

export type PlanId = keyof typeof PRICE_IDS;
export type BillingPeriod = "monthly" | "yearly";
