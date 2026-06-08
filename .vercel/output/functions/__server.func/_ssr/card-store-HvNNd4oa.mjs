import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const BRICK_VARIANTS = {
  identity: [
    { id: "centered", label: "Centrée", hint: "Avatar + nom centrés" },
    { id: "cover", label: "Couverture", hint: "Bandeau + avatar débordant" },
    { id: "horizontal", label: "Horizontal", hint: "Avatar à gauche, infos à droite" }
  ],
  actions: [
    { id: "icons", label: "Icônes", hint: "Rangée d'icônes rondes" },
    { id: "pills", label: "Pills", hint: "Boutons pleine largeur" },
    { id: "grid", label: "Grille", hint: "Grille 2 × 2" }
  ],
  vcard: [
    { id: "gradient", label: "Gradient", hint: "Bouton large coloré" },
    { id: "outline", label: "Outlined", hint: "Minimaliste, bordure" },
    { id: "card", label: "Carte", hint: "Icône + texte secondaire" }
  ],
  stats: [
    { id: "inline", label: "Ligne", hint: "Grille 3 colonnes" },
    { id: "stacked", label: "Empilées", hint: "Gros chiffres en colonne" },
    { id: "pills", label: "Pills", hint: "Mini-cartes compactes" }
  ],
  about: [
    { id: "default", label: "Standard", hint: "Texte + badges" },
    { id: "quote", label: "Citation", hint: "Style guillemets" },
    { id: "card", label: "Carte", hint: "Avec icône" }
  ],
  video: [
    { id: "embed", label: "Embed", hint: "Lecteur YouTube direct" },
    { id: "thumb", label: "Vignette", hint: "Thumbnail + play (léger)" },
    { id: "cinema", label: "Cinéma", hint: "Titre overlay en bas" }
  ],
  services: [
    { id: "list", label: "Liste", hint: "Lignes avec icône" },
    { id: "numbered", label: "Numérotée", hint: "Grille 01 / 02 / 03" },
    { id: "carousel", label: "Carrousel", hint: "Cartes défilantes" }
  ],
  listings: [
    { id: "carousel", label: "Carrousel", hint: "Snap horizontal (actuel)" },
    { id: "stacked", label: "Empilés", hint: "Cartes pleine largeur" },
    { id: "compact", label: "Compact", hint: "Lignes mini-thumb" }
  ],
  calendar: [
    { id: "row", label: "Row", hint: "Ligne avec chevron" },
    { id: "cta", label: "CTA", hint: "Bouton pleine largeur" },
    { id: "block", label: "Bloc", hint: "Icône agenda centrée" }
  ],
  languages: [
    { id: "chips", label: "Chips", hint: "Pastilles avec icône" },
    { id: "list", label: "Liste", hint: "Avec puces de niveau" },
    { id: "grid", label: "Grille", hint: "2 colonnes" }
  ],
  cta: [
    { id: "gradient", label: "Gradient", hint: "Bannière dégradée" },
    { id: "outline", label: "Outlined", hint: "Minimaliste" },
    { id: "bold", label: "Bold", hint: "Fond accent fort" }
  ],
  contact: [
    { id: "list", label: "Liste", hint: "Rows (actuel)" },
    { id: "grid", label: "Grille", hint: "2 × 2 mini-cartes" },
    { id: "compact", label: "Compact", hint: "Icônes + valeurs" }
  ],
  socials: [
    { id: "icons", label: "Icônes", hint: "Ronds centrés" },
    { id: "pills", label: "Pills", hint: "Avec libellé" },
    { id: "branded", label: "Branded", hint: "Couleurs de marque" }
  ]
};
const DEFAULT_VARIANTS = {
  identity: "centered",
  actions: "icons",
  vcard: "gradient",
  stats: "inline",
  about: "default",
  video: "embed",
  services: "list",
  listings: "carousel",
  calendar: "row",
  languages: "chips",
  cta: "gradient",
  contact: "list",
  socials: "icons"
};
const DEFAULT_SECTION_ORDER = [
  "identity",
  "actions",
  "vcard",
  "stats",
  "about",
  "video",
  "services",
  "listings",
  "testimonials",
  "calendar",
  "languages",
  "cta",
  "contact",
  "socials",
  "theme"
];
const DEFAULT_CARD = {
  name: "Alexandre Moreau",
  title: "Conseiller immobilier de prestige",
  agency: "Maison Vendôme",
  area: "Paris & Île-de-France",
  photo: "",
  coverPhoto: "",
  actions: { call: true, whatsapp: true, email: true, website: true },
  vcardEnabled: true,
  statsEnabled: true,
  stats: [
    { label: "Biens vendus", value: "240+" },
    { label: "Note clients", value: "4.9" },
    { label: "Années", value: "12" }
  ],
  aboutEnabled: true,
  bio: "12 ans d'expertise sur le marché parisien. Spécialiste des biens d'exception, je vous accompagne avec discrétion et exigence à chaque étape de votre projet.",
  badges: [
    { id: "b1", label: "FNAIM certifié" },
    { id: "b2", label: "Top 1% Paris" },
    { id: "b3", label: "Prestige" }
  ],
  videoEnabled: false,
  videoTitle: "Présentation en 60 secondes",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Estimation gratuite", description: "Évaluation précise sous 48 h, basée sur le marché local." },
    { id: "s2", title: "Accompagnement vendeur", description: "De la mise en valeur du bien à la signature chez le notaire." },
    { id: "s3", title: "Chasse immobilière", description: "Recherche sur-mesure pour acquéreurs exigeants." }
  ],
  listingsEnabled: true,
  listings: [],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Camille D.", role: "Vendeuse — Paris 7e", text: "Discret, efficace, à l'écoute. Vente conclue 8 % au-dessus de l'estimation initiale.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Julien R.", role: "Acquéreur — Neuilly", text: "Alexandre a trouvé exactement le bien que nous cherchions, en moins de 3 semaines.", rating: 5, photo: "", link: "" }
  ],
  testimonialsStyle: "cards",
  calendarEnabled: false,
  calendarLabel: "Réserver un rendez-vous",
  calendarUrl: "https://calendly.com/votre-lien",
  languagesEnabled: false,
  languages: [
    { id: "l1", name: "Français", level: "Natif" },
    { id: "l2", name: "Anglais", level: "Courant" }
  ],
  ctaEnabled: false,
  ctaTitle: "Vous vendez ou achetez ?",
  ctaText: "Échangeons 15 minutes pour cadrer votre projet, sans engagement.",
  ctaButtonLabel: "Prendre contact",
  ctaButtonUrl: "https://calendly.com/votre-lien",
  contactEnabled: true,
  phone: "+33612345678",
  phoneDisplay: "+33 6 12 34 56 78",
  email: "alexandre@maison-vendome.fr",
  website: "maison-vendome.fr",
  whatsapp: "33612345678",
  socialsEnabled: true,
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
  whatsappSocial: "33612345678",
  accent: "gold",
  sectionOrder: DEFAULT_SECTION_ORDER,
  variants: { ...DEFAULT_VARIANTS }
};
const grad = (a, b) => `linear-gradient(135deg, ${a}, ${b})`;
const radial = (a, b) => `radial-gradient(120% 80% at 50% 0%, ${a} 0%, ${b} 60%)`;
const gold = {
  mode: "dark",
  bg: "oklch(0.16 0.018 250)",
  surface: "oklch(0.21 0.02 250)",
  surfaceAlt: "oklch(0.26 0.025 250)",
  border: "oklch(0.32 0.02 250 / 0.6)",
  text: "oklch(0.97 0.005 80)",
  textMuted: "oklch(0.7 0.015 250)",
  accent: "oklch(0.82 0.13 85)",
  gradient: grad("oklch(0.88 0.1 90)", "oklch(0.75 0.14 75)"),
  headerBg: radial("oklch(0.28 0.05 250)", "oklch(0.16 0.018 250)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const noir = {
  mode: "dark",
  bg: "oklch(0.12 0 0)",
  surface: "oklch(0.17 0 0)",
  surfaceAlt: "oklch(0.22 0 0)",
  border: "oklch(0.3 0 0 / 0.7)",
  text: "oklch(0.97 0 0)",
  textMuted: "oklch(0.68 0 0)",
  accent: "oklch(0.85 0.12 88)",
  gradient: grad("oklch(0.9 0.1 92)", "oklch(0.74 0.14 78)"),
  headerBg: radial("oklch(0.2 0 0)", "oklch(0.1 0 0)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const emerald = {
  mode: "dark",
  bg: "oklch(0.16 0.025 165)",
  surface: "oklch(0.21 0.03 165)",
  surfaceAlt: "oklch(0.26 0.035 165)",
  border: "oklch(0.32 0.03 165 / 0.6)",
  text: "oklch(0.97 0.01 165)",
  textMuted: "oklch(0.7 0.02 165)",
  accent: "oklch(0.78 0.16 160)",
  gradient: grad("oklch(0.85 0.14 165)", "oklch(0.6 0.16 155)"),
  headerBg: radial("oklch(0.28 0.06 165)", "oklch(0.15 0.025 165)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const forest = {
  mode: "dark",
  bg: "oklch(0.18 0.03 145)",
  surface: "oklch(0.23 0.035 145)",
  surfaceAlt: "oklch(0.28 0.04 145)",
  border: "oklch(0.34 0.03 145 / 0.6)",
  text: "oklch(0.96 0.015 145)",
  textMuted: "oklch(0.72 0.02 145)",
  accent: "oklch(0.7 0.14 140)",
  gradient: grad("oklch(0.78 0.13 140)", "oklch(0.55 0.15 150)"),
  headerBg: radial("oklch(0.3 0.06 145)", "oklch(0.17 0.03 145)"),
  onAccent: "oklch(0.98 0 0)"
};
const navy = {
  mode: "dark",
  bg: "oklch(0.17 0.04 260)",
  surface: "oklch(0.22 0.045 260)",
  surfaceAlt: "oklch(0.27 0.05 260)",
  border: "oklch(0.34 0.05 260 / 0.6)",
  text: "oklch(0.97 0.005 250)",
  textMuted: "oklch(0.72 0.02 250)",
  accent: "oklch(0.7 0.14 250)",
  gradient: grad("oklch(0.75 0.13 245)", "oklch(0.5 0.15 260)"),
  headerBg: radial("oklch(0.3 0.08 260)", "oklch(0.16 0.04 260)"),
  onAccent: "oklch(0.98 0 0)"
};
const sapphire = {
  mode: "dark",
  bg: "oklch(0.16 0.04 250)",
  surface: "oklch(0.21 0.05 250)",
  surfaceAlt: "oklch(0.27 0.06 250)",
  border: "oklch(0.35 0.06 250 / 0.55)",
  text: "oklch(0.97 0.005 250)",
  textMuted: "oklch(0.72 0.02 250)",
  accent: "oklch(0.7 0.18 245)",
  gradient: grad("oklch(0.75 0.18 240)", "oklch(0.55 0.22 255)"),
  headerBg: radial("oklch(0.3 0.1 250)", "oklch(0.15 0.04 250)"),
  onAccent: "oklch(0.98 0 0)"
};
const graphite = {
  mode: "dark",
  bg: "oklch(0.18 0.005 250)",
  surface: "oklch(0.23 0.006 250)",
  surfaceAlt: "oklch(0.28 0.008 250)",
  border: "oklch(0.36 0.01 250 / 0.6)",
  text: "oklch(0.97 0.002 250)",
  textMuted: "oklch(0.7 0.005 250)",
  accent: "oklch(0.78 0.01 250)",
  gradient: grad("oklch(0.82 0.005 250)", "oklch(0.55 0.01 250)"),
  headerBg: radial("oklch(0.28 0.008 250)", "oklch(0.16 0.005 250)"),
  onAccent: "oklch(0.18 0.02 250)"
};
const bordeaux = {
  mode: "dark",
  bg: "oklch(0.18 0.05 20)",
  surface: "oklch(0.23 0.06 20)",
  surfaceAlt: "oklch(0.28 0.07 20)",
  border: "oklch(0.35 0.06 20 / 0.6)",
  text: "oklch(0.97 0.01 30)",
  textMuted: "oklch(0.72 0.03 25)",
  accent: "oklch(0.68 0.18 20)",
  gradient: grad("oklch(0.75 0.18 25)", "oklch(0.5 0.2 15)"),
  headerBg: radial("oklch(0.32 0.1 20)", "oklch(0.17 0.05 20)"),
  onAccent: "oklch(0.98 0 0)"
};
const slate = {
  mode: "dark",
  bg: "oklch(0.2 0.015 240)",
  surface: "oklch(0.25 0.02 240)",
  surfaceAlt: "oklch(0.3 0.025 240)",
  border: "oklch(0.38 0.02 240 / 0.6)",
  text: "oklch(0.97 0.005 240)",
  textMuted: "oklch(0.72 0.015 240)",
  accent: "oklch(0.75 0.13 230)",
  gradient: grad("oklch(0.8 0.12 225)", "oklch(0.6 0.15 235)"),
  headerBg: radial("oklch(0.32 0.04 240)", "oklch(0.18 0.015 240)"),
  onAccent: "oklch(0.98 0 0)"
};
const violet = {
  mode: "dark",
  bg: "oklch(0.17 0.05 295)",
  surface: "oklch(0.22 0.06 295)",
  surfaceAlt: "oklch(0.27 0.07 295)",
  border: "oklch(0.35 0.07 295 / 0.55)",
  text: "oklch(0.97 0.01 295)",
  textMuted: "oklch(0.72 0.03 295)",
  accent: "oklch(0.72 0.2 295)",
  gradient: grad("oklch(0.78 0.18 290)", "oklch(0.55 0.22 300)"),
  headerBg: radial("oklch(0.3 0.1 295)", "oklch(0.16 0.05 295)"),
  onAccent: "oklch(0.98 0 0)"
};
const crimson = {
  mode: "dark",
  bg: "oklch(0.16 0.04 25)",
  surface: "oklch(0.21 0.05 25)",
  surfaceAlt: "oklch(0.26 0.06 25)",
  border: "oklch(0.34 0.06 25 / 0.55)",
  text: "oklch(0.97 0.01 30)",
  textMuted: "oklch(0.72 0.03 25)",
  accent: "oklch(0.7 0.21 25)",
  gradient: grad("oklch(0.75 0.2 30)", "oklch(0.55 0.24 20)"),
  headerBg: radial("oklch(0.3 0.1 25)", "oklch(0.15 0.04 25)"),
  onAccent: "oklch(0.98 0 0)"
};
const magenta = {
  mode: "dark",
  bg: "oklch(0.17 0.05 330)",
  surface: "oklch(0.22 0.06 330)",
  surfaceAlt: "oklch(0.27 0.07 330)",
  border: "oklch(0.35 0.07 330 / 0.55)",
  text: "oklch(0.97 0.01 330)",
  textMuted: "oklch(0.73 0.03 330)",
  accent: "oklch(0.7 0.24 330)",
  gradient: grad("oklch(0.75 0.22 325)", "oklch(0.55 0.26 335)"),
  headerBg: radial("oklch(0.3 0.1 330)", "oklch(0.16 0.05 330)"),
  onAccent: "oklch(0.98 0 0)"
};
const copper = {
  mode: "light",
  bg: "oklch(0.97 0.015 60)",
  surface: "oklch(1 0.005 60)",
  surfaceAlt: "oklch(0.94 0.025 50)",
  border: "oklch(0.86 0.03 50 / 0.8)",
  text: "oklch(0.22 0.03 40)",
  textMuted: "oklch(0.5 0.04 40)",
  accent: "oklch(0.62 0.17 40)",
  gradient: grad("oklch(0.78 0.14 55)", "oklch(0.58 0.18 35)"),
  headerBg: grad("oklch(0.96 0.025 60)", "oklch(0.9 0.04 50)"),
  onAccent: "oklch(0.22 0.03 40)"
};
const cream = {
  mode: "light",
  bg: "oklch(0.97 0.012 80)",
  surface: "oklch(1 0.005 80)",
  surfaceAlt: "oklch(0.94 0.02 80)",
  border: "oklch(0.87 0.025 80 / 0.8)",
  text: "oklch(0.24 0.02 80)",
  textMuted: "oklch(0.52 0.03 80)",
  accent: "oklch(0.65 0.14 65)",
  gradient: grad("oklch(0.8 0.13 75)", "oklch(0.62 0.16 55)"),
  headerBg: grad("oklch(0.96 0.02 80)", "oklch(0.9 0.04 70)"),
  onAccent: "oklch(0.24 0.02 80)"
};
const sand = {
  mode: "light",
  bg: "oklch(0.95 0.018 80)",
  surface: "oklch(0.99 0.008 80)",
  surfaceAlt: "oklch(0.92 0.025 75)",
  border: "oklch(0.84 0.03 75 / 0.8)",
  text: "oklch(0.22 0.02 70)",
  textMuted: "oklch(0.5 0.03 70)",
  accent: "oklch(0.5 0.04 70)",
  gradient: grad("oklch(0.7 0.06 65)", "oklch(0.45 0.05 70)"),
  headerBg: grad("oklch(0.92 0.025 75)", "oklch(0.85 0.04 70)"),
  onAccent: "oklch(0.98 0 0)"
};
const clay = {
  mode: "light",
  bg: "oklch(0.95 0.02 45)",
  surface: "oklch(0.99 0.01 45)",
  surfaceAlt: "oklch(0.92 0.03 40)",
  border: "oklch(0.84 0.04 40 / 0.8)",
  text: "oklch(0.22 0.04 30)",
  textMuted: "oklch(0.5 0.05 30)",
  accent: "oklch(0.58 0.18 30)",
  gradient: grad("oklch(0.7 0.18 35)", "oklch(0.5 0.2 22)"),
  headerBg: grad("oklch(0.93 0.03 40)", "oklch(0.86 0.05 30)"),
  onAccent: "oklch(0.98 0 0)"
};
const rose = {
  mode: "light",
  bg: "oklch(0.97 0.012 0)",
  surface: "oklch(1 0.005 0)",
  surfaceAlt: "oklch(0.94 0.025 0)",
  border: "oklch(0.87 0.03 0 / 0.8)",
  text: "oklch(0.24 0.03 0)",
  textMuted: "oklch(0.52 0.04 0)",
  accent: "oklch(0.66 0.18 355)",
  gradient: grad("oklch(0.82 0.12 5)", "oklch(0.62 0.2 350)"),
  headerBg: grad("oklch(0.96 0.025 0)", "oklch(0.88 0.05 355)"),
  onAccent: "oklch(0.98 0 0)"
};
const blush = {
  mode: "light",
  bg: "oklch(0.97 0.018 30)",
  surface: "oklch(1 0.008 30)",
  surfaceAlt: "oklch(0.94 0.03 30)",
  border: "oklch(0.87 0.035 30 / 0.8)",
  text: "oklch(0.24 0.04 25)",
  textMuted: "oklch(0.52 0.05 25)",
  accent: "oklch(0.7 0.17 25)",
  gradient: grad("oklch(0.85 0.13 35)", "oklch(0.65 0.19 18)"),
  headerBg: grad("oklch(0.96 0.025 30)", "oklch(0.88 0.05 25)"),
  onAccent: "oklch(0.98 0 0)"
};
const mint = {
  mode: "light",
  bg: "oklch(0.97 0.018 175)",
  surface: "oklch(1 0.008 175)",
  surfaceAlt: "oklch(0.93 0.03 175)",
  border: "oklch(0.86 0.035 175 / 0.8)",
  text: "oklch(0.22 0.03 175)",
  textMuted: "oklch(0.5 0.04 175)",
  accent: "oklch(0.62 0.14 170)",
  gradient: grad("oklch(0.78 0.12 175)", "oklch(0.55 0.16 165)"),
  headerBg: grad("oklch(0.94 0.025 175)", "oklch(0.86 0.05 170)"),
  onAccent: "oklch(0.22 0.03 175)"
};
const sky = {
  mode: "light",
  bg: "oklch(0.97 0.018 225)",
  surface: "oklch(1 0.008 225)",
  surfaceAlt: "oklch(0.93 0.03 225)",
  border: "oklch(0.86 0.035 225 / 0.8)",
  text: "oklch(0.22 0.03 230)",
  textMuted: "oklch(0.5 0.04 230)",
  accent: "oklch(0.62 0.15 230)",
  gradient: grad("oklch(0.78 0.12 225)", "oklch(0.55 0.17 235)"),
  headerBg: grad("oklch(0.94 0.025 225)", "oklch(0.86 0.05 230)"),
  onAccent: "oklch(0.98 0 0)"
};
const paper = {
  mode: "light",
  bg: "oklch(0.98 0.003 250)",
  surface: "oklch(1 0 0)",
  surfaceAlt: "oklch(0.93 0.01 250)",
  border: "oklch(0.85 0.015 250 / 0.8)",
  text: "oklch(0.2 0.01 250)",
  textMuted: "oklch(0.48 0.015 250)",
  accent: "oklch(0.45 0.13 255)",
  gradient: grad("oklch(0.6 0.13 250)", "oklch(0.38 0.15 260)"),
  headerBg: grad("oklch(0.96 0.01 250)", "oklch(0.88 0.02 250)"),
  onAccent: "oklch(0.98 0 0)"
};
const sun = {
  mode: "light",
  bg: "oklch(0.97 0.02 75)",
  surface: "oklch(1 0.008 75)",
  surfaceAlt: "oklch(0.94 0.035 75)",
  border: "oklch(0.86 0.04 75 / 0.8)",
  text: "oklch(0.24 0.03 60)",
  textMuted: "oklch(0.52 0.04 60)",
  accent: "oklch(0.7 0.17 70)",
  gradient: grad("oklch(0.85 0.14 80)", "oklch(0.68 0.18 60)"),
  headerBg: grad("oklch(0.95 0.03 75)", "oklch(0.86 0.05 65)"),
  onAccent: "oklch(0.22 0.03 60)"
};
const CARD_THEMES = [
  // Dark
  { id: "gold", label: "Or", sector: "Immobilier prestige", palette: gold },
  { id: "noir", label: "Noir & Or", sector: "Luxe / Joaillerie", palette: noir },
  { id: "emerald", label: "Émeraude", sector: "Finance / Conseil", palette: emerald },
  { id: "forest", label: "Forêt", sector: "Écologie / Outdoor", palette: forest },
  { id: "navy", label: "Marine", sector: "Avocat / Notaire", palette: navy },
  { id: "sapphire", label: "Saphir", sector: "Tech / SaaS", palette: sapphire },
  { id: "graphite", label: "Graphite", sector: "Éditorial / Photo", palette: graphite },
  { id: "bordeaux", label: "Bordeaux", sector: "Sommellerie / Gastro", palette: bordeaux },
  { id: "slate", label: "Ardoise", sector: "Industrie / BTP", palette: slate },
  { id: "violet", label: "Violet", sector: "Créatif / Design", palette: violet },
  { id: "crimson", label: "Cramoisi", sector: "Sport / Fitness", palette: crimson },
  { id: "magenta", label: "Magenta", sector: "Mode / Événementiel", palette: magenta },
  // Light
  { id: "copper", label: "Cuivre", sector: "Artisanat", palette: copper },
  { id: "cream", label: "Crème", sector: "Coach / Lifestyle", palette: cream },
  { id: "sand", label: "Sable", sector: "Architecture / Déco", palette: sand },
  { id: "clay", label: "Terracotta", sector: "Restauration / Café", palette: clay },
  { id: "rose", label: "Rose poudré", sector: "Beauté / Esthétique", palette: rose },
  { id: "blush", label: "Pêche", sector: "Coiffure / Maquillage", palette: blush },
  { id: "mint", label: "Menthe", sector: "Santé / Bien-être", palette: mint },
  { id: "sky", label: "Azur", sector: "Éducation / Enfance", palette: sky },
  { id: "paper", label: "Papier", sector: "Avocat clair / Édito", palette: paper },
  { id: "sun", label: "Soleil", sector: "Voyage / Hôtellerie", palette: sun }
];
const THEMES_BY_ID = Object.fromEntries(
  CARD_THEMES.map((t) => [t.id, t])
);
const PROFESSIONS = [
  // Immobilier
  { id: "agent-immo-prestige", label: "Agent immobilier prestige", category: "Immobilier", themeId: "gold" },
  { id: "agent-immo", label: "Agent immobilier", category: "Immobilier", themeId: "navy" },
  { id: "chasseur-immo", label: "Chasseur immobilier", category: "Immobilier", themeId: "graphite" },
  { id: "promoteur", label: "Promoteur immobilier", category: "Immobilier", themeId: "emerald" },
  { id: "diagnostiqueur", label: "Diagnostiqueur immobilier", category: "Immobilier", themeId: "sky" },
  // Juridique & Conseil
  { id: "avocat", label: "Avocat", category: "Juridique", themeId: "navy" },
  { id: "avocat-affaires", label: "Avocat d'affaires", category: "Juridique", themeId: "paper" },
  { id: "notaire", label: "Notaire", category: "Juridique", themeId: "paper" },
  { id: "huissier", label: "Commissaire de justice", category: "Juridique", themeId: "graphite" },
  { id: "expert-comptable", label: "Expert-comptable", category: "Juridique", themeId: "emerald" },
  { id: "consultant", label: "Consultant / Conseil", category: "Juridique", themeId: "sapphire" },
  // Finance
  { id: "courtier", label: "Courtier en prêt", category: "Finance", themeId: "emerald" },
  { id: "conseiller-patrimoine", label: "Conseiller en patrimoine", category: "Finance", themeId: "navy" },
  { id: "assureur", label: "Assureur", category: "Finance", themeId: "navy" },
  { id: "trader", label: "Analyste / Trader", category: "Finance", themeId: "graphite" },
  // Tech & Digital
  { id: "dev", label: "Développeur / Ingé logiciel", category: "Tech", themeId: "sapphire" },
  { id: "freelance-tech", label: "Freelance tech", category: "Tech", themeId: "violet" },
  { id: "saas-founder", label: "Fondateur SaaS", category: "Tech", themeId: "sapphire" },
  { id: "data", label: "Data scientist", category: "Tech", themeId: "graphite" },
  { id: "cybersec", label: "Expert cybersécurité", category: "Tech", themeId: "noir" },
  // Santé & Bien-être
  { id: "medecin", label: "Médecin généraliste", category: "Santé", themeId: "mint" },
  { id: "dentiste", label: "Chirurgien-dentiste", category: "Santé", themeId: "sky" },
  { id: "kine", label: "Kinésithérapeute", category: "Santé", themeId: "mint" },
  { id: "osteo", label: "Ostéopathe", category: "Santé", themeId: "forest" },
  { id: "psy", label: "Psychologue / Thérapeute", category: "Santé", themeId: "cream" },
  { id: "naturopathe", label: "Naturopathe", category: "Santé", themeId: "forest" },
  { id: "sage-femme", label: "Sage-femme", category: "Santé", themeId: "blush" },
  // Beauté & Esthétique
  { id: "coiffeur", label: "Coiffeur / Barbier", category: "Beauté", themeId: "blush" },
  { id: "estheticienne", label: "Esthéticienne", category: "Beauté", themeId: "rose" },
  { id: "maquilleuse", label: "Maquilleuse pro", category: "Beauté", themeId: "rose" },
  { id: "ongles", label: "Prothésiste ongulaire", category: "Beauté", themeId: "blush" },
  { id: "spa", label: "Spa / Institut", category: "Beauté", themeId: "cream" },
  // Coaching & Lifestyle
  { id: "coach-vie", label: "Coach de vie", category: "Coaching", themeId: "cream" },
  { id: "coach-sportif", label: "Coach sportif", category: "Sport", themeId: "crimson" },
  { id: "coach-pro", label: "Coach professionnel", category: "Coaching", themeId: "sapphire" },
  { id: "nutritionniste", label: "Nutritionniste", category: "Coaching", themeId: "mint" },
  { id: "yoga", label: "Prof de yoga / Pilates", category: "Coaching", themeId: "forest" },
  // Sport
  { id: "preparateur", label: "Préparateur physique", category: "Sport", themeId: "crimson" },
  { id: "club-sport", label: "Club / Salle de sport", category: "Sport", themeId: "slate" },
  // Restauration
  { id: "restaurateur", label: "Restaurateur", category: "Restauration", themeId: "clay" },
  { id: "chef", label: "Chef cuisinier", category: "Restauration", themeId: "bordeaux" },
  { id: "patissier", label: "Pâtissier", category: "Restauration", themeId: "blush" },
  { id: "sommelier", label: "Sommelier / Caviste", category: "Restauration", themeId: "bordeaux" },
  { id: "barista", label: "Café / Barista", category: "Restauration", themeId: "copper" },
  { id: "traiteur", label: "Traiteur", category: "Restauration", themeId: "clay" },
  // Artisanat & BTP
  { id: "menuisier", label: "Menuisier / Ébéniste", category: "Artisanat", themeId: "copper" },
  { id: "plombier", label: "Plombier", category: "Artisanat", themeId: "slate" },
  { id: "electricien", label: "Électricien", category: "Artisanat", themeId: "slate" },
  { id: "macon", label: "Maçon / BTP", category: "Artisanat", themeId: "slate" },
  { id: "bijoutier", label: "Bijoutier / Joaillier", category: "Artisanat", themeId: "noir" },
  { id: "tatoueur", label: "Tatoueur", category: "Artisanat", themeId: "noir" },
  { id: "fleuriste", label: "Fleuriste", category: "Artisanat", themeId: "rose" },
  { id: "paysagiste", label: "Paysagiste / Jardinier", category: "Artisanat", themeId: "forest" },
  // Mode
  { id: "styliste", label: "Styliste / Créateur de mode", category: "Mode", themeId: "magenta" },
  { id: "mannequin", label: "Mannequin / Modèle", category: "Mode", themeId: "noir" },
  { id: "boutique-mode", label: "Boutique de mode", category: "Mode", themeId: "rose" },
  // Créatif
  { id: "photographe", label: "Photographe", category: "Créatif", themeId: "graphite" },
  { id: "videaste", label: "Vidéaste / Réalisateur", category: "Créatif", themeId: "noir" },
  { id: "graphiste", label: "Graphiste / Designer", category: "Créatif", themeId: "violet" },
  { id: "illustrateur", label: "Illustrateur", category: "Créatif", themeId: "violet" },
  { id: "musicien", label: "Musicien / DJ", category: "Créatif", themeId: "magenta" },
  { id: "architecte", label: "Architecte", category: "Créatif", themeId: "sand" },
  { id: "decorateur", label: "Architecte d'intérieur", category: "Créatif", themeId: "sand" },
  // Éducation
  { id: "prof", label: "Professeur particulier", category: "Éducation", themeId: "sky" },
  { id: "formateur", label: "Formateur pro", category: "Éducation", themeId: "sapphire" },
  { id: "nounou", label: "Garde d'enfants / Nounou", category: "Éducation", themeId: "sky" },
  // Voyage & Hôtellerie
  { id: "agent-voyage", label: "Agent de voyage", category: "Voyage", themeId: "sun" },
  { id: "hotelier", label: "Hôtelier / Gîte", category: "Voyage", themeId: "sun" },
  { id: "guide", label: "Guide touristique", category: "Voyage", themeId: "sun" },
  // Événementiel & Marketing
  { id: "wedding", label: "Wedding planner", category: "Événementiel", themeId: "rose" },
  { id: "event", label: "Organisateur d'événements", category: "Événementiel", themeId: "magenta" },
  { id: "marketing", label: "Consultant marketing", category: "Événementiel", themeId: "violet" },
  { id: "community", label: "Community manager", category: "Événementiel", themeId: "magenta" },
  // Édito / Médias
  { id: "journaliste", label: "Journaliste", category: "Médias", themeId: "paper" },
  { id: "ecrivain", label: "Écrivain / Auteur", category: "Médias", themeId: "graphite" },
  { id: "podcasteur", label: "Podcasteur", category: "Médias", themeId: "bordeaux" }
];
const PROFESSIONS_BY_THEME = PROFESSIONS.reduce(
  (acc, p) => {
    (acc[p.themeId] ??= []).push(p);
    return acc;
  },
  {}
);
const PROFESSION_CATEGORIES = Array.from(
  new Set(PROFESSIONS.map((p) => p.category))
);
const KEY = "cyk.card.v1";
function normalizeOrder(order) {
  const valid = new Set(DEFAULT_SECTION_ORDER);
  const arr = Array.isArray(order) ? order.filter((x) => valid.has(x)) : [];
  for (const id of DEFAULT_SECTION_ORDER) if (!arr.includes(id)) arr.push(id);
  return arr;
}
function normalizeAccent(accent) {
  if (typeof accent === "string" && THEMES_BY_ID[accent]) {
    return accent;
  }
  return DEFAULT_CARD.accent;
}
function normalizeProfession(profession) {
  if (typeof profession !== "string") return void 0;
  return PROFESSIONS.some((p) => p.id === profession) ? profession : void 0;
}
function loadCard() {
  if (typeof window === "undefined") return DEFAULT_CARD;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_CARD;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CARD,
      ...parsed,
      accent: normalizeAccent(parsed.accent),
      profession: normalizeProfession(parsed.profession),
      sectionOrder: normalizeOrder(parsed.sectionOrder),
      variants: { ...DEFAULT_CARD.variants, ...parsed.variants ?? {} }
    };
  } catch {
    return DEFAULT_CARD;
  }
}
function useCardStore() {
  const [data, setData] = reactExports.useState(DEFAULT_CARD);
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setData(loadCard());
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
    }
  }, [data, hydrated]);
  const update = reactExports.useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);
  const reset = reactExports.useCallback(() => setData(DEFAULT_CARD), []);
  return { data, setData, update, reset, hydrated };
}
export {
  Button as B,
  CARD_THEMES as C,
  DEFAULT_CARD as D,
  PROFESSIONS as P,
  THEMES_BY_ID as T,
  PROFESSION_CATEGORIES as a,
  PROFESSIONS_BY_THEME as b,
  cn as c,
  BRICK_VARIANTS as d,
  useCardStore as u
};
