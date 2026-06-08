import * as React from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { adminSupabase } from "@/lib/supabase-admin";
import { Phone, Mail, Globe, MapPin, Calendar, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import type { Tables } from "@/integrations/supabase/types";
import { CARD_THEMES, THEMES_BY_ID } from "@/lib/card-themes";
import { BusinessCard } from "@/components/card/BusinessCard";
import type { CardData } from "@/lib/card-types";

type NfcProfile = Tables<"nfc_profiles">;

type Bouton = {
  type: "call" | "email" | "website" | "maps" | "rdv" | "whatsapp" | "calendly";
  label: string;
  value: string;
  active?: boolean;
};

type Reseau = {
  type: string;
  url: string;
  label?: string;
  active?: boolean;
};

type Theme = { id: string; accent: string; bg: string; text: string; gradient: string; mode: "light" | "dark" };

const LEGACY_THEMES: Theme[] = [
  { id: "violet", accent: "#8B5CF6", bg: "#1a0b2e", text: "#ffffff", gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)", mode: "dark" },
  { id: "rose",   accent: "#EC4899", bg: "#1a0b1a", text: "#ffffff", gradient: "linear-gradient(135deg,#be185d,#EC4899)", mode: "dark" },
  { id: "bleu",   accent: "#0EA5E9", bg: "#0a1a2e", text: "#ffffff", gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)", mode: "dark" },
  { id: "vert",   accent: "#10B981", bg: "#0a1f1a", text: "#ffffff", gradient: "linear-gradient(135deg,#047857,#10B981)", mode: "dark" },
  { id: "sombre", accent: "#F59E0B", bg: "#111827", text: "#ffffff", gradient: "linear-gradient(135deg,#92400e,#F59E0B)", mode: "dark" },
  { id: "clair",  accent: "#6366F1", bg: "#f8f9fa", text: "#111827", gradient: "linear-gradient(135deg,#4338ca,#6366F1)", mode: "light" },
];

const DEFAULT_THEME = LEGACY_THEMES[0];

function getTheme(couleurAccent: string | null | undefined): Theme {
  if (!couleurAccent) return DEFAULT_THEME;
  // Check full CARD_THEMES catalog first (gold, sapphire, navy, violet, rose, etc.)
  const cardTheme = CARD_THEMES.find((t) => t.id === couleurAccent);
  if (cardTheme) {
    return {
      id: cardTheme.id,
      accent: cardTheme.palette.accent,
      bg: cardTheme.palette.bg,
      text: cardTheme.palette.text,
      gradient: cardTheme.palette.gradient,
      mode: cardTheme.palette.mode,
    };
  }
  // Fallback for legacy IDs (bleu, vert, sombre, clair)
  return LEGACY_THEMES.find((t) => t.id === couleurAccent) ?? DEFAULT_THEME;
}

const getProfile = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data } = await adminSupabase
      .from("nfc_profiles")
      .select("*")
      .eq("slug", slug)
      .eq("actif", true)
      .maybeSingle();
    return data ?? null;
  });

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const profile = await getProfile({ data: params.slug });
    if (!profile) throw notFound();
    return { profile };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.profile;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.nom} — ${p.fonction || "Carte de visite digitale"}` },
        { name: "description", content: p.bio ?? `Découvrez la carte de visite digitale de ${p.nom}` },
        { property: "og:title", content: p.nom },
        { property: "og:description", content: p.bio ?? `${p.nom} · ${p.entreprise}` },
        ...(p.photo_url ? [{ property: "og:image", content: p.photo_url }] : []),
      ],
    };
  },
  component: ProfilePage,
  notFoundComponent: ProfileNotFound,
});

function ProfilePage() {
  const { profile } = Route.useLoaderData();

  useEffect(() => {
    logEvent(profile.id, "scan", { referrer: document.referrer, ua: navigator.userAgent.slice(0, 100) });
  }, [profile.id]);

  // If card_data is available (saved via builder), use the exact same BusinessCard component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardData = (profile as any).card_data as CardData | null;
  if (cardData) {
    const themePalette = (THEMES_BY_ID[cardData.accent ?? "gold"] ?? THEMES_BY_ID.gold).palette;
    return (
      <div className="min-h-screen pb-8" style={{ background: themePalette.bg }}>
        <div className="mx-auto max-w-sm">
          <BusinessCard data={cardData} profileId={profile.id} />
        </div>
      </div>
    );
  }

  // Legacy fallback for older profiles without card_data blob
  const theme = getTheme(profile.couleur_accent);
  const boutons = ((profile.boutons as Bouton[]) ?? []).filter((b) => b.active !== false && b.value);
  const reseaux = ((profile.reseaux as Reseau[]) ?? []).filter((r) => r.active !== false && r.url);
  const isLight = theme.mode === "light";
  const subTextColor = isLight ? "rgba(17,24,39,0.65)" : "rgba(255,255,255,0.75)";
  const subTextColorDim = isLight ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.6)";

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4" style={{ background: theme.bg }}>
      <div className="w-full max-w-sm">
        <div
          className="relative rounded-3xl overflow-hidden mb-4"
          style={{ background: theme.gradient, boxShadow: `0 20px 60px -15px ${theme.accent}66` }}
        >
          <div className="p-8 text-center">
            {profile.photo_url ? (
              <img src={profile.photo_url} alt={profile.nom} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 shadow-lg" style={{ borderColor: "rgba(255,255,255,0.3)" }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                {profile.nom.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-2xl font-bold" style={{ color: "#fff" }}>{profile.nom}</h1>
            {profile.fonction && <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.82)" }}>{profile.fonction}</p>}
            {profile.entreprise && <p className="text-xs mt-0.5 font-medium" style={{ color: "rgba(255,255,255,0.68)" }}>{profile.entreprise}</p>}
            {profile.bio && <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{profile.bio}</p>}
          </div>
        </div>
        {boutons.length > 0 && (
          <div className="space-y-3 mb-4">
            {boutons.map((btn, i) => <ActionButton key={i} btn={btn} profileId={profile.id} theme={theme} />)}
          </div>
        )}
        {reseaux.length > 0 && (
          <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: subTextColor }}>Réseaux</p>
            <div className="flex flex-wrap gap-3">
              {reseaux.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" onClick={() => logEvent(profile.id, "click_social", { type: r.type })} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}>
                  <ExternalLink className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
                  {r.label || (r.type.charAt(0).toUpperCase() + r.type.slice(1))}
                </a>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => downloadVCard(profile)} className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
          <Download className="w-4 h-4" /> Enregistrer le contact
        </button>
        <p className="text-center text-xs mt-6" style={{ color: subTextColorDim }}>
          Propulsé par <a href="/" className="font-semibold hover:underline" style={{ color: theme.accent }}>OneTap</a>
        </p>
      </div>
    </div>
  );
}

function ActionButton({ btn, profileId, theme }: { btn: Bouton; profileId: string; theme: Theme }) {
  const icons: Record<string, React.ReactNode> = {
    call: <Phone className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    website: <Globe className="w-4 h-4" />,
    maps: <MapPin className="w-4 h-4" />,
    rdv: <Calendar className="w-4 h-4" />,
    whatsapp: <Phone className="w-4 h-4" />,
    calendly: <Calendar className="w-4 h-4" />,
  };

  const hrefs: Record<string, string> = {
    call: `tel:${btn.value}`,
    email: `mailto:${btn.value}`,
    website: btn.value,
    maps: `https://maps.google.com/?q=${encodeURIComponent(btn.value)}`,
    rdv: btn.value,
    whatsapp: `https://wa.me/${btn.value.replace(/\D/g, "")}`,
    calendly: btn.value,
  };

  const openInNew = ["website", "rdv", "maps", "whatsapp", "calendly"].includes(btn.type);

  return (
    <a
      href={hrefs[btn.type] ?? "#"}
      target={openInNew ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={() => logEvent(profileId, "click_button", { type: btn.type })}
      className="flex items-center gap-3 w-full rounded-2xl px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90"
      style={{ backgroundColor: theme.accent, boxShadow: `0 4px 15px -4px ${theme.accent}80` }}
    >
      {icons[btn.type]}
      {btn.label || btn.type}
    </a>
  );
}

