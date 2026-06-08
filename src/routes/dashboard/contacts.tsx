import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Download, Plus, Mail, Phone, MapPin, Tag, Star, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getProfileMeta } from "@/lib/profile-store";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/contacts")({
  head: () => ({ meta: [{ title: "Contacts — Dashboard" }] }),
  component: ContactsPage,
});

type Contact = { id: string; name: string; role: string; company: string; email: string; phone: string; city: string; tags: string[]; starred: boolean; created_at: string };

const EMPTY: Omit<Contact, "id" | "created_at"> = { name: "", role: "", company: "", email: "", phone: "", city: "", tags: [], starred: false };

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "hier" : `il y a ${days}j`;
}

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const profileId = getProfileMeta()?.id;

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await supabase.from("nfc_contacts").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setContacts(data as Contact[]);
      setLoading(false);
    });
  }, []);

  const allTags = useMemo(() => Array.from(new Set(contacts.flatMap(c => c.tags ?? []))), [contacts]);
  const filtered = useMemo(() => contacts.filter(c =>
    (!tag || (c.tags ?? []).includes(tag)) &&
    (q === "" || `${c.name} ${c.company} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase()))
  ), [contacts, q, tag]);

  const toggleStar = async (id: string, starred: boolean) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, starred: !starred } : c));
    await supabase.from("nfc_contacts").update({ starred: !starred }).eq("id", id);
  };

  const handleAdd = async () => {
    if (!form.name.trim()) { toast.error("Le nom est obligatoire"); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    const { data, error } = await supabase.from("nfc_contacts").insert({
      ...form,
      user_id: user.id,
      profile_id: profileId ?? null,
      source: "manual",
    }).select().single();
    if (error) { toast.error("Erreur lors de l'ajout"); setSaving(false); return; }
    setContacts(prev => [data as Contact, ...prev]);
    setForm(EMPTY);
    setAddOpen(false);
    toast.success("Contact ajouté");
    setSaving(false);
  };

  const exportCSV = () => {
    const rows = [["Nom", "Rôle", "Société", "Email", "Téléphone", "Ville", "Tags"], ...contacts.map(c => [c.name, c.role, c.company, c.email, c.phone, c.city, (c.tags ?? []).join("|")])];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`; a.download = "contacts.csv"; a.click();
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Contacts totaux", v: contacts.length },
          { l: "Leads (tag lead)", v: contacts.filter(c => (c.tags ?? []).includes("lead")).length },
          { l: "VIP (étoilés)", v: contacts.filter(c => c.starred).length },
          { l: "Ajoutés manuellement", v: contacts.length },
        ].map(s => (
          <div key={s.l} className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="font-display text-2xl mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher par nom, société, ville..." className="pl-10 h-11" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11" onClick={exportCSV} disabled={contacts.length === 0}><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
          <Button className="h-11" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
        </div>
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setTag(null)} className={`text-xs px-3 py-1.5 rounded-full border transition ${!tag ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}>Tous</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setTag(t === tag ? null : t)} className={`text-xs px-3 py-1.5 rounded-full border transition ${tag === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}>
              <Tag className="h-3 w-3 mr-1.5 inline" />{t}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-10 w-10 mx-auto opacity-20 mb-3" />
            <p className="text-sm text-muted-foreground">{contacts.length === 0 ? "Aucun contact pour l'instant." : "Aucun résultat."}</p>
            {contacts.length === 0 && <p className="text-xs text-muted-foreground mt-1 opacity-70">Ajoutez un contact manuellement ou partagez votre carte pour en recevoir.</p>}
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 text-[10px] uppercase tracking-wider text-muted-foreground px-5 py-3 border-b border-border">
              <div className="col-span-4">Contact</div><div className="col-span-3">Société</div><div className="col-span-3">Coordonnées</div><div className="col-span-2 text-right">Ajouté</div>
            </div>
            {filtered.map(c => (
              <div key={c.id} className="grid grid-cols-12 items-center px-5 py-4 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition">
                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 grid place-items-center text-sm font-semibold shrink-0">{c.name.charAt(0).toUpperCase()}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm flex items-center gap-1.5">
                      {c.name}
                      <button onClick={() => toggleStar(c.id, c.starred)}><Star className={`h-3 w-3 ${c.starred ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} /></button>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3 text-sm">
                  <div>{c.company || "—"}</div>
                  {c.city && <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{c.city}</div>}
                </div>
                <div className="col-span-6 md:col-span-3 text-xs space-y-0.5">
                  {c.email && <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" />{c.email}</div>}
                  {c.phone && <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3" />{c.phone}</div>}
                </div>
                <div className="col-span-12 md:col-span-2 flex md:justify-end gap-2 mt-2 md:mt-0">
                  <span className="text-[11px] text-muted-foreground">{timeAgo(c.created_at)}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Tags footer */}
      {filtered.length > 0 && allTags.slice(0, 5).map(t => <Badge key={t} variant="secondary">{t}</Badge>)}

      {/* Add dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau contact</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {(["name", "role", "company", "email", "phone", "city"] as const).map(k => (
              <div key={k}>
                <Label className="text-xs capitalize">{k === "name" ? "Nom *" : k === "role" ? "Rôle" : k === "company" ? "Société" : k === "email" ? "Email" : k === "phone" ? "Téléphone" : "Ville"}</Label>
                <Input className="mt-1" value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
              </div>
            ))}
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

export default ContactsPage;
