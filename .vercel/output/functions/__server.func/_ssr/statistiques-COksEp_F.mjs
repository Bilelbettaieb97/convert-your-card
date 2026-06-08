import { c as createServerRpc } from "./createServerRpc-BoDx01EW.mjs";
import { c as createServerFn } from "./server-CldH5wA1.mjs";
import { a as adminSupabase } from "./supabase-admin-Cp5AYNJb.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const fetchProfileAnalytics_createServerFn_handler = createServerRpc({
  id: "d730682d06b2b46d258564a49e121f6f26d3544c98cfe142af932c83bdef04fd",
  name: "fetchProfileAnalytics",
  filename: "src/routes/dashboard/statistiques.tsx"
}, (opts) => fetchProfileAnalytics.__executeServer(opts));
const fetchProfileAnalytics = createServerFn({
  method: "POST"
}).validator((input) => input).handler(fetchProfileAnalytics_createServerFn_handler, async ({
  data
}) => {
  const {
    data: {
      user
    }
  } = await adminSupabase.auth.getUser(data.accessToken);
  if (!user) return [];
  const {
    data: profile
  } = await adminSupabase.from("nfc_profiles").select("id").eq("id", data.profileId).eq("user_id", user.id).maybeSingle();
  if (!profile) return [];
  const {
    data: rows
  } = await adminSupabase.from("nfc_analytics").select("event_type, created_at, event_data").eq("profile_id", data.profileId).order("created_at", {
    ascending: true
  });
  return rows ?? [];
});
export {
  fetchProfileAnalytics_createServerFn_handler
};
