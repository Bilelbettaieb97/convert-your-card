import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Check, ChevronRight, ChevronLeft, Zap, Phone, Mail, Globe,
  Linkedin, Instagram, Twitter, Youtube, MessageCircle, Calendar,
  MapPin, Sparkles, Eye, Download, Copy,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Crée ta carte — OneTap" }] }),
  component: OnboardingPage,
});

type ThemeId = "violet" | "rose" | "bleu" | "vert" | "sombre" | "clair";
type Bouton = { type: string; label: string; value: string; active: boolean };
type Reseau = { type: string; label: string; url: string; active: boolean };
type OData = {
  theme: ThemeId; boutons: Bouton[]; reseaux: Reseau[];
  nom: string; fonction: string; entreprise: string;
  email: string; telephone: string; bio: string; slug: string;
};

const THEMES: { id: ThemeId; label: string; accent: string; bg: string; text: string; gradient: string }[] = [
  { id: "violet", label: "Violet", accent: "#8B5CF6", bg: "#1a0b2e", text: "#ffffff", gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)" },
  { id: "rose",   label: "Rose",   accent: "#EC4899", bg: "#1a0b1a", text: "#ffffff", gradient: "linear-gradient(135deg,#be185d,#EC4899)" },
  { id: "bleu",   label: "Bleu",   accent: "#0EA5E9", bg: "#0a1a2e", text: "#ffffff", gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)" },
  { id: "vert",   label: "Vert",   accent: "#10B981", bg: "#0a1f1a", text: "#ffffff", gradient: "linear-gradient(135deg,#047857,#10B981)" },
  { id: "sombre", label: "Sombre", accent: "#F59E0B", bg: "#111827", text: "#ffffff", gradient: "linear-gradient(135deg,#92400e,#F59E0B)" },
  { id: "clair",  label: "Clair",  accent: "#6366F1", bg: "#ffffff", text: "#111827", gradient: "linear-gradient(135deg,#4338ca,#6366F1)" },
];

const DEFAULT_BOUTONS: Bouton[] = [
  { type: "telephone", label: "Appeler",    value: "", active: true },
  { type: "email",     label: "Email",       value: "", active: true },
  { type: "website",   label: "Site web",    value: "", active: false },
  { type: "whatsapp",  label: "WhatsApp",    value: "", active: false },
  { type: "calendly",  label: "Prendre RDV", value: "", active: false },
  { type: "maps",      label: "Adresse",     value: "", active: false },
];

const DEFAULT_RESEAUX: Reseau[] = [
  { type: "linkedin",  label: "LinkedIn",    url: "", active: false },
  { type: "instagram", label: "Instagram",   url: "", active: false },
  { type: "twitter",   label: "Twitter / X", url: "", active: false },
  { type: "tiktok",    label: "TikTok",      url: "", active: false },
  { type: "youtube",   label: "YouTube",     url: "", active: false },
];

const STEP_LABELS = ["Vous", "Style", "Liens"];

