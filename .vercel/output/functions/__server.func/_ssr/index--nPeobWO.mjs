import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCardStore, g as getProfileMeta, B as Button, a as cn } from "./router-Bmg7SHe7.mjs";
import { U as UpsellSection } from "./UpsellSection-C65Etqi4.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { u as usePlan } from "./use-plan-DWfZwcOg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { y as Sparkles, A as ArrowRight, a1 as Eye, aO as MousePointerClick, aA as Smartphone, Q as QrCode, C as CircleCheck, a as Circle, Z as Zap, c as CreditCard, ag as Palette, ad as Share2, w as TrendingUp, af as Layers, ah as Link2, ai as Image, aj as ChartNoAxesColumn, al as Settings, d as ChevronRight, aP as TrendingDown } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-C9yWHyAp.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function getCompletion(data) {
  const items = [
    { id: "name", label: "Nom complet", done: !!data.name?.trim(), weight: 10 },
    { id: "title", label: "Titre / poste", done: !!data.title?.trim(), weight: 8 },
    { id: "photo", label: "Photo de profil", done: !!data.photo, weight: 12, hint: "Une photo augmente la confiance de +63%" },
    { id: "agency", label: "Agence / société", done: !!data.agency?.trim(), weight: 6 },
    { id: "area", label: "Zone d'activité", done: !!data.area?.trim(), weight: 6 },
    { id: "phone", label: "Téléphone", done: !!data.phone, weight: 8 },
    { id: "email", label: "Email", done: !!data.email, weight: 8 },
    { id: "actions", label: "Boutons d'action", done: !!(data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website), weight: 10 },
    { id: "vcard", label: "Bouton vCard", done: data.vcardEnabled, weight: 6 },
    { id: "about", label: "Bio / À propos", done: data.aboutEnabled && !!data.bio?.trim(), weight: 8, hint: "Racontez votre approche en 2 phrases" },
    { id: "services", label: "Services proposés", done: data.servicesEnabled && data.services.length > 0, weight: 8 },
    { id: "testimonials", label: "Témoignages clients", done: data.testimonialsEnabled && data.testimonials.length > 0, weight: 6, hint: "+34% de conversion avec 3 avis minimum" },
    { id: "video", label: "Vidéo de présentation", done: data.videoEnabled, weight: 4, hint: "Une vidéo retient l'attention 5x plus longtemps" }
  ];
  const total = items.reduce((s, i) => s + i.weight, 0);
  const got = items.reduce((s, i) => s + (i.done ? i.weight : 0), 0);
  const score = Math.round(got / total * 100);
  const missing = items.filter((i) => !i.done);
  return { score, items, missing };
}
function MetricCard({ icon: Icon, label, value, delta, spark, hint }) {
  const positive = (delta ?? 0) >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/40 p-4 transition hover:border-primary/40 hover:-translate-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-60 group-hover:opacity-100 transition", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 grid place-items-center rounded-md bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label })
      ] }),
      typeof delta === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-0.5 text-[11px] font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`, children: [
        positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
        Math.abs(delta),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl leading-none", children: value }),
        hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1.5", children: hint })
      ] }),
      spark && spark.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { points: spark, positive })
    ] })
  ] });
}
function Sparkline({ points, positive }) {
  const w = 70, h = 28;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p - min) / range * h}`).join(" ");
  const color = positive ? "rgb(52 211 153)" : "rgb(244 114 132)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: w, height: h, className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: "0.35" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `${d} L ${w} ${h} L 0 ${h} Z`, fill: "url(#sg)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d, fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const ONBOARDING_STEPS = [{
  n: 1,
  to: "/dashboard/card",
  icon: CreditCard,
  title: "Ma carte",
  description: "Accédez à votre aperçu live, copiez votre lien public et téléchargez votre QR code à imprimer ou à partager par message.",
  color: "text-violet-500",
  bg: "bg-violet-500/10",
  border: "border-violet-500/30"
}, {
  n: 2,
  to: "/dashboard/content",
  icon: Layers,
  title: "Contenu",
  description: "Remplissez vos sections : identité, services, témoignages, boutons d'action. C'est le cœur de votre carte.",
  color: "text-sky-500",
  bg: "bg-sky-500/10",
  border: "border-sky-500/30"
}, {
  n: 3,
  to: "/dashboard/theme",
  icon: Palette,
  title: "Apparence",
  description: "Choisissez votre thème de couleurs et la variante visuelle qui correspond le mieux à votre univers professionnel.",
  color: "text-pink-500",
  bg: "bg-pink-500/10",
  border: "border-pink-500/30"
}, {
  n: 4,
  to: "/dashboard/style",
  icon: Sparkles,
  title: "Style des sections",
  description: "Personnalisez le rendu de chaque section : alignement, espacement, style des badges et des boutons.",
  color: "text-amber-500",
  bg: "bg-amber-500/10",
  border: "border-amber-500/30"
}, {
  n: 5,
  to: "/dashboard/links",
  icon: Link2,
  title: "Liens & réseaux",
  description: "Ajoutez vos réseaux sociaux (LinkedIn, Instagram, TikTok), votre numéro WhatsApp et vos liens personnalisés.",
  color: "text-emerald-500",
  bg: "bg-emerald-500/10",
  border: "border-emerald-500/30"
}, {
  n: 6,
  to: "/dashboard/media",
  icon: Image,
  title: "Médias",
  description: "Importez votre photo de profil, votre logo d'entreprise et vos images de galerie pour enrichir votre carte.",
  color: "text-orange-500",
  bg: "bg-orange-500/10",
  border: "border-orange-500/30"
}, {
  n: 7,
  to: "/dashboard/statistiques",
  icon: ChartNoAxesColumn,
  title: "Statistiques",
  description: "Suivez vos vues, clics sur vos boutons et téléchargements vCard en temps réel. Sachez qui visite votre carte.",
  color: "text-cyan-500",
  bg: "bg-cyan-500/10",
  border: "border-cyan-500/30"
}, {
  n: 8,
  to: "/dashboard/settings",
  icon: Settings,
  title: "Paramètres",
  description: "Gérez votre profil public, votre mot de passe, vos préférences de notification et vos données personnelles.",
  color: "text-slate-500",
  bg: "bg-slate-500/10",
  border: "border-slate-500/30"
}];
function OverviewPage() {
  const {
    data,
    hydrated
  } = useCardStore();
  const {
    plan
  } = usePlan();
  const [kpis, setKpis] = reactExports.useState({
    vues: 0,
    clics: 0,
    vcards: 0,
    scans: 0
  });
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) return;
    const since = new Date(Date.now() - 7 * 864e5).toISOString();
    supabase.from("nfc_analytics").select("event_type").eq("profile_id", profile.id).gte("created_at", since).then(({
      data: rows
    }) => {
      if (!rows) return;
      setKpis({
        vues: rows.filter((e) => e.event_type === "view").length,
        clics: rows.filter((e) => e.event_type === "click_button" || e.event_type === "click_social").length,
        vcards: rows.filter((e) => e.event_type === "vcard_download").length,
        scans: rows.filter((e) => e.event_type === "qr_scan").length
      });
    });
  }, []);
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) });
  }
  const {
    score,
    items,
    missing
  } = getCompletion(data);
  const firstName = data.name?.split(" ")[0] || "vous";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 py-8 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-primary flex items-center gap-1.5 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Tableau de bord"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl sm:text-5xl font-semibold tracking-tight", children: [
          "Bonjour, ",
          firstName,
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mt-2", children: "Voici la santé de votre carte digitale aujourd'hui." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "h-12 text-base px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40", children: [
        "Ouvrir ma carte ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 ml-2" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: Eye, label: "Vues · 7 j.", value: kpis.vues > 0 ? String(kpis.vues) : "—", hint: "Visiteurs de votre carte", spark: [3, 5, 4, 7, 6, 9, 8], delta: 12 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: MousePointerClick, label: "Clics · 7 j.", value: kpis.clics > 0 ? String(kpis.clics) : "—", hint: "Sur vos boutons d'action", spark: [2, 4, 3, 5, 4, 6, 7], delta: 8 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: Smartphone, label: "vCard ajoutées", value: kpis.vcards > 0 ? String(kpis.vcards) : "—", hint: "Contacts enregistrés", spark: [1, 2, 2, 3, 4, 3, 5], delta: 24 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: QrCode, label: "Scans QR", value: kpis.scans > 0 ? String(kpis.scans) : "—", hint: "Détection physique", spark: [0, 1, 3, 2, 4, 5, 4], delta: -3 })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-card to-card/30 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold", children: "Santé de ma carte" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Plus votre carte est complète, plus elle convertit." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-5xl text-primary leading-none font-semibold", children: [
              score,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-muted-foreground", children: "%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-1", children: "Complétion" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: score, className: "h-2.5 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
          it.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: it.done ? "text-foreground/60 line-through decoration-foreground/20" : "text-foreground", children: it.label })
        ] }, it.id)) }),
        missing.length > 0 && missing[0].hint && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Suggestion :" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/85", children: missing[0].hint })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-card to-card/30 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-1", children: "Actions rapides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Les opérations les plus courantes." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { to: "/dashboard/card", icon: CreditCard, label: "Ouvrir ma carte", hint: "Aperçu, QR, partage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { to: "/dashboard/style", icon: Palette, label: "Changer l'apparence", hint: "Thème & variantes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { to: "/dashboard/analytics", icon: Share2, label: "Voir les stats", hint: "Engagement détaillé" }),
            plan !== "vitrine" && /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { to: "/dashboard/account", icon: TrendingUp, label: "Passer à Vitrine", hint: "Débloquer tout", highlight: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/30 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
            "Activité récente"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 mx-auto rounded-full bg-muted/50 grid place-items-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 opacity-50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed", children: [
              "Aucune activité.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "Les scans et vues apparaîtront ici." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold", children: "Apprenez à utiliser votre dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Suivez ces 8 étapes pour tirer le maximum de votre carte digitale." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: ONBOARDING_STEPS.map((s) => {
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: s.to, className: `group flex flex-col rounded-2xl border ${s.border} bg-card/50 p-5 transition hover:-translate-y-0.5 hover:shadow-md`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${s.color}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] font-semibold uppercase tracking-widest ${s.color} opacity-70 mt-1`, children: [
              "Étape ",
              s.n
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold mb-1.5", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed flex-1", children: s.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-4 inline-flex items-center gap-1 text-xs font-semibold ${s.color}`, children: [
            "Aller sur la page ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" })
          ] })
        ] }, s.n);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold", children: "Allez plus loin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Deux upgrades premium qui transforment votre carte en machine à convertir." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "text-sm text-primary hover:underline font-medium", children: "Tout voir →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UpsellSection, { variant: "compact" })
    ] })
  ] });
}
function QuickAction({
  to,
  icon: Icon,
  label,
  hint,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: `group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition hover:-translate-y-0.5 ${highlight ? "border-primary/40 bg-gradient-to-r from-primary/10 to-transparent hover:border-primary/60" : "border-border bg-card/40 hover:border-primary/40 hover:bg-card"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-10 w-10 grid place-items-center rounded-lg shrink-0 ${highlight ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground" : "bg-muted text-foreground/80"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" })
  ] });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-64 rounded-md bg-muted/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-2xl bg-muted/30" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 h-80 rounded-2xl bg-muted/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-2xl bg-muted/30" })
    ] })
  ] });
}
export {
  OverviewPage as component
};
