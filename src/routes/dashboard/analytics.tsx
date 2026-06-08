import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrendingUp, Eye, MousePointerClick, Save, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Statistiques avancées — Dashboard" }] }),
  component: AnalyticsPage,
});

type DayBucket = { d: string; scans: number; saves: number };
type HourBucket = { h: number; count: number };
type SourceBucket = { source: string; count: number };

function AnalyticsPage() {
  const [days, setDays] = useState<DayBucket[]>([]);
  const [hours, setHours] = useState<HourBucket[]>(Array.from({ length: 24 }, (_, h) => ({ h, count: 0 })));
  const [sources, setSources] = useState<SourceBucket[]>([]);
  const [totals, setTotals] = useState({ views: 0, clicks: 0, saves: 0, engagement: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) { setLoading(false); return; }

    const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();

    supabase
      .from("nfc_analytics")
      .select("event_type, created_at, event_data")
      .eq("profile_id", profile.id)
      .gte("created_at", since30)
      .order("created_at", { ascending: true })
      .then(({ data: rows }) => {
        if (!rows) { setLoading(false); return; }

        const views = rows.filter(r => r.event_type === "view" || r.event_type === "scan").length;
        const clicks = rows.filter(r => r.event_type === "button_click").length;
        const saves = rows.filter(r => r.event_type === "vcard_download").length;
        setTotals({ views, clicks, saves, engagement: views > 0 ? Math.round(((clicks + saves) / views) * 100) : 0 });

        // 30-day buckets
        const dayMap: Record<string, { scans: number; saves: number }> = {};
        for (let i = 29; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
          dayMap[d] = { scans: 0, saves: 0 };
        }
        for (const r of rows) {
          const d = r.created_at.slice(0, 10);
          if (!dayMap[d]) continue;
          if (r.event_type === "view" || r.event_type === "scan") dayMap[d].scans++;
          if (r.event_type === "vcard_download") dayMap[d].saves++;
        }
        setDays(Object.entries(dayMap).map(([d, v]) => ({ d, ...v })));

        // Hourly heatmap
        const hourMap: Record<number, number> = {};
        for (let h = 0; h < 24; h++) hourMap[h] = 0;
        for (const r of rows) {
          const h = new Date(r.created_at).getHours();
          hourMap[h] = (hourMap[h] || 0) + 1;
        }
        setHours(Array.from({ length: 24 }, (_, h) => ({ h, count: hourMap[h] })));

        // Sources
        const srcMap: Record<string, number> = { "Tap NFC / Scan": 0, "QR code": 0, "Lien direct": 0 };
        for (const r of rows) {
          if (r.event_type === "qr_scan") { srcMap["QR code"]++; continue; }
          const ref: string = (r.event_data as Record<string, string>)?.referrer ?? "";
          if (ref === "" || ref === "direct") srcMap["Tap NFC / Scan"]++;
          else srcMap["Lien direct"]++;
        }
        setSources(Object.entries(srcMap).map(([source, count]) => ({ source, count })).filter(s => s.count > 0));

        setLoading(false);
      });
  }, []);

  const maxScan = Math.max(...days.map(d => d.scans), 1);
  const maxHour = Math.max(...hours.map(h => h.count), 1);
  const totalSrc = sources.reduce((s, x) => s + x.count, 0) || 1;
  const peakHour = hours.reduce((best, h) => h.count > best.count ? h : best, { h: 0, count: 0 });
  const COLORS = ["bg-primary", "bg-violet-500", "bg-amber-500"];

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Vues 30j", v: loading ? "…" : totals.views.toString(), icon: Eye },
          { l: "Clics liens", v: loading ? "…" : totals.clicks.toString(), icon: MousePointerClick },
          { l: "Contacts sauvés", v: loading ? "…" : totals.saves.toString(), icon: Save },
          { l: "Taux engagement", v: loading ? "…" : `${totals.engagement}%`, icon: TrendingUp },
        ].map(k => (
          <div key={k.l} className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-wider mb-2">
              <k.icon className="h-3.5 w-3.5" /> {k.l}
            </div>
            <div className="font-display text-2xl">{k.v}</div>
          </div>
        ))}
      </div>

      {/* 30-day bar chart */}
      <div className="rounded-2xl border border-border bg-card/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg">Activité sur 30 jours</h3>
            <p className="text-xs text-muted-foreground">Vues & sauvegardes contact</p>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Vues</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Sauvés</span>
          </div>
        </div>
        {loading ? (
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Chargement…</div>
        ) : days.every(d => d.scans === 0 && d.saves === 0) ? (
          <div className="h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Eye className="h-8 w-8 opacity-30" />
            <p className="text-sm">Aucune activité sur 30 jours.<br /><span className="text-xs opacity-70">Partagez votre carte pour voir apparaître des données.</span></p>
          </div>
        ) : (
          <>
            <div className="flex items-end gap-0.5 h-48">
              {days.map(d => (
                <div key={d.d} className="flex-1 flex flex-col items-center gap-0.5 min-h-0" title={`${d.d}: ${d.scans} vues, ${d.saves} sauvés`}>
                  <div className="w-full bg-primary/70 rounded-t-sm hover:bg-primary transition" style={{ height: `${(d.scans / maxScan) * 160}px`, minHeight: d.scans > 0 ? 2 : 0 }} />
                  <div className="w-full bg-emerald-500/70 rounded-t-sm" style={{ height: `${(d.saves / maxScan) * 80}px`, minHeight: d.saves > 0 ? 2 : 0 }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
              <span>il y a 30j</span><span>il y a 15j</span><span>aujourd'hui</span>
            </div>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Hourly heatmap */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h3 className="font-display text-lg mb-1">Heatmap horaire</h3>
          <p className="text-xs text-muted-foreground mb-4">Quand vos contacts consultent votre carte</p>
          <div className="grid grid-cols-12 gap-1">
            {hours.map(h => (
              <div
                key={h.h}
                className="aspect-square rounded-sm transition"
                style={{ background: `hsl(var(--primary) / ${Math.max(0.06, h.count / maxHour)})` }}
                title={`${h.h}h — ${h.count} événement${h.count !== 1 ? "s" : ""}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>00h</span><span>12h</span><span>23h</span>
          </div>
          {peakHour.count > 0 && (
            <div className="text-xs text-muted-foreground mt-3">
              Pic d'activité : <span className="text-foreground font-medium">{peakHour.h}h–{peakHour.h + 1}h</span>
            </div>
          )}
        </div>

        {/* Sources */}
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h3 className="font-display text-lg mb-1">Sources de trafic</h3>
          <p className="text-xs text-muted-foreground mb-4">Comment ils arrivent sur votre carte</p>
          {loading ? (
            <div className="text-sm text-muted-foreground">Chargement…</div>
          ) : sources.length === 0 ? (
            <div className="text-sm text-muted-foreground">Aucune donnée disponible.</div>
          ) : (
            <div className="space-y-4">
              {sources.map((s, i) => {
                const pct = Math.round((s.count / totalSrc) * 100);
                return (
                  <div key={s.source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${COLORS[i % COLORS.length]}`} />{s.source}</span>
                      <span className="font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${COLORS[i % COLORS.length]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{s.count} événement{s.count !== 1 ? "s" : ""}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Smartphone className="h-3.5 w-3.5" /> Données d'appareils disponibles prochainement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
