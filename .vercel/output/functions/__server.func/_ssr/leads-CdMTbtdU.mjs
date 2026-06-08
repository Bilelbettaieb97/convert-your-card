import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as TrendingUp, b0 as Kanban, b1 as Euro, U as Users, k as Bell, o as ChartColumn } from "../_libs/lucide-react.mjs";
function LeadsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, {});
}
function ComingSoon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Visualisez vos opportunités en kanban, suivez chaque prospect de la première interaction jusqu'à la signature. Transformez vos scans en clients avec un pipeline pensé pour les indépendants." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Kanban, { className: "w-4 h-4 text-sky-400" }),
      label: "Vue kanban par étape"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "w-4 h-4 text-emerald-400" }),
      label: "Valeur estimée du pipeline"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-violet-400" }),
      label: "Assignation par contact"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-amber-400" }),
      label: "Relances automatiques"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-rose-400" }),
      label: "Taux de conversion"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-orange-400" }),
      label: "Suivi du CA généré"
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      f.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: f.label })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
export {
  LeadsPage as component
};
