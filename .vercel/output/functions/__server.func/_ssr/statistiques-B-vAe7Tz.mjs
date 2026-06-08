import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { g as getProfileMeta } from "./router-D4tTYUKv.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { aB as RefreshCw, as as Lock, m as Eye, n as MousePointerClick, r as UserPlus, p as TrendingUp, ai as ChartColumn, k as MessageCircle, l as Check, ak as Copy, Q as QrCode, Z as Zap, aO as ArrowUpRight, aP as Target, a5 as Share2, D as Download, a2 as Calendar, G as Globe, M as Mail, au as Phone } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Area } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-Blf3hkdm.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/zod.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const SCAN_GOAL = 10;
function daysBack(n) {
  return new Date(Date.now() - n * 864e5);
}
function fmtDate(iso, days) {
  if (days <= 7) return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "short"
  });
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short"
  });
}
const CLICK_TYPE_LABELS = {
  call: "Appel",
  whatsapp: "WhatsApp",
  email: "Email",
  website: "Site web",
  calendar: "Calendrier",
  cta: "CTA",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  tiktok: "TikTok",
  youtube: "YouTube"
};
function StatistiquesPage() {
  const [analytics, setAnalytics] = reactExports.useState([]);
  const [plan, setPlan] = reactExports.useState("free");
  const [cardUrl, setCardUrl] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [period, setPeriod] = reactExports.useState("7j");
  const [copied, setCopied] = reactExports.useState(false);
  const [profileId, setProfileId] = reactExports.useState(null);
  const refresh = reactExports.useCallback(() => {
    if (!profileId) return;
    setRefreshing(true);
    supabase.from("nfc_analytics").select("event_type, created_at, event_data").eq("profile_id", profileId).order("created_at", {
      ascending: true
    }).then(({
      data
    }) => {
      if (data) setAnalytics(data);
      setRefreshing(false);
    });
  }, [profileId]);
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) {
      setLoading(false);
      return;
    }
    setCardUrl(`${window.location.origin}/${profile.slug}`);
    setPlan(profile.plan ?? "free");
    setProfileId(profile.id);
    supabase.from("nfc_analytics").select("event_type, created_at, event_data").eq("profile_id", profile.id).order("created_at", {
      ascending: true
    }).then(({
      data
    }) => {
      if (data) setAnalytics(data);
      setLoading(false);
    });
    supabase.auth.getUser().then(() => {
      setLoading(false);
    });
    const channel = supabase.channel(`analytics-${profile.id}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "nfc_analytics",
      filter: `profile_id=eq.${profile.id}`
    }, (payload) => {
      setAnalytics((prev) => [...prev, payload.new]);
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const PERIOD_DAYS = {
    "7j": 7,
    "30j": 30,
    "90j": 90
  };
  const LOCKED_PERIODS = plan === "free" ? ["30j", "90j"] : plan === "starter" ? ["90j"] : [];
  const days = PERIOD_DAYS[period];
  const from = daysBack(days);
  const filtered = analytics.filter((e) => e.created_at && new Date(e.created_at) >= from);
  const scans = filtered.filter((e) => e.event_type === "scan");
  const clicks = filtered.filter((e) => e.event_type === "click_button" || e.event_type === "click_social");
  const contacts = filtered.filter((e) => e.event_type === "vcard_download");
  const convRate = scans.length > 0 ? Math.round(contacts.length / scans.length * 100) : 0;
  const clickRate = scans.length > 0 ? Math.round(clicks.length / scans.length * 100) : 0;
  const clickBreakdown = clicks.reduce((acc, e) => {
    const type = e.event_data?.type ?? "other";
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});
  const topClicks = Object.entries(clickBreakdown).sort((a, b) => b[1] - a[1]);
  const chartData = Array.from({
    length: days
  }, (_, i) => {
    const day = daysBack(days - 1 - i);
    const next = daysBack(days - 2 - i);
    const dayScans = scans.filter((e) => {
      const d = new Date(e.created_at);
      return d >= day && d < next;
    }).length;
    const dayClicks = clicks.filter((e) => {
      const d = new Date(e.created_at);
      return d >= day && d < next;
    }).length;
    const dayContacts = contacts.filter((e) => {
      const d = new Date(e.created_at);
      return d >= day && d < next;
    }).length;
    return {
      date: fmtDate(day.toISOString(), days),
      scans: dayScans,
      clics: dayClicks,
      contacts: dayContacts
    };
  });
  const bestDay = chartData.reduce((a, b) => b.scans > a.scans ? b : a, {
    date: "—",
    scans: 0,
    clics: 0,
    contacts: 0
  });
  const totalScans = analytics.filter((e) => e.event_type === "scan").length;
  const hasData = scans.length > 0;
  const scansLast7 = analytics.filter((e) => e.event_type === "scan" && e.created_at && new Date(e.created_at) >= daysBack(7)).length;
  const estimatedLost90 = Math.max(0, Math.round(scansLast7 * 12.9 - scansLast7));
  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 lg:p-8 max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Statistiques" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            totalScans,
            " scans au total · ",
            analytics.filter((e) => e.event_type === "vcard_download").length,
            " contacts sauvegardés"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: refresh, disabled: refreshing, className: "h-8 w-8 grid place-items-center rounded-lg bg-muted hover:bg-accent transition disabled:opacity-50", title: "Rafraîchir les données", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 p-1 rounded-xl bg-muted self-start sm:self-auto", children: ["7j", "30j", "90j"].map((p) => {
        const locked = LOCKED_PERIODS.includes(p);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !locked && setPeriod(p), className: "relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all", style: {
          background: period === p && !locked ? "var(--color-card)" : "transparent",
          color: locked ? "var(--color-muted-foreground)" : period === p ? "var(--color-foreground)" : "var(--color-muted-foreground)",
          opacity: locked ? 0.6 : 1,
          boxShadow: period === p && !locked ? "0 1px 3px rgba(0,0,0,0.12)" : void 0
        }, title: locked ? "Disponible avec un plan supérieur" : void 0, children: [
          locked && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
          p
        ] }, p);
      }) })
    ] }),
    !hasData ? (
      /* ── Empty state ── */
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { totalScans, cardUrl, copied, onCopy: copyLink })
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }), label: "Scans", value: scans.length, sub: `+${scans.length} sur ${period}`, color: "#8B5CF6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-4 h-4" }), label: "Clics", value: clicks.length, sub: `${clickRate}% des visiteurs`, color: "#EC4899" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }), label: "Contacts", value: contacts.length, sub: `${convRate}% de conversion`, color: "#10B981" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }), label: "Meilleur jour", value: bestDay.scans, sub: bestDay.date, color: "#F59E0B" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-medium text-sm text-foreground", children: [
            "Activité sur ",
            period
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: chartData, margin: {
          top: 4,
          right: 4,
          left: -24,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gScans", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#8B5CF6", stopOpacity: 0.25 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#8B5CF6", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gClics", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#EC4899", stopOpacity: 0.2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#EC4899", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: {
            fontSize: 10,
            fill: "var(--color-muted-foreground)"
          }, tickLine: false, axisLine: false, interval: days <= 7 ? 0 : Math.floor(days / 6) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 10,
            fill: "var(--color-muted-foreground)"
          }, tickLine: false, axisLine: false, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 10,
            fontSize: 12,
            padding: "8px 12px"
          }, labelStyle: {
            fontWeight: 600,
            marginBottom: 4
          }, formatter: (v, name) => [v, name === "scans" ? "Scans" : name === "clics" ? "Clics" : "Contacts"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { formatter: (v) => v === "scans" ? "Scans" : v === "clics" ? "Clics" : "Contacts", iconType: "circle", iconSize: 8, wrapperStyle: {
            fontSize: 11,
            paddingTop: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "scans", stroke: "#8B5CF6", strokeWidth: 2, fill: "url(#gScans)", dot: false, activeDot: {
            r: 4
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "clics", stroke: "#EC4899", strokeWidth: 2, fill: "url(#gClics)", dot: false, activeDot: {
            r: 4
          } })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        topClicks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground mb-4", children: "Clics par bouton" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: topClicks.map(([type, count]) => {
            const pct = Math.round(count / clicks.length * 100);
            const icons = {
              call: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
              whatsapp: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
              email: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
              website: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
              calendar: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" })
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground", children: icons[type] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: CLICK_TYPE_LABELS[type] ?? type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    count,
                    " (",
                    pct,
                    "%)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: {
                  width: `${pct}%`,
                  background: "linear-gradient(90deg,#8B5CF6,#EC4899)"
                } }) })
              ] })
            ] }, type);
          }) })
        ] }),
        cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground mb-1", children: "Continuez à partager" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Chaque partage = nouveaux scans = nouveaux clients." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite : ${cardUrl}`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white", style: {
              background: "#25D366"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
              " WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyLink, className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border hover:bg-accent transition", children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
              copied ? "Copié" : "Copier lien"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&margin=20`, download: "qr.png", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border hover:bg-accent transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
              " QR Code"
            ] })
          ] })
        ] })
      ] })
    ] }),
    LOCKED_PERIODS.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl p-5 relative overflow-hidden", style: {
      background: "linear-gradient(135deg,#0f0520,#1a0b2e)",
      border: "1px solid rgba(139,92,246,0.25)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: {
        background: "rgba(139,92,246,0.2)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-violet-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mb-1", children: scansLast7 > 0 ? `${scansLast7} scans cette semaine — et ~${estimatedLost90} scans non visibles sur 90 jours.` : "Déverrouillez les statistiques long terme." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-3", style: {
          color: "rgba(255,255,255,0.55)"
        }, children: LOCKED_PERIODS.includes("30j") ? "Plan Starter = données 30 jours. Plan Pro = 90 jours d'historique complet." : "Plan Pro = 90 jours d'historique pour suivre vos tendances." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/abonnement", className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition hover:opacity-90", style: {
          background: "linear-gradient(135deg,#7c3aed,#EC4899)"
        }, children: [
          "Passer au Pro ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })
        ] })
      ] })
    ] }) })
  ] });
}
function KpiCard({
  icon,
  label,
  value,
  sub,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg flex items-center justify-center", style: {
        background: `${color}18`,
        color
      }, children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tracking-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: sub })
  ] });
}
function EmptyState({
  totalScans,
  cardUrl,
  copied,
  onCopy
}) {
  const progress = Math.min(100, Math.round(totalScans / SCAN_GOAL * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-3xl p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4", style: {
      background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-7 h-7 text-violet-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "Objectif : vos 10 premiers scans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Chaque partage = des scans = de la valeur perçue. Commencez maintenant." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          totalScans,
          " scan",
          totalScans > 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          "Objectif : ",
          SCAN_GOAL
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
        width: `${progress}%`,
        background: "linear-gradient(90deg,#8B5CF6,#EC4899)"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
        totalScans,
        " / ",
        SCAN_GOAL,
        totalScans === 0 ? " — commencez à partager !" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-2.5 text-left mb-6", children: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-emerald-400" }),
      tip: "Partagez sur WhatsApp",
      detail: "À vos contacts pro — 5 min"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-violet-400" }),
      tip: "QR code sur vos supports",
      detail: "Flyers, menu, vitrine…"
    }, {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-sky-400" }),
      tip: "LinkedIn ou Instagram",
      detail: "Bio, posts, stories"
    }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: t.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: t.tip }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: t.detail })
      ] })
    ] }, t.tip)) }),
    cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇
${cardUrl}`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white", style: {
        background: "#25D366"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
        " WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onCopy, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition", children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
        copied ? "Copié !" : "Copier le lien"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&margin=20`, download: "qr-code.png", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        " QR Code HD"
      ] })
    ] })
  ] }) });
}
export {
  StatistiquesPage as component
};
