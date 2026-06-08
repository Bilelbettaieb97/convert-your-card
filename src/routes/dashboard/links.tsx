import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard, updateCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import type { CardData } from "@/lib/card-types";
import { Phone, MessageCircle, Mail, Globe, Linkedin, Instagram, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/dashboard/links")({
  component: LinksPage,
});

function LinksPage() {
  const { data, setData, update, hydrated } = useCardStore();
  const profile = getProfileMeta();
  const [supabaseReady, setSupabaseReady] = useState(false);
  const skipNextSave = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile) { setSupabaseReady(true); return; }
    loadMyCard().then((row) => {
      if (row?.card_data) {
        skipNextSave.current = true;
        setData(row.card_data as CardData);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hydrated || !supabaseReady || !profile) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated, supabaseReady]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hydrated || !supabaseReady) {
    return <div className="p-8 text-muted-foreground">Chargement…</div>;
  }

  const toggleAction = (key: keyof CardData["actions"]) => {
    setData({ ...data, actions: { ...data.actions, [key]: !data.actions[key] } });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">
      <section className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-medium">Liens & réseaux</h2>
          <p className="text-sm text-muted-foreground mt-1">Modifiez vos coordonnées et réseaux. Sauvegarde automatique.</p>
        </div>

        {/* Boutons d'action */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Boutons d'action</p>
          <div className="space-y-2">
            <LinkRow
              icon={<Phone className="h-4 w-4" />}
              label="Téléphone"
              active={data.actions.call}
              onToggle={() => toggleAction("call")}
              value={data.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+33 6 12 34 56 78"
              type="tel"
            />
            <LinkRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              active={data.actions.whatsapp}
              onToggle={() => toggleAction("whatsapp")}
              value={data.whatsapp}
              onChange={(v) => update("whatsapp", v)}
              placeholder="33612345678"
              type="tel"
              hint="Numéro sans + ni espaces (ex : 33612345678)"
            />
            <LinkRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              active={data.actions.email}
              onToggle={() => toggleAction("email")}
              value={data.email}
              onChange={(v) => update("email", v)}
              placeholder="vous@exemple.fr"
              type="email"
            />
            <LinkRow
              icon={<Globe className="h-4 w-4" />}
              label="Site web"
              active={data.actions.website}
              onToggle={() => toggleAction("website")}
              value={data.website}
              onChange={(v) => update("website", v)}
              placeholder="https://monsite.fr"
              type="url"
            />
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Réseaux sociaux</p>
          <div className="space-y-2">
            <SocialRow
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value={data.linkedin}
              onChange={(v) => update("linkedin", v)}
              placeholder="https://linkedin.com/in/votre-profil"
            />
            <SocialRow
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              value={data.instagram}
              onChange={(v) => update("instagram", v)}
              placeholder="https://instagram.com/votre-compte"
            />
            <SocialRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp social"
              value={data.whatsappSocial}
              onChange={(v) => update("whatsappSocial", v)}
              placeholder="33612345678"
              hint="Numéro sans + ni espaces"
            />
          </div>
        </div>

        {/* vCard */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Options</p>
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card/40 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <Download className="h-4 w-4" />
              </span>
              <div>
                <Label className="text-sm font-medium cursor-pointer" htmlFor="vcard-toggle">
                  Enregistrer le contact (vCard)
                </Label>
                <p className="text-xs text-muted-foreground">Permet aux visiteurs d'ajouter votre contact</p>
              </div>
            </div>
            <Switch
              id="vcard-toggle"
              checked={data.vcardEnabled}
              onCheckedChange={(v) => update("vcardEnabled", v)}
            />
          </div>
        </div>
      </section>

      <aside className="hidden xl:block">
        <div className="sticky top-20">
          <p className="text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Aperçu live
          </p>
          <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
        </div>
      </aside>
    </div>
  );
}

function LinkRow({
  icon, label, active, onToggle, value, onChange, placeholder, type, hint,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card/40 p-4 transition-opacity ${active ? "" : "opacity-50"}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
          {icon}
        </span>
        <span className="flex-1 text-sm font-medium">{label}</span>
        <Switch checked={active} onCheckedChange={onToggle} />
      </div>
      <Input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
        disabled={!active}
      />
      {hint && <p className="text-[11px] text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}

function SocialRow({
  icon, label, value, onChange, placeholder, hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card/40 p-4 transition-opacity ${value ? "" : "opacity-60"}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
          {icon}
        </span>
        <span className="flex-1 text-sm font-medium">{label}</span>
        {value && <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">Actif</span>}
      </div>
      <Input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
      />
      {hint && <p className="text-[11px] text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}
