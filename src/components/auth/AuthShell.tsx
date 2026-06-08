import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <header className="px-4 py-5 sm:py-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">CVD</span>
        </Link>
      </header>
      <main className="flex-1 flex items-start sm:items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">
              Rejoins CVD
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
            <div className="mt-6">{children}</div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </main>
    </div>
  );
}

export function SocialButtons({
  onGoogle,
  onApple,
  loading,
}: {
  onGoogle: () => void;
  onApple: () => void;
  loading?: string | null;
}) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onGoogle}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-3 border border-border bg-background hover:bg-accent rounded-full py-2.5 text-sm font-semibold text-foreground transition disabled:opacity-60"
      >
        <GoogleIcon />
        {loading === "google" ? "Connexion…" : "Continue avec Google"}
      </button>
      <button
        type="button"
        onClick={onApple}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-3 border border-border bg-background hover:bg-accent rounded-full py-2.5 text-sm font-semibold text-foreground transition disabled:opacity-60"
      >
        <AppleIcon />
        {loading === "apple" ? "Connexion…" : "Continue avec Apple"}
      </button>
    </div>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.12A6.55 6.55 0 0 1 5.5 12c0-.74.13-1.45.34-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.96l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.46 2.23-1.22 3.01-.82.85-2.15 1.5-3.23 1.41-.14-1.12.43-2.27 1.16-3 .82-.84 2.21-1.46 3.29-1.42zM20.5 17.21c-.55 1.27-.82 1.83-1.53 2.96-1 1.57-2.42 3.53-4.17 3.55-1.56.01-1.96-1.01-4.07-1-2.12.01-2.56 1.02-4.12 1.01-1.76-.02-3.1-1.79-4.1-3.36C-.27 16.36-.55 11.05 1.42 8.21 2.81 6.19 5 4.99 7.05 4.99c2.09 0 3.4 1.14 5.13 1.14 1.68 0 2.7-1.14 5.12-1.14 1.83 0 3.77.99 5.15 2.71-4.53 2.48-3.79 8.94-1.95 9.51z" />
    </svg>
  );
}
