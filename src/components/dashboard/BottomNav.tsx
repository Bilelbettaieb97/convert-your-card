import { Link, useRouterState } from "@tanstack/react-router";
import { Eye, PenLine, BarChart2, User, Lock } from "lucide-react";
import { usePlan } from "@/lib/use-plan";

const TABS = [
  {
    to: "/dashboard/card",
    icon: Eye,
    label: "Carte",
    match: ["/dashboard/card", "/dashboard/carte", "/dashboard"],
    color: "text-violet-500",
    bg: "bg-violet-500/15",
    pill: "bg-violet-500",
  },
  {
    to: "/dashboard/content",
    icon: PenLine,
    label: "Éditer",
    match: ["/dashboard/content", "/dashboard/theme", "/dashboard/style", "/dashboard/media"],
    color: "text-pink-500",
    bg: "bg-pink-500/15",
    pill: "bg-pink-500",
  },
  {
    to: "/dashboard/statistiques",
    icon: BarChart2,
    label: "Stats",
    match: ["/dashboard/statistiques"],
    color: "text-sky-500",
    bg: "bg-sky-500/15",
    pill: "bg-sky-500",
  },
  {
    to: "/dashboard/account",
    icon: User,
    label: "Compte",
    match: ["/dashboard/account", "/dashboard/billing", "/dashboard/settings", "/dashboard/help", "/dashboard/commander"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/15",
    pill: "bg-emerald-500",
  },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { plan } = usePlan();
  const isVitrine = plan === "vitrine";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border-t border-border">
      <div className="flex items-center h-16 px-2">
        {TABS.map(({ to, icon: Icon, label, match, color, bg, pill }) => {
          const isActive = (match as readonly string[]).some((m) =>
            m === "/dashboard" ? pathname === m : pathname.startsWith(m)
          );
          const isStatsLocked = to === "/dashboard/statistiques" && !isVitrine;

          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center gap-1 select-none py-1"
            >
              {/* Icon pill */}
              <div className={`relative flex items-center justify-center w-12 h-8 rounded-2xl transition-all duration-200 ${
                isActive ? bg : "bg-transparent"
              }`}>
                <Icon className={`w-5 h-5 transition-all duration-200 ${
                  isActive ? color : "text-muted-foreground/60"
                }`} />
                {isStatsLocked && (
                  <Lock className="absolute -top-1 -right-1 w-2.5 h-2.5 text-amber-400" />
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] font-semibold leading-none transition-colors duration-200 ${
                isActive ? color : "text-muted-foreground/50"
              }`}>
                {label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span className={`w-1 h-1 rounded-full ${pill} mt-0.5`} />
              )}
            </Link>
          );
        })}
      </div>
      {/* iPhone home indicator spacing */}
      <div className="h-safe-bottom" />
    </nav>
  );
}
