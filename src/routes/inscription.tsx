import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AuthShell, SocialButtons, Divider } from "@/components/auth/AuthShell";
import { Toaster } from "@/components/ui/sonner";
import { Zap, ShieldCheck, Lock, Users, Star, Quote, TrendingUp, Award } from "lucide-react";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription gratuite — OneTap" },
      { name: "description", content: "Crée ton compte OneTap gratuitement et lance ta carte de visite digitale en quelques secondes." },
      { property: "og:title", content: "Inscription gratuite — OneTap" },
      { property: "og:description", content: "Rejoins +2 400 pros qui partagent leurs contacts en 1 tap." },
    ],
  }),
  component: InscriptionPage,
});

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "L'email est requis" })
  .email({ message: "Email invalide" })
  .max(255);

function InscriptionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: parsed.data,
        options: {
          emailRedirectTo: `${window.location.origin}/inscription/selection-de-plan`,
          data: { marketing_opt_in: optIn },
        },
      });
      if (error) throw error;
      toast.success("Vérifie ta boîte mail pour confirmer ton inscription.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setSocialLoading(provider);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Connexion impossible");
        return;
      }
      if (result.redirected) return;
      toast.success("Bienvenue !");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setSocialLoading(null);
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
            <span className="font-display font-bold text-lg">OneTap</span>
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
              <span className="font-display font-bold text-xl">OneTap</span>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">
                Rejoins OneTap
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Inscris-toi gratuitement !
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Carte de visite digitale, sans engagement, sans carte bancaire.
              </p>

              <div className="mt-6">
                {/* Badges de confiance — visibles partout */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100 % gratuit
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    <Lock className="w-3.5 h-3.5" />
                    Sans engagement
                  </span>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
                      placeholder="ton.email@exemple.com"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optIn}
                      onChange={(e) => setOptIn(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-border accent-magenta"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      J'accepte de recevoir des offres, actualités et mises à jour de OneTap.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-cta text-primary-foreground rounded-full py-3 text-sm font-semibold shadow-card hover:shadow-glow transition-all disabled:opacity-60"
                  >
                    {submitting ? "Envoi…" : "Continue"}
                  </button>

                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    En cliquant sur Continue, tu acceptes la politique de confidentialité, les conditions générales et la politique relative aux cookies de OneTap, et tu acceptes de recevoir des offres, des actualités et des mises à jour.
                  </p>
                </form>

                <Divider label="OU" />

                <SocialButtons
                  onGoogle={() => handleOAuth("google")}
                  onApple={() => handleOAuth("apple")}
                  loading={socialLoading}
                />

                {/* Trust compact — visible uniquement sur mobile/tablette */}
                <div className="mt-6 pt-5 border-t border-border lg:hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-card bg-gradient-brand flex items-center justify-center text-[9px] font-bold text-primary-foreground"
                          style={{ zIndex: 5 - i }}
                        >
                          {["JD","MK","AL","SR"][i-1]}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-medium">4.9/5 — +12 400 professionnels</span>
                    </div>
                  </div>
                  <blockquote className="text-xs text-muted-foreground italic leading-relaxed">
                    « J'ai créé ma carte en 2 minutes. Mes clients la scanne directement. C'est devenu indispensable pour mon activité. »
                    <span className="block mt-1 not-italic font-semibold text-foreground">— Sarah R., Consultante freelance</span>
                  </blockquote>

                  <div className="mt-5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
                      Ils utilisent OneTap
                    </p>
                    <div className="flex items-center justify-center gap-4 opacity-60 grayscale">
                      <span className="font-display font-bold text-sm tracking-tight text-foreground">KPMG</span>
                      <span className="font-display font-bold text-sm tracking-tight text-foreground">Deloitte</span>
                      <span className="font-display font-bold text-sm tracking-tight text-foreground">BNP</span>
                      <span className="font-display font-bold text-sm tracking-tight text-foreground">L'Oréal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Tu as déjà un compte ?{" "}
              <Link to="/connexion" className="text-magenta font-semibold hover:underline">
                Connecte-toi
              </Link>
            </p>
          </div>
        </div>

        {/* Colonne Droite — Éléments de confiance CRO (desktop uniquement) */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center px-12 py-16 overflow-hidden bg-gradient-to-br from-[#1a0b2e]/90 via-[#2d1b4e]/80 to-[#1a0b2e]/90">
          {/* Fond décoratif */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-magenta rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet rounded-full blur-[140px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-magenta/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-magenta" />
                  </div>
                  <span className="text-2xl font-display font-bold text-white">+12 400</span>
                </div>
                <p className="text-sm text-white/60">Professionnels utilisent OneTap chaque jour</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-2xl font-display font-bold text-white">4.9/5</span>
                </div>
                <p className="text-sm text-white/60">Note moyenne sur +2 800 avis vérifiés</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-display font-bold text-white">+340 %</span>
                </div>
                <p className="text-sm text-white/60">De contacts échangés en moyenne</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-violet/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-violet-300" />
                  </div>
                  <span className="text-2xl font-display font-bold text-white">#1</span>
                </div>
                <p className="text-sm text-white/60">Appli carte de visite en France</p>
              </div>
            </div>

            {/* Témoignage en vedette */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Quote className="w-8 h-8 text-magenta/60 mb-3" />
              <blockquote className="text-lg text-white/90 leading-relaxed font-medium">
                « J'ai créé ma carte en 2 minutes. Mes clients la scanne directement. C'est devenu indispensable pour mon activité. »
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-primary-foreground">
                  SR
                </div>
                <div>
                  <p className="text-white font-semibold">Sarah R.</p>
                  <p className="text-white/50 text-sm">Consultante freelance · Paris</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Logos de confiance */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-white/40 font-medium mb-4">
                Ils font confiance à OneTap
              </p>
              <div className="flex items-center justify-center gap-8 opacity-50">
                <span className="font-display font-bold text-xl tracking-tight text-white/70">KPMG</span>
                <span className="font-display font-bold text-xl tracking-tight text-white/70">Deloitte</span>
                <span className="font-display font-bold text-xl tracking-tight text-white/70">BNP</span>
                <span className="font-display font-bold text-xl tracking-tight text-white/70">L'Oréal</span>
              </div>
            </div>

            {/* Sécurité */}
            <div className="flex items-center justify-center gap-6 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                RGPD conforme
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Chiffrement SSL
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
