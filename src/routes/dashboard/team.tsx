import { createFileRoute } from "@tanstack/react-router";
import { Users, Crown, CreditCard, Building2, Shield, BarChart3, CalendarCheck, Repeat2, Globe2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/team")({
  head: () => ({ meta: [{ title: "Équipe — Dashboard" }] }),
  component: TeamPage,
});

function TeamPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.1))" }}>
          <Users className="w-8 h-8 text-sky-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.2)", color: "#38bdf8" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Gestion d'équipe</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Déployez la carte digitale à toute votre équipe en quelques clics. Un branding unifié, des cartes individuelles, une gestion centralisée. Idéal pour les commerciaux, les agences et les PME.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Crown className="w-4 h-4 text-amber-400" />,    label: "Rôles Admin / Membre", detail: "Contrôlez qui peut modifier quoi sur chaque carte" },
            { icon: <CreditCard className="w-4 h-4 text-sky-400" />, label: "Cartes multi-profils", detail: "Une carte différente par collaborateur, une seule facture" },
            { icon: <Building2 className="w-4 h-4 text-violet-400" />, label: "Branding unifié", detail: "Logo, couleurs et style partagés sur toute l'équipe" },
            { icon: <Repeat2 className="w-4 h-4 text-emerald-400" />, label: "Invitations par email", detail: "Onboardez un nouveau membre en 30 secondes" },
            { icon: <BarChart3 className="w-4 h-4 text-rose-400" />, label: "Stats consolidées", detail: "Vue globale des scans et clics de toute l'équipe" },
            { icon: <Shield className="w-4 h-4 text-orange-400" />,  label: "Permissions granulaires", detail: "Bloquez l'édition du contenu pour certains membres" },
            { icon: <Globe2 className="w-4 h-4 text-teal-400" />,    label: "Annuaire d'équipe", detail: "Page publique listant tous vos collaborateurs" },
            { icon: <Users className="w-4 h-4 text-indigo-400" />,   label: "Jusqu'à 50 membres", detail: "Plans Business et Enterprise adaptés à votre taille" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <p className="text-xs font-medium text-foreground">{f.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo CTA */}
        <a
          href="https://calendly.com/convertilab-5bsc/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-4 transition hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
        >
          <CalendarCheck className="w-4 h-4" />
          Réserver une démo
        </a>

        <p className="text-xs text-muted-foreground">
          Disponible très prochainement — restez connecté.
        </p>
      </div>
    </div>
  );
}

export default TeamPage;
