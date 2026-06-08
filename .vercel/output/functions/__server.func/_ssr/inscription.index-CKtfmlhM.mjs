import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { T as Toaster, c as createSsrRpc } from "./router-Bvednol5.mjs";
import { c as createServerFn } from "./server-3zrl17IG.mjs";
import "../_libs/seroval.mjs";
import { Z as Zap, V as ShieldCheck, as as Lock, am as EyeOff, m as Eye, U as Users, a1 as Star, p as TrendingUp, ay as Award, aE as Quote } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const schema$1 = objectType({
  email: stringType().trim().email(),
  password: stringType().min(8)
});
const signUpWithAutoConfirm = createServerFn({
  method: "POST"
}).validator(schema$1).handler(createSsrRpc("0120aeaa0f47d7c1f4e57cd64d068c07586b4cb2e48a69607fe50ccd733d2a79"));
const schema = objectType({
  email: stringType().trim().email({
    message: "Email invalide"
  }),
  password: stringType().min(8, {
    message: "8 caractères minimum"
  })
});
function InscriptionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const parsed = schema.safeParse({
      email,
      password
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const result = await signUpWithAutoConfirm({
        data: {
          email: parsed.data.email,
          password: parsed.data.password
        }
      });
      if (result.exists) {
        const {
          error: signInError
        } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password
        });
        if (signInError) {
          toast.error("Ce compte existe déjà. Va sur la page connexion.");
          return;
        }
      } else {
        const {
          error: signInError
        } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password
        });
        if (signInError) {
          toast.error(signInError.message);
          return;
        }
      }
      navigate({
        to: "/builder"
      });
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-soft flex flex-col lg:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "lg:hidden px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "OneTap" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-start sm:items-center justify-center px-4 pb-12 lg:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl", children: "OneTap" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-magenta mb-2", children: "Rejoins OneTap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "Inscris-toi gratuitement !" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Carte de visite digitale, sans engagement, sans carte bancaire." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                "100 % gratuit"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
                "Sans engagement"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-foreground mb-1.5", children: "E-mail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition", placeholder: "ton.email@exemple.com" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-foreground mb-1.5", children: "Mot de passe" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: showPassword ? "text" : "password", required: true, autoComplete: "new-password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition", placeholder: "8 caractères minimum" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full bg-gradient-cta text-primary-foreground rounded-full py-3 text-sm font-semibold shadow-card hover:shadow-glow transition-all disabled:opacity-60", children: submitting ? "Création du compte…" : "Créer mon compte →" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] leading-relaxed text-muted-foreground", children: "En créant un compte, tu acceptes nos conditions générales et notre politique de confidentialité." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "Tu as déjà un compte ?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/connexion", className: "text-magenta font-semibold hover:underline", children: "Connecte-toi" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-1 relative items-center justify-center px-12 py-16 overflow-hidden bg-gradient-to-br from-[#1a0b2e]/90 via-[#2d1b4e]/80 to-[#1a0b2e]/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-20 w-72 h-72 bg-magenta rounded-full blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-20 w-96 h-96 bg-violet rounded-full blur-[140px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-lg space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-magenta" }), iconBg: "bg-magenta/20", value: "+12 400", label: "Professionnels utilisent OneTap chaque jour" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400" }), iconBg: "bg-amber-500/20", value: "4.9/5", label: "Note moyenne sur +2 800 avis vérifiés" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-emerald-400" }), iconBg: "bg-emerald-500/20", value: "+340 %", label: "De contacts échangés en moyenne" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-violet-300" }), iconBg: "bg-violet/30", value: "#1", label: "Appli carte de visite en France" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-8 h-8 text-magenta/60 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "text-lg text-white/90 leading-relaxed font-medium", children: "« J'ai créé ma carte en 2 minutes. Mes clients la scannent directement. C'est devenu indispensable. »" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-primary-foreground", children: "SR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: "Sarah R." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Consultante freelance · Paris" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-amber-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" }) }, s)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-white/40 font-medium mb-4", children: "Ils font confiance à OneTap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-8 opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl tracking-tight text-white/70", children: "KPMG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl tracking-tight text-white/70", children: "Deloitte" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl tracking-tight text-white/70", children: "BNP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl tracking-tight text-white/70", children: "L'Oréal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 text-white/40 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
              "RGPD conforme"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
              "Chiffrement SSL"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  iconBg,
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`, children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-white", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60", children: label })
  ] });
}
export {
  InscriptionPage as component
};
