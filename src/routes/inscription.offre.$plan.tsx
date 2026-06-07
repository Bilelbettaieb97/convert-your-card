import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { createCheckoutSession } from "@/fns/checkout";
import { Check, ArrowLeft, Shield, Zap, Clock, Star, CreditCard, Lock } from "lucide-react";

export const Route = createFileRoute("/inscription/offre/$plan")({
  validateSearch: z.object({
    billing: z.enum(["monthly", "annual"]).default("monthly"),
  }),
  head: ({ params }) => ({
    meta: [
      { title: `Offre ${params.plan} — OneTap` },
      { name: "description", content: "Abonne-toi à OneTap et lance ta carte de visite digitale." },
    ],
  }),
  component: OffrePage,
});

type PlanId = "starter" | "pro" | "premium";
type Billing = "monthly" | "annual";

type FeatureGroup = {
  title?: string;
  items: { name: string; desc?: string }[];
};

type PlanData = {
  name: string;
  tagline: string;
  badge?: string;
  hasTrial: boolean;
  monthly: { price: string; total?: string; note: string };
  annual: { price: string; total: string; note: string; saving: string };
  groups: FeatureGroup[];
};

const PLANS: Record<PlanId, PlanData> = {
  starter: {
    name: "Starter",
    tagline: "Pour les pros qui démarrent leur carte digitale.",
    hasTrial: false,
    monthly: { price: "6 €", note: "par mois, sans engagement" },
    annual: { price: "4,50 €", total: "54 €", note: "facturé annuellement", saving: "2 mois offerts — économise 18 €" },
    groups: [
      {
        title: "Tout du Free, plus :",
        items: [
          { name: "Thèmes personnalisés", desc: "Palettes et thèmes pour matcher ton style." },
          { name: "Capture tes contacts", desc: "Collecte et gère les leads qui scannent ta carte." },
          { name: "Liens de redirection", desc: "Redirige temporairement vers un lien clé." },
          { name: "Statistiques avancées" },
        ],
      },
    ],
  },
  pro: {
    name: "Pro",
    tagline: "Pour les pros qui veulent grandir et convertir.",
    badge: "Recommandé",
    hasTrial: true,
    monthly: { price: "13 €", note: "par mois, sans engagement" },
    annual: { price: "10,50 €", total: "126 €", note: "facturé annuellement", saving: "2 mois offerts — économise 30 €" },
    groups: [
      {
        title: "Tout du Starter, plus :",
        items: [
          { name: "Carte entièrement personnalisée", desc: "Logo, visuels plein écran, design sur-mesure." },
          { name: "Statistiques complètes", desc: "Analyse ce qui convertit le mieux." },
          { name: "Réponses Instagram automatisées", desc: "Booste l'engagement via DM automatiques." },
          { name: "Intégrations email", desc: "Mailchimp, Google Sheets, Klaviyo…" },
        ],
      },
    ],
  },
  premium: {
    name: "Premium",
    tagline: "Pour les équipes & marques qui veulent zéro limite.",
    hasTrial: true,
    monthly: { price: "32 €", note: "par mois, sans engagement" },
    annual: { price: "27,50 €", total: "330 €", note: "facturé annuellement", saving: "2 mois offerts — économise 54 €" },
    groups: [
      {
        title: "Tout du Pro, plus :",
        items: [
          { name: "Onboarding concierge", desc: "Accompagnement sur-mesure, support prioritaire." },
          { name: "Posts sociaux illimités", desc: "Jusqu'à 3 marques simultanées." },
          { name: "0 % de frais sur tes ventes" },
          { name: "100 % des commissions affiliées" },
        ],
      },
    ],
  },
};

