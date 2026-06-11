import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Users, ExternalLink, RefreshCw, Clock, CheckCircle2, XCircle,
  TrendingUp, Mail, AlertTriangle, ChevronRight,
} from "lucide-react";

const ADMIN_EMAIL = "bilel@convertilab.com";

type FunnelRow = {
  user_id: string;
  email: string;
  inscrit_le: string | null;
  email_confirme_le: string | null;
  plan: string | null;
  actif: boolean | null;
  slug: string | null;
  nom: string | null;
  entreprise: string | null;
  fonction: string | null;
  profil_cree_le: string | null;
  subscription_cree_le: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string | null;
  trial_end: string | null;
  relance_step: number | null;
  builder_relance_step: number | null;
  vitrine_relance_step: number | null;
  trial_relance_step: number | null;
  trial_relance_sent_at: string | null;
};

type Tab = "all" | "trial" | "active" | "expired" | "funnel";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysLeft(trialEnd: string | null): number {
  if (!trialEnd) return 0;
  return Math.ceil((new Date(trialEnd).getTime() - Date.now()) / 86_400_000);
}

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function fmtDateTime(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ row }: { row: FunnelRow }) {
  const status = row.subscription_status;
  if (status === "trialing") {
    const days = daysLeft(row.trial_end);
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
        <Clock className="w-3 h-3" />
        Trial · J{days >= 0 ? `+${days}` : days}
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        <CheckCircle2 className="w-3 h-3" />
        Actif
      </span>
    );
  }
  if (status === "canceled") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
        <XCircle className="w-3 h-3" />
        Expiré
      </span>
    );
  }
  if (row.email_confirme_le) {
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
        Builder
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
      Inscrit
    </span>
  );
}

