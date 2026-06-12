import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isDisposableEmail } from "@/lib/is-disposable-email";
import { Toaster } from "@/components/ui/sonner";
import { Zap, ShieldCheck, Lock, Users, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { DEFAULT_CARD, type CardData } from "@/lib/card-types";

const DEMO_CARD: CardData = {
  ...DEFAULT_CARD,
  name: "Marc Brun",
  title: "Plombier · Dépannage 24h/24",
  agency: "",
  area: "Paris & Île-de-France",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  coverPhoto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
  accent: "navy",
  actions: { call: true, whatsapp: true, email: true, website: false, rdv: false },
  statsEnabled: true,
  stats: [
    { label: "Interventions", value: "1 200+" },
    { label: "Note clients", value: "4.9 ★" },
    { label: "Disponible", value: "24h/24" },
  ],
  aboutEnabled: true,
  bio: "Plombier certifié à Paris depuis 10 ans. Dépannage urgent, rénovation salle de bain, installation sanitaire. Devis gratuit sous 2h.",
  badges: [
    { id: "b1", label: "Certifié RGE" },
    { id: "b2", label: "Devis gratuit" },
    { id: "b3", label: "Urgence 24h" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Dépannage urgent", description: "Intervention en moins d'1 heure, 7j/7, 24h/24." },
    { id: "s2", title: "Rénovation salle de bain", description: "Conception et pose complète, carrelage inclus." },
    { id: "s3", title: "Détection de fuites", description: "Caméra thermique, sans destruction." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Sophie M.", role: "Paris 15e", text: "Intervention en 45 min un dimanche soir. Tarif honnête et travail soigné.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Karim B.", role: "Boulogne", text: "A détecté une fuite que deux autres plombiers avaient ratée. Excellent.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Prendre RDV",
  calendarUrl: "https://calendly.com/demo",
  ctaEnabled: true,
  ctaTitle: "Urgence plomberie ?",
  ctaText: "Disponible maintenant. Devis gratuit en 2 minutes.",
  ctaButtonLabel: "Appeler maintenant",
  ctaButtonUrl: "tel:+33600000000",
  phone: "+33600000000",
  phoneDisplay: "06 00 00 00 00",
  email: "marc@plomberie-brun.fr",
  website: "",
  whatsapp: "33600000000",
  socialsEnabled: false,
  linkedin: "",
  instagram: "",
  whatsappSocial: "",
  videoEnabled: false,
  videoTitle: "",
  videoUrl: "",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  listings: [],
  languagesEnabled: false,
  languages: [],
  vcardEnabled: true,
  contactEnabled: true,
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" fill="#1877F2">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

export const Route = createFileRoute("/inscription/")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Inscription — Carte Visite Digitale" },
      { name: "description", content: "Crée ta carte de visite digitale gratuitement en 30 secondes. Aucun mot de passe requis." },
      { property: "og:title", content: "Inscription — Carte Visite Digitale" },
      { property: "og:description", content: "Rejoins +2 400 pros qui partagent leurs contacts en 1 tap." },
    ],
  }),
  component: InscriptionPage,
});

