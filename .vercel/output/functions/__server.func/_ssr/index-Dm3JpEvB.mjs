import { j as jsxRuntimeExports, r as reactExports, R as React } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { C as CardPreview } from "./TemplateCardPreview-04l1NR1Y.mjs";
import { j as Countdown } from "./router-Bqpndsnm.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { Z as Zap, V as LayoutDashboard, W as LogOut, C as CreditCard, S as Shield, c as Truck, Q as Sparkles, H as Check, a9 as X, A as ArrowRight, aB as ChevronDown, h as Star, ad as Clock, B as Building2, aG as House, X as UtensilsCrossed, a8 as GraduationCap, a0 as Scissors, $ as HardHat, O as Smartphone, aH as BadgeCheck, U as Users, at as ChartColumn, aI as Award, aJ as ThumbsUp, v as Play, aK as ChevronLeft, aF as ChevronRight, aL as RefreshCw, aE as Lock, aM as Headphones, aN as Leaf, p as TrendingUp, aO as Quote, j as MessageCircle, aP as ShoppingBag, y as MapPin, ac as Gift, aQ as LoaderCircle, az as Wifi, z as Phone, M as Mail, G as Globe, L as Linkedin, I as Instagram } from "../_libs/lucide-react.mjs";
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
import "./server-Cog6HUgH.mjs";
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
const listeners = /* @__PURE__ */ new Set();
function triggerCheckout(targetHash = "#offres") {
  listeners.forEach((l) => l(true));
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(12);
    } catch {
    }
  }
  window.setTimeout(() => {
    const el = document.querySelector(targetHash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 650);
  window.setTimeout(() => {
    if (!sheetEngaged) listeners.forEach((l) => l(false));
  }, 1100);
}
let sheetEngaged = false;
const onCheckoutClick = (e) => {
  const href = e.currentTarget.getAttribute("href") || "#offres";
  if (href.startsWith("#")) {
    e.preventDefault();
    triggerCheckout(href);
  }
};
function CheckoutFlow() {
  const [open, setOpen] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [liveMessage, setLiveMessage] = reactExports.useState("");
  const sheetRef = reactExports.useRef(null);
  const backdropRef = reactExports.useRef(null);
  const closeBtnRef = reactExports.useRef(null);
  const previouslyFocused = reactExports.useRef(null);
  const titleId = "checkout-sheet-title";
  const descId = "checkout-sheet-desc";
  reactExports.useEffect(() => {
    const l = (o) => setOpen(o);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) {
      setProgress(0);
      return;
    }
    setProgress(8);
    const a = window.setTimeout(() => setProgress(48), 80);
    const b = window.setTimeout(() => setProgress(82), 320);
    const c = window.setTimeout(() => setProgress(96), 700);
    const d = window.setTimeout(() => setProgress(100), 1e3);
    return () => {
      [a, b, c, d].forEach(clearTimeout);
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    if (main) main.setAttribute("inert", "");
    return () => {
      document.body.style.overflow = originalOverflow;
      if (main) main.removeAttribute("inert");
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (open) {
      setLiveMessage("Préparation de votre commande en cours, connexion au paiement sécurisé.");
    } else if (liveMessage) {
      setLiveMessage("Commande prête, redirection vers les offres.");
      const t = window.setTimeout(() => setLiveMessage(""), 1500);
      return () => clearTimeout(t);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) {
      sheetEngaged = false;
      if (previouslyFocused.current) {
        try {
          previouslyFocused.current.focus();
        } catch {
        }
        previouslyFocused.current = null;
      }
      return;
    }
    previouslyFocused.current = document.activeElement;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const raf = requestAnimationFrame(() => {
      (closeBtnRef.current ?? sheet).focus();
    });
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      sheetEngaged = true;
      const elements = Array.from(
        sheet.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = () => {
      sheetEngaged = true;
    };
    sheet.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      sheet.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        listeners.forEach((l) => l(false));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const closeSheet = reactExports.useCallback(() => {
    listeners.forEach((l) => l(false));
  }, []);
  const onBackdropClick = reactExports.useCallback((e) => {
    if (e.target === backdropRef.current) closeSheet();
  }, [closeSheet]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        children: liveMessage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: `fixed top-0 inset-x-0 z-[120] h-[3px] pointer-events-none transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-cta shadow-[0_0_12px_rgba(217,70,239,0.7)] transition-[width] duration-300 ease-out",
            style: { width: `${progress}%` }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: backdropRef,
        onClick: onBackdropClick,
        className: `md:hidden fixed inset-0 z-[115] flex items-end transition-all duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`,
        ...!open && { "aria-hidden": "true" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-md", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: sheetRef,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": titleId,
              "aria-describedby": descId,
              tabIndex: -1,
              className: `relative w-full bg-card rounded-t-3xl border-t border-border shadow-2xl p-5 transition-transform duration-500 focus:outline-none ${open ? "translate-y-0" : "translate-y-full"}`,
              style: { paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-10 h-1 rounded-full bg-muted mb-4", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    ref: closeBtnRef,
                    type: "button",
                    onClick: closeSheet,
                    "aria-label": "Fermer la fenêtre de préparation de commande",
                    className: "absolute top-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5", "aria-hidden": "true" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pr-12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 text-primary-foreground animate-spin" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: titleId, className: "font-display font-bold text-base leading-tight", children: "Préparation de votre commande…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: descId, className: "text-xs text-muted-foreground", children: "Connexion au paiement sécurisé" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-border p-4 space-y-3", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 rounded bg-foreground/80" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-extrabold text-lg text-foreground", children: "19,80€" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sr-only", children: "Total à payer : 19 euros et 80 centimes." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground", "aria-label": "Garanties", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-success", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sécurisé" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-success", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Garantie 30j" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-magenta animate-spin", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Instantané" })
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Skeleton({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: `relative overflow-hidden rounded bg-muted ${className}`,
      style: {
        backgroundImage: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--foreground) 8%, transparent), transparent)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.4s infinite"
      }
    }
  );
}
function DigitalCardVisual() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 bg-gradient-brand opacity-30 blur-3xl rounded-full", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto w-[280px] h-[560px] bg-foreground rounded-[3rem] p-3 shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-background rounded-[2.4rem] overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-12 px-5 pb-5 h-full bg-gradient-soft flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-brand rounded-2xl p-5 text-primary-foreground shadow-card relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-shine", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold border border-white/30", children: "JD" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg leading-tight", children: "Julien Dubois" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-90", children: "CEO · OneTap Studio" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "onetap.me/julien" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: [
          { icon: Phone, label: "Appeler" },
          { icon: Mail, label: "Email" },
          { icon: Globe, label: "Site web" },
          { icon: Linkedin, label: "LinkedIn" },
          { icon: Instagram, label: "Instagram" }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2.5 shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: item.label })
            ]
          },
          item.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-auto bg-foreground text-background rounded-xl py-3 font-semibold text-sm", children: "Ajouter à mes contacts" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block absolute -bottom-6 -right-8 w-56 h-32 rounded-2xl bg-gradient-brand shadow-glow animate-float p-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest opacity-80", children: "OneTap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold mt-1", children: "Julien Dubois" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-90", children: "Approchez votre téléphone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 rotate-90" }) })
    ] })
  ] });
}
const CENTER = {
  id: "imm-1",
  name: "Agent Premium",
  sector: "immobilier",
  job: "Agent immobilier",
  company: "Horizon Immo",
  person: "Camille Durand",
  initials: "CD",
  tagline: "L'immobilier qui vous ressemble",
  bio: "L'immobilier qui vous ressemble. Disponible du lundi au samedi sur Paris et sa région.",
  location: "Paris",
  website: "onetap.cards/cd",
  phone: "+33 6 10 20 30 40",
  email: "cd@horizonimmo.fr",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["linkedin", "instagram", "facebook"],
  style: "elegant",
  palette: { bg: "#0f1b3d", fg: "#ffffff", accent: "#d4a574" },
  badge: "Top vente"
};
const LEFT = {
  id: "bea-1",
  name: "Salon Chic",
  sector: "beaute",
  job: "Coiffeuse styliste",
  company: "Studio Chic",
  person: "Manon Aubert",
  initials: "MA",
  tagline: "Coupe, couleur, conseil",
  bio: "Coupe, couleur, conseil. Disponible du lundi au samedi sur Lyon et sa région.",
  location: "Lyon",
  website: "onetap.cards/ma",
  phone: "+33 6 11 21 31 41",
  email: "ma@studiochic.fr",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["instagram", "tiktok", "whatsapp"],
  style: "elegant",
  palette: { bg: "#f8e8ee", fg: "#3d1a2d", accent: "#c45c7c" }
};
const RIGHT = {
  id: "con-2",
  name: "Freelance Design",
  sector: "conseil",
  job: "Designer freelance",
  company: "Bertin Studio",
  person: "Nathan Bertin",
  initials: "NB",
  tagline: "Brand, UI & motion",
  bio: "Brand, UI & motion. Disponible du lundi au samedi sur Marseille et sa région.",
  location: "Marseille",
  website: "onetap.cards/nb",
  phone: "+33 6 12 22 32 42",
  email: "nb@bertinstudio.fr",
  avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["linkedin", "x"],
  style: "neo",
  palette: { bg: "#0a0a1a", fg: "#ffffff", accent: "#a78bfa" }
};
function PhoneFrame({ t, size = "lg" }) {
  const frameW = size === "lg" ? "w-[260px] sm:w-[280px]" : "w-[200px] sm:w-[220px]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative ${frameW} aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col",
      style: { background: t.palette.bg, color: t.palette.fg },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { t, size: "lg" })
      ]
    }
  ) });
}
function HeroCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex items-end justify-center min-h-[420px] sm:min-h-[480px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-brand opacity-20 blur-[100px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-40px] sm:left-[-20px] bottom-0 z-10 transform scale-[0.72] sm:scale-[0.78] origin-bottom-right -rotate-[8deg] opacity-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { t: LEFT }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-40px] sm:right-[-20px] bottom-0 z-10 transform scale-[0.72] sm:scale-[0.78] origin-bottom-left rotate-[8deg] opacity-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { t: RIGHT }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 transform scale-[0.92] sm:scale-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { t: CENTER, size: "lg" }) })
  ] });
}
const VIDEOS = [
  {
    name: "Sophie Morel",
    role: "Consultante freelance · Lyon",
    poster: "/testimonials/video-sophie.jpg",
    duration: "0:22",
    quote: "En 3 minutes ma carte était prête. J'ai signé 3 clients en 15 jours juste en partageant mon lien en rendez-vous.",
    result: "+3 clients en 15 jours"
  },
  {
    name: "Karim Lahbabi",
    role: "Commercial B2B · Paris",
    poster: "/testimonials/video-karim.jpg",
    duration: "0:28",
    quote: "Je tape ma carte sur le téléphone du prospect, ses coordonnées sont enregistrées. +40 % de rappels depuis.",
    result: "+40 % de rappels"
  },
  {
    name: "Élodie Rousseau",
    role: "Architecte d'intérieur · Bordeaux",
    poster: "/testimonials/video-elodie.jpg",
    duration: "0:19",
    quote: "Mes clients adorent l'effet 'wow'. Je mets à jour mes projets en 10 secondes, sans réimprimer.",
    result: "100 % de retours positifs"
  }
];
function VideoTestimonials() {
  const [active, setActive] = reactExports.useState(null);
  const scrollRef = reactExports.useRef(null);
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild?.clientWidth ?? 280;
    el.scrollBy({ left: dir === "left" ? -cardW - 16 : cardW + 16, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 sm:py-20 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 fill-current" }),
          "Témoignages vidéo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight", children: "Ils racontent leur OneTap en 30 secondes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "Des vraies personnes, des vrais résultats. Cliquez pour lancer la vidéo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:grid grid-cols-3 gap-6", children: VIDEOS.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { v, onPlay: () => setActive(i) }, v.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden relative -mx-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll("left"),
            className: "hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/95 border border-border shadow-lg items-center justify-center text-foreground hover:bg-background transition",
            "aria-label": "Précédent",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll("right"),
            className: "hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/95 border border-border shadow-lg items-center justify-center text-foreground hover:bg-background transition",
            "aria-label": "Suivant",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: scrollRef,
            className: "flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            children: VIDEOS.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "snap-center shrink-0 w-[70vw] max-w-[280px] sm:w-[42vw] sm:max-w-[320px]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { v, onPlay: () => setActive(i) })
              },
              v.name
            ))
          }
        )
      ] })
    ] }),
    active !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { v: VIDEOS[active], onClose: () => setActive(null) })
  ] });
}
function VideoCard({ v, onPlay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: onPlay,
      className: "group relative aspect-[9/14] rounded-2xl overflow-hidden text-left border border-border bg-card shadow-sm hover:shadow-xl transition-all",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: v.poster,
            alt: `Témoignage vidéo de ${v.name}`,
            loading: "lazy",
            width: 576,
            height: 1024,
            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 right-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/55 backdrop-blur-sm text-white text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" }),
            v.duration
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 text-foreground text-[11px] font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3.5 h-3.5 text-primary" }),
            "Vérifié"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary shadow-2xl transition-transform duration-300 group-hover:scale-110", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-white animate-pulse-ring opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 ml-1 fill-current" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-1.5", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-yellow-400 text-yellow-400" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm leading-tight", children: v.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/80", children: v.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/15 backdrop-blur-sm text-[11px] font-medium", children: v.result })
        ] })
      ]
    }
  );
}
function VideoModal({ v, onClose }) {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            "aria-label": "Fermer",
            className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: v.src ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                src: v.src,
                poster: v.poster,
                controls: true,
                autoPlay: true,
                playsInline: true,
                className: "absolute inset-0 w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: v.poster,
                  alt: v.name,
                  className: "absolute inset-0 w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-2", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }, i)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg leading-snug", children: [
                  "“",
                  v.quote,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-white/15 pt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: v.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/75", children: v.role })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/15 backdrop-blur-sm text-white text-xs", children: "Vidéo bientôt disponible" })
            ] })
          }
        )
      ]
    }
  );
}
const ACTIVITY = [
  { name: "Marie", city: "Paris", offer: "OneTap Essentiel", time: "il y a 2 min" },
  { name: "Lucas", city: "Lyon", offer: "OneTap Physique", time: "il y a 6 min" },
  { name: "Sophia", city: "Bordeaux", offer: "OneTap Essentiel", time: "il y a 11 min" },
  { name: "Karim", city: "Marseille", offer: "OneTap Premium", time: "il y a 14 min" },
  { name: "Emma", city: "Nantes", offer: "OneTap Essentiel", time: "il y a 22 min" },
  { name: "Antoine", city: "Toulouse", offer: "OneTap Essentiel", time: "il y a 28 min" }
];
function LiveActivity() {
  const [i, setI] = reactExports.useState(0);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const start = setTimeout(() => setVisible(true), 6e3);
    return () => clearTimeout(start);
  }, []);
  reactExports.useEffect(() => {
    if (!visible) return;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((p) => (p + 1) % ACTIVITY.length);
        setVisible(true);
      }, 600);
    }, 7e3);
    return () => clearInterval(cycle);
  }, [visible]);
  const a = ACTIVITY[i];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": !visible,
      className: `hidden sm:block fixed left-4 bottom-6 z-40 max-w-[18rem] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl p-3 pr-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground leading-tight", children: [
            a.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "vient de commander" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
            a.offer,
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "inline w-3 h-3 -mt-0.5" }),
            " ",
            a.city,
            " · ",
            a.time
          ] })
        ] })
      ] })
    }
  );
}
const EXIT_KEY = "onetap_exit_intent_seen";
function ExitIntent() {
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (sessionStorage.getItem(EXIT_KEY)) return;
    const onLeave = (e) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem(EXIT_KEY, "1");
        setOpen(true);
        document.removeEventListener("mouseleave", onLeave);
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseleave", onLeave), 8e3);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md p-4",
      onClick: () => setOpen(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-md bg-card rounded-3xl overflow-hidden shadow-2xl border border-border",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Fermer",
                onClick: () => setOpen(false),
                className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center z-10 transition",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-brand text-primary-foreground p-6 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-3.5 h-3.5" }),
                " Offre exclusive"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-3 font-display font-extrabold text-2xl leading-tight", children: [
                "Avant de partir…",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-90", children: "-10€ supplémentaires" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm opacity-90", children: [
                "Recevez votre code promo par e-mail.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Carte digitale à ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "9,80€" }),
                " au lieu de 19,80€."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-full bg-success/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-6 h-6 text-success", strokeWidth: 3 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold", children: "Code envoyé !" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Vérifiez votre boîte mail." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  if (!email) return;
                  setSent(true);
                },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "email",
                      required: true,
                      placeholder: "votre@email.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      className: "w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      className: "w-full bg-gradient-cta text-primary-foreground font-semibold py-3 rounded-xl shadow-glow hover:scale-[1.02] transition",
                      children: "Recevoir mon code -10€"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center", children: "Sans spam. Désinscription en 1 clic." })
                ]
              }
            ) })
          ]
        }
      )
    }
  );
}
function GuaranteeBlock() {
  const items = [
    { icon: RefreshCw, t: "Garantie 30 jours", d: "Pas convaincu ? Remboursé intégralement, sans question." },
    { icon: Lock, t: "Paiement sécurisé", d: "Stripe · CB, Apple Pay, Google Pay. Vos données chiffrées." },
    { icon: Sparkles, t: "Activation immédiate", d: "Accès à votre éditeur dès le paiement. Aucune attente." },
    { icon: Headphones, t: "Support humain", d: "Une équipe basée en France, réponse en moins de 4h." }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem] bg-gradient-soft border border-border p-8 sm:p-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10 items-center relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-brand shadow-glow mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-primary-foreground", strokeWidth: 2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-extrabold text-3xl sm:text-4xl leading-tight", children: [
          "Zéro risque.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "100% garanti." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Vous testez votre carte pendant 30 jours. Si elle ne vous convient pas, nous vous remboursons intégralement — sans justification." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 grid sm:grid-cols-2 gap-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "w-5 h-5 text-magenta" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display font-bold text-base", children: it.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: it.d })
      ] }, it.t)) })
    ] })
  ] }) }) });
}
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "OneTap — Carte de visite digitale",
        description: "Carte de visite digitale professionnelle. Partagez vos contacts en 1 tap. Sans abonnement, mises à jour illimitées à vie.",
        brand: { "@type": "Brand", name: "OneTap" },
        offers: [
          {
            "@type": "Offer",
            name: "OneTap Essentiel",
            price: "19.80",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            name: "OneTap Physique",
            price: "28.80",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            name: "OneTap Premium",
            price: "48.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock"
          }
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "487",
          bestRating: "5"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Comment fonctionne la carte digitale à 19,80€ ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous recevez immédiatement l'accès à votre éditeur. En 3 minutes, vous créez votre profil. Un QR code et un lien unique sont générés pour partager vos coordonnées en 1 tap."
            }
          },
          {
            "@type": "Question",
            name: "Y a-t-il un abonnement caché ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non. Vous payez 19,80€ une seule fois. Modifications illimitées à vie incluses."
            }
          },
          {
            "@type": "Question",
            name: "Et si je ne suis pas satisfait ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous êtes remboursé sous 30 jours, sans question. Zéro risque."
            }
          }
        ]
      }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
    }
  );
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StructuredData, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromoBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Logos, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Problem, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SocialProofBand, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoTestimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GuaranteeBlock, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Comparison, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StickyMobileCTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LiveActivity, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExitIntent, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutFlow, {})
  ] });
}
function PromoBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-brand text-primary-foreground text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 flex-wrap text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Offre de lancement : -40% sur la carte digitale" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline opacity-80", children: "·" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, {})
  ] }) });
}
function Nav() {
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data: {
        user
      }
    }) => {
      setUserEmail(user?.email ?? null);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  async function handleSignOut() {
    await supabase.auth.signOut();
    sessionStorage.removeItem("onetap_email");
    setUserEmail(null);
    navigate({
      to: "/"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "OneTap" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", hash: "fonctionnement", className: "hover:text-foreground transition", children: "Fonctionnement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/templates", className: "hover:text-foreground transition", children: "Modèles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offres", className: "hover:text-foreground transition", children: "Offres" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/carte-physique", className: "hover:text-foreground transition", children: "Carte physique" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 sm:gap-3", children: userEmail ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" }),
        "Tableau de bord"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-border rounded-full pl-3 pr-1 py-1 bg-card shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground max-w-[120px] truncate hidden sm:block", children: userEmail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSignOut, className: "w-7 h-7 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center transition", title: "Se déconnecter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5 text-muted-foreground hover:text-destructive" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/connexion", className: "text-sm font-medium text-muted-foreground hover:text-foreground transition whitespace-nowrap", children: "Se connecter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inscription", className: "bg-gradient-cta text-primary-foreground px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition-all whitespace-nowrap", children: "Inscription gratuite" })
    ] }) })
  ] }) });
}
function HeroCTA() {
  const [slug, setSlug] = reactExports.useState("");
  const navigate = useNavigate();
  const handleStart = () => {
    if (slug.trim() && typeof window !== "undefined") {
      sessionStorage.setItem("onetap_desired_slug", slug.trim());
    }
    navigate({
      to: "/inscription"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm", children: "onetap/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: slug, onChange: (e) => setSlug(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleStart(), placeholder: "votrenom", className: "w-full pl-[4.2rem] pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition font-medium" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleStart, className: "group bg-gradient-cta text-primary-foreground px-7 py-4 rounded-xl font-semibold text-base shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 whitespace-nowrap", children: [
      "Commencer gratuitement",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition" })
    ] })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-gradient-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,var(--magenta)_25%,transparent),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex -space-x-1.5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-brand border-2 border-card" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "+2 400 pros nous font confiance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center text-magenta", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]", children: [
          "Une carte de visite digitale, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "conçue pour vous." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-xl", children: "Rejoignez les pros qui ne distribuent plus de papier. Une seule carte pour partager tout ce que vous êtes — réseaux, site, contact, prise de rendez-vous — d'un simple contact avec un téléphone. Designée et gérée par notre équipe." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: ["Activée en 3 minutes — aucune compétence technique", "Compatible iPhone & Android (sans appli)", "Modifiez vos infos quand vous voulez, à vie"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-success", strokeWidth: 3 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: b })
        ] }, b)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCTA, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-success" }),
            " Paiement 100% sécurisé"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-success" }),
            " Activation immédiate"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-success" }),
            " Garantie 30 jours"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 sm:hidden bg-card border border-magenta/30 rounded-2xl p-3 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "🔥 Offre lancement — plus que 47 places" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-magenta", children: "31%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-brand", style: {
            width: "31%"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[11px] text-muted-foreground", children: [
            "Tarif -40% bloqué pendant ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, {})
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCards, {}) })
    ] })
  ] });
}
function Logos() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground/70 text-sm font-display font-semibold tracking-wider", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase", children: "Ils utilisent OneTap :" }),
    ["NOVA", "PIXELHAUS", "atlas.", "MENTOR&CO", "FORGE", "LUMIA"].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 hover:opacity-100 transition", children: n }, n))
  ] }) });
}
function Problem() {
  const oldStats = [{
    label: "finissent à la poubelle",
    value: "88%"
  }, {
    label: "de coût par réimpression",
    value: "120€"
  }, {
    label: "perdues = infos figées",
    value: "1 sur 2"
  }];
  const newStats = [{
    label: "de contacts sauvegardés",
    value: "92%"
  }, {
    label: "économisés par an",
    value: "−340€"
  }, {
    label: "mise à jour en temps réel",
    value: "∞"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 lg:py-28 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 -z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-magenta/5 blur-3xl" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-semibold uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          " Pourquoi changer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight", children: [
          "La carte papier coûte cher.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Et ne convertit plus." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-base sm:text-lg", children: "En 2026, votre carte papier finit à la poubelle avant même votre relance. Comparez — la différence est sans appel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 relative grid md:grid-cols-2 gap-8 lg:gap-6 items-stretch", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-background border-2 border-magenta items-center justify-center font-display font-bold text-magenta shadow-xl", children: "VS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-6 sm:p-8 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-[11px] font-bold uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3", strokeWidth: 3 }),
              " Hier"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Carte papier" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 sm:w-72 h-40 sm:h-44 bg-[#f5f0e8] rounded-xl shadow-lg border border-[#e0d5c5] p-5 flex flex-col justify-between rotate-[-4deg] grayscale-[20%] opacity-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[#8b7355] uppercase tracking-wider", children: "Consultant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg text-[#2d2d2d] mt-1", children: "Jean Dupont" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#666] mt-0.5", children: "06 12 34 56 78" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[#999]", children: "jeandupont.fr" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-[#c9b99a] rounded-full flex items-center justify-center text-white text-[10px] font-bold", children: "JD" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center rotate-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-destructive", strokeWidth: 3 }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: oldStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm border-b border-destructive/10 pb-2 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground line-through decoration-destructive/40", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-destructive tabular-nums", children: s.value })
          ] }, s.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border-2 border-magenta/30 bg-gradient-to-br from-magenta/[0.04] to-transparent p-6 sm:p-8 flex flex-col shadow-2xl shadow-magenta/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-magenta to-magenta/80 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg", children: "★ Recommandé" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 text-success text-[11px] font-bold uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", strokeWidth: 3 }),
              " Aujourd'hui"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-magenta font-semibold", children: "OneTap Digital" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DigitalCardVisual, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: newStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm border-b border-magenta/10 pb-2 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/80 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-success shrink-0", strokeWidth: 3 }),
              " ",
              s.label
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-magenta tabular-nums", children: s.value })
          ] }, s.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm sm:text-base text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "+12 000 pros" }),
          " ont déjà fait le switch."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => triggerCheckout(), className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-magenta/85 text-white font-semibold shadow-lg shadow-magenta/30 hover:shadow-xl hover:shadow-magenta/40 hover:-translate-y-0.5 transition-all", children: [
          "Passer au digital ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
}
function HowItWorks() {
  const templates = [{
    id: "agency",
    sector: "Agence & conseil",
    secondary: "Voir le site",
    icon: Building2,
    gradientAccent: "from-violet-500 to-pink-500",
    name: "Agence Studio",
    job: "Directrice associée",
    company: "Lumière Conseil",
    person: "Sophie Marchand",
    initials: "SM",
    tagline: "Stratégie & créativité",
    bio: "Agence de communication digitale. Disponible du lundi au samedi.",
    location: "Paris",
    website: "onetap.cards/sm",
    phone: "+33 6 10 20 30 40",
    email: "sm@lumiere.fr",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    socials: ["linkedin", "instagram"],
    style: "elegant",
    palette: {
      bg: "#1a0533",
      fg: "#ffffff",
      accent: "#a855f7"
    }
  }, {
    id: "real-estate",
    sector: "Immobilier premium",
    secondary: "Voir les biens",
    icon: House,
    gradientAccent: "from-amber-400 to-yellow-600",
    name: "Horizon Immo",
    job: "Agent immobilier senior",
    company: "Prestige & Patrimoine",
    person: "Camille Durand",
    initials: "CD",
    tagline: "L'immobilier qui vous ressemble",
    bio: "Spécialiste des biens d'exception en Île-de-France.",
    location: "Paris",
    website: "onetap.cards/cd",
    phone: "+33 6 11 21 31 41",
    email: "cd@prestige.fr",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    socials: ["linkedin", "facebook"],
    style: "elegant",
    palette: {
      bg: "#0f1b3d",
      fg: "#ffffff",
      accent: "#d4a574"
    }
  }, {
    id: "restaurant",
    sector: "Restaurant & hospitalité",
    secondary: "Réserver une table",
    icon: UtensilsCrossed,
    gradientAccent: "from-red-500 to-rose-700",
    name: "La Maison",
    job: "Chef propriétaire",
    company: "La Maison du Chef",
    person: "Antoine Roussel",
    initials: "AR",
    tagline: "Cuisine du terroir revisitée",
    bio: "Tables gastronomiques, menu du marché. Réservation conseillée.",
    location: "Lyon",
    website: "onetap.cards/ar",
    phone: "+33 4 78 10 20 30",
    email: "ar@lamaison.fr",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    socials: ["instagram", "facebook"],
    style: "bold",
    palette: {
      bg: "#1a0000",
      fg: "#ffffff",
      accent: "#ef4444"
    }
  }, {
    id: "coach",
    sector: "Coach & expert",
    secondary: "Réserver un appel",
    icon: GraduationCap,
    gradientAccent: "from-emerald-400 to-teal-500",
    name: "Growth Coach",
    job: "Coach business & mindset",
    company: "Mind & Performance",
    person: "Laura Martin",
    initials: "LM",
    tagline: "Libérez votre potentiel",
    bio: "Accompagnement individuel de dirigeants et entrepreneurs.",
    location: "Bordeaux",
    website: "onetap.cards/lm",
    phone: "+33 6 12 22 32 42",
    email: "lm@mindperf.fr",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    socials: ["linkedin", "instagram"],
    style: "neo",
    palette: {
      bg: "#0a1a0f",
      fg: "#ffffff",
      accent: "#10b981"
    }
  }, {
    id: "beauty",
    sector: "Beauté & bien-être",
    secondary: "Réserver",
    icon: Scissors,
    gradientAccent: "from-rose-300 to-amber-200",
    name: "Studio Chic",
    job: "Coiffeuse & coloriste",
    company: "Studio Chic",
    person: "Manon Aubert",
    initials: "MA",
    tagline: "Coupe, couleur, conseil",
    bio: "Salon haut de gamme, sur rendez-vous uniquement.",
    location: "Nice",
    website: "onetap.cards/ma",
    phone: "+33 6 13 23 33 43",
    email: "ma@studiochic.fr",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    socials: ["instagram", "tiktok"],
    style: "soft",
    palette: {
      bg: "#fff0f5",
      fg: "#3d1a2d",
      accent: "#c45c7c"
    }
  }, {
    id: "artisan",
    sector: "BTP & artisan",
    secondary: "Demander un devis",
    icon: HardHat,
    gradientAccent: "from-orange-500 to-orange-600",
    name: "Pro Bâtiment",
    job: "Artisan électricien",
    company: "Électricité Pro",
    person: "Marc Lefebvre",
    initials: "ML",
    tagline: "Qualité & fiabilité depuis 2009",
    bio: "Interventions rapides, devis gratuit. RGE certifié.",
    location: "Toulouse",
    website: "onetap.cards/ml",
    phone: "+33 5 34 10 20 30",
    email: "ml@electricitepro.fr",
    socials: ["facebook"],
    style: "minimal",
    palette: {
      bg: "#1a0d00",
      fg: "#ffffff",
      accent: "#f97316"
    }
  }];
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const activeTemplate = templates[activeIndex];
  reactExports.useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % templates.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [templates.length]);
  const goPrev = () => setActiveIndex((current) => (current - 1 + templates.length) % templates.length);
  const goNext = () => setActiveIndex((current) => (current + 1) % templates.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "fonctionnement", className: "py-8 sm:py-10 lg:py-12 bg-gradient-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-magenta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
        " Modèles de cartes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight", children: [
        "Une carte qui ressemble ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "à votre métier" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base sm:text-lg text-muted-foreground", children: "Immobilier, coaching, restaurant, beauté, artisanat… chaque profil a son univers, son ton, ses appels à l'action." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/templates", className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition", children: [
        "Voir tous les modèles",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full order-1 lg:order-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute -inset-8 bg-gradient-brand opacity-[0.18] blur-3xl rounded-[40%]", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-sm shadow-card p-8 xl:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full bg-gradient-to-r ${activeTemplate.gradientAccent}` }),
              activeTemplate.sector
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-muted-foreground tabular-nums", children: [
              String(activeIndex + 1).padStart(2, "0"),
              " / ",
              String(templates.length).padStart(2, "0")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[280px] xl:w-[320px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[260px] xl:w-[280px] mx-auto aspect-[9/19] rounded-[2.5rem] p-2 shadow-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in-95 duration-500", style: {
              background: "#1a1a2e"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col", style: {
              background: activeTemplate.palette.bg,
              color: activeTemplate.palette.fg
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black/50 z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { t: activeTemplate, size: "lg" })
            ] }) }, activeTemplate.id),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-16 xl:-left-24 top-12 animate-in fade-in slide-in-from-left-4 duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-magenta" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-semibold leading-tight", children: [
                "1 tap",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "contact partagé" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-16 xl:-right-24 top-1/3 animate-in fade-in slide-in-from-right-4 duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3.5 h-3.5 text-magenta" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold leading-tight", children: activeTemplate.secondary })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-12 xl:-left-20 bottom-16 animate-in fade-in slide-in-from-left-4 duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-magenta" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold leading-tight", children: "100% personnalisé" })
            ] }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[200px] sm:w-[260px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[9/19] rounded-[2.5rem] p-2 shadow-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in-95 duration-500", style: {
            background: "#1a1a2e"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col", style: {
            background: activeTemplate.palette.bg,
            color: activeTemplate.palette.fg
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-black/50 z-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { t: activeTemplate, size: "sm" })
          ] }) }, `m-${activeTemplate.id}`),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: goPrev, "aria-label": "Carte précédente", className: "absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-border bg-background/95 shadow-card backdrop-blur active:scale-95 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rotate-180" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: goNext, "aria-label": "Carte suivante", className: "absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-border bg-background/95 shadow-card backdrop-blur active:scale-95 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: activeTemplate.sector }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: activeTemplate.secondary })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-center gap-2 lg:hidden", children: templates.map((template, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Voir ${template.sector}`, onClick: () => setActiveIndex(index), className: `h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-magenta" : "w-2.5 bg-border hover:bg-magenta/40"}` }, template.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pb-1 snap-x snap-mandatory", children: templates.map((template, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveIndex(index), className: `shrink-0 snap-start rounded-full border px-4 py-2 text-xs font-semibold transition-all ${index === activeIndex ? "bg-foreground text-background border-foreground" : "bg-card text-foreground border-border"}`, children: template.sector }, template.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:grid grid-cols-1 gap-2.5", children: templates.map((template, index) => {
          const Icon = template.icon;
          const isActive = index === activeIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveIndex(index), "aria-pressed": isActive, className: `group relative w-full text-left rounded-2xl border px-4 py-4 transition-all duration-300 overflow-hidden ${isActive ? "bg-card border-magenta/40 shadow-card translate-x-1" : "bg-background/60 border-border hover:bg-card hover:border-magenta/20 hover:translate-x-0.5"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${template.gradientAccent} transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`, "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${template.gradientAccent} text-white shadow-sm transition-transform ${isActive ? "scale-105" : "opacity-80 group-hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground leading-tight", children: template.sector }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-xs text-muted-foreground truncate", children: [
                  "CTA · ",
                  template.secondary
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-4 h-4 shrink-0 transition-all ${isActive ? "text-magenta translate-x-0 opacity-100" : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0"}` })
            ] })
          ] }, template.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 lg:mt-8 grid grid-cols-3 gap-2 sm:gap-3", children: [{
          icon: BadgeCheck,
          title: "100% personnalisable"
        }, {
          icon: Users,
          title: "Pensé pour convertir"
        }, {
          icon: ChartColumn,
          title: "Adapté à chaque métier"
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card px-3 py-3 sm:px-4 sm:py-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-magenta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 sm:mt-3 text-xs sm:text-sm font-semibold leading-tight", children: item.title })
        ] }, item.title)) })
      ] })
    ] })
  ] }) });
}
function Pricing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "offres", className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-magenta uppercase tracking-wider", children: "Choisissez votre formule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display font-bold text-3xl sm:text-4xl", children: [
        "Un tarif unique. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Sans abonnement." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Payez une fois, profitez à vie. Garantie satisfait ou remboursé 30 jours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid lg:grid-cols-3 gap-6 lg:gap-5 items-stretch max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-2 lg:order-1 flex max-w-md mx-auto w-full lg:max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OfferCard, { name: "OneTap Essentiel", tagline: "La carte digitale qui convertit", oldPrice: "33€", price: "19,80€", badge: "Digital only", features: [{
        t: "Page de carte de visite digitale",
        v: true
      }, {
        t: "Modifications illimitées à vie",
        v: true
      }, {
        t: "QR code personnalisé",
        v: true
      }, {
        t: "Tous vos réseaux & liens",
        v: true
      }, {
        t: "Compatible iPhone & Android",
        v: true
      }, {
        t: "Sans abonnement, paiement unique",
        v: true
      }], cta: "Oui, je veux ma carte — 19,80€" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-1 lg:order-2 flex max-w-md mx-auto w-full lg:max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OfferCard, { name: "OneTap Physique", tagline: "Carte NFC + page digitale", oldPrice: "48€", price: "28,80€", badge: "⭐ Le plus populaire", highlight: true, stockLeft: 32, stockTotal: 100, valueStack: [{
        t: "Page de carte digitale",
        v: "49€"
      }, {
        t: "QR code personnalisé",
        v: "19€"
      }, {
        t: "Carte NFC premium",
        v: "25€"
      }, {
        t: "Livraison offerte 48h",
        v: "12€"
      }, {
        t: "Modifications à vie",
        v: "29€"
      }], features: [{
        t: "Tout l'essentiel inclus",
        v: true
      }, {
        t: "Carte NFC physique premium",
        v: true
      }, {
        t: "Livraison offerte 48h",
        v: true
      }, {
        t: "QR code intégré à la carte",
        v: true
      }, {
        t: "Compatible iPhone & Android",
        v: true
      }, {
        t: "Sans abonnement, paiement unique",
        v: true
      }], cta: "Commander ma carte NFC — 28,80€", subCta: "Activation immédiate · Garantie 30 jours" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-3 lg:order-3 flex max-w-md mx-auto w-full lg:max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OfferCard, { name: "OneTap Premium", tagline: "Analytics & multi-cartes", oldPrice: "79€", price: "48€", badge: "Pour les équipes", features: [{
        t: "Tout l'essentiel + Physique",
        v: true
      }, {
        t: "Analytics avancées en temps réel",
        v: true
      }, {
        t: "Lead capture & CRM export",
        v: true
      }, {
        t: "Multi-cartes (jusqu'à 5)",
        v: true
      }, {
        t: "Domaine personnalisé",
        v: true
      }, {
        t: "Support prioritaire",
        v: true
      }], cta: "Passer Premium" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
        " CB · Apple Pay · Google Pay"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-success" }),
        " Paiement 100% sécurisé Stripe"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
        " Livraison 48h (option physique)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComparisonTable, {})
  ] }) });
}
function ComparisonTable() {
  const offers = [{
    key: "essentiel",
    name: "Essentiel",
    price: "19,80€",
    badge: "Digital only"
  }, {
    key: "physique",
    name: "Physique",
    price: "28,80€",
    badge: "Carte NFC",
    highlight: true
  }, {
    key: "premium",
    name: "Premium",
    price: "48€",
    badge: "Équipes"
  }];
  const rows = [{
    group: "L'essentiel",
    label: "Page de carte digitale",
    values: [true, true, true]
  }, {
    label: "QR code personnalisé",
    values: [true, true, true]
  }, {
    label: "Modifications illimitées à vie",
    values: [true, true, true]
  }, {
    label: "Tous vos réseaux & liens",
    values: [true, true, true]
  }, {
    label: "Compatible iPhone & Android",
    values: [true, true, true]
  }, {
    label: "Paiement unique, sans abonnement",
    values: [true, true, true]
  }, {
    group: "Carte physique",
    label: "Carte NFC premium livrée",
    values: [false, true, true]
  }, {
    label: "Livraison offerte 48h",
    values: [false, true, true]
  }, {
    label: "QR code intégré à la carte",
    values: [false, true, true]
  }, {
    group: "Pro & équipes",
    label: "Analytics temps réel (vues, clics)",
    values: [false, false, true]
  }, {
    label: "Lead capture & export CRM",
    values: [false, false, true]
  }, {
    label: "Multi-cartes (jusqu'à 5)",
    values: [false, false, true]
  }, {
    label: "Domaine personnalisé",
    values: [false, false, true]
  }, {
    label: "Support prioritaire",
    values: [false, false, true]
  }];
  const cell = (v, highlight) => {
    if (v === true) return /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `w-5 h-5 mx-auto ${highlight ? "text-magenta" : "text-success"}`, "aria-label": "Inclus" });
    if (v === false) return /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 mx-auto text-muted-foreground/40", "aria-label": "Non inclus" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: v });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-magenta uppercase tracking-wider", children: "Comparatif détaillé" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display font-bold text-2xl sm:text-3xl", children: "La différence en un coup d'œil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground text-sm", children: "Toutes les fonctionnalités, comparées côte à côte." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block rounded-2xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { className: "sr-only", children: "Comparatif des formules OneTap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "p-5 font-semibold text-sm text-muted-foreground w-[40%]", children: "Fonctionnalité" }),
        offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { scope: "col", className: `p-5 text-center align-bottom ${o.highlight ? "bg-magenta/5 relative" : ""}`, children: [
          o.highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-magenta text-white px-2 py-0.5 rounded-full whitespace-nowrap", children: [
            "⭐ ",
            o.badge
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg mt-3", children: o.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display font-extrabold text-2xl mt-1 ${o.highlight ? "text-magenta" : ""}`, children: o.price }),
          !o.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-1", children: o.badge })
        ] }, o.key))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          r.group && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "colgroup", colSpan: 4, className: "px-5 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: r.group }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "row", className: "p-4 text-sm font-medium text-foreground", children: r.label }),
            r.values.map((v, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `p-4 text-center ${offers[j].highlight ? "bg-magenta/5" : ""}`, children: cell(v, offers[j].highlight) }, j))
          ] })
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4" }),
          offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `p-4 text-center ${o.highlight ? "bg-magenta/5" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => triggerCheckout("#offres"), className: `inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition ${o.highlight ? "bg-magenta text-white hover:bg-magenta/90" : "bg-foreground text-background hover:opacity-90"}`, children: [
            "Choisir ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] }) }, o.key))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-4", children: [...offers].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0)).map((o) => {
      const idx = offers.findIndex((x) => x.key === o.key);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { open: !!o.highlight, className: `rounded-2xl border bg-card p-5 ${o.highlight ? "border-magenta/50 shadow-lg ring-1 ring-magenta/20" : "border-border"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex items-center justify-between cursor-pointer list-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: o.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display font-extrabold text-xl ${o.highlight ? "text-magenta" : ""}`, children: o.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${o.highlight ? "bg-magenta text-white" : "bg-muted text-muted-foreground"}`, children: o.badge }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground transition group-open:rotate-180" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: rows.map((r, i) => {
          const v = r.values[idx];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            v === true ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `w-4 h-4 mt-0.5 shrink-0 ${o.highlight ? "text-magenta" : "text-success"}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mt-0.5 shrink-0 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: v ? "text-foreground" : "text-muted-foreground/60 line-through", children: r.label })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => triggerCheckout("#offres"), className: `mt-4 w-full inline-flex items-center justify-center gap-2 font-bold py-3 rounded-lg ${o.highlight ? "bg-magenta text-white" : "bg-foreground text-background"}`, children: [
          "Choisir ",
          o.name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }, o.key);
    }) })
  ] });
}
function OfferCard({
  name,
  tagline,
  oldPrice,
  price,
  badge,
  features,
  cta,
  subCta,
  highlight,
  stockLeft,
  stockTotal,
  valueStack
}) {
  const stockPct = stockLeft && stockTotal ? Math.max(8, Math.round(stockLeft / stockTotal * 100)) : null;
  const totalValue = valueStack ? valueStack.reduce((sum, v) => sum + (parseInt(v.v.replace(/[^\d]/g, ""), 10) || 0), 0) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative w-full rounded-3xl p-7 flex flex-col ${highlight ? "bg-gradient-brand text-primary-foreground shadow-glow border-2 border-magenta/40" : "bg-card border border-border shadow-card"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${highlight ? "bg-white/20 text-primary-foreground" : "bg-accent text-accent-foreground"}`, children: badge }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `mt-4 font-display font-bold text-2xl`, children: name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-sm ${highlight ? "opacity-90" : "text-muted-foreground"}`, children: tagline }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm line-through ${highlight ? "opacity-60" : "text-muted-foreground"}`, children: oldPrice }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-extrabold text-5xl", children: price })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs ${highlight ? "opacity-80" : "text-muted-foreground"}`, children: "Paiement unique · TTC" }),
    totalValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-2 text-xs font-semibold ${highlight ? "text-primary-foreground/90" : "text-magenta"}`, children: [
      "Valeur totale ",
      totalValue,
      "€ — vous économisez ",
      totalValue - parseFloat(price.replace(",", ".")) | 0,
      "€"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#offres", onClick: (e) => {
      e.preventDefault();
      triggerCheckout("#offres");
    }, className: `mt-6 block text-center px-5 py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98] ${highlight ? "bg-background text-foreground hover:scale-[1.02] shadow-card" : "bg-foreground text-background hover:opacity-90"}`, children: cta }),
    subCta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-center text-xs ${highlight ? "opacity-80" : "text-muted-foreground"}`, children: subCta }),
    stockPct !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-5 ${highlight ? "" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between text-xs font-medium mb-1.5 ${highlight ? "opacity-90" : "text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "🔥 Plus que ",
          stockLeft,
          " places au tarif lancement"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: highlight ? "opacity-75" : "text-muted-foreground", children: [
          stockPct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-2 rounded-full overflow-hidden ${highlight ? "bg-white/20" : "bg-secondary"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${highlight ? "bg-white" : "bg-gradient-brand"}`, style: {
        width: `${stockPct}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-7 space-y-3", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-start gap-2.5 text-sm ${!f.v && (highlight ? "opacity-50" : "text-muted-foreground")}`, children: [
      f.v ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `w-4 h-4 mt-0.5 shrink-0 ${highlight ? "text-primary-foreground" : "text-success"}`, strokeWidth: 3 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mt-0.5 shrink-0 opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f.t })
    ] }, f.t)) }),
    valueStack && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-6 pt-5 border-t ${highlight ? "border-white/20" : "border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs font-semibold uppercase tracking-wider mb-3 ${highlight ? "opacity-90" : "text-muted-foreground"}`, children: "Ce que vous obtenez" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: valueStack.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: highlight ? "opacity-90" : "text-foreground/80", children: v.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `line-through ${highlight ? "opacity-60" : "text-muted-foreground"}`, children: v.v })
      ] }, v.t)) })
    ] })
  ] });
}
function Features() {
  const items = [{
    icon: Smartphone,
    t: "Sans appli à télécharger",
    d: "Vos contacts ouvrent votre carte instantanément, sur n'importe quel téléphone."
  }, {
    icon: Zap,
    t: "Activation en 3 minutes",
    d: "Un éditeur ultra simple. Aucune compétence technique requise."
  }, {
    icon: ChartColumn,
    t: "Suivez votre impact",
    d: "Vues, clics, contacts ajoutés — mesurez vraiment vos rencontres (offre Premium)."
  }, {
    icon: Leaf,
    t: "100% éco-responsable",
    d: "Plus de cartes papier jetées. Une seule carte digitale à vie."
  }, {
    icon: Shield,
    t: "Vos données protégées",
    d: "Hébergement européen, RGPD, vous restez propriétaire de tout."
  }, {
    icon: TrendingUp,
    t: "Conçu pour convertir",
    d: "Boutons d'action optimisés pour transformer un contact en client."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-gradient-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl", children: [
      "Tout ce qu'il faut. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Rien de superflu." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display font-bold text-lg", children: it.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: it.d })
    ] }, it.t)) })
  ] }) });
}
function SocialProofBand() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 lg:py-16 bg-gradient-soft border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-8 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber-400 text-amber-400" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "4,9/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "· 487 avis vérifiés" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
        "Noté ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "4,9/5" }),
        " sur la base de 487 avis clients vérifiés post-achat."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-5 h-5 text-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Avis vérifiés" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Garantie 30 jours" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Satisfaction 98%" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
      name: "Sophie M.",
      text: "3 nouveaux clients en 15 jours",
      avatar: "/avatars/sophie.jpg"
    }, {
      name: "Karim L.",
      text: "Mes prospects me retrouvent tout de suite",
      avatar: "/avatars/karim.jpg"
    }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar, alt: t.name, className: "w-8 h-8 rounded-full object-cover", loading: "lazy", width: 32, height: 32 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.text })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4 text-success shrink-0 ml-auto" })
    ] }, t.name)) })
  ] }) }) });
}
function Testimonials() {
  const testimonials = [{
    name: "Sophie Morel",
    role: "Coach business & entrepreneuriat",
    location: "Lyon, France",
    quote: "J'ai distribué ma carte digitale lors d'un salon professionnel. Résultat : 3 nouveaux clients signés en 15 jours, alors qu'avant je récoltais des cartes papier que personne ne recontactait. Le ROI est instantané.",
    metric: "3 clients en 15 jours",
    metricLabel: "Depuis le passage au digital",
    avatar: "/avatars/sophie.jpg",
    rating: 5,
    verified: true
  }, {
    name: "Karim Lahbabi",
    role: "Agent immobilier indépendant",
    location: "Marseille, France",
    quote: "En immobilier, la rapidité compte. Quand je tends mon téléphone pour un tap NFC, les prospects sont bluffés. Mes informations sont à jour en temps réel, et je peux suivre qui consulte ma carte. Je ne reviendrai jamais au papier.",
    metric: "+40% de rappels",
    metricLabel: "vs cartes papier",
    avatar: "/avatars/karim.jpg",
    rating: 5,
    verified: true
  }, {
    name: "Élodie Rousseau",
    role: "Designer freelance & directrice artistique",
    location: "Bordeaux, France",
    quote: "En tant que designer, l'esthétique est primordiale. Ma carte OneTap reflète parfaitement mon univers créatif. Les clients potentiels me disent systématiquement 'wow' quand je la partage. C'est devenu un argument de vente à part entière.",
    metric: "100% de retours positifs",
    metricLabel: "sur l'image professionnelle",
    avatar: "/avatars/elodie.jpg",
    rating: 5,
    verified: true
  }, {
    name: "Thomas Bernard",
    role: "Consultant en stratégie digitale",
    location: "Paris, France",
    quote: "J'ai testé 3 solutions de cartes digitales avant de trouver OneTap. La différence ? La simplicité. Je configure les cartes de toute mon équipe en quelques clics, et les analytics me permettent de mesurer notre visibilité réelle.",
    metric: "5 cartes gérées",
    metricLabel: "pour mon équipe commerciale",
    avatar: "/avatars/thomas.jpg",
    rating: 5,
    verified: true
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "avis", className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-card mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber-400 text-amber-400" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "4,9/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "· 487 avis vérifiés" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4 text-success" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl", children: [
        "Des résultats concrets. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Pas juste des mots." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Chaque avis ci-dessous est vérifié post-achat. Nous ne publions que les retours de clients réels ayant utilisé leur carte." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid md:grid-cols-2 gap-5", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "relative bg-card border border-border rounded-2xl p-6 lg:p-7 shadow-card hover:shadow-glow transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [...Array(t.rating)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber-400 text-amber-400" }, i)) }),
        t.verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3 h-3" }),
          " Achat vérifié"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-foreground/90 leading-relaxed text-[15px]", children: [
        '"',
        t.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-2 bg-gradient-soft border border-border rounded-xl px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-magenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: t.metric }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: t.metricLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-5 flex items-center gap-3 pt-5 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar, alt: t.name, className: "w-12 h-12 rounded-full object-cover ring-2 ring-border", loading: "lazy", width: 48, height: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground/70", children: t.location })
        ] })
      ] })
    ] }, t.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-magenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "487" }),
          " avis clients"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-magenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2 400+" }),
          " professionnels actifs"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-magenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "98%" }),
          " de satisfaction"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-magenta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Avis 100% vérifiés post-achat" })
      ] })
    ] })
  ] }) });
}
function Comparison() {
  const rows = [["Coût annuel moyen", "120€+ (réimpressions)", "19,80€ payés une fois"], ["Mises à jour", "Réimpression complète", "Illimitées en 1 clic"], ["Mesure d'impact", "Aucune", "Vues, clics, contacts"], ["Impact écologique", "Papier jeté", "Zéro déchet"], ["Effet sur prospects", "Banal", "Wow effect"]];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-gradient-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl", children: [
      "Papier vs. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "OneTap" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 bg-card border border-border rounded-3xl overflow-hidden shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 bg-secondary text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-muted-foreground", children: "Carte papier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center bg-gradient-brand text-primary-foreground", children: "OneTap" })
      ] }),
      rows.map(([label, a, b], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-3 text-sm border-t border-border ${i % 2 ? "bg-background" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-medium", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-muted-foreground", children: a }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center font-semibold text-foreground bg-accent/30", children: b })
      ] }, i))
    ] })
  ] }) });
}
function FAQ() {
  const items = [{
    q: "Comment fonctionne la carte digitale à 19,80€ ?",
    a: "Vous recevez immédiatement l'accès à votre éditeur. En 3 minutes, vous créez votre profil (photo, infos, réseaux, liens). Un QR code et un lien unique sont générés : partagez-les sur votre téléphone, signature mail, présentations, etc."
  }, {
    q: "Y a-t-il un abonnement caché ?",
    a: "Non. Vous payez 19,80€ une seule fois. Modifications illimitées à vie incluses. Aucun frais récurrent."
  }, {
    q: "Quelle est la différence avec l'offre physique à 28,80€ ?",
    a: "L'offre Physique inclut tout l'essentiel + une carte NFC premium livrée chez vous. Un simple tap sur le téléphone de votre contact ouvre votre carte digitale."
  }, {
    q: "Compatible avec iPhone et Android ?",
    a: "Oui, 100%. Aucune application à télécharger, votre carte s'ouvre directement dans le navigateur."
  }, {
    q: "Et si je ne suis pas satisfait ?",
    a: "Vous êtes remboursé sous 30 jours, sans question. Zéro risque."
  }, {
    q: "Mes données sont-elles protégées ?",
    a: "Oui, hébergement européen, conformité RGPD, vous restez 100% propriétaire de vos données."
  }];
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl", children: [
      "Questions ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "fréquentes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-3", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(open === i ? null : i), className: "w-full px-6 py-5 flex items-center justify-between text-left font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}` })
      ] }),
      open === i && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-5 text-sm text-muted-foreground leading-relaxed", children: it.a })
    ] }, i)) })
  ] }) });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2.5rem] bg-gradient-brand text-primary-foreground p-10 sm:p-16 text-center shadow-glow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_white_0%,_transparent_50%)] opacity-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
        " Rejoignez 2 400+ pros"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-display font-extrabold text-4xl sm:text-5xl leading-tight", children: [
        "Votre prochaine rencontre",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
        " mérite mieux qu'un papier."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg opacity-90 max-w-xl mx-auto", children: "Créez votre carte digitale en 3 minutes. Sans abonnement. Garantie 30 jours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#offres", onClick: onCheckoutClick, className: "mt-8 inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-card hover:scale-[1.03] transition-all", children: [
        "Créer ma carte — 19,80€",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs opacity-80", children: "Paiement sécurisé · Activation immédiate · Satisfait ou remboursé" })
    ] })
  ] }) }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "OneTap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition", children: "Mentions légales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition", children: "CGV" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition", children: "Confidentialité" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition", children: "Contact" })
    ] })
  ] }) });
}
function StickyMobileCTA() {
  const [show, setShow] = reactExports.useState(false);
  const [hide, setHide] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const on = () => setShow(window.scrollY > 280);
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  reactExports.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const el = document.querySelector("#offres");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHide(e.isIntersecting), {
      rootMargin: "-20% 0px -20% 0px"
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const visible = show && !hide;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": !visible, className: `md:hidden fixed bottom-0 inset-x-0 z-40 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`, style: {
    paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mb-2 bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-brand text-primary-foreground px-3 py-1.5 text-[11px] font-semibold flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 truncate", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" }),
        "🔥 Plus que 47 places à -40%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#offres", onClick: (e) => {
      e.preventDefault();
      triggerCheckout("#offres");
    }, className: "flex items-center gap-3 p-2.5 active:scale-[0.98] transition-transform", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start pl-1.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground line-through leading-none", children: "33€" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-extrabold text-xl leading-tight text-foreground", children: "19,80€" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-success font-semibold leading-none", children: "-13,20€" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-gradient-cta text-primary-foreground rounded-xl py-3 px-3 text-center shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-[15px] leading-tight flex items-center justify-center gap-1.5", children: [
          "Créer ma carte",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] opacity-90 mt-0.5 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-2.5 h-2.5" }),
          " Garantie 30j · Activation immédiate"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Footer,
  Nav,
  Pricing,
  PromoBar,
  Landing as component
};
