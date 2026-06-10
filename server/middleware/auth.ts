import { defineEventHandler, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const disposableDomains: string[] = require("disposable-email-domains");
function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? disposableDomains.includes(domain) : false;
}

export default defineEventHandler(async (event) => {
  if (event.path !== "/api/signup" || event.method !== "POST") return;

  const body = await readBody(event);
  const { email, password } = body ?? {};

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email et mot de passe requis" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (isDisposableEmail(email)) {
    return new Response(JSON.stringify({ error: "Les adresses email temporaires ne sont pas acceptées." }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  const adminSupabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // bypass email confirmation
  });

  if (error) {
    // email_exists → return 409 so client can attempt signIn directly
    const isEmailExists =
      error.message?.toLowerCase().includes("already") ||
      (error as { code?: string }).code === "email_exists" ||
      String(error).includes("email_exists");
    if (isEmailExists) {
      return new Response(JSON.stringify({ exists: true }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, userId: data.user?.id }), {
    headers: { "Content-Type": "application/json" },
  });
});
