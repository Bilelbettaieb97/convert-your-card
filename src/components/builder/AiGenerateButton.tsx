import { useState, useEffect, useRef } from "react";
import { Sparkles, X, Loader2, Wand2 } from "lucide-react";
import { generateCard, type GeneratedCard } from "@/fns/generate-card";
import { DEFAULT_CARD, type CardData } from "@/lib/card-types";

type Props = {
  setData: (data: CardData) => void;
  currentData: CardData;
  onApplied?: () => void;
};

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

type Phase = "idle" | "form" | "building" | "done";

export function AiGenerateButton({ setData, currentData, onApplied }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [buildStep, setBuildStep] = useState(0);
  const [result, setResult] = useState<GeneratedCard | null>(null);
  const [animDone, setAnimDone] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<GeneratedCard | null>(null);

  // Ouverture modale
  function openForm() {
    setPhase("form");
    setTimeout(() => textareaRef.current?.focus(), 300);
  }

  function closeForm() {
    setPhase("idle");
    setInput("");
    setError("");
  }

  // Lancement génération
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setPhase("building");
    setBuildStep(0);
    setAnimDone(false);
    setResult(null);
    resultRef.current = null;

    // Appel IA en parallèle de l'animation
    generateCard({ data: { input: input.trim() } })
      .then((res) => {
        resultRef.current = res;
        setResult(res);
        tryFinish();
      })
      .catch(() => {
        setPhase("form");
        setError("Une erreur est survenue, réessaie.");
      });
  }

  // Animation brique par brique
  useEffect(() => {
    if (phase !== "building") return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setBuildStep(current);
      if (current >= BRICKS.length) {
        clearInterval(timer);
        setAnimDone(true);
      }
    }, 340);
    return () => clearInterval(timer);
  }, [phase]);

  // Terminer quand les deux sont prêts (IA + animation)
  function tryFinish() {
    if (resultRef.current && animDone) finish();
  }

  useEffect(() => {
    if (animDone && result) finish();
  }, [animDone, result]);

  function finish() {
    if (!resultRef.current) return;
    setData({ ...DEFAULT_CARD, ...currentData, ...resultRef.current });
    setPhase("done");
    setTimeout(() => {
      setPhase("idle");
      setInput("");
      onApplied?.();
    }, 800);
  }

  const currentBrickLabel = buildStep > 0 && buildStep <= BRICKS.length
    ? BRICKS[buildStep - 1].label
    : "Initialisation…";

  return (
    <>
      {/* Bouton discret */}
      <button
        type="button"
        onClick={openForm}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-full bg-background border border-border text-muted-foreground text-xs font-medium px-3 py-2 shadow-md hover:text-foreground hover:border-foreground/30 transition-all"
        aria-label="Générer avec l'IA"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>IA</span>
      </button>

      {/* Modal saisie */}
      {phase === "form" && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={closeForm} />
          <div className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full animate-slide-up">
            <div className="bg-background border border-border shadow-2xl rounded-t-3xl sm:rounded-2xl px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-md">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Générer avec l'IA</p>
                    <p className="text-xs text-muted-foreground">Décris ton activité — ta carte complète en 10 secondes</p>
                  </div>
                </div>
                <button type="button" onClick={closeForm} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ex: Je suis agent immobilier à Lyon, spécialisé dans les biens de prestige…"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition resize-none"
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
                <div className="space-y-1.5">
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-full rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Générer ma carte complète
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Thème, sections, contenu — tout généré automatiquement ✨
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Plein écran — construction brique par brique */}
      {(phase === "building" || phase === "done") && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018]">
          {/* Titre */}
          <div className="mb-8 text-center px-4">
            <p className="text-white/50 text-sm uppercase tracking-widest mb-2">IA en cours</p>
            <h2 className="text-white text-2xl font-bold">
              {phase === "done" ? "Carte prête ✨" : "Construction de ta carte…"}
            </h2>
          </div>

          {/* Phone mockup */}
          <div className="relative w-[220px] h-[420px] rounded-[2.5rem] border-2 border-white/15 bg-white/[0.04] shadow-[0_0_80px_rgba(192,38,211,0.3)] overflow-hidden">
            {/* Barre statut */}
            <div className="h-7 flex items-center justify-center border-b border-white/10">
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Bricks */}
            <div className="p-2.5 space-y-2 overflow-hidden">
              {BRICKS.map((brick, i) => {
                const visible = i < buildStep;
                const isLast = i === buildStep - 1;
                return (
                  <div
                    key={brick.label}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-16px)",
                      transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
                      boxShadow: isLast ? "0 0 12px rgba(192,38,211,0.5)" : "none",
                    }}
                    className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/10"
                  >
                    <span className="text-base leading-none">{brick.icon}</span>
                    <span className="text-white/80 text-xs font-medium">{brick.label}</span>
                    {isLast && phase === "building" && (
                      <Loader2 className="w-3 h-3 text-[#c026d3] animate-spin ml-auto" />
                    )}
                    {visible && !isLast && (
                      <span className="ml-auto text-emerald-400 text-xs">✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Glow en bas */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#c026d3]/20 to-transparent pointer-events-none" />
          </div>

          {/* Label brique courante */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">En cours</p>
            <p className="text-white/80 text-sm font-medium min-h-[1.25rem] transition-all duration-300">
              {phase === "done" ? "Finalisation…" : currentBrickLabel}
            </p>
          </div>

          {/* Barre de progression */}
          <div className="mt-5 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(buildStep / BRICKS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out both; }
      `}</style>
    </>
  );
}
