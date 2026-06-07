import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Upload, Save, Phone, Mail, Globe, MapPin, Calendar, MessageCircle,
  ExternalLink, Copy, Check, Palette, User, Link2, Wifi,
  X, Smartphone, AlertCircle, Loader2,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;

type Bouton = { type: string; label: string; value: string; active: boolean };
type Reseau = { type: string; label: string; url: string; active: boolean };
type ThemeId = "violet" | "rose" | "bleu" | "vert" | "sombre" | "clair";

const THEMES: { id: ThemeId; label: string; accent: string; bg: string; text: string; gradient: string }[] = [
  { id: "violet", label: "Violet", accent: "#8B5CF6", bg: "#1a0b2e", text: "#fff", gradient: "linear-gradient(135deg,#6d28d9,#8B5CF6)" },
  { id: "rose",   label: "Rose",   accent: "#EC4899", bg: "#1a0b1a", text: "#fff", gradient: "linear-gradient(135deg,#be185d,#EC4899)" },
  { id: "bleu",   label: "Bleu",   accent: "#0EA5E9", bg: "#0a1a2e", text: "#fff", gradient: "linear-gradient(135deg,#0369a1,#0EA5E9)" },
  { id: "vert",   label: "Vert",   accent: "#10B981", bg: "#0a1f1a", text: "#fff", gradient: "linear-gradient(135deg,#047857,#10B981)" },
  { id: "sombre", label: "Sombre", accent: "#F59E0B", bg: "#111827", text: "#fff", gradient: "linear-gradient(135deg,#92400e,#F59E0B)" },
  { id: "clair",  label: "Clair",  accent: "#6366F1", bg: "#f8f9fa", text: "#111827", gradient: "linear-gradient(135deg,#4338ca,#6366F1)" },
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
  { type: "linkedin",  label: "LinkedIn",  url: "", active: false },
  { type: "instagram", label: "Instagram", url: "", active: false },
  { type: "twitter",   label: "Twitter/X", url: "", active: false },
  { type: "tiktok",    label: "TikTok",    url: "", active: false },
  { type: "youtube",   label: "YouTube",   url: "", active: false },
];

const BOUTON_ICONS: Record<string, React.ReactNode> = {
  telephone: <Phone className="w-3.5 h-3.5" />,
  email:     <Mail className="w-3.5 h-3.5" />,
  website:   <Globe className="w-3.5 h-3.5" />,
  whatsapp:  <MessageCircle className="w-3.5 h-3.5" />,
  calendly:  <Calendar className="w-3.5 h-3.5" />,
  maps:      <MapPin className="w-3.5 h-3.5" />,
};

const BOUTON_PLACEHOLDERS: Record<string, string> = {
  telephone: "+33 6 12 34 56 78",
  email:     "jean@acme.fr",
  website:   "https://monsite.fr",
  whatsapp:  "+33 6 12 34 56 78",
  calendly:  "https://calendly.com/monprofil",
  maps:      "12 rue de la Paix, Paris",
};

type Tab = "apparence" | "profil" | "boutons" | "reseaux" | "url";

export const Route = createFileRoute("/dashboard/carte")({
  component: CartePage,
});

