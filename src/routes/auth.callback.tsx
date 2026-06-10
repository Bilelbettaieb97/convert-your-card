import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      // Exchange code for session (PKCE flow)
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        // Try exchanging code from URL
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { data: { session: s } } = await supabase.auth.exchangeCodeForSession(code);
          if (s?.user) return redirect(s.user.id);
        }
        navigate({ to: "/connexion", replace: true });
        return;
      }

      redirect(session.user.id);
    }

    async function redirect(userId: string) {
      const { data: profile } = await supabase
        .from("nfc_profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();
      navigate({ to: profile ? "/dashboard" : "/builder", replace: true });
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
