import {
  defineEventHandler,
  getQuery,
  sendRedirect,
  getResponseHeader,
} from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (!event.path?.startsWith("/api/relance-click")) return;

  const { t: token } = getQuery(event);
  const appUrl =
    process.env.VITE_APP_URL ?? "https://www.cartevisitedigitale.fr";

  if (!token || typeof token !== "string") {
    return sendRedirect(event, appUrl, 302);
  }

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

  // Générer un nouveau magic link pour confirmer l'email + connecter l'utilisateur
  const { data: linkData } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: record.email,
    options: { redirectTo: `${appUrl}/bienvenue` },
  });

  const magicLink = (linkData as any)?.properties?.action_link;
  if (magicLink) {
    return sendRedirect(event, magicLink, 302);
  }

  // Fallback si génération échoue
  return sendRedirect(
    event,
    `${appUrl}/connexion?email=${encodeURIComponent(record.email)}`,
    302,
  );
});