function OffrePage() {
  const { plan } = Route.useParams();
  const { billing: initialBilling } = Route.useSearch();
  const navigate = useNavigate();

  const planId = plan as PlanId;
  const planData = PLANS[planId];

  const [billing, setBilling] = useState<Billing>(initialBilling);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(
    typeof window !== "undefined" ? sessionStorage.getItem("onetap_email") : null
  );

  useEffect(() => {
    if (userEmail) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        sessionStorage.setItem("onetap_email", user.email);
        setUserEmail(user.email);
      }
    });
  }, [userEmail]);

  if (!planData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Plan introuvable.</p>
      </div>
    );
  }

  const pricing = billing === "monthly" ? planData.monthly : planData.annual;
  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const trialDateStr = trialEndDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

  async function handlePay() {
    if (!userEmail) {
      toast.error("Tu dois être connecté pour continuer.");
      navigate({ to: "/inscription" });
      return;
    }
    setLoading(true);
    try {
      const result = await createCheckoutSession({
        data: { plan: planId, billing, email: userEmail },
      });
      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Impossible de créer la session de paiement.");
      }
    } catch {
      toast.error("Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {/* Mobile header */}
      <header className="lg:hidden px-4 py-4 border-b border-border flex items-center gap-3">
        <button onClick={() => navigate({ to: "/inscription/selection-de-plan" })} className="text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold">OneTap</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-0px)]">

        {/* ─── Colonne gauche — Détails du plan ─── */}
        <div className="lg:w-[58%] flex flex-col px-6 py-8 lg:px-14 lg:py-14">
          {/* Logo desktop */}
          <div className="hidden lg:flex items-center gap-3 mb-12">
            <Link to="/inscription/selection-de-plan" className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">OneTap</span>
            </div>
          </div>

          <div className="max-w-lg w-full mx-auto lg:mx-0 flex-1">
            {/* Plan header */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-2">
                <h1 className="text-3xl font-display font-bold text-foreground">Offre {planData.name}</h1>
                {planData.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/30 px-2.5 py-1 rounded-full">
                    {planData.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{planData.tagline}</p>
            </div>

            {/* Trial banner */}
            {planData.hasTrial && (
              <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3.5 mb-6">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Essai gratuit 7 jours — 0 € débité aujourd'hui
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Un email de rappel te sera envoyé 1 jour avant la fin de l'essai pour annuler si besoin.
                  </p>
                </div>
              </div>
            )}

            {/* Billing toggle */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-muted rounded-full p-1 gap-1">
                <button
                  onClick={() => setBilling("monthly")}
                  className={["px-5 py-1.5 rounded-full text-sm font-semibold transition-all", billing === "monthly" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"].join(" ")}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={["px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5", billing === "annual" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"].join(" ")}
                >
                  Annuel
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded-full">-25%</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 p-5 rounded-2xl border border-border bg-muted/30">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-display font-bold text-foreground">{pricing.price}</span>
                <span className="text-sm text-muted-foreground">{billing === "monthly" ? "/ mois" : "/ mois"}</span>
              </div>
              <p className="text-xs text-muted-foreground">{pricing.note}</p>
              {billing === "annual" && "saving" in pricing && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3" />
                  {(pricing as PlanData["annual"]).saving}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-5 mb-8">
              {planData.groups.map((group, gi) => (
                <div key={gi}>
                  {group.title && <h3 className="text-sm font-semibold text-foreground mb-3">{group.title}</h3>}
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-magenta/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-magenta" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          {item.desc && <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" />Paiement sécurisé SSL</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />Sans engagement</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />Annulable à tout moment</span>
            </div>
          </div>
        </div>

        {/* ─── Colonne droite — Récapitulatif commande ─── */}
        <div className="lg:w-[42%] border-t lg:border-t-0 lg:border-l border-border bg-muted/20 flex items-center justify-center px-6 py-10 lg:px-10">
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-display font-bold text-foreground mb-6">Récapitulatif</h2>

            {/* Order card */}
            <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden mb-5">
              {/* Header */}
              <div className={["px-6 py-5", planData.badge ? "bg-gradient-cta text-primary-foreground" : "bg-muted"].join(" ")}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Plan sélectionné</p>
                    <p className="text-xl font-bold mt-0.5">OneTap {planData.name}</p>
                  </div>
                  {planData.hasTrial && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      Essai 7j
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="px-6 py-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Facturation</span>
                  <span className="font-medium capitalize">{billing === "monthly" ? "Mensuelle" : "Annuelle"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-medium">{pricing.price} / mois</span>
                </div>
                {billing === "annual" && "total" in pricing && (pricing as PlanData["annual"]).total && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Montant annuel</span>
                    <span className="font-medium">{(pricing as PlanData["annual"]).total} / an</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-semibold text-foreground">Dû aujourd'hui</span>
                  <span className="text-xl font-bold text-foreground">
                    {planData.hasTrial ? "0 €" : pricing.price}
                  </span>
                </div>
                {planData.hasTrial && (
                  <p className="text-xs text-muted-foreground">
                    Essai jusqu'au <strong>{trialDateStr}</strong>, puis {pricing.price}/mois. Annulable avant sans frais.
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handlePay}
              disabled={loading || !userEmail}
              className="w-full bg-gradient-cta text-primary-foreground rounded-2xl py-4 text-base font-bold shadow-glow hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Redirection…" : planData.hasTrial ? "Démarrer mon essai gratuit →" : "Payer maintenant →"}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              Paiement sécurisé par Stripe · CB, Visa, Mastercard
            </div>

            {!userEmail && (
              <p className="mt-3 text-center text-xs text-amber-600">
                <Link to="/connexion" className="underline">Connecte-toi</Link> pour continuer.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
