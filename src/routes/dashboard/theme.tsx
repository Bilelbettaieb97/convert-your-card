import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { useCardStore } from "@/lib/card-store";
import { CARD_THEMES, type ThemePalette } from "@/lib/card-themes";
import { loadMyCard, updateCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import type { CardData } from "@/lib/card-types";
import { Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/theme")({
  component: ThemePage,
});

function ThemePage() {
  const { data, setData, update, hydrated } = useCardStore();
  const profile = getProfileMeta();
  const [supabaseReady, setSupabaseReady] = useState(false);
  const skipNextSave = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile) { setSupabaseReady(true); return; }
    loadMyCard().then((row) => {
      if ((row as any)?.card_data) {
        skipNextSave.current = true;
        setData((row as any).card_data as CardData);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hydrated || !supabaseReady || !profile) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated, supabaseReady]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hydrated || !supabaseReady) {
    return <div className="p-8 text-muted-foreground">Chargement…</div>;
  }

  const darkThemes = CARD_THEMES.filter((t) => t.palette.mode === "dark");
  const lightThemes = CARD_THEMES.filter((t) => t.palette.mode === "light");

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8 items-start">

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard/card" className="h-8 w-8 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="font-display text-2xl font-medium">Apparence</h2>
            <p className="text-sm text-muted-foreground">Choisissez la palette qui correspond à votre métier.</p>
          </div>
        </div>

        {/* Dark + Light side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ThemeGroup
            label="Thèmes sombres"
            themes={darkThemes}
            activeId={data.accent}
            onSelect={(id) => update("accent", id as CardData["accent"])}
          />
          <ThemeGroup
            label="Thèmes clairs"
            themes={lightThemes}
            activeId={data.accent}
            onSelect={(id) => update("accent", id as CardData["accent"])}
          />
        </div>
      </section>

      <aside className="hidden xl:block">
        <div className="sticky top-20">
          <p className="text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Aperçu live
          </p>
          <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
        </div>
      </aside>
    </div>
  );
}

function ThemeGroup({ label, themes, activeId, onSelect }: {
  label: string;
  themes: typeof CARD_THEMES;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((t) => (
          <ThemeCard
            key={t.id}
            id={t.id}
            label={t.label}
            sector={t.sector}
            palette={t.palette}
            active={activeId === t.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function ThemeCard({ id, label, sector, palette: p, active, onSelect }: {
  id: string;
  label: string;
  sector: string;
  palette: ThemePalette;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group relative text-left rounded-2xl border p-2.5 transition-all hover:-translate-y-0.5 ${
        active
          ? "border-primary ring-2 ring-primary/40 shadow-[0_0_24px_-4px] shadow-primary/30"
          : "border-border hover:border-foreground/30"
      }`}
    >
      {/* Mini card preview */}
      <div
        className="h-28 w-full rounded-xl mb-2.5 overflow-hidden relative flex flex-col"
        style={{ background: p.bg }}
        aria-hidden
      >
        {/* Header gradient strip */}
        <div className="h-10 w-full shrink-0" style={{ background: p.gradient }} />

        {/* Avatar overlap */}
        <div className="flex justify-center -mt-4 shrink-0">
          <div
            className="h-8 w-8 rounded-full border-2 shrink-0"
            style={{ background: p.surfaceAlt, borderColor: p.bg }}
          />
        </div>

        {/* Name + title lines */}
        <div className="flex flex-col items-center gap-1 mt-1 px-3 shrink-0">
          <div className="h-1.5 rounded-full w-16" style={{ background: p.text, opacity: 0.7 }} />
          <div className="h-1 rounded-full w-10" style={{ background: p.textMuted, opacity: 0.6 }} />
        </div>

        {/* Action buttons row */}
        <div className="flex justify-center gap-1.5 mt-2 px-3 shrink-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-4 rounded-lg flex-1"
              style={{ background: p.surface, border: `1px solid ${p.border}` }}
            />
          ))}
        </div>

        {/* Surface card — simulates a section (services/listings/gallery) */}
        <div
          className="mx-2 mt-2 rounded-lg p-1.5 flex gap-1.5"
          style={{ background: p.surface, border: `1px solid ${p.border}` }}
        >
          <div className="h-6 w-6 rounded shrink-0" style={{ background: p.surfaceAlt }} />
          <div className="flex flex-col justify-center gap-1 flex-1">
            <div className="h-1 rounded-full w-full" style={{ background: p.text, opacity: 0.5 }} />
            <div className="h-1 rounded-full w-2/3" style={{ background: p.textMuted, opacity: 0.4 }} />
          </div>
          <div className="h-3 w-5 rounded shrink-0 self-center" style={{ background: p.accent, opacity: 0.8 }} />
        </div>

        {/* 2-col grid hint — simulates gallery/services */}
        <div className="mx-2 mt-1.5 grid grid-cols-2 gap-1">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-4 rounded"
              style={{ background: p.surfaceAlt, border: `1px solid ${p.border}` }}
            />
          ))}
        </div>
      </div>

      {/* Label row */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{label}</div>
          <div className="text-[10px] text-muted-foreground truncate">{sector}</div>
        </div>
        {active && (
          <span className="h-5 w-5 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </div>
    </button>
  );
}
