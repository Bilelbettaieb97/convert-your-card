import * as React from "react";
import { useState } from "react";
import {
  Phone, Mail, MessageCircle, MapPin, Globe, Linkedin, Instagram,
  Facebook, Youtube, Twitter, CalendarCheck,
  Share2, Download, BadgeCheck, Award, ChevronRight, Building2, ImageIcon,
  Star, Calendar, Languages as LangIcon, Sparkles, PlayCircle, ArrowRight, Quote, ExternalLink,
} from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.84 1.55V6.79a4.84 4.84 0 0 1-1.07-.1z" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.166 2C9.495 2 8.29 3.613 8.29 4.977v.268c0 .101.008.2.012.3-.614-.157-1.202-.211-1.648-.455-.178-.097-.47-.063-.474.246-.005.326.24.476.524.583.346.13.868.197 1.14.227-.038.21-.058.427-.058.65 0 3.176 2.037 4.844 4.38 4.844 2.344 0 4.38-1.668 4.38-4.843 0-.224-.02-.44-.058-.651.272-.03.795-.097 1.14-.227.285-.107.529-.257.524-.584-.004-.308-.296-.342-.474-.245-.447.244-1.034.298-1.648.455.003-.1.012-.199.012-.3V4.977C16.042 3.613 14.836 2 12.166 2zm-7.01 14.14c-.075-.147-.037-.325.082-.43.12-.105.288-.128.433-.06.176.082.352.127.527.127.32 0 .584-.127.835-.256.415-.21.845-.427 1.603-.427.759 0 1.19.217 1.604.427.252.13.516.256.836.256.32 0 .583-.127.835-.256.415-.21.845-.427 1.603-.427.759 0 1.19.217 1.604.427.252.13.516.256.836.256.175 0 .35-.045.527-.127.145-.068.313-.045.432.06.12.105.158.283.082.43-.342.667-1.04 1.09-1.773 1.21-.143.023-.258.122-.293.26l-.087.34c-.036.142-.163.24-.31.24h-.004a.317.317 0 0 1-.308-.24l-.087-.34a.317.317 0 0 0-.293-.26c-.733-.12-1.43-.543-1.772-1.21a.317.317 0 0 0-.432-.06c-.145.068-.313.045-.433-.06-.12-.105-.158-.283-.082-.43z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
import type { CardData, Testimonial, TestimonialsStyle, Listing, Service, Language, Stat, Badge } from "@/lib/card-types";
import { THEMES_BY_ID } from "@/lib/card-themes";
import { downloadVCard } from "@/lib/vcard";

function logEvent(profileId: string, eventType: string, eventData?: Record<string, string>) {
  import("@/integrations/supabase/client").then(({ supabase }) => {
    supabase.rpc("log_card_event", {
      p_profile_id: profileId,
      p_event_type: eventType,
      p_event_data: (eventData ?? null) as import("@/integrations/supabase/types").Json,
    }).then(() => {});
  }).catch(() => {});
}

