import { Link, useRouterState } from "@tanstack/react-router";
import { Eye, PenLine, BarChart2, User, Lock } from "lucide-react";
import { usePlan } from "@/lib/use-plan";

const TABS = [
  { to: "/dashboard/card", icon: Eye, label: "Carte", match: ["/dashboard/card", "/dashboard/carte", "/dashboard"] },
  { to: "/dashboard/content", icon: PenLine, label: "Éditer", match: ["/dashboard/content", "/dashboard/theme", "/dashboard/style", "/dashboard/media"] },
  { to: "/dashboard/statistiques", icon: BarChart2, label: "Stats", match: ["/dashboard/statistiques"] },
  { to: "/dashboard/account", icon: User, label: "Compte", match: ["/dashboard/account", "/dashboard/billing", "/dashboard/settings", "/dashboard/help", "/dashboard/commander"] },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { plan } = usePlan();
  const isVitrine = plan === "vitrine";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl safe-area-inset-bottom">
      <div className="flex items-stretch h-16">
        {TABS.map(({ to, icon: Icon, label, match }) => {
          const isActive = (match as readonly string[]).some((m) =>
            m === "/dashboard" ? pathname === m : pathname.startsWith(m)
          );
          const isStatsLocked = to === "/dashboard/statistiques" && !isVitrine;

          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative select-none ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}

              <div className="relative">
                <Icon className={`w-[22px] h-[22px] transition-transform ${isActive ? "scale-110" : ""}`} />
                {isStatsLocked && (
                  <Lock className="absolute -top-1.5 -right-2 w-2.5 h-2.5 text-amber-400" />
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? "text-primary" : ""}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* safe area for iPhone home indicator */}
      <div className="h-safe-bottom bg-background/95" />
    </nav>
  );
}
