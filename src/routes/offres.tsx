import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PromoBar, Nav, Footer } from "./index";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Choisis ton forfait — OneTap" },
      { name: "description", content: "Trouve le forfait OneTap qu'il te faut : Free, Starter, Pro ou Premium. Essai gratuit 7 jours." },
      { property: "og:title", content: "Choisis ton forfait — OneTap" },
      { property: "og:description", content: "Free, Starter, Pro ou Premium — trouve le plan parfait pour ta carte de visite digitale." },
    ],
  }),
  component: PlanSelectionPage,
});

type FeatureGroup = {
  title?: string;
  items: { name: string; desc?: string }[];
};

type Plan = {
  id: "free" | "starter" | "pro" | "premium";
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  billingNote?: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  intro?: string; // e.g. "Everything in Free, plus:"
  groups: FeatureGroup[];
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Découvre OneTap avec une carte digitale personnelle.",
    price: "0 €",
    billingNote: "Gratuit, pour toujours",
    cta: "Commencer",
    ctaHref: "/inscription",
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
      {
        title: "Partage*",
        items: [
          { name: "Partage NFC & QR code", desc: "Partage ta carte d'un simple contact avec un téléphone." },
        ],
      },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Pour les pros qui démarrent leur carte digitale.",
    price: "4,50 €",
    priceSuffix: "EUR/mois",
    billingNote: "Facturé annuellement, ou 6 € par mois",
    cta: "Commencer",
    ctaHref: "/inscription",
    intro: "Tout du Free, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Thèmes personnalisés", desc: "Palettes de couleurs et thèmes pour matcher ton style." },
          { name: "Capture tes contacts", desc: "Collecte et gère les leads qui scannent ta carte." },
          { name: "Liens de redirection", desc: "Redirige temporairement vers un lien clé, parfait pour les promos." },
        ],
      },
      {
        title: "Monétisation*",
        items: [
          { name: "Frais réduits", desc: "Vends tes produits/services digitaux avec 9 % de frais**." },
        ],
      },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pour les pros qui veulent grandir et convertir.",
    price: "10,50 €",
    priceSuffix: "EUR/mois",
    billingNote: "Facturé annuellement, ou 13 € par mois",
    cta: "Essai gratuit 7 jours",
    ctaHref: "/inscription",
    highlight: true,
    badge: "Recommandé",
    intro: "Tout du Starter, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Carte personnalisée", desc: "Ajoute ton logo, des visuels plein écran et un design sur-mesure." },
          { name: "Liens mis en avant", desc: "Mets en avant ce qui compte avec des liens animés et accrocheurs." },
          { name: "Statistiques complètes", desc: "Vois les liens les plus performants et optimise ce qui convertit." },
        ],
      },
      {
        title: "Outils de croissance",
        items: [
          { name: "Réponses Instagram automatisées", desc: "Booste l'engagement et les ventes via DM automatiques." },
          { name: "Raccourcisseur de liens", desc: "Crée des shortlinks personnalisés avec UTM intégrés." },
          { name: "Intégrations email", desc: "Synchronise tes contacts avec Mailchimp, Google Sheets, Klaviyo…" },
        ],
      },
      {
        title: "Monétisation*",
        items: [
          { name: "Frais réduits", desc: "Vends tes produits/services digitaux avec 9 % de frais**." },
        ],
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Pour les équipes & marques qui veulent zéro limite.",
    price: "27,50 €",
    priceSuffix: "EUR/mois",
    billingNote: "Facturé annuellement, ou 32 € par mois",
    cta: "Commencer",
    ctaHref: "/inscription",
    intro: "Tout du Pro, plus :",
    groups: [
      {
        title: "Carte de visite",
        items: [
          { name: "Onboarding concierge", desc: "Accompagnement sur-mesure avec support prioritaire dédié." },
        ],
      },
      {
        title: "Outils de croissance",
        items: [
          { name: "Posts sociaux illimités", desc: "Passe à l'échelle avec des posts illimités sur 3 marques." },
          { name: "Outils d'équipe en option", desc: "Chat, collaboration et workflows d'approbation." },
          { name: "Réponses Instagram illimitées", desc: "Reach maximal avec auto-réponses illimitées." },
        ],
      },
      {
        title: "Monétisation*",
        items: [
          { name: "0 % de frais**", desc: "Chaque euro de tes ventes digitales va directement sur ton compte." },
          { name: "100 % des commissions**", desc: "Vends des produits affiliés et garde toute la commission." },
        ],
      },
    ],
  },
];

function PlanSelectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <PromoBar />
      <Nav />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Trouve le forfait qu'il te faut
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare en quelques secondes et lance ta carte digitale dès aujourd'hui. Annulable à tout moment.
            </p>
          </div>

          <div className="grid gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-3xl mx-auto">
            * Disponible selon le forfait. ** Hors frais de traitement de paiement. Sans engagement · Paiement sécurisé · TVA incluse.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/30 px-5 py-4 max-w-2xl mx-auto">
            <span className="text-sm text-muted-foreground">
              Carte NFC physique disponible en option après inscription
            </span>
            <span className="inline-flex h-2 w-2 rounded-full bg-magenta" aria-hidden />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;

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
        <h2 className="text-2xl font-bold mb-1.5">{plan.name}</h2>
        <p
          className={[
            "text-sm leading-snug min-h-[40px]",
            isHighlight ? "text-primary-foreground/90" : "text-muted-foreground",
          ].join(" ")}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight">{plan.price}</span>
          {plan.priceSuffix && (
            <span className="text-xs font-medium text-muted-foreground">{plan.priceSuffix}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground min-h-[16px] mb-5">{plan.billingNote || "\u00A0"}</p>

        <Link
          to={plan.ctaHref}
          className={[
            "block w-full text-center rounded-full py-3 text-sm font-semibold transition-all",
            isHighlight
              ? "bg-magenta/15 text-magenta hover:bg-magenta/25 border border-magenta/30"
              : "border border-foreground text-foreground hover:bg-foreground hover:text-background",
          ].join(" ")}
        >
          {plan.cta}
        </Link>
      </div>

      {/* Features */}
      <div className="px-6 pt-6 pb-7 flex-1">
        {plan.intro && (
          <p className="text-sm font-semibold mb-5">{plan.intro}</p>
        )}
        <div className="space-y-6">
          {plan.groups.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <h3 className="text-sm font-semibold text-foreground/90 mb-3">{group.title}</h3>
              )}
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
