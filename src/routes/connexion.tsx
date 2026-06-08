import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, Eye, EyeOff, Mail } from "lucide-react";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — CVD" },
      { name: "description", content: "Connecte-toi à ton compte CVD." },
    ],
  }),
  component: ConnexionPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Email invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

function ConnexionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [sendingMagic, setSendingMagic] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (error) {
        toast.error("Email ou mot de passe incorrect");
        return;
      }
      const { data: profile } = await supabase
        .from("nfc_profiles")
        .select("id")
        .eq("user_id", authData.user.id)
        .maybeSingle();
      navigate({ to: profile ? "/dashboard" : "/onboarding" });
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMagicLink() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Entre ton email d'abord");
      return;
    }
    setSendingMagic(true);
    try {
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: `${appUrl}/dashboard` },
      });
      if (error) throw error;
      setMagicSent(true);
    } catch {
      toast.error("Impossible d'envoyer le lien");
    } finally {
      setSendingMagic(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
          </div>

          {magicSent ? (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7 text-center">
              <div className="w-14 h-14 bg-magenta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-magenta" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Vérifie ta boîte email</h2>
              <p className="text-sm text-muted-foreground mb-1">Lien envoyé à</p>
              <p className="text-sm font-semibold text-foreground mb-5 break-all">{email}</p>
              <button
                type="button"
                onClick={() => setMagicSent(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition underline underline-offset-2"
              >
                Retour
              </button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7">
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                Connexion
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                Content de te revoir !
              </p>

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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                  placeholder="ton@email.com"
                />
              </div>

              {/* Magic link — primary */}
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={sendingMagic}
                className="w-full mt-4 bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {sendingMagic ? "Envoi…" : "Recevoir un lien de connexion"}
              </button>

              {/* Separator */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">ou avec mot de passe</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Password — secondary */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                    placeholder="Ton mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-border text-foreground rounded-full py-2.5 text-sm font-medium hover:bg-muted transition-all disabled:opacity-60"
                >
                  {submitting ? "Connexion…" : "Se connecter avec mot de passe"}
                </button>
              </form>
            </div>
          )}

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-[#c026d3] font-semibold hover:underline">
              Inscris-toi gratuitement
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
