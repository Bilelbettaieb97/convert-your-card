import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { Z as Zap, L as LayoutDashboard, s as CreditCard, t as WandSparkles, u as ChartNoAxesColumn, a as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const NAV = [{
  to: "/dashboard",
  label: "Vue d'ensemble",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/dashboard/carte",
  label: "Ma Carte",
  icon: CreditCard
}, {
  to: "/builder",
  label: "Builder",
  icon: WandSparkles
}, {
  to: "/dashboard/statistiques",
  label: "Statistiques",
  icon: ChartNoAxesColumn
}, {
  to: "/dashboard/abonnement",
  label: "Abonnement",
  icon: CreditCard
}];
function DashboardLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(async ({
      data: {
        session
      }
    }) => {
      if (!session) {
        navigate({
          to: "/connexion",
          replace: true
        });
        return;
      }
      setUserEmail(session.user.email ?? null);
      const {
        data: profile
      } = await supabase.from("nfc_profiles").select("id").eq("user_id", session.user.id).maybeSingle();
      if (!profile) {
        navigate({
          to: "/onboarding",
          replace: true
        });
        return;
      }
      setLoading(false);
    });
  }, [navigate]);
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/",
      replace: true
    });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", style: {
    background: "var(--color-background)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-60 flex-shrink-0 fixed top-0 left-0 h-full z-30", style: {
      background: "#0f0f14",
      borderRight: "1px solid rgba(255,255,255,0.06)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-white", children: "OneTap" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 space-y-0.5", children: NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", style: {
          background: isActive ? "linear-gradient(135deg,rgba(139,92,246,0.25),rgba(236,72,153,0.15))" : "transparent",
          color: isActive ? "#c084fc" : "rgba(255,255,255,0.5)",
          borderLeft: isActive ? "2px solid #8B5CF6" : "2px solid transparent"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
          item.label
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 pt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl p-3 mb-1", style: {
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", style: {
          color: "rgba(255,255,255,0.4)"
        }, children: userEmail }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition", style: {
          color: "rgba(255,255,255,0.35)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          "Se déconnecter"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 safe-area-pb", style: {
      background: "#0f0f14",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }, children: NAV.map((item) => {
      const Icon = item.icon;
      const isActive = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all", style: {
        color: isActive ? "#c084fc" : "rgba(255,255,255,0.4)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: item.label.split(" ")[0] })
      ] }, item.to);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 lg:ml-60 pb-20 lg:pb-0 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  DashboardLayout as component
};
