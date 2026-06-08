import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCardStore, B as Button, c as createSsrRpc } from "./router-C2M0yPf5.mjs";
import { C as Card } from "./card-SXYWVgsj.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-jXm60lMz.mjs";
import { U as UpsellSection } from "./UpsellSection-Anj0PZdp.mjs";
import { l as loadMyCard, c as createCard } from "./card-actions-CTm7my0g.mjs";
import { c as createServerFn } from "./server-BuIGzgMb.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a2 as ArrowLeft, a3 as ShieldCheck, H as Sparkles, a as Crown, a4 as Gift, u as Check, a5 as Clock, X, a6 as Rocket, a7 as Coffee, g as TrendingUp, U as Users, r as Star, a8 as Calendar } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-direction.mjs";
const schema = objectType({
  plan: enumType(["essentielle", "vitrine"]),
  billing: enumType(["monthly", "yearly"]),
  email: stringType().email()
});
const createCheckoutSession = createServerFn({
  method: "POST"
}).validator(schema).handler(createSsrRpc("e73a7067186170481118eecabe235613902296d3774a9001243b8a25d55e3d56"));
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
  const {
    data: cardData
  } = useCardStore();
  const navigate = useNavigate();
  async function handleActivate() {
    setCreating(true);
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        navigate({
          to: "/inscription",
          search: {
            redirect: "/pricing"
          }
        });
        return;
      }
      const existing = await loadMyCard();
      if (!existing) {
        await createCard(cardData);
      }
      const {
        url
      } = await createCheckoutSession({
        data: {
          plan: selected,
          billing,
          email: user.email
        }
      });
      if (url) window.location.href = url;
    } catch (err) {
      console.error("[handleActivate]", err);
      toast.error(err instanceof Error ? err.message : "Erreur lors du paiement");
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
    ] }) })
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
