import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta, setProfileMeta } from "./profile-store";

export const TRIAL_DAYS = 3;

export function usePlan() {
  const cached = getProfileMeta();
  const [plan, setPlan] = useState<string>(cached?.plan ?? "free");
  const [slug, setSlug] = useState<string>(cached?.slug ?? "");
  const [profileId, setProfileId] = useState<string>(cached?.id ?? "");
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [actif, setActif] = useState<boolean>(cached?.actif ?? true);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [trialEnd, setTrialEnd] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); setHasProfile(false); return; }

      const [{ data }, { data: sub }] = await Promise.all([
        supabase
          .from("nfc_profiles")
          .select("id, slug, plan, actif, created_at")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (data) {
        setHasProfile(true);
        const realPlan = data.plan ?? "free";
        setPlan(realPlan);
        setSlug(data.slug);
        setProfileId(data.id);
        setActif(data.actif ?? true);
        setCreatedAt((data as any).created_at ?? null);
        setProfileMeta({ id: data.id, slug: data.slug, plan: realPlan, actif: data.actif ?? true });
      } else {
        setHasProfile(false);
      }

      if (sub) {
        setSubStatus(sub.status ?? null);
        setTrialEnd((sub as any).current_period_end ?? null);
      }

      setLoading(false);
    });
  }, []);

  const daysOld = createdAt
    ? Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000)
    : 0;
  const daysLeft = Math.max(0, TRIAL_DAYS - daysOld);
  const trialExpired = daysOld >= TRIAL_DAYS && plan !== "vitrine";

  // isInTrial : "trialing" OU "active" avec current_period_end proche de created_at
  // (Stripe peut envoyer status="active" même pendant le trial quand payment_method_collection="if_required")
  const trialEndDate = trialEnd ? new Date(trialEnd) : null;
  const accountCreated = createdAt ? new Date(createdAt) : null;
  const isInTrialPeriod = !!(
    trialEndDate &&
    accountCreated &&
    trialEndDate > new Date() &&
    (trialEndDate.getTime() - accountCreated.getTime()) <= (TRIAL_DAYS + 1) * 86_400_000
  );
  const isInTrial = subStatus === "trialing" || isInTrialPeriod;

  const trialDaysLeft = isInTrial
    ? trialEnd
      ? Math.max(0, Math.ceil((new Date(trialEnd).getTime() - Date.now()) / 86_400_000))
      : daysLeft
    : 0;

  return { plan, loading, hasProfile, actif, daysLeft, trialExpired, slug, profileId, isInTrial, trialDaysLeft };
}