function CartePage() {
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<Tab>("apparence");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [theme, setTheme] = useState<ThemeId>("violet");
  const [nom, setNom] = useState("");
  const [fonction, setFonction] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [bio, setBio] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [boutons, setBoutons] = useState<Bouton[]>(DEFAULT_BOUTONS);
  const [reseaux, setReseaux] = useState<Reseau[]>(DEFAULT_RESEAUX);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  // Slug editing
  const [newSlug, setNewSlug] = useState("");
  const [slugSaving, setSlugSaving] = useState(false);
  const [slugError, setSlugError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setProfile(data);
        setNewSlug(data.slug ?? "");
        const t = THEMES.find((th) => th.id === data.couleur_accent) ? (data.couleur_accent as ThemeId) : "violet";
        setTheme(t);
        setNom(data.nom ?? "");
        setFonction(data.fonction ?? "");
        setEntreprise(data.entreprise ?? "");
        setBio(data.bio ?? "");
        setTelephone(data.telephone ?? "");
        setEmail(data.email ?? "");
        setPhotoUrl(data.photo_url ?? "");
        const b = (data.boutons as Bouton[] | null);
        setBoutons(b && b.length > 0 ? b : DEFAULT_BOUTONS);
        const r = (data.reseaux as Reseau[] | null);
        setReseaux(r && r.length > 0 ? r : DEFAULT_RESEAUX);
      }
      setLoading(false);
    }
    load();
  }, []);

  function markDirty() { setDirty(true); }

  function set<T>(setter: React.Dispatch<React.SetStateAction<T>>) {
    return (val: T) => { setter(val); markDirty(); };
  }

  async function handleUploadPhoto(file: File) {
    if (!profile) return;
    setUploadingPhoto(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `nfc-photos/${profile.id}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("nfc-assets").upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("nfc-assets").getPublicUrl(path);
      setPhotoUrl(urlData.publicUrl);
      markDirty();
      toast.success("Photo mise à jour !");
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("nfc_profiles").update({
        nom, fonction, entreprise, bio, telephone, email,
        photo_url: photoUrl || null,
        couleur_accent: theme,
        boutons,
        reseaux,
        updated_at: new Date().toISOString(),
      }).eq("id", profile.id);
      if (error) throw error;
      setDirty(false);
      toast.success("Carte sauvegardée !");
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    if (!profile) return;
    const t = THEMES.find((th) => th.id === profile.couleur_accent) ? (profile.couleur_accent as ThemeId) : "violet";
    setTheme(t);
    setNom(profile.nom ?? "");
    setFonction(profile.fonction ?? "");
    setEntreprise(profile.entreprise ?? "");
    setBio(profile.bio ?? "");
    setTelephone(profile.telephone ?? "");
    setEmail(profile.email ?? "");
    setPhotoUrl(profile.photo_url ?? "");
    const b = (profile.boutons as Bouton[] | null);
    setBoutons(b && b.length > 0 ? b : DEFAULT_BOUTONS);
    const r = (profile.reseaux as Reseau[] | null);
    setReseaux(r && r.length > 0 ? r : DEFAULT_RESEAUX);
    setDirty(false);
  }

  function copyLink() {
    if (!profile) return;
    const appUrl = window.location.origin;
    navigator.clipboard.writeText(`${appUrl}/${profile.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSlugSave() {
    if (!profile) return;
    const cleaned = newSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    if (!cleaned) { setSlugError("Le slug ne peut pas être vide."); return; }
    if (cleaned === profile.slug) { setSlugError("C'est déjà votre slug actuel."); return; }
    setSlugSaving(true);
    setSlugError("");
    try {
      const { data: existing } = await supabase.from("nfc_profiles").select("id").eq("slug", cleaned).maybeSingle();
      if (existing) { setSlugError("Ce slug est déjà pris. Choisissez-en un autre."); return; }
      const { error } = await supabase.from("nfc_profiles").update({ slug: cleaned, updated_at: new Date().toISOString() }).eq("id", profile.id);
      if (error) throw error;
      setProfile({ ...profile, slug: cleaned });
      setNewSlug(cleaned);
      toast.success("URL mise à jour !");
    } catch {
      setSlugError("Erreur lors de la mise à jour.");
    } finally {
      setSlugSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];
  const activeBoutons = boutons.filter((b) => b.active && b.value);
  const activeReseaux = reseaux.filter((r) => r.active && r.url);
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";
  const cardUrl = profile ? `${appUrl}/${profile.slug}` : null;

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "apparence", label: "Apparence",  icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "profil",    label: "Profil",     icon: <User className="w-3.5 h-3.5" /> },
    { id: "boutons",   label: "Boutons",    icon: <Phone className="w-3.5 h-3.5" /> },
    { id: "reseaux",   label: "Réseaux",    icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "url",       label: "URL",        icon: <Link2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      <Toaster />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0])} />

      {/* Floating save bar */}
      {dirty && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-glow"
          style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.1)" }}>
          <span className="text-sm text-white/70">Modifications non sauvegardées</span>
          <button onClick={handleDiscard} className="text-sm font-medium px-3 py-1.5 rounded-xl transition hover:bg-white/10" style={{ color: "rgba(255,255,255,0.5)" }}>
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Sauvegarde…" : "Sauvegarder"}
          </button>
        </div>
      )}

      <div className="flex h-full min-h-screen">
        {/* ── Left: form ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold text-foreground">Ma Carte</h1>
            <div className="flex items-center gap-2">
              {cardUrl && (
                <>
                  <button onClick={copyLink}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent transition">
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copié" : "Copier lien"}
                  </button>
                  <a href={cardUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent transition">
                    <ExternalLink className="w-3 h-3" /> Voir
                  </a>
                </>
              )}
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                <Save className="w-3 h-3" />
                {saving ? "…" : "Sauvegarder"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4">
            <div className="flex gap-1 p-1 rounded-xl bg-muted w-fit overflow-x-auto">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                  style={{
                    background: tab === t.id ? "var(--color-card)" : "transparent",
                    color: tab === t.id ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                    boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 space-y-4 max-w-xl">

            {/* APPARENCE */}
            {tab === "apparence" && (
              <section>
                <h2 className="text-sm font-semibold text-foreground mb-3">Choisissez un thème</h2>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((th) => (
                    <button key={th.id} onClick={() => { setTheme(th.id); markDirty(); }}
                      className="relative rounded-2xl overflow-hidden h-20 transition-all hover:scale-105"
                      style={{
                        background: th.gradient,
                        outline: theme === th.id ? `3px solid ${th.accent}` : "3px solid transparent",
                        outlineOffset: "2px",
                      }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        {theme === th.id && (
                          <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="text-xs font-semibold text-white drop-shadow">{th.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* PROFIL */}
            {tab === "profil" && (
              <section className="space-y-4">
                {/* Photo */}
                <div className="flex items-center gap-4">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Photo" className="w-16 h-16 rounded-2xl object-cover border border-border" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                      {nom ? nom.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                  <button onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto}
                    className="inline-flex items-center gap-2 border border-border bg-background hover:bg-accent px-4 py-2 rounded-full text-sm font-medium transition">
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingPhoto ? "Upload…" : "Changer la photo"}
                  </button>
                </div>
                <Field label="Nom complet *"       value={nom}        onChange={set(setNom)}        placeholder="Jean Dupont" />
                <Field label="Fonction"             value={fonction}   onChange={set(setFonction)}   placeholder="Directeur commercial" />
                <Field label="Entreprise"           value={entreprise} onChange={set(setEntreprise)} placeholder="Acme Corp" />
                <Field label="Téléphone"            value={telephone}  onChange={set(setTelephone)}  placeholder="+33 6 12 34 56 78" type="tel" />
                <Field label="Email de contact"     value={email}      onChange={set(setEmail)}      placeholder="jean@acme.fr" type="email" />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <textarea value={bio} onChange={(e) => { setBio(e.target.value); markDirty(); }} rows={3}
                    placeholder="Une courte description..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition resize-none" />
                </div>
              </section>
            )}

            {/* BOUTONS */}
            {tab === "boutons" && (
              <section className="space-y-3">
                <p className="text-sm text-muted-foreground">Activez les boutons qui apparaîtront sur votre carte.</p>
                {boutons.map((btn, i) => (
                  <BoutonRow key={btn.type} btn={btn}
                    onChange={(updated) => { const next = [...boutons]; next[i] = updated; setBoutons(next); markDirty(); }} />
                ))}
              </section>
            )}

            {/* RÉSEAUX */}
            {tab === "reseaux" && (
              <section className="space-y-3">
                <p className="text-sm text-muted-foreground">Activez vos réseaux sociaux pour les afficher sur votre carte.</p>
                {reseaux.map((r, i) => (
                  <ReseauRow key={r.type} reseau={r}
                    onChange={(updated) => { const next = [...reseaux]; next[i] = updated; setReseaux(next); markDirty(); }} />
                ))}
              </section>
            )}

            {/* URL */}
            {tab === "url" && profile && (
              <section className="space-y-5">
                {/* Current URL */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Lien public actuel</label>
                  <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/40">
                    <span className="text-xs text-muted-foreground truncate flex-1 font-mono">{cardUrl}</span>
                    <button onClick={copyLink}
                      className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-background border border-border hover:bg-accent transition">
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copié" : "Copier"}
                    </button>
                  </div>
                </div>

                {/* Slug editor */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Modifier mon URL</label>
                  <div className="flex items-center gap-0 border border-border rounded-xl overflow-hidden bg-background focus-within:ring-2 focus-within:ring-magenta/40 focus-within:border-magenta transition">
                    <span className="px-3 py-3 text-sm text-muted-foreground bg-muted/50 border-r border-border whitespace-nowrap flex-shrink-0">
                      {appUrl}/
                    </span>
                    <input
                      type="text"
                      value={newSlug}
                      onChange={(e) => { setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")); setSlugError(""); }}
                      className="flex-1 px-3 py-3 text-sm text-foreground bg-transparent outline-none min-w-0"
                      placeholder="mon-nom"
                    />
                  </div>
                  {slugError && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                      <AlertCircle className="w-3 h-3" /> {slugError}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1.5">Lettres minuscules, chiffres et tirets uniquement.</p>
                  <button
                    onClick={handleSlugSave}
                    disabled={slugSaving || newSlug === profile.slug}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
                    {slugSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    {slugSaving ? "Vérification…" : "Valider cette URL"}
                  </button>
                </div>

                {/* Open in new tab */}
                {cardUrl && (
                  <a href={cardUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:bg-accent transition text-sm font-medium text-foreground">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    Voir ma carte en public
                  </a>
                )}
              </section>
            )}
          </div>
        </div>

        {/* ── Right: phone preview (desktop/tablet ≥ lg) ── */}
        <div className="hidden lg:flex w-80 flex-shrink-0 sticky top-0 h-screen items-center justify-center p-8 border-l border-border bg-muted/30">
          <PhonePreview
            theme={activeTheme}
            nom={nom}
            fonction={fonction}
            entreprise={entreprise}
            bio={bio}
            photoUrl={photoUrl}
            boutons={activeBoutons}
            reseaux={activeReseaux}
          />
        </div>
      </div>

      {/* ── Mobile preview button (< lg only) ── */}
      <button
        onClick={() => setShowMobilePreview(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-xl"
        style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}>
        <Smartphone className="w-4 h-4" />
        Aperçu
      </button>

      {/* ── Mobile preview modal ── */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setShowMobilePreview(false)}>
          <div className="bg-background rounded-t-3xl p-6 pb-10 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold text-foreground">Aperçu de ma carte</span>
              <button onClick={() => setShowMobilePreview(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition">
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <PhonePreview
                theme={activeTheme}
                nom={nom}
                fonction={fonction}
                entreprise={entreprise}
                bio={bio}
                photoUrl={photoUrl}
                boutons={activeBoutons}
                reseaux={activeReseaux}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BoutonRow({ btn, onChange }: { btn: Bouton; onChange: (b: Bouton) => void }) {
  return (
    <div className={`rounded-2xl border transition-all ${btn.active ? "border-border bg-card" : "border-border/50 bg-muted/30"}`}>
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-muted-foreground">
          {BOUTON_ICONS[btn.type] ?? <Phone className="w-3.5 h-3.5" />}
        </div>
        <span className="flex-1 text-sm font-medium text-foreground">{btn.label}</span>
        <Toggle value={btn.active} onChange={(v) => onChange({ ...btn, active: v })} />
      </div>
      {btn.active && (
        <div className="px-3 pb-3">
          <input
            type="text"
            value={btn.value}
            onChange={(e) => onChange({ ...btn, value: e.target.value })}
            placeholder={BOUTON_PLACEHOLDERS[btn.type] ?? ""}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
          />
        </div>
      )}
    </div>
  );
}

function ReseauRow({ reseau, onChange }: { reseau: Reseau; onChange: (r: Reseau) => void }) {
  return (
    <div className={`rounded-2xl border transition-all ${reseau.active ? "border-border bg-card" : "border-border/50 bg-muted/30"}`}>
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-muted-foreground">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <span className="flex-1 text-sm font-medium text-foreground">{reseau.label}</span>
        <Toggle value={reseau.active} onChange={(v) => onChange({ ...reseau, active: v })} />
      </div>
      {reseau.active && (
        <div className="px-3 pb-3">
          <input
            type="url"
            value={reseau.url}
            onChange={(e) => onChange({ ...reseau, url: e.target.value })}
            placeholder={`https://${reseau.type}.com/monprofil`}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
          />
        </div>
      )}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-6 rounded-full transition-all flex-shrink-0"
      style={{ background: value ? "linear-gradient(135deg,#7c3aed,#EC4899)" : "var(--color-muted)" }}
    >
      <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
        style={{ left: value ? "calc(100% - 20px)" : "4px" }} />
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition" />
    </div>
  );
}

function PhonePreview({ theme, nom, fonction, entreprise, bio, photoUrl, boutons, reseaux }: {
  theme: typeof THEMES[number];
  nom: string; fonction: string; entreprise: string; bio: string;
  photoUrl: string; boutons: Bouton[]; reseaux: Reseau[];
}) {
  return (
    <div className="w-52 relative">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-foreground/10"
        style={{ background: theme.bg }}>
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-20 h-1.5 rounded-full bg-white/10" />
        </div>

        {/* Card header */}
        <div className="mx-3 rounded-2xl overflow-hidden mb-3" style={{ background: theme.gradient }}>
          <div className="p-4 text-center">
            {photoUrl ? (
              <img src={photoUrl} alt="" className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border-2 border-white/30" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 text-lg font-bold text-white">
                {nom ? nom.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <p className="text-xs font-bold text-white truncate">{nom || "Votre nom"}</p>
            {fonction && <p className="text-[10px] text-white/75 truncate">{fonction}</p>}
            {entreprise && <p className="text-[10px] text-white/60 truncate">{entreprise}</p>}
            {bio && <p className="text-[9px] text-white/55 mt-1 leading-tight line-clamp-2">{bio}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="px-3 space-y-1.5 mb-3">
          {boutons.slice(0, 4).map((btn, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-semibold text-white"
              style={{ backgroundColor: theme.accent }}>
              {BOUTON_ICONS[btn.type]}
              <span className="truncate">{btn.label}</span>
            </div>
          ))}
          {boutons.length === 0 && (
            <div className="text-center py-2">
              <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>Activez des boutons</p>
            </div>
          )}
        </div>

        {/* Social */}
        {reseaux.length > 0 && (
          <div className="px-3 mb-3 flex flex-wrap gap-1.5">
            {reseaux.slice(0, 4).map((r, i) => (
              <div key={i} className="text-[9px] font-medium px-2 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                {r.label}
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="px-3 pb-4">
          <div className="h-8 rounded-xl flex items-center justify-center text-[9px] font-medium"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            <Wifi className="w-2.5 h-2.5 mr-1" /> NFC · Propulsé par OneTap
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-xs text-muted-foreground mt-4 font-medium">Aperçu en direct</p>
    </div>
  );
}