function logEvent(profileId: string, eventType: string, eventData?: Record<string, string | number | boolean | null>) {
  import("@/integrations/supabase/client").then(({ supabase }) => {
    supabase.rpc("log_card_event", {
      p_profile_id: profileId,
      p_event_type: eventType,
      p_event_data: (eventData ?? null) as import("@/integrations/supabase/types").Json,
    }).then(() => {});
  }).catch(() => {});
}

function downloadVCard(profile: NfcProfile) {
  const appUrl = window.location.origin;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.nom}`,
    profile.fonction ? `TITLE:${profile.fonction}` : null,
    profile.entreprise ? `ORG:${profile.entreprise}` : null,
    profile.telephone ? `TEL;TYPE=CELL:${profile.telephone}` : null,
    profile.email ? `EMAIL:${profile.email}` : null,
    profile.photo_url ? `PHOTO;VALUE=URI:${profile.photo_url}` : null,
    `URL:${appUrl}/${profile.slug}`,
    `NOTE:Carte de visite digitale — ${profile.entreprise || "OneTap"}`,
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([lines], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.slug}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  logEvent(profile.id, "vcard_download");
}

function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-foreground">Carte introuvable</h1>
      <p className="mt-2 text-muted-foreground">Cette carte NFC n'existe pas ou n'est plus active.</p>
      <a href="/" className="mt-6 inline-block text-magenta font-semibold hover:underline">
        Créer ma carte →
      </a>
    </div>
  );
}
