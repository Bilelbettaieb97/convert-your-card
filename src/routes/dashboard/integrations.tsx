import { createFileRoute } from "@tanstack/react-router";
import { Plug, Zap, RefreshCw, Globe2, Bell, Code2, CalendarCheck, Mail, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/dashboard/integrations")({
  head: () => ({ meta: [{ title: "Intégrations — Dashboard" }] }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.1))" }}>
          <Plug className="w-8 h-8 text-purple-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.2)", color: "#c084fc" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Intégrations</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Chaque scan, clic ou contact sauvegardé peut déclencher automatiquement une action dans vos outils. Branchez votre CRM, votre emailing, Zapier ou votre propre backend — zéro saisie manuelle, tout est automatisé.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <RefreshCw className="w-4 h-4 text-orange-400" />, label: "HubSpot & Salesforce", detail: "Création de lead auto à chaque scan de votre carte" },
            { icon: <Zap className="w-4 h-4 text-amber-400" />,        label: "Zapier & Make", detail: "Connectez 5 000+ apps sans écrire une ligne de code" },
            { icon: <Mail className="w-4 h-4 text-sky-400" />,         label: "Mailchimp & Brevo", detail: "Abonnement liste email automatique à chaque nouveau contact" },
            { icon: <Globe2 className="w-4 h-4 text-emerald-400" />,   label: "Google Contacts", detail: "Sauvegarde directe dans votre carnet d'adresses Google" },
            { icon: <Bell className="w-4 h-4 text-violet-400" />,      label: "Slack & Teams", detail: "Notification dans votre canal à chaque interaction" },
            { icon: <CalendarCheck className="w-4 h-4 text-rose-400" />, label: "Calendly & Cal.com", detail: "Bouton de prise de RDV intégré directement sur votre carte" },
            { icon: <Code2 className="w-4 h-4 text-teal-400" />,       label: "Webhooks sur-mesure", detail: "Envoyez chaque événement vers votre propre backend" },
            { icon: <BarChart3 className="w-4 h-4 text-indigo-400" />, label: "Google Analytics & GTM", detail: "Trackez les conversions de votre carte dans vos dashboards" },
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
          style={{ background: "linear-gradient(135deg,#a855f7,#3b82f6)" }}
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

export default IntegrationsPage;
