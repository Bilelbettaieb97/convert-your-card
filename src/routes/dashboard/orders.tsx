import { createFileRoute } from "@tanstack/react-router";
import { Package, Truck, Zap, CreditCard, QrCode, RefreshCw, CalendarCheck, ShieldCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard/orders")({
  head: () => ({ meta: [{ title: "Commandes — Dashboard" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  return <ComingSoon />;
}

function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1))" }}>
          <Package className="w-8 h-8 text-amber-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          En développement
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Commandes</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Ta carte digitale, maintenant aussi en physique. Commande ta carte connectée préprogrammée — un tap suffit pour partager ton profil. Suivi de livraison, historique et renouvellement gérés ici.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          {[
            { icon: <Zap className="w-4 h-4 text-amber-400" />,       label: "Tap & partage instantané", detail: "Un simple contact ouvre ta carte sur n'importe quel smartphone" },
            { icon: <QrCode className="w-4 h-4 text-violet-400" />,   label: "QR code gravé au dos", detail: "Compatible iPhone et tous les smartphones modernes" },
            { icon: <RefreshCw className="w-4 h-4 text-sky-400" />,   label: "Carte toujours à jour", detail: "Modifie ton profil sans racheter de carte" },
            { icon: <Truck className="w-4 h-4 text-emerald-400" />,   label: "Suivi de livraison", detail: "Colissimo avec numéro de suivi en temps réel" },
            { icon: <CreditCard className="w-4 h-4 text-rose-400" />, label: "Plusieurs modèles", detail: "Noire mat, transparente, bambou — choisis ton style" },
            { icon: <MapPin className="w-4 h-4 text-teal-400" />,     label: "Livraison partout en France", detail: "Expédition sous 5 jours ouvrés, offerte dès 2 cartes" },
            { icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />, label: "Facturation intégrée", detail: "Facture téléchargeable directement depuis le dashboard" },
            { icon: <Package className="w-4 h-4 text-orange-400" />,  label: "Commandes équipe", detail: "Commande en lot pour toute ton équipe à prix réduit" },
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

export default OrdersPage;
