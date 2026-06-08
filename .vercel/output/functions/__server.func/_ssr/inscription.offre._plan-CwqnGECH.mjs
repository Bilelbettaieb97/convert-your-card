import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { E as EmbeddedCheckoutProvider, a as EmbeddedCheckout } from "../_libs/stripe__react-stripe-js.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { r as Route } from "./router-DhANbJJ1.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a6 as ArrowLeft, Z as Zap, a9 as Clock, u as Star, w as Check, S as Shield } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DmUXhkEI.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/zod.mjs";
const PLANS = {
  starter: {
    name: "Starter",
    tagline: "Pour les pros qui démarrent leur carte digitale.",
    hasTrial: false,
    monthly: {
      price: "6 €",
      note: "par mois, sans engagement"
    },
    annual: {
      price: "4,50 €",
      total: "54 €",
      note: "facturé annuellement",
      saving: "2 mois offerts — économise 18 €"
    },
    groups: [{
      title: "Tout du Free, plus :",
      items: [{
        name: "Thèmes personnalisés",
        desc: "Palettes et thèmes pour matcher ton style."
      }, {
        name: "Capture tes contacts",
        desc: "Collecte et gère les leads qui scannent ta carte."
      }, {
        name: "Liens de redirection",
        desc: "Redirige temporairement vers un lien clé."
      }, {
        name: "Statistiques avancées"
      }]
    }]
  },
  pro: {
    name: "Pro",
    tagline: "Pour les pros qui veulent grandir et convertir.",
    badge: "Recommandé",
    hasTrial: true,
    monthly: {
      price: "13 €",
      note: "par mois, sans engagement"
    },
    annual: {
      price: "10,50 €",
      total: "126 €",
      note: "facturé annuellement",
      saving: "2 mois offerts — économise 30 €"
    },
    groups: [{
      title: "Tout du Starter, plus :",
      items: [{
        name: "Carte entièrement personnalisée",
        desc: "Logo, visuels plein écran, design sur-mesure."
      }, {
        name: "Statistiques complètes",
        desc: "Analyse ce qui convertit le mieux."
      }, {
        name: "Réponses Instagram automatisées",
        desc: "Booste l'engagement via DM automatiques."
      }, {
        name: "Intégrations email",
        desc: "Mailchimp, Google Sheets, Klaviyo…"
      }]
    }]
  },
  premium: {
    name: "Premium",
    tagline: "Pour les équipes & marques qui veulent zéro limite.",
    hasTrial: true,
    monthly: {
      price: "32 €",
      note: "par mois, sans engagement"
    },
    annual: {
      price: "27,50 €",
      total: "330 €",
      note: "facturé annuellement",
      saving: "2 mois offerts — économise 54 €"
    },
    groups: [{
      title: "Tout du Pro, plus :",
      items: [{
        name: "Onboarding concierge",
        desc: "Accompagnement sur-mesure, support prioritaire."
      }, {
        name: "Posts sociaux illimités",
        desc: "Jusqu'à 3 marques simultanées."
      }, {
        name: "0 % de frais sur tes ventes"
      }, {
        name: "100 % des commissions affiliées"
      }]
    }]
  }
};
function OffrePage() {
  const {
    plan
  } = Route.useParams();
  const {
    billing: initialBilling
  } = Route.useSearch();
  const navigate = useNavigate();
  const planId = plan;
  const planData = PLANS[planId];
  const [billing, setBilling] = reactExports.useState(initialBilling);
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const [checkoutKey, setCheckoutKey] = reactExports.useState(0);
  const [mounted, setMounted] = reactExports.useState(false);
  const [stripePromise] = reactExports.useState(() => typeof window !== "undefined" ? loadStripe("pk_live_51SdAxjPH3gwARGh9vf7vSACApDKVxHzejHieS74zrfFgwlhWZtPP0AVDpTGdnT1Km9VXlUu2X67P9pdpUE5oKzp2008OLbiD24") : null);
  reactExports.useEffect(() => {
    setMounted(true);
    const cached = sessionStorage.getItem("onetap_email");
    if (cached) {
      setUserEmail(cached);
    } else {
      supabase.auth.getUser().then(({
        data: {
          user
        }
      }) => {
        if (user?.email) {
          sessionStorage.setItem("onetap_email", user.email);
          setUserEmail(user.email);
        }
      });
    }
  }, []);
  reactExports.useEffect(() => {
    setCheckoutKey((k) => k + 1);
  }, [billing, planId]);
  const fetchClientSecret = reactExports.useCallback(async () => {
    if (!userEmail) return "";
    try {
      const res = await fetch("/api/checkout-embedded", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          plan: planId,
          billing,
          email: userEmail
        })
      });
      if (!res.ok) return "";
      const data = await res.json();
      return data.clientSecret ?? "";
    } catch {
      return "";
    }
  }, [planId, billing, userEmail]);
  if (!planData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Plan introuvable." }) });
  }
  const pricing = billing === "monthly" ? planData.monthly : planData.annual;
  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
  const trialDateStr = trialEndDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "lg:hidden px-4 py-4 border-b border-border flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/inscription/selection-de-plan"
      }), className: "text-muted-foreground hover:text-foreground transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold", children: "OneTap" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-[50%] flex flex-col px-6 py-8 lg:px-12 lg:py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-3 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inscription/selection-de-plan", className: "text-muted-foreground hover:text-foreground transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "OneTap" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full mx-auto lg:mx-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
                "Offre ",
                planData.name
              ] }),
              planData.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/30 px-2.5 py-1 rounded-full", children: planData.badge })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: planData.tagline })
          ] }),
          planData.hasTrial && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3.5 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-800 dark:text-emerald-300", children: "Essai gratuit 7 jours — 0 € débité aujourd'hui" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-700 dark:text-emerald-400 mt-0.5", children: [
                "Rappel par email 1 jour avant la fin (",
                trialDateStr,
                "). Annulable sans frais."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center bg-muted rounded-full p-1 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBilling("monthly"), className: ["px-5 py-1.5 rounded-full text-sm font-semibold transition-all", billing === "monthly" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"].join(" "), children: "Mensuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setBilling("annual"), className: ["px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5", billing === "annual" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"].join(" "), children: [
              "Annuel",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded-full", children: "-25%" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 rounded-2xl border border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground", children: pricing.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/ mois" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: pricing.note }),
            billing === "annual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
              planData.annual.saving
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-6", children: planData.groups.map((group, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            group.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: group.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: group.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-magenta/15 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-magenta" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: item.name }),
                item.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.desc })
              ] })
            ] }, i)) })
          ] }, gi)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-emerald-500" }),
              "Paiement sécurisé SSL"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
              "Sans engagement"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
              "Annulable à tout moment"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-[50%] border-t lg:border-t-0 lg:border-l border-border bg-background", children: !mounted || !stripePromise ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Chargement du paiement…" }) }) : !userEmail ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Tu dois être connecté pour accéder au paiement." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/connexion", className: "bg-gradient-cta text-primary-foreground rounded-full px-6 py-2.5 text-sm font-semibold", children: "Se connecter" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckoutProvider, { stripe: stripePromise, options: {
        fetchClientSecret
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckout, {}) }, String(checkoutKey)) })
    ] })
  ] });
}
export {
  OffrePage as component
};
