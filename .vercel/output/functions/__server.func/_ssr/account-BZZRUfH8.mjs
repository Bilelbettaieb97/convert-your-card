import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useAuthStore, k as usePlan, B as Button } from "./router-DZxGzuQJ.mjs";
import { C as Card } from "./card-CqpiE8-g.mjs";
import { U as UpsellSection } from "./UpsellSection-SB4IAugJ.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a as Crown, l as Check, M as Mail, t as LogOut } from "../_libs/lucide-react.mjs";
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
import "./server-BbrCktKG.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const PLANS = [{
  id: "essentielle",
  label: "Essentielle",
  price: "9,80 €/mois",
  description: "Les briques indispensables pour être joignable.",
  features: ["Identité, contact, vCard", "Boutons d'action", "Bio & badges"]
}, {
  id: "vitrine",
  label: "Vitrine",
  price: "15,80 €/mois",
  description: "Toutes les briques pour vendre votre savoir-faire.",
  features: ["Tout le plan Essentielle", "Services, témoignages, réalisations", "Vidéo, RDV, réseaux sociaux, stats"],
  highlight: true
}];
function AccountPage() {
  const {
    user
  } = useAuthStore();
  const navigate = useNavigate();
  const {
    plan,
    loading
  } = usePlan();
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-8 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-5", children: "Vous pouvez changer de plan à tout moment, sans engagement." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: PLANS.map((p) => {
        const current = !loading && plan === p.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-5 relative ${current ? "border-primary shadow-[var(--shadow-elegant)]" : p.highlight ? "border-primary/60" : ""}`, children: [
          current && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 left-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full", children: "Plan actuel" }),
          !current && p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -top-2 right-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
            " Recommandé"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: p.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-5", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
          ] }, f)) }),
          current ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: true, className: "w-full", children: "Plan actuel" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", children: [
            "Passer à ",
            p.label
          ] }) })
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "-mx-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UpsellSection, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Compte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-5", children: "Gérez votre adresse email et votre session." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Adresse email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: user?.email ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: true, children: "Modifier" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Se déconnecter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Fermer la session en cours" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: handleSignOut, children: "Déconnexion" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AccountPage as component
};
