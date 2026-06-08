import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as cn } from "./button-DjOZMqFS.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { y as ChevronDown } from "../_libs/lucide-react.mjs";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
function toSlug(name) {
  return name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
async function generateUniqueSlug(name) {
  const base = toSlug(name) || "carte";
  let slug = base;
  let i = 2;
  while (true) {
    const { data } = await supabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${base}-${i++}`;
  }
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
async function createCard(cardData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non connecté");
  const slug = await generateUniqueSlug(cardData.name || "carte");
  const { data, error } = await supabase.from("nfc_profiles").insert({
    user_id: user.id,
    slug,
    nom: cardData.name || "",
    fonction: cardData.title || "",
    entreprise: cardData.agency || "",
    telephone: cardData.phone || "",
    email: cardData.email || "",
    site_web: cardData.website || "",
    bio: cardData.bio || "",
    photo_url: cardData.photo || "",
    cover_url: cardData.coverPhoto || "",
    couleur_accent: cardData.accent || "gold",
    secteur: cardData.profession || cardData.area || "",
    vcard_enabled: cardData.vcardEnabled,
    card_data: cardData,
    actif: true
  }).select("id, slug").single();
  if (error) throw new Error(error.message);
  const meta = { id: data.id, slug: data.slug, plan: "free", actif: true };
  setProfileMeta(meta);
  return { slug: data.slug, id: data.id };
}
async function updateCard(profileId, cardData) {
  const { error } = await supabase.from("nfc_profiles").update({
    nom: cardData.name || "",
    fonction: cardData.title || "",
    entreprise: cardData.agency || "",
    telephone: cardData.phone || "",
    email: cardData.email || "",
    site_web: cardData.website || "",
    bio: cardData.bio || "",
    photo_url: cardData.photo || "",
    card_data: cardData,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", profileId);
  if (error) throw new Error(error.message);
}
async function loadMyCard() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle();
  return data;
}
export {
  Accordion as A,
  AccordionItem as a,
  AccordionTrigger as b,
  AccordionContent as c,
  createCard as d,
  getProfileMeta as g,
  loadMyCard as l,
  updateCard as u
};
