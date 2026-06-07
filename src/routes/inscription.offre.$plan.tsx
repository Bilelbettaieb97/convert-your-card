import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { createEmbeddedCheckout } from "@/fns/checkout-embedded";
import { Check, ArrowLeft, Shield, Zap, Clock, Star } from "lucide-react";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = STRIPE_PK && !STRIPE_PK.includes("FILL_IN")
  ? loadStripe(STRIPE_PK)
  : null;

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

type FeatureGroup = {
  title?: string;
  items: { name: string; desc?: string }[];
};

type PlanData = {
  name: string;
  tagline: string;
  badge?: string;
  hasTrial: boolean;
  monthly: { price: string; suffix: string; note: string };
  annual: { price: string; suffix: string; note: string; saving: string };
  groups: FeatureGroup[];
};

const PLANS: Record<PlanId, PlanData> = {
  starter: {
    name: "Starter",
    tagline: "Pour les pros qui démarrent leur carte digitale.",
    hasTrial: false,
    monthly: {
      price: "6 €",
      suffix: "/ mois",
      note: "Facturation mensuelle, sans engagement",
    },
    annual: {
      price: "4,50 €",
      suffix: "/ mois",
      note: "Facturé 54 € / an — soit 2 mois offerts",
      saving: "Économise 18 €/an",
    },
    groups: [
      {
        title: "Fonctionnalités incluses :",
        items: [
          { name: "Liens illimités" },
          { name: "Icônes sociales, vidéos & médias" },
          { name: "Statistiques essentielles" },
          { name: "Design optimisé SEO" },
          { name: "QR code unique" },
        ],
      },
      {
        title: "Carte de visite",
        items: [
          { name: "Thèmes personnalisés", desc: "Palettes de couleurs et thèmes pour matcher ton style." },
          { name: "Capture tes contacts", desc: "Collecte et gère les leads qui scannent ta carte." },
          { name: "Liens de redirection", desc: "Redirige temporairement vers un lien clé." },
        ],
      },
    ],
  },
  pro: {
    name: "Pro",
    tagline: "Pour les pros qui veulent grandir et convertir.",
    badge: "Recommandé",
    hasTrial: true,
    monthly: {
      price: "13 €",
      suffix: "/ mois",
      note: "Facturation mensuelle, sans engagement",
    },
    annual: {
      price: "10,50 €",
      suffix: "/ mois",
      note: "Facturé 126 € / an — soit 2 mois offerts",
      saving: "Économise 30 €/an",
    },
    groups: [
      {
        title: "Tout du Starter, plus :",
        items: [
          { name: "Carte personnalisée", desc: "Ajoute ton logo, des visuels plein écran et un design sur-mesure." },
          { name: "Liens mis en avant", desc: "Mets en avant ce qui compte avec des liens animés." },
          { name: "Statistiques complètes", desc: "Vois les liens les plus performants." },
        ],
      },
      {
        title: "Outils de croissance",
        items: [
          { name: "Réponses Instagram automatisées", desc: "Booste l'engagement via DM automatiques." },
          { name: "Raccourcisseur de liens", desc: "Crée des shortlinks personnalisés avec UTM intégrés." },
          { name: "Intégrations email", desc: "Synchronise tes contacts avec Mailchimp, Klaviyo…" },
        ],
      },
    ],
  },
  premium: {
    name: "Premium",
    tagline: "Pour les équipes & marques qui veulent zéro limite.",
    hasTrial: true,
    monthly: {
      price: "32 €",
      suffix: "/ mois",
      note: "Facturation mensuelle, sans engagement",
    },
    annual: {
      price: "27,50 €",
      suffix: "/ mois",
      note: "Facturé 330 € / an — soit 2 mois offerts",
      saving: "Économise 54 €/an",
    },
    groups: [
      {
        title: "Tout du Pro, plus :",
        items: [
          { name: "Onboarding concierge", desc: "Accompagnement sur-mesure avec support prioritaire dédié." },
          { name: "Posts sociaux illimités", desc: "Passe à l'échelle avec des posts illimités sur 3 marques." },
          { name: "Outils d'équipe en option", desc: "Chat, collaboration et workflows d'approbation." },
          { name: "Réponses Instagram illimitées", desc: "Reach maximal avec auto-réponses illimitées." },
        ],
      },
      {
        title: "Monétisation",
        items: [
          { name: "0 % de frais", desc: "Chaque euro de tes ventes digitales va directement sur ton compte." },
          { name: "100 % des commissions", desc: "Vends des produits affiliés et garde toute la commission." },
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

  const [billing, setBilling] = useState<"monthly" | "annual">(initialBilling);
  // Read from sessionStorage instantly (set during signup), fallback to Supabase
  const [userEmail, setUserEmail] = useState<string | null>(
    typeof window !== "undefined" ? sessionStorage.getItem("onetap_email") : null
  );
  const [checkoutKey, setCheckoutKey] = useState(0);

  useEffect(() => {
    if (userEmail) return; // already have it from sessionStorage
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
  const showTrial = planData.hasTrial;

  const fetchClientSecret = useCallback(async () => {
    if (!userEmail) return "";
    const result = await createEmbeddedCheckout({
      data: { plan: planId, billing, email: userEmail },
    });
    return result.clientSecret ?? "";
  }, [planId, billing, userEmail]);

  function handleBillingChange(newBilling: "monthly" | "annual") {
    setBilling(newBilling);
    setCheckoutKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden px-4 py-4 border-b border-border flex items-center gap-3">
        <button
          onClick={() => navigate({ to: "/inscription/selection-de-plan" })}
          className="text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold">OneTap</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* ─── Left column — Plan details ─── */}
        <div className="lg:w-[55%] flex flex-col px-6 py-8 lg:px-12 lg:py-12 overflow-y-auto">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-3 mb-10">
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

          <div className="max-w-lg w-full mx-auto lg:mx-0">
            {/* Plan header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Offre {planData.name}
                </h1>
                {planData.badge && (
                  <span className="text-xs font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/30 px-2.5 py-1 rounded-full">
                    {planData.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{planData.tagline}</p>
            </div>

            {/* Trial banner */}
            {showTrial && (
              <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3 mb-6">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Essai gratuit 7 jours — 0 € débité aujourd'hui
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Un email de rappel est envoyé 1 jour avant la fin de l'essai pour que tu puisses annuler si besoin.
                  </p>
                </div>
              </div>
            )}

            {/* Billing toggle */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-muted rounded-full p-1 gap-1">
                <button
                  onClick={() => handleBillingChange("monthly")}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                    billing === "monthly"
                      ? "bg-card text-foreground shadow-card"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => handleBillingChange("annual")}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5",
                    billing === "annual"
                      ? "bg-card text-foreground shadow-card"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  Annuel
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded-full">
                    -25%
                  </span>
                </button>
              </div>
            </div>

            {/* Price display */}
            <div className="mb-6 p-5 rounded-2xl border border-border bg-muted/30">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-display font-bold text-foreground">
                  {pricing.price}
                </span>
                <span className="text-sm text-muted-foreground">{pricing.suffix}</span>
              </div>
              <p className="text-xs text-muted-foreground">{pricing.note}</p>
              {billing === "annual" && planData.annual.saving && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3" />
                  {planData.annual.saving}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {planData.groups.map((group, gi) => (
                <div key={gi}>
                  {group.title && (
                    <h3 className="text-sm font-semibold text-foreground mb-3">{group.title}</h3>
                  )}
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-magenta/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-magenta" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Paiement sécurisé SSL
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Sans engagement
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Annulable à tout moment
              </span>
            </div>
          </div>
        </div>

        {/* ─── Right column — Stripe Embedded Checkout ─── */}
        <div className="lg:w-[45%] border-t lg:border-t-0 lg:border-l border-border bg-muted/20 flex flex-col">
          <div className="px-6 py-8 lg:px-10 lg:py-12 flex-1">
            <div className="max-w-md w-full mx-auto">
              {showTrial && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    0 € à payer aujourd'hui — essai gratuit 7 jours
                  </p>
                </div>
              )}

              {!stripePromise ? (
                <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6 text-center">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Configuration requise</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Ajoute <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code> dans les variables d'environnement Vercel.
                  </p>
                </div>
              ) : !userEmail ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-8 h-8 border-2 border-magenta border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Chargement du paiement…</p>
                  <p className="text-xs text-muted-foreground">
                    Tu dois être{" "}
                    <Link to="/inscription" className="text-magenta underline">connecté</Link>{" "}
                    pour accéder au paiement.
                  </p>
                </div>
              ) : (
                <EmbeddedCheckoutProvider
                  key={`${planId}-${billing}-${checkoutKey}`}
                  stripe={stripePromise}
                  options={{ fetchClientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
