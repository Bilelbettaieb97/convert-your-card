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
        footer={
          <>
            Tu as déjà un compte ?{" "}
            <Link to="/connexion" className="text-magenta font-semibold hover:underline">
              Connecte-toi
            </Link>
          </>
        }
      >
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
      </AuthShell>
    </>
  );
}
