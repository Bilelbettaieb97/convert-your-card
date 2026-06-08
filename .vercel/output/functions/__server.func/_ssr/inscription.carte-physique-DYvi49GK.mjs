import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { y as Sparkles, aq as Wifi, a5 as Check, a2 as X, ar as Upload, c as CreditCard, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
const COLORS = [{
  key: "noir",
  name: "Noir mat",
  bg: "#0a0a0a",
  fg: "#ffffff",
  ring: "#0a0a0a"
}, {
  key: "blanc",
  name: "Blanc pur",
  bg: "#f5f5f5",
  fg: "#0a0a0a",
  ring: "#d4d4d4"
}, {
  key: "magenta",
  name: "Magenta",
  bg: "#d946a0",
  fg: "#ffffff",
  ring: "#d946a0"
}, {
  key: "or",
  name: "Or champagne",
  bg: "#c9a84c",
  fg: "#1a1a1a",
  ring: "#c9a84c"
}, {
  key: "bleu",
  name: "Bleu nuit",
  bg: "#0c2340",
  fg: "#ffffff",
  ring: "#0c2340"
}];
const FINISHES = [{
  key: "mat",
  label: "Mat",
  desc: "Toucher doux, anti-trace"
}, {
  key: "brillant",
  label: "Brillant",
  desc: "Couleurs intenses, effet laqué"
}, {
  key: "metal",
  label: "Métal",
  desc: "Acier brossé premium (+10€)"
}];
const PRICE_BASE = 29;
const PRICE_METAL_EXTRA = 10;
function CartePhysiqueUpsellPage() {
  const [color, setColor] = reactExports.useState("noir");
  const [finish, setFinish] = reactExports.useState("mat");
  const [name, setName] = reactExports.useState("Ton Prénom");
  const [role, setRole] = reactExports.useState("Ton métier");
  const [logo, setLogo] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  const selectedColor = COLORS.find((c) => c.key === color);
  const total = reactExports.useMemo(() => PRICE_BASE + (finish === "metal" ? PRICE_METAL_EXTRA : 0), [finish]);
  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogo(ev.target?.result);
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm leading-tight bg-gradient-cta bg-clip-text text-transparent", children: "Carte Visite Digitale" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-semibold mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        "Dernière étape — offre exclusive"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl mx-auto", children: "Ajoute ta carte NFC physique, entièrement personnalisée" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto", children: "Un simple tap et tu partages ton profil. Couleur, finition, logo, nom — tout est à toi. Paiement unique, livraison offerte en 5 jours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:gap-12 lg:grid-cols-[1.05fr_1fr] items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[280px] sm:min-h-[340px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-6 sm:p-7 shadow-2xl transition-all duration-500", style: {
          background: finish === "metal" ? `linear-gradient(135deg, ${selectedColor.bg} 0%, color-mix(in srgb, ${selectedColor.bg} 70%, #ffffff 30%) 50%, ${selectedColor.bg} 100%)` : finish === "brillant" ? `linear-gradient(135deg, ${selectedColor.bg}, color-mix(in srgb, ${selectedColor.bg} 85%, #ffffff 15%))` : selectedColor.bg,
          color: selectedColor.fg,
          boxShadow: finish === "metal" ? `0 25px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)` : `0 25px 50px -12px rgba(0,0,0,0.35)`
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-6", children: logo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Logo", className: "h-9 w-9 object-contain rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md border border-dashed flex items-center justify-center text-[10px] opacity-60", style: {
            borderColor: selectedColor.fg
          }, children: "Logo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "absolute top-5 right-6 h-5 w-5 rotate-90 opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 right-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl sm:text-2xl font-bold tracking-tight truncate", children: name || "Ton Prénom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs sm:text-sm opacity-80 truncate mt-0.5", children: role || "Ton métier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CVD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tap to connect" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }), label: "Puce NFC + QR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }), label: "Compatible iPhone & Android" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }), label: "Garantie 2 ans" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Choisis ta couleur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setColor(c.key), "aria-label": c.name, className: ["group relative h-12 w-12 rounded-full transition-all", color === c.key ? "ring-2 ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"].join(" "), style: {
            background: c.bg,
            // @ts-expect-error css var
            "--tw-ring-color": c.ring
          }, children: color === c.key && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5 absolute inset-0 m-auto", style: {
            color: c.fg
          } }) }, c.key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: selectedColor.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "2. Finition", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: FINISHES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFinish(f.key), className: ["rounded-xl border p-3 text-left transition-all", finish === f.key ? "border-magenta bg-magenta/5 shadow-card" : "border-border hover:border-magenta/40"].join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mt-0.5 leading-snug", children: f.desc })
        ] }, f.key)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "3. Ton identité", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Nom affiché", value: name, onChange: setName, placeholder: "Marie Dupont", max: 28 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Poste / métier", value: role, onChange: setRole, placeholder: "Designer freelance", max: 40 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Logo (optionnel)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/png,image/jpeg,image/svg+xml", onChange: handleLogo, className: "hidden" }),
          logo ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Logo", className: "h-12 w-12 object-contain rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-sm text-foreground", children: "Logo ajouté" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLogo(null), className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground", "aria-label": "Retirer le logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileRef.current?.click(), className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border hover:border-magenta hover:bg-magenta/5 text-sm text-muted-foreground hover:text-foreground transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
            "Téléverser ton logo (PNG, JPG, SVG)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-cta text-primary-foreground p-6 shadow-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm opacity-90", children: "Carte NFC personnalisée" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold tracking-tight", children: [
              total,
              "€"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80 mb-5", children: "Paiement unique · Livraison offerte · S'ajoute à ton abonnement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "w-full flex items-center justify-center gap-2 rounded-full bg-background text-magenta py-3.5 text-sm font-semibold hover:bg-background/90 transition-all shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
            "Ajouter ma carte à la commande",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors", children: "Non merci, continuer sans carte physique" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-12 max-w-md mx-auto", children: "Tu pourras commander ta carte plus tard depuis ton tableau de bord. Cette offre de personnalisation est disponible uniquement à l'inscription." })
  ] }) });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: title }),
    children
  ] });
}
function Mini({
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-magenta/10 text-magenta flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: label })
  ] });
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  max
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-1.5 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value, maxLength: max, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition-all" })
  ] });
}
export {
  CartePhysiqueUpsellPage as component
};
