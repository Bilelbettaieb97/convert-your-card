import { supabase } from "@/integrations/supabase/client";
import { generateUniqueSlug } from "./slug";
import type { CardData } from "./card-types";
import { setProfileMeta } from "./profile-store";

type Bouton = { type: string; label: string; value: string; active: boolean };
type Reseau = { type: string; url: string; label: string; active: boolean };

function toBoutons(cardData: CardData): Bouton[] {
  const b: Bouton[] = [];
  if (cardData.actions.call && cardData.phone)
    b.push({ type: "call", label: "Appeler", value: cardData.phone, active: true });
  if (cardData.actions.whatsapp && cardData.whatsapp)
    b.push({ type: "whatsapp", label: "WhatsApp", value: cardData.whatsapp, active: true });
  if (cardData.actions.email && cardData.email)
    b.push({ type: "email", label: "Email", value: cardData.email, active: true });
  if (cardData.actions.website && cardData.website) {
    const url = cardData.website.startsWith("http") ? cardData.website : `https://${cardData.website}`;
    b.push({ type: "website", label: "Site web", value: url, active: true });
  }
  return b;
}

function toReseaux(cardData: CardData): Reseau[] {
  const r: Reseau[] = [];
  if (cardData.linkedin)
    r.push({ type: "linkedin", url: cardData.linkedin, label: "LinkedIn", active: true });
  if (cardData.instagram)
    r.push({ type: "instagram", url: cardData.instagram, label: "Instagram", active: true });
  if (cardData.whatsappSocial)
    r.push({ type: "whatsapp", url: `https://wa.me/${cardData.whatsappSocial}`, label: "WhatsApp", active: true });
  return r;
}

export async function createCard(cardData: CardData): Promise<{ slug: string; id: string }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non connecté");

  const slug = await generateUniqueSlug(cardData.name || "carte");

  const { data, error } = await supabase
    .from("nfc_profiles")
    .insert({
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
      boutons: toBoutons(cardData) as unknown as Record<string, unknown>[],
      reseaux: toReseaux(cardData) as unknown as Record<string, unknown>[],
      card_data: cardData as unknown as Record<string, unknown>,
      actif: true,
    })
    .select("id, slug")
    .single();

  if (error) throw new Error(error.message);

  const meta = { id: data.id, slug: data.slug, plan: "free", actif: true };
  setProfileMeta(meta);

  return { slug: data.slug, id: data.id };
}

export async function updateCard(profileId: string, cardData: CardData): Promise<void> {
  const { error } = await supabase
    .from("nfc_profiles")
    .update({
      nom: cardData.name || "",
      fonction: cardData.title || "",
      entreprise: cardData.agency || "",
      telephone: cardData.phone || "",
      email: cardData.email || "",
      site_web: cardData.website || "",
      bio: cardData.bio || "",
      photo_url: cardData.photo || "",
      couleur_accent: cardData.accent || "gold",
      boutons: toBoutons(cardData) as unknown as Record<string, unknown>[],
      reseaux: toReseaux(cardData) as unknown as Record<string, unknown>[],
      card_data: cardData as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (error) throw new Error(error.message);
}

export async function loadMyCard() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("nfc_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return data;
}
