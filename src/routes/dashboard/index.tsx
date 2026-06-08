import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ShareGrid, QrCard, PublicLinkBar } from "@/components/dashboard/ShareGrid";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { UpsellSection } from "@/components/dashboard/UpsellSection";
import {
  Eye, MousePointerClick, UserPlus, ExternalLink, Check,
  Wand2, ChevronRight, Scan, ArrowUpRight,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import type { CardData } from "@/lib/card-types";

type NfcProfile = Tables<"nfc_profiles">;
type Subscription = Tables<"subscriptions">;
type AnalyticsRow = { event_type: string; created_at: string | null };

function buildSpark(events: AnalyticsRow[], type: string, days = 7): number[] {
  const buckets = Array(days).fill(0);
  const now = Date.now();
  events
    .filter((e) => e.event_type === type && e.created_at)
    .forEach((e) => {
      const age = Math.floor((now - new Date(e.created_at!).getTime()) / 86400000);
      if (age < days) buckets[days - 1 - age]++;
    });
  return buckets;
}

function pct(cur: number, prev: number) {
  if (prev === 0) return cur > 0 ? 100 : 0;
  return Math.round(((cur - prev) / prev) * 100);
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

export const Route = createFileRoute("/dashboard/")({ component: DashboardHome });

function DashboardHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);

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
          .order("created_at", { ascending: false }).limit(300);
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const cardUrl = profile?.slug ? `${appUrl}/${profile.slug}` : null;

  // Stats — last 7 vs prev 7 days
  const now = new Date();
  const d7 = new Date(now.getTime() - 7 * 86400000);
  const d14 = new Date(now.getTime() - 14 * 86400000);
  const last7 = analytics.filter((e) => e.created_at && new Date(e.created_at) >= d7);
  const prev7 = analytics.filter((e) => {
    if (!e.created_at) return false;
    const d = new Date(e.created_at);
    return d >= d14 && d < d7;
  });

  const scans7    = last7.filter((e) => e.event_type === "scan").length;
  const clicks7   = last7.filter((e) => e.event_type === "button_click").length;
  const contacts7 = last7.filter((e) => e.event_type === "vcard_download").length;
  const prevScans   = prev7.filter((e) => e.event_type === "scan").length;
  const prevClicks  = prev7.filter((e) => e.event_type === "button_click").length;
  const prevContacts = prev7.filter((e) => e.event_type === "vcard_download").length;

  const sparkScans    = buildSpark(analytics, "scan");
  const sparkClicks   = buildSpark(analytics, "button_click");
  const sparkContacts = buildSpark(analytics, "vcard_download");

  const recentEvents = analytics.slice(0, 8);
  const eventMeta: Record<string, { label: string; color: string }> = {
    scan:           { label: "Carte scannée",       color: "var(--color-primary)" },
    button_click:   { label: "Bouton cliqué",       color: "#0EA5E9" },
    vcard_download: { label: "Contact sauvegardé",  color: "#10B981" },
  };

  // Checklist
  const hasPhoto   = !!profile?.photo_url;
  const hasBio     = !!profile?.bio;
  const hasBouton  = Array.isArray(profile?.boutons) && (profile.boutons as {active?:boolean;value?:string}[]).some((b) => b.active && b.value);
  const hasReseau  = Array.isArray(profile?.reseaux) && (profile.reseaux as {active?:boolean;url?:string}[]).some((r) => r.active && r.url);
  const hasFirstScan = analytics.some((e) => e.event_type === "scan");
  const hasShared  = typeof window !== "undefined" && !!localStorage.getItem("shared_link");
  const checklist = [
    { done: true,         label: "Créer mon compte",             link: null },
    { done: hasPhoto,     label: "Ajouter ma photo",             link: "/dashboard/carte" },
    { done: hasBio,       label: "Écrire ma bio",                link: "/dashboard/carte" },
    { done: hasBouton,    label: "Activer un bouton d'action",   link: "/dashboard/carte" },
    { done: hasReseau,    label: "Connecter un réseau social",   link: "/dashboard/carte" },
    { done: hasShared,    label: "Partager mon lien",            link: null },
    { done: hasFirstScan, label: "Recevoir mon 1er scan",        link: null },
  ];
  const done = checklist.filter((c) => c.done).length;
  const pctDone = Math.round((done / checklist.length) * 100);
  const allDone = done === checklist.length;

  // CardData for ShareGrid
  const cardDataForShare: CardData = {
    name: profile?.nom ?? "",
    title: profile?.fonction ?? "",
    agency: profile?.entreprise ?? "",
    phone: profile?.telephone ?? "",
    email: profile?.email ?? "",
    website: profile?.site_web ?? "",
    bio: profile?.bio ?? "",
    photo: profile?.photo_url ?? "",
    coverPhoto: profile?.cover_url ?? "",
    accent: profile?.couleur_accent ?? "violet",
    profession: profile?.secteur ?? "",
    vcardEnabled: profile?.vcard_enabled ?? true,
  } as CardData;

  const planLabel = { free: "Gratuit", essentielle: "Essentielle", vitrine: "Vitrine", starter: "Starter", pro: "Pro", premium: "Premium" }[subscription?.plan ?? "free"] ?? "Gratuit";
  const firstName = profile?.nom?.split(" ")[0] ?? "";

  return (
    <>
      {cardUrl && <CommandPalette publicUrl={cardUrl} />}

      <div className="p-5 lg:p-8 max-w-6xl space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Bonjour{firstName ? `, ${firstName}` : ""} 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {cardUrl
                ? <>Votre carte est <span className="text-emerald-500 font-medium">active</span> · <kbd className="text-[10px] border border-border rounded px-1 py-0.5">⌘K</kbd> pour naviguer</>
                : "Créez votre carte pour commencer."}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Plan {planLabel}
            </span>
            {cardUrl && (
              <a href={cardUrl} target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:bg-accent transition">
                <ExternalLink className="w-3 h-3" /> Voir ma carte
              </a>
            )}
          </div>
        </div>

        {/* ── KPI Metrics ── */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <MetricCard icon={Eye}               label="Scans — 7j"  value={scans7}    delta={pct(scans7, prevScans)}       spark={sparkScans}    hint={`${analytics.filter(e=>e.event_type==="scan").length} total`} />
          <MetricCard icon={MousePointerClick} label="Clics — 7j"  value={clicks7}   delta={pct(clicks7, prevClicks)}     spark={sparkClicks}   />
          <MetricCard icon={UserPlus}          label="Contacts — 7j" value={contacts7} delta={pct(contacts7, prevContacts)} spark={sparkContacts} hint="vCards téléchargées" />
        </div>

        {/* ── Lien public + Partage ── */}
        {cardUrl && (
          <div className="rounded-2xl border border-border bg-card/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Partagez votre carte</h2>
              <a href={cardUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                Ouvrir <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <PublicLinkBar url={cardUrl} />
            <ShareGrid data={cardDataForShare} url={cardUrl} compact />
          </div>
        )}

        {/* ── 2-col : QR + Activité ── */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* QR Code */}
          {cardUrl && <QrCard url={cardUrl} name={profile?.nom ?? ""} />}

          {/* Activité récente */}
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm">Activité récente</h2>
              <Link to="/dashboard/statistiques"
                className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                Tout voir <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {recentEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <Scan className="w-8 h-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Aucune activité pour l'instant.</p>
                <p className="text-xs text-muted-foreground">Partagez votre lien pour recevoir vos premiers scans.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentEvents.map((e, i) => {
                  const m = eventMeta[e.event_type] ?? { label: e.event_type, color: "var(--color-primary)" };
                  return (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                      <p className="text-xs text-foreground flex-1">{m.label}</p>
                      <span className="text-[11px] text-muted-foreground tabular-nums">{timeAgo(e.created_at)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Checklist d'activation ── */}
        {!allDone && (
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <div className="flex items-start justify-between mb-3 gap-4">
              <div>
                <h2 className="font-semibold text-sm">Activez votre carte</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{done}/{checklist.length} étapes · {pctDone}%</p>
              </div>
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-muted)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-primary)" strokeWidth="3"
                    strokeDasharray={`${pctDone * 0.942} 100`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">{pctDone}%</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {checklist.map((step) => (
                <div key={step.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${step.done ? "opacity-50" : "hover:bg-muted/50"}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-emerald-500" : "border-2 border-border"}`}>
                    {step.done && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  {step.link && !step.done ? (
                    <Link to={step.link} className="text-xs font-medium hover:text-primary transition flex-1">
                      {step.label} →
                    </Link>
                  ) : (
                    <span className={`text-xs font-medium ${step.done ? "line-through text-muted-foreground" : ""}`}>{step.label}</span>
                  )}
                </div>
              ))}
              {!profile && (
                <Link to="/builder" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-muted/50 col-span-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary">Créer ma carte →</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── Upsell compact ── */}
        <UpsellSection variant="compact" />

      </div>
    </>
  );
}
