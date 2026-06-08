import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Kanban, Euro, Bell, BarChart3, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
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
          Visualisez vos opportunités en kanban, suivez chaque prospect de la première interaction jusqu'à la signature. Transformez vos scans en clients avec un pipeline pensé pour les indépendants.
        </p>

        {/* Feature preview */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Kanban className="w-4 h-4 text-sky-400" />, label: "Vue kanban par étape" },
            { icon: <Euro className="w-4 h-4 text-emerald-400" />, label: "Valeur estimée du pipeline" },
            { icon: <Users className="w-4 h-4 text-violet-400" />, label: "Assignation par contact" },
            { icon: <Bell className="w-4 h-4 text-amber-400" />, label: "Relances automatiques" },
            { icon: <BarChart3 className="w-4 h-4 text-rose-400" />, label: "Taux de conversion" },
            { icon: <TrendingUp className="w-4 h-4 text-orange-400" />, label: "Suivi du CA généré" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
              {f.icon}
              <span className="text-xs font-medium text-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Disponible très prochainement — restez connecté.
        </p>
      </div>
    </div>
  );
}
