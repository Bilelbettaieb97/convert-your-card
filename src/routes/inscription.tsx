import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AuthShell, SocialButtons, Divider } from "@/components/auth/AuthShell";
import { Toaster } from "@/components/ui/sonner";

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
      <AuthShell
        title="Inscris-toi gratuitement !"
        subtitle="Carte de visite digitale, sans engagement, sans carte bancaire."
        footer={
          <>
            Tu as déjà un compte ?{" "}
            <Link to="/connexion" className="text-magenta font-semibold hover:underline">
              Connecte-toi
            </Link>
          </>
        }
      >
        {/* Badge de confiance */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            100 % gratuit
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
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

        {/* Social proof / Témoignage */}
        <div className="mt-6 pt-5 border-t border-border">
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
        </div>

        {/* Logos de confiance */}
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
      </AuthShell>
    </>
  );
}
