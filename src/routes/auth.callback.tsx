import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { loadCard } from "@/lib/card-store";
import { Zap } from "lucide-react";

const CARD_KEY = "cyk.card.v1";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      let session = (await supabase.auth.getSession()).data.session;

      if (!session?.user) {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { data } = await supabase.auth.exchangeCodeForSession(code);
          session = data.session;
        }
      }

      if (!session?.user) {
        navigate({ to: "/connexion", replace: true });
        return;
      }

      const { data: profile } = await supabase
        .from("nfc_profiles")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profile) {
        navigate({ to: "/dashboard", replace: true });
        return;
      }

      // Nouvel user → pré-remplir le store avec les données Google
      const meta = session.user.user_metadata ?? {};
      const fullName: string = meta.full_name ?? meta.name ?? "";
      const avatarUrl: string = meta.avatar_url ?? meta.picture ?? "";
      const email: string = session.user.email ?? "";

      if (fullName || avatarUrl || email) {
        try {
          const existing = loadCard();
          const prefilled = {
            ...existing,
            ...(fullName && !existing.name ? { name: fullName } : {}),
            ...(avatarUrl && !existing.photo ? { photo: avatarUrl } : {}),
            ...(email && !existing.email ? { email } : {}),
          };
          localStorage.setItem(CARD_KEY, JSON.stringify(prefilled));
        } catch {}
      }

      const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop";
      supabase.rpc("track_signup_device", { p_user_id: session.user.id, p_device: device }).then(() => {});

      let goToResultat = false;
      if (typeof window !== "undefined" && !!localStorage.getItem("cyk.builderia.generated")) {
        try {
          const cardData = loadCard();
          goToResultat = !!cardData?.bio;
        } catch {}
      }
      navigate({ to: goToResultat ? "/builderia/resultat" : "/builderia", replace: true });
    }

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-lg animate-pulse">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm text-muted-foreground">Connexion en cours…</p>
      </div>
    </div>
  );
}
