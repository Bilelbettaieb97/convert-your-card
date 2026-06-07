import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import {
  Check, X, Star, Zap, Shield, Smartphone, BarChart3, Leaf,
  CreditCard, Truck, ChevronDown, ArrowRight, Sparkles, Clock, Users, TrendingUp,
  Award, MessageCircle, BadgeCheck, Quote, ThumbsUp,
  Building2, Home, UtensilsCrossed, GraduationCap, Scissors, HardHat,
} from "lucide-react";
import { DigitalCardVisual } from "@/components/landing/DigitalCardVisual";
import { Countdown } from "@/components/landing/Countdown";
import { VideoTestimonials } from "@/components/landing/VideoTestimonials";
import { LiveActivity, ExitIntent, GuaranteeBlock, StructuredData } from "@/components/landing/CroEnhancements";
import { CheckoutFlow, onCheckoutClick, triggerCheckout } from "@/components/landing/CheckoutFlow";
import t1Asset from "@/assets/templates/t1-agency.png.asset.json";
import t2Asset from "@/assets/templates/t2-realestate.png.asset.json";
import t3Asset from "@/assets/templates/t3-restaurant.png.asset.json";
import t4Asset from "@/assets/templates/t4-coach.png.asset.json";
import t5Asset from "@/assets/templates/t5-beauty.png.asset.json";
import t6Asset from "@/assets/templates/t6-artisan.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OneTap · Carte de visite digitale à 19,80€ — Partagez vos contacts en 1 tap" },
      { name: "description", content: "Créez votre carte de visite digitale professionnelle en 3 minutes. Partagez vos coordonnées, réseaux et site en un seul tap. À partir de 19,80€. Sans abonnement." },
      { property: "og:title", content: "OneTap · La carte de visite digitale qui convertit" },
      { property: "og:description", content: "Partagez vos contacts en 1 tap. À partir de 19,80€. Sans abonnement, mises à jour illimitées." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <StructuredData />
      <PromoBar />
      <Nav />
      <Hero />
      <Logos />
      <Problem />
      <HowItWorks />
      <SocialProofBand />
      <VideoTestimonials />
      
      <GuaranteeBlock />
      <Features />
      <Testimonials />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
      <LiveActivity />
      <ExitIntent />
      <CheckoutFlow />
    </div>
  );
}

/* ────────────────────────────  TOP  ──────────────────────────── */

