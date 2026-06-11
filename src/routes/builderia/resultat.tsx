import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { Sparkles, Loader2, Rocket, Share2, Copy, Check, RotateCcw } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { saveCardPreview } from "@/fns/save-card-preview";
import { type CardData, type ThemeAccent } from "@/lib/card-types";
import { createCard, updateCard, loadMyCard } from "@/lib/card-actions";
import { createCheckoutSession } from "@/fns/checkout";

export const Route = createFileRoute("/builderia/resultat")({
  head: () => ({
    meta: [
      { title: "Votre carte est prête — Carte Visite Digitale" },
      { name: "description", content: "Publiez votre carte de visite digitale générée par l'IA en quelques secondes." },
    ],
  }),
  component: BuilderIAResultatPage,
});

// ─── Score ────────────────────────────────────────────────────────────────────

function calcScore(card: CardData) {
  let score = 35;
  const tips: Array<{ label: string; impact: string }> = [];
  if (card.photo?.startsWith("http")) score += 15;
  else tips.push({ label: "Ajoutez une photo professionnelle", impact: "+23% de contacts" });
  if (card.calendarEnabled && card.calendarUrl) score += 12;
  else tips.push({ label: "Connectez votre agenda Calendly", impact: "+31% de RDV" });
  if ((card.testimonials?.length ?? 0) >= 3) score += 12;
  if (card.ctaEnabled && card.ctaTitle) score += 8;
  if (card.coverPhoto) score += 8;
  else tips.push({ label: "Ajoutez une photo de couverture", impact: "+12% d'engagement" });
  const actionsCount = Object.values(card.actions ?? {}).filter(Boolean).length;
  score += Math.min(actionsCount * 3, 10);
  return { score: Math.min(score, 100), tips: tips.slice(0, 2) };
}

function ScoreRing({ score }: { score: number }) {
  const r = 15;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#f97316";
  return (
    <svg width="44" height="44" viewBox="0 0 36 36" className="-rotate-90 shrink-0">
      <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/20" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={`${(score / 100) * circ} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="18" y="18" textAnchor="middle" dominantBaseline="middle"
        style={{ rotate: "90deg", transformOrigin: "18px 18px", fill: color, fontSize: 8, fontWeight: 700, fontFamily: "system-ui" }}>
        {score}
      </text>
    </svg>
  );
}

// ─── Theme picker ─────────────────────────────────────────────────────────────