export function BusinessCard({ data, profileId }: { data: CardData; profileId?: string }) {
  const [copied, setCopied] = useState(false);
  const theme = (THEMES_BY_ID[data.accent] ?? THEMES_BY_ID.gold).palette;

  const styleVars = {
    "--card-bg":               theme.bg,
    "--card-surface":          theme.surface,
    "--card-surface-alt":      theme.surfaceAlt,
    "--card-border":           theme.border,
    "--card-text":             theme.text,
    "--card-text-muted":       theme.textMuted,
    "--card-accent":           theme.accent,
    "--card-accent-gradient":  theme.gradient,
    "--card-header-bg":        theme.headerBg,
    "--card-on-accent":        theme.onAccent,
    background:                theme.bg,
    color:                     theme.text,
  } as React.CSSProperties;

  const handleSave = () => {
    downloadVCard(data);
    if (profileId) logEvent(profileId, "vcard_download");
  };


  const handleShare = async () => {
    const shareData = {
      title: data.name,
      text: `${data.name} — ${data.title}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return (
    <div className="w-full" style={styleVars}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md grid place-items-center" style={{ background: "var(--card-accent-gradient)" }}>
            <Building2 className="h-4 w-4 text-card-on-accent" strokeWidth={2.4} />
          </div>
          <span className="font-display text-sm tracking-wide">{data.agency || "Agence"}</span>
        </div>
        <button
          onClick={handleShare}
          aria-label="Partager"
          className="h-9 w-9 grid place-items-center rounded-full bg-card-surface-surface/80 backdrop-blur border border-card-border active:scale-95 transition"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* IDENTITY + ORDERED SECTIONS — spacing is centralized here.
          Do NOT add vertical margins on section roots. */}
      <div className="flex flex-col gap-6 pb-2">
        <IdentitySection data={data} />
        {data.sectionOrder
          .filter((id) => id !== "identity" && id !== "theme")
          .filter((id) => {
            switch (id) {
              case "actions":      return data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website;
              case "vcard":        return data.vcardEnabled;
              case "stats":        return data.statsEnabled;
              case "about":        return data.aboutEnabled;
              case "video":        return data.videoEnabled;
              case "services":     return data.servicesEnabled;
              case "listings":     return data.listingsEnabled;
              case "gallery":      return data.galleryEnabled;
              case "testimonials": return data.testimonialsEnabled;
              case "calendar":     return data.calendarEnabled;
              case "languages":    return data.languagesEnabled;
              case "cta":          return data.ctaEnabled;
              case "contact":      return data.contactEnabled;
              case "socials":      return data.socialsEnabled;
              default:             return false;
            }
          })
          .map((id) => {
            const node = (() => {
              switch (id) {
                case "actions":      return <ActionsSection data={data} profileId={profileId} />;
                case "vcard":        return <VCardSection data={data} onSave={handleSave} copied={copied} />;
                case "stats":        return <StatsSection data={data} />;
                case "about":        return <AboutSection data={data} />;
                case "video":        return <VideoSection data={data} />;
                case "services":     return <ServicesSection data={data} />;
                case "listings":     return <ListingsSection data={data} />;
                case "gallery":      return <GallerySection data={data} />;
                case "testimonials": return <TestimonialsSection data={data} />;
                case "calendar":     return <CalendarSection data={data} profileId={profileId} />;
                case "languages":    return <LanguagesSection data={data} />;
                case "cta":          return <CtaSection data={data} profileId={profileId} />;
                case "contact":      return <ContactSection data={data} profileId={profileId} />;
                case "socials":      return <SocialsSection data={data} profileId={profileId} />;
                default:             return null;
              }
            })();
            if (!node) return null;
            return (
              <div key={id} data-brick={id} className="scroll-mt-4">
                {node}
              </div>
            );
          })}
      </div>


      <footer className="px-5 pt-8 pb-10 text-center">
        <p className="text-xs text-card-muted">© {new Date().getFullYear()} {data.agency} · Carte digitale</p>
      </footer>
    </div>
  );
}

/* ============================================================
   IDENTITY
   ============================================================ */

function IdentitySection({ data }: { data: CardData }) {
  const v = data.variants.identity;
  const Photo = ({ size }: { size: number }) => (
    data.photo
      ? <img src={data.photo} alt={data.name} className="h-full w-full object-cover" style={{ width: size, height: size }} />
      : <div className="grid place-items-center bg-card-surface-alt h-full w-full" style={{ width: size, height: size }}><ImageIcon className="h-6 w-6 text-card-muted" /></div>
  );

  if (v === "horizontal") {
    return (
      <header className="px-5">
        <div className="flex items-center gap-4 rounded-2xl bg-card-surface border border-card-border p-4">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-2xl overflow-hidden border border-card-border">
              <Photo size={80} />
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 grid place-items-center rounded-full border-2 border-card-surface"
              style={{ background: "var(--card-accent-gradient)" }}>
              <BadgeCheck className="h-3.5 w-3.5 text-card-on-accent" strokeWidth={2.6} />
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl leading-tight truncate">{data.name || "Votre nom"}</h1>
            <p className="text-xs text-card-muted truncate">{data.title || "Votre titre"}</p>
            {data.area && (
              <div className="mt-1.5 flex items-center gap-1 text-[11px] text-card-muted">
                <MapPin className="h-3 w-3" style={{ color: "var(--card-accent)" }} />
                <span className="truncate">{data.area}</span>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  if (v === "cover") {
    return (
      <header className="mx-5 rounded-3xl overflow-hidden border border-card-border">
        <div className="relative h-36 w-full" style={{ background: "var(--card-accent-gradient)" }}>
          {data.coverPhoto ? (
            <img src={data.coverPhoto} alt="" aria-hidden
              className="absolute inset-0 h-full w-full object-cover" />
          ) : data.photo ? (
            <img src={data.photo} alt="" aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-40 blur-[2px] scale-110" />
          ) : null}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, var(--card-bg) 100%)", opacity: 0.6 }} />
        </div>
        <div className="relative bg-card-surface px-5 pb-5 pt-0 -mt-12 flex flex-col items-center text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-card-surface shadow-xl">
              <Photo size={96} />
            </div>
            <span className="absolute bottom-0 right-0 h-6 w-6 grid place-items-center rounded-full border-2 border-card-surface"
              style={{ background: "var(--card-accent-gradient)" }}>
              <BadgeCheck className="h-3.5 w-3.5 text-card-on-accent" strokeWidth={2.6} />
            </span>
          </div>
          <h1 className="mt-3 text-xl font-display font-medium leading-tight">{data.name || "Votre nom"}</h1>
          <p className="mt-0.5 text-sm text-card-muted">{data.title || "Votre titre"}</p>
          {data.area && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-card-muted">
              <MapPin className="h-3.5 w-3.5" style={{ color: "var(--card-accent)" }} />
              <span>{data.area}</span>
            </div>
          )}
        </div>
      </header>
    );
  }

  // default: centered
  return (
    <header className="relative overflow-hidden pt-3 pb-7 px-5"
      style={{ background: "var(--card-header-bg)" }}>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full opacity-60 blur-md" style={{ background: "var(--card-accent-gradient)" }} />
          <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-card-bg">
            <Photo size={112} />
          </div>
          <span className="absolute bottom-1 right-1 h-6 w-6 grid place-items-center rounded-full border-2 border-card-bg"
            style={{ background: "var(--card-accent-gradient)" }}>
            <BadgeCheck className="h-3.5 w-3.5 text-card-on-accent" strokeWidth={2.6} />
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-display font-medium leading-tight">{data.name || "Votre nom"}</h1>
        <p className="mt-1 text-sm text-card-muted">{data.title || "Votre titre"}</p>
        {data.area && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-card-muted">
            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--card-accent)" }} />
            <span>{data.area}</span>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================
   ACTIONS
   ============================================================ */

function ActionsSection({ data, profileId }: { data: CardData; profileId?: string }) {
  const any = data.actions.call || data.actions.whatsapp || data.actions.email || data.actions.website || data.actions.rdv;
  if (!any) return null;
  const items = [
    data.actions.call     && { icon: Phone,          label: "Appeler",  href: `tel:${data.phone}`,             type: "call" },
    data.actions.whatsapp && { icon: MessageCircle,  label: "WhatsApp", href: `https://wa.me/${data.whatsapp}`, type: "whatsapp" },
    data.actions.email    && { icon: Mail,           label: "Mail",     href: `mailto:${data.email}`,           type: "email" },
    data.actions.website  && { icon: Globe,          label: "Site",     href: `https://${data.website}`,        type: "website" },
    (data.actions.rdv && data.calendarUrl) && { icon: CalendarCheck, label: "RDV",   href: data.calendarUrl,              type: "rdv" },
  ].filter(Boolean) as Array<{ icon: any; label: string; href: string; type: string }>;

  const v = data.variants.actions;

  if (v === "pills") {
    return (
      <section className="px-5 space-y-2">
        {items.map((it, i) => (
          <a key={i} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            onClick={() => profileId && logEvent(profileId, "click_button", { type: it.type })}
            className="flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border px-4 py-3 active:scale-[0.99] transition">
            <span className="h-9 w-9 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
              <it.icon className="h-4 w-4 text-card-on-accent" />
            </span>
            <span className="text-sm font-medium flex-1">{it.label}</span>
            <ChevronRight className="h-4 w-4 text-card-muted" />
          </a>
        ))}
      </section>
    );
  }

  if (v === "grid") {
    return (
      <section className="px-5 grid grid-cols-2 gap-2">
        {items.map((it, i) => (
          <a key={i} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            onClick={() => profileId && logEvent(profileId, "click_button", { type: it.type })}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card-surface border border-card-border py-5 active:scale-[0.99] transition">
            <span className="h-10 w-10 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
              <it.icon className="h-5 w-5 text-card-on-accent" />
            </span>
            <span className="text-xs font-medium">{it.label}</span>
          </a>
        ))}
      </section>
    );
  }

  // default icons
  return (
    <section className="px-5 relative z-10">
      <div className="flex gap-2 justify-center">
        {items.map((it, i) => (
          <QuickActionIcon key={i} icon={it.icon} label={it.label} href={it.href} primary={it.label === "Appeler"}
            onTrack={() => profileId && logEvent(profileId, "click_button", { type: it.type })} />
        ))}
      </div>
    </section>
  );
}

function QuickActionIcon({ icon: Icon, label, href, primary, onTrack }: { icon: any; label: string; href: string; primary?: boolean; onTrack?: () => void }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onTrack} className="flex flex-col items-center gap-1.5">
      <span
        className={`h-12 w-12 grid place-items-center rounded-2xl border border-card-border active:scale-95 transition ${primary ? "" : "bg-card-surface"}`}
        style={primary ? { background: "var(--card-accent-gradient)" } : undefined}
      >
        <Icon className={`h-4.5 w-4.5 ${primary ? "text-card-on-accent" : ""}`} strokeWidth={2} />
      </span>
      <span className="text-[10px] text-card-muted">{label}</span>
    </a>
  );
}

