import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, Eye, EyeOff, ArrowRight, Mail, RefreshCw } from "lucide-react";

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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { toast.error("Entre ton adresse email"); return; }
    if (!password) { toast.error("Entre ton mot de passe"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: trimmed, password });
      if (error) throw error;
      navigate({ to: "/dashboard" });
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
      const msg = err instanceof Error ? err.message : "";
      toast.error(msg || "Impossible d'envoyer l'email, réessaie");
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
        </div>
      </div>
    </>
  );
}
