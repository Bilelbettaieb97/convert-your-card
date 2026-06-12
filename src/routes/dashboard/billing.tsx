import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createPortalSession } from "@/fns/billing-portal";
import { getStripeInvoices } from "@/fns/stripe-invoices";
import { getStripeCard, type CardInfo } from "@/fns/stripe-card";
import {
  CreditCard, Download, ExternalLink, ChevronRight,
  Clock, CheckCircle2, AlertCircle, RefreshCw, Receipt,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Facturation — Dashboard" }] }),
  component: BillingPage,
});

type Sub = {
  plan: string | null;
  status: string | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

type Invoice = {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: string | null;
  created: number;
  pdf: string | null;
  period_start: number;
  period_end: number;
};

const PLAN_META: Record<string, { label: string; price: string; gradient: string; color: string }> = {
  free:    { label: "Gratuit",  price: "0 €/mois",   gradient: "linear-gradient(135deg,#374151,#4b5563)", color: "#9ca3af" },
  starter: { label: "Starter",  price: "6 €/mois",   gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#3b82f6" },
  pro:     { label: "Pro",      price: "13 €/mois",  gradient: "linear-gradient(135deg,#7c3aed,#EC4899)", color: "#8B5CF6" },
  premium: { label: "Premium",  price: "32 €/mois",  gradient: "linear-gradient(135deg,#b45309,#F59E0B)", color: "#F59E0B" },
  essentielle: { label: "Essentielle", price: "Gratuit", gradient: "linear-gradient(135deg,#0f766e,#0ea5e9)", color: "#0ea5e9" },
  vitrine: { label: "Vitrine",  price: "4,80 €/mois", gradient: "linear-gradient(135deg,#7c3aed,#EC4899)", color: "#8B5CF6" },
};

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function fmtAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}
function fmtIso(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function StatusChip({ status }: { status: string | null }) {
  if (status === "active")   return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Actif</span>;
  if (status === "trialing") return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock className="w-3 h-3" />Essai gratuit</span>;
  if (status === "canceled") return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20"><AlertCircle className="w-3 h-3" />Annulé</span>;
  if (status === "past_due") return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20"><AlertCircle className="w-3 h-3" />Paiement en retard</span>;
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground border border-border">{status ?? "—"}</span>;
}

function InvoiceStatus({ status }: { status: string | null }) {
  if (status === "paid")   return <span className="flex items-center gap-1 text-[11px] text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Payée</span>;
  if (status === "open")   return <span className="flex items-center gap-1 text-[11px] text-amber-400"><Clock className="w-3 h-3" /> En attente</span>;
  if (status === "void")   return <span className="text-[11px] text-muted-foreground">Annulée</span>;
  return <span className="text-[11px] text-muted-foreground">{status}</span>;
}

function BillingPage() {
  const [sub, setSub] = useState<Sub | null>(null);
  const [profilePlan, setProfilePlan] = useState<string | null>(null);
  const [card, setCard] = useState<CardInfo | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingSub, setLoadingSub] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [openingPortal, setOpeningPortal] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoadingSub(false); return; }

      const [{ data: subData }, { data: profileData }] = await Promise.all([
        supabase
          .from("subscriptions")
          .select("plan, status, current_period_end, stripe_customer_id, stripe_subscription_id")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("nfc_profiles")
          .select("plan")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      const s = subData as Sub | null;
      setSub(s);
      setProfilePlan((profileData as { plan?: string } | null)?.plan ?? null);
      setLoadingSub(false);

      // Fetch card info — use stored customer ID if available, otherwise look up by email
      let resolvedCustomerId = s?.stripe_customer_id ?? null;
      try {
        const cardInfo = await getStripeCard({
          data: {
            email: user.email!,
            customerId: s?.stripe_customer_id ?? undefined,
          },
        });
        if (cardInfo) {
          setCard(cardInfo as CardInfo);
          if (cardInfo.customerId) {
            resolvedCustomerId = cardInfo.customerId;
            if (!s?.stripe_customer_id) {
              setSub((prev) => ({
                plan: prev?.plan ?? null,
                status: prev?.status ?? null,
                current_period_end: prev?.current_period_end ?? null,
                stripe_subscription_id: prev?.stripe_subscription_id ?? null,
                stripe_customer_id: cardInfo.customerId,
              }));
            }
          }
        }
      } catch {
        // Stripe unreachable or no card yet
      }

      if (resolvedCustomerId) {
        setLoadingInvoices(true);
        try {
          const list = await getStripeInvoices({ data: { customerId: resolvedCustomerId } });
          setInvoices(list as Invoice[]);
        } catch {
          // Stripe not reachable or no invoices yet
        }
        setLoadingInvoices(false);
      }
    });
  }, []);

  async function openPortal() {
    if (!sub?.stripe_customer_id) return;
    setOpeningPortal(true);
    try {
      const returnUrl = window.location.href;
      const { url } = await createPortalSession({ data: { customerId: sub.stripe_customer_id, returnUrl } });
      if (url) window.location.href = url;
    } catch {
      setOpeningPortal(false);
    }
  }

  // subscriptions.plan can be "free" even when the user is on a paid plan (plan column not set by webhook)
  // nfc_profiles.plan is the source of truth — use it when sub.plan is missing or "free"
  const plan = (sub?.plan && sub.plan !== "free") ? sub.plan : (profilePlan ?? sub?.plan ?? "free");
  const meta = PLAN_META[plan] ?? PLAN_META.free;
  const hasSub = !!(sub?.stripe_customer_id || card?.customerId);

  const cardBrand = card ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1) : null;
  const cardLabel = card ? `${cardBrand} •••• ${card.last4}` : hasSub ? "Carte enregistrée" : "Aucune";
  const cardSub = card
    ? `Expire ${String(card.exp_month).padStart(2, "0")}/${card.exp_year}`
    : hasSub ? "Gérable via Stripe" : "Abonnement gratuit";

  if (loadingSub) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="p-5 lg:p-8 max-w-3xl space-y-6">

      {/* ── Plan hero ── */}
      <div className="relative rounded-2xl overflow-hidden p-6" style={{ background: meta.gradient }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 60%)" }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-1">Plan actuel</p>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-bold text-white">{meta.label}</h2>
              <StatusChip status={sub?.status ?? null} />
            </div>
            <p className="text-white/60 text-sm mt-1">{meta.price}</p>
            {sub?.current_period_end && sub.status !== "canceled" && (
              <p className="text-white/45 text-xs mt-2">
                {sub.status === "trialing" ? "Essai jusqu'au" : "Renouvellement le"} {fmtIso(sub.current_period_end)}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {hasSub && (
              <button
                onClick={openPortal}
                disabled={openingPortal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 text-white transition disabled:opacity-60"
              >
                {openingPortal ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Gérer via Stripe
              </button>
            )}
            <Link
              to="/dashboard/account"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white/60 hover:text-white transition"
            >
              Changer d'abonnement <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Info cards row ── */}
      <div className="grid sm:grid-cols-3 gap-3">
        <InfoCard
          label="Méthode de paiement"
          value={cardLabel}
          sub={cardSub}
          icon={<CreditCard className="w-4 h-4" />}
          action={hasSub ? { label: "Modifier", onClick: openPortal, loading: openingPortal } : undefined}
        />
        <InfoCard
          label="Prochain prélèvement"
          value={sub?.current_period_end && sub.status === "active" ? fmtIso(sub.current_period_end) : "—"}
          sub={plan !== "free" && sub?.status === "active" ? meta.price : sub?.status === "trialing" ? "Fin de l'essai" : "Aucun abonnement actif"}
          icon={<Clock className="w-4 h-4" />}
        />
        <InfoCard
          label="Factures"
          value={loadingInvoices ? "…" : `${invoices.length} facture${invoices.length !== 1 ? "s" : ""}`}
          sub={invoices.length > 0 ? `Dernière : ${fmtAmount(invoices[0].amount, invoices[0].currency)}` : hasSub ? "Aucune pour l'instant" : "Non applicable"}
          icon={<Receipt className="w-4 h-4" />}
        />
      </div>

      {/* ── Invoice history ── */}
      <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Historique des factures</h3>
          {hasSub && (
            <button
              onClick={openPortal}
              disabled={openingPortal}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition disabled:opacity-50"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Portail Stripe
            </button>
          )}
        </div>

        {loadingInvoices ? (
          <div className="px-5 py-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" /> Chargement des factures…
          </div>
        ) : invoices.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Receipt className="w-10 h-10 mx-auto opacity-15 mb-3" />
            <p className="text-sm text-muted-foreground font-medium">Aucune facture pour l'instant</p>
            <p className="text-xs text-muted-foreground mt-1 opacity-70">
              {hasSub ? "Tes prochaines factures apparaîtront ici après le premier prélèvement." : "Les factures s'affichent dès que tu as un abonnement actif."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {invoices.map((inv) => (
              <div key={inv.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/20 transition">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground font-mono">{inv.number}</span>
                    <InvoiceStatus status={inv.status} />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {fmtDate(inv.period_start)} → {fmtDate(inv.period_end)}
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground shrink-0">
                  {fmtAmount(inv.amount, inv.currency)}
                </div>
                {inv.pdf ? (
                  <a
                    href={inv.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 h-8 w-8 grid place-items-center rounded-lg bg-muted hover:bg-accent transition text-muted-foreground hover:text-foreground"
                    title="Télécharger la facture PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="shrink-0 h-8 w-8" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Discreet footer ── */}
      <p className="text-center text-xs text-muted-foreground">
        Questions ou changement de plan ?{" "}
        <Link to="/dashboard/account" className="underline underline-offset-2 hover:text-foreground transition">
          Voir tous les plans
        </Link>
        {" · "}
        <a href="mailto:bilel@convertilab.com" className="underline underline-offset-2 hover:text-foreground transition">
          Contacter le support
        </a>
      </p>

    </div>
  );
}

function InfoCard({
  label, value, sub, icon, action,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  action?: { label: string; onClick: () => void; loading?: boolean };
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-wider">
        {icon} {label}
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          disabled={action.loading}
          className="mt-auto text-[11px] text-primary hover:underline transition text-left disabled:opacity-50"
        >
          {action.loading ? "Chargement…" : action.label + " →"}
        </button>
      )}
    </div>
  );
}

export default BillingPage;
