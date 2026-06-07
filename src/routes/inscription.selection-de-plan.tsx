import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock } from "lucide-react";
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

type FeatureGroup = {
  title?: string;
  items: { name: string; desc?: string }[];
};

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: { price: string; suffix?: string; note: string };
  annual: { price: string; suffix?: string; note: string };
  cta: string;
  highlight?: boolean;
  badge?: string;
  hasTrial?: boolean;
  intro?: string;
  groups: FeatureGroup[];
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Découvre OneTap avec une carte digitale personnelle.",
    monthly: { price: "0 €", note: "Gratuit, pour toujours" },
    annual: { price: "0 €", note: "Gratuit, pour toujours" },
    cta: "Continuer en Free",
    groups: [
      {
        title: "Fonctionnalités clés :",
        items: [
          { name: "Liens illimités" },
          { name: "Icônes sociales, vidéos & médias" },
          { name: "Statistiques essentielles" },
          { name: "Design optimisé SEO" },
          { name: "QR code unique" },
        ],
      },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Pour les pros qui démarrent leur carte digitale.",
    monthly: { price: "6 €", suffix: "/ mois", note: "Facturation mensuelle" },
    annual: { price: "4,50 €", suffix: "/ mois", note: "Facturé 54 €/an · 2 mois offerts" },
    cta: "Commencer",
    intro: "Tout du Free, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Thèmes personnalisés", desc: "Palettes et thèmes pour matcher ton style." },
          { name: "Capture tes contacts", desc: "Collecte et gère les leads qui scannent ta carte." },
          { name: "Liens de redirection", desc: "Redirige temporairement vers un lien clé." },
        ],
      },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pour les pros qui veulent grandir et convertir.",
    monthly: { price: "13 €", suffix: "/ mois", note: "Facturation mensuelle" },
    annual: { price: "10,50 €", suffix: "/ mois", note: "Facturé 126 €/an · 2 mois offerts" },
    cta: "Essai gratuit 7 jours",
    highlight: true,
    badge: "Recommandé",
    hasTrial: true,
    intro: "Tout du Starter, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Carte personnalisée", desc: "Logo, visuels plein écran, design sur-mesure." },
          { name: "Liens mis en avant", desc: "Liens animés et accrocheurs." },
          { name: "Statistiques complètes", desc: "Analyse ce qui convertit." },
        ],
      },
      {
        title: "Outils de croissance",
        items: [
          { name: "Réponses Instagram automatisées" },
          { name: "Raccourcisseur de liens" },
          { name: "Intégrations email" },
        ],
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Pour les équipes & marques qui veulent zéro limite.",
    monthly: { price: "32 €", suffix: "/ mois", note: "Facturation mensuelle" },
    annual: { price: "27,50 €", suffix: "/ mois", note: "Facturé 330 €/an · 2 mois offerts" },
    cta: "Essai gratuit 7 jours",
    hasTrial: true,
    intro: "Tout du Pro, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Onboarding concierge", desc: "Support prioritaire dédié." },
        ],
      },
      {
        title: "Outils de croissance",
        items: [
          { name: "Posts sociaux illimités" },
          { name: "Réponses Instagram illimitées" },
          { name: "0 % de frais de vente" },
        ],
      },
    ],
  },
];

function PlanSelectionPage() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<BillingCycle>("monthly");

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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Trouve le forfait qu'il te faut
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare en quelques secondes et lance ta carte digitale dès aujourd'hui. Annulable à tout moment.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center bg-muted rounded-full p-1 gap-1">
              <button
                onClick={() => setBilling("monthly")}
                className={[
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                  billing === "monthly"
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Par mois
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={[
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                  billing === "annual"
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Par an
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded-full">
                  -25%
                </span>
              </button>
            </div>

            {billing === "annual" && (
              <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium animate-fade-in">
                ✓ Facturation annuelle — l'équivalent de 2 mois offerts
              </p>
            )}
          </div>

          {/* Plans grid */}
          <div className="grid gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onSelect={() => handleSelect(plan.id)}
              />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-3xl mx-auto">
            Sans engagement · Paiement sécurisé · TVA incluse · Annulable à tout moment
          </p>
        </div>
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

  return (
    <div
      className={[
        "relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover-scale",
        isHighlight
          ? "ring-2 ring-magenta/40 shadow-glow"
          : "border border-border shadow-card hover:shadow-glow",
        "bg-card text-card-foreground",
      ].join(" ")}
    >
      {/* Colored header */}
      <div
        className={[
          "px-6 pt-7 pb-6 relative",
          isHighlight ? "bg-gradient-cta text-primary-foreground" : "bg-muted text-foreground",
        ].join(" ")}
      >
        {plan.badge && (
          <span className="absolute top-4 right-4 bg-background text-magenta text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-card border border-magenta/30">
            {plan.badge}
          </span>
        )}
        {plan.hasTrial && (
          <div className="flex items-center gap-1 mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Essai 7 jours — 0 € aujourd'hui</span>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-1.5">{plan.name}</h2>
        <p className={["text-sm leading-snug min-h-[40px]", isHighlight ? "text-primary-foreground/90" : "text-muted-foreground"].join(" ")}>
          {plan.tagline}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300">
            {pricing.price}
          </span>
          {pricing.suffix && (
            <span className="text-xs font-medium text-muted-foreground">{pricing.suffix}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground min-h-[16px] mb-5">{pricing.note}</p>

        <button
          type="button"
          onClick={onSelect}
          className={[
            "block w-full text-center rounded-full py-3 text-sm font-semibold transition-all",
            isHighlight
              ? "bg-magenta/15 text-magenta hover:bg-magenta/25 border border-magenta/30"
              : "border border-foreground text-foreground hover:bg-foreground hover:text-background",
          ].join(" ")}
        >
          {plan.cta}
        </button>
      </div>

      {/* Features */}
      <div className="px-6 pt-6 pb-7 flex-1">
        {plan.intro && <p className="text-sm font-semibold mb-5">{plan.intro}</p>}
        <div className="space-y-6">
          {plan.groups.map((group, gi) => (
            <div key={gi}>
              {group.title && <h3 className="text-sm font-semibold text-foreground/90 mb-3">{group.title}</h3>}
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-magenta" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      {item.desc && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
