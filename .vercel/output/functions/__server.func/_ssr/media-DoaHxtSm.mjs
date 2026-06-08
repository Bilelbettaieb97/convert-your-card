import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { b as useAuthStore, u as useCardStore, h as getProfileMeta, B as Button } from "./router-BhM6SrjT.mjs";
import { l as loadMyCard, u as updateCard } from "./card-actions-B5wc-9xF.mjs";
import { B as BusinessCard } from "./BusinessCard-B6wY-877.mjs";
import { P as PhoneFrame } from "./PhoneFrame-B9V-8JK3.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { aW as CircleUserRound, aJ as LoaderCircle, au as Upload, aX as LayoutTemplate, af as Image, u as Check, aq as Copy, T as Trash2, aY as CirclePlus, r as Star, q as Tag } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-CBe0MCW0.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
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
const BUCKET = "nfc-photos";
const MAX_SIZE = 5 * 1024 * 1024;
function MediaPage() {
  const {
    user
  } = useAuthStore();
  const {
    data,
    setData,
    update,
    hydrated
  } = useCardStore();
  const profile = getProfileMeta();
  const [supabaseReady, setSupabaseReady] = reactExports.useState(false);
  const skipNextSave = reactExports.useRef(false);
  const [photos, setPhotos] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(null);
  const profileRef = reactExports.useRef(null);
  const coverRef = reactExports.useRef(null);
  const libraryRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    if (!profile) {
      setSupabaseReady(true);
      return;
    }
    loadMyCard().then((row) => {
      if (row?.card_data) {
        const supaData = row.card_data;
        const storeIsNewer = data.listings.length > supaData.listings.length || data.testimonials.length > supaData.testimonials.length;
        if (!storeIsNewer) {
          skipNextSave.current = true;
          setData(supaData);
        }
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]);
  reactExports.useEffect(() => {
    if (!hydrated || !supabaseReady || !profile) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated, supabaseReady]);
  const loadLibrary = reactExports.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const {
      data: files
    } = await supabase.storage.from(BUCKET).list(user.id, {
      sortBy: {
        column: "created_at",
        order: "desc"
      },
      limit: 100
    });
    const items = (files ?? []).filter((f) => f.name && !f.name.startsWith(".")).map((f) => {
      const path = `${user.id}/${f.name}`;
      const {
        data: pub
      } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return {
        name: f.name,
        path,
        url: pub.publicUrl
      };
    });
    setPhotos(items);
    setLoading(false);
  }, [user]);
  reactExports.useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);
  async function uploadFile(file, slot) {
    if (!user) return null;
    if (!file.type.startsWith("image/")) {
      toast.error("Fichier non supporté");
      return null;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Fichier trop lourd (5 Mo max)");
      return null;
    }
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const {
      error
    } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });
    if (error) {
      toast.error("Échec de l'upload");
      return null;
    }
    const {
      data: pub
    } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return pub.publicUrl;
  }
  async function handleProfileUpload(files) {
    if (!files?.[0]) return;
    setUploading("profile");
    const url = await uploadFile(files[0]);
    if (url) {
      update("photo", url);
      toast.success("Photo de profil mise à jour");
      loadLibrary();
    }
    setUploading(null);
    if (profileRef.current) profileRef.current.value = "";
  }
  async function handleCoverUpload(files) {
    if (!files?.[0]) return;
    setUploading("cover");
    const url = await uploadFile(files[0]);
    if (url) {
      update("coverPhoto", url);
      toast.success("Photo de cover mise à jour");
      loadLibrary();
    }
    setUploading(null);
    if (coverRef.current) coverRef.current.value = "";
  }
  async function handleLibraryUpload(files) {
    if (!files || !user) return;
    setUploading("library");
    let ok = 0;
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) ok++;
    }
    setUploading(null);
    if (ok > 0) {
      toast.success(`${ok} photo(s) ajoutée(s)`);
      loadLibrary();
    }
    if (libraryRef.current) libraryRef.current.value = "";
  }
  async function remove(path) {
    const {
      error
    } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) return toast.error("Suppression impossible");
    toast.success("Photo supprimée");
    setPhotos((p) => p.filter((x) => x.path !== path));
  }
  async function copyUrl(url) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("Lien copié");
    setTimeout(() => setCopied(null), 1500);
  }
  if (!hydrated || !supabaseReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-muted-foreground", children: "Chargement…" });
  }
  const hasTestimonials = data.testimonialsEnabled;
  const hasListings = data.listingsEnabled;
  const hasGallery = data.galleryEnabled ?? false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-medium", children: "Médias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Gérez vos photos et appliquez-les directement à votre carte." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: "Photos de la carte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Photo de profil" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full border-2 border-border bg-muted/30 overflow-hidden shrink-0 cursor-pointer hover:border-primary/50 transition", onClick: () => profileRef.current?.click(), children: data.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.photo, alt: "Profil", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "h-8 w-8 text-muted-foreground/40" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: profileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleProfileUpload(e.target.files) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full h-8 text-xs", onClick: () => profileRef.current?.click(), disabled: uploading === "profile", children: uploading === "profile" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 mr-1.5 animate-spin" }),
                  " Upload…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 mr-1.5" }),
                  " Changer"
                ] }) }),
                data.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "w-full h-8 text-xs text-muted-foreground hover:text-destructive", onClick: () => update("photo", ""), children: "Supprimer" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/40 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Photo de cover" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-full rounded-xl border-2 border-border bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 transition mb-2", onClick: () => coverRef.current?.click(), children: data.coverPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.coverPhoto, alt: "Cover", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "h-7 w-7 text-muted-foreground/40" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: coverRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleCoverUpload(e.target.files) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "flex-1 h-8 text-xs", onClick: () => coverRef.current?.click(), disabled: uploading === "cover", children: uploading === "cover" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 mr-1.5 animate-spin" }),
                " Upload…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 mr-1.5" }),
                " Changer"
              ] }) }),
              data.coverPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-8 text-xs text-muted-foreground hover:text-destructive px-3", onClick: () => update("coverPhoto", ""), children: "Suppr." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
            "Bibliothèque (",
            photos.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: libraryRef, type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: (e) => handleLibraryUpload(e.target.files) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 text-xs", onClick: () => libraryRef.current?.click(), disabled: uploading === "library", children: [
              uploading === "library" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 mr-1.5" }),
              "Ajouter"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
          e.preventDefault();
          handleLibraryUpload(e.dataTransfer.files);
        }, className: "min-h-[4px]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2", children: Array.from({
          length: 8
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl bg-muted/30 animate-pulse" }, i)) }) : photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => libraryRef.current?.click(), className: "text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card/20 cursor-pointer hover:border-primary/40 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 mx-auto text-muted-foreground mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Glissez vos photos ici ou cliquez pour en ajouter" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2", children: photos.map((p) => {
          const targets = [{
            id: "photo",
            label: "Photo de profil",
            apply: () => {
              update("photo", p.url);
              toast.success("Photo de profil appliquée");
            }
          }, {
            id: "cover",
            label: "Photo de cover",
            apply: () => {
              update("coverPhoto", p.url);
              toast.success("Cover appliquée");
            }
          }, ...data.testimonials.map((t, i) => ({
            id: `t-${t.id}`,
            label: t.name || `Témoin ${i + 1}`,
            prefix: "Témoin",
            apply: () => {
              setData({
                ...data,
                testimonials: data.testimonials.map((x) => x.id === t.id ? {
                  ...x,
                  photo: p.url
                } : x)
              });
              toast.success(`Photo appliquée à ${t.name || `témoin ${i + 1}`}`);
            }
          })), ...data.listings.map((l, i) => ({
            id: `l-${l.id}`,
            label: l.title || `Annonce ${i + 1}`,
            prefix: "Annonce",
            apply: () => {
              setData({
                ...data,
                listings: data.listings.map((x) => x.id === l.id ? {
                  ...x,
                  img: p.url
                } : x)
              });
              toast.success(`Image appliquée à ${l.title || `annonce ${i + 1}`}`);
            }
          })), ...(data.gallery ?? []).map((g, i) => ({
            id: `g-${g.id}`,
            label: g.caption || `Photo ${i + 1}`,
            prefix: "Galerie",
            apply: () => {
              setData({
                ...data,
                gallery: (data.gallery ?? []).map((x) => x.id === g.id ? {
                  ...x,
                  img: p.url
                } : x)
              });
              toast.success(`Photo appliquée à la galerie`);
            }
          }))];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.url, alt: p.name, className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-1.5 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5 overflow-y-auto scrollbar-none", style: {
                maxHeight: "calc(100% - 30px)"
              }, children: targets.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-[10px] text-left font-medium text-white bg-white/15 hover:bg-primary rounded-md py-1 px-1.5 transition truncate shrink-0", onClick: t.apply, children: [
                "prefix" in t && t.prefix && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50 mr-1", children: [
                  t.prefix,
                  " ·"
                ] }),
                t.label
              ] }, t.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", className: "h-6 flex-1 text-[10px] px-1", onClick: () => copyUrl(p.url), children: copied === p.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", className: "h-6 px-2", onClick: () => remove(p.path), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
              ] })
            ] })
          ] }, p.path);
        }) }) })
      ] }),
      (hasTestimonials || hasListings || hasGallery) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-4", children: "Sections de la carte" }),
        hasGallery && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: hasTestimonials || hasListings ? "mb-6" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }),
            " Galerie de photos"
          ] }),
          (data.gallery ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card/20 px-4 py-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Aucune photo dans la galerie. Ajoutez vos photos dans Contenu, puis revenez ici pour les gérer." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-8 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1.5" }),
              " Aller dans Contenu"
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: (data.gallery ?? []).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSlot, { label: g.caption || `Photo ${i + 1}`, currentUrl: g.img, onApply: (url) => setData({
            ...data,
            gallery: (data.gallery ?? []).map((x) => x.id === g.id ? {
              ...x,
              img: url
            } : x)
          }), onUploadFile: async (file) => {
            const url = await uploadFile(file);
            if (url) loadLibrary();
            return url;
          } }, g.id)) })
        ] }),
        hasTestimonials && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: hasListings ? "mb-6" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
            " Témoignages"
          ] }),
          data.testimonials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card/20 px-4 py-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Aucun témoignage ajouté. Créez vos témoignages dans Contenu, puis revenez ici pour ajouter leurs photos." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-8 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1.5" }),
              " Aller dans Contenu"
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: data.testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSlot, { label: t.name || `Témoin ${i + 1}`, sublabel: t.role || void 0, currentUrl: t.photo, onApply: (url) => setData({
            ...data,
            testimonials: data.testimonials.map((x) => x.id === t.id ? {
              ...x,
              photo: url
            } : x)
          }), onUploadFile: async (file) => {
            const url = await uploadFile(file);
            if (url) loadLibrary();
            return url;
          } }, t.id)) })
        ] }),
        hasListings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
            " Sélection de biens"
          ] }),
          data.listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card/20 px-4 py-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Aucun bien ajouté pour l'instant. Créez vos biens dans Contenu, puis revenez ici pour ajouter leurs photos." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-8 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1.5" }),
              " Aller dans Contenu"
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: data.listings.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSlot, { label: l.title || `Bien ${i + 1}`, currentUrl: l.img, onApply: (url) => setData({
            ...data,
            listings: data.listings.map((x) => x.id === l.id ? {
              ...x,
              img: url
            } : x)
          }), onUploadFile: async (file) => {
            const url = await uploadFile(file);
            if (url) loadLibrary();
            return url;
          } }, l.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden xl:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
        " Aperçu live"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessCard, { data }) })
    ] }) })
  ] });
}
function SectionSlot({
  label,
  sublabel,
  currentUrl,
  onApply,
  onUploadFile
}) {
  const [uploading, setUploading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  async function handleFile(files) {
    if (!files?.[0]) return;
    setUploading(true);
    const url = await onUploadFile(files[0]);
    if (url) {
      onApply(url);
      toast.success("Photo mise à jour");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-lg border border-border bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 transition mb-2", onClick: () => inputRef.current?.click(), children: currentUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentUrl, alt: label, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-muted-foreground/40" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium truncate leading-tight", children: label }),
    sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: sublabel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFile(e.target.files) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full h-7 text-[10px] mt-2", onClick: () => inputRef.current?.click(), disabled: uploading, children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 mr-1" }),
      " Changer"
    ] }) }),
    currentUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "w-full h-6 text-[10px] text-muted-foreground hover:text-destructive px-1 mt-0.5", onClick: () => onApply(""), children: "Supprimer" })
  ] });
}
export {
  MediaPage as component
};
