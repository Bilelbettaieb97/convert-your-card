import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PromoBar, N as Nav, F as Footer } from "./router-Dp3VsQgc.mjs";
import { C as CardPreview } from "./TemplateCardPreview-04l1NR1Y.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { s as Sparkles, B as Building2, u as UtensilsCrossed, H as HeartPulse, v as HardHat, w as Scissors, x as Briefcase, y as Handshake, z as Scale, I as Camera, J as Dumbbell, W as Wrench, N as Car, O as GraduationCap, h as Search, A as ArrowRight, m as Eye, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-Dl_FXBpq.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client-CrY6GqN9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/zod.mjs";
const SECTORS = [{
  id: "all",
  label: "Tous les modèles",
  icon: Sparkles,
  accent: "from-primary to-primary/70",
  cta: "Voir la carte"
}, {
  id: "immobilier",
  label: "Immobilier",
  icon: Building2,
  accent: "from-amber-500 to-orange-600",
  cta: "Planifier une visite"
}, {
  id: "restauration",
  label: "Restauration",
  icon: UtensilsCrossed,
  accent: "from-red-500 to-rose-600",
  cta: "Réserver une table"
}, {
  id: "sante",
  label: "Santé & Bien-être",
  icon: HeartPulse,
  accent: "from-emerald-500 to-teal-600",
  cta: "Prendre rendez-vous"
}, {
  id: "btp",
  label: "Bâtiment & BTP",
  icon: HardHat,
  accent: "from-yellow-500 to-amber-700",
  cta: "Demander un devis"
}, {
  id: "beaute",
  label: "Beauté & Coiffure",
  icon: Scissors,
  accent: "from-pink-500 to-fuchsia-600",
  cta: "Réserver un soin"
}, {
  id: "conseil",
  label: "Conseil & Freelance",
  icon: Briefcase,
  accent: "from-slate-700 to-slate-900",
  cta: "Planifier un call"
}, {
  id: "commercial",
  label: "Commercial B2B",
  icon: Handshake,
  accent: "from-blue-600 to-indigo-700",
  cta: "Échanger 15 min"
}, {
  id: "juridique",
  label: "Avocat & Notaire",
  icon: Scale,
  accent: "from-indigo-700 to-violet-900",
  cta: "Demander conseil"
}, {
  id: "creatif",
  label: "Photographe & Créatif",
  icon: Camera,
  accent: "from-zinc-700 to-neutral-900",
  cta: "Voir le portfolio"
}, {
  id: "sport",
  label: "Coach sportif",
  icon: Dumbbell,
  accent: "from-lime-500 to-green-700",
  cta: "Réserver une séance"
}, {
  id: "artisan",
  label: "Artisan",
  icon: Wrench,
  accent: "from-stone-600 to-stone-800",
  cta: "Demander un devis"
}, {
  id: "auto",
  label: "Automobile",
  icon: Car,
  accent: "from-red-700 to-zinc-900",
  cta: "Prendre rendez-vous"
}, {
  id: "formation",
  label: "Formation & Coaching",
  icon: GraduationCap,
  accent: "from-violet-500 to-purple-700",
  cta: "Réserver un appel"
}];
const STYLE_FILTERS = [{
  id: "all",
  label: "Tous styles"
}, {
  id: "minimal",
  label: "Minimal"
}, {
  id: "bold",
  label: "Bold"
}, {
  id: "elegant",
  label: "Élégant"
}, {
  id: "dark",
  label: "Dark"
}, {
  id: "soft",
  label: "Soft"
}, {
  id: "neo",
  label: "Neo"
}];
const SECTOR_SOCIALS = {
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
  formation: ["linkedin", "youtube"]
};
const FEMALE_POOL = ["1494790108377-be9c29b29330", "1544005313-94ddf0286df2", "1438761681033-6461ffad8d80", "1573496359142-b8d87734a5a2", "1531123897727-8f129e1688ce", "1517841905240-472988babdf9", "1546961342-a23b8d4fd1b0", "1487412720507-e7ab37603c6f"];
const MALE_POOL = ["1500648767791-00dcc994a43e", "1488161628813-04466f872be2", "1502685104226-ee32379fefbe", "1564564321837-a57b7070ac4f", "1547425260-76bcadfb4f2c", "1521119989659-a83eee488004", "1507003211169-0a1dd7228f2d", "1492562080023-ab3db95bfbce"];
function avatarFor(id, female) {
  const pool = female ? FEMALE_POOL : MALE_POOL;
  const hash = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const slug = pool[hash % pool.length];
  return `https://images.unsplash.com/photo-${slug}?w=400&h=400&fit=crop&crop=faces&auto=format&q=80`;
}
function isFemale(firstName) {
  const female = ["Camille", "Élise", "Léa", "Inès", "Manon", "Chloé", "Sarah", "Sophie", "Marie", "Aïcha", "Élodie", "Iris", "Anaïs", "Margot", "Nadia", "Laure"];
  return female.includes(firstName);
}
const RAW_TEMPLATES = [
  // Immobilier
  {
    id: "imm-1",
    name: "Agent Premium",
    sector: "immobilier",
    job: "Agent immobilier",
    person: "Camille Durand",
    initials: "CD",
    tagline: "L'immobilier qui vous ressemble",
    style: "elegant",
    palette: {
      bg: "#0f1b3d",
      fg: "#ffffff",
      accent: "#d4a574"
    },
    badge: "Top vente"
  },
  {
    id: "imm-2",
    name: "Maison Moderne",
    sector: "immobilier",
    job: "Conseiller immobilier",
    person: "Julien Marchand",
    initials: "JM",
    tagline: "Trouvons votre prochaine adresse",
    style: "minimal",
    palette: {
      bg: "#fafaf7",
      fg: "#1a1a1a",
      accent: "#c47a3d"
    }
  },
  {
    id: "imm-3",
    name: "Prestige Lux",
    sector: "immobilier",
    job: "Mandataire de prestige",
    person: "Élise Vauban",
    initials: "EV",
    tagline: "Biens d'exception",
    style: "dark",
    palette: {
      bg: "#0a0a0a",
      fg: "#f5f0e0",
      accent: "#c9a84c"
    }
  },
  // Restauration
  {
    id: "res-1",
    name: "Bistro Chaleur",
    sector: "restauration",
    job: "Chef restaurateur",
    person: "Antoine Reverdy",
    initials: "AR",
    tagline: "La cuisine du marché, chaque jour",
    style: "bold",
    palette: {
      bg: "#5c2018",
      fg: "#fdf6e3",
      accent: "#e8b84a"
    },
    badge: "Nouveau"
  },
  {
    id: "res-2",
    name: "Coffee Shop",
    sector: "restauration",
    job: "Gérant café",
    person: "Léa Bonnet",
    initials: "LB",
    tagline: "Specialty coffee & pâtisseries",
    style: "soft",
    palette: {
      bg: "#f5f0e8",
      fg: "#3d2817",
      accent: "#c47a3d"
    }
  },
  {
    id: "res-3",
    name: "Pizzeria Napoli",
    sector: "restauration",
    job: "Pizzaiolo",
    person: "Marco Russo",
    initials: "MR",
    tagline: "Authentique pizza napolitaine",
    style: "bold",
    palette: {
      bg: "#0f3d2e",
      fg: "#fdf6e3",
      accent: "#e85d3a"
    }
  },
  {
    id: "res-4",
    name: "Fine Dining",
    sector: "restauration",
    job: "Chef étoilé",
    person: "Pascal Mérand",
    initials: "PM",
    tagline: "Une expérience gastronomique",
    style: "elegant",
    palette: {
      bg: "#1a1a1a",
      fg: "#f0d78c",
      accent: "#c9a84c"
    },
    badge: "★ Michelin"
  },
  // Santé
  {
    id: "san-1",
    name: "Cabinet Zen",
    sector: "sante",
    job: "Ostéopathe D.O.",
    person: "Camille Lefèvre",
    initials: "CL",
    tagline: "Votre bien-être au quotidien",
    style: "soft",
    palette: {
      bg: "#e8f0ee",
      fg: "#1a3c2a",
      accent: "#5a8a5c"
    }
  },
  {
    id: "san-2",
    name: "Dentiste Pro",
    sector: "sante",
    job: "Chirurgien-dentiste",
    person: "Dr. Romain Petit",
    initials: "RP",
    tagline: "Sourires confiance",
    style: "minimal",
    palette: {
      bg: "#ffffff",
      fg: "#0c2340",
      accent: "#2d8a9e"
    }
  },
  {
    id: "san-3",
    name: "Coach Bien-être",
    sector: "sante",
    job: "Naturopathe",
    person: "Inès Caron",
    initials: "IC",
    tagline: "Retrouver l'équilibre, naturellement",
    style: "soft",
    palette: {
      bg: "#f5f0e8",
      fg: "#2d5a3d",
      accent: "#a8c0a0"
    }
  },
  {
    id: "san-4",
    name: "Kiné Sport",
    sector: "sante",
    job: "Kinésithérapeute",
    person: "Yann Doré",
    initials: "YD",
    tagline: "Performance & récupération",
    style: "bold",
    palette: {
      bg: "#0c2340",
      fg: "#ffffff",
      accent: "#5cbdb9"
    }
  },
  // BTP
  {
    id: "btp-1",
    name: "Chantier Pro",
    sector: "btp",
    job: "Maçon",
    person: "Hugo Lambert",
    initials: "HL",
    tagline: "Construction & rénovation",
    style: "bold",
    palette: {
      bg: "#1a1a1a",
      fg: "#ffeb3b",
      accent: "#ff5722"
    }
  },
  {
    id: "btp-2",
    name: "Charpentier",
    sector: "btp",
    job: "Charpentier couvreur",
    person: "Mathieu Roux",
    initials: "MR",
    tagline: "Toiture & charpente sur mesure",
    style: "neo",
    palette: {
      bg: "#6b3a2a",
      fg: "#fdf6e3",
      accent: "#e8c07a"
    }
  },
  {
    id: "btp-3",
    name: "Électricien",
    sector: "btp",
    job: "Électricien certifié",
    person: "Thomas Girard",
    initials: "TG",
    tagline: "Installation & dépannage 7j/7",
    style: "bold",
    palette: {
      bg: "#0a0a0a",
      fg: "#fbbf24",
      accent: "#fbbf24"
    }
  },
  {
    id: "btp-4",
    name: "Plombier",
    sector: "btp",
    job: "Plombier chauffagiste",
    person: "Sébastien Vidal",
    initials: "SV",
    tagline: "Intervention rapide",
    style: "bold",
    palette: {
      bg: "#1e3a5f",
      fg: "#ffffff",
      accent: "#fbbf24"
    }
  },
  // Beauté
  {
    id: "bea-1",
    name: "Salon Chic",
    sector: "beaute",
    job: "Coiffeuse styliste",
    person: "Manon Aubert",
    initials: "MA",
    tagline: "Coupe, couleur, conseil",
    style: "elegant",
    palette: {
      bg: "#f8e8ee",
      fg: "#3d1a2d",
      accent: "#c45c7c"
    }
  },
  {
    id: "bea-2",
    name: "Barbier",
    sector: "beaute",
    job: "Barbier",
    person: "Lucas Mercier",
    initials: "LM",
    tagline: "L'art du rasage traditionnel",
    style: "dark",
    palette: {
      bg: "#1a1a1a",
      fg: "#e8c07a",
      accent: "#c9a84c"
    }
  },
  {
    id: "bea-3",
    name: "Esthéticienne",
    sector: "beaute",
    job: "Esthéticienne",
    person: "Chloé Renard",
    initials: "CR",
    tagline: "Soins visage & corps",
    style: "soft",
    palette: {
      bg: "#fef0f5",
      fg: "#3d1a2d",
      accent: "#e88aab"
    }
  },
  {
    id: "bea-4",
    name: "Maquilleuse Pro",
    sector: "beaute",
    job: "Make-up artist",
    person: "Sarah Léon",
    initials: "SL",
    tagline: "Mariage · Mode · Événementiel",
    style: "elegant",
    palette: {
      bg: "#0d0d0d",
      fg: "#f8e8ee",
      accent: "#e88aab"
    },
    badge: "Disponible"
  },
  // Conseil
  {
    id: "con-1",
    name: "Consultant Tech",
    sector: "conseil",
    job: "Consultant indépendant",
    person: "Sophie Morel",
    initials: "SM",
    tagline: "Stratégie produit & data",
    style: "minimal",
    palette: {
      bg: "#ffffff",
      fg: "#0a0a1a",
      accent: "#4f46e5"
    }
  },
  {
    id: "con-2",
    name: "Freelance Design",
    sector: "conseil",
    job: "Designer freelance",
    person: "Nathan Bertin",
    initials: "NB",
    tagline: "Brand, UI & motion",
    style: "neo",
    palette: {
      bg: "#0a0a1a",
      fg: "#ffffff",
      accent: "#a78bfa"
    }
  },
  {
    id: "con-3",
    name: "Coach Business",
    sector: "conseil",
    job: "Coach business",
    person: "Aïcha Benali",
    initials: "AB",
    tagline: "Faites passer un cap à votre activité",
    style: "elegant",
    palette: {
      bg: "#1a3c2a",
      fg: "#ffffff",
      accent: "#c9a84c"
    }
  },
  // Commercial
  {
    id: "com-1",
    name: "Account Exec",
    sector: "commercial",
    job: "Account executive",
    person: "Karim Lahbabi",
    initials: "KL",
    tagline: "Solutions SaaS pour PME",
    style: "minimal",
    palette: {
      bg: "#ffffff",
      fg: "#0c2340",
      accent: "#3b6fa0"
    }
  },
  {
    id: "com-2",
    name: "Sales Manager",
    sector: "commercial",
    job: "Sales manager",
    person: "Marie Faure",
    initials: "MF",
    tagline: "Closons ensemble",
    style: "bold",
    palette: {
      bg: "#0f1b3d",
      fg: "#ffffff",
      accent: "#fbbf24"
    }
  },
  {
    id: "com-3",
    name: "Business Dev",
    sector: "commercial",
    job: "Business developer",
    person: "Tom Garnier",
    initials: "TG",
    tagline: "Croissance & partenariats",
    style: "neo",
    palette: {
      bg: "#1a1a2e",
      fg: "#ffffff",
      accent: "#4ade80"
    }
  },
  // Juridique
  {
    id: "jur-1",
    name: "Avocat Cabinet",
    sector: "juridique",
    job: "Avocat à la Cour",
    person: "Maître C. Dumas",
    initials: "CD",
    tagline: "Droit des affaires",
    style: "elegant",
    palette: {
      bg: "#0f1b3d",
      fg: "#f5f0e0",
      accent: "#c9a84c"
    }
  },
  {
    id: "jur-2",
    name: "Notaire",
    sector: "juridique",
    job: "Notaire associé",
    person: "Maître P. Renaud",
    initials: "PR",
    tagline: "Famille · Immobilier · Entreprise",
    style: "minimal",
    palette: {
      bg: "#fafaf7",
      fg: "#0f1b3d",
      accent: "#8b6f5e"
    }
  },
  {
    id: "jur-3",
    name: "Juriste Conseil",
    sector: "juridique",
    job: "Juriste d'entreprise",
    person: "Laure Caillet",
    initials: "LC",
    tagline: "Compliance & contrats",
    style: "elegant",
    palette: {
      bg: "#1a1a2e",
      fg: "#ffffff",
      accent: "#a78bfa"
    }
  },
  // Créatif
  {
    id: "cre-1",
    name: "Photographe Studio",
    sector: "creatif",
    job: "Photographe pro",
    person: "Élodie Rousseau",
    initials: "ER",
    tagline: "Mariage · Portrait · Lifestyle",
    style: "dark",
    palette: {
      bg: "#0a0a0a",
      fg: "#fafaf7",
      accent: "#e85d3a"
    }
  },
  {
    id: "cre-2",
    name: "Vidéaste",
    sector: "creatif",
    job: "Vidéaste freelance",
    person: "Adam Joubert",
    initials: "AJ",
    tagline: "Films de marque",
    style: "neo",
    palette: {
      bg: "#1a1a1a",
      fg: "#ffffff",
      accent: "#67e8f9"
    }
  },
  {
    id: "cre-3",
    name: "Graphiste",
    sector: "creatif",
    job: "Direction artistique",
    person: "Iris Naud",
    initials: "IN",
    tagline: "Identités visuelles bold",
    style: "bold",
    palette: {
      bg: "#ffeb3b",
      fg: "#0a0a0a",
      accent: "#ff5722"
    },
    badge: "Portfolio"
  },
  // Sport
  {
    id: "spo-1",
    name: "Coach Sportif",
    sector: "sport",
    job: "Coach personnel",
    person: "Tarek Idrissi",
    initials: "TI",
    tagline: "Transforme ton corps en 12 semaines",
    style: "bold",
    palette: {
      bg: "#0a0a0a",
      fg: "#ffffff",
      accent: "#73ffb8"
    }
  },
  {
    id: "spo-2",
    name: "Yoga Studio",
    sector: "sport",
    job: "Professeure de yoga",
    person: "Anaïs Lemoine",
    initials: "AL",
    tagline: "Vinyasa · Yin · Méditation",
    style: "soft",
    palette: {
      bg: "#f5f0e8",
      fg: "#2d5a3d",
      accent: "#a8c0a0"
    }
  },
  {
    id: "spo-3",
    name: "Crossfit Coach",
    sector: "sport",
    job: "Coach Crossfit",
    person: "Romain Salvi",
    initials: "RS",
    tagline: "Plus fort. Plus loin. Ensemble.",
    style: "bold",
    palette: {
      bg: "#1a1a1a",
      fg: "#fbbf24",
      accent: "#e85d3a"
    }
  },
  // Artisan
  {
    id: "art-1",
    name: "Menuisier",
    sector: "artisan",
    job: "Menuisier ébéniste",
    person: "Vincent Carré",
    initials: "VC",
    tagline: "Mobilier sur mesure",
    style: "neo",
    palette: {
      bg: "#6b3a2a",
      fg: "#fdf6e3",
      accent: "#c9a84c"
    }
  },
  {
    id: "art-2",
    name: "Fleuriste",
    sector: "artisan",
    job: "Fleuriste créatrice",
    person: "Margot Leroy",
    initials: "ML",
    tagline: "Compositions sur mesure",
    style: "soft",
    palette: {
      bg: "#fef0f5",
      fg: "#1a3c2a",
      accent: "#c45c7c"
    }
  },
  {
    id: "art-3",
    name: "Bijoutier",
    sector: "artisan",
    job: "Bijoutier joaillier",
    person: "Olivier Vasseur",
    initials: "OV",
    tagline: "Création & réparation",
    style: "elegant",
    palette: {
      bg: "#0d0d0d",
      fg: "#f0d78c",
      accent: "#c9a84c"
    }
  },
  // Auto
  {
    id: "aut-1",
    name: "Garage Auto",
    sector: "auto",
    job: "Mécanicien auto",
    person: "Bruno Pichon",
    initials: "BP",
    tagline: "Entretien · Réparation · Diagnostic",
    style: "bold",
    palette: {
      bg: "#1a1a1a",
      fg: "#ffffff",
      accent: "#e85d3a"
    }
  },
  {
    id: "aut-2",
    name: "Carrossier",
    sector: "auto",
    job: "Carrossier peintre",
    person: "Jérémy Olivier",
    initials: "JO",
    tagline: "Votre voiture comme neuve",
    style: "bold",
    palette: {
      bg: "#0a0a0a",
      fg: "#fbbf24",
      accent: "#e85d3a"
    }
  },
  {
    id: "aut-3",
    name: "Concession",
    sector: "auto",
    job: "Conseiller commercial auto",
    person: "Florent Bidault",
    initials: "FB",
    tagline: "Trouvez la voiture qui vous va",
    style: "minimal",
    palette: {
      bg: "#ffffff",
      fg: "#0a0a0a",
      accent: "#e85d3a"
    }
  },
  // Formation
  {
    id: "for-1",
    name: "Formateur Pro",
    sector: "formation",
    job: "Formateur certifié Qualiopi",
    person: "Stéphane Guichard",
    initials: "SG",
    tagline: "Management & soft skills",
    style: "elegant",
    palette: {
      bg: "#1a1a2e",
      fg: "#ffffff",
      accent: "#a78bfa"
    }
  },
  {
    id: "for-2",
    name: "Coach Carrière",
    sector: "formation",
    job: "Coach de carrière",
    person: "Nadia Sellam",
    initials: "NS",
    tagline: "Trouvez votre prochain poste",
    style: "soft",
    palette: {
      bg: "#f8e8ee",
      fg: "#3d1a2d",
      accent: "#9b72cf"
    }
  },
  {
    id: "for-3",
    name: "Prof particulier",
    sector: "formation",
    job: "Professeur de mathématiques",
    person: "Hugo Tessier",
    initials: "HT",
    tagline: "Soutien scolaire collège · lycée",
    style: "minimal",
    palette: {
      bg: "#ffffff",
      fg: "#0a0a1a",
      accent: "#4f46e5"
    }
  }
];
const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", "Nice", "Strasbourg", "Rennes"];
const COMPANIES = {
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
  formation: ["SG Formation", "Sellam Career", "Tessier Maths"]
};
const TEMPLATES = RAW_TEMPLATES.map((t, idx) => {
  const firstName = t.person.replace(/^(Dr\.|Maître)\s+/, "").split(" ")[0];
  const female = isFemale(firstName);
  const initialsSlug = t.initials.toLowerCase();
  const companies = COMPANIES[t.sector] ?? ["Indépendant"];
  return {
    ...t,
    company: companies[idx % companies.length],
    bio: `${t.tagline}. Disponible du lundi au samedi sur ${CITIES[idx % CITIES.length]} et sa région.`,
    location: CITIES[idx % CITIES.length],
    website: `onetap.cards/${initialsSlug}`,
    phone: `+33 6 ${10 + idx % 80} ${20 + idx % 70} ${30 + idx % 60} ${40 + idx % 50}`.replace(/\s+/g, " "),
    email: `${initialsSlug}@${(COMPANIES[t.sector]?.[idx % (COMPANIES[t.sector]?.length || 1)] || "onetap").toLowerCase().replace(/[^a-z]/g, "")}.fr`,
    avatar: avatarFor(t.id, female),
    socials: SECTOR_SOCIALS[t.sector] ?? ["linkedin", "instagram"]
  };
});
function TemplatesPage() {
  const [active, setActive] = reactExports.useState("all");
  const [styleFilter, setStyleFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchSector = active === "all" || t.sector === active;
      if (!matchSector) return false;
      const matchStyle = styleFilter === "all" || t.style === styleFilter;
      if (!matchStyle) return false;
      if (!q) return true;
      return t.name.toLowerCase().includes(q) || t.job.toLowerCase().includes(q) || t.person.toLowerCase().includes(q) || t.company.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q);
    });
  }, [active, styleFilter, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromoBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 to-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          TEMPLATES.length,
          " modèles · ",
          SECTORS.length - 1,
          " secteurs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto", children: [
          "Une carte qui ressemble à ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "votre métier" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto", children: "Photo, coordonnées, réseaux sociaux, boutons d'action : tout est déjà en place. Choisissez un modèle, personnalisez-le en 3 minutes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 max-w-md mx-auto relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Rechercher un métier (ex : coiffeur, avocat...)", className: "w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "sticky top-0 z-30 bg-background/85 backdrop-blur-lg border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: SECTORS.map((s) => {
        const Icon = s.icon;
        const isActive = active === s.id;
        const count = s.id === "all" ? TEMPLATES.length : TEMPLATES.filter((t) => t.sector === s.id).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(s.id), className: `shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${isActive ? "bg-foreground text-background border-foreground shadow-md" : "bg-card text-foreground border-border hover:border-foreground/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
          s.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-background/20 text-background" : "bg-secondary text-secondary-foreground"}`, children: count })
        ] }, s.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: STYLE_FILTERS.map((s) => {
        const isActive = styleFilter === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStyleFilter(s.id), className: `shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"}`, children: s.label }, s.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 py-10 sm:py-14", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "Aucun modèle ne correspond à votre recherche" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Essayez un autre mot-clé ou changez de secteur." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6", children: filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateCard, { t, onPreview: () => setSelected(t) }, t.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-14 sm:py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-4xl font-bold tracking-tight", children: "Vous ne trouvez pas votre métier ?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: "Tous les modèles sont 100 % personnalisables. Choisissez le plus proche, on s'occupe du reste." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/offres", className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition shadow-lg", children: [
          "Créer ma carte",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", hash: "fonctionnement", className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card border border-border font-semibold hover:border-foreground/40 transition", children: "Voir comment ça marche" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewModal, { t: selected, onClose: () => setSelected(null) })
  ] });
}
function TemplateCard({
  t,
  onPreview
}) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const Icon = sector?.icon ?? Sparkles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onPreview, className: "relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br from-secondary/40 to-background flex items-center justify-center p-4 cursor-pointer", "aria-label": `Voir le modèle ${t.name} en grand`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-transform duration-500 group-hover:scale-[0.78] group-hover:-rotate-1 scale-[0.72] origin-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-[300px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col", style: {
        background: t.palette.bg,
        color: t.palette.fg
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { t, size: "lg", ctaLabel: sector?.cta })
      ] }) }) }),
      t.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wide", children: t.badge }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border text-[11px] font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
        sector?.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/90 text-background text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
        "Voir en grand"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold leading-tight truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: t.job })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold", children: t.style })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onPreview, className: "inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-card border border-border text-sm font-semibold hover:border-foreground/40 transition", "aria-label": "Aperçu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/offres", className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition group/btn", children: [
          "Utiliser ce modèle",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" })
        ] })
      ] })
    ] })
  ] });
}
function PreviewModal({
  t,
  onClose
}) {
  const sector = SECTORS.find((s) => s.id === t.sector);
  const Icon = sector?.icon ?? Sparkles;
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-border rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col sm:flex-row animate-scale-in", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-gradient-to-br from-secondary/40 to-background p-6 sm:p-10 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full max-w-[300px] aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col", style: {
      background: t.palette.bg,
      color: t.palette.fg
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { t, size: "lg", ctaLabel: sector?.cta })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:w-80 shrink-0 border-t sm:border-t-0 sm:border-l border-border p-6 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
        sector?.label,
        t.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wide", children: t.badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl font-bold leading-tight", children: t.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t.job }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: t.style })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Entreprise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate ml-2", children: t.company })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Ville" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t.location })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Réseaux" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            t.socials.length,
            " liens"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/offres", className: "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition", children: [
          "Utiliser ce modèle",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/carte-physique", className: "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-card border border-border text-sm font-semibold hover:border-foreground/40 transition", children: "Personnaliser" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-auto pt-6 text-[11px] text-muted-foreground", children: "Modèle 100 % personnalisable : photo, couleurs, liens et CTA." })
    ] })
  ] }) });
}
export {
  TemplatesPage as component
};
