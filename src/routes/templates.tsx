import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
  Phone,
  Mail,
  Share2,
  Save,
  Globe,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  X as XClose,
  Eye,
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

/* ──────────────────────────── Types ──────────────────────────── */

type Sector = {
  id: string;
  label: string;
  icon: typeof Building2;
  accent: string;
  cta: string;
};

type SocialType =
  | "linkedin"
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube"
  | "whatsapp"
  | "facebook";

type StyleId = "minimal" | "bold" | "elegant" | "neo" | "dark" | "soft";

type Template = {
  id: string;
  name: string;
  sector: string;
  job: string;
  company: string;
  person: string;
  initials: string;
  tagline: string;
  bio: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  avatar: string;
  socials: SocialType[];
  style: StyleId;
  palette: { bg: string; fg: string; accent: string };
  badge?: string;
};

/* ──────────────────────────── Sectors ──────────────────────────── */

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

const STYLE_FILTERS: { id: StyleId | "all"; label: string }[] = [
  { id: "all", label: "Tous styles" },
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "elegant", label: "Élégant" },
  { id: "dark", label: "Dark" },
  { id: "soft", label: "Soft" },
  { id: "neo", label: "Neo" },
];

/* Default socials per sector */
const SECTOR_SOCIALS: Record<string, SocialType[]> = {
  immobilier: ["linkedin", "instagram", "facebook"],
  restauration: ["instagram", "facebook", "whatsapp"],
  sante: ["instagram", "linkedin"],
  btp: ["facebook", "whatsapp"],
  beaute: ["instagram", "tiktok", "whatsapp"],
  conseil: ["linkedin", "x"],
  commercial: ["linkedin", "x"],
  juridique: ["linkedin"],
  creatif: ["instagram", "tiktok", "youtube"],
  sport: ["instagram", "tiktok", "youtube"],
  artisan: ["instagram", "facebook", "whatsapp"],
  auto: ["facebook", "instagram", "whatsapp"],
  formation: ["linkedin", "youtube"],
};

/* Avatar helper — deterministic portrait per template id */
function avatarFor(id: string, female: boolean) {
  const base = female
    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330" // woman
    : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"; // man
  // pool of stable portrait IDs
  const pool = [
    "1544005313-94ddf0286df2",
    "1488161628813-04466f872be2",
    "1531123897727-8f129e1688ce",
    "1438761681033-6461ffad8d80",
    "1502685104226-ee32379fefbe",
    "1564564321837-a57b7070ac4f",
    "1517841905240-472988babdf9",
    "1500648767791-00dcc994a43e",
    "1547425260-76bcadfb4f2c",
    "1573496359142-b8d87734a5a2",
    "1546961342-a23b8d4fd1b0",
    "1521119989659-a83eee488004",
  ];
  const hash = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const slug = pool[hash % pool.length];
  return `https://images.unsplash.com/photo-${slug}?w=400&h=400&fit=crop&crop=faces&auto=format&q=80`;
}

function isFemale(firstName: string) {
  // crude heuristic on common French first-name endings + explicit list
  const female = ["Camille", "Élise", "Léa", "Inès", "Manon", "Chloé", "Sarah", "Sophie", "Marie", "Aïcha", "Élodie", "Iris", "Anaïs", "Margot", "Nadia", "Laure"];
  return female.includes(firstName);
}

/* ──────────────────────────── Templates ──────────────────────────── */

