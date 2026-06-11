import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

// Cron rapide toutes les 10 minutes — NC step 1 uniquement
// L'email "confirme ton adresse" part dans les 10-20 min après inscription
// au lieu d'attendre jusqu'à 70 min avec le cron horaire.
// Le cron horaire garde le step 1 dans sa boucle : la contrainte UNIQUE
// sur (email, step) empêche tout doublon.
export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/cron-nc-fast")) return;

  const cronSecret = process.env.CRON_SECRET ?? "";
  const auth = getHeader(event, "authorization") ?? "";
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";
  const resendKey   = process.env.RESEND_API_KEY ?? "";

  if (!serviceKey || !resendKey) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Récupère uniquement les candidats NC step 1 (RPC léger, pas get_user_funnel)
  const { data: candidates, error } = await admin.rpc("get_nc_step1_candidates");
  if (error) {
    console.error("[cron-nc-fast] RPC error:", error.message);
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
  }

  if (!candidates?.length) {
    return new Response(JSON.stringify({ ok: true, sent: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log(`[cron-nc-fast] ${candidates.length} candidat(s) NC step 1`);

  const resp = await fetch(`${appUrl}/api/send-relance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({
      users: candidates.map((r: { user_id: string; email: string }) => ({
        user_id: r.user_id,
        email: r.email,
      })),
      step: 1,
    }),
  });

  const result = await resp.json().catch(() => ({}));
  console.log(`[cron-nc-fast] Résultat: sent=${result.sent ?? 0}, skipped=${result.skipped ?? 0}`);

  return new Response(
    JSON.stringify({ ok: true, sent: result.sent ?? 0, skipped: result.skipped ?? 0 }),
    { headers: { "Content-Type": "application/json" } },
  );
});
