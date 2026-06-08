import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCardStore, B as Button, c as cn } from "./card-store-HvNNd4oa.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent, d as createCard } from "./card-actions-DzCXzgZW.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as ArrowLeft, j as ShieldCheck, S as Sparkles, k as Crown, l as Gift, m as Check, n as Clock, X, R as Rocket, o as Coffee, T as TrendingUp, p as Users, q as Star, r as Calendar, N as Nfc, s as Globe, t as Copy, u as Download, M as MessageCircle, v as ExternalLink, A as ArrowRight, w as CreditCard, Z as Zap } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "./client-CrY6GqN9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function UpsellSection({
  variant = "full",
  title = "Allez plus loin",
  subtitle = "Deux upgrades premium qui transforment votre carte digitale en machine à convertir."
}) {
  if (variant === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CompactCard,
        {
          to: "/carte-nfc",
          icon: Nfc,
          tag: "Carte physique NFC",
          title: "Votre carte digitale dans votre poche",
          price: "dès 29 €",
          gradient: "from-amber-500/15 via-amber-500/5 to-transparent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CompactCard,
        {
          icon: Globe,
          tag: "Site web pro",
          title: "Un vrai site vitrine connecté à votre carte",
          price: "dès 490 €",
          gradient: "from-sky-500/15 via-sky-500/5 to-transparent"
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
          ctaTo: "/carte-nfc",
          ctaSecondaryTo: "/carte-nfc",
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
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1 h-11 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40", children: [
        cta,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
      ] }),
      ctaSecondaryTo ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-11 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: ctaSecondaryTo, children: ctaSecondary }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-11 sm:flex-none", children: ctaSecondary })
    ] })
  ] });
}
function CompactCard({ icon: Icon, tag, title, price, gradient, to }) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 grid place-items-center rounded-lg bg-background/60 backdrop-blur text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider font-medium text-muted-foreground", children: tag })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium leading-snug mb-1", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-primary font-medium", children: price })
  ] });
  const cls = `group block text-left rounded-2xl border border-border bg-gradient-to-br ${gradient} p-4 transition hover:-translate-y-0.5 hover:border-primary/40`;
  if (to) return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: cls, children: content });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: cls, children: content });
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
function CelebrationModal({ cardUrl, nom, onClose, onDashboard }) {
  const [copied, setCopied] = reactExports.useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}&margin=10`;
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(cardUrl)}&margin=20`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇
${cardUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`;
  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  const prenom = nom.split(" ")[0] || "vous";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-3xl shadow-2xl w-full max-w-md p-8 relative text-center",
      style: { background: "var(--color-card, #1a1c27)", border: "1px solid var(--color-border, rgba(255,255,255,0.08))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 text-muted-foreground hover:text-foreground transition",
            "aria-label": "Fermer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg",
            style: { background: "var(--gradient-gold, linear-gradient(135deg,#c8a84b,#f0d080))" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-8 h-8 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-1", children: "Votre carte est en ligne ! 🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
          "Bonjour ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: prenom }),
          " — partagez votre lien et recevez vos premiers scans."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-3 rounded-xl mb-5",
            style: { background: "var(--color-surface, rgba(255,255,255,0.05))" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground/80 truncate flex-1 text-left", children: cardUrl }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: copyLink,
                  className: "flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold shrink-0 hover:bg-muted transition",
                  children: [
                    copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                    copied ? "Copié !" : "Copier"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block p-3 bg-white rounded-2xl shadow mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrUrl, alt: "QR Code de votre carte", className: "w-40 h-40 rounded" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: qrDownloadUrl,
            download: "ma-carte-qr.png",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
              " Télécharger le QR Code HD"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: whatsappUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white",
              style: { background: "#25D366" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                " WhatsApp"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: linkedinUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white",
              style: { background: "#0A66C2" },
              children: "LinkedIn"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: cardUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-border hover:bg-muted transition text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                " Voir ma carte"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onDashboard,
            className: "w-full py-3 rounded-full text-primary-foreground font-bold text-sm shadow-lg hover:opacity-90 transition",
            style: { background: "var(--gradient-gold, linear-gradient(135deg,#c8a84b,#f0d080))" },
            children: "Accéder à mon tableau de bord →"
          }
        )
      ]
    }
  ) });
}
const PLANS = [{
  id: "essentielle",
  label: "Essentielle",
  tagline: "Le minimum pour être joignable.",
  monthly: 9.8,
  yearlyMonthly: 8.16,
  // 2 mois offerts ≈ 9.80 * 10 / 12
  ctaLabel: () => "Choisir Essentielle"
}, {
  id: "vitrine",
  label: "Vitrine",
  tagline: "Pour vendre votre savoir-faire et convertir vos visiteurs.",
  monthly: 15.8,
  yearlyMonthly: 13.16,
  oldMonthly: 19.8,
  trial: 7,
  ctaLabel: (b) => b === "yearly" ? "Démarrer — 7 jours gratuits" : "Démarrer 7 jours gratuits",
  highlight: true
}];
const FEATURES = [{
  label: "Identité, contact, vCard",
  essentielle: true,
  vitrine: true
}, {
  label: "Boutons d'action (appel, WhatsApp, email)",
  essentielle: true,
  vitrine: true
}, {
  label: "Bio, badges et certifications",
  essentielle: true,
  vitrine: true
}, {
  label: "Lien public + QR code",
  essentielle: true,
  vitrine: true
}, {
  label: "Modifications illimitées",
  essentielle: true,
  vitrine: true
}, {
  label: "Services & spécialités",
  essentielle: false,
  vitrine: true
}, {
  label: "Témoignages clients",
  essentielle: false,
  vitrine: true
}, {
  label: "Réalisations / portfolio",
  essentielle: false,
  vitrine: true
}, {
  label: "Vidéo de présentation",
  essentielle: false,
  vitrine: true
}, {
  label: "Prise de rendez-vous",
  essentielle: false,
  vitrine: true
}, {
  label: "Réseaux sociaux & CTA personnalisé",
  essentielle: false,
  vitrine: true
}, {
  label: "Statistiques de vues & clics",
  essentielle: false,
  vitrine: true
}];
const TESTIMONIALS = [{
  initial: "C",
  name: "Camille D.",
  role: "Agent immobilier — Paris",
  text: "1 seul client signé grâce au QR code = 14 mois d'abonnement remboursés. Aucun regret."
}, {
  initial: "M",
  name: "Marc L.",
  role: "Coach business",
  text: "J'ai remplacé mes cartes papier en 1 jour. Le dashboard est ultra simple."
}, {
  initial: "L",
  name: "Léa B.",
  role: "Architecte d'intérieur",
  text: "Les témoignages et le portfolio font toute la différence pour mes prospects."
}];
const FAQ = [{
  q: "Que se passe-t-il après les 7 jours d'essai ?",
  a: "Vous êtes prélevé du montant du plan choisi. Vous pouvez annuler à tout moment depuis votre dashboard, en 1 clic, avant la fin de l'essai — sans aucun prélèvement."
}, {
  q: "Puis-je changer de plan plus tard ?",
  a: "Oui, vous pouvez passer d'Essentielle à Vitrine (ou inversement) à tout moment depuis votre compte. La différence est calculée au prorata."
}, {
  q: "Mes données sont-elles sauvegardées si j'annule ?",
  a: "Oui. Votre carte est mise en pause mais conservée 6 mois. Vous pouvez la réactiver à tout moment sans rien re-remplir."
}, {
  q: "Mon lien public change si je modifie ma carte ?",
  a: "Non. Votre lien et votre QR code restent identiques à vie, même si vous modifiez vos informations."
}, {
  q: "Y a-t-il un engagement ?",
  a: "Aucun. Mensuel ou annuel, vous annulez quand vous voulez. L'annuel offre simplement 2 mois gratuits par rapport au mensuel."
}];
function PricingPage() {
  const [billing, setBilling] = reactExports.useState("yearly");
  const [selected, setSelected] = reactExports.useState("vitrine");
  const [creating, setCreating] = reactExports.useState(false);
  const [celebrationSlug, setCelebrationSlug] = reactExports.useState(null);
  const {
    data: cardData
  } = useCardStore();
  const navigate = useNavigate();
  async function handleActivate() {
    setCreating(true);
    try {
      const {
        slug
      } = await createCard(cardData);
      setCelebrationSlug(slug);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      if (msg.includes("Non connecté")) {
        navigate({
          to: "/inscription",
          search: {
            redirect: "/pricing"
          }
        });
      } else {
        toast.error(`Erreur lors de l'activation : ${msg}`);
      }
    } finally {
      setCreating(false);
    }
  }
  const today = /* @__PURE__ */ new Date();
  const trialEnd = new Date(today);
  trialEnd.setDate(today.getDate() + 7);
  const trialEndLabel = trialEnd.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long"
  });
  const selectedPlan = PLANS.find((p) => p.id === selected);
  const dailyCost = (selectedPlan.yearlyMonthly / 30).toFixed(2).replace(".", ",");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-background/80 sticky top-0 z-30 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Retour"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground hidden sm:inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
        " Paiement sécurisé · Sans engagement · Satisfait ou remboursé 14 jours"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 pt-10 pb-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Plus qu'une étape pour activer votre carte"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl leading-tight", children: "Choisissez votre plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl mx-auto", children: "Annulable à tout moment. Vous gardez l'accès à votre dashboard et à toutes vos modifications." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setBilling("monthly"), className: `px-4 py-1.5 text-sm rounded-full transition ${billing === "monthly" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: "Mensuel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setBilling("yearly"), className: `px-4 py-1.5 text-sm rounded-full transition inline-flex items-center gap-2 ${billing === "yearly" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`, children: [
          "Annuel",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${billing === "yearly" ? "bg-emerald-400 text-emerald-950" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"}`, children: "2 mois offerts" })
        ] })
      ] }),
      billing === "yearly" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium", children: "Économisez 2 mois par an en payant à l'année — soit jusqu'à 31,60 € d'économie." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-5 pt-8 pb-6 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-5 items-stretch", children: PLANS.map((p) => {
      const isSelected = selected === p.id;
      const isHighlight = !!p.highlight;
      const price = billing === "yearly" ? p.yearlyMonthly : p.monthly;
      const priceStr = price.toFixed(2).replace(".", ",");
      const yearlyTotal = (p.yearlyMonthly * 12).toFixed(2).replace(".", ",");
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelected(p.id), className: "group relative text-left transition focus:outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-6 sm:p-7 h-full transition border-2 ${isSelected ? "border-primary shadow-[var(--shadow-elegant)]" : "border-border hover:border-foreground/20"} ${isHighlight ? "bg-gradient-to-br from-primary/[0.06] to-transparent" : "opacity-95"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4 gap-3 min-h-[28px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            isHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
              " Recommandé · 96% le choisissent"
            ] }),
            p.trial && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
              " ",
              p.trial,
              "j offerts"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-5 w-5 rounded-full border-2 grid place-items-center transition shrink-0 ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`, "aria-hidden": true, children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `font-display ${isHighlight ? "text-3xl" : "text-2xl text-muted-foreground"}`, children: p.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-5", children: p.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-1 flex-wrap", children: [
          isHighlight && p.oldMonthly && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-lg", children: [
            p.oldMonthly.toFixed(2).replace(".", ","),
            " €"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display tabular-nums ${isHighlight ? "text-5xl" : "text-3xl"}`, children: priceStr }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "€ / mois" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[36px] text-xs mb-4 space-y-0.5", children: [
          billing === "yearly" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
              "Soit ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                yearlyTotal,
                " € / an"
              ] }),
              " · facturé une fois"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
              "2 mois offerts par rapport au mensuel"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Facturation mensuelle, sans engagement" }),
          p.trial ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            "Gratuit jusqu'au ",
            trialEndLabel,
            ", puis ",
            priceStr,
            " €/mois"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Paiement immédiat · pas de période d'essai" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 mb-6", children: [
          FEATURES.slice(0, 5).map((f) => {
            const has = p.id === "essentielle" ? f.essentielle : f.vitrine;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
              has ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: has ? "" : "text-muted-foreground line-through", children: f.label })
            ] }, f.label);
          }),
          p.id === "vitrine" && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-xs text-primary font-medium pl-6", children: "+ 7 fonctionnalités exclusives ↓" }),
          p.id === "essentielle" && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-xs text-muted-foreground pl-6", children: "Pas de services, témoignages, portfolio, stats…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full h-11 text-base", variant: isHighlight ? "default" : "outline", size: isHighlight ? "lg" : "default", onClick: (e) => {
          e.stopPropagation();
          setSelected(p.id);
        }, children: [
          isHighlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4 mr-2" }),
          p.ctaLabel(billing)
        ] })
      ] }) }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-5 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueBlock, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className: "h-4 w-4" }), title: `Moins de ${dailyCost} € / jour`, desc: "Le prix d'un café par semaine pour une carte qui travaille pour vous 24h/24." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueBlock, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), title: "1 client = ROI atteint", desc: "Un seul prospect signé grâce à votre carte rembourse votre année entière." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueBlock, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), title: "2 400+ pros actifs", desc: "96% gardent leur abonnement après l'essai. Note moyenne 4,9/5." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-5 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-center mb-6", children: "Ils ont activé leur carte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-3", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed mb-4", children: [
          '"',
          t.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xs grid place-items-center font-medium", children: t.initial }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: t.role })
          ] })
        ] })
      ] }, t.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-4 text-center", children: "Comparaison détaillée" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_110px_110px] text-xs uppercase tracking-wider text-muted-foreground bg-muted/40 px-4 py-2.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fonctionnalité" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Essentielle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Vitrine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[1fr_110px_110px] items-center px-4 py-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: f.essentielle ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary inline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground/40 inline" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: f.vitrine ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary inline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground/40 inline" }) })
        ] }, f.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-4 text-center", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: FAQ.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${i}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-sm font-medium", children: item.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm text-muted-foreground", children: item.a })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UpsellSection, { title: "Renforcez votre stack", subtitle: "Deux options pour aller plus loin que la carte digitale — pensées pour les pros qui veulent un impact maximum." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-6 grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }), title: "Sans engagement", desc: "Annulez en 1 clic depuis le dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 text-primary" }), title: "14 jours satisfait ou remboursé", desc: "Remboursement intégral, aucune justification." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }), title: "Activation immédiate", desc: "Lien & QR code prêts en 30 secondes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }), title: "Support FR 7j/7", desc: "Une vraie équipe basée en France." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Plan : " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedPlan.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " · ",
            billing === "yearly" ? "annuel" : "mensuel"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground inline-flex items-center gap-1.5 mt-0.5", children: selected === "vitrine" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-700 dark:text-emerald-400 font-medium", children: "0 € aujourd'hui" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "1er prélèvement le ",
            trialEndLabel
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-primary" }),
          "Paiement immédiat sécurisé"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "h-12 shadow-[var(--shadow-elegant)] shrink-0", onClick: handleActivate, disabled: creating, children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Activation en cours…" }) : selected === "vitrine" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4 mr-2" }),
        "Activer gratuitement"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Activer ma carte" }) })
    ] }) }),
    celebrationSlug && /* @__PURE__ */ jsxRuntimeExports.jsx(CelebrationModal, { cardUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/${celebrationSlug}`, nom: cardData.name || "vous", onClose: () => setCelebrationSlug(null), onDashboard: () => {
      setCelebrationSlug(null);
      navigate({
        to: "/dashboard"
      });
    } })
  ] });
}
function ValueBlock({
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-primary text-sm font-medium mb-1.5", children: [
      icon,
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
  ] });
}
function TrustItem({
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: desc })
    ] })
  ] });
}
export {
  PricingPage as component
};
