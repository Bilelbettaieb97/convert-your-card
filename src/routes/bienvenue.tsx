import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { verifyUpgrade } from "@/fns/verify-upgrade";
import { createCard, updateCard, loadMyCard } from "@/lib/card-actions";
import { loadCard } from "@/lib/card-store";
import { DEFAULT_CARD } from "@/lib/card-types";
import { setProfileMeta } from "@/lib/profile-store";
import { CheckCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/bienvenue")({
  validateSearch: (s) => ({
    session_id: typeof s.session_id === "string" ? s.session_id : null,
  }),
  head: () => ({
    meta: [
      { title: "Bienvenue sur CVD !" },
      { name: "description", content: "Votre abonnement est confirmé." },
    ],
  }),
  component: BienvenePage,
});

function BienvenePage() {
  const navigate = useNavigate();
  const { session_id } = Route.useSearch();
  const [status, setStatus] = useState<"loading" | "verified" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // Step 1 — wait for a Supabase session
      let supaSession = (await supabase.auth.getSession()).data.session;

      if (!supaSession) {
        // Wait up to 4s for magic-link / OAuth to land
        supaSession = await new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(null), 4000);
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
            if (s) {
              clearTimeout(timeout);
              subscription.unsubscribe();
              resolve(s);
            }
          });
        });
      }

      if (!supaSession) {
        if (!cancelled) navigate({ to: "/connexion" });
        return;
      }

      // Step 2 — créer ou mettre à jour le profil avec la carte pending
      try {
        const pendingRaw = localStorage.getItem("cyk.card.pending");
        const cardData = pendingRaw
          ? { ...DEFAULT_CARD, ...(JSON.parse(pendingRaw) as object) }
          : loadCard();
        const existingProfile = await loadMyCard();
        if (!existingProfile) {
          if (cardData?.name) await createCard(cardData);
        } else if (cardData?.name) {
          await updateCard(existingProfile.id, cardData);
          setProfileMeta({
            id: existingProfile.id,
            slug: existingProfile.slug,
            plan: existingProfile.plan ?? "free",
            actif: existingProfile.actif ?? true,
          });
        }
        localStorage.removeItem("cyk.card.pending");
        localStorage.removeItem("cyk.builderia.generated");
      } catch {
        // Non-bloquant — le profil sera mis à jour depuis le dashboard
      }

      // Step 3 — if we got a Stripe session_id, verify the upgrade server-side
      if (session_id) {
        try {
          const result = await verifyUpgrade({ data: { sessionId: session_id } });
          if (!cancelled) setStatus(result.ok ? "verified" : "loading");
          // Short pause so user sees the confirmation state
          if (result.ok) await new Promise((r) => setTimeout(r, 1200));
        } catch {
          // Non-blocking — webhook may handle it
        }
      }

      if (!cancelled) navigate({ to: "/dashboard", replace: true });
    }

    run();

    // Hard fallback — if everything hangs, still redirect after 8s
    const fallback = setTimeout(() => {
      if (!cancelled) navigate({ to: "/dashboard", replace: true });
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [navigate, session_id]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {status === "verified" ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-semibold text-foreground">Bienvenue sur Vitrine ✓</p>
            <p className="text-xs text-muted-foreground">Redirection vers votre dashboard…</p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center animate-pulse">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {session_id ? "Activation de votre plan Vitrine…" : "Paiement confirmé · Préparation de ton espace…"}
            </p>
            <div className="w-6 h-6 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
          </>
        )}
      </div>
    </div>
  );
}
