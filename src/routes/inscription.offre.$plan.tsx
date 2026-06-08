import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { Check, ArrowLeft, Shield, Zap, Clock, Star } from "lucide-react";

export const Route = createFileRoute("/inscription/offre/$plan")({
  validateSearch: z.object({
    billing: z.enum(["monthly", "annual"]).default("monthly"),
  }),
  head: ({ params }) => ({
    meta: [
      { title: `Offre ${params.plan} — CVD` },
      { name: "description", content: "Abonne-toi à CVD et lance ta carte de visite digitale." },
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
  monthly: { price: string; note: string };
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkoutKey, setCheckoutKey] = useState(0);
  // mounted = true only after client hydration, to avoid SSR mismatch with Stripe
  const [mounted, setMounted] = useState(false);
  const [stripePromise] = useState(() =>
    typeof window !== "undefined"
      ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "")
      : null
  );

  useEffect(() => {
    setMounted(true);
    // Read email from sessionStorage (instant) or Supabase fallback
    const cached = sessionStorage.getItem("onetap_email");
    if (cached) {
      setUserEmail(cached);
    } else {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user?.email) {
          sessionStorage.setItem("onetap_email", user.email);
          setUserEmail(user.email);
        }
      });
    }
  }, []);

  // Remount embedded checkout when billing or plan changes
  useEffect(() => {
    setCheckoutKey((k) => k + 1);
  }, [billing, planId]);

  const fetchClientSecret = useCallback(async () => {
    if (!userEmail) return "";
    try {
      const res = await fetch("/api/checkout-embedded", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billing, email: userEmail }),
      });
      if (!res.ok) return "";
      const data = await res.json();
      return data.clientSecret ?? "";
    } catch {
      return "";
    }
  }, [planId, billing, userEmail]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden px-4 py-4 border-b border-border flex items-center gap-3">
        <button onClick={() => navigate({ to: "/inscription/selection-de-plan" })} className="text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ─── Colonne gauche — Détails du plan ─── */}
        <div className="lg:w-[50%] flex flex-col px-6 py-8 lg:px-12 lg:py-12">
          <div className="hidden lg:flex items-center gap-3 mb-10">
            <Link to="/inscription/selection-de-plan" className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
            </div>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0 flex-1">
            <div className="mb-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl font-display font-bold text-foreground">Offre {planData.name}</h1>
                {planData.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/30 px-2.5 py-1 rounded-full">
                    {planData.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{planData.tagline}</p>
            </div>

            {planData.hasTrial && (
              <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3.5 mb-5">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Essai gratuit 7 jours — 0 € débité aujourd'hui
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Rappel par email 1 jour avant la fin ({trialDateStr}). Annulable sans frais.
                  </p>
                </div>
              </div>
            )}

            <div className="mb-5">
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

            <div className="mb-6 p-4 rounded-2xl border border-border bg-muted/30">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-display font-bold text-foreground">{pricing.price}</span>
                <span className="text-sm text-muted-foreground">/ mois</span>
              </div>
              <p className="text-xs text-muted-foreground">{pricing.note}</p>
              {billing === "annual" && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3" />
                  {planData.annual.saving}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {planData.groups.map((group, gi) => (
                <div key={gi}>
                  {group.title && <h3 className="text-sm font-semibold text-foreground mb-3">{group.title}</h3>}
                  <ul className="space-y-2.5">
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

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" />Paiement sécurisé SSL</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />Sans engagement</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" />Annulable à tout moment</span>
            </div>
          </div>
        </div>

        {/* ─── Colonne droite — Stripe Embedded Checkout ─── */}
        <div className="lg:w-[50%] border-t lg:border-t-0 lg:border-l border-border bg-background">
          {/* Ne render Stripe que côté client après hydration */}
          {!mounted || !stripePromise ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-muted-foreground text-sm">Chargement du paiement…</p>
            </div>
          ) : !userEmail ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center px-6">
                <p className="text-muted-foreground mb-4">Tu dois être connecté pour accéder au paiement.</p>
                <Link to="/connexion" className="bg-gradient-cta text-primary-foreground rounded-full px-6 py-2.5 text-sm font-semibold">
                  Se connecter
                </Link>
              </div>
            </div>
          ) : (
            <EmbeddedCheckoutProvider
              key={String(checkoutKey)}
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  );
}
