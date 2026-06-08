import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, MapPin, Clock, BarChart3, GitCompare, Download, Flame, Globe2, CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Statistiques avancées — Dashboard" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.1))" }}>
          <BarChart3 className="w-8 h-8 text-indigo-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#818cf8" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Statistiques avancées</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Allez bien au-delà des simples compteurs. Comprenez <em className="not-italic font-medium text-foreground">quand</em>, <em className="not-italic font-medium text-foreground">où</em> et <em className="not-italic font-medium text-foreground">comment</em> vos contacts interagissent avec votre carte — pour partager au bon endroit, au bon moment, et convertir davantage.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Flame className="w-4 h-4 text-orange-400" />,  label: "Heatmap horaire", detail: "Pic d'activité par heure de la journée" },
            { icon: <Globe2 className="w-4 h-4 text-sky-400" />,    label: "Carte géographique", detail: "Villes et pays de vos scans" },
            { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, label: "Sources de trafic", detail: "NFC, QR code, lien direct, réseaux" },
            { icon: <Clock className="w-4 h-4 text-violet-400" />,  label: "Durée de consultation", detail: "Temps passé sur votre carte" },
            { icon: <GitCompare className="w-4 h-4 text-amber-400" />, label: "Comparaison de périodes", detail: "Semaine vs semaine, mois vs mois" },
            { icon: <MapPin className="w-4 h-4 text-rose-400" />,   label: "Localisation des scans", detail: "Événements, salons, lieux physiques" },
            { icon: <BarChart3 className="w-4 h-4 text-indigo-400" />, label: "Engagement par section", detail: "Quelle partie de votre carte performe" },
            { icon: <Download className="w-4 h-4 text-teal-400" />, label: "Export des données", detail: "CSV complet sur la période choisie" },
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
          style={{ background: "linear-gradient(135deg,#6366f1,#EC4899)" }}
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

export default AnalyticsPage;