/* ============================================================
   vCARD
   ============================================================ */

function VCardSection({ data, onSave, copied }: { data: CardData; onSave: () => void; copied: boolean }) {
  if (!data.vcardEnabled) return null;
  const v = data.variants.vcard;

  if (v === "outline") {
    return (
      <section className="px-5">
        <button onClick={onSave}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium border-2 active:scale-[0.99] transition"
          style={{ borderColor: "var(--card-accent)", color: "var(--card-accent)" }}>
          <Download className="h-4 w-4" strokeWidth={2.4} />
          Enregistrer le contact
        </button>
        {copied && <p className="mt-2 text-center text-xs" style={{ color: "var(--card-accent)" }}>Lien copié ✓</p>}
      </section>
    );
  }

  if (v === "card") {
    return (
      <section className="px-5">
        <button onClick={onSave}
          className="w-full flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border p-4 active:scale-[0.99] transition text-left">
          <span className="h-11 w-11 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
            <Download className="h-5 w-5 text-card-on-accent" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-medium">Enregistrer le contact</span>
            <span className="block text-[11px] text-card-muted">Ajouter à votre carnet d'adresses</span>
          </span>
          <ChevronRight className="h-4 w-4 text-card-muted" />
        </button>
        {copied && <p className="mt-2 text-center text-xs" style={{ color: "var(--card-accent)" }}>Lien copié ✓</p>}
      </section>
    );
  }

  return (
    <section className="px-5">
      <button onClick={onSave}
        className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium text-card-on-accent active:scale-[0.99] transition"
        style={{ background: "var(--card-accent-gradient)", boxShadow: "0 0 40px -8px var(--card-accent)" }}>
        <Download className="h-4 w-4" strokeWidth={2.4} />
        Enregistrer le contact
      </button>
      {copied && <p className="mt-2 text-center text-xs" style={{ color: "var(--card-accent)" }}>Lien copié ✓</p>}
    </section>
  );
}

/* ============================================================
   STATS
   ============================================================ */

