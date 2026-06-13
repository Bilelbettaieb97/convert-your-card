import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2, Mail, LogOut, Settings, CreditCard, HelpCircle, Package, ArrowRight } from "lucide-react";
import { UpsellSection } from "@/components/dashboard/UpsellSection";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { usePlan } from "@/lib/use-plan";
import { createCheckoutSession } from "@/fns/checkout";
import { createPortalSession } from "@/fns/billing-portal";
import { clearProfileMeta } from "@/lib/profile-store";

export const Route = createFileRoute("/dashboard/account")({
  component: AccountPage,
});

const PLANS = [
  {
    id: "essentielle",
    label: "Essentielle",
    price: "Gratuit",
    description: "Le minimum pour être joignable. Gratuit pour toujours.",
    features: ["Identité, contact, vCard", "Boutons d'action", "Bio & badges"],
  },
  {
    id: "vitrine",
    label: "Vitrine",
    price: "4,80 €/mois",
    description: "Toutes les briques pour vendre ton savoir-faire.",
    features: [
      "Tout le plan Essentielle",
      "Services, témoignages, réalisations",
      "Vidéo, RDV, réseaux sociaux, stats",
    ],
    highlight: true,
  },
];

function AccountPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { plan, loading, isInTrial, trialDaysLeft, paymentMethodSet } = usePlan();
  const [upgrading, setUpgrading] = useState(false);
  const [managing, setManaging] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .maybeSingle();
      setCustomerId((data as any)?.stripe_customer_id ?? null);
    });
  }, []);

  async function handleUpgrade() {
    if (!user?.email) return;
    setUpgrading(true);
    try {
      const { url } = await createCheckoutSession({
        data: { plan: "vitrine", billing: "monthly", email: user.email },
      });
      if (url) window.location.href = url;
    } catch {
      setUpgrading(false);
    }
  }

  async function handleManageSubscription() {
    if (!customerId) return;
    setManaging(true);
    try {
      const { url } = await createPortalSession({
        data: { customerId, returnUrl: window.location.href },
      });
      if (url) window.location.href = url;
    } catch {
      setManaging(false);
    }
  }

  async function handleSignOut() {
    clearProfileMeta();
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 space-y-10">

      {/* ── Raccourcis mobile uniquement ── */}
      <div className="md:hidden grid grid-cols-2 gap-3 -mt-2">
        {[
          { to: "/dashboard/billing",   icon: CreditCard, label: "Facturation", hint: "Factures & paiement", iconCls: "text-violet-500", bgCls: "bg-violet-500/12 border-violet-500/25" },
          { to: "/dashboard/settings",  icon: Settings,   label: "Paramètres",  hint: "Sécurité & RGPD",     iconCls: "text-sky-500",    bgCls: "bg-sky-500/12 border-sky-500/25" },
          { to: "/dashboard/help",      icon: HelpCircle, label: "Aide",        hint: "Checklist & tutos",   iconCls: "text-amber-500",  bgCls: "bg-amber-500/12 border-amber-500/25" },
          { to: "/dashboard/commander", icon: Package,    label: "Carte NFC",   hint: "Commander physique",  iconCls: "text-emerald-500", bgCls: "bg-emerald-500/12 border-emerald-500/25" },
        ].map(({ to, icon: Icon, label, hint, iconCls, bgCls }) => (
          <Link key={to} to={to}
            className={`flex flex-col gap-2.5 rounded-2xl border p-3.5 transition active:scale-95 ${bgCls}`}
          >
            <span className={`w-9 h-9 rounded-xl grid place-items-center bg-background/60 shrink-0 ${iconCls}`}>
              <Icon className="w-4.5 h-4.5" />
            </span>
            <div>
              <div className="text-sm font-semibold">{label}</div>
              <div className="text-[11px] text-muted-foreground">{hint}</div>
            </div>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="font-display text-2xl font-medium">Plan</h2>
        {isInTrial && !paymentMethodSet ? (
          <p className="text-sm text-amber-500 font-medium mt-1 mb-5">
            Période d'essai en cours — {trialDaysLeft} jour{trialDaysLeft > 1 ? "s" : ""} restant{trialDaysLeft > 1 ? "s" : ""}. Active ton abonnement pour ne pas perdre ta carte.
          </p>
        ) : isInTrial && paymentMethodSet ? (
          <p className="text-sm text-emerald-500 font-medium mt-1 mb-5">
            Abonnement confirmé ✓ — tu seras débité automatiquement à la fin de ton essai.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mt-1 mb-5">
            Tu peux changer de plan à tout moment, sans engagement.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLANS.map((p) => {
            const current = !loading && (plan === p.id || (p.id === "essentielle" && (plan === "free" || !plan)));
            return (
              <Card key={p.id} className={`p-5 relative ${(current && !isInTrial) || (p.id === "vitrine" && isInTrial && paymentMethodSet) ? "border-primary shadow-[var(--shadow-elegant)]" : p.highlight ? "border-primary/60" : ""}`}>
                {((current && !isInTrial) || (p.id === "vitrine" && isInTrial && paymentMethodSet)) && (
                  <span className="absolute -top-2 left-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Plan actuel
                  </span>
                )}
                {isInTrial && p.id === "vitrine" && !paymentMethodSet && (
                  <span className="absolute -top-2 left-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">
                    Période d'essai
                  </span>
                )}
                {!current && p.highlight && !isInTrial && (
                  <span className="absolute -top-2 right-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    <Crown className="h-3 w-3" /> Recommandé
                  </span>
                )}
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-display text-xl">{p.label}</h3>
                  <span className="text-sm text-muted-foreground">{p.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <ul className="space-y-2 mb-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {/* Vitrine card en trial sans CB → bouton activer via Billing Portal */}
                {p.id === "vitrine" && isInTrial && !paymentMethodSet ? (
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={handleManageSubscription} disabled={managing}>
                    {managing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {managing ? "Redirection…" : "Activer mon abonnement — 4,80€/mois"}
                  </Button>
                ) : (p.id === "vitrine" && isInTrial && paymentMethodSet) || current ? (
                  <Button variant="outline" disabled className="w-full">Plan actuel ✓</Button>
                ) : p.id === "vitrine" ? (
                  <Button className="w-full" onClick={handleUpgrade} disabled={upgrading}>
                    {upgrading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {upgrading ? "Redirection…" : "Passer à Vitrine — 4,80€/mois"}
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="w-full">Plan actuel</Button>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <section className="-mx-5">
        <UpsellSection />
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium">Compte</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-5">Gère ton adresse email et ta session.</p>
        <Card className="divide-y divide-border">
          <div className="p-4 flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Adresse email</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email ?? "—"}</div>
            </div>
            <Link to="/dashboard/settings">
              <Button size="sm" variant="outline">
                <Settings className="h-3.5 w-3.5 mr-1.5" />Modifier
              </Button>
            </Link>
          </div>
          <div className="p-4 flex items-center gap-3">
            <LogOut className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Se déconnecter</div>
              <div className="text-xs text-muted-foreground">Fermer la session en cours</div>
            </div>
            <Button size="sm" variant="outline" onClick={handleSignOut}>Déconnexion</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
