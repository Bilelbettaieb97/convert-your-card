import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Plus, Trash2, Phone, Mail, Globe, MapPin, Calendar, Save, Upload, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;

type Bouton = {
  type: "call" | "email" | "website" | "maps" | "rdv";
  label: string;
  value: string;
};

type Reseau = {
  type: string;
  url: string;
};

export const Route = createFileRoute("/dashboard/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [nom, setNom] = useState("");
  const [fonction, setFonction] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [bio, setBio] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [couleurAccent, setCouleurAccent] = useState("#c026d3");
  const [boutons, setBoutons] = useState<Bouton[]>([]);
  const [reseaux, setReseaux] = useState<Reseau[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("nfc_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setNom(data.nom ?? "");
        setFonction(data.fonction ?? "");
        setEntreprise(data.entreprise ?? "");
        setBio(data.bio ?? "");
        setTelephone(data.telephone ?? "");
        setEmail(data.email ?? "");
        setPhotoUrl(data.photo_url ?? "");
        setCouleurAccent(data.couleur_accent ?? "#c026d3");
        setBoutons((data.boutons as Bouton[]) ?? []);
        setReseaux((data.reseaux as Reseau[]) ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleUploadPhoto(file: File) {
    if (!profile) return;
    setUploadingPhoto(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `nfc-photos/${profile.id}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("nfc-assets")
        .upload(path, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("nfc-assets").getPublicUrl(path);
      setPhotoUrl(urlData.publicUrl);
      toast.success("Photo mise à jour !");
    } catch (err) {
      toast.error("Erreur lors de l'upload de la photo");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("nfc_profiles")
        .update({
          nom,
          fonction,
          entreprise,
          bio,
          telephone,
          email,
          photo_url: photoUrl || null,
          couleur_accent: couleurAccent,
          boutons,
          reseaux,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Profil sauvegardé !");
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  function addBouton() {
    setBoutons([...boutons, { type: "call", label: "", value: "" }]);
  }

  function updateBouton(i: number, field: keyof Bouton, value: string) {
    const next = [...boutons];
    next[i] = { ...next[i], [field]: value };
    setBoutons(next);
  }

  function removeBouton(i: number) {
    setBoutons(boutons.filter((_, idx) => idx !== i));
  }

  function addReseau() {
    setReseaux([...reseaux, { type: "linkedin", url: "" }]);
  }

  function updateReseau(i: number, field: keyof Reseau, value: string) {
    const next = [...reseaux];
    next[i] = { ...next[i], [field]: value };
    setReseaux(next);
  }

  function removeReseau(i: number) {
    setReseaux(reseaux.filter((_, idx) => idx !== i));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";
  const cardUrl = profile ? `${appUrl}/${profile.slug}` : null;

  const boutonTypes = [
    { value: "call", label: "Appel", icon: <Phone className="w-3.5 h-3.5" /> },
    { value: "email", label: "Email", icon: <Mail className="w-3.5 h-3.5" /> },
    { value: "website", label: "Site web", icon: <Globe className="w-3.5 h-3.5" /> },
    { value: "maps", label: "Adresse", icon: <MapPin className="w-3.5 h-3.5" /> },
    { value: "rdv", label: "Rendez-vous", icon: <Calendar className="w-3.5 h-3.5" /> },
  ];

  const reseauTypes = ["linkedin", "instagram", "twitter", "facebook", "tiktok", "youtube", "github"];

  return (
    <>
      <Toaster />
      <div className="p-6 lg:p-8 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
            {cardUrl && (
              <a href={cardUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-magenta hover:underline mt-1">
                <ExternalLink className="w-3.5 h-3.5" />
                Voir ma carte
              </a>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gradient-cta text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Sauvegarde…" : "Sauvegarder"}
          </button>
        </div>

        {/* Photo */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-semibold text-foreground mb-4">Photo de profil</h2>
          <div className="flex items-center gap-4">
            {photoUrl ? (
              <img src={photoUrl} alt="Photo" className="w-20 h-20 rounded-2xl object-cover border border-border" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {nom ? nom.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0])}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="inline-flex items-center gap-2 border border-border bg-background hover:bg-accent px-4 py-2 rounded-full text-sm font-medium transition"
              >
                <Upload className="w-4 h-4" />
                {uploadingPhoto ? "Upload…" : "Changer la photo"}
              </button>
            </div>
          </div>
        </section>

        {/* Infos perso */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-semibold text-foreground mb-4">Informations personnelles</h2>
          <div className="space-y-4">
            <Field label="Nom complet" value={nom} onChange={setNom} placeholder="Jean Dupont" />
            <Field label="Fonction" value={fonction} onChange={setFonction} placeholder="Directeur commercial" />
            <Field label="Entreprise" value={entreprise} onChange={setEntreprise} placeholder="Acme Corp" />
            <Field label="Téléphone" value={telephone} onChange={setTelephone} placeholder="+33 6 12 34 56 78" type="tel" />
            <Field label="Email de contact" value={email} onChange={setEmail} placeholder="jean@acme.fr" type="email" />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Une courte description de vous..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition resize-none"
              />
            </div>
          </div>
        </section>

        {/* Couleur */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-semibold text-foreground mb-4">Couleur d'accent</h2>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={couleurAccent}
              onChange={(e) => setCouleurAccent(e.target.value)}
              className="w-14 h-10 rounded-lg border border-border cursor-pointer"
            />
            <span className="text-sm font-mono text-muted-foreground">{couleurAccent}</span>
          </div>
        </section>

        {/* Boutons */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Boutons d'action</h2>
            <button onClick={addBouton} className="inline-flex items-center gap-1.5 text-sm font-medium text-magenta hover:underline">
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
          {boutons.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun bouton. Ajoutez un bouton call, email, site web…</p>
          )}
          <div className="space-y-3">
            {boutons.map((btn, i) => (
              <div key={i} className="flex gap-2 items-start">
                <select
                  value={btn.type}
                  onChange={(e) => updateBouton(i, "type", e.target.value)}
                  className="flex-shrink-0 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40"
                >
                  {boutonTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <input
                  value={btn.label}
                  onChange={(e) => updateBouton(i, "label", e.target.value)}
                  placeholder="Label"
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40"
                />
                <input
                  value={btn.value}
                  onChange={(e) => updateBouton(i, "value", e.target.value)}
                  placeholder="Valeur (numéro, URL…)"
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40"
                />
                <button onClick={() => removeBouton(i)} className="p-2.5 text-muted-foreground hover:text-red-500 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Réseaux sociaux</h2>
            <button onClick={addReseau} className="inline-flex items-center gap-1.5 text-sm font-medium text-magenta hover:underline">
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
          {reseaux.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun réseau social ajouté.</p>
          )}
          <div className="space-y-3">
            {reseaux.map((r, i) => (
              <div key={i} className="flex gap-2 items-center">
                <select
                  value={r.type}
                  onChange={(e) => updateReseau(i, "type", e.target.value)}
                  className="flex-shrink-0 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40"
                >
                  {reseauTypes.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
                <input
                  value={r.url}
                  onChange={(e) => updateReseau(i, "url", e.target.value)}
                  placeholder="URL du profil"
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40"
                />
                <button onClick={() => removeReseau(i)} className="p-2.5 text-muted-foreground hover:text-red-500 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Save button (bottom) */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-cta text-white py-3 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition disabled:opacity-60"
        >
          {saving ? "Sauvegarde en cours…" : "Sauvegarder les modifications"}
        </button>
      </div>
    </>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition"
      />
    </div>
  );
}
