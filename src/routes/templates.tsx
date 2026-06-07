import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav, PromoBar, Footer } from "./index";
import {
  Building2,
  UtensilsCrossed,
  HeartPulse,
  HardHat,
  Scissors,
  Briefcase,
  Handshake,
  Scale,
  Camera,
  Dumbbell,
  Wrench,
  Car,
  GraduationCap,
  Sparkles,
  Search,
  Smartphone,
  ArrowRight,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Modèles de cartes de visite digitales par secteur — OneTap" },
      {
        name: "description",
        content:
          "Plus de 40 modèles de cartes de visite digitales prêts à l'emploi : immobilier, restauration, santé, BTP, beauté, conseil, avocat, photographe… Trouvez la carte qui ressemble à votre métier.",
      },
      { property: "og:title", content: "Modèles de cartes digitales par secteur — OneTap" },
      {
        property: "og:description",
        content:
          "Découvrez tous les modèles OneTap classés par métier. Sélectionnez le vôtre et personnalisez-le en 3 minutes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/templates" },
    ],
    links: [{ rel: "canonical", href: "/templates" }],
  }),
  component: TemplatesPage,
});

type Sector = {
  id: string;
  label: string;
  icon: typeof Building2;
  accent: string; // tailwind gradient classes
  cta: string;
};

const SECTORS: Sector[] = [
  { id: "all", label: "Tous les modèles", icon: Sparkles, accent: "from-primary to-primary/70", cta: "Voir la carte" },
  { id: "immobilier", label: "Immobilier", icon: Building2, accent: "from-amber-500 to-orange-600", cta: "Planifier une visite" },
  { id: "restauration", label: "Restauration", icon: UtensilsCrossed, accent: "from-red-500 to-rose-600", cta: "Réserver une table" },
  { id: "sante", label: "Santé & Bien-être", icon: HeartPulse, accent: "from-emerald-500 to-teal-600", cta: "Prendre rendez-vous" },
  { id: "btp", label: "Bâtiment & BTP", icon: HardHat, accent: "from-yellow-500 to-amber-700", cta: "Demander un devis" },
  { id: "beaute", label: "Beauté & Coiffure", icon: Scissors, accent: "from-pink-500 to-fuchsia-600", cta: "Réserver un soin" },
  { id: "conseil", label: "Conseil & Freelance", icon: Briefcase, accent: "from-slate-700 to-slate-900", cta: "Planifier un call" },
  { id: "commercial", label: "Commercial B2B", icon: Handshake, accent: "from-blue-600 to-indigo-700", cta: "Échanger 15 min" },
  { id: "juridique", label: "Avocat & Notaire", icon: Scale, accent: "from-indigo-700 to-violet-900", cta: "Demander conseil" },
  { id: "creatif", label: "Photographe & Créatif", icon: Camera, accent: "from-zinc-700 to-neutral-900", cta: "Voir le portfolio" },
  { id: "sport", label: "Coach sportif", icon: Dumbbell, accent: "from-lime-500 to-green-700", cta: "Réserver une séance" },
  { id: "artisan", label: "Artisan", icon: Wrench, accent: "from-stone-600 to-stone-800", cta: "Demander un devis" },
  { id: "auto", label: "Automobile", icon: Car, accent: "from-red-700 to-zinc-900", cta: "Prendre rendez-vous" },
  { id: "formation", label: "Formation & Coaching", icon: GraduationCap, accent: "from-violet-500 to-purple-700", cta: "Réserver un appel" },
];

type Template = {
  id: string;
  name: string;
  sector: string;
  job: string;
  person: string;
  initials: string;
  tagline: string;
  style: "minimal" | "bold" | "elegant" | "neo" | "dark" | "soft";
  palette: { bg: string; fg: string; accent: string };
  badge?: string;
};

