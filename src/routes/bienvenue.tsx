import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue sur OneTap !" },
      { name: "description", content: "Votre abonnement est confirmé." },
    ],
  }),
  component: BienvenePage,
});

function BienvenePage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      // Small delay for webhook to process the Stripe session
      await new Promise((r) => setTimeout(r, 1500));
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/connexion" }); return; }
      navigate({ to: "/onboarding", replace: true });
    }
    redirect();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center animate-pulse">
          <Zap className="w-7 h-7 text-white" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Paiement confirmé · Préparation de ton espace…</p>
        <div className="w-6 h-6 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
