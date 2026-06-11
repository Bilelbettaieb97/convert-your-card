import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Sparkles, Loader2, ArrowRight, CheckCircle2, Lock, Rocket,
  ChevronRight, Share2, Copy, Check, TrendingUp,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { saveCardPreview } from "@/fns/save-card-preview";
import { DEFAULT_CARD, type CardData, type BrickId, type ThemeAccent } from "@/lib/card-types";

export const Route = createFileRoute("/builderia")({
  head: () => ({
    meta: [
      { title: "Créer ma carte avec l'IA — Carte Visite Digitale" },
      { name: "description", content: "Décris ton activité, l'IA génère ta carte de visite digitale complète en temps réel." },
    ],
  }),
  component: BuilderIAPage,
});

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_ORDER: BrickId[] = [
  "identity", "actions", "socials", "about", "vcard",
  "calendar", "services", "testimonials", "cta",
  "stats", "contact", "gallery", "listings", "video", "languages", "theme",
];

const BRICKS = [
  { icon: "🪪", label: "Identité & photo" },
  { icon: "⚡", label: "Boutons d'action" },
  { icon: "📊", label: "Statistiques clés" },
  { icon: "💼", label: "Services & prestations" },
  { icon: "⭐", label: "Avis clients" },
  { icon: "📅", label: "Prise de rendez-vous" },
  { icon: "🖼", label: "Photo de couverture" },
  { icon: "🎯", label: "Appel à l'action" },
];

const VITRINE_SECTIONS = [
  { key: "statsEnabled" as const, label: "Statistiques clés", icon: "📊" },
  { key: "servicesEnabled" as const, label: "Services & prestations", icon: "💼" },
  { key: "testimonialsEnabled" as const, label: "Témoignages clients", icon: "⭐" },
  { key: "calendarEnabled" as const, label: "Prise de rendez-vous", icon: "📅" },
  { key: "galleryEnabled" as const, label: "Galerie de réalisations", icon: "🖼" },
  { key: "listingsEnabled" as const, label: "Portefeuille immobilier", icon: "🏠" },
  { key: "ctaEnabled" as const, label: "Appel à l'action fort", icon: "🎯" },
  { key: "videoEnabled" as const, label: "Vidéo de présentation", icon: "🎥" },
];

const FREE_SECTIONS = [
  { label: "Identité & photo de profil", icon: "🪪" },
  { label: "Boutons d'action (appel, email…)", icon: "⚡" },
  { label: "Bio & présentation", icon: "👤" },
  { label: "Réseaux sociaux", icon: "🔗" },
  { label: "Export contact (vCard)", icon: "📇" },
];

type Phase = "prompt" | "building" | "preview";

// ─── Score ───────────────────────────────────────────────────────────────────

function calcScore(card: CardData): { score: number; tips: Array<{ label: string; impact: string }> } {
  let score = 35;
  const tips: Array<{ label: string; impact: string }> = [];

  if (card.photo && card.photo.startsWith("http")) score += 15;
  else tips.push({ label: "Ajoutez une photo professionnelle", impact: "+23% de contacts" });

  if (card.calendarEnabled && card.calendarUrl) score += 12;
  else tips.push({ label: "Connectez votre agenda Calendly", impact: "+31% de RDV" });

  if ((card.testimonials?.length ?? 0) >= 3) score += 12;

  if (card.ctaEnabled && card.ctaTitle) score += 8;

  if (card.coverPhoto) score += 8;
  else tips.push({ label: "Ajoutez une photo de couverture", impact: "+12% d'engagement" });

  const actionsCount = Object.values(card.actions ?? {}).filter(Boolean).length;
  score += Math.min(actionsCount * 3, 10);

  return { score: Math.min(score, 100), tips: tips.slice(0, 3) };
}

// ─── Apply SSE field ──────────────────────────────────────────────────────────

function applyField(card: Partial<CardData>, f: string, v: unknown) {
  switch (f) {
    case "title":         card.title = v as string; break;
    case "accent":        card.accent = v as ThemeAccent; break;
    case "bio":           card.bio = v as string; break;
    case "badges":        card.badges = v as CardData["badges"]; break;
    case "stats":         card.stats = v as CardData["stats"]; break;
    case "services":      card.services = v as CardData["services"]; break;
    case "testimonials":  card.testimonials = v as CardData["testimonials"]; break;
    case "ctaTitle":      card.ctaTitle = v as string; break;
    case "ctaText":       card.ctaText = v as string; break;
    case "ctaButtonLabel":card.ctaButtonLabel = v as string; break;
    case "calendarLabel": card.calendarLabel = v as string; break;
    case "actions":       card.actions = v as CardData["actions"]; break;
    case "coverPhoto":    card.coverPhoto = v as string; break;
  }
}

