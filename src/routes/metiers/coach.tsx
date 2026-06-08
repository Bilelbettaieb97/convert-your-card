import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "../index";
import { CardPreview } from "@/components/TemplateCardPreview";
import { TEMPLATES } from "../templates";
import {
  CheckCircle2, Star, ArrowRight, Smartphone, QrCode,
  RefreshCw, Calendar, Users, BarChart3, ChevronDown, ChevronUp,
  Zap, Shield, Sparkles, X, Check,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/metiers/coach")({
  head: () => ({
    meta: [
      { title: "Carte de visite digitale pour Coach — CVD | Partagez vos infos en 1 tap" },
      {
        name: "description",
        content:
          "Créez votre carte de visite numérique de coach professionnel en 3 minutes. Lien Calendly intégré, témoignages, QR code. Coach de vie, business, sportif. Essai gratuit 7 jours sans CB.",
      },
      { property: "og:title", content: "Carte de visite digitale pour Coach — CVD" },
      {
        property: "og:description",
        content:
          "La carte de visite numérique pensée pour les coachs : lien de prise de RDV, biographie, réseaux, témoignages. Coach pro, de vie, business ou sportif. Modifiable à tout moment.",
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
        content: "Carte de visite numérique pour coach : Calendly, réseaux, témoignages. QR code partageable en 1 scan.",
      },
      { name: "twitter:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cartevisitedigitale.fr/metiers/coach" }],
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
    desc: "Affichez vos avis et résultats obtenus sur votre carte de visite numérique. La preuve sociale, toujours à portée de scan.",
  },
  {
    icon: RefreshCw,
    title: "Toujours à jour",
    desc: "Vous changez de tarif, de programme ou de numéro ? Modifiez votre carte en 1 minute — le QR code reste identique.",
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

const COACH_TYPES = [
  {
    title: "Coach professionnel",
    keyword: "carte de visite coach professionnel",
    desc: "Vous accompagnez dirigeants, managers et salariés dans leur développement. Votre carte de visite numérique met en avant vos certifications ICF ou EMCC, vos domaines d'expertise et votre lien de premier entretien.",
    tags: ["Leadership", "Management", "Transition", "Certifié ICF"],
  },
  {
    title: "Coach de vie",
    keyword: "carte de visite coach de vie",
    desc: "Vous guidez vos clients vers leurs objectifs personnels — confiance en soi, relations, équilibre de vie. Votre carte digitale partage votre univers, votre philosophie et votre lien Calendly pour une séance découverte gratuite.",
    tags: ["Développement personnel", "Bien-être", "PNL", "Mindset"],
  },
  {
    title: "Coach business",
    keyword: "carte de visite coach business",
    desc: "Vous aidez les entrepreneurs à structurer et scaler leur activité. Votre carte présente vos résultats concrets (chiffre d'affaires doublé, temps libéré) et votre programme d'accompagnement avec bouton d'accès direct.",
    tags: ["Entrepreneurs", "Freelances", "Stratégie", "Croissance"],
  },
  {
    title: "Coach sportif",
    keyword: "carte de visite coach sportif",
    desc: "Personal trainer, coach crossfit, yoga ou préparation mentale — votre carte de visite digitale remplace la fiche papier et intègre votre planning de cours, vos réseaux Instagram et vos témoignages de transformation.",
    tags: ["Personal training", "Nutrition", "Yoga", "Performance"],
  },
];

const STEPS = [
  {
    n: "01",
    title: "Créez votre profil en 3 minutes",
    desc: "Entrez votre nom, spécialité de coaching, photo, lien de réservation et réseaux. L'éditeur CVD guide chaque étape.",
  },
  {
    n: "02",
    title: "Obtenez votre QR code",
    desc: "Votre QR code et votre lien unique sont générés instantanément. Imprimez-les sur votre carte papier, vos flyers ou votre badge de conférence.",
  },
  {
    n: "03",
    title: "Partagez, convertissez",
    desc: "La personne scanne, voit votre profil complet et réserve sa séance exploratoire. Vous ne perdez plus aucun contact.",
  },
];

const COMPARISON = [
  { feature: "Lien de réservation Calendly", paper: false, digital: true },
  { feature: "Témoignages clients visibles", paper: false, digital: true },
  { feature: "Mise à jour sans réimpression", paper: false, digital: true },
  { feature: "Statistiques de consultation", paper: false, digital: true },
  { feature: "Compatible iPhone & Android", paper: false, digital: true },
  { feature: "Réseaux sociaux cliquables", paper: false, digital: true },
  { feature: "Coût sur le long terme", paper: "Réimpression à chaque modif", digital: "Inclus dans l'abonnement" },
  { feature: "Perte / oubli possible", paper: true, digital: false },
];

const FAQS = [
  {
    q: "À quoi sert une carte de visite digitale pour un coach ?",
    a: "Elle centralise tout ce dont votre futur client a besoin : biographie, spécialité de coaching, lien Calendly pour réserver une séance, témoignages et réseaux sociaux. En 1 scan de QR code, la personne que vous venez de rencontrer accède à votre profil complet — sans chercher votre nom sur Google.",
  },
  {
    q: "Quelle est la différence entre une carte de visite digitale et une carte de visite numérique ?",
    a: "Aucune : les deux termes désignent la même chose. Une page web personnalisée accessible via un QR code ou un lien unique, qui remplace la carte de visite papier traditionnelle. CVD utilise les deux termes de façon interchangeable.",
  },
  {
    q: "Puis-je intégrer mon lien Calendly dans ma carte de visite de coach ?",
    a: "Oui. CVD permet d'ajouter un bouton de prise de rendez-vous directement sur votre carte avec votre lien Calendly, Cal.com, Doctolib ou tout autre outil de réservation. Vos prospects réservent leur séance découverte en 30 secondes.",
  },
  {
    q: "La carte de visite numérique fonctionne-t-elle pour tous les types de coachs ?",
    a: "Oui. CVD est utilisé par des coachs professionnels (ICF, EMCC), coachs de vie, coachs business, coachs sportifs, personal trainers, coachs en nutrition et coachs en développement personnel. Chaque profil est entièrement personnalisable selon votre spécialité.",
  },
  {
    q: "Combien coûte une carte de visite digitale pour coach ?",
    a: "L'offre Essentielle est à 9,80€/mois sans engagement, avec essai gratuit 7 jours sans CB. L'offre Vitrine à 13,16€/mois ajoute les témoignages clients, les statistiques de vues avancées et la section «À propos» enrichie.",
  },
  {
    q: "Puis-je afficher mes certifications de coach sur ma carte ?",
    a: "Oui. Vous pouvez ajouter votre titre, vos certifications (ICF, EMCC, RNCP…) dans votre biographie et votre section «À propos». Ces informations sont visibles immédiatement sur votre profil.",
  },
  {
    q: "Puis-je modifier ma carte de visite après la création ?",
    a: "Oui, à tout moment depuis votre tableau de bord. Changez votre photo, votre tarif de coaching, votre programme ou votre lien de réservation — les modifications sont visibles immédiatement sur votre QR code existant. Zéro réimpression.",
  },
  {
    q: "Comment partager ma carte de visite digitale de coach ?",
    a: "Plusieurs façons : (1) faire scanner le QR code en face-à-face lors d'un événement ou d'une conférence, (2) envoyer le lien unique par SMS, WhatsApp ou email, (3) intégrer le QR code dans votre signature email, (4) l'imprimer sur vos supports physiques.",
  },
  {
    q: "La carte de visite digitale fonctionne-t-elle sans application pour mes clients ?",
    a: "Absolument. Vos clients ouvrent votre carte directement dans leur navigateur mobile — iPhone ou Android. Aucune installation, aucun téléchargement requis de leur côté.",
  },
  {
    q: "Y a-t-il un engagement minimum ou un contrat ?",
    a: "Non. Les abonnements CVD sont sans engagement, sans contrat et annulables à tout moment depuis votre espace client. Vous bénéficiez également d'une garantie satisfait ou remboursé de 30 jours.",
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
      {open && <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>}
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
        name: "Carte de visite digitale pour Coach professionnel — CVD",
        description: "Créez votre carte de visite numérique de coach en 3 minutes. Lien Calendly, témoignages, QR code. Coach de vie, business, sportif. Compatible iPhone & Android sans application.",
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://cartevisitedigitale.fr/#website" },
        breadcrumb: { "@id": "https://cartevisitedigitale.fr/metiers/coach#breadcrumb" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
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
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-[#c9a84c]/10 via-transparent to-transparent blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Carte de visite numérique pour coaches
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.08] tracking-tight text-foreground">
              Carte de visite digitale<br />
              <span className="text-gradient">pour Coach</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Partagez votre profil de coach en 1 scan : lien de réservation Calendly, certifications, témoignages clients et réseaux sociaux. Fini les contacts perdus après un événement ou une conférence.
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {["photo-1573497019940-1c28c88b4f3e", "photo-1580489944761-15a19d654956", "photo-1507003211169-0a1dd7228f2d"].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&crop=face`}
                    alt="Coach utilisateur CVD"
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

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 -m-8 rounded-full bg-[#c9a84c]/15 blur-3xl" />
              <div className="relative flex flex-col items-center gap-4">
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

      {/* ── STATS ── */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight">
            Combien de prospects avez-vous perdus après votre dernier événement ?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Une carte papier s'oublie au fond d'un sac. Sans lien de réservation direct, votre futur client ne reviendra pas. La carte de visite digitale pour coach transforme chaque rencontre en opportunité concrète.
          </p>
          <div className="mt-10 grid sm:grid-cols-4 gap-5">
            {[
              { stat: "73%", label: "des cartes papier jetées en 1 semaine", src: "Étude Adobe 2023" },
              { stat: "3×", label: "plus de RDV avec un lien de réservation direct", src: "Données CVD" },
              { stat: "88%", label: "des professionnels reçoivent plus de contacts avec une carte digitale", src: "Forbes 2024" },
              { stat: "0€", label: "de réimpression quand vous changez de tarif ou de programme", src: "" },
            ].map(({ stat, label, src }) => (
              <div key={stat} className="bg-card border border-border rounded-2xl p-6 shadow-card text-center">
                <div className="font-display font-extrabold text-4xl text-gradient">{stat}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-tight">{label}</p>
                {src && <p className="mt-1 text-[10px] text-muted-foreground/50 italic">{src}</p>}
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
              Tout ce dont un coach a besoin, en 1 carte de visite numérique
            </h2>
            <p className="mt-4 text-muted-foreground">
              CVD est conçu pour les professionnels du coaching qui vivent de leurs clients. Chaque fonctionnalité sert la conversion.
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

      {/* ── TYPES DE COACHS ── */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
              Une carte adaptée à chaque type de coach
            </h2>
            <p className="mt-4 text-muted-foreground">
              Que vous soyez coach professionnel certifié, coach de vie, coach business ou coach sportif, CVD s'adapte à votre spécialité et à vos besoins spécifiques.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {COACH_TYPES.map(({ title, desc, tags }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-lg hover:border-[#c9a84c]/30 transition-all">
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
              Créez votre carte de visite de coach en 3 minutes
            </h2>
            <p className="mt-4 text-muted-foreground">Pas de technique, pas d'attente. Votre carte de visite numérique est live immédiatement.</p>
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

      {/* ── COMPARISON ── */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
              Carte papier vs carte de visite digitale pour coach
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pourquoi les coaches qui passent au numérique ne reviennent jamais en arrière.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
            <div className="grid grid-cols-3 bg-muted/50 px-6 py-4 text-sm font-semibold text-muted-foreground border-b border-border">
              <div>Fonctionnalité</div>
              <div className="text-center">Carte papier</div>
              <div className="text-center text-[#c9a84c]">Carte digitale CVD</div>
            </div>
            {COMPARISON.map(({ feature, paper, digital }) => (
              <div key={feature} className="grid grid-cols-3 px-6 py-4 border-b border-border/50 last:border-0 items-center">
                <div className="text-sm text-foreground font-medium">{feature}</div>
                <div className="flex justify-center">
                  {typeof paper === "boolean" ? (
                    paper
                      ? <Check className="w-4 h-4 text-emerald-500" />
                      : <X className="w-4 h-4 text-red-400" />
                  ) : (
                    <span className="text-xs text-muted-foreground text-center">{paper}</span>
                  )}
                </div>
                <div className="flex justify-center">
                  {typeof digital === "boolean" ? (
                    digital
                      ? <Check className="w-4 h-4 text-emerald-500" />
                      : <X className="w-4 h-4 text-red-400" />
                  ) : (
                    <span className="text-xs text-[#c9a84c] font-medium text-center">{digital}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground text-center mb-12">
            Ce que disent les coaches qui utilisent CVD
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                quote: "Depuis que j'utilise CVD, je ne perds plus aucun contact après mes conférences. Le lien Calendly intégré me permet d'obtenir des appels exploratoires le soir même. Indispensable pour tout coach professionnel.",
                name: "Sophie M.",
                role: "Coach de vie · Paris",
                photo: "photo-1573497019940-1c28c88b4f3e",
                duration: "Client CVD depuis 8 mois",
              },
              {
                quote: "J'ai remplacé mes cartes papier par CVD il y a 6 mois. Résultat : 40% de prospects en plus qui réservent directement via Calendly sans passer par mes messages privés. Le ROI est évident.",
                name: "Marc T.",
                role: "Coach business · Lyon",
                photo: "photo-1507003211169-0a1dd7228f2d",
                duration: "Client CVD depuis 6 mois",
              },
            ].map(({ quote, name, role, photo, duration }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed mb-6">"{quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/${photo}?w=56&h=56&fit=crop&crop=face`}
                    alt={name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">{role}</div>
                    <div className="text-xs text-muted-foreground/60 mt-0.5">{duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
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
                features: ["Carte de visite digitale complète", "QR code + lien unique", "Bouton de réservation (Calendly…)", "Réseaux sociaux illimités", "Support français"],
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
            Questions fréquentes sur la carte de visite digitale pour coach
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
