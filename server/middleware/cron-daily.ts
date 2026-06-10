import { defineEventHandler, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

// Days after the trigger date before sending each step
const NC_DELAYS: Record<number, number> = { 1: 1, 2: 4, 3: 8 };
const BR_DELAYS: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 14, 6: 21 };

function daysSince(ts: string | null | undefined): number {
  if (!ts) return -1;
  return (Date.now() - new Date(ts).getTime()) / 86_400_000;
}

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/cron-daily")) return;

  // Vercel cron automatically sends Authorization: Bearer <CRON_SECRET>
  const cronSecret = process.env.CRON_SECRET ?? "";
  const auth = getHeader(event, "authorization") ?? "";
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  if (!serviceKey) {
    return new Response(JSON.stringify({ error: "SUPABASE_SERVICE_ROLE_KEY not set" }), { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: users, error } = await admin.rpc("get_user_funnel");
  if (error || !users) {
    console.error("[cron-daily] Failed to fetch users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }

  const results: Record<string, number> = {};
  const authHeader = { "Content-Type": "application/json", Authorization: `Bearer ${serviceKey}` };

  // ── Série email non cliqué (J+1 / J+4 / J+8) ──────────────────────────
  const nonCliques = users.filter((r: any) => !r.email_confirme_le);

  for (const [stepStr, minDays] of Object.entries(NC_DELAYS)) {
    const step = Number(stepStr);
    const toSend = nonCliques.filter((r: any) =>
      daysSince(r.inscrit_le) >= minDays &&
      (!r.relance_step || r.relance_step < step)
    );
    if (toSend.length === 0) continue;

    console.log(`[cron-daily] NC step ${step}: ${toSend.length} destinataire(s)`);
    const resp = await fetch(`${appUrl}/api/send-relance`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        users: toSend.map((r: any) => ({ user_id: r.user_id, email: r.email })),
        step,
      }),
    });
    const result = await resp.json().catch(() => ({}));
    results[`nc_step_${step}`] = result.sent ?? 0;
  }

  // ── Série builder (J+1 / J+3 / J+6 / J+10 / J+14 / J+21) ─────────────
  const builder = users.filter((r: any) => r.email_confirme_le && !r.plan && r.builder_step >= 1);

  for (const [stepStr, minDays] of Object.entries(BR_DELAYS)) {
    const step = Number(stepStr);
    const toSend = builder.filter((r: any) =>
      daysSince(r.email_confirme_le) >= minDays &&
      (!r.builder_relance_step || r.builder_relance_step < step)
    );
    if (toSend.length === 0) continue;

    console.log(`[cron-daily] Builder step ${step}: ${toSend.length} destinataire(s)`);
    const resp = await fetch(`${appUrl}/api/send-builder-relance`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        users: toSend.map((r: any) => ({
          user_id: r.user_id,
          email: r.email,
          builder_step: r.builder_step ?? 1,
        })),
        step,
      }),
    });
    const result = await resp.json().catch(() => ({}));
    results[`br_step_${step}`] = result.sent ?? 0;
  }

  const totalSent = Object.values(results).reduce((a, b) => a + b, 0);
  console.log("[cron-daily] Done:", results);

  return new Response(JSON.stringify({ ok: true, total_sent: totalSent, results }), {
    headers: { "Content-Type": "application/json" },
  });
});
