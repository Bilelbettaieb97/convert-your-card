import { Layout, Palette } from "lucide-react";
import { StepHeader, type StepNum } from "@/components/builder/StepHeader";

interface Props {
  completedThrough: StepNum;
  onGoToStep: (n: StepNum) => void;
  onTemplate: () => void;
  onDirect: () => void;
}

export function BuilderIntro({ completedThrough, onGoToStep, onTemplate, onDirect }: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <StepHeader
        step={1}
        title="Votre carte de visite digitale pour impressionner vos prospects"
        subtitle="Créez votre carte en quelques minutes. Aperçu en direct, sans carte bancaire."
        completedThrough={completedThrough}
        onGoToStep={onGoToStep}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:py-16">
        <div className="w-full max-w-2xl grid gap-4 sm:grid-cols-2">
          {/* Option A — template */}
          <button
            type="button"
            onClick={onTemplate}
            className="group relative flex flex-col items-start gap-4 rounded-2xl border-2 border-primary bg-primary/5 p-6 text-left transition hover:bg-primary/10 hover:shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Layout className="h-6 w-6" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-base font-semibold">Commencer avec un template</span>
              <span className="text-sm text-muted-foreground">
                Choisissez votre métier — votre carte sera pré-remplie avec un modèle adapté.
              </span>
            </span>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
              Recommandé
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          </button>

          {/* Option B — direct */}
          <button
            type="button"
            onClick={onDirect}
            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 text-left transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
              <Palette className="h-6 w-6" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-base font-semibold">Personnaliser depuis le début</span>
              <span className="text-sm text-muted-foreground">
                Partez d'une ardoise vierge et choisissez vos couleurs librement.
              </span>
            </span>
            <span className="mt-auto text-xs text-muted-foreground">Carte vierge · Thème au choix</span>
          </button>
        </div>
      </div>
    </main>
  );
}
