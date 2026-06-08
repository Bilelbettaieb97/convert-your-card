import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Eye, MousePointerClick, UserPlus, ExternalLink, Copy, Check,
  TrendingUp, TrendingDown, Wifi, Shield, ChevronRight,
  Scan, Download, ArrowUpRight, X as XIcon, Share2,
  MessageCircle, Linkedin, QrCode, Camera, FileText, Phone,
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
function getTheme(id?: string | null) { return THEMES.find((t) => t.id === id) ?? THEMES[0]; }

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
function daysBetween(d1: Date, d2: Date) { return Math.round((d2.getTime() - d1.getTime()) / 86400000); }

export const Route = createFileRoute("/dashboard/")({ component: DashboardHome });

function DashboardHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [upsellDismissed, setUpsellDismissed] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [physicalOrdered] = useState(() => !!localStorage.getItem("physical_ordered"));

  useEffect(() => {
    const dismissed = localStorage.getItem("physical_cta_dismissed");
    if (dismissed && daysBetween(new Date(dismissed), new Date()) < 7) setUpsellDismissed(true);
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
          .from("nfc_analytics").select("event_type, created_at")
          .eq("profile_id", profileRes.data.id)
          .order("created_at", { ascending: false }).limit(200);
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
    </div>
  );

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";
  const cardUrl = profile ? `${appUrl}/${profile.slug}` : null;
  const theme = getTheme(profile?.couleur_accent);

  const now = new Date();
  const d7ago = new Date(now.getTime() - 7 * 86400000);
  const d14ago = new Date(now.getTime() - 14 * 86400000);
  const last7 = analytics.filter((e) => e.created_at && new Date(e.created_at) >= d7ago);
  const prev7 = analytics.filter((e) => { if (!e.created_at) return false; const d = new Date(e.created_at); return d >= d14ago && d < d7ago; });
  const stats = {
    scans: last7.filter((e) => e.event_type === "scan").length,
    clicks: last7.filter((e) => e.event_type === "button_click").length,
    contacts: last7.filter((e) => e.event_type === "vcard_download").length,
    prevScans: prev7.filter((e) => e.event_type === "scan").length,
  };
  const scanDelta = stats.prevScans === 0 ? null : Math.round(((stats.scans - stats.prevScans) / stats.prevScans) * 100);
  const recentEvents = analytics.slice(0, 6);

  // ── Activation checklist ──
  const hasPhoto = !!profile?.photo_url;
  const hasBio = !!profile?.bio;
  const hasBouton = Array.isArray(profile?.boutons) && (profile.boutons as { active?: boolean; value?: string }[]).some((b) => b.active && b.value);
  const hasReseau = Array.isArray(profile?.reseaux) && (profile.reseaux as { active?: boolean; url?: string }[]).some((r) => r.active && r.url);
  const hasFirstScan = analytics.some((e) => e.event_type === "scan");
  const hasShared = !!localStorage.getItem("shared_link");

  const checklist = [
    { done: true,        label: "Créer mon compte",           link: null },
    { done: hasPhoto,    label: "Ajouter ma photo de profil", link: "/dashboard/carte" },
    { done: hasBio,      label: "Compléter ma bio",           link: "/dashboard/carte" },
    { done: hasBouton,   label: "Activer un bouton d'action", link: "/dashboard/carte" },
    { done: hasReseau,   label: "Connecter un réseau social", link: "/dashboard/carte" },
    { done: hasShared,   label: "Partager mon lien",          link: null },
    { done: hasFirstScan, label: "Recevoir mon 1er scan",     link: null },
    { done: physicalOrdered, label: "Commander ma carte physique", link: "/inscription/carte-physique" },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const checklistPct = Math.round((checklistDone / checklist.length) * 100);
  const allDone = checklistDone === checklist.length;

  function copyLink() {
    if (!cardUrl) return;
    navigator.clipboard.writeText(cardUrl);
    localStorage.setItem("shared_link", "1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  function dismissUpsell() { localStorage.setItem("physical_cta_dismissed", new Date().toISOString()); setUpsellDismissed(true); }

  const planLabel = { free: "Gratuit", starter: "Starter", pro: "Pro", premium: "Premium" }[subscription?.plan ?? "free"] ?? "Gratuit";
  const firstName = profile?.nom?.split(" ")[0] ?? "";

  const eventMeta: Record<string, { label: string; color: string }> = {
    scan:           { label: "Carte scannée",      color: "#8B5CF6" },
    button_click:   { label: "Bouton cliqué",      color: "#0EA5E9" },
    vcard_download: { label: "Contact sauvegardé", color: "#10B981" },
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Bonjour{firstName ? `, ${firstName}` : ""} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Voici l'état de votre carte.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
          Plan {planLabel}
        </span>
      </div>

      {/* ── Activation checklist ── */}
      {!allDone && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-foreground text-sm">Activez votre carte en {checklist.length} étapes</p>
              <p className="text-xs text-muted-foreground mt-0.5">{checklistDone}/{checklist.length} complétées · {checklistPct}%</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: `conic-gradient(#8B5CF6 ${checklistPct * 3.6}deg, var(--color-muted) 0deg)` }}>
              <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center text-[10px] font-bold text-foreground">
                {checklistPct}%
              </div>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
            <div className="h-full rounded-full transition-all" style={{ width: `${checklistPct}%`, background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
          </div>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {checklist.map((step) => (
              <div key={step.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${step.done ? "opacity-50" : "hover:bg-muted/50"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-emerald-500" : "border-2 border-border"}`}>
                  {step.done && <Check className="w-3 h-3 text-white" />}
                </div>
                {step.link && !step.done ? (
                  <Link to={step.link} className="text-xs font-medium text-foreground hover:text-magenta transition flex-1">
                    {step.label} <span className="text-muted-foreground">→</span>
                  </Link>
                ) : (
                  <span className={`text-xs font-medium ${step.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{step.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── KPIs ── */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard icon={<Eye className="w-4 h-4" />}             label="Scans (7j)"  value={stats.scans}    delta={scanDelta}  color="#8B5CF6" />
        <KpiCard icon={<MousePointerClick className="w-4 h-4" />} label="Clics"      value={stats.clicks}   color="#EC4899" />
        <KpiCard icon={<UserPlus className="w-4 h-4" />}         label="Contacts"   value={stats.contacts}  color="#10B981" />
      </div>

      {/* ── Partager ma carte (section clé) ── */}
      {profile && cardUrl && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Partagez votre carte</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Plus vous partagez, plus vous avez de scans.</p>
            </div>
            <a href={cardUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-magenta font-semibold hover:underline">
              Voir <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* URL pill */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border mb-4">
            <span className="text-xs text-muted-foreground truncate flex-1 font-mono">{cardUrl}</span>
            <button onClick={copyLink}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-background border border-border hover:bg-accent transition flex-shrink-0">
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          {/* Share buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇\n${cardUrl}`)}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => localStorage.setItem("shared_link", "1")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white transition hover:opacity-90"
              style={{ background: "#25D366" }}>
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => localStorage.setItem("shared_link", "1")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white transition hover:opacity-90"
              style={{ background: "#0A66C2" }}>
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <button onClick={() => setShowQr(true)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-border bg-background hover:bg-accent transition">
              <QrCode className="w-3.5 h-3.5 text-foreground" /> QR Code
            </button>
            <a href={`mailto:?subject=Ma carte de visite digitale&body=Voici ma carte de visite : ${cardUrl}`}
              onClick={() => localStorage.setItem("shared_link", "1")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-border bg-background hover:bg-accent transition">
              <Share2 className="w-3.5 h-3.5 text-foreground" /> Email
            </a>
          </div>
        </div>
      )}

      {/* QR Code modal */}
      {showQr && cardUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <div className="bg-card border border-border rounded-3xl p-6 max-w-xs w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Mon QR Code</h3>
              <button onClick={() => setShowQr(false)} className="p-1.5 rounded-xl hover:bg-muted transition">
                <XIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(cardUrl)}&color=000000&bgcolor=ffffff&margin=10`}
                alt="QR Code"
                className="rounded-2xl border border-border w-48 h-48"
              />
            </div>
            <p className="text-xs text-center text-muted-foreground mb-4 font-mono break-all">{cardUrl}</p>
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&color=000000&bgcolor=ffffff&margin=20`}
              download="ma-carte-qr.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
              <Download className="w-4 h-4" /> Télécharger en HD
            </a>
            <p className="text-[10px] text-center text-muted-foreground mt-2">Imprimez-le sur vos supports (flyers, menus, vitrine…)</p>
          </div>
        </div>
      )}

      {/* ── Upsell carte physique ── */}
      {!upsellDismissed && (
        <div className="relative rounded-3xl overflow-hidden p-6 lg:p-8"
          style={{ background: "linear-gradient(135deg,#0f0520 0%,#1a0b2e 40%,#0a1a2e 100%)" }}>
          <button onClick={dismissUpsell} className="absolute top-4 right-4 p-1.5 rounded-full transition hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)" }}>
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Visual — mockup with user's theme colors */}
            <div className="flex-shrink-0 relative">
              <div className="w-28 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: theme.gradient, boxShadow: `0 16px 40px -8px ${theme.accent}60` }}>
                <div className="text-center">
                  <Wifi className="w-5 h-5 text-white/70 mx-auto mb-0.5" />
                  <p className="text-[9px] font-bold text-white/90 truncate px-2">{profile?.nom?.split(" ")[0] ?? "OneTap"}</p>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f0520] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-[9px] text-center mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Votre carte</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#c084fc" }}>Passer au physique</p>
              <h3 className="text-xl font-bold text-white leading-snug">Votre carte imprimée,<br />livrée en 5–7 jours.</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
                {["NFC + QR Code", "Design premium", "Lié à votre page", "Livraison offerte"].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <Shield className="w-3 h-3 text-violet-400" />{f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
              <Link to="/inscription/carte-physique"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)", boxShadow: "0 8px 30px -8px #8B5CF680" }}>
                Commander — 29€ <ArrowUpRight className="w-4 h-4" />
              </Link>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>✓ 342 professionnels l'ont déjà</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Card preview + Activity ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Card preview */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground text-sm">Votre carte</h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${profile?.actif ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {profile?.actif ? "● Active" : "○ Inactive"}
            </span>
          </div>
          {profile ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-28 h-48 rounded-[1.5rem] overflow-hidden shadow-card border-2 border-border">
                  <div className="w-full h-20 flex flex-col items-end pb-3 pt-4 px-3 justify-end" style={{ background: theme.gradient }}>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base mx-auto">
                      {profile.nom?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                  </div>
                  <div className="bg-background p-2.5 text-center space-y-1.5">
                    <p className="text-[8px] font-bold text-foreground leading-tight truncate">{profile.nom}</p>
                    <p className="text-[7px] text-muted-foreground truncate">{profile.fonction}</p>
                    {[0,1,2].map((i) => (
                      <div key={i} className="h-1.5 rounded-full mx-1" style={{ background: i === 0 ? theme.accent : "var(--color-muted)", opacity: i === 0 ? 1 : 0.5 }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a href={cardUrl!} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-cta text-white hover:opacity-90 transition">
                  <ExternalLink className="w-3 h-3" /> Voir
                </a>
                <Link to="/dashboard/carte"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-accent transition">
                  Modifier
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-3">Carte non configurée.</p>
              <Link to="/onboarding" className="inline-block bg-gradient-cta text-white px-5 py-2 rounded-full text-sm font-semibold">
                Créer ma carte →
              </Link>
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground text-sm">Activité récente</h2>
            <Link to="/dashboard/statistiques" className="text-xs text-magenta font-semibold hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <Scan className="w-8 h-8 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground">Aucune activité pour l'instant.</p>
              <p className="text-xs text-muted-foreground">Partagez votre lien pour commencer !</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentEvents.map((e, i) => {
                const m = eventMeta[e.event_type] ?? { label: e.event_type, color: "#8B5CF6" };
                return (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                    <p className="text-xs text-foreground flex-1">{m.label}</p>
                    <span className="text-[11px] text-muted-foreground">{timeAgo(e.created_at)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, delta, color }: {
  icon: React.ReactNode; label: string; value: number; delta?: number | null; color: string;
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
