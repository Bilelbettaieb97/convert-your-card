import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-7UunodIv.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { S as Shield, K as Key, G as Globe, D as Download, T as Trash2, C as CircleCheck, a as Circle, A as ArrowRight, b as Search, B as BookOpen, P as Play, M as MessageCircle, R as RefreshCw, c as CreditCard, d as ChevronRight, e as Clock, f as Receipt, E as ExternalLink, U as Users, g as Crown, h as Building2, i as Repeat2, j as ChartColumn, k as Earth, l as CalendarCheck, m as Package, Z as Zap, Q as QrCode, n as Truck, o as MapPin, p as ShieldCheck, q as Bell, r as Mail, s as SlidersHorizontal, t as Plug, u as CodeXml, v as CircleAlert, F as Flame, w as TrendingUp, x as GitCompare, y as Sparkles, L as LayoutDashboard, z as LogOut } from "../_libs/lucide-react.mjs";
import { o as objectType, e as enumType, s as stringType } from "../_libs/zod.mjs";
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
const appCss = "/assets/styles-BZ7Qi4lQ.css";
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
const Route$D = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CVD — Carte de visite digitale NFC" },
      { name: "description", content: "Crée ta carte de visite digitale et partage tes contacts en 1 tap. Gratuit, sans application." },
      { property: "og:title", content: "CVD — Carte de visite digitale NFC" },
      { property: "og:description", content: "Crée ta carte de visite digitale et partage tes contacts en 1 tap. Gratuit, sans application." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cartevisitedigitale.fr" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CVD — Carte de visite digitale NFC" },
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
  const { queryClient } = Route$D.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
