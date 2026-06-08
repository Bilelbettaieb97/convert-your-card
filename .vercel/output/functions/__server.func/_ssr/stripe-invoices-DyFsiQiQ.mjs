import { c as createServerRpc } from "./createServerRpc-BQV1XdAy.mjs";
import { c as createServerFn } from "./server-tFfzel3D.mjs";
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
const getStripeInvoices_createServerFn_handler = createServerRpc({
  id: "73033594ac1edfd8b627fe3a9eeccaaab479f666cbb41cc712f872db98fad95d",
  name: "getStripeInvoices",
  filename: "src/fns/stripe-invoices.ts"
}, (opts) => getStripeInvoices.__executeServer(opts));
const getStripeInvoices = createServerFn({
  method: "POST"
}).validator(objectType({
  customerId: stringType()
})).handler(getStripeInvoices_createServerFn_handler, async ({
  data
}) => {
  const list = await stripe.invoices.list({
    customer: data.customerId,
    limit: 12
  });
  return list.data.map((inv) => ({
    id: inv.id,
    number: inv.number ?? inv.id,
    amount: inv.amount_paid,
    currency: inv.currency,
    status: inv.status,
    created: inv.created,
    pdf: inv.invoice_pdf ?? null,
    period_start: inv.period_start,
    period_end: inv.period_end
  }));
});
export {
  getStripeInvoices_createServerFn_handler
};
