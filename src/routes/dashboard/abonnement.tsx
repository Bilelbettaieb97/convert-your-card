import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Subscription = Tables<"subscriptions">;

export const Route = createFileRoute("/dashboard/abonnement")({
  component: AbonnementPage,
});

function AbonnementPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setSubscription(data ?? null);
      setLoading(false);
    }
    load();
  }, []);

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      toast.info("Redirection vers le portail Stripe…");
      // Stripe Customer Portal would go here
      // For now, redirect to Stripe dashboard or contact support
      window.open("mailto:bilel@convertilab.com?subject=Gestion de mon abonnement OneTap", "_blank");
    } catch (err) {
      toast.error("Impossible d'ouvrir le portail de gestion");
    } finally {
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "active";
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const planColors: Record<string, string> = {
    free: "from-slate-500 to-slate-600",
    starter: "from-blue-500 to-blue-600",
    pro: "from-magenta to-violet-600",
    premium: "from-amber-500 to-orange-500",
  };

  const planFeatures: Record<string, string[]> = {
    free: ["1 carte de visite digitale", "Partage QR code", "Statistiques de base"],
    starter: ["1 carte de visite digitale", "Partage NFC & QR code", "Profil personnalisable", "Statistiques de base", "Support par email"],
    pro: ["Cartes illimitées", "Templates premium", "Capture de leads", "Stats avancées", "Intégrations CRM", "Support prioritaire"],
    premium: ["Tout du Pro", "Gestion d'équipe", "Branding entreprise", "API & webhooks", "Account manager dédié"],
  };

  return (
    <>
      <Toaster />
      <div className="p-6 lg:p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Abonnement</h1>
          <p className="text-muted-foreground mt-1">Gérez votre plan et vos informations de facturation.</p>
        </div>

        {/* Current plan card */}
        <div className={`relative rounded-3xl p-8 bg-gradient-to-br ${planColors[plan] ?? "from-slate-500 to-slate-600"} text-white mb-6`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Plan actuel</p>
              <h2 className="text-3xl font-bold mt-1">{planLabel}</h2>
            </div>
            <CreditCard className="w-8 h-8 text-white/60" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            {status === "active" ? (
              <><CheckCircle className="w-4 h-4 text-white/80" /><span className="text-sm text-white/80">Abonnement actif</span></>
            ) : (
              <><AlertCircle className="w-4 h-4 text-white/80" /><span className="text-sm text-white/80">{status}</span></>
            )}
          </div>

          {periodEnd && (
            <p className="text-sm text-white/60">Prochain renouvellement : {periodEnd}</p>
          )}
        </div>

        {/* Features */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Ce qui est inclus dans votre plan</h3>
          <ul className="space-y-2">
            {(planFeatures[plan] ?? planFeatures.free).map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {plan !== "free" && (
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="w-full bg-foreground text-background py-3 rounded-full text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {portalLoading ? "Chargement…" : "Gérer mon abonnement"}
            </button>
          )}

          {plan === "free" && (
            <Link
              to="/inscription/selection-de-plan"
              className="block w-full text-center bg-gradient-cta text-white py-3 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition"
            >
              Passer à un plan payant →
            </Link>
          )}

          <p className="text-center text-xs text-muted-foreground">
            Questions ? Contactez-nous à{" "}
            <a href="mailto:bilel@convertilab.com" className="text-magenta hover:underline">
              bilel@convertilab.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
