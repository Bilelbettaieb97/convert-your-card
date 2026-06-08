import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "../index";
import { CardPreview } from "@/components/TemplateCardPreview";
import { TEMPLATES } from "../templates";
import {
  CheckCircle2, Star, ArrowRight, Smartphone, QrCode,
  RefreshCw, Calendar, Users, BarChart3, ChevronDown, ChevronUp,
  Zap, Shield, Sparkles,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/metiers/coach")({
  head: () => ({
    meta: [
      { title: "Carte de visite digitale pour Coach — CVD | Partagez vos infos en 1 tap" },
      {
        name: "description",
        content:
          "Créez votre carte de visite digitale de coach professionnel en 3 minutes. Lien Calendly, réseaux sociaux, témoignages clients. Partagé par scan ou NFC. Essai gratuit 7 jours.",
      },
      { property: "og:title", content: "Carte de visite digitale pour Coach — CVD" },
      {
        property: "og:description",
        content:
          "La carte de visite digitale pensée pour les coachs : lien de prise de RDV, biographie, réseaux, témoignages. Modifiable à tout moment, partageable en 1 tap.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cartevisitedigitale.fr/metiers/coach" },
      { property: "og:site_name", content: "CVD — Carte de visite digitale" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Carte de visite digitale pour Coach — CVD" },
      {
        name: "twitter:description",
        content:
          "Carte de visite digitale pour coach : Calendly, réseaux, témoignages. Partageable en 1 scan.",
      },
      { name: "twitter:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://cartevisitedigitale.fr/metiers/coach" },
    ],
  }),
  component: CoachPage,
});

const COACH_TEMPLATE = TEMPLATES.find((t) => t.id === "con-3")!;

const BENEFITS = [
  {
    icon: Calendar,
    title: "Réservation directe",
    desc: "Intégrez votre lien Calendly, Cal.com ou Doctolib. Vos prospects réservent une séance exploratoire sans vous appeler.",
  },
  {
    icon: Users,
    title: "Témoignages clients",
    desc: "Affichez vos avis et résultats obtenus sur votre carte. La preuve sociale, toujours à portée de scan.",
  },
  {
    icon: RefreshCw,
    title: "Toujours à jour",
    desc: "Vous changez de tarif, de programme ou de numéro ? Modifiez votre carte en 1 minute — le QR code reste le même.",
  },
  {
    icon: Smartphone,
    title: "Zéro application",
    desc: "Votre client scanne et voit votre profil directement dans son navigateur. Aucun téléchargement, aucune friction.",
  },
  {
    icon: BarChart3,
    title: "Statistiques de vues",
    desc: "Suivez combien de personnes ont consulté votre carte, depuis quel événement, et optimisez votre prospection.",
  },
  {
    icon: QrCode,
    title: "QR code + lien unique",
    desc: "Imprimez votre QR code sur vos supports, ajoutez-le à votre signature email ou partagez le lien sur WhatsApp.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Créez votre profil en 3 minutes",
    desc: "Entrez votre nom, spécialité, photo, lien de réservation et réseaux. L'éditeur CVD guide chaque étape.",
  },
  {
    n: "02",
    title: "Obtenez votre QR code",
    desc: "Votre QR code et votre lien unique sont générés instantanément. Imprimez-les sur votre carte papier, vos flyers ou votre badge.",
  },
  {
    n: "03",
    title: "Partagez, convertissez",
    desc: "La personne scanne, voit votre profil complet et réserve sa séance exploratoire. Vous ne perdez plus aucun contact.",
  },
];

