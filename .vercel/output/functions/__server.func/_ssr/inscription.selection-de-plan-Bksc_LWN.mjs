import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { P as PromoBar, N as Nav, F as Footer } from "./router-DVFDHH1d.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { Z as Zap, a6 as Check, y as Sparkles, S as Shield, a9 as Star, e as Clock, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-7UunodIv.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client-CrY6GqN9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/zod.mjs";
const PLANS = [{
  id: "free",
  name: "Free",
  tagline: "Commence à partager tes contacts dès aujourd'hui.",
  monthly: {
    price: "0 €"
  },
  annual: {
    price: "0 €",
    saving: ""
  },
  cta: "Commencer gratuitement",
  features: [{
    label: "Liens illimités"
  }, {
    label: "Icônes sociales, vidéos & médias"
  }, {
    label: "QR code unique"
  }, {
    label: "Statistiques essentielles"
  }, {
    label: "Design optimisé SEO"
  }]
}, {
  id: "starter",
  name: "Starter",
  tagline: "Personnalise ta carte et capte tes premiers leads.",
  monthly: {
    price: "6 €",
    cents: "/mois"
  },
  annual: {
    price: "4,50 €",
    cents: "/mois",
    saving: "Économise 18 €/an"
  },
  cta: "Commencer",
  features: [{
    label: "Tout du Free",
    inherited: true
  }, {
    label: "Thèmes personnalisés"
  }, {
    label: "Capture de contacts / leads"
  }, {
    label: "Liens de redirection"
  }, {
    label: "Statistiques avancées"
  }]
}, {
  id: "pro",
  name: "Pro",
  tagline: "Convertis chaque scan en opportunité business.",
  monthly: {
    price: "13 €",
    cents: "/mois"
  },
  annual: {
    price: "10,50 €",
    cents: "/mois",
    saving: "Économise 30 €/an"
  },
  cta: "Démarrer l'essai gratuit",
  highlight: true,
  hasTrial: true,
  features: [{
    label: "Tout du Starter",
    inherited: true
  }, {
    label: "Carte 100 % sur-mesure"
  }, {
    label: "Statistiques complètes"
  }, {
    label: "Réponses Instagram automatisées"
  }, {
    label: "Raccourcisseur de liens"
  }, {
    label: "Intégrations email (Mailchimp…)"
  }]
}, {
  id: "premium",
  name: "Premium",
  tagline: "Zéro limite pour les équipes & marques ambitieuses.",
  monthly: {
    price: "32 €",
    cents: "/mois"
  },
  annual: {
    price: "27,50 €",
    cents: "/mois",
    saving: "Économise 54 €/an"
  },
  cta: "Démarrer l'essai gratuit",
  hasTrial: true,
  features: [{
    label: "Tout du Pro",
    inherited: true
  }, {
    label: "Onboarding concierge"
  }, {
    label: "Posts sociaux illimités"
  }, {
    label: "Réponses Instagram illimitées"
  }, {
    label: "0 % de frais de vente"
  }, {
    label: "100 % commissions affiliées"
  }]
}];
function PlanSelectionPage() {
  const navigate = useNavigate();
  const [billing, setBilling] = reactExports.useState("monthly");
  reactExports.useEffect(() => {
    const pk = "pk_live_51SdAxjPH3gwARGh9vf7vSACApDKVxHzejHieS74zrfFgwlhWZtPP0AVDpTGdnT1Km9VXlUu2X67P9pdpUE5oKzp2008OLbiD24";
    if (!pk.includes("FILL_IN")) loadStripe(pk);
  }, []);
  function handleSelect(planId) {
    if (planId === "free") {
      navigate({
        to: "/onboarding"
      });
      return;
    }
    navigate({
      to: "/inscription/offre/$plan",
      params: {
        plan: planId
      },
      search: {
        billing
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromoBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet/6 blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-magenta/5 blur-[100px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-2xl px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-5 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-magenta" }),
            "Simple · Transparent · Sans surprise"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl font-display font-bold tracking-tight text-foreground leading-tight", children: [
            "Trouve le forfait",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-foreground", children: "qu'il te faut" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "absolute bottom-1 left-0 right-0 h-[10px] rounded-full opacity-30 -z-0", style: {
                background: "var(--gradient-cta)"
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto", children: "Commence gratuitement. Évolue quand tu es prêt. Annulable à tout moment." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-2xl border border-border bg-muted p-1 gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBilling("monthly"), className: ["px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200", billing === "monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"].join(" "), children: "Mensuel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setBilling("annual"), className: ["relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2", billing === "annual" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"].join(" "), children: [
                "Annuel",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 px-1.5 py-0.5 rounded-full", children: "−2 mois" })
              ] })
            ] }),
            billing === "annual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
              "Économise jusqu'à 54 € — soit 2 mois offerts"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1320px] px-4 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:grid xl:grid-cols-4 gap-5 mb-0 pointer-events-none select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-gradient-cta text-primary-foreground text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-glow mb-0 -mb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            "Le plus populaire"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch", children: PLANS.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlanCard, { plan, billing, onSelect: () => handleSelect(plan.id) }, plan.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-emerald-500" }),
          "Paiement sécurisé Stripe"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
          "Sans engagement"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
          "TVA incluse"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-400", fill: "currentColor" }),
          "4,9/5 Trustpilot"
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function PlanCard({
  plan,
  billing,
  onSelect
}) {
  const isHighlight = !!plan.highlight;
  const pricing = billing === "monthly" ? plan.monthly : plan.annual;
  const saving = plan.annual.saving;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: ["relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300", isHighlight ? "ring-2 ring-magenta/40 shadow-[0_20px_60px_-10px_color-mix(in_oklab,var(--magenta)_30%,transparent)] bg-card" : "border border-border bg-card shadow-card hover:shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--primary)_20%,transparent)] hover:-translate-y-0.5"].join(" "), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: ["px-6 pt-6 pb-5", isHighlight ? "bg-gradient-to-br from-[oklch(0.52_0.27_300)] to-[oklch(0.65_0.27_345)]" : "bg-muted/40"].join(" "), children: [
      plan.hasTrial && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: ["w-3.5 h-3.5", isHighlight ? "text-emerald-300" : "text-emerald-500"].join(" ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["text-xs font-semibold", isHighlight ? "text-emerald-300" : "text-emerald-600 dark:text-emerald-400"].join(" "), children: "Essai 7 jours — 0 € débité aujourd'hui" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: ["text-xl font-display font-bold mb-0.5", isHighlight ? "text-white" : "text-foreground"].join(" "), children: plan.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: ["text-sm leading-snug", isHighlight ? "text-white/75" : "text-muted-foreground"].join(" "), children: plan.tagline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-5 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mb-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-foreground tracking-tight leading-none", children: pricing.price }),
        pricing.cents && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground mb-0.5", children: pricing.cents })
      ] }),
      billing === "annual" && saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
        saving
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: plan.id === "free" ? "Gratuit, pour toujours" : "Facturation mensuelle" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onSelect, className: ["flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-200", isHighlight ? "bg-gradient-cta text-white shadow-glow hover:opacity-90" : plan.id === "free" ? "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50" : "bg-foreground text-background hover:opacity-80"].join(" "), children: [
        plan.cta,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }),
      plan.hasTrial && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-muted-foreground mt-2", children: "Aucun débit pendant 7 jours · Annulable à tout moment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 border-t border-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-5 pb-7 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: plan.features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
      f.inherited ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", isHighlight ? "bg-white/15" : "bg-magenta/10"].join(" "), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: ["w-3 h-3", isHighlight ? "text-white" : "text-magenta"].join(" ") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["text-sm leading-snug", f.inherited ? "text-muted-foreground italic" : "text-foreground"].join(" "), children: f.label })
    ] }, i)) }) })
  ] });
}
export {
  PlanSelectionPage as component
};
