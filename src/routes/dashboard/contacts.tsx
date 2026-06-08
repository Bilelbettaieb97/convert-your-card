import { createFileRoute } from "@tanstack/react-router";
import { Users, Bell, Mail, Phone, MapPin, Star, Tag, Download, CalendarCheck, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/contacts")({
  component: ContactsPage,
});

function ContactsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))" }}>
          <Users className="w-8 h-8 text-violet-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">CRM Contacts</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Toutes les personnes qui ont scanné votre carte, cliqué sur vos boutons ou sauvegardé votre contact — réunies dans un CRM simple et puissant. Filtrez, relancez, exportez. Votre réseau devient un actif.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Phone className="w-4 h-4 text-emerald-400" />,      label: "Historique des interactions", detail: "Chaque clic, scan et appel tracé par contact" },
            { icon: <Mail className="w-4 h-4 text-sky-400" />,           label: "Export CSV / email", detail: "Envoyez votre liste dans votre outil préféré" },
            { icon: <Star className="w-4 h-4 text-amber-400" />,         label: "Leads étoilés", detail: "Marquez vos contacts prioritaires pour les retrouver vite" },
            { icon: <Tag className="w-4 h-4 text-violet-400" />,         label: "Tags & filtres avancés", detail: "Segmentez par secteur, source, date de scan" },
            { icon: <MapPin className="w-4 h-4 text-rose-400" />,        label: "Localisation des scans", detail: "Ville et pays d'où chaque contact vous a découvert" },
            { icon: <MessageCircle className="w-4 h-4 text-teal-400" />, label: "Relance en 1 clic", detail: "Envoyez un WhatsApp ou email directement depuis la fiche" },
            { icon: <Download className="w-4 h-4 text-indigo-400" />,    label: "Import vCard automatique", detail: "Contacts enrichis depuis les téléchargements de votre carte" },
            { icon: <Bell className="w-4 h-4 text-orange-400" />,        label: "Alertes en temps réel", detail: "Notification dès qu'un contact interagit de nouveau" },
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
          style={{ background: "linear-gradient(135deg,#7c3aed,#EC4899)" }}
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
