import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { O as Lock, ay as Target, M as MessageCircle, Q as QrCode, ak as Share2, m as Check, s as Copy, t as Download, E as Eye, an as MousePointerClick, ao as UserPlus, T as TrendingUp, Z as Zap, ap as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/clsx.mjs";
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
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short"
  });
}
function StatistiquesPage() {
  const [analytics, setAnalytics] = reactExports.useState([]);
  const [plan, setPlan] = reactExports.useState("free");
  const [cardUrl, setCardUrl] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [period, setPeriod] = reactExports.useState("7j");
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function load() {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const [profileRes, subRes] = await Promise.all([supabase.from("nfc_profiles").select("id, slug").eq("user_id", user.id).maybeSingle(), supabase.from("subscriptions").select("plan").eq("user_id", user.id).maybeSingle()]);
      setPlan(subRes.data?.plan ?? "free");
      if (profileRes.data?.slug) {
        const url = `${window.location.origin}/${profileRes.data.slug}`;
        setCardUrl(url);
        setSlug(profileRes.data.slug);
      }
      if (profileRes.data?.id) {
        const {
          data: events
        } = await supabase.from("nfc_analytics").select("event_type, created_at").eq("profile_id", profileRes.data.id).order("created_at", {
          ascending: true
        });
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
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
  const clicks = filtered.filter((e) => e.event_type === "button_click");
  const contacts = filtered.filter((e) => e.event_type === "vcard_download");
  const convRate = scans.length > 0 ? Math.round(contacts.length / scans.length * 100) : 0;
  const chartData = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = daysBack(i);
    const next = daysBack(i - 1);
    const count = scans.filter((e) => {
      const d = new Date(e.created_at);
      return d >= day && d < next;
    }).length;
    chartData.push({
      date: fmtDate(day.toISOString()),
      scans: count
    });
  }
  const bestDay = chartData.reduce((a, b) => b.scans > a.scans ? b : a, {
    date: "—",
    scans: 0
  });
  const totalScans = analytics.filter((e) => e.event_type === "scan").length;
  const hasData = scans.length > 0;
  const scansLast7 = analytics.filter((e) => e.event_type === "scan" && e.created_at && new Date(e.created_at) >= daysBack(7)).length;
  const estimatedLost30 = Math.round(scansLast7 * 4.3 - scansLast7);
  const estimatedLost90 = Math.round(scansLast7 * 12.9 - scansLast7);
  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    localStorage.setItem("shared_link", "1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 lg:p-8 max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Statistiques" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
          totalScans,
          " scans au total · ",
          analytics.filter((e) => e.event_type === "vcard_download").length,
          " contacts sauvegardés"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 p-1 rounded-xl bg-muted", children: ["7j", "30j", "90j"].map((p) => {
        const locked = LOCKED_PERIODS.includes(p);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !locked && setPeriod(p), className: "relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all", style: {
          background: period === p && !locked ? "var(--color-card)" : "transparent",
          color: locked ? "var(--color-muted-foreground)" : period === p ? "var(--color-foreground)" : "var(--color-muted-foreground)",
          opacity: locked ? 0.6 : 1
        }, title: locked ? "Disponible avec un plan supérieur" : void 0, children: [
          locked && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
          p
        ] }, p);
      }) })
    ] }),
    !hasData ? (
      /* ── Empty state gamifié ── */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4", style: {
          background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-8 h-8 text-violet-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-1", children: "Objectif : vos 10 premiers scans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "Chaque partage = des scans = de la valeur perçue. Commencez maintenant." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs mx-auto mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0 scans" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              "Objectif : ",
              SCAN_GOAL
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: {
            width: "0%",
            background: "linear-gradient(90deg,#8B5CF6,#EC4899)"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "0 / ",
            SCAN_GOAL,
            " — commencez à partager !"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto mb-6", children: [{
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-emerald-400" }),
          tip: "Envoyez sur WhatsApp à vos contacts pro",
          detail: "Le plus rapide — 5 minutes"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-violet-400" }),
          tip: "Imprimez le QR code sur vos supports",
          detail: "Flyers, menu, vitrine…"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-sky-400" }),
          tip: "Partagez sur LinkedIn",
          detail: "Gagnez en visibilité pro"
        }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-3 rounded-xl bg-muted/50 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-0.5", children: t.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: t.tip }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: t.detail })
          ] })
        ] }, t.tip)) }),
        cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇
${cardUrl}`)}`, target: "_blank", rel: "noopener noreferrer", onClick: () => localStorage.setItem("shared_link", "1"), className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90", style: {
            background: "#25D366"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            " Partager sur WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyLink, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition", children: [
            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
            copied ? "Copié !" : "Copier mon lien"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(cardUrl)}&margin=20`, download: "qr-code.png", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background hover:bg-accent transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            " QR Code HD"
          ] })
        ] })
      ] }) })
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }), label: "Scans", value: scans.length, color: "#8B5CF6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-4 h-4" }), label: "Clics", value: clicks.length, color: "#EC4899" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }), label: "Contacts", value: contacts.length, color: "#10B981" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }), label: "Taux conv.", value: `${convRate}%`, color: "#F59E0B" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Scans par jour" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Meilleur jour : ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              bestDay.date,
              " (",
              bestDay.scans,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, margin: {
          top: 4,
          right: 4,
          left: -20,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: {
            fontSize: 10,
            fill: "var(--color-muted-foreground)"
          }, tickLine: false, axisLine: false, interval: Math.floor(days / 6) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 10,
            fill: "var(--color-muted-foreground)"
          }, tickLine: false, axisLine: false, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            fontSize: 12
          }, labelStyle: {
            fontWeight: 600
          }, formatter: (v) => [v, "Scans"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "scans", stroke: "#8B5CF6", strokeWidth: 2.5, dot: false, activeDot: {
            r: 4,
            fill: "#8B5CF6"
          } })
        ] }) })
      ] }),
      cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Continuez à partager pour plus de scans" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            " QR Code"
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mb-1", children: scansLast7 > 0 ? `Vous avez ${scansLast7} scans cette semaine — et probablement ${estimatedLost30}+ scans invisibles sur 30 jours.` : "Déverrouillez les statistiques long terme." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-3", style: {
          color: "rgba(255,255,255,0.55)"
        }, children: LOCKED_PERIODS.includes("30j") && LOCKED_PERIODS.includes("90j") ? `Avec un plan Starter, voyez vos données sur 30 jours. Pro = 90 jours. Estimé : ~${estimatedLost90} scans cachés.` : `Avec un plan Pro, voyez vos données sur 90 jours. Estimé : ~${estimatedLost90} scans que vous ne pouvez pas voir.` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/abonnement", className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition hover:opacity-90", style: {
          background: "linear-gradient(135deg,#7c3aed,#EC4899)"
        }, children: [
          "Débloquer ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })
        ] })
      ] })
    ] }) })
  ] });
}
function MiniStat({
  icon,
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl flex items-center justify-center mb-3", style: {
      background: `${color}18`,
      color
    }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
  ] });
}
export {
  StatistiquesPage as component
};
