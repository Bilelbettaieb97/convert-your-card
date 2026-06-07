import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Users, Plus, ToggleLeft, ToggleRight, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;

const ADMIN_EMAIL = "bilel@convertilab.com";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<NfcProfile[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  // New client form
  const [newNom, setNewNom] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [newFonction, setNewFonction] = useState("");
  const [newEntreprise, setNewEntreprise] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate({ to: "/", replace: true });
        return;
      }
      setAuthorized(true);
      await loadProfiles();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);

  async function loadProfiles() {
    const { data } = await supabase
      .from("nfc_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setProfiles(data ?? []);
  }

  async function toggleActif(profile: NfcProfile) {
    const { error } = await supabase
      .from("nfc_profiles")
      .update({ actif: !profile.actif })
      .eq("id", profile.id);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
      return;
    }
    setProfiles((prev) =>
      prev.map((p) => (p.id === profile.id ? { ...p, actif: !p.actif } : p))
    );
    toast.success(`Carte ${!profile.actif ? "activée" : "désactivée"}`);
  }

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();
    if (!newNom || !newEmail) {
      toast.error("Nom et email sont obligatoires");
      return;
    }
    setCreating(true);
    try {
      // Generate slug from name
      const baseSlug = newNom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 30);

      // Check slug uniqueness
      let slug = baseSlug;
      let attempt = 0;
      while (true) {
        const { data } = await supabase.from("nfc_profiles").select("id").eq("slug", slug).maybeSingle();
        if (!data) break;
        attempt++;
        slug = `${baseSlug}-${attempt}`;
      }

      const { error } = await supabase.from("nfc_profiles").insert({
        slug,
        nom: newNom,
        email: newEmail,
        telephone: newTelephone,
        fonction: newFonction,
        entreprise: newEntreprise,
        plan: "free",
        boutons: [],
        reseaux: [],
        actif: true,
      });

      if (error) throw error;

      toast.success(`Profil créé : /${slug}`);
      setNewNom(""); setNewEmail(""); setNewTelephone("");
      setNewFonction(""); setNewEntreprise("");
      setShowCreateForm(false);
      await loadProfiles();
    } catch (err) {
      toast.error("Erreur lors de la création du profil");
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-magenta" />
            <h1 className="font-bold text-foreground">Admin OneTap</h1>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {profiles.length} profils
            </span>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center gap-2 bg-gradient-cta text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Nouveau client
          </button>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {/* Create form */}
          {showCreateForm && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-foreground mb-4">Créer un nouveau profil</h2>
              <form onSubmit={handleCreateClient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Nom *</label>
                  <input value={newNom} onChange={(e) => setNewNom(e.target.value)} required placeholder="Jean Dupont"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Email *</label>
                  <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required type="email" placeholder="jean@exemple.fr"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Téléphone</label>
                  <input value={newTelephone} onChange={(e) => setNewTelephone(e.target.value)} placeholder="+33 6 12 34 56 78"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Fonction</label>
                  <input value={newFonction} onChange={(e) => setNewFonction(e.target.value)} placeholder="Directeur commercial"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Entreprise</label>
                  <input value={newEntreprise} onChange={(e) => setNewEntreprise(e.target.value)} placeholder="Acme Corp"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40" />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <button type="submit" disabled={creating}
                    className="bg-gradient-cta text-white px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-60">
                    {creating ? "Création…" : "Créer le profil"}
                  </button>
                  <button type="button" onClick={() => setShowCreateForm(false)}
                    className="border border-border bg-background px-6 py-2.5 rounded-full text-sm font-medium">
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Profiles table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Plan</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Créé le</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-muted/30 transition">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{profile.nom}</div>
                      <div className="text-xs text-muted-foreground">{profile.email}</div>
                      <div className="text-xs text-muted-foreground font-mono">/{profile.slug}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-magenta/10 text-magenta">
                        {profile.plan ?? "free"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString("fr-FR") : "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => toggleActif(profile)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium"
                      >
                        {profile.actif ? (
                          <><ToggleRight className="w-5 h-5 text-emerald-500" /><span className="text-emerald-600">Active</span></>
                        ) : (
                          <><ToggleLeft className="w-5 h-5 text-muted-foreground" /><span className="text-muted-foreground">Inactive</span></>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={`${appUrl}/${profile.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-magenta hover:underline font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Voir
                      </a>
                    </td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">
                      Aucun profil pour l'instant.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