// ─── Score circle SVG ────────────────────────────────────────────────────────

function ScoreCircle({ score }: { score: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#f97316";

  return (
    <svg width="120" height="120" className="rotate-[-90deg]">
      <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
      <circle
        cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="60" y="60" textAnchor="middle" dominantBaseline="middle"
        style={{ rotate: "90deg", transformOrigin: "60px 60px", fill: color, fontSize: 24, fontWeight: 700, fontFamily: "system-ui" }}>
        {score}
      </text>
      <text x="60" y="78" textAnchor="middle" dominantBaseline="middle"
        style={{ rotate: "90deg", transformOrigin: "60px 60px", fill: "#888", fontSize: 10, fontFamily: "system-ui" }}>
        /100
      </text>
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function BuilderIAPage() {
  const { user, loading } = useAuthStore();
  const { setData, hydrated } = useCardStore();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("prompt");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [buildStep, setBuildStep] = useState(0);
  const [generatedCard, setGeneratedCard] = useState<CardData | null>(null);
  const [liveCard, setLiveCard] = useState<Partial<CardData>>({});
  const [isFlipping, setIsFlipping] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const animDoneRef = useRef(false);
  const resultReady = useRef(false);
  const partialRef = useRef<Partial<CardData>>({});

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [loading, user]);

  const userName: string =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";
  const firstName = userName.split(" ")[0] || "toi";

  // ── Flip → preview ──
  function triggerFlip() {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      setPhase("preview");
    }, 450);
  }

  // ── Lancement génération streaming ──
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setPhase("building");
    setBuildStep(0);
    setLiveCard({});
    partialRef.current = {};
    animDoneRef.current = false;
    resultReady.current = false;
    setError("");

    try {
      const response = await fetch("/api/generate-card-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          name: userName || undefined,
          email: user?.email || undefined,
        }),
      });

      if (!response.ok || !response.body) throw new Error("Stream failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data) as { f: string; v: unknown };
            if (evt.f && evt.v !== undefined) {
              applyField(partialRef.current, evt.f, evt.v);
              setLiveCard({ ...partialRef.current });
            }
          } catch {}
        }
      }

      // Build final merged card
      const merged: CardData = {
        ...DEFAULT_CARD,
        ...partialRef.current,
        name: userName || DEFAULT_CARD.name,
        photo: user?.user_metadata?.avatar_url || DEFAULT_CARD.photo,
        email: user?.email || DEFAULT_CARD.email,
        agency: "",
        phone: "",
        website: "",
        statsEnabled: true,
        servicesEnabled: true,
        testimonialsEnabled: true,
        ctaEnabled: true,
        aboutEnabled: true,
        calendarEnabled: true,
        galleryEnabled: false,
        listingsEnabled: false,
        sectionOrder: [...BASE_ORDER],
      };

      setGeneratedCard(merged);
      resultReady.current = true;
      if (animDoneRef.current) triggerFlip();

    } catch {
      setPhase("prompt");
      setError("Une erreur est survenue, réessaie.");
    }
  }

  // ── Animation brique ──
  useEffect(() => {
    if (phase !== "building") return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setBuildStep(current);
      if (current >= BRICKS.length) {
        clearInterval(timer);
        animDoneRef.current = true;
        if (resultReady.current) triggerFlip();
      }
    }, 380);
    return () => clearInterval(timer);
  }, [phase]);

  // ── Actions depuis l'aperçu ──
  function handleActivateVitrine() {
    if (!generatedCard) return;
    setData(generatedCard);
    navigate({ to: "/pricing" });
  }

  function handleContinueFree() {
    if (!generatedCard) return;
    const freeCard: CardData = {
      ...generatedCard,
      statsEnabled: false,
      servicesEnabled: false,
      testimonialsEnabled: false,
      calendarEnabled: false,
      galleryEnabled: false,
      listingsEnabled: false,
      ctaEnabled: false,
      videoEnabled: false,
      languagesEnabled: false,
    };
    setData(freeCard);
    navigate({ to: "/builder" });
  }

  async function handleShare() {
    if (!generatedCard || sharing) return;
    setSharing(true);
    try {
      const { token } = await saveCardPreview({ data: { cardData: generatedCard as unknown as Record<string, unknown> } });
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

  const { score, tips } = useMemo(
    () => (generatedCard ? calcScore(generatedCard) : { score: 0, tips: [] }),
    [generatedCard]
  );

  const currentBrickLabel =
    buildStep > 0 && buildStep <= BRICKS.length
      ? BRICKS[buildStep - 1].label
      : "Initialisation…";

  const enabledVitrineSections = VITRINE_SECTIONS.filter((s) => generatedCard?.[s.key]);

  if (loading || !user || !hydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // ════════════════════════════════════════════════════════
  // PHASE 1 — Prompt
  // ════════════════════════════════════════════════════════
  if (phase === "prompt") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018] flex flex-col items-center justify-center px-4 py-16">
        <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c026d3]/30 bg-[#c026d3]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#c026d3]" />
          <span className="text-xs font-medium text-[#c026d3]">Génération IA · Streaming temps réel</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center mb-3 leading-tight">
          {firstName ? `${firstName}, décris` : "Décris"}{" "}
          <span className="bg-gradient-to-r from-[#c026d3] to-[#7c3aed] bg-clip-text text-transparent">
            ton activité
          </span>
        </h1>
        <p className="text-white/50 text-center mb-10 max-w-md text-sm sm:text-base">
          L'IA génère ta carte de visite digitale complète en temps réel — thème, contenu, photo de couverture.
        </p>

        <form onSubmit={handleGenerate} className="w-full max-w-2xl">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex : Je suis agent immobilier à Lyon, spécialisé dans les biens de prestige…"
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(e as any); }
              }}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 pr-16 text-white placeholder:text-white/30 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#c026d3]/50 focus:border-[#c026d3]/50 transition resize-none backdrop-blur"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] flex items-center justify-center hover:opacity-90 transition disabled:opacity-30"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          <p className="text-center text-white/25 text-xs mt-3">
            Entrée pour générer · Shift+Entrée pour aller à la ligne
          </p>
        </form>

        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xl">
          {[
            "Plombier à Paris, dépannage 24h/24",
            "Coach bien-être & développement personnel",
            "Agent immobilier spécialisé luxe",
            "Photographe portrait & mariage",
            "Restaurateur cuisine du marché",
          ].map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setInput(ex)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════
  // PHASE 2 — Construction + streaming live
  // ════════════════════════════════════════════════════════
  if (phase === "building") {
    const phoneStyle: React.CSSProperties = {
      transform: isFlipping ? "perspective(900px) rotateY(90deg)" : "perspective(900px) rotateY(0deg)",
      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.6, 1)",
    };

    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018]">
        <div className="mb-8 text-center px-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">IA au travail</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold">
            Construction de ta carte…
          </h2>
        </div>

        {/* Phone with live streaming content */}
        <div style={phoneStyle}>
          <div className="relative w-[220px] h-[420px] rounded-[2.5rem] border-2 border-white/15 bg-white/[0.03] shadow-[0_0_80px_rgba(192,38,211,0.25)] overflow-hidden">
            {/* Notch */}
            <div className="h-7 flex items-center justify-center border-b border-white/10 shrink-0">
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Cover photo */}
            {liveCard.coverPhoto ? (
              <div className="h-16 overflow-hidden shrink-0">
                <img
                  src={liveCard.coverPhoto}
                  alt="cover"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
            ) : (
              <div className="h-14 bg-gradient-to-r from-[#c026d3]/20 to-[#7c3aed]/20 shrink-0 flex items-center justify-center">
                <div className="w-32 h-2 bg-white/10 rounded-full animate-pulse" />
              </div>
            )}

            {/* Profile */}
            <div className="px-3 pt-2 pb-1 flex items-center gap-2 shrink-0">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="profil"
                  className="w-9 h-9 rounded-full border-2 border-white/20 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c026d3] to-[#7c3aed] shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-white text-[11px] font-bold truncate">{userName || "Votre nom"}</p>
                {liveCard.title ? (
                  <p className="text-white/60 text-[9px] truncate">{liveCard.title}</p>
                ) : (
                  <div className="w-24 h-1.5 bg-white/15 rounded-full animate-pulse mt-0.5" />
                )}
              </div>
            </div>

            {/* Bio streaming */}
            <div className="px-3 py-1.5 shrink-0">
              {liveCard.bio ? (
                <p className="text-white/60 text-[8.5px] leading-relaxed line-clamp-3">
                  {liveCard.bio}
                </p>
              ) : (
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-white/10 rounded-full animate-pulse" />
                  <div className="w-4/5 h-1.5 bg-white/10 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Live section checkmarks */}
            <div className="px-3 py-1 space-y-1 overflow-hidden">
              {[
                { field: "stats", icon: "📊", label: `${liveCard.stats?.length ?? 0} statistiques` },
                { field: "services", icon: "💼", label: `${liveCard.services?.length ?? 0} services` },
                { field: "testimonials", icon: "⭐", label: `${liveCard.testimonials?.length ?? 0} avis` },
                { field: "ctaTitle", icon: "🎯", label: "Offre irrésistible" },
                { field: "coverPhoto", icon: "🖼", label: "Photo de couverture" },
              ].map(({ field, icon, label }) => {
                const has = field === "stats" ? (liveCard.stats?.length ?? 0) > 0
                  : field === "services" ? (liveCard.services?.length ?? 0) > 0
                  : field === "testimonials" ? (liveCard.testimonials?.length ?? 0) > 0
                  : field === "ctaTitle" ? !!liveCard.ctaTitle
                  : !!liveCard.coverPhoto;
                return (
                  <div
                    key={field}
                    style={{
                      opacity: has ? 1 : 0.3,
                      transform: has ? "translateX(0)" : "translateX(-8px)",
                      transition: "opacity 0.3s, transform 0.3s",
                    }}
                    className="flex items-center gap-1.5 text-[9px]"
                  >
                    <span>{icon}</span>
                    <span className={has ? "text-emerald-400" : "text-white/30"}>{label}</span>
                    {has && <span className="text-emerald-400 ml-auto">✓</span>}
                  </div>
                );
              })}
            </div>

            {/* Glow bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#c026d3]/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Progress label */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm font-medium transition-all duration-300 min-h-[1.25rem]">
            {currentBrickLabel}
          </p>
        </div>
        <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(buildStep / BRICKS.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════
  // PHASE 3 — Aperçu & choix du plan
  // ════════════════════════════════════════════════════════
  if (phase === "preview" && generatedCard) {
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

          {/* ── Gauche : aperçu + score + partage ── */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-primary">Aperçu de ta carte</p>

            {/* Phone avec flip reveal */}
            <div style={{
              perspective: "900px",
              transform: isFlipping ? "rotateY(-90deg)" : "rotateY(0deg)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.6, 1)",
            }}>
              <PhoneFrame>
                <BusinessCard data={generatedCard} />
              </PhoneFrame>
            </div>

            {/* Score de conversion */}
            <div className="w-full rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Score de conversion</p>
              </div>
              <div className="flex items-center gap-5">
                <ScoreCircle score={score} />
                <div className="flex-1 space-y-2">
                  {tips.length === 0 ? (
                    <p className="text-xs text-emerald-500 font-medium">
                      Excellent ! Carte très bien optimisée.
                    </p>
                  ) : (
                    tips.map((tip) => (
                      <div key={tip.label} className="flex flex-col gap-0.5">
                        <p className="text-xs text-foreground">{tip.label}</p>
                        <p className="text-[10px] text-emerald-500 font-medium">{tip.impact}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Partage */}
            <div className="w-full rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Partager l'aperçu</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Génère un lien valable 24h pour recueillir les avis de tes proches.
              </p>
              {shareUrl ? (
                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground truncate">
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition disabled:opacity-50"
                >
                  {sharing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  Générer un lien de partage
                </button>
              )}
            </div>
          </div>

          {/* ── Droite : plan & CTA ── */}
          <div className="space-y-5 lg:pt-8">
            <div>
              <h1 className="font-bold text-2xl text-foreground mb-1">
                {generatedCard.title || "Ta carte est prête"}
              </h1>
              <p className="text-muted-foreground text-sm">
                L'IA a configuré {enabledVitrineSections.length + FREE_SECTIONS.length} sections pour ton métier.
              </p>
            </div>

            {/* Sections gratuites */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                ✅ Inclus dans le plan gratuit
              </p>
              {FREE_SECTIONS.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Sections vitrine générées */}
            {enabledVitrineSections.length > 0 && (
              <div className="rounded-2xl border border-[#c026d3]/30 bg-[#c026d3]/[0.04] p-4 space-y-2">
                <p className="text-xs font-semibold text-[#c026d3] uppercase tracking-wide mb-3">
                  🔒 Sections Vitrine générées ({enabledVitrineSections.length})
                </p>
                {enabledVitrineSections.map((s) => (
                  <div key={s.key} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Lock className="w-4 h-4 text-[#c026d3] shrink-0" />
                    <span>{s.label}</span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">
                  Ces sections sont visibles dans l'aperçu mais nécessitent le plan Vitrine pour être publiées.
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleActivateVitrine}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white font-semibold py-4 text-sm hover:opacity-90 transition shadow-lg"
              >
                <Rocket className="w-4 h-4" />
                Activer avec toutes les sections — 7 jours gratuits
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Puis 4,80€/mois · Sans engagement · Annulable en 1 clic
              </p>

              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                type="button"
                onClick={handleContinueFree}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition"
              >
                Continuer avec le plan gratuit
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Les sections Vitrine seront supprimées de ta carte
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
