import { createFileRoute, Outlet, useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { ShareDialog } from "@/components/card/ShareDialog";
import { PasswordGate } from "@/components/dashboard/PasswordGate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCardStore } from "@/lib/card-store";
import { ExternalLink, Share2, Command, Circle, QrCode, HeadphonesIcon } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useAuthStore } from "@/lib/auth-store";
import { getProfileMeta } from "@/lib/profile-store";
import { usePlan } from "@/lib/use-plan";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ma carte digitale" },
      { name: "description", content: "Personnalisez, partagez et suivez votre carte de visite digitale." },
    ],
  }),
  component: DashboardLayout,
});

const META: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard":               { title: "Vue d'ensemble",        subtitle: "Pilotage de votre carte digitale" },
  "/dashboard/card":          { title: "Ma carte",              subtitle: "Aperçu, QR code et partage" },
  "/dashboard/carte":         { title: "Ma carte",              subtitle: "Aperçu, QR code et partage" },
  "/dashboard/content":       { title: "Contenu",               subtitle: "Sections, textes et boutons d'action" },
  "/dashboard/theme":         { title: "Apparence",             subtitle: "Thème et palette de couleurs" },
  "/dashboard/style":         { title: "Style des sections",     subtitle: "Variantes visuelles par section" },
  "/dashboard/media":         { title: "Médias",                subtitle: "Logo, photos et bibliothèque" },
  "/dashboard/statistiques":  { title: "Statistiques",          subtitle: "Vues, clics et engagement" },
  "/dashboard/contacts":      { title: "Contacts",              subtitle: "CRM des personnes qui vous ont scanné" },
  "/dashboard/leads":         { title: "Pipeline commercial",   subtitle: "Suivi des leads en kanban" },
  "/dashboard/analytics":     { title: "Statistiques avancées", subtitle: "Tendances, heatmap, sources, villes" },
  "/dashboard/notifications": { title: "Notifications",         subtitle: "Feed temps réel & préférences" },
  "/dashboard/team":          { title: "Équipe",                subtitle: "Membres, rôles, multi-cartes" },
  "/dashboard/orders":        { title: "Commandes",             subtitle: "Historique cartes physiques et livraisons" },
  "/dashboard/integrations":  { title: "Intégrations",          subtitle: "HubSpot, Zapier, Calendly, Slack…" },
  "/dashboard/billing":       { title: "Facturation",           subtitle: "Plan, méthode de paiement, factures" },
  "/dashboard/settings":      { title: "Paramètres",            subtitle: "Profil, sécurité, RGPD" },
  "/dashboard/help":          { title: "Aide & onboarding",     subtitle: "Checklist activation, tutos, support" },
  "/dashboard/account":       { title: "Plan & compte",         subtitle: "Abonnement, facturation et préférences" },
};

