import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
if (!url || !serviceKey) {
  console.error("[supabase-admin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}
const adminSupabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});
export {
  adminSupabase as a
};
