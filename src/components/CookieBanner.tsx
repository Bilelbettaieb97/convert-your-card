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
    }, 1200);
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
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-xl p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          On utilise des cookies analytiques et publicitaires pour améliorer le site.{" "}
          <a href="/cookies" className="text-[#c026d3] hover:underline whitespace-nowrap">
            En savoir plus
          </a>
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => dismiss("refused")}
            className="flex-1 text-sm rounded-xl border border-border px-3 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={() => dismiss("accepted")}
            className="flex-1 text-sm rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white font-medium px-3 py-2 hover:opacity-90 transition-opacity"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
