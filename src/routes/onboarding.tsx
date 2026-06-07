import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Check, ChevronRight, ChevronLeft, Zap, Phone, Mail, Globe,
  Linkedin, Instagram, Twitter, Youtube, MessageCircle, Calendar,
  MapPin, Sparkles, Eye, User,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Crée ta carte — OneTap" }],
  }),
  component: OnboardingPage,
});

/* ─────────────────────── TYPES ─────────────────────── */

type ThemeId = "violet" | "rose" | "bleu" | "vert" | "sombre" | "clair";

type Bouton = { type: string; label: string; value: string; active: boolean };
type Reseau = { type: string; label: string; url: string; active: boolean };

type OData = {
  theme: ThemeId;
  boutons: Bouton[];
  reseaux: Reseau[];
  nom: string;
  fonction: string;
  entreprise: string;
  email: string;
  telephone: string;
  bio: string;
  slug: string;
};

/* ─────────────────────── CONSTANTS ─────────────────────── */

const THEMES: { id: ThemeId; label: string; accent: string; bg: string; text: string; gradient: string }[] = [
  { id: "violet", label: "Violet", accent: "#8B5CF6", bg: "#1a0b2e", text: "#fff", gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)" },
  { id: "rose",   label: "Rose",   accent: "#EC4899", bg: "#1a0b1a", text: "#fff", gradient: "linear-gradient(135deg,#be185d,#EC4899)" },
  { id: "bleu",   label: "Bleu",   accent: "#0EA5E9", bg: "#0a1a2e", text: "#fff", gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)" },
  { id: "vert",   label: "Vert",   accent: "#10B981", bg: "#0a1f1a", text: "#fff", gradient: "linear-gradient(135deg,#047857,#10B981)" },
  { id: "sombre", label: "Sombre", accent: "#F59E0B", bg: "#111827", text: "#fff", gradient: "linear-gradient(135deg,#92400e,#F59E0B)" },
  { id: "clair",  label: "Clair",  accent: "#6366F1", bg: "#ffffff", text: "#111827", gradient: "linear-gradient(135deg,#4338ca,#6366F1)" },
];

const DEFAULT_BOUTONS: Bouton[] = [
  { type: "telephone", label: "Appeler",      value: "", active: true },
  { type: "email",     label: "Email",         value: "", active: true },
  { type: "website",   label: "Site web",      value: "", active: false },
  { type: "whatsapp",  label: "WhatsApp",      value: "", active: false },
  { type: "calendly",  label: "Prendre RDV",   value: "", active: false },
  { type: "maps",      label: "Adresse",        value: "", active: false },
];

const DEFAULT_RESEAUX: Reseau[] = [
  { type: "linkedin",  label: "LinkedIn",  url: "", active: false },
  { type: "instagram", label: "Instagram", url: "", active: false },
  { type: "twitter",   label: "Twitter / X", url: "", active: false },
  { type: "tiktok",    label: "TikTok",    url: "", active: false },
  { type: "youtube",   label: "YouTube",   url: "", active: false },
];

const STEP_LABELS = ["Thème", "Liens", "Infos", "En ligne"];

/* ─────────────────────── UTILS ─────────────────────── */

function toSlug(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
}

