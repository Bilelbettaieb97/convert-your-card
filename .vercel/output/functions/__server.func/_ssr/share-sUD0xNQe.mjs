import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { h as getProfileMeta, B as Button } from "./router-DXAqO7PW.mjs";
import { C as Card } from "./card-BT1IWPqu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import "../_libs/seroval.mjs";
import { v as Eye, w as MousePointerClick, y as Smartphone, Q as QrCode, ae as Link2, aq as Copy, D as Download } from "../_libs/lucide-react.mjs";
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
import "./server-D8HYMyU1.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
function SharePage() {
  const [publicUrl, setPublicUrl] = reactExports.useState("https://www.cartevisitedigitale.fr/");
  const [stats, setStats] = reactExports.useState({
    views: 0,
    clicks: 0,
    saves: 0,
    qr: 0
  });
  const [loadingStats, setLoadingStats] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) {
      setLoadingStats(false);
      return;
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
    setPublicUrl(`${origin}/${profile.slug}`);
    const since30 = new Date(Date.now() - 30 * 864e5).toISOString();
    supabase.from("nfc_analytics").select("event_type").eq("profile_id", profile.id).gte("created_at", since30).then(({
      data: rows
    }) => {
      if (!rows) {
        setLoadingStats(false);
        return;
      }
      const views = rows.filter((r) => r.event_type === "view" || r.event_type === "scan").length;
      const clicks = rows.filter((r) => r.event_type === "button_click").length;
      const saves = rows.filter((r) => r.event_type === "vcard_download").length;
      const qr = rows.filter((r) => r.event_type === "qr_scan").length;
      setStats({
        views,
        clicks,
        saves,
        qr
      });
      setLoadingStats(false);
    });
  }, []);
  const STATS = [{
    icon: Eye,
    label: "Vues 30 j.",
    value: loadingStats ? "…" : stats.views.toString(),
    hint: "Visites de votre carte"
  }, {
    icon: MousePointerClick,
    label: "Clics 30 j.",
    value: loadingStats ? "…" : stats.clicks.toString(),
    hint: "Sur les boutons d'action"
  }, {
    icon: Smartphone,
    label: "Ajouts vCard",
    value: loadingStats ? "…" : stats.saves.toString(),
    hint: "Téléphones où vous êtes enregistré"
  }, {
    icon: QrCode,
    label: "Scans QR",
    value: loadingStats ? "…" : stats.qr.toString(),
    hint: "Scans via QR code"
  }];
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Activité des 30 derniers jours sur votre carte publique." }),
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
