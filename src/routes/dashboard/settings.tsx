import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield, Download, Key, LogOut, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useCardStore } from "@/lib/card-store";
import { getProfileMeta, clearProfileMeta } from "@/lib/profile-store";
import { loadMyCard, updateCard } from "@/lib/card-actions";
import type { CardData } from "@/lib/card-types";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Paramètres — Dashboard" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data, setData, update } = useCardStore();
  const profile = getProfileMeta();

  const [newPassword, setNewPassword] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [signOutAllLoading, setSignOutAllLoading] = useState(false);

  useEffect(() => {
    loadMyCard().then((row) => {
      if ((row as any)?.card_data) setData((row as any).card_data as CardData);
    });
  }, []);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) { toast.error("8 caractères minimum"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else { toast.success("Mot de passe mis à jour"); setNewPassword(""); }
  }

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) { toast.error("Adresse email invalide"); return; }
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) toast.error(error.message);
    else {
      toast.success(`Lien de confirmation envoyé à ${newEmail}`);
      setEditEmail(false);
      setNewEmail("");
    }
  }

  async function handleSignOut() {
    clearProfileMeta();
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  async function handleSignOutAll() {
    setSignOutAllLoading(true);
    try {
      clearProfileMeta();
      await supabase.auth.signOut({ scope: "global" });
      navigate({ to: "/" });
    } finally {
      setSignOutAllLoading(false);
    }
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ma-carte-convertilab.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Données exportées");
  }

  async function handleNoIndex(v: boolean) {
    update("noIndex", v);
    if (profile) {
      try {
        await updateCard(profile.id, { ...data, noIndex: v });
        toast.success(v ? "Carte masquée des moteurs de recherche" : "Carte visible dans les moteurs de recherche");
      } catch {
        update("noIndex", !v);
        toast.error("Erreur lors de la sauvegarde");
      }
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl space-y-6">
      <Section title="Profil" desc="Tes informations de connexion">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Email actuel</label>
          <Input defaultValue={user?.email ?? ""} readOnly className="bg-muted/30" />
        </div>
        {!editEmail ? (
          <Button variant="outline" size="sm" onClick={() => setEditEmail(true)}>
            Modifier l'email
          </Button>
        ) : (
          <form onSubmit={handleEmailChange} className="space-y-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nouvel email</label>
              <Input
                type="email"
                placeholder="nouveau@exemple.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-1.5">Un lien de confirmation sera envoyé à cette adresse.</p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm">Confirmer</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => { setEditEmail(false); setNewEmail(""); }}>Annuler</Button>
            </div>
          </form>
        )}
      </Section>

      <Section title="Sécurité" desc="Mot de passe et sessions actives">
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nouveau mot de passe</label>
            <Input
              type="password"
              placeholder="8 caractères minimum"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm">Mettre à jour</Button>
        </form>
        <ActionRow
          icon={Key}
          label="Déconnecter tous les appareils"
          desc="Ferme toutes les sessions ouvertes, y compris les autres onglets"
          cta={signOutAllLoading ? "..." : "Déconnecter tout"}
          onClick={handleSignOutAll}
          danger
        />
      </Section>

      <Section title="Confidentialité & données">
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm">Mode privé</div>
            <div className="text-xs text-muted-foreground">Masquer ta carte des résultats Google (noindex)</div>
          </div>
          <Switch
            checked={data.noIndex ?? false}
            onCheckedChange={handleNoIndex}
          />
        </div>
        <ActionRow
          icon={Download}
          label="Exporter mes données"
          desc="Télécharge ta carte au format JSON (conformité RGPD)"
          cta="Exporter"
          onClick={handleExport}
        />
      </Section>

      <Section title="Session">
        <ActionRow
          icon={LogOut}
          label="Se déconnecter"
          desc="Fermer uniquement la session en cours sur cet appareil"
          cta="Déconnexion"
          onClick={handleSignOut}
        />
      </Section>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 space-y-4">
      <div>
        <h3 className="font-display text-lg">{title}</h3>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function ActionRow({ icon: Icon, label, desc, cta, danger, onClick }: { icon: typeof Shield; label: string; desc: string; cta?: string; danger?: boolean; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
      <Icon className={`h-4 w-4 flex-shrink-0 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${danger ? "text-destructive" : ""}`}>{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {cta && (
        <Button size="sm" variant={danger ? "destructive" : "outline"} onClick={onClick}>
          {cta}
        </Button>
      )}
    </div>
  );
}

export default SettingsPage;
