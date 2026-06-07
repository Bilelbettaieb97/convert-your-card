import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Eye, MousePointerClick, UserPlus, ExternalLink, Copy, Check,
  TrendingUp, TrendingDown, Smartphone, Wifi, Shield, ChevronRight,
  Scan, Download, ArrowUpRight, X as XIcon,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;
type Subscription = Tables<"subscriptions">;
type AnalyticsRow = { event_type: string; created_at: string | null };

const THEMES = [
  { id: "violet", accent: "#8B5CF6", bg: "#1a0b2e", gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)" },
  { id: "rose",   accent: "#EC4899", bg: "#1a0b1a", gradient: "linear-gradient(135deg,#be185d,#EC4899)" },
  { id: "bleu",   accent: "#0EA5E9", bg: "#0a1a2e", gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)" },
  { id: "vert",   accent: "#10B981", bg: "#0a1f1a", gradient: "linear-gradient(135deg,#047857,#10B981)" },
  { id: "sombre", accent: "#F59E0B", bg: "#111827", gradient: "linear-gradient(135deg,#92400e,#F59E0B)" },
  { id: "clair",  accent: "#6366F1", bg: "#f8f9fa", gradient: "linear-gradient(135deg,#4338ca,#6366F1)" },
];

function getTheme(id?: string | null) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