function FunnelStep({ row }: { row: FunnelRow }) {
  const steps = [
    { key: "inscrit", label: "Inscrit", done: !!row.inscrit_le },
    { key: "email", label: "Email ✓", done: !!row.email_confirme_le },
    { key: "carte", label: "Carte créée", done: !!row.profil_cree_le },
    { key: "trial", label: "Trial", done: !!row.subscription_cree_le },
    { key: "payé", label: "Payé", done: row.subscription_status === "active" },
  ];
  const currentIdx = steps.reduce((acc, s, i) => (s.done ? i : acc), -1);
  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              i === currentIdx
                ? "bg-primary/20 text-primary"
                : s.done
                ? "text-muted-foreground line-through"
                : "text-muted-foreground/40"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-muted-foreground/30 shrink-0" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function TrialEmailStatus({ row }: { row: FunnelRow }) {
  const step = row.trial_relance_step ?? 0;
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2].map((s) => (
        <div
          key={s}
          title={s === 1 ? "J+1 : onboarding" : "J+2 : urgence"}
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
            step >= s
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
              : "bg-muted border-border text-muted-foreground/40"
          }`}
        >
          {s}
        </div>
      ))}
      {step === 0 && <span className="text-[10px] text-muted-foreground">Aucun</span>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<FunnelRow[]>([]);
  const [tab, setTab] = useState<Tab>("all");

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate({ to: "/", replace: true });
        return;
      }
      setAuthorized(true);
      await loadUsers();
      setLoading(false);
    }
    checkAuth();
  }, []);

  async function loadUsers() {
    setRefreshing(true);
    const { data, error } = await supabase.rpc("get_user_funnel");
    if (error) {
      toast.error("Erreur chargement : " + error.message);
    } else {
      setUsers((data as unknown as FunnelRow[]) ?? []);
    }
    setRefreshing(false);
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const total = users.length;
  const trialCount = users.filter(u => u.subscription_status === "trialing").length;
  const activeCount = users.filter(u => u.subscription_status === "active").length;
  const expiredCount = users.filter(u => u.subscription_status === "canceled").length;
  const mrr = activeCount * 4.8;

  // ── Filtered rows ──────────────────────────────────────────────────────────
  const filtered = tab === "all" ? users
    : tab === "trial" ? users.filter(u => u.subscription_status === "trialing")
    : tab === "active" ? users.filter(u => u.subscription_status === "active")
    : tab === "expired" ? users.filter(u => u.subscription_status === "canceled")
    : users; // funnel = all

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!authorized) return null;

  const TABS: Array<{ id: Tab; label: string; count?: number; color?: string }> = [
    { id: "all", label: "Tous", count: total },
    { id: "trial", label: "Trial ⏰", count: trialCount, color: "amber" },
    { id: "active", label: "Actifs ✅", count: activeCount, color: "emerald" },
    { id: "expired", label: "Expirés ❌", count: expiredCount, color: "red" },
    { id: "funnel", label: "Funnel 📊" },
  ];

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background text-foreground">

        {/* ── Header ── */}
        <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-sm">Admin CVD</h1>
              <p className="text-[11px] text-muted-foreground">cartevisitedigitale.fr</p>
            </div>
          </div>
          <button
            onClick={loadUsers}
            disabled={refreshing}
            className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-muted/50 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-6">

          {/* ── Stats cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total inscrits", value: total, icon: Users, color: "text-foreground" },
              { label: "En trial", value: trialCount, icon: Clock, color: "text-amber-400" },
              { label: "Actifs (payants)", value: activeCount, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "MRR estimé", value: `${mrr.toFixed(2)}€`, icon: TrendingUp, color: "text-primary" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-card border border-border rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* ── Trial alert ── */}
          {trialCount > 0 && (
            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-300">
                  {trialCount} utilisateur{trialCount > 1 ? "s" : ""} en période d'essai
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Les emails J+1 et J+2 partent automatiquement via le cron.
                  Cliquez sur "Trial ⏰" pour voir le détail.
                </p>
              </div>
            </div>
          )}

          {/* ── Tabs ── */}
          <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-xl border border-border w-fit">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  tab === t.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Table ── */}
          {tab !== "funnel" ? (
            <div className="bg-card border border-border rounded-2xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Utilisateur</th>
                    {tab === "trial" && (
                      <>
                        <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Trial</th>
                        <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Emails envoyés</th>
                      </>
                    )}
                    {tab !== "trial" && (
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Statut</th>
                    )}
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Plan</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Inscrit le</th>
                    <th className="text-right px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Carte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground text-sm">
                        Aucun utilisateur dans cette catégorie.
                      </td>
                    </tr>
                  )}
                  {filtered.map((row) => {
                    const days = daysLeft(row.trial_end);
                    const urgentTrial = row.subscription_status === "trialing" && days <= 1;
                    return (
                      <tr
                        key={row.user_id}
                        className={`hover:bg-muted/20 transition ${urgentTrial ? "bg-amber-500/[0.04]" : ""}`}
                      >
                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {(row.nom ?? row.email)[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm leading-tight">
                                {row.nom ?? "—"}
                                {urgentTrial && <span className="ml-1.5 text-amber-400 text-xs">⏰</span>}
                              </p>
                              <p className="text-xs text-muted-foreground">{row.email}</p>
                              {row.slug && (
                                <p className="text-[10px] text-muted-foreground/60 font-mono">/{row.slug}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Trial-specific columns */}
                        {tab === "trial" && (
                          <>
                            <td className="px-5 py-4">
                              <div className="space-y-1">
                                <StatusBadge row={row} />
                                <p className="text-[11px] text-muted-foreground">
                                  Fin : {fmtDateTime(row.trial_end)}
                                </p>
                                <p className={`text-[11px] font-semibold ${
                                  days <= 0 ? "text-red-400" : days === 1 ? "text-amber-400" : "text-muted-foreground"
                                }`}>
                                  {days <= 0 ? "Expiré" : `J-${days}`}
                                </p>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="space-y-1.5">
                                <TrialEmailStatus row={row} />
                                {row.trial_relance_sent_at && (
                                  <p className="text-[10px] text-muted-foreground">
                                    Dernier : {fmtDateTime(row.trial_relance_sent_at)}
                                  </p>
                                )}
                              </div>
                            </td>
                          </>
                        )}

                        {/* Status (non-trial tabs) */}
                        {tab !== "trial" && (
                          <td className="px-5 py-4 hidden md:table-cell">
                            <StatusBadge row={row} />
                          </td>
                        )}

                        {/* Plan */}
                        <td className="px-5 py-4 hidden lg:table-cell">
                          {row.plan ? (
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                              {row.plan}
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-xs text-muted-foreground hidden lg:table-cell">
                          {fmtDate(row.inscrit_le)}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          {row.slug ? (
                            <a
                              href={`${appUrl}/${row.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Voir
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">Pas de carte</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* ── Funnel view ── */
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Étapes du funnel par utilisateur — du plus récent au plus ancien.</p>
              <div className="bg-card border border-border rounded-2xl overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Utilisateur</th>
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Progression</th>
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Statut</th>
                      <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Emails relance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((row) => (
                      <tr key={row.user_id} className="hover:bg-muted/20 transition">
                        <td className="px-5 py-4">
                          <p className="font-medium text-foreground text-sm">{row.nom ?? "—"}</p>
                          <p className="text-xs text-muted-foreground">{row.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <FunnelStep row={row} />
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <StatusBadge row={row} />
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span title="NC (non cliqué)">NC: {row.relance_step ?? 0}/3</span>
                            <span title="Builder">BR: {row.builder_relance_step ?? 0}/6</span>
                            <span title="Trial" className={row.trial_relance_step ? "text-amber-400" : ""}>
                              Trial: {row.trial_relance_step ?? 0}/2
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Email series legend ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Mail,
                title: "Série Trial (TR)",
                color: "text-amber-400",
                bg: "bg-amber-500/10 border-amber-500/30",
                steps: ["J+1 : Onboarding → comment partager sa carte", "J+2 : Urgence → expire demain, active ton abonnement"],
              },
              {
                icon: Mail,
                title: "Série Builder (BR)",
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/30",
                steps: ["J+1h, J+1, J+3, J+5, J+7, J+9 — convertir en payant"],
              },
              {
                icon: Mail,
                title: "Série Vitrine (VU)",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/30",
                steps: ["J+1 → J+50 (12 emails) — upgrade essentielle → vitrine"],
              },
            ].map(({ icon: Icon, title, color, bg, steps }) => (
              <div key={title} className={`border rounded-2xl px-5 py-4 ${bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className={`text-xs font-bold ${color}`}>{title}</span>
                </div>
                {steps.map((s) => (
                  <p key={s} className="text-[11px] text-muted-foreground mb-1 leading-relaxed">{s}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
