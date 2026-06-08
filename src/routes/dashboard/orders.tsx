import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle2, FileText, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard/orders")({
  head: () => ({ meta: [{ title: "Commandes — Dashboard" }] }),
  component: OrdersPage,
});

type Order = {
  id: string; created_at: string; model: string; qty: number; total: number;
  status: "preparing" | "shipped" | "delivered" | "pending";
  tracking?: string; invoice_url?: string;
};

const STATUS: Record<Order["status"], { l: string; color: string; icon: typeof Package }> = {
  pending:    { l: "En attente",       color: "border-border text-muted-foreground",            icon: Package },
  preparing:  { l: "En préparation",   color: "border-amber-500/40 bg-amber-500/10 text-amber-400",    icon: Package },
  shipped:    { l: "Expédié",          color: "border-blue-500/40 bg-blue-500/10 text-blue-400",       icon: Truck },
  delivered:  { l: "Livré",            color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400", icon: CheckCircle2 },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await supabase.from("nfc_orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setOrders(data as Order[]);
      setLoading(false);
    });
  }, []);

  const total = orders.reduce((s, o) => s + (o.total || 0), 0);
  const qty = orders.reduce((s, o) => s + (o.qty || 0), 0);

  if (loading) return <div className="p-8 text-sm text-muted-foreground text-center">Chargement…</div>;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Commandes totales", v: orders.length },
          { l: "Cartes commandées",  v: qty },
          { l: "Total dépensé",      v: `${total} €` },
        ].map(s => (
          <div key={s.l} className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="font-display text-2xl mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-display">Historique des commandes</h3>
        </div>

        {orders.length === 0 ? (
          <div className="p-16 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto opacity-20 mb-4" />
            <p className="text-sm text-muted-foreground font-medium">Aucune commande pour l'instant</p>
            <p className="text-xs text-muted-foreground mt-1 opacity-70 max-w-xs mx-auto">
              Commandez votre carte NFC physique pour la partager en un tap. Disponible dès 29 €.
            </p>
            <Button className="mt-5">Commander ma carte</Button>
          </div>
        ) : orders.map(o => {
          const st = STATUS[o.status] ?? STATUS.pending;
          return (
            <div key={o.id} className="px-5 py-4 border-b border-border/50 last:border-b-0">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm font-medium font-mono">{o.id}</div>
                  <div className="text-xs text-muted-foreground">{fmt(o.created_at)} · {o.qty} × {o.model || "Carte NFC"}</div>
                </div>
                <div className="font-display text-lg">{o.total} €</div>
                <Badge variant="outline" className={`${st.color} text-[10px] gap-1`}>
                  <st.icon className="h-3 w-3" /> {st.l}
                </Badge>
                <div className="flex gap-2">
                  {o.tracking && (
                    <Button variant="outline" size="sm"><Truck className="h-3.5 w-3.5 mr-1.5" /> Suivre</Button>
                  )}
                  {o.invoice_url ? (
                    <a href={o.invoice_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm"><FileText className="h-3.5 w-3.5 mr-1.5" /> Facture</Button>
                    </a>
                  ) : (
                    <Button variant="ghost" size="sm" disabled><FileText className="h-3.5 w-3.5 mr-1.5" /> Facture</Button>
                  )}
                </div>
              </div>
              {o.status === "shipped" && o.tracking && (
                <div className="mt-3 text-xs text-muted-foreground">Colissimo · n° {o.tracking}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersPage;
