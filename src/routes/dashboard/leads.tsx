import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, TrendingUp, Euro, Target, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/leads")({
  head: () => ({ meta: [{ title: "Pipeline & Leads — Dashboard" }] }),
  component: LeadsPage,
});

type Lead = { id: string; name: string; company: string; value: number; status: "new" | "contacted" | "qualified" | "won" | "lost"; created_at: string };
type Status = Lead["status"];

const COLS: { id: Status; label: string; color: string }[] = [
  { id: "new",       label: "Nouveau",  color: "text-blue-400 border-blue-500/30" },
  { id: "contacted", label: "Contacté", color: "text-amber-400 border-amber-500/30" },
  { id: "qualified", label: "Qualifié", color: "text-violet-400 border-violet-500/30" },
  { id: "won",       label: "Client",   color: "text-emerald-400 border-emerald-500/30" },
];

const EMPTY = { name: "", company: "", email: "", phone: "", value: "0", status: "new" as Status };

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const profileId = getProfileMeta()?.id;

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await supabase.from("nfc_leads").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setLeads(data as Lead[]);
      setLoading(false);
    });
  }, []);

  const moveTo = async (id: string, status: Status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await supabase.from("nfc_leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  };

  const handleAdd = async () => {
    if (!form.name.trim()) { toast.error("Le nom est obligatoire"); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    const { data, error } = await supabase.from("nfc_leads").insert({
      name: form.name, company: form.company, email: form.email, phone: form.phone,
      value: parseFloat(form.value) || 0, status: form.status,
      user_id: user.id, profile_id: profileId ?? null,
    }).select().single();
    if (error) { toast.error("Erreur lors de l'ajout"); setSaving(false); return; }
    setLeads(prev => [data as Lead, ...prev]);
    setForm(EMPTY); setAddOpen(false);
    toast.success("Lead ajouté");
    setSaving(false);
  };

  const total = leads.reduce((s, l) => s + (l.value || 0), 0);
  const won = leads.filter(l => l.status === "won").reduce((s, l) => s + (l.value || 0), 0);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Pipeline total", v: `${(total / 1000).toFixed(1)}k €`, icon: TrendingUp },
          { l: "Gagné", v: `${(won / 1000).toFixed(1)}k €`, icon: Euro },
          { l: "Leads actifs", v: leads.filter(l => l.status !== "won" && l.status !== "lost").length, icon: Target },
          { l: "Taux conv.", v: leads.length > 0 ? `${Math.round((leads.filter(l => l.status === "won").length / leads.length) * 100)}%` : "—", icon: TrendingUp },
        ].map(s => (
          <div key={s.l} className="rounded-2xl border border-border bg-card/40 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><s.icon className="h-5 w-5" /></div>
            <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div><div className="font-display text-xl">{s.v}</div></div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Pipeline commercial</h2>
        <Button onClick={() => setAddOpen(true)}><Plus className="h-4 w-4 mr-2" /> Nouveau lead</Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground p-8 text-center">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLS.map(col => {
            const items = leads.filter(l => l.status === col.id);
            const colTotal = items.reduce((s, l) => s + (l.value || 0), 0);
            return (
              <div key={col.id}
                onDragOver={e => e.preventDefault()}
                onDrop={() => { if (dragId) { moveTo(dragId, col.id); setDragId(null); } }}
                className={`rounded-2xl border ${col.color} bg-card/30 p-3 min-h-[300px]`}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className={`text-xs uppercase tracking-wider font-medium ${col.color.split(" ")[0]}`}>{col.label} · {items.length}</div>
                  <div className="text-[10px] text-muted-foreground">{colTotal > 0 ? `${(colTotal / 1000).toFixed(1)}k €` : "—"}</div>
                </div>
                <div className="space-y-2">
                  {items.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl">Glissez ici</div>
                  ) : items.map(l => (
                    <div key={l.id} draggable onDragStart={() => setDragId(l.id)}
                      className="rounded-xl border border-border bg-background p-3 cursor-grab active:cursor-grabbing hover:border-primary/40 transition">
                      <div className="text-sm font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.company || "—"}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-semibold text-primary">{l.value ? `${l.value.toLocaleString("fr-FR")} €` : "—"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {leads.length === 0 && !loading && (
        <div className="text-center py-8">
          <Briefcase className="h-10 w-10 mx-auto opacity-20 mb-3" />
          <p className="text-sm text-muted-foreground">Aucun lead pour l'instant. Ajoutez votre premier contact commercial.</p>
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau lead</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {[
              { k: "name" as const, l: "Nom *" }, { k: "company" as const, l: "Société" },
              { k: "email" as const, l: "Email" }, { k: "phone" as const, l: "Téléphone" },
              { k: "value" as const, l: "Valeur estimée (€)" },
            ].map(({ k, l }) => (
              <div key={k}>
                <Label className="text-xs">{l}</Label>
                <Input className="mt-1" value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} type={k === "value" ? "number" : "text"} />
              </div>
            ))}
            <div>
              <Label className="text-xs">Étape</Label>
              <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Status }))}>
                {COLS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Annuler</Button>
            <Button onClick={handleAdd} disabled={saving}>{saving ? "Enregistrement…" : "Ajouter"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeadsPage;
