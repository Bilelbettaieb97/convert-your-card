import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Clock, Zap, ArrowRight, Shield, Star, Sparkles } from "lucide-react";
import { PromoBar, Nav, Footer } from "./index";

export const Route = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [
      { title: "Choisis ton forfait — CVD" },
      { name: "description", content: "Trouve le forfait CVD : Free, Starter, Pro ou Premium. Essai gratuit 7 jours." },
    ],
  }),
  component: PlanSelectionPage,
});

type BillingCycle = "monthly" | "annual";
type PlanId = "free" | "starter" | "pro" | "premium";

type Feature = { label: string; inherited?: boolean };

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: { price: string; cents?: string };
  annual: { price: string; cents?: string; saving: string };
  cta: string;
  highlight?: boolean;
  hasTrial?: boolean;
  features: Feature[];
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Commence à partager tes contacts dès aujourd'hui.",
    monthly: { price: "0 €" },
    annual: { price: "0 €", saving: "" },
    cta: "Commencer gratuitement",
    features: [
      { label: "Liens illimités" },
      { label: "Icônes sociales, vidéos & médias" },
      { label: "QR code unique" },
      { label: "Statistiques essentielles" },
      { label: "Design optimisé SEO" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Personnalise ta carte et capte tes premiers leads.",
    monthly: { price: "6 €", cents: "/mois" },
    annual: { price: "4,50 €", cents: "/mois", saving: "Économise 18 €/an" },
    cta: "Commencer",
    features: [
      { label: "Tout du Free", inherited: true },
      { label: "Thèmes personnalisés" },
      { label: "Capture de contacts / leads" },
      { label: "Liens de redirection" },
      { label: "Statistiques avancées" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Convertis chaque scan en opportunité business.",
    monthly: { price: "13 €", cents: "/mois" },
    annual: { price: "10,50 €", cents: "/mois", saving: "Économise 30 €/an" },
    cta: "Démarrer l'essai gratuit",
    highlight: true,
    hasTrial: true,
    features: [
      { label: "Tout du Starter", inherited: true },
      { label: "Carte 100 % sur-mesure" },
      { label: "Statistiques complètes" },
      { label: "Réponses Instagram automatisées" },
      { label: "Raccourcisseur de liens" },
      { label: "Intégrations email (Mailchimp…)" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Zéro limite pour les équipes & marques ambitieuses.",
    monthly: { price: "32 €", cents: "/mois" },
    annual: { price: "27,50 €", cents: "/mois", saving: "Économise 54 €/an" },
    cta: "Démarrer l'essai gratuit",
    hasTrial: true,
    features: [
      { label: "Tout du Pro", inherited: true },
      { label: "Onboarding concierge" },
      { label: "Posts sociaux illimités" },
      { label: "Réponses Instagram illimitées" },
      { label: "0 % de frais de vente" },
      { label: "100 % commissions affiliées" },
    ],
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
      navigate({ to: "/onboarding" });
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
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet/6 blur-[120px]" />
            <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-magenta/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-5 shadow-card">
              <Zap className="w-3.5 h-3.5 text-magenta" />
              Simple · Transparent · Sans surprise
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
              Trouve le forfait{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-foreground">qu'il te faut</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 right-0 h-[10px] rounded-full opacity-30 -z-0"
                  style={{ background: "var(--gradient-cta)" }}
                />
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
              Commence gratuitement. Évolue quand tu es prêt. Annulable à tout moment.
            </p>

            {/* Toggle */}
            <div className="mt-8 flex flex-col items-center gap-2.5">
              <div className="inline-flex items-center rounded-2xl border border-border bg-muted p-1 gap-0.5">
                <button
                  onClick={() => setBilling("monthly")}
                  className={[
                    "px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    billing === "monthly"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={[
                    "relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                    billing === "annual"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Annuel
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
                    −2 mois
                  </span>
                </button>
              </div>
              {billing === "annual" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Économise jusqu'à 54 € — soit 2 mois offerts
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ─── Cards ─── */}
        <section className="mx-auto max-w-[1320px] px-4 pb-8">
          {/* Popular badge above Pro card — visible only on xl */}
          <div className="hidden xl:grid xl:grid-cols-4 gap-5 mb-0 pointer-events-none select-none">
            <div />
            <div />
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 bg-gradient-cta text-primary-foreground text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-glow mb-0 -mb-0">
                <Sparkles className="w-3 h-3" />
                Le plus populaire
              </div>
            </div>
            <div />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
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
        <section className="py-8 px-4">
          <div className="mx-auto max-w-xl">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Paiement sécurisé Stripe
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Sans engagement
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                TVA incluse
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                4,9/5 Trustpilot
              </span>
            </div>
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
  const isHighlight = !!plan.highlight;
  const pricing = billing === "monthly" ? plan.monthly : plan.annual;
  const saving = plan.annual.saving;

  return (
    <div
      className={[
        "relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300",
        isHighlight
          ? "ring-2 ring-magenta/40 shadow-[0_20px_60px_-10px_color-mix(in_oklab,var(--magenta)_30%,transparent)] bg-card"
          : "border border-border bg-card shadow-card hover:shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--primary)_20%,transparent)] hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Header strip */}
      <div
        className={[
          "px-6 pt-6 pb-5",
          isHighlight
            ? "bg-gradient-to-br from-[oklch(0.52_0.27_300)] to-[oklch(0.65_0.27_345)]"
            : "bg-muted/40",
        ].join(" ")}
      >
        {/* Trial badge */}
        {plan.hasTrial && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <Clock className={["w-3.5 h-3.5", isHighlight ? "text-emerald-300" : "text-emerald-500"].join(" ")} />
            <span className={["text-xs font-semibold", isHighlight ? "text-emerald-300" : "text-emerald-600 dark:text-emerald-400"].join(" ")}>
              Essai 7 jours — 0 € débité aujourd'hui
            </span>
          </div>
        )}
        <h2 className={["text-xl font-display font-bold mb-0.5", isHighlight ? "text-white" : "text-foreground"].join(" ")}>
          {plan.name}
        </h2>
        <p className={["text-sm leading-snug", isHighlight ? "text-white/75" : "text-muted-foreground"].join(" ")}>
          {plan.tagline}
        </p>
      </div>

      {/* Price block */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-end gap-1 mb-0.5">
          <span className="text-4xl font-display font-bold text-foreground tracking-tight leading-none">
            {pricing.price}
          </span>
          {pricing.cents && (
            <span className="text-sm text-muted-foreground mb-0.5">{pricing.cents}</span>
          )}
        </div>
        {/* Annual saving callout */}
        {billing === "annual" && saving ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" />
            {saving}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">
            {plan.id === "free" ? "Gratuit, pour toujours" : "Facturation mensuelle"}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-5">
        <button
          type="button"
          onClick={onSelect}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-200",
            isHighlight
              ? "bg-gradient-cta text-white shadow-glow hover:opacity-90"
              : plan.id === "free"
              ? "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
              : "bg-foreground text-background hover:opacity-80",
          ].join(" ")}
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4" />
        </button>
        {plan.hasTrial && (
          <p className="text-center text-[11px] text-muted-foreground mt-2">
            Aucun débit pendant 7 jours · Annulable à tout moment
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-border" />

      {/* Features */}
      <div className="px-6 pt-5 pb-7 flex-1">
        <ul className="space-y-2.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {f.inherited ? (
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-muted-foreground" />
                </div>
              ) : (
                <div className={[
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  isHighlight ? "bg-white/15" : "bg-magenta/10",
                ].join(" ")}>
                  <Check className={["w-3 h-3", isHighlight ? "text-white" : "text-magenta"].join(" ")} />
                </div>
              )}
              <span className={[
                "text-sm leading-snug",
                f.inherited ? "text-muted-foreground italic" : "text-foreground",
              ].join(" ")}>
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
