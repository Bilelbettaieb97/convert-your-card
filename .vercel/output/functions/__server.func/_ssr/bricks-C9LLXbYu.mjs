import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as THEMES_BY_ID, d as PROFESSIONS, f as PROFESSION_CATEGORIES, I as Input, C as CARD_THEMES, h as PROFESSIONS_BY_THEME, B as Button, S as Switch, j as BRICK_VARIANTS, a as cn } from "./router-B-iL4scT.mjs";
import { L as Label } from "./label-FoeOGFTn.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { a5 as Check, T as Trash2, aO as Plus, aG as LoaderCircle, ar as Upload } from "../_libs/lucide-react.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const BUCKET = "nfc-photos";
const MAX_MB = 5;
async function uploadImage(file) {
  if (!file.type.startsWith("image/")) return null;
  if (file.size > MAX_MB * 1024 * 1024) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) return null;
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return pub.publicUrl;
}
function Field({
  label,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
function Row({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    children
  ] });
}
function VariantPicker({
  brick,
  data,
  update
}) {
  const options = BRICK_VARIANTS[brick];
  if (!options || options.length < 2) return null;
  const current = data.variants[brick];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Style" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: options.map((o) => {
      const active = current === o.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => update(
            "variants",
            { ...data.variants, [brick]: o.id }
          ),
          className: `rounded-xl border p-2.5 text-left transition ${active ? "border-primary bg-accent/40" : "border-border hover:border-foreground/30"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: o.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: o.hint })
          ]
        },
        o.id
      );
    }) })
  ] });
}
function IdentityBrick({ data, update }) {
  const fileRef = reactExports.useRef(null);
  const coverRef = reactExports.useRef(null);
  const [uploadingPhoto, setUploadingPhoto] = reactExports.useState(false);
  const [uploadingCover, setUploadingCover] = reactExports.useState(false);
  const onFile = async (f) => {
    setUploadingPhoto(true);
    const url = await uploadImage(f);
    if (url) update("photo", url);
    setUploadingPhoto(false);
  };
  const onCover = async (f) => {
    setUploadingCover(true);
    const url = await uploadImage(f);
    if (url) update("coverPhoto", url);
    setUploadingCover(false);
  };
  const isCover = data.variants.identity === "cover";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full overflow-hidden bg-muted border border-border grid place-items-center shrink-0", children: data.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.photo, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => fileRef.current?.click(), disabled: uploadingPhoto, children: [
          uploadingPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1.5" }),
          uploadingPhoto ? "Upload…" : "Importer une photo"
        ] }),
        data.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => update("photo", ""), children: "Retirer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom complet", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => update("name", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre / poste", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.title, onChange: (e) => update("title", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Agence", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.agency, onChange: (e) => update("agency", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secteur géographique", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.area, onChange: (e) => update("area", e.target.value) }) }),
    isCover && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-lg border border-dashed border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Photo de couverture" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Affichée en bannière derrière votre photo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: coverRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) onCover(f);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => coverRef.current?.click(), disabled: uploadingCover, children: [
          uploadingCover ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1.5" }),
          uploadingCover ? "Upload…" : "Importer"
        ] })
      ] }),
      data.coverPhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] w-full rounded-md overflow-hidden bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.coverPhoto, alt: "", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => update("coverPhoto", ""), children: "Retirer la couverture" })
      ] })
    ] })
  ] });
}
function ActionsBrick({ data, update }) {
  const toggle = (k) => (v) => update("actions", { ...data.actions, [k]: v });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Bouton Appel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.call, onCheckedChange: toggle("call") }) }),
      data.actions.call && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Numéro (format E.164 ex: +33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => update("phone", e.target.value), placeholder: "+33612345678" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Bouton WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.whatsapp, onCheckedChange: toggle("whatsapp") }) }),
      data.actions.whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Numéro WhatsApp (sans +, ex: 33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsapp, onChange: (e) => update("whatsapp", e.target.value), placeholder: "33612345678" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Bouton Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.email, onCheckedChange: toggle("email") }) }),
      data.actions.email && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: data.email, onChange: (e) => update("email", e.target.value), placeholder: "vous@exemple.fr" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Bouton Site web", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: data.actions.website, onCheckedChange: toggle("website") }) }),
      data.actions.website && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL (sans https://)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.website, onChange: (e) => update("website", e.target.value), placeholder: "monsite.fr" }) })
    ] })
  ] });
}
function StatsBrick({ data, update }) {
  const setStat = (i, patch) => update("stats", data.stats.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  const add = () => data.stats.length < 4 && update("stats", [...data.stats, { label: "Label", value: "0" }]);
  const remove = (i) => update("stats", data.stats.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valeur", className: "w-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.value, onChange: (e) => setStat(i, { value: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Label", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.label, onChange: (e) => setStat(i, { label: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, i)),
    data.stats.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter une stat"
    ] })
  ] });
}
function AboutBrick({ data, update }) {
  const setBadge = (i, label) => update("badges", data.badges.map((b, idx) => idx === i ? { ...b, label } : b));
  const addBadge = () => update("badges", [...data.badges, { id: crypto.randomUUID(), label: "Nouveau badge" }]);
  const removeBadge = (id) => update("badges", data.badges.filter((b) => b.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bio (2-3 lignes)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: data.bio, onChange: (e) => update("bio", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Badges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
        data.badges.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.label, onChange: (e) => setBadge(i, e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeBadge(b.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, b.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addBadge, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
          "Ajouter un badge"
        ] })
      ] })
    ] })
  ] });
}
function ListingsBrick({ data, update }) {
  const setListing = (id, patch) => update("listings", data.listings.map((l) => l.id === id ? { ...l, ...patch } : l));
  const add = () => update("listings", [
    ...data.listings,
    { id: crypto.randomUUID(), img: "", title: "Nouveau bien", meta: "", price: "" }
  ]);
  const remove = (id) => update("listings", data.listings.filter((l) => l.id !== id));
  const [uploading, setUploading] = reactExports.useState(null);
  const onImage = async (id, f) => {
    setUploading(id);
    const url = await uploadImage(f);
    if (url) setListing(id, { img: url });
    setUploading(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.listings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun bien. Ajoutez votre première annonce." }),
    data.listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "h-16 w-16 rounded-lg overflow-hidden bg-muted grid place-items-center cursor-pointer shrink-0", children: [
          uploading === l.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 text-muted-foreground animate-spin" }) : l.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.img, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                const f = e.target.files?.[0];
                if (f) onImage(l.id, f);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Titre",
              value: l.title,
              onChange: (e) => setListing(l.id, { title: e.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "120 m² · 3 pièces",
              value: l.meta,
              onChange: (e) => setListing(l.id, { meta: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "2 450 000 €",
            value: l.price,
            onChange: (e) => setListing(l.id, { price: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(l.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, l.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter un bien"
    ] })
  ] });
}
function GalleryBrick({ data, update }) {
  const gallery = data.gallery ?? [];
  const setPhoto = (id, patch) => update("gallery", gallery.map((p) => p.id === id ? { ...p, ...patch } : p));
  const add = () => update("gallery", [
    ...gallery,
    { id: crypto.randomUUID(), img: "", caption: "" }
  ]);
  const remove = (id) => update("gallery", gallery.filter((p) => p.id !== id));
  const [uploading, setUploading] = reactExports.useState(null);
  const onImage = async (id, f) => {
    setUploading(id);
    const url = await uploadImage(f);
    if (url) setPhoto(id, { img: url });
    setUploading(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    gallery.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo. Ajoutez votre première image." }),
    gallery.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "h-20 w-20 rounded-lg overflow-hidden bg-muted grid place-items-center cursor-pointer shrink-0", children: [
        uploading === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 text-muted-foreground animate-spin" }) : p.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) onImage(p.id, f);
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Légende (optionnel)",
            value: p.caption,
            onChange: (e) => setPhoto(p.id, { caption: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-destructive px-0", onClick: () => remove(p.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1" }),
          " Supprimer"
        ] })
      ] })
    ] }, p.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter une photo"
    ] })
  ] });
}
function ContactBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone (format E.164, ex: +33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => update("phone", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone (affichage)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.phoneDisplay,
        onChange: (e) => update("phoneDisplay", e.target.value),
        placeholder: "+33 6 12 34 56 78"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: data.email, onChange: (e) => update("email", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Site web (sans https)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.website, onChange: (e) => update("website", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (numéro sans +, ex: 33612345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsapp, onChange: (e) => update("whatsapp", e.target.value) }) })
  ] });
}
function SocialsBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "LinkedIn (URL complète)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.linkedin, onChange: (e) => update("linkedin", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram (URL complète)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.instagram, onChange: (e) => update("instagram", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (numéro sans +)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsappSocial, onChange: (e) => update("whatsappSocial", e.target.value) }) })
  ] });
}
function VCardBrick() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Affiche un bouton « Enregistrer le contact » qui télécharge un fichier .vcf compatible iPhone/Android." });
}
function VideoBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre de la vidéo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.videoTitle, onChange: (e) => update("videoTitle", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lien YouTube (watch, youtu.be ou shorts)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.videoUrl,
        onChange: (e) => update("videoUrl", e.target.value),
        placeholder: "https://www.youtube.com/watch?v=..."
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "L'aperçu intègre la vidéo via youtube.com/embed." })
  ] });
}
function ServicesBrick({ data, update }) {
  const set = (id, patch) => update("services", data.services.map((s) => s.id === id ? { ...s, ...patch } : s));
  const add = () => update("services", [
    ...data.services,
    { id: crypto.randomUUID(), title: "Nouveau service", description: "" }
  ]);
  const remove = (id) => update("services", data.services.filter((s) => s.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Titre", value: s.title, onChange: (e) => set(s.id, { title: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          rows: 2,
          placeholder: "Description courte",
          value: s.description,
          onChange: (e) => set(s.id, { description: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
    ] }, s.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter un service"
    ] })
  ] });
}
const TESTIMONIAL_STYLES = [
  { id: "cards", label: "Cartes", hint: "Carrousel large avec citation" },
  { id: "stacked", label: "Empilées", hint: "Liste verticale, avatar à gauche" },
  { id: "compact", label: "Compactes", hint: "Mini-cartes plus denses" }
];
function TestimonialsBrick({ data, update }) {
  const set = (id, patch) => update("testimonials", data.testimonials.map((t) => t.id === id ? { ...t, ...patch } : t));
  const add = () => update("testimonials", [
    ...data.testimonials,
    { id: crypto.randomUUID(), name: "Prénom N.", role: "Client", text: "", rating: 5, photo: "", link: "" }
  ]);
  const remove = (id) => update("testimonials", data.testimonials.filter((t) => t.id !== id));
  const [uploading, setUploading] = reactExports.useState(null);
  const onPhoto = async (id, f) => {
    setUploading(id);
    const url = await uploadImage(f);
    if (url) set(id, { photo: url });
    setUploading(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Style du carrousel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: TESTIMONIAL_STYLES.map((s) => {
        const active = data.testimonialsStyle === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => update("testimonialsStyle", s.id),
            className: `rounded-xl border p-2.5 text-left transition ${active ? "border-primary bg-accent/40" : "border-border hover:border-foreground/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: s.hint })
            ]
          },
          s.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      data.testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "h-14 w-14 rounded-full overflow-hidden bg-muted border border-border grid place-items-center cursor-pointer shrink-0", children: [
            uploading === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 text-muted-foreground animate-spin" }) : t.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.photo, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) onPhoto(t.id, f);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Nom", value: t.name, onChange: (e) => set(t.id, { name: e.target.value }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Rôle / contexte", value: t.role, onChange: (e) => set(t.id, { role: e.target.value }) })
          ] })
        ] }),
        t.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => set(t.id, { photo: "" }),
            className: "text-[11px] text-muted-foreground hover:text-foreground",
            children: "Retirer la photo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            rows: 3,
            placeholder: "Témoignage",
            value: t.text,
            onChange: (e) => set(t.id, { text: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[6rem_1fr] gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Note (1-5)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              max: 5,
              value: t.rating,
              onChange: (e) => set(t.id, { rating: Math.max(1, Math.min(5, Number(e.target.value) || 5)) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lien (optionnel)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "https://google.com/avis/...",
              value: t.link,
              onChange: (e) => set(t.id, { link: e.target.value })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => remove(t.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
          " Supprimer"
        ] }) })
      ] }, t.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        "Ajouter un témoignage"
      ] })
    ] })
  ] });
}
function CalendarBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Libellé du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.calendarLabel, onChange: (e) => update("calendarLabel", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL (Calendly, Cal.com, Google Calendar…)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: data.calendarUrl,
        onChange: (e) => update("calendarUrl", e.target.value),
        placeholder: "https://calendly.com/..."
      }
    ) })
  ] });
}
function LanguagesBrick({ data, update }) {
  const set = (id, patch) => update("languages", data.languages.map((l) => l.id === id ? { ...l, ...patch } : l));
  const add = () => update("languages", [...data.languages, { id: crypto.randomUUID(), name: "Langue", level: "Courant" }]);
  const remove = (id) => update("languages", data.languages.filter((l) => l.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    data.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Langue", value: l.name, onChange: (e) => set(l.id, { name: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Niveau", value: l.level, onChange: (e) => set(l.id, { level: e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => remove(l.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, l.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
      "Ajouter une langue"
    ] })
  ] });
}
function CtaBrick({ data, update }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaTitle, onChange: (e) => update("ctaTitle", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Texte", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: data.ctaText, onChange: (e) => update("ctaText", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Libellé du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaButtonLabel, onChange: (e) => update("ctaButtonLabel", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL du bouton", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.ctaButtonUrl, onChange: (e) => update("ctaButtonUrl", e.target.value) }) })
  ] });
}
function ThemeBrick({ data, update }) {
  const [tab, setTab] = reactExports.useState("theme");
  const [query, setQuery] = reactExports.useState("");
  const listRef = reactExports.useRef(null);
  const activeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (data.profession) setTab("profession");
  }, [data.profession]);
  const activeTheme = THEMES_BY_ID[data.accent];
  const activeProfession = data.profession ? PROFESSIONS.find((p) => p.id === data.profession) : void 0;
  const applyProfession = (profId, themeId) => {
    update("profession", profId);
    update("accent", themeId);
  };
  reactExports.useEffect(() => {
    if (tab === "profession" && activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [tab]);
  const q = query.trim().toLowerCase();
  const filtered = q ? PROFESSIONS.filter(
    (p) => p.label.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ) : PROFESSIONS;
  const grouped = PROFESSION_CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((p) => p.category === cat)
  })).filter((g) => g.items.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-primary/40 bg-primary/5 p-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "h-11 w-11 rounded-lg shrink-0 border relative overflow-hidden ring-2 ring-primary/50 ring-offset-2 ring-offset-card",
          style: { background: activeTheme.palette.bg, borderColor: activeTheme.palette.border },
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-md", style: { background: activeTheme.palette.surface } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full animate-pulse",
                style: { background: activeTheme.palette.gradient }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-medium", children: "Sélection actuelle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: activeProfession ? activeProfession.label : "Thème personnalisé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground truncate", children: [
          "Palette : ",
          activeTheme.label,
          activeProfession && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " · ",
            activeProfession.category
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTab("profession"),
          className: `px-3 py-1.5 rounded-md transition ${tab === "profession" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
          children: "Par métier"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTab("theme"),
          className: `px-3 py-1.5 rounded-md transition ${tab === "theme" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`,
          children: "Par thème"
        }
      )
    ] }),
    tab === "profession" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Rechercher un métier…",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: listRef, className: "max-h-[420px] overflow-y-auto space-y-4 pr-1", children: [
        grouped.map(({ cat, items }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5", children: cat }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5", children: items.map((p) => {
            const theme = THEMES_BY_ID[p.themeId];
            const active = data.profession === p.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                ref: active ? activeRef : void 0,
                type: "button",
                onClick: () => applyProfession(p.id, p.themeId),
                className: `relative flex items-center gap-2.5 rounded-lg border p-2 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border hover:border-foreground/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "h-7 w-7 rounded-md shrink-0 border relative overflow-hidden",
                      style: { background: theme.palette.bg, borderColor: theme.palette.border },
                      "aria-hidden": true,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-sm", style: { background: theme.palette.surface } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full ${active ? "animate-pulse" : ""}`,
                            style: { background: theme.palette.gradient }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium truncate", children: p.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground truncate", children: [
                      "Thème ",
                      theme.label
                    ] })
                  ] }),
                  active && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }),
                    "Actif"
                  ] })
                ]
              },
              p.id
            );
          }) })
        ] }, cat)),
        grouped.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground py-6 text-center", children: "Aucun métier ne correspond." })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CARD_THEMES.map((t) => {
      const active = data.accent === t.id;
      const p = t.palette;
      const suggested = PROFESSIONS_BY_THEME[t.id] ?? [];
      const hint = suggested.slice(0, 2).map((s) => s.label).join(", ");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            update("accent", t.id);
            update("profession", void 0);
          },
          className: `relative flex items-center gap-2.5 rounded-xl border p-2 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border hover:border-foreground/30"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "h-10 w-10 rounded-lg shrink-0 border overflow-hidden relative",
                style: { background: p.bg, borderColor: p.border },
                "aria-hidden": true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute inset-1 rounded-md",
                      style: {
                        background: p.surface,
                        borderColor: p.border,
                        borderWidth: 1,
                        borderStyle: "solid"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute bottom-1 right-1 h-3 w-3 rounded-full ${active ? "animate-pulse" : ""}`,
                      style: { background: p.gradient }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium truncate", children: t.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground truncate", children: hint || t.sector })
            ] }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground grid place-items-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
          ]
        },
        t.id
      );
    }) })
  ] });
}
const BRICK_META = {
  identity: { title: "Identité", subtitle: "Photo, nom, titre, agence" },
  actions: { title: "Actions rapides", subtitle: "Appel, WhatsApp, Mail, Site" },
  vcard: { title: "Enregistrer le contact", subtitle: "Bouton vCard" },
  stats: { title: "Statistiques", subtitle: "Chiffres clés" },
  about: { title: "À propos", subtitle: "Bio + badges" },
  video: { title: "Vidéo de présentation", subtitle: "Lien YouTube" },
  services: { title: "Services", subtitle: "Vos offres / prestations" },
  listings: { title: "Sélection de biens", subtitle: "Vos annonces phares" },
  gallery: { title: "Galerie de photos", subtitle: "Photos & légendes" },
  testimonials: { title: "Témoignages", subtitle: "Avis clients" },
  calendar: { title: "Prendre rendez-vous", subtitle: "Lien Calendly / agenda" },
  languages: { title: "Langues parlées", subtitle: "Idiomes & niveau" },
  cta: { title: "Bannière CTA", subtitle: "Encart d'appel à l'action" },
  contact: { title: "Coordonnées", subtitle: "Téléphone, mail, site, secteur" },
  socials: { title: "Réseaux sociaux", subtitle: "LinkedIn, Instagram, WhatsApp" },
  theme: { title: "Thème", subtitle: "Couleur d'accent" }
};
function renderBrickBody(id, props) {
  switch (id) {
    case "identity":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityBrick, { ...props });
    case "actions":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ActionsBrick, { ...props });
    case "vcard":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VCardBrick, {});
    case "stats":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBrick, { ...props });
    case "about":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AboutBrick, { ...props });
    case "video":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VideoBrick, { ...props });
    case "services":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesBrick, { ...props });
    case "listings":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ListingsBrick, { ...props });
    case "gallery":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryBrick, { ...props });
    case "testimonials":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsBrick, { ...props });
    case "calendar":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarBrick, { ...props });
    case "languages":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguagesBrick, { ...props });
    case "cta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBrick, { ...props });
    case "contact":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ContactBrick, { ...props });
    case "socials":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SocialsBrick, { ...props });
    case "theme":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeBrick, { ...props });
  }
}
export {
  BRICK_META as B,
  VariantPicker as V,
  renderBrickBody as r
};
