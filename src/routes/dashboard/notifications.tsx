import { createFileRoute } from "@tanstack/react-router";
import { Bell, Zap, Mail, MessageCircle, SlidersHorizontal, Clock, CalendarCheck, Repeat2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1))" }}>
          <Bell className="w-8 h-8 text-amber-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Centre de notifications</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Soyez averti à chaque interaction sur votre carte — scan, clic, contact sauvegardé. Configurez précisément ce que vous recevez, par quel canal, et quand. Ne manquez plus jamais un prospect chaud.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Zap className="w-4 h-4 text-amber-400" />,           label: "Alertes en temps réel", detail: "Notification dès qu'un scan arrive" },
            { icon: <Mail className="w-4 h-4 text-sky-400" />,            label: "Email instantané", detail: "Récap scan + infos du contact" },
            { icon: <MessageCircle className="w-4 h-4 text-emerald-400" />, label: "WhatsApp / SMS", detail: "Alerte sur votre téléphone pro" },
            { icon: <SlidersHorizontal className="w-4 h-4 text-violet-400" />, label: "Préférences fines", detail: "Activez / désactivez par type d'événement" },
            { icon: <Repeat2 className="w-4 h-4 text-rose-400" />,        label: "Résumé hebdomadaire", detail: "Bilan automatique chaque lundi matin" },
            { icon: <Clock className="w-4 h-4 text-teal-400" />,          label: "Historique 90 jours", detail: "Retrouvez toutes vos interactions passées" },
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
          style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}
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

export default NotificationsPage;
