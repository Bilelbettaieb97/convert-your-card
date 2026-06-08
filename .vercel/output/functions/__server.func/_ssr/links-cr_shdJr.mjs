import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as BusinessCard } from "./BusinessCard-BB814gQp.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { u as useCardStore, g as getProfileMeta, S as Switch, I as Input } from "./router-CCCXMhLn.mjs";
import { l as loadMyCard, u as updateCard } from "./card-actions-DQECfvAK.mjs";
import { L as Label } from "./label-CfSXefqw.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { av as Phone, M as MessageCircle, r as Mail, G as Globe, aH as Linkedin, aI as Instagram, D as Download } from "../_libs/lucide-react.mjs";
import "./vcard-D7QWDY7x.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
function LinksPage() {
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
  const toggleAction = (key) => {
    setData({
      ...data,
      actions: {
        ...data.actions,
        [key]: !data.actions[key]
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Liens & réseaux" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Modifiez vos coordonnées et réseaux. Sauvegarde automatique." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Boutons d'action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }), label: "Téléphone", active: data.actions.call, onToggle: () => toggleAction("call"), value: data.phone, onChange: (v) => update("phone", v), placeholder: "+33 6 12 34 56 78", type: "tel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }), label: "WhatsApp", active: data.actions.whatsapp, onToggle: () => toggleAction("whatsapp"), value: data.whatsapp, onChange: (v) => update("whatsapp", v), placeholder: "33612345678", type: "tel", hint: "Numéro sans + ni espaces (ex : 33612345678)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), label: "Email", active: data.actions.email, onToggle: () => toggleAction("email"), value: data.email, onChange: (v) => update("email", v), placeholder: "vous@exemple.fr", type: "email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }), label: "Site web", active: data.actions.website, onToggle: () => toggleAction("website"), value: data.website, onChange: (v) => update("website", v), placeholder: "https://monsite.fr", type: "url" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Réseaux sociaux" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }), label: "LinkedIn", value: data.linkedin, onChange: (v) => update("linkedin", v), placeholder: "https://linkedin.com/in/votre-profil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }), label: "Instagram", value: data.instagram, onChange: (v) => update("instagram", v), placeholder: "https://instagram.com/votre-compte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }), label: "WhatsApp social", value: data.whatsappSocial, onChange: (v) => update("whatsappSocial", v), placeholder: "33612345678", hint: "Numéro sans + ni espaces" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Options" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-border bg-card/40 px-4 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium cursor-pointer", htmlFor: "vcard-toggle", children: "Enregistrer le contact (vCard)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Permet aux visiteurs d'ajouter votre contact" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "vcard-toggle", checked: data.vcardEnabled, onCheckedChange: (v) => update("vcardEnabled", v) })
        ] })
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
function LinkRow({
  icon,
  label,
  active,
  onToggle,
  value,
  onChange,
  placeholder,
  type,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border bg-card/40 p-4 transition-opacity ${active ? "" : "opacity-50"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: active, onCheckedChange: onToggle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: type ?? "text", value, onChange: (e) => onChange(e.target.value), placeholder, className: "h-9 text-sm", disabled: !active }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1.5", children: hint })
  ] });
}
function SocialRow({
  icon,
  label,
  value,
  onChange,
  placeholder,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border bg-card/40 p-4 transition-opacity ${value ? "" : "opacity-60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium", children: label }),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400", children: "Actif" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "url", value, onChange: (e) => onChange(e.target.value), placeholder, className: "h-9 text-sm" }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1.5", children: hint })
  ] });
}
export {
  LinksPage as component
};
