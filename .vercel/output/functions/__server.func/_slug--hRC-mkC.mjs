import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { R as Route$t, l as THEMES_BY_ID, C as CARD_THEMES } from "./_ssr/router-CtHcEMJU.mjs";
import { B as BusinessCard } from "./_ssr/BusinessCard-CBoQUFCm.mjs";
import "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import { aa as ExternalLink, D as Download, a8 as Calendar, t as Phone, s as MapPin, G as Globe, M as Mail } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_ssr/server-x9Zd59_w.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_ssr/client-CrY6GqN9.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-switch.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/zod.mjs";
import "./_ssr/vcard-D7QWDY7x.mjs";
const LEGACY_THEMES = [{
  id: "violet",
  accent: "#8B5CF6",
  bg: "#1a0b2e",
  text: "#ffffff",
  gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)",
  mode: "dark"
}, {
  id: "rose",
  accent: "#EC4899",
  bg: "#1a0b1a",
  text: "#ffffff",
  gradient: "linear-gradient(135deg,#be185d,#EC4899)",
  mode: "dark"
}, {
  id: "bleu",
  accent: "#0EA5E9",
  bg: "#0a1a2e",
  text: "#ffffff",
  gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)",
  mode: "dark"
}, {
  id: "vert",
  accent: "#10B981",
  bg: "#0a1f1a",
  text: "#ffffff",
  gradient: "linear-gradient(135deg,#047857,#10B981)",
  mode: "dark"
}, {
  id: "sombre",
  accent: "#F59E0B",
  bg: "#111827",
  text: "#ffffff",
  gradient: "linear-gradient(135deg,#92400e,#F59E0B)",
  mode: "dark"
}, {
  id: "clair",
  accent: "#6366F1",
  bg: "#f8f9fa",
  text: "#111827",
  gradient: "linear-gradient(135deg,#4338ca,#6366F1)",
  mode: "light"
}];
const DEFAULT_THEME = LEGACY_THEMES[0];
function getTheme(couleurAccent) {
  if (!couleurAccent) return DEFAULT_THEME;
  const cardTheme = CARD_THEMES.find((t) => t.id === couleurAccent);
  if (cardTheme) {
    return {
      id: cardTheme.id,
      accent: cardTheme.palette.accent,
      bg: cardTheme.palette.bg,
      text: cardTheme.palette.text,
      gradient: cardTheme.palette.gradient,
      mode: cardTheme.palette.mode
    };
  }
  return LEGACY_THEMES.find((t) => t.id === couleurAccent) ?? DEFAULT_THEME;
}
function ProfilePage() {
  const {
    profile
  } = Route$t.useLoaderData();
  reactExports.useEffect(() => {
    logEvent(profile.id, "scan", {
      referrer: document.referrer,
      ua: navigator.userAgent.slice(0, 100)
    });
  }, [profile.id]);
  const cardData = profile.card_data;
  if (cardData) {
    const themePalette = (THEMES_BY_ID[cardData.accent ?? "gold"] ?? THEMES_BY_ID.gold).palette;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pb-8", style: {
      background: themePalette.bg
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data: cardData, profileId: profile.id }) }) });
  }
  const theme = getTheme(profile.couleur_accent);
  const boutons = (profile.boutons ?? []).filter((b) => b.active !== false && b.value);
  const reseaux = (profile.reseaux ?? []).filter((r) => r.active !== false && r.url);
  const isLight = theme.mode === "light";
  const subTextColor = isLight ? "rgba(17,24,39,0.65)" : "rgba(255,255,255,0.75)";
  const subTextColorDim = isLight ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.6)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex flex-col items-center py-8 px-4", style: {
    background: theme.bg
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl overflow-hidden mb-4", style: {
      background: theme.gradient,
      boxShadow: `0 20px 60px -15px ${theme.accent}66`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      profile.photo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.photo_url, alt: profile.nom, className: "w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 shadow-lg", style: {
        borderColor: "rgba(255,255,255,0.3)"
      } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold", style: {
        backgroundColor: "rgba(255,255,255,0.2)",
        color: "#fff"
      }, children: profile.nom.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", style: {
        color: "#fff"
      }, children: profile.nom }),
      profile.fonction && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: {
        color: "rgba(255,255,255,0.82)"
      }, children: profile.fonction }),
      profile.entreprise && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5 font-medium", style: {
        color: "rgba(255,255,255,0.68)"
      }, children: profile.entreprise }),
      profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-3 leading-relaxed", style: {
        color: "rgba(255,255,255,0.72)"
      }, children: profile.bio })
    ] }) }),
    boutons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: boutons.map((btn, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { btn, profileId: profile.id, theme }, i)) }),
    reseaux.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4 mb-4", style: {
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider mb-3", style: {
        color: subTextColor
      }, children: "Réseaux" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: reseaux.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", onClick: () => logEvent(profile.id, "social_click", {
        type: r.type
      }), className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition hover:opacity-80", style: {
        backgroundColor: "rgba(255,255,255,0.12)",
        color: "#fff"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5", style: {
          color: "rgba(255,255,255,0.6)"
        } }),
        r.label || r.type.charAt(0).toUpperCase() + r.type.slice(1)
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => downloadVCard(profile), className: "flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold transition hover:opacity-90", style: {
      backgroundColor: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#fff"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
      " Enregistrer le contact"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs mt-6", style: {
      color: subTextColorDim
    }, children: [
      "Propulsé par ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "font-semibold hover:underline", style: {
        color: theme.accent
      }, children: "OneTap" })
    ] })
  ] }) });
}
function ActionButton({
  btn,
  profileId,
  theme
}) {
  const icons = {
    call: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
    email: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
    website: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
    maps: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
    rdv: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
    whatsapp: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
    calendly: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" })
  };
  const hrefs = {
    call: `tel:${btn.value}`,
    email: `mailto:${btn.value}`,
    website: btn.value,
    maps: `https://maps.google.com/?q=${encodeURIComponent(btn.value)}`,
    rdv: btn.value,
    whatsapp: `https://wa.me/${btn.value.replace(/\D/g, "")}`,
    calendly: btn.value
  };
  const openInNew = ["website", "rdv", "maps", "whatsapp", "calendly"].includes(btn.type);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: hrefs[btn.type] ?? "#", target: openInNew ? "_blank" : void 0, rel: "noopener noreferrer", onClick: () => logEvent(profileId, "button_click", {
    type: btn.type
  }), className: "flex items-center gap-3 w-full rounded-2xl px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90", style: {
    backgroundColor: theme.accent,
    boxShadow: `0 4px 15px -4px ${theme.accent}80`
  }, children: [
    icons[btn.type],
    btn.label || btn.type
  ] });
}
function logEvent(profileId, eventType, eventData) {
  import("./_ssr/client-CrY6GqN9.mjs").then(({
    supabase
  }) => {
    supabase.from("nfc_analytics").insert({
      profile_id: profileId,
      event_type: eventType,
      event_data: eventData ?? null
    }).then(() => {
    });
  }).catch(() => {
  });
}
function downloadVCard(profile) {
  const appUrl = window.location.origin;
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${profile.nom}`, profile.fonction ? `TITLE:${profile.fonction}` : null, profile.entreprise ? `ORG:${profile.entreprise}` : null, profile.telephone ? `TEL;TYPE=CELL:${profile.telephone}` : null, profile.email ? `EMAIL:${profile.email}` : null, profile.photo_url ? `PHOTO;VALUE=URI:${profile.photo_url}` : null, `URL:${appUrl}/${profile.slug}`, `NOTE:Carte de visite digitale — ${profile.entreprise || "OneTap"}`, "END:VCARD"].filter(Boolean).join("\r\n");
  const blob = new Blob([lines], {
    type: "text/vcard;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.slug}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  logEvent(profile.id, "vcard_download");
}
export {
  ProfilePage as component
};
