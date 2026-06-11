import { defineEventHandler, getQuery, sendRedirect } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/vitrine-upgrade-click") || event.method !== "GET") return;

  const query = getQuery(event);
  const token = query.t;
  if (!token) return sendRedirect(event, process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr", 302);

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const appUrl      = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const utmParams = new URLSearchParams();
  for (const key of utmKeys) {
    const val = query[key];
    if (val) utmParams.set(key, String(val));
  }
  const utmStr = utmParams.toString();
  const pricingUrl = `${appUrl}/pricing${utmStr ? `?${utmStr}` : ""}`;

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: row, error } = await admin
    .from("vitrine_upgrade_series")
    .select("email, clicked_at")
    .eq("click_token", token)
    .maybeSingle();

  if (error || !row) {
    return sendRedirect(event, pricingUrl, 302);
  }

  if (!row.clicked_at) {
    await admin.from("vitrine_upgrade_series").update({ clicked_at: new Date().toISOString() }).eq("click_token", token);
  }

  try {
    const { data: linkData } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: row.email,
      options: { redirectTo: pricingUrl },
    });
    if (linkData?.properties?.action_link) {
      return sendRedirect(event, linkData.properties.action_link, 302);
    }
  } catch (_) {}

  return sendRedirect(event, pricingUrl, 302);
});
