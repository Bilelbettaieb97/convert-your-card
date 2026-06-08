import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { b as useAuthStore, B as Button } from "./router-NfhaRM3Z.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { aA as Upload, aQ as LoaderCircle, ak as Image, H as Check, av as Copy, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-router.mjs";
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
import "./server-A9UGx2Hq.mjs";
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
const BUCKET = "user-photos";
const MAX_SIZE = 5 * 1024 * 1024;
function MediaPage() {
  const {
    user
  } = useAuthStore();
  const [photos, setPhotos] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const load = reactExports.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const {
      data,
      error
    } = await supabase.storage.from(BUCKET).list(user.id, {
      sortBy: {
        column: "created_at",
        order: "desc"
      },
      limit: 100
    });
    if (error) {
      toast.error("Impossible de charger les photos");
      setLoading(false);
      return;
    }
    const files = (data || []).filter((f) => f.name && !f.name.startsWith("."));
    const items = await Promise.all(files.map(async (f) => {
      const path = `${user.id}/${f.name}`;
      const {
        data: signed
      } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
      return {
        name: f.name,
        path,
        url: signed?.signedUrl || "",
        size: f.metadata?.size ?? 0
      };
    }));
    setPhotos(items);
    setLoading(false);
  }, [user]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const handleFiles = async (files) => {
    if (!files || !user) return;
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} n'est pas une image`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} dépasse 5 Mo`);
        continue;
      }
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const {
        error
      } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (error) toast.error(`Échec : ${file.name}`);
      else ok++;
    }
    setUploading(false);
    if (ok > 0) toast.success(`${ok} photo(s) uploadée(s)`);
    if (inputRef.current) inputRef.current.value = "";
    load();
  };
  const remove = async (path) => {
    const {
      error
    } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) return toast.error("Suppression impossible");
    toast.success("Photo supprimée");
    setPhotos((p) => p.filter((x) => x.path !== path));
  };
  const copy = async (url) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("Lien copié");
    setTimeout(() => setCopied(null), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    }, className: "rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition bg-card/30 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: (e) => handleFiles(e.target.files) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Glissez vos photos ici" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Logo, photos d'annonces, portrait… JPG/PNG/WEBP, 5 Mo max par fichier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => inputRef.current?.click(), disabled: uploading, children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " Upload en cours…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
        " Choisir des fichiers"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg", children: [
        "Ma bibliothèque (",
        photos.length,
        ")"
      ] }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl bg-muted/30 animate-pulse" }, i)) }) : photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-border rounded-2xl bg-card/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-10 w-10 mx-auto text-muted-foreground mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo pour le moment" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: photos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.url, alt: p.name, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", className: "h-7 flex-1 text-[11px]", onClick: () => copy(p.url), children: copied === p.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", className: "h-7 px-2", onClick: () => remove(p.path), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
        ] }) })
      ] }, p.path)) })
    ] })
  ] });
}
export {
  MediaPage as component
};
