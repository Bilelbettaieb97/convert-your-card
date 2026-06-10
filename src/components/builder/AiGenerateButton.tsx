import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Loader2, CheckCircle2, Wand2, ChevronRight } from "lucide-react";
import { generateCard, type GeneratedCard } from "@/fns/generate-card";
import { DEFAULT_CARD, type CardData } from "@/lib/card-types";

type Props = {
  setData: (data: CardData) => void;
  currentData: CardData;
  onApplied?: () => void;
};

const ACTION_LABELS: Record<string, string> = {
  call: "📞 Appel",
  whatsapp: "💬 WhatsApp",
  email: "✉️ Email",
  website: "🌐 Site web",
};

export function AiGenerateButton({ setData, currentData, onApplied }: Props) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedCard | null>(null);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function openModal() {
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }

  function closeModal() {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setResult(null);
      setError("");
      setApplied(false);
    }, 350);
  }

  useEffect(() => {
    if (open && !result) setTimeout(() => textareaRef.current?.focus(), 400);
  }, [open, result]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await generateCard({ data: { input: input.trim() } });
      setResult(res);
    } catch {
      setError("Une erreur est survenue, réessaie.");
    } finally {
      setLoading(false);
    }
  }

  function handleApply() {
    if (!result) return;
    setData({
      ...DEFAULT_CARD,
      ...currentData,
      ...result,
    });
    setApplied(true);
    setTimeout(() => {
      closeModal();
      onApplied?.();
    }, 1000);
  }

  const activeActions = result?.actions
    ? Object.entries(result.actions).filter(([, v]) => v).map(([k]) => k)
    : [];

  return (
    <>
      {/* Floating trigger — discret */}
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-full bg-background border border-border text-muted-foreground text-xs font-medium px-3 py-2 shadow-md hover:text-foreground hover:border-foreground/30 transition-all"
        aria-label="Générer avec l'IA"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>IA</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        />
      )}

      {/* Modal */}
      {open && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full transition-all duration-350 ease-out ${
            visible ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-10 opacity-0 sm:scale-95"
          }`}
        >
          <div className="bg-background border border-border shadow-2xl rounded-t-3xl sm:rounded-2xl px-6 py-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-md">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Générer avec l'IA</p>
                  <p className="text-xs text-muted-foreground">Décris ton activité — l'IA configure ta carte complète</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground transition p-1.5 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Applied ── */}
            {applied && (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <p className="font-semibold text-foreground text-lg">Carte générée !</p>
                <p className="text-sm text-muted-foreground text-center">
                  Toutes les sections ont été configurées.<br />
                  Tu peux maintenant personnaliser les détails.
                </p>
              </div>
            )}

            {/* ── Result ── */}
            {result && !applied && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Aperçu de ta carte générée</p>

                <div className="rounded-xl bg-muted/40 border border-border px-4 py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Titre</p>
                    <p className="font-semibold text-foreground text-sm">{result.title}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#c026d3]/10 text-[#c026d3] font-medium border border-[#c026d3]/20 shrink-0">
                    {result.accent}
                  </span>
                </div>

                <div className="rounded-xl bg-muted/40 border border-border px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Bio</p>
                  <p className="text-sm text-foreground leading-relaxed">{result.bio}</p>
                </div>

                {/* Sections activées */}
                <div className="rounded-xl bg-muted/40 border border-border px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-2">Sections activées</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.statsEnabled && <Chip label={`📊 Stats (${result.stats?.length})`} />}
                    {result.servicesEnabled && <Chip label={`🛠 Services (${result.services?.length})`} />}
                    {result.aboutEnabled && <Chip label={`👤 À propos`} />}
                    {result.testimonialsEnabled && <Chip label={`⭐ Témoignages (${result.testimonials?.length})`} />}
                    {result.calendarEnabled && <Chip label={`📅 Agenda`} />}
                    {result.galleryEnabled && <Chip label={`🖼 Galerie`} />}
                    {result.listingsEnabled && <Chip label={`🏠 Biens`} />}
                    {result.ctaEnabled && <Chip label={`🎯 CTA`} />}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="rounded-xl bg-muted/40 border border-border px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-2">Boutons d'action</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeActions.map((a) => <Chip key={a} label={ACTION_LABELS[a] ?? a} />)}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => { setResult(null); setInput(""); }}
                    className="flex-1 rounded-xl border border-border py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition"
                  >
                    Recommencer
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className="flex-[2] rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold py-2.5 hover:opacity-90 transition flex items-center justify-center gap-1.5"
                  >
                    Appliquer à ma carte
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Form ── */}
            {!result && !applied && (
              <form onSubmit={handleGenerate} className="space-y-4">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ex: Je suis agent immobilier à Lyon, spécialisé dans les biens de prestige..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition resize-none"
                />

                {error && <p className="text-xs text-destructive">{error}</p>}

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-full rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Génération en cours…</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Générer ma carte complète</>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Sections, thème, contenu — tout est généré automatiquement ✨
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-[#c026d3]/10 text-[#c026d3] font-medium border border-[#c026d3]/20">
      {label}
    </span>
  );
}
