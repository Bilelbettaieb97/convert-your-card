import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Eye, MousePointerClick, UserPlus, TrendingUp, Lock, Share2, Copy, Check,
  MessageCircle, QrCode, Download, Zap, Target, ArrowUpRight,
} from "lucide-react";

type Period = "7j" | "30j" | "90j";
type AnalyticsRow = { event_type: string; created_at: string | null };

const SCAN_GOAL = 10;

export const Route = createFileRoute("/dashboard/statistiques")({ component: StatistiquesPage });

function daysBack(n: number) { return new Date(Date.now() - n * 86400000); }
function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function StatistiquesPage() {
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [plan, setPlan] = useState<string>("free");
  const [cardUrl, setCardUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("7j");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [profileRes, subRes] = await Promise.all([
        supabase.from("nfc_profiles").select("id, slug").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("user_id", user.id).maybeSingle(),
      ]);
      setPlan(subRes.data?.plan ?? "free");
      if (profileRes.data?.slug) {
        const url = `${window.location.origin}/${profileRes.data.slug}`;
        setCardUrl(url);
        setSlug(profileRes.data.slug);
      }
      if (profileRes.data?.id) {
        const { data: events } = await supabase
          .from("nfc_analytics").select("event_type, created_at")
          .eq("profile_id", profileRes.data.id)
          .order("created_at", { ascending: true });
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const PERIOD_DAYS: Record<Period, number> = { "7j": 7, "30j": 30, "90j": 90 };
  const LOCKED_PERIODS: Period[] = plan === "free" ? ["30j", "90j"] : plan === "starter" ? ["90j"] : [];

  const days = PERIOD_DAYS[period];
  const from = daysBack(days);
  const filtered = analytics.filter((e) => e.created_at && new Date(e.created_at) >= from);
  const scans = filtered.filter((e) => e.event_type === "scan");
  const clicks = filtered.filter((e) => e.event_type === "button_click");
  const contacts = filtered.filter((e) => e.event_type === "vcard_download");
  const convRate = scans.length > 0 ? Math.round((contacts.length / scans.length) * 100) : 0;

  // Chart data
  const chartData: { date: string; scans: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = daysBack(i);
    const next = daysBack(i - 1);
    const count = scans.filter((e) => {
      const d = new Date(e.created_at!); return d >= day && d < next;
    }).length;
    chartData.push({ date: fmtDate(day.toISOString()), scans: count });
  }

  const bestDay = chartData.reduce((a, b) => (b.scans > a.scans ? b : a), { date: "—", scans: 0 });
  const totalScans = analytics.filter((e) => e.event_type === "scan").length;
  const hasData = scans.length > 0;

  // Smart lock estimate
  const scansLast7 = analytics.filter((e) => e.event_type === "scan" && e.created_at && new Date(e.created_at) >= daysBack(7)).length;
  const estimatedLost30 = Math.round(scansLast7 * 4.3 - scansLast7);
  const estimatedLost90 = Math.round(scansLast7 * 12.9 - scansLast7);

  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    localStorage.setItem("shared_link", "1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-6">
      {/* Header + period selector */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {totalScans} scans au total · {analytics.filter((e) => e.event_type === "vcard_download").length} contacts sauvegardés
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
          {(["7j", "30j", "90j"] as Period[]).map((p) => {
            const locked = LOCKED_PERIODS.includes(p);
            return (
              <button key={p} onClick={() => !locked && setPeriod(p)}
                className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: period === p && !locked ? "var(--color-card)" : "transparent",
                  color: locked ? "var(--color-muted-foreground)" : period === p ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  opacity: locked ? 0.6 : 1,
                }}
                title={locked ? "Disponible avec un plan supérieur" : undefined}>
                {locked && <Lock className="w-2.5 h-2.5" />}{p}
              </button>
            );
          })}
        </div>
      </div>

      {!hasData ? (
        /* ── Empty state gamifié ── */
        <div className="space-y-4">
          {/* Objectif visuel */}
          <div className="bg-card border border-border rounded-3xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))" }}>
              <Target className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">Objectif : vos 10 premiers scans</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Chaque partage = des scans = de la valeur perçue. Commencez maintenant.
            </p>

            {/* Progress bar */}
            <div className="max-w-xs mx-auto mb-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>0 scans</span>
                <span className="font-semibold text-foreground">Objectif : {SCAN_GOAL}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "0%", background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">0 / {SCAN_GOAL} — commencez à partager !</p>
            </div>

            {/* Tips */}
            <div className="grid sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto mb-6">
              {[
                { icon: <MessageCircle className="w-4 h-4 text-emerald-400" />, tip: "Envoyez sur WhatsApp à vos contacts pro", detail: "Le plus rapide — 5 minutes" },
                { icon: <QrCode className="w-4 h-4 text-violet-400" />, tip: "Imprimez le QR code sur vos supports", detail: "Flyers, menu, vitrine…" },
                { icon: <Share2 className="w-4 h-4 text-sky-400" />, tip: "Partagez sur LinkedIn", detail: "Gagnez en visibilité pro" },
              ].map((t) => (
                <div key={t.tip} className="flex gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                  <div className="flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.tip}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            {cardUrl && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇\n${cardUrl}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => localStorage.setItem("shared_link","1")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> Partager sur WhatsApp
                </a>
                <button onClick={copyLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copié !" : "Copier mon lien"}
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
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MiniStat icon={<Eye className="w-4 h-4" />}               label="Scans"       value={scans.length}    color="#8B5CF6" />
            <MiniStat icon={<MousePointerClick className="w-4 h-4" />}  label="Clics"       value={clicks.length}   color="#EC4899" />
            <MiniStat icon={<UserPlus className="w-4 h-4" />}           label="Contacts"    value={contacts.length} color="#10B981" />
            <MiniStat icon={<TrendingUp className="w-4 h-4" />}         label="Taux conv."  value={`${convRate}%`}  color="#F59E0B" />
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-foreground">Scans par jour</h2>
              <span className="text-xs text-muted-foreground">
                Meilleur jour : <span className="font-medium text-foreground">{bestDay.date} ({bestDay.scans})</span>
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  tickLine={false} axisLine={false} interval={Math.floor(days / 6)} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ fontWeight: 600 }} formatter={(v: number) => [v, "Scans"]} />
                <Line type="monotone" dataKey="scans" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#8B5CF6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Share section (persistent) */}
          {cardUrl && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm font-semibold text-foreground mb-3">Continuez à partager pour plus de scans</p>
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
                  <Download className="w-3.5 h-3.5" /> QR Code
                </a>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Smart lock banner ── */}
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
                  ? `Vous avez ${scansLast7} scans cette semaine — et probablement ${estimatedLost30}+ scans invisibles sur 30 jours.`
                  : "Déverrouillez les statistiques long terme."}
              </p>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                {LOCKED_PERIODS.includes("30j") && LOCKED_PERIODS.includes("90j")
                  ? `Avec un plan Starter, voyez vos données sur 30 jours. Pro = 90 jours. Estimé : ~${estimatedLost90} scans cachés.`
                  : `Avec un plan Pro, voyez vos données sur 90 jours. Estimé : ~${estimatedLost90} scans que vous ne pouvez pas voir.`}
              </p>
              <Link to="/dashboard/abonnement"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                Débloquer <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
