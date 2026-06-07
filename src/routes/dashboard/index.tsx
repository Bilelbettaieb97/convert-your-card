import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, MousePointerClick, UserPlus, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;
type Subscription = Tables<"subscriptions">;

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [stats, setStats] = useState({ scans: 0, clicks: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, subRes, analyticsRes] = await Promise.all([
        supabase.from("nfc_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("nfc_analytics").select("event_type").eq("profile_id", (await supabase.from("nfc_profiles").select("id").eq("user_id", user.id).maybeSingle()).data?.id ?? ""),
      ]);

      setProfile(profileRes.data ?? null);
      setSubscription(subRes.data ?? null);

      const events = analyticsRes.data ?? [];
      setStats({
        scans: events.filter((e) => e.event_type === "scan").length,
        clicks: events.filter((e) => e.event_type === "button_click").length,
        contacts: events.filter((e) => e.event_type === "vcard_download").length,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    );
  }

  const planLabel = subscription?.plan
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
    : "Gratuit";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Bonjour{profile?.nom ? `, ${profile.nom.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Voici un aperçu de votre carte digitale.</p>
      </div>

      {/* Plan badge */}
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-magenta/10 text-magenta border border-magenta/20">
          Plan {planLabel}
        </span>
        {(!subscription?.plan || subscription.plan === "free") && (
          <Link
            to="/inscription/selection-de-plan"
            className="text-sm font-semibold text-magenta hover:underline"
          >
            Passer à Pro →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<Eye className="w-5 h-5 text-violet-500" />} label="Vues totales" value={stats.scans} color="violet" />
        <StatCard icon={<MousePointerClick className="w-5 h-5 text-magenta" />} label="Clics" value={stats.clicks} color="magenta" />
        <StatCard icon={<UserPlus className="w-5 h-5 text-emerald-500" />} label="Contacts sauvegardés" value={stats.contacts} color="emerald" />
      </div>

      {/* Card preview */}
      {profile ? (
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-foreground">{profile.nom}</h2>
              <p className="text-sm text-muted-foreground">{profile.fonction || "—"} · {profile.entreprise || "—"}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${profile.actif ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {profile.actif ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href={`${appUrl}/${profile.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Voir ma carte
            </a>
            <Link
              to="/dashboard/profil"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Modifier
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-dashed border-border rounded-2xl p-8 text-center">
          <p className="text-muted-foreground mb-4">Votre carte n'est pas encore configurée.</p>
          <Link
            to="/dashboard/profil"
            className="inline-block bg-gradient-cta text-white px-6 py-2.5 rounded-full text-sm font-semibold"
          >
            Configurer ma carte
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    violet: "bg-violet-50 dark:bg-violet-900/20",
    magenta: "bg-magenta/10",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20",
  };
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-xl ${bgMap[color] ?? "bg-muted"} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
