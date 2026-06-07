import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Check, X as XIcon, CreditCard, ChevronRight, Shield, Wifi, Smartphone,
  ArrowUpRight, Clock,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Subscription = Tables<"subscriptions">;

type PlanId = "free" | "starter" | "pro" | "premium";

const PLAN_META: Record<PlanId, { label: string; price: string; gradient: string; color: string }> = {
  free:    { label: "Gratuit",  price: "0€",   gradient: "linear-gradient(135deg,#475569,#64748b)", color: "#94a3b8" },
  starter: { label: "Starter",  price: "6€",   gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#3b82f6" },
  pro:     { label: "Pro",      price: "13€",  gradient: "linear-gradient(135deg,#7c3aed,#EC4899)", color: "#8B5CF6" },
  premium: { label: "Premium",  price: "32€",  gradient: "linear-gradient(135deg,#b45309,#F59E0B)", color: "#F59E0B" },
};

const PLAN_NEXT: Record<PlanId, PlanId | null> = {
  free: "starter", starter: "pro", pro: "premium", premium: null,
};

type FeatureRow = {
  label: string;
  free: string | boolean;
  starter: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
};

const FEATURES: FeatureRow[] = [
  { label: "Carte de visite digitale",  free: true,    starter: true,  pro: true,   premium: true },
  { label: "Partage QR Code + NFC",     free: true,    starter: true,  pro: true,   premium: true },
  { label: "Thèmes personnalisables",   free: true,    starter: true,  pro: true,   premium: true },
  { label: "Analytics 7 jours",         free: true,    starter: true,  pro: true,   premium: true },
  { label: "Analytics 30 jours",        free: false,   starter: true,  pro: true,   premium: true },
  { label: "Analytics 90 jours",        free: false,   starter: false, pro: true,   premium: true },
  { label: "Slug personnalisé",         free: false,   starter: true,  pro: true,   premium: true },
  { label: "Modèles",                   free: "3",     starter: "10",  pro: "Tous", premium: "Tous" },
  { label: "Suppression branding",      free: false,   starter: false, pro: true,   premium: true },
  { label: "Support par email",         free: false,   starter: true,  pro: true,   premium: true },
  { label: "Support prioritaire",       free: false,   starter: false, pro: false,  premium: true },
  { label: "Account manager dédié",     free: false,   starter: false, pro: false,  premium: true },
];

export const Route = createFileRoute("/dashboard/abonnement")({
  component: AbonnementPage,
});

function AbonnementPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
      setSubscription(data ?? null);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const plan = (subscription?.plan ?? "free") as PlanId;
  const meta = PLAN_META[plan];
  const nextPlan = PLAN_NEXT[plan];
  const status = subscription?.status ?? "active";

  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  // Trial: estimate if current_period_end is within 7 days from now
  const isTrialing = subscription?.current_period_end
    ? new Date(subscription.current_period_end).getTime() - Date.now() < 7 * 86400000
      && new Date(subscription.current_period_end).getTime() > Date.now()
      && plan !== "free"
    : false;

  const trialDaysLeft = subscription?.current_period_end
    ? Math.ceil((new Date(subscription.current_period_end).getTime() - Date.now()) / 86400000)
    : 0;

  async function handleManage() {
    toast.info("Redirection vers le portail de gestion…");
    window.open("mailto:bilel@convertilab.com?subject=Gestion de mon abonnement OneTap", "_blank");
  }

  return (
    <>
      <Toaster />
      <div className="p-6 lg:p-8 max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Abonnement</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gérez votre plan et vos options de facturation.</p>
        </div>

        {/* Current plan hero */}
        <div className="relative rounded-3xl overflow-hidden p-6 lg:p-8" style={{ background: meta.gradient }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Plan actuel</p>
              <h2 className="text-4xl font-bold text-white">{meta.label}</h2>
              <p className="text-white/70 text-sm mt-1">{meta.price}/mois</p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {status === "active" ? "Actif" : status}
                </span>
                {isTrialing && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200">
                    <Clock className="w-3 h-3" />
                    Essai — {trialDaysLeft}j restants
                  </span>
                )}
                {periodEnd && (
                  <span className="text-xs text-white/50">Renouvellement le {periodEnd}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {nextPlan && (
                <Link
                  to="/inscription/selection-de-plan"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white transition hover:bg-white/90"
                  style={{ color: meta.color }}
                >
                  Passer à {PLAN_META[nextPlan].label} <ChevronRight className="w-4 h-4" />
                </Link>
              )}
              {plan !== "free" && (
                <button onClick={handleManage}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white/70 bg-white/10 hover:bg-white/15 transition">
                  <CreditCard className="w-4 h-4" /> Gérer mon abonnement
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-bold text-foreground text-lg">Comparaison des plans</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Votre plan actuel est mis en évidence.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-muted-foreground w-1/3">Fonctionnalité</th>
                  {(["free", "starter", "pro", "premium"] as PlanId[]).map((p) => (
                    <th key={p} className="p-4 text-center font-bold w-[16.66%]"
                      style={{
                        color: plan === p ? PLAN_META[p].color : "var(--color-muted-foreground)",
                        background: plan === p ? `${PLAN_META[p].color}08` : "transparent",
                      }}>
                      <div className="flex flex-col items-center gap-1">
                        {plan === p && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1"
                            style={{ background: `${PLAN_META[p].color}20`, color: PLAN_META[p].color }}>
                            Actuel
                          </span>
                        )}
                        {PLAN_META[p].label}
                        <span className="text-xs font-normal" style={{ color: "var(--color-muted-foreground)" }}>
                          {PLAN_META[p].price}/mois
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((row, i) => (
                  <tr key={row.label}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    style={{ background: i % 2 === 0 ? "transparent" : "var(--color-muted)/20" }}>
                    <td className="p-4 font-medium text-foreground">{row.label}</td>
                    {(["free", "starter", "pro", "premium"] as PlanId[]).map((p) => {
                      const val = row[p];
                      const isCurrent = plan === p;
                      return (
                        <td key={p} className="p-4 text-center"
                          style={{ background: isCurrent ? `${PLAN_META[p].color}05` : "transparent" }}>
                          {typeof val === "boolean" ? (
                            val
                              ? <Check className="w-4 h-4 mx-auto" style={{ color: isCurrent ? PLAN_META[p].color : "#10B981" }} />
                              : <XIcon className="w-4 h-4 mx-auto text-muted-foreground/40" />
                          ) : (
                            <span className="text-xs font-semibold" style={{ color: isCurrent ? PLAN_META[p].color : "var(--color-foreground)" }}>
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              {nextPlan && (
                <tfoot>
                  <tr>
                    <td className="p-4" />
                    {(["free", "starter", "pro", "premium"] as PlanId[]).map((p) => (
                      <td key={p} className="p-4 text-center">
                        {p !== plan && p !== "free" && (
                          <Link
                            to="/inscription/selection-de-plan"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition hover:opacity-90"
                            style={{ background: PLAN_META[p].gradient }}>
                            Choisir <ChevronRight className="w-3 h-3" />
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Physical card upsell */}
        <div className="relative rounded-3xl overflow-hidden p-6 lg:p-8"
          style={{ background: "linear-gradient(135deg,#0f0520 0%,#1a0b2e 50%,#0a1a2e 100%)" }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-16 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#8B5CF6,#EC4899)", boxShadow: "0 12px 30px -8px #8B5CF680" }}>
              <Wifi className="w-7 h-7 text-white/80" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">Passez au physique.</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Carte NFC imprimée, livrée en 5–7 jours. Lié automatiquement à votre page digitale.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {["NFC + QR Code", "Livraison incluse", "Design premium", "Relié à votre carte digitale"].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <Shield className="w-3 h-3 text-violet-400" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/inscription/carte-physique"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)", boxShadow: "0 8px 30px -8px #8B5CF680" }}>
              Commander — 29€ <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-center text-xs text-muted-foreground">
          Questions sur votre abonnement ?{" "}
          <a href="mailto:bilel@convertilab.com" className="text-magenta hover:underline font-medium">
            bilel@convertilab.com
          </a>
        </p>
      </div>
    </>
  );
}
