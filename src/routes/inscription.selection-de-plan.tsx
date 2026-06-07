import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

export const Route = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [
      { title: "Choisis ton forfait — OneTap" },
      { name: "description", content: "Trouve le forfait OneTap qu'il te faut : Starter, Pro ou Premium. Essai gratuit 7 jours." },
      { property: "og:title", content: "Choisis ton forfait — OneTap" },
      { property: "og:description", content: "Starter, Pro ou Premium — trouve le plan parfait pour ta carte de visite digitale." },
    ],
  }),
  component: PlanSelectionPage,
});

type Plan = {
  id: "starter" | "pro" | "premium";
  name: string;
  icon: typeof Sparkles;
  price: string;
  priceSuffix: string;
  prefix?: string;
  trial?: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Sparkles,
    prefix: "À partir de",
    price: "10,50€",
    priceSuffix: "/mois",
    tagline: "L'essentiel pour démarrer ta carte digitale.",
    features: [
      "1 carte de visite digitale",
      "Partage NFC & QR code",
      "Profil personnalisable",
      "Statistiques de base",
      "Support par email",
    ],
    cta: "Commencer avec Starter",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: "19,50€",
    priceSuffix: "/mois",
    trial: "Essai gratuit pendant 7 jours",
    tagline: "Le plus populaire — tout ce qu'il faut pour un pro qui réseaute.",
    features: [
      "Tout du plan Starter, plus :",
      "Cartes illimitées",
      "Templates premium par secteur",
      "Capture de leads + CRM intégré",
      "Statistiques avancées en temps réel",
      "Intégrations (HubSpot, Salesforce, Zapier)",
      "Support prioritaire 7j/7",
    ],
    cta: "Démarrer mon essai gratuit",
    highlight: true,
    badge: "Le plus populaire",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: "27€",
    priceSuffix: "/mois",
    trial: "Essai gratuit pendant 7 jours",
    tagline: "Pour les équipes et entreprises qui veulent tout.",
    features: [
      "Tout du plan Pro, plus :",
      "Gestion d'équipe illimitée",
      "Branding entreprise (logo, couleurs, domaine)",
      "Tableau de bord administrateur",
      "API & webhooks personnalisés",
      "Account manager dédié",
      "SLA & sécurité avancée",
    ],
    cta: "Démarrer mon essai gratuit",
  },
];

function PlanSelectionPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <Link to="/" className="inline-block mb-6">
            <span className="text-2xl font-bold bg-gradient-cta bg-clip-text text-transparent">OneTap</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Trouve le forfait qu'il te faut
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare en quelques secondes et lance ta carte digitale dès aujourd'hui. Annulable à tout moment.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Sans engagement · Paiement sécurisé · TVA incluse
        </p>
      </div>
    </main>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  const isHighlight = plan.highlight;

  return (
    <div
      className={[
        "relative flex flex-col rounded-3xl p-7 sm:p-8 transition-all duration-300 hover-scale",
        isHighlight
          ? "bg-gradient-cta text-primary-foreground shadow-glow scale-100 md:scale-105 ring-2 ring-magenta/40"
          : "bg-card text-card-foreground border border-border shadow-card hover:shadow-glow",
      ].join(" ")}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-magenta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-card border border-magenta/30">
          {plan.badge}
        </span>
      )}

      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={[
            "h-10 w-10 rounded-xl flex items-center justify-center",
            isHighlight ? "bg-white/20" : "bg-magenta/10 text-magenta",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold">{plan.name}</h2>
      </div>

      <p className={["text-sm mb-6", isHighlight ? "text-primary-foreground/90" : "text-muted-foreground"].join(" ")}>
        {plan.tagline}
      </p>

      <div className="mb-2">
        {plan.prefix && (
          <span className={["block text-xs mb-1", isHighlight ? "text-primary-foreground/80" : "text-muted-foreground"].join(" ")}>
            {plan.prefix}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight">{plan.price}</span>
          <span className={["text-sm font-medium", isHighlight ? "text-primary-foreground/80" : "text-muted-foreground"].join(" ")}>
            {plan.priceSuffix}
          </span>
        </div>
      </div>

      <div
        className={[
          "min-h-[24px] mb-6 text-sm font-semibold",
          isHighlight ? "text-primary-foreground" : "text-magenta",
        ].join(" ")}
      >
        {plan.trial || "\u00A0"}
      </div>

      <button
        type="button"
        className={[
          "w-full rounded-full py-3 text-sm font-semibold transition-all mb-6",
          isHighlight
            ? "bg-background text-magenta hover:bg-background/90 shadow-card"
            : "bg-foreground text-background hover:opacity-90",
        ].join(" ")}
      >
        {plan.cta}
      </button>

      <ul className="space-y-3 text-sm">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              className={[
                "h-4 w-4 mt-0.5 flex-shrink-0",
                isHighlight ? "text-primary-foreground" : "text-magenta",
              ].join(" ")}
            />
            <span className={isHighlight ? "text-primary-foreground/95" : "text-foreground/85"}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
