import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Toaster } from "./router-ccj0AfJi.mjs";
import "../_libs/seroval.mjs";
import { U as Users, aO as Plus, aP as ToggleRight, aQ as ToggleLeft, E as ExternalLink } from "../_libs/lucide-react.mjs";
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
import "./server-wiqPdL2d.mjs";
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
const ADMIN_EMAIL = "bilel@convertilab.com";
function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [profiles, setProfiles] = reactExports.useState([]);
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const [creating, setCreating] = reactExports.useState(false);
  const [newNom, setNewNom] = reactExports.useState("");
  const [newEmail, setNewEmail] = reactExports.useState("");
  const [newTelephone, setNewTelephone] = reactExports.useState("");
  const [newFonction, setNewFonction] = reactExports.useState("");
  const [newEntreprise, setNewEntreprise] = reactExports.useState("");
  reactExports.useEffect(() => {
    async function checkAuth() {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate({
          to: "/",
          replace: true
        });
        return;
      }
      setAuthorized(true);
      await loadProfiles();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);
  async function loadProfiles() {
    const {
      data
    } = await supabase.from("nfc_profiles").select("*").order("created_at", {
      ascending: false
    });
    setProfiles(data ?? []);
  }
  async function toggleActif(profile) {
    const {
      error
    } = await supabase.from("nfc_profiles").update({
      actif: !profile.actif
    }).eq("id", profile.id);
    if (error) {
      toast.error("Erreur lors de la mise à jour");
      return;
    }
    setProfiles((prev) => prev.map((p) => p.id === profile.id ? {
      ...p,
      actif: !p.actif
    } : p));
    toast.success(`Carte ${!profile.actif ? "activée" : "désactivée"}`);
  }
  async function handleCreateClient(e) {
    e.preventDefault();
    if (!newNom || !newEmail) {
      toast.error("Nom et email sont obligatoires");
      return;
    }
    setCreating(true);
    try {
      const baseSlug = newNom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
      let slug = baseSlug;
      let attempt = 0;
      while (true) {
        const {
          data
        } = await supabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
        if (!data) break;
        attempt++;
        slug = `${baseSlug}-${attempt}`;
      }
      const {
        error
      } = await supabase.from("nfc_profiles").insert({
        slug,
        nom: newNom,
        email: newEmail,
        telephone: newTelephone,
        fonction: newFonction,
        entreprise: newEntreprise,
        plan: "free",
        boutons: [],
        reseaux: [],
        actif: true
      });
      if (error) throw error;
      toast.success(`Profil créé : /${slug}`);
      setNewNom("");
      setNewEmail("");
      setNewTelephone("");
      setNewFonction("");
      setNewEntreprise("");
      setShowCreateForm(false);
      await loadProfiles();
    } catch (err) {
      toast.error("Erreur lors de la création du profil");
      console.error(err);
    } finally {
      setCreating(false);
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" }) });
  }
  if (!authorized) return null;
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border bg-card px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-magenta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-foreground", children: "Admin CVD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [
            profiles.length,
            " profils"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowCreateForm(!showCreateForm), className: "inline-flex items-center gap-2 bg-gradient-cta text-white px-4 py-2 rounded-full text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Nouveau client"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
        showCreateForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4", children: "Créer un nouveau profil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateClient, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1", children: "Nom *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newNom, onChange: (e) => setNewNom(e.target.value), required: true, placeholder: "Jean Dupont", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1", children: "Email *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newEmail, onChange: (e) => setNewEmail(e.target.value), required: true, type: "email", placeholder: "jean@exemple.fr", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1", children: "Téléphone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newTelephone, onChange: (e) => setNewTelephone(e.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1", children: "Fonction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newFonction, onChange: (e) => setNewFonction(e.target.value), placeholder: "Directeur commercial", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1", children: "Entreprise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newEntreprise, onChange: (e) => setNewEntreprise(e.target.value), placeholder: "Acme Corp", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: creating, className: "bg-gradient-cta text-white px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-60", children: creating ? "Création…" : "Créer le profil" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowCreateForm(false), className: "border border-border bg-background px-6 py-2.5 rounded-full text-sm font-medium", children: "Annuler" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell", children: "Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell", children: "Créé le" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Statut" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            profiles.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: profile.nom }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: profile.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-mono", children: [
                  "/",
                  profile.slug
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-magenta/10 text-magenta", children: profile.plan ?? "free" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-muted-foreground hidden lg:table-cell", children: profile.created_at ? new Date(profile.created_at).toLocaleDateString("fr-FR") : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleActif(profile), className: "inline-flex items-center gap-1.5 text-xs font-medium", children: profile.actif ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-5 h-5 text-emerald-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600", children: "Active" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-5 h-5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Inactive" })
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `${appUrl}/${profile.slug}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 text-xs text-magenta hover:underline font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                "Voir"
              ] }) })
            ] }, profile.id)),
            profiles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-5 py-8 text-center text-muted-foreground text-sm", children: "Aucun profil pour l'instant." }) })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};
