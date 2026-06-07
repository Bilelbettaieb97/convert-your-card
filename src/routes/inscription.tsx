import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, ShieldCheck, Lock, Users, Star, Quote, TrendingUp, Award, Mail, ArrowLeft } from "lucide-react";

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

async function handleGoogleSignIn(redirectPath: string) {
  const redirectTo = (typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app") + redirectPath;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) throw error;
}

function InscriptionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function sendOtp(targetEmail: string) {
    const redirectTo = (typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app") + "/inscription/selection-de-plan";
    const { error } = await supabase.auth.signInWithOtp({
      email: targetEmail,
      options: {
        shouldCreateUser: true,
        data: { marketing_opt_in: optIn },
        emailRedirectTo: redirectTo,
      },
    });
    if (error) throw error;
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      await sendOtp(parsed.data);
      setEmail(parsed.data);
      setStep("otp");
      toast.success("Code envoyé ! Vérifie ta boîte mail.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerified() {
    toast.success("Compte créé ! Bienvenue 🎉");
    navigate({ to: "/inscription/selection-de-plan" });
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
              {step === "email" ? (
                <EmailStep
                  email={email}
                  setEmail={setEmail}
                  optIn={optIn}
                  setOptIn={setOptIn}
                  submitting={submitting}
                  onSubmit={handleEmailSubmit}
                />
              ) : (
                <OtpStep
                  email={email}
                  onBack={() => setStep("email")}
                  onResend={() => sendOtp(email)}
                  onVerified={handleVerified}
                />
              )}
            </div>

            {step === "email" && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Tu as déjà un compte ?{" "}
                <Link to="/connexion" className="text-magenta font-semibold hover:underline">
                  Connecte-toi
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Colonne Droite — CRO desktop */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center px-12 py-16 overflow-hidden bg-gradient-to-br from-[#1a0b2e]/90 via-[#2d1b4e]/80 to-[#1a0b2e]/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-magenta rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet rounded-full blur-[140px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={<Users className="w-5 h-5 text-magenta" />} iconBg="bg-magenta/20" value="+12 400" label="Professionnels utilisent OneTap chaque jour" />
              <StatCard icon={<Star className="w-5 h-5 text-amber-400" />} iconBg="bg-amber-500/20" value="4.9/5" label="Note moyenne sur +2 800 avis vérifiés" />
              <StatCard icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} iconBg="bg-emerald-500/20" value="+340 %" label="De contacts échangés en moyenne" />
              <StatCard icon={<Award className="w-5 h-5 text-violet-300" />} iconBg="bg-violet/30" value="#1" label="Appli carte de visite en France" />
            </div>

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

function StatCard({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string; label: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>{icon}</div>
        <span className="text-2xl font-display font-bold text-white">{value}</span>
      </div>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  );
}

function EmailStep({
  email, setEmail, optIn, setOptIn, submitting, onSubmit,
}: {
  email: string; setEmail: (v: string) => void; optIn: boolean; setOptIn: (v: boolean) => void;
  submitting: boolean; onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
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

        <form onSubmit={onSubmit} className="space-y-4">
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
            En cliquant sur Continue, tu acceptes la politique de confidentialité, les conditions générales et la politique relative aux cookies de OneTap.
          </p>
        </form>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          type="button"
          onClick={() => handleGoogleSignIn("/inscription/selection-de-plan").catch((e) => toast.error(e.message ?? "Erreur Google"))}
          className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-card"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuer avec Google
        </button>
      </div>
    </>
  );
}

function OtpStep({
  email, onBack, onResend,
}: {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  onVerified: () => void;
}) {
  const [cooldown, setCooldown] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleResend() {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      await onResend();
      toast.success("Lien renvoyé !");
      setCooldown(60);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Impossible d'envoyer le lien");
    } finally {
      setResending(false);
    }
  }

  return (
    <>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Modifier l'e-mail
      </button>

      <div className="w-14 h-14 rounded-2xl bg-magenta/10 flex items-center justify-center mb-5">
        <Mail className="w-7 h-7 text-magenta" />
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
        Vérifie ton e-mail !
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        On vient d'envoyer un lien de connexion à<br />
        <span className="font-semibold text-foreground">{email}</span>
      </p>

      <div className="mt-6 bg-muted/50 rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
        <p className="font-semibold text-foreground mb-1">Comment ça marche ?</p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Ouvre ton email (même boîte spam)</li>
          <li>Clique sur le bouton <span className="font-semibold text-foreground">« Se connecter »</span></li>
          <li>Tu seras automatiquement redirigé ici</li>
        </ol>
      </div>

      <div className="mt-5 text-center text-xs text-muted-foreground">
        Tu n'as rien reçu ?{" "}
        <button
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="text-magenta font-semibold hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
        >
          {cooldown > 0 ? `Renvoyer dans ${cooldown}s` : resending ? "Envoi…" : "Renvoyer le lien"}
        </button>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Pense à vérifier ton dossier spam.
        </div>
      </div>
    </>
  );
}
