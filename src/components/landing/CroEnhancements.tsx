import { useEffect, useState } from "react";
import { Shield, X, Sparkles, Check, ShoppingBag, MapPin, Gift, RefreshCw, Lock, Headphones } from "lucide-react";

/* ─────────────  LIVE ACTIVITY FEED  ───────────── */

const ACTIVITY = [
  { name: "Marie", city: "Paris", offer: "CVD Essentielle", time: "il y a 2 min" },
  { name: "Lucas", city: "Lyon", offer: "CVD Physique", time: "il y a 6 min" },
  { name: "Sophia", city: "Bordeaux", offer: "CVD Essentielle", time: "il y a 11 min" },
  { name: "Karim", city: "Marseille", offer: "CVD Premium", time: "il y a 14 min" },
  { name: "Emma", city: "Nantes", offer: "CVD Essentielle", time: "il y a 22 min" },
  { name: "Antoine", city: "Toulouse", offer: "CVD Essentielle", time: "il y a 28 min" },
];

export function LiveActivity() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((p) => (p + 1) % ACTIVITY.length);
        setVisible(true);
      }, 600);
    }, 7000);
    return () => clearInterval(cycle);
  }, [visible]);

  const a = ACTIVITY[i];

  return (
    <div
      aria-hidden={!visible}
      className={`hidden sm:block fixed left-4 bottom-6 z-40 max-w-[18rem] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="bg-card border border-border rounded-2xl shadow-2xl p-3 pr-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {a.name} <span className="text-muted-foreground font-normal">vient de commander</span>
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {a.offer} · <MapPin className="inline w-3 h-3 -mt-0.5" /> {a.city} · {a.time}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────  EXIT-INTENT MODAL  ───────────── */

const EXIT_KEY = "cvd_exit_intent_seen";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (sessionStorage.getItem(EXIT_KEY)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem(EXIT_KEY, "1");
        setOpen(true);
        document.removeEventListener("mouseleave", onLeave);
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseleave", onLeave), 8000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-card rounded-3xl overflow-hidden shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Fermer"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center z-10 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-gradient-brand text-primary-foreground p-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
            <Gift className="w-3.5 h-3.5" /> Offre exclusive
          </div>
          <h3 className="mt-3 font-display font-extrabold text-2xl leading-tight">
            Avant de partir…<br />
            <span className="opacity-90">-10€ supplémentaires</span>
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Recevez votre code promo par e-mail.<br />
            Carte digitale à <strong>9,80€</strong> au lieu de 19,80€.
          </p>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-success/15 flex items-center justify-center">
                <Check className="w-6 h-6 text-success" strokeWidth={3} />
              </div>
              <p className="mt-3 font-semibold">Code envoyé !</p>
              <p className="text-sm text-muted-foreground">Vérifiez votre boîte mail.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                setSent(true);
              }}
              className="space-y-3"
            >
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-gradient-cta text-primary-foreground font-semibold py-3 rounded-xl shadow-glow hover:scale-[1.02] transition"
              >
                Recevoir mon code -10€
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                Sans spam. Désinscription en 1 clic.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────  GUARANTEE BLOCK  ───────────── */

export function GuaranteeBlock() {
  const items = [
    { icon: RefreshCw, t: "Garantie 30 jours", d: "Pas convaincu ? Remboursé intégralement, sans question." },
    { icon: Lock, t: "Paiement sécurisé", d: "Stripe · CB, Apple Pay, Google Pay. Vos données chiffrées." },
    { icon: Sparkles, t: "Activation immédiate", d: "Accès à votre éditeur dès le paiement. Aucune attente." },
    { icon: Headphones, t: "Support humain", d: "Une équipe basée en France, réponse en moins de 4h." },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-soft border border-border p-8 sm:p-12">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="grid lg:grid-cols-5 gap-10 items-center relative">
            {/* Badge */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-brand shadow-glow mb-5">
                <Shield className="w-12 h-12 text-primary-foreground" strokeWidth={2} />
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                Zéro risque.<br />
                <span className="text-gradient">100% garanti.</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Vous testez votre carte pendant 30 jours. Si elle ne vous convient pas, nous vous remboursons intégralement — sans justification.
              </p>
            </div>

            {/* Items */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {items.map((it) => (
                <div key={it.t} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <it.icon className="w-5 h-5 text-magenta" />
                  </div>
                  <h3 className="mt-3 font-display font-bold text-base">{it.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────  JSON-LD STRUCTURED DATA  ───────────── */

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "CVD — Carte de visite digitale",
        description:
          "Carte de visite digitale professionnelle. Partagez vos contacts en 1 tap. Sans abonnement, mises à jour illimitées à vie.",
        brand: { "@type": "Brand", name: "CVD" },
        offers: [
          {
            "@type": "Offer",
            name: "CVD Essentielle",
            price: "19.80",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "CVD Physique",
            price: "28.80",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "CVD Premium",
            price: "48.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "487",
          bestRating: "5",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Comment fonctionne la carte digitale à 19,80€ ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous recevez immédiatement l'accès à votre éditeur. En 3 minutes, vous créez votre profil. Un QR code et un lien unique sont générés pour partager vos coordonnées en 1 tap.",
            },
          },
          {
            "@type": "Question",
            name: "Y a-t-il un abonnement caché ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non. Vous payez 19,80€ une seule fois. Modifications illimitées à vie incluses.",
            },
          },
          {
            "@type": "Question",
            name: "Et si je ne suis pas satisfait ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous êtes remboursé sous 30 jours, sans question. Zéro risque.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
