import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, Check, Shield, X } from "lucide-react";

/* Imperative trigger — usable from any CTA */
type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();

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
  // Auto-close after a beat — but only if the user hasn't engaged with the sheet
  // (we mark engagement when focus moves inside it via keyboard / screen reader).
  window.setTimeout(() => {
    if (!sheetEngaged) listeners.forEach((l) => l(false));
  }, 1100);
}

// Tracks whether keyboard / SR focus has entered the sheet — prevents auto-close
// stealing focus mid-announcement on VoiceOver / TalkBack.
let sheetEngaged = false;

/* Bindable click handler for <a href="#offres"> */
export const onCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
  const [liveMessage, setLiveMessage] = useState("");
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = "checkout-sheet-title";
  const descId = "checkout-sheet-desc";

  useEffect(() => {
    const l: Listener = (o) => setOpen(o);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  // Animate top progress bar
  useEffect(() => {
    if (!open) { setProgress(0); return; }
    setProgress(8);
    const a = window.setTimeout(() => setProgress(48), 80);
    const b = window.setTimeout(() => setProgress(82), 320);
    const c = window.setTimeout(() => setProgress(96), 700);
    const d = window.setTimeout(() => setProgress(100), 1000);
    return () => { [a, b, c, d].forEach(clearTimeout); };
  }, [open]);

  // Lock body scroll and mark background inert for screen readers
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mark every direct sibling of #root (and root's siblings) inert so VoiceOver
    // / TalkBack can't escape the modal. We toggle the attribute on the main
    // landmark when present — falls back to <body>'s children.
    const main = document.querySelector("main");
    if (main) main.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = originalOverflow;
      if (main) main.removeAttribute("inert");
    };
  }, [open]);

  // Announce open / close politely
  useEffect(() => {
    if (open) {
      setLiveMessage("Préparation de votre commande en cours, connexion au paiement sécurisé.");
    } else if (liveMessage) {
      setLiveMessage("Commande prête, redirection vers les offres.");
      const t = window.setTimeout(() => setLiveMessage(""), 1500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Focus management: trap inside sheet, restore on close
  useEffect(() => {
    if (!open) {
      sheetEngaged = false;
      if (previouslyFocused.current) {
        try { previouslyFocused.current.focus(); } catch {}
        previouslyFocused.current = null;
      }
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement;
    const sheet = sheetRef.current;
    if (!sheet) return;

    // Move focus to the close button so SR users land on a labelled control.
    // requestAnimationFrame ensures the dialog has painted before focusing.
    const raf = requestAnimationFrame(() => {
      (closeBtnRef.current ?? sheet).focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      sheetEngaged = true;
      const elements = Array.from(
        sheet.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onFocusIn = () => { sheetEngaged = true; };
    sheet.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      sheet.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Escape closes the sheet
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        listeners.forEach((l) => l(false));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeSheet = useCallback(() => {
    listeners.forEach((l) => l(false));
  }, []);

  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) closeSheet();
  }, [closeSheet]);

  return (
    <>
      {/* Live region for screen readers — assertive on close so the redirection is heard */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      {/* Top progress bar — visual only */}
      <div
        aria-hidden="true"
        className={`fixed top-0 inset-x-0 z-[120] h-[3px] pointer-events-none transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-full bg-gradient-cta shadow-[0_0_12px_rgba(217,70,239,0.7)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile skeleton sheet */}
      <div
        ref={backdropRef}
        onClick={onBackdropClick}
        className={`md:hidden fixed inset-0 z-[115] flex items-end transition-all duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        {...(!open && { "aria-hidden": "true" })}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" aria-hidden="true" />

        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          className={`relative w-full bg-card rounded-t-3xl border-t border-border shadow-2xl p-5 transition-transform duration-500 focus:outline-none ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto w-10 h-1 rounded-full bg-muted mb-4" aria-hidden="true" />

          {/* Close button — gives SR users a labelled control + 44×44 tap target */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeSheet}
            aria-label="Fermer la fenêtre de préparation de commande"
            className="absolute top-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-3 pr-12">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0" aria-hidden="true">
              <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
            </div>
            <div className="min-w-0">
              <h2 id={titleId} className="font-display font-bold text-base leading-tight">
                Préparation de votre commande…
              </h2>
              <p id={descId} className="text-xs text-muted-foreground">
                Connexion au paiement sécurisé
              </p>
            </div>
          </div>

          {/* Skeleton order summary */}
          <div className="mt-5 rounded-2xl border border-border p-4 space-y-3" aria-hidden="true">
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
              <div className="h-3 w-16 rounded bg-foreground/80" />
              <div className="font-display font-extrabold text-lg text-foreground">19,80€</div>
            </div>
          </div>
          {/* SR-only equivalent of the summary so the total is still announced */}
          <p className="sr-only">Total à payer : 19 euros et 80 centimes.</p>

          {/* Reassurance row */}
          <ul className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground" aria-label="Garanties">
            <li className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Shield className="w-3.5 h-3.5 text-success" aria-hidden="true" />
              <span>Sécurisé</span>
            </li>
            <li className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
              <span>Garantie 30j</span>
            </li>
            <li className="flex items-center gap-1.5 justify-center bg-secondary rounded-lg py-2">
              <Loader2 className="w-3.5 h-3.5 text-magenta animate-spin" aria-hidden="true" />
              <span>Instantané</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* Shimmering skeleton primitive — exported for reuse */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
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
