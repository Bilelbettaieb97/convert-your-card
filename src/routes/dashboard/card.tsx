import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { ShareGrid, QrCard, PublicLinkBar } from "@/components/dashboard/ShareGrid";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import type { CardData } from "@/lib/card-types";
import { Layers, Palette, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/dashboard/card")({
  component: CardOverviewPage,
});

function CardOverviewPage() {
  const { data, setData, hydrated } = useCardStore();
  const profile = getProfileMeta();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const publicUrl = profile ? `${origin}/${profile.slug}` : `${origin}/`;
  const [supabaseReady, setSupabaseReady] = useState(false);
  const skipInit = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile) { setSupabaseReady(true); return; }
    loadMyCard().then((row) => {
      if ((row as any)?.card_data) {
        skipInit.current = true;
        setData((row as any).card_data as CardData);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hydrated || !supabaseReady) {
    return <div className="p-8 text-muted-foreground">Chargement…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 items-start">

        {/* LEFT — sticky phone preview */}
        <div className="flex justify-center xl:sticky xl:top-20">
          <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
        </div>

        {/* RIGHT — link, QR, share, edit buttons */}
        <div className="space-y-5">

          {/* Public link */}
          <div className="rounded-2xl border border-border bg-card/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Lien public</span>
              <a href={publicUrl} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-primary hover:underline flex items-center gap-1">
                Ouvrir <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <PublicLinkBar url={publicUrl} />
          </div>

          {/* QR + share side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QrCard url={publicUrl} name={data.name} />
            <div className="rounded-2xl border border-border bg-card/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Partager</p>
              <ShareGrid data={data} url={publicUrl} />
            </div>
          </div>

          {/* 3 edit buttons */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-1">Modifier ma carte</p>

            <EditButton
              to="/dashboard/content"
              icon={<Layers className="h-6 w-6" />}
              label="Modifier le contenu"
              hint="Sections, textes, boutons d'action"
            />
            <EditButton
              to="/dashboard/theme"
              icon={<Palette className="h-6 w-6" />}
              label="Modifier l'apparence"
              hint="Thème, couleurs, palette globale"
            />
            <EditButton
              to="/dashboard/style"
              icon={<Sparkles className="h-6 w-6" />}
              label="Modifier le style"
              hint="Variantes visuelles par brique"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditButton({ to, icon, label, hint }: { to: string; icon: React.ReactNode; label: string; hint: string }) {
  return (
    <Link to={to} className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:bg-card p-4 transition-all hover:-translate-y-0.5">
      <span className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 group-hover:bg-primary/15 transition-colors">
        {icon}
      </span>
      <div className="flex-1 text-left min-w-0">
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
}
