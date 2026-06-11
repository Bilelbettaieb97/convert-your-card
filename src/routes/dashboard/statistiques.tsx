import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Eye, MousePointerClick, UserPlus, TrendingUp, Lock, Share2, Copy, Check,
  MessageCircle, QrCode, Download, Zap, Target, ArrowUpRight, Phone, Mail,
  Globe, Calendar, BarChart3, RefreshCw, Bell,
} from "lucide-react";

type Period = "7j" | "30j" | "90j";
type AnalyticsRow = { event_type: string; created_at: string | null; event_data?: Record<string, string> | null };
type NotifItem = { id: string; icon: typeof Eye; color: string; title: string; sub: string };

const SCAN_GOAL = 10;

export const Route = createFileRoute("/dashboard/statistiques")({ component: StatistiquesPage });

function daysBack(n: number) { return new Date(Date.now() - n * 86400000); }
function fmtDate(iso: string, days: number): string {
  if (days <= 7) return new Date(iso).toLocaleDateString("fr-FR", { weekday: "short" });
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "hier" : `il y a ${days}j`;
}

const FEED_CLICK_LABELS: Record<string, string> = {
  call: "Appeler", whatsapp: "WhatsApp", email: "Email",
  website: "Site web", calendar: "Calendrier", cta: "CTA", rdv: "Prise de RDV",
  linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook",
  twitter: "Twitter / X", tiktok: "TikTok", youtube: "YouTube",
  snapchat: "Snapchat", pinterest: "Pinterest",
};

function eventToNotif(row: { id: string; event_type: string; created_at: string; event_data?: Record<string, string> | null }): NotifItem {
  const clickType = row.event_data?.type;
  const clickLabel = clickType ? (FEED_CLICK_LABELS[clickType] ?? clickType) : null;
  const SECTION_LABELS: Record<string, string> = {
    service: "Service", gallery: "Photo galerie", listing: "Annonce", testimonial: "Témoignage",
  };
  const sectionType = row.event_data?.type;
  const sectionLabel = sectionType ? (SECTION_LABELS[sectionType] ?? sectionType) : null;

  const MAP: Record<string, { icon: typeof Eye; color: string; title: string }> = {
    view:           { icon: Eye,               color: "text-blue-400 bg-blue-500/10",       title: "Carte consultée" },
    scan:           { icon: QrCode,            color: "text-violet-400 bg-violet-500/10",   title: "Nouveau scan" },
    qr_scan:        { icon: QrCode,            color: "text-violet-400 bg-violet-500/10",   title: "Scan via QR code" },
    click_button:   { icon: MousePointerClick, color: "text-amber-400 bg-amber-500/10",     title: clickLabel ? `Clic « ${clickLabel} »` : "Clic bouton d'action" },
    click_social:   { icon: MousePointerClick, color: "text-sky-400 bg-sky-500/10",         title: clickLabel ? `Réseau — ${clickLabel}` : "Clic réseau social" },
    click_section:  { icon: Share2,            color: "text-teal-400 bg-teal-500/10",       title: sectionLabel ? `Lien section — ${sectionLabel}` : "Lien de section cliqué" },
    vcard_download: { icon: UserPlus,          color: "text-emerald-400 bg-emerald-500/10", title: "Contact enregistré" },
    save_contact:   { icon: UserPlus,          color: "text-emerald-400 bg-emerald-500/10", title: "Contact enregistré" },
  };
  const m = MAP[row.event_type] ?? { icon: Eye, color: "text-muted-foreground bg-muted", title: row.event_type };
  return { id: row.id, icon: m.icon, color: m.color, title: m.title, sub: timeAgo(row.created_at) };
}

const CLICK_TYPE_LABELS: Record<string, string> = {
  call: "Appel",
  whatsapp: "WhatsApp",
  email: "Email",
  website: "Site web",
  calendar: "Calendrier",
  cta: "CTA",
  rdv: "Prise de RDV",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  tiktok: "TikTok",
  youtube: "YouTube",
  snapchat: "Snapchat",
  pinterest: "Pinterest",
  service: "Lien service",
  gallery: "Lien galerie",
  listing: "Lien annonce",
  testimonial: "Lien témoignage",
};

