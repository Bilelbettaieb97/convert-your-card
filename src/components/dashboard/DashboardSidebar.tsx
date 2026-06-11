import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, CreditCard, Layers, Palette, Sparkles, Image,
  Users, TrendingUp, BarChart2, Bell, UserCog, Package, Plug, Receipt,
  Settings, HelpCircle, LogOut, Zap, Lock,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { usePlan } from "@/lib/use-plan";
import { clearProfileMeta } from "@/lib/profile-store";

const CARD_SUB = [
  { to: "/dashboard/content", label: "Contenu",    icon: Layers   },
  { to: "/dashboard/theme",   label: "Apparence",  icon: Palette  },
  { to: "/dashboard/style",   label: "Style des sections", icon: Sparkles },
];

const NAV_EXTRAS = [
  { to: "/dashboard/media", label: "Médias", icon: Image },
];

const NAV_DATA = [
  { to: "/dashboard/statistiques",   label: "Statistiques",     icon: BarChart2 },
  { to: "/dashboard/contacts",      label: "Contacts",         icon: Users    },
  { to: "/dashboard/leads",         label: "Pipeline",         icon: TrendingUp },
  { to: "/dashboard/analytics",     label: "Analytics avancé", icon: BarChart2 },
  { to: "/dashboard/notifications", label: "Notifications",    icon: Bell     },
];

const NAV_ACCOUNT = [
  { to: "/dashboard/team",         label: "Équipe",         icon: UserCog  },
  { to: "/dashboard/orders",       label: "Commandes NFC",  icon: Package  },
  { to: "/dashboard/integrations", label: "Intégrations",   icon: Plug     },
  { to: "/dashboard/billing",      label: "Facturation",    icon: Receipt  },
  { to: "/dashboard/settings",     label: "Paramètres",     icon: Settings },
  { to: "/dashboard/help",         label: "Aide",           icon: HelpCircle },
  { to: "/dashboard/account",      label: "Plan & compte",  icon: CreditCard },
];

const ESSENTIELLE_ALLOWED = [
  "/dashboard/content",
  "/dashboard/account",
  "/dashboard/billing",
  "/dashboard/settings",
  "/dashboard/help",
];

function isAllowed(to: string, plan: string) {
  if (plan === "vitrine") return true;
  return ESSENTIELLE_ALLOWED.some(p => to.startsWith(p));
}

export function DashboardSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user } = useAuthStore();
  const { plan } = usePlan();
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

  const closeOnMobile = () => { if (isMobile) setOpenMobile(false); };

  async function handleSignOut() {
    clearProfileMeta();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  const isCardSection =
    pathname === "/dashboard/card" ||
    CARD_SUB.some((s) => pathname === s.to);

  function NavItem({ to, label, icon: Icon, size = "lg" }: { to: string; label: string; icon: typeof Layers; size?: "sm" | "lg" }) {
    const allowed = isAllowed(to, plan);
    if (!allowed) {
      return (
        <SidebarMenuButton
          size={size}
          className="opacity-40 cursor-not-allowed"
          onClick={() => navigate({ to: "/dashboard/account" })}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium flex-1">{label}</span>
          <Lock className="h-3 w-3" />
        </SidebarMenuButton>
      );
    }
    return (
      <SidebarMenuButton asChild isActive={isActive(to)} size={size}>
        <Link to={to} onClick={closeOnMobile}>
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <Sidebar className="bg-background border-r border-border">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-base leading-tight">Carte Visite Digitale</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Carte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavItem to="/dashboard/card" label="Ma carte" icon={CreditCard} />
                {plan === "vitrine" && (
                  <SidebarMenuSub>
                    {CARD_SUB.map((item) => (
                      <SidebarMenuSubItem key={item.to}>
                        <SidebarMenuSubButton asChild isActive={pathname === item.to}>
                          <Link to={item.to} onClick={closeOnMobile}>
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
                {plan !== "vitrine" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/content"}>
                        <Link to="/dashboard/content" onClick={closeOnMobile}>
                          <Layers className="h-4 w-4" />
                          <span className="text-sm">Contenu</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {[{ to: "/dashboard/theme", label: "Apparence", icon: Palette }, { to: "/dashboard/style", label: "Style", icon: Sparkles }].map(item => (
                      <SidebarMenuSubItem key={item.to}>
                        <SidebarMenuSubButton
                          className="opacity-40 cursor-not-allowed"
                          onClick={() => navigate({ to: "/dashboard/account" })}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm flex-1">{item.label}</span>
                          <Lock className="h-3 w-3" />
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {NAV_EXTRAS.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavItem to={item.to} label={item.label} icon={item.icon} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Données</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_DATA.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavItem to={item.to} label={item.label} icon={item.icon} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ACCOUNT.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavItem to={item.to} label={item.label} icon={item.icon} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="text-sm text-muted-foreground truncate px-2 pb-1 font-medium">{user?.email}</div>
        <SidebarMenuButton onClick={handleSignOut} className="text-muted-foreground hover:text-destructive" size="lg">
          <LogOut className="h-5 w-5" />
          <span className="text-sm">Se déconnecter</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
