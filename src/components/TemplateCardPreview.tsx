import { Phone, Mail, Share2, Save, Globe, Linkedin, Instagram, Youtube, Facebook, X as XClose, Check, Smartphone, MapPin } from "lucide-react";

export type SocialType =
  | "linkedin"
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube"
  | "whatsapp"
  | "facebook";

export type StyleId = "minimal" | "bold" | "elegant" | "neo" | "dark" | "soft";

export type Template = {
  id: string;
  name: string;
  sector: string;
  job: string;
  company: string;
  person: string;
  initials: string;
  tagline: string;
  bio: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  avatar: string;
  socials: SocialType[];
  style: StyleId;
  palette: { bg: string; fg: string; accent: string };
  badge?: string;
};

export function isLightBg(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

export function contrastText(hex: string) {
  return isLightBg(hex) ? "#0a0a0a" : "#ffffff";
}

export function SocialIcon({ type, className }: { type: SocialType; className?: string }) {
  switch (type) {
    case "linkedin":
      return <Linkedin className={className} />;
    case "instagram":
      return <Instagram className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "facebook":
      return <Facebook className={className} />;
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.39z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      );
  }
}

export function InfoRow({
  icon: I,
  label,
  muted,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  muted: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: accent + "20", color: accent }}
      >
        <I className="w-3.5 h-3.5" />
      </div>
      <span className="truncate" style={{ color: muted }}>
        {label}
      </span>
    </div>
  );
}

export function CardPreview({ t, size = "sm" }: { t: Template; size?: "sm" | "lg" }) {
  const ctaLabel = "Me contacter";
  const isLight = isLightBg(t.palette.bg);
  const mutedFg = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";
  const subtleBg = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)";

  const isLg = size === "lg";

  return (
    <div className={`relative w-full h-full flex flex-col overflow-y-auto ${isLg ? "pb-5" : "pb-2"}`}>
      {/* Notch-safe top spacer */}
      <div className={`${isLg ? "h-10" : "h-7"} shrink-0`} />

      {/* Avatar + identity */}
      <div className={`${isLg ? "px-5 mt-2" : "px-3 mt-1.5"} flex flex-col items-center text-center`}>
        <div
          className={`${isLg ? "w-20 h-20" : "w-14 h-14"} rounded-full overflow-hidden shrink-0 shadow-lg`}
          style={{
            background: t.palette.accent,
            color: contrastText(t.palette.accent),
            boxShadow: `0 0 0 ${isLg ? 3 : 2}px ${t.palette.bg}, 0 4px 12px rgba(0,0,0,0.25)`,
          }}
        >
          {t.avatar ? (
            <img src={t.avatar} alt={t.person} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-bold ${isLg ? "text-xl" : "text-xs"}`}>
              {t.initials}
            </div>
          )}
        </div>
        <div className={`${isLg ? "mt-2 text-lg" : "mt-1.5 text-[12px]"} font-bold truncate w-full leading-tight`}>{t.person}</div>
        <div className={`${isLg ? "text-sm" : "text-[10px]"} truncate w-full leading-tight`} style={{ color: mutedFg }}>
          {t.job}
        </div>
        <div className={`${isLg ? "text-xs mt-0.5" : "text-[9px] mt-0.5"} truncate w-full font-semibold leading-tight`} style={{ color: t.palette.accent }}>
          {t.company}
        </div>
        <div className={`${isLg ? "mt-1 text-xs gap-1" : "mt-1 text-[9px] gap-1"} flex items-center justify-center`} style={{ color: mutedFg }}>
          <MapPin className={isLg ? "w-3 h-3" : "w-2.5 h-2.5"} />
          {t.location}
        </div>
      </div>

      {/* Tagline */}
      <div className={`${isLg ? "px-5 mt-3" : "px-3 mt-2"} text-center`}>
        <div className={`font-display font-semibold ${isLg ? "text-sm" : "text-[10px]"} leading-snug ${isLg ? "" : "line-clamp-2"}`}>
          "{t.tagline}"
        </div>
        {isLg && (
          <p className="mt-2 text-xs opacity-70 leading-relaxed line-clamp-3">{t.bio}</p>
        )}
      </div>

      {/* Quick actions */}
      <div className={`${isLg ? "px-5 mt-4 gap-2" : "px-3 mt-2.5 gap-1.5"} flex justify-center`}>
        {[
          { icon: Phone, label: "Appeler" },
          { icon: Mail, label: "Email" },
          { icon: Save, label: "vCard" },
          { icon: Share2, label: "Partager" },
        ].map(({ icon: I, label }) => (
          <div
            key={label}
            className={`${isLg ? "w-10 h-10" : "w-7 h-7"} rounded-full flex items-center justify-center`}
            style={{ background: subtleBg, color: t.palette.fg }}
            title={label}
          >
            <I className={isLg ? "w-4 h-4" : "w-3 h-3"} />
          </div>
        ))}
      </div>

      {/* Socials */}
      {t.socials.length > 0 && (
        <div className={`${isLg ? "px-5 mt-3 gap-2" : "px-3 mt-2 gap-1.5"} flex justify-center flex-wrap`}>
          {t.socials.map((soc) => (
            <div
              key={soc}
              className={`${isLg ? "w-9 h-9" : "w-7 h-7"} rounded-full flex items-center justify-center`}
              style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
              title={soc}
            >
              <SocialIcon type={soc} className={isLg ? "w-4 h-4" : "w-3 h-3"} />
            </div>
          ))}
        </div>
      )}

      {/* Info rows (lg only) */}
      {isLg && (
        <div className="px-5 mt-4 space-y-2">
          <InfoRow icon={Globe} label={t.website} muted={mutedFg} accent={t.palette.accent} />
          <InfoRow icon={Phone} label={t.phone} muted={mutedFg} accent={t.palette.accent} />
          <InfoRow icon={Mail} label={t.email} muted={mutedFg} accent={t.palette.accent} />
        </div>
      )}

      <div className="flex-1" />

      {/* CTA */}
      <div className={`${isLg ? "px-5 mt-4" : "px-3 mt-2.5"}`}>
        <div
          className={`rounded-full text-center font-semibold flex items-center justify-center gap-1.5 ${isLg ? "py-3 text-sm" : "py-2 text-[10px]"}`}
          style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
        >
          <Check className={isLg ? "w-4 h-4" : "w-3 h-3"} />
          {ctaLabel}
        </div>

        <div
          className={`rounded-full text-center font-medium border flex items-center justify-center gap-1.5 ${isLg ? "mt-2 py-2 text-xs" : "mt-1.5 py-1.5 text-[9px]"}`}
          style={{ borderColor: dividerColor, color: mutedFg }}
        >
          <Smartphone className={isLg ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
          Ajouter aux contacts
        </div>
      </div>
    </div>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
