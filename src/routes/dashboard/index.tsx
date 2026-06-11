import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Eye, MousePointerClick, Smartphone, QrCode, ArrowRight, Sparkles,
  CheckCircle2, Circle, TrendingUp, Zap, CreditCard, Palette, Share2,
  Layers, Link2, Image, BarChart2, Settings, ChevronRight,
} from "lucide-react";
import { useCardStore } from "@/lib/card-store";
import { getCompletion } from "@/lib/card-completion";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { UpsellSection } from "@/components/dashboard/UpsellSection";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";
import { usePlan } from "@/lib/use-plan";

export const Route = createFileRoute("/dashboard/")({
  component: () => {
    const navigate = useNavigate();
    useEffect(() => { navigate({ to: "/dashboard/card", replace: true }); }, []);
    return null;
  },
});

type Kpis = { vues: number; clics: number; vcards: number; scans: number };

const ONBOARDING_STEPS = [
  {
    n: 1,
    to: "/dashboard/card",
    icon: CreditCard,
    title: "Ma carte",
    description: "Accédez à votre aperçu live, copiez votre lien public et téléchargez votre QR code à imprimer ou à partager par message.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    n: 2,
    to: "/dashboard/content",
    icon: Layers,
    title: "Contenu",
    description: "Remplissez vos sections : identité, services, témoignages, boutons d'action. C'est le cœur de votre carte.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  {
    n: 3,
    to: "/dashboard/theme",
    icon: Palette,
    title: "Apparence",
    description: "Choisissez votre thème de couleurs et la variante visuelle qui correspond le mieux à votre univers professionnel.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
  },
  {
    n: 4,
    to: "/dashboard/style",
    icon: Sparkles,
    title: "Style des sections",
    description: "Personnalisez le rendu de chaque section : alignement, espacement, style des badges et des boutons.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    n: 5,
    to: "/dashboard/links",
    icon: Link2,
    title: "Liens & réseaux",
    description: "Ajoutez vos réseaux sociaux (LinkedIn, Instagram, TikTok), votre numéro WhatsApp et vos liens personnalisés.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    n: 6,
    to: "/dashboard/media",
    icon: Image,
    title: "Médias",
    description: "Importez votre photo de profil, votre logo d'entreprise et vos images de galerie pour enrichir votre carte.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
  },
  {
    n: 7,
    to: "/dashboard/statistiques",
    icon: BarChart2,
    title: "Statistiques",
    description: "Suivez vos vues, clics sur vos boutons et téléchargements vCard en temps réel. Sachez qui visite votre carte.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    n: 8,
    to: "/dashboard/settings",
    icon: Settings,
    title: "Paramètres",
    description: "Gérez votre profil public, votre mot de passe, vos préférences de notification et vos données personnelles.",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
  },
] as const;

