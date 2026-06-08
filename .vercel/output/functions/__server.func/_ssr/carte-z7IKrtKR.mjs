import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { u as useCardStore, g as getProfileMeta, C as CARD_THEMES, a as cn } from "./router-CCCXMhLn.mjs";
import { B as BrickList } from "./BrickList-jaIIbZKW.mjs";
import { B as BusinessCard } from "./BusinessCard-BB814gQp.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { P as PublicLinkBar, Q as QrCard, S as ShareGrid } from "./ShareGrid-CnELelRl.mjs";
import { u as updateCard } from "./card-actions-DQECfvAK.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/dnd-kit__core.mjs";
import "../_libs/dnd-kit__sortable.mjs";
import "../_libs/qrcode.mjs";
import { y as Sparkles, ax as Smartphone, ac as Share2, ae as Layers, af as Palette, a6 as Check, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DCQ3qMcM.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/zod.mjs";
import "./accordion-D4_4XoPO.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/dnd-kit__utilities.mjs";
import "./bricks-BKC8fRFU.mjs";
import "./label-CfSXefqw.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./vcard-D7QWDY7x.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
import "fs";
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "zlib";
import "assert";
import "buffer";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function MyCardPage() {
  const {
    data,
    setData,
    update,
    hydrated
  } = useCardStore();
  const profile = getProfileMeta();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = profile ? `${origin}/${profile.slug}` : `${origin}/`;
  reactExports.useEffect(() => {
    if (!hydrated || !profile) return;
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated]);
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-muted-foreground", children: "Chargement…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:sticky xl:top-20 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-card to-card/30 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-primary flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " Aperçu live"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3 w-3" }),
            " Mobile"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/30 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Lien public" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/account", className: "text-[11px] text-primary hover:underline", children: "Personnaliser →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLinkBar, { url: publicUrl })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "qr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCard, { url: publicUrl, name: data.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/30 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Partager ma carte" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShareGrid, { data, url: publicUrl })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "content", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/30 border border-border h-11 p-1 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "content", className: "data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
          " Contenu"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "theme", className: "data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-3.5 w-3.5" }),
          " Apparence"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "style", className: "data-[state=active]:bg-background data-[state=active]:shadow-sm gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Style"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "content", className: "mt-0 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Briques de la carte", subtitle: "Activez, modifiez ou réordonnez chaque section. L'aperçu se met à jour en direct." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrickList, { data, update, setData })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "theme", className: "mt-0 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Thème global", subtitle: "Une palette s'applique à toute la carte. Choisissez l'ambiance qui correspond à votre métier." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: CARD_THEMES.map((t) => {
          const active = data.accent === t.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => update("accent", t.id), className: `group relative text-left rounded-2xl border p-3 transition hover:-translate-y-0.5 ${active ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-foreground/30"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-full rounded-lg mb-3 border border-border/60 overflow-hidden relative", style: {
              background: t.palette.gradient
            }, "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: t.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate", children: t.sector })
              ] }),
              active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
            ] })
          ] }, t.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "style", className: "mt-0 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Style par brique", subtitle: "Chaque brique propose plusieurs variantes visuelles." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrickList, { data, update, setData, styleOnly: true })
      ] })
    ] }) })
  ] });
}
function SectionHeader({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", className: "hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition", children: [
      "Ouvrir le builder ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
    ] })
  ] });
}
export {
  MyCardPage as component
};