const $$splitComponentImporter$u = () => import("./templates-tSg_y-0z.mjs");
const Route$C = createFileRoute("/templates")({
  head: () => ({
    meta: [{
      title: "Modèles de cartes de visite digitales par secteur — CVD"
    }, {
      name: "description",
      content: "Plus de 40 modèles de cartes de visite digitales prêts à l'emploi : immobilier, restauration, santé, BTP, beauté, conseil, avocat, photographe… Trouvez la carte qui ressemble à votre métier."
    }, {
      property: "og:title",
      content: "Modèles de cartes digitales par secteur — CVD"
    }, {
      property: "og:description",
      content: "Découvrez tous les modèles CVD classés par métier. Sélectionnez le vôtre et personnalisez-le en 3 minutes."
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
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./reset-password-VST9Ev9n.mjs");
const Route$B = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Nouveau mot de passe — Carte Visite Digitale"
    }, {
      name: "description",
      content: "Crée un nouveau mot de passe pour ton compte."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./pricing-DpFxUVYl.mjs");
const Route$A = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Activer ma carte — Choisissez votre plan"
    }, {
      name: "description",
      content: "Activez votre carte de visite digitale dès aujourd'hui. Essai gratuit 7 jours sur le plan Vitrine. Sans engagement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./onboarding-BTU5dmpx.mjs");
const Route$z = createFileRoute("/onboarding")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./offres-BTU5dmpx.mjs");
const Route$y = createFileRoute("/offres")({
  beforeLoad: () => {
    throw redirect({
      to: "/pricing"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./inscription-BFsOu0JM.mjs");
const Route$x = createFileRoute("/inscription")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./dashboard-PKmrsfun.mjs");
const Route$w = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — Ma carte digitale"
    }, {
      name: "description",
      content: "Personnalisez, partagez et suivez votre carte de visite digitale."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./connexion-Cbb5Itkb.mjs");
const Route$v = createFileRoute("/connexion")({
  head: () => ({
    meta: [{
      title: "Connexion — Carte Visite Digitale"
    }, {
      name: "description",
      content: "Connecte-toi à ton compte Carte Visite Digitale."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./carte-physique-DYvi49GK.mjs");
const Route$u = createFileRoute("/carte-physique")({
  head: () => ({
    meta: [{
      title: "Ajoute ta carte NFC physique — CVD"
    }, {
      name: "description",
      content: "Personnalise ta carte de visite NFC physique : couleur, finition, logo et nom. Une commande unique, livrée chez toi."
    }, {
      property: "og:title",
      content: "Ajoute ta carte NFC physique — CVD"
    }, {
      property: "og:description",
      content: "Carte NFC personnalisable, livrée chez toi. Paiement unique, en complément de ton abonnement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./builder-BtP1HYlU.mjs");
const Route$t = createFileRoute("/builder")({
  head: () => ({
    meta: [{
      title: "Builder — Carte de visite digitale"
    }, {
      name: "description",
      content: "Construisez votre carte de visite digitale brique par brique, avec aperçu mobile en direct."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./bienvenue-DY5Eu9Qw.mjs");
const Route$s = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [{
      title: "Bienvenue sur CVD !"
    }, {
      name: "description",
      content: "Votre abonnement est confirmé."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
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
const $$splitComponentImporter$j = () => import("../_slug-8mRr159b.mjs");
const getProfile = createServerFn({
  method: "GET"
}).validator((slug) => slug).handler(createSsrRpc("3abe21163060cdaebf0fca822dbccd0e90b15179a021cd21c9f2b19df9296d49"));
const Route$r = createFileRoute("/$slug")({
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
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
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
const $$splitComponentImporter$i = () => import("./index-yghR2VYK.mjs");
const Route$q = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CVD · Carte de visite digitale à 19,80€ — Partagez vos contacts en 1 tap"
    }, {
      name: "description",
      content: "Créez votre carte de visite digitale professionnelle en 3 minutes. Partagez vos coordonnées, réseaux et site en un seul tap. À partir de 19,80€. Sans abonnement."
    }, {
      property: "og:title",
      content: "CVD · La carte de visite digitale qui convertit"
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
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
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
    sessionStorage.removeItem("cvd_email");
    setUserEmail(null);
    navigate({
      to: "/"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm leading-tight", children: "Carte Visite Digitale" })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm leading-tight text-foreground", children: "Carte Visite Digitale" }),
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
const $$splitComponentImporter$h = () => import("./inscription.index-PIiGV3S3.mjs");
const Route$p = createFileRoute("/inscription/")({
  validateSearch: objectType({
    redirect: stringType().optional()
  }),
  head: () => ({
    meta: [{
      title: "Inscription — Carte Visite Digitale"
    }, {
      name: "description",
      content: "Crée ta carte de visite digitale gratuitement en 30 secondes. Aucun mot de passe requis."
    }, {
      property: "og:title",
      content: "Inscription — Carte Visite Digitale"
    }, {
      property: "og:description",
      content: "Rejoins +2 400 pros qui partagent leurs contacts en 1 tap."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./index-ZB-hsRqb.mjs");
const Route$o = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./index-fbn7TZ5R.mjs");
const Route$n = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./inscription.selection-de-plan-Bksc_LWN.mjs");
const Route$m = createFileRoute("/inscription/selection-de-plan")({
  head: () => ({
    meta: [{
      title: "Choisis ton forfait — CVD"
    }, {
      name: "description",
      content: "Trouve le forfait CVD : Free, Starter, Pro ou Premium. Essai gratuit 7 jours."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./inscription.carte-physique-DYvi49GK.mjs");
const Route$l = createFileRoute("/inscription/carte-physique")({
  head: () => ({
    meta: [{
      title: "Ajoute ta carte NFC physique — CVD"
    }, {
      name: "description",
      content: "Personnalise ta carte de visite NFC physique : couleur, finition, logo et nom. Une commande unique, livrée chez toi."
    }, {
      property: "og:title",
      content: "Ajoute ta carte NFC physique — CVD"
    }, {
      property: "og:description",
      content: "Carte NFC personnalisable, livrée chez toi. Paiement unique, en complément de ton abonnement."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./theme-BUmgPEqD.mjs");
const Route$k = createFileRoute("/dashboard/theme")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const Route$j = createFileRoute("/dashboard/team")({
  head: () => ({ meta: [{ title: "Équipe — Dashboard" }] }),
  component: TeamPage
});
function TeamPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon$4, {});
}
function ComingSoon$4() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
        style: { background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.1))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-sky-400" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border",
        style: { background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.2)", color: "#38bdf8" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" }),
          "En développement"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Gestion d'équipe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Déployez la carte digitale à toute votre équipe en quelques clics. Un branding unifié, des cartes individuelles, une gestion centralisée. Idéal pour les commerciaux, les agences et les PME." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-amber-400" }), label: "Rôles Admin / Membre", detail: "Contrôlez qui peut modifier quoi sur chaque carte" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-sky-400" }), label: "Cartes multi-profils", detail: "Une carte différente par collaborateur, une seule facture" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-violet-400" }), label: "Branding unifié", detail: "Logo, couleurs et style partagés sur toute l'équipe" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat2, { className: "w-4 h-4 text-emerald-400" }), label: "Invitations par email", detail: "Onboardez un nouveau membre en 30 secondes" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-rose-400" }), label: "Stats consolidées", detail: "Vue globale des scans et clics de toute l'équipe" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-orange-400" }), label: "Permissions granulaires", detail: "Bloquez l'édition du contenu pour certains membres" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-4 h-4 text-teal-400" }), label: "Annuaire d'équipe", detail: "Page publique listant tous vos collaborateurs" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-indigo-400" }), label: "Jusqu'à 50 membres", detail: "Plans Business et Enterprise adaptés à votre taille" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://calendly.com/convertilab-5bsc/30min",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90",
        style: { background: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
          "Réserver une démo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
const $$splitComponentImporter$b = () => import("./style-rGi6vlDX.mjs");
const Route$i = createFileRoute("/dashboard/style")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./statistiques-BSbxgCzu.mjs");
const Route$h = createFileRoute("/dashboard/statistiques")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
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
const Route$g = createFileRoute("/dashboard/settings")({
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
const Route$f = createFileRoute("/dashboard/orders")({
  head: () => ({ meta: [{ title: "Commandes NFC — Dashboard" }] }),
  component: OrdersPage
});
function OrdersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon$3, {});
}
function ComingSoon$3() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
        style: { background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-amber-400" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border",
        style: { background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#fbbf24" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" }),
          "En développement"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Commandes NFC" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Votre carte digitale, maintenant aussi en physique. Commandez votre carte NFC préprogrammée — un tap suffit pour partager votre profil. Suivi de livraison, historique et renouvellement gérés ici." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-amber-400" }), label: "Tap & partage instantané", detail: "Un seul tap NFC ouvre votre carte sur n'importe quel smartphone" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-violet-400" }), label: "QR code gravé au dos", detail: "Compatible iPhone et appareils sans NFC" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-sky-400" }), label: "Carte toujours à jour", detail: "Modifiez votre profil sans racheter de carte" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-emerald-400" }), label: "Suivi de livraison", detail: "Colissimo avec numéro de suivi en temps réel" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-rose-400" }), label: "Plusieurs modèles", detail: "Noire mat, transparente, bambou — choisissez votre style" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-teal-400" }), label: "Livraison partout en France", detail: "Expédition sous 5 jours ouvrés, offerte dès 2 cartes" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-indigo-400" }), label: "Facturation intégrée", detail: "Facture téléchargeable directement depuis le dashboard" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-orange-400" }), label: "Commandes équipe", detail: "Commandez en lot pour toute votre équipe à prix réduit" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://calendly.com/convertilab-5bsc/30min",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90",
        style: { background: "linear-gradient(135deg,#f59e0b,#ef4444)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
          "Réserver une démo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
const Route$e = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
  component: NotificationsPage
});
function NotificationsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon$2, {});
}
function ComingSoon$2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
        style: { background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-amber-400" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border",
        style: { background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#fbbf24" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" }),
          "En développement"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Centre de notifications" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Soyez averti à chaque interaction sur votre carte — scan, clic, contact sauvegardé. Configurez précisément ce que vous recevez, par quel canal, et quand. Ne manquez plus jamais un prospect chaud." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-amber-400" }), label: "Alertes en temps réel", detail: "Notification dès qu'un scan arrive" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-sky-400" }), label: "Email instantané", detail: "Récap scan + infos du contact" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-emerald-400" }), label: "WhatsApp / SMS", detail: "Alerte sur votre téléphone pro" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-violet-400" }), label: "Préférences fines", detail: "Activez / désactivez par type d'événement" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat2, { className: "w-4 h-4 text-rose-400" }), label: "Résumé hebdomadaire", detail: "Bilan automatique chaque lundi matin" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-teal-400" }), label: "Historique 90 jours", detail: "Retrouvez toutes vos interactions passées" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://calendly.com/convertilab-5bsc/30min",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90",
        style: { background: "linear-gradient(135deg,#f59e0b,#ef4444)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
          "Réserver une démo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
const $$splitComponentImporter$9 = () => import("./modeles-BTU5dmpx.mjs");
const Route$d = createFileRoute("/dashboard/modeles")({
  beforeLoad: () => {
    throw redirect({
      to: "/builder"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./media-B2dVrMAy.mjs");
const Route$c = createFileRoute("/dashboard/media")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./links-CUiWrbrD.mjs");
const Route$b = createFileRoute("/dashboard/links")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./leads-B-MPN7Ez.mjs");
const Route$a = createFileRoute("/dashboard/leads")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const Route$9 = createFileRoute("/dashboard/integrations")({
  head: () => ({ meta: [{ title: "Intégrations — Dashboard" }] }),
  component: IntegrationsPage
});
function IntegrationsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon$1, {});
}
function ComingSoon$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
        style: { background: "linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.1))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plug, { className: "w-8 h-8 text-purple-400" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border",
        style: { background: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.2)", color: "#c084fc" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" }),
          "En développement"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Intégrations" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Chaque scan, clic ou contact sauvegardé peut déclencher automatiquement une action dans vos outils. Branchez votre CRM, votre emailing, Zapier ou votre propre backend — zéro saisie manuelle, tout est automatisé." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-orange-400" }), label: "HubSpot & Salesforce", detail: "Création de lead auto à chaque scan de votre carte" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-amber-400" }), label: "Zapier & Make", detail: "Connectez 5 000+ apps sans écrire une ligne de code" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-sky-400" }), label: "Mailchimp & Brevo", detail: "Abonnement liste email automatique à chaque nouveau contact" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-4 h-4 text-emerald-400" }), label: "Google Contacts", detail: "Sauvegarde directe dans votre carnet d'adresses Google" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-violet-400" }), label: "Slack & Teams", detail: "Notification dans votre canal à chaque interaction" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4 text-rose-400" }), label: "Calendly & Cal.com", detail: "Bouton de prise de RDV intégré directement sur votre carte" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-4 h-4 text-teal-400" }), label: "Webhooks sur-mesure", detail: "Envoyez chaque événement vers votre propre backend" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-indigo-400" }), label: "Google Analytics & GTM", detail: "Trackez les conversions de votre carte dans vos dashboards" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://calendly.com/convertilab-5bsc/30min",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90",
        style: { background: "linear-gradient(135deg,#a855f7,#3b82f6)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
          "Réserver une démo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
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
const KEY$1 = "cyk.card.v1";
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
    const raw = localStorage.getItem(KEY$1);
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
      localStorage.setItem(KEY$1, JSON.stringify(data));
    } catch {
    }
  }, [data, hydrated]);
  const update = reactExports.useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);
  const reset = reactExports.useCallback(() => setData(DEFAULT_CARD), []);
  return { data, setData, update, reset, hydrated };
}
const KEY = "nfc_profile";
function getProfileMeta() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}
function setProfileMeta(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
const Route$8 = createFileRoute("/dashboard/help")({
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
    { done: true, label: "Créer votre compte", desc: "Bienvenue sur CVD" },
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "12 vidéos pour maîtriser CVD en 30 min" }),
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
const $$splitComponentImporter$5 = () => import("./content-D3842AXc.mjs");
const Route$7 = createFileRoute("/dashboard/content")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contacts-D5am96OJ.mjs");
const Route$6 = createFileRoute("/dashboard/contacts")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./carte-Cqklb13b.mjs");
const Route$5 = createFileRoute("/dashboard/carte")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./card-DLJ8uBrz.mjs");
const Route$4 = createFileRoute("/dashboard/card")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const createPortalSession = createServerFn({
  method: "POST"
}).validator(objectType({
  customerId: stringType(),
  returnUrl: stringType()
})).handler(createSsrRpc("2e17a70aeffaf4196790c75ccf3602084408674a8cc1fb8f8e0218e607ad3e55"));
const getStripeInvoices = createServerFn({
  method: "POST"
}).validator(objectType({
  customerId: stringType()
})).handler(createSsrRpc("73033594ac1edfd8b627fe3a9eeccaaab479f666cbb41cc712f872db98fad95d"));
const getStripeCard = createServerFn({
  method: "POST"
}).validator(objectType({
  email: stringType().email(),
  customerId: stringType().optional()
})).handler(createSsrRpc("42940a7c372e29724e93284d98b4c48664406802d496bfae41a4d75b04cc26f3"));
const Route$3 = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Facturation — Dashboard" }] }),
  component: BillingPage
});
const PLAN_META = {
  free: { label: "Gratuit", price: "0 €/mois", gradient: "linear-gradient(135deg,#374151,#4b5563)", color: "#9ca3af" },
  starter: { label: "Starter", price: "6 €/mois", gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#3b82f6" },
  pro: { label: "Pro", price: "13 €/mois", gradient: "linear-gradient(135deg,#7c3aed,#EC4899)", color: "#8B5CF6" },
  premium: { label: "Premium", price: "32 €/mois", gradient: "linear-gradient(135deg,#b45309,#F59E0B)", color: "#F59E0B" },
  essentielle: { label: "Essentielle", price: "9,80 €/mois", gradient: "linear-gradient(135deg,#0f766e,#0ea5e9)", color: "#0ea5e9" },
  vitrine: { label: "Vitrine", price: "15,80 €/mois", gradient: "linear-gradient(135deg,#7c3aed,#EC4899)", color: "#8B5CF6" }
};
function fmtDate(ts) {
  return new Date(ts * 1e3).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function fmtAmount(amount, currency) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}
function fmtIso(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function StatusChip({ status }) {
  if (status === "active") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
    "Actif"
  ] });
  if (status === "trialing") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    "Essai gratuit"
  ] });
  if (status === "canceled") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
    "Annulé"
  ] });
  if (status === "past_due") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
    "Paiement en retard"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground border border-border", children: status ?? "—" });
}
function InvoiceStatus({ status }) {
  if (status === "paid") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-emerald-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
    " Payée"
  ] });
  if (status === "open") return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-amber-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    " En attente"
  ] });
  if (status === "void") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Annulée" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: status });
}
function BillingPage() {
  const [sub, setSub] = reactExports.useState(null);
  const [profilePlan, setProfilePlan] = reactExports.useState(null);
  const [card, setCard] = reactExports.useState(null);
  const [invoices, setInvoices] = reactExports.useState([]);
  const [loadingSub, setLoadingSub] = reactExports.useState(true);
  const [loadingInvoices, setLoadingInvoices] = reactExports.useState(false);
  const [openingPortal, setOpeningPortal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoadingSub(false);
        return;
      }
      const [{ data: subData }, { data: profileData }] = await Promise.all([
        supabase.from("subscriptions").select("plan, status, current_period_end, stripe_customer_id, stripe_subscription_id").eq("user_id", user.id).maybeSingle(),
        supabase.from("nfc_profiles").select("plan").eq("user_id", user.id).maybeSingle()
      ]);
      const s = subData;
      setSub(s);
      setProfilePlan(profileData?.plan ?? null);
      setLoadingSub(false);
      try {
        const cardInfo2 = await getStripeCard({
          data: {
            email: user.email,
            customerId: s?.stripe_customer_id ?? void 0
          }
        });
        if (cardInfo2) {
          setCard(cardInfo2);
          if (!s?.stripe_customer_id && cardInfo2.customerId) {
            setSub((prev) => ({
              plan: prev?.plan ?? null,
              status: prev?.status ?? null,
              current_period_end: prev?.current_period_end ?? null,
              stripe_subscription_id: prev?.stripe_subscription_id ?? null,
              stripe_customer_id: cardInfo2.customerId
            }));
          }
        }
      } catch {
      }
      const resolvedCustomerId = s?.stripe_customer_id ?? cardInfo?.customerId;
      if (resolvedCustomerId) {
        setLoadingInvoices(true);
        try {
          const list = await getStripeInvoices({ data: { customerId: resolvedCustomerId } });
          setInvoices(list);
        } catch {
        }
        setLoadingInvoices(false);
      }
    });
  }, []);
  async function openPortal() {
    if (!sub?.stripe_customer_id) return;
    setOpeningPortal(true);
    try {
      const returnUrl = window.location.href;
      const { url } = await createPortalSession({ data: { customerId: sub.stripe_customer_id, returnUrl } });
      if (url) window.location.href = url;
    } catch {
      setOpeningPortal(false);
    }
  }
  const plan = sub?.plan && sub.plan !== "free" ? sub.plan : profilePlan ?? sub?.plan ?? "free";
  const meta = PLAN_META[plan] ?? PLAN_META.free;
  const hasSub = !!(sub?.stripe_customer_id || card?.customerId);
  const cardBrand = card ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1) : null;
  const cardLabel = card ? `${cardBrand} •••• ${card.last4}` : hasSub ? "Carte enregistrée" : "Aucune";
  const cardSub = card ? `Expire ${String(card.exp_month).padStart(2, "0")}/${card.exp_year}` : hasSub ? "Gérable via Stripe" : "Abonnement gratuit";
  if (loadingSub) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 lg:p-8 max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden p-6", style: { background: meta.gradient }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", style: { background: "radial-gradient(circle at 80% 20%, white, transparent 60%)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col sm:flex-row sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-1", children: "Plan actuel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white", children: meta.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: sub?.status ?? null })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mt-1", children: meta.price }),
          sub?.current_period_end && sub.status !== "canceled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/45 text-xs mt-2", children: [
            sub.status === "trialing" ? "Essai jusqu'au" : "Renouvellement le",
            " ",
            fmtIso(sub.current_period_end)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 shrink-0", children: [
          hasSub && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: openPortal,
              disabled: openingPortal,
              className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 text-white transition disabled:opacity-60",
              children: [
                openingPortal ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                "Gérer via Stripe"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/dashboard/account",
              className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white/60 hover:text-white transition",
              children: [
                "Changer d'abonnement ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Méthode de paiement",
          value: cardLabel,
          sub: cardSub,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
          action: hasSub ? { label: "Modifier", onClick: openPortal, loading: openingPortal } : void 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Prochain prélèvement",
          value: sub?.current_period_end && sub.status === "active" ? fmtIso(sub.current_period_end) : "—",
          sub: plan !== "free" && sub?.status === "active" ? meta.price : sub?.status === "trialing" ? "Fin de l'essai" : "Aucun abonnement actif",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Factures",
          value: loadingInvoices ? "…" : `${invoices.length} facture${invoices.length !== 1 ? "s" : ""}`,
          sub: invoices.length > 0 ? `Dernière : ${fmtAmount(invoices[0].amount, invoices[0].currency)}` : hasSub ? "Aucune pour l'instant" : "Non applicable",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 border-b border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Historique des factures" }),
        hasSub && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: openPortal,
            disabled: openingPortal,
            className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
              " Portail Stripe"
            ]
          }
        )
      ] }),
      loadingInvoices ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-10 flex items-center justify-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
        " Chargement des factures…"
      ] }) : invoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-10 h-10 mx-auto opacity-15 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Aucune facture pour l'instant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 opacity-70", children: hasSub ? "Vos prochaines factures apparaîtront ici après le premier prélèvement." : "Les factures s'affichent dès que vous avez un abonnement actif." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: invoices.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 flex items-center gap-4 hover:bg-muted/20 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground font-mono", children: inv.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceStatus, { status: inv.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
            fmtDate(inv.period_start),
            " → ",
            fmtDate(inv.period_end)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground shrink-0", children: fmtAmount(inv.amount, inv.currency) }),
        inv.pdf ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: inv.pdf,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "shrink-0 h-8 w-8 grid place-items-center rounded-lg bg-muted hover:bg-accent transition text-muted-foreground hover:text-foreground",
            title: "Télécharger la facture PDF",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 h-8 w-8" })
      ] }, inv.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      "Questions ou changement de plan ?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/account", className: "underline underline-offset-2 hover:text-foreground transition", children: "Voir tous les plans" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:bilel@convertilab.com", className: "underline underline-offset-2 hover:text-foreground transition", children: "Contacter le support" })
    ] })
  ] });
}
function InfoCard({
  label,
  value,
  sub,
  icon,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-wider", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: sub })
    ] }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: action.onClick,
        disabled: action.loading,
        className: "mt-auto text-[11px] text-primary hover:underline transition text-left disabled:opacity-50",
        children: action.loading ? "Chargement…" : action.label + " →"
      }
    )
  ] });
}
const Route$2 = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Statistiques avancées — Dashboard" }] }),
  component: AnalyticsPage
});
function AnalyticsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, {});
}
function ComingSoon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6",
        style: { background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.1))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-8 h-8 text-indigo-400" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border",
        style: { background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#818cf8" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" }),
          "En développement"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-3", children: "Statistiques avancées" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: [
      "Allez bien au-delà des simples compteurs. Comprenez ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic font-medium text-foreground", children: "quand" }),
      ", ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic font-medium text-foreground", children: "où" }),
      " et ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic font-medium text-foreground", children: "comment" }),
      " vos contacts interagissent avec votre carte — pour partager au bon endroit, au bon moment, et convertir davantage."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-left mb-8", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-400" }), label: "Heatmap horaire", detail: "Pic d'activité par heure de la journée" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-4 h-4 text-sky-400" }), label: "Carte géographique", detail: "Villes et pays de vos scans" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-emerald-400" }), label: "Sources de trafic", detail: "NFC, QR code, lien direct, réseaux" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-violet-400" }), label: "Durée de consultation", detail: "Temps passé sur votre carte" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4 text-amber-400" }), label: "Comparaison de périodes", detail: "Semaine vs semaine, mois vs mois" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-rose-400" }), label: "Localisation des scans", detail: "Événements, salons, lieux physiques" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-indigo-400" }), label: "Engagement par section", detail: "Quelle partie de votre carte performe" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-teal-400" }), label: "Export des données", detail: "CSV complet sur la période choisie" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: f.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: f.detail })
      ] })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://calendly.com/convertilab-5bsc/30min",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90",
        style: { background: "linear-gradient(135deg,#6366f1,#EC4899)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
          "Réserver une démo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible très prochainement — restez connecté." })
  ] }) });
}
const $$splitComponentImporter$1 = () => import("./account-C_vW-heJ.mjs");
const Route$1 = createFileRoute("/dashboard/account")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./inscription.offre._plan-BrbzlKGC.mjs");
const Route = createFileRoute("/inscription/offre/$plan")({
  validateSearch: objectType({
    billing: enumType(["monthly", "annual"]).default("monthly")
  }),
  head: ({
    params
  }) => ({
    meta: [{
      title: `Offre ${params.plan} — CVD`
    }, {
      name: "description",
      content: "Abonne-toi à CVD et lance ta carte de visite digitale."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TemplatesRoute = Route$C.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$D
});
const ResetPasswordRoute = Route$B.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$D
});
const PricingRoute = Route$A.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$D
});
const OnboardingRoute = Route$z.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$D
});
const OffresRoute = Route$y.update({
  id: "/offres",
  path: "/offres",
  getParentRoute: () => Route$D
});
const InscriptionRoute = Route$x.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$D
});
const DashboardRoute = Route$w.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$D
});
const ConnexionRoute = Route$v.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$D
});
const CartePhysiqueRoute = Route$u.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => Route$D
});
const BuilderRoute = Route$t.update({
  id: "/builder",
  path: "/builder",
  getParentRoute: () => Route$D
});
const BienvenueRoute = Route$s.update({
  id: "/bienvenue",
  path: "/bienvenue",
  getParentRoute: () => Route$D
});
const SlugRoute = Route$r.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => Route$D
});
const IndexRoute = Route$q.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$D
});
const InscriptionIndexRoute = Route$p.update({
  id: "/",
  path: "/",
  getParentRoute: () => InscriptionRoute
});
const DashboardIndexRoute = Route$o.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const AdminIndexRoute = Route$n.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$D
});
const InscriptionSelectionDePlanRoute = Route$m.update({
  id: "/selection-de-plan",
  path: "/selection-de-plan",
  getParentRoute: () => InscriptionRoute
});
const InscriptionCartePhysiqueRoute = Route$l.update({
  id: "/carte-physique",
  path: "/carte-physique",
  getParentRoute: () => InscriptionRoute
});
const DashboardThemeRoute = Route$k.update({
  id: "/theme",
  path: "/theme",
  getParentRoute: () => DashboardRoute
});
const DashboardTeamRoute = Route$j.update({
  id: "/team",
  path: "/team",
  getParentRoute: () => DashboardRoute
});
const DashboardStyleRoute = Route$i.update({
  id: "/style",
  path: "/style",
  getParentRoute: () => DashboardRoute
});
const DashboardStatistiquesRoute = Route$h.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => DashboardRoute
});
const DashboardSettingsRoute = Route$g.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => DashboardRoute
});
const DashboardOrdersRoute = Route$f.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => DashboardRoute
});
const DashboardNotificationsRoute = Route$e.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => DashboardRoute
});
const DashboardModelesRoute = Route$d.update({
  id: "/modeles",
  path: "/modeles",
  getParentRoute: () => DashboardRoute
});
const DashboardMediaRoute = Route$c.update({
  id: "/media",
  path: "/media",
  getParentRoute: () => DashboardRoute
});
const DashboardLinksRoute = Route$b.update({
  id: "/links",
  path: "/links",
  getParentRoute: () => DashboardRoute
});
const DashboardLeadsRoute = Route$a.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => DashboardRoute
});
const DashboardIntegrationsRoute = Route$9.update({
  id: "/integrations",
  path: "/integrations",
  getParentRoute: () => DashboardRoute
});
const DashboardHelpRoute = Route$8.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => DashboardRoute
});
const DashboardContentRoute = Route$7.update({
  id: "/content",
  path: "/content",
  getParentRoute: () => DashboardRoute
});
const DashboardContactsRoute = Route$6.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => DashboardRoute
});
const DashboardCarteRoute = Route$5.update({
  id: "/carte",
  path: "/carte",
  getParentRoute: () => DashboardRoute
});
const DashboardCardRoute = Route$4.update({
  id: "/card",
  path: "/card",
  getParentRoute: () => DashboardRoute
});
const DashboardBillingRoute = Route$3.update({
  id: "/billing",
  path: "/billing",
  getParentRoute: () => DashboardRoute
});
const DashboardAnalyticsRoute = Route$2.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => DashboardRoute
});
const DashboardAccountRoute = Route$1.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => DashboardRoute
});
const InscriptionOffrePlanRoute = Route.update({
  id: "/offre/$plan",
  path: "/offre/$plan",
  getParentRoute: () => InscriptionRoute
});
const DashboardRouteChildren = {
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
  ResetPasswordRoute,
  TemplatesRoute,
  AdminIndexRoute
};
const routeTree = Route$D._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$r as R,
  Switch as S,
  Toaster as T,
  cn as a,
  useAuthStore as b,
  createSsrRpc as c,
  PROFESSIONS as d,
  THEMES_BY_ID as e,
  PROFESSION_CATEGORIES as f,
  getProfileMeta as g,
  PROFESSIONS_BY_THEME as h,
  Countdown as i,
  Route$p as j,
  BRICK_VARIANTS as k,
  DEFAULT_SECTION_ORDER as l,
  Route as m,
  router as r,
  setProfileMeta as s,
  useCardStore as u
};
