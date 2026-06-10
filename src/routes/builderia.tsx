import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Loader2, ArrowRight, CheckCircle2, Lock, Rocket, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { generateCard } from "@/fns/generate-card";
import { DEFAULT_CARD, type CardData } from "@/lib/card-types";

export const Route = createFileRoute("/builderia")({
  head: () => ({
    meta: [
      { title: "Créer ma carte avec l'IA — Carte Visite Digitale" },
      { name: "description", content: "Décris ton activité en une phrase, l'IA génère ta carte de visite digitale complète en 10 secondes." },
    ],
  }),
  component: BuilderIAPage,
});

// ─── Animation bricks ────────────────────────────────────────────────────────

const BRICKS = [
  { icon: "🪪", label: "Identité & photo" },
  { icon: "⚡", label: "Boutons d'action" },
  { icon: "📊", label: "Statistiques clés" },
  { icon: "💼", label: "Services & prestations" },
  { icon: "⭐", label: "Avis clients" },
  { icon: "📅", label: "Prise de rendez-vous" },
  { icon: "🖼", label: "Galerie de réalisations" },
  { icon: "🎯", label: "Appel à l'action" },
];

// ─── Sections vitrine (clés dans CardData) ───────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────────────────────

function BuilderIAPage() {
  const { user, loading } = useAuthStore();
  const { setData, hydrated } = useCardStore();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("prompt");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [buildStep, setBuildStep] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<CardData | null>(null);
  const resultReady = useRef(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [loading, user]);

  // Nom depuis Google auth
  const userName: string =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";

  const firstName = userName.split(" ")[0] || "toi";

  // ── Lancement génération ──
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setPhase("building");
    setBuildStep(0);
    setAnimDone(false);
    resultReady.current = false;

    // Appel IA en parallèle de l'animation
    generateCard({
      data: {
        input: input.trim(),
        name: userName || undefined,
        email: user?.email || undefined,
      },
    })
      .then((res) => {
        const merged: CardData = {
          ...DEFAULT_CARD,
          ...res,
          name: userName || DEFAULT_CARD.name,
          photo: user?.user_metadata?.avatar_url || DEFAULT_CARD.photo,
          email: user?.email || DEFAULT_CARD.email,
        };
        setGeneratedCard(merged);
        resultReady.current = true;
        tryFinish(true);
      })
      .catch(() => {
        setPhase("prompt");
        setError("Une erreur est survenue, réessaie.");
      });
  }

  // ── Animation brique par brique ──
  useEffect(() => {
    if (phase !== "building") return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setBuildStep(current);
      if (current >= BRICKS.length) {
        clearInterval(timer);
        setAnimDone(true);
        tryFinish(false);
      }
    }, 350);
    return () => clearInterval(timer);
  }, [phase]);

  function tryFinish(fromResult: boolean) {
    const readyNow = fromResult ? animDone : resultReady.current;
    if (readyNow) {
      setTimeout(() => setPhase("preview"), 600);
    }
  }

  // ── Actions depuis l'aperçu ──
  function handleActivateVitrine() {
    if (!generatedCard) return;
    setData(generatedCard);
    navigate({ to: "/pricing" });
  }

  function handleContinueFree() {
    if (!generatedCard) return;
    // Supprimer les sections vitrine
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

  const currentBrickLabel =
    buildStep > 0 && buildStep <= BRICKS.length
      ? BRICKS[buildStep - 1].label
      : "Initialisation…";

  const enabledVitrineSections = VITRINE_SECTIONS.filter(
    (s) => generatedCard?.[s.key]
  );

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
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c026d3]/30 bg-[#c026d3]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#c026d3]" />
          <span className="text-xs font-medium text-[#c026d3]">Génération IA</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center mb-3 leading-tight">
          {firstName ? `${firstName}, décris` : "Décris"}{" "}
          <span className="bg-gradient-to-r from-[#c026d3] to-[#7c3aed] bg-clip-text text-transparent">
            ton activité
          </span>
        </h1>
        <p className="text-white/50 text-center mb-10 max-w-md text-sm sm:text-base">
          L'IA génère ta carte de visite digitale complète en 10 secondes — thème, sections, contenu.
        </p>

        {/* Input */}
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

        {/* Exemples */}
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
  // PHASE 2 — Animation construction
  // ════════════════════════════════════════════════════════
  if (phase === "building") {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018]">
        <div className="mb-8 text-center px-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">IA au travail</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold">
            Construction de ta carte…
          </h2>
        </div>

        {/* Phone */}
        <div className="relative w-[220px] h-[420px] rounded-[2.5rem] border-2 border-white/15 bg-white/[0.03] shadow-[0_0_80px_rgba(192,38,211,0.25)] overflow-hidden">
          <div className="h-7 flex items-center justify-center border-b border-white/10">
            <div className="w-16 h-1.5 bg-white/20 rounded-full" />
          </div>
          <div className="p-2.5 space-y-2 overflow-hidden">
            {BRICKS.map((brick, i) => {
              const visible = i < buildStep;
              const isActive = i === buildStep - 1;
              return (
                <div
                  key={brick.label}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-18px)",
                    transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
                    boxShadow: isActive ? "0 0 14px rgba(192,38,211,0.45)" : "none",
                  }}
                  className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/10"
                >
                  <span className="text-base leading-none">{brick.icon}</span>
                  <span className="text-white/80 text-xs font-medium">{brick.label}</span>
                  {isActive && (
                    <Loader2 className="w-3 h-3 text-[#c026d3] animate-spin ml-auto" />
                  )}
                  {visible && !isActive && (
                    <span className="ml-auto text-emerald-400 text-[10px]">✓</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#c026d3]/15 to-transparent pointer-events-none" />
        </div>

        {/* Label + progress */}
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

          {/* ── Gauche : aperçu ── */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-primary mb-4">Aperçu de ta carte</p>
            <PhoneFrame>
              <BusinessCard data={generatedCard} />
            </PhoneFrame>
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
