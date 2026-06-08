import { CardPreview } from "@/components/TemplateCardPreview";
import type { Template } from "@/components/TemplateCardPreview";

const CENTER: Template = {
  id: "imm-1",
  name: "Agent Premium",
  sector: "immobilier",
  job: "Agent immobilier",
  company: "Horizon Immo",
  person: "Camille Durand",
  initials: "CD",
  tagline: "L'immobilier qui vous ressemble",
  bio: "L'immobilier qui vous ressemble. Disponible du lundi au samedi sur Paris et sa région.",
  location: "Paris",
  website: "cartevisitedigitale.fr/cd",
  phone: "+33 6 10 20 30 40",
  email: "cd@horizonimmo.fr",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["linkedin", "instagram", "facebook"],
  style: "elegant",
  palette: { bg: "#0f1b3d", fg: "#ffffff", accent: "#d4a574" },
  badge: "Top vente",
};

const LEFT: Template = {
  id: "bea-1",
  name: "Salon Chic",
  sector: "beaute",
  job: "Coiffeuse styliste",
  company: "Studio Chic",
  person: "Manon Aubert",
  initials: "MA",
  tagline: "Coupe, couleur, conseil",
  bio: "Coupe, couleur, conseil. Disponible du lundi au samedi sur Lyon et sa région.",
  location: "Lyon",
  website: "cartevisitedigitale.fr/ma",
  phone: "+33 6 11 21 31 41",
  email: "ma@studiochic.fr",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["instagram", "tiktok", "whatsapp"],
  style: "elegant",
  palette: { bg: "#f8e8ee", fg: "#3d1a2d", accent: "#c45c7c" },
};

const RIGHT: Template = {
  id: "con-2",
  name: "Freelance Design",
  sector: "conseil",
  job: "Designer freelance",
  company: "Bertin Studio",
  person: "Nathan Bertin",
  initials: "NB",
  tagline: "Brand, UI & motion",
  bio: "Brand, UI & motion. Disponible du lundi au samedi sur Marseille et sa région.",
  location: "Marseille",
  website: "cartevisitedigitale.fr/nb",
  phone: "+33 6 12 22 32 42",
  email: "nb@bertinstudio.fr",
  avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
  socials: ["linkedin", "x"],
  style: "neo",
  palette: { bg: "#0a0a1a", fg: "#ffffff", accent: "#a78bfa" },
};

function PhoneFrame({ t, size = "lg" }: { t: Template; size?: "sm" | "lg" }) {
  const frameW = size === "lg" ? "w-[260px] sm:w-[280px]" : "w-[200px] sm:w-[220px]";
  return (
    <div className={`relative ${frameW} aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl`}>
      <div
        className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
        style={{ background: t.palette.bg, color: t.palette.fg }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-zinc-900 z-10" />
        <CardPreview t={t} size="lg" />
      </div>
    </div>
  );
}

export function HeroCards() {
  return (
    <div className="relative w-full flex items-end justify-center min-h-[420px] sm:min-h-[480px]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-brand opacity-20 blur-[100px] rounded-full pointer-events-none" />

      {/* Left card */}
      <div className="absolute left-[-40px] sm:left-[-20px] bottom-0 z-10 transform scale-[0.72] sm:scale-[0.78] origin-bottom-right -rotate-[8deg] opacity-95">
        <PhoneFrame t={LEFT} />
      </div>

      {/* Right card */}
      <div className="absolute right-[-40px] sm:right-[-20px] bottom-0 z-10 transform scale-[0.72] sm:scale-[0.78] origin-bottom-left rotate-[8deg] opacity-95">
        <PhoneFrame t={RIGHT} />
      </div>

      {/* Center card */}
      <div className="relative z-20 transform scale-[0.92] sm:scale-100">
        <PhoneFrame t={CENTER} size="lg" />
      </div>
    </div>
  );
}