function OverviewPage() {
  const { data, hydrated } = useCardStore();
  const { plan } = usePlan();
  const [kpis, setKpis] = useState<Kpis>({ vues: 0, clics: 0, vcards: 0, scans: 0 });

  useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) return;
    const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
    supabase
      .from("nfc_analytics")
      .select("event_type")
      .eq("profile_id", profile.id)
      .gte("created_at", since)
      .then(({ data: rows }) => {
        if (!rows) return;
        setKpis({
          vues: rows.filter((e) => e.event_type === "view").length,
          clics: rows.filter((e) => e.event_type === "click_button" || e.event_type === "click_social").length,
          vcards: rows.filter((e) => e.event_type === "vcard_download").length,
          scans: rows.filter((e) => e.event_type === "qr_scan").length,
        });
      });
  }, []);

  if (!hydrated) {
    return <div className="p-8"><SkeletonGrid /></div>;
  }

  const { score, items, missing } = getCompletion(data);
  const firstName = data.name?.split(" ")[0] || "vous";

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 space-y-10">
      {/* Greeting */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-primary flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Tableau de bord
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Bonjour, {firstName} 👋
          </h2>
          <p className="text-base text-muted-foreground mt-2">
            Voici la santé de votre carte digitale aujourd'hui.
          </p>
        </div>
        <Link to="/dashboard/card">
          <Button size="lg" className="h-12 text-base px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_-4px] shadow-primary/40">
            Ouvrir ma carte <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </header>

      {/* KPIs */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Eye} label="Vues · 7 j." value={kpis.vues > 0 ? String(kpis.vues) : "—"} hint="Visiteurs de votre carte" spark={[3,5,4,7,6,9,8]} delta={12} />
          <MetricCard icon={MousePointerClick} label="Clics · 7 j." value={kpis.clics > 0 ? String(kpis.clics) : "—"} hint="Sur vos boutons d'action" spark={[2,4,3,5,4,6,7]} delta={8} />
          <MetricCard icon={Smartphone} label="vCard ajoutées" value={kpis.vcards > 0 ? String(kpis.vcards) : "—"} hint="Contacts enregistrés" spark={[1,2,2,3,4,3,5]} delta={24} />
          <MetricCard icon={QrCode} label="Scans QR" value={kpis.scans > 0 ? String(kpis.scans) : "—"} hint="Détection physique" spark={[0,1,3,2,4,5,4]} delta={-3} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Completion */}
        <section className="lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-card to-card/30 p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-display text-2xl font-semibold">Santé de ma carte</h3>
              <p className="text-sm text-muted-foreground mt-1">Plus votre carte est complète, plus elle convertit.</p>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl text-primary leading-none font-semibold">{score}<span className="text-2xl text-muted-foreground">%</span></div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Complétion</div>
            </div>
          </div>
          <Progress value={score} className="h-2.5 mb-6" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
            {items.map((it) => (
              <li key={it.id} className="flex items-start gap-2.5 text-sm">
                {it.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                )}
                <span className={it.done ? "text-foreground/60 line-through decoration-foreground/20" : "text-foreground"}>
                  {it.label}
                </span>
              </li>
            ))}
          </ul>
          {missing.length > 0 && missing[0].hint && (
            <div className="mt-5 p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-2.5">
              <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <span className="font-semibold text-primary">Suggestion :</span>{" "}
                <span className="text-foreground/85">{missing[0].hint}</span>
              </div>
            </div>
          )}
        </section>

        {/* Quick actions */}
        <section className="space-y-3">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/30 p-5">
            <h3 className="font-display text-xl font-semibold mb-1">Actions rapides</h3>
            <p className="text-sm text-muted-foreground mb-4">Les opérations les plus courantes.</p>
            <div className="space-y-2">
              <QuickAction to="/dashboard/card" icon={CreditCard} label="Ouvrir ma carte" hint="Aperçu, QR, partage" />
              <QuickAction to="/dashboard/style" icon={Palette} label="Changer l'apparence" hint="Thème & variantes" />
              <QuickAction to="/dashboard/analytics" icon={Share2} label="Voir les stats" hint="Engagement détaillé" />
              {plan !== "vitrine" && (
                <QuickAction to="/dashboard/account" icon={TrendingUp} label="Passer à Vitrine" hint="Débloquer tout" highlight />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/30 p-5">
            <h3 className="font-display text-base font-semibold mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Activité récente
            </h3>
            <div className="text-center py-6 text-muted-foreground">
              <div className="h-10 w-10 mx-auto rounded-full bg-muted/50 grid place-items-center mb-2">
                <Eye className="h-4 w-4 opacity-50" />
              </div>
              <p className="text-sm leading-relaxed">
                Aucune activité.<br />
                <span className="text-xs opacity-70">Les scans et vues apparaîtront ici.</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Onboarding ── */}
      <section>
        <div className="mb-5">
          <h3 className="font-display text-2xl font-semibold">Apprenez à utiliser votre dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1">Suivez ces 8 étapes pour tirer le maximum de votre carte digitale.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {ONBOARDING_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.to}
                className={`group flex flex-col rounded-2xl border ${s.border} bg-card/50 p-5 transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </span>
                  <span className={`text-[11px] font-semibold uppercase tracking-widest ${s.color} opacity-70 mt-1`}>
                    Étape {s.n}
                  </span>
                </div>
                <div className="font-display text-base font-semibold mb-1.5">{s.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                <div className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${s.color}`}>
                  Aller sur la page <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Upsell ── */}
      <section className="pt-2">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h3 className="font-display text-2xl font-semibold">Allez plus loin</h3>
            <p className="text-sm text-muted-foreground mt-1">Deux upgrades premium qui transforment votre carte en machine à convertir.</p>
          </div>
          <Link to="/dashboard/account" className="text-sm text-primary hover:underline font-medium">Tout voir →</Link>
        </div>
        <UpsellSection variant="compact" />
      </section>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, hint, highlight }: { to: string; icon: React.ElementType; label: string; hint: string; highlight?: boolean }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition hover:-translate-y-0.5 ${
        highlight
          ? "border-primary/40 bg-gradient-to-r from-primary/10 to-transparent hover:border-primary/60"
          : "border-border bg-card/40 hover:border-primary/40 hover:bg-card"
      }`}
    >
      <span className={`h-10 w-10 grid place-items-center rounded-lg shrink-0 ${highlight ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground" : "bg-muted text-foreground/80"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{label}</div>
        <div className="text-xs text-muted-foreground truncate">{hint}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-64 rounded-md bg-muted/40" />
      <div className="grid grid-cols-4 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="h-28 rounded-2xl bg-muted/30" />)}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-80 rounded-2xl bg-muted/30" />
        <div className="h-80 rounded-2xl bg-muted/30" />
      </div>
    </div>
  );
}
