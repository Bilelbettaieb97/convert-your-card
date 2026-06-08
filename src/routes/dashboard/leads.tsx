import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Kanban, Euro, Bell, BarChart3, Users, CalendarCheck, Repeat2, Tag } from "lucide-react";

export const Route = createFileRoute("/dashboard/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(14,165,233,0.1))" }}>
          <TrendingUp className="w-8 h-8 text-emerald-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Pipeline commercial</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Chaque scan est un prospect potentiel. Visualisez vos opportunités en kanban, suivez chaque contact de la première interaction jusqu'à la signature — et transformez votre carte digitale en véritable machine à convertir.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Kanban className="w-4 h-4 text-sky-400" />,      label: "Vue kanban par étape", detail: "Glissez vos prospects de « Nouveau » à « Signé »" },
            { icon: <Euro className="w-4 h-4 text-emerald-400" />,    label: "Valeur estimée du pipeline", detail: "Montant total des opportunités en cours" },
            { icon: <Users className="w-4 h-4 text-violet-400" />,    label: "Fiche contact enrichie", detail: "Historique complet des interactions par prospect" },
            { icon: <Repeat2 className="w-4 h-4 text-amber-400" />,   label: "Relances automatiques", detail: "Rappels à J+3, J+7 si pas de réponse" },
            { icon: <BarChart3 className="w-4 h-4 text-rose-400" />,  label: "Taux de conversion", detail: "Scans → deals gagnés, par source et période" },
            { icon: <Bell className="w-4 h-4 text-orange-400" />,     label: "Alertes prospects chauds", detail: "Notification quand un contact re-visite votre carte" },
            { icon: <Tag className="w-4 h-4 text-indigo-400" />,      label: "Tags & priorités", detail: "Classez vos leads par secteur, urgence, potentiel" },
            { icon: <TrendingUp className="w-4 h-4 text-teal-400" />, label: "Suivi du CA généré", detail: "Mesurez le retour réel de votre carte digitale" },
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
          style={{ background: "linear-gradient(135deg,#10b981,#0ea5e9)" }}
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