function profileCompleteness(p: NfcProfile) {
  const checks = [
    !!p.nom, !!p.fonction, !!p.entreprise, !!p.bio,
    !!p.photo_url, !!p.email, !!p.telephone,
    Array.isArray(p.boutons) && (p.boutons as unknown[]).length > 0,
    Array.isArray(p.reseaux) && (p.reseaux as unknown[]).length > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${Math.floor(h / 24)}j`;
}

function daysBetween(d1: Date, d2: Date) {
  return Math.round((d2.getTime() - d1.getTime()) / 86400000);
}

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [upsellDismissed, setUpsellDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("physical_cta_dismissed");
    if (dismissed) {
      const daysAgo = daysBetween(new Date(dismissed), new Date());
      if (daysAgo < 7) setUpsellDismissed(true);
    }
  }, []);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/connexion", replace: true }); return; }

      const [profileRes, subRes] = await Promise.all([
        supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
      ]);

      setProfile(profileRes.data ?? null);
      setSubscription(subRes.data ?? null);

      if (profileRes.data?.id) {
        const { data: events } = await supabase
          .from("nfc_analytics")
          .select("event_type, created_at")
          .eq("profile_id", profileRes.data.id)
          .order("created_at", { ascending: false })
          .limit(200);
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";
  const cardUrl = profile ? `${appUrl}/${profile.slug}` : null;
  const theme = getTheme(profile?.couleur_accent);

  const now = new Date();
  const d7ago = new Date(now.getTime() - 7 * 86400000);
  const d14ago = new Date(now.getTime() - 14 * 86400000);

  const last7 = analytics.filter((e) => e.created_at && new Date(e.created_at) >= d7ago);
  const prev7 = analytics.filter((e) => {
    if (!e.created_at) return false;
    const d = new Date(e.created_at);
    return d >= d14ago && d < d7ago;
  });

  const stats = {
    scans: last7.filter((e) => e.event_type === "scan").length,
    clicks: last7.filter((e) => e.event_type === "button_click").length,
    contacts: last7.filter((e) => e.event_type === "vcard_download").length,
    prevScans: prev7.filter((e) => e.event_type === "scan").length,
  };

  const scanDelta = stats.prevScans === 0 ? null : Math.round(((stats.scans - stats.prevScans) / stats.prevScans) * 100);

  const completeness = profile ? profileCompleteness(profile) : 0;

  const recentEvents = analytics.slice(0, 8);
  const eventLabel: Record<string, { label: string; icon: React.ReactNode }> = {
    scan:           { label: "Carte scannée",       icon: <Scan className="w-3.5 h-3.5 text-violet-400" /> },
    button_click:   { label: "Bouton cliqué",       icon: <MousePointerClick className="w-3.5 h-3.5 text-sky-400" /> },
    vcard_download: { label: "Contact sauvegardé",  icon: <Download className="w-3.5 h-3.5 text-emerald-400" /> },
  };

  const planLabel = subscription?.plan
    ? { free: "Gratuit", starter: "Starter", pro: "Pro", premium: "Premium" }[subscription.plan] ?? "Gratuit"
    : "Gratuit";

  function copyLink() {
    if (!cardUrl) return;
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function dismissUpsell() {
    localStorage.setItem("physical_cta_dismissed", new Date().toISOString());
    setUpsellDismissed(true);
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl space-y-6">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Bonjour{profile?.nom ? `, ${profile.nom.split(" ")[0]}` : ""} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Voici ce qui se passe avec votre carte.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
          Plan {planLabel}
        </span>
      </div>

      {/* ── Completion bar ── */}
      {profile && completeness < 100 && (
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium text-foreground">Profil complété à {completeness}%</p>
              <Link to="/dashboard/carte" className="text-xs font-semibold text-magenta hover:underline">
                Compléter →
              </Link>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${completeness}%`, background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {!profile.photo_url && "Photo · "}
              {!profile.bio && "Bio · "}
              {!profile.entreprise && "Entreprise · "}
              {!(Array.isArray(profile.boutons) && (profile.boutons as unknown[]).length > 0) && "Boutons · "}
              <span className="text-foreground font-medium">manquants</span>
            </p>
          </div>
        </div>
      )}

      {/* ── KPIs ── */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          icon={<Eye className="w-4 h-4" />}
          label="Scans (7j)"
          value={stats.scans}
          delta={scanDelta}
          color="#8B5CF6"
        />
        <KpiCard
          icon={<MousePointerClick className="w-4 h-4" />}
          label="Clics"
          value={stats.clicks}
          color="#EC4899"
        />
        <KpiCard
          icon={<UserPlus className="w-4 h-4" />}
          label="Contacts"
          value={stats.contacts}
          color="#10B981"
        />
      </div>

      {/* ── Upsell carte physique ── */}
      {!upsellDismissed && (
        <div
          className="relative rounded-3xl overflow-hidden p-6 lg:p-8"
          style={{ background: "linear-gradient(135deg,#0f0520 0%,#1a0b2e 40%,#0a1a2e 100%)" }}
        >
          <button
            onClick={dismissUpsell}
            className="absolute top-4 right-4 p-1.5 rounded-full transition hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <XIcon className="w-4 h-4" />
          </button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Visual */}
            <div className="flex-shrink-0 w-24 h-16 lg:w-32 lg:h-20 rounded-2xl flex items-center justify-center relative"
              style={{ background: "linear-gradient(135deg,#8B5CF6,#EC4899)", boxShadow: "0 20px 60px -10px #8B5CF680" }}
            >
              <Wifi className="w-8 h-8 text-white/80" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f0520]" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
                style={{ background: "rgba(139,92,246,0.2)", color: "#c084fc", border: "1px solid rgba(139,92,246,0.3)" }}>
                <Smartphone className="w-3 h-3" /> Upsell n°1
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">
                Rendez vos contacts mémorables.<br />
                <span style={{ color: "#c084fc" }}>Carte NFC physique</span> livrée en 5–7 jours.
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {["NFC + QR Code intégré", "Design premium imprimé", "Lié à votre page en direct", "Livraison France & Europe"].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <Shield className="w-3 h-3 text-violet-400" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
              <Link
                to="/inscription/carte-physique"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)", boxShadow: "0 8px 30px -8px #8B5CF680" }}
              >
                Commander — 29€ <ArrowUpRight className="w-4 h-4" />
              </Link>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                ✓ 342 professionnels l'ont déjà commandé
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Aperçu carte + activité ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Card preview */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground text-sm">Votre carte</h2>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                profile?.actif ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {profile?.actif ? "● Active" : "○ Inactive"}
            </span>
          </div>

          {profile ? (
            <>
              {/* Mini phone preview */}
              <div className="flex justify-center mb-4">
                <div className="w-28 h-48 rounded-2xl overflow-hidden shadow-card border-2 border-border relative">
                  <div className="w-full h-20 flex flex-col items-center justify-end pb-2 pt-4"
                    style={{ background: theme.gradient }}>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base">
                      {profile.nom?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                  </div>
                  <div className="bg-background p-2 text-center">
                    <p className="text-[8px] font-bold text-foreground leading-tight truncate">{profile.nom}</p>
                    <p className="text-[7px] text-muted-foreground truncate">{profile.fonction}</p>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="mt-1 h-1.5 rounded-full mx-1" style={{ background: i === 0 ? theme.accent : "var(--color-muted)" }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{profile.nom}</p>
                <p className="text-xs text-muted-foreground">{profile.fonction || "—"}{profile.entreprise ? ` · ${profile.entreprise}` : ""}</p>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <a
                  href={cardUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-cta text-white hover:opacity-90 transition"
                >
                  <ExternalLink className="w-3 h-3" /> Voir ma carte
                </a>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copié !" : "Copier le lien"}
                </button>
                <Link
                  to="/dashboard/carte"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent transition"
                >
                  Modifier
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-3">Votre carte n'est pas encore configurée.</p>
              <Link to="/onboarding" className="inline-block bg-gradient-cta text-white px-5 py-2 rounded-full text-sm font-semibold">
                Créer ma carte →
              </Link>
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground text-sm">Activité récente</h2>
            <Link to="/dashboard/statistiques" className="text-xs text-magenta font-semibold hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Aucune activité pour l'instant.</p>
              <p className="text-xs text-muted-foreground mt-1">Partagez votre lien pour commencer !</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentEvents.map((e, i) => {
                const ev = eventLabel[e.event_type] ?? { label: e.event_type, icon: <Eye className="w-3.5 h-3.5" /> };
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      {ev.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{ev.label}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground flex-shrink-0">{timeAgo(e.created_at)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: "/dashboard/carte",        label: "Modifier ma carte",  color: "#8B5CF6" },
          { to: "/dashboard/statistiques", label: "Voir les stats",     color: "#0EA5E9" },
          { to: "/dashboard/modeles",      label: "Explorer les modèles", color: "#EC4899" },
          { to: "/inscription/carte-physique", label: "Commander carte physique", color: "#F59E0B" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="group flex items-center justify-between gap-2 bg-card border border-border rounded-2xl px-4 py-3.5 hover:border-foreground/20 transition-all"
          >
            <span className="text-xs font-semibold text-foreground">{a.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, delta, color }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  delta?: number | null;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 lg:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
          {icon}
        </div>
        {delta != null && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${delta >= 0 ? "text-emerald-500" : "text-red-400"}`}>
            {delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {delta >= 0 ? "+" : ""}{delta}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