function DashboardLayout() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const meta = META[pathname] ?? { title: "Dashboard" };
  const { data } = useCardStore();
  const [shareOpen, setShareOpen] = useState(false);
  const [gateDismissed, setGateDismissed] = useState(false);
  const { user, loading } = useAuthStore();
  const { hasProfile, loading: planLoading, actif, daysLeft, trialExpired, plan, isInTrial, trialDaysLeft, paymentMethodSet } = usePlan();

  const ESSENTIELLE_ALLOWED = [
    "/dashboard/content",
    "/dashboard/account",
    "/dashboard/billing",
    "/dashboard/settings",
    "/dashboard/help",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const update = () =>
      supabase.from("nfc_profiles").update({ last_seen_at: new Date().toISOString() }).eq("user_id", user.id).then(() => {});
    update();
    const id = setInterval(update, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [user]);

  useEffect(() => {
    if (loading || planLoading || !user || hasProfile === null) return;

    if (hasProfile === false) {
      const hasGenerated = typeof window !== "undefined" && !!localStorage.getItem("cyk.builderia.generated");
      navigate({ to: hasGenerated ? "/builderia/resultat" : "/builderia", replace: true });
      return;
    }

    if (plan !== "vitrine" && !ESSENTIELLE_ALLOWED.some(p => pathname.startsWith(p))) {
      navigate({ to: "/dashboard/content", replace: true });
    }
  }, [loading, planLoading, user, hasProfile, plan, pathname, navigate]);

  const profile = getProfileMeta();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const publicUrl = profile ? `${origin}/${profile.slug}` : `${origin}/`;
  const isPublished = profile?.actif ?? false;

  if (loading || planLoading || !user || hasProfile === null || hasProfile === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!gateDismissed && user.user_metadata?.has_password !== true) {
    return <PasswordGate onUnlock={() => setGateDismissed(true)} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/10">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 flex items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6 sticky top-0 z-30">
            <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
            <div className="h-6 w-px bg-border hidden md:block" aria-hidden />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-lg sm:text-xl font-semibold truncate">{meta.title}</h1>
                <StatusBadge published={isPublished} />
              </div>
              {meta.subtitle && (
                <p className="text-xs text-muted-foreground truncate">{meta.subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Desktop only — recherche */}
              <button
                onClick={() => {
                  const ev = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                  document.dispatchEvent(ev);
                }}
                className="hidden lg:inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition text-sm"
                aria-label="Ouvrir la palette de commandes"
              >
                <Command className="h-3.5 w-3.5" />
                <span>Rechercher</span>
                <kbd className="hidden xl:inline-flex h-5 items-center px-1.5 rounded bg-background border border-border text-[10px] font-mono">⌘K</kbd>
              </button>

              {/* Desktop only — Voir en ligne */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(publicUrl, "_blank")}
                className="hidden sm:inline-flex h-9 gap-1.5 text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden md:inline">Voir en ligne</span>
              </Button>

              {/* Desktop only — QR Code */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex h-9 gap-1.5 text-sm font-medium"
              >
                <Link to="/dashboard/card">
                  <QrCode className="h-4 w-4" />
                  <span className="hidden md:inline">QR Code</span>
                </Link>
              </Button>

              {/* Desktop only — Support */}
              <a
                href="mailto:contact@cartevisitedigitale.fr?subject=Support%20%E2%80%94%20Carte%20Visite%20Digitale"
                className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-background text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition"
              >
                <HeadphonesIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Support</span>
              </a>

              {/* Toujours visible — Partager */}
              <Button
                size="sm"
                onClick={() => setShareOpen(true)}
                className="h-9 gap-1.5 text-sm font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Partager</span>
              </Button>
            </div>
          </header>

          {isInTrial && !paymentMethodSet && (
            <div className={`border-b px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 ${
              trialDaysLeft === 0
                ? "bg-red-500/10 border-red-500/30"
                : trialDaysLeft === 1
                ? "bg-orange-500/10 border-orange-500/30"
                : "bg-amber-500/10 border-amber-500/30"
            }`}>
              <p className={`text-xs sm:text-sm font-medium truncate ${
                trialDaysLeft === 0 ? "text-red-400"
                : trialDaysLeft === 1 ? "text-orange-400"
                : "text-amber-400"
              }`}>
                {trialDaysLeft === 0
                  ? "Essai expiré — activez avant minuit."
                  : trialDaysLeft === 1
                  ? "Essai expire demain — activez maintenant."
                  : `Essai gratuit — ${trialDaysLeft} jours restants.`}
                <span className="hidden sm:inline">
                  {trialDaysLeft === 0
                    ? " Ne perdez pas votre carte."
                    : trialDaysLeft === 1
                    ? " Conservez vos données."
                    : " Activez votre plan pour conserver votre carte."}
                </span>
              </p>
              <Link
                to="/dashboard/account"
                className={`shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-white text-xs font-semibold transition whitespace-nowrap ${
                  trialDaysLeft === 0 ? "bg-red-500 hover:bg-red-600"
                  : trialDaysLeft === 1 ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                Activer →
              </Link>
            </div>
          )}
          {isInTrial && paymentMethodSet && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center gap-4">
              <p className="text-xs sm:text-sm text-emerald-400 font-medium text-center">
                Abonnement confirmé ✓
                <span className="hidden sm:inline"> — vous serez débité automatiquement à la fin de votre essai gratuit.</span>
              </p>
            </div>
          )}
          {actif === false && (
            <div className="bg-red-500/10 border-b border-red-500/30 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-red-400 font-medium truncate">
                Carte hors ligne.
                <span className="hidden sm:inline"> Votre carte n'est plus visible en ligne.</span>
              </p>
              <Link to="/dashboard/account" className="shrink-0 px-3 sm:px-4 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition whitespace-nowrap">
                Réactiver →
              </Link>
            </div>
          )}
          {actif !== false && plan !== "vitrine" && (
            <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-amber-400 font-medium truncate">
                Plan Essentielle
                <span className="hidden sm:inline"> — votre carte affiche le branding cartevisitedigitale.fr et vos statistiques sont verrouillées.</span>
              </p>
              <Link to="/dashboard/account" className="shrink-0 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition whitespace-nowrap">
                <span className="hidden sm:inline">Passer à Vitrine — </span>4,80€/mois
              </Link>
            </div>
          )}

          <main className="flex-1 min-w-0 pb-20 md:pb-0">
            <Outlet />
          </main>
        </div>

        <CommandPalette publicUrl={publicUrl} />
        <ShareDialog data={data} open={shareOpen} onOpenChange={setShareOpen} />
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <Badge
      variant="outline"
      className={`h-5 px-1.5 gap-1 text-[10px] uppercase tracking-wider font-medium ${
        published
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          : "border-amber-500/40 bg-amber-500/10 text-amber-400"
      }`}
    >
      <Circle className={`h-1.5 w-1.5 fill-current ${published ? "animate-pulse" : ""}`} />
      {published ? "Publié" : "Brouillon"}
    </Badge>
  );
}