function InscriptionPage() {
  const search = Route.useSearch();
  const phoneRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scroller = phoneRef.current?.querySelector(".overflow-y-auto") as HTMLElement | null;
      if (scroller) scroller.scrollTop += e.deltaY;
    };
    const handleClick = (e: MouseEvent) => e.stopPropagation();
    overlay.addEventListener("wheel", handleWheel, { passive: false });
    overlay.addEventListener("click", handleClick, true);
    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      overlay.removeEventListener("click", handleClick, true);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${appUrl}/auth/callback` },
    });
    if (error) {
      toast.error("Impossible de se connecter avec Google");
      setGoogleLoading(false);
    }
  }

  async function handleFacebookLogin() {
    setFacebookLoading(true);
    const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${appUrl}/auth/callback` },
    });
    if (error) {
      toast.error("Impossible de se connecter avec Facebook");
      setFacebookLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Adresse email invalide");
      return;
    }
    if (isDisposableEmail(trimmed)) {
      toast.error("Les adresses email temporaires ne sont pas acceptées. Utilise ton email professionnel ou personnel.");
      return;
    }
    setSubmitting(true);
    try {
      const redirectPath = search.redirect ?? "/builderia";
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const emailRedirectTo = `${appUrl}${redirectPath}`;

      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo },
      });

      if (error) throw error;
      setSent(true);
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setSubmitting(true);
    try {
      const redirectPath = search.redirect ?? "/builderia";
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: `${appUrl}${redirectPath}` },
      });
      if (error) throw error;
      toast.success("Lien renvoyé !");
    } catch {
      toast.error("Impossible de renvoyer le lien");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-soft flex flex-col lg:flex-row">
        {/* Header mobile */}
        <header className="lg:hidden px-4 py-5">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
          </Link>
        </header>

        {/* Colonne Gauche — Formulaire */}
        <div className="flex-1 flex items-start sm:items-center justify-center px-4 pb-12 lg:pb-0">
          <div className="w-full max-w-md">
            {/* Logo desktop */}
            <div className="hidden lg:flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
            </div>

            {!sent ? (
              <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">
                  Commence en 30 secondes
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Crée ton espace gratuitement
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Aucun mot de passe. On t'envoie un lien direct dans ta boîte email.
                </p>

                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100 % gratuit
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      <Lock className="w-3.5 h-3.5" />
                      Sans mot de passe
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 mb-4">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={googleLoading || facebookLoading}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition disabled:opacity-60"
                    >
                      <GoogleIcon />
                      {googleLoading ? "Redirection…" : "Continuer avec Google"}
                    </button>
                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      disabled={facebookLoading || googleLoading}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition disabled:opacity-60"
                    >
                      <FacebookIcon />
                      {facebookLoading ? "Redirection…" : "Continuer avec Facebook"}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">ou par email</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Ton adresse email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
                        placeholder="ton@email.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-cta text-primary-foreground rounded-full py-3 text-sm font-semibold shadow-card hover:shadow-glow transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        "Envoi en cours…"
                      ) : (
                        <>
                          Recevoir mon lien de connexion
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      En continuant, tu acceptes nos conditions générales et notre politique de confidentialité.
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-magenta/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-8 h-8 text-magenta" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Vérifie ta boîte email
                </h2>
                <p className="text-sm text-muted-foreground mb-1">
                  On a envoyé un lien de connexion à
                </p>
                <p className="text-sm font-semibold text-foreground mb-6 break-all">{email}</p>

                <div className="bg-muted/40 rounded-xl p-4 mb-6 text-left space-y-2">
                  <p className="text-xs font-medium text-foreground">Comment ça marche :</p>
                  <p className="text-xs text-muted-foreground">1. Ouvre ta boîte email</p>
                  <p className="text-xs text-muted-foreground">2. Clique sur le lien dans l'email de Carte Visite Digitale</p>
                  <p className="text-xs text-muted-foreground">3. Tu es connecté et tu peux commencer !</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Renvoyer le lien
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setEmail(""); }}
                    className="text-xs text-muted-foreground hover:text-foreground transition underline underline-offset-2"
                  >
                    Changer l'adresse email
                  </button>
                </div>
              </div>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Tu as déjà un compte ?{" "}
              <Link to="/connexion" className="text-magenta font-semibold hover:underline">
                Connecte-toi
              </Link>
            </p>
          </div>
        </div>

        {/* Colonne Droite */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center px-10 py-12 overflow-hidden bg-gradient-to-br from-[#1a0b2e]/90 via-[#2d1b4e]/80 to-[#1a0b2e]/90">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-magenta rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet rounded-full blur-[140px]" />
          </div>

          {/* Layout 2 colonnes : phone gauche · contenu droite */}
          <div className="relative z-10 w-full flex gap-8 items-center">

            {/* ── Phone (gauche) ── */}
            <div className="shrink-0 relative self-stretch flex items-center">
              {/* Container à taille fixe : clip le phone scaled */}
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_0_60px_rgba(192,38,211,0.25)]"
                style={{ width: 218, height: 448 }}>
                <div ref={phoneRef} style={{ transform: "scale(0.605)", transformOrigin: "top left", width: 360 }}>
                  <PhoneFrame>
                    <BusinessCard data={DEMO_CARD} />
                  </PhoneFrame>
                </div>
                {/* Overlay : bloque les clics, forward le scroll via useEffect */}
                <div ref={overlayRef} className="absolute inset-0 z-10 cursor-default" />
              </div>
              {/* Badge flottant */}
              <div className="absolute -top-2 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap z-10">
                ✓ En ligne
              </div>
            </div>

            {/* ── Contenu (droite) ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">

              {/* Titre */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-magenta/80 font-semibold mb-2">Ce que tu vas obtenir</p>
                <h2 className="text-xl font-bold text-white leading-snug">
                  Ta carte pro partageable en&nbsp;1 lien,<br />créée par l'IA en 30 secondes.
                </h2>
              </div>

              {/* 3 étapes */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/35 font-semibold">Après ton inscription</p>
                {[
                  { num: "1", label: "Décris ton activité en 1 phrase", detail: "L'IA génère bio, services, avis et thème." },
                  { num: "2", label: "Ta carte est prête en 30 sec", detail: "Photo, agenda Calendly, stats — tout automatique." },
                  { num: "3", label: "Tu partages, tes clients t'appellent", detail: "WhatsApp · Instagram · Email · QR code." },
                ].map(({ num, label, detail }) => (
                  <div key={num} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5">
                      {num}
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-semibold leading-snug">{label}</p>
                      <p className="text-white/45 text-[11px] mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Séparateur */}
              <div className="h-px bg-white/10" />

              {/* 3 mini témoignages */}
              <div className="space-y-2">
                {[
                  { initials: "MB", name: "Marc B.", role: "Plombier · Paris", text: "+40% de contacts en 2 semaines. Mes clients appellent direct depuis la carte." },
                  { initials: "CL", name: "Céline L.", role: "Coach · Lyon", text: "Mon lien CVD en bio Instagram. Ça convertit bien mieux que les cartes papier." },
                  { initials: "TK", name: "Thomas K.", role: "Photographe · Bordeaux", text: "Créé en 3 min. Les mariés réservent directement via mon agenda intégré." },
                ].map(({ initials, name, role, text }) => (
                  <div key={name} className="flex gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c026d3]/60 to-[#7c3aed]/60 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-white text-[11px] font-semibold">{name}</span>
                        <span className="text-white/35 text-[10px]">{role}</span>
                        <span className="ml-auto text-amber-400 text-[9px]">★★★★★</span>
                      </div>
                      <p className="text-white/55 text-[10px] leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges sécurité */}
              <div className="flex items-center gap-5 text-white/30 text-[11px] pt-1 border-t border-white/10">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />RGPD</span>
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" />SSL</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />+2 400 pros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

