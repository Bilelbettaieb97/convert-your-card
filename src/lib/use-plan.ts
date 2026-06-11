import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta, setProfileMeta } from "./profile-store";

export const TRIAL_DAYS = 3;

export function usePlan() {
  const cached = getProfileMeta();
  const [plan, setPlan] = useState<string>(cached?.plan ?? "free");
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [actif, setActif] = useState<boolean>(cached?.actif ?? true);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); setHasProfile(false); return; }
      const { data } = await supabase
        .from("nfc_profiles")
        .select("id, slug, plan, actif, created_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setHasProfile(true);
        const realPlan = data.plan ?? "free";
        setPlan(realPlan);
        setActif(data.actif ?? true);
        setCreatedAt((data as any).created_at ?? null);
        const meta = getProfileMeta();
        if (meta) {
          setProfileMeta({ ...meta, plan: realPlan });
        } else {
          setProfileMeta({ id: data.id, slug: data.slug, plan: realPlan, actif: data.actif ?? true });
        }
      } else {
        setHasProfile(false);
      }
      setLoading(false);
    });
  }, []);

  const daysOld = createdAt
    ? Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000)
    : 0;
  const daysLeft = Math.max(0, TRIAL_DAYS - daysOld);
  const trialExpired = daysOld >= TRIAL_DAYS && plan !== "vitrine";

  return { plan, loading, hasProfile, actif, daysLeft, trialExpired };
}
