import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Eye, MousePointerClick, UserPlus, TrendingUp, Lock, Share2, Copy, Check } from "lucide-react";

type Period = "7j" | "30j" | "90j";
type AnalyticsRow = { event_type: string; created_at: string | null };

export const Route = createFileRoute("/dashboard/statistiques")({
  component: StatistiquesPage,
});

function daysBack(n: number) {
  return new Date(Date.now() - n * 86400000);
}

function fmtDate(iso: string, short = false): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", short ? { day: "numeric", month: "short" } : { weekday: "short", day: "numeric", month: "short" });
}

function StatistiquesPage() {
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [plan, setPlan] = useState<string>("free");
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("7j");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, subRes] = await Promise.all([
        supabase.from("nfc_profiles").select("id").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("user_id", user.id).maybeSingle(),
      ]);

      setPlan(subRes.data?.plan ?? "free");

      if (profileRes.data?.id) {
        const { data: events } = await supabase
          .from("nfc_analytics")
          .select("event_type, created_at")
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

  // Build chart data: one point per day
  const chartData: { date: string; scans: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = daysBack(i);
    const next = daysBack(i - 1);
    const label = fmtDate(day.toISOString(), true);
    const count = scans.filter((e) => {
      const d = new Date(e.created_at!);
      return d >= day && d < next;
    }).length;
    chartData.push({ date: label, scans: count });
  }

  // Button breakdown
  const btnBreakdown: Record<string, number> = {};
  filtered.filter((e) => e.event_type === "button_click").forEach((e) => {
    const type = "Bouton";
    btnBreakdown[type] = (btnBreakdown[type] ?? 0) + 1;
  });
  const totalClicks = clicks.length;

  const bestDay = chartData.reduce((a, b) => (b.scans > a.scans ? b : a), { date: "—", scans: 0 });

  function copyShareLink() {
    if (typeof window === "undefined") return;
    const path = window.location.origin;
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const hasData = scans.length > 0;

  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Suivez les performances de votre carte.</p>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
          {(["7j", "30j", "90j"] as Period[]).map((p) => {
            const locked = LOCKED_PERIODS.includes(p);
            return (
              <button
                key={p}
                onClick={() => !locked && setPeriod(p)}
                className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: period === p && !locked ? "var(--color-card)" : "transparent",
                  color: locked ? "var(--color-muted-foreground)" : period === p ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  opacity: locked ? 0.6 : 1,
                }}
                title={locked ? "Disponible avec un plan supérieur" : undefined}
              >
                {locked && <Lock className="w-2.5 h-2.5" />}
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {!hasData ? (
        /* Empty state */
        <div className="bg-card border border-border rounded-3xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Aucune donnée pour l'instant</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Partagez votre lien pour commencer à voir vos statistiques de scans et de clics.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={copyShareLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-cta text-white text-sm font-semibold hover:opacity-90 transition">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Lien copié !" : "Copier mon lien"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent("Voici ma carte digitale !")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-background text-sm font-medium hover:bg-accent transition">
              <Share2 className="w-4 h-4" /> Partager
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MiniStat icon={<Eye className="w-4 h-4" />} label="Scans" value={scans.length} color="#8B5CF6" />
            <MiniStat icon={<MousePointerClick className="w-4 h-4" />} label="Clics" value={clicks.length} color="#EC4899" />
            <MiniStat icon={<UserPlus className="w-4 h-4" />} label="Contacts" value={contacts.length} color="#10B981" />
            <MiniStat icon={<TrendingUp className="w-4 h-4" />} label="Taux conv." value={`${convRate}%`} color="#F59E0B" />
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-foreground">Scans par jour</h2>
              <span className="text-xs text-muted-foreground">
                Meilleure journée : <span className="font-medium text-foreground">{bestDay.date} ({bestDay.scans})</span>
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  tickLine={false} axisLine={false} interval={Math.floor(days / 6)} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                  formatter={(v: number) => [v, "Scans"]}
                />
                <Line type="monotone" dataKey="scans" stroke="#8B5CF6" strokeWidth={2.5}
                  dot={false} activeDot={{ r: 4, fill: "#8B5CF6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown table */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-4">Répartition des clics</h2>
            {totalClicks === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun clic sur vos boutons sur cette période.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(btnBreakdown).map(([type, count]) => {
                  const pct = Math.round((count / totalClicks) * 100);
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{type}</span>
                        <span className="text-muted-foreground">{count} clics · {pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Upgrade nudge for locked periods */}
      {LOCKED_PERIODS.length > 0 && (
        <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.08),rgba(236,72,153,0.06))", border: "1px solid rgba(139,92,246,0.2)" }}>
          <Lock className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Débloque les stats 30j et 90j</p>
            <p className="text-xs text-muted-foreground">Analyse les tendances long terme avec un plan supérieur.</p>
          </div>
          <Link to="/dashboard/abonnement"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition hover:opacity-90 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
            Upgrader
          </Link>
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
