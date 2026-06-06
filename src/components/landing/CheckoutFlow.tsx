import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, Check, Shield } from "lucide-react";

/* Imperative trigger — usable from any CTA */
type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();
let lastTrigger: HTMLElement | null = null;

export function triggerCheckout(targetHash = "#offres") {
  listeners.forEach((l) => l(true));
  // Haptic
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { (navigator as Navigator & { vibrate: (p: number) => void }).vibrate(12); } catch {}
  }
  // Smooth scroll after a brief skeleton beat (perceived speed)
  window.setTimeout(() => {
    const el = document.querySelector(targetHash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 650);
  window.setTimeout(() => listeners.forEach((l) => l(false)), 1100);
}

/* Bindable click handler for <a href="#offres"> */
export const onCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  lastTrigger = e.currentTarget;
  const href = e.currentTarget.getAttribute("href") || "#offres";
  if (href.startsWith("#")) {
    e.preventDefault();
    triggerCheckout(href);
  }
};

/* ────────────  COMPONENT  ──────────── */

export function CheckoutFlow() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = "checkout-sheet-title";

  useEffect(() => {
    const l: Listener = (o) => setOpen(o);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  // Animate top progress bar 0 → 92 → 100
  useEffect(() => {
    if (!open) { setProgress(0); return; }
    setProgress(8);
    const a = window.setTimeout(() => setProgress(48), 80);
    const b = window.setTimeout(() => setProgress(82), 320);
    const c = window.setTimeout(() => setProgress(96), 700);
    const d = window.setTimeout(() => setProgress(100), 1000);
    return () => { [a, b, c, d].forEach(clearTimeout); };
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = originalOverflow; };
    }
  }, [open]);

  // Focus trap + initial focus + restore on close
  useEffect(() => {
    if (!open) {
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
        previouslyFocused.current = null;
      }
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement;

    const sheet = sheetRef.current;
    if (!sheet) return;

    // Focus first focusable element inside sheet
    const focusable = sheet.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) {
      focusable[0].focus();
    } else {
      sheet.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const elements = Array.from(
        sheet.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Escape closes the sheet
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        listeners.forEach((l) => l(false));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Click backdrop to close
  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      listeners.forEach((l) => l(false));
    }
  }, []);

  return (
    <>
      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {open ? "Préparation de votre commande en cours, connexion au paiement sécurisé." : ""}
      </div>

      {/* Top progress bar — all viewports */}
      <div
        aria-hidden
        className={`fixed top-0 inset-x-0 z-[120] h-[3px] pointer-events-none transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-full bg-gradient-cta shadow-[0_0_12px_rgba(217,70,239,0.7)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile skeleton sheet — shown only during transition on small screens */}
      <div
        ref={backdropRef}
        onClick={onBackdropClick}
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-[115] flex items-end transition-all duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={`relative w-full bg-card rounded-t-3xl border-t border-border shadow-2xl p-5 transition-transform duration-500 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto w-10 h-1 rounded-full bg-muted mb-4" />

          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0" aria-hidden>
              <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
            </div>
            <div className="min-w-0">
              <p id={titleId} className="font-display font-bold text-base leading-tight">Préparation de votre commande…</p>
              <p className="text-xs text-muted-foreground">Connexion au paiement sécurisé</p>
            </div>
          </div>

          {/* Skeleton order summary */}
          <div className="mt-5 rounded-2xl border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-foreground/80" aria-hidden />
              <div className="font-display font-extrabold text-lg text-foreground" aria-label="Total à payer : 19,80 euros">19,80€</div>
            </div>
          </div>

          {/* Reassurance row */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Shield className="w-3.5 h-3.5 text-success" aria-hidden />
              <span>Sécurisé</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Check className="w-3.5 h-3.5 text-success" aria-hidden />
              <span>Garantie 30j</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Loader2 className="w-3.5 h-3.5 text-magenta animate-spin" aria-hidden />
              <span>Instantané</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Shimmering skeleton primitive — exported for reuse */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden rounded bg-muted ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, color-mix(in oklab, var(--foreground) 8%, transparent), transparent)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.4s infinite",
      }}
    />
  );
}
