import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/AuthShell";
import { Toaster } from "@/components/ui/sonner";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";

async function handleGoogleSignIn(redirectPath: string) {
  const redirectTo = (typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app") + redirectPath;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) throw error;
}

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
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function sendOtp(targetEmail: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email: targetEmail,
      options: { shouldCreateUser: false },
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

  function handleVerified() {
    toast.success("Bienvenue !");
    navigate({ to: "/dashboard" });
  }

  return (
    <>
      <Toaster />
      <AuthShell
        title={step === "email" ? "Connecte-toi" : "Vérifie ton e-mail"}
        subtitle={
          step === "email"
            ? "Entre ton email pour recevoir un code de connexion."
            : undefined
        }
        footer={
          <>
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-magenta font-semibold hover:underline">
              Inscris-toi gratuitement
            </Link>
          </>
        }
      >
        {step === "email" ? (
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
              {submitting ? "Envoi…" : "Recevoir le code"}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            type="button"
            onClick={() => handleGoogleSignIn("/dashboard").catch((e) => toast.error(e instanceof Error ? e.message : "Erreur Google"))}
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
        ) : (
          <OtpStep
            email={email}
            onBack={() => setStep("email")}
            onResend={() => sendOtp(email)}
            onVerified={handleVerified}
          />
        )}
      </AuthShell>
    </>
  );
}

function OtpStep({
  email, onBack, onResend, onVerified,
}: {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  onVerified: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function verify(code: string) {
    setVerifying(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) throw error;
      onVerified();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Code invalide ou expiré");
      setDigits(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  }

  function handleChange(idx: number, value: string) {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[idx] = "";
      setDigits(next);
      return;
    }
    if (clean.length > 1) {
      const chars = clean.slice(0, 6 - idx).split("");
      const next = [...digits];
      chars.forEach((c, i) => { next[idx + i] = c; });
      setDigits(next);
      const lastFilled = Math.min(idx + chars.length, 5);
      inputsRef.current[lastFilled]?.focus();
      const joined = next.join("");
      if (joined.length === 6) verify(joined);
      return;
    }
    const next = [...digits];
    next[idx] = clean;
    setDigits(next);
    if (idx < 5) inputsRef.current[idx + 1]?.focus();
    const joined = next.join("");
    if (joined.length === 6) verify(joined);
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  async function handleResend() {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      await onResend();
      toast.success("Nouveau code envoyé !");
      setCooldown(30);
      setDigits(["", "", "", "", "", ""]);
      setError(null);
      inputsRef.current[0]?.focus();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Impossible d'envoyer le code");
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

      <div className="w-12 h-12 rounded-2xl bg-magenta/10 flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-magenta" />
      </div>

      <p className="mt-1 text-sm text-muted-foreground mb-6">
        Code envoyé à <span className="font-semibold text-foreground">{email}</span>
      </p>

      <div className="flex gap-2 justify-between">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={d}
            disabled={verifying}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:border-magenta focus:ring-2 focus:ring-magenta/30 transition disabled:opacity-60"
          />
        ))}
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-500 font-medium">{error}</p>
      )}

      {verifying && (
        <p className="mt-3 text-xs text-muted-foreground">Vérification…</p>
      )}

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Tu n'as rien reçu ?{" "}
        <button
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="text-magenta font-semibold hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
        >
          {cooldown > 0 ? `Renvoyer dans ${cooldown}s` : resending ? "Envoi…" : "Renvoyer le code"}
        </button>
      </div>

      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Pense à vérifier ton dossier spam si tu ne trouves pas l'e-mail.
        </div>
      </div>
    </>
  );
}
