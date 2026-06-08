import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta, setProfileMeta } from "./profile-store";

export function usePlan() {
  const cached = getProfileMeta();
  const [plan, setPlan] = useState<string>(cached?.plan ?? "free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("nfc_profiles")
        .select("id, slug, plan, actif")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        const realPlan = data.plan ?? "free";
        setPlan(realPlan);
        const meta = getProfileMeta();
        if (meta) {
          setProfileMeta({ ...meta, plan: realPlan });
        } else {
          setProfileMeta({ id: data.id, slug: data.slug, plan: realPlan, actif: data.actif ?? true });
        }
      }
      setLoading(false);
    });
  }, []);

  return { plan, loading };
}
