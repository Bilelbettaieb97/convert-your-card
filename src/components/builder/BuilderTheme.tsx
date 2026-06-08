import { useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { StepHeader, type StepNum } from "@/components/builder/StepHeader";
import { StepFooter } from "@/components/builder/StepFooter";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { CARD_THEMES, PROFESSIONS_BY_THEME, THEMES_BY_ID } from "@/lib/card-themes";
import type { CardData } from "@/lib/card-types";

interface Props {
  data: CardData;
  update: <K extends keyof CardData>(k: K, v: CardData[K]) => void;
  completedThrough: StepNum;
  onGoToStep: (n: StepNum) => void;
  onBack: () => void;
  onNext: () => void;
}

export function BuilderTheme({ data, update, completedThrough, onGoToStep, onBack, onNext }: Props) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(data.accent ?? "gold");

  const activeTheme = THEMES_BY_ID[selectedThemeId] ?? THEMES_BY_ID.gold;

  const previewData = useMemo<CardData>(
    () => ({ ...data, accent: selectedThemeId as CardData["accent"] }),
    [data, selectedThemeId],
  );

  const handleNext = () => {
    update("accent", selectedThemeId as CardData["accent"]);
    onNext();
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <StepHeader
        step={3}
        title="Choisissez l'ambiance de votre carte"
        subtitle="Le thème définit les couleurs et l'atmosphère. Vous pourrez le changer à tout moment."
        completedThrough={completedThrough}
        onGoToStep={onGoToStep}
        nextHint="Après cette étape : remplir les sections essentielles."
      />

      <div className="mx-auto w-full max-w-7xl px-5 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 flex-1 min-h-0">
        {/* LEFT — theme grid */}
        <section className="flex flex-col min-h-0">

          {/* Mobile preview */}
          <div className="lg:hidden flex flex-col items-center mb-4">
            <p className="text-[10px] uppercase tracking-wider text-primary/80 flex items-center gap-1 mb-2">
              <Sparkles className="h-3 w-3" /> Aperçu live
            </p>
            <div className="relative overflow-hidden mx-auto" style={{ width: 234, height: 370 }}>
              <div className="absolute top-0 left-0" style={{ transform: "scale(0.65)", transformOrigin: "top left" }}>
                <PhoneFrame>
                  <BusinessCard data={previewData} />
                </PhoneFrame>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Thème : {activeTheme.label}</p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2">
              {CARD_THEMES.map((t) => {
                const active = selectedThemeId === t.id;
                const p = t.palette;
                const suggested = PROFESSIONS_BY_THEME[t.id] ?? [];
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedThemeId(t.id);
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                      active
                        ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <span
                      className="h-10 w-10 rounded-lg shrink-0 border overflow-hidden relative"
                      style={{ background: p.bg, borderColor: p.border }}
                      aria-hidden
                    >
                      <span className="absolute inset-1.5 rounded-md" style={{ background: p.surface }} />
                      <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full" style={{ background: p.gradient }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium truncate">{t.label}</span>
                      <span className="block text-[10px] text-muted-foreground truncate">
                        {suggested.slice(0, 2).map((s) => s.label).join(", ") || t.sector}
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* RIGHT — live preview */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 self-start flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Aperçu live
              </p>
              <span className="text-[10px] text-muted-foreground">
                Thème : {activeTheme.label}
              </span>
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-40 transition-all duration-500"
                style={{ background: activeTheme.palette.gradient }}
                aria-hidden
              />
              <PhoneFrame>
                <BusinessCard data={previewData} />
              </PhoneFrame>
            </div>
          </div>
        </aside>
      </div>

      <StepFooter
        step={3}
        onBack={onBack}
        onNext={handleNext}
        nextLabel={`Continuer avec ${activeTheme.label}`}
        centerInfo={`Thème sélectionné : ${activeTheme.label}`}
      />
    </main>
  );
}
