import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link2, QrCode, Eye, MousePointerClick, Smartphone, Download, Copy } from "lucide-react";
import { toast } from "sonner";
import { getProfileMeta } from "@/lib/profile-store";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard/share")({
  component: SharePage,
});

type Stats = { views: number; clicks: number; saves: number; qr: number };

function SharePage() {
  const [publicUrl, setPublicUrl] = useState("https://www.cartevisitedigitale.fr/");
  const [stats, setStats] = useState<Stats>({ views: 0, clicks: 0, saves: 0, qr: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const profile = getProfileMeta();
    if (!profile) { setLoadingStats(false); return; }

    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cartevisitedigitale.fr";
    setPublicUrl(`${origin}/${profile.slug}`);

    const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();
    supabase
      .from("nfc_analytics")
      .select("event_type")
      .eq("profile_id", profile.id)
      .gte("created_at", since30)
      .then(({ data: rows }) => {
        if (!rows) { setLoadingStats(false); return; }
        const views = rows.filter(r => r.event_type === "view" || r.event_type === "scan").length;
        const clicks = rows.filter(r => r.event_type === "button_click").length;
        const saves = rows.filter(r => r.event_type === "vcard_download").length;
        const qr = rows.filter(r => r.event_type === "qr_scan").length;
        setStats({ views, clicks, saves, qr });
        setLoadingStats(false);
      });
  }, []);

  const STATS = [
    { icon: Eye,              label: "Vues 30 j.",    value: loadingStats ? "…" : stats.views.toString(),  hint: "Visites de votre carte" },
    { icon: MousePointerClick, label: "Clics 30 j.",  value: loadingStats ? "…" : stats.clicks.toString(), hint: "Sur les boutons d'action" },
    { icon: Smartphone,       label: "Ajouts vCard",  value: loadingStats ? "…" : stats.saves.toString(),  hint: "Téléphones où vous êtes enregistré" },
    { icon: QrCode,           label: "Scans QR",      value: loadingStats ? "…" : stats.qr.toString(),     hint: "Scans via QR code" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 space-y-8">
      <section>
        <h2 className="font-display text-2xl font-medium">Lien public</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          C'est l'adresse à partager. Vous pourrez la personnaliser une fois la carte publiée.
        </p>
        <Card className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
            <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm truncate">{publicUrl}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(publicUrl); toast.success("Lien copié"); }}>
              <Copy className="h-4 w-4 mr-1.5" /> Copier
            </Button>
            <Button variant="outline" disabled><QrCode className="h-4 w-4 mr-1.5" /> QR code</Button>
            <Button disabled><Download className="h-4 w-4 mr-1.5" /> Télécharger</Button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium">Statistiques</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Activité des 30 derniers jours sur votre carte publique.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, label, value, hint }) => (
            <Card key={label} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-display font-medium">{value}</div>
              <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
