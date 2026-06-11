import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminSupabase } from "@/lib/supabase-admin";
import type { CardData } from "@/lib/card-types";

export const getCardPreview = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: preview, error } = await (adminSupabase as any)
      .from("card_previews")
      .select("card_data")
      .eq("token", data.token)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !preview) return null;
    return preview.card_data as CardData;
  });
