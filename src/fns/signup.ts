import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { isDisposableEmail } from "@/lib/is-disposable-email";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const signUpWithAutoConfirm = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    if (isDisposableEmail(data.email)) {
      throw new Error("Les adresses email temporaires ne sont pas acceptées.");
    }

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === data.email.toLowerCase()
    );

    if (existing) {
      return { exists: true };
    }

    // Create user with email pre-confirmed
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (error) throw new Error(error.message);

    return { exists: false };
  });
