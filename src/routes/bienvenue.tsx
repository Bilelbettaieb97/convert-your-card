import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ExternalLink, LayoutDashboard } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type NfcProfile = Tables<"nfc_profiles">;

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue sur OneTap ! 🎉" },
      { name: "description", content: "Votre carte de visite digitale est prête." },
    ],
  }),
  component: BienvenePage,
});

function BienvenePage() {
  const [profile, setProfile] = useState<NfcProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://convert-your-card.vercel.app";

  useEffect(() => {
    async function load() {
      // Wait a moment for webhook to process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("nfc_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setProfile(data ?? null);
      setLoading(false);
    }
    load();
  }, []);

  const cardUrl = profile ? `${appUrl}/${profile.slug}` : null;

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md">
        {/* Success animation */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">
          Bienvenue sur OneTap ! 🎉
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Votre abonnement est confirmé. Votre carte de visite digitale est prête à partager.
        </p>

        {loading ? (
          <div className="w-8 h-8 rounded-full border-2 border-magenta border-t-transparent animate-spin mx-auto mb-8" />
        ) : (
          <div className="space-y-4 mb-8">
            {cardUrl && (
              <a
                href={cardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-cta text-white py-3.5 rounded-full text-sm font-semibold shadow-card hover:shadow-glow transition"
              >
                <ExternalLink className="w-4 h-4" />
                Voir ma carte publique
              </a>
            )}

            <Link
              to="/dashboard/profil"
              className="flex items-center justify-center gap-2 w-full border border-border bg-card text-foreground py-3.5 rounded-full text-sm font-semibold hover:bg-accent transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              Compléter mon profil
            </Link>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-5 text-left">
          <p className="text-sm font-semibold text-foreground mb-3">Prochaines étapes :</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-magenta font-bold mt-0.5">1.</span>
              Complétez votre profil avec votre photo et vos infos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-magenta font-bold mt-0.5">2.</span>
              Partagez votre carte via QR code ou NFC
            </li>
            <li className="flex items-start gap-2">
              <span className="text-magenta font-bold mt-0.5">3.</span>
              Suivez vos statistiques dans le dashboard
            </li>
          </ul>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Un email de confirmation a été envoyé à votre adresse.{" "}
          <a href="mailto:bilel@convertilab.com" className="text-magenta hover:underline">
            Des questions ?
          </a>
        </p>
      </div>
    </div>
  );
}
