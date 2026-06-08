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
          "Découvrez la carte de visite digitale adaptée à votre métier : coach, consultant, avocat, médecin, architecte… Créez la vôtre en 3 minutes.",
      },
      { property: "og:title", content: "Carte de visite digitale par métier — CVD" },
      { property: "og:description", content: "Carte de visite digitale pensée pour chaque profession. Partagez vos coordonnées en 1 tap." },
      { property: "og:url", content: "https://cartevisitedigitale.fr/metiers" },
      { property: "og:site_name", content: "CVD — Carte de visite digitale" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartevisitedigitale.fr/metiers" }],
  }),
  component: MetiersPage,
});

const METIERS = [
  { slug: "coach", label: "Coach", desc: "Coach professionnel, coach de vie, coach business" },
];

function MetiersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
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
              to={`/metiers/${slug}`}
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
