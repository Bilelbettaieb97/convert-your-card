import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-C9SqMR3K.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { U as Users, C as CreditCard, B as Building2, M as Mail, a as Crown, E as Ellipsis, S as Shield, K as Key, G as Globe, D as Download, T as Trash2, b as ShoppingBag, c as CircleCheck, d as Truck, P as Package, F as FileText, e as Bell, f as CheckCheck, g as Circle, A as ArrowRight, h as Search, i as BookOpen, j as Play, k as MessageCircle, l as Check, m as Eye, n as MousePointerClick, o as Save, p as TrendingUp, q as Smartphone, r as UserPlus, Q as QrCode, s as Sparkles, Z as Zap, L as LayoutDashboard, t as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-D-AliS8e.css";
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
const Route$E = createRootRouteWithContext()({
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
  const { queryClient } = Route$E.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
const $$splitComponentImporter$v = () => import("./templates-CwMY2sbW.mjs");
const Route$D = createFileRoute("/templates")({
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
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./pricing-BVZWsM_H.mjs");
const Route$C = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Activer ma carte — Choisissez votre plan"
    }, {
      name: "description",
      content: "Activez votre carte de visite digitale dès aujourd'hui. Essai gratuit 7 jours sur le plan Vitrine. Sans engagement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./onboarding-BTU5dmpx.mjs");
const Route$B = createFileRoute("/onboarding")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./offres-BTU5dmpx.mjs");
const Route$A = createFileRoute("/offres")({
  beforeLoad: () => {
    throw redirect({
      to: "/pricing"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./inscription-BFsOu0JM.mjs");
const Route$z = createFileRoute("/inscription")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./dashboard-CtM1Uzlb.mjs");
const Route$y = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — Ma carte digitale"
    }, {
      name: "description",
      content: "Personnalisez, partagez et suivez votre carte de visite digitale."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./connexion-BpWeurxd.mjs");
const Route$x = createFileRoute("/connexion")({
  head: () => ({
    meta: [{
      title: "Connexion — OneTap"
    }, {
      name: "description",
      content: "Connecte-toi à ton compte OneTap."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./carte-physique-DfSWLfUo.mjs");
const Route$w = createFileRoute("/carte-physique")({
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
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./builder-lrtkMB3S.mjs");
const Route$v = createFileRoute("/builder")({
  head: () => ({
    meta: [{
      title: "Builder — Carte de visite digitale"
    }, {
      name: "description",
      content: "Construisez votre carte de visite digitale brique par brique, avec aperçu mobile en direct."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./bienvenue-CT3RWrpi.mjs");
const Route$u = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [{
      title: "Bienvenue sur OneTap !"
    }, {
      name: "description",
      content: "Votre abonnement est confirmé."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
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
const $$splitComponentImporter$l = () => import("../_slug-CuIH7OJs.mjs");
const getProfile = createServerFn({
  method: "GET"
}).validator((slug) => slug).handler(createSsrRpc("3abe21163060cdaebf0fca822dbccd0e90b15179a021cd21c9f2b19df9296d49"));
const Route$t = createFileRoute("/$slug")({
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
  component: lazyRouteComponent($$splitComponentImporter$l, "component"),
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
const $$splitComponentImporter$k = () => import("./index-C_R9AoDM.mjs");
const Route$s = createFileRoute("/")({
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
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
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
const $$splitComponentImporter$j = () => import("./inscription.index-B5i13864.mjs");
const Route$r = createFileRoute("/inscription/")({
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
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./index-Cxa2P1Re.mjs");
const Route$q = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./index-CJ29MzqT.mjs");
const Route$p = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./inscription.selection-de-plan-B_abmcOh.mjs");
const Route$o = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [{
      title: "Choisis ton forfait — OneTap"
    }, {
      name: "description",
      content: "Trouve le forfait OneTap : Free, Starter, Pro ou Premium. Essai gratuit 7 jours."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./inscription.carte-physique-DfSWLfUo.mjs");
const Route$n = createFileRoute("/inscription/carte-physique")({
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
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./theme-swUkUeIg.mjs");
const Route$m = createFileRoute("/dashboard/theme")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Route$l = createFileRoute("/dashboard/team")({
  head: () => ({ meta: [{ title: "Équipe — Dashboard" }] }),
  component: TeamPage
});
const MEMBERS = [
  { id: "1", name: "Vous (Admin)", email: "", role: "Admin", cards: 1, status: "Actif" },
  { id: "2", name: "Camille Dubois", email: "camille@studio.fr", role: "Membre", cards: 1, status: "Actif" },
  { id: "3", name: "Marc Lopez", email: "marc@studio.fr", role: "Membre", cards: 1, status: "Actif" },
  { id: "4", name: "Julie Bernard", email: "julie@studio.fr", role: "Invité", cards: 0, status: "Invitation envoyée" }
];
function TeamPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
      { l: "Membres", v: MEMBERS.length, sub: "1 admin · 3 membres", icon: Users },
      { l: "Cartes synchronisées", v: MEMBERS.reduce((s, m) => s + m.cards, 0), sub: "Branding équipe", icon: CreditCard },
      { l: "Plan", v: "Business", sub: "Jusqu'à 25 membres", icon: Building2 }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: s.sub })
      ] })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-2", children: "Inviter un membre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Il recevra un email avec un lien d'inscription et sa carte sera commandée automatiquement." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "email@société.fr", className: "pl-10 h-11" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-11", children: "Envoyer l'invitation" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display", children: [
          "Membres (",
          MEMBERS.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Gérer les permissions" })
      ] }),
      MEMBERS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 grid place-items-center text-sm font-semibold", children: m.name.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium flex items-center gap-2", children: [
            m.name,
            m.role === "Admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: m.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: m.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground hidden md:block w-32", children: m.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) })
      ] }, m.id))
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./style-CSiHnpBB.mjs");
const Route$k = createFileRoute("/dashboard/style")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./statistiques-BXt1FwZ5.mjs");
const Route$j = createFileRoute("/dashboard/statistiques")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./share-qQSAcE1z.mjs");
const Route$i = createFileRoute("/dashboard/share")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
let cachedUser = null;
let cachedSession = null;
let isLoading = true;
const listeners = /* @__PURE__ */ new Set();
function notify() {
  listeners.forEach((fn) => fn());
}
supabase.auth.getSession().then(({ data }) => {
  cachedSession = data.session;
  cachedUser = data.session?.user ?? null;
  isLoading = false;
  notify();
});
supabase.auth.onAuthStateChange((_event, session) => {
  cachedSession = session;
  cachedUser = session?.user ?? null;
  isLoading = false;
  notify();
});
function useAuthStore() {
  const [, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const rerender = () => setTick((t) => t + 1);
    listeners.add(rerender);
    return () => {
      listeners.delete(rerender);
    };
  }, []);
  return {
    user: cachedUser,
    session: cachedSession,
    loading: isLoading
  };
}
const Route$h = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Paramètres — Dashboard" }] }),
  component: SettingsPage
});
function SettingsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  async function handlePasswordChange(e) {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast.error("8 caractères minimum");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else {
      toast.success("Mot de passe mis à jour");
      setNewPassword("");
      setCurrentPassword("");
    }
  }
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Profil", desc: "Vos informations personnelles", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: user?.email ?? "", readOnly: true, className: "bg-muted/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, children: "Modifier l'email (bientôt disponible)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Sécurité", desc: "Mot de passe et authentification", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePasswordChange, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block", children: "Mot de passe actuel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "••••••••", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block", children: "Nouveau mot de passe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "8 caractères minimum", value: newPassword, onChange: (e) => setNewPassword(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Mettre à jour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { icon: Shield, label: "Authentification à deux facteurs", sub: "Recevez un code par SMS à chaque connexion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { icon: Key, label: "Sessions sur tous les appareils", sub: "Déconnectez-vous partout" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Langue & région", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block", children: "Langue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "Français" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block", children: "Fuseau horaire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "Europe/Paris" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { icon: Globe, label: "Carte publique en anglais aussi", sub: "Détection auto selon le navigateur du visiteur" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Données & confidentialité", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionRow, { icon: Download, label: "Exporter mes données", desc: "Téléchargez toutes vos données au format JSON (RGPD)", cta: "Exporter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionRow, { icon: Shield, label: "Mode privé", desc: "Masquer votre carte des moteurs de recherche", toggle: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionRow, { icon: Trash2, label: "Se déconnecter", desc: "Fermer la session en cours", cta: "Déconnexion", onClick: handleSignOut })
    ] })
  ] });
}
function Section({ title, desc, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: title }),
      desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
    ] }),
    children
  ] });
}
function Toggle({ icon: Icon, label, sub }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
  ] });
}
function ActionRow({ icon: Icon, label, desc, cta, toggle, danger, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${danger ? "text-destructive" : "text-muted-foreground"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm ${danger ? "text-destructive" : ""}`, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    toggle ? /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: danger ? "destructive" : "outline", onClick, children: cta })
  ] });
}
const Route$g = createFileRoute("/dashboard/orders")({
  head: () => ({ meta: [{ title: "Commandes — Dashboard" }] }),
  component: OrdersPage
});
const STATUS = {
  pending: { l: "En attente", color: "border-border text-muted-foreground", icon: Package },
  preparing: { l: "En préparation", color: "border-amber-500/40 bg-amber-500/10 text-amber-400", icon: Package },
  shipped: { l: "Expédié", color: "border-blue-500/40 bg-blue-500/10 text-blue-400", icon: Truck },
  delivered: { l: "Livré", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400", icon: CircleCheck }
};
function fmt(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function OrdersPage() {
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("nfc_orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setOrders(data);
      setLoading(false);
    });
  }, []);
  const total = orders.reduce((s, o) => s + (o.total || 0), 0);
  const qty = orders.reduce((s, o) => s + (o.qty || 0), 0);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-sm text-muted-foreground text-center", children: "Chargement…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      { l: "Commandes totales", v: orders.length },
      { l: "Cartes commandées", v: qty },
      { l: "Total dépensé", v: `${total} €` }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: s.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl mt-1", children: s.v })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display", children: "Historique des commandes" }) }),
      orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 mx-auto opacity-20 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Aucune commande pour l'instant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 opacity-70 max-w-xs mx-auto", children: "Commandez votre carte NFC physique pour la partager en un tap. Disponible dès 29 €." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-5", children: "Commander ma carte" })
      ] }) : orders.map((o) => {
        const st = STATUS[o.status] ?? STATUS.pending;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border/50 last:border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium font-mono", children: o.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                fmt(o.created_at),
                " · ",
                o.qty,
                " × ",
                o.model || "Carte NFC"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg", children: [
              o.total,
              " €"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `${st.color} text-[10px] gap-1`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(st.icon, { className: "h-3 w-3" }),
              " ",
              st.l
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              o.tracking && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5 mr-1.5" }),
                " Suivre"
              ] }),
              o.invoice_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: o.invoice_url, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 mr-1.5" }),
                " Facture"
              ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", disabled: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 mr-1.5" }),
                " Facture"
              ] })
            ] })
          ] }),
          o.status === "shipped" && o.tracking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
            "Colissimo · n° ",
            o.tracking
          ] })
        ] }, o.id);
      })
    ] })
  ] });
}
const KEY$1 = "nfc_profile";
function getProfileMeta() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY$1) || "null");
  } catch {
    return null;
  }
}
function setProfileMeta(p) {
  localStorage.setItem(KEY$1, JSON.stringify(p));
}
const Route$f = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
  component: NotificationsPage
});
const CLICK_TYPE_LABELS = {
  call: "Appeler",
  whatsapp: "WhatsApp",
  email: "Email",
  website: "Site web",
  calendar: "Calendrier",
  cta: "CTA"
};
const DEFAULT_PREFS = { scan_email: true, scan_push: true, save_email: true, save_push: true, click_email: false, click_push: true, order_email: true, order_push: false, tips_email: true, tips_push: false };
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "hier" : `il y a ${days}j`;
}
function eventToNotif(row) {
  const clickType = row.event_data?.type;
  const clickLabel = clickType ? CLICK_TYPE_LABELS[clickType] ?? clickType : null;
  const MAP = {
    view: { icon: Eye, color: "text-blue-400 bg-blue-500/10", title: "Quelqu'un a consulté votre carte" },
    scan: { icon: QrCode, color: "text-violet-400 bg-violet-500/10", title: "Nouveau scan de votre carte" },
    qr_scan: { icon: QrCode, color: "text-violet-400 bg-violet-500/10", title: "Scan via QR code" },
    click_button: { icon: MousePointerClick, color: "text-amber-400 bg-amber-500/10", title: clickLabel ? `Clic sur « ${clickLabel} »` : "Clic sur un bouton d'action" },
    click_social: { icon: MousePointerClick, color: "text-sky-400 bg-sky-500/10", title: clickLabel ? `Clic réseau social — ${clickLabel}` : "Clic sur un réseau social" },
    vcard_download: { icon: UserPlus, color: "text-emerald-400 bg-emerald-500/10", title: "Contact enregistré dans un téléphone" },
    save_contact: { icon: UserPlus, color: "text-emerald-400 bg-emerald-500/10", title: "Contact enregistré dans un téléphone" }
  };
  const m = MAP[row.event_type] ?? { icon: Eye, color: "text-muted-foreground bg-muted", title: row.event_type };
  return { id: row.id, icon: m.icon, color: m.color, title: m.title, sub: timeAgo(row.created_at), unread: true };
}
const PREF_ROWS = [
  { id: "scan", label: "Nouveau scan de carte", emailKey: "scan_email", pushKey: "scan_push" },
  { id: "save", label: "Contact sauvegardé", emailKey: "save_email", pushKey: "save_push" },
  { id: "click", label: "Clic sur un lien", emailKey: "click_email", pushKey: "click_push" },
  { id: "order", label: "Mise à jour commande", emailKey: "order_email", pushKey: "order_push" },
  { id: "tips", label: "Conseils & nouveautés produit", emailKey: "tips_email", pushKey: "tips_push" }
];
function NotificationsPage() {
  const [feed, setFeed] = reactExports.useState([]);
  const [prefs, setPrefs] = reactExports.useState(DEFAULT_PREFS);
  const [prefsId, setPrefsId] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (profile) {
      supabase.from("nfc_analytics").select("id, event_type, created_at, event_data").eq("profile_id", profile.id).order("created_at", { ascending: false }).limit(30).then(({ data }) => {
        if (data) setFeed(data.map(eventToNotif));
      });
    }
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("notification_prefs").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setPrefsId(data.id);
        setPrefs(data);
      } else {
        const { data: created } = await supabase.from("notification_prefs").insert({ user_id: user.id, ...DEFAULT_PREFS }).select("id").single();
        if (created) setPrefsId(created.id);
      }
      setLoading(false);
    });
  }, []);
  const updatePref = reactExports.useCallback(async (key, value) => {
    setPrefs((p) => ({ ...p, [key]: value }));
    if (!prefsId) return;
    await supabase.from("notification_prefs").update({ [key]: value, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", prefsId);
    toast.success("Préférence enregistrée");
  }, [prefsId]);
  const unreadCount = feed.filter((n) => n.unread).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 grid md:grid-cols-3 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
          " Notifications",
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full", children: unreadCount })
        ] }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setFeed((f) => f.map((n) => ({ ...n, unread: false }))), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5 mr-2" }),
          " Tout marquer comme lu"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card/40 overflow-hidden", children: feed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-10 w-10 mx-auto opacity-20 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Aucune activité pour l'instant.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "Les scans et interactions apparaîtront ici." })
        ] })
      ] }) : feed.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-3 p-4 border-b border-border/50 last:border-b-0 ${n.unread ? "bg-primary/5" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-xl grid place-items-center shrink-0 ${n.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: n.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: n.sub })
        ] }),
        n.unread && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary shrink-0 mt-2" })
      ] }, n.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Préférences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Événement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Push" })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-sm text-muted-foreground", children: "Chargement…" }) : PREF_ROWS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto] gap-3 items-center px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: p.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: prefs[p.emailKey], onCheckedChange: (v) => updatePref(p.emailKey, v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: prefs[p.pushKey], onCheckedChange: (v) => updatePref(p.pushKey, v) })
        ] }, p.id))
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./modeles-BTU5dmpx.mjs");
const Route$e = createFileRoute("/dashboard/modeles")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./media-Cdm1nVBq.mjs");
const Route$d = createFileRoute("/dashboard/media")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./links-Czpv2FyX.mjs");
const Route$c = createFileRoute("/dashboard/links")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./leads-CdMTbtdU.mjs");
const Route$b = createFileRoute("/dashboard/leads")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const Route$a = createFileRoute("/dashboard/integrations")({
  head: () => ({ meta: [{ title: "Intégrations — Dashboard" }] }),
  component: IntegrationsPage
});
const INT = [
  { id: "hubspot", name: "HubSpot", desc: "Sync auto contacts vers votre CRM", logo: "🟧", connected: true, cat: "CRM" },
  { id: "salesforce", name: "Salesforce", desc: "Création de leads en temps réel", logo: "☁️", connected: false, cat: "CRM" },
  { id: "google", name: "Google Contacts", desc: "Sauvegarde directe dans vos contacts", logo: "🟦", connected: true, cat: "Productivité" },
  { id: "zapier", name: "Zapier", desc: "5000+ apps automatisables", logo: "⚡", connected: false, cat: "Automatisation" },
  { id: "mailchimp", name: "Mailchimp", desc: "Ajout auto à vos campagnes email", logo: "🐵", connected: false, cat: "Marketing" },
  { id: "calendly", name: "Calendly", desc: "Réservation de RDV intégrée", logo: "📅", connected: true, cat: "Productivité" },
  { id: "slack", name: "Slack", desc: "Notifications dans votre canal", logo: "💬", connected: false, cat: "Communication" },
  { id: "notion", name: "Notion", desc: "Base de contacts collaborative", logo: "📝", connected: false, cat: "Productivité" },
  { id: "webhook", name: "Webhooks", desc: "Branchez votre propre backend", logo: "🔗", connected: false, cat: "Développeur" }
];
function IntegrationsPage() {
  const cats = Array.from(new Set(INT.map((i) => i.cat)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-1", children: "Connectez vos outils" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Chaque scan déclenche automatiquement vos workflows. Zéro saisie manuelle." })
    ] }),
    cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-3", children: INT.filter((i) => i.cat === c).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/40 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-background border border-border grid place-items-center text-xl", children: i.logo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: i.name }),
              i.connected && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[9px]", children: "Connecté" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: i.desc })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: i.connected ? "outline" : "default", size: "sm", className: "w-full", children: i.connected ? "Configurer" : "Connecter" })
      ] }, i.id)) })
    ] }, c))
  ] });
}
const BRICK_VARIANTS = {
  identity: [
    { id: "centered", label: "Centrée", hint: "Avatar + nom centrés" },
    { id: "cover", label: "Couverture", hint: "Bandeau + avatar débordant" },
    { id: "horizontal", label: "Horizontal", hint: "Avatar à gauche, infos à droite" }
  ],
  actions: [
    { id: "icons", label: "Icônes", hint: "Rangée d'icônes rondes" },
    { id: "pills", label: "Pills", hint: "Boutons pleine largeur" },
    { id: "grid", label: "Grille", hint: "Grille 2 × 2" }
  ],
  vcard: [
    { id: "gradient", label: "Gradient", hint: "Bouton large coloré" },
    { id: "outline", label: "Outlined", hint: "Minimaliste, bordure" },
    { id: "card", label: "Carte", hint: "Icône + texte secondaire" }
  ],
  stats: [
    { id: "inline", label: "Ligne", hint: "Grille 3 colonnes" },
    { id: "stacked", label: "Empilées", hint: "Gros chiffres en colonne" },
    { id: "pills", label: "Pills", hint: "Mini-cartes compactes" }
  ],
  about: [
    { id: "default", label: "Standard", hint: "Texte + badges" },
    { id: "quote", label: "Citation", hint: "Style guillemets" },
    { id: "card", label: "Carte", hint: "Avec icône" }
  ],
  video: [
    { id: "embed", label: "Embed", hint: "Lecteur YouTube direct" },
    { id: "thumb", label: "Vignette", hint: "Thumbnail + play (léger)" },
    { id: "cinema", label: "Cinéma", hint: "Titre overlay en bas" }
  ],
  services: [
    { id: "list", label: "Liste", hint: "Lignes avec icône" },
    { id: "numbered", label: "Numérotée", hint: "Grille 01 / 02 / 03" },
    { id: "carousel", label: "Carrousel", hint: "Cartes défilantes" }
  ],
  listings: [
    { id: "carousel", label: "Carrousel", hint: "Snap horizontal (actuel)" },
    { id: "stacked", label: "Empilés", hint: "Cartes pleine largeur" },
    { id: "compact", label: "Compact", hint: "Lignes mini-thumb" }
  ],
  gallery: [
    { id: "grid", label: "Grille", hint: "2 colonnes, format carré" },
    { id: "carousel", label: "Carrousel", hint: "Défilement horizontal" },
    { id: "stacked", label: "Empilées", hint: "Photos pleine largeur" }
  ],
  calendar: [
    { id: "row", label: "Row", hint: "Ligne avec chevron" },
    { id: "cta", label: "CTA", hint: "Bouton pleine largeur" },
    { id: "block", label: "Bloc", hint: "Icône agenda centrée" }
  ],
  languages: [
    { id: "chips", label: "Chips", hint: "Pastilles avec icône" },
    { id: "list", label: "Liste", hint: "Avec puces de niveau" },
    { id: "grid", label: "Grille", hint: "2 colonnes" }
  ],
  cta: [
    { id: "gradient", label: "Gradient", hint: "Bannière dégradée" },
    { id: "outline", label: "Outlined", hint: "Minimaliste" },
    { id: "bold", label: "Bold", hint: "Fond accent fort" }
  ],
  contact: [
    { id: "list", label: "Liste", hint: "Rows (actuel)" },
    { id: "grid", label: "Grille", hint: "2 × 2 mini-cartes" },
    { id: "compact", label: "Compact", hint: "Icônes + valeurs" }
  ],
  socials: [
    { id: "icons", label: "Icônes", hint: "Ronds centrés" },
    { id: "pills", label: "Pills", hint: "Avec libellé" },
    { id: "branded", label: "Branded", hint: "Couleurs de marque" }
  ]
};
const DEFAULT_VARIANTS = {
  identity: "centered",
  actions: "icons",
  vcard: "gradient",
  stats: "inline",
  about: "default",
  video: "embed",
  services: "list",
  listings: "carousel",
  gallery: "grid",
  calendar: "row",
  languages: "chips",
  cta: "gradient",
  contact: "list",
  socials: "icons"
};
const DEFAULT_SECTION_ORDER = [
  "identity",
  "actions",
  "vcard",
  "stats",
  "about",
  "video",
  "services",
  "listings",
  "gallery",
  "testimonials",
  "calendar",
  "languages",
  "cta",
  "contact",
  "socials",
  "theme"
];
const DEFAULT_CARD = {
  name: "Alexandre Moreau",
  title: "Conseiller immobilier de prestige",
  agency: "Maison Vendôme",
  area: "Paris & Île-de-France",
  photo: "",
  coverPhoto: "",
  actions: { call: true, whatsapp: true, email: true, website: true },
  vcardEnabled: true,
  statsEnabled: true,
  stats: [
    { label: "Biens vendus", value: "240+" },
    { label: "Note clients", value: "4.9" },
    { label: "Années", value: "12" }
  ],
  aboutEnabled: true,
  bio: "12 ans d'expertise sur le marché parisien. Spécialiste des biens d'exception, je vous accompagne avec discrétion et exigence à chaque étape de votre projet.",
  badges: [
    { id: "b1", label: "FNAIM certifié" },
    { id: "b2", label: "Top 1% Paris" },
    { id: "b3", label: "Prestige" }
  ],
  videoEnabled: false,
  videoTitle: "Présentation en 60 secondes",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Estimation gratuite", description: "Évaluation précise sous 48 h, basée sur le marché local." },
    { id: "s2", title: "Accompagnement vendeur", description: "De la mise en valeur du bien à la signature chez le notaire." },
    { id: "s3", title: "Chasse immobilière", description: "Recherche sur-mesure pour acquéreurs exigeants." }
  ],
  listingsEnabled: true,
  listings: [],
  galleryEnabled: false,
  gallery: [],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Camille D.", role: "Vendeuse — Paris 7e", text: "Discret, efficace, à l'écoute. Vente conclue 8 % au-dessus de l'estimation initiale.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Julien R.", role: "Acquéreur — Neuilly", text: "Alexandre a trouvé exactement le bien que nous cherchions, en moins de 3 semaines.", rating: 5, photo: "", link: "" }
  ],
  testimonialsStyle: "cards",
  calendarEnabled: false,
  calendarLabel: "Réserver un rendez-vous",
  calendarUrl: "https://calendly.com/votre-lien",
  languagesEnabled: false,
  languages: [
    { id: "l1", name: "Français", level: "Natif" },
    { id: "l2", name: "Anglais", level: "Courant" }
  ],
  ctaEnabled: false,
  ctaTitle: "Vous vendez ou achetez ?",
  ctaText: "Échangeons 15 minutes pour cadrer votre projet, sans engagement.",
  ctaButtonLabel: "Prendre contact",
  ctaButtonUrl: "https://calendly.com/votre-lien",
  contactEnabled: true,
  phone: "+33612345678",
  phoneDisplay: "+33 6 12 34 56 78",
  email: "alexandre@maison-vendome.fr",
  website: "maison-vendome.fr",
  whatsapp: "33612345678",
  socialsEnabled: true,
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
  whatsappSocial: "33612345678",
  accent: "gold",
  sectionOrder: DEFAULT_SECTION_ORDER,
  variants: { ...DEFAULT_VARIANTS }
};
const grad = (a, b) => `linear-gradient(135deg, ${a}, ${b})`;
const radial = (a, b) => `radial-gradient(120% 80% at 50% 0%, ${a} 0%, ${b} 60%)`;
const gold = {
  mode: "dark",
  bg: "oklch(0.16 0.018 250)",
  surface: "oklch(0.21 0.02 250)",
  surfaceAlt: "oklch(0.26 0.025 250)",
  border: "oklch(0.32 0.02 250 / 0.6)",
  text: "oklch(0.97 0.005 80)",
  textMuted: "oklch(0.7 0.015 250)",
  accent: "oklch(0.82 0.13 85)",
  gradient: grad("oklch(0.88 0.1 90)", "oklch(0.75 0.14 75)"),
  headerBg: radial("oklch(0.28 0.05 250)", "oklch(0.16 0.018 250)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const noir = {
  mode: "dark",
  bg: "oklch(0.12 0 0)",
  surface: "oklch(0.17 0 0)",
  surfaceAlt: "oklch(0.22 0 0)",
  border: "oklch(0.3 0 0 / 0.7)",
  text: "oklch(0.97 0 0)",
  textMuted: "oklch(0.68 0 0)",
  accent: "oklch(0.85 0.12 88)",
  gradient: grad("oklch(0.9 0.1 92)", "oklch(0.74 0.14 78)"),
  headerBg: radial("oklch(0.2 0 0)", "oklch(0.1 0 0)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const emerald = {
  mode: "dark",
  bg: "oklch(0.16 0.025 165)",
  surface: "oklch(0.21 0.03 165)",
  surfaceAlt: "oklch(0.26 0.035 165)",
  border: "oklch(0.32 0.03 165 / 0.6)",
  text: "oklch(0.97 0.01 165)",
  textMuted: "oklch(0.7 0.02 165)",
  accent: "oklch(0.78 0.16 160)",
  gradient: grad("oklch(0.85 0.14 165)", "oklch(0.6 0.16 155)"),
  headerBg: radial("oklch(0.28 0.06 165)", "oklch(0.15 0.025 165)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const forest = {
  mode: "dark",
  bg: "oklch(0.18 0.03 145)",
  surface: "oklch(0.23 0.035 145)",
  surfaceAlt: "oklch(0.28 0.04 145)",
  border: "oklch(0.34 0.03 145 / 0.6)",
  text: "oklch(0.96 0.015 145)",
  textMuted: "oklch(0.72 0.02 145)",
  accent: "oklch(0.7 0.14 140)",
  gradient: grad("oklch(0.78 0.13 140)", "oklch(0.55 0.15 150)"),
  headerBg: radial("oklch(0.3 0.06 145)", "oklch(0.17 0.03 145)"),
  onAccent: "oklch(0.98 0 0)"
};
const navy = {
  mode: "dark",
  bg: "oklch(0.17 0.04 260)",
  surface: "oklch(0.22 0.045 260)",
  surfaceAlt: "oklch(0.27 0.05 260)",
  border: "oklch(0.34 0.05 260 / 0.6)",
  text: "oklch(0.97 0.005 250)",
  textMuted: "oklch(0.72 0.02 250)",
  accent: "oklch(0.7 0.14 250)",
  gradient: grad("oklch(0.75 0.13 245)", "oklch(0.5 0.15 260)"),
  headerBg: radial("oklch(0.3 0.08 260)", "oklch(0.16 0.04 260)"),
  onAccent: "oklch(0.98 0 0)"
};
const sapphire = {
  mode: "dark",
  bg: "oklch(0.16 0.04 250)",
  surface: "oklch(0.21 0.05 250)",
  surfaceAlt: "oklch(0.27 0.06 250)",
  border: "oklch(0.35 0.06 250 / 0.55)",
  text: "oklch(0.97 0.005 250)",
  textMuted: "oklch(0.72 0.02 250)",
  accent: "oklch(0.7 0.18 245)",
  gradient: grad("oklch(0.75 0.18 240)", "oklch(0.55 0.22 255)"),
  headerBg: radial("oklch(0.3 0.1 250)", "oklch(0.15 0.04 250)"),
  onAccent: "oklch(0.98 0 0)"
};
const graphite = {
  mode: "dark",
  bg: "oklch(0.18 0.005 250)",
  surface: "oklch(0.23 0.006 250)",
  surfaceAlt: "oklch(0.28 0.008 250)",
  border: "oklch(0.36 0.01 250 / 0.6)",
  text: "oklch(0.97 0.002 250)",
  textMuted: "oklch(0.7 0.005 250)",
  accent: "oklch(0.78 0.01 250)",
  gradient: grad("oklch(0.82 0.005 250)", "oklch(0.55 0.01 250)"),
  headerBg: radial("oklch(0.28 0.008 250)", "oklch(0.16 0.005 250)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const bordeaux = {
  mode: "dark",
  bg: "oklch(0.18 0.05 20)",
  surface: "oklch(0.23 0.06 20)",
  surfaceAlt: "oklch(0.28 0.07 20)",
  border: "oklch(0.35 0.06 20 / 0.6)",
  text: "oklch(0.97 0.01 30)",
  textMuted: "oklch(0.72 0.03 25)",
  accent: "oklch(0.68 0.18 20)",
  gradient: grad("oklch(0.75 0.18 25)", "oklch(0.5 0.2 15)"),
  headerBg: radial("oklch(0.32 0.1 20)", "oklch(0.17 0.05 20)"),
  onAccent: "oklch(0.98 0 0)"
};
const slate = {
  mode: "dark",
  bg: "oklch(0.2 0.015 240)",
  surface: "oklch(0.25 0.02 240)",
  surfaceAlt: "oklch(0.3 0.025 240)",
  border: "oklch(0.38 0.02 240 / 0.6)",
  text: "oklch(0.97 0.005 240)",
  textMuted: "oklch(0.72 0.015 240)",
  accent: "oklch(0.75 0.13 230)",
  gradient: grad("oklch(0.8 0.12 225)", "oklch(0.6 0.15 235)"),
  headerBg: radial("oklch(0.32 0.04 240)", "oklch(0.18 0.015 240)"),
  onAccent: "oklch(0.98 0 0)"
};
const violet = {
  mode: "dark",
  bg: "oklch(0.17 0.05 295)",
  surface: "oklch(0.22 0.06 295)",
  surfaceAlt: "oklch(0.27 0.07 295)",
  border: "oklch(0.35 0.07 295 / 0.55)",
  text: "oklch(0.97 0.01 295)",
  textMuted: "oklch(0.72 0.03 295)",
  accent: "oklch(0.72 0.2 295)",
  gradient: grad("oklch(0.78 0.18 290)", "oklch(0.55 0.22 300)"),
  headerBg: radial("oklch(0.3 0.1 295)", "oklch(0.16 0.05 295)"),
  onAccent: "oklch(0.98 0 0)"
};
const crimson = {
  mode: "dark",
  bg: "oklch(0.16 0.04 25)",
  surface: "oklch(0.21 0.05 25)",
  surfaceAlt: "oklch(0.26 0.06 25)",
  border: "oklch(0.34 0.06 25 / 0.55)",
  text: "oklch(0.97 0.01 30)",
  textMuted: "oklch(0.72 0.03 25)",
  accent: "oklch(0.7 0.21 25)",
  gradient: grad("oklch(0.75 0.2 30)", "oklch(0.55 0.24 20)"),
  headerBg: radial("oklch(0.3 0.1 25)", "oklch(0.15 0.04 25)"),
  onAccent: "oklch(0.98 0 0)"
};
const magenta = {
  mode: "dark",
  bg: "oklch(0.17 0.05 330)",
  surface: "oklch(0.22 0.06 330)",
  surfaceAlt: "oklch(0.27 0.07 330)",
  border: "oklch(0.35 0.07 330 / 0.55)",
  text: "oklch(0.97 0.01 330)",
  textMuted: "oklch(0.73 0.03 330)",
  accent: "oklch(0.7 0.24 330)",
  gradient: grad("oklch(0.75 0.22 325)", "oklch(0.55 0.26 335)"),
  headerBg: radial("oklch(0.3 0.1 330)", "oklch(0.16 0.05 330)"),
  onAccent: "oklch(0.98 0 0)"
};
const copper = {
  mode: "light",
  bg: "oklch(0.97 0.015 60)",
  surface: "oklch(1 0.005 60)",
  surfaceAlt: "oklch(0.94 0.025 50)",
  border: "oklch(0.86 0.03 50 / 0.8)",
  text: "oklch(0.22 0.03 40)",
  textMuted: "oklch(0.5 0.04 40)",
  accent: "oklch(0.62 0.17 40)",
  gradient: grad("oklch(0.78 0.14 55)", "oklch(0.58 0.18 35)"),
  headerBg: grad("oklch(0.96 0.025 60)", "oklch(0.9 0.04 50)"),
  onAccent: "oklch(0.22 0.03 40)"
};
const cream = {
  mode: "light",
  bg: "oklch(0.97 0.012 80)",
  surface: "oklch(1 0.005 80)",
  surfaceAlt: "oklch(0.94 0.02 80)",
  border: "oklch(0.87 0.025 80 / 0.8)",
  text: "oklch(0.24 0.02 80)",
  textMuted: "oklch(0.52 0.03 80)",
  accent: "oklch(0.65 0.14 65)",
  gradient: grad("oklch(0.8 0.13 75)", "oklch(0.62 0.16 55)"),
  headerBg: grad("oklch(0.96 0.02 80)", "oklch(0.9 0.04 70)"),
  onAccent: "oklch(0.24 0.02 80)"
};
const sand = {
  mode: "light",
  bg: "oklch(0.95 0.018 80)",
  surface: "oklch(0.99 0.008 80)",
  surfaceAlt: "oklch(0.92 0.025 75)",
  border: "oklch(0.84 0.03 75 / 0.8)",
  text: "oklch(0.22 0.02 70)",
  textMuted: "oklch(0.5 0.03 70)",
  accent: "oklch(0.5 0.04 70)",
  gradient: grad("oklch(0.7 0.06 65)", "oklch(0.45 0.05 70)"),
  headerBg: grad("oklch(0.92 0.025 75)", "oklch(0.85 0.04 70)"),
  onAccent: "oklch(0.98 0 0)"
};
const clay = {
  mode: "light",
  bg: "oklch(0.95 0.02 45)",
  surface: "oklch(0.99 0.01 45)",
  surfaceAlt: "oklch(0.92 0.03 40)",
  border: "oklch(0.84 0.04 40 / 0.8)",
  text: "oklch(0.22 0.04 30)",
  textMuted: "oklch(0.5 0.05 30)",
  accent: "oklch(0.58 0.18 30)",
  gradient: grad("oklch(0.7 0.18 35)", "oklch(0.5 0.2 22)"),
  headerBg: grad("oklch(0.93 0.03 40)", "oklch(0.86 0.05 30)"),
  onAccent: "oklch(0.98 0 0)"
};
const rose = {
  mode: "light",
  bg: "oklch(0.97 0.012 0)",
  surface: "oklch(1 0.005 0)",
  surfaceAlt: "oklch(0.94 0.025 0)",
  border: "oklch(0.87 0.03 0 / 0.8)",
  text: "oklch(0.24 0.03 0)",
  textMuted: "oklch(0.52 0.04 0)",
  accent: "oklch(0.66 0.18 355)",
  gradient: grad("oklch(0.82 0.12 5)", "oklch(0.62 0.2 350)"),
  headerBg: grad("oklch(0.96 0.025 0)", "oklch(0.88 0.05 355)"),
  onAccent: "oklch(0.98 0 0)"
};
const blush = {
  mode: "light",
  bg: "oklch(0.97 0.018 30)",
  surface: "oklch(1 0.008 30)",
  surfaceAlt: "oklch(0.94 0.03 30)",
  border: "oklch(0.87 0.035 30 / 0.8)",
  text: "oklch(0.24 0.04 25)",
  textMuted: "oklch(0.52 0.05 25)",
  accent: "oklch(0.7 0.17 25)",
  gradient: grad("oklch(0.85 0.13 35)", "oklch(0.65 0.19 18)"),
  headerBg: grad("oklch(0.96 0.025 30)", "oklch(0.88 0.05 25)"),
  onAccent: "oklch(0.98 0 0)"
};
const mint = {
  mode: "light",
  bg: "oklch(0.97 0.018 175)",
  surface: "oklch(1 0.008 175)",
  surfaceAlt: "oklch(0.93 0.03 175)",
  border: "oklch(0.86 0.035 175 / 0.8)",
  text: "oklch(0.22 0.03 175)",
  textMuted: "oklch(0.5 0.04 175)",
  accent: "oklch(0.62 0.14 170)",
  gradient: grad("oklch(0.78 0.12 175)", "oklch(0.55 0.16 165)"),
  headerBg: grad("oklch(0.94 0.025 175)", "oklch(0.86 0.05 170)"),
  onAccent: "oklch(0.22 0.03 175)"
};
const sky = {
  mode: "light",
  bg: "oklch(0.97 0.018 225)",
  surface: "oklch(1 0.008 225)",
  surfaceAlt: "oklch(0.93 0.03 225)",
  border: "oklch(0.86 0.035 225 / 0.8)",
  text: "oklch(0.22 0.03 230)",
  textMuted: "oklch(0.5 0.04 230)",
  accent: "oklch(0.62 0.15 230)",
  gradient: grad("oklch(0.78 0.12 225)", "oklch(0.55 0.17 235)"),
  headerBg: grad("oklch(0.94 0.025 225)", "oklch(0.86 0.05 230)"),
  onAccent: "oklch(0.98 0 0)"
};
const paper = {
  mode: "light",
  bg: "oklch(0.98 0.003 250)",
  surface: "oklch(1 0 0)",
  surfaceAlt: "oklch(0.93 0.01 250)",
  border: "oklch(0.85 0.015 250 / 0.8)",
  text: "oklch(0.2 0.01 250)",
  textMuted: "oklch(0.48 0.015 250)",
  accent: "oklch(0.45 0.13 255)",
  gradient: grad("oklch(0.6 0.13 250)", "oklch(0.38 0.15 260)"),
  headerBg: grad("oklch(0.96 0.01 250)", "oklch(0.88 0.02 250)"),
  onAccent: "oklch(0.98 0 0)"
};
const sun = {
  mode: "light",
  bg: "oklch(0.97 0.02 75)",
  surface: "oklch(1 0.008 75)",
  surfaceAlt: "oklch(0.94 0.035 75)",
  border: "oklch(0.86 0.04 75 / 0.8)",
  text: "oklch(0.24 0.03 60)",
  textMuted: "oklch(0.52 0.04 60)",
  accent: "oklch(0.7 0.17 70)",
  gradient: grad("oklch(0.85 0.14 80)", "oklch(0.68 0.18 60)"),
  headerBg: grad("oklch(0.95 0.03 75)", "oklch(0.86 0.05 65)"),
  onAccent: "oklch(0.22 0.03 60)"
};
const CARD_THEMES = [
  // Dark
  { id: "gold", label: "Or", sector: "Immobilier prestige", palette: gold },
  { id: "noir", label: "Noir & Or", sector: "Luxe / Joaillerie", palette: noir },
  { id: "emerald", label: "Émeraude", sector: "Finance / Conseil", palette: emerald },
  { id: "forest", label: "Forêt", sector: "Écologie / Outdoor", palette: forest },
  { id: "navy", label: "Marine", sector: "Avocat / Notaire", palette: navy },
  { id: "sapphire", label: "Saphir", sector: "Tech / SaaS", palette: sapphire },
  { id: "graphite", label: "Graphite", sector: "Éditorial / Photo", palette: graphite },
  { id: "bordeaux", label: "Bordeaux", sector: "Sommellerie / Gastro", palette: bordeaux },
  { id: "slate", label: "Ardoise", sector: "Industrie / BTP", palette: slate },
  { id: "violet", label: "Violet", sector: "Créatif / Design", palette: violet },
  { id: "crimson", label: "Cramoisi", sector: "Sport / Fitness", palette: crimson },
  { id: "magenta", label: "Magenta", sector: "Mode / Événementiel", palette: magenta },
  // Light
  { id: "copper", label: "Cuivre", sector: "Artisanat", palette: copper },
  { id: "cream", label: "Crème", sector: "Coach / Lifestyle", palette: cream },
  { id: "sand", label: "Sable", sector: "Architecture / Déco", palette: sand },
  { id: "clay", label: "Terracotta", sector: "Restauration / Café", palette: clay },
  { id: "rose", label: "Rose poudré", sector: "Beauté / Esthétique", palette: rose },
  { id: "blush", label: "Pêche", sector: "Coiffure / Maquillage", palette: blush },
  { id: "mint", label: "Menthe", sector: "Santé / Bien-être", palette: mint },
  { id: "sky", label: "Azur", sector: "Éducation / Enfance", palette: sky },
  { id: "paper", label: "Papier", sector: "Avocat clair / Édito", palette: paper },
  { id: "sun", label: "Soleil", sector: "Voyage / Hôtellerie", palette: sun }
];
const THEMES_BY_ID = Object.fromEntries(
  CARD_THEMES.map((t) => [t.id, t])
);
const PROFESSIONS = [
  // Immobilier
  { id: "agent-immo-prestige", label: "Agent immobilier prestige", category: "Immobilier", themeId: "gold" },
  { id: "agent-immo", label: "Agent immobilier", category: "Immobilier", themeId: "navy" },
  { id: "chasseur-immo", label: "Chasseur immobilier", category: "Immobilier", themeId: "graphite" },
  { id: "promoteur", label: "Promoteur immobilier", category: "Immobilier", themeId: "emerald" },
  { id: "diagnostiqueur", label: "Diagnostiqueur immobilier", category: "Immobilier", themeId: "sky" },
  // Juridique & Conseil
  { id: "avocat", label: "Avocat", category: "Juridique", themeId: "navy" },
  { id: "avocat-affaires", label: "Avocat d'affaires", category: "Juridique", themeId: "paper" },
  { id: "notaire", label: "Notaire", category: "Juridique", themeId: "paper" },
  { id: "huissier", label: "Commissaire de justice", category: "Juridique", themeId: "graphite" },
  { id: "expert-comptable", label: "Expert-comptable", category: "Juridique", themeId: "emerald" },
  { id: "consultant", label: "Consultant / Conseil", category: "Juridique", themeId: "sapphire" },
  // Finance
  { id: "courtier", label: "Courtier en prêt", category: "Finance", themeId: "emerald" },
  { id: "conseiller-patrimoine", label: "Conseiller en patrimoine", category: "Finance", themeId: "navy" },
  { id: "assureur", label: "Assureur", category: "Finance", themeId: "navy" },
  { id: "trader", label: "Analyste / Trader", category: "Finance", themeId: "graphite" },
  // Tech & Digital
  { id: "dev", label: "Développeur / Ingé logiciel", category: "Tech", themeId: "sapphire" },
  { id: "freelance-tech", label: "Freelance tech", category: "Tech", themeId: "violet" },
  { id: "saas-founder", label: "Fondateur SaaS", category: "Tech", themeId: "sapphire" },
  { id: "data", label: "Data scientist", category: "Tech", themeId: "graphite" },
  { id: "cybersec", label: "Expert cybersécurité", category: "Tech", themeId: "noir" },
  // Santé & Bien-être
  { id: "medecin", label: "Médecin généraliste", category: "Santé", themeId: "mint" },
  { id: "dentiste", label: "Chirurgien-dentiste", category: "Santé", themeId: "sky" },
  { id: "kine", label: "Kinésithérapeute", category: "Santé", themeId: "mint" },
  { id: "osteo", label: "Ostéopathe", category: "Santé", themeId: "forest" },
  { id: "psy", label: "Psychologue / Thérapeute", category: "Santé", themeId: "cream" },
  { id: "naturopathe", label: "Naturopathe", category: "Santé", themeId: "forest" },
  { id: "sage-femme", label: "Sage-femme", category: "Santé", themeId: "blush" },
  // Beauté & Esthétique
  { id: "coiffeur", label: "Coiffeur / Barbier", category: "Beauté", themeId: "blush" },
  { id: "estheticienne", label: "Esthéticienne", category: "Beauté", themeId: "rose" },
  { id: "maquilleuse", label: "Maquilleuse pro", category: "Beauté", themeId: "rose" },
  { id: "ongles", label: "Prothésiste ongulaire", category: "Beauté", themeId: "blush" },
  { id: "spa", label: "Spa / Institut", category: "Beauté", themeId: "cream" },
  // Coaching & Lifestyle
  { id: "coach-vie", label: "Coach de vie", category: "Coaching", themeId: "cream" },
  { id: "coach-sportif", label: "Coach sportif", category: "Sport", themeId: "crimson" },
  { id: "coach-pro", label: "Coach professionnel", category: "Coaching", themeId: "sapphire" },
  { id: "nutritionniste", label: "Nutritionniste", category: "Coaching", themeId: "mint" },
  { id: "yoga", label: "Prof de yoga / Pilates", category: "Coaching", themeId: "forest" },
  // Sport
  { id: "preparateur", label: "Préparateur physique", category: "Sport", themeId: "crimson" },
  { id: "club-sport", label: "Club / Salle de sport", category: "Sport", themeId: "slate" },
  // Restauration
  { id: "restaurateur", label: "Restaurateur", category: "Restauration", themeId: "clay" },
  { id: "chef", label: "Chef cuisinier", category: "Restauration", themeId: "bordeaux" },
  { id: "patissier", label: "Pâtissier", category: "Restauration", themeId: "blush" },
  { id: "sommelier", label: "Sommelier / Caviste", category: "Restauration", themeId: "bordeaux" },
  { id: "barista", label: "Café / Barista", category: "Restauration", themeId: "copper" },
  { id: "traiteur", label: "Traiteur", category: "Restauration", themeId: "clay" },
  // Artisanat & BTP
  { id: "menuisier", label: "Menuisier / Ébéniste", category: "Artisanat", themeId: "copper" },
  { id: "plombier", label: "Plombier", category: "Artisanat", themeId: "slate" },
  { id: "electricien", label: "Électricien", category: "Artisanat", themeId: "slate" },
  { id: "macon", label: "Maçon / BTP", category: "Artisanat", themeId: "slate" },
  { id: "bijoutier", label: "Bijoutier / Joaillier", category: "Artisanat", themeId: "noir" },
  { id: "tatoueur", label: "Tatoueur", category: "Artisanat", themeId: "noir" },
  { id: "fleuriste", label: "Fleuriste", category: "Artisanat", themeId: "rose" },
  { id: "paysagiste", label: "Paysagiste / Jardinier", category: "Artisanat", themeId: "forest" },
  // Mode
  { id: "styliste", label: "Styliste / Créateur de mode", category: "Mode", themeId: "magenta" },
  { id: "mannequin", label: "Mannequin / Modèle", category: "Mode", themeId: "noir" },
  { id: "boutique-mode", label: "Boutique de mode", category: "Mode", themeId: "rose" },
  // Créatif
  { id: "photographe", label: "Photographe", category: "Créatif", themeId: "graphite" },
  { id: "videaste", label: "Vidéaste / Réalisateur", category: "Créatif", themeId: "noir" },
  { id: "graphiste", label: "Graphiste / Designer", category: "Créatif", themeId: "violet" },
  { id: "illustrateur", label: "Illustrateur", category: "Créatif", themeId: "violet" },
  { id: "musicien", label: "Musicien / DJ", category: "Créatif", themeId: "magenta" },
  { id: "architecte", label: "Architecte", category: "Créatif", themeId: "sand" },
  { id: "decorateur", label: "Architecte d'intérieur", category: "Créatif", themeId: "sand" },
  // Éducation
  { id: "prof", label: "Professeur particulier", category: "Éducation", themeId: "sky" },
  { id: "formateur", label: "Formateur pro", category: "Éducation", themeId: "sapphire" },
  { id: "nounou", label: "Garde d'enfants / Nounou", category: "Éducation", themeId: "sky" },
  // Voyage & Hôtellerie
  { id: "agent-voyage", label: "Agent de voyage", category: "Voyage", themeId: "sun" },
  { id: "hotelier", label: "Hôtelier / Gîte", category: "Voyage", themeId: "sun" },
  { id: "guide", label: "Guide touristique", category: "Voyage", themeId: "sun" },
  // Événementiel & Marketing
  { id: "wedding", label: "Wedding planner", category: "Événementiel", themeId: "rose" },
  { id: "event", label: "Organisateur d'événements", category: "Événementiel", themeId: "magenta" },
  { id: "marketing", label: "Consultant marketing", category: "Événementiel", themeId: "violet" },
  { id: "community", label: "Community manager", category: "Événementiel", themeId: "magenta" },
  // Édito / Médias
  { id: "journaliste", label: "Journaliste", category: "Médias", themeId: "paper" },
  { id: "ecrivain", label: "Écrivain / Auteur", category: "Médias", themeId: "graphite" },
  { id: "podcasteur", label: "Podcasteur", category: "Médias", themeId: "bordeaux" }
];
const PROFESSIONS_BY_THEME = PROFESSIONS.reduce(
  (acc, p) => {
    (acc[p.themeId] ??= []).push(p);
    return acc;
  },
  {}
);
const PROFESSION_CATEGORIES = Array.from(
  new Set(PROFESSIONS.map((p) => p.category))
);
const KEY = "cyk.card.v1";
function normalizeOrder(order) {
  const valid = new Set(DEFAULT_SECTION_ORDER);
  const arr = Array.isArray(order) ? order.filter((x) => valid.has(x)) : [];
  for (const id of DEFAULT_SECTION_ORDER) if (!arr.includes(id)) arr.push(id);
  return arr;
}
function normalizeAccent(accent) {
  if (typeof accent === "string" && THEMES_BY_ID[accent]) {
    return accent;
  }
  return DEFAULT_CARD.accent;
}
function normalizeProfession(profession) {
  if (typeof profession !== "string") return void 0;
  return PROFESSIONS.some((p) => p.id === profession) ? profession : void 0;
}
function loadCard() {
  if (typeof window === "undefined") return DEFAULT_CARD;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_CARD;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CARD,
      ...parsed,
      accent: normalizeAccent(parsed.accent),
      profession: normalizeProfession(parsed.profession),
      sectionOrder: normalizeOrder(parsed.sectionOrder),
      variants: { ...DEFAULT_CARD.variants, ...parsed.variants ?? {} }
    };
  } catch {
    return DEFAULT_CARD;
  }
}
function useCardStore() {
  const [data, setData] = reactExports.useState(DEFAULT_CARD);
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setData(loadCard());
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
    }
  }, [data, hydrated]);
  const update = reactExports.useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);
  const reset = reactExports.useCallback(() => setData(DEFAULT_CARD), []);
  return { data, setData, update, reset, hydrated };
}
const Route$9 = createFileRoute("/dashboard/help")({
  head: () => ({ meta: [{ title: "Aide & Onboarding — Dashboard" }] }),
  component: HelpPage
});
const ARTICLES = [
  { t: "Comment fonctionne la carte NFC ?", c: "Démarrage", time: "3 min" },
  { t: "Personnaliser le design de mon profil", c: "Design", time: "5 min" },
  { t: "Comprendre mes statistiques", c: "Analytics", time: "4 min" },
  { t: "Synchroniser avec HubSpot", c: "Intégrations", time: "6 min" },
  { t: "Inviter mon équipe", c: "Équipe", time: "2 min" },
  { t: "Modifier mes infos sans recommander", c: "Carte NFC", time: "1 min" }
];
function HelpPage() {
  const { data } = useCardStore();
  const profile = getProfileMeta();
  const STEPS = [
    { done: true, label: "Créer votre compte", desc: "Bienvenue sur OneTap" },
    { done: !!data.name, label: "Compléter votre profil", desc: "Nom, photo, bio, liens", to: "/dashboard/card" },
    { done: !!data.accent, label: "Choisir un thème", desc: "Personnalisez l'apparence", to: "/dashboard/style" },
    { done: !!profile?.actif, label: "Activer votre carte", desc: "Passez au plan payant", to: "/pricing" },
    { done: false, label: "Commander une carte NFC", desc: "À partir de 29 €", to: "/carte-physique" },
    { done: false, label: "Partager votre carte", desc: "Premier contact sauvegardé" }
  ];
  const progress = STEPS.filter((s) => s.done).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-1", children: "Activez votre carte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            progress,
            " / ",
            STEPS.length,
            " étapes complétées"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl text-primary", children: [
          Math.round(progress / STEPS.length * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-primary to-primary/60 transition-all", style: { width: `${progress / STEPS.length * 100}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 p-3 rounded-xl border ${s.done ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-background/40"}`, children: [
        s.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-400 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm ${s.done ? "line-through text-muted-foreground" : "font-medium"}`, children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.desc })
        ] }),
        !s.done && s.to && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: s.to, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", children: [
          "Faire ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1" })
        ] }) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Rechercher dans l'aide...", className: "pl-10 h-12" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          " Articles populaires"
        ] }),
        ARTICLES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 p-4 hover:border-primary/40 transition cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: a.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
            a.c,
            " · ",
            a.time,
            " de lecture"
          ] })
        ] }, a.t))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-8 w-8 text-primary mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-1", children: "Tutoriels vidéo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "12 vidéos pour maîtriser OneTap en 30 min" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full", children: "Voir les vidéos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-8 w-8 text-primary mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-1", children: "Contacter le support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Réponse en moins de 2 h ouvrées" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@convertilab.com", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "w-full", children: "Envoyer un message" }) })
        ] })
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$6 = () => import("./content-DwFUiL1N.mjs");
const Route$8 = createFileRoute("/dashboard/content")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contacts-Ci__V3T2.mjs");
const Route$7 = createFileRoute("/dashboard/contacts")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./carte-B2vKH7EN.mjs");
const Route$6 = createFileRoute("/dashboard/carte")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./card-CLmjXth-.mjs");
const Route$5 = createFileRoute("/dashboard/card")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function usePlan() {
  const cached = getProfileMeta();
  const [plan, setPlan] = reactExports.useState(cached?.plan ?? "free");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("nfc_profiles").select("id, slug, plan, actif").eq("user_id", user.id).maybeSingle();
      if (data) {
        const realPlan = data.plan ?? "free";
        setPlan(realPlan);
        const meta = getProfileMeta();
        if (meta) {
          setProfileMeta({ ...meta, plan: realPlan });
        } else {
          setProfileMeta({ id: data.id, slug: data.slug, plan: realPlan, actif: data.actif ?? true });
        }
      }
      setLoading(false);
    });
  }, []);
  return { plan, loading };
}
const Route$4 = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Facturation — Dashboard" }] }),
  component: BillingPage
});
const PLANS = [
  { id: "essentielle", name: "Essentielle", price: "9,80 €/mois", feats: ["1 carte digitale", "Identité, contact, vCard", "Boutons d'action, Bio & badges", "Liens illimités"] },
  { id: "vitrine", name: "Vitrine", price: "15,80 €/mois", feats: ["Tout Essentielle", "Services & témoignages", "Portfolio & vidéo", "Stats avancées, CRM, Intégrations"] }
];
function BillingPage() {
  const { plan, loading } = usePlan();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: PLANS.map((p) => {
      const current = !loading && plan === p.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${current ? "border-primary bg-primary/5" : "border-border bg-card/40"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          p.id === "vitrine" && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: p.name }),
          current && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] uppercase tracking-wider text-primary", children: "Actif" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl mb-4", children: p.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-5", children: p.feats.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary shrink-0 mt-0.5" }),
          " ",
          f
        ] }, f)) }),
        current ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full", disabled: true, children: "Plan actuel" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "w-full", children: [
          "Passer à ",
          p.name
        ] }) })
      ] }, p.name);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Méthode de paiement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-14 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 grid place-items-center text-white text-xs font-bold", children: "VISA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "•••• •••• •••• 4242" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Expire 09/2028" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Modifier" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5 mr-2" }),
          " Ajouter une carte"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Adresse de facturation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-0.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: "Votre entreprise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Votre adresse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Code postal, Ville, France" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-3", children: "Modifier" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display", children: "Factures" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-6 text-center text-sm text-muted-foreground", children: "Vos factures Stripe apparaîtront ici prochainement." })
    ] })
  ] });
}
const Route$3 = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Statistiques avancées — Dashboard" }] }),
  component: AnalyticsPage
});
function AnalyticsPage() {
  const [days, setDays] = reactExports.useState([]);
  const [hours, setHours] = reactExports.useState(Array.from({ length: 24 }, (_, h) => ({ h, count: 0 })));
  const [sources, setSources] = reactExports.useState([]);
  const [totals, setTotals] = reactExports.useState({ views: 0, clicks: 0, saves: 0, engagement: 0 });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) {
      setLoading(false);
      return;
    }
    const since30 = new Date(Date.now() - 30 * 864e5).toISOString();
    supabase.from("nfc_analytics").select("event_type, created_at, event_data").eq("profile_id", profile.id).gte("created_at", since30).order("created_at", { ascending: true }).then(({ data: rows }) => {
      if (!rows) {
        setLoading(false);
        return;
      }
      const views = rows.filter((r) => r.event_type === "view" || r.event_type === "scan").length;
      const clicks = rows.filter((r) => r.event_type === "button_click").length;
      const saves = rows.filter((r) => r.event_type === "vcard_download").length;
      setTotals({ views, clicks, saves, engagement: views > 0 ? Math.round((clicks + saves) / views * 100) : 0 });
      const dayMap = {};
      for (let i = 29; i >= 0; i--) {
        const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
        dayMap[d] = { scans: 0, saves: 0 };
      }
      for (const r of rows) {
        const d = r.created_at.slice(0, 10);
        if (!dayMap[d]) continue;
        if (r.event_type === "view" || r.event_type === "scan") dayMap[d].scans++;
        if (r.event_type === "vcard_download") dayMap[d].saves++;
      }
      setDays(Object.entries(dayMap).map(([d, v]) => ({ d, ...v })));
      const hourMap = {};
      for (let h = 0; h < 24; h++) hourMap[h] = 0;
      for (const r of rows) {
        const h = new Date(r.created_at).getHours();
        hourMap[h] = (hourMap[h] || 0) + 1;
      }
      setHours(Array.from({ length: 24 }, (_, h) => ({ h, count: hourMap[h] })));
      const srcMap = { "Tap NFC / Scan": 0, "QR code": 0, "Lien direct": 0 };
      for (const r of rows) {
        if (r.event_type === "qr_scan") {
          srcMap["QR code"]++;
          continue;
        }
        const ref = r.event_data?.referrer ?? "";
        if (ref === "" || ref === "direct") srcMap["Tap NFC / Scan"]++;
        else srcMap["Lien direct"]++;
      }
      setSources(Object.entries(srcMap).map(([source, count]) => ({ source, count })).filter((s) => s.count > 0));
      setLoading(false);
    });
  }, []);
  const maxScan = Math.max(...days.map((d) => d.scans), 1);
  const maxHour = Math.max(...hours.map((h) => h.count), 1);
  const totalSrc = sources.reduce((s, x) => s + x.count, 0) || 1;
  const peakHour = hours.reduce((best, h) => h.count > best.count ? h : best, { h: 0, count: 0 });
  const COLORS = ["bg-primary", "bg-violet-500", "bg-amber-500"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      { l: "Vues 30j", v: loading ? "…" : totals.views.toString(), icon: Eye },
      { l: "Clics liens", v: loading ? "…" : totals.clicks.toString(), icon: MousePointerClick },
      { l: "Contacts sauvés", v: loading ? "…" : totals.saves.toString(), icon: Save },
      { l: "Taux engagement", v: loading ? "…" : `${totals.engagement}%`, icon: TrendingUp }
    ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-wider mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-3.5 w-3.5" }),
        " ",
        k.l
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: k.v })
    ] }, k.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Activité sur 30 jours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vues & sauvegardes contact" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }),
            " Vues"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
            " Sauvés"
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 flex items-center justify-center text-muted-foreground text-sm", children: "Chargement…" }) : days.every((d) => d.scans === 0 && d.saves === 0) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-8 w-8 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Aucune activité sur 30 jours.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "Partagez votre carte pour voir apparaître des données." })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-48", children: days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-0.5 min-h-0", title: `${d.d}: ${d.scans} vues, ${d.saves} sauvés`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-primary/70 rounded-t-sm hover:bg-primary transition", style: { height: `${d.scans / maxScan * 160}px`, minHeight: d.scans > 0 ? 2 : 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-emerald-500/70 rounded-t-sm", style: { height: `${d.saves / maxScan * 80}px`, minHeight: d.saves > 0 ? 2 : 0 } })
        ] }, d.d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "il y a 30j" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "il y a 15j" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "aujourd'hui" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-1", children: "Heatmap horaire" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Quand vos contacts consultent votre carte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-12 gap-1", children: hours.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-square rounded-sm transition",
            style: { background: `hsl(var(--primary) / ${Math.max(0.06, h.count / maxHour)})` },
            title: `${h.h}h — ${h.count} événement${h.count !== 1 ? "s" : ""}`
          },
          h.h
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "00h" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12h" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "23h" })
        ] }),
        peakHour.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-3", children: [
          "Pic d'activité : ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
            peakHour.h,
            "h–",
            peakHour.h + 1,
            "h"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-1", children: "Sources de trafic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Comment ils arrivent sur votre carte" }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Chargement…" }) : sources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Aucune donnée disponible." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sources.map((s, i) => {
          const pct = Math.round(s.count / totalSrc * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${COLORS[i % COLORS.length]}` }),
                s.source
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${COLORS[i % COLORS.length]} rounded-full`, style: { width: `${pct}%` } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
              s.count,
              " événement",
              s.count !== 1 ? "s" : ""
            ] })
          ] }, s.source);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3.5 w-3.5" }),
          " Données d'appareils disponibles prochainement."
        ] }) })
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./account-itSqCcVl.mjs");
const Route$2 = createFileRoute("/dashboard/account")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./abonnement-CdCb4eC3.mjs");
const Route$1 = createFileRoute("/dashboard/abonnement")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./inscription.offre._plan-BWWyd8s_.mjs");
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
const TemplatesRoute = Route$D.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$E
});
const PricingRoute = Route$C.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$E
});
const OnboardingRoute = Route$B.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$E
});
const OffresRoute = Route$A.update({
  id: "/offres",
  path: "/offres",
  getParentRoute: () => Route$E
});
const InscriptionRoute = Route$z.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$E
});
const DashboardRoute = Route$y.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$E
});
const ConnexionRoute = Route$x.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$E
});
const CartePhysiqueRoute = Route$w.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => Route$E
});
const BuilderRoute = Route$v.update({
  id: "/builder",
  path: "/builder",
  getParentRoute: () => Route$E
});
const BienvenueRoute = Route$u.update({
  id: "/bienvenue",
  path: "/bienvenue",
  getParentRoute: () => Route$E
});
const SlugRoute = Route$t.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => Route$E
});
const IndexRoute = Route$s.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$E
});
const InscriptionIndexRoute = Route$r.update({
  id: "/",
  path: "/",
  getParentRoute: () => InscriptionRoute
});
const DashboardIndexRoute = Route$q.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const AdminIndexRoute = Route$p.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$E
});
const InscriptionSelectionDePlanRoute = Route$o.update({
  id: "/selection-de-plan",
  path: "/selection-de-plan",
  getParentRoute: () => InscriptionRoute
});
const InscriptionCartePhysiqueRoute = Route$n.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => InscriptionRoute
});
const DashboardThemeRoute = Route$m.update({
  id: "/theme",
  path: "/theme",
  getParentRoute: () => DashboardRoute
});
const DashboardTeamRoute = Route$l.update({
  id: "/team",
  path: "/team",
  getParentRoute: () => DashboardRoute
});
const DashboardStyleRoute = Route$k.update({
  id: "/style",
  path: "/style",
  getParentRoute: () => DashboardRoute
});
const DashboardStatistiquesRoute = Route$j.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => DashboardRoute
});
const DashboardShareRoute = Route$i.update({
  id: "/share",
  path: "/share",
  getParentRoute: () => DashboardRoute
});
const DashboardSettingsRoute = Route$h.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => DashboardRoute
});
const DashboardOrdersRoute = Route$g.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => DashboardRoute
});
const DashboardNotificationsRoute = Route$f.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => DashboardRoute
});
const DashboardModelesRoute = Route$e.update({
  id: "/modeles",
  path: "/modeles",
  getParentRoute: () => DashboardRoute
});
const DashboardMediaRoute = Route$d.update({
  id: "/media",
  path: "/media",
  getParentRoute: () => DashboardRoute
});
const DashboardLinksRoute = Route$c.update({
  id: "/links",
  path: "/links",
  getParentRoute: () => DashboardRoute
});
const DashboardLeadsRoute = Route$b.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => DashboardRoute
});
const DashboardIntegrationsRoute = Route$a.update({
  id: "/integrations",
  path: "/integrations",
  getParentRoute: () => DashboardRoute
});
const DashboardHelpRoute = Route$9.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => DashboardRoute
});
const DashboardContentRoute = Route$8.update({
  id: "/content",
  path: "/content",
  getParentRoute: () => DashboardRoute
});
const DashboardContactsRoute = Route$7.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => DashboardRoute
});
const DashboardCarteRoute = Route$6.update({
  id: "/carte",
  path: "/carte",
  getParentRoute: () => DashboardRoute
});
const DashboardCardRoute = Route$5.update({
  id: "/card",
  path: "/card",
  getParentRoute: () => DashboardRoute
});
const DashboardBillingRoute = Route$4.update({
  id: "/billing",
  path: "/billing",
  getParentRoute: () => DashboardRoute
});
const DashboardAnalyticsRoute = Route$3.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => DashboardRoute
});
const DashboardAccountRoute = Route$2.update({
  id: "/account",
  path: "/account",
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
  DashboardAccountRoute,
  DashboardAnalyticsRoute,
  DashboardBillingRoute,
  DashboardCardRoute,
  DashboardCarteRoute,
  DashboardContactsRoute,
  DashboardContentRoute,
  DashboardHelpRoute,
  DashboardIntegrationsRoute,
  DashboardLeadsRoute,
  DashboardLinksRoute,
  DashboardMediaRoute,
  DashboardModelesRoute,
  DashboardNotificationsRoute,
  DashboardOrdersRoute,
  DashboardSettingsRoute,
  DashboardShareRoute,
  DashboardStatistiquesRoute,
  DashboardStyleRoute,
  DashboardTeamRoute,
  DashboardThemeRoute,
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
const routeTree = Route$E._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Button as B,
  CARD_THEMES as C,
  DEFAULT_CARD as D,
  Footer as F,
  Input as I,
  Nav as N,
  PromoBar as P,
  Route$t as R,
  Switch as S,
  Toaster as T,
  cn as a,
  useAuthStore as b,
  createSsrRpc as c,
  Badge as d,
  PROFESSIONS as e,
  THEMES_BY_ID as f,
  getProfileMeta as g,
  PROFESSION_CATEGORIES as h,
  PROFESSIONS_BY_THEME as i,
  Countdown as j,
  usePlan as k,
  BRICK_VARIANTS as l,
  DEFAULT_SECTION_ORDER as m,
  Route as n,
  router as r,
  setProfileMeta as s,
  useCardStore as u
};
