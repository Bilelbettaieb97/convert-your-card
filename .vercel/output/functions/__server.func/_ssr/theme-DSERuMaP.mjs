import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BusinessCard } from "./BusinessCard-V6OHcO-O.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { u as useCardStore, g as getProfileMeta, C as CARD_THEMES } from "./router-DbDx4Eb1.mjs";
import { l as loadMyCard, u as updateCard } from "./card-actions-t_3KHvg_.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a3 as ArrowLeft, a5 as Check } from "../_libs/lucide-react.mjs";
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
import "./server-Boi67Kot.mjs";
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
function ThemePage() {
  const {
    data,
    setData,
    update,
    hydrated
  } = useCardStore();
  const profile = getProfileMeta();
  const [supabaseReady, setSupabaseReady] = reactExports.useState(false);
  const skipNextSave = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    if (!profile) {
      setSupabaseReady(true);
      return;
    }
    loadMyCard().then((row) => {
      if (row?.card_data) {
        skipNextSave.current = true;
        setData(row.card_data);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]);
  reactExports.useEffect(() => {
    if (!hydrated || !supabaseReady || !profile) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated, supabaseReady]);
  if (!hydrated || !supabaseReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-muted-foreground", children: "Chargement…" });
  }
  const darkThemes = CARD_THEMES.filter((t) => t.palette.mode === "dark");
  const lightThemes = CARD_THEMES.filter((t) => t.palette.mode === "light");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/card", className: "h-8 w-8 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Apparence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choisissez la palette qui correspond à votre métier." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeGroup, { label: "Thèmes sombres", themes: darkThemes, activeId: data.accent, onSelect: (id) => update("accent", id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeGroup, { label: "Thèmes clairs", themes: lightThemes, activeId: data.accent, onSelect: (id) => update("accent", id) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden xl:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
        " Aperçu live"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data }) })
    ] }) })
  ] });
}
function ThemeGroup({
  label,
  themes,
  activeId,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-3", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: themes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeCard, { id: t.id, label: t.label, sector: t.sector, palette: t.palette, active: activeId === t.id, onSelect }, t.id)) })
  ] });
}
function ThemeCard({
  id,
  label,
  sector,
  palette: p,
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onSelect(id), className: `group relative text-left rounded-2xl border p-2.5 transition-all hover:-translate-y-0.5 ${active ? "border-primary ring-2 ring-primary/40 shadow-[0_0_24px_-4px] shadow-primary/30" : "border-border hover:border-foreground/30"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-28 w-full rounded-xl mb-2.5 overflow-hidden relative flex flex-col", style: {
      background: p.bg
    }, "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-full shrink-0", style: {
        background: p.gradient
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center -mt-4 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full border-2 shrink-0", style: {
        background: p.surfaceAlt,
        borderColor: p.bg
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 mt-1 px-3 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full w-16", style: {
          background: p.text,
          opacity: 0.7
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full w-10", style: {
          background: p.textMuted,
          opacity: 0.6
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1.5 mt-2 px-3 shrink-0", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded-lg flex-1", style: {
        background: p.surface,
        border: `1px solid ${p.border}`
      } }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-2 mt-2 rounded-lg p-1.5 flex gap-1.5", style: {
        background: p.surface,
        border: `1px solid ${p.border}`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded shrink-0", style: {
          background: p.surfaceAlt
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center gap-1 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full w-full", style: {
            background: p.text,
            opacity: 0.5
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full w-2/3", style: {
            background: p.textMuted,
            opacity: 0.4
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-5 rounded shrink-0 self-center", style: {
          background: p.accent,
          opacity: 0.8
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-2 mt-1.5 grid grid-cols-2 gap-1", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded", style: {
        background: p.surfaceAlt,
        border: `1px solid ${p.border}`
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: sector })
      ] }),
      active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
    ] })
  ] });
}
export {
  ThemePage as component
};
