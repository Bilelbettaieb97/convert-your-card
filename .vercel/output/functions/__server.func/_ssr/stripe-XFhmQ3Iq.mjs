import { S as Stripe } from "../_libs/stripe.mjs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia"
});
const PRICE_IDS = {
  essentielle: {
    monthly: process.env.STRIPE_PRICE_ESSENTIELLE_MONTHLY ?? "",
    yearly: process.env.STRIPE_PRICE_ESSENTIELLE_YEARLY ?? ""
  },
  vitrine: {
    monthly: process.env.STRIPE_PRICE_VITRINE_MONTHLY ?? "",
    yearly: process.env.STRIPE_PRICE_VITRINE_YEARLY ?? ""
  }
};
export {
  PRICE_IDS as P,
  stripe as s
};