function themeById(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/* ─────────────────────── PAGE ─────────────────────── */

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [slugError, setSlugError] = useState("");

  const [data, setData] = useState<OData>({
    theme: "violet",
    boutons: DEFAULT_BOUTONS,
    reseaux: DEFAULT_RESEAUX,
    nom: "", fonction: "", entreprise: "", email: "", telephone: "", bio: "", slug: "",
  });

  // Load existing profile or pre-fill email
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate({ to: "/connexion" }); return; }
      const { data: profile } = await supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (profile) {
        setProfileId(profile.id);
        setData((prev) => ({
          ...prev,
          nom: profile.nom || "",
          fonction: profile.fonction || "",
          entreprise: profile.entreprise || "",
          email: profile.email || user.email || "",
          telephone: profile.telephone || "",
          bio: profile.bio || "",
          slug: profile.slug || toSlug(profile.nom || ""),
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
    setSlugError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate({ to: "/connexion" }); return; }

    const payload = {
      nom: data.nom,
      fonction: data.fonction,
      entreprise: data.entreprise,
      email: data.email,
      telephone: data.telephone,
      bio: data.bio,
      slug: data.slug || toSlug(data.nom),
      couleur_accent: data.theme,
      boutons: data.boutons as unknown as Record<string, unknown>[],
      reseaux: data.reseaux as unknown as Record<string, unknown>[],
      actif: true,
      user_id: user.id,
    };

    if (profileId) {
      const { error } = await supabase.from("nfc_profiles").update(payload).eq("id", profileId);
      if (error?.message?.includes("slug")) { setSlugError("Ce slug est déjà pris, choisis-en un autre."); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("nfc_profiles").insert(payload);
      if (error?.message?.includes("slug")) { setSlugError("Ce slug est déjà pris, choisis-en un autre."); setSaving(false); return; }
    }

    setSaving(false);
    navigate({ to: "/dashboard" });
  }

  const theme = themeById(data.theme);
  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top bar ── */}
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur flex items-center px-6 gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base">OneTap</span>
        </div>
        {/* Step pills */}
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
                {i < 3 && <ChevronRight className="w-3 h-3 text-border" />}
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="hidden sm:block w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-cta rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col lg:flex-row min-h-0">

        {/* ── LEFT: Form ── */}
        <div className="lg:w-[48%] flex flex-col border-r border-border overflow-y-auto">
          <div className="flex-1 px-6 py-8 lg:px-10 lg:py-10 max-w-lg mx-auto w-full">

            {/* Step 1 — Thème */}
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-1">Étape 1 / 4</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">Choisis ton thème</h2>
                <p className="text-sm text-muted-foreground mb-8">L'ambiance visuelle de ta carte. Tu pourras le changer à tout moment.</p>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => upd("theme", t.id)}
                      className={[
                        "relative flex flex-col items-center gap-2.5 rounded-2xl border-2 p-4 transition-all duration-200",
                        data.theme === t.id ? "border-magenta shadow-glow scale-[1.02]" : "border-border hover:border-foreground/20",
                      ].join(" ")}
                    >
                      <div className="w-full h-16 rounded-xl overflow-hidden" style={{ background: t.gradient }}>
                        <div className="w-full h-full flex items-end justify-center pb-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-foreground">{t.label}</span>
                      {data.theme === t.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-magenta flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Liens */}
            {step === 2 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-1">Étape 2 / 4</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">Active tes liens</h2>
                <p className="text-sm text-muted-foreground mb-6">Choisis ce que les gens peuvent faire depuis ta carte.</p>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Boutons d'action</p>
                  {data.boutons.map((b, i) => (
                    <div key={b.type} className={["rounded-2xl border transition-all overflow-hidden", b.active ? "border-border bg-card" : "border-border/50 bg-muted/30"].join(" ")}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={["w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all", b.active ? "bg-magenta/15" : "bg-muted"].join(" ")}>
                          <BoutonIcon type={b.type} active={b.active} />
                        </div>
                        <span className={["text-sm font-medium flex-1", b.active ? "text-foreground" : "text-muted-foreground"].join(" ")}>{b.label}</span>
                        <button
                          onClick={() => {
                            const next = [...data.boutons];
                            next[i] = { ...next[i], active: !next[i].active };
                            upd("boutons", next);
                          }}
                          className={["relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0", b.active ? "bg-magenta" : "bg-muted"].join(" ")}
                        >
                          <span className={["absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200", b.active ? "left-5" : "left-0.5"].join(" ")} />
                        </button>
                      </div>
                      {b.active && (
                        <div className="px-4 pb-3">
                          <input
                            type={b.type === "email" ? "email" : b.type === "telephone" || b.type === "whatsapp" ? "tel" : "url"}
                            placeholder={b.type === "telephone" || b.type === "whatsapp" ? "+33 6 12 34 56 78" : b.type === "email" ? "ton@email.com" : "https://..."}
                            value={b.value}
                            onChange={(e) => {
                              const next = [...data.boutons];
                              next[i] = { ...next[i], value: e.target.value };
                              upd("boutons", next);
                            }}
                            className="w-full rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Réseaux sociaux</p>
                  {data.reseaux.map((r, i) => (
                    <div key={r.type} className={["rounded-2xl border transition-all overflow-hidden", r.active ? "border-border bg-card" : "border-border/50 bg-muted/30"].join(" ")}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={["w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", r.active ? "bg-violet/15" : "bg-muted"].join(" ")}>
                          <ReseauIcon type={r.type} active={r.active} />
                        </div>
                        <span className={["text-sm font-medium flex-1", r.active ? "text-foreground" : "text-muted-foreground"].join(" ")}>{r.label}</span>
                        <button
                          onClick={() => {
                            const next = [...data.reseaux];
                            next[i] = { ...next[i], active: !next[i].active };
                            upd("reseaux", next);
                          }}
                          className={["relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0", r.active ? "bg-violet" : "bg-muted"].join(" ")}
                        >
                          <span className={["absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200", r.active ? "left-5" : "left-0.5"].join(" ")} />
                        </button>
                      </div>
                      {r.active && (
                        <div className="px-4 pb-3">
                          <input
                            type="url"
                            placeholder="https://..."
                            value={r.url}
                            onChange={(e) => {
                              const next = [...data.reseaux];
                              next[i] = { ...next[i], url: e.target.value };
                              upd("reseaux", next);
                            }}
                            className="w-full rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 — Infos */}
            {step === 3 && (
              <div className="animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-1">Étape 3 / 4</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">Tes informations</h2>
                <p className="text-sm text-muted-foreground mb-6">Ces infos apparaissent sur ta carte publique.</p>

                <div className="space-y-4">
                  <Field label="Nom complet *" required>
                    <input
                      value={data.nom}
                      onChange={(e) => upd("nom", e.target.value)}
                      placeholder="Jean Dupont"
                      className="input-base"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Titre / Poste">
                      <input value={data.fonction} onChange={(e) => upd("fonction", e.target.value)} placeholder="Consultant" className="input-base" />
                    </Field>
                    <Field label="Entreprise">
                      <input value={data.entreprise} onChange={(e) => upd("entreprise", e.target.value)} placeholder="Mon Entreprise" className="input-base" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Email">
                      <input type="email" value={data.email} onChange={(e) => upd("email", e.target.value)} placeholder="jean@exemple.com" className="input-base" />
                    </Field>
                    <Field label="Téléphone">
                      <input type="tel" value={data.telephone} onChange={(e) => upd("telephone", e.target.value)} placeholder="+33 6 12 34 56 78" className="input-base" />
                    </Field>
                  </div>
                  <Field label="Bio (courte)">
                    <textarea
                      value={data.bio}
                      onChange={(e) => upd("bio", e.target.value)}
                      rows={2}
                      placeholder="Quelques mots sur toi ou ton activité…"
                      className="input-base resize-none"
                    />
                  </Field>
                  <Field label="URL de ta carte" hint={`onetap.com/${data.slug || "ton-nom"}`}>
                    <div className="flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-magenta/30 focus-within:border-magenta transition">
                      <span className="pl-3 pr-1 text-sm text-muted-foreground whitespace-nowrap">onetap.com/</span>
                      <input
                        value={data.slug}
                        onChange={(e) => { upd("slug", toSlug(e.target.value)); setSlugError(""); }}
                        placeholder="ton-nom"
                        className="flex-1 py-2.5 pr-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                    {slugError && <p className="text-xs text-destructive mt-1">{slugError}</p>}
                  </Field>
                </div>
              </div>
            )}

            {/* Step 4 — Publish */}
            {step === 4 && (
              <div className="animate-fade-in flex flex-col items-center text-center pt-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: theme.gradient }}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-magenta mb-1">Étape 4 / 4</p>
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Ta carte est prête !</h2>
                <p className="text-muted-foreground mb-2 max-w-xs">
                  Clique sur le bouton pour la mettre en ligne et commencer à partager.
                </p>
                {data.slug && (
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted rounded-full px-4 py-1.5 mb-8">
                    <Eye className="w-4 h-4" />
                    <span>onetap.com/<strong className="text-foreground">{data.slug}</strong></span>
                  </div>
                )}

                <div className="w-full space-y-3 max-w-xs">
                  <ul className="text-sm text-left space-y-2 mb-6">
                    {[
                      `Thème : ${themeById(data.theme).label}`,
                      `${data.boutons.filter(b => b.active).length} bouton(s) actif(s)`,
                      `${data.reseaux.filter(r => r.active).length} réseau(x) social(ux)`,
                      data.nom ? `Nom : ${data.nom}` : "⚠️ Nom manquant",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handlePublish}
                    disabled={saving || !data.nom.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-cta text-white rounded-full py-4 text-base font-bold shadow-glow hover:opacity-95 transition disabled:opacity-60"
                  >
                    {saving ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Rendre ma carte en ligne →
                      </>
                    )}
                  </button>
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
                <ChevronLeft className="w-4 h-4" />
                Retour
              </button>
              {step < 4 && (
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-2.5 text-sm font-bold hover:opacity-80 transition"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div className="lg:w-[52%] bg-muted/30 flex items-center justify-center py-10 px-6 lg:py-16 sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Aperçu en temps réel
            </p>
            <PhonePreview data={data} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── PHONE PREVIEW ─────────────────────── */

function PhonePreview({ data, theme }: { data: OData; theme: typeof THEMES[0] }) {
  const initials = data.nom.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
  const activeBoutons = data.boutons.filter((b) => b.active);
  const activeReseaux = data.reseaux.filter((r) => r.active);

  return (
    <div className="relative w-[300px] select-none">
      {/* Phone frame */}
      <div className="relative rounded-[40px] border-[8px] border-foreground/90 bg-foreground/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/90 rounded-full z-20" />
        {/* Screen */}
        <div className="rounded-[32px] overflow-hidden" style={{ background: theme.bg, minHeight: 580 }}>
          {/* Card header with gradient */}
          <div className="relative h-[150px] flex flex-col items-center justify-end pb-2" style={{ background: theme.gradient }}>
            {/* Avatar */}
            <div className="absolute -bottom-10 w-[72px] h-[72px] rounded-full border-4 flex items-center justify-center text-lg font-bold"
              style={{ borderColor: theme.bg, background: theme.accent, color: "#fff" }}>
              {initials}
            </div>
          </div>

          {/* Profile info */}
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
                  <div key={b.type} className="flex flex-col items-center gap-1 rounded-xl py-2.5 px-1" style={{ background: `${theme.accent}22` }}>
                    <BoutonIcon type={b.type} active={true} color={theme.accent} size={16} />
                    <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: theme.accent }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social links */}
          {activeReseaux.length > 0 && (
            <div className="px-4 pb-5 flex justify-center gap-3 flex-wrap">
              {activeReseaux.map((r) => (
                <div key={r.type} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${theme.accent}30` }}>
                  <ReseauIcon type={r.type} active={true} color={theme.accent} size={14} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── ICONS ─────────────────────── */

function BoutonIcon({ type, active, color, size = 14 }: { type: string; active: boolean; color?: string; size?: number }) {
  const c = color ?? (active ? "#EC4899" : "#94a3b8");
  const s = size;
  if (type === "telephone") return <Phone style={{ width: s, height: s, color: c }} />;
  if (type === "email")     return <Mail  style={{ width: s, height: s, color: c }} />;
  if (type === "website")   return <Globe style={{ width: s, height: s, color: c }} />;
  if (type === "whatsapp")  return <MessageCircle style={{ width: s, height: s, color: c }} />;
  if (type === "calendly")  return <Calendar style={{ width: s, height: s, color: c }} />;
  if (type === "maps")      return <MapPin  style={{ width: s, height: s, color: c }} />;
  return <Globe style={{ width: s, height: s, color: c }} />;
}

function ReseauIcon({ type, active, color, size = 14 }: { type: string; active: boolean; color?: string; size?: number }) {
  const c = color ?? (active ? "#8B5CF6" : "#94a3b8");
  const s = size;
  if (type === "linkedin")  return <Linkedin  style={{ width: s, height: s, color: c }} />;
  if (type === "instagram") return <Instagram style={{ width: s, height: s, color: c }} />;
  if (type === "twitter")   return <Twitter   style={{ width: s, height: s, color: c }} />;
  if (type === "tiktok")    return <span style={{ fontSize: s, lineHeight: 1, color: c }}>♪</span>;
  if (type === "youtube")   return <Youtube   style={{ width: s, height: s, color: c }} />;
  return <Globe style={{ width: s, height: s, color: c }} />;
}

/* ─────────────────────── FIELD ─────────────────────── */

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}{required && <span className="text-magenta ml-0.5">*</span>}
        {hint && <span className="text-xs text-muted-foreground font-normal ml-2">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
