import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { U as Users, ax as Phone, r as Mail, a9 as Star, b0 as Tag, o as MapPin, M as MessageCircle, D as Download, q as Bell, l as CalendarCheck } from "../_libs/lucide-react.mjs";
function ContactsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, {});
}
function ComingSoon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6", style: {
      background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-violet-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", style: {
      background: "rgba(139,92,246,0.08)",
      borderColor: "rgba(139,92,246,0.2)",
      color: "#a78bfa"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" }),
      "En développement"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "CRM Contacts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Toutes les personnes qui ont scanné votre carte, cliqué sur vos boutons ou sauvegardé votre contact — réunies dans un CRM simple et puissant. Filtrez, relancez, exportez. Votre réseau devient un actif." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-400" }),
      label: "Historique des interactions",
      detail: "Chaque clic, scan et appel tracé par contact"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-sky-400" }),
      label: "Export CSV / email",
      detail: "Envoyez votre liste dans votre outil préféré"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-400" }),
      label: "Leads étoilés",
      detail: "Marquez vos contacts prioritaires pour les retrouver vite"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-violet-400" }),
      label: "Tags & filtres avancés",
      detail: "Segmentez par secteur, source, date de scan"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-rose-400" }),
      label: "Localisation des scans",
      detail: "Ville et pays d'où chaque contact vous a découvert"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-teal-400" }),
      label: "Relance en 1 clic",
      detail: "Envoyez un WhatsApp ou email directement depuis la fiche"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-indigo-400" }),
      label: "Import vCard automatique",
      detail: "Contacts enrichis depuis les téléchargements de votre carte"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-orange-400" }),
      label: "Alertes en temps réel",
      detail: "Notification dès qu'un contact interagit de nouveau"
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://calendly.com/convertilab-5bsc/30min", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90", style: {
      background: "linear-gradient(135deg,#7c3aed,#EC4899)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
      "Réserver une démo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
export {
  ContactsPage as component
};
