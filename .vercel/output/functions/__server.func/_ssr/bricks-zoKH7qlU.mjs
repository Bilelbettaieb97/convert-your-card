import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as THEMES_BY_ID, e as PROFESSIONS, f as PROFESSION_CATEGORIES, I as Input, C as CARD_THEMES, h as PROFESSIONS_BY_THEME, B as Button, S as Switch, j as BRICK_VARIANTS, a as cn } from "./router-B06Pcelu.mjs";
import { d as downloadVCard } from "./vcard-D7QWDY7x.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { B as Building2, ah as Share2, aH as BadgeCheck, y as MapPin, H as Check, T as Trash2, k as Plus, aA as Upload, ak as Image, L as Linkedin, I as Instagram, j as MessageCircle, o as ExternalLink, z as Phone, M as Mail, G as Globe, A as ArrowRight, aX as Languages, i as Calendar, aF as ChevronRight, Q as Sparkles, aO as Quote, aI as Award, D as Download, aY as CirclePlay, h as Star } from "../_libs/lucide-react.mjs";
function BusinessCard({ data }) {
  const [copied, setCopied] = reactExports.useState(false);
  const theme = (THEMES_BY_ID[data.accent] ?? THEMES_BY_ID.gold).palette;
  const styleVars = {
    "--card-bg": theme.bg,
    "--card-surface": theme.surface,
    "--card-surface-alt": theme.surfaceAlt,
    "--card-border": theme.border,
    "--card-text": theme.text,
    "--card-text-muted": theme.textMuted,
    "--card-accent": theme.accent,
    "--card-accent-gradient": theme.gradient,
    "--card-header-bg": theme.headerBg,
    "--card-on-accent": theme.onAccent,
    background: theme.bg,
    color: theme.text
  };
  const handleSave = () => downloadVCard(data);
  const handleShare = async () => {
    const shareData = {
      title: data.name,
      text: `${data.name} — ${data.title}`,
      url: typeof window !== "undefined" ? window.location.href : ""
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", style: styleVars, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-md grid place-items-center", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-card-on-accent", strokeWidth: 2.4 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm tracking-wide", children: data.agency || "Agence" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleShare,
          "aria-label": "Partager",
          className: "h-9 w-9 grid place-items-center rounded-full bg-card-surface-surface/80 backdrop-blur border border-card-border active:scale-95 transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IdentitySection, { data }),
      data.sectionOrder.filter((id) => id !== "identity" && id !== "theme").filter((id) => {
        switch (id) {
          case "actions":
            return data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
          case "vcard":
            return data.vcardEnabled;
          case "stats":
            return data.statsEnabled;
          case "about":
            return data.aboutEnabled;
          case "video":
            return data.videoEnabled;
          case "services":
            return data.servicesEnabled;
          case "listings":
            return data.listingsEnabled;
          case "testimonials":
            return data.testimonialsEnabled;
          case "calendar":
            return data.calendarEnabled;
          case "languages":
            return data.languagesEnabled;
          case "cta":
            return data.ctaEnabled;
          case "contact":
            return data.contactEnabled;
          case "socials":
            return data.socialsEnabled;
          default:
            return false;
        }
      }).map((id) => {
        const node = (() => {
          switch (id) {
            case "actions":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ActionsSection, { data });
            case "vcard":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(VCardSection, { data, onSave: handleSave, copied });
            case "stats":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, { data });
            case "about":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, { data });
            case "video":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(VideoSection, { data });
            case "services":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesSection, { data });
            case "listings":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ListingsSection, { data });
            case "testimonials":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, { data });
            case "calendar":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarSection, { data });
            case "languages":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguagesSection, { data });
            case "cta":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaSection, { data });
            case "contact":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, { data });
            case "socials":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(SocialsSection, { data });
            default:
              return null;
          }
        })();
        if (!node) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-brick": id, className: "scroll-mt-4", children: node }, id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "px-5 pt-8 pb-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-card-muted", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      data.agency,
      " · Carte digitale"
    ] }) })
  ] });
}
function IdentitySection({ data }) {
  const v = data.variants.identity;
  const Photo = ({ size }) => data.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.photo, alt: data.name, className: "h-full w-full object-cover", style: { width: size, height: size } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center bg-card-surface-alt h-full w-full", style: { width: size, height: size }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-card-muted" }) });
  if (v === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl bg-card-surface border border-card-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl overflow-hidden border border-card-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Photo, { size: 80 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute -bottom-1 -right-1 h-6 w-6 grid place-items-center rounded-full border-2 border-card-surface",
            style: { background: "var(--card-accent-gradient)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-card-on-accent", strokeWidth: 2.6 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl leading-tight truncate", children: data.name || "Votre nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-card-muted truncate", children: data.title || "Votre titre" }),
        data.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1 text-[11px] text-card-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: data.area })
        ] })
      ] })
    ] }) });
  }
  if (v === "cover") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-5 rounded-3xl overflow-hidden border border-card-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 w-full", style: { background: "var(--card-accent-gradient)" }, children: [
        data.coverPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.coverPhoto,
            alt: "",
            "aria-hidden": true,
            className: "absolute inset-0 h-full w-full object-cover"
          }
        ) : data.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.photo,
            alt: "",
            "aria-hidden": true,
            className: "absolute inset-0 h-full w-full object-cover opacity-40 blur-[2px] scale-110"
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(180deg, transparent 0%, var(--card-bg) 100%)", opacity: 0.6 } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card-surface px-5 pb-5 pt-0 -mt-12 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-full overflow-hidden border-4 border-card-surface shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Photo, { size: 96 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute bottom-0 right-0 h-6 w-6 grid place-items-center rounded-full border-2 border-card-surface",
              style: { background: "var(--card-accent-gradient)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-card-on-accent", strokeWidth: 2.6 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-xl font-display font-medium leading-tight", children: data.name || "Votre nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-card-muted", children: data.title || "Votre titre" }),
        data.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-card-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.area })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: "relative overflow-hidden pt-3 pb-7 px-5",
      style: { background: "var(--card-header-bg)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 rounded-full opacity-60 blur-md", style: { background: "var(--card-accent-gradient)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-28 w-28 rounded-full overflow-hidden border-2 border-card-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Photo, { size: 112 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute bottom-1 right-1 h-6 w-6 grid place-items-center rounded-full border-2 border-card-bg",
              style: { background: "var(--card-accent-gradient)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-card-on-accent", strokeWidth: 2.6 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-display font-medium leading-tight", children: data.name || "Votre nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-card-muted", children: data.title || "Votre titre" }),
        data.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-card-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.area })
        ] })
      ] })
    }
  );
}
function ActionsSection({ data }) {
  const any = data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
  if (!any) return null;
  const items = [
    data.actions.call && { icon: Phone, label: "Appeler", href: `tel:${data.phone}` },
    data.actions.whatsapp && { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${data.whatsapp}` },
    data.actions.email && { icon: Mail, label: "Mail", href: `mailto:${data.email}` },
    data.actions.website && { icon: Globe, label: "Site", href: `https://${data.website}` }
  ].filter(Boolean);
  const v = data.variants.actions;
  if (v === "pills") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 space-y-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: it.href,
        target: it.href.startsWith("http") ? "_blank" : void 0,
        rel: "noopener noreferrer",
        className: "flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border px-4 py-3 active:scale-[0.99] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4 text-card-on-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium flex-1", children: it.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-card-muted" })
        ]
      },
      i
    )) });
  }
  if (v === "grid") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 grid grid-cols-2 gap-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: it.href,
        target: it.href.startsWith("http") ? "_blank" : void 0,
        rel: "noopener noreferrer",
        className: "flex flex-col items-center justify-center gap-2 rounded-2xl bg-card-surface border border-card-border py-5 active:scale-[0.99] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-card-on-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: it.label })
        ]
      },
      i
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActionIcon, { icon: it.icon, label: it.label, href: it.href, primary: it.label === "Appeler" }, i)) }) });
}
function QuickActionIcon({ icon: Icon, label, href, primary }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", className: "flex flex-col items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `h-12 w-12 grid place-items-center rounded-2xl border border-card-border active:scale-95 transition ${primary ? "" : "bg-card-surface"}`,
        style: primary ? { background: "var(--card-accent-gradient)" } : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4.5 w-4.5 ${primary ? "text-card-on-accent" : ""}`, strokeWidth: 2 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-card-muted", children: label })
  ] });
}
function VCardSection({ data, onSave, copied }) {
  if (!data.vcardEnabled) return null;
  const v = data.variants.vcard;
  if (v === "outline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onSave,
          className: "w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium border-2 active:scale-[0.99] transition",
          style: { borderColor: "var(--card-accent)", color: "var(--card-accent)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4", strokeWidth: 2.4 }),
            "Enregistrer le contact"
          ]
        }
      ),
      copied && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-xs", style: { color: "var(--card-accent)" }, children: "Lien copié ✓" })
    ] });
  }
  if (v === "card") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onSave,
          className: "w-full flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border p-4 active:scale-[0.99] transition text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-11 w-11 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5 text-card-on-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium", children: "Enregistrer le contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-card-muted", children: "Ajouter à votre carnet d'adresses" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-card-muted" })
          ]
        }
      ),
      copied && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-xs", style: { color: "var(--card-accent)" }, children: "Lien copié ✓" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onSave,
        className: "w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium text-card-on-accent active:scale-[0.99] transition",
        style: { background: "var(--card-accent-gradient)", boxShadow: "0 0 40px -8px var(--card-accent)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4", strokeWidth: 2.4 }),
          "Enregistrer le contact"
        ]
      }
    ),
    copied && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-xs", style: { color: "var(--card-accent)" }, children: "Lien copié ✓" })
  ] });
}
function StatsSection({ data }) {
  if (!data.statsEnabled || data.stats.length === 0) return null;
  const v = data.variants.stats;
  if (v === "stacked") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 space-y-2", children: data.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between rounded-2xl bg-card-surface border border-card-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-card-muted", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl leading-none", style: { color: "var(--card-accent)" }, children: s.value })
    ] }, i)) });
  }
  if (v === "pills") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 flex flex-wrap gap-2", children: data.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-baseline gap-1.5 rounded-full bg-card-surface border border-card-border px-3.5 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base", style: { color: "var(--card-accent)" }, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-card-muted", children: s.label })
    ] }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid rounded-2xl bg-card-surface border border-card-border overflow-hidden", style: { gridTemplateColumns: `repeat(${data.stats.length}, minmax(0,1fr))` }, children: data.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `py-4 px-2 text-center ${i < data.stats.length - 1 ? "border-r border-card-border" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", style: { color: "var(--card-accent)" }, children: s.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[10px] uppercase tracking-wider text-card-muted", children: s.label })
  ] }, i)) }) });
}
function AboutSection({ data }) {
  if (!data.aboutEnabled) return null;
  const v = data.variants.about;
  if (v === "quote") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "À propos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 relative rounded-2xl bg-card-surface border border-card-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-3 right-3 h-6 w-6 opacity-30", style: { color: "var(--card-accent)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed italic", children: [
          "« ",
          data.bio,
          " »"
        ] }),
        data.badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: data.badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: b.label }, b.id)) })
      ] })
    ] });
  }
  if (v === "card") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card-surface border border-card-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-card-on-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base", children: "À propos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-card-muted", children: data.bio }),
      data.badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: data.badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: b.label }, b.id)) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "À propos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-card-muted", children: data.bio }),
    data.badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: data.badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-card-surface border border-card-border px-3 py-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5", style: { color: "var(--card-accent)" } }),
      b.label
    ] }, b.id)) })
  ] });
}
function Chip({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-card-bg border border-card-border px-3 py-1.5 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5", style: { color: "var(--card-accent)" } }),
    children
  ] });
}
function VideoSection({ data }) {
  if (!data.videoEnabled || !data.videoUrl) return null;
  const v = data.variants.video;
  const id = parseYoutubeId(data.videoUrl);
  if (!id) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: data.videoTitle || "Vidéo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-2xl border border-card-border bg-card-surface p-4 text-xs text-card-muted", children: "URL YouTube invalide." })
    ] });
  }
  if (v === "thumb") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: data.videoTitle || "Vidéo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YoutubeLite, { id, title: data.videoTitle })
    ] });
  }
  if (v === "cinema") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden border border-card-border bg-black aspect-video", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          className: "absolute inset-0 h-full w-full",
          src: `https://www.youtube.com/embed/${id}?rel=0`,
          title: data.videoTitle || "YouTube",
          loading: "lazy",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em]", style: { color: "var(--card-accent)" }, children: "Vidéo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-display text-white truncate", children: data.videoTitle || "Présentation" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: data.videoTitle || "Vidéo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 relative rounded-2xl overflow-hidden border border-card-border bg-black aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        className: "absolute inset-0 h-full w-full",
        src: `https://www.youtube.com/embed/${id}?rel=0`,
        title: data.videoTitle || "YouTube",
        loading: "lazy",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowFullScreen: true
      }
    ) })
  ] });
}
function YoutubeLite({ id, title }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  if (loaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 relative rounded-2xl overflow-hidden border border-card-border bg-black aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        className: "absolute inset-0 h-full w-full",
        src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
        title: title || "YouTube",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowFullScreen: true
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => setLoaded(true),
      className: "mt-3 group relative block w-full rounded-2xl overflow-hidden border border-card-border bg-black aspect-video",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: title || "Vidéo", className: "absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-14 w-14 grid place-items-center rounded-full bg-black/60 backdrop-blur border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-7 w-7", style: { color: "var(--card-accent)" } }) }) })
      ]
    }
  );
}
function ServicesSection({ data }) {
  if (!data.servicesEnabled || data.services.length === 0) return null;
  const v = data.variants.services;
  if (v === "numbered") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: data.services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl bg-card-surface border border-card-border p-4 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl shrink-0 w-9 text-right", style: { color: "var(--card-accent)" }, children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 border-l border-card-border pl-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: s.title }),
          s.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-card-muted leading-relaxed", children: s.description })
        ] })
      ] }, s.id)) })
    ] });
  }
  if (v === "carousel") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Services" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: data.services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "snap-start shrink-0 w-[72%] rounded-2xl bg-card-surface border border-card-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-card-on-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-sm font-medium", children: s.title }),
        s.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-card-muted leading-relaxed", children: s.description })
      ] }, s.id)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Services" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: data.services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl bg-card-surface border border-card-border p-4 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl shrink-0", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-card-on-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: s.title }),
        s.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-card-muted leading-relaxed", children: s.description })
      ] })
    ] }, s.id)) })
  ] });
}
function ListingsSection({ data }) {
  if (!data.listingsEnabled || data.listings.length === 0) return null;
  const v = data.variants.listings;
  if (v === "stacked") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Sélection en vente" }),
      data.listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl overflow-hidden bg-card-surface border border-card-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] overflow-hidden bg-card-surface-alt", children: l.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.img, alt: l.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-card-muted" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: l.title || "Sans titre" }),
          l.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-card-muted", children: l.meta }),
          l.price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", style: { color: "var(--card-accent)" }, children: l.price })
        ] })
      ] }, l.id))
    ] });
  }
  if (v === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Sélection en vente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: data.listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 rounded-xl bg-card-surface border border-card-border p-2 pr-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-20 rounded-lg overflow-hidden bg-card-surface-alt shrink-0", children: l.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.img, alt: l.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-card-muted" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium truncate", children: l.title || "Sans titre" }),
          l.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-card-muted truncate", children: l.meta })
        ] }),
        l.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium shrink-0", style: { color: "var(--card-accent)" }, children: l.price })
      ] }, l.id)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Sélection en vente" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: data.listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "snap-start shrink-0 w-[78%] rounded-2xl overflow-hidden bg-card-surface border border-card-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-card-surface-alt", children: l.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.img, alt: l.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-card-muted" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: l.title || "Sans titre" }),
        l.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-card-muted", children: l.meta }),
        l.price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", style: { color: "var(--card-accent)" }, children: l.price })
      ] })
    ] }, l.id)) })
  ] });
}
function TestimonialsSection({ data }) {
  if (!data.testimonialsEnabled || data.testimonials.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Ils en parlent" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsBlock, { testimonials: data.testimonials, style: data.testimonialsStyle })
  ] });
}
function CalendarSection({ data }) {
  if (!data.calendarEnabled || !data.calendarUrl) return null;
  const v = data.variants.calendar;
  const label = data.calendarLabel || "Réserver un rendez-vous";
  if (v === "cta") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: data.calendarUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium text-card-on-accent active:scale-[0.99] transition",
        style: { background: "var(--card-accent-gradient)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          label
        ]
      }
    ) });
  }
  if (v === "block") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: data.calendarUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block rounded-2xl bg-card-surface border border-card-border p-5 text-center active:scale-[0.99] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto h-12 w-12 grid place-items-center rounded-2xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-card-on-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-base", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] text-card-muted", children: "Choisissez un créneau qui vous convient" })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: data.calendarUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border p-4 active:scale-[0.99] transition",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-11 w-11 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-card-on-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-card-muted", children: "Agenda" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-card-muted" })
      ]
    }
  ) });
}
function LanguagesSection({ data }) {
  if (!data.languagesEnabled || data.languages.length === 0) return null;
  const v = data.variants.languages;
  const levelDots = (level) => {
    const m = { "Débutant": 1, "Intermédiaire": 2, "Avancé": 3, "Courant": 4, "Natif": 5 };
    return m[level] ?? 3;
  };
  if (v === "list") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Langues parlées" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 rounded-2xl bg-card-surface border border-card-border divide-y divide-card-border overflow-hidden", children: data.languages.map((l) => {
        const n = levelDots(l.level);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium", children: l.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-1", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-1.5 w-1.5 rounded-full",
              style: { background: i < n ? "var(--card-accent)" : "oklch(0.4 0 0 / 0.3)" }
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-card-muted w-16 text-right", children: l.level })
        ] }, l.id);
      }) })
    ] });
  }
  if (v === "grid") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Langues parlées" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: data.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card-surface border border-card-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: l.name })
        ] }),
        l.level && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] text-card-muted", children: l.level })
      ] }, l.id)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Langues parlées" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: data.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-card-surface border border-card-border px-3 py-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-3.5 w-3.5", style: { color: "var(--card-accent)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: l.name }),
      l.level && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-card-muted", children: [
        "· ",
        l.level
      ] })
    ] }, l.id)) })
  ] });
}
function CtaSection({ data }) {
  if (!data.ctaEnabled) return null;
  const v = data.variants.cta;
  const hasBtn = data.ctaButtonLabel && data.ctaButtonUrl;
  if (v === "outline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 p-5", style: { borderColor: "var(--card-accent)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: data.ctaTitle }),
      data.ctaText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-card-muted", children: data.ctaText }),
      hasBtn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: data.ctaButtonUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-4 inline-flex items-center gap-1.5 text-sm font-medium",
          style: { color: "var(--card-accent)" },
          children: [
            data.ctaButtonLabel,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }) });
  }
  if (v === "bold") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-5 text-card-on-accent", style: { background: "var(--card-accent-gradient)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-tight", children: data.ctaTitle }),
      data.ctaText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm opacity-90", children: data.ctaText }),
      hasBtn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: data.ctaButtonUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold bg-card-bg  active:scale-[0.99] transition",
          children: [
            data.ctaButtonLabel,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 border border-card-border",
      style: { background: "var(--card-surface)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: data.ctaTitle }),
        data.ctaText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-card-muted", children: data.ctaText }),
        hasBtn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: data.ctaButtonUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-card-on-accent active:scale-[0.99] transition",
            style: { background: "var(--card-accent-gradient)" },
            children: [
              data.ctaButtonLabel,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ]
          }
        )
      ]
    }
  ) });
}
function ContactSection({ data }) {
  if (!data.contactEnabled) return null;
  const v = data.variants.contact;
  const rows = [
    { icon: Phone, label: "Téléphone", value: data.phoneDisplay || data.phone, href: data.phone ? `tel:${data.phone}` : void 0 },
    { icon: Mail, label: "Email", value: data.email, href: data.email ? `mailto:${data.email}` : void 0 },
    { icon: Globe, label: "Site web", value: data.website, href: data.website ? `https://${data.website}` : void 0 },
    { icon: MapPin, label: "Secteur", value: data.area, href: void 0 }
  ].filter((r) => r.value);
  if (v === "grid") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Coordonnées" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: rows.map((r, i) => {
        const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card-surface border border-card-border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 grid place-items-center rounded-xl bg-card-surface-alt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] uppercase tracking-wider text-card-muted", children: r.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", children: r.value })
        ] });
        return r.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.href, className: "active:scale-[0.99] transition", children: Inner }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Inner }, i);
      }) })
    ] });
  }
  if (v === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Coordonnées" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: rows.map((r, i) => {
        const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "h-4 w-4 shrink-0", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: r.value })
        ] });
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.href, className: "block", children: Inner }) : Inner }, i);
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Coordonnées" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 rounded-2xl bg-card-surface border border-card-border divide-y divide-card-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Phone, label: "Téléphone", value: data.phoneDisplay || data.phone, href: `tel:${data.phone}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Mail, label: "Email", value: data.email, href: `mailto:${data.email}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Globe, label: "Site web", value: data.website, href: `https://${data.website}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: MapPin, label: "Secteur", value: data.area })
    ] })
  ] });
}
function ContactRow({ icon: Icon, label, value, href }) {
  if (!value) return null;
  const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl bg-card-surface-alt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-card-muted", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm truncate", children: value })
    ] }),
    href && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-card-muted" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "block active:bg-card-surface-alt/60 transition", children: Inner }) : Inner });
}
const SOCIAL_BRAND = {
  LinkedIn: "oklch(0.55 0.13 245)",
  Instagram: "oklch(0.65 0.2 15)",
  WhatsApp: "oklch(0.7 0.17 150)"
};
function SocialsSection({ data }) {
  if (!data.socialsEnabled) return null;
  const v = data.variants.socials;
  const items = [
    data.linkedin && { icon: Linkedin, label: "LinkedIn", href: data.linkedin },
    data.instagram && { icon: Instagram, label: "Instagram", href: data.instagram },
    data.whatsappSocial && { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${data.whatsappSocial}` }
  ].filter(Boolean);
  if (items.length === 0) return null;
  if (v === "pills") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 space-y-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: it.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border px-4 py-3 active:scale-[0.99] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium flex-1", children: it.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-card-muted" })
        ]
      },
      i
    )) });
  }
  if (v === "branded") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 flex justify-center gap-3", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: it.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": it.label,
        className: "h-12 w-12 grid place-items-center rounded-2xl active:scale-95 transition",
        style: { background: SOCIAL_BRAND[it.label] },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-white" })
      },
      i
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 flex justify-center gap-3", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: it.href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": it.label,
      className: "h-11 w-11 grid place-items-center rounded-full bg-card-surface border border-card-border active:scale-95 transition",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5", style: { color: "var(--card-accent)" } })
    },
    i
  )) });
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xs uppercase tracking-[0.18em]", style: { color: "var(--card-accent)" }, children });
}
function parseYoutubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/\/(embed|shorts)\/([\w-]{6,})/);
      if (m) return m[2];
    }
  } catch {
    const m = url.match(/[\w-]{11}/);
    if (m) return m[0];
  }
  return null;
}
function Stars({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": `${rating} sur 5`, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: "h-3.5 w-3.5",
      fill: i < rating ? "currentColor" : "transparent",
      style: { color: "var(--card-accent)" },
      strokeWidth: 1.5
    },
    i
  )) });
}
function Avatar({ photo, name, size = 40 }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "grid place-items-center rounded-full overflow-hidden bg-card-surface-alt border border-card-border shrink-0 text-xs font-medium",
      style: { width: size, height: size },
      children: photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo, alt: name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-card-muted", children: initials || "?" })
    }
  );
}
function TestimonialLinkWrap({ link, children }) {
  if (!link) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link, target: "_blank", rel: "noopener noreferrer", className: "block active:opacity-90 transition", children });
}
function TestimonialsBlock({ testimonials, style }) {
  if (style === "stacked") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 px-5 space-y-3", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialLinkWrap, { link: t.link, children: /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "rounded-2xl bg-card-surface border border-card-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { photo: t.photo, name: t.name, size: 44 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-card-muted truncate", children: t.role })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating: t.rating })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-card-muted", children: [
          "« ",
          t.text,
          " »"
        ] }),
        t.link && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-[11px]", style: { color: "var(--card-accent)" }, children: [
          "Voir l'avis ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
        ] })
      ] })
    ] }) }) }) }, t.id)) });
  }
  if (style === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialLinkWrap, { link: t.link, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "snap-start shrink-0 w-[68%] rounded-xl bg-card-surface border border-card-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { photo: t.photo, name: t.name, size: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating: t.rating })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs leading-snug text-card-muted line-clamp-3", children: [
        "« ",
        t.text,
        " »"
      ] })
    ] }) }, t.id)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialLinkWrap, { link: t.link, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "snap-start shrink-0 w-[82%] rounded-2xl bg-card-surface border border-card-border p-4 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-3 right-3 h-5 w-5 opacity-30", style: { color: "var(--card-accent)" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating: t.rating }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm leading-relaxed", children: [
      "« ",
      t.text,
      " »"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-card-border flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { photo: t.photo, name: t.name, size: 36 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-card-muted truncate", children: t.role })
      ] }),
      t.link && /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-card-muted" })
    ] })
  ] }) }, t.id)) });
}
function PhoneFrame({ children, gridOverlay = false, scrollHint = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto", style: { width: 360 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative rounded-[44px] p-[10px] shadow-2xl",
      style: {
        background: "linear-gradient(180deg, oklch(0.22 0.01 250), oklch(0.1 0.01 250))",
        boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.3 0.02 250 / 0.5)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[36px] bg-background", style: { height: 720 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 z-30 h-6 w-28 rounded-full bg-black/90 border border-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children }),
        scrollHint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-20" }),
        gridOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(GridOverlay, {})
      ] })
    }
  ) });
}
function GridOverlay() {
  const GUTTER = 20;
  const COLS = 4;
  const innerW = 340 - GUTTER * 2;
  const colW = innerW / COLS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 z-40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.18]",
        style: {
          backgroundImage: "repeating-linear-gradient(to bottom, oklch(0.78 0.13 200) 0 1px, transparent 1px 8px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 border-x border-dashed",
        style: { left: GUTTER, right: GUTTER, borderColor: "oklch(0.85 0.18 25 / 0.55)" }
      }
    ),
    Array.from({ length: COLS - 1 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 w-px",
        style: {
          left: GUTTER + colW * (i + 1),
          background: "oklch(0.78 0.13 200 / 0.45)"
        }
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-0 right-0 border-y border-dashed",
        style: { top: 8, height: 44, borderColor: "oklch(0.85 0.18 140 / 0.5)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 w-px left-1/2",
        style: { background: "oklch(0.85 0.18 25 / 0.6)" }
      }
    )
  ] });
}
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
function Field({
  label,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
function Row({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    children
  ] });
}
function VariantPicker({
  brick,
  data,
  update
}) {
  const options = BRICK_VARIANTS[brick];
  if (!options || options.length < 2) return null;
  const current = data.variants[brick];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Style" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: options.map((o) => {
      const active = current === o.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => update(
            "variants",
            { ...data.variants, [brick]: o.id }
          ),
          className: `rounded-xl border p-2.5 text-left transition ${active ? "border-primary bg-accent/40" : "border-border hover:border-foreground/30"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: o.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: o.hint })
          ]
        },
        o.id
      );
    }) })
  ] });
}
function IdentityBrick({ data, update }) {
  const fileRef = reactExports.useRef(null);
  const coverRef = reactExports.useRef(null);
  const onFile = (f) => {
    const reader = new FileReader();
    reader.onload = () => update("photo", String(reader.result));
    reader.readAsDataURL(f);
  };
  const onCover = (f) => {
    const reader = new FileReader();
    reader.onload = () => update("coverPhoto", String(reader.result));
    reader.readAsDataURL(f);
  };
  const isCover = data.variants.identity === "cover";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full overflow-hidden bg-muted border border-border grid place-items-center shrink-0", children: data.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.photo, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => fileRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1.5" }),
          " Importer une photo"
        ] }),
        data.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => update("photo", ""), children: "Retirer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom complet", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => update("name", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre / poste", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.title, onChange: (e) => update("title", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Agence", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.agency, onChange: (e) => update("agency", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secteur géographique", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.area, onChange: (e) => update("area", e.target.value) }) }),
    isCover && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-lg border border-dashed border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Photo de couverture" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Affichée en bannière derrière votre photo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: coverRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) onCover(f);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => coverRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1.5" }),
          " Importer"
        ] })
      ] }),
      data.coverPhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] w-full rounded-md overflow-hidden bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.coverPhoto, alt: "", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => update("coverPhoto", ""), children: "Retirer la couverture" })
      ] })
    ] })
  ] });
}
function ActionsBrick({ data, update }) {
  const toggle = (k) => (v) => update("actions", { ...data.actions, [k]: v });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Appel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.call, onCheckedChange: toggle("call") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.whatsapp, onCheckedChange: toggle("whatsapp") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.email, onCheckedChange: toggle("email") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Site web", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.website, onCheckedChange: toggle("website") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-1", children: "Les valeurs (numéro, email…) se règlent dans la brique « Coordonnées »." })
  ] });
}
function StatsBrick({ data, update }) {
  const setStat = (i, patch) => update("stats", data.stats.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  const add = () => data.stats.length < 4 && update("stats", [...data.stats, { label: "Label", value: "0" }]);
  const remove = (i) => update("stats", data.stats.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valeur", className: "w-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.value, onChange: (e) => setStat(i, { value: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Label", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.label, onChange: (e) => setStat(i, { label: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, i)),
    data.stats.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter une stat"
    ] })
  ] });
}
function AboutBrick({ data, update }) {
  const setBadge = (i, label) => update("badges", data.badges.map((b, idx) => idx === i ? { ...b, label } : b));
  const addBadge = () => update("badges", [...data.badges, { id: crypto.randomUUID(), label: "Nouveau badge" }]);
  const removeBadge = (id) => update("badges", data.badges.filter((b) => b.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bio (2-3 lignes)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: data.bio, onChange: (e) => update("bio", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Badges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
        data.badges.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.label, onChange: (e) => setBadge(i, e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeBadge(b.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, b.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addBadge, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
          "Ajouter un badge"
        ] })
      ] })
    ] })
  ] });
}
function ListingsBrick({ data, update }) {
  const setListing = (id, patch) => update("listings", data.listings.map((l) => l.id === id ? { ...l, ...patch } : l));
  const add = () => update("listings", [
    ...data.listings,
    { id: crypto.randomUUID(), img: "", title: "Nouveau bien", meta: "", price: "" }
  ]);
  const remove = (id) => update("listings", data.listings.filter((l) => l.id !== id));
  const onImage = (id, f) => {
    const reader = new FileReader();
    reader.onload = () => setListing(id, { img: String(reader.result) });
    reader.readAsDataURL(f);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.listings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun bien. Ajoutez votre première annonce." }),
    data.listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "h-16 w-16 rounded-lg overflow-hidden bg-muted grid place-items-center cursor-pointer shrink-0", children: [
          l.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.img, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                const f = e.target.files?.[0];
                if (f) onImage(l.id, f);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Titre",
              value: l.title,
              onChange: (e) => setListing(l.id, { title: e.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "120 m² · 3 pièces",
              value: l.meta,
              onChange: (e) => setListing(l.id, { meta: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "2 450 000 €",
            value: l.price,
            onChange: (e) => setListing(l.id, { price: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(l.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, l.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter un bien"
    ] })
  ] });
}
function ContactBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone (format E.164, ex: +33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => update("phone", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone (affichage)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.phoneDisplay,
        onChange: (e) => update("phoneDisplay", e.target.value),
        placeholder: "+33 6 12 34 56 78"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: data.email, onChange: (e) => update("email", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Site web (sans https)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.website, onChange: (e) => update("website", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (numéro sans +, ex: 33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsapp, onChange: (e) => update("whatsapp", e.target.value) }) })
  ] });
}
function SocialsBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "LinkedIn (URL complète)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.linkedin, onChange: (e) => update("linkedin", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram (URL complète)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.instagram, onChange: (e) => update("instagram", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (numéro sans +)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsappSocial, onChange: (e) => update("whatsappSocial", e.target.value) }) })
  ] });
}
function VCardBrick() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Affiche un bouton « Enregistrer le contact » qui télécharge un fichier .vcf compatible iPhone/Android." });
}
function VideoBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre de la vidéo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.videoTitle, onChange: (e) => update("videoTitle", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lien YouTube (watch, youtu.be ou shorts)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.videoUrl,
        onChange: (e) => update("videoUrl", e.target.value),
        placeholder: "https://www.youtube.com/watch?v=..."
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "L'aperçu intègre la vidéo via youtube.com/embed." })
  ] });
}
function ServicesBrick({ data, update }) {
  const set = (id, patch) => update("services", data.services.map((s) => s.id === id ? { ...s, ...patch } : s));
  const add = () => update("services", [
    ...data.services,
    { id: crypto.randomUUID(), title: "Nouveau service", description: "" }
  ]);
  const remove = (id) => update("services", data.services.filter((s) => s.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Titre", value: s.title, onChange: (e) => set(s.id, { title: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          rows: 2,
          placeholder: "Description courte",
          value: s.description,
          onChange: (e) => set(s.id, { description: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
    ] }, s.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter un service"
    ] })
  ] });
}
const TESTIMONIAL_STYLES = [
  { id: "cards", label: "Cartes", hint: "Carrousel large avec citation" },
  { id: "stacked", label: "Empilées", hint: "Liste verticale, avatar à gauche" },
  { id: "compact", label: "Compactes", hint: "Mini-cartes plus denses" }
];
function TestimonialsBrick({ data, update }) {
  const set = (id, patch) => update("testimonials", data.testimonials.map((t) => t.id === id ? { ...t, ...patch } : t));
  const add = () => update("testimonials", [
    ...data.testimonials,
    { id: crypto.randomUUID(), name: "Prénom N.", role: "Client", text: "", rating: 5, photo: "", link: "" }
  ]);
  const remove = (id) => update("testimonials", data.testimonials.filter((t) => t.id !== id));
  const onPhoto = (id, f) => {
    const reader = new FileReader();
    reader.onload = () => set(id, { photo: String(reader.result) });
    reader.readAsDataURL(f);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Style du carrousel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: TESTIMONIAL_STYLES.map((s) => {
        const active = data.testimonialsStyle === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => update("testimonialsStyle", s.id),
            className: `rounded-xl border p-2.5 text-left transition ${active ? "border-primary bg-accent/40" : "border-border hover:border-foreground/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: s.hint })
            ]
          },
          s.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      data.testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "h-14 w-14 rounded-full overflow-hidden bg-muted border border-border grid place-items-center cursor-pointer shrink-0", children: [
            t.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.photo, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) onPhoto(t.id, f);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Nom", value: t.name, onChange: (e) => set(t.id, { name: e.target.value }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Rôle / contexte", value: t.role, onChange: (e) => set(t.id, { role: e.target.value }) })
          ] })
        ] }),
        t.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => set(t.id, { photo: "" }),
            className: "text-[11px] text-muted-foreground hover:text-foreground",
            children: "Retirer la photo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            rows: 3,
            placeholder: "Témoignage",
            value: t.text,
            onChange: (e) => set(t.id, { text: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[6rem_1fr] gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Note (1-5)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              max: 5,
              value: t.rating,
              onChange: (e) => set(t.id, { rating: Math.max(1, Math.min(5, Number(e.target.value) || 5)) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lien (optionnel)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "https://google.com/avis/...",
              value: t.link,
              onChange: (e) => set(t.id, { link: e.target.value })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => remove(t.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
          " Supprimer"
        ] }) })
      ] }, t.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        "Ajouter un témoignage"
      ] })
    ] })
  ] });
}
function CalendarBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Libellé du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.calendarLabel, onChange: (e) => update("calendarLabel", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL (Calendly, Cal.com, Google Calendar…)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.calendarUrl,
        onChange: (e) => update("calendarUrl", e.target.value),
        placeholder: "https://calendly.com/..."
      }
    ) })
  ] });
}
function LanguagesBrick({ data, update }) {
  const set = (id, patch) => update("languages", data.languages.map((l) => l.id === id ? { ...l, ...patch } : l));
  const add = () => update("languages", [...data.languages, { id: crypto.randomUUID(), name: "Langue", level: "Courant" }]);
  const remove = (id) => update("languages", data.languages.filter((l) => l.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    data.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Langue", value: l.name, onChange: (e) => set(l.id, { name: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Niveau", value: l.level, onChange: (e) => set(l.id, { level: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(l.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, l.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter une langue"
    ] })
  ] });
}
function CtaBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaTitle, onChange: (e) => update("ctaTitle", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Texte", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: data.ctaText, onChange: (e) => update("ctaText", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Libellé du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaButtonLabel, onChange: (e) => update("ctaButtonLabel", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaButtonUrl, onChange: (e) => update("ctaButtonUrl", e.target.value) }) })
  ] });
}
function ThemeBrick({ data, update }) {
  const [tab, setTab] = reactExports.useState("theme");
  const [query, setQuery] = reactExports.useState("");
  const listRef = reactExports.useRef(null);
  const activeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (data.profession) setTab("profession");
  }, [data.profession]);
  const activeTheme = THEMES_BY_ID[data.accent];
  const activeProfession = data.profession ? PROFESSIONS.find((p) => p.id === data.profession) : void 0;
  const applyProfession = (profId, themeId) => {
    update("profession", profId);
    update("accent", themeId);
  };
  reactExports.useEffect(() => {
    if (tab === "profession" && activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [tab]);
  const q = query.trim().toLowerCase();
  const filtered = q ? PROFESSIONS.filter(
    (p) => p.label.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ) : PROFESSIONS;
  const grouped = PROFESSION_CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((p) => p.category === cat)
  })).filter((g) => g.items.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-primary/40 bg-primary/5 p-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "h-11 w-11 rounded-lg shrink-0 border relative overflow-hidden ring-2 ring-primary/50 ring-offset-2 ring-offset-card",
          style: { background: activeTheme.palette.bg, borderColor: activeTheme.palette.border },
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-md", style: { background: activeTheme.palette.surface } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full animate-pulse",
                style: { background: activeTheme.palette.gradient }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-medium", children: "Sélection actuelle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: activeProfession ? activeProfession.label : "Thème personnalisé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground truncate", children: [
          "Palette : ",
          activeTheme.label,
          activeProfession && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " · ",
            activeProfession.category
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTab("profession"),
          className: `px-3 py-1.5 rounded-md transition ${tab === "profession" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
          children: "Par métier"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTab("theme"),
          className: `px-3 py-1.5 rounded-md transition ${tab === "theme" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
          children: "Par thème"
        }
      )
    ] }),
    tab === "profession" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Rechercher un métier…",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: listRef, className: "max-h-[420px] overflow-y-auto space-y-4 pr-1", children: [
        grouped.map(({ cat, items }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5", children: cat }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5", children: items.map((p) => {
            const theme = THEMES_BY_ID[p.themeId];
            const active = data.profession === p.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                ref: active ? activeRef : void 0,
                type: "button",
                onClick: () => applyProfession(p.id, p.themeId),
                className: `relative flex items-center gap-2.5 rounded-lg border p-2 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border hover:border-foreground/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "h-7 w-7 rounded-md shrink-0 border relative overflow-hidden",
                      style: { background: theme.palette.bg, borderColor: theme.palette.border },
                      "aria-hidden": true,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-sm", style: { background: theme.palette.surface } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full ${active ? "animate-pulse" : ""}`,
                            style: { background: theme.palette.gradient }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium truncate", children: p.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground truncate", children: [
                      "Thème ",
                      theme.label
                    ] })
                  ] }),
                  active && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }),
                    "Actif"
                  ] })
                ]
              },
              p.id
            );
          }) })
        ] }, cat)),
        grouped.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground py-6 text-center", children: "Aucun métier ne correspond." })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CARD_THEMES.map((t) => {
      const active = data.accent === t.id;
      const p = t.palette;
      const suggested = PROFESSIONS_BY_THEME[t.id] ?? [];
      const hint = suggested.slice(0, 2).map((s) => s.label).join(", ");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            update("accent", t.id);
            update("profession", void 0);
          },
          className: `relative flex items-center gap-2.5 rounded-xl border p-2 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border hover:border-foreground/30"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "h-10 w-10 rounded-lg shrink-0 border overflow-hidden relative",
                style: { background: p.bg, borderColor: p.border },
                "aria-hidden": true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute inset-1 rounded-md",
                      style: {
                        background: p.surface,
                        borderColor: p.border,
                        borderWidth: 1,
                        borderStyle: "solid"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute bottom-1 right-1 h-3 w-3 rounded-full ${active ? "animate-pulse" : ""}`,
                      style: { background: p.gradient }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium truncate", children: t.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground truncate", children: hint || t.sector })
            ] }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground grid place-items-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
          ]
        },
        t.id
      );
    }) })
  ] });
}
const BRICK_META = {
  identity: { title: "Identité", subtitle: "Photo, nom, titre, agence" },
  actions: { title: "Actions rapides", subtitle: "Appel, WhatsApp, Mail, Site" },
  vcard: { title: "Enregistrer le contact", subtitle: "Bouton vCard" },
  stats: { title: "Statistiques", subtitle: "Chiffres clés" },
  about: { title: "À propos", subtitle: "Bio + badges" },
  video: { title: "Vidéo de présentation", subtitle: "Lien YouTube" },
  services: { title: "Services", subtitle: "Vos offres / prestations" },
  listings: { title: "Sélection de biens", subtitle: "Vos annonces phares" },
  testimonials: { title: "Témoignages", subtitle: "Avis clients" },
  calendar: { title: "Prendre rendez-vous", subtitle: "Lien Calendly / agenda" },
  languages: { title: "Langues parlées", subtitle: "Idiomes & niveau" },
  cta: { title: "Bannière CTA", subtitle: "Encart d'appel à l'action" },
  contact: { title: "Coordonnées", subtitle: "Téléphone, mail, site, secteur" },
  socials: { title: "Réseaux sociaux", subtitle: "LinkedIn, Instagram, WhatsApp" },
  theme: { title: "Thème", subtitle: "Couleur d'accent" }
};
function renderBrickBody(id, props) {
  switch (id) {
    case "identity":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityBrick, { ...props });
    case "actions":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ActionsBrick, { ...props });
    case "vcard":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VCardBrick, {});
    case "stats":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBrick, { ...props });
    case "about":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AboutBrick, { ...props });
    case "video":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VideoBrick, { ...props });
    case "services":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesBrick, { ...props });
    case "listings":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ListingsBrick, { ...props });
    case "testimonials":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsBrick, { ...props });
    case "calendar":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarBrick, { ...props });
    case "languages":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguagesBrick, { ...props });
    case "cta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBrick, { ...props });
    case "contact":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ContactBrick, { ...props });
    case "socials":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SocialsBrick, { ...props });
    case "theme":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeBrick, { ...props });
  }
}
export {
  BusinessCard as B,
  PhoneFrame as P,
  VariantPicker as V,
  BRICK_META as a,
  renderBrickBody as r
};
