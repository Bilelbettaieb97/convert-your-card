import { j as jsxRuntimeExports } from "./_libs/react.mjs";
function ProfileNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-soft flex flex-col items-center justify-center px-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🔍" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Carte introuvable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Cette carte NFC n'existe pas ou n'est plus active." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-6 inline-block text-magenta font-semibold hover:underline", children: "Créer ma carte →" })
  ] });
}
export {
  ProfileNotFound as notFoundComponent
};
