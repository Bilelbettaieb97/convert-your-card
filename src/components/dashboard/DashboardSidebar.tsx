import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, CreditCard, Palette, Link2, Image, Share2, Users, TrendingUp,
  BarChart2, Bell, UserCog, Package, Plug, Receipt, Settings, HelpCircle, LogOut, Zap,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";

const NAV_MAIN = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/card", label: "Ma carte", icon: CreditCard },
  { to: "/dashboard/style", label: "Apparence", icon: Palette },
  { to: "/dashboard/links", label: "Liens & réseaux", icon: Link2 },
  { to: "/dashboard/media", label: "Médias", icon: Image },
];

const NAV_DATA = [
  { to: "/dashboard/share", label: "Statistiques", icon: Share2 },
  { to: "/dashboard/contacts", label: "Contacts", icon: Users },
  { to: "/dashboard/leads", label: "Pipeline", icon: TrendingUp },
  { to: "/dashboard/analytics", label: "Analytics avancé", icon: BarChart2 },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

const NAV_ACCOUNT = [
  { to: "/dashboard/team", label: "Équipe", icon: UserCog },
  { to: "/dashboard/orders", label: "Commandes NFC", icon: Package },
  { to: "/dashboard/integrations", label: "Intégrations", icon: Plug },
  { to: "/dashboard/billing", label: "Facturation", icon: Receipt },
  { to: "/dashboard/settings", label: "Paramètres", icon: Settings },
  { to: "/dashboard/help", label: "Aide", icon: HelpCircle },
  { to: "/dashboard/account", label: "Plan & compte", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user } = useAuthStore();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  function isActive(to: string, exact?: boolean) {
    return exact ? pathname === to : pathname.startsWith(to);
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base">OneTap</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Carte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
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
                  <SidebarMenuButton asChild isActive={isActive(item.to)}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
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
                  <SidebarMenuButton asChild isActive={isActive(item.to)}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="text-xs text-muted-foreground truncate px-2 pb-1">{user?.email}</div>
        <SidebarMenuButton onClick={handleSignOut} className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-4 w-4" />
          <span>Se déconnecter</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
