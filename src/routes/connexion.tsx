import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AuthShell, SocialButtons, Divider } from "@/components/auth/AuthShell";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — OneTap" },
      { name: "description", content: "Connecte-toi à ton compte OneTap pour gérer ta carte de visite digitale." },
      { property: "og:title", content: "Connexion — OneTap" },
      { property: "og:description", content: "Accède à ton espace OneTap en un clic." },
    ],
  }),
  component: ConnexionPage,
});

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "L'email est requis" })
  .email({ message: "Email invalide" })
  .max(255);

function ConnexionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      toast.success("Lien de connexion envoyé — vérifie tes emails.");
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
        title="Connecte-toi"
        subtitle="Heureux de te revoir ! Entre ton email pour recevoir un lien de connexion."
        footer={
          <>
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-magenta font-semibold hover:underline">
              Inscris-toi gratuitement
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-cta text-primary-foreground rounded-full py-3 text-sm font-semibold shadow-card hover:shadow-glow transition-all disabled:opacity-60"
          >
            {submitting ? "Envoi…" : "Recevoir le lien"}
          </button>
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
