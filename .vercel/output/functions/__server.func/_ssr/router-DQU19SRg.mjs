import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DoFfBC_4.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { S as Sparkles, Z as Zap, L as LayoutDashboard, a as LogOut } from "../_libs/lucide-react.mjs";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-DQfgycwO.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$m = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OneTap — Carte de visite digitale NFC" },
      { name: "description", content: "Crée ta carte de visite digitale et partage tes contacts en 1 tap. Gratuit, sans application." },
      { property: "og:title", content: "OneTap — Carte de visite digitale NFC" },
      { property: "og:description", content: "Crée ta carte de visite digitale et partage tes contacts en 1 tap. Gratuit, sans application." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://convert-your-card.vercel.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OneTap — Carte de visite digitale NFC" },
      { name: "twitter:description", content: "Crée ta carte de visite digitale et partage tes contacts en 1 tap. Gratuit, sans application." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://js.stripe.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$m.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$l = () => import("./templates-CRPGHsNy.mjs");
const Route$l = createFileRoute("/templates")({
  head: () => ({
    meta: [{
      title: "Modèles de cartes de visite digitales par secteur — OneTap"
    }, {
      name: "description",
      content: "Plus de 40 modèles de cartes de visite digitales prêts à l'emploi : immobilier, restauration, santé, BTP, beauté, conseil, avocat, photographe… Trouvez la carte qui ressemble à votre métier."
    }, {
      property: "og:title",
      content: "Modèles de cartes digitales par secteur — OneTap"
    }, {
      property: "og:description",
      content: "Découvrez tous les modèles OneTap classés par métier. Sélectionnez le vôtre et personnalisez-le en 3 minutes."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:url",
      content: "/templates"
    }],
    links: [{
      rel: "canonical",
      href: "/templates"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./pricing-Dm3OCGyR.mjs");
const Route$k = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Activer ma carte — Choisissez votre plan"
    }, {
      name: "description",
      content: "Activez votre carte de visite digitale dès aujourd'hui. Essai gratuit 7 jours sur le plan Vitrine. Sans engagement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./onboarding-BTU5dmpx.mjs");
const Route$j = createFileRoute("/onboarding")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./offres-BTU5dmpx.mjs");
const Route$i = createFileRoute("/offres")({
  beforeLoad: () => {
    throw redirect({
      to: "/pricing"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./inscription-BFsOu0JM.mjs");
const Route$h = createFileRoute("/inscription")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./dashboard-DpDWdcqs.mjs");
const Route$g = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./connexion-CCEaGuxk.mjs");
const Route$f = createFileRoute("/connexion")({
  head: () => ({
    meta: [{
      title: "Connexion — OneTap"
    }, {
      name: "description",
      content: "Connecte-toi à ton compte OneTap."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./carte-physique-DfSWLfUo.mjs");
const Route$e = createFileRoute("/carte-physique")({
  head: () => ({
    meta: [{
      title: "Ajoute ta carte NFC physique — OneTap"
    }, {
      name: "description",
      content: "Personnalise ta carte de visite NFC physique : couleur, finition, logo et nom. Une commande unique, livrée chez toi."
    }, {
      property: "og:title",
      content: "Ajoute ta carte NFC physique — OneTap"
    }, {
      property: "og:description",
      content: "Carte NFC personnalisable, livrée chez toi. Paiement unique, en complément de ton abonnement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./builder-CSVUqxS7.mjs");
const Route$d = createFileRoute("/builder")({
  head: () => ({
    meta: [{
      title: "Builder — Carte de visite digitale"
    }, {
      name: "description",
      content: "Construisez votre carte de visite digitale brique par brique, avec aperçu mobile en direct."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./bienvenue-v4OKp_sk.mjs");
const Route$c = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [{
      title: "Bienvenue sur OneTap !"
    }, {
      name: "description",
      content: "Votre abonnement est confirmé."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitNotFoundComponentImporter = () => import("../_slug-BhOyhXoM.mjs");
const $$splitComponentImporter$b = () => import("../_slug-KFSge0Y7.mjs");
const getProfile = createServerFn({
  method: "GET"
}).validator((slug) => slug).handler(createSsrRpc("3abe21163060cdaebf0fca822dbccd0e90b15179a021cd21c9f2b19df9296d49"));
const Route$b = createFileRoute("/$slug")({
  loader: async ({
    params
  }) => {
    const profile = await getProfile({
      data: params.slug
    });
    if (!profile) throw notFound();
    return {
      profile
    };
  },
  head: ({
    loaderData
  }) => {
    const p = loaderData?.profile;
    if (!p) return {};
    return {
      meta: [{
        title: `${p.nom} — ${p.fonction || "Carte de visite digitale"}`
      }, {
        name: "description",
        content: p.bio ?? `Découvrez la carte de visite digitale de ${p.nom}`
      }, {
        property: "og:title",
        content: p.nom
      }, {
        property: "og:description",
        content: p.bio ?? `${p.nom} · ${p.entreprise}`
      }, ...p.photo_url ? [{
        property: "og:image",
        content: p.photo_url
      }] : []]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
function getTimeLeft() {
  const now = /* @__PURE__ */ new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 36e5);
  const m = Math.floor(diff % 36e5 / 6e4);
  const s = Math.floor(diff % 6e4 / 1e3);
  return { h, m, s };
}
function Countdown() {
  const [t, setT] = reactExports.useState(getTimeLeft());
  reactExports.useEffect(() => {
    const i = setInterval(() => setT(getTimeLeft()), 1e3);
    return () => clearInterval(i);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 font-mono font-bold tabular-nums", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-foreground/10 px-2 py-1 rounded-md", children: [
      pad(t.h),
      "h"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-foreground/10 px-2 py-1 rounded-md", children: [
      pad(t.m),
      "m"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-foreground/10 px-2 py-1 rounded-md", children: [
      pad(t.s),
      "s"
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./index-BUeOnGsI.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "OneTap · Carte de visite digitale à 19,80€ — Partagez vos contacts en 1 tap"
    }, {
      name: "description",
      content: "Créez votre carte de visite digitale professionnelle en 3 minutes. Partagez vos coordonnées, réseaux et site en un seul tap. À partir de 19,80€. Sans abonnement."
    }, {
      property: "og:title",
      content: "OneTap · La carte de visite digitale qui convertit"
    }, {
      property: "og:description",
      content: "Partagez vos contacts en 1 tap. À partir de 19,80€. Sans abonnement, mises à jour illimitées."
    }, {
      property: "og:type",
      content: "product"
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
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
const $$splitComponentImporter$9 = () => import("./inscription.index-DV6ROvR1.mjs");
const Route$9 = createFileRoute("/inscription/")({
  head: () => ({
    meta: [{
      title: "Inscription gratuite — OneTap"
    }, {
      name: "description",
      content: "Crée ton compte OneTap gratuitement et lance ta carte de visite digitale en quelques secondes."
    }, {
      property: "og:title",
      content: "Inscription gratuite — OneTap"
    }, {
      property: "og:description",
      content: "Rejoins +2 400 pros qui partagent leurs contacts en 1 tap."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-CUTOwSnF.mjs");
const Route$8 = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-BGYaeheg.mjs");
const Route$7 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./inscription.selection-de-plan-DX3WJlWM.mjs");
const Route$6 = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [{
      title: "Choisis ton forfait — OneTap"
    }, {
      name: "description",
      content: "Trouve le forfait OneTap : Free, Starter, Pro ou Premium. Essai gratuit 7 jours."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./inscription.carte-physique-DfSWLfUo.mjs");
const Route$5 = createFileRoute("/inscription/carte-physique")({
  head: () => ({
    meta: [{
      title: "Ajoute ta carte NFC physique — OneTap"
    }, {
      name: "description",
      content: "Personnalise ta carte de visite NFC physique : couleur, finition, logo et nom. Une commande unique, livrée chez toi."
    }, {
      property: "og:title",
      content: "Ajoute ta carte NFC physique — OneTap"
    }, {
      property: "og:description",
      content: "Carte NFC personnalisable, livrée chez toi. Paiement unique, en complément de ton abonnement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./statistiques-Ci-Iz6yC.mjs");
const Route$4 = createFileRoute("/dashboard/statistiques")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./modeles-BTU5dmpx.mjs");
const Route$3 = createFileRoute("/dashboard/modeles")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./carte-qU7akGfY.mjs");
const Route$2 = createFileRoute("/dashboard/carte")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./abonnement-DRz4GLT-.mjs");
const Route$1 = createFileRoute("/dashboard/abonnement")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./inscription.offre._plan-BNJeeZez.mjs");
const Route = createFileRoute("/inscription/offre/$plan")({
  validateSearch: objectType({
    billing: enumType(["monthly", "annual"]).default("monthly")
  }),
  head: ({
    params
  }) => ({
    meta: [{
      title: `Offre ${params.plan} — OneTap`
    }, {
      name: "description",
      content: "Abonne-toi à OneTap et lance ta carte de visite digitale."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TemplatesRoute = Route$l.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$m
});
const PricingRoute = Route$k.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$m
});
const OnboardingRoute = Route$j.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$m
});
const OffresRoute = Route$i.update({
  id: "/offres",
  path: "/offres",
  getParentRoute: () => Route$m
});
const InscriptionRoute = Route$h.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$m
});
const DashboardRoute = Route$g.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$m
});
const ConnexionRoute = Route$f.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$m
});
const CartePhysiqueRoute = Route$e.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => Route$m
});
const BuilderRoute = Route$d.update({
  id: "/builder",
  path: "/builder",
  getParentRoute: () => Route$m
});
const BienvenueRoute = Route$c.update({
  id: "/bienvenue",
  path: "/bienvenue",
  getParentRoute: () => Route$m
});
const SlugRoute = Route$b.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => Route$m
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$m
});
const InscriptionIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => InscriptionRoute
});
const DashboardIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const AdminIndexRoute = Route$7.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$m
});
const InscriptionSelectionDePlanRoute = Route$6.update({
  id: "/selection-de-plan",
  path: "/selection-de-plan",
  getParentRoute: () => InscriptionRoute
});
const InscriptionCartePhysiqueRoute = Route$5.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => InscriptionRoute
});
const DashboardStatistiquesRoute = Route$4.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => DashboardRoute
});
const DashboardModelesRoute = Route$3.update({
  id: "/modeles",
  path: "/modeles",
  getParentRoute: () => DashboardRoute
});
const DashboardCarteRoute = Route$2.update({
  id: "/carte",
  path: "/carte",
  getParentRoute: () => DashboardRoute
});
const DashboardAbonnementRoute = Route$1.update({
  id: "/abonnement",
  path: "/abonnement",
  getParentRoute: () => DashboardRoute
});
const InscriptionOffrePlanRoute = Route.update({
  id: "/offre/$plan",
  path: "/offre/$plan",
  getParentRoute: () => InscriptionRoute
});
const DashboardRouteChildren = {
  DashboardAbonnementRoute,
  DashboardCarteRoute,
  DashboardModelesRoute,
  DashboardStatistiquesRoute,
  DashboardIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const InscriptionRouteChildren = {
  InscriptionCartePhysiqueRoute,
  InscriptionSelectionDePlanRoute,
  InscriptionIndexRoute,
  InscriptionOffrePlanRoute
};
const InscriptionRouteWithChildren = InscriptionRoute._addFileChildren(
  InscriptionRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  SlugRoute,
  BienvenueRoute,
  BuilderRoute,
  CartePhysiqueRoute,
  ConnexionRoute,
  DashboardRoute: DashboardRouteWithChildren,
  InscriptionRoute: InscriptionRouteWithChildren,
  OffresRoute,
  OnboardingRoute,
  PricingRoute,
  TemplatesRoute,
  AdminIndexRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Countdown as C,
  Footer as F,
  Nav as N,
  PromoBar as P,
  Route$b as R,
  Route as a,
  router as r
};
