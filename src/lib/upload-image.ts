import { supabase } from "@/integrations/supabase/client";

const BUCKET = "user-photos";
const MAX_MB = 5;

export async function uploadImage(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) return null;
  if (file.size > MAX_MB * 1024 * 1024) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) return null;

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return pub.publicUrl;
}
