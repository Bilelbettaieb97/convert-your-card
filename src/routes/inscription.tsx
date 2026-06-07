import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Zap, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — OneTap" },
      { name: "description", content: "Crée ton compte OneTap gratuitement." },
    ],
  }),
  component: InscriptionPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "8 caractères minimum" }),
});

function InscriptionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      // Create user server-side (email_confirm: true, no confirmation email)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email, password: parsed.data.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Erreur lors de la création du compte");
        return;
      }

      // Sign in immediately
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (signInError) {
        toast.error(signInError.message);
        return;
      }

      navigate({ to: "/inscription/selection-de-plan" });
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setSubmitting(false);
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
            <span className="font-display font-bold text-xl">OneTap</span>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-card p-7">
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Créer un compte
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Gratuit, sans engagement, sans carte bancaire.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c026d3]/40 focus:border-[#c026d3] transition"
                    placeholder="8 caractères minimum"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-60 mt-2"
              >
                {submitting ? "Création du compte…" : "Créer mon compte"}
              </button>
            </form>

            <div className="mt-5 flex items-center gap-4 text-[11px] text-muted-foreground justify-center">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100 % gratuit
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Sans engagement
              </span>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Tu as déjà un compte ?{" "}
            <Link to="/connexion" className="text-[#c026d3] font-semibold hover:underline">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
