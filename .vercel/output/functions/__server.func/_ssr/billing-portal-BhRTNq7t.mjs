import { c as createServerRpc } from "./createServerRpc-YELjCpVS.mjs";
import { c as createServerFn } from "./server-B4fcZVAR.mjs";
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
const createPortalSession_createServerFn_handler = createServerRpc({
  id: "2e17a70aeffaf4196790c75ccf3602084408674a8cc1fb8f8e0218e607ad3e55",
  name: "createPortalSession",
  filename: "src/fns/billing-portal.ts"
}, (opts) => createPortalSession.__executeServer(opts));
const createPortalSession = createServerFn({
  method: "POST"
}).validator(objectType({
  customerId: stringType(),
  returnUrl: stringType()
})).handler(createPortalSession_createServerFn_handler, async ({
  data
}) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: data.customerId,
    return_url: data.returnUrl
  });
  return {
    url: session.url
  };
});
export {
  createPortalSession_createServerFn_handler
};
