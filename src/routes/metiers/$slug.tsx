import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "../index";
import { CardPreview } from "@/components/TemplateCardPreview";
import { TEMPLATES } from "../templates";
import { METIERS_DATA, type MetierData } from "@/lib/metiers-data";
import {
  CheckCircle2, Star, ArrowRight, Smartphone, QrCode,
  RefreshCw, Calendar, Users, BarChart3, ChevronDown, ChevronUp,
  Zap, Shield, Sparkles, X, Check, MapPin, Image, FileText,
  Phone, Briefcase, Award, Camera, Clock, Heart, Home, Wrench,
  Dumbbell, Scissors, BookOpen, Car, Video, Link2,
} from "lucide-react";
import { useState } from "react";
import type { LucideProps } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Calendar, Users, RefreshCw, Smartphone, BarChart3, QrCode,
  MapPin, Image, FileText, Link2, Phone, Briefcase,
  Award, Camera, Clock, Heart, Home, Wrench, Dumbbell, Scissors,
  BookOpen, Car, Video, Zap, Shield, Star, Sparkles,
};

export const Route = createFileRoute("/metiers/$slug")({
  head: ({ params }) => {
    const metier = METIERS_DATA.find((m) => m.slug === params.slug);
    if (!metier) return { meta: [{ title: "Métier non trouvé — CVD" }] };
    return {
      meta: [
        { title: metier.seoTitle },
        { name: "description", content: metier.seoDescription },
        { property: "og:title", content: metier.ogTitle },
        { property: "og:description", content: metier.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://cartevisitedigitale.fr/metiers/${metier.slug}` },
        { property: "og:site_name", content: "CVD — Carte de visite digitale" },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metier.ogTitle },
        { name: "twitter:description", content: metier.twitterDescription },
        { name: "twitter:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: `https://cartevisitedigitale.fr/metiers/${metier.slug}` }],
    };
  },
  component: MetierPage,
});

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
        {open ? <ChevronUp className="w-5 h-5 shrink-0 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />}
      </button>
      {open && <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>}
    </div>
  );
}

function MetierStructuredData({ metier }: { metier: MetierData }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://cartevisitedigitale.fr/metiers/${metier.slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cartevisitedigitale.fr" },
          { "@type": "ListItem", position: 2, name: "Métiers", item: "https://cartevisitedigitale.fr/metiers" },
          { "@type": "ListItem", position: 3, name: metier.breadcrumbLabel, item: `https://cartevisitedigitale.fr/metiers/${metier.slug}` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `https://cartevisitedigitale.fr/metiers/${metier.slug}#webpage`,
        url: `https://cartevisitedigitale.fr/metiers/${metier.slug}`,
        name: metier.seoTitle,
        description: metier.seoDescription,
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://cartevisitedigitale.fr/#website" },
        breadcrumb: { "@id": `https://cartevisitedigitale.fr/metiers/${metier.slug}#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        mainEntity: metier.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function MetierPage() {
  const { slug } = Route.useParams();
  const metier = METIERS_DATA.find((m) => m.slug === slug);

  if (!metier) {
    return (
      <div className="min-h-screen bg-background text-foreground font-body">
        <Nav />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="font-display font-extrabold text-4xl text-foreground mb-4">Métier non trouvé</h1>
          <p className="text-muted-foreground mb-8">Cette page métier n'existe pas encore.</p>
          <Link to="/metiers" className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground px-6 py-3 rounded-full font-semibold">
            Voir tous les métiers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const template = TEMPLATES.find((t) => t.id === metier.templateId)!;
  const accent = template?.palette?.accent ?? "#c9a84c";

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <MetierStructuredData metier={metier} />
      <Nav />

      {/* BREADCRUMB */}
      <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto px-4 pt-4 pb-1">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition">Accueil</Link></li>
          <li>/</li>
          <li><Link to="/metiers" className="hover:text-foreground transition">Métiers</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">{metier.breadcrumbLabel}</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${accent}18 0%, transparent 70%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center relative">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: `${accent}18`, color: accent }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {metier.badge}
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.08] tracking-tight text-foreground">
              {metier.h1Line1}<br />
              <span className="text-gradient">{metier.h1Line2}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {metier.heroSubtitle}
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {metier.heroImages.map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&crop=face`}
                    alt={`${metier.breadcrumbLabel} utilisateur CVD`}
                    className="w-9 h-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  <span className="ml-1.5 text-sm font-bold text-foreground">4,9</span>
                </div>
                <p className="text-xs text-muted-foreground">{metier.heroSocialProof}</p>
              </div>
            </div>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/inscription"
                className="inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                {metier.heroCtaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/builderia"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-muted transition-all"
              >
                Voir les tarifs
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Essai gratuit 7 jours · Sans CB · Sans engagement</p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 -m-8 rounded-full blur-3xl" style={{ background: `${accent}22` }} />
              <div className="relative flex flex-col items-center gap-4">
                <div className="relative w-[270px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl">
                  <div
                    className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
                    style={{ background: template?.palette?.bg, color: template?.palette?.fg }}
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" />
                    {template && <CardPreview t={template} size="lg" ctaLabel={metier.ctaLabel} />}
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

      {/* STATS */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight">{metier.statsHeadline}</h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">{metier.statsSubheadline}</p>
          <div className="mt-10 grid sm:grid-cols-4 gap-5">
            {metier.stats.map(({ stat, label, src }) => (
              <div key={stat} className="bg-card border border-border rounded-2xl p-6 shadow-card text-center">
                <div className="font-display font-extrabold text-4xl text-gradient">{stat}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-tight">{label}</p>
                {src && <p className="mt-1 text-[10px] text-muted-foreground/50 italic">{src}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{metier.benefitsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{metier.benefitsSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {metier.benefits.map(({ icon, title, desc }) => {
              const Icon = ICON_MAP[icon] ?? Sparkles;
              return (
                <div key={title} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}18` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{metier.typesTitle}</h2>
            <p className="mt-4 text-muted-foreground">{metier.typesSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {metier.types.map(({ title, desc, tags }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${accent}18`, color: accent }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{metier.stepsTitle}</h2>
            <p className="mt-4 text-muted-foreground">Pas de technique, pas d'attente. Votre carte est en ligne immédiatement.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {metier.steps.map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="font-display font-extrabold text-6xl leading-none mb-3" style={{ color: `${accent}22` }}>{n}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{metier.comparisonTitle}</h2>
            <p className="mt-4 text-muted-foreground">{metier.comparisonSubtitle}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
            <div className="grid grid-cols-3 bg-muted/50 px-6 py-4 text-sm font-semibold text-muted-foreground border-b border-border">
              <div>Fonctionnalité</div>
              <div className="text-center">Carte papier</div>
              <div className="text-center" style={{ color: accent }}>Carte digitale CVD</div>
            </div>
            {metier.comparison.map(({ feature, paper, digital }) => (
              <div key={feature} className="grid grid-cols-3 px-6 py-4 border-b border-border/50 last:border-0 items-center">
                <div className="text-sm text-foreground font-medium">{feature}</div>
                <div className="flex justify-center">
                  {typeof paper === "boolean" ? (
                    paper ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-400" />
                  ) : <span className="text-xs text-muted-foreground text-center">{paper}</span>}
                </div>
                <div className="flex justify-center">
                  {typeof digital === "boolean" ? (
                    digital ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-400" />
                  ) : <span className="text-xs font-medium text-center" style={{ color: accent }}>{digital}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground text-center mb-12">{metier.testimonialsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {metier.testimonials.map(({ quote, name, role, photo, duration }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
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

      {/* PRICING */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{metier.pricingTitle}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            À partir de <strong className="text-foreground">9,80€/mois</strong>, sans engagement. {metier.pricingSubtitle}
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {[
              {
                name: "Essentielle",
                price: "9,80€",
                unit: "/mois",
                features: ["Carte de visite digitale complète", "QR code + lien unique", "Boutons d'action personnalisés", "Réseaux sociaux illimités", "Support français"],
                cta: "Démarrer l'essai gratuit",
                isAccent: false,
              },
              {
                name: "Vitrine",
                price: "13,16€",
                unit: "/mois",
                features: ["Tout l'Essentiel", "Témoignages clients visibles", "Statistiques de vues avancées", "Section «À propos» enrichie", "Priorité support"],
                cta: "Démarrer l'essai gratuit",
                isAccent: true,
              },
            ].map(({ name, price, unit, features, cta, isAccent }) => (
              <div
                key={name}
                className={`rounded-2xl p-7 text-left border ${isAccent ? "shadow-lg" : "border-border bg-card shadow-card"}`}
                style={isAccent ? { borderColor: `${accent}60`, background: `${accent}08` } : {}}
              >
                {isAccent && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3" style={{ background: `${accent}20`, color: accent }}>
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
                  className={`mt-7 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all ${isAccent ? "bg-gradient-cta text-primary-foreground shadow-glow hover:shadow-xl hover:scale-[1.02]" : "border border-border bg-background text-foreground hover:bg-muted"}`}
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Essai gratuit 7 jours · Sans carte bancaire · Annulable à tout moment</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            Garantie satisfait ou remboursé 30 jours
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground text-center mb-12">{metier.faqTitle}</h2>
          <div className="bg-card border border-border rounded-2xl px-6 sm:px-8 shadow-card">
            {metier.faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24 bg-muted/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground leading-tight">
            {metier.finalCtaLine1}<br />
            <span className="text-gradient">{metier.finalCtaLine2}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{metier.finalCtaSubtitle}</p>
          <Link
            to="/inscription"
            className="mt-9 inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            {metier.finalCtaButton} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">{metier.finalCtaSocialProof}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
