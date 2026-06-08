import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, Download, CreditCard, Crown } from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Facturation — Dashboard" }] }),
  component: BillingPage,
});

const PLANS = [
  { name: "Essentielle", price: "9,80 €/mois", current: true, feats: ["1 carte digitale", "Identité, contact, vCard", "Boutons d'action, Bio & badges", "Liens illimités"] },
  { name: "Vitrine", price: "15,80 €/mois", current: false, feats: ["Tout Essentielle", "Services & témoignages", "Portfolio & vidéo", "Stats avancées, CRM, Intégrations"] },
];

const INVOICES = [
  { id: "FAC-2026-006", date: "1 juin 2026", amount: "9,80 €", status: "Payée" },
  { id: "FAC-2026-005", date: "1 mai 2026", amount: "9,80 €", status: "Payée" },
  { id: "FAC-2026-004", date: "1 avril 2026", amount: "9,80 €", status: "Payée" },
];

function BillingPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {PLANS.map(p => (
          <div key={p.name} className={`rounded-2xl border p-5 ${p.current ? "border-primary bg-primary/5" : "border-border bg-card/40"}`}>
            <div className="flex items-center gap-2 mb-1">
              {p.name === "Vitrine" && <Crown className="h-4 w-4 text-amber-400" />}
              <h3 className="font-display text-lg">{p.name}</h3>
              {p.current && <span className="ml-auto text-[10px] uppercase tracking-wider text-primary">Actif</span>}
            </div>
            <div className="font-display text-2xl mb-4">{p.price}</div>
            <ul className="space-y-1.5 mb-5">
              {p.feats.map(f => <li key={f} className="text-xs flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> {f}</li>)}
            </ul>
            {p.current ? (
              <Button variant="outline" size="sm" className="w-full" disabled>Plan actuel</Button>
            ) : (
              <Link to="/pricing">
                <Button size="sm" className="w-full">Passer à {p.name}</Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h3 className="font-display text-lg mb-4">Méthode de paiement</h3>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
            <div className="h-10 w-14 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 grid place-items-center text-white text-xs font-bold">VISA</div>
            <div className="flex-1">
              <div className="text-sm">•••• •••• •••• 4242</div>
              <div className="text-xs text-muted-foreground">Expire 09/2028</div>
            </div>
            <Button variant="ghost" size="sm">Modifier</Button>
          </div>
          <Button variant="outline" size="sm" className="mt-3"><CreditCard className="h-3.5 w-3.5 mr-2" /> Ajouter une carte</Button>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <h3 className="font-display text-lg mb-4">Adresse de facturation</h3>
          <div className="text-sm space-y-0.5 text-muted-foreground">
            <div className="text-foreground">Votre entreprise</div>
            <div>Votre adresse</div>
            <div>Code postal, Ville, France</div>
          </div>
          <Button variant="outline" size="sm" className="mt-3">Modifier</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
        <div className="px-5 py-3 border-b border-border"><h3 className="font-display">Factures</h3></div>
        {INVOICES.map(i => (
          <div key={i.id} className="flex items-center gap-4 px-5 py-3 border-b border-border/50 last:border-b-0">
            <div className="flex-1">
              <div className="text-sm font-medium">{i.id}</div>
              <div className="text-xs text-muted-foreground">{i.date}</div>
            </div>
            <div className="font-display">{i.amount}</div>
            <span className="text-xs text-emerald-400">{i.status}</span>
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingPage;
