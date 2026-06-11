import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

// Cron rapide toutes les 10 minutes — NC step 1 + BR step 1
// NC step 1 : "confirme ton adresse" dans les 10-20 min après inscription
// BR step 1 : "décris ton activité" dans les 10 min après le délai de 1h
// Le cron horaire garde ces steps dans sa boucle : la contrainte UNIQUE
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

  const authHeader = { "Content-Type": "application/json", Authorization: `Bearer ${serviceKey}` };
  let ncSent = 0;
  let brSent = 0;

  // ── NC step 1 ────────────────────────────────────────────────────────────────
  const { data: ncCandidates, error: ncError } = await admin.rpc("get_nc_step1_candidates");
  if (ncError) {
    console.error("[cron-nc-fast] NC RPC error:", ncError.message);
  } else if (ncCandidates?.length) {
    console.log(`[cron-nc-fast] ${ncCandidates.length} candidat(s) NC step 1`);
    const resp = await fetch(`${appUrl}/api/send-relance`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        users: ncCandidates.map((r: { user_id: string; email: string }) => ({
          user_id: r.user_id,
          email: r.email,
        })),
        step: 1,
      }),
    });
    const result = await resp.json().catch(() => ({}));
    ncSent = result.sent ?? 0;
    console.log(`[cron-nc-fast] NC: sent=${ncSent}, skipped=${result.skipped ?? 0}`);
  }

  // ── BR step 1 ────────────────────────────────────────────────────────────────
  const { data: brCandidates, error: brError } = await admin.rpc("get_br_step1_candidates");
  if (brError) {
    console.error("[cron-nc-fast] BR RPC error:", brError.message);
  } else if (brCandidates?.length) {
    console.log(`[cron-nc-fast] ${brCandidates.length} candidat(s) BR step 1`);
    const resp = await fetch(`${appUrl}/api/send-builder-relance`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        users: brCandidates.map((r: { user_id: string; email: string; builder_step_name: string }) => ({
          user_id: r.user_id,
          email: r.email,
          builder_step_name: r.builder_step_name,
        })),
        step: 1,
      }),
    });
    const result = await resp.json().catch(() => ({}));
    brSent = result.sent ?? 0;
    console.log(`[cron-nc-fast] BR: sent=${brSent}, skipped=${result.skipped ?? 0}`);
  }

  return new Response(
    JSON.stringify({ ok: true, nc_sent: ncSent, br_sent: brSent }),
    { headers: { "Content-Type": "application/json" } },
  );
});