const TEMPLATES: Template[] = [
  // Immobilier
  { id: "imm-1", name: "Agent Premium", sector: "immobilier", job: "Agent immobilier", person: "Camille Durand", initials: "CD", tagline: "L'immobilier qui vous ressemble", style: "elegant", palette: { bg: "#0f1b3d", fg: "#ffffff", accent: "#d4a574" }, badge: "Top vente" },
  { id: "imm-2", name: "Maison Moderne", sector: "immobilier", job: "Conseiller immobilier", person: "Julien Marchand", initials: "JM", tagline: "Trouvons votre prochaine adresse", style: "minimal", palette: { bg: "#fafaf7", fg: "#1a1a1a", accent: "#c47a3d" } },
  { id: "imm-3", name: "Prestige Lux", sector: "immobilier", job: "Mandataire de prestige", person: "Élise Vauban", initials: "EV", tagline: "Biens d'exception", style: "dark", palette: { bg: "#0a0a0a", fg: "#f5f0e0", accent: "#c9a84c" } },

  // Restauration
  { id: "res-1", name: "Bistro Chaleur", sector: "restauration", job: "Chef restaurateur", person: "Antoine Reverdy", initials: "AR", tagline: "La cuisine du marché, chaque jour", style: "bold", palette: { bg: "#5c2018", fg: "#fdf6e3", accent: "#e8b84a" }, badge: "Nouveau" },
  { id: "res-2", name: "Coffee Shop", sector: "restauration", job: "Gérant café", person: "Léa Bonnet", initials: "LB", tagline: "Specialty coffee & pâtisseries", style: "soft", palette: { bg: "#f5f0e8", fg: "#3d2817", accent: "#c47a3d" } },
  { id: "res-3", name: "Pizzeria Napoli", sector: "restauration", job: "Pizzaiolo", person: "Marco Russo", initials: "MR", tagline: "Authentique pizza napolitaine", style: "bold", palette: { bg: "#0f3d2e", fg: "#fdf6e3", accent: "#e85d3a" } },
  { id: "res-4", name: "Fine Dining", sector: "restauration", job: "Chef étoilé", person: "Pascal Mérand", initials: "PM", tagline: "Une expérience gastronomique", style: "elegant", palette: { bg: "#1a1a1a", fg: "#f0d78c", accent: "#c9a84c" }, badge: "★ Michelin" },

  // Santé
  { id: "san-1", name: "Cabinet Zen", sector: "sante", job: "Ostéopathe D.O.", person: "Camille Lefèvre", initials: "CL", tagline: "Votre bien-être au quotidien", style: "soft", palette: { bg: "#e8f0ee", fg: "#1a3c2a", accent: "#5a8a5c" } },
  { id: "san-2", name: "Dentiste Pro", sector: "sante", job: "Chirurgien-dentiste", person: "Dr. Romain Petit", initials: "RP", tagline: "Sourires confiance", style: "minimal", palette: { bg: "#ffffff", fg: "#0c2340", accent: "#2d8a9e" } },
  { id: "san-3", name: "Coach Bien-être", sector: "sante", job: "Naturopathe", person: "Inès Caron", initials: "IC", tagline: "Retrouver l'équilibre, naturellement", style: "soft", palette: { bg: "#f5f0e8", fg: "#2d5a3d", accent: "#a8c0a0" } },
  { id: "san-4", name: "Kiné Sport", sector: "sante", job: "Kinésithérapeute", person: "Yann Doré", initials: "YD", tagline: "Performance & récupération", style: "bold", palette: { bg: "#0c2340", fg: "#ffffff", accent: "#5cbdb9" } },

  // BTP
  { id: "btp-1", name: "Chantier Pro", sector: "btp", job: "Maçon", person: "Hugo Lambert", initials: "HL", tagline: "Construction & rénovation", style: "bold", palette: { bg: "#1a1a1a", fg: "#ffeb3b", accent: "#ff5722" } },
  { id: "btp-2", name: "Charpentier", sector: "btp", job: "Charpentier couvreur", person: "Mathieu Roux", initials: "MR", tagline: "Toiture & charpente sur mesure", style: "neo", palette: { bg: "#6b3a2a", fg: "#fdf6e3", accent: "#e8c07a" } },
  { id: "btp-3", name: "Électricien", sector: "btp", job: "Électricien certifié", person: "Thomas Girard", initials: "TG", tagline: "Installation & dépannage 7j/7", style: "bold", palette: { bg: "#0a0a0a", fg: "#fbbf24", accent: "#fbbf24" } },
  { id: "btp-4", name: "Plombier", sector: "btp", job: "Plombier chauffagiste", person: "Sébastien Vidal", initials: "SV", tagline: "Intervention rapide", style: "bold", palette: { bg: "#1e3a5f", fg: "#ffffff", accent: "#fbbf24" } },

  // Beauté
  { id: "bea-1", name: "Salon Chic", sector: "beaute", job: "Coiffeuse styliste", person: "Manon Aubert", initials: "MA", tagline: "Coupe, couleur, conseil", style: "elegant", palette: { bg: "#f8e8ee", fg: "#3d1a2d", accent: "#c45c7c" } },
  { id: "bea-2", name: "Barbier", sector: "beaute", job: "Barbier", person: "Lucas Mercier", initials: "LM", tagline: "L'art du rasage traditionnel", style: "dark", palette: { bg: "#1a1a1a", fg: "#e8c07a", accent: "#c9a84c" } },
  { id: "bea-3", name: "Esthéticienne", sector: "beaute", job: "Esthéticienne", person: "Chloé Renard", initials: "CR", tagline: "Soins visage & corps", style: "soft", palette: { bg: "#fef0f5", fg: "#3d1a2d", accent: "#e88aab" } },
  { id: "bea-4", name: "Maquilleuse Pro", sector: "beaute", job: "Make-up artist", person: "Sarah Léon", initials: "SL", tagline: "Mariage · Mode · Événementiel", style: "elegant", palette: { bg: "#0d0d0d", fg: "#f8e8ee", accent: "#e88aab" }, badge: "Disponible" },

  // Conseil
  { id: "con-1", name: "Consultant Tech", sector: "conseil", job: "Consultant indépendant", person: "Sophie Morel", initials: "SM", tagline: "Stratégie produit & data", style: "minimal", palette: { bg: "#ffffff", fg: "#0a0a1a", accent: "#4f46e5" } },
  { id: "con-2", name: "Freelance Design", sector: "conseil", job: "Designer freelance", person: "Nathan Bertin", initials: "NB", tagline: "Brand, UI & motion", style: "neo", palette: { bg: "#0a0a1a", fg: "#ffffff", accent: "#a78bfa" } },
  { id: "con-3", name: "Coach Business", sector: "conseil", job: "Coach business", person: "Aïcha Benali", initials: "AB", tagline: "Faites passer un cap à votre activité", style: "elegant", palette: { bg: "#1a3c2a", fg: "#ffffff", accent: "#c9a84c" } },

  // Commercial
  { id: "com-1", name: "Account Exec", sector: "commercial", job: "Account executive", person: "Karim Lahbabi", initials: "KL", tagline: "Solutions SaaS pour PME", style: "minimal", palette: { bg: "#ffffff", fg: "#0c2340", accent: "#3b6fa0" } },
  { id: "com-2", name: "Sales Manager", sector: "commercial", job: "Sales manager", person: "Marie Faure", initials: "MF", tagline: "Closons ensemble", style: "bold", palette: { bg: "#0f1b3d", fg: "#ffffff", accent: "#fbbf24" } },
  { id: "com-3", name: "Business Dev", sector: "commercial", job: "Business developer", person: "Tom Garnier", initials: "TG", tagline: "Croissance & partenariats", style: "neo", palette: { bg: "#1a1a2e", fg: "#ffffff", accent: "#4ade80" } },

  // Juridique
  { id: "jur-1", name: "Avocat Cabinet", sector: "juridique", job: "Avocat à la Cour", person: "Maître C. Dumas", initials: "CD", tagline: "Droit des affaires", style: "elegant", palette: { bg: "#0f1b3d", fg: "#f5f0e0", accent: "#c9a84c" } },
  { id: "jur-2", name: "Notaire", sector: "juridique", job: "Notaire associé", person: "Maître P. Renaud", initials: "PR", tagline: "Famille · Immobilier · Entreprise", style: "minimal", palette: { bg: "#fafaf7", fg: "#0f1b3d", accent: "#8b6f5e" } },
  { id: "jur-3", name: "Juriste Conseil", sector: "juridique", job: "Juriste d'entreprise", person: "Laure Caillet", initials: "LC", tagline: "Compliance & contrats", style: "elegant", palette: { bg: "#1a1a2e", fg: "#ffffff", accent: "#a78bfa" } },

  // Créatif
  { id: "cre-1", name: "Photographe Studio", sector: "creatif", job: "Photographe pro", person: "Élodie Rousseau", initials: "ER", tagline: "Mariage · Portrait · Lifestyle", style: "dark", palette: { bg: "#0a0a0a", fg: "#fafaf7", accent: "#e85d3a" } },
  { id: "cre-2", name: "Vidéaste", sector: "creatif", job: "Vidéaste freelance", person: "Adam Joubert", initials: "AJ", tagline: "Films de marque", style: "neo", palette: { bg: "#1a1a1a", fg: "#ffffff", accent: "#67e8f9" } },
  { id: "cre-3", name: "Graphiste", sector: "creatif", job: "Direction artistique", person: "Iris Naud", initials: "IN", tagline: "Identités visuelles bold", style: "bold", palette: { bg: "#ffeb3b", fg: "#0a0a0a", accent: "#ff5722" }, badge: "Portfolio" },

  // Sport
  { id: "spo-1", name: "Coach Sportif", sector: "sport", job: "Coach personnel", person: "Tarek Idrissi", initials: "TI", tagline: "Transforme ton corps en 12 semaines", style: "bold", palette: { bg: "#0a0a0a", fg: "#ffffff", accent: "#73ffb8" } },
  { id: "spo-2", name: "Yoga Studio", sector: "sport", job: "Professeure de yoga", person: "Anaïs Lemoine", initials: "AL", tagline: "Vinyasa · Yin · Méditation", style: "soft", palette: { bg: "#f5f0e8", fg: "#2d5a3d", accent: "#a8c0a0" } },
  { id: "spo-3", name: "Crossfit Coach", sector: "sport", job: "Coach Crossfit", person: "Romain Salvi", initials: "RS", tagline: "Plus fort. Plus loin. Ensemble.", style: "bold", palette: { bg: "#1a1a1a", fg: "#fbbf24", accent: "#e85d3a" } },

  // Artisan
  { id: "art-1", name: "Menuisier", sector: "artisan", job: "Menuisier ébéniste", person: "Vincent Carré", initials: "VC", tagline: "Mobilier sur mesure", style: "neo", palette: { bg: "#6b3a2a", fg: "#fdf6e3", accent: "#c9a84c" } },
  { id: "art-2", name: "Fleuriste", sector: "artisan", job: "Fleuriste créatrice", person: "Margot Leroy", initials: "ML", tagline: "Compositions sur mesure", style: "soft", palette: { bg: "#fef0f5", fg: "#1a3c2a", accent: "#c45c7c" } },
  { id: "art-3", name: "Bijoutier", sector: "artisan", job: "Bijoutier joaillier", person: "Olivier Vasseur", initials: "OV", tagline: "Création & réparation", style: "elegant", palette: { bg: "#0d0d0d", fg: "#f0d78c", accent: "#c9a84c" } },

  // Auto
  { id: "aut-1", name: "Garage Auto", sector: "auto", job: "Mécanicien auto", person: "Bruno Pichon", initials: "BP", tagline: "Entretien · Réparation · Diagnostic", style: "bold", palette: { bg: "#1a1a1a", fg: "#ffffff", accent: "#e85d3a" } },
  { id: "aut-2", name: "Carrossier", sector: "auto", job: "Carrossier peintre", person: "Jérémy Olivier", initials: "JO", tagline: "Votre voiture comme neuve", style: "bold", palette: { bg: "#0a0a0a", fg: "#fbbf24", accent: "#e85d3a" } },
  { id: "aut-3", name: "Concession", sector: "auto", job: "Conseiller commercial auto", person: "Florent Bidault", initials: "FB", tagline: "Trouvez la voiture qui vous va", style: "minimal", palette: { bg: "#ffffff", fg: "#0a0a0a", accent: "#e85d3a" } },

  // Formation
  { id: "for-1", name: "Formateur Pro", sector: "formation", job: "Formateur certifié Qualiopi", person: "Stéphane Guichard", initials: "SG", tagline: "Management & soft skills", style: "elegant", palette: { bg: "#1a1a2e", fg: "#ffffff", accent: "#a78bfa" } },
  { id: "for-2", name: "Coach Carrière", sector: "formation", job: "Coach de carrière", person: "Nadia Sellam", initials: "NS", tagline: "Trouvez votre prochain poste", style: "soft", palette: { bg: "#f8e8ee", fg: "#3d1a2d", accent: "#9b72cf" } },
  { id: "for-3", name: "Prof particulier", sector: "formation", job: "Professeur de mathématiques", person: "Hugo Tessier", initials: "HT", tagline: "Soutien scolaire collège · lycée", style: "minimal", palette: { bg: "#ffffff", fg: "#0a0a1a", accent: "#4f46e5" } },
];

