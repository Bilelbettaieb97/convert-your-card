import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BusinessCard } from "./BusinessCard-DJYcrn9B.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { P as PublicLinkBar, Q as QrCard, S as ShareGrid } from "./ShareGrid-cDiv_yN_.mjs";
import { u as useCardStore, h as getProfileMeta } from "./router-D1h8FfFd.mjs";
import { l as loadMyCard } from "./card-actions-Coq7g2Qf.mjs";
import "../_libs/qrcode.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { aa as ExternalLink, ac as Layers, ad as Palette, H as Sparkles, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./vcard-D7QWDY7x.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-B3qMRBe1.mjs";
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
import "fs";
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "zlib";
import "assert";
import "buffer";
function CardOverviewPage() {
  const {
    data,
    setData,
    hydrated
  } = useCardStore();
  const profile = getProfileMeta();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const publicUrl = profile ? `${origin}/${profile.slug}` : `${origin}/`;
  const [supabaseReady, setSupabaseReady] = reactExports.useState(false);
  const skipInit = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    if (!profile) {
      setSupabaseReady(true);
      return;
    }
    loadMyCard().then((row) => {
      if (row?.card_data) {
        skipInit.current = true;
        setData(row.card_data);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]);
  if (!hydrated || !supabaseReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-muted-foreground", children: "Chargement…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-5 sm:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center xl:sticky xl:top-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Lien public" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: publicUrl, target: "_blank", rel: "noopener noreferrer", className: "text-[11px] text-primary hover:underline flex items-center gap-1", children: [
            "Ouvrir ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLinkBar, { url: publicUrl })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCard, { url: publicUrl, name: data.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/30 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Partager" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShareGrid, { data, url: publicUrl })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground px-1", children: "Modifier ma carte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EditButton, { to: "/dashboard/content", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-6 w-6" }), label: "Modifier le contenu", hint: "Sections, textes, boutons d'action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EditButton, { to: "/dashboard/theme", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-6 w-6" }), label: "Modifier l'apparence", hint: "Thème, couleurs, palette globale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EditButton, { to: "/dashboard/style", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6" }), label: "Modifier le style", hint: "Variantes visuelles par brique" })
      ] })
    ] })
  ] }) });
}
function EditButton({
  to,
  icon,
  label,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center gap-4 rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:bg-card p-4 transition-all hover:-translate-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 group-hover:bg-primary/15 transition-colors", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" })
  ] });
}
export {
  CardOverviewPage as component
};
