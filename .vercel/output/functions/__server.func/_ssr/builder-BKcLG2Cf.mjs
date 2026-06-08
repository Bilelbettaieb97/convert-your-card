import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useCardStore, k as PROFESSIONS, l as THEMES_BY_ID, m as PROFESSION_CATEGORIES, I as Input, C as CARD_THEMES, n as PROFESSIONS_BY_THEME, j as DEFAULT_CARD, S as Switch, b as useAuthStore, B as Button, a as cn } from "./router-iu4mfZ5o.mjs";
import { B as BusinessCard } from "./BusinessCard-_gJEETMV.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Root2, T as Trigger, a as RadioGroup2, P as Portal2, C as Content2, L as Label2, S as Separator2, b as RadioItem2, I as ItemIndicator2, c as SubTrigger2, d as SubContent2, e as Item2, f as CheckboxItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { r as renderBrickBody } from "./bricks-CfDa81Z1.mjs";
import "../_libs/seroval.mjs";
import { m as Search, av as ChevronDown, u as Check, aw as SkipForward, H as Sparkles, ax as Flame, c as CircleCheck, a5 as Clock, r as Star, U as Users, a6 as Rocket, A as ArrowRight, a3 as ShieldCheck, Q as QrCode, ay as Lock, a2 as ArrowLeft, a as Crown, l as Circle, az as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./server-CQuSKnUS.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/zod.mjs";
import "./vcard-D7QWDY7x.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const STEPS = [
  { n: 1, label: "Métier" },
  { n: 2, label: "Essentiels" },
  { n: 3, label: "Sections en plus" },
  { n: 4, label: "C'est prêt" }
];
function StepHeader({ step, title, subtitle, completedThrough, onGoToStep, nextHint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center justify-between gap-1 sm:gap-2", children: STEPS.map((s2, idx) => {
      const isActive = s2.n === step;
      const isDone = s2.n < step || s2.n <= completedThrough;
      const isPast = s2.n < step;
      const clickable = !!onGoToStep && s2.n <= completedThrough && !isActive;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex-1 flex items-center min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: !clickable,
            onClick: () => clickable && onGoToStep?.(s2.n),
            className: `flex flex-col items-center gap-1 min-w-0 flex-1 group ${clickable ? "cursor-pointer" : "cursor-default"}`,
            "aria-current": isActive ? "step" : void 0,
            "aria-label": `Étape ${s2.n} : ${s2.label}${isActive ? " (en cours)" : isDone ? " (terminée)" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `h-7 w-7 sm:h-8 sm:w-8 rounded-full grid place-items-center text-[11px] sm:text-xs font-semibold border transition shrink-0 ${isActive ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]" : isPast ? "bg-primary/15 text-primary border-primary/40 group-hover:bg-primary/25" : isDone ? "bg-primary/10 text-primary border-primary/30 group-hover:bg-primary/20" : "bg-muted text-muted-foreground border-border"}`,
                  children: isPast ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5", strokeWidth: 3 }) : s2.n
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] sm:text-[11px] truncate max-w-full leading-tight ${isActive ? "text-foreground font-medium" : "text-muted-foreground"} hidden xs:block sm:block`,
                  children: s2.label
                }
              )
            ]
          }
        ),
        idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `h-px flex-1 mx-1 sm:mx-2 -mt-4 sm:-mt-5 ${s2.n < step ? "bg-primary/40" : "bg-border"}`,
            "aria-hidden": true
          }
        )
      ] }, s2.n);
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto pt-6 sm:pt-8 pb-5 sm:pb-6 px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.22em] text-primary mb-2.5", children: [
        "Étape ",
        step,
        " sur 4"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl lg:text-5xl mb-3 leading-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-muted-foreground", children: subtitle }),
      nextHint && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 border border-border rounded-full px-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" }),
        " ",
        nextHint
      ] })
    ] })
  ] });
}
function StepFooter({
  step,
  onBack,
  backLabel = "Retour",
  onNext,
  nextLabel = "Continuer",
  nextDisabled,
  nextSlot,
  centerInfo
}) {
  const stepLabel = STEPS.find((s2) => s2.n === step)?.label ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "h-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: onBack ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "h-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: backLabel })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col items-center text-center min-w-0 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          "Étape ",
          step,
          " / 5 — ",
          stepLabel
        ] }),
        centerInfo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80 mt-0.5 truncate max-w-[40ch]", children: centerInfo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-end min-w-0", children: nextSlot ?? (onNext && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          onClick: onNext,
          disabled: nextDisabled,
          className: "h-11 text-sm sm:text-base shadow-[var(--shadow-glow)]",
          children: [
            nextLabel,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
          ]
        }
      )) })
    ] }) })
  ] });
}
function s(label, value) {
  return { label, value };
}
function svc(id, title, description) {
  return { id, title, description };
}
function bdg(id, label) {
  return { id, label };
}
const PERSONAS = {
  /* ---------- Immobilier ---------- */
  "agent-immo-prestige": {
    name: "Alexandre Moreau",
    title: "Conseiller immobilier de prestige",
    agency: "Maison Vendôme",
    area: "Paris & Île-de-France",
    bio: "12 ans d'expertise sur le marché parisien. Spécialiste des biens d'exception, je vous accompagne avec discrétion et exigence à chaque étape.",
    stats: [s("Biens vendus", "240+"), s("Note clients", "4.9"), s("Années", "12")],
    services: [
      svc("s1", "Estimation premium", "Évaluation discrète sous 48 h par expert du secteur."),
      svc("s2", "Off-market", "Réseau privé d'acquéreurs internationaux qualifiés."),
      svc("s3", "Conciergerie", "Visite, négociation, notaire — accompagnement complet.")
    ],
    badges: [bdg("b1", "FNAIM"), bdg("b2", "Top 1% Paris"), bdg("b3", "Prestige")],
    pravatarId: 12,
    withListings: true,
    ctaTitle: "Vous vendez un bien d'exception ?",
    ctaText: "Échangeons en confidentialité sur votre projet."
  },
  "agent-immo": {
    name: "Claire Lefèvre",
    title: "Agente immobilière",
    agency: "Agence du Centre",
    area: "Lyon Métropole",
    bio: "Spécialiste de l'achat et de la vente à Lyon depuis 8 ans. Conseil sincère, négociation efficace, suivi humain.",
    stats: [s("Mandats actifs", "32"), s("Satisfaction", "98%"), s("Délai moyen", "47 j")],
    services: [
      svc("s1", "Vente résidentielle", "Mise en valeur, photos pro, diffusion premium."),
      svc("s2", "Recherche acquéreur", "Sélection ciblée selon vos critères réels."),
      svc("s3", "Estimation gratuite", "Évaluation locale sous 48 h, sans engagement.")
    ],
    badges: [bdg("b1", "FNAIM"), bdg("b2", "Carte T")],
    pravatarId: 1,
    withListings: true,
    ctaTitle: "Une estimation gratuite ?",
    ctaText: "Recevez la valeur réelle de votre bien en 48 h."
  },
  "chasseur-immo": {
    name: "Thomas Dubreuil",
    title: "Chasseur immobilier",
    agency: "Chasse & Trouve",
    area: "Bordeaux & Bassin",
    bio: "Je travaille uniquement pour les acquéreurs. Sourcing off-market, négociation, accompagnement jusqu'au notaire.",
    stats: [s("Biens trouvés", "180+"), s("Délai moyen", "6 sem"), s("Économie", "-7%")],
    services: [
      svc("s1", "Cahier des charges", "Définition fine de votre bien idéal."),
      svc("s2", "Sourcing off-market", "Accès aux biens avant publication."),
      svc("s3", "Négociation experte", "Je défends votre intérêt, pas une commission.")
    ],
    badges: [bdg("b1", "Carte T"), bdg("b2", "Indépendant")],
    pravatarId: 33,
    withListings: true,
    ctaTitle: "Trouvez le bien parfait",
    ctaText: "Confiez-moi votre recherche, je m'occupe de tout."
  },
  "promoteur": {
    name: "Marc Vasseur",
    title: "Promoteur immobilier",
    agency: "Vasseur Développement",
    area: "Nantes & Pays de Loire",
    bio: "Conception et réalisation de programmes résidentiels neufs à taille humaine, dans le respect du patrimoine local.",
    stats: [s("Programmes livrés", "24"), s("Logements", "680"), s("Années", "18")],
    services: [
      svc("s1", "Résidences neuves", "Appartements RT 2020, prestations soignées."),
      svc("s2", "Investissement Pinel", "Programmes éligibles, accompagnement fiscal."),
      svc("s3", "VEFA", "Vente en l'état futur d'achèvement, garanties constructeur.")
    ],
    badges: [bdg("b1", "RGE"), bdg("b2", "NF Habitat"), bdg("b3", "BBC")],
    pravatarId: 51,
    withListings: true
  },
  "diagnostiqueur": {
    name: "Sophie Marchal",
    title: "Diagnostiqueure immobilière certifiée",
    agency: "Diag'Expert",
    area: "Toulouse & 31",
    bio: "Tous diagnostics réglementaires pour vente et location. Rapports clairs, intervention sous 72 h.",
    stats: [s("Diagnostics/an", "1 200"), s("Délai", "72h"), s("Note clients", "4.9")],
    services: [
      svc("s1", "DPE", "Diagnostic de performance énergétique conforme 2024."),
      svc("s2", "Pack vente", "Amiante, plomb, électricité, gaz, termites."),
      svc("s3", "Audit énergétique", "Plan de travaux chiffré pour passoires thermiques.")
    ],
    badges: [bdg("b1", "Cofrac"), bdg("b2", "Bureau Veritas")],
    pravatarId: 5
  },
  /* ---------- Juridique ---------- */
  "avocat": {
    name: "Maître Caroline Bénard",
    title: "Avocate au Barreau de Paris",
    agency: "Cabinet Bénard",
    area: "Paris 8e",
    bio: "Droit de la famille et droit pénal. Une écoute attentive, une stratégie claire, une défense engagée.",
    stats: [s("Affaires/an", "120+"), s("Années", "15"), s("Taux gain", "87%")],
    services: [
      svc("s1", "Droit de la famille", "Divorce, garde, succession, médiation."),
      svc("s2", "Droit pénal", "Défense des victimes et des mis en cause."),
      svc("s3", "Consultation", "Premier rendez-vous d'évaluation à tarif fixe.")
    ],
    badges: [bdg("b1", "Barreau de Paris"), bdg("b2", "Médiation")],
    pravatarId: 9
  },
  "avocat-affaires": {
    name: "Maître Olivier Renaud",
    title: "Avocat d'affaires",
    agency: "Renaud & Associés",
    area: "Paris La Défense",
    bio: "Conseil aux PME, ETI et fonds d'investissement. M&A, corporate, contentieux commercial.",
    stats: [s("Deals conseillés", "60+"), s("Volume", "1.2 Md€"), s("Années", "20")],
    services: [
      svc("s1", "M&A", "Cessions, acquisitions, levées de fonds."),
      svc("s2", "Corporate", "Pactes, gouvernance, restructurations."),
      svc("s3", "Contentieux", "Litiges commerciaux et arbitrage.")
    ],
    badges: [bdg("b1", "Legal 500"), bdg("b2", "Chambers")],
    pravatarId: 13
  },
  "notaire": {
    name: "Maître Hélène Faure",
    title: "Notaire associée",
    agency: "Étude Faure & Loiseau",
    area: "Aix-en-Provence",
    bio: "Étude familiale depuis 1982. Immobilier, famille, entreprises — l'accompagnement notarial dans toutes les étapes de la vie.",
    stats: [s("Actes/an", "1 800"), s("Notaires", "4"), s("Années étude", "42")],
    services: [
      svc("s1", "Immobilier", "Achat, vente, donations, succession."),
      svc("s2", "Famille", "Mariage, PACS, adoption, testament."),
      svc("s3", "Entreprise", "Création, cession, transmission.")
    ],
    badges: [bdg("b1", "Chambre des Notaires")],
    pravatarId: 16
  },
  "huissier": {
    name: "Maître Patrick Géraud",
    title: "Commissaire de justice",
    agency: "Office Géraud",
    area: "Marseille",
    bio: "Constats, recouvrement, exécution. Une étude moderne au service des particuliers et des entreprises.",
    stats: [s("Dossiers/an", "2 400"), s("Recouvrement", "82%"), s("Délai constat", "48h")],
    services: [
      svc("s1", "Constats", "Internet, voisinage, état des lieux."),
      svc("s2", "Recouvrement amiable", "Sans frais d'avocat pour vos impayés."),
      svc("s3", "Exécution forcée", "Signification, saisies, expulsions.")
    ],
    badges: [bdg("b1", "CNCJ"), bdg("b2", "Constatech")],
    pravatarId: 25
  },
  "expert-comptable": {
    name: "Nathalie Cordier",
    title: "Experte-comptable",
    agency: "Cordier & Co",
    area: "Lille Métropole",
    bio: "Comptabilité, fiscalité, conseil. Un cabinet digital qui parle votre langage, pas du jargon.",
    stats: [s("Clients", "180+"), s("Note", "4.9/5"), s("Économie moy.", "5 800 €")],
    services: [
      svc("s1", "Tenue comptable", "100 % digitale, votre comptable accessible."),
      svc("s2", "Conseil fiscal", "Optimisation et arbitrages personnalisés."),
      svc("s3", "Création", "Statuts, prévisionnel, démarches incluses.")
    ],
    badges: [bdg("b1", "OEC"), bdg("b2", "Pennylane partner")],
    pravatarId: 20
  },
  "consultant": {
    name: "Julien Castel",
    title: "Consultant stratégie",
    agency: "Castel Consulting",
    area: "Paris & remote",
    bio: "J'aide les dirigeants de PME à clarifier leur stratégie et exécuter des transformations concrètes.",
    stats: [s("Missions", "60+"), s("Secteurs", "12"), s("NPS", "+78")],
    services: [
      svc("s1", "Diagnostic stratégique", "Vision, marché, organisation — en 4 semaines."),
      svc("s2", "Plan de transformation", "Roadmap chiffrée, jalons mensuels."),
      svc("s3", "Sparring CEO", "1h/semaine pour challenger vos décisions.")
    ],
    badges: [bdg("b1", "Ex-McKinsey"), bdg("b2", "HEC")],
    pravatarId: 14
  },
  /* ---------- Finance ---------- */
  "courtier": {
    name: "Romain Tessier",
    title: "Courtier en prêts immobiliers",
    agency: "Crédit Direct",
    area: "Rennes & Bretagne",
    bio: "Je négocie votre crédit immobilier auprès de 25 banques partenaires. Service gratuit pour vous, sans engagement.",
    stats: [s("Dossiers/an", "320"), s("Taux moyen", "-0.4%"), s("Acceptation", "94%")],
    services: [
      svc("s1", "Prêt achat", "Résidence principale, secondaire, locatif."),
      svc("s2", "Rachat de crédit", "Réduisez vos mensualités sans changer de banque."),
      svc("s3", "Assurance emprunteur", "Délégation jusqu'à -60% sur 25 ans.")
    ],
    badges: [bdg("b1", "ORIAS"), bdg("b2", "IOBSP")],
    pravatarId: 4
  },
  "conseiller-patrimoine": {
    name: "Isabelle Vidal",
    title: "Conseillère en gestion de patrimoine",
    agency: "Vidal Patrimoine",
    area: "Strasbourg",
    bio: "20 ans d'expertise pour structurer, optimiser et transmettre votre patrimoine en toute sérénité.",
    stats: [s("Encours conseillé", "180 M€"), s("Clients", "240"), s("Années", "20")],
    services: [
      svc("s1", "Bilan patrimonial", "Audit 360° gratuit de votre situation."),
      svc("s2", "Investissement", "Immobilier, financier, défiscalisation."),
      svc("s3", "Transmission", "Donations, démembrement, assurance-vie.")
    ],
    badges: [bdg("b1", "CIF"), bdg("b2", "AMF"), bdg("b3", "ORIAS")],
    pravatarId: 22
  },
  "assureur": {
    name: "Bertrand Lemoine",
    title: "Agent général d'assurance",
    agency: "Allianz Lemoine",
    area: "Nice & 06",
    bio: "Particuliers et pros. Auto, habitation, santé, prévoyance — un interlocuteur unique, des contrats sur-mesure.",
    stats: [s("Sociétaires", "1 800"), s("Sinistres/72h", "100%"), s("Années", "16")],
    services: [
      svc("s1", "Particuliers", "Auto, MRH, santé, vie."),
      svc("s2", "Pros & TPE", "RC pro, multirisque, prévoyance dirigeant."),
      svc("s3", "Patrimoine", "Assurance-vie, retraite, PER.")
    ],
    badges: [bdg("b1", "Allianz"), bdg("b2", "ORIAS")],
    pravatarId: 11
  },
  "trader": {
    name: "Antoine Garnier",
    title: "Analyste marchés actions",
    agency: "Garnier Capital",
    area: "Paris & remote",
    bio: "Analyse fondamentale et quantitative. Newsletter hebdo, rapports sectoriels, accompagnement particuliers avertis.",
    stats: [s("Abonnés", "8 400"), s("Perf 2025", "+18%"), s("Années", "9")],
    services: [
      svc("s1", "Newsletter", "1 idée d'investissement par semaine, argumentée."),
      svc("s2", "Rapports", "Études sectorielles approfondies."),
      svc("s3", "Coaching", "Construction de portefeuille personnalisé.")
    ],
    badges: [bdg("b1", "CFA"), bdg("b2", "AMF")],
    pravatarId: 8
  },
  /* ---------- Tech ---------- */
  "dev": {
    name: "Léa Boucher",
    title: "Ingénieure logiciel senior",
    agency: "Indépendante",
    area: "Paris & remote",
    bio: "Web et mobile. React, TypeScript, Node. J'aide les startups à livrer des produits propres et scalables.",
    stats: [s("Projets", "40+"), s("Stack", "TS/React"), s("NPS", "+82")],
    services: [
      svc("s1", "MVP", "De l'idée à la prod en 6 semaines."),
      svc("s2", "Audit code", "Performance, sécurité, dette technique."),
      svc("s3", "Tech lead à mi-temps", "Accompagnement de votre équipe interne.")
    ],
    badges: [bdg("b1", "AWS Certified"), bdg("b2", "Ex-Doctolib")],
    pravatarId: 32,
    withListings: true
  },
  "freelance-tech": {
    name: "Yanis Adda",
    title: "Freelance fullstack",
    agency: "Indépendant",
    area: "Lyon & remote",
    bio: "Je transforme vos specs floues en produits live. Next.js, Supabase, Stripe. Disponible en mission longue.",
    stats: [s("Missions", "28"), s("TJM", "650 €"), s("Dispo", "lun. 7 sept.")],
    services: [
      svc("s1", "Fullstack mission", "Intégration équipe ou mission solo."),
      svc("s2", "POC rapide", "Validation technique en 2 semaines."),
      svc("s3", "Refonte", "Modernisation d'apps legacy.")
    ],
    badges: [bdg("b1", "Next.js"), bdg("b2", "Supabase")],
    pravatarId: 60,
    withListings: true
  },
  "saas-founder": {
    name: "Camille Brossard",
    title: "Fondatrice & CEO",
    agency: "FlowStack",
    area: "Paris & remote",
    bio: "Je construis FlowStack, l'outil de gestion de projet pour studios créatifs. Toujours preneuse de discussions produit.",
    stats: [s("Clients SaaS", "1 200"), s("ARR", "1.4 M€"), s("Équipe", "12")],
    services: [
      svc("s1", "Démo produit", "30 min pour découvrir FlowStack."),
      svc("s2", "Conseil founder", "Échange peer-to-peer avec autres founders SaaS."),
      svc("s3", "Partenariats", "Intégrations, co-marketing, revente.")
    ],
    badges: [bdg("b1", "YC alumni"), bdg("b2", "FrenchTech")],
    pravatarId: 19
  },
  "data": {
    name: "Hugo Tabet",
    title: "Data scientist senior",
    agency: "Indépendant",
    area: "Toulouse & remote",
    bio: "ML appliqué, NLP, vision. J'aide les équipes data à passer du notebook à la production.",
    stats: [s("Modèles en prod", "30+"), s("Stack", "Python"), s("Années", "7")],
    services: [
      svc("s1", "Audit data", "État des lieux pipeline + modèles."),
      svc("s2", "MLOps", "Industrialisation et monitoring."),
      svc("s3", "Formation équipe", "Bonnes pratiques data en interne.")
    ],
    badges: [bdg("b1", "Kaggle Master"), bdg("b2", "PhD")],
    pravatarId: 53
  },
  "cybersec": {
    name: "Élodie Renan",
    title: "Experte cybersécurité offensive",
    agency: "Renan Security",
    area: "Paris & remote",
    bio: "Pentest, red team, audit RGPD. Je trouve vos failles avant les attaquants.",
    stats: [s("Audits réalisés", "120+"), s("CVE découvertes", "14"), s("Années", "10")],
    services: [
      svc("s1", "Pentest", "Test d'intrusion web, mobile, infra."),
      svc("s2", "Red team", "Simulation d'attaque complète."),
      svc("s3", "Audit RGPD", "Conformité et plan d'action.")
    ],
    badges: [bdg("b1", "OSCP"), bdg("b2", "CISSP"), bdg("b3", "ANSSI")],
    pravatarId: 26
  },
  /* ---------- Santé ---------- */
  "medecin": {
    name: "Dr. Anne Sorel",
    title: "Médecin généraliste",
    agency: "Cabinet du Parc",
    area: "Bordeaux",
    bio: "Médecine de famille, suivi global, prévention. Sur rendez-vous via Doctolib, urgences au cabinet.",
    stats: [s("Patientèle", "1 400"), s("Note", "4.9"), s("Années", "11")],
    services: [
      svc("s1", "Consultation", "Médecine générale adulte et enfant."),
      svc("s2", "Suivi chronique", "Diabète, HTA, suivi cardio."),
      svc("s3", "Vaccinations", "Calendrier vaccinal et voyages.")
    ],
    badges: [bdg("b1", "Ordre des Médecins"), bdg("b2", "Secteur 1")],
    pravatarId: 23
  },
  "dentiste": {
    name: "Dr. Pierre Lacombe",
    title: "Chirurgien-dentiste",
    agency: "Cabinet Lacombe",
    area: "Montpellier",
    bio: "Soins, esthétique, implantologie. Un cabinet moderne, équipé, à votre écoute.",
    stats: [s("Patients", "2 200"), s("Note", "4.8"), s("Implants/an", "180")],
    services: [
      svc("s1", "Soins dentaires", "Caries, détartrage, dévitalisation."),
      svc("s2", "Esthétique", "Blanchiment, facettes, alignement Invisalign."),
      svc("s3", "Implantologie", "Pose et restauration implantaire.")
    ],
    badges: [bdg("b1", "ONCD"), bdg("b2", "Invisalign Provider")],
    pravatarId: 6
  },
  "kine": {
    name: "Mathieu Perrot",
    title: "Kinésithérapeute D.E.",
    agency: "Cabinet Kiné Vauban",
    area: "Lyon 6e",
    bio: "Rééducation orthopédique, sportive et respiratoire. Approche manuelle et active personnalisée.",
    stats: [s("Patients/sem.", "85"), s("Note", "4.9"), s("Années", "9")],
    services: [
      svc("s1", "Rééducation post-op", "Genou, épaule, rachis."),
      svc("s2", "Sportif", "Bilan, prévention et retour au sport."),
      svc("s3", "Thérapie manuelle", "Mobilisations, étirements actifs.")
    ],
    badges: [bdg("b1", "D.E. Kiné"), bdg("b2", "Conventionné")],
    pravatarId: 30
  },
  "osteo": {
    name: "Sarah Lévêque",
    title: "Ostéopathe D.O.",
    agency: "Cabinet Lévêque",
    area: "Nantes",
    bio: "Ostéopathie pour adultes, sportifs, femmes enceintes et nourrissons. Approche douce et globale.",
    stats: [s("Patients/an", "1 600"), s("Note", "5.0"), s("Années", "8")],
    services: [
      svc("s1", "Consultation adulte", "Douleurs articulaires, stress, sommeil."),
      svc("s2", "Femme enceinte", "Suivi pré et post-natal."),
      svc("s3", "Nourrisson", "Coliques, plagiocéphalie, sommeil.")
    ],
    badges: [bdg("b1", "D.O."), bdg("b2", "ROF")],
    pravatarId: 17
  },
  "psy": {
    name: "Marie Talbot",
    title: "Psychologue clinicienne",
    agency: "Cabinet Talbot",
    area: "Bordeaux & visio",
    bio: "Accompagnement adultes et adolescents : anxiété, deuil, transitions de vie. TCC et thérapies intégratives.",
    stats: [s("Patients suivis", "180+"), s("Visio", "oui"), s("Années", "10")],
    services: [
      svc("s1", "Thérapie individuelle", "TCC, hypnose ericksonienne."),
      svc("s2", "Couple", "Communication, séparation, projet parental."),
      svc("s3", "Visioconsultation", "Téléconsultation sécurisée.")
    ],
    badges: [bdg("b1", "ADELI"), bdg("b2", "EFPT")],
    pravatarId: 36
  },
  "naturopathe": {
    name: "Clémence Riboul",
    title: "Naturopathe certifiée",
    agency: "Cabinet Riboul",
    area: "Aix-en-Provence",
    bio: "Bilan de vitalité, alimentation, plantes, gestion du stress. Une approche globale de votre santé.",
    stats: [s("Consultations/an", "600"), s("Note", "4.9"), s("Années", "6")],
    services: [
      svc("s1", "Bilan de vitalité", "Évaluation complète sur 1 h 30."),
      svc("s2", "Suivi nutrition", "Programme personnalisé sur 3 mois."),
      svc("s3", "Gestion du stress", "Cohérence cardiaque, plantes adaptogènes.")
    ],
    badges: [bdg("b1", "FENA"), bdg("b2", "OMNES")],
    pravatarId: 44
  },
  "sage-femme": {
    name: "Émilie Charrier",
    title: "Sage-femme libérale",
    agency: "Maison de naissance",
    area: "Lyon",
    bio: "Suivi de grossesse, préparation à la naissance, rééducation périnéale. Bienveillance et compétence.",
    stats: [s("Naissances suivies", "240"), s("Note", "5.0"), s("Années", "12")],
    services: [
      svc("s1", "Suivi grossesse", "Consultations prénatales mensuelles."),
      svc("s2", "Préparation naissance", "Cours individuels et en groupe."),
      svc("s3", "Rééducation périnée", "Méthode manuelle et biofeedback.")
    ],
    badges: [bdg("b1", "ONSSF"), bdg("b2", "D.E.")],
    pravatarId: 49
  },
  /* ---------- Beauté ---------- */
  "coiffeur": {
    name: "Lucas Mendes",
    title: "Coiffeur-barbier",
    agency: "Atelier Mendes",
    area: "Paris 11e",
    bio: "Coupe, couleur, barbier traditionnel. Un salon intime, des produits naturels, un service sur-mesure.",
    stats: [s("Clients fidèles", "600+"), s("Note", "5.0"), s("Années", "10")],
    services: [
      svc("s1", "Coupe homme", "Shampoing, coupe, finition barbier."),
      svc("s2", "Couleur femme", "Balayage, ombré, mèches végétales."),
      svc("s3", "Rasage traditionnel", "Serviette chaude, rasoir, soin barbe.")
    ],
    badges: [bdg("b1", "L'Oréal Pro"), bdg("b2", "Bio")],
    pravatarId: 64,
    withListings: true
  },
  "estheticienne": {
    name: "Inès Dautry",
    title: "Esthéticienne diplômée",
    agency: "Cocon Beauté",
    area: "Toulouse",
    bio: "Soins visage, épilations, beauté des mains et des pieds. Une parenthèse douce dans votre quotidien.",
    stats: [s("Clientes", "450"), s("Note", "4.9"), s("Soins/sem.", "55")],
    services: [
      svc("s1", "Soin visage", "Diagnostic personnalisé + protocole."),
      svc("s2", "Épilation", "Cire orientale, peaux sensibles."),
      svc("s3", "Manucure", "Naturelle, semi-permanent, nail art.")
    ],
    badges: [bdg("b1", "CAP Esthétique"), bdg("b2", "Sothys")],
    pravatarId: 47,
    withListings: true
  },
  "maquilleuse": {
    name: "Aïcha Benkhelifa",
    title: "Maquilleuse professionnelle",
    agency: "Indépendante",
    area: "Paris & déplacements",
    bio: "Mariées, mode, événements. Un maquillage tenue 12 h qui sublime votre peau, pas qui la masque.",
    stats: [s("Mariées", "180+"), s("Shoots", "120"), s("Années", "9")],
    services: [
      svc("s1", "Mariée", "Essai + jour J + retouches."),
      svc("s2", "Événement", "Soirée, cocktail, gala."),
      svc("s3", "Shooting", "Mode, corporate, podcast vidéo.")
    ],
    badges: [bdg("b1", "MAC Pro"), bdg("b2", "Charlotte Tilbury")],
    pravatarId: 41,
    withListings: true
  },
  "ongles": {
    name: "Jenna Costa",
    title: "Prothésiste ongulaire",
    agency: "Nail Lab",
    area: "Marseille",
    bio: "Gel, semi-permanent, nail art créatif. Hygiène irréprochable, produits pro, tenue 4 semaines garantie.",
    stats: [s("Clientes", "320"), s("Note", "5.0"), s("Tenue", "4 sem.")],
    services: [
      svc("s1", "Pose complète gel", "Avec décoration au choix."),
      svc("s2", "Remplissage", "Toutes les 3-4 semaines."),
      svc("s3", "Nail art", "Sur-mesure selon votre style.")
    ],
    badges: [bdg("b1", "Diplômée"), bdg("b2", "OPI Pro")],
    pravatarId: 56,
    withListings: true
  },
  "spa": {
    name: "Léna Aubin",
    title: "Directrice de spa",
    agency: "Spa Aurore",
    area: "Annecy",
    bio: "Un cocon de 320 m² entre lac et montagne. Soins signature, hammam, jacuzzi, équipe diplômée.",
    stats: [s("Cabines", "6"), s("Note Tripadvisor", "5.0"), s("Soins/jour", "40")],
    services: [
      svc("s1", "Rituel signature", "2 h de pure détente, gommage + massage + soin visage."),
      svc("s2", "Massages", "Suédois, californien, ayurvédique."),
      svc("s3", "Spa privatif", "2 h en duo avec champagne.")
    ],
    badges: [bdg("b1", "Cinq Mondes"), bdg("b2", "Spa de France")],
    pravatarId: 21,
    withListings: true
  },
  /* ---------- Coaching ---------- */
  "coach-vie": {
    name: "Sandrine Roux",
    title: "Coach de vie certifiée",
    agency: "Cabinet Roux",
    area: "Lyon & visio",
    bio: "Transitions de vie, confiance en soi, projet personnel. Une méthode douce et structurée, 8 séances en moyenne.",
    stats: [s("Coachés", "200+"), s("NPS", "+91"), s("Années", "7")],
    services: [
      svc("s1", "Coaching individuel", "Cycle de 8 séances de 1 h."),
      svc("s2", "Reconversion", "Bilan, exploration, plan d'action."),
      svc("s3", "Atelier groupe", "1 samedi/mois, max 8 personnes.")
    ],
    badges: [bdg("b1", "ICF ACC"), bdg("b2", "RNCP")],
    pravatarId: 35
  },
  "coach-sportif": {
    name: "Kevin Drouhin",
    title: "Coach sportif diplômé",
    agency: "Drouhin Performance",
    area: "Paris & domicile",
    bio: "Préparation physique, perte de poids, prise de masse. Programme sur-mesure, suivi nutritionnel inclus.",
    stats: [s("Clients", "85"), s("Transformations", "120"), s("Années", "8")],
    services: [
      svc("s1", "Coaching individuel", "1h à domicile ou en salle."),
      svc("s2", "Programme + suivi", "Plan 12 semaines avec suivi WhatsApp."),
      svc("s3", "Petit groupe", "Bootcamp 4 personnes max.")
    ],
    badges: [bdg("b1", "BPJEPS AF"), bdg("b2", "Nutrition")],
    pravatarId: 15
  },
  "coach-pro": {
    name: "Frédéric Ostier",
    title: "Coach professionnel certifié",
    agency: "Ostier Leadership",
    area: "Paris & remote",
    bio: "J'accompagne dirigeants et managers dans leur prise de fonction, leur posture et leurs transitions clés.",
    stats: [s("Dirigeants coachés", "140"), s("Heures", "3 200"), s("ICF", "PCC")],
    services: [
      svc("s1", "Coaching individuel", "10 séances sur 6 mois."),
      svc("s2", "Coaching d'équipe", "Codir, prise de fonction, conflits."),
      svc("s3", "Bilan 360°", "Restitution + plan de progression.")
    ],
    badges: [bdg("b1", "ICF PCC"), bdg("b2", "HEC Coach")],
    pravatarId: 7
  },
  "nutritionniste": {
    name: "Charlotte Vasseur",
    title: "Diététicienne-nutritionniste",
    agency: "Cabinet Vasseur",
    area: "Lille & visio",
    bio: "Rééquilibrage alimentaire sans interdits ni privation. Pour adultes, sportifs et enfants.",
    stats: [s("Patients/an", "320"), s("Note", "4.9"), s("Années", "8")],
    services: [
      svc("s1", "Bilan nutritionnel", "1 h 15 d'évaluation complète."),
      svc("s2", "Rééquilibrage", "Suivi mensuel pendant 6 mois."),
      svc("s3", "Sportif", "Périodisation nutritionnelle compétition.")
    ],
    badges: [bdg("b1", "ADELI"), bdg("b2", "AFDN")],
    pravatarId: 28
  },
  "yoga": {
    name: "Anaïs Pellerin",
    title: "Professeure de yoga & Pilates",
    agency: "Studio Pellerin",
    area: "Bordeaux",
    bio: "Yoga vinyasa, yin, Pilates mat. Petits groupes, cours particuliers, retraites en Dordogne.",
    stats: [s("Élèves réguliers", "120"), s("Cours/sem.", "16"), s("Années", "10")],
    services: [
      svc("s1", "Cours collectifs", "10 personnes max, studio lumineux."),
      svc("s2", "Particulier", "À domicile ou au studio."),
      svc("s3", "Retraite", "3 jours en Dordogne, 4×/an.")
    ],
    badges: [bdg("b1", "Yoga Alliance"), bdg("b2", "Pilates Method")],
    pravatarId: 38
  },
  /* ---------- Sport ---------- */
  "preparateur": {
    name: "Maxime Aubertin",
    title: "Préparateur physique",
    agency: "Performance Lab",
    area: "Lyon",
    bio: "Sportifs amateurs et pros. Force, hypertrophie, prépa compétition. Méthodes validées par la science.",
    stats: [s("Athlètes", "60"), s("Records battus", "28"), s("Années", "11")],
    services: [
      svc("s1", "Bilan force", "Tests + plan 12 semaines."),
      svc("s2", "Suivi athlète", "Programmation hebdomadaire."),
      svc("s3", "Préparation compétition", "Coaching dédié + nutrition.")
    ],
    badges: [bdg("b1", "BPJEPS HM"), bdg("b2", "DEUST")],
    pravatarId: 18
  },
  "club-sport": {
    name: "David Marin",
    title: "Gérant — Club Iron Fit",
    agency: "Iron Fit",
    area: "Marseille",
    bio: "1 200 m², équipements pro, cours collectifs et coaching. Ouvert 6h-23h, sans engagement.",
    stats: [s("Adhérents", "1 800"), s("Cours/sem.", "60"), s("m²", "1 200")],
    services: [
      svc("s1", "Abonnement", "Sans engagement, à partir de 39 €/mois."),
      svc("s2", "Cross-training", "20 cours/semaine, encadrés."),
      svc("s3", "Coaching", "Personnalisé, dès la 1re séance offerte.")
    ],
    badges: [bdg("b1", "Hammer Strength"), bdg("b2", "24/7")],
    pravatarId: 39,
    withListings: true
  },
  /* ---------- Restauration ---------- */
  "restaurateur": {
    name: "Antonella Conti",
    title: "Restauratrice — Trattoria Conti",
    agency: "Trattoria Conti",
    area: "Paris 6e",
    bio: "Cuisine italienne familiale, produits frais, pâtes maison. Une table où l'on se sent comme à Naples.",
    stats: [s("Couverts/jour", "120"), s("Note Google", "4.8"), s("Années", "15")],
    services: [
      svc("s1", "Déjeuner", "Menu du marché à 22 €, 3 plats."),
      svc("s2", "Dîner à la carte", "Antipasti, pâtes maison, secondi."),
      svc("s3", "Privatisation", "Salle privée jusqu'à 30 couverts.")
    ],
    badges: [bdg("b1", "Maître Restaurateur"), bdg("b2", "Gault & Millau")],
    pravatarId: 27,
    withListings: true
  },
  "chef": {
    name: "Chef Romain Vidal",
    title: "Chef cuisinier — étoilé Michelin",
    agency: "Restaurant Vidal",
    area: "Lyon",
    bio: "Cuisine de terroir contemporaine. 1 étoile depuis 2019. Cours de cuisine et privatisations sur demande.",
    stats: [s("Étoile Michelin", "1*"), s("Gault & Millau", "16/20"), s("Années", "20")],
    services: [
      svc("s1", "Menu dégustation", "7 services + accord mets-vins."),
      svc("s2", "Cours de cuisine", "Demi-journée en cuisine pro."),
      svc("s3", "Chef à domicile", "Pour vos événements privés.")
    ],
    badges: [bdg("b1", "Michelin"), bdg("b2", "MOF candidat")],
    pravatarId: 54,
    withListings: true
  },
  "patissier": {
    name: "Camille Lapointe",
    title: "Pâtissière — créatrice",
    agency: "Atelier Lapointe",
    area: "Bordeaux",
    bio: "Pâtisseries fines, wedding cakes, ateliers. Une signature visuelle reconnaissable, des goûts précis.",
    stats: [s("Wedding cakes", "60/an"), s("Note Instagram", "4.9"), s("Ateliers", "200+")],
    services: [
      svc("s1", "Wedding cake", "Création sur-mesure, jusqu'à 200 parts."),
      svc("s2", "Pâtisseries", "Sur commande, 48 h à l'avance."),
      svc("s3", "Atelier", "Adulte ou enfant, 3 h, max 8 personnes.")
    ],
    badges: [bdg("b1", "CAP Pâtissier"), bdg("b2", "Ferrandi")],
    pravatarId: 45,
    withListings: true
  },
  "sommelier": {
    name: "Étienne Barrère",
    title: "Sommelier-caviste",
    agency: "Cave Barrère",
    area: "Bordeaux",
    bio: "300 références, conseil sans condescendance. Dégustations chaque samedi, livraison en 24 h.",
    stats: [s("Références", "300+"), s("Dégustations/an", "50"), s("Années", "12")],
    services: [
      svc("s1", "Conseil caviste", "Au choix de votre budget et plat."),
      svc("s2", "Cave personnelle", "Constitution et gestion sur 10 ans."),
      svc("s3", "Atelier dégustation", "Samedi 17 h, 6 vins, 8 personnes max.")
    ],
    badges: [bdg("b1", "WSET 3"), bdg("b2", "UDSF")],
    pravatarId: 31,
    withListings: true
  },
  "barista": {
    name: "Sami Brahim",
    title: "Barista — torréfacteur",
    agency: "Brûlerie Sami",
    area: "Marseille",
    bio: "Spécialité, micro-lots, torréfaction maison. Brunch le week-end, formations baristas pour pros.",
    stats: [s("Tasses/jour", "320"), s("Origines", "14"), s("Cuppings", "12/an")],
    services: [
      svc("s1", "Café à emporter", "Espresso, filtre, latte art."),
      svc("s2", "Vente grain", "Sachets 250 g, torréfaction de la semaine."),
      svc("s3", "Formation pro", "1 journée latte art + machine.")
    ],
    badges: [bdg("b1", "SCA Barista"), bdg("b2", "Q-Grader")],
    pravatarId: 58,
    withListings: true
  },
  "traiteur": {
    name: "Hélène Saint-Marc",
    title: "Traiteure événementielle",
    agency: "Saint-Marc Traiteur",
    area: "Paris & IDF",
    bio: "Cocktails dînatoires, mariages, séminaires. Produits locaux, service soigné, jusqu'à 400 convives.",
    stats: [s("Événements/an", "180"), s("Convives max", "400"), s("Années", "14")],
    services: [
      svc("s1", "Cocktail dînatoire", "Pièces froides + chaudes, service inclus."),
      svc("s2", "Mariage", "Menu sur-mesure, du vin d'honneur au brunch."),
      svc("s3", "Entreprise", "Plateaux repas, séminaires, soirées.")
    ],
    badges: [bdg("b1", "Maître Restaurateur"), bdg("b2", "Bio partner")],
    pravatarId: 48,
    withListings: true
  },
  /* ---------- Artisanat ---------- */
  "menuisier": {
    name: "Pierre Aubry",
    title: "Menuisier-ébéniste",
    agency: "Atelier Aubry",
    area: "Saint-Étienne",
    bio: "Sur-mesure, meubles, agencement, restauration. Bois massif français, finitions à l'huile.",
    stats: [s("Réalisations", "200+"), s("Années", "22"), s("Délai moyen", "6 sem.")],
    services: [
      svc("s1", "Meuble sur-mesure", "Conception 3D, devis offert."),
      svc("s2", "Agencement", "Cuisine, dressing, bibliothèque."),
      svc("s3", "Restauration", "Mobilier ancien, parquet, escaliers.")
    ],
    badges: [bdg("b1", "Compagnons du devoir"), bdg("b2", "PEFC")],
    pravatarId: 24,
    withListings: true
  },
  "plombier": {
    name: "Karim Saidi",
    title: "Plombier-chauffagiste",
    agency: "Saidi Plomberie",
    area: "Lyon Métropole",
    bio: "Dépannage 24/7, rénovation salle de bain, chauffage. Devis gratuit, garantie décennale.",
    stats: [s("Interventions/an", "1 200"), s("Note", "4.9"), s("Délai urgence", "1 h")],
    services: [
      svc("s1", "Dépannage 24/7", "Fuite, débouchage, chauffe-eau."),
      svc("s2", "Rénovation SDB", "Conception et travaux clé en main."),
      svc("s3", "Chauffage", "Pompe à chaleur, chaudière, entretien.")
    ],
    badges: [bdg("b1", "RGE QualiPAC"), bdg("b2", "Décennale")],
    pravatarId: 42
  },
  "electricien": {
    name: "Julien Marchand",
    title: "Électricien IRVE",
    agency: "Marchand Élec",
    area: "Nantes",
    bio: "Installation, mise aux normes, bornes de recharge, domotique. Travail propre, certifié RGE.",
    stats: [s("Chantiers/an", "180"), s("Note", "4.9"), s("Années", "14")],
    services: [
      svc("s1", "Mise aux normes", "Tableau, terre, prises NF C 15-100."),
      svc("s2", "Borne de recharge", "Installation IRVE, éligible aides."),
      svc("s3", "Domotique", "Volets, éclairage, Wiser, Tuya.")
    ],
    badges: [bdg("b1", "Qualifelec"), bdg("b2", "IRVE")],
    pravatarId: 52
  },
  "macon": {
    name: "Antoine Garcia",
    title: "Maçon — gérant BTP",
    agency: "Garcia Bâtiment",
    area: "Toulouse",
    bio: "Gros œuvre, extension, rénovation. 18 ans d'expérience, équipe stable, chantiers propres et respectés.",
    stats: [s("Chantiers livrés", "320"), s("Équipe", "8"), s("Années", "18")],
    services: [
      svc("s1", "Extension maison", "Ossature béton ou bois, clé en main."),
      svc("s2", "Rénovation", "Murs, dalles, ouvertures, cloisons."),
      svc("s3", "Gros œuvre", "Fondations, élévations, toitures.")
    ],
    badges: [bdg("b1", "Qualibat"), bdg("b2", "Décennale")],
    pravatarId: 50,
    withListings: true
  },
  "bijoutier": {
    name: "Léonie Tessier",
    title: "Bijoutière-joaillière",
    agency: "Atelier Tessier",
    area: "Paris 1er",
    bio: "Création, transformation, sertissage. Or 18 ct, diamants éthiques. Sur rendez-vous uniquement.",
    stats: [s("Pièces créées", "400+"), s("Années", "16"), s("Note", "5.0")],
    services: [
      svc("s1", "Bague sur-mesure", "Du dessin à la pièce finie."),
      svc("s2", "Transformation", "Bijoux de famille remis au goût du jour."),
      svc("s3", "Sertissage", "Sertis griffes, clos, pavé.")
    ],
    badges: [bdg("b1", "DMA Joaillerie"), bdg("b2", "Diamant RJC")],
    pravatarId: 46,
    withListings: true
  },
  "tatoueur": {
    name: "Maël Rivière",
    title: "Tatoueur — Black & Grey",
    agency: "Studio Rivière",
    area: "Marseille",
    bio: "Réalisme, ornemental, fine line. Sur rendez-vous, projets longs acceptés. Hygiène ANSM.",
    stats: [s("Tattoos/an", "240"), s("Note Insta", "5.0"), s("Années", "11")],
    services: [
      svc("s1", "Pièce flash", "Sélection prête à tatouer."),
      svc("s2", "Sur-mesure", "Projet dessiné spécialement pour vous."),
      svc("s3", "Cover-up", "Recouvrement d'anciens tatouages.")
    ],
    badges: [bdg("b1", "Hygiène ANSM"), bdg("b2", "SNAT")],
    pravatarId: 57,
    withListings: true
  },
  "fleuriste": {
    name: "Margaux Périer",
    title: "Fleuriste créatrice",
    agency: "Maison Périer",
    area: "Lyon",
    bio: "Bouquets contemporains, mariages, événements, abonnements. Fleurs françaises de saison.",
    stats: [s("Bouquets/sem.", "120"), s("Mariages/an", "40"), s("Note", "5.0")],
    services: [
      svc("s1", "Bouquet du jour", "Composé chaque matin selon le marché."),
      svc("s2", "Mariage", "Bouquet, boutonnières, décor de salle."),
      svc("s3", "Abonnement", "Hebdomadaire ou mensuel.")
    ],
    badges: [bdg("b1", "Fleurs de France"), bdg("b2", "Slow Flowers")],
    pravatarId: 43,
    withListings: true
  },
  "paysagiste": {
    name: "Gaspard Lhermitte",
    title: "Paysagiste concepteur",
    agency: "Lhermitte Paysages",
    area: "Bordeaux",
    bio: "Création et entretien de jardins, terrasses végétalisées, piscines paysagées. Approche écologique.",
    stats: [s("Jardins créés", "85"), s("Équipe", "5"), s("Années", "12")],
    services: [
      svc("s1", "Conception", "Plans, planches végétales, devis."),
      svc("s2", "Création", "Plantation, terrasse, éclairage, arrosage."),
      svc("s3", "Entretien", "Contrat annuel, équipe dédiée.")
    ],
    badges: [bdg("b1", "UNEP"), bdg("b2", "Éco-jardin")],
    pravatarId: 55,
    withListings: true
  },
  /* ---------- Mode ---------- */
  "styliste": {
    name: "Inès Dorval",
    title: "Créatrice de mode",
    agency: "Maison Dorval",
    area: "Paris 3e",
    bio: "Collections capsule en série limitée. Coupes nettes, tissus européens, atelier parisien.",
    stats: [s("Collections", "12"), s("Pièces/an", "1 200"), s("Années", "8")],
    services: [
      svc("s1", "Collection capsule", "Drop saisonnier, série limitée."),
      svc("s2", "Sur-mesure", "Pièces uniques sur 3 essayages."),
      svc("s3", "Direction artistique", "Pour marques émergentes.")
    ],
    badges: [bdg("b1", "ANDAM finaliste"), bdg("b2", "DEFI")],
    pravatarId: 40,
    withListings: true
  },
  "mannequin": {
    name: "Tess Olivier",
    title: "Mannequin & comédienne",
    agency: "Indépendante",
    area: "Paris & international",
    bio: "Mode, beauté, fiction. Représentée par Elite Paris. Disponible pour campagnes, défilés et tournages.",
    stats: [s("Campagnes", "60+"), s("Couvertures", "8"), s("Années", "7")],
    services: [
      svc("s1", "Campagne", "Photo et vidéo, mode et beauté."),
      svc("s2", "Défilé", "Couture, prêt-à-porter, fashion week."),
      svc("s3", "Fiction", "Court-métrage, série, publicité.")
    ],
    badges: [bdg("b1", "Elite Paris"), bdg("b2", "ENSATT")],
    pravatarId: 29,
    withListings: true
  },
  "boutique-mode": {
    name: "Léa Renard",
    title: "Fondatrice — Concept store",
    agency: "Sœurs & Frères",
    area: "Lille",
    bio: "Concept store dédié aux marques européennes responsables. Sélection pointue, accueil chaleureux.",
    stats: [s("Marques", "45"), s("Note Google", "4.9"), s("m²", "180")],
    services: [
      svc("s1", "Personal shopping", "1 h avec une de nos stylistes."),
      svc("s2", "Click & collect", "Réservation en ligne, essayage en boutique."),
      svc("s3", "Événements", "Vernissages et présentations de marques.")
    ],
    badges: [bdg("b1", "Éco-responsable"), bdg("b2", "Made in EU")],
    pravatarId: 37,
    withListings: true
  },
  /* ---------- Créatif ---------- */
  "photographe": {
    name: "Mathilde Vasseur",
    title: "Photographe portraits & mariages",
    agency: "Studio Vasseur",
    area: "Lyon & déplacements",
    bio: "Lumière naturelle, direction discrète, livraison sous 3 semaines. Couples, familles, marques.",
    stats: [s("Mariages/an", "30"), s("Note Google", "5.0"), s("Années", "9")],
    services: [
      svc("s1", "Mariage", "Reportage 8 h + livraison galerie."),
      svc("s2", "Portraits", "Famille, lifestyle, professionnel."),
      svc("s3", "Marques", "Lifestyle product, packshots, contenu social.")
    ],
    badges: [bdg("b1", "Sony Alpha"), bdg("b2", "WPJA")],
    pravatarId: 59,
    withListings: true
  },
  "videaste": {
    name: "Théo Marchand",
    title: "Vidéaste & réalisateur",
    agency: "Marchand Films",
    area: "Paris & remote",
    bio: "Films de marque, clips, documentaires courts. Cinéma narratif au service de vos histoires.",
    stats: [s("Films/an", "40"), s("Clients", "Hermès, Renault…"), s("Années", "10")],
    services: [
      svc("s1", "Film de marque", "Du brief à la livraison master."),
      svc("s2", "Clip musical", "Réalisation et post-production."),
      svc("s3", "Documentaire court", "Format 5-15 min, brand storytelling.")
    ],
    badges: [bdg("b1", "Cannes Lions"), bdg("b2", "DGA membre")],
    pravatarId: 62,
    withListings: true
  },
  "graphiste": {
    name: "Solène Berthault",
    title: "Designer graphique",
    agency: "Berthault Studio",
    area: "Nantes & remote",
    bio: "Identités, éditorial, packaging. Une approche typographique forte, des systèmes durables.",
    stats: [s("Identités créées", "60+"), s("Pixels", "Awwwards"), s("Années", "11")],
    services: [
      svc("s1", "Identité visuelle", "Logo, charte, déclinaisons."),
      svc("s2", "Éditorial", "Magazines, rapports annuels, livres."),
      svc("s3", "Packaging", "Conception et fabrication suivie.")
    ],
    badges: [bdg("b1", "Awwwards"), bdg("b2", "Brand New")],
    pravatarId: 61,
    withListings: true
  },
  "illustrateur": {
    name: "Adrien Pasquier",
    title: "Illustrateur & auteur BD",
    agency: "Indépendant",
    area: "Bordeaux & remote",
    bio: "Édition, presse, packaging. Style hybride entre dessin traditionnel et numérique.",
    stats: [s("Albums BD", "4"), s("Clients", "Le Monde, Bayard"), s("Années", "12")],
    services: [
      svc("s1", "Illustration commande", "Édition, presse, packaging."),
      svc("s2", "Storyboard", "Pub, animation, BD."),
      svc("s3", "Atelier", "Initiation en école et entreprise.")
    ],
    badges: [bdg("b1", "Angoulême sélection"), bdg("b2", "Ateliers Paris")],
    pravatarId: 63,
    withListings: true
  },
  "musicien": {
    name: "Noah Cassan",
    title: "DJ & producteur",
    agency: "Cassan Music",
    area: "Paris & international",
    bio: "House mélodique, techno organique. Résidence parisienne, sets à Berlin, Ibiza, Tulum.",
    stats: [s("Sets/an", "85"), s("Tracks", "24"), s("Plays Spotify", "3.4 M")],
    services: [
      svc("s1", "Booking club", "Set 2-3 h, set list sur mesure."),
      svc("s2", "Événement privé", "Mariage, séminaire, festival."),
      svc("s3", "Production", "Edits, remixes, mastering.")
    ],
    badges: [bdg("b1", "Spotify Editorial"), bdg("b2", "Pioneer DJ")],
    pravatarId: 65,
    withListings: true
  },
  "architecte": {
    name: "Camille Aubrac",
    title: "Architecte DPLG",
    agency: "Atelier Aubrac",
    area: "Lyon",
    bio: "Maisons individuelles contemporaines et rénovation patrimoniale. Approche bioclimatique.",
    stats: [s("Projets livrés", "55"), s("Surface", "18 000 m²"), s("Années", "14")],
    services: [
      svc("s1", "Maison neuve", "Étude, conception, suivi chantier."),
      svc("s2", "Rénovation", "Restructuration et extension."),
      svc("s3", "Étude de faisabilité", "Avant achat de bien à rénover.")
    ],
    badges: [bdg("b1", "Ordre des architectes"), bdg("b2", "HQE")],
    pravatarId: 66,
    withListings: true
  },
  "decorateur": {
    name: "Camille Vermeer",
    title: "Architecte d'intérieur",
    agency: "Studio Vermeer",
    area: "Paris & déplacements",
    bio: "Appartements de caractère, hôtels boutique, restaurants. Approche matiériste, mobilier sur-mesure.",
    stats: [s("Projets/an", "18"), s("Surface moy.", "120 m²"), s("Années", "9")],
    services: [
      svc("s1", "Conseil déco", "Demi-journée chez vous, plan d'action."),
      svc("s2", "Aménagement complet", "De l'esquisse à la livraison."),
      svc("s3", "Décoration retail", "Restaurants, boutiques, hôtels.")
    ],
    badges: [bdg("b1", "CFAI"), bdg("b2", "Boutique Hôtel")],
    pravatarId: 67,
    withListings: true
  },
  /* ---------- Éducation ---------- */
  "prof": {
    name: "Hugo Lefevre",
    title: "Professeur particulier — Maths & Physique",
    agency: "Indépendant",
    area: "Toulouse & visio",
    bio: "Lycée et prépa scientifique. Méthodologie, exercices, préparation aux concours. Résultats prouvés.",
    stats: [s("Élèves suivis", "180+"), s("Mention TB", "65%"), s("Années", "8")],
    services: [
      svc("s1", "Cours hebdo", "1 h 30 par semaine, lycée."),
      svc("s2", "Stage intensif", "Vacances scolaires, 5 jours."),
      svc("s3", "Préparation concours", "MP, PC, PSI.")
    ],
    badges: [bdg("b1", "Centrale-Supélec"), bdg("b2", "CAPES")],
    pravatarId: 10
  },
  "formateur": {
    name: "Sophie Le Gall",
    title: "Formatrice professionnelle",
    agency: "Le Gall Formation",
    area: "Rennes & visio",
    bio: "Soft skills, communication, management. Formations courtes, ateliers, accompagnement individuel.",
    stats: [s("Stagiaires/an", "320"), s("Note Qualiopi", "9.4/10"), s("Années", "11")],
    services: [
      svc("s1", "Inter-entreprises", "Sessions thématiques mensuelles."),
      svc("s2", "Intra-entreprise", "Sur-mesure dans vos locaux."),
      svc("s3", "Coaching", "Suivi individuel post-formation.")
    ],
    badges: [bdg("b1", "Qualiopi"), bdg("b2", "DataDock")],
    pravatarId: 34
  },
  "nounou": {
    name: "Aïssata Diop",
    title: "Garde d'enfants à domicile",
    agency: "Indépendante",
    area: "Paris 12e & 20e",
    bio: "12 ans d'expérience, agréée, anglophone. Sortie d'école, devoirs, repas, activités créatives.",
    stats: [s("Familles", "8"), s("Années", "12"), s("Langues", "FR/EN")],
    services: [
      svc("s1", "Sortie d'école", "16h-19h, devoirs et goûter."),
      svc("s2", "Mercredi", "Activités, sorties, repas équilibré."),
      svc("s3", "Garde ponctuelle", "Soirées, week-ends, urgences.")
    ],
    badges: [bdg("b1", "PSC1"), bdg("b2", "CAP AEPE")],
    pravatarId: 2
  },
  /* ---------- Voyage ---------- */
  "agent-voyage": {
    name: "Pauline Verdier",
    title: "Agente de voyage sur-mesure",
    agency: "Verdier Travel",
    area: "Paris & remote",
    bio: "Voyages d'exception au Japon, en Afrique de l'Est, en Patagonie. Conception et conciergerie 24/7.",
    stats: [s("Voyages/an", "120"), s("Destinations", "40"), s("Note", "5.0")],
    services: [
      svc("s1", "Voyage sur-mesure", "Conception détaillée, 2 semaines de travail."),
      svc("s2", "Voyage de noces", "Roadbook unique, surprises incluses."),
      svc("s3", "Conciergerie", "Assistance 24/7 pendant le voyage.")
    ],
    badges: [bdg("b1", "Atout France"), bdg("b2", "Virtuoso")],
    pravatarId: 68,
    withListings: true
  },
  "hotelier": {
    name: "Bertrand Lassagne",
    title: "Hôtelier — Maison Lassagne",
    agency: "Maison Lassagne",
    area: "Avignon",
    bio: "Maison d'hôtes de charme en plein cœur de la Provence. 6 chambres, table d'hôtes, piscine.",
    stats: [s("Chambres", "6"), s("Tripadvisor", "5.0"), s("Années", "8")],
    services: [
      svc("s1", "Chambre + petit-déj", "À partir de 180 € la nuit."),
      svc("s2", "Table d'hôtes", "Menu marché, jeudi et samedi soir."),
      svc("s3", "Privatisation", "Mariages, séminaires intimistes.")
    ],
    badges: [bdg("b1", "Châteaux & Hôtels"), bdg("b2", "Logis 4 cheminées")],
    pravatarId: 69,
    withListings: true
  },
  "guide": {
    name: "Caroline Vergé",
    title: "Guide-conférencière",
    agency: "Indépendante",
    area: "Paris & Île-de-France",
    bio: "Visites privées Paris, Versailles, Giverny. Histoire de l'art, anecdotes, hors des sentiers battus.",
    stats: [s("Visiteurs/an", "1 500"), s("Note", "5.0"), s("Langues", "FR/EN/ES")],
    services: [
      svc("s1", "Visite privée", "Demi-journée, groupe jusqu'à 8."),
      svc("s2", "Versailles complet", "Château + jardins + Trianon."),
      svc("s3", "Sortie Giverny", "Journée Monet, transport inclus.")
    ],
    badges: [bdg("b1", "Carte pro guide"), bdg("b2", "Master histoire art")],
    pravatarId: 70
  },
  /* ---------- Événementiel ---------- */
  "wedding": {
    name: "Léa Couture",
    title: "Wedding planner & designer",
    agency: "Couture Weddings",
    area: "France & destination",
    bio: "Mariages haut de gamme en France et à l'étranger. Conception, prestataires, coordination jour J.",
    stats: [s("Mariages/an", "35"), s("Note Google", "5.0"), s("Années", "10")],
    services: [
      svc("s1", "Coordination jour J", "Pour mariées organisées."),
      svc("s2", "Organisation complète", "De la recherche du lieu à l'after."),
      svc("s3", "Destination wedding", "Italie, Maroc, Grèce, France.")
    ],
    badges: [bdg("b1", "UWP"), bdg("b2", "Vogue Weddings")],
    pravatarId: 3,
    withListings: true
  },
  "event": {
    name: "Maxime Auber",
    title: "Organisateur d'événements",
    agency: "Auber Events",
    area: "Paris & national",
    bio: "Séminaires, soirées de lancement, conventions. Logistique millimétrée, créativité débridée.",
    stats: [s("Événements/an", "60"), s("Convives max", "1 200"), s("Années", "12")],
    services: [
      svc("s1", "Séminaire", "Lieu, restauration, animation."),
      svc("s2", "Soirée de marque", "Lancement produit, célébration."),
      svc("s3", "Convention", "Plénière, ateliers, soirée gala.")
    ],
    badges: [bdg("b1", "Lévénement"), bdg("b2", "Bedouk")],
    pravatarId: 62,
    withListings: true
  },
  "marketing": {
    name: "Élise Boyer",
    title: "Consultante marketing & growth",
    agency: "Boyer & Co",
    area: "Paris & remote",
    bio: "J'aide les startups B2B à structurer leur acquisition. SEO, paid, lifecycle, branding.",
    stats: [s("Clients", "40+"), s("ARR généré", "12 M€"), s("Années", "9")],
    services: [
      svc("s1", "Audit marketing", "Diagnostic complet en 3 semaines."),
      svc("s2", "Mission growth", "3-6 mois, équipe ou solo."),
      svc("s3", "Sparring CMO", "1 h/sem pour challenger votre équipe.")
    ],
    badges: [bdg("b1", "HubSpot Partner"), bdg("b2", "Ex-Aircall")],
    pravatarId: 35
  },
  "community": {
    name: "Maya Tessier",
    title: "Community manager senior",
    agency: "Indépendante",
    area: "Paris & remote",
    bio: "Stratégie social media, création de contenu, ads. Réseaux qui engagent, pas qui font joli.",
    stats: [s("Comptes gérés", "18"), s("Engagement moy.", "+38%"), s("Années", "6")],
    services: [
      svc("s1", "Stratégie social", "Audit + plan éditorial 6 mois."),
      svc("s2", "Création contenu", "Reels, carrousels, vidéos UGC."),
      svc("s3", "Paid social", "Meta, TikTok, LinkedIn ads.")
    ],
    badges: [bdg("b1", "Meta Blueprint"), bdg("b2", "TikTok Pro")],
    pravatarId: 40
  },
  /* ---------- Médias ---------- */
  "journaliste": {
    name: "Vincent Mercier",
    title: "Journaliste indépendant",
    agency: "Indépendant",
    area: "Paris & terrain",
    bio: "Reportages longue forme, économie et social. Publié dans Le Monde, M, Society, XXI.",
    stats: [s("Reportages/an", "18"), s("Magazines", "12"), s("Années", "14")],
    services: [
      svc("s1", "Reportage", "Enquête longue forme, 6-12 pages."),
      svc("s2", "Interview", "Long format, retranscrit et édité."),
      svc("s3", "Conférence", "Restitution publique d'enquête.")
    ],
    badges: [bdg("b1", "Carte de presse"), bdg("b2", "Albert-Londres finaliste")],
    pravatarId: 14
  },
  "ecrivain": {
    name: "Anouk Verhoest",
    title: "Écrivaine — autrice",
    agency: "Indépendante",
    area: "Bruxelles & Paris",
    bio: "Romans contemporains. 4 publications chez Actes Sud. Ateliers d'écriture en bibliothèque et école.",
    stats: [s("Romans", "4"), s("Exemplaires", "60 000"), s("Prix", "3")],
    services: [
      svc("s1", "Rencontre publique", "Bibliothèque, salon, librairie."),
      svc("s2", "Atelier d'écriture", "Adulte ou scolaire, 2-10 séances."),
      svc("s3", "Résidence", "Création en milieu scolaire ou culturel.")
    ],
    badges: [bdg("b1", "Actes Sud"), bdg("b2", "Prix Médicis sélection")],
    pravatarId: 36
  },
  "podcasteur": {
    name: "Romain Falco",
    title: "Podcasteur & host",
    agency: "Falco Studio",
    area: "Paris & remote",
    bio: "Producteur du podcast 'Long format', interviews fond. Studio à Paris, location pour producteurs.",
    stats: [s("Épisodes", "180"), s("Écoutes/mois", "120K"), s("Années", "5")],
    services: [
      svc("s1", "Interview podcast", "Pour personnalités, marques."),
      svc("s2", "Production déléguée", "Concept, captation, montage."),
      svc("s3", "Location studio", "Studio podcast Paris 11e.")
    ],
    badges: [bdg("b1", "Spotify Top 50"), bdg("b2", "Paris Podcast Fest")],
    pravatarId: 8
  }
};
const VARIANTS = [
  { id: "essentielle", label: "Essentielle", hint: "L'indispensable" },
  { id: "vitrine", label: "Vitrine", hint: "Tout le potentiel" }
];
const PLAN_LABEL = {
  essentielle: "Essentielle",
  vitrine: "Vitrine"
};
function planRank(p) {
  return p === "essentielle" ? 0 : 1;
}
const SECTION_TIER = {
  // Essentielle
  identity: "essentielle",
  contactEnabled: "essentielle",
  actions: "essentielle",
  vcardEnabled: "essentielle",
  aboutEnabled: "essentielle",
  // Vitrine
  servicesEnabled: "vitrine",
  testimonialsEnabled: "vitrine",
  calendarEnabled: "vitrine",
  languagesEnabled: "vitrine",
  socialsEnabled: "vitrine",
  statsEnabled: "vitrine",
  listingsEnabled: "vitrine",
  videoEnabled: "vitrine",
  ctaEnabled: "vitrine"
};
function isSectionAllowed(plan, key) {
  return planRank(plan) >= planRank(SECTION_TIER[key]);
}
const ALL_OFF = {
  vcardEnabled: false,
  statsEnabled: false,
  aboutEnabled: false,
  videoEnabled: false,
  servicesEnabled: false,
  listingsEnabled: false,
  testimonialsEnabled: false,
  calendarEnabled: false,
  languagesEnabled: false,
  ctaEnabled: false,
  contactEnabled: false,
  socialsEnabled: false
};
function profile(...keys) {
  const f = { ...ALL_OFF, contactEnabled: true, vcardEnabled: true };
  for (const k of keys) f[k] = true;
  return f;
}
function essentielleWith(extra) {
  return profile("aboutEnabled", extra);
}
const VITRINE_ALL = {
  contactEnabled: true,
  vcardEnabled: true,
  aboutEnabled: true,
  statsEnabled: true,
  servicesEnabled: true,
  listingsEnabled: true,
  testimonialsEnabled: true,
  videoEnabled: true,
  calendarEnabled: true,
  languagesEnabled: true,
  ctaEnabled: true,
  socialsEnabled: true
};
const SECTION_PROFILES = {
  Immobilier: {
    essentielle: essentielleWith("statsEnabled"),
    vitrine: VITRINE_ALL
  },
  Juridique: {
    essentielle: essentielleWith("servicesEnabled"),
    vitrine: VITRINE_ALL
  },
  Finance: {
    essentielle: essentielleWith("statsEnabled"),
    vitrine: VITRINE_ALL
  },
  Tech: {
    essentielle: essentielleWith("socialsEnabled"),
    vitrine: VITRINE_ALL
  },
  Santé: {
    essentielle: essentielleWith("calendarEnabled"),
    vitrine: VITRINE_ALL
  },
  Beauté: {
    essentielle: essentielleWith("calendarEnabled"),
    vitrine: VITRINE_ALL
  },
  Coaching: {
    essentielle: essentielleWith("ctaEnabled"),
    vitrine: VITRINE_ALL
  },
  Sport: {
    essentielle: essentielleWith("statsEnabled"),
    vitrine: VITRINE_ALL
  },
  Restauration: {
    essentielle: essentielleWith("socialsEnabled"),
    vitrine: VITRINE_ALL
  },
  Artisanat: {
    essentielle: essentielleWith("servicesEnabled"),
    vitrine: VITRINE_ALL
  },
  Mode: {
    essentielle: essentielleWith("socialsEnabled"),
    vitrine: VITRINE_ALL
  },
  Créatif: {
    essentielle: essentielleWith("listingsEnabled"),
    vitrine: VITRINE_ALL
  },
  Éducation: {
    essentielle: essentielleWith("calendarEnabled"),
    vitrine: VITRINE_ALL
  },
  Voyage: {
    essentielle: essentielleWith("socialsEnabled"),
    vitrine: VITRINE_ALL
  },
  Événementiel: {
    essentielle: essentielleWith("listingsEnabled"),
    vitrine: VITRINE_ALL
  },
  Média: {
    essentielle: essentielleWith("socialsEnabled"),
    vitrine: VITRINE_ALL
  }
};
const DEFAULT_VARIANTS = {
  essentielle: essentielleWith("servicesEnabled"),
  vitrine: VITRINE_ALL
};
function buildPreviewCard(profession, variant = "vitrine") {
  const persona = PERSONAS[profession.id];
  if (!persona) {
    return { ...DEFAULT_CARD, accent: profession.themeId, profession: profession.id };
  }
  const photo = `https://i.pravatar.cc/400?img=${persona.pravatarId}`;
  const variants = SECTION_PROFILES[profession.category] ?? DEFAULT_VARIANTS;
  const sections = variants[variant];
  const listingsActive = !!(sections.listingsEnabled && persona.withListings);
  const listings = listingsActive ? [
    { id: "l1", img: `https://picsum.photos/seed/${profession.id}-1/800/600`, title: "Réalisation 1", meta: "Aperçu", price: "" },
    { id: "l2", img: `https://picsum.photos/seed/${profession.id}-2/800/600`, title: "Réalisation 2", meta: "Aperçu", price: "" },
    { id: "l3", img: `https://picsum.photos/seed/${profession.id}-3/800/600`, title: "Réalisation 3", meta: "Aperçu", price: "" }
  ] : [];
  const ctaEnabled = sections.ctaEnabled && !!(persona.ctaTitle && persona.ctaText);
  return {
    ...DEFAULT_CARD,
    ...sections,
    listingsEnabled: listingsActive,
    ctaEnabled,
    accent: profession.themeId,
    profession: profession.id,
    name: persona.name,
    title: persona.title,
    agency: persona.agency,
    area: persona.area,
    bio: persona.bio,
    stats: persona.stats,
    services: persona.services,
    badges: persona.badges,
    photo,
    listings,
    ctaTitle: persona.ctaTitle ?? DEFAULT_CARD.ctaTitle,
    ctaText: persona.ctaText ?? DEFAULT_CARD.ctaText,
    email: persona.email ?? DEFAULT_CARD.email,
    website: persona.website ?? DEFAULT_CARD.website,
    phone: persona.phone ?? DEFAULT_CARD.phone,
    phoneDisplay: persona.phoneDisplay ?? DEFAULT_CARD.phoneDisplay
  };
}
function buildPreviewFromTheme(themeId) {
  return { ...DEFAULT_CARD, accent: themeId, profession: void 0 };
}
PROFESSIONS.filter((p) => PERSONAS[p.id]);
function BuilderWelcome({
  initialProfessionId,
  initialAccent,
  completedThrough,
  onGoToStep,
  onChooseProfession,
  onChooseTheme
}) {
  const [tab, setTab] = reactExports.useState("profession");
  const [query, setQuery] = reactExports.useState("");
  const [selectedProfession, setSelectedProfession] = reactExports.useState(
    () => PROFESSIONS.find((p) => p.id === initialProfessionId)
  );
  const [selectedThemeId, setSelectedThemeId] = reactExports.useState(
    () => (initialProfessionId ? PROFESSIONS.find((p) => p.id === initialProfessionId)?.themeId ?? initialAccent : initialAccent) ?? "gold"
  );
  const [openCategory, setOpenCategory] = reactExports.useState(
    () => PROFESSIONS.find((p) => p.id === initialProfessionId)?.category ?? null
  );
  const activeTheme = THEMES_BY_ID[selectedThemeId] ?? THEMES_BY_ID.gold;
  const previewData = reactExports.useMemo(() => {
    if (selectedProfession) return buildPreviewCard(selectedProfession, "vitrine");
    return buildPreviewFromTheme(selectedThemeId);
  }, [selectedProfession, selectedThemeId]);
  reactExports.useEffect(() => {
    if (!selectedProfession) return;
    const img = new Image();
    img.src = previewData.photo;
  }, [selectedProfession, previewData.photo]);
  const q = query.trim().toLowerCase();
  const filtered = q ? PROFESSIONS.filter((p) => p.label.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : PROFESSIONS;
  const grouped = PROFESSION_CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((p) => p.category === cat)
  })).filter((g) => g.items.length > 0);
  const handleChoose = () => {
    if (selectedProfession) onChooseProfession(selectedProfession);
    else onChooseTheme(selectedThemeId);
  };
  const handleSkip = () => onChooseTheme(selectedThemeId);
  const nextLabel = selectedProfession ? `Choisir « ${selectedProfession.label} »` : `Continuer avec ${activeTheme.label}`;
  const centerInfo = selectedProfession ? selectedProfession.label : `Thème ${activeTheme.label}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepHeader,
      {
        step: 1,
        title: "Choisissez votre métier",
        subtitle: "Votre carte sera pré-remplie avec un modèle adapté. Vous pourrez tout modifier juste après.",
        completedThrough,
        onGoToStep,
        nextHint: "Après cette étape : remplir les sections essentielles."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-5 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs mb-4 self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTab("profession"),
              className: `px-4 py-2 rounded-md transition ${tab === "profession" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
              children: "Par métier"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTab("theme"),
              className: `px-4 py-2 rounded-md transition ${tab === "theme" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
              children: "Par thème"
            }
          )
        ] }),
        tab === "profession" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Rechercher un métier…",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                className: "pl-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 overflow-y-auto pr-1 space-y-2", children: [
            grouped.map(({ cat, items }) => {
              const isOpen = q ? true : openCategory === cat;
              const selectedInCat = selectedProfession?.category === cat;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setOpenCategory(isOpen && !q ? null : cat),
                    className: `w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left transition ${isOpen ? "bg-muted/40" : "hover:bg-muted/30"}`,
                    "aria-expanded": isOpen,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: cat }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground shrink-0", children: [
                          items.length,
                          " métier",
                          items.length > 1 ? "s" : ""
                        ] }),
                        selectedInCat && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium shrink-0", children: selectedProfession?.label })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: `h-4 w-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`
                        }
                      )
                    ]
                  }
                ),
                isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 border-t border-border", children: items.map((p) => {
                  const theme = THEMES_BY_ID[p.themeId];
                  const active = selectedProfession?.id === p.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedProfession(p);
                        setSelectedThemeId(p.themeId);
                      },
                      className: `relative flex items-center gap-2.5 rounded-lg border p-2.5 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border hover:border-foreground/30"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "h-8 w-8 rounded-md shrink-0 border relative overflow-hidden",
                            style: { background: theme.palette.bg, borderColor: theme.palette.border },
                            "aria-hidden": true,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-sm", style: { background: theme.palette.surface } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full", style: { background: theme.palette.gradient } })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium truncate", children: p.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground truncate", children: [
                            "Thème ",
                            theme.label
                          ] })
                        ] }),
                        active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0", strokeWidth: 3 })
                      ]
                    },
                    p.id
                  );
                }) })
              ] }, cat);
            }),
            grouped.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucun métier ne correspond." })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto pr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CARD_THEMES.map((t) => {
          const active = selectedThemeId === t.id && !selectedProfession;
          const p = t.palette;
          const suggested = PROFESSIONS_BY_THEME[t.id] ?? [];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedProfession(void 0);
                setSelectedThemeId(t.id);
              },
              className: `relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border hover:border-foreground/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "h-10 w-10 rounded-lg shrink-0 border overflow-hidden relative",
                    style: { background: p.bg, borderColor: p.border },
                    "aria-hidden": true,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1.5 rounded-md", style: { background: p.surface } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 right-1 h-3 w-3 rounded-full", style: { background: p.gradient } })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium truncate", children: t.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground truncate", children: suggested.slice(0, 2).map((s2) => s2.label).join(", ") || t.sector })
                ] }),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0", strokeWidth: 3 })
              ]
            },
            t.id
          );
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleSkip,
            className: "w-full text-xs text-muted-foreground hover:text-foreground transition flex items-center justify-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "h-3.5 w-3.5" }),
              " Passer cette étape (commencer avec un thème vide)"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 self-start flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Aperçu live"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: selectedProfession ? "Variante Vitrine — tout le potentiel" : "Met à jour à chaque sélection" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 -z-10 blur-3xl opacity-40 transition-all duration-500",
              style: { background: activeTheme.palette.gradient },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data: previewData }) }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepFooter,
      {
        step: 1,
        onNext: handleChoose,
        nextLabel,
        centerInfo: `Sélection : ${centerInfo}`
      }
    )
  ] });
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuRadioGroup = RadioGroup2;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const ESSENTIALS = [
  { key: "identity", brick: "identity", label: "Identité", description: "Nom, titre, photo et couverture — toujours visible.", recommended: true },
  { key: "actions", brick: "actions", label: "Boutons d'action", description: "Appeler, WhatsApp, email, site — accès rapide en un tap.", recommended: true },
  { key: "vcardEnabled", brick: "vcard", label: "Ajouter au répertoire (vCard)", description: "Un bouton pour s'enregistrer dans les contacts.", recommended: true },
  { key: "aboutEnabled", brick: "about", label: "À propos", description: "Bio courte et badges de certification.", recommended: true },
  { key: "contactEnabled", brick: "contact", label: "Contact", description: "Téléphone, email et site web — l'essentiel pour être joignable.", recommended: true }
];
const EXTRAS = [
  { key: "socialsEnabled", brick: "socials", label: "Réseaux sociaux", description: "LinkedIn, Instagram, WhatsApp public.", popular: true },
  { key: "servicesEnabled", brick: "services", label: "Services", description: "Liste de vos prestations ou spécialités.", popular: true },
  { key: "testimonialsEnabled", brick: "testimonials", label: "Témoignages", description: "Avis clients pour rassurer.", popular: true },
  { key: "statsEnabled", brick: "stats", label: "Chiffres clés", description: "Années d'expérience, projets, note clients." },
  { key: "listingsEnabled", brick: "listings", label: "Réalisations / biens", description: "Vitrine visuelle de vos projets ou produits." },
  { key: "videoEnabled", brick: "video", label: "Vidéo de présentation", description: "Une vidéo YouTube intégrée." },
  { key: "calendarEnabled", brick: "calendar", label: "Prise de rendez-vous", description: "Lien Calendly ou équivalent." },
  { key: "ctaEnabled", brick: "cta", label: "Bannière d'appel à l'action", description: "Message + bouton pour convertir." },
  { key: "languagesEnabled", brick: "languages", label: "Langues parlées", description: "Pratique pour un public international." }
];
function isEnabled(data, key) {
  if (key === "identity") return true;
  if (key === "actions") {
    return data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
  }
  return Boolean(data[key]);
}
function applyToggle(data, key, value) {
  if (key === "identity") return data;
  if (key === "actions") {
    if (!value) return { ...data, actions: { call: false, whatsapp: false, email: false, website: false } };
    const anyOn = data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
    return {
      ...data,
      actions: anyOn ? data.actions : { call: true, whatsapp: true, email: true, website: true }
    };
  }
  return { ...data, [key]: value };
}
function sectionTier(key) {
  return SECTION_TIER[key] ?? "essentielle";
}
function sectionAllowed(plan, key) {
  return isSectionAllowed(plan, key);
}
function BuilderSections({ step, data, setData, update, plan, setPlan, completedThrough, onGoToStep, onBack, onNext }) {
  const isEssentials = step === "essentials";
  const defs = isEssentials ? ESSENTIALS : [...EXTRAS].sort((a, b) => planRank(sectionTier(a.key)) - planRank(sectionTier(b.key)));
  const [openSet, setOpenSet] = reactExports.useState(() => {
    const s2 = /* @__PURE__ */ new Set();
    if (isEssentials) s2.add("identity");
    for (const d of defs) if (isEnabled(data, d.key)) s2.add(d.key);
    return s2;
  });
  const [pendingUpgrade, setPendingUpgrade] = reactExports.useState(null);
  const phoneRef = reactExports.useRef(null);
  const scrollPhoneToBrick = (brick) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = phoneRef.current;
        if (!root) return;
        const target = root.querySelector(`[data-brick="${brick}"]`);
        const scroller = root.querySelector(".overflow-y-auto");
        if (!target || !scroller) return;
        const targetTop = target.offsetTop - 16;
        scroller.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
        target.classList.add("brick-flash");
        window.setTimeout(() => target.classList.remove("brick-flash"), 2200);
      });
    });
  };
  const toggleEnabled = (key, value) => {
    setData(applyToggle(data, key, value));
    setOpenSet((prev) => {
      const n = new Set(prev);
      if (value) n.add(key);
      else n.delete(key);
      return n;
    });
    if (value) {
      const brick = defs.find((d) => d.key === key)?.brick;
      if (brick) scrollPhoneToBrick(brick);
    }
  };
  const toggleOpen = (key) => {
    setOpenSet((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };
  const upgradeAndActivate = (key) => {
    const tier = sectionTier(key);
    setPlan(tier);
    setData(applyToggle(data, key, true));
    setOpenSet((prev) => new Set(prev).add(key));
    setPendingUpgrade(null);
    const def = defs.find((d) => d.key === key);
    toast.success(`Plan passé à ${PLAN_LABEL[tier]}. ${def?.label ?? "Section"} activée.`);
    if (def?.brick) scrollPhoneToBrick(def.brick);
  };
  const changePlan = (next) => {
    if (next === plan) return;
    let nextData = data;
    if (planRank(next) < planRank(plan)) {
      const toDisable = [
        ...ESSENTIALS.map((d) => d.key),
        ...EXTRAS.map((d) => d.key)
      ];
      for (const k of toDisable) {
        if (!sectionAllowed(next, k) && isEnabled(nextData, k)) {
          nextData = applyToggle(nextData, k, false);
        }
      }
    }
    setData(nextData);
    setPlan(next);
    toast.success(`Plan passé à ${PLAN_LABEL[next]}.`);
  };
  const activeTheme = THEMES_BY_ID[data.accent] ?? THEMES_BY_ID.gold;
  const previewData = data;
  const allDefs = [...ESSENTIALS, ...EXTRAS];
  const allowedDefs = allDefs.filter((d) => sectionAllowed(plan, d.key));
  const activeAllowed = allowedDefs.filter((d) => isEnabled(data, d.key)).length;
  const totalAllowed = allowedDefs.length;
  const stepNum = isEssentials ? 2 : 3;
  const heading = isEssentials ? "Remplissez les sections essentielles" : "Ajoutez des sections complémentaires";
  const intro = isEssentials ? "Ce que toute carte de visite digitale doit contenir. Activez et remplissez les champs — l'aperçu se met à jour en direct." : "Enrichissez votre carte avec ce qui vous différencie. Les sections grisées nécessitent un plan supérieur.";
  const nextHint = isEssentials ? "Après cette étape : ajouter des sections complémentaires." : "Après cette étape : personnaliser et activer votre carte.";
  const nextLabel = isEssentials ? "Continuer" : "Personnaliser ma carte";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepHeader,
      {
        step: stepNum,
        title: heading,
        subtitle: intro,
        completedThrough,
        onGoToStep,
        nextHint
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col min-h-0", children: [
        !isEssentials && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlanBanner,
          {
            plan,
            onChange: changePlan,
            activeCount: activeAllowed,
            totalCount: totalAllowed
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-4", children: defs.map((d) => {
          const checked = isEnabled(data, d.key);
          const locked = d.key === "identity";
          const allowed = sectionAllowed(plan, d.key);
          const tier = sectionTier(d.key);
          const open = openSet.has(d.key) && checked && allowed;
          const upgrading = pendingUpgrade === d.key;
          if (!allowed) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              LockedSection,
              {
                def: d,
                requiredPlan: tier,
                expanded: upgrading,
                onAskUpgrade: () => setPendingUpgrade(upgrading ? null : d.key),
                onConfirmUpgrade: () => upgradeAndActivate(d.key)
              },
              d.key
            );
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-2xl border bg-card overflow-hidden transition ${checked ? "border-primary/40" : "border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => checked && toggleOpen(d.key),
                      className: "flex-1 min-w-0 text-left disabled:cursor-default",
                      disabled: !checked,
                      "aria-expanded": open,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: d.label }),
                          d.recommended && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: "Recommandé" }),
                          d.popular && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-2.5 w-2.5" }),
                            " Populaire"
                          ] }),
                          locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded", children: "Obligatoire" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: d.description })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex items-center gap-2 pt-0.5", children: [
                    checked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleOpen(d.key),
                        "aria-label": open ? "Replier" : "Déplier",
                        className: "h-8 w-8 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ChevronDown,
                          {
                            className: `h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`,
                            "aria-hidden": true
                          }
                        )
                      }
                    ),
                    locked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", strokeWidth: 3 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked,
                        onCheckedChange: (v) => toggleEnabled(d.key, v),
                        "aria-label": `Activer ${d.label}`
                      }
                    )
                  ] })
                ] }),
                open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-5 pt-1 border-t border-border/60", children: renderBrickBody(d.brick, { data, update }) })
              ]
            },
            d.key
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Aperçu live"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Met à jour à chaque saisie" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: phoneRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 -z-10 blur-3xl opacity-40 transition-all duration-500",
              style: { background: activeTheme.palette.gradient },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data: previewData }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepFooter,
      {
        step: stepNum,
        onBack,
        onNext,
        nextLabel,
        centerInfo: `Plan ${PLAN_LABEL[plan]} — ${activeAllowed} / ${totalAllowed} sections actives`
      }
    )
  ] });
}
function planIcon(p) {
  if (p === "vitrine") return /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3.5 w-3.5" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" });
}
function PlanBanner({
  plan,
  onChange,
  activeCount,
  totalCount
}) {
  const nextPlan = plan === "essentielle" ? "vitrine" : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-primary/5 p-3 flex flex-wrap items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/15 border border-primary/30 rounded-full px-2.5 py-1", children: [
      planIcon(plan),
      " Plan : ",
      PLAN_LABEL[plan]
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
        activeCount,
        " / ",
        totalCount
      ] }),
      " sections débloquées",
      nextPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " — passez à ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: PLAN_LABEL[nextPlan] }),
        " pour plus"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "h-8", children: [
        "Changer de plan ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 ml-1" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Choisir un plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioGroup, { value: plan, onValueChange: (v) => onChange(v), children: VARIANTS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuRadioItem, { value: v.id, className: "flex-col items-start gap-0.5 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm font-medium", children: [
            planIcon(v.id),
            " ",
            v.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground pl-5", children: v.hint })
        ] }, v.id)) })
      ] })
    ] }) })
  ] });
}
function LockedSection({
  def,
  requiredPlan,
  expanded,
  onAskUpgrade,
  onConfirmUpgrade
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 overflow-hidden transition", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onAskUpgrade,
        className: "w-full flex items-start gap-3 p-4 text-left hover:bg-muted/30 transition",
        "aria-expanded": expanded,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 opacity-70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: def.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded", children: [
                planIcon(requiredPlan),
                " ",
                PLAN_LABEL[requiredPlan]
              ] }),
              def.popular && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-2.5 w-2.5" }),
                " Populaire"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: def.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-full bg-muted text-muted-foreground grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }) }) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-2 border-t border-border/60 bg-background/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          "« ",
          def.label,
          " »"
        ] }),
        " fait partie du plan",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: PLAN_LABEL[requiredPlan] }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        "Passez à ",
        PLAN_LABEL[requiredPlan],
        " pour activer cette section. Vous pourrez aussi débloquer les autres sections de ce plan."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: onConfirmUpgrade, children: [
          planIcon(requiredPlan),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5", children: [
            "Passer à ",
            PLAN_LABEL[requiredPlan],
            " et activer"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: onAskUpgrade, children: "Annuler" })
      ] })
    ] })
  ] });
}
const STEP_NUM = {
  welcome: 1,
  essentials: 2,
  extras: 3,
  edit: 4
};
const NUM_STEP = {
  1: "welcome",
  2: "essentials",
  3: "extras",
  4: "edit"
};
function BuilderPage() {
  const {
    data,
    setData,
    update,
    hydrated
  } = useCardStore();
  const [step, setStep] = reactExports.useState("welcome");
  const [plan, setPlan] = reactExports.useState("vitrine");
  const [completedThrough, setCompletedThrough] = reactExports.useState(1);
  const advanceTo = (next) => {
    const n = STEP_NUM[next];
    setCompletedThrough((c) => n > c ? n : c);
    setStep(next);
  };
  const goToStep = (n) => {
    if (n > completedThrough) return;
    if (n === 2 && !data.profession) {
      setStep("welcome");
      return;
    }
    setStep(NUM_STEP[n]);
  };
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background grid place-items-center text-muted-foreground", children: "Chargement…" });
  }
  if (step === "welcome") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BuilderWelcome, { initialProfessionId: data.profession, initialAccent: data.accent, completedThrough, onGoToStep: goToStep, onChooseProfession: (p) => {
      update("profession", p.id);
      update("accent", p.themeId);
      setData(buildPreviewCard(p, "essentielle"));
      setPlan("essentielle");
      advanceTo("essentials");
    }, onChooseTheme: (themeId) => {
      setData(buildPreviewFromTheme(themeId));
      advanceTo("essentials");
    } });
  }
  if (step === "essentials") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BuilderSections, { step: "essentials", data, setData, update, plan, setPlan, completedThrough, onGoToStep: goToStep, onBack: () => setStep("welcome"), onNext: () => advanceTo("extras") });
  }
  if (step === "extras") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BuilderSections, { step: "extras", data, setData, update, plan, setPlan, completedThrough, onGoToStep: goToStep, onBack: () => setStep("essentials"), onNext: () => advanceTo("edit") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessStep, { data, completedThrough, goToStep, onEditAgain: () => setStep("extras") });
}
function SuccessStep({
  data,
  completedThrough,
  goToStep,
  onEditAgain
}) {
  const {
    user
  } = useAuthStore();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2600);
    return () => clearTimeout(t);
  }, []);
  function handleActivate() {
    if (user) {
      navigate({
        to: "/pricing"
      });
    } else {
      navigate({
        to: "/inscription",
        search: {
          redirect: "/pricing"
        }
      });
    }
  }
  const recap = reactExports.useMemo(() => {
    const bricks = 1 + // identity
    (data.actions ? 1 : 0) + (data.vcardEnabled ? 1 : 0) + (data.statsEnabled ? 1 : 0) + (data.aboutEnabled ? 1 : 0) + (data.videoEnabled ? 1 : 0) + (data.servicesEnabled ? 1 : 0) + (data.listingsEnabled ? 1 : 0) + (data.testimonialsEnabled ? 1 : 0) + (data.calendarEnabled ? 1 : 0) + (data.languagesEnabled ? 1 : 0) + (data.ctaEnabled ? 1 : 0) + (data.contactEnabled ? 1 : 0) + (data.socialsEnabled ? 1 : 0);
    const socials = [data.linkedin, data.instagram, data.whatsappSocial].filter(Boolean).length;
    return {
      bricks,
      services: data.servicesEnabled ? data.services.length : 0,
      testimonials: data.testimonialsEnabled ? data.testimonials.length : 0,
      socials,
      badges: data.aboutEnabled ? data.badges.length : 0
    };
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground relative overflow-hidden", children: [
    showConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { step: 4, title: "Félicitations, votre carte est prête !", subtitle: "Activez-la maintenant pour obtenir votre lien public, votre QR code et l'accès à votre dashboard.", completedThrough, onGoToStep: goToStep, nextHint: "Dernière étape : activer votre carte." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium animate-scale-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Carte créée avec succès"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl leading-tight", children: [
          "Bravo ",
          data.name?.split(" ")[0] || "!",
          " — votre carte est",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "prête à être activée." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Vous venez de créer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecapStat, { value: recap.bricks, label: "briques" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecapStat, { value: recap.services, label: recap.services > 1 ? "services" : "service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecapStat, { value: recap.testimonials, label: "témoignages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecapStat, { value: recap.socials + recap.badges, label: "liens & badges" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/[0.06]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Votre carte est en attente d'activation." }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Les brouillons non activés sont automatiquement supprimés après 24 h pour libérer de la place." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2.5", children: "En activant, vous débloquez" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: ["Votre lien public partageable (NomPrénom.cards)", "Votre QR code haute définition à imprimer", "L'accès à votre dashboard pour tout modifier", "Les statistiques de vues, clics et contacts"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t })
          ] }, t)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-3 rounded-lg bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: ["A", "M", "L"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xs grid place-items-center border-2 border-background font-medium", children: c }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-0.5", children: [
              Array.from({
                length: 5
              }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }, i)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-medium", children: "4,9/5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              " +2 400 pros ont déjà activé leur carte"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "w-full text-base h-14 shadow-[var(--shadow-elegant)] group", onClick: handleActivate, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-5 w-5 mr-2 transition-transform group-hover:-translate-y-0.5" }),
            "Activer ma carte — 7 jours gratuits",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-primary" }),
              " 0 € aujourd'hui"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sans engagement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Annulable en 1 clic" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onEditAgain, className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition", children: "Je veux encore modifier ma carte" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-primary text-center", children: "Votre carte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-xl border border-border bg-card p-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-16 w-16 shrink-0 rounded-lg bg-muted grid place-items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-10 w-10 text-foreground/30 blur-[2px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-background/40 backdrop-blur-[2px] rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-primary" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "QR code & lien public" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Déverrouillés à l'activation" })
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
}
function RecapStat({
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl tabular-nums text-primary", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label })
  ] });
}
function Confetti() {
  const pieces = Array.from({
    length: 60
  });
  const colors = ["oklch(0.78 0.18 25)", "oklch(0.82 0.16 80)", "oklch(0.7 0.18 200)", "oklch(0.75 0.18 150)", "oklch(0.7 0.2 320)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 z-50 overflow-hidden", "aria-hidden": true, children: [
    pieces.map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 1.6 + Math.random() * 1.4;
      const rotate = Math.random() * 360;
      const color = colors[i % colors.length];
      const size = 6 + Math.random() * 6;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        position: "absolute",
        top: "-20px",
        left: `${left}%`,
        width: size,
        height: size * 0.4,
        background: color,
        transform: `rotate(${rotate}deg)`,
        animation: `confettiFall ${duration}s ${delay}s linear forwards`,
        borderRadius: 2
      } }, i);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      ` })
  ] });
}
export {
  BuilderPage as component
};
