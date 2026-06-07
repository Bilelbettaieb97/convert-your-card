import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/auth/redirect")({
  component: AuthRedirectPage,
});

function AuthRedirectPage() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      // Redirect via JS — email scanners don't execute JS so they can't consume
      // the one-time Supabase magic-link token.
      window.location.href = decodeURIComponent(to);
    } else {
      setError(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6 px-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c026d3] to-[#7c3aed] flex items-center justify-center shadow-lg">
        <Zap className="w-6 h-6 text-white" />
      </div>

      {error ? (
        <>
          <p className="text-center text-muted-foreground text-sm">
            Lien invalide. Retourne sur la page d'inscription et réessaie.
          </p>
          <a
            href="/inscription"
            className="text-sm font-semibold text-[#c026d3] hover:underline"
          >
            Retour à l'inscription
          </a>
        </>
      ) : (
        <p className="text-center text-muted-foreground text-sm animate-pulse">
          Connexion en cours…
        </p>
      )}
    </div>
  );
}
