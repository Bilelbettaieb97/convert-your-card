import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, Mail, ArrowRight, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — Carte Visite Digitale" },
      { name: "description", content: "Connecte-toi à ton compte Carte Visite Digitale." },
    ],
  }),
  component: ConnexionPage,
});

function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Entre ton adresse email");
      return;
    }
    setSending(true);
    try {
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: `${appUrl}/dashboard` },
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("rate limit") || msg.toLowerCase().includes("seconds")) {
        toast.error("Trop de tentatives — attends 1 minute avant de réessayer");
      } else {
        toast.error(msg || "Impossible d'envoyer le lien, réessaie");
      }
    } finally {
      setSending(false);
    }
  }

  async function handleResend() {
    setSending(true);
    try {
      const appUrl = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: `${appUrl}/dashboard` },
      });
      if (error) throw error;
      toast.success("Lien renvoyé !");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(msg.toLowerCase().includes("rate limit") || msg.toLowerCase().includes("seconds")
        ? "Attends encore 1 minute avant de renvoyer"
        : msg || "Impossible de renvoyer"
      );
    } finally {
      setSending(false);
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

          {!sent ? (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7">
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                Connexion
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                On t'envoie un lien magique dans ta boîte email.
              </p>

              <div className="space-y-4">
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
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                    placeholder="ton@email.com"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {sending ? "Envoi…" : (
                    <>Recevoir mon lien de connexion <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-card p-7 text-center">
              <div className="w-14 h-14 bg-magenta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-magenta" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Vérifie ta boîte email</h2>
              <p className="text-sm text-muted-foreground mb-1">Lien envoyé à</p>
              <p className="text-sm font-semibold text-foreground mb-6 break-all">{email}</p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={sending}
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