function toSlug(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
}
function themeById(id: ThemeId) { return THEMES.find((t) => t.id === id) ?? THEMES[0]; }
function initials(nom: string) { return nom.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?"; }

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [published, setPublished] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);

  const [data, setData] = useState<OData>({
    theme: "violet", boutons: DEFAULT_BOUTONS, reseaux: DEFAULT_RESEAUX,
    nom: "", fonction: "", entreprise: "", email: "", telephone: "", bio: "", slug: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate({ to: "/connexion" }); return; }
      const { data: profile } = await supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (profile) {
        setProfileId(profile.id);
        setData((prev) => ({
          ...prev,
          nom: profile.nom || "", fonction: profile.fonction || "", entreprise: profile.entreprise || "",
          email: profile.email || user.email || "", telephone: profile.telephone || "",
          bio: profile.bio || "", slug: profile.slug || toSlug(profile.nom || ""),
          theme: (profile.couleur_accent as ThemeId) ?? "violet",
          boutons: Array.isArray(profile.boutons) && profile.boutons.length ? (profile.boutons as unknown as Bouton[]) : DEFAULT_BOUTONS,
          reseaux: Array.isArray(profile.reseaux) && profile.reseaux.length ? (profile.reseaux as unknown as Reseau[]) : DEFAULT_RESEAUX,
        }));
      } else {
        setData((prev) => ({ ...prev, email: user.email || "" }));
      }
    });
  }, [navigate]);

  const upd = useCallback(<K extends keyof OData>(key: K, val: OData[K]) => {
    setData((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "nom" && !profileId) next.slug = toSlug(val as string);
      return next;
    });
  }, [profileId]);

  async function handlePublish() {
    if (!data.nom.trim()) return;
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/connexion" }); return; }

      let slug = data.slug || toSlug(data.nom);
      const { data: existing } = await supabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
      if (existing && existing.id !== profileId) {
        slug = `${slug}-${Math.floor(Math.random() * 8000) + 1000}`;
      }

      const payload = {
        nom: data.nom, fonction: data.fonction, entreprise: data.entreprise,
        email: data.email, telephone: data.telephone, bio: data.bio, slug,
        couleur_accent: data.theme,
        boutons: data.boutons as unknown as Record<string, unknown>[],
        reseaux: data.reseaux as unknown as Record<string, unknown>[],
        actif: true, user_id: user.id,
      };

      if (profileId) {
        const { error } = await supabase.from("nfc_profiles").update(payload).eq("id", profileId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("nfc_profiles").insert(payload);
        if (error) throw error;
      }

      setCardUrl(`${window.location.origin}/${slug}`);
      setPublished(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la publication";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  if (published && cardUrl) {
    return (
      <CelebrationPage
        theme={themeById(data.theme)}
        nom={data.nom}
        cardUrl={cardUrl}
        onDashboard={() => navigate({ to: "/dashboard" })}
      />
    );
  }

  const theme = themeById(data.theme);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glow  { 0%,100%{opacity:.25;transform:scaleX(1)} 50%{opacity:.1;transform:scaleX(.7)} }
        .phone-float { animation: float 4s ease-in-out infinite; }
        .phone-glow  { animation: glow 4s ease-in-out infinite; }
      `}</style>

      {/* ── Header ── */}
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur flex items-center px-6 gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base">OneTap</span>
        </div>
        <div className="flex items-center gap-1 flex-1">
          {STEP_LABELS.map((label, i) => {
            const s = i + 1;
            const done = s < step;
            const active = s === step;
            return (
              <div key={s} className="flex items-center gap-1">
                <button
                  onClick={() => done && setStep(s)}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all",
                    active ? "bg-foreground text-background" : done ? "bg-muted text-muted-foreground cursor-pointer hover:bg-foreground/10" : "text-muted-foreground/40",
                  ].join(" ")}
                >
                  {done ? <Check className="w-3 h-3" /> : <span>{s}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < STEP_LABELS.length - 1 && <ChevronRight className="w-3 h-3 text-border" />}
              </div>
            );
          })}
        </div>
        <div className="hidden sm:block w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-cta rounded-full transition-all duration-500"
            style={{ width: step === 1 ? "12%" : step === 2 ? "50%" : "88%" }} />
        </div>
      </header>

      {/* ── Mobile mini-preview (sticky under header) ── */}
      <div className="lg:hidden sticky top-14 z-20 border-b border-border bg-background/95 backdrop-blur px-4 py-2.5">
        <MiniPreview data={data} theme={theme} />
      </div>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col lg:flex-row min-h-0">

        {/* ── LEFT : Form ── */}
        <div className="lg:w-[48%] flex flex-col border-r border-border overflow-y-auto">
          <div className="flex-1 px-6 py-8 lg:px-10 lg:py-10 max-w-lg mx-auto w-full">

            {/* STEP 1 — Identité */}
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">Étape 1 / 3</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1.5">Présentez-vous</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Tapez votre nom et regardez votre carte prendre vie en temps réel →
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Nom complet <span className="text-magenta">*</span>
                    </label>
                    <input
                      value={data.nom}
                      onChange={(e) => upd("nom", e.target.value)}
                      placeholder="Jean Dupont"
                      autoFocus
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Poste / Titre</label>
                      <input value={data.fonction} onChange={(e) => upd("fonction", e.target.value)} placeholder="Consultant"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Entreprise</label>
                      <input value={data.entreprise} onChange={(e) => upd("entreprise", e.target.value)} placeholder="Mon Entreprise"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition" />
                    </div>
                  </div>
                  {/* Teaser next step */}
                  <div className="mt-4 p-4 rounded-2xl bg-muted/50 border border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: theme.gradient }}>2</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Étape suivante :</span> choisir l'ambiance visuelle de votre carte.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Style */}
            {step === 2 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">Étape 2 / 3</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1.5">Votre ambiance</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Regardez le preview se mettre à jour en temps réel →
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => upd("theme", t.id)}
                      className={[
                        "relative rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:scale-[1.02] text-left",
                        data.theme === t.id ? "border-magenta shadow-glow" : "border-border",
                      ].join(" ")}
                    >
                      {/* Mini card with their actual name */}
                      <div className="h-[88px]" style={{ background: t.bg }}>
                        <div className="h-12 flex items-end justify-center pb-1" style={{ background: t.gradient }}>
                          <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-[11px] font-bold text-white">
                            {initials(data.nom)}
                          </div>
                        </div>
                        <div className="px-2 pt-1.5 text-center">
                          <p className="text-[9px] font-bold truncate" style={{ color: t.text }}>
                            {data.nom || "Votre nom"}
                          </p>
                          {data.fonction && (
                            <p className="text-[8px] truncate mt-0.5" style={{ color: `${t.text}70` }}>{data.fonction}</p>
                          )}
                        </div>
                      </div>
                      <div className="px-3 py-1.5 border-t border-border/50 flex items-center justify-between bg-background/80">
                        <span className="text-xs font-semibold text-foreground">{t.label}</span>
                        {data.theme === t.id && <Check className="w-3.5 h-3.5 text-magenta" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 — Liens */}
            {step === 3 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-2">Étape 3 / 3</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1.5">Vos coordonnées</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Activez ce que les gens peuvent faire depuis votre carte.
                </p>

                {/* Boutons */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Boutons d'action</p>
                  {data.boutons.map((b, i) => (
                    <div key={b.type}
                      className={`rounded-2xl border overflow-hidden transition-all ${b.active ? "border-border bg-card" : "border-border/40 bg-muted/20"}`}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${b.active ? "bg-magenta/15" : "bg-muted"}`}>
                          <BoutonIcon type={b.type} active={b.active} />
                        </div>
                        <span className={`text-sm font-medium flex-1 ${b.active ? "text-foreground" : "text-muted-foreground"}`}>{b.label}</span>
                        <button
                          onClick={() => { const next = [...data.boutons]; next[i] = { ...next[i], active: !next[i].active }; upd("boutons", next); }}
                          className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${b.active ? "bg-magenta" : "bg-muted"}`}>
                          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${b.active ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                      {b.active && (
                        <div className="px-4 pb-3">
                          <input
                            type={b.type === "email" ? "email" : b.type === "telephone" || b.type === "whatsapp" ? "tel" : "url"}
                            placeholder={b.type === "telephone" || b.type === "whatsapp" ? "+33 6 12 34 56 78" : b.type === "email" ? "ton@email.com" : "https://..."}
                            value={b.value}
                            onChange={(e) => { const next = [...data.boutons]; next[i] = { ...next[i], value: e.target.value }; upd("boutons", next); }}
                            className="w-full rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Réseaux */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Réseaux sociaux</p>
                  {data.reseaux.map((r, i) => (
                    <div key={r.type}
                      className={`rounded-2xl border overflow-hidden transition-all ${r.active ? "border-border bg-card" : "border-border/40 bg-muted/20"}`}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${r.active ? "bg-violet/15" : "bg-muted"}`}>
                          <ReseauIcon type={r.type} active={r.active} />
                        </div>
                        <span className={`text-sm font-medium flex-1 ${r.active ? "text-foreground" : "text-muted-foreground"}`}>{r.label}</span>
                        <button
                          onClick={() => { const next = [...data.reseaux]; next[i] = { ...next[i], active: !next[i].active }; upd("reseaux", next); }}
                          className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${r.active ? "bg-violet" : "bg-muted"}`}>
                          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${r.active ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                      {r.active && (
                        <div className="px-4 pb-3">
                          <input type="url" placeholder="https://..." value={r.url}
                            onChange={(e) => { const next = [...data.reseaux]; next[i] = { ...next[i], url: e.target.value }; upd("reseaux", next); }}
                            className="w-full rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Contact direct + bio */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact direct</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Téléphone</label>
                      <input type="tel" value={data.telephone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev, telephone: val,
                            boutons: prev.boutons.map((b) => b.type === "telephone" ? { ...b, value: val, active: true } : b),
                          }));
                        }}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                      <input type="email" value={data.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev, email: val,
                            boutons: prev.boutons.map((b) => b.type === "email" ? { ...b, value: val, active: true } : b),
                          }));
                        }}
                        placeholder="vous@exemple.com"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Bio courte <span className="text-muted-foreground/50">(optionnel)</span>
                    </label>
                    <textarea value={data.bio} onChange={(e) => upd("bio", e.target.value)} rows={2} placeholder="En quelques mots…"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Retour
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={step === 1 && !data.nom.trim()}
                  className="flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-2.5 text-sm font-bold hover:opacity-80 transition disabled:opacity-40"
                >
                  Continuer <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={saving || !data.nom.trim()}
                  className="flex items-center gap-2 bg-gradient-cta text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-glow hover:opacity-95 transition disabled:opacity-60"
                >
                  {saving
                    ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    : <Sparkles className="w-4 h-4" />}
                  {saving ? "Publication…" : "Publier ma carte →"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT : Phone preview (desktop only) ── */}
        <div className="hidden lg:flex lg:w-[52%] bg-muted/30 items-center justify-center py-10 px-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Aperçu en temps réel
            </p>
            <div className="phone-float">
              <PhonePreview data={data} theme={themeById(data.theme)} />
            </div>
            <div className="w-32 h-3 rounded-full blur-lg phone-glow" style={{ background: themeById(data.theme).accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini preview (mobile sticky) ── */
function MiniPreview({ data, theme }: { data: OData; theme: typeof THEMES[0] }) {
  const ini = initials(data.nom);
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
        style={{ background: theme.gradient }}>
        {ini}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground truncate leading-tight">{data.nom || "Votre nom"}</p>
        <p className="text-xs text-muted-foreground truncate">
          {[data.fonction, data.entreprise].filter(Boolean).join(" · ") || "Tapez votre nom ci-dessous"}
        </p>
      </div>
      <div className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-background" style={{ background: theme.accent }} />
    </div>
  );
}

/* ── Celebration page ── */
function CelebrationPage({ theme, nom, cardUrl, onDashboard }: {
  theme: typeof THEMES[0]; nom: string; cardUrl: string; onDashboard: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: theme.gradient }}>
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <div className="absolute inset-0 rounded-3xl animate-ping opacity-[0.15]" style={{ background: theme.gradient }} />
      </div>

      <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
        Votre carte est en ligne ! 🎉
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm text-sm">
        Bonjour <strong className="text-foreground">{nom.split(" ")[0]}</strong> — partagez votre lien et recevez vos premiers scans.
      </p>

      {/* URL pill */}
      <div className="flex items-center gap-2 p-3 rounded-2xl bg-muted border border-border max-w-md w-full mb-6">
        <span className="text-sm font-mono text-foreground truncate flex-1 text-left">{cardUrl}</span>
        <button onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold hover:bg-accent transition flex-shrink-0">
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>

      {/* QR Code */}
      <div className="inline-block p-4 bg-white rounded-2xl shadow-card mb-2">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(cardUrl)}&color=000000&bgcolor=ffffff&margin=8`}
          alt="QR Code"
          className="w-44 h-44 rounded"
        />
      </div>
      <a href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(cardUrl)}&margin=20`}
        download="ma-carte-qr.png" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition mb-8">
        <Download className="w-3 h-3" /> Télécharger le QR Code en HD
      </a>

      {/* Share actions */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <a href={`https://wa.me/?text=${encodeURIComponent(`Voici ma carte de visite digitale 👇\n${cardUrl}`)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "#25D366" }}>
          <MessageCircle className="w-4 h-4" /> Partager sur WhatsApp
        </a>
        <a href={cardUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border hover:bg-accent transition">
          <Eye className="w-4 h-4" /> Voir ma carte
        </a>
      </div>

      <button onClick={onDashboard}
        className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
        Aller à mon tableau de bord <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ── Phone preview ── */
function PhonePreview({ data, theme }: { data: OData; theme: typeof THEMES[0] }) {
  const ini = initials(data.nom);
  const activeBoutons = data.boutons.filter((b) => b.active);
  const activeReseaux = data.reseaux.filter((r) => r.active);

  return (
    <div className="relative w-[300px] select-none">
      <div className="relative rounded-[40px] border-[8px] border-foreground/90 bg-foreground/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/90 rounded-full z-20" />
        <div className="rounded-[32px] overflow-hidden" style={{ background: theme.bg, minHeight: 580 }}>

          {/* Header */}
          <div className="relative h-[150px] flex flex-col items-center justify-end pb-2" style={{ background: theme.gradient }}>
            <div className="absolute -bottom-10 w-[72px] h-[72px] rounded-full border-4 flex items-center justify-center text-lg font-bold"
              style={{ borderColor: theme.bg, background: theme.accent, color: "#fff" }}>
              {ini}
            </div>
          </div>

          {/* Info */}
          <div className="pt-14 pb-4 px-5 text-center">
            <p className="font-bold text-base leading-tight" style={{ color: theme.text }}>
              {data.nom || "Ton Nom"}
            </p>
            {(data.fonction || data.entreprise) && (
              <p className="text-xs mt-0.5" style={{ color: `${theme.text}99` }}>
                {[data.fonction, data.entreprise].filter(Boolean).join(" · ")}
              </p>
            )}
            {data.bio && (
              <p className="text-xs mt-2 leading-relaxed line-clamp-2 px-2" style={{ color: `${theme.text}80` }}>
                {data.bio}
              </p>
            )}
          </div>

          {/* Action buttons */}
          {activeBoutons.length > 0 && (
            <div className="px-4 pb-3">
              <div className="grid grid-cols-3 gap-2">
                {activeBoutons.slice(0, 6).map((b) => (
                  <div key={b.type} className="flex flex-col items-center gap-1 rounded-xl py-2.5 px-1"
                    style={{ background: `${theme.accent}22` }}>
                    <BoutonIcon type={b.type} active color={theme.accent} size={16} />
                    <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: theme.accent }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {activeReseaux.length > 0 && (
            <div className="px-4 pb-5 flex justify-center gap-3 flex-wrap">
              {activeReseaux.map((r) => (
                <div key={r.type} className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${theme.accent}30` }}>
                  <ReseauIcon type={r.type} active color={theme.accent} size={14} />
                </div>
              ))}
            </div>
          )}

          {activeBoutons.length === 0 && activeReseaux.length === 0 && (
            <div className="px-6 py-4 text-center">
              <p className="text-[10px]" style={{ color: `${theme.text}40` }}>Activez des boutons à l'étape suivante</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */
function BoutonIcon({ type, active, color, size = 14 }: { type: string; active: boolean; color?: string; size?: number }) {
  const c = color ?? (active ? "#EC4899" : "#94a3b8");
  if (type === "telephone") return <Phone  style={{ width: size, height: size, color: c }} />;
  if (type === "email")     return <Mail   style={{ width: size, height: size, color: c }} />;
  if (type === "website")   return <Globe  style={{ width: size, height: size, color: c }} />;
  if (type === "whatsapp")  return <MessageCircle style={{ width: size, height: size, color: c }} />;
  if (type === "calendly")  return <Calendar style={{ width: size, height: size, color: c }} />;
  if (type === "maps")      return <MapPin  style={{ width: size, height: size, color: c }} />;
  return <Globe style={{ width: size, height: size, color: c }} />;
}

function ReseauIcon({ type, active, color, size = 14 }: { type: string; active: boolean; color?: string; size?: number }) {
  const c = color ?? (active ? "#8B5CF6" : "#94a3b8");
  if (type === "linkedin")  return <Linkedin  style={{ width: size, height: size, color: c }} />;
  if (type === "instagram") return <Instagram style={{ width: size, height: size, color: c }} />;
  if (type === "twitter")   return <Twitter   style={{ width: size, height: size, color: c }} />;
  if (type === "tiktok")    return <span style={{ fontSize: size, lineHeight: 1, color: c }}>♪</span>;
  if (type === "youtube")   return <Youtube   style={{ width: size, height: size, color: c }} />;
  return <Globe style={{ width: size, height: size, color: c }} />;
}
