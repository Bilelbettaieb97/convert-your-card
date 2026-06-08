import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as getProfileMeta, B as Button } from "./router-DnAi91AD.mjs";
import { C as Card } from "./card-B6USi6-K.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { aj as Link2, av as Copy, aw as QrCode, D as Download, f as Eye, J as MousePointerClick, O as Smartphone } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./server-C_oXoxA9.mjs";
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
const STATS = [{
  icon: Eye,
  label: "Vues 30 j.",
  value: "—",
  hint: "Disponible après publication"
}, {
  icon: MousePointerClick,
  label: "Clics 30 j.",
  value: "—",
  hint: "Sur les boutons d'action"
}, {
  icon: Smartphone,
  label: "Ajouts vCard",
  value: "—",
  hint: "Téléphones où vous êtes enregistré"
}, {
  icon: QrCode,
  label: "Scans QR",
  value: "—",
  hint: "Détection des scans physiques"
}];
function SharePage() {
  const [publicUrl, setPublicUrl] = reactExports.useState("https://www.cartevisitedigitale.fr/");
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (profile) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      setPublicUrl(`${origin}/${profile.slug}`);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Lien public" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "C'est l'adresse à partager. Vous pourrez la personnaliser une fois la carte publiée." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 flex flex-col sm:flex-row sm:items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: publicUrl })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => {
            navigator.clipboard.writeText(publicUrl);
            toast.success("Lien copié");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-1.5" }),
            " Copier"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-4 w-4 mr-1.5" }),
            " QR code"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-1.5" }),
            " Télécharger"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Statistiques" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Les indicateurs s'activent automatiquement dès la publication de votre carte." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: STATS.map(({
        icon: Icon,
        label,
        value,
        hint
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-medium", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: hint })
      ] }, label)) })
    ] })
  ] });
}
export {
  SharePage as component
};