export function PromoBar() {
  return (
    <div className="bg-gradient-brand text-primary-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 flex-wrap text-center">
        <Sparkles className="w-4 h-4" />
        <span className="font-medium">Offre de lancement : -40% sur la carte digitale</span>
        <span className="hidden sm:inline opacity-80">·</span>
        <Countdown />
      </div>
    </div>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">OneTap</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#fonctionnement" className="hover:text-foreground transition">Fonctionnement</a>
          <Link to="/templates" className="hover:text-foreground transition">Modèles</Link>
          <Link to="/offres" className="hover:text-foreground transition">Offres</Link>
          <a href="#avis" className="hover:text-foreground transition">Avis</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition whitespace-nowrap">
            Se connecter
          </a>
          <a href="#offres" onClick={onCheckoutClick} className="bg-gradient-cta text-primary-foreground px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition-all whitespace-nowrap">
            Inscription gratuite
          </a>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────  HERO  ──────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,var(--magenta)_25%,transparent),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
            <span className="flex -space-x-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-gradient-brand border-2 border-card" />
              ))}
            </span>
            <span className="text-foreground">+2 400 pros nous font confiance</span>
            <span className="flex items-center text-magenta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </span>
          </div>

          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Votre <span className="text-gradient">carte de visite digitale</span> qui transforme chaque rencontre en client.
          </h1>

          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Partagez vos coordonnées, réseaux et site en <strong className="text-foreground">1 seul tap</strong>.
            Sans appli. Sans abonnement. Mises à jour illimitées à vie.
          </p>

          <ul className="mt-6 space-y-2.5">
            {[
              "Activée en 3 minutes — aucune compétence technique",
              "Compatible iPhone & Android (sans appli)",
              "Modifiez vos infos quand vous voulez, à vie",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
                </span>
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#offres"
              onClick={onCheckoutClick}
              className="group relative bg-gradient-cta text-primary-foreground px-7 py-4 rounded-xl font-semibold text-base shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 animate-pulse-ring"
            >
              Créer ma carte — 19,80€
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#fonctionnement"
              className="px-7 py-4 rounded-xl font-semibold text-base border border-border bg-card hover:bg-secondary transition flex items-center justify-center gap-2"
            >
              Voir une démo
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-success" /> Paiement 100% sécurisé</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-success" /> Activation immédiate</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Garantie 30 jours</span>
          </div>

          {/* Mobile scarcity strip */}
          <div className="mt-5 sm:hidden bg-card border border-magenta/30 rounded-2xl p-3 shadow-card">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-foreground">🔥 Offre lancement — plus que 47 places</span>
              <span className="text-magenta">31%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-gradient-brand" style={{ width: "31%" }} />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Tarif -40% bloqué pendant <Countdown />
            </p>
          </div>
        </div>

        <div className="relative">
          <DigitalCardVisual />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground/70 text-sm font-display font-semibold tracking-wider">
        <span className="text-xs uppercase">Ils utilisent OneTap :</span>
        {["NOVA", "PIXELHAUS", "atlas.", "MENTOR&CO", "FORGE", "LUMIA"].map((n) => (
          <span key={n} className="opacity-60 hover:opacity-100 transition">{n}</span>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────  PROBLEM  ──────────────────────────── */

function Problem() {
  const oldStats = [
    { label: "finissent à la poubelle", value: "88%" },
    { label: "de coût par réimpression", value: "120€" },
    { label: "perdues = infos figées", value: "1 sur 2" },
  ];
  const newStats = [
    { label: "de contacts sauvegardés", value: "92%" },
    { label: "économisés par an", value: "−340€" },
    { label: "mise à jour en temps réel", value: "∞" },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* ambient bg */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-magenta/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Pourquoi changer
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            La carte papier coûte cher.<br/>
            <span className="text-gradient">Et ne convertit plus.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            En 2026, votre carte papier finit à la poubelle avant même votre relance.
            Comparez — la différence est sans appel.
          </p>
        </div>

        <div className="mt-14 relative grid md:grid-cols-2 gap-8 lg:gap-6 items-stretch">
          {/* VS badge */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-background border-2 border-magenta items-center justify-center font-display font-bold text-magenta shadow-xl">
            VS
          </div>

          {/* LEFT — Paper card (loser) */}
          <div className="relative rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-[11px] font-bold uppercase tracking-wider">
                <X className="w-3 h-3" strokeWidth={3} /> Hier
              </span>
              <span className="text-xs text-muted-foreground font-medium">Carte papier</span>
            </div>

            {/* Paper card visual */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="relative">
                <div className="w-64 sm:w-72 h-40 sm:h-44 bg-[#f5f0e8] rounded-xl shadow-lg border border-[#e0d5c5] p-5 flex flex-col justify-between rotate-[-4deg] grayscale-[20%] opacity-90">
                  <div>
                    <div className="text-[10px] text-[#8b7355] uppercase tracking-wider">Consultant</div>
                    <div className="font-serif text-lg text-[#2d2d2d] mt-1">Jean Dupont</div>
                    <div className="text-xs text-[#666] mt-0.5">06 12 34 56 78</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-[10px] text-[#999]">jeandupont.fr</div>
                    <div className="w-7 h-7 bg-[#c9b99a] rounded-full flex items-center justify-center text-white text-[10px] font-bold">JD</div>
                  </div>
                </div>
                {/* torn corner effect */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center rotate-12">
                  <X className="w-5 h-5 text-destructive" strokeWidth={3} />
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {oldStats.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm border-b border-destructive/10 pb-2 last:border-0">
                  <span className="text-muted-foreground line-through decoration-destructive/40">{s.label}</span>
                  <span className="font-display font-bold text-destructive tabular-nums">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Digital card (winner) */}
          <div className="relative rounded-2xl border-2 border-magenta/30 bg-gradient-to-br from-magenta/[0.04] to-transparent p-6 sm:p-8 flex flex-col shadow-2xl shadow-magenta/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-magenta to-magenta/80 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
              ★ Recommandé
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 text-success text-[11px] font-bold uppercase tracking-wider">
                <Check className="w-3 h-3" strokeWidth={3} /> Aujourd'hui
              </span>
              <span className="text-xs text-magenta font-semibold">OneTap Digital</span>
            </div>

            <div className="flex-1 flex items-center justify-center py-4">
              <DigitalCardVisual />
            </div>

            <ul className="mt-6 space-y-2.5">
              {newStats.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm border-b border-magenta/10 pb-2 last:border-0">
                  <span className="text-foreground/80 flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" strokeWidth={3} /> {s.label}
                  </span>
                  <span className="font-display font-bold text-magenta tabular-nums">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            <span className="font-semibold text-foreground">+12 000 pros</span> ont déjà fait le switch.
          </p>
          <button
            onClick={() => triggerCheckout()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-magenta/85 text-white font-semibold shadow-lg shadow-magenta/30 hover:shadow-xl hover:shadow-magenta/40 hover:-translate-y-0.5 transition-all"
          >
            Passer au digital <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  HOW IT WORKS  ──────────────────────────── */


function HowItWorks() {
  const templates = [
    { id: "agency", sector: "Agence & conseil", secondary: "Voir le site", icon: Building2, accent: "from-violet-500 to-pink-500", image: t1Asset.url },
    { id: "real-estate", sector: "Immobilier premium", secondary: "Voir les biens", icon: Home, accent: "from-amber-400 to-yellow-600", image: t2Asset.url },
    { id: "restaurant", sector: "Restaurant & hospitalité", secondary: "Réserver une table", icon: UtensilsCrossed, accent: "from-red-500 to-rose-700", image: t3Asset.url },
    { id: "coach", sector: "Coach & expert", secondary: "Réserver un appel", icon: GraduationCap, accent: "from-emerald-400 to-teal-500", image: t4Asset.url },
    { id: "beauty", sector: "Beauté & bien-être", secondary: "Réserver", icon: Scissors, accent: "from-rose-300 to-amber-200", image: t5Asset.url },
    { id: "artisan", sector: "BTP & artisan", secondary: "Demander un devis", icon: HardHat, accent: "from-orange-500 to-orange-600", image: t6Asset.url },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeTemplate = templates[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % templates.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [templates.length]);

  const goPrev = () => setActiveIndex((current) => (current - 1 + templates.length) % templates.length);
  const goNext = () => setActiveIndex((current) => (current + 1) % templates.length);

  return (
    <section id="fonctionnement" className="py-8 sm:py-10 lg:py-12 bg-gradient-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading — shared */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-magenta">
            <Smartphone className="w-3.5 h-3.5" /> Modèles de cartes
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Une carte qui ressemble <span className="text-gradient">à votre métier</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Immobilier, coaching, restaurant, beauté, artisanat… chaque profil a son univers, son ton, ses appels à l'action.
          </p>
        </div>

        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 lg:items-center">
          {/* ===== Carousel (mobile: 1st, desktop: right) ===== */}
          <div className="relative w-full order-1 lg:order-2">
            {/* Decorative blob */}
            <div className="hidden lg:block absolute -inset-8 bg-gradient-brand opacity-[0.18] blur-3xl rounded-[40%]" aria-hidden />

            {/* Desktop frame */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-sm shadow-card p-8 xl:p-10">
                {/* Counter + sector pill */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-semibold">
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${activeTemplate.accent}`} />
                    {activeTemplate.sector}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(templates.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative w-[280px] xl:w-[320px]">
                    <img
                      key={activeTemplate.id}
                      src={activeTemplate.image}
                      alt={`Exemple de carte digitale — ${activeTemplate.sector}`}
                      className="block w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in-95 duration-500"
                    />

                    {/* Floating feature chips around device */}
                    <div className="absolute -left-16 xl:-left-24 top-12 animate-in fade-in slide-in-from-left-4 duration-700">
                      <div className="rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-magenta" />
                        </div>
                        <div className="text-[11px] font-semibold leading-tight">1 tap<br /><span className="text-muted-foreground font-normal">contact partagé</span></div>
                      </div>
                    </div>

                    <div className="absolute -right-16 xl:-right-24 top-1/3 animate-in fade-in slide-in-from-right-4 duration-700">
                      <div className="rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center">
                          <BadgeCheck className="w-3.5 h-3.5 text-magenta" />
                        </div>
                        <div className="text-[11px] font-semibold leading-tight">{activeTemplate.secondary}</div>
                      </div>
                    </div>

                    <div className="absolute -left-12 xl:-left-20 bottom-16 animate-in fade-in slide-in-from-left-4 duration-700">
                      <div className="rounded-2xl border border-border bg-background shadow-card px-3 py-2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-magenta/10 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-magenta" />
                        </div>
                        <div className="text-[11px] font-semibold leading-tight">100% personnalisé</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile carousel (unchanged) */}
            <div className="relative flex justify-center lg:hidden">
              <div className="relative w-[200px] sm:w-[280px] md:w-[320px]">
                <img
                  key={`m-${activeTemplate.id}`}
                  src={activeTemplate.image}
                  alt={`Exemple de carte digitale — ${activeTemplate.sector}`}
                  className="block w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in-95 duration-500"
                />
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Carte précédente"
                  className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-border bg-background/95 shadow-card backdrop-blur active:scale-95 transition"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Carte suivante"
                  className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-border bg-background/95 shadow-card backdrop-blur active:scale-95 transition"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active sector label (mobile only) */}
            <div className="mt-4 text-center lg:hidden">
              <div className="text-sm font-semibold text-foreground">{activeTemplate.sector}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{activeTemplate.secondary}</div>
            </div>

            {/* Dots (mobile only) */}
            <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
              {templates.map((template, index) => (
                <button
                  key={template.id}
                  type="button"
                  aria-label={`Voir ${template.sector}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-magenta" : "w-2.5 bg-border hover:bg-magenta/40"}`}
                />
              ))}
            </div>
          </div>

          {/* ===== Selectors + features (mobile: below carousel, desktop: left) ===== */}
          <div className="order-2 lg:order-1">
            {/* Mobile: horizontal scroll pills */}
            <div className="lg:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 pb-1 snap-x snap-mandatory">
                {templates.map((template, index) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`shrink-0 snap-start rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      index === activeIndex
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-foreground border-border"
                    }`}
                  >
                    {template.sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: refined list with icons */}
            <div className="hidden lg:grid grid-cols-1 gap-2.5">
              {templates.map((template, index) => {
                const Icon = template.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`group relative w-full text-left rounded-2xl border px-4 py-4 transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "bg-card border-magenta/40 shadow-card translate-x-1"
                        : "bg-background/60 border-border hover:bg-card hover:border-magenta/20 hover:translate-x-0.5"
                    }`}
                  >
                    {/* Active accent bar */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${template.accent} transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      }`}
                      aria-hidden
                    />
                    <div className="flex items-center gap-4">
                      <div
                        className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${template.accent} text-white shadow-sm transition-transform ${
                          isActive ? "scale-105" : "opacity-80 group-hover:opacity-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground leading-tight">{template.sector}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground truncate">CTA · {template.secondary}</div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-all ${
                          isActive ? "text-magenta translate-x-0 opacity-100" : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 lg:mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: BadgeCheck, title: "100% personnalisable" },
                { icon: Users, title: "Pensé pour convertir" },
                { icon: BarChart3, title: "Adapté à chaque métier" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card px-3 py-3 sm:px-4 sm:py-4 shadow-sm">
                  <item.icon className="w-5 h-5 text-magenta" />
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold leading-tight">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  PRICING — FOCUS ON OFFER 1  ──────────────────────────── */

export function Pricing() {
  return (
    <section id="offres" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-magenta uppercase tracking-wider">Choisissez votre formule</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl">
            Un tarif unique. <span className="text-gradient">Sans abonnement.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Payez une fois, profitez à vie. Garantie satisfait ou remboursé 30 jours.</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-5 items-stretch max-w-6xl mx-auto">
          {/* Offer 1 — Essentiel (mobile: 2nd, desktop: 1st) */}
          <div className="order-2 lg:order-1 flex max-w-md mx-auto w-full lg:max-w-none">
            <OfferCard
              name="OneTap Essentiel"
              tagline="La carte digitale qui convertit"
              oldPrice="33€"
              price="19,80€"
              badge="Digital only"
              features={[
                { t: "Page de carte de visite digitale", v: true },
                { t: "Modifications illimitées à vie", v: true },
                { t: "QR code personnalisé", v: true },
                { t: "Tous vos réseaux & liens", v: true },
                { t: "Compatible iPhone & Android", v: true },
                { t: "Sans abonnement, paiement unique", v: true },
              ]}
              cta="Oui, je veux ma carte — 19,80€"
            />
          </div>

          {/* Offer 2 — Physique (highlight) — mobile: 1st (top, centered), desktop: middle */}
          <div className="order-1 lg:order-2 flex max-w-md mx-auto w-full lg:max-w-none">
            <OfferCard
              name="OneTap Physique"
              tagline="Carte NFC + page digitale"
              oldPrice="48€"
              price="28,80€"
              badge="⭐ Le plus populaire"
              highlight
              stockLeft={32}
              stockTotal={100}
              valueStack={[
                { t: "Page de carte digitale", v: "49€" },
                { t: "QR code personnalisé", v: "19€" },
                { t: "Carte NFC premium", v: "25€" },
                { t: "Livraison offerte 48h", v: "12€" },
                { t: "Modifications à vie", v: "29€" },
              ]}
              features={[
                { t: "Tout l'essentiel inclus", v: true },
                { t: "Carte NFC physique premium", v: true },
                { t: "Livraison offerte 48h", v: true },
                { t: "QR code intégré à la carte", v: true },
                { t: "Compatible iPhone & Android", v: true },
                { t: "Sans abonnement, paiement unique", v: true },
              ]}
              cta="Commander ma carte NFC — 28,80€"
              subCta="Activation immédiate · Garantie 30 jours"
            />
          </div>

          {/* Offer 3 — Premium (mobile: 3rd, desktop: 3rd) */}
          <div className="order-3 lg:order-3 flex max-w-md mx-auto w-full lg:max-w-none">
            <OfferCard
              name="OneTap Premium"
              tagline="Analytics & multi-cartes"
              oldPrice="79€"
              price="48€"
              badge="Pour les équipes"
              features={[
                { t: "Tout l'essentiel + Physique", v: true },
                { t: "Analytics avancées en temps réel", v: true },
                { t: "Lead capture & CRM export", v: true },
                { t: "Multi-cartes (jusqu'à 5)", v: true },
                { t: "Domaine personnalisé", v: true },
                { t: "Support prioritaire", v: true },
              ]}
              cta="Passer Premium"
            />
          </div>
        </div>


        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> CB · Apple Pay · Google Pay</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-success" /> Paiement 100% sécurisé Stripe</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Livraison 48h (option physique)</span>
        </div>

        <ComparisonTable />

      </div>
    </section>
  );
}

function ComparisonTable() {
  const offers: { key: string; name: string; price: string; badge: string; highlight?: boolean }[] = [
    { key: "essentiel", name: "Essentiel", price: "19,80€", badge: "Digital only" },
    { key: "physique", name: "Physique", price: "28,80€", badge: "Carte NFC", highlight: true },
    { key: "premium", name: "Premium", price: "48€", badge: "Équipes" },
  ];

  type Cell = boolean | string;
  const rows: { label: string; values: [Cell, Cell, Cell]; group?: string }[] = [
    { group: "L'essentiel", label: "Page de carte digitale", values: [true, true, true] },
    { label: "QR code personnalisé", values: [true, true, true] },
    { label: "Modifications illimitées à vie", values: [true, true, true] },
    { label: "Tous vos réseaux & liens", values: [true, true, true] },
    { label: "Compatible iPhone & Android", values: [true, true, true] },
    { label: "Paiement unique, sans abonnement", values: [true, true, true] },

    { group: "Carte physique", label: "Carte NFC premium livrée", values: [false, true, true] },
    { label: "Livraison offerte 48h", values: [false, true, true] },
    { label: "QR code intégré à la carte", values: [false, true, true] },

    { group: "Pro & équipes", label: "Analytics temps réel (vues, clics)", values: [false, false, true] },
    { label: "Lead capture & export CRM", values: [false, false, true] },
    { label: "Multi-cartes (jusqu'à 5)", values: [false, false, true] },
    { label: "Domaine personnalisé", values: [false, false, true] },
    { label: "Support prioritaire", values: [false, false, true] },
  ];

  const cell = (v: Cell, highlight?: boolean) => {
    if (v === true) return <Check className={`w-5 h-5 mx-auto ${highlight ? "text-magenta" : "text-success"}`} aria-label="Inclus" />;
    if (v === false) return <X className="w-5 h-5 mx-auto text-muted-foreground/40" aria-label="Non inclus" />;
    return <span className="text-sm font-medium">{v}</span>;
  };

  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-sm font-semibold text-magenta uppercase tracking-wider">Comparatif détaillé</span>
        <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl">La différence en un coup d'œil</h3>
        <p className="mt-3 text-muted-foreground text-sm">Toutes les fonctionnalités, comparées côte à côte.</p>
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <caption className="sr-only">Comparatif des formules OneTap</caption>
          <thead>
            <tr className="bg-muted/40">
              <th scope="col" className="p-5 font-semibold text-sm text-muted-foreground w-[40%]">Fonctionnalité</th>
              {offers.map((o) => (
                <th
                  key={o.key}
                  scope="col"
                  className={`p-5 text-center align-bottom ${o.highlight ? "bg-magenta/5 relative" : ""}`}
                >
                  {o.highlight && (
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-magenta text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                      ⭐ {o.badge}
                    </span>
                  )}
                  <div className="font-display font-bold text-lg mt-3">{o.name}</div>
                  <div className={`font-display font-extrabold text-2xl mt-1 ${o.highlight ? "text-magenta" : ""}`}>{o.price}</div>
                  {!o.highlight && <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{o.badge}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <React.Fragment key={i}>
                {r.group && (
                  <tr className="bg-muted/20">
                    <th scope="colgroup" colSpan={4} className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {r.group}
                    </th>
                  </tr>
                )}
                <tr className="border-t border-border/60">
                  <th scope="row" className="p-4 text-sm font-medium text-foreground">{r.label}</th>
                  {r.values.map((v, j) => (
                    <td key={j} className={`p-4 text-center ${offers[j].highlight ? "bg-magenta/5" : ""}`}>
                      {cell(v, offers[j].highlight)}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}

            <tr className="border-t border-border/60 bg-muted/20">
              <td className="p-4" />
              {offers.map((o) => (
                <td key={o.key} className={`p-4 text-center ${o.highlight ? "bg-magenta/5" : ""}`}>
                  <button
                    onClick={() => triggerCheckout("#offres")}
                    className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition ${
                      o.highlight
                        ? "bg-magenta text-white hover:bg-magenta/90"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    Choisir <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked feature list per offer */}
      <div className="md:hidden space-y-4">
        {[...offers]
          .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
          .map((o) => {
            const idx = offers.findIndex((x) => x.key === o.key);
            return (
              <details
                key={o.key}
                open={!!o.highlight}
                className={`rounded-2xl border bg-card p-5 ${o.highlight ? "border-magenta/50 shadow-lg ring-1 ring-magenta/20" : "border-border"}`}
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div>
                    <div className="font-display font-bold">{o.name}</div>
                    <div className={`font-display font-extrabold text-xl ${o.highlight ? "text-magenta" : ""}`}>{o.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${o.highlight ? "bg-magenta text-white" : "bg-muted text-muted-foreground"}`}>
                      {o.badge}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition group-open:rotate-180" />
                  </div>
                </summary>
                <ul className="mt-4 space-y-2">
                  {rows.map((r, i) => {
                    const v = r.values[idx];
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {v === true ? (
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${o.highlight ? "text-magenta" : "text-success"}`} />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground/40" />
                        )}
                        <span className={v ? "text-foreground" : "text-muted-foreground/60 line-through"}>
                          {r.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() => triggerCheckout("#offres")}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2 font-bold py-3 rounded-lg ${
                    o.highlight ? "bg-magenta text-white" : "bg-foreground text-background"
                  }`}
                >
                  Choisir {o.name} <ArrowRight className="w-4 h-4" />
                </button>
              </details>
            );
          })}
      </div>

    </div>
  );
}

function OfferCard({

  name, tagline, oldPrice, price, badge, features, cta, subCta, highlight,
  stockLeft, stockTotal, valueStack,
}: {
  name: string; tagline: string; oldPrice: string; price: string;
  badge: string; cta: string; subCta?: string; highlight?: boolean;
  features: { t: string; v: boolean }[];
  stockLeft?: number; stockTotal?: number;
  valueStack?: { t: string; v: string }[];
}) {
  const stockPct = stockLeft && stockTotal ? Math.max(8, Math.round((stockLeft / stockTotal) * 100)) : null;
  const totalValue = valueStack
    ? valueStack.reduce((sum, v) => sum + (parseInt(v.v.replace(/[^\d]/g, ""), 10) || 0), 0)
    : null;

  return (
    <div
      className={`relative w-full rounded-3xl p-7 flex flex-col ${
        highlight
          ? "bg-gradient-brand text-primary-foreground shadow-glow border-2 border-magenta/40"
          : "bg-card border border-border shadow-card"
      }`}
    >
      <div
        className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
          highlight ? "bg-white/20 text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        {badge}
      </div>
      <h3 className={`mt-4 font-display font-bold text-2xl`}>{name}</h3>
      <p className={`mt-1 text-sm ${highlight ? "opacity-90" : "text-muted-foreground"}`}>{tagline}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className={`text-sm line-through ${highlight ? "opacity-60" : "text-muted-foreground"}`}>{oldPrice}</span>
        <span className="font-display font-extrabold text-5xl">{price}</span>
      </div>
      <p className={`text-xs ${highlight ? "opacity-80" : "text-muted-foreground"}`}>Paiement unique · TTC</p>

      {totalValue && (
        <p className={`mt-2 text-xs font-semibold ${highlight ? "text-primary-foreground/90" : "text-magenta"}`}>
          Valeur totale {totalValue}€ — vous économisez {totalValue - parseFloat(price.replace(",", ".")) | 0}€
        </p>
      )}

      <a
        href="#offres"
        onClick={(e) => { e.preventDefault(); triggerCheckout("#offres"); }}
        className={`mt-6 block text-center px-5 py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98] ${
          highlight
            ? "bg-background text-foreground hover:scale-[1.02] shadow-card"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {cta}
      </a>
      {subCta && (
        <p className={`mt-2 text-center text-xs ${highlight ? "opacity-80" : "text-muted-foreground"}`}>{subCta}</p>
      )}

      {stockPct !== null && (
        <div className={`mt-5 ${highlight ? "" : ""}`}>
          <div className={`flex justify-between text-xs font-medium mb-1.5 ${highlight ? "opacity-90" : "text-foreground"}`}>
            <span>🔥 Plus que {stockLeft} places au tarif lancement</span>
            <span className={highlight ? "opacity-75" : "text-muted-foreground"}>{stockPct}%</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${highlight ? "bg-white/20" : "bg-secondary"}`}>
            <div
              className={`h-full rounded-full ${highlight ? "bg-white" : "bg-gradient-brand"}`}
              style={{ width: `${stockPct}%` }}
            />
          </div>
        </div>
      )}

      <ul className="mt-7 space-y-3">
        {features.map((f) => (
          <li key={f.t} className={`flex items-start gap-2.5 text-sm ${!f.v && (highlight ? "opacity-50" : "text-muted-foreground")}`}>
            {f.v ? (
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? "text-primary-foreground" : "text-success"}`} strokeWidth={3} />
            ) : (
              <X className="w-4 h-4 mt-0.5 shrink-0 opacity-60" />
            )}
            <span>{f.t}</span>
          </li>
        ))}
      </ul>

      {valueStack && (
        <div className={`mt-6 pt-5 border-t ${highlight ? "border-white/20" : "border-border"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${highlight ? "opacity-90" : "text-muted-foreground"}`}>
            Ce que vous obtenez
          </p>
          <ul className="space-y-1.5">
            {valueStack.map((v) => (
              <li key={v.t} className="flex justify-between text-sm">
                <span className={highlight ? "opacity-90" : "text-foreground/80"}>{v.t}</span>
                <span className={`line-through ${highlight ? "opacity-60" : "text-muted-foreground"}`}>{v.v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────  FEATURES  ──────────────────────────── */

function Features() {
  const items = [
    { icon: Smartphone, t: "Sans appli à télécharger", d: "Vos contacts ouvrent votre carte instantanément, sur n'importe quel téléphone." },
    { icon: Zap, t: "Activation en 3 minutes", d: "Un éditeur ultra simple. Aucune compétence technique requise." },
    { icon: BarChart3, t: "Suivez votre impact", d: "Vues, clics, contacts ajoutés — mesurez vraiment vos rencontres (offre Premium)." },
    { icon: Leaf, t: "100% éco-responsable", d: "Plus de cartes papier jetées. Une seule carte digitale à vie." },
    { icon: Shield, t: "Vos données protégées", d: "Hébergement européen, RGPD, vous restez propriétaire de tout." },
    { icon: TrendingUp, t: "Conçu pour convertir", d: "Boutons d'action optimisés pour transformer un contact en client." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-gradient-soft">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Tout ce qu'il faut. <span className="text-gradient">Rien de superflu.</span>
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.t} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
                <it.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-display font-bold text-lg">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  SOCIAL PROOF BAND  ──────────────────────────── */

function SocialProofBand() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-soft border-y border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Rating block */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-card">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-foreground">4,9/5</span>
              <span className="text-muted-foreground text-xs">· 487 avis vérifiés</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Noté <strong className="text-foreground">4,9/5</strong> sur la base de 487 avis clients vérifiés post-achat.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BadgeCheck className="w-5 h-5 text-success" />
              <span>Avis vérifiés</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Shield className="w-5 h-5 text-success" />
              <span>Garantie 30 jours</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Award className="w-5 h-5 text-success" />
              <span>Satisfaction 98%</span>
            </div>
          </div>

          {/* Mini testimonials */}
          <div className="space-y-3">
            {[
              { name: "Sophie M.", text: "3 nouveaux clients en 15 jours", avatar: "/avatars/sophie.jpg" },
              { name: "Karim L.", text: "Mes prospects me retrouvent tout de suite", avatar: "/avatars/karim.jpg" },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2 shadow-sm">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" loading="lazy" width={32} height={32} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.text}</p>
                </div>
                <ThumbsUp className="w-4 h-4 text-success shrink-0 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  TESTIMONIALS  ──────────────────────────── */

function Testimonials() {
  const testimonials = [
    {
      name: "Sophie Morel",
      role: "Coach business & entrepreneuriat",
      location: "Lyon, France",
      quote: "J'ai distribué ma carte digitale lors d'un salon professionnel. Résultat : 3 nouveaux clients signés en 15 jours, alors qu'avant je récoltais des cartes papier que personne ne recontactait. Le ROI est instantané.",
      metric: "3 clients en 15 jours",
      metricLabel: "Depuis le passage au digital",
      avatar: "/avatars/sophie.jpg",
      rating: 5,
      verified: true,
    },
    {
      name: "Karim Lahbabi",
      role: "Agent immobilier indépendant",
      location: "Marseille, France",
      quote: "En immobilier, la rapidité compte. Quand je tends mon téléphone pour un tap NFC, les prospects sont bluffés. Mes informations sont à jour en temps réel, et je peux suivre qui consulte ma carte. Je ne reviendrai jamais au papier.",
      metric: "+40% de rappels",
      metricLabel: "vs cartes papier",
      avatar: "/avatars/karim.jpg",
      rating: 5,
      verified: true,
    },
    {
      name: "Élodie Rousseau",
      role: "Designer freelance & directrice artistique",
      location: "Bordeaux, France",
      quote: "En tant que designer, l'esthétique est primordiale. Ma carte OneTap reflète parfaitement mon univers créatif. Les clients potentiels me disent systématiquement 'wow' quand je la partage. C'est devenu un argument de vente à part entière.",
      metric: "100% de retours positifs",
      metricLabel: "sur l'image professionnelle",
      avatar: "/avatars/elodie.jpg",
      rating: 5,
      verified: true,
    },
    {
      name: "Thomas Bernard",
      role: "Consultant en stratégie digitale",
      location: "Paris, France",
      quote: "J'ai testé 3 solutions de cartes digitales avant de trouver OneTap. La différence ? La simplicité. Je configure les cartes de toute mon équipe en quelques clics, et les analytics me permettent de mesurer notre visibilité réelle.",
      metric: "5 cartes gérées",
      metricLabel: "pour mon équipe commerciale",
      avatar: "/avatars/thomas.jpg",
      rating: 5,
      verified: true,
    },
  ];

  return (
    <section id="avis" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-card mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-foreground">4,9/5</span>
            <span className="text-muted-foreground text-sm">· 487 avis vérifiés</span>
            <BadgeCheck className="w-4 h-4 text-success" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Des résultats concrets. <span className="text-gradient">Pas juste des mots.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chaque avis ci-dessous est vérifié post-achat. Nous ne publions que les retours de clients réels ayant utilisé leur carte.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative bg-card border border-border rounded-2xl p-6 lg:p-7 shadow-card hover:shadow-glow transition-all"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />

              {/* Stars + verified */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                    <BadgeCheck className="w-3 h-3" /> Achat vérifié
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 leading-relaxed text-[15px]">
                "{t.quote}"
              </blockquote>

              {/* Metric result */}
              <div className="mt-5 inline-flex items-center gap-2 bg-gradient-soft border border-border rounded-xl px-4 py-2.5">
                <TrendingUp className="w-4 h-4 text-magenta" />
                <span className="font-bold text-foreground text-sm">{t.metric}</span>
                <span className="text-muted-foreground text-xs">{t.metricLabel}</span>
              </div>

              {/* Author */}
              <figcaption className="mt-5 flex items-center gap-3 pt-5 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                  <div className="text-xs text-muted-foreground/70">{t.location}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-magenta" />
            <span><strong className="text-foreground">487</strong> avis clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-magenta" />
            <span><strong className="text-foreground">2 400+</strong> professionnels actifs</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-magenta" />
            <span><strong className="text-foreground">98%</strong> de satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-magenta" />
            <span>Avis 100% vérifiés post-achat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  COMPARISON  ──────────────────────────── */

function Comparison() {
  const rows = [
    ["Coût annuel moyen", "120€+ (réimpressions)", "19,80€ payés une fois"],
    ["Mises à jour", "Réimpression complète", "Illimitées en 1 clic"],
    ["Mesure d'impact", "Aucune", "Vues, clics, contacts"],
    ["Impact écologique", "Papier jeté", "Zéro déchet"],
    ["Effet sur prospects", "Banal", "Wow effect"],
  ];
  return (
    <section className="py-20 lg:py-28 bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Papier vs. <span className="text-gradient">OneTap</span>
          </h2>
        </div>
        <div className="mt-10 bg-card border border-border rounded-3xl overflow-hidden shadow-card">
          <div className="grid grid-cols-3 bg-secondary text-sm font-semibold">
            <div className="p-4"></div>
            <div className="p-4 text-center text-muted-foreground">Carte papier</div>
            <div className="p-4 text-center bg-gradient-brand text-primary-foreground">OneTap</div>
          </div>
          {rows.map(([label, a, b], i) => (
            <div key={i} className={`grid grid-cols-3 text-sm border-t border-border ${i % 2 ? "bg-background" : ""}`}>
              <div className="p-4 font-medium">{label}</div>
              <div className="p-4 text-center text-muted-foreground">{a}</div>
              <div className="p-4 text-center font-semibold text-foreground bg-accent/30">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  FAQ  ──────────────────────────── */

function FAQ() {
  const items = [
    { q: "Comment fonctionne la carte digitale à 19,80€ ?", a: "Vous recevez immédiatement l'accès à votre éditeur. En 3 minutes, vous créez votre profil (photo, infos, réseaux, liens). Un QR code et un lien unique sont générés : partagez-les sur votre téléphone, signature mail, présentations, etc." },
    { q: "Y a-t-il un abonnement caché ?", a: "Non. Vous payez 19,80€ une seule fois. Modifications illimitées à vie incluses. Aucun frais récurrent." },
    { q: "Quelle est la différence avec l'offre physique à 28,80€ ?", a: "L'offre Physique inclut tout l'essentiel + une carte NFC premium livrée chez vous. Un simple tap sur le téléphone de votre contact ouvre votre carte digitale." },
    { q: "Compatible avec iPhone et Android ?", a: "Oui, 100%. Aucune application à télécharger, votre carte s'ouvre directement dans le navigateur." },
    { q: "Et si je ne suis pas satisfait ?", a: "Vous êtes remboursé sous 30 jours, sans question. Zéro risque." },
    { q: "Mes données sont-elles protégées ?", a: "Oui, hébergement européen, conformité RGPD, vous restez 100% propriétaire de vos données." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Questions <span className="text-gradient">fréquentes</span></h2>
        </div>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold"
              >
                <span>{it.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  FINAL CTA  ──────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand text-primary-foreground p-10 sm:p-16 text-center shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_white_0%,_transparent_50%)] opacity-10" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold">
              <Users className="w-4 h-4" /> Rejoignez 2 400+ pros
            </div>
            <h2 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl leading-tight">
              Votre prochaine rencontre<br className="hidden sm:block" /> mérite mieux qu'un papier.
            </h2>
            <p className="mt-5 text-lg opacity-90 max-w-xl mx-auto">
              Créez votre carte digitale en 3 minutes. Sans abonnement. Garantie 30 jours.
            </p>
            <a
              href="#offres"
              onClick={onCheckoutClick}
              className="mt-8 inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-card hover:scale-[1.03] transition-all"
            >
              Créer ma carte — 19,80€
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs opacity-80">Paiement sécurisé · Activation immédiate · Satisfait ou remboursé</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  FOOTER + STICKY  ──────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">OneTap</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition">Mentions légales</a>
          <a href="#" className="hover:text-foreground transition">CGV</a>
          <a href="#" className="hover:text-foreground transition">Confidentialité</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 280);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const el = document.querySelector("#offres");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setHide(e.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visible = show && !hide;




  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-3 mb-2 bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-brand text-primary-foreground px-3 py-1.5 text-[11px] font-semibold flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            🔥 Plus que 47 places à -40%
          </span>
          <Countdown />
        </div>
        <a
          href="#offres"
          onClick={(e) => { e.preventDefault(); triggerCheckout("#offres"); }}
          className="flex items-center gap-3 p-2.5 active:scale-[0.98] transition-transform"
        >
          <div className="flex flex-col items-start pl-1.5 shrink-0">
            <span className="text-[10px] text-muted-foreground line-through leading-none">33€</span>
            <span className="font-display font-extrabold text-xl leading-tight text-foreground">19,80€</span>
            <span className="text-[10px] text-success font-semibold leading-none">-13,20€</span>
          </div>
          <div className="flex-1 bg-gradient-cta text-primary-foreground rounded-xl py-3 px-3 text-center shadow-glow">
            <div className="font-bold text-[15px] leading-tight flex items-center justify-center gap-1.5">
              Créer ma carte
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="text-[10px] opacity-90 mt-0.5 flex items-center justify-center gap-1">
              <Shield className="w-2.5 h-2.5" /> Garantie 30j · Activation immédiate
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
