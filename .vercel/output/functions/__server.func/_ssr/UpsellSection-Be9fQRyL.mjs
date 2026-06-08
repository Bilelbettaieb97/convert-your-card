import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./router-DYFJo9xc.mjs";
import { aT as Printer, A as ArrowRight, G as Globe, y as Sparkles, aU as Nfc, a6 as Check, c as CreditCard, Z as Zap } from "../_libs/lucide-react.mjs";
function UpsellSection({
  variant = "full",
  title = "Allez plus loin",
  subtitle = "Deux upgrades premium qui transforment votre carte digitale en machine à convertir."
}) {
  if (variant === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/carte-physique",
          className: "group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 transition hover:border-amber-500/70 hover:shadow-[0_0_24px_-4px] hover:shadow-amber-500/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-7 w-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400", children: "Dernière étape recommandée" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold leading-snug", children: "Commander la carte physique pour impressionner vos leads" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Métal noir gravé à votre nom · NFC + QR Code · livraison 48h · dès 29 €" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-white font-semibold text-sm px-4 py-2 shadow-md group-hover:bg-amber-600 transition", children: [
              "Commander ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "https://www.convertilab.com/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent p-5 transition hover:border-sky-500/60 hover:shadow-[0_0_24px_-4px] hover:shadow-sky-500/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-7 w-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider font-semibold text-sky-500", children: "Création de site web" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold leading-snug", children: "Un vrai site vitrine pour votre entreprise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Design sur-mesure · SEO local · livré en 7 jours · dès 490 €" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1.5 rounded-full border border-sky-500/50 text-sky-600 dark:text-sky-400 font-semibold text-sm px-4 py-2 group-hover:bg-sky-500/10 transition", children: [
              "Découvrir ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-5 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-primary inline-flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Add-ons premium"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-medium tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xl mx-auto", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UpsellCard,
        {
          tag: "Carte physique",
          tagIcon: Nfc,
          gradient: "linear-gradient(135deg, oklch(0.88 0.1 90) 0%, oklch(0.75 0.14 75) 100%)",
          glowColor: "rgba(234, 179, 8, 0.25)",
          title: "Carte NFC connectée",
          subtitle: "L'objet premium que vos prospects n'oublieront pas.",
          price: "29 €",
          priceSuffix: "à vie · sans abonnement",
          features: [
            "Approche du smartphone → carte s'ouvre instantanément",
            "Carte en métal ou PVC noir mat — gravée à votre nom",
            "QR code de secours imprimé au dos",
            "Sync automatique : modifiez votre carte, la NFC reste à jour",
            "Livraison France 48h offerte dès 2 cartes"
          ],
          cta: "Commander ma carte",
          ctaSecondary: "Voir les modèles",
          ctaTo: "/carte-physique",
          ctaSecondaryTo: "/carte-physique",
          highlight: "🔥 +84% de prospects sauvegardent un contact reçu via NFC vs carte papier.",
          visual: /* @__PURE__ */ jsxRuntimeExports.jsx(NFCVisual, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UpsellCard,
        {
          tag: "Site web sur-mesure",
          tagIcon: Globe,
          gradient: "linear-gradient(135deg, oklch(0.7 0.18 240) 0%, oklch(0.55 0.2 260) 100%)",
          glowColor: "rgba(59, 130, 246, 0.25)",
          title: "Site vitrine pro clé en main",
          subtitle: "On crée votre site, vous gardez la main.",
          price: "dès 490 €",
          priceSuffix: "livré en 7 jours · paiement en 3×",
          features: [
            "Design sur-mesure — adapté à votre métier",
            "Pages : Accueil, Services, Réalisations, Contact",
            "Connecté à votre carte digitale (lien & QR partagés)",
            "SEO local optimisé — soyez trouvé sur Google Maps",
            "Hébergement & domaine inclus la 1ʳᵉ année",
            "Modifications illimitées les 30 premiers jours"
          ],
          cta: "Réserver un appel découverte",
          ctaSecondary: "Voir des exemples",
          ctaHref: "https://www.convertilab.com/",
          ctaSecondaryHref: "https://www.convertilab.com/",
          highlight: "💎 Un site + une carte digitale = la stack complète des indépendants à 100k€+ /an.",
          visual: /* @__PURE__ */ jsxRuntimeExports.jsx(WebVisual, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "Ces add-ons sont facturés une fois — pas de surprise sur votre abonnement." })
  ] });
}
function UpsellCard({
  tag,
  tagIcon: TagIcon,
  gradient,
  glowColor,
  title,
  subtitle,
  price,
  priceSuffix,
  features,
  cta,
  ctaSecondary,
  ctaTo,
  ctaSecondaryTo,
  ctaHref,
  ctaSecondaryHref,
  highlight,
  visual
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-3xl border border-border bg-gradient-to-br from-card to-card/40 p-6 overflow-hidden transition hover:-translate-y-0.5 hover:border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity",
        style: { background: glowColor },
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 grid place-items-center rounded text-white", style: { background: gradient }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TagIcon, { className: "h-2.5 w-2.5" }) }),
      tag
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative my-5 h-32 rounded-2xl border border-border overflow-hidden", style: { background: `linear-gradient(135deg, oklch(0.22 0.02 250), oklch(0.18 0.02 250))` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: visual }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl leading-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-baseline gap-2 mt-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-medium", style: { background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: price }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: priceSuffix })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "relative space-y-1.5 mb-5", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/85", children: f })
    ] }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-xl border border-primary/25 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-foreground/85 mb-5", children: highlight }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col sm:flex-row gap-2", children: [
      ctaTo ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1 h-11 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: ctaTo, children: [
        cta,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
      ] }) }) : ctaHref ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1 h-11 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: ctaHref, target: "_blank", rel: "noopener noreferrer", children: [
        cta,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1 h-11 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40", children: [
        cta,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
      ] }),
      ctaSecondaryTo ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-11 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: ctaSecondaryTo, children: ctaSecondary }) }) : ctaSecondaryHref ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-11 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: ctaSecondaryHref, target: "_blank", rel: "noopener noreferrer", children: ctaSecondary }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-11 sm:flex-none", children: ctaSecondary })
    ] })
  ] });
}
function NFCVisual() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative h-20 w-32 rounded-lg border border-amber-500/30 shadow-2xl",
        style: { background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-2 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] uppercase tracking-wider text-amber-400 font-semibold", children: "Ma carte" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-12 bg-amber-400/60 rounded mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-8 bg-white/30 rounded" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 rounded-full bg-amber-400/80 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full border border-amber-400/60 absolute -right-1 top-1/2 -translate-y-1/2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full border border-amber-400/40 absolute -right-2 top-1/2 -translate-y-1/2" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -left-2 text-[8px] text-amber-400/80 font-mono", children: "tap to connect" })
  ] });
}
function WebVisual() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-24 w-40 rounded-lg border border-sky-500/30 bg-card overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-3 bg-muted/60 flex items-center gap-0.5 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 rounded-full bg-rose-400/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 rounded-full bg-amber-400/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 rounded-full bg-emerald-400/60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-12 rounded bg-sky-400/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-20 rounded bg-white/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-0.5 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded bg-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded bg-sky-400/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded bg-white/10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-8 rounded bg-sky-400/80 mt-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-3 -right-3 h-6 w-6 rounded-md border border-sky-500/40 bg-card grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3 w-3 text-sky-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1.5 -right-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-sky-400 fill-sky-400/40" }) })
  ] });
}
export {
  UpsellSection as U
};
