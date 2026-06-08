import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Toaster } from "./router-D-I6pyhZ.mjs";
import "../_libs/seroval.mjs";
import { a5 as Clock, az as ChevronRight, C as CreditCard, u as Check, X, at as Wifi, S as Shield, aR as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
import "./server-D6quijD3.mjs";
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
const PLAN_META = {
  free: {
    label: "Gratuit",
    price: "0€",
    gradient: "linear-gradient(135deg,#475569,#64748b)",
    color: "#94a3b8"
  },
  starter: {
    label: "Starter",
    price: "6€",
    gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    color: "#3b82f6"
  },
  pro: {
    label: "Pro",
    price: "13€",
    gradient: "linear-gradient(135deg,#7c3aed,#EC4899)",
    color: "#8B5CF6"
  },
  premium: {
    label: "Premium",
    price: "32€",
    gradient: "linear-gradient(135deg,#b45309,#F59E0B)",
    color: "#F59E0B"
  }
};
const PLAN_NEXT = {
  free: "starter",
  starter: "pro",
  pro: "premium",
  premium: null
};
const FEATURES = [{
  label: "Carte de visite digitale",
  free: true,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Partage QR Code + NFC",
  free: true,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Thèmes personnalisables",
  free: true,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Analytics 7 jours",
  free: true,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Analytics 30 jours",
  free: false,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Analytics 90 jours",
  free: false,
  starter: false,
  pro: true,
  premium: true
}, {
  label: "Slug personnalisé",
  free: false,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Modèles",
  free: "3",
  starter: "10",
  pro: "Tous",
  premium: "Tous"
}, {
  label: "Suppression branding",
  free: false,
  starter: false,
  pro: true,
  premium: true
}, {
  label: "Support par email",
  free: false,
  starter: true,
  pro: true,
  premium: true
}, {
  label: "Support prioritaire",
  free: false,
  starter: false,
  pro: false,
  premium: true
}, {
  label: "Account manager dédié",
  free: false,
  starter: false,
  pro: false,
  premium: true
}];
function AbonnementPage() {
  const [subscription, setSubscription] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function load() {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data
      } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
      setSubscription(data ?? null);
      setLoading(false);
    }
    load();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" }) });
  }
  const plan = subscription?.plan ?? "free";
  const meta = PLAN_META[plan];
  const nextPlan = PLAN_NEXT[plan];
  const status = subscription?.status ?? "active";
  const periodEnd = subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : null;
  const isTrialing = subscription?.current_period_end ? new Date(subscription.current_period_end).getTime() - Date.now() < 7 * 864e5 && new Date(subscription.current_period_end).getTime() > Date.now() && plan !== "free" : false;
  const trialDaysLeft = subscription?.current_period_end ? Math.ceil((new Date(subscription.current_period_end).getTime() - Date.now()) / 864e5) : 0;
  async function handleManage() {
    toast.info("Redirection vers le portail de gestion…");
    window.open("mailto:bilel@convertilab.com?subject=Gestion de mon abonnement OneTap", "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 lg:p-8 max-w-5xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Abonnement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Gérez votre plan et vos options de facturation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden p-6 lg:p-8", style: {
        background: meta.gradient
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl", style: {
          background: "white",
          transform: "translate(30%,-30%)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col lg:flex-row lg:items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs font-semibold uppercase tracking-widest mb-1", children: "Plan actuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold text-white", children: meta.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm mt-1", children: [
              meta.price,
              "/mois"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }),
                status === "active" ? "Actif" : status
              ] }),
              isTrialing && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                "Essai — ",
                trialDaysLeft,
                "j restants"
              ] }),
              periodEnd && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/50", children: [
                "Renouvellement le ",
                periodEnd
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            nextPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inscription/selection-de-plan", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white transition hover:bg-white/90", style: {
              color: meta.color
            }, children: [
              "Passer à ",
              PLAN_META[nextPlan].label,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] }),
            plan !== "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleManage, className: "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white/70 bg-white/10 hover:bg-white/15 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
              " Gérer mon abonnement"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-lg", children: "Comparaison des plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Votre plan actuel est mis en évidence." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-4 font-semibold text-muted-foreground w-1/3", children: "Fonctionnalité" }),
            ["free", "starter", "pro", "premium"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-center font-bold w-[16.66%]", style: {
              color: plan === p ? PLAN_META[p].color : "var(--color-muted-foreground)",
              background: plan === p ? `${PLAN_META[p].color}08` : "transparent"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              plan === p && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full mb-1", style: {
                background: `${PLAN_META[p].color}20`,
                color: PLAN_META[p].color
              }, children: "Actuel" }),
              PLAN_META[p].label,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal", style: {
                color: "var(--color-muted-foreground)"
              }, children: [
                PLAN_META[p].price,
                "/mois"
              ] })
            ] }) }, p))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: FEATURES.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/30 transition-colors", style: {
            background: i % 2 === 0 ? "transparent" : "var(--color-muted)/20"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium text-foreground", children: row.label }),
            ["free", "starter", "pro", "premium"].map((p) => {
              const val = row[p];
              const isCurrent = plan === p;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", style: {
                background: isCurrent ? `${PLAN_META[p].color}05` : "transparent"
              }, children: typeof val === "boolean" ? val ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mx-auto", style: {
                color: isCurrent ? PLAN_META[p].color : "#10B981"
              } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mx-auto text-muted-foreground/40" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", style: {
                color: isCurrent ? PLAN_META[p].color : "var(--color-foreground)"
              }, children: val }) }, p);
            })
          ] }, row.label)) }),
          nextPlan && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4" }),
            ["free", "starter", "pro", "premium"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: p !== plan && p !== "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inscription/selection-de-plan", className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition hover:opacity-90", style: {
              background: PLAN_META[p].gradient
            }, children: [
              "Choisir ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
            ] }) }, p))
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl overflow-hidden p-6 lg:p-8", style: {
        background: "linear-gradient(135deg,#0f0520 0%,#1a0b2e 50%,#0a1a2e 100%)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-start lg:items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", style: {
          background: "linear-gradient(135deg,#8B5CF6,#EC4899)",
          boxShadow: "0 12px 30px -8px #8B5CF680"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-7 h-7 text-white/80" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-1", children: "Passez au physique." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: {
            color: "rgba(255,255,255,0.6)"
          }, children: "Carte NFC imprimée, livrée en 5–7 jours. Lié automatiquement à votre page digitale." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-3", children: ["NFC + QR Code", "Livraison incluse", "Design premium", "Relié à votre carte digitale"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", style: {
            color: "rgba(255,255,255,0.55)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-violet-400" }),
            " ",
            f
          ] }, f)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inscription/carte-physique", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 transition hover:opacity-90", style: {
          background: "linear-gradient(135deg,#7c3aed,#EC4899)",
          boxShadow: "0 8px 30px -8px #8B5CF680"
        }, children: [
          "Commander — 29€ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
        "Questions sur votre abonnement ?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:bilel@convertilab.com", className: "text-magenta hover:underline font-medium", children: "bilel@convertilab.com" })
      ] })
    ] })
  ] });
}
export {
  AbonnementPage as component
};
