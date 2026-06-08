import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { U as Users, au as Phone, M as Mail, a1 as Star, aX as Tag, av as MapPin, e as Bell } from "../_libs/lucide-react.mjs";
function ContactsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, {});
}
function ComingSoon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Retrouvez ici toutes les personnes qui ont scanné votre carte, sauvegardé votre contact ou interagi avec votre profil. Gérez, filtrez et relancez vos prospects directement depuis votre dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-400" }),
      label: "Appels & clics trackés"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-sky-400" }),
      label: "Export CSV / email"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-400" }),
      label: "Leads étoilés"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-violet-400" }),
      label: "Tags & filtres"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-rose-400" }),
      label: "Localisation des scans"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-orange-400" }),
      label: "Alertes en temps réel"
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      f.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: f.label })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
export {
  ContactsPage as component
};
