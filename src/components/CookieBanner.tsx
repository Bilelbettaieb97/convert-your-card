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
      className={`fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="bg-background border border-border shadow-2xl rounded-2xl px-5 py-5">

        {/* Header */}
        <p className="text-base font-bold text-foreground leading-snug mb-3">
          Salut, c'est nous… les cookies ! 🍪
        </p>

        {/* Body */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          On a attendu d'être sûrs que le site t'intéresse avant de te déranger, mais on aimerait bien t'accompagner pendant ta visite… C'est OK pour toi ?{" "}
          <a href="/cookies" className="text-[#c026d3] hover:underline">
            En savoir plus
          </a>
        </p>

        {/* CTA */}
        <button
          onClick={() => dismiss("accepted")}
          className="w-full rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity mb-2"
        >
          Ok pour moi ✨
        </button>

        {/* Refuse */}
        <button
          onClick={() => dismiss("refused")}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          Continuer sans accepter
        </button>

      </div>
    </div>
  );
}