function StatistiquesPage() {
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [feed, setFeed] = useState<NotifItem[]>([]);
  const [plan, setPlan] = useState<string>("free");
  const [cardUrl, setCardUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState<Period>("7j");
  const [copied, setCopied] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const refresh = React.useCallback(() => {
    if (!profileId) return;
    setRefreshing(true);
    Promise.all([
      supabase.from("nfc_analytics")
        .select("event_type, created_at, event_data")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: true })
        .then(({ data }) => { if (data) setAnalytics(data as AnalyticsRow[]); }),
      supabase.from("nfc_analytics")
        .select("id, event_type, created_at, event_data")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false })
        .limit(30)
        .then(({ data }) => { if (data) setFeed((data as any[]).map(eventToNotif)); }),
    ]).finally(() => setRefreshing(false));
  }, [profileId]);

  useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) { setLoading(false); return; }

    setCardUrl(`${window.location.origin}/${profile.slug}`);
    setProfileId(profile.id);
    // Lire le plan depuis la DB, pas depuis localStorage (évite le bypass via localStorage)
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: p } = await supabase
        .from("nfc_profiles")
        .select("plan, created_at")
        .eq("user_id", user.id)
        .maybeSingle();
      setPlan((p as any)?.plan ?? "free");
    });

    supabase.from("nfc_analytics")
      .select("event_type, created_at, event_data")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setAnalytics(data as AnalyticsRow[]); });

    supabase.from("nfc_analytics")
      .select("id, event_type, created_at, event_data")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => { if (data) setFeed((data as any[]).map(eventToNotif)); });

    supabase.auth.getUser().then(() => { setLoading(false); });

    const channel = supabase
      .channel(`analytics-${profile.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "nfc_analytics",
        filter: `profile_id=eq.${profile.id}`,
      }, (payload) => {
        const row = payload.new as any;
        setAnalytics((prev) => [...prev, row as AnalyticsRow]);
        setFeed((prev) => [eventToNotif(row), ...prev].slice(0, 30));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const PERIOD_DAYS: Record<Period, number> = { "7j": 7, "30j": 30, "90j": 90 };
  const LOCKED_PERIODS: Period[] = plan !== "vitrine" ? ["30j", "90j"] : [];

  const days = PERIOD_DAYS[period];
  const from = daysBack(days);
  const filtered = analytics.filter((e) => e.created_at && new Date(e.created_at) >= from);
  const views = filtered.filter((e) => e.event_type === "view");
  const scans = filtered.filter((e) => e.event_type === "scan");
  const clicks = filtered.filter((e) => e.event_type === "click_button" || e.event_type === "click_social" || e.event_type === "click_section");
  const contacts = filtered.filter((e) => e.event_type === "vcard_download");
  const convRate = scans.length > 0 ? Math.round((contacts.length / scans.length) * 100) : 0;
  const clickRate = scans.length > 0 ? Math.round((clicks.length / scans.length) * 100) : 0;

  const clickBreakdown = clicks.reduce<Record<string, number>>((acc, e) => {
    const type = (e.event_data as any)?.type ?? (e.event_type === "click_section" ? "section" : "other");
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});
  const topClicks = Object.entries(clickBreakdown).sort((a, b) => b[1] - a[1]);

  const chartData = Array.from({ length: days }, (_, i) => {
    const day = daysBack(days - 1 - i);
    const next = daysBack(days - 2 - i);
    const dayScans = scans.filter((e) => { const d = new Date(e.created_at!); return d >= day && d < next; }).length;
    const dayClicks = clicks.filter((e) => { const d = new Date(e.created_at!); return d >= day && d < next; }).length;
    const dayContacts = contacts.filter((e) => { const d = new Date(e.created_at!); return d >= day && d < next; }).length;
    return { date: fmtDate(day.toISOString(), days), scans: dayScans, clics: dayClicks, contacts: dayContacts };
  });

  const bestDay = chartData.reduce((a, b) => (b.scans > a.scans ? b : a), { date: "—", scans: 0, clics: 0, contacts: 0 });
  const totalScans = analytics.filter((e) => e.event_type === "scan").length;
  const hasData = scans.length > 0;

  const scansLast7 = analytics.filter((e) => e.event_type === "scan" && e.created_at && new Date(e.created_at) >= daysBack(7)).length;
  const estimatedLost90 = Math.max(0, Math.round(scansLast7 * 12.9 - scansLast7));

  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="p-5 lg:p-8 relative">
      {plan !== "vitrine" && !loading && (
        <div className="absolute inset-0 z-50 flex items-start justify-center pt-24 bg-background/80 backdrop-blur-sm">
          <div className="text-center p-8 rounded-2xl border border-border bg-card shadow-xl max-w-sm mx-4">
            <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl mb-2">Statistiques verrouillées</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Les statistiques sont disponibles avec le plan Vitrine. Suivez vos vues, clics et contacts sauvegardés en temps réel.
            </p>
            <Link to="/dashboard/account">
              <button className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
                Passer à Vitrine — 4,80€/mois
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-[1fr_300px] gap-6 max-w-7xl">

        {/* ── Left column: stats ── */}
        <div className="space-y-6 min-w-0">
          {/* Header + period selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Statistiques</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {totalScans} scans au total &middot; {analytics.filter((e) => e.event_type === "vcard_download").length} contacts sauvegardés
                </p>
              </div>
              <button onClick={refresh} disabled={refreshing}
                className="h-8 w-8 grid place-items-center rounded-lg bg-muted hover:bg-accent transition disabled:opacity-50"
                title="Rafraîchir les données">
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted self-start sm:self-auto">
              {(["7j", "30j", "90j"] as Period[]).map((p) => {
                const locked = LOCKED_PERIODS.includes(p);
                return (
                  <button key={p} onClick={() => !locked && setPeriod(p)}
                    className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: period === p && !locked ? "var(--color-card)" : "transparent",
                      color: locked ? "var(--color-muted-foreground)" : period === p ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                      opacity: locked ? 0.6 : 1,
                      boxShadow: period === p && !locked ? "0 1px 3px rgba(0,0,0,0.12)" : undefined,
                    }}
                    title={locked ? "Disponible avec un plan supérieur" : undefined}>
                    {locked && <Lock className="w-2.5 h-2.5" />}{p}
                  </button>
                );
              })}
            </div>
          </div>

          {!hasData ? (
            <EmptyState totalScans={totalScans} cardUrl={cardUrl} copied={copied} onCopy={copyLink} />
          ) : (
            <>
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <KpiCard icon={<Eye className="w-4 h-4" />}               label="Vues"          value={views.length}    sub="Via lien direct"                     color="#3B82F6" />
                <KpiCard icon={<QrCode className="w-4 h-4" />}            label="Scans QR"      value={scans.length}    sub={`+${scans.length} sur ${period}`}   color="#8B5CF6" />
                <KpiCard icon={<MousePointerClick className="w-4 h-4" />}  label="Clics"         value={clicks.length}   sub={`${clickRate}% des visiteurs`}       color="#EC4899" />
                <KpiCard icon={<UserPlus className="w-4 h-4" />}           label="Contacts"      value={contacts.length} sub={`${convRate}% de conversion`}        color="#10B981" />
                <KpiCard icon={<TrendingUp className="w-4 h-4" />}         label="Meilleur jour" value={bestDay.scans}   sub={bestDay.date}                        color="#F59E0B" />
              </div>

              {/* Chart */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <h2 className="font-medium text-sm text-foreground">Activité sur {period}</h2>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gScans" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gClics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gContacts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                      tickLine={false} axisLine={false} interval={days <= 7 ? 0 : Math.floor(days / 6)} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12, padding: "8px 12px" }}
                      labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                      formatter={(v: number, name: string) => [v, name === "scans" ? "Scans QR" : name === "clics" ? "Clics" : "Contacts"]}
                    />
                    <Legend formatter={(v) => v === "scans" ? "Scans QR" : v === "clics" ? "Clics" : "Contacts"}
                      iconType="circle" iconSize={8}
                      wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                    <Area type="monotone" dataKey="scans" stroke="#8B5CF6" strokeWidth={2} fill="url(#gScans)" dot={false} activeDot={{ r: 4 }} />
                    <Area type="monotone" dataKey="clics" stroke="#EC4899" strokeWidth={2} fill="url(#gClics)" dot={false} activeDot={{ r: 4 }} />
                    <Area type="monotone" dataKey="contacts" stroke="#10B981" strokeWidth={2} fill="url(#gContacts)" dot={false} activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom row: click breakdown + share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topClicks.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="text-sm font-medium text-foreground mb-4">Clics par bouton</h3>
                    <div className="space-y-2.5">
                      {topClicks.map(([type, count]) => {
                        const pct = Math.round((count / clicks.length) * 100);
                        const icons: Record<string, React.ReactNode> = {
                          call: <Phone className="w-3.5 h-3.5" />,
                          whatsapp: <MessageCircle className="w-3.5 h-3.5" />,
                          email: <Mail className="w-3.5 h-3.5" />,
                          website: <Globe className="w-3.5 h-3.5" />,
                          calendar: <Calendar className="w-3.5 h-3.5" />,
                          rdv: <Calendar className="w-3.5 h-3.5" />,
                          linkedin: <Share2 className="w-3.5 h-3.5" />,
                          instagram: <Share2 className="w-3.5 h-3.5" />,
                          facebook: <Share2 className="w-3.5 h-3.5" />,
                          twitter: <Share2 className="w-3.5 h-3.5" />,
                          tiktok: <Share2 className="w-3.5 h-3.5" />,
                          youtube: <Share2 className="w-3.5 h-3.5" />,
                          snapchat: <Share2 className="w-3.5 h-3.5" />,
                          pinterest: <Share2 className="w-3.5 h-3.5" />,
                        };
                        return (
                          <div key={type} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                              {icons[type] ?? <MousePointerClick className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium">{CLICK_TYPE_LABELS[type] ?? type}</span>
                                <span className="text-xs text-muted-foreground">{count} ({pct}%)</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {cardUrl && (
                  <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-1">Continuez à partager</h3>
                      <p className="text-xs text-muted-foreground mb-4">Chaque partage = nouveaux scans = nouveaux clients.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href={`https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite : ${cardUrl}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white" style={{ background: "#25D366" }}>
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <button onClick={copyLink}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border hover:bg-accent transition">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copié" : "Copier lien"}
                      </button>
                      <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&margin=20`}
                        download="qr.png" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border hover:bg-accent transition">
                        <QrCode className="w-3.5 h-3.5" /> QR Code
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Smart upsell banner */}
          {LOCKED_PERIODS.length > 0 && (
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#0f0520,#1a0b2e)", border: "1px solid rgba(139,92,246,0.25)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.2)" }}>
                  <Zap className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1">
                    {scansLast7 > 0
                      ? `${scansLast7} scans cette semaine — et ~${estimatedLost90} scans non visibles sur 90 jours.`
                      : "Déverrouillez les statistiques long terme."}
                  </p>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {LOCKED_PERIODS.includes("30j")
                      ? "Plan Starter = données 30 jours. Plan Pro = 90 jours d'historique complet."
                      : "Plan Pro = 90 jours d'historique pour suivre vos tendances."}
                  </p>
                  <Link to="/dashboard/account"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                    Passer au Pro <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right column: activity feed ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Activité récente
          </h3>
          <div className="rounded-2xl border border-border bg-card/40 overflow-hidden sticky top-24">
            {feed.length === 0 ? (
              <div className="p-10 text-center">
                <Bell className="h-8 w-8 mx-auto opacity-20 mb-3" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aucune activité.<br />
                  <span className="opacity-70">Les scans et interactions apparaîtront ici.</span>
                </p>
              </div>
            ) : (
              feed.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-3.5 border-b border-border/50 last:border-b-0">
                  <div className={`h-8 w-8 rounded-xl grid place-items-center shrink-0 ${n.color}`}>
                    <n.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground leading-snug">{n.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{n.sub}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── KPI Card ── */
function KpiCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: number | string; sub: string; color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState({ totalScans, cardUrl, copied, onCopy }: {
  totalScans: number; cardUrl: string; copied: boolean; onCopy: () => void;
}) {
  const progress = Math.min(100, Math.round((totalScans / SCAN_GOAL) * 100));
  return (
    <div className="bg-card border border-border rounded-3xl p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))" }}>
          <Target className="w-7 h-7 text-violet-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Objectif : vos 10 premiers scans</h2>
        <p className="text-sm text-muted-foreground mb-6">Chaque partage = des scans = de la valeur perçue. Commencez maintenant.</p>

        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{totalScans} scan{totalScans > 1 ? "s" : ""}</span>
            <span className="font-medium text-foreground">Objectif : {SCAN_GOAL}</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">{totalScans} / {SCAN_GOAL}{totalScans === 0 ? " — commencez à partager !" : ""}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-2.5 text-left mb-6">
          {[
            { icon: <MessageCircle className="w-4 h-4 text-emerald-400" />, tip: "Partagez sur WhatsApp", detail: "À vos contacts pro — 5 min" },
            { icon: <QrCode className="w-4 h-4 text-violet-400" />, tip: "QR code sur vos supports", detail: "Flyers, menu, vitrine…" },
            { icon: <Share2 className="w-4 h-4 text-sky-400" />, tip: "LinkedIn ou Instagram", detail: "Bio, posts, stories" },
          ].map((t) => (
            <div key={t.tip} className="flex gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="shrink-0 mt-0.5">{t.icon}</div>
              <div>
                <p className="text-xs font-semibold text-foreground">{t.tip}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {cardUrl && (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a href={`https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇\n${cardUrl}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <button onClick={onCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copié !" : "Copier le lien"}
            </button>
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&margin=20`}
              download="qr-code.png" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition">
              <Download className="w-4 h-4" /> QR Code HD
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
