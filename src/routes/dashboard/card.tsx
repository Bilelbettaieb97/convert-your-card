import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { ShareGrid, QrCard, PublicLinkBar } from "@/components/dashboard/ShareGrid";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard } from "@/lib/card-actions";
import { usePlan } from "@/lib/use-plan";
import type { CardData } from "@/lib/card-types";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Layers, Palette, Sparkles, ArrowRight, ExternalLink,
  Wifi, WifiOff, Eye, Image, X,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/card")({
  component: CardOverviewPage,
});

function CardOverviewPage() {
  const { data, setData, hydrated } = useCardStore();
  const { actif, slug } = usePlan();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
  const publicUrl = slug ? `${origin}/${slug}` : "";
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const skipInit = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!slug) { setSupabaseReady(true); return; }
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

  const StatusBadge = () => actif ? (
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
  );

  return (
    <>
      {/* ── MOBILE LAYOUT (< xl) ── */}
      <div className="xl:hidden px-4 py-5 space-y-4">

        {/* Status */}
        <div className="flex items-center justify-between">
          <StatusBadge />
          {publicUrl && (
            <a href={publicUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
              Voir <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Mini phone preview */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[28px] shadow-[0_20px_60px_-10px] shadow-primary/25"
              style={{ width: 168, height: 268 }}
            >
              <div style={{ transform: "scale(0.466)", transformOrigin: "top left", width: 360 }}>
                <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap z-10">
              {actif ? "✓ En ligne" : "Hors ligne"}
            </div>
          </div>
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 text-sm text-primary font-medium"
          >
            <Eye className="w-4 h-4" />
            Voir l'aperçu complet
          </button>
        </div>

        {/* Public link */}
        <div className="rounded-2xl border border-border bg-card/40 p-3.5">
          <PublicLinkBar url={publicUrl} />
        </div>

        {/* QR + Share */}
        <div className="grid grid-cols-2 gap-3">
          <QrCard url={publicUrl} name={data.name} />
          <div className="rounded-2xl border border-border bg-card/30 p-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Partager</p>
            <ShareGrid data={data} url={publicUrl} compact />
          </div>
        </div>

        {/* Quick access grid 2×2 */}
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground px-1 mb-2.5">
            Personnaliser ma carte
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickCard to="/dashboard/content" icon={<Layers className="w-5 h-5" />} label="Contenu" hint="Sections & textes" color="pink" />
            <QuickCard to="/dashboard/theme" icon={<Palette className="w-5 h-5" />} label="Apparence" hint="Thème & couleurs" color="violet" />
            <QuickCard to="/dashboard/style" icon={<Sparkles className="w-5 h-5" />} label="Style" hint="Variantes visuelles" color="amber" />
            <QuickCard to="/dashboard/media" icon={<Image className="w-5 h-5" />} label="Médias" hint="Logo & photos" color="sky" />
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (xl+) ── */}
      <div className="hidden xl:block mx-auto max-w-6xl px-8 py-8">
        <div className="grid grid-cols-[380px_1fr] gap-8 items-start">
          <div className="flex justify-center xl:sticky xl:top-20">
            <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
          </div>

          <div className="space-y-5">
            <StatusBadge />

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Personnaliser ma carte</p>
                <p className="text-[11px] text-muted-foreground">Commencez par là avant de partager</p>
              </div>
              <EditButton to="/dashboard/content" icon={<Layers className="h-6 w-6" />} label="Modifier le contenu" hint="Sections, textes, boutons d'action" primary />
              <EditButton to="/dashboard/theme" icon={<Palette className="h-6 w-6" />} label="Modifier l'apparence" hint="Thème, couleurs, palette globale" />
              <EditButton to="/dashboard/style" icon={<Sparkles className="h-6 w-6" />} label="Modifier le style" hint="Variantes visuelles par brique" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] text-muted-foreground">Prête à partager ?</span>
              <div className="flex-1 h-px bg-border" />
            </div>

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

      {/* ── Sheet aperçu complet (mobile) ── */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <span className="font-semibold text-sm">Aperçu de la carte</span>
            <button
              onClick={() => setPreviewOpen(false)}
              className="h-8 w-8 grid place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto flex justify-center py-6 px-4">
            <div className="w-full max-w-[360px]">
              <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

const COLOR_MAP = {
  pink:   { icon: "text-pink-500",    bg: "bg-pink-500/12",    border: "border-pink-500/25" },
  violet: { icon: "text-violet-500",  bg: "bg-violet-500/12",  border: "border-violet-500/25" },
  amber:  { icon: "text-amber-500",   bg: "bg-amber-500/12",   border: "border-amber-500/25" },
  sky:    { icon: "text-sky-500",     bg: "bg-sky-500/12",     border: "border-sky-500/25" },
};

function QuickCard({ to, icon, label, hint, color = "violet" }: { to: string; icon: React.ReactNode; label: string; hint: string; color?: keyof typeof COLOR_MAP }) {
  const c = COLOR_MAP[color];
  return (
    <Link
      to={to}
      className={`flex flex-col gap-2.5 rounded-2xl border p-3.5 transition-all active:scale-95 ${c.bg} ${c.border}`}
    >
      <span className={`w-9 h-9 rounded-xl grid place-items-center ${c.bg} ${c.icon}`}>{icon}</span>
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
    </Link>
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
