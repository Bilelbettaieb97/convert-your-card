import { useState, useEffect } from "react";

const CONSENT_KEY = "cyk.cookie-consent";

export function loadAnalytics() {
  if (typeof window === "undefined") return;
  const w = window as any;

  if (!document.getElementById("ga4-script")) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function (...args: any[]) { w.dataLayer.push(args); };
    w.gtag("js", new Date());
    w.gtag("config", "G-97N9NYKHD0");
    const ga = document.createElement("script");
    ga.id = "ga4-script";
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-97N9NYKHD0";
    document.head.appendChild(ga);
  }

  if (!document.getElementById("meta-pixel") && !w.fbq) {
    const n: any = (w.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!w._fbq) w._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const fb = document.createElement("script");
    fb.id = "meta-pixel";
    fb.async = true;
    fb.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(fb);
    w.fbq("init", "2460619001098990");
    w.fbq("track", "PageView");
  }
}

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") { loadAnalytics(); return; }
    if (stored === "refused") return;

    const timer = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss(choice: "accepted" | "refused") {
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
    localStorage.setItem(CONSENT_KEY, choice);
    if (choice === "accepted") loadAnalytics();
  }

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background border-t border-border shadow-2xl px-5 py-5 md:px-8 md:py-6 max-w-3xl mx-auto md:mb-4 md:rounded-2xl md:border md:shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-base font-bold text-foreground leading-snug">
            Salut, c'est nous… les cookies ! 🍪
          </p>
          <button
            onClick={() => dismiss("refused")}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors whitespace-nowrap shrink-0 mt-0.5"
          >
            Continuer sans accepter
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          On a attendu d'être sûrs que le site t'intéresse avant de te déranger, mais on aimerait bien t'accompagner pendant ta visite… C'est OK pour toi ?{" "}
          <a href="/cookies" className="text-[#c026d3] hover:underline">
            En savoir plus
          </a>
        </p>

        {/* Footer note + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/70">
            Tu peux modifier tes préférences à tout moment via le lien "Cookies" en bas de page.
          </p>
          <button
            onClick={() => dismiss("accepted")}
            className="shrink-0 rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
          >
            Accepter les cookies ✨
          </button>
        </div>

      </div>
    </div>
  );
}
