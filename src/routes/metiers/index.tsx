import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "../index";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/metiers/")({
  head: () => ({
    meta: [
      { title: "Carte de visite digitale par métier — CVD" },
      {
        name: "description",
        content:
          "Découvrez la carte de visite digitale adaptée à votre métier : coach, consultant, avocat, médecin, architecte… Créez la vôtre en 3 minutes. Essai gratuit 7 jours.",
      },
      { property: "og:title", content: "Carte de visite digitale par métier — CVD" },
      { property: "og:description", content: "Carte de visite digitale pensée pour chaque profession. Partagez vos coordonnées en 1 tap. Essai gratuit 7 jours." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cartevisitedigitale.fr/metiers" },
      { property: "og:site_name", content: "CVD — Carte de visite digitale" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Carte de visite digitale par métier — CVD" },
      { name: "twitter:description", content: "Carte de visite digitale adaptée à chaque profession. Essai gratuit 7 jours." },
      { name: "twitter:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cartevisitedigitale.fr/metiers" }],
  }),
  component: MetiersPage,
});

const METIERS = [
  // Coach (page statique)
  { slug: "coach", label: "Coach", desc: "Coach professionnel, coach de vie, coach business" },
  // Immobilier
  { slug: "agent-immobilier", label: "Agent Immobilier", desc: "Transaction, location, estimation immobilière" },
  { slug: "conseiller-immobilier", label: "Conseiller Immobilier", desc: "Réseau mandataire, conseil en achat-vente" },
  { slug: "mandataire-immobilier", label: "Mandataire Immobilier", desc: "Indépendant immobilier, réseau national" },
  // Restauration
  { slug: "chef-restaurateur", label: "Restaurateur", desc: "Restaurant, bistrot, cuisine du monde" },
  { slug: "gerant-cafe", label: "Gérant de Café", desc: "Café, bar, brasserie, PMU" },
  { slug: "pizzaiolo", label: "Pizzaiolo", desc: "Pizzeria, four à bois, livraison pizza" },
  { slug: "chef-etoile", label: "Chef Cuisinier", desc: "Chef de cuisine, gastronomie, traiteur" },
  // Santé
  { slug: "osteopathe", label: "Ostéopathe", desc: "Ostéopathie, douleurs chroniques, sport" },
  { slug: "dentiste", label: "Dentiste", desc: "Chirurgien-dentiste, cabinet dentaire" },
  { slug: "naturopathe", label: "Naturopathe", desc: "Naturopathie, bien-être, médecine douce" },
  { slug: "kinesitherapeute", label: "Kinésithérapeute", desc: "Rééducation, kiné libéral, masseur-kiné" },
  // BTP & artisan
  { slug: "macon", label: "Maçon", desc: "Maçonnerie, gros œuvre, construction" },
  { slug: "charpentier", label: "Charpentier", desc: "Charpente bois, toiture, ossature" },
  { slug: "electricien", label: "Électricien", desc: "Électricité, domotique, mise aux normes" },
  { slug: "plombier", label: "Plombier", desc: "Plomberie, chauffage, sanitaire, urgences" },
  // Beauté & bien-être
  { slug: "coiffeuse", label: "Coiffeuse", desc: "Coiffure, coloriste, balayage, coupe" },
  { slug: "barbier", label: "Barbier", desc: "Barber shop, rasage, coiffure homme" },
  { slug: "estheticienne", label: "Esthéticienne", desc: "Institut de beauté, soins visage & corps" },
  { slug: "maquilleuse", label: "Maquilleuse", desc: "Maquillage artistique, mariage, événements" },
  // Conseil & business
  { slug: "consultant", label: "Consultant", desc: "Conseil en stratégie, management, organisation" },
  { slug: "designer-freelance", label: "Designer Freelance", desc: "Design graphique, identité visuelle, UX/UI" },
  { slug: "account-executive", label: "Account Executive", desc: "Vente B2B, gestion de comptes, SaaS" },
  { slug: "sales-manager", label: "Sales Manager", desc: "Direction commerciale, équipe de vente" },
  { slug: "business-developer", label: "Business Developer", desc: "Développement commercial, partenariats" },
  // Juridique
  { slug: "avocat", label: "Avocat", desc: "Avocat en droit des affaires, droit de la famille" },
  { slug: "notaire", label: "Notaire", desc: "Office notarial, actes et conseils" },
  { slug: "juriste", label: "Juriste", desc: "Juriste d'entreprise, droit social, contrats" },
  // Photo & vidéo
  { slug: "photographe", label: "Photographe", desc: "Mariage, corporate, portrait, événementiel" },
  { slug: "videaste", label: "Vidéaste", desc: "Vidéo d'entreprise, mariage, reportage" },
  { slug: "graphiste", label: "Graphiste", desc: "Graphisme, print, identité de marque" },
  // Sport
  { slug: "coach-sportif", label: "Coach Sportif", desc: "Personal trainer, fitness, musculation" },
  { slug: "yoga", label: "Professeur de Yoga", desc: "Yoga, méditation, pilates, bien-être" },
  { slug: "coach-crossfit", label: "Coach CrossFit", desc: "CrossFit, HIIT, préparation physique" },
  // Artisanat créatif
  { slug: "menuisier", label: "Menuisier", desc: "Menuiserie, ébénisterie, aménagement sur mesure" },
  { slug: "fleuriste", label: "Fleuriste", desc: "Fleurs, événements, mariages, décoration florale" },
  { slug: "bijoutier", label: "Bijoutier", desc: "Joaillerie, bijoux sur mesure, horlogerie" },
  // Automobile
  { slug: "mecanicien", label: "Mécanicien", desc: "Garage, entretien, réparation, dépannage auto" },
  { slug: "carrossier", label: "Carrossier", desc: "Carrosserie, peinture auto, réparation sinistres" },
  { slug: "conseiller-auto", label: "Conseiller Auto", desc: "Vente véhicules neufs, occasion, premium" },
  // Formation
  { slug: "formateur", label: "Formateur", desc: "Organisme de formation, Qualiopi, soft skills" },
  { slug: "coach-carriere", label: "Coach Carrière", desc: "Reconversion, bilan de compétences, leadership" },
  { slug: "professeur-particulier", label: "Professeur Particulier", desc: "Soutien scolaire, maths, langues, prépa concours" },
];

function MetiersStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://cartevisitedigitale.fr/metiers#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cartevisitedigitale.fr" },
          { "@type": "ListItem", position: 2, name: "Métiers", item: "https://cartevisitedigitale.fr/metiers" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://cartevisitedigitale.fr/metiers#webpage",
        url: "https://cartevisitedigitale.fr/metiers",
        name: "Carte de visite digitale par métier — CVD",
        description: "Découvrez la carte de visite digitale adaptée à votre métier : coach, consultant, avocat, médecin… Créez la vôtre en 3 minutes.",
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://cartevisitedigitale.fr/#website" },
        breadcrumb: { "@id": "https://cartevisitedigitale.fr/metiers#breadcrumb" },
      },
      {
        "@type": "ItemList",
        "@id": "https://cartevisitedigitale.fr/metiers#list",
        name: "Carte de visite digitale par métier",
        description: "Liste des pages métier CVD avec conseils et exemples spécifiques à chaque profession.",
        itemListElement: METIERS.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Carte de visite digitale pour ${m.label}`,
          url: `https://cartevisitedigitale.fr/metiers/${m.slug}`,
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function MetiersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <MetiersStructuredData />
      <Nav />

      <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto px-4 pt-4 pb-1">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition">Accueil</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">Métiers</li>
        </ol>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-magenta/10 text-magenta text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Carte de visite digitale par métier
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground">
            Choisissez votre métier
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Une carte de visite digitale pensée pour les besoins spécifiques de chaque profession.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {METIERS.map(({ slug, label, desc }) => (
            <Link
              key={slug}
              to={`/metiers/${slug}` as any}
              className="group flex items-center justify-between bg-card border border-border rounded-2xl p-6 shadow-card hover:border-magenta/40 hover:shadow-lg transition-all"
            >
              <div>
                <div className="font-display font-bold text-lg text-foreground">{label}</div>
                <div className="text-sm text-muted-foreground mt-1">{desc}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-magenta group-hover:translate-x-1 transition-all shrink-0 ml-4" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
