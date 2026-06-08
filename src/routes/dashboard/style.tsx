import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BrickList } from "@/components/builder/BrickList";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard, updateCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import type { CardData } from "@/lib/card-types";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/style")({
  component: StylePage,
});

function StylePage() {
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

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard/card" className="h-8 w-8 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="font-display text-2xl font-medium">Style par brique</h2>
            <p className="text-sm text-muted-foreground">Choisissez la variante visuelle de chaque section.</p>
          </div>
        </div>
        <BrickList data={data} update={update} setData={setData} styleOnly />
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
