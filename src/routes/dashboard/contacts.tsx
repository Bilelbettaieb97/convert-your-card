import { createFileRoute } from "@tanstack/react-router";
import { Users, Bell, Mail, Phone, MapPin, Star, Tag } from "lucide-react";

export const Route = createFileRoute("/dashboard/contacts")({
  component: ContactsPage,
});

function ContactsPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1))" }}>
          <Users className="w-8 h-8 text-violet-400" />
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">CRM Contacts</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Retrouvez ici toutes les personnes qui ont scanné votre carte, sauvegardé votre contact ou interagi avec votre profil. Gérez, filtrez et relancez vos prospects directement depuis votre dashboard.
        </p>

        {/* Feature preview */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Phone className="w-4 h-4 text-emerald-400" />, label: "Appels & clics trackés" },
            { icon: <Mail className="w-4 h-4 text-sky-400" />, label: "Export CSV / email" },
            { icon: <Star className="w-4 h-4 text-amber-400" />, label: "Leads étoilés" },
            { icon: <Tag className="w-4 h-4 text-violet-400" />, label: "Tags & filtres" },
            { icon: <MapPin className="w-4 h-4 text-rose-400" />, label: "Localisation des scans" },
            { icon: <Bell className="w-4 h-4 text-orange-400" />, label: "Alertes en temps réel" },
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
