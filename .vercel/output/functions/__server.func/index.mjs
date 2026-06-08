globalThis.__nitro_main__ = import.meta.url;
import { H as HTTPError, d as defineEventHandler, r as readRawBody, g as getHeader, a as readBody, s as setResponseHeader, t as toEventHandler, b as defineLazyEventHandler, c as H3Core } from "./_libs/h3.mjs";
import { N as NodeResponse } from "./_libs/srvx.mjs";
import { c as createClient } from "./_libs/supabase__supabase-js.mjs";
import { S as Stripe } from "./_libs/stripe.mjs";
import "./_libs/rou3.mjs";
import "node:stream";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "crypto";
import "events";
import "http";
import "https";
import "os";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
async function verifyStripeSignature(body, signature, secret) {
  const parts = signature.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const sig = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!timestamp || !sig) return false;
  const payload = `${timestamp}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const computed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  const computedHex = Array.from(new Uint8Array(computed)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return computedHex === sig;
}
async function sendTrialEndingEmail(email, nom, trialEndDate) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
  const firstName = nom.split(" ")[0];
  const dateStr = trialEndDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Bilel · OneTap <bilel@convertilab.com>",
      to: email,
      subject: `⏰ Ton essai gratuit OneTap se termine demain`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
        <h1 style="color:#1a1a2e">Ton essai se termine demain 🕐</h1>
        <p style="color:#6b7280">Salut ${firstName}, ton essai gratuit OneTap se termine le <strong>${dateStr}</strong>.</p>
        <p style="color:#6b7280">À partir de là, ton abonnement sera automatiquement activé et ta carte bancaire sera débitée.</p>
        <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:12px;padding:20px;margin:24px 0">
          <p style="margin:0;color:#92400e;font-weight:600">Tu veux annuler ?</p>
          <p style="margin:8px 0 0;color:#92400e;font-size:14px">Rends-toi dans ton dashboard → Abonnement → Annuler avant minuit ce soir.</p>
        </div>
        <a href="${appUrl}/dashboard/abonnement" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600">Gérer mon abonnement →</a>
        <p style="margin-top:24px;color:#9ca3af;font-size:12px">Si tu continues, merci de nous faire confiance. Annulable à tout moment depuis ton dashboard.</p>
      </div>`
    })
  });
}
async function sendWelcomeEmail(email, nom, slug, plan) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
  const cardUrl = `${appUrl}/${slug}`;
  const dashboardUrl = `${appUrl}/dashboard`;
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const firstName = nom.split(" ")[0];
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Bilel · ConvertiLab <bilel@convertilab.com>",
      to: email,
      subject: `🎉 Ta carte OneTap est prête, ${firstName} !`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px"><h1 style="color:#1a1a2e">Ta carte est prête ! 🚀</h1><p style="color:#6b7280">Salut ${firstName}, bienvenue sur OneTap. Ton plan <strong>${planLabel}</strong> est actif.</p><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px"><p style="font-weight:600;margin:0 0 8px;color:#1a1a2e">Ta carte de visite digitale :</p><a href="${cardUrl}" style="color:#c026d3">${cardUrl}</a></div><a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c026d3,#7c3aed);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600">Accéder à mon dashboard →</a></div>`
    })
  });
}
const _NgMPCx = defineEventHandler(async (event) => {
  if (event.path !== "/webhook/stripe" || event.method !== "POST") {
    return;
  }
  const body = await readRawBody(event, "utf8");
  if (!body) {
    return new Response("No body", { status: 400 });
  }
  const signature = getHeader(event, "stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return new Response("Misconfigured", { status: 500 });
  }
  const isValid = await verifyStripeSignature(body, signature, webhookSecret);
  if (!isValid) {
    console.error("[stripe-webhook] Invalid Stripe signature");
    return new Response("Invalid signature", { status: 400 });
  }
  const stripeEvent = JSON.parse(body);
  console.log("[stripe-webhook] Event received:", stripeEvent.type);
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceKey) {
    console.error("[stripe-webhook] SUPABASE_SERVICE_ROLE_KEY not set");
    return new Response("Misconfigured", { status: 500 });
  }
  const adminSupabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const email = session.metadata?.email || session.customer_email;
    const plan = session.metadata?.plan || "essentielle";
    const stripeCustomerId = session.customer;
    const stripeSubscriptionId = session.subscription;
    if (!email) {
      console.error("[stripe-webhook] No email in session");
      return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const user = users?.find((u) => u.email === email);
    const userId = user?.id ?? null;
    console.log("[stripe-webhook] User found:", userId ? "yes" : "no (email: " + email + ")");
    const slugBase = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 25);
    let slug = slugBase;
    let attempt = 0;
    while (true) {
      const { data: existing } = await adminSupabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      attempt++;
      slug = `${slugBase}-${attempt}`;
    }
    let profileSlug = slug;
    if (userId) {
      const { data: existing } = await adminSupabase.from("nfc_profiles").select("id,slug").eq("user_id", userId).maybeSingle();
      if (existing) {
        profileSlug = existing.slug;
        await adminSupabase.from("nfc_profiles").update({ plan, actif: true }).eq("id", existing.id);
        console.log("[stripe-webhook] Updated existing profile:", profileSlug);
      } else {
        const { data: newProfile } = await adminSupabase.from("nfc_profiles").insert({ slug, nom: email.split("@")[0], email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true, user_id: userId }).select("slug").single();
        if (newProfile) profileSlug = newProfile.slug;
        console.log("[stripe-webhook] Created new profile:", profileSlug);
      }
    } else {
      const { data: newProfile } = await adminSupabase.from("nfc_profiles").insert({ slug, nom: email.split("@")[0], email, telephone: "", entreprise: "", fonction: "", plan, boutons: [], reseaux: [], actif: true }).select("slug").single();
      if (newProfile) profileSlug = newProfile.slug;
      console.log("[stripe-webhook] Created profile (no user):", profileSlug);
    }
    if (userId) {
      await adminSupabase.from("subscriptions").upsert(
        { user_id: userId, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, plan, status: "active", updated_at: (/* @__PURE__ */ new Date()).toISOString() },
        { onConflict: "user_id" }
      );
    }
    try {
      await sendWelcomeEmail(email, email.split("@")[0], profileSlug, plan);
      console.log("[stripe-webhook] Welcome email sent to:", email);
    } catch (e) {
      console.error("[stripe-webhook] Email error:", e);
    }
  } else if (stripeEvent.type === "customer.subscription.updated") {
    const sub = stripeEvent.data.object;
    await adminSupabase.from("subscriptions").update({ plan: sub.metadata?.plan ?? "essentielle", status: sub.status, current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1e3).toISOString() : null, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("stripe_subscription_id", sub.id);
  } else if (stripeEvent.type === "customer.subscription.trial_will_end") {
    const sub = stripeEvent.data.object;
    const trialEnd = new Date(sub.trial_end * 1e3);
    const { data: subscription } = await adminSupabase.from("subscriptions").select("user_id").eq("stripe_subscription_id", sub.id).maybeSingle();
    if (subscription?.user_id) {
      const { data: { user } } = await adminSupabase.auth.admin.getUserById(subscription.user_id);
      if (user?.email) {
        const nom = user.email.split("@")[0];
        await sendTrialEndingEmail(user.email, nom, trialEnd);
        console.log("[stripe-webhook] Trial ending email sent to:", user.email);
      }
    }
  } else if (stripeEvent.type === "customer.subscription.deleted") {
    const sub = stripeEvent.data.object;
    await adminSupabase.from("subscriptions").update({ plan: "free", status: "canceled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("stripe_subscription_id", sub.id);
  }
  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" }
  });
});
const _JGJNj0 = defineEventHandler(async (event) => {
  if (event.path !== "/api/signup" || event.method !== "POST") return;
  const body = await readBody(event);
  const { email, password } = body ?? {};
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email et mot de passe requis" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const adminSupabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { data, error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
    // bypass email confirmation
  });
  if (error) {
    const isEmailExists = error.message?.toLowerCase().includes("already") || error.code === "email_exists" || String(error).includes("email_exists");
    if (isEmailExists) {
      return new Response(JSON.stringify({ exists: true }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ success: true, userId: data.user?.id }), {
    headers: { "Content-Type": "application/json" }
  });
});
const PRICE_IDS = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_STARTER_ANNUAL ?? ""
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL ?? ""
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? "",
    annual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL ?? ""
  }
};
const TRIAL_PLANS = ["pro", "premium"];
const _OQri8d = defineEventHandler(async (event) => {
  if (event.path !== "/api/checkout-embedded" || event.method !== "POST") return;
  setResponseHeader(event, "Content-Type", "application/json");
  try {
    const body = await readBody(event);
    const { plan, billing, email } = body ?? {};
    if (!plan || !billing || !email) {
      return new Response(JSON.stringify({ error: "Paramètres manquants" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const priceId = PRICE_IDS[plan]?.[billing];
    if (!priceId) {
      return new Response(JSON.stringify({ error: `Prix introuvable pour ${plan}/${billing}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });
    const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
    const hasTrial = TRIAL_PLANS.includes(plan);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan, billing, email },
      return_url: `${appUrl}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan, email },
        ...hasTrial ? { trial_period_days: 7 } : {}
      }
    });
    return new Response(JSON.stringify({ clientSecret: session.client_secret ?? "" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_mD4TP_ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_mD4TP_ };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_NgMPCx),
  toEventHandler(_JGJNj0),
  toEventHandler(_OQri8d)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
const ISR_URL_PARAM = "__isr_route";
function isrRouteRewrite(reqUrl, xNowRouteMatches) {
  if (xNowRouteMatches) {
    const isrURL = new URLSearchParams(xNowRouteMatches).get(ISR_URL_PARAM);
    if (isrURL) {
      return [decodeURIComponent(isrURL), ""];
    }
  } else {
    const queryIndex = reqUrl.indexOf("?");
    if (queryIndex !== -1) {
      const params = new URLSearchParams(reqUrl.slice(queryIndex + 1));
      const isrURL = params.get(ISR_URL_PARAM);
      if (isrURL) {
        params.delete(ISR_URL_PARAM);
        return [decodeURIComponent(isrURL), params.toString()];
      }
    }
  }
}
const nitroApp = useNitroApp();
const vercel_web = { fetch(req, context) {
  const isrURL = isrRouteRewrite(req.url, req.headers.get("x-now-route-matches"));
  if (isrURL) {
    const { routeRules } = getRouteRules("", isrURL[0]);
    if (routeRules?.isr) {
      req = new Request(new URL(isrURL[0] + (isrURL[1] ? `?${isrURL[1]}` : ""), req.url).href, req);
    }
  }
  req.runtime ??= { name: "vercel" };
  req.runtime.vercel = { context };
  let ip;
  Object.defineProperty(req, "ip", { get() {
    const h = req.headers.get("x-forwarded-for");
    return ip ??= h?.split(",").shift()?.trim();
  } });
  req.waitUntil = context?.waitUntil;
  return nitroApp.fetch(req);
} };
export {
  vercel_web as default
};