const QUICK_THEMES: Array<{ accent: ThemeAccent; label: string; bg: string; ring: string }> = [
  { accent: "noir",  label: "Noir & Or",  bg: "#1c1c1c", ring: "#c9a430" },
  { accent: "navy",  label: "Marine",     bg: "#0d1929", ring: "#4a7fd4" },
  { accent: "cream", label: "Crème",      bg: "#f5eedf", ring: "#b07040" },
  { accent: "mint",  label: "Menthe",     bg: "#edf8f3", ring: "#3a9e78" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function BuilderIAResultatPage() {
  const { user, loading } = useAuthStore();
  const { data, setData, hydrated } = useCardStore();
  const navigate = useNavigate();

  const phoneRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const getScroller = () =>
      phoneRef.current?.querySelector(".overflow-y-auto") as HTMLElement | null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scroller = getScroller();
      if (scroller) scroller.scrollTop += e.deltaY;
    };
    const handleClick = (e: MouseEvent) => e.stopPropagation();

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const scroller = getScroller();
      if (!scroller) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      scroller.scrollTop += deltaY;
    };

    overlay.addEventListener("wheel", handleWheel, { passive: false });
    overlay.addEventListener("click", handleClick, true);
    overlay.addEventListener("touchstart", handleTouchStart, { passive: false });
    overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      overlay.removeEventListener("click", handleClick, true);
      overlay.removeEventListener("touchstart", handleTouchStart);
      overlay.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const [revealed, setRevealed] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<ThemeAccent>("gold");
  const [shareUrl, setShareUrl] = useState("");
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [loading, user]);

  useEffect(() => {
    if (!hydrated) return;
    const fresh = sessionStorage.getItem("cyk.builderia.generated");
    if (!fresh || !data?.bio) {
      navigate({ to: "/builderia", replace: true });
      return;
    }
    sessionStorage.removeItem("cyk.builderia.generated");
    setSelectedAccent(data.accent ?? "gold");
    const t = setTimeout(() => setRevealed(true), 40);
    if (user) {
      supabase.rpc("track_builderia_step", { p_user_id: user.id, p_step: 2, p_step_name: "builderia-resultat" }).then(() => {});
    }
    return () => clearTimeout(t);
  }, [hydrated]);

  const generatedCard = data as CardData;

  const fullCard: CardData = {
    ...generatedCard,
    accent: selectedAccent,
    statsEnabled: true,
    servicesEnabled: !!(generatedCard?.services?.length),
    testimonialsEnabled: !!(generatedCard?.testimonials?.length),
    ctaEnabled: true,
    calendarEnabled: true,
    aboutEnabled: true,
    galleryEnabled: false,
    listingsEnabled: false,
  };

  const { score, tips } = useMemo(
    () => (generatedCard?.bio ? calcScore(generatedCard) : { score: 0, tips: [] }),
    [generatedCard]
  );

  const vitrineFeatures: string[] = [
    fullCard.servicesEnabled && "Vos offres présentées en détail",
    fullCard.testimonialsEnabled && "Avis clients qui rassurent et convertissent",
    "Vos chiffres clés qui inspirent confiance",
    "Carte sans publicité Carte Visite Digitale",
  ].filter(Boolean) as string[];

  async function handleActivateVitrine() {
    if (!generatedCard || !user) return;
    setActivating(true);
    setError("");
    try {
      const cardWithTheme: CardData = { ...generatedCard, accent: selectedAccent };
      const existing = await loadMyCard();
      if (!existing) {
        await createCard(cardWithTheme);
      } else {
        await updateCard(existing.id, cardWithTheme);
      }
      setData(cardWithTheme);
      await supabase.rpc("track_builderia_step", { p_user_id: user.id, p_step: 3, p_step_name: "stripe-checkout" });
      const { url } = await createCheckoutSession({
        data: { plan: "vitrine", billing: "monthly", email: user.email! },
      });
      if (url) window.location.href = url;
    } catch {
      setError("Une erreur est survenue. Réessaie.");
      setActivating(false);
    }
  }

  async function handleShare() {
    if (!generatedCard || sharing) return;
    setSharing(true);
    try {
      const cardWithTheme = { ...generatedCard, accent: selectedAccent };
      const { token } = await saveCardPreview({ data: { cardData: cardWithTheme as unknown as Record<string, unknown> } });
      const url = `${window.location.origin}/preview/${token}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url).catch(() => {});
    } catch {
      // silently fail
    } finally {
      setSharing(false);
    }
  }

  async function handleCopy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || !hydrated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">Carte Visite Digitale</span>
        </div>
        <span className="text-xs text-muted-foreground">Ta carte est prête ✨</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* ── Gauche : phone ── */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-primary">Aperçu Vitrine complet</p>

          <div className="flex items-center gap-3">
            {QUICK_THEMES.map((t) => {
              const isSelected = selectedAccent === t.accent;
              return (
                <button
                  key={t.accent}
                  title={t.label}
                  onClick={() => setSelectedAccent(t.accent)}
                  style={{
                    backgroundColor: t.bg,
                    boxShadow: isSelected ? `0 0 0 2px ${t.ring}, 0 0 0 4px white` : "none",
                    border: `2px solid ${isSelected ? t.ring : "transparent"}`,
                    outline: isSelected ? `2px solid ${t.ring}` : "none",
                    outlineOffset: "2px",
                  }}
                  className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none"
                  aria-label={t.label}
                />
              );
            })}
            <span className="text-[11px] text-muted-foreground ml-1">Changer de thème</span>
          </div>

          <div style={{
            perspective: "900px",
            transform: revealed ? "rotateY(0deg)" : "rotateY(-90deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <div ref={phoneRef} className="relative">
              <PhoneFrame>
                <BusinessCard data={fullCard} />
              </PhoneFrame>
              {/* Overlay : scroll autorisé, clics bloqués */}
              <div ref={overlayRef} className="absolute inset-0 z-10 cursor-default rounded-[44px]" />
            </div>
          </div>

          {/* Partage */}
          <div className="w-full max-w-[280px]">
            {shareUrl ? (
              <div className="flex gap-2">
                <div className="flex-1 rounded-xl border border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground truncate">
                  {shareUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-muted/50 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <button
                onClick={handleShare}
                disabled={sharing}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition disabled:opacity-50"
              >
                {sharing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Share2 className="w-3.5 h-3.5" />}
                Partager l'aperçu — lien 24h
              </button>
            )}
          </div>
        </div>

        {/* ── Droite : CTA ── */}
        <div className="space-y-4 lg:pt-4">

          <div>
            <h1 className="font-bold text-2xl text-foreground mb-1">
              Votre carte est prête à être partagée
            </h1>
            <p className="text-muted-foreground text-sm">
              Un lien professionnel que vos clients ouvrent depuis WhatsApp, Instagram ou votre email.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { icon: "✏️", title: "Modifiez votre carte quand vous voulez", desc: "Dashboard complet · Sections · Liens · Contenu · Thème — en illimité" },
              { icon: "🔗", title: "Un lien à partager partout", desc: "WhatsApp · Instagram · Email · QR code" },
              { icon: "📅", title: "Vos clients réservent directement", desc: "Calendly intégré · Zéro appel manqué" },
              { icon: "📊", title: "Voyez qui a vu votre carte", desc: "Analytics · Visites · Clics en temps réel" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 rounded-xl bg-card border border-border px-4 py-3">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {score > 0 && (() => {
            const scoreColor = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#f97316";
            const scoreLabel = score >= 80 ? "Excellent niveau de conversion" : score >= 60 ? "Bon niveau — encore perfectible" : "À optimiser";
            return (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <ScoreRing score={score} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">Score de conversion</p>
                  <p className="text-[11px] font-medium" style={{ color: scoreColor }}>{scoreLabel}</p>
                  {tips[0] && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{tips[0].label} → <span className="text-emerald-500">{tips[0].impact}</span></p>
                  )}
                </div>
              </div>
            );
          })()}

          {vitrineFeatures.length > 0 && (
            <div className="rounded-2xl border border-[#c026d3]/30 bg-[#c026d3]/[0.04] px-5 py-4 space-y-2">
              <p className="text-xs font-semibold text-[#c026d3] uppercase tracking-wide">
                Aussi inclus dans votre carte
              </p>
              {vitrineFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="text-[#c026d3] font-bold text-base leading-none shrink-0">✦</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handleActivateVitrine}
              disabled={activating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white font-bold py-4 text-base hover:opacity-90 transition shadow-lg shadow-[#c026d3]/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {activating
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Publication en cours…</>
                : <><Rocket className="w-4 h-4" /> Je publie ma carte — 3 jours gratuits</>
              }
            </button>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3 space-y-1">
              <p className="text-sm font-semibold text-emerald-400">Sans carte bleue · Sans engagement</p>
              <p className="text-xs text-foreground/80 font-medium">→ Votre carte est publiée et partageable immédiatement</p>
              <p className="text-xs text-muted-foreground">Puis 4,80€/mois · Résiliable à tout moment</p>
            </div>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={() => navigate({ to: "/builderia" })}
              className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition py-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Refaire le prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