const FAQS = [
  {
    q: "À quoi sert une carte de visite digitale pour un coach ?",
    a: "Elle centralise tout ce dont votre futur client a besoin : votre biographie, votre spécialité, votre lien de réservation, vos témoignages et vos réseaux. En 1 scan, la personne que vous venez de rencontrer accède à votre profil complet — sans chercher votre nom sur Google.",
  },
  {
    q: "Puis-je intégrer mon lien Calendly dans ma carte ?",
    a: "Oui. CVD permet d'ajouter un bouton de prise de rendez-vous directement sur votre carte avec votre lien Calendly, Cal.com ou tout autre outil. Vos prospects réservent en 30 secondes.",
  },
  {
    q: "Combien coûte une carte de visite digitale pour coach ?",
    a: "L'offre Essentielle est à 9,80€/mois, sans engagement, avec essai gratuit 7 jours. L'offre Vitrine à 13,16€/mois inclut les témoignages et statistiques avancées.",
  },
  {
    q: "Puis-je modifier ma carte après la création ?",
    a: "Oui, à tout moment depuis votre tableau de bord. Changez photo, tarif, programme ou lien de réservation — les modifications sont visibles immédiatement sans réimprimer votre QR code.",
  },
  {
    q: "La carte fonctionne-t-elle sans application pour mes clients ?",
    a: "Absolument. Vos clients ouvrent votre carte dans leur navigateur mobile — iPhone ou Android. Aucun téléchargement requis.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function CoachStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://cartevisitedigitale.fr/metiers/coach#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cartevisitedigitale.fr" },
          { "@type": "ListItem", position: 2, name: "Métiers", item: "https://cartevisitedigitale.fr/metiers" },
          { "@type": "ListItem", position: 3, name: "Coach", item: "https://cartevisitedigitale.fr/metiers/coach" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://cartevisitedigitale.fr/metiers/coach#webpage",
        url: "https://cartevisitedigitale.fr/metiers/coach",
        name: "Carte de visite digitale pour Coach professionnel",
        description: "Créez votre carte de visite digitale de coach en 3 minutes. Lien Calendly, biographie, réseaux sociaux, témoignages clients. Compatible iPhone & Android sans application.",
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://cartevisitedigitale.fr/#website" },
        breadcrumb: { "@id": "https://cartevisitedigitale.fr/metiers/coach#breadcrumb" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "À quoi sert une carte de visite digitale pour un coach ?",
            acceptedAnswer: { "@type": "Answer", text: "Elle centralise tout ce dont votre futur client a besoin : votre biographie, votre spécialité, votre lien Calendly pour réserver une séance, vos témoignages, vos réseaux et votre contact. En 1 scan de QR code, la personne que vous venez de rencontrer accède à votre profil complet — sans chercher votre nom sur Google." },
          },
          {
            "@type": "Question",
            name: "Puis-je intégrer mon lien Calendly dans ma carte de visite digitale ?",
            acceptedAnswer: { "@type": "Answer", text: "Oui. CVD permet d'ajouter un bouton de prise de rendez-vous directement sur votre carte, avec votre lien Calendly, Doctolib, Cal.com ou tout autre outil de réservation. Vos prospects réservent une session en 30 secondes." },
          },
          {
            "@type": "Question",
            name: "Combien coûte une carte de visite digitale pour coach ?",
            acceptedAnswer: { "@type": "Answer", text: "L'offre Essentielle est à 9,80€/mois, l'offre Vitrine à 13,16€/mois. Les deux sont sans engagement, annulables à tout moment. Un essai gratuit de 7 jours est disponible sans CB." },
          },
          {
            "@type": "Question",
            name: "Puis-je modifier ma carte après la création ?",
            acceptedAnswer: { "@type": "Answer", text: "Oui, à tout moment. Changez votre photo, votre tarif, votre lien de réservation ou vos témoignages — les modifications sont visibles immédiatement sur votre QR code existant. Vous n'avez pas à réimprimer quoi que ce soit." },
          },
          {
            "@type": "Question",
            name: "La carte fonctionne-t-elle sans application pour mes clients ?",
            acceptedAnswer: { "@type": "Answer", text: "Absolument. Vos clients ouvrent votre carte directement dans leur navigateur mobile — iPhone ou Android. Aucune installation, aucun téléchargement." },
          },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function CoachPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <CoachStructuredData />
      <Nav />

      {/* ── BREADCRUMB ── */}
      <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto px-4 pt-4 pb-1">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition">Accueil</Link></li>
          <li>/</li>
          <li><Link to="/metiers" className="hover:text-foreground transition">Métiers</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">Coach</li>
        </ol>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-[#c9a84c]/10 via-transparent to-transparent blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center relative">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Carte de visite digitale pour coaches
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.08] tracking-tight text-foreground">
              La carte de visite<br />
              <span className="text-gradient">digitale pour Coach</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Partagez votre profil complet en 1 tap : lien de réservation, spécialité, témoignages et réseaux. Fini les contacts perdus après un événement.
            </p>

            {/* Social proof */}
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {["photo-1573497019940-1c28c88b4f3e", "photo-1580489944761-15a19d654956", "photo-1507003211169-0a1dd7228f2d"].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&crop=face`}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-foreground">4,9</span>
                </div>
                <p className="text-xs text-muted-foreground">+200 coaches utilisent CVD</p>
              </div>
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/inscription"
                className="inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Créer ma carte gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-muted transition-all"
              >
                Voir les tarifs
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Essai gratuit 7 jours · Sans CB · Sans engagement
            </p>
          </div>

          {/* Right — card preview in phone frame */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 -m-8 rounded-full bg-[#c9a84c]/15 blur-3xl" />
              <div className="relative flex flex-col items-center gap-4">
                {/* Phone frame — identical to /templates */}
                <div className="relative w-[270px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl">
                  <div
                    className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
                    style={{ background: COACH_TEMPLATE.palette.bg, color: COACH_TEMPLATE.palette.fg }}
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" />
                    <CardPreview t={COACH_TEMPLATE} size="lg" ctaLabel="Réserver une séance" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Aperçu — modifiable à tout moment
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight">
            Combien de contacts avez-vous perdus après votre dernier événement ?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Une carte papier s'oublie au fond d'un sac. Sans lien de réservation direct, votre futur client ne reviendra pas. La carte de visite digitale transforme chaque rencontre en opportunité concrète.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { stat: "73%", label: "des cartes papier jetées en 1 semaine" },
              { stat: "3×", label: "plus de RDV avec un lien de réservation direct" },
              { stat: "0€", label: "de réimpression quand vous changez de tarif" },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-card border border-border rounded-2xl p-6 shadow-card">
                <div className="font-display font-extrabold text-4xl text-gradient">{stat}</div>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
              Tout ce dont un coach a besoin, en 1 carte
            </h2>
            <p className="mt-4 text-muted-foreground">
              CVD est conçu pour les professionnels qui vivent de leurs clients. Chaque fonctionnalité sert la conversion.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-lg hover:border-[#c9a84c]/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
              Prêt en 3 minutes chrono
            </h2>
            <p className="mt-4 text-muted-foreground">Pas de technique, pas d'attente. Votre carte est live immédiatement.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="font-display font-extrabold text-6xl text-[#c9a84c]/15 leading-none mb-3">{n}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-card border border-border rounded-[2rem] p-8 sm:p-12 shadow-card text-center">
            <div className="flex items-center justify-center gap-0.5 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="font-display font-semibold text-xl sm:text-2xl text-foreground leading-snug">
              "Depuis que j'utilise CVD, je ne perds plus aucun contact après mes conférences. Le lien Calendly intégré me permet d'obtenir des appels exploratoires le soir même. Indispensable."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=56&h=56&fit=crop&crop=face"
                alt="Sophie M., Coach de vie"
                className="w-14 h-14 rounded-full object-cover border-2 border-border"
              />
              <div className="text-left">
                <div className="font-bold text-foreground text-sm">Sophie M.</div>
                <div className="text-xs text-muted-foreground">Coach de vie · Paris</div>
                <div className="text-xs text-muted-foreground mt-0.5">Client CVD depuis 8 mois</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
            Un seul client converti rentabilise votre abonnement
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            À partir de <strong className="text-foreground">9,80€/mois</strong>, sans engagement. Soit moins qu'un café par semaine.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {[
              {
                name: "Essentielle",
                price: "9,80€",
                unit: "/mois",
                features: ["Carte digitale complète", "QR code + lien unique", "Bouton de réservation", "Réseaux sociaux illimités", "Support français"],
                cta: "Démarrer l'essai gratuit",
                accent: false,
              },
              {
                name: "Vitrine",
                price: "13,16€",
                unit: "/mois",
                features: ["Tout l'Essentiel", "Témoignages clients", "Statistiques de vues", "Section «À propos» enrichie", "Priorité support"],
                cta: "Démarrer l'essai gratuit",
                accent: true,
              },
            ].map(({ name, price, unit, features, cta, accent }) => (
              <div
                key={name}
                className={`rounded-2xl p-7 text-left border ${accent ? "border-[#c9a84c]/60 bg-[#1a3c2a]/5 shadow-lg" : "border-border bg-card shadow-card"}`}
              >
                {accent && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-semibold mb-3">
                    <Zap className="w-3 h-3" /> Populaire
                  </div>
                )}
                <div className="font-display font-bold text-lg text-foreground">{name}</div>
                <div className="mt-1 flex items-end gap-1">
                  <span className="font-display font-extrabold text-3xl text-foreground">{price}</span>
                  <span className="text-muted-foreground text-sm pb-0.5">{unit}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/inscription"
                  className={`mt-7 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all ${accent ? "bg-gradient-cta text-primary-foreground shadow-glow hover:shadow-xl hover:scale-[1.02]" : "border border-border bg-background text-foreground hover:bg-muted"}`}
                >
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Essai gratuit 7 jours · Sans carte bancaire · Annulable à tout moment
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            Garantie satisfait ou remboursé 30 jours
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="bg-card border border-border rounded-2xl px-6 sm:px-8 shadow-card">
            {FAQS.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 sm:py-24 bg-muted/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground leading-tight">
            Prêt à ne plus perdre<br />
            <span className="text-gradient">aucun prospect ?</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Créez votre carte de visite digitale de coach en 3 minutes. Essai gratuit 7 jours, sans carte bancaire.
          </p>
          <Link
            to="/inscription"
            className="mt-9 inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Créer ma carte gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            +200 coaches déjà sur CVD · 4,9★ · Garantie 30 jours
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
