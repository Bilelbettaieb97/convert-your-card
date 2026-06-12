import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Wifi, Check, CreditCard, ArrowRight, Loader2, Smartphone, QrCode, Zap } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { createNfcCheckoutSession } from "@/fns/checkout-nfc";

export const Route = createFileRoute("/dashboard/commander")({
  head: () => ({
    meta: [{ title: "Commander ma carte — Dashboard" }],
  }),
  component: CommanderMaCartePage,
});

type ColorKey = "noir" | "blanc";
type Finish = "mat" | "brillant";

const COLORS: { key: ColorKey; name: string; bg: string; fg: string; ring: string }[] = [
  { key: "noir",  name: "Noir mat",  bg: "#0a0a0a", fg: "#ffffff", ring: "#0a0a0a" },
  { key: "blanc", name: "Blanc pur", bg: "#f5f5f5", fg: "#0a0a0a", ring: "#d4d4d4" },
];

const FINISHES: { key: Finish; label: string; desc: string }[] = [
  { key: "mat",      label: "Mat",      desc: "Toucher doux, anti-trace" },
  { key: "brillant", label: "Brillant", desc: "Couleurs intenses, effet laqué" },
];

function CommanderMaCartePage() {
  const { user } = useAuthStore();
  const [color, setColor] = useState<ColorKey>("noir");
  const [finish, setFinish] = useState<Finish>("mat");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [ordering, setOrdering] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const selectedColor = COLORS.find((c) => c.key === color)!;

  useEffect(() => {
    if (!user) return;
    supabase
      .from("nfc_profiles")
      .select("name, title")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setName(data.name ?? "");
          setRole(data.title ?? "");
        }
        setProfileLoaded(true);
      });
  }, [user]);

  async function handleOrder() {
    if (!user) return;
    setOrdering(true);
    try {
      const { url } = await createNfcCheckoutSession({
        data: {
          finish,
          color: selectedColor.name,
          name: name || "Non renseigné",
          role: role || "Non renseigné",
          email: user.email!,
          userId: user.id,
        },
      });
      if (url) window.location.href = url;
    } catch {
      setOrdering(false);
    }
  }

  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Commander ma carte physique</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Une carte physique connectée à ta carte digitale. Ton contact approche son téléphone
          et atterrit directement sur ton profil CVD — sans application, sans friction.
        </p>
      </div>

      {/* 3 points forts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Wifi,       title: "Contact instantané + QR code",  desc: "Compatible avec tous les smartphones modernes" },
          { icon: Smartphone, title: "Sans application",             desc: "S'ouvre directement dans le navigateur" },
          { icon: Zap,        title: "Lié à ta carte CVD en direct", desc: "Toujours à jour, même après modification" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card px-4 py-4 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">

        {/* Preview carte */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Aperçu</p>
          <div
            className="relative w-full max-w-[340px] aspect-[1.586/1] rounded-2xl p-5 shadow-2xl transition-all duration-300"
            style={{
              background: finish === "brillant"
                ? `linear-gradient(135deg, ${selectedColor.bg}, color-mix(in srgb, ${selectedColor.bg} 85%, #ffffff 15%))`
                : selectedColor.bg,
              color: selectedColor.fg,
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.3)",
            }}
          >
            <Wifi className="absolute top-4 right-4 h-4 w-4 rotate-90 opacity-60" />
            <QrCode className="absolute top-4 left-4 h-5 w-5 opacity-40" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-lg font-bold tracking-tight truncate">{name || "Ton Prénom"}</div>
              <div className="text-xs opacity-70 truncate mt-0.5">{role || "Ton métier"}</div>
              <div className="mt-3 text-[9px] uppercase tracking-widest opacity-40">CVD · Tap to connect</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Sans contact</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> QR code</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Garantie 2 ans</span>
          </div>
        </div>

        {/* Configurateur */}
        <div className="space-y-6">

          {/* Couleur */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">1. Couleur</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setColor(c.key)}
                  aria-label={c.name}
                  className={[
                    "relative h-11 w-11 rounded-full transition-all border-2",
                    color === c.key ? "scale-110 border-primary shadow-md" : "border-transparent hover:scale-105",
                  ].join(" ")}
                  style={{ background: c.bg }}
                >
                  {color === c.key && (
                    <Check className="h-4 w-4 absolute inset-0 m-auto" style={{ color: c.fg }} />
                  )}
                </button>
              ))}
              <span className="self-center text-xs text-muted-foreground ml-1">{selectedColor.name}</span>
            </div>
          </div>

          {/* Finition */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">2. Finition</p>
            <div className="grid grid-cols-2 gap-2">
              {FINISHES.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFinish(f.key)}
                  className={[
                    "rounded-xl border p-3 text-left transition-all",
                    finish === f.key
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/40",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold text-foreground">{f.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Identité */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">3. Ton identité sur la carte</p>
            <div className="space-y-3">
              <label className="block">
                <span className="text-xs text-muted-foreground mb-1 block">Nom affiché</span>
                <input
                  type="text"
                  value={name}
                  maxLength={28}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={profileLoaded ? "Ton prénom et nom" : "Chargement…"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground mb-1 block">Poste / métier</span>
                <input
                  type="text"
                  value={role}
                  maxLength={40}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Plombier, Coach, Architecte…"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </label>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] p-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-white/80">Carte connectée personnalisée</p>
              <p className="text-3xl font-bold text-white">29€</p>
            </div>
            <p className="text-xs text-white/70">Paiement unique · Livraison offerte (5–10 jours) · France & Europe</p>
            <button
              type="button"
              onClick={handleOrder}
              disabled={ordering}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-[#c026d3] py-3 text-sm font-bold hover:bg-white/90 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {ordering ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Redirection…</>
              ) : (
                <><CreditCard className="h-4 w-4" /> Acheter maintenant — 29€ <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
