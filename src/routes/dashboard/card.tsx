import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { ShareGrid, QrCard, PublicLinkBar } from "@/components/dashboard/ShareGrid";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import { usePlan } from "@/lib/use-plan";
import type { CardData } from "@/lib/card-types";
import { Layers, Palette, Sparkles, ArrowRight, ExternalLink, Wifi, WifiOff } from "lucide-react";

export const Route = createFileRoute("/dashboard/card")({
  component: CardOverviewPage,
});

function CardOverviewPage() {
  const { data, setData, hydrated } = useCardStore();
  const { actif } = usePlan();
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

        {/* RIGHT */}
        <div className="space-y-5">

          {/* 1 — Statut */}
          {actif ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Carte en ligne</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400">Carte hors ligne</span>
            </div>
          )}

          {/* 2 — Modifier en premier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Personnaliser ma carte</p>
              <p className="text-[11px] text-muted-foreground">Commencez par là avant de partager</p>
            </div>
            <EditButton
              to="/dashboard/content"
              icon={<Layers className="h-6 w-6" />}
              label="Modifier le contenu"
              hint="Sections, textes, boutons d'action"
              primary
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

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">Prête à partager ?</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* 3 — Lien public */}
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

          {/* 4 — QR + Partager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QrCard url={publicUrl} name={data.name} />
            <div className="rounded-2xl border border-border bg-card/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Partager</p>
              <ShareGrid data={data} url={publicUrl} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function EditButton({ to, icon, label, hint, primary }: { to: string; icon: React.ReactNode; label: string; hint: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${
        primary
          ? "border-primary/50 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-[0_4px_20px_-4px] shadow-primary/40"
          : "border-border bg-card/40 hover:border-primary/50 hover:bg-card"
      }`}
    >
      <span className={`h-12 w-12 rounded-xl grid place-items-center shrink-0 transition-colors ${
        primary ? "bg-white/15 text-white" : "bg-primary/10 text-primary group-hover:bg-primary/15"
      }`}>
        {icon}
      </span>
      <div className="flex-1 text-left min-w-0">
        <div className={`font-semibold ${primary ? "text-white" : ""}`}>{label}</div>
        <div className={`text-xs ${primary ? "text-white/70" : "text-muted-foreground"}`}>{hint}</div>
      </div>
      <ArrowRight className={`h-4 w-4 group-hover:translate-x-0.5 transition-all shrink-0 ${primary ? "text-white/80" : "text-muted-foreground group-hover:text-primary"}`} />
    </Link>
  );
}
