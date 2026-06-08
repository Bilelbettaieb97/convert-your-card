import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { P as PublicLinkBar, S as ShareGrid, Q as QrCard } from "./ShareGrid-DKWyXgfe.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { c as cn } from "./button-DjOZMqFS.mjs";
import { R as Root, P as Portal, C as Content, a as Close, O as Overlay, T as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as UpsellSection } from "./UpsellSection-B9mI9EC8.mjs";
import "../_libs/qrcode.mjs";
import { u as ExternalLink, E as Eye, an as MousePointerClick, ao as UserPlus, ap as ArrowUpRight, V as ChevronRight, aq as Scan, m as Check, w as WandSparkles, ar as LayoutGrid, v as CreditCard, a6 as ChartColumn, as as User, s as Copy, Q as QrCode, S as Sparkles, T as TrendingUp, at as TrendingDown, h as Search, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
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
import "fs";
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "zlib";
import "assert";
import "buffer";
function MetricCard({ icon: Icon, label, value, delta, spark, hint }) {
  const positive = (delta ?? 0) >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/40 p-4 transition hover:border-primary/40 hover:-translate-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-60 group-hover:opacity-100 transition", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 grid place-items-center rounded-md bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label })
      ] }),
      typeof delta === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-0.5 text-[11px] font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`, children: [
        positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
        Math.abs(delta),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl leading-none", children: value }),
        hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1.5", children: hint })
      ] }),
      spark && spark.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { points: spark, positive })
    ] })
  ] });
}
function Sparkline({ points, positive }) {
  const w = 70, h = 28;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p - min) / range * h}`).join(" ");
  const color = positive ? "rgb(52 211 153)" : "rgb(244 114 132)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: w, height: h, className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: "0.35" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `${d} L ${w} ${h} L 0 ${h} Z`, fill: "url(#sg)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d, fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
const CommandShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";
function CommandPalette({ publicUrl }) {
  const [open, setOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const go = (path) => {
    setOpen(false);
    navigate({ to: path });
  };
  const run = (fn) => {
    setOpen(false);
    fn();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Naviguer ou exécuter une action…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "Aucun résultat." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Navigation", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "mr-2 h-4 w-4" }),
          " Vue d'ensemble"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard/card"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
          " Ma carte"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard/share"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "mr-2 h-4 w-4" }),
          " Statistiques"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard/account"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-2 h-4 w-4" }),
          " Plan & compte"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Actions rapides", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => {
          navigator.clipboard.writeText(publicUrl);
          toast.success("Lien copié");
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-2 h-4 w-4" }),
          " Copier mon lien public",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { children: "⌘C" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => window.open(publicUrl, "_blank")), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
          " Ouvrir ma carte"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard/card#qr"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "mr-2 h-4 w-4" }),
          " Télécharger mon QR code"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/dashboard/account"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
          " Passer au plan Vitrine"
        ] })
      ] })
    ] })
  ] });
}
function buildSpark(events, type, days = 7) {
  const buckets = Array(days).fill(0);
  const now = Date.now();
  events.filter((e) => e.event_type === type && e.created_at).forEach((e) => {
    const age = Math.floor((now - new Date(e.created_at).getTime()) / 864e5);
    if (age < days) buckets[days - 1 - age]++;
  });
  return buckets;
}
function pct(cur, prev) {
  if (prev === 0) return cur > 0 ? 100 : 0;
  return Math.round((cur - prev) / prev * 100);
}
function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 6e4);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${Math.floor(h / 24)}j`;
}
function DashboardHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState(null);
  const [subscription, setSubscription] = reactExports.useState(null);
  const [analytics, setAnalytics] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function load() {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        navigate({
          to: "/connexion",
          replace: true
        });
        return;
      }
      const [profileRes, subRes] = await Promise.all([supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle(), supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle()]);
      setProfile(profileRes.data ?? null);
      setSubscription(subRes.data ?? null);
      if (profileRes.data?.id) {
        const {
          data: events
        } = await supabase.from("nfc_analytics").select("event_type, created_at").eq("profile_id", profileRes.data.id).order("created_at", {
          ascending: false
        }).limit(300);
        setAnalytics(events ?? []);
      }
      setLoading(false);
    }
    load();
  }, [navigate]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }) });
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const cardUrl = profile?.slug ? `${appUrl}/${profile.slug}` : null;
  const now = /* @__PURE__ */ new Date();
  const d7 = new Date(now.getTime() - 7 * 864e5);
  const d14 = new Date(now.getTime() - 14 * 864e5);
  const last7 = analytics.filter((e) => e.created_at && new Date(e.created_at) >= d7);
  const prev7 = analytics.filter((e) => {
    if (!e.created_at) return false;
    const d = new Date(e.created_at);
    return d >= d14 && d < d7;
  });
  const scans7 = last7.filter((e) => e.event_type === "scan").length;
  const clicks7 = last7.filter((e) => e.event_type === "button_click").length;
  const contacts7 = last7.filter((e) => e.event_type === "vcard_download").length;
  const prevScans = prev7.filter((e) => e.event_type === "scan").length;
  const prevClicks = prev7.filter((e) => e.event_type === "button_click").length;
  const prevContacts = prev7.filter((e) => e.event_type === "vcard_download").length;
  const sparkScans = buildSpark(analytics, "scan");
  const sparkClicks = buildSpark(analytics, "button_click");
  const sparkContacts = buildSpark(analytics, "vcard_download");
  const recentEvents = analytics.slice(0, 8);
  const eventMeta = {
    scan: {
      label: "Carte scannée",
      color: "var(--color-primary)"
    },
    button_click: {
      label: "Bouton cliqué",
      color: "#0EA5E9"
    },
    vcard_download: {
      label: "Contact sauvegardé",
      color: "#10B981"
    }
  };
  const hasPhoto = !!profile?.photo_url;
  const hasBio = !!profile?.bio;
  const hasBouton = Array.isArray(profile?.boutons) && profile.boutons.some((b) => b.active && b.value);
  const hasReseau = Array.isArray(profile?.reseaux) && profile.reseaux.some((r) => r.active && r.url);
  const hasFirstScan = analytics.some((e) => e.event_type === "scan");
  const hasShared = typeof window !== "undefined" && !!localStorage.getItem("shared_link");
  const checklist = [{
    done: true,
    label: "Créer mon compte",
    link: null
  }, {
    done: hasPhoto,
    label: "Ajouter ma photo",
    link: "/dashboard/carte"
  }, {
    done: hasBio,
    label: "Écrire ma bio",
    link: "/dashboard/carte"
  }, {
    done: hasBouton,
    label: "Activer un bouton d'action",
    link: "/dashboard/carte"
  }, {
    done: hasReseau,
    label: "Connecter un réseau social",
    link: "/dashboard/carte"
  }, {
    done: hasShared,
    label: "Partager mon lien",
    link: null
  }, {
    done: hasFirstScan,
    label: "Recevoir mon 1er scan",
    link: null
  }];
  const done = checklist.filter((c) => c.done).length;
  const pctDone = Math.round(done / checklist.length * 100);
  const allDone = done === checklist.length;
  const cardDataForShare = {
    name: profile?.nom ?? "",
    title: profile?.fonction ?? "",
    agency: profile?.entreprise ?? "",
    phone: profile?.telephone ?? "",
    email: profile?.email ?? "",
    website: profile?.site_web ?? "",
    bio: profile?.bio ?? "",
    photo: profile?.photo_url ?? "",
    coverPhoto: profile?.cover_url ?? "",
    accent: profile?.couleur_accent ?? "violet",
    profession: profile?.secteur ?? "",
    vcardEnabled: profile?.vcard_enabled ?? true
  };
  const planLabel = {
    free: "Gratuit",
    starter: "Starter",
    pro: "Pro",
    premium: "Premium"
  }[subscription?.plan ?? "free"] ?? "Gratuit";
  const firstName = profile?.nom?.split(" ")[0] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, { publicUrl: cardUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 lg:p-8 max-w-6xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold", children: [
            "Bonjour",
            firstName ? `, ${firstName}` : "",
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: cardUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Votre carte est ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500 font-medium", children: "active" }),
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "text-[10px] border border-border rounded px-1 py-0.5", children: "⌘K" }),
            " pour naviguer"
          ] }) : "Créez votre carte pour commencer." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20", children: [
            "Plan ",
            planLabel
          ] }),
          cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: cardUrl, target: "_blank", rel: "noopener noreferrer", className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:bg-accent transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
            " Voir ma carte"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 lg:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: Eye, label: "Scans — 7j", value: scans7, delta: pct(scans7, prevScans), spark: sparkScans, hint: `${analytics.filter((e) => e.event_type === "scan").length} total` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: MousePointerClick, label: "Clics — 7j", value: clicks7, delta: pct(clicks7, prevClicks), spark: sparkClicks }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { icon: UserPlus, label: "Contacts — 7j", value: contacts7, delta: pct(contacts7, prevContacts), spark: sparkContacts, hint: "vCards téléchargées" })
      ] }),
      cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/50 p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Partagez votre carte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: cardUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline", children: [
            "Ouvrir ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLinkBar, { url: cardUrl }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShareGrid, { data: cardDataForShare, url: cardUrl, compact: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-4", children: [
        cardUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(QrCard, { url: cardUrl, name: profile?.nom ?? "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/50 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Activité récente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/statistiques", className: "inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline", children: [
              "Tout voir ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
            ] })
          ] }),
          recentEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "w-8 h-8 text-muted-foreground/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune activité pour l'instant." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Partagez votre lien pour recevoir vos premiers scans." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentEvents.map((e, i) => {
            const m = eventMeta[e.event_type] ?? {
              label: e.event_type,
              color: "var(--color-primary)"
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: {
                background: m.color
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground flex-1", children: m.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground tabular-nums", children: timeAgo(e.created_at) })
            ] }, i);
          }) })
        ] })
      ] }),
      !allDone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/50 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Activez votre carte" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              done,
              "/",
              checklist.length,
              " étapes · ",
              pctDone,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-10 h-10 -rotate-90", viewBox: "0 0 36 36", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "18", r: "15", fill: "none", stroke: "var(--color-muted)", strokeWidth: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "18", r: "15", fill: "none", stroke: "var(--color-primary)", strokeWidth: "3", strokeDasharray: `${pctDone * 0.942} 100`, strokeLinecap: "round" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-[9px] font-bold", children: [
              pctDone,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-1.5", children: [
          checklist.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2.5 px-3 py-2 rounded-xl ${step.done ? "opacity-50" : "hover:bg-muted/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-emerald-500" : "border-2 border-border"}`, children: step.done && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-2.5 h-2.5 text-white" }) }),
            step.link && !step.done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: step.link, className: "text-xs font-medium hover:text-primary transition flex-1", children: [
              step.label,
              " →"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${step.done ? "line-through text-muted-foreground" : ""}`, children: step.label })
          ] }, step.label)),
          !profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", className: "flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-muted/50 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-2.5 h-2.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-primary", children: "Créer ma carte →" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UpsellSection, { variant: "compact" })
    ] })
  ] });
}
export {
  DashboardHome as component
};