function StatsSection({ data }: { data: CardData }) {
  if (!data.statsEnabled || data.stats.length === 0) return null;
  const v = data.variants.stats;

  if (v === "stacked") {
    return (
      <section className="px-5 space-y-2">
        {data.stats.map((s, i) => (
          <div key={i} className="flex items-end justify-between rounded-2xl bg-card-surface border border-card-border px-4 py-3">
            <span className="text-[11px] uppercase tracking-wider text-card-muted">{s.label}</span>
            <span className="font-display text-3xl leading-none" style={{ color: "var(--card-accent)" }}>{s.value}</span>
          </div>
        ))}
      </section>
    );
  }

  if (v === "pills") {
    return (
      <section className="px-5 flex flex-wrap gap-2">
        {data.stats.map((s, i) => (
          <span key={i} className="inline-flex items-baseline gap-1.5 rounded-full bg-card-surface border border-card-border px-3.5 py-2">
            <span className="font-display text-base" style={{ color: "var(--card-accent)" }}>{s.value}</span>
            <span className="text-[11px] text-card-muted">{s.label}</span>
          </span>
        ))}
      </section>
    );
  }

  const is4 = data.stats.length === 4;
  const cols = is4 ? 2 : data.stats.length;
  const valueSize = is4 ? "text-xl" : data.stats.length === 3 ? "text-xl" : "text-2xl";
  return (
    <section className="px-5">
      <div
        className="grid rounded-2xl bg-card-surface border border-card-border overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
      >
        {data.stats.map((s, i) => {
          const borderRight = is4 ? i % 2 === 0 : i < data.stats.length - 1;
          const borderBottom = is4 && i < 2;
          return (
            <div
              key={i}
              className={[
                "py-3 px-2 text-center overflow-hidden",
                borderRight ? "border-r border-card-border" : "",
                borderBottom ? "border-b border-card-border" : "",
              ].join(" ")}
            >
              <div className={`font-display ${valueSize} leading-none`} style={{ color: "var(--card-accent)" }}>{s.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-card-muted leading-tight">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function AboutSection({ data }: { data: CardData }) {
  if (!data.aboutEnabled) return null;
  const v = data.variants.about;

  if (v === "quote") {
    return (
      <section className="px-5">
        <SectionTitle>À propos</SectionTitle>
        <div className="mt-3 relative rounded-2xl bg-card-surface border border-card-border p-5">
          <Quote className="absolute top-3 right-3 h-6 w-6 opacity-30" style={{ color: "var(--card-accent)" }} />
          <p className="text-sm leading-relaxed italic">« {data.bio} »</p>
          {data.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.badges.map((b) => <Chip key={b.id}>{b.label}</Chip>)}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (v === "card") {
    return (
      <section className="px-5">
        <div className="rounded-2xl bg-card-surface border border-card-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-9 w-9 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
              <Sparkles className="h-4 w-4 text-card-on-accent" />
            </span>
            <h2 className="font-display text-base">À propos</h2>
          </div>
          <p className="text-sm leading-relaxed text-card-muted">{data.bio}</p>
          {data.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.badges.map((b) => <Chip key={b.id}>{b.label}</Chip>)}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="px-5">
      <SectionTitle>À propos</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-card-muted">{data.bio}</p>
      {data.badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.badges.map((b) => (
            <span key={b.id} className="inline-flex items-center gap-1.5 rounded-full bg-card-surface border border-card-border px-3 py-1.5 text-xs">
              <Award className="h-3.5 w-3.5" style={{ color: "var(--card-accent)" }} />
              {b.label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card-bg border border-card-border px-3 py-1.5 text-xs">
      <Award className="h-3.5 w-3.5" style={{ color: "var(--card-accent)" }} />
      {children}
    </span>
  );
}

/* ============================================================
   VIDEO
   ============================================================ */

function VideoSection({ data }: { data: CardData }) {
  if (!data.videoEnabled || !data.videoUrl) return null;
  const v = data.variants.video;
  const id = parseYoutubeId(data.videoUrl);

  if (!id) {
    return (
      <section className="px-5">
        <SectionTitle>{data.videoTitle || "Vidéo"}</SectionTitle>
        <div className="mt-3 rounded-2xl border border-card-border bg-card-surface p-4 text-xs text-card-muted">
          URL YouTube invalide.
        </div>
      </section>
    );
  }

  if (v === "thumb") {
    return (
      <section className="px-5">
        <SectionTitle>{data.videoTitle || "Vidéo"}</SectionTitle>
        <YoutubeLite id={id} title={data.videoTitle} />
      </section>
    );
  }

  if (v === "cinema") {
    return (
      <section className="px-5">
        <div className="relative rounded-3xl overflow-hidden border border-card-border bg-black aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${id}?rel=0`}
            title={data.videoTitle || "YouTube"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--card-accent)" }}>Vidéo</div>
            <div className="text-sm font-display text-white truncate">{data.videoTitle || "Présentation"}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5">
      <SectionTitle>{data.videoTitle || "Vidéo"}</SectionTitle>
      <div className="mt-3 relative rounded-2xl overflow-hidden border border-card-border bg-black aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?rel=0`}
          title={data.videoTitle || "YouTube"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function YoutubeLite({ id, title }: { id: string; title?: string }) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <div className="mt-3 relative rounded-2xl overflow-hidden border border-card-border bg-black aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title || "YouTube"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setLoaded(true)}
      className="mt-3 group relative block w-full rounded-2xl overflow-hidden border border-card-border bg-black aspect-video">
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title || "Vidéo"} className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="h-14 w-14 grid place-items-center rounded-full bg-black/60 backdrop-blur border border-white/20">
          <PlayCircle className="h-7 w-7" style={{ color: "var(--card-accent)" }} />
        </span>
      </div>
    </button>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */

function ServicesSection({ data }: { data: CardData }) {
  if (!data.servicesEnabled || data.services.length === 0) return null;
  const v = data.variants.services;

  if (v === "numbered") {
    return (
      <section className="px-5">
        <SectionTitle>Services</SectionTitle>
        <ul className="mt-3 space-y-2">
          {data.services.map((s, i) => {
            const Tag = s.url ? "a" : "div";
            const linkProps = s.url ? { href: s.url, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <li key={s.id}>
                <Tag {...linkProps} className="rounded-2xl bg-card-surface border border-card-border p-4 flex gap-3 active:scale-[0.99] transition">
                  <span className="font-display text-2xl shrink-0 w-9 text-right" style={{ color: "var(--card-accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 border-l border-card-border pl-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium">{s.title}</h3>
                      {s.url && <ExternalLink className="h-3 w-3 text-card-muted shrink-0 mt-0.5" />}
                    </div>
                    {s.description && <p className="mt-0.5 text-xs text-card-muted leading-relaxed">{s.description}</p>}
                  </div>
                </Tag>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (v === "carousel") {
    return (
      <section className="">
        <div className="px-5"><SectionTitle>Services</SectionTitle></div>
        <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.services.map((s) => {
            const Tag = s.url ? "a" : "article";
            const linkProps = s.url ? { href: s.url, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Tag key={s.id} {...linkProps} className="snap-start shrink-0 w-[72%] rounded-2xl bg-card-surface border border-card-border p-4 active:scale-[0.99] transition">
                <div className="flex items-start justify-between">
                  <span className="h-9 w-9 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
                    <Sparkles className="h-4 w-4 text-card-on-accent" />
                  </span>
                  {s.url && <ExternalLink className="h-3.5 w-3.5 text-card-muted" />}
                </div>
                <h3 className="mt-3 text-sm font-medium">{s.title}</h3>
                {s.description && <p className="mt-1 text-xs text-card-muted leading-relaxed">{s.description}</p>}
              </Tag>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="px-5">
      <SectionTitle>Services</SectionTitle>
      <ul className="mt-3 space-y-2">
        {data.services.map((s) => {
          const Tag = s.url ? "a" : "div";
          const linkProps = s.url ? { href: s.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <li key={s.id}>
              <Tag {...linkProps} className="rounded-2xl bg-card-surface border border-card-border p-4 flex gap-3 active:scale-[0.99] transition">
                <span className="h-9 w-9 grid place-items-center rounded-xl shrink-0" style={{ background: "var(--card-accent-gradient)" }}>
                  <Sparkles className="h-4 w-4 text-card-on-accent" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium">{s.title}</h3>
                    {s.url && <ExternalLink className="h-3 w-3 text-card-muted shrink-0 mt-0.5" />}
                  </div>
                  {s.description && <p className="mt-0.5 text-xs text-card-muted leading-relaxed">{s.description}</p>}
                </div>
              </Tag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ============================================================
   LISTINGS
   ============================================================ */

function GallerySection({ data }: { data: CardData }) {
  const gallery = data.gallery ?? [];
  if (!data.galleryEnabled || gallery.length === 0) return null;
  const v = data.variants?.gallery;

  if (v === "carousel") {
    return (
      <section className="px-5">
        <SectionTitle>Galerie</SectionTitle>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {gallery.map((p) => {
            const Tag = p.url ? "a" : "div";
            const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Tag key={p.id} {...linkProps} className="snap-start shrink-0 w-[calc(50%-4px)] rounded-xl overflow-hidden bg-card-surface border border-card-border active:scale-[0.98] transition">
                <div className="aspect-square overflow-hidden bg-card-surface-alt relative">
                  {p.img ? <img src={p.img} alt={p.caption} className="h-full w-full object-cover" /> :
                    <div className="h-full w-full grid place-items-center"><ImageIcon className="h-6 w-6 text-card-muted" /></div>}
                  {p.url && <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-black/40 grid place-items-center"><ExternalLink className="h-2.5 w-2.5 text-white" /></div>}
                </div>
                {p.caption && <p className="text-[10px] text-card-muted px-2 py-1.5 truncate">{p.caption}</p>}
              </Tag>
            );
          })}
        </div>
      </section>
    );
  }

  if (v === "stacked") {
    return (
      <section className="px-5 space-y-3">
        <SectionTitle>Galerie</SectionTitle>
        {gallery.map((p) => {
          const Tag = p.url ? "a" : "div";
          const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Tag key={p.id} {...linkProps} className="rounded-2xl overflow-hidden bg-card-surface border border-card-border active:scale-[0.99] transition">
              <div className="aspect-[4/3] overflow-hidden bg-card-surface-alt relative">
                {p.img ? <img src={p.img} alt={p.caption} className="h-full w-full object-cover" /> :
                  <div className="h-full w-full grid place-items-center"><ImageIcon className="h-8 w-8 text-card-muted" /></div>}
                {p.url && <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/40 grid place-items-center"><ExternalLink className="h-3 w-3 text-white" /></div>}
              </div>
              {p.caption && <p className="text-xs text-card-muted px-4 py-2">{p.caption}</p>}
            </Tag>
          );
        })}
      </section>
    );
  }

  // grid (default)
  return (
    <section className="px-5">
      <SectionTitle>Galerie</SectionTitle>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {gallery.map((p) => {
          const Tag = p.url ? "a" : "div";
          const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Tag key={p.id} {...linkProps} className="rounded-xl overflow-hidden bg-card-surface border border-card-border active:scale-[0.98] transition">
              <div className="aspect-square overflow-hidden bg-card-surface-alt relative">
                {p.img ? <img src={p.img} alt={p.caption} className="h-full w-full object-cover" /> :
                  <div className="h-full w-full grid place-items-center"><ImageIcon className="h-6 w-6 text-card-muted" /></div>}
                {p.url && <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-black/40 grid place-items-center"><ExternalLink className="h-2.5 w-2.5 text-white" /></div>}
              </div>
              {p.caption && <p className="text-[10px] text-card-muted px-2 py-1.5 truncate">{p.caption}</p>}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

function ListingsSection({ data }: { data: CardData }) {
  if (!data.listingsEnabled || data.listings.length === 0) return null;
  const v = data.variants.listings;

  if (v === "stacked") {
    return (
      <section className="px-5 space-y-3">
        <SectionTitle>Sélection en vente</SectionTitle>
        {data.listings.map((l) => {
          const Tag = l.url ? "a" : "article";
          const linkProps = l.url ? { href: l.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Tag key={l.id} {...linkProps} className="rounded-2xl overflow-hidden bg-card-surface border border-card-border active:scale-[0.99] transition">
              <div className="aspect-[16/9] overflow-hidden bg-card-surface-alt">
                {l.img ? <img src={l.img} alt={l.title} className="h-full w-full object-cover" /> :
                  <div className="h-full w-full grid place-items-center"><ImageIcon className="h-8 w-8 text-card-muted" /></div>}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg leading-tight">{l.title || "Sans titre"}</h3>
                {l.meta && <p className="mt-0.5 text-xs text-card-muted">{l.meta}</p>}
                <div className="mt-2 flex items-center justify-between">
                  {l.price && <p className="font-medium" style={{ color: "var(--card-accent)" }}>{l.price}</p>}
                  {l.url && <span className="text-xs text-card-muted flex items-center gap-1">Voir l'annonce <ExternalLink className="h-3 w-3" /></span>}
                </div>
              </div>
            </Tag>
          );
        })}
      </section>
    );
  }

  if (v === "compact") {
    return (
      <section className="px-5">
        <SectionTitle>Sélection en vente</SectionTitle>
        <ul className="mt-3 space-y-2">
          {data.listings.map((l) => {
            const Tag = l.url ? "a" : "div";
            const linkProps = l.url ? { href: l.url, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <li key={l.id}>
                <Tag {...linkProps} className="flex gap-3 rounded-xl bg-card-surface border border-card-border p-2 pr-3 items-center active:scale-[0.99] transition">
                  <div className="h-16 w-20 rounded-lg overflow-hidden bg-card-surface-alt shrink-0">
                    {l.img ? <img src={l.img} alt={l.title} className="h-full w-full object-cover" /> :
                      <div className="h-full w-full grid place-items-center"><ImageIcon className="h-5 w-5 text-card-muted" /></div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium truncate">{l.title || "Sans titre"}</h3>
                    {l.meta && <p className="text-[11px] text-card-muted truncate">{l.meta}</p>}
                    {l.url && <p className="text-[10px] text-card-muted mt-0.5 flex items-center gap-0.5">Voir <ExternalLink className="h-2.5 w-2.5" /></p>}
                  </div>
                  {l.price && <span className="text-sm font-medium shrink-0" style={{ color: "var(--card-accent)" }}>{l.price}</span>}
                </Tag>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <section className="">
      <div className="px-5"><SectionTitle>Sélection en vente</SectionTitle></div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {data.listings.map((l) => {
          const Tag = l.url ? "a" : "article";
          const linkProps = l.url ? { href: l.url, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Tag key={l.id} {...linkProps} className="snap-start shrink-0 w-[78%] rounded-2xl overflow-hidden bg-card-surface border border-card-border active:scale-[0.99] transition">
              <div className="aspect-[4/3] overflow-hidden bg-card-surface-alt">
                {l.img ? <img src={l.img} alt={l.title} className="h-full w-full object-cover" /> :
                  <div className="h-full w-full grid place-items-center"><ImageIcon className="h-8 w-8 text-card-muted" /></div>}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg leading-tight">{l.title || "Sans titre"}</h3>
                {l.meta && <p className="mt-0.5 text-xs text-card-muted">{l.meta}</p>}
                <div className="mt-2 flex items-center justify-between">
                  {l.price && <p className="font-medium" style={{ color: "var(--card-accent)" }}>{l.price}</p>}
                  {l.url && <span className="text-xs text-card-muted flex items-center gap-1">Voir l'annonce <ExternalLink className="h-3 w-3" /></span>}
                </div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS (reuse testimonialsStyle for backwards compat)
   ============================================================ */

function TestimonialsSection({ data }: { data: CardData }) {
  if (!data.testimonialsEnabled || data.testimonials.length === 0) return null;
  return (
    <section className="">
      <div className="px-5"><SectionTitle>Ils en parlent</SectionTitle></div>
      <TestimonialsBlock testimonials={data.testimonials} style={data.testimonialsStyle} />
    </section>
  );
}

/* ============================================================
   CALENDAR
   ============================================================ */

function CalendarSection({ data, profileId }: { data: CardData; profileId?: string }) {
  if (!data.calendarEnabled || !data.calendarUrl) return null;
  const v = data.variants.calendar;
  const label = data.calendarLabel || "Réserver un rendez-vous";
  const track = () => profileId && logEvent(profileId, "click_button", { type: "calendar" });

  if (v === "cta") {
    return (
      <section className="px-5">
        <a href={data.calendarUrl} target="_blank" rel="noopener noreferrer" onClick={track}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-medium text-card-on-accent active:scale-[0.99] transition"
          style={{ background: "var(--card-accent-gradient)" }}>
          <Calendar className="h-4 w-4" />
          {label}
        </a>
      </section>
    );
  }

  if (v === "block") {
    return (
      <section className="px-5">
        <a href={data.calendarUrl} target="_blank" rel="noopener noreferrer" onClick={track}
          className="block rounded-2xl bg-card-surface border border-card-border p-5 text-center active:scale-[0.99] transition">
          <span className="mx-auto h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "var(--card-accent-gradient)" }}>
            <Calendar className="h-6 w-6 text-card-on-accent" />
          </span>
          <div className="mt-3 font-display text-base">{label}</div>
          <div className="mt-1 text-[11px] text-card-muted">Choisissez un créneau qui vous convient</div>
        </a>
      </section>
    );
  }

  return (
    <section className="px-5">
      <a href={data.calendarUrl} target="_blank" rel="noopener noreferrer" onClick={track}
        className="flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border p-4 active:scale-[0.99] transition">
        <span className="h-11 w-11 grid place-items-center rounded-xl" style={{ background: "var(--card-accent-gradient)" }}>
          <Calendar className="h-5 w-5 text-card-on-accent" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-card-muted">Agenda</div>
          <div className="text-sm font-medium">{label}</div>
        </div>
        <ChevronRight className="h-4 w-4 text-card-muted" />
      </a>
    </section>
  );
}

/* ============================================================
   LANGUAGES
   ============================================================ */

function LanguagesSection({ data }: { data: CardData }) {
  if (!data.languagesEnabled || data.languages.length === 0) return null;
  const v = data.variants.languages;

  const levelDots = (level: string) => {
    const m: Record<string, number> = { "Débutant": 1, "Intermédiaire": 2, "Avancé": 3, "Courant": 4, "Natif": 5 };
    return m[level] ?? 3;
  };

  if (v === "list") {
    return (
      <section className="px-5">
        <SectionTitle>Langues parlées</SectionTitle>
        <ul className="mt-3 rounded-2xl bg-card-surface border border-card-border divide-y divide-card-border overflow-hidden">
          {data.languages.map((l) => {
            const n = levelDots(l.level);
            return (
              <li key={l.id} className="flex items-center gap-3 px-4 py-3">
                <LangIcon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
                <span className="flex-1 text-sm font-medium">{l.name}</span>
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full"
                      style={{ background: i < n ? "var(--card-accent)" : "oklch(0.4 0 0 / 0.3)" }} />
                  ))}
                </span>
                <span className="text-[11px] text-card-muted w-16 text-right">{l.level}</span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (v === "grid") {
    return (
      <section className="px-5">
        <SectionTitle>Langues parlées</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {data.languages.map((l) => (
            <div key={l.id} className="rounded-2xl bg-card-surface border border-card-border p-3">
              <div className="flex items-center gap-2">
                <LangIcon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
                <span className="text-sm font-medium truncate">{l.name}</span>
              </div>
              {l.level && <div className="mt-1 text-[11px] text-card-muted">{l.level}</div>}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-5">
      <SectionTitle>Langues parlées</SectionTitle>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.languages.map((l) => (
          <span key={l.id} className="inline-flex items-center gap-2 rounded-full bg-card-surface border border-card-border px-3 py-1.5 text-xs">
            <LangIcon className="h-3.5 w-3.5" style={{ color: "var(--card-accent)" }} />
            <span className="font-medium">{l.name}</span>
            {l.level && <span className="text-card-muted">· {l.level}</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */

function CtaSection({ data, profileId }: { data: CardData; profileId?: string }) {
  if (!data.ctaEnabled) return null;
  const v = data.variants.cta;
  const hasBtn = data.ctaButtonLabel && data.ctaButtonUrl;
  const track = () => profileId && logEvent(profileId, "click_button", { type: "cta" });

  if (v === "outline") {
    return (
      <section className="px-5">
        <div className="rounded-2xl border-2 p-5" style={{ borderColor: "var(--card-accent)" }}>
          <h3 className="font-display text-lg leading-tight">{data.ctaTitle}</h3>
          {data.ctaText && <p className="mt-1.5 text-sm text-card-muted">{data.ctaText}</p>}
          {hasBtn && (
            <a href={data.ctaButtonUrl} target="_blank" rel="noopener noreferrer" onClick={track}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--card-accent)" }}>
              {data.ctaButtonLabel} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>
    );
  }

  if (v === "bold") {
    return (
      <section className="px-5">
        <div className="rounded-2xl p-5 text-card-on-accent" style={{ background: "var(--card-accent-gradient)" }}>
          <h3 className="font-display text-xl leading-tight">{data.ctaTitle}</h3>
          {data.ctaText && <p className="mt-1.5 text-sm opacity-90">{data.ctaText}</p>}
          {hasBtn && (
            <a href={data.ctaButtonUrl} target="_blank" rel="noopener noreferrer" onClick={track}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold bg-card-bg  active:scale-[0.99] transition">
              {data.ctaButtonLabel} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="px-5">
      <div className="rounded-2xl p-5 border border-card-border"
        style={{ background: "var(--card-surface)" }}>
        <h3 className="font-display text-lg leading-tight">{data.ctaTitle}</h3>
        {data.ctaText && <p className="mt-1.5 text-sm text-card-muted">{data.ctaText}</p>}
        {hasBtn && (
          <a href={data.ctaButtonUrl} target="_blank" rel="noopener noreferrer" onClick={track}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-card-on-accent active:scale-[0.99] transition"
            style={{ background: "var(--card-accent-gradient)" }}>
            {data.ctaButtonLabel} <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */

function ContactSection({ data, profileId }: { data: CardData; profileId?: string }) {
  if (!data.contactEnabled) return null;
  const v = data.variants.contact;
  const typeMap: Record<string, string> = { "Téléphone": "call", "Email": "email", "Site web": "website" };
  const track = (label: string) => {
    const type = typeMap[label];
    if (profileId && type) logEvent(profileId, "click_button", { type });
  };
  const rows = [
    { icon: Phone, label: "Téléphone", value: data.phoneDisplay || data.phone, href: data.phone ? `tel:${data.phone}` : undefined },
    { icon: Mail,  label: "Email",     value: data.email,                       href: data.email ? `mailto:${data.email}` : undefined },
    { icon: Globe, label: "Site web",  value: data.website,                     href: data.website ? `https://${data.website}` : undefined },
    { icon: MapPin, label: "Secteur",  value: data.area,                        href: undefined as string | undefined },
  ].filter((r) => r.value);

  if (v === "grid") {
    return (
      <section className="px-5">
        <SectionTitle>Coordonnées</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {rows.map((r, i) => {
            const Inner = (
              <div className="rounded-2xl bg-card-surface border border-card-border p-3">
                <span className="h-8 w-8 grid place-items-center rounded-xl bg-card-surface-alt">
                  <r.icon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
                </span>
                <div className="mt-2 text-[10px] uppercase tracking-wider text-card-muted">{r.label}</div>
                <div className="text-xs font-medium truncate">{r.value}</div>
              </div>
            );
            return r.href
              ? <a key={i} href={r.href} onClick={() => track(r.label)} className="active:scale-[0.99] transition">{Inner}</a>
              : <div key={i}>{Inner}</div>;
          })}
        </div>
      </section>
    );
  }

  if (v === "compact") {
    return (
      <section className="px-5">
        <SectionTitle>Coordonnées</SectionTitle>
        <ul className="mt-3 space-y-1.5">
          {rows.map((r, i) => {
            const Inner = (
              <div className="flex items-center gap-3 py-1.5">
                <r.icon className="h-4 w-4 shrink-0" style={{ color: "var(--card-accent)" }} />
                <span className="text-sm truncate">{r.value}</span>
              </div>
            );
            return <li key={i}>{r.href ? <a href={r.href} onClick={() => track(r.label)} className="block">{Inner}</a> : Inner}</li>;
          })}
        </ul>
      </section>
    );
  }

  return (
    <section className="px-5">
      <SectionTitle>Coordonnées</SectionTitle>
      <ul className="mt-3 rounded-2xl bg-card-surface border border-card-border divide-y divide-card-border overflow-hidden">
        <ContactRow icon={Phone}  label="Téléphone" value={data.phoneDisplay || data.phone} href={`tel:${data.phone}`}   onTrack={() => track("Téléphone")} />
        <ContactRow icon={Mail}   label="Email"     value={data.email}   href={`mailto:${data.email}`}                   onTrack={() => track("Email")} />
        <ContactRow icon={Globe}  label="Site web"  value={data.website} href={`https://${data.website}`}                onTrack={() => track("Site web")} />
        <ContactRow icon={MapPin} label="Secteur"   value={data.area} />
      </ul>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href, onTrack }: { icon: any; label: string; value: string; href?: string; onTrack?: () => void }) {
  if (!value) return null;
  const Inner = (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="h-9 w-9 grid place-items-center rounded-xl bg-card-surface-alt">
        <Icon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-card-muted">{label}</div>
        <div className="text-sm truncate">{value}</div>
      </div>
      {href && <ChevronRight className="h-4 w-4 text-card-muted" />}
    </div>
  );
  return <li>{href ? <a href={href} onClick={onTrack} className="block active:bg-card-surface-alt/60 transition">{Inner}</a> : Inner}</li>;
}

/* ============================================================
   SOCIALS
   ============================================================ */

const SOCIAL_BRAND: Record<string, string> = {
  LinkedIn:  "oklch(0.55 0.13 245)",
  Instagram: "oklch(0.65 0.2 15)",
  WhatsApp:  "oklch(0.7 0.17 150)",
  Facebook:  "oklch(0.55 0.15 255)",
  TikTok:    "oklch(0.15 0 0)",
  YouTube:   "oklch(0.6 0.22 27)",
  "Twitter/X": "oklch(0.2 0 0)",
  Snapchat:  "oklch(0.88 0.18 95)",
  Pinterest: "oklch(0.55 0.22 20)",
};

const toHref = (v: string, wrap?: (s: string) => string) =>
  !v || v === "#" ? null : wrap ? wrap(v) : v;

function SocialsSection({ data, profileId }: { data: CardData; profileId?: string }) {
  if (!data.socialsEnabled) return null;
  const v = data.variants.socials;
  const items = [
    data.linkedin       && { icon: Linkedin,      label: "LinkedIn",  href: toHref(data.linkedin) },
    data.instagram      && { icon: Instagram,     label: "Instagram", href: toHref(data.instagram) },
    data.facebook       && { icon: Facebook,      label: "Facebook",  href: toHref(data.facebook) },
    data.tiktok         && { icon: TikTokIcon,    label: "TikTok",    href: toHref(data.tiktok) },
    data.youtube        && { icon: Youtube,       label: "YouTube",   href: toHref(data.youtube) },
    data.twitter        && { icon: Twitter,       label: "Twitter/X", href: toHref(data.twitter) },
    data.snapchat       && { icon: SnapchatIcon,  label: "Snapchat",  href: toHref(data.snapchat) },
    data.pinterest      && { icon: PinterestIcon, label: "Pinterest", href: toHref(data.pinterest) },
    data.whatsappSocial && data.whatsappSocial !== "#" && { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${data.whatsappSocial}` },
  ].filter(Boolean) as Array<{ icon: any; label: string; href: string | null }>;
  if (items.length === 0) return null;

  const track = (label: string) => profileId && logEvent(profileId, "click_social", { type: label.toLowerCase() });

  if (v === "pills") {
    return (
      <section className="px-5 space-y-2">
        {items.map((it, i) =>
          it.href ? (
            <a key={i} href={it.href} target="_blank" rel="noopener noreferrer"
              onClick={() => track(it.label)}
              className="flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border px-4 py-3 active:scale-[0.99] transition">
              <it.icon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
              <span className="text-sm font-medium flex-1">{it.label}</span>
              <ExternalLink className="h-3.5 w-3.5 text-card-muted" />
            </a>
          ) : (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-card-surface border border-card-border px-4 py-3 opacity-60">
              <it.icon className="h-4 w-4" style={{ color: "var(--card-accent)" }} />
              <span className="text-sm font-medium flex-1">{it.label}</span>
            </div>
          )
        )}
      </section>
    );
  }

  if (v === "branded") {
    return (
      <section className="px-5 flex justify-center gap-3">
        {items.map((it, i) =>
          it.href ? (
            <a key={i} href={it.href} target="_blank" rel="noopener noreferrer" aria-label={it.label}
              onClick={() => track(it.label)}
              className="h-12 w-12 grid place-items-center rounded-2xl active:scale-95 transition"
              style={{ background: SOCIAL_BRAND[it.label] }}>
              <it.icon className="h-5 w-5 text-white" />
            </a>
          ) : (
            <div key={i} aria-label={it.label}
              className="h-12 w-12 grid place-items-center rounded-2xl opacity-60"
              style={{ background: SOCIAL_BRAND[it.label] }}>
              <it.icon className="h-5 w-5 text-white" />
            </div>
          )
        )}
      </section>
    );
  }

  return (
    <section className="px-5 flex justify-center gap-3">
      {items.map((it, i) =>
        it.href ? (
          <a key={i} href={it.href} target="_blank" rel="noopener noreferrer" aria-label={it.label}
            onClick={() => track(it.label)}
            className="h-11 w-11 grid place-items-center rounded-full bg-card-surface border border-card-border active:scale-95 transition">
            <it.icon className="h-5 w-5" style={{ color: "var(--card-accent)" }} />
          </a>
        ) : (
          <div key={i} aria-label={it.label}
            className="h-11 w-11 grid place-items-center rounded-full bg-card-surface border border-card-border opacity-60">
            <it.icon className="h-5 w-5" style={{ color: "var(--card-accent)" }} />
          </div>
        )
      )}
    </section>
  );
}

/* ============================================================
   Shared helpers
   ============================================================ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xs uppercase tracking-[0.18em]" style={{ color: "var(--card-accent)" }}>{children}</h2>;
}

function parseYoutubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/\/(embed|shorts)\/([\w-]{6,})/);
      if (m) return m[2];
    }
  } catch {
    const m = url.match(/[\w-]{11}/);
    if (m) return m[0];
  }
  return null;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5"
          fill={i < rating ? "currentColor" : "transparent"}
          style={{ color: "var(--card-accent)" }} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function Avatar({ photo, name, size = 40 }: { photo: string; name: string; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
  return (
    <span
      className="grid place-items-center rounded-full overflow-hidden bg-card-surface-alt border border-card-border shrink-0 text-xs font-medium"
      style={{ width: size, height: size }}
    >
      {photo
        ? <img src={photo} alt={name} className="h-full w-full object-cover" />
        : <span className="text-card-muted">{initials || "?"}</span>}
    </span>
  );
}

function TestimonialLinkWrap({ link, children }: { link?: string; children: React.ReactNode }) {
  if (!link) return <>{children}</>;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block active:opacity-90 transition">
      {children}
    </a>
  );
}

function TestimonialsBlock({ testimonials, style }: { testimonials: Testimonial[]; style: TestimonialsStyle }) {
  if (style === "stacked") {
    return (
      <ul className="mt-3 px-5 space-y-3">
        {testimonials.map((t) => (
          <li key={t.id}>
            <TestimonialLinkWrap link={t.link}>
              <article className="rounded-2xl bg-card-surface border border-card-border p-4">
                <div className="flex items-start gap-3">
                  <Avatar photo={t.photo} name={t.name} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{t.name}</div>
                        <div className="text-[11px] text-card-muted truncate">{t.role}</div>
                      </div>
                      <Stars rating={t.rating} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-card-muted">« {t.text} »</p>
                    {t.link && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--card-accent)" }}>
                        Voir l'avis <ExternalLink className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </TestimonialLinkWrap>
          </li>
        ))}
      </ul>
    );
  }

  if (style === "compact") {
    return (
      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {testimonials.map((t) => (
          <TestimonialLinkWrap key={t.id} link={t.link}>
            <article className="snap-start shrink-0 w-[68%] rounded-xl bg-card-surface border border-card-border p-3">
              <div className="flex items-center gap-2">
                <Avatar photo={t.photo} name={t.name} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium truncate">{t.name}</div>
                  <Stars rating={t.rating} />
                </div>
              </div>
              <p className="mt-2 text-xs leading-snug text-card-muted line-clamp-3">« {t.text} »</p>
            </article>
          </TestimonialLinkWrap>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {testimonials.map((t) => (
        <TestimonialLinkWrap key={t.id} link={t.link}>
          <article className="snap-start shrink-0 w-[82%] rounded-2xl bg-card-surface border border-card-border p-4 relative">
            <Quote className="absolute top-3 right-3 h-5 w-5 opacity-30" style={{ color: "var(--card-accent)" }} />
            <Stars rating={t.rating} />
            <p className="mt-3 text-sm leading-relaxed">« {t.text} »</p>
            <div className="mt-4 pt-3 border-t border-card-border flex items-center gap-3">
              <Avatar photo={t.photo} name={t.name} size={36} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{t.name}</div>
                <div className="text-[11px] text-card-muted truncate">{t.role}</div>
              </div>
              {t.link && <ExternalLink className="h-3.5 w-3.5 text-card-muted" />}
            </div>
          </article>
        </TestimonialLinkWrap>
      ))}
    </div>
  );
}
