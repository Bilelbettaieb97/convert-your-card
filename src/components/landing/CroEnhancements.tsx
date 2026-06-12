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
            <span className="opacity-90">2 mois offerts</span>
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Choisissez le plan annuel et économisez 2 mois.<br />
            À partir de <strong>8,16€/mois</strong> au lieu de 9,80€.
          </p>
        </div>

        <div className="p-6 space-y-3">
          <a
            href="/inscription"
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground font-semibold py-3.5 rounded-xl shadow-glow hover:scale-[1.02] transition text-sm"
          >
            Démarrer ma période d'essai
          </a>
          <p className="text-[11px] text-muted-foreground text-center">
            Essai gratuit 3 jours · Sans carte bancaire · Annulable à tout moment
          </p>
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
        "@type": "Organization",
        "@id": "https://cartevisitedigitale.fr/#organization",
        name: "CVD — Carte de visite digitale",
        url: "https://cartevisitedigitale.fr",
        logo: "https://cartevisitedigitale.fr/logo.png",
        description: "Créez votre carte de visite digitale professionnelle en 3 minutes. Partagez vos coordonnées, réseaux et prise de RDV en 1 tap. Compatible iPhone & Android sans application.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "487",
          bestRating: "5",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://cartevisitedigitale.fr/#website",
        url: "https://cartevisitedigitale.fr",
        name: "CVD — Carte de visite digitale",
        publisher: { "@id": "https://cartevisitedigitale.fr/#organization" },
        inLanguage: "fr-FR",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://cartevisitedigitale.fr/templates?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Product",
        "@id": "https://cartevisitedigitale.fr/#product",
        name: "CVD — Carte de visite digitale",
        url: "https://cartevisitedigitale.fr",
        image: "https://cartevisitedigitale.fr/og-image.jpg",
        description: "Carte de visite digitale professionnelle. Partagez vos contacts, réseaux sociaux et prise de rendez-vous en 1 tap. Compatible iPhone & Android sans application.",
        brand: { "@type": "Brand", name: "CVD" },
        offers: [
          {
            "@type": "Offer",
            name: "CVD Essentielle",
            price: "9.80",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "9.80",
              priceCurrency: "EUR",
              unitCode: "MON",
            },
            availability: "https://schema.org/InStock",
            url: "https://cartevisitedigitale.fr/pricing",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "FR",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
          },
          {
            "@type": "Offer",
            name: "CVD Vitrine",
            price: "13.16",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "13.16",
              priceCurrency: "EUR",
              unitCode: "MON",
            },
            availability: "https://schema.org/InStock",
            url: "https://cartevisitedigitale.fr/pricing",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "FR",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
          },
          {
            "@type": "Offer",
            name: "Carte connectée physique",
            price: "29.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://cartevisitedigitale.fr/carte-physique",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "FR",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
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
            name: "Qu'est-ce qu'une carte de visite digitale ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Une carte de visite digitale est une page web personnalisée accessible via un QR code ou un lien unique. Elle permet de partager vos coordonnées, réseaux sociaux, site web et prise de rendez-vous en 1 tap depuis un smartphone, sans que votre contact ait besoin d'une application.",
            },
          },
          {
            "@type": "Question",
            name: "Comment fonctionne la carte de visite digitale CVD ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous créez votre profil en 3 minutes dans notre éditeur. Un QR code et un lien unique sont générés. Vous partagez ce QR code sur vos supports physiques (carte papier, email, signature) ou envoyez le lien par message. Votre contact accède à votre carte instantanément sans application.",
            },
          },
          {
            "@type": "Question",
            name: "La carte de visite digitale fonctionne-t-elle sans application ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui. Votre carte s'ouvre directement dans le navigateur de n'importe quel smartphone — iPhone, Android, ou autre. Aucune application à télécharger ni pour vous ni pour vos contacts.",
            },
          },
          {
            "@type": "Question",
            name: "Puis-je modifier ma carte après activation ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, vos informations sont modifiables à tout moment depuis votre tableau de bord. Les modifications sont visibles immédiatement pour tous vos contacts qui scannent votre QR code ou ouvrent votre lien.",
            },
          },
          {
            "@type": "Question",
            name: "Y a-t-il un engagement ou un contrat minimum ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non. Les abonnements CVD sont sans engagement et annulables à tout moment depuis votre espace client. Vous pouvez partir quand vous voulez.",
            },
          },
          {
            "@type": "Question",
            name: "Et si je ne suis pas satisfait ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vous bénéficiez d'une garantie satisfait ou remboursé de 30 jours. Si CVD ne vous convient pas dans les 30 premiers jours, vous êtes remboursé intégralement, sans question et sans justification.",
            },
          },
          {
            "@type": "Question",
            name: "Quelle est la différence entre la carte digitale et la carte connectée physique ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "La carte digitale est votre profil en ligne accessible via QR code ou lien. La carte connectée physique est une vraie carte en plastique ou métal. Quand quelqu'un approche son téléphone de la carte, votre profil s'ouvre instantanément — sans même scanner un QR code, sans application. Les deux sont complémentaires.",
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
