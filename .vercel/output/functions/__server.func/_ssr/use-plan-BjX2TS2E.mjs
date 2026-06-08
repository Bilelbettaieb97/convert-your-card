import { r as reactExports } from "../_libs/react.mjs";
import { supabase } from "./client-CrY6GqN9.mjs";
import { g as getProfileMeta, s as setProfileMeta } from "./router-DVFDHH1d.mjs";
function usePlan() {
  const cached = getProfileMeta();
  const [plan, setPlan] = reactExports.useState(cached?.plan ?? "free");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("nfc_profiles").select("id, slug, plan, actif").eq("user_id", user.id).maybeSingle();
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
export {
  usePlan as u
};
