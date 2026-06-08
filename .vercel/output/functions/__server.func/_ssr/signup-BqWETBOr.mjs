import { c as createServerRpc } from "./createServerRpc-BQ85VH0p.mjs";
import { c as createServerFn } from "./server-D_fGYias.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const schema = objectType({
  email: stringType().trim().email(),
  password: stringType().min(8)
});
const signUpWithAutoConfirm_createServerFn_handler = createServerRpc({
  id: "0120aeaa0f47d7c1f4e57cd64d068c07586b4cb2e48a69607fe50ccd733d2a79",
  name: "signUpWithAutoConfirm",
  filename: "src/fns/signup.ts"
}, (opts) => signUpWithAutoConfirm.__executeServer(opts));
const signUpWithAutoConfirm = createServerFn({
  method: "POST"
}).validator(schema).handler(signUpWithAutoConfirm_createServerFn_handler, async ({
  data
}) => {
  const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  const {
    data: existingUsers
  } = await supabaseAdmin.auth.admin.listUsers();
  const existing = existingUsers?.users?.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    return {
      exists: true
    };
  }
  const {
    error
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true
  });
  if (error) throw new Error(error.message);
  return {
    exists: false
  };
});
export {
  signUpWithAutoConfirm_createServerFn_handler
};
