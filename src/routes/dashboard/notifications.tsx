import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Eye, UserPlus, MousePointerClick, QrCode, Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
  component: NotificationsPage,
});

type NotifItem = { id: string; icon: typeof Eye; color: string; title: string; sub: string; unread: boolean };
type Prefs = { scan_email: boolean; scan_push: boolean; save_email: boolean; save_push: boolean; click_email: boolean; click_push: boolean; order_email: boolean; order_push: boolean; tips_email: boolean; tips_push: boolean };

const DEFAULT_PREFS: Prefs = { scan_email: true, scan_push: true, save_email: true, save_push: true, click_email: false, click_push: true, order_email: true, order_push: false, tips_email: true, tips_push: false };

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "hier" : `il y a ${days}j`;
}

function eventToNotif(row: { id: string; event_type: string; created_at: string }): NotifItem {
  const MAP: Record<string, { icon: typeof Eye; color: string; title: string }> = {
    view:           { icon: Eye,               color: "text-blue-400 bg-blue-500/10",     title: "Quelqu'un a consulté votre carte" },
    scan:           { icon: QrCode,            color: "text-violet-400 bg-violet-500/10", title: "Nouveau scan de votre carte" },
    qr_scan:        { icon: QrCode,            color: "text-violet-400 bg-violet-500/10", title: "Scan via QR code" },
    button_click:   { icon: MousePointerClick, color: "text-amber-400 bg-amber-500/10",   title: "Clic sur un bouton d'action" },
    vcard_download: { icon: UserPlus,          color: "text-emerald-400 bg-emerald-500/10", title: "Contact enregistré dans un téléphone" },
  };
  const m = MAP[row.event_type] ?? { icon: Eye, color: "text-muted-foreground bg-muted", title: row.event_type };
  return { id: row.id, icon: m.icon, color: m.color, title: m.title, sub: timeAgo(row.created_at), unread: true };
}

const PREF_ROWS: { id: string; label: string; emailKey: keyof Prefs; pushKey: keyof Prefs }[] = [
  { id: "scan",  label: "Nouveau scan de carte",        emailKey: "scan_email",  pushKey: "scan_push"  },
  { id: "save",  label: "Contact sauvegardé",            emailKey: "save_email",  pushKey: "save_push"  },
  { id: "click", label: "Clic sur un lien",              emailKey: "click_email", pushKey: "click_push" },
  { id: "order", label: "Mise à jour commande",          emailKey: "order_email", pushKey: "order_push" },
  { id: "tips",  label: "Conseils & nouveautés produit", emailKey: "tips_email",  pushKey: "tips_push"  },
];

function NotificationsPage() {
  const [feed, setFeed] = useState<NotifItem[]>([]);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [prefsId, setPrefsId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = getProfileMeta();
    if (profile) {
      supabase.from("nfc_analytics").select("id, event_type, created_at")
        .eq("profile_id", profile.id).order("created_at", { ascending: false }).limit(30)
        .then(({ data }) => { if (data) setFeed(data.map(eventToNotif)); });
    }
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await supabase.from("notification_prefs").select("*").eq("user_id", user.id).maybeSingle();
      if (data) { setPrefsId(data.id as string); setPrefs(data as Prefs); }
      else {
        const { data: created } = await supabase.from("notification_prefs").insert({ user_id: user.id, ...DEFAULT_PREFS }).select("id").single();
        if (created) setPrefsId(created.id as string);
      }
      setLoading(false);
    });
  }, []);

  const updatePref = useCallback(async (key: keyof Prefs, value: boolean) => {
    setPrefs(p => ({ ...p, [key]: value }));
    if (!prefsId) return;
    await supabase.from("notification_prefs").update({ [key]: value, updated_at: new Date().toISOString() }).eq("id", prefsId);
    toast.success("Préférence enregistrée");
  }, [prefsId]);

  const unreadCount = feed.filter(n => n.unread).length;

  return (
    <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
            {unreadCount > 0 && <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
          </h2>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setFeed(f => f.map(n => ({ ...n, unread: false })))}>
              <CheckCheck className="h-3.5 w-3.5 mr-2" /> Tout marquer comme lu
            </Button>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
          {feed.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-10 w-10 mx-auto opacity-20 mb-3" />
              <p className="text-sm text-muted-foreground">Aucune activité pour l'instant.<br /><span className="text-xs opacity-70">Les scans et interactions apparaîtront ici.</span></p>
            </div>
          ) : feed.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 border-b border-border/50 last:border-b-0 ${n.unread ? "bg-primary/5" : ""}`}>
              <div className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 ${n.color}`}><n.icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm">{n.title}</div>
                <div className="text-xs text-muted-foreground">{n.sub}</div>
              </div>
              {n.unread && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg">Préférences</h3>
        <div className="rounded-2xl border border-border bg-card/40 divide-y divide-border">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Événement</span><span>Email</span><span>Push</span>
          </div>
          {loading ? <div className="px-4 py-6 text-sm text-muted-foreground">Chargement…</div> : (
            PREF_ROWS.map(p => (
              <div key={p.id} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-4 py-3">
                <span className="text-sm">{p.label}</span>
                <Switch checked={prefs[p.emailKey] as boolean} onCheckedChange={v => updatePref(p.emailKey, v)} />
                <Switch checked={prefs[p.pushKey] as boolean} onCheckedChange={v => updatePref(p.pushKey, v)} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