const RAW_TEMPLATES: Array<Omit<Template, "company" | "bio" | "location" | "website" | "phone" | "email" | "avatar" | "socials">> = [
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

const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", "Nice", "Strasbourg", "Rennes"];

const COMPANIES: Record<string, string[]> = {
  immobilier: ["Horizon Immo", "Maison & Co", "Prestige Realty"],
  restauration: ["La Table d'Antoine", "Café Lumen", "Trattoria Napoli", "Maison Mérand"],
  sante: ["Cabinet Lefèvre", "Smile Studio", "Équilibre Nature", "KineSport"],
  btp: ["Lambert BTP", "Roux Toitures", "Girard Élec", "Vidal Plomberie"],
  beaute: ["Studio Chic", "Le Barbier", "Bulle de Soin", "Sarah Léon MUA"],
  conseil: ["Morel Consulting", "Bertin Studio", "AB Coaching"],
  commercial: ["Acme SaaS", "FaureSales", "Garnier Growth"],
  juridique: ["Cabinet Dumas", "Étude Renaud", "Caillet Avocats"],
  creatif: ["ER Studio", "Joubert Films", "Naud Design"],
  sport: ["Tarek Coaching", "Studio Yoga AL", "Crossfit RS"],
  artisan: ["Atelier Carré", "Margot Fleurs", "Vasseur Joaillerie"],
  auto: ["Garage Pichon", "Carrosserie Olivier", "Auto Bidault"],
  formation: ["SG Formation", "Sellam Career", "Tessier Maths"],
};

const TEMPLATES: Template[] = RAW_TEMPLATES.map((t, idx) => {
  const firstName = t.person.replace(/^(Dr\.|Maître)\s+/, "").split(" ")[0];
  const female = isFemale(firstName);
  const initialsSlug = t.initials.toLowerCase();
  const companies = COMPANIES[t.sector] ?? ["Indépendant"];
  return {
    ...t,
    company: companies[idx % companies.length],
    bio: `${t.tagline}. ${female ? "Disponible" : "Disponible"} du lundi au samedi sur ${CITIES[idx % CITIES.length]} et sa région.`,
    location: CITIES[idx % CITIES.length],
    website: `onetap.cards/${initialsSlug}`,
    phone: `+33 6 ${10 + (idx % 80)} ${20 + (idx % 70)} ${30 + (idx % 60)} ${40 + (idx % 50)}`.replace(/\s+/g, " "),
    email: `${initialsSlug}@${(COMPANIES[t.sector]?.[idx % (COMPANIES[t.sector]?.length || 1)] || "onetap").toLowerCase().replace(/[^a-z]/g, "")}.fr`,
    avatar: avatarFor(t.id, female),
    socials: SECTOR_SOCIALS[t.sector] ?? ["linkedin", "instagram"],
  };
});

/* ──────────────────────────── Page ──────────────────────────── */

function TemplatesPage() {
  const [active, setActive] = useState<string>("all");
  const [styleFilter, setStyleFilter] = useState<StyleId | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchSector = active === "all" || t.sector === active;
      if (!matchSector) return false;
      const matchStyle = styleFilter === "all" || t.style === styleFilter;
      if (!matchStyle) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.job.toLowerCase().includes(q) ||
        t.person.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q)
      );
    });
  }, [active, styleFilter, query]);

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
            Photo, coordonnées, réseaux sociaux, boutons d'action : tout est déjà en place.
            Choisissez un modèle, personnalisez-le en 3 minutes.
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
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
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

          {/* Style sub-filter */}
          <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STYLE_FILTERS.map((s) => {
              const isActive = styleFilter === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStyleFilter(s.id)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {s.label}
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
              <TemplateCard key={t.id} t={t} onPreview={() => setSelected(t)} />
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

      {selected && <PreviewModal t={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ──────────────────────────── Card (in grid) ──────────────────────────── */

function TemplateCard({ t, onPreview }: { t: Template; onPreview: () => void }) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const Icon = sector?.icon ?? Sparkles;

  return (
    <article className="group relative rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Preview area */}
      <button
        type="button"
        onClick={onPreview}
        className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br from-secondary/40 to-background flex items-center justify-center p-4 cursor-pointer"
        aria-label={`Voir le modèle ${t.name} en grand`}
      >
        {/* Phone frame — identical to modal, scaled down to fit card */}
        <div className="transition-transform duration-500 group-hover:scale-[0.78] group-hover:-rotate-1 scale-[0.72] origin-center">
          <div className="relative w-[300px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl">
            <div
              className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
              style={{ background: t.palette.bg, color: t.palette.fg }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" />
              <CardPreview t={t} size="lg" />
            </div>
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

        {/* Hover hint */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/90 text-background text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="w-3 h-3" />
          Voir en grand
        </span>
      </button>

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

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-card border border-border text-sm font-semibold hover:border-foreground/40 transition"
            aria-label="Aperçu"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <Link
            to="/offres"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition group/btn"
          >
            Utiliser ce modèle
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────── Card content (rendered in mockup) ──────────────────────────── */

function CardPreview({ t, size = "sm" }: { t: Template; size?: "sm" | "lg" }) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const ctaLabel = sector?.cta ?? "Me contacter";
  const isLight = isLightBg(t.palette.bg);
  const mutedFg = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";
  const subtleBg = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)";


  const isLg = size === "lg";

  return (
    <div className={`relative w-full h-full flex flex-col overflow-y-auto ${isLg ? "pb-5" : "pb-2"}`}>
      {/* Notch-safe top spacer */}
      <div className={`${isLg ? "h-10" : "h-7"} shrink-0`} />

      {/* Avatar + identity */}
      <div className={`${isLg ? "px-5 mt-2" : "px-3 mt-1.5"} flex flex-col items-center text-center`}>
        <div
          className={`${isLg ? "w-20 h-20" : "w-14 h-14"} rounded-full overflow-hidden shrink-0 shadow-lg`}
          style={{
            background: t.palette.accent,
            color: contrastText(t.palette.accent),
            boxShadow: `0 0 0 ${isLg ? 3 : 2}px ${t.palette.bg}, 0 4px 12px rgba(0,0,0,0.25)`,
          }}
        >
          {t.avatar ? (
            <img src={t.avatar} alt={t.person} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-bold ${isLg ? "text-xl" : "text-xs"}`}>
              {t.initials}
            </div>
          )}
        </div>
        <div className={`${isLg ? "mt-2 text-lg" : "mt-1.5 text-[12px]"} font-bold truncate w-full leading-tight`}>{t.person}</div>
        <div className={`${isLg ? "text-sm" : "text-[10px]"} truncate w-full leading-tight`} style={{ color: mutedFg }}>
          {t.job}
        </div>
        <div className={`${isLg ? "text-xs mt-0.5" : "text-[9px] mt-0.5"} truncate w-full font-semibold leading-tight`} style={{ color: t.palette.accent }}>
          {t.company}
        </div>
        <div className={`${isLg ? "mt-1 text-xs gap-1" : "mt-1 text-[9px] gap-1"} flex items-center justify-center`} style={{ color: mutedFg }}>
          <MapPin className={isLg ? "w-3 h-3" : "w-2.5 h-2.5"} />
          {t.location}
        </div>
      </div>

      {/* Tagline */}
      <div className={`${isLg ? "px-5 mt-3" : "px-3 mt-2"} text-center`}>
        <div className={`font-display font-semibold ${isLg ? "text-sm" : "text-[10px]"} leading-snug ${isLg ? "" : "line-clamp-2"}`}>
          "{t.tagline}"
        </div>
        {isLg && (
          <p className="mt-2 text-xs opacity-70 leading-relaxed line-clamp-3">{t.bio}</p>
        )}
      </div>

      {/* Quick actions */}
      <div className={`${isLg ? "px-5 mt-4 gap-2" : "px-3 mt-2.5 gap-1.5"} flex justify-center`}>
        {[
          { icon: Phone, label: "Appeler" },
          { icon: Mail, label: "Email" },
          { icon: Save, label: "vCard" },
          { icon: Share2, label: "Partager" },
        ].map(({ icon: I, label }) => (
          <div
            key={label}
            className={`${isLg ? "w-10 h-10" : "w-7 h-7"} rounded-full flex items-center justify-center`}
            style={{ background: subtleBg, color: t.palette.fg }}
            title={label}
          >
            <I className={isLg ? "w-4 h-4" : "w-3 h-3"} />
          </div>
        ))}
      </div>

      {/* Socials */}
      {t.socials.length > 0 && (
        <div className={`${isLg ? "px-5 mt-3 gap-2" : "px-3 mt-2 gap-1.5"} flex justify-center flex-wrap`}>
          {t.socials.map((soc) => (
            <div
              key={soc}
              className={`${isLg ? "w-9 h-9" : "w-7 h-7"} rounded-full flex items-center justify-center`}
              style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
              title={soc}
            >
              <SocialIcon type={soc} className={isLg ? "w-4 h-4" : "w-3 h-3"} />
            </div>
          ))}
        </div>
      )}

      {/* Info rows (lg only) */}
      {isLg && (
        <div className="px-5 mt-4 space-y-2">
          <InfoRow icon={Globe} label={t.website} muted={mutedFg} accent={t.palette.accent} />
          <InfoRow icon={Phone} label={t.phone} muted={mutedFg} accent={t.palette.accent} />
          <InfoRow icon={Mail} label={t.email} muted={mutedFg} accent={t.palette.accent} />
        </div>
      )}

      <div className="flex-1" />

      {/* CTA */}
      <div className={`${isLg ? "px-5 mt-4" : "px-3 mt-2.5"}`}>
        <div
          className={`rounded-full text-center font-semibold flex items-center justify-center gap-1.5 ${isLg ? "py-3 text-sm" : "py-2 text-[10px]"}`}
          style={{ background: t.palette.accent, color: contrastText(t.palette.accent) }}
        >
          <Check className={isLg ? "w-4 h-4" : "w-3 h-3"} />
          {ctaLabel}
        </div>

        <div
          className={`rounded-full text-center font-medium border flex items-center justify-center gap-1.5 ${isLg ? "mt-2 py-2 text-xs" : "mt-1.5 py-1.5 text-[9px]"}`}
          style={{ borderColor: dividerColor, color: mutedFg }}
        >
          <Smartphone className={isLg ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
          Ajouter aux contacts
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: I,
  label,
  muted,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  muted: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: accent + "20", color: accent }}
      >
        <I className="w-3.5 h-3.5" />
      </div>
      <span className="truncate" style={{ color: muted }}>
        {label}
      </span>
    </div>
  );
}

/* ──────────────────────────── Social icons ──────────────────────────── */

function SocialIcon({ type, className }: { type: SocialType; className?: string }) {
  switch (type) {
    case "linkedin":
      return <Linkedin className={className} />;
    case "instagram":
      return <Instagram className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "facebook":
      return <Facebook className={className} />;
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.39z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      );
  }
}

/* ──────────────────────────── Modal (full preview) ──────────────────────────── */

function PreviewModal({ t, onClose }: { t: Template; onClose: () => void }) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const Icon = sector?.icon ?? Sparkles;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col sm:flex-row animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition"
          aria-label="Fermer"
        >
          <XClose className="w-4 h-4" />
        </button>

        {/* Phone preview */}
        <div className="flex-1 bg-gradient-to-br from-secondary/40 to-background p-6 sm:p-10 flex items-center justify-center min-h-[60vh]">
          <div className="relative w-full max-w-[300px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl">
            <div
              className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
              style={{ background: t.palette.bg, color: t.palette.fg }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" />
              <CardPreview t={t} size="lg" />
            </div>
          </div>
        </div>

        {/* Info side */}
        <div className="sm:w-80 shrink-0 border-t sm:border-t-0 sm:border-l border-border p-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="w-3.5 h-3.5" />
            {sector?.label}
            {t.badge && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wide">
                {t.badge}
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{t.name}</h3>
          <p className="text-sm text-muted-foreground">{t.job}</p>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Style</span>
              <span className="font-medium capitalize">{t.style}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entreprise</span>
              <span className="font-medium truncate ml-2">{t.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ville</span>
              <span className="font-medium">{t.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Réseaux</span>
              <span className="font-medium">{t.socials.length} liens</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              to="/offres"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
            >
              Utiliser ce modèle
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/carte-physique"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-card border border-border text-sm font-semibold hover:border-foreground/40 transition"
            >
              Personnaliser
            </Link>
          </div>

          <p className="mt-auto pt-6 text-[11px] text-muted-foreground">
            Modèle 100 % personnalisable : photo, couleurs, liens et CTA.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Color helpers ──────────────────────────── */

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

function shade(hex: string, percent: number) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return hex;
  let r = parseInt(c.slice(0, 2), 16);
  let g = parseInt(c.slice(2, 4), 16);
  let b = parseInt(c.slice(4, 6), 16);
  r = Math.max(0, Math.min(255, r + (r * percent) / 100));
  g = Math.max(0, Math.min(255, g + (g * percent) / 100));
  b = Math.max(0, Math.min(255, b + (b * percent) / 100));
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
