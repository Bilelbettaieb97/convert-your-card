import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, Eye, EyeOff, ArrowRight, Mail, RefreshCw } from "lucide-react";

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

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — Carte Visite Digitale" },
      { name: "description", content: "Connecte-toi à ton compte Carte Visite Digitale." },
    ],
  }),
  component: ConnexionPage,
});

type View = "login" | "forgot" | "forgot-sent";

function ConnexionPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { toast.error("Entre ton adresse email"); return; }
    if (!password) { toast.error("Entre ton mot de passe"); return; }
    setLoading(true);
    try {
      const { error, data: { session } } = await supabase.auth.signInWithPassword({ email: trimmed, password });
      if (error) throw error;
      const userId = session?.user?.id;
      if (userId) {
        const { data: profile } = await supabase
          .from("nfc_profiles")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();
        navigate({ to: profile ? "/dashboard" : "/builderia" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("invalid login") || msg.toLowerCase().includes("invalid credentials")) {
        toast.error("Email ou mot de passe incorrect");
      } else {
        toast.error(msg || "Impossible de te connecter, réessaie");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Entre ton adresse email");
      return;
    }
    setLoading(true);
    try {
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: `${appUrl}/reset-password`,
      });
      if (error) throw error;
      setView("forgot-sent");
    } catch (err) {
      const msg = (err instanceof Error ? err.message : "").toLowerCase();
      if (msg.includes("rate limit") || msg.includes("email rate")) {
        toast.error("Trop d'emails envoyés — attends quelques minutes avant de réessayer");
      } else if (msg.includes("seconds") || msg.includes("minute")) {
        toast.error("Attends encore un moment avant de renvoyer un email");
      } else {
        toast.error("Impossible d'envoyer l'email, réessaie dans quelques minutes");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-sm leading-tight">Carte Visite Digitale</span>
          </div>

          {/* ── Vue : connexion ── */}
          {view === "login" && (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7">
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Connexion</h1>
              <p className="text-sm text-muted-foreground mb-6">Bienvenue de retour.</p>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition disabled:opacity-60 mb-5"
              >
                <GoogleIcon />
                {googleLoading ? "Redirection…" : "Continuer avec Google"}
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                    placeholder="ton@email.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Mot de passe
                    </label>
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs text-[#c026d3] hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? "Connexion…" : (<>Se connecter <ArrowRight className="w-4 h-4" /></>)}
                </button>
              </form>
            </div>
          )}

          {/* ── Vue : mot de passe oublié ── */}
          {view === "forgot" && (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7">
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Mot de passe oublié</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Entre ton email et on t'envoie un lien pour créer un nouveau mot de passe.
              </p>

              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Adresse email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                    placeholder="ton@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {loading ? "Envoi…" : "Envoyer le lien de réinitialisation"}
                </button>

                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition text-center"
                >
                  ← Retour à la connexion
                </button>
              </form>
            </div>
          )}

          {/* ── Vue : email envoyé ── */}
          {view === "forgot-sent" && (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7 text-center">
              <div className="w-14 h-14 bg-[#c026d3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#c026d3]" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Vérifie ta boîte email</h2>
              <p className="text-sm text-muted-foreground mb-1">Lien envoyé à</p>
              <p className="text-sm font-semibold text-foreground mb-6 break-all">{email}</p>
              <p className="text-xs text-muted-foreground mb-6">
                Clique sur le lien dans l'email pour créer un nouveau mot de passe.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleForgot}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition disabled:opacity-50"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Renvoyer le lien
                </button>
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-xs text-muted-foreground hover:text-foreground transition underline underline-offset-2"
                >
                  Retour à la connexion
                </button>
              </div>
            </div>
          )}

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Pas de mot de passe ?{" "}
            <Link to="/inscription" className="text-[#c026d3] font-semibold hover:underline">
              Reçois un lien de connexion
            </Link>
          </p>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-[#c026d3] font-semibold hover:underline">
              Inscris-toi ici
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
