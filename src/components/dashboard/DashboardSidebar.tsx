import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, CreditCard, Layers, Palette, Sparkles, Link2, Image,
  Users, TrendingUp, BarChart2, Bell, UserCog, Package, Plug, Receipt,
  Settings, HelpCircle, LogOut, Zap,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";

const CARD_SUB = [
  { to: "/dashboard/content", label: "Contenu",    icon: Layers   },
  { to: "/dashboard/theme",   label: "Apparence",  icon: Palette  },
  { to: "/dashboard/style",   label: "Style des sections", icon: Sparkles },
];

const NAV_EXTRAS = [
  { to: "/dashboard/links", label: "Liens & réseaux", icon: Link2  },
  { to: "/dashboard/media", label: "Médias",           icon: Image  },
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

export function DashboardSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

  const closeOnMobile = () => { if (isMobile) setOpenMobile(false); };

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  const isCardSection =
    pathname === "/dashboard/card" ||
    CARD_SUB.some((s) => pathname === s.to);

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
              {/* Vue d'ensemble */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} size="lg">
                  <Link to="/dashboard" onClick={closeOnMobile}>
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-sm font-medium">Vue d'ensemble</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Ma carte + 3 sous-pages */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isCardSection} size="lg">
                  <Link to="/dashboard/card" onClick={closeOnMobile}>
                    <CreditCard className="h-5 w-5" />
                    <span className="text-sm font-medium">Ma carte</span>
                  </Link>
                </SidebarMenuButton>
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
              </SidebarMenuItem>

              {/* Liens & réseaux + Médias */}
              {NAV_EXTRAS.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} size="lg">
                    <Link to={item.to} onClick={closeOnMobile}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
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
                  <SidebarMenuButton asChild isActive={isActive(item.to)} size="lg">
                    <Link to={item.to} onClick={closeOnMobile}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
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
                  <SidebarMenuButton asChild isActive={isActive(item.to)} size="lg">
                    <Link to={item.to} onClick={closeOnMobile}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
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
