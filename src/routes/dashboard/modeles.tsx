import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CardPreview, type Template, type StyleId } from "@/components/TemplateCardPreview";
import { Search, X, Check, Sparkles } from "lucide-react";

// ── Minimal template dataset (same structure as /templates) ──
const TEMPLATES: Template[] = [
  { id: "immo-1",   name: "Agent Premium",     sector: "immobilier", job: "Agent immobilier",    company: "Century 21",     person: "Sophie Martin",    initials: "SM", tagline: "Votre projet, ma priorité", bio: "Spécialiste résidentiel haut de gamme en Île-de-France.", location: "Paris, France", website: "https://century21.fr", phone: "+33 6 01 02 03 04", email: "sophie@century21.fr", avatar: "", socials: ["linkedin", "instagram"], style: "elegant", palette: { bg: "#1a1a2e", fg: "#ffffff", accent: "#C9A96E" } },
  { id: "resto-1",  name: "Chef Étoilé",        sector: "restauration", job: "Chef cuisinier",   company: "Le Jardin",       person: "Marc Leclerc",     initials: "ML", tagline: "La gastronomie à son sommet", bio: "Chef étoilé Michelin, passionné par la cuisine française.", location: "Lyon, France", website: "https://lejardin.fr", phone: "+33 6 02 03 04 05", email: "marc@lejardin.fr", avatar: "", socials: ["instagram", "facebook"], style: "dark", palette: { bg: "#1c1008", fg: "#ffffff", accent: "#F59E0B" } },
  { id: "sante-1",  name: "Médecin Moderne",    sector: "santé",        job: "Médecin généraliste", company: "Cabinet Santé+", person: "Dr. Claire Dupont", initials: "CD", tagline: "Votre santé, ma vocation", bio: "Médecin généraliste avec 15 ans d'expérience.", location: "Bordeaux, France", website: "https://sante-plus.fr", phone: "+33 6 03 04 05 06", email: "claire@sante-plus.fr", avatar: "", socials: ["linkedin"], style: "minimal", palette: { bg: "#ffffff", fg: "#0f172a", accent: "#0EA5E9" } },
  { id: "btp-1",    name: "Artisan Expert",     sector: "btp",          job: "Maître d'œuvre",  company: "BâtiPro",         person: "Thomas Bernard",   initials: "TB", tagline: "Construire votre avenir", bio: "Expert en construction et rénovation depuis 20 ans.", location: "Toulouse, France", website: "https://batipro.fr", phone: "+33 6 04 05 06 07", email: "thomas@batipro.fr", avatar: "", socials: ["linkedin", "instagram"], style: "bold", palette: { bg: "#1e3a5f", fg: "#ffffff", accent: "#F97316" } },
  { id: "beaute-1", name: "Beauté & Style",     sector: "beauté",       job: "Coiffeuse",       company: "Studio Belle",    person: "Léa Rousseau",     initials: "LR", tagline: "La beauté en mouvement", bio: "Coiffeuse-coloriste spécialisée en tendances actuelles.", location: "Nantes, France", website: "https://studio-belle.fr", phone: "+33 6 05 06 07 08", email: "lea@studio-belle.fr", avatar: "", socials: ["instagram", "tiktok"], style: "soft", palette: { bg: "#fdf2f8", fg: "#1f1f1f", accent: "#EC4899" } },
  { id: "conseil-1", name: "Consultant Business", sector: "conseil",    job: "Consultant stratégie", company: "Synaptis",   person: "Paul Morin",       initials: "PM", tagline: "Votre croissance, notre expertise", bio: "Consultant en stratégie d'entreprise pour PME et grands groupes.", location: "Paris, France", website: "https://synaptis.fr", phone: "+33 6 06 07 08 09", email: "paul@synaptis.fr", avatar: "", socials: ["linkedin", "x"], style: "neo", palette: { bg: "#0f0f14", fg: "#ffffff", accent: "#8B5CF6" } },
  { id: "auto-1",   name: "Garage Premium",     sector: "auto",         job: "Garagiste",       company: "AutoExpert",      person: "Julien Petit",     initials: "JP", tagline: "Votre véhicule entre de bonnes mains", bio: "Mécanicien certifié, toutes marques, intervention rapide.", location: "Marseille, France", website: "https://autoexpert.fr", phone: "+33 6 07 08 09 10", email: "julien@autoexpert.fr", avatar: "", socials: ["facebook", "instagram"], style: "bold", palette: { bg: "#111827", fg: "#ffffff", accent: "#3B82F6" } },
  { id: "creativ-1", name: "Créatif Digital",   sector: "créatif",      job: "Designer UI/UX",  company: "PixelForge",      person: "Emma Laurent",     initials: "EL", tagline: "Le design qui convertit", bio: "Designer UI/UX avec 8 ans d'expérience en SaaS.", location: "Paris, France", website: "https://pixelforge.fr", phone: "+33 6 08 09 10 11", email: "emma@pixelforge.fr", avatar: "", socials: ["instagram", "linkedin", "x"], style: "neo", palette: { bg: "#0a0a0f", fg: "#ffffff", accent: "#EC4899" } },
  { id: "sport-1",  name: "Coach Sportif",      sector: "sport",        job: "Coach personnel", company: "FitPro",          person: "Antoine Garnier",  initials: "AG", tagline: "Dépassez vos limites", bio: "Coach certifié, spécialisé en transformation physique.", location: "Nice, France", website: "https://fitpro.fr", phone: "+33 6 09 10 11 12", email: "antoine@fitpro.fr", avatar: "", socials: ["instagram", "tiktok", "youtube"], style: "bold", palette: { bg: "#052e16", fg: "#ffffff", accent: "#10B981" } },
  { id: "jurid-1",  name: "Cabinet d'Avocats",  sector: "juridique",    job: "Avocat associé",  company: "Cabinet Lex",     person: "Marie Fontaine",   initials: "MF", tagline: "Vos droits, notre combat", bio: "Avocate spécialisée en droit des affaires et propriété intellectuelle.", location: "Paris, France", website: "https://cabinet-lex.fr", phone: "+33 6 10 11 12 13", email: "marie@cabinet-lex.fr", avatar: "", socials: ["linkedin"], style: "elegant", palette: { bg: "#1c1917", fg: "#ffffff", accent: "#A78BFA" } },
  { id: "form-1",   name: "Formateur Expert",   sector: "formation",    job: "Formateur",       company: "LearnPro",        person: "Nicolas Blanc",    initials: "NB", tagline: "Apprenez. Évoluez. Réussissez.", bio: "Formateur certifié, expert en management et leadership.", location: "Paris, France", website: "https://learnpro.fr", phone: "+33 6 11 12 13 14", email: "nicolas@learnpro.fr", avatar: "", socials: ["linkedin", "youtube"], style: "minimal", palette: { bg: "#f0f9ff", fg: "#0c1520", accent: "#0369A1" } },
  { id: "artis-1",  name: "Artisan Plombier",   sector: "artisan",      job: "Plombier",        company: "PlombPro",        person: "David Mercier",    initials: "DM", tagline: "Intervention rapide et fiable", bio: "Plombier chauffagiste, disponible 7j/7 pour urgences.", location: "Strasbourg, France", website: "https://plombpro.fr", phone: "+33 6 12 13 14 15", email: "david@plombpro.fr", avatar: "", socials: ["facebook"], style: "soft", palette: { bg: "#eff6ff", fg: "#1e3a5f", accent: "#1D4ED8" } },
];

