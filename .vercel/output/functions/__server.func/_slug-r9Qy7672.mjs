import { c as createServerRpc } from "./_ssr/createServerRpc-DowByY8_.mjs";
import { c as createServerFn } from "./_ssr/server-D8HYMyU1.mjs";
import { c as createClient } from "./_libs/supabase__supabase-js.mjs";
import "./_libs/seroval.mjs";
import "./_libs/react.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:stream";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
if (!url || !serviceKey) {
  console.error("[supabase-admin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}
const adminSupabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});
const getProfile_createServerFn_handler = createServerRpc({
  id: "3abe21163060cdaebf0fca822dbccd0e90b15179a021cd21c9f2b19df9296d49",
  name: "getProfile",
  filename: "src/routes/$slug.tsx"
}, (opts) => getProfile.__executeServer(opts));
const getProfile = createServerFn({
  method: "GET"
}).validator((slug) => slug).handler(getProfile_createServerFn_handler, async ({
  data: slug
}) => {
  const {
    data
  } = await adminSupabase.from("nfc_profiles").select("*").eq("slug", slug).eq("actif", true).maybeSingle();
  return data ?? null;
});
export {
  getProfile_createServerFn_handler
};
