import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminSupabase } from "@/lib/supabase-admin";

export const saveCardPreview = createServerFn({ method: "POST" })
  .validator(z.object({ cardData: z.record(z.unknown()) }))
  .handler(async ({ data }) => {
    const token = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (adminSupabase as any).from("card_previews").insert({
      token,
      card_data: data.cardData,
    });

    if (error) throw new Error("Failed to save preview");
    return { token };
  });
