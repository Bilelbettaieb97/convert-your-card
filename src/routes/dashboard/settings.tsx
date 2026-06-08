import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield, Globe, Trash2, Download, Key } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Paramètres — Dashboard" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) { toast.error("8 caractères minimum"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else { toast.success("Mot de passe mis à jour"); setNewPassword(""); setCurrentPassword(""); }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl space-y-6">
      <Section title="Profil" desc="Vos informations personnelles">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
          <Input defaultValue={user?.email ?? ""} readOnly className="bg-muted/30" />
        </div>
        <Button disabled>Modifier l'email (bientôt disponible)</Button>
      </Section>

      <Section title="Sécurité" desc="Mot de passe et authentification">
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Mot de passe actuel</label>
            <Input type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nouveau mot de passe</label>
            <Input type="password" placeholder="8 caractères minimum" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <Button type="submit">Mettre à jour</Button>
        </form>
        <Toggle icon={Shield} label="Authentification à deux facteurs" sub="Recevez un code par SMS à chaque connexion" />
        <Toggle icon={Key} label="Sessions sur tous les appareils" sub="Déconnectez-vous partout" />
      </Section>

      <Section title="Langue & région">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Langue</label>
            <Input defaultValue="Français" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Fuseau horaire</label>
            <Input defaultValue="Europe/Paris" />
          </div>
        </div>
        <Toggle icon={Globe} label="Carte publique en anglais aussi" sub="Détection auto selon le navigateur du visiteur" />
      </Section>

      <Section title="Données & confidentialité">
        <ActionRow icon={Download} label="Exporter mes données" desc="Téléchargez toutes vos données au format JSON (RGPD)" cta="Exporter" />
        <ActionRow icon={Shield} label="Mode privé" desc="Masquer votre carte des moteurs de recherche" toggle />
        <ActionRow icon={Trash2} label="Se déconnecter" desc="Fermer la session en cours" cta="Déconnexion" onClick={handleSignOut} />
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

function Toggle({ icon: Icon, label, sub }: { icon: typeof Shield; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <div className="text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <Switch />
    </div>
  );
}

function ActionRow({ icon: Icon, label, desc, cta, toggle, danger, onClick }: { icon: typeof Shield; label: string; desc: string; cta?: string; toggle?: boolean; danger?: boolean; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
      <Icon className={`h-4 w-4 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${danger ? "text-destructive" : ""}`}>{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {toggle ? <Switch /> : <Button size="sm" variant={danger ? "destructive" : "outline"} onClick={onClick}>{cta}</Button>}
    </div>
  );
}

export default SettingsPage;
