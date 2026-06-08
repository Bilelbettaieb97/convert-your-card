import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Linkedin, Instagram, Globe, Calendar, MessageCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";

export const Route = createFileRoute("/dashboard/links")({
  head: () => ({ meta: [{ title: "Liens & Réseaux — Dashboard" }] }),
  component: LinksPage,
});

type LinkItem = { id: string; label: string; url: string; icon: typeof Globe; active: boolean; clicks: number };

const ICON_MAP: Record<string, typeof Globe> = {
  call: Phone, whatsapp: MessageCircle, email: Mail, website: Globe,
  linkedin: Linkedin, instagram: Instagram,
};

const LABELS: Record<string, string> = {
  call: "Appel téléphonique", whatsapp: "WhatsApp", email: "Email", website: "Site web",
  linkedin: "LinkedIn", instagram: "Instagram",
};

function buildUrl(type: string, value: string): string {
  if (type === "call") return `tel:${value}`;
  if (type === "whatsapp") return `https://wa.me/${value.replace(/[^0-9]/g, "")}`;
  if (type === "email") return `mailto:${value}`;
  if (!value.startsWith("http")) return `https://${value}`;
  return value;
}

function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) { setLoading(false); return; }
    setSlug(profile.slug ?? null);

    Promise.all([
      supabase.from("nfc_profiles").select("boutons, reseaux").eq("id", profile.id).maybeSingle(),
      supabase.from("nfc_analytics").select("event_type, event_data")
        .eq("profile_id", profile.id).eq("event_type", "button_click"),
    ]).then(([{ data: profile_data }, { data: events }]) => {
      const clickMap: Record<string, number> = {};
      for (const ev of events ?? []) {
        const btnType = (ev.event_data as Record<string, string>)?.button_type ?? "unknown";
        clickMap[btnType] = (clickMap[btnType] ?? 0) + 1;
      }

      const all: LinkItem[] = [];
      for (const btn of (profile_data?.boutons ?? []) as { type: string; label: string; value: string; active: boolean }[]) {
        all.push({
          id: `btn-${btn.type}`,
          label: btn.label || LABELS[btn.type] || btn.type,
          url: buildUrl(btn.type, btn.value),
          icon: ICON_MAP[btn.type] ?? Globe,
          active: btn.active,
          clicks: clickMap[btn.type] ?? 0,
        });
      }
      for (const r of (profile_data?.reseaux ?? []) as { type: string; label: string; url: string; active: boolean }[]) {
        all.push({
          id: `rseau-${r.type}`,
          label: r.label || LABELS[r.type] || r.type,
          url: r.url,
          icon: ICON_MAP[r.type] ?? Globe,
          active: r.active,
          clicks: clickMap[r.type] ?? 0,
        });
      }
      setLinks(all);
      setLoading(false);
    });
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = slug ? `${origin}/${slug}` : null;

  return (
    <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl">Mes liens actifs</h2>
            <p className="text-xs text-muted-foreground">Configurez vos liens depuis le builder de carte</p>
          </div>
          <Link to="/dashboard/card">
            <Button variant="outline">Modifier dans le builder</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-sm text-muted-foreground p-8 text-center">Chargement…</div>
        ) : links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Globe className="h-10 w-10 mx-auto opacity-20 mb-3" />
            <p className="text-sm text-muted-foreground">Aucun lien configuré.</p>
            <p className="text-xs text-muted-foreground opacity-70 mt-1">Ajoutez vos coordonnées et réseaux depuis le builder.</p>
            <Link to="/dashboard/card"><Button className="mt-4" size="sm">Ouvrir le builder</Button></Link>
          </div>
        ) : (
          <div className="space-y-2">
            {links.map(l => (
              <div key={l.id} className={`flex items-center gap-3 p-3 rounded-xl border border-border bg-card/40 ${l.active ? "" : "opacity-40"}`}>
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0"><l.icon className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{l.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{l.url}</div>
                </div>
                <div className="text-xs text-muted-foreground hidden md:block">{l.clicks} clic{l.clicks !== 1 ? "s" : ""}</div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full border ${l.active ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-border text-muted-foreground"}`}>
                  {l.active ? "Actif" : "Inactif"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg">Aperçu</h3>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="text-xs uppercase tracking-wider text-primary">Total clics (30j)</div>
          <div className="font-display text-3xl">{links.reduce((s, l) => s + l.clicks, 0)}</div>
          <div className="text-xs text-muted-foreground">Répartis sur {links.filter(l => l.active).length} lien{links.filter(l => l.active).length !== 1 ? "s" : ""} actif{links.filter(l => l.active).length !== 1 ? "s" : ""}</div>
        </div>
        {publicUrl && (
          <a href={publicUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full"><ExternalLink className="h-3.5 w-3.5 mr-2" /> Voir ma carte publique</Button>
          </a>
        )}
        <div className="rounded-xl border border-border bg-card/30 p-4 text-xs text-muted-foreground">
          Les clics sont mesurés sur les 30 derniers jours depuis la page publique de votre carte.
        </div>
        {/* Quick type icons — informational only */}
        <div className="grid grid-cols-3 gap-2">
          {[{ icon: Phone, l: "Appel" }, { icon: MessageCircle, l: "WhatsApp" }, { icon: Mail, l: "Email" }, { icon: Globe, l: "Site web" }, { icon: Linkedin, l: "LinkedIn" }, { icon: Calendar, l: "Calendly" }].map(t => (
            <div key={t.l} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border text-xs text-muted-foreground">
              <t.icon className="h-5 w-5 text-primary/60" />
              <span>{t.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinksPage;
