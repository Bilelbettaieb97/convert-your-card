import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Clock, Zap, ArrowRight, Shield, Star } from "lucide-react";
import { PromoBar, Nav, Footer } from "./index";

export const Route = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [
      { title: "Choisis ton forfait — OneTap" },
      { name: "description", content: "Trouve le forfait OneTap qu'il te faut : Free, Starter, Pro ou Premium. Essai gratuit 7 jours." },
    ],
  }),
  component: PlanSelectionPage,
});

type BillingCycle = "monthly" | "annual";
type PlanId = "free" | "starter" | "pro" | "premium";

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: { price: string; note: string };
  annual: { price: string; note: string };
  cta: string;
  highlight?: boolean;
  badge?: string;
  hasTrial?: boolean;
  features: string[];
  featuresNote?: string;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Commence à partager tes contacts.",
    monthly: { price: "0 €", note: "Gratuit, pour toujours" },
    annual: { price: "0 €", note: "Gratuit, pour toujours" },
    cta: "Continuer en Free",
    features: [
      "Liens illimités",
      "Icônes sociales & médias",
      "QR code unique",
      "Statistiques essentielles",
      "Design optimisé SEO",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Personnalise et capte tes leads.",
    monthly: { price: "6 €", note: "par mois · sans engagement" },
    annual: { price: "4,50 €", note: "facturé 54 €/an · 2 mois offerts" },
    cta: "Commencer",
    features: [
      "Tout du Free",
      "Thèmes personnalisés",
      "Capture de contacts / leads",
      "Liens de redirection",
      "Statistiques avancées",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Convertis chaque scan en opportunité.",
    monthly: { price: "13 €", note: "par mois · sans engagement" },
    annual: { price: "10,50 €", note: "facturé 126 €/an · 2 mois offerts" },
    cta: "Essai gratuit 7 jours",
    highlight: true,
    badge: "Recommandé",
    hasTrial: true,
    features: [
      "Tout du Starter",
      "Carte 100 % sur-mesure",
      "Statistiques complètes",
      "Réponses Instagram auto",
      "Raccourcisseur de liens",
      "Intégrations email (Mailchimp…)",
    ],
    featuresNote: "0 € débité pendant 7 jours",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Zéro limite pour les équipes & marques.",
    monthly: { price: "32 €", note: "par mois · sans engagement" },
    annual: { price: "27,50 €", note: "facturé 330 €/an · 2 mois offerts" },
    cta: "Essai gratuit 7 jours",
    hasTrial: true,
    features: [
      "Tout du Pro",
      "Onboarding concierge",
      "Posts sociaux illimités",
      "Réponses Instagram illimitées",
      "0 % de frais de vente",
      "100 % commissions affiliées",
    ],
    featuresNote: "0 € débité pendant 7 jours",
  },
];

