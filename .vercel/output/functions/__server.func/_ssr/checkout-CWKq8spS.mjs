import { c as createServerRpc } from "./createServerRpc-DU-ETpVf.mjs";
import { c as createServerFn } from "./server-DVWguj63.mjs";
import { S as Stripe } from "../_libs/stripe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "events";
import "http";
import "https";
import "os";
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
const schema = objectType({
  plan: enumType(["essentielle", "vitrine"]),
  billing: enumType(["monthly", "yearly"]),
  email: stringType().email()
});
const createCheckoutSession_createServerFn_handler = createServerRpc({
  id: "e73a7067186170481118eecabe235613902296d3774a9001243b8a25d55e3d56",
  name: "createCheckoutSession",
  filename: "src/fns/checkout.ts"
}, (opts) => createCheckoutSession.__executeServer(opts));
const createCheckoutSession = createServerFn({
  method: "POST"
}).validator(schema).handler(createCheckoutSession_createServerFn_handler, async ({
  data
}) => {
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const priceId = PRICE_IDS[data.plan][data.billing];
  if (!priceId) throw new Error(`Prix introuvable pour ${data.plan}/${data.billing}`);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: data.email,
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    metadata: {
      plan: data.plan,
      billing: data.billing,
      email: data.email
    },
    success_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        plan: data.plan,
        email: data.email
      },
      ...data.plan === "vitrine" ? {
        trial_period_days: 7
      } : {}
    }
  });
  return {
    url: session.url
  };
});
export {
  createCheckoutSession_createServerFn_handler
};
