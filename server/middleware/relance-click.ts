import {
  defineEventHandler,
  getQuery,
  sendRedirect,
  getResponseHeader,
} from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/relance-click")) return;

  const query = getQuery(event);
  const token = query.t;
  const appUrl = process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  if (!token || typeof token !== "string") {
    return sendRedirect(event, appUrl, 302);
  }

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const utmParams = new URLSearchParams();
  for (const key of utmKeys) {
    const val = query[key];
    if (val) utmParams.set(key, String(val));
  }
  const utmStr = utmParams.toString();
  const builderUrl = `${appUrl}/builderia${utmStr ? `?${utmStr}` : ""}`;

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!serviceKey) {
    return sendRedirect(event, appUrl, 302);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Chercher l'enregistrement par click_token
  const { data: record, error } = await admin
    .from("email_relance_series")
    .select("id, email, clicked_at, step")
    .eq("click_token", token)
    .maybeSingle();

  if (error || !record) {
    return sendRedirect(event, appUrl, 302);
  }

  // Marquer comme cliqué (idempotent)
  if (!record.clicked_at) {
    await admin
      .from("email_relance_series")
      .update({ clicked_at: new Date().toISOString() })
      .eq("id", record.id);
  }

  // Générer un nouveau magic link — redirect vers /builderia avec UTMs
  const { data: linkData } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: record.email,
    options: { redirectTo: builderUrl },
  });

  const magicLink = (linkData as any)?.properties?.action_link;
  if (magicLink) {
    return sendRedirect(event, magicLink, 302);
  }

  return sendRedirect(event, builderUrl, 302);
});
