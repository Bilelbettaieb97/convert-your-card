import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as THEMES_BY_ID } from "./router-DIf0f6dh.mjs";
import { d as downloadVCard } from "./vcard-D7QWDY7x.mjs";
import { B as Building2, a5 as Share2, ax as BadgeCheck, av as MapPin, a9 as Image, aG as Linkedin, aH as Instagram, k as MessageCircle, a4 as ExternalLink, au as Phone, M as Mail, G as Globe, A as ArrowRight, aR as Languages, a2 as Calendar, at as ChevronRight, s as Sparkles, aE as Quote, ay as Award, D as Download, aS as CirclePlay, a1 as Star } from "../_libs/lucide-react.mjs";
function logEvent(profileId, eventType, eventData) {
  import("./client-CrY6GqN9.mjs").then(({ supabase }) => {
    supabase.rpc("log_card_event", {
      p_profile_id: profileId,
      p_event_type: eventType,
      p_event_data: eventData ?? null
    }).then(() => {
    });
  }).catch(() => {
  });
}
function BusinessCard({ data, profileId }) {
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
  const handleSave = () => {
    downloadVCard(data);
    if (profileId) logEvent(profileId, "vcard_download");
  };
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
          case "gallery":
            return data.galleryEnabled;
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
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ActionsSection, { data, profileId });
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
            case "gallery":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySection, { data });
            case "testimonials":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, { data });
            case "calendar":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarSection, { data, profileId });
            case "languages":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguagesSection, { data });
            case "cta":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaSection, { data, profileId });
            case "contact":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, { data, profileId });
            case "socials":
              return /* @__PURE__ */ jsxRuntimeExports.jsx(SocialsSection, { data, profileId });
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
function ActionsSection({ data, profileId }) {
  const any = data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
  if (!any) return null;
  const items = [
    data.actions.call && { icon: Phone, label: "Appeler", href: `tel:${data.phone}`, type: "call" },
    data.actions.whatsapp && { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${data.whatsapp}`, type: "whatsapp" },
    data.actions.email && { icon: Mail, label: "Mail", href: `mailto:${data.email}`, type: "email" },
    data.actions.website && { icon: Globe, label: "Site", href: `https://${data.website}`, type: "website" }
  ].filter(Boolean);
  const v = data.variants.actions;
  if (v === "pills") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 space-y-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: it.href,
        target: it.href.startsWith("http") ? "_blank" : void 0,
        rel: "noopener noreferrer",
        onClick: () => profileId && logEvent(profileId, "click_button", { type: it.type }),
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
        onClick: () => profileId && logEvent(profileId, "click_button", { type: it.type }),
        className: "flex flex-col items-center justify-center gap-2 rounded-2xl bg-card-surface border border-card-border py-5 active:scale-[0.99] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 grid place-items-center rounded-xl", style: { background: "var(--card-accent-gradient)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-card-on-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: it.label })
        ]
      },
      i
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuickActionIcon,
    {
      icon: it.icon,
      label: it.label,
      href: it.href,
      primary: it.label === "Appeler",
      onTrack: () => profileId && logEvent(profileId, "click_button", { type: it.type })
    },
    i
  )) }) });
}
function QuickActionIcon({ icon: Icon, label, href, primary, onTrack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", onClick: onTrack, className: "flex flex-col items-center gap-1.5", children: [
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
function GallerySection({ data }) {
  const gallery = data.gallery ?? [];
  if (!data.galleryEnabled || gallery.length === 0) return null;
  const v = data.variants?.gallery;
  if (v === "carousel") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Galerie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: gallery.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "snap-start shrink-0 w-[calc(50%-4px)] rounded-xl overflow-hidden bg-card-surface border border-card-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-card-surface-alt", children: p.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.caption, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-card-muted" }) }) }),
        p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-card-muted px-2 py-1.5 truncate", children: p.caption })
      ] }, p.id)) })
    ] });
  }
  if (v === "stacked") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Galerie" }),
      gallery.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden bg-card-surface border border-card-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-card-surface-alt", children: p.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.caption, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-card-muted" }) }) }),
        p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-card-muted px-4 py-2", children: p.caption })
      ] }, p.id))
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Galerie" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: gallery.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card-surface border border-card-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-card-surface-alt", children: p.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.caption, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-card-muted" }) }) }),
      p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-card-muted px-2 py-1.5 truncate", children: p.caption })
    ] }, p.id)) })
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
function CalendarSection({ data, profileId }) {
  if (!data.calendarEnabled || !data.calendarUrl) return null;
  const v = data.variants.calendar;
  const label = data.calendarLabel || "Réserver un rendez-vous";
  const track = () => profileId && logEvent(profileId, "click_button", { type: "calendar" });
  if (v === "cta") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: data.calendarUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: track,
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
        onClick: track,
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
      onClick: track,
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
function CtaSection({ data, profileId }) {
  if (!data.ctaEnabled) return null;
  const v = data.variants.cta;
  const hasBtn = data.ctaButtonLabel && data.ctaButtonUrl;
  const track = () => profileId && logEvent(profileId, "click_button", { type: "cta" });
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
          onClick: track,
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
          onClick: track,
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
            onClick: track,
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
function ContactSection({ data, profileId }) {
  if (!data.contactEnabled) return null;
  const v = data.variants.contact;
  const typeMap = { "Téléphone": "call", "Email": "email", "Site web": "website" };
  const track = (label) => {
    const type = typeMap[label];
    if (profileId && type) logEvent(profileId, "click_button", { type });
  };
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
        return r.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.href, onClick: () => track(r.label), className: "active:scale-[0.99] transition", children: Inner }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Inner }, i);
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
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.href, onClick: () => track(r.label), className: "block", children: Inner }) : Inner }, i);
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Coordonnées" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 rounded-2xl bg-card-surface border border-card-border divide-y divide-card-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Phone, label: "Téléphone", value: data.phoneDisplay || data.phone, href: `tel:${data.phone}`, onTrack: () => track("Téléphone") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Mail, label: "Email", value: data.email, href: `mailto:${data.email}`, onTrack: () => track("Email") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Globe, label: "Site web", value: data.website, href: `https://${data.website}`, onTrack: () => track("Site web") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: MapPin, label: "Secteur", value: data.area })
    ] })
  ] });
}
function ContactRow({ icon: Icon, label, value, href, onTrack }) {
  if (!value) return null;
  const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-xl bg-card-surface-alt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: "var(--card-accent)" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-card-muted", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm truncate", children: value })
    ] }),
    href && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-card-muted" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, onClick: onTrack, className: "block active:bg-card-surface-alt/60 transition", children: Inner }) : Inner });
}
const SOCIAL_BRAND = {
  LinkedIn: "oklch(0.55 0.13 245)",
  Instagram: "oklch(0.65 0.2 15)",
  WhatsApp: "oklch(0.7 0.17 150)"
};
function SocialsSection({ data, profileId }) {
  if (!data.socialsEnabled) return null;
  const v = data.variants.socials;
  const items = [
    data.linkedin && { icon: Linkedin, label: "LinkedIn", href: data.linkedin },
    data.instagram && { icon: Instagram, label: "Instagram", href: data.instagram },
    data.whatsappSocial && { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${data.whatsappSocial}` }
  ].filter(Boolean);
  if (items.length === 0) return null;
  const track = (label) => profileId && logEvent(profileId, "click_social", { type: label.toLowerCase() });
  if (v === "pills") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 space-y-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: it.href,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => track(it.label),
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
        onClick: () => track(it.label),
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
      onClick: () => track(it.label),
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
export {
  BusinessCard as B
};