function PlanSelectionPage() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  useEffect(() => {
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (pk && !pk.includes("FILL_IN")) loadStripe(pk);
  }, []);

  function handleSelect(planId: PlanId) {
    if (planId === "free") {
      navigate({ to: "/dashboard" });
      return;
    }
    navigate({
      to: "/inscription/offre/$plan",
      params: { plan: planId },
      search: { billing },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <PromoBar />
      <Nav />

      <main>
        {/* ─── Hero section ─── */}
        <section className="relative overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-14">
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet/8 blur-[100px]" />
            <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-magenta/6 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-5 shadow-card">
              <Zap className="w-3.5 h-3.5 text-magenta" />
              Simple, transparent, sans surprise
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-tight">
              Choisis le plan{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-cta bg-clip-text text-transparent">
                  qu'il te faut
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-cta opacity-40" />
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Commence gratuitement. Passe au plan supérieur quand tu es prêt.
              <br className="hidden sm:block" />
              Annulable à tout moment, sans question.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="inline-flex items-center rounded-2xl border border-border bg-card p-1 gap-1 shadow-card">
                <button
                  onClick={() => setBilling("monthly")}
                  className={[
                    "px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    billing === "monthly"
                      ? "bg-gradient-cta text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={[
                    "px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                    billing === "annual"
                      ? "bg-gradient-cta text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Annuel
                  <span className={[
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all",
                    billing === "annual"
                      ? "bg-white/25 text-white"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
                  ].join(" ")}>
                    -25%
                  </span>
                </button>
              </div>

              {billing === "annual" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Économise jusqu'à 2 mois par an sur chaque plan
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ─── Plans grid ─── */}
        <section className="mx-auto max-w-7xl px-4 pb-8">
          <div className="grid gap-4 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 items-end">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onSelect={() => handleSelect(plan.id)}
              />
            ))}
          </div>
        </section>

        {/* ─── Trust bar ─── */}
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Paiement sécurisé Stripe
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Sans engagement
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              TVA incluse
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              4,9 / 5 sur Trustpilot
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PlanCard({
  plan,
  billing,
  onSelect,
}: {
  plan: Plan;
  billing: BillingCycle;
  onSelect: () => void;
}) {
  const isHighlight = plan.highlight;
  const pricing = billing === "monthly" ? plan.monthly : plan.annual;

  if (isHighlight) {
    return (
      <div className="relative xl:-mt-4 xl:-mb-0 z-10">
        {/* Outer glow ring */}
        <div className="absolute -inset-[2px] rounded-[26px] bg-gradient-cta opacity-60 blur-sm" />

        <div className="relative flex flex-col rounded-3xl overflow-hidden bg-card shadow-glow ring-2 ring-magenta/30">
          {/* Badge */}
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <div className="bg-gradient-cta text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-b-xl shadow-sm">
              ⚡ {plan.badge}
            </div>
          </div>

          {/* Gradient header */}
          <div className="bg-gradient-cta px-6 pt-10 pb-6">
            {plan.hasTrial && (
              <div className="flex items-center gap-1.5 mb-3">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-xs font-semibold text-emerald-300">Essai 7 jours — 0 € aujourd'hui</span>
              </div>
            )}
            <h2 className="text-2xl font-display font-bold text-primary-foreground mb-1">{plan.name}</h2>
            <p className="text-sm text-primary-foreground/80 leading-snug">{plan.tagline}</p>
          </div>

          {/* Price */}
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-baseline gap-1.5 mb-0.5">
              <span className="text-4xl font-display font-bold text-foreground tracking-tight">
                {pricing.price}
              </span>
              <span className="text-sm text-muted-foreground">/ mois</span>
            </div>
            <p className="text-xs text-muted-foreground">{pricing.note}</p>
          </div>

          {/* CTA */}
          <div className="px-6 pt-5 pb-4">
            <button
              type="button"
              onClick={onSelect}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-cta text-primary-foreground py-3.5 text-sm font-bold shadow-glow hover:opacity-95 transition-all"
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
            {plan.featuresNote && (
              <p className="text-center text-xs text-muted-foreground mt-2">{plan.featuresNote}</p>
            )}
          </div>

          {/* Features */}
          <div className="px-6 pb-7 flex-1">
            <ul className="space-y-2.5">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-magenta/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-magenta" />
                  </div>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden border border-border bg-card shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="px-6 pt-7 pb-5 bg-muted/50">
        {plan.hasTrial && (
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Essai 7 jours</span>
          </div>
        )}
        <h2 className="text-xl font-display font-bold text-foreground mb-1">{plan.name}</h2>
        <p className="text-sm text-muted-foreground leading-snug min-h-[40px]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="text-3xl font-display font-bold text-foreground tracking-tight">
            {pricing.price}
          </span>
          {plan.id !== "free" && (
            <span className="text-sm text-muted-foreground">/ mois</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{pricing.note}</p>
      </div>

      {/* CTA */}
      <div className="px-6 pt-5 pb-4">
        <button
          type="button"
          onClick={onSelect}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-foreground py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition-all duration-200"
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Features */}
      <div className="px-6 pb-7 flex-1">
        <ul className="space-y-2.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-sm text-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
