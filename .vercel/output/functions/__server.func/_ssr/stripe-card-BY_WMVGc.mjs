import { c as createServerRpc } from "./createServerRpc-BeEwVLsO.mjs";
import { c as createServerFn } from "./server-Boi67Kot.mjs";
import { s as stripe } from "./stripe-XFhmQ3Iq.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/stripe.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const getStripeCard_createServerFn_handler = createServerRpc({
  id: "42940a7c372e29724e93284d98b4c48664406802d496bfae41a4d75b04cc26f3",
  name: "getStripeCard",
  filename: "src/fns/stripe-card.ts"
}, (opts) => getStripeCard.__executeServer(opts));
const getStripeCard = createServerFn({
  method: "POST"
}).validator(objectType({
  email: stringType().email(),
  customerId: stringType().optional()
})).handler(getStripeCard_createServerFn_handler, async ({
  data
}) => {
  let customerId = data.customerId;
  if (!customerId) {
    const customers = await stripe.customers.list({
      email: data.email,
      limit: 1
    });
    if (!customers.data.length) return null;
    customerId = customers.data[0].id;
  }
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
    limit: 1
  });
  const pm = paymentMethods.data[0];
  if (!pm?.card) return null;
  return {
    customerId,
    brand: pm.card.brand,
    last4: pm.card.last4,
    exp_month: pm.card.exp_month,
    exp_year: pm.card.exp_year
  };
});
export {
  getStripeCard_createServerFn_handler
};
