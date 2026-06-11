import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2, Mail, LogOut, Settings } from "lucide-react";
import { UpsellSection } from "@/components/dashboard/UpsellSection";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { usePlan } from "@/lib/use-plan";
import { createCheckoutSession } from "@/fns/checkout";

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
    description: "Toutes les briques pour vendre votre savoir-faire.",
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
  const { plan, loading } = usePlan();
  const [upgrading, setUpgrading] = useState(false);

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

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 space-y-10">
      <section>
        <h2 className="font-display text-2xl font-medium">Plan</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Vous pouvez changer de plan à tout moment, sans engagement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLANS.map((p) => {
            const current = !loading && (plan === p.id || (p.id === "essentielle" && (plan === "free" || !plan)));
            return (
              <Card key={p.id} className={`p-5 relative ${current ? "border-primary shadow-[var(--shadow-elegant)]" : p.highlight ? "border-primary/60" : ""}`}>
                {current && (
                  <span className="absolute -top-2 left-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Plan actuel
                  </span>
                )}
                {!current && p.highlight && (
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
                {current ? (
                  <Button variant="outline" disabled className="w-full">Plan actuel</Button>
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
        <p className="text-sm text-muted-foreground mt-1 mb-5">Gérez votre adresse email et votre session.</p>
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
