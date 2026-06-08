import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { useCardStore } from "@/lib/card-store";
import { CARD_THEMES } from "@/lib/card-themes";
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
      if (row?.card_data) {
        skipNextSave.current = true;
        setData(row.card_data as CardData);
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

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CARD_THEMES.map((t) => {
            const active = data.accent === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => update("accent", t.id as CardData["accent"])}
                className={`group relative text-left rounded-2xl border p-3 transition-all hover:-translate-y-0.5 ${
                  active
                    ? "border-primary ring-2 ring-primary/40 shadow-[0_0_24px_-4px] shadow-primary/30"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                <div
                  className="h-20 w-full rounded-xl mb-3 border border-border/60 overflow-hidden"
                  style={{ background: t.palette.gradient }}
                  aria-hidden
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{t.label}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{t.sector}</div>
                  </div>
                  {active && (
                    <span className="h-5 w-5 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
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
