import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as TrendingUp, b0 as Kanban, b1 as Euro, U as Users, R as Repeat2, o as ChartColumn, k as Bell, a$ as Tag, n as CalendarCheck } from "../_libs/lucide-react.mjs";
function LeadsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, {});
}
function ComingSoon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6", style: {
      background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(14,165,233,0.1))"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-emerald-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", style: {
      background: "rgba(16,185,129,0.08)",
      borderColor: "rgba(16,185,129,0.2)",
      color: "#34d399"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
      "En développement"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Pipeline commercial" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Chaque scan est un prospect potentiel. Visualisez vos opportunités en kanban, suivez chaque contact de la première interaction jusqu'à la signature — et transformez votre carte digitale en véritable machine à convertir." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Kanban, { className: "w-4 h-4 text-sky-400" }),
      label: "Vue kanban par étape",
      detail: "Glissez vos prospects de « Nouveau » à « Signé »"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "w-4 h-4 text-emerald-400" }),
      label: "Valeur estimée du pipeline",
      detail: "Montant total des opportunités en cours"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-violet-400" }),
      label: "Fiche contact enrichie",
      detail: "Historique complet des interactions par prospect"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat2, { className: "w-4 h-4 text-amber-400" }),
      label: "Relances automatiques",
      detail: "Rappels à J+3, J+7 si pas de réponse"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-rose-400" }),
      label: "Taux de conversion",
      detail: "Scans → deals gagnés, par source et période"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-orange-400" }),
      label: "Alertes prospects chauds",
      detail: "Notification quand un contact re-visite votre carte"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-indigo-400" }),
      label: "Tags & priorités",
      detail: "Classez vos leads par secteur, urgence, potentiel"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-teal-400" }),
      label: "Suivi du CA généré",
      detail: "Mesurez le retour réel de votre carte digitale"
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://calendly.com/convertilab-5bsc/30min", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90", style: {
      background: "linear-gradient(135deg,#10b981,#0ea5e9)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
      "Réserver une démo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
export {
  LeadsPage as component
};