const SECTORS = Array.from(new Set(TEMPLATES.map((t) => t.sector)));
const STYLES: StyleId[] = ["minimal", "bold", "elegant", "neo", "dark", "soft"];
const STYLE_LABELS: Record<StyleId, string> = { minimal: "Minimal", bold: "Bold", elegant: "Élégant", neo: "Neo", dark: "Dark", soft: "Soft" };

// Map template palette to THEMES ID (closest match)
function paletteToThemeId(palette: Template["palette"]): string {
  const accent = palette.accent.toLowerCase();
  if (accent.includes("8b5cf6") || accent.includes("a78bfa")) return "violet";
  if (accent.includes("ec4899") || accent.includes("be185d")) return "rose";
  if (accent.includes("0ea5e9") || accent.includes("0369a1") || accent.includes("1d4ed8") || accent.includes("3b82f6")) return "bleu";
  if (accent.includes("10b981") || accent.includes("047857")) return "vert";
  if (accent.includes("f59e0b") || accent.includes("f97316")) return "sombre";
  return "clair";
}

export const Route = createFileRoute("/dashboard/modeles")({
  component: ModelesPage,
});

function ModelesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);
  const [styleFilter, setStyleFilter] = useState<StyleId | null>(null);
  const [applying, setApplying] = useState<string | null>(null);
  const [confirmTemplate, setConfirmTemplate] = useState<Template | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase.from("nfc_profiles").select("id").eq("user_id", user.id).maybeSingle();
      setProfileId(data?.id ?? null);
    });
  }, []);

  const filtered = TEMPLATES.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.sector.includes(q) || t.job.toLowerCase().includes(q);
    const matchSector = !sectorFilter || t.sector === sectorFilter;
    const matchStyle = !styleFilter || t.style === styleFilter;
    return matchSearch && matchSector && matchStyle;
  });

  async function applyTemplate(tpl: Template) {
    if (!profileId) { toast.error("Profil introuvable"); return; }
    setApplying(tpl.id);
    try {
      const themeId = paletteToThemeId(tpl.palette);
      const { error } = await supabase.from("nfc_profiles").update({
        couleur_accent: themeId,
        updated_at: new Date().toISOString(),
      }).eq("id", profileId);
      if (error) throw error;
      setAppliedId(tpl.id);
      toast.success(`Modèle "${tpl.name}" appliqué !`);
      setConfirmTemplate(null);
      setTimeout(() => navigate({ to: "/dashboard/carte" }), 800);
    } catch {
      toast.error("Erreur lors de l'application du modèle");
    } finally {
      setApplying(null);
    }
  }

  return (
    <>
      <Toaster />

      {/* Confirm modal */}
      {confirmTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-foreground text-lg">Appliquer ce modèle ?</h3>
              <button onClick={() => setConfirmTemplate(null)} className="p-1 rounded-lg hover:bg-accent transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Le thème <span className="font-semibold text-foreground">"{confirmTemplate.name}"</span> va être appliqué à votre carte.
            </p>
            <p className="text-xs text-muted-foreground mb-6">Vos infos personnelles (nom, boutons, réseaux) ne seront pas modifiées.</p>

            {/* Mini preview */}
            <div className="flex justify-center mb-6 scale-90">
              <CardPreview t={confirmTemplate} size="sm" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setConfirmTemplate(null)}
                className="flex-1 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-accent transition">
                Annuler
              </button>
              <button onClick={() => applyTemplate(confirmTemplate)} disabled={!!applying}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white transition disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                {applying ? "Application…" : "Appliquer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 lg:p-8 max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Modèles</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Choisissez un style et appliquez-le en un clic à votre carte.</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un modèle…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={sectorFilter ?? ""} onChange={(e) => setSectorFilter(e.target.value || null)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40">
              <option value="">Tous les secteurs</option>
              {SECTORS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select value={styleFilter ?? ""} onChange={(e) => setStyleFilter((e.target.value as StyleId) || null)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40">
              <option value="">Tous les styles</option>
              {STYLES.map((s) => <option key={s} value={s}>{STYLE_LABELS[s]}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucun modèle trouvé pour cette recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((tpl) => (
              <div key={tpl.id}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all hover:shadow-card cursor-pointer"
                onClick={() => setConfirmTemplate(tpl)}>
                {tpl.badge && (
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                    {tpl.badge}
                  </div>
                )}
                {appliedId === tpl.id && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                <div className="p-3 flex justify-center" style={{ background: `${tpl.palette.bg}10` }}>
                  <div className="transform scale-[0.65] origin-top" style={{ width: 140, height: 220 }}>
                    <CardPreview t={tpl} size="sm" />
                  </div>
                </div>

                <div className="p-3 border-t border-border">
                  <p className="text-xs font-semibold text-foreground truncate">{tpl.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{tpl.sector} · {STYLE_LABELS[tpl.style]}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.5)" }}>
                  <span className="px-4 py-2 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                    Appliquer
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
