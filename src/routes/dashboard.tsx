import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Zap, LayoutDashboard, CreditCard, BarChart2, Layers, LogOut, CreditCard as CardIcon, X,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const NAV = [
  { to: "/dashboard",               label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/carte",         label: "Ma Carte",       icon: CardIcon },
  { to: "/dashboard/statistiques",  label: "Statistiques",   icon: BarChart2 },
  { to: "/dashboard/modeles",       label: "Modèles",        icon: Layers },
  { to: "/dashboard/abonnement",    label: "Abonnement",     icon: CreditCard },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate({ to: "/connexion", replace: true }); return; }
      setUserEmail(session.user.email ?? null);
      setLoading(false);
    });
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-background)" }}>
      {/* ── Sidebar desktop ── */}
      <aside
        className="hidden lg:flex flex-col w-60 flex-shrink-0 fixed top-0 left-0 h-full z-30"
        style={{ background: "#0f0f14", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="p-6 pb-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">OneTap</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive ? "linear-gradient(135deg,rgba(139,92,246,0.25),rgba(236,72,153,0.15))" : "transparent",
                  color: isActive ? "#c084fc" : "rgba(255,255,255,0.5)",
                  borderLeft: isActive ? "2px solid #8B5CF6" : "2px solid transparent",
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-3 pt-0">
          <div
            className="rounded-xl p-3 mb-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
              {userEmail}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 safe-area-pb"
        style={{ background: "#0f0f14", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact ? currentPath === item.to : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
              style={{ color: isActive ? "#c084fc" : "rgba(255,255,255,0.4)" }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 lg:ml-60 pb-20 lg:pb-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