function TemplatesPage() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchSector = active === "all" || t.sector === active;
      if (!matchSector) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.job.toLowerCase().includes(q) ||
        t.person.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q)
      );
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <PromoBar />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {TEMPLATES.length} modèles · {SECTORS.length - 1} secteurs
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto">
            Une carte qui ressemble à <span className="text-primary">votre métier</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus de {TEMPLATES.length} modèles de cartes de visite digitales, classés par secteur.
            Choisissez le vôtre, personnalisez-le en 3 minutes.
          </p>

          {/* Search */}
          <div className="mt-7 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un métier (ex : coiffeur, avocat...)"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
        </div>
      </section>

      {/* Sector filter */}
      <section className="sticky top-0 z-30 bg-background/85 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTORS.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              const count =
                s.id === "all" ? TEMPLATES.length : TEMPLATES.filter((t) => t.sector === s.id).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-md"
                      : "bg-card text-foreground border-border hover:border-foreground/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-background/20 text-background" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-semibold">Aucun modèle ne correspond à votre recherche</p>
            <p className="text-muted-foreground mt-2">Essayez un autre mot-clé ou changez de secteur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((t) => (
              <TemplateCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
            Vous ne trouvez pas votre métier ?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Tous les modèles sont 100 % personnalisables. Choisissez le plus proche, on s'occupe du reste.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/offres"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition shadow-lg"
            >
              Créer ma carte
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              hash="fonctionnement"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card border border-border font-semibold hover:border-foreground/40 transition"
            >
              Voir comment ça marche
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TemplateCard({ t }: { t: Template }) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const Icon = sector?.icon ?? Sparkles;

  return (
    <article className="group relative rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Preview */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-secondary/40 to-background flex items-center justify-center p-5">
        {/* Phone frame */}
        <div className="relative w-full max-w-[200px] aspect-[9/19] rounded-[2rem] bg-zinc-900 p-1.5 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
          <div
            className="relative w-full h-full rounded-[1.6rem] overflow-hidden flex flex-col"
            style={{ background: t.palette.bg, color: t.palette.fg }}
          >
            {/* notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-zinc-900 z-10" />

            <CardPreview t={t} Icon={Icon} />
          </div>
        </div>

        {/* Badge */}
        {t.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wide">
            {t.badge}
          </span>
        )}

        {/* Sector pill */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border text-[11px] font-medium">
          <Icon className="w-3 h-3" />
          {sector?.label}
        </span>
      </div>

      {/* Meta */}
      <div className="p-5 border-t border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-tight truncate">{t.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{t.job}</p>
          </div>
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {t.style}
          </span>
        </div>

        <a
          href="/offres"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition group/btn"
        >
          Utiliser ce modèle
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

function CardPreview({ t, Icon }: { t: Template; Icon: typeof Building2 }) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const ctaLabel = sector?.cta ?? "Me contacter";

  // Different layouts based on style for visual variety
  const isLight = isLightBg(t.palette.bg);
  const dividerColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)";
  const mutedFg = isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.7)";

  return (
    <div className="relative w-full h-full flex flex-col pt-7 pb-3 px-3 text-[8px] leading-tight">
      {/* Header area */}
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
          style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-[9px] truncate">{t.person}</div>
          <div className="text-[7px] truncate" style={{ color: mutedFg }}>
            {t.job}
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-2.5 font-display font-bold text-[10px] leading-snug line-clamp-2">
        {t.tagline}
      </div>

      {/* Divider */}
      <div className="mt-2 h-px w-full" style={{ background: dividerColor }} />

      {/* Info rows */}
      <div className="mt-2 space-y-1">
        {["onetap.cards/" + t.initials.toLowerCase(), "+33 6 12 34 56 78"].map((line) => (
          <div key={line} className="flex items-center gap-1.5">
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: t.palette.accent }}
            />
            <span className="truncate text-[7px]" style={{ color: mutedFg }}>
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Sector icon decorative */}
      <Icon
        className="absolute right-2 top-9 w-7 h-7 opacity-10"
        style={{ color: t.palette.accent }}
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <div
        className="rounded-full text-center font-semibold py-1.5 text-[8px] flex items-center justify-center gap-1"
        style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
      >
        <Check className="w-2 h-2" />
        {ctaLabel}
      </div>

      {/* Secondary action */}
      <div
        className="mt-1 rounded-full text-center font-medium py-1 text-[7px] border flex items-center justify-center gap-1"
        style={{ borderColor: dividerColor, color: mutedFg }}
      >
        <Smartphone className="w-2 h-2" />
        Ajouter aux contacts
      </div>
    </div>
  );
}

function isLightBg(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

function contrastText(hex: string) {
  return isLightBg(hex) ? "#0a0a0a" : "#ffffff";
}
