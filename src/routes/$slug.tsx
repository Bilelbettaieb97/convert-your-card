import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { adminSupabase } from "@/lib/supabase-admin";
import { Phone, Mail, Globe, MapPin, Calendar, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;

type Bouton = {
  type: "call" | "email" | "website" | "maps" | "rdv";
  label: string;
  value: string;
};

type Reseau = {
  type: string;
  url: string;
};

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
  const boutons = (profile.boutons as Bouton[]) ?? [];
  const reseaux = (profile.reseaux as Reseau[]) ?? [];

  useEffect(() => {
    logEvent(profile.id, "scan", { referrer: document.referrer, ua: navigator.userAgent.slice(0, 100) });
  }, [profile.id]);

  const accentColor = profile.couleur_accent ?? "#c026d3";

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-sm">
        {/* Header card */}
        <div
          className="relative rounded-3xl overflow-hidden mb-4 shadow-card"
          style={{ background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor}88)` }}
        >
          <div className="p-8 text-center text-white">
            {profile.photo_url ? (
              <img
                src={profile.photo_url}
                alt={profile.nom}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white/30 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                {profile.nom.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-2xl font-bold">{profile.nom}</h1>
            {profile.fonction && (
              <p className="text-white/80 text-sm mt-1">{profile.fonction}</p>
            )}
            {profile.entreprise && (
              <p className="text-white/70 text-xs mt-0.5 font-medium">{profile.entreprise}</p>
            )}
            {profile.bio && (
              <p className="text-white/70 text-sm mt-3 leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {boutons.length > 0 && (
          <div className="space-y-3 mb-4">
            {boutons.map((btn, i) => (
              <ActionButton key={i} btn={btn} profileId={profile.id} accentColor={accentColor} />
            ))}
          </div>
        )}

        {/* Social links */}
        {reseaux.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Réseaux</p>
            <div className="flex flex-wrap gap-3">
              {reseaux.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logEvent(profile.id, "social_click", { type: r.type })}
                  className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-full text-sm font-medium text-foreground transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Save contact */}
        <button
          onClick={() => downloadVCard(profile)}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold border border-border bg-card hover:bg-accent transition shadow-card"
        >
          <Download className="w-4 h-4" />
          Enregistrer le contact
        </button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Propulsé par{" "}
          <a href="/" className="text-magenta font-semibold hover:underline">OneTap</a>
        </p>
      </div>
    </div>
  );
}

function ActionButton({ btn, profileId, accentColor }: { btn: Bouton; profileId: string; accentColor: string }) {
  const icons: Record<string, React.ReactNode> = {
    call: <Phone className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    website: <Globe className="w-4 h-4" />,
    maps: <MapPin className="w-4 h-4" />,
    rdv: <Calendar className="w-4 h-4" />,
  };

  const hrefs: Record<string, string> = {
    call: `tel:${btn.value}`,
    email: `mailto:${btn.value}`,
    website: btn.value,
    maps: `https://maps.google.com/?q=${encodeURIComponent(btn.value)}`,
    rdv: btn.value,
  };

  return (
    <a
      href={hrefs[btn.type] ?? "#"}
      target={btn.type === "website" || btn.type === "rdv" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={() => logEvent(profileId, "button_click", { type: btn.type })}
      className="flex items-center gap-3 w-full rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-card transition hover:opacity-90"
      style={{ backgroundColor: accentColor }}
    >
      {icons[btn.type]}
      {btn.label || btn.type}
    </a>
  );
}

function logEvent(profileId: string, eventType: string, eventData?: Record<string, string | number | boolean | null>) {
  import("@/integrations/supabase/client").then(({ supabase }) => {
    supabase.from("nfc_analytics").insert({
      profile_id: profileId,
      event_type: eventType,
      event_data: (eventData ?? null) as import("@/integrations/supabase/types").Json,
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
