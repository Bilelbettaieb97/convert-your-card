import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Check, CreditCard, Sparkles, Upload, X, Wifi, ArrowRight } from "lucide-react";
import { Nav } from "@/routes/index";

export const Route = createFileRoute("/carte-physique")({
  head: () => ({
    meta: [
      { title: "Ajoute ta carte NFC physique — CVD" },
      {
        name: "description",
        content:
          "Personnalise ta carte de visite NFC physique : couleur, finition, logo et nom. Une commande unique, livrée chez toi.",
      },
      { property: "og:title", content: "Carte NFC physique personnalisée — CVD" },
      { property: "og:description", content: "Commandez votre carte NFC physique personnalisée à 29€. Plusieurs coloris et finitions. Livraison express. Compatible iPhone & Android sans application." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cartevisitedigitale.fr/carte-physique" },
      { property: "og:site_name", content: "CVD — Carte de visite digitale" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: "https://cartevisitedigitale.fr/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Carte NFC physique personnalisée à 29€ — CVD" },
      { name: "twitter:description", content: "Carte NFC personnalisable, livrée chez toi. Plusieurs coloris et finitions disponibles." },
    ],
    links: [{ rel: "canonical", href: "https://cartevisitedigitale.fr/carte-physique" }],
  }),
  component: CartePhysiqueUpsellPage,
});

type Finish = "mat" | "brillant" | "metal";
type ColorKey = "noir" | "blanc" | "magenta" | "or" | "bleu";

const COLORS: { key: ColorKey; name: string; bg: string; fg: string; ring: string }[] = [
  { key: "noir", name: "Noir mat", bg: "#0a0a0a", fg: "#ffffff", ring: "#0a0a0a" },
  { key: "blanc", name: "Blanc pur", bg: "#f5f5f5", fg: "#0a0a0a", ring: "#d4d4d4" },
];

const FINISHES: { key: Finish; label: string; desc: string }[] = [
  { key: "mat", label: "Mat", desc: "Toucher doux, anti-trace" },
  { key: "brillant", label: "Brillant", desc: "Couleurs intenses, effet laqué" },
  { key: "metal", label: "Métal", desc: "Acier brossé premium (+10€)" },
];

const PRICE_BASE = 29;
const PRICE_METAL_EXTRA = 10;

function CartePhysiqueUpsellPage() {
  const [color, setColor] = useState<ColorKey>("noir");
  const [finish, setFinish] = useState<Finish>("mat");
  const [name, setName] = useState("Ton Prénom");
  const [role, setRole] = useState("Ton métier");
  const [logo, setLogo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedColor = COLORS.find((c) => c.key === color)!;
  const total = useMemo(() => PRICE_BASE + (finish === "metal" ? PRICE_METAL_EXTRA : 0), [finish]);

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogo(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Dernière étape — offre exclusive
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl mx-auto">
            Ajoute ta carte NFC physique, entièrement personnalisée
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un simple tap et tu partages ton profil. Couleur, finition, logo, nom — tout est à toi.
            Paiement unique, livraison offerte en 5 jours.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.05fr_1fr] items-start">
          {/* LEFT — Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-card">
              <div className="flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
                <div
                  className="relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-6 sm:p-7 shadow-2xl transition-all duration-500"
                  style={{
                    background:
                      finish === "metal"
                        ? `linear-gradient(135deg, ${selectedColor.bg} 0%, color-mix(in srgb, ${selectedColor.bg} 70%, #ffffff 30%) 50%, ${selectedColor.bg} 100%)`
                        : finish === "brillant"
                        ? `linear-gradient(135deg, ${selectedColor.bg}, color-mix(in srgb, ${selectedColor.bg} 85%, #ffffff 15%))`
                        : selectedColor.bg,
                    color: selectedColor.fg,
                    boxShadow:
                      finish === "metal"
                        ? `0 25px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)`
                        : `0 25px 50px -12px rgba(0,0,0,0.35)`,
                  }}
                >
                  {/* Logo top-left */}
                  <div className="absolute top-5 left-6">
                    {logo ? (
                      <img
                        src={logo}
                        alt="Logo"
                        className="h-9 w-9 object-contain rounded"
                      />
                    ) : (
                      <div
                        className="h-9 w-9 rounded-md border border-dashed flex items-center justify-center text-[10px] opacity-60"
                        style={{ borderColor: selectedColor.fg }}
                      >
                        Logo
                      </div>
                    )}
                  </div>

                  {/* NFC icon top-right */}
                  <Wifi className="absolute top-5 right-6 h-5 w-5 rotate-90 opacity-70" />

                  {/* Bottom info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                      {name || "Ton Prénom"}
                    </div>
                    <div className="text-xs sm:text-sm opacity-80 truncate mt-0.5">
                      {role || "Ton métier"}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-60">
                      <span>CVD</span>
                      <span>·</span>
                      <span>Tap to connect</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Mini icon={<Check className="h-3.5 w-3.5" />} label="Puce NFC + QR" />
                <Mini icon={<Check className="h-3.5 w-3.5" />} label="Compatible iPhone & Android" />
                <Mini icon={<Check className="h-3.5 w-3.5" />} label="Garantie 2 ans" />
              </div>
            </div>
          </div>

          {/* RIGHT — Customization */}
          <div className="space-y-7">
            {/* Color */}
            <Section title="1. Choisis ta couleur">
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setColor(c.key)}
                    aria-label={c.name}
                    className={[
                      "group relative h-12 w-12 rounded-full transition-all",
                      color === c.key ? "ring-2 ring-offset-2 ring-offset-background scale-110" : "hover:scale-105",
                    ].join(" ")}
                    style={{
                      background: c.bg,
                      // @ts-expect-error css var
                      "--tw-ring-color": c.ring,
                    }}
                  >
                    {color === c.key && (
                      <Check className="h-5 w-5 absolute inset-0 m-auto" style={{ color: c.fg }} />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{selectedColor.name}</p>
            </Section>

            {/* Finish */}
            <Section title="2. Finition">
              <div className="grid grid-cols-3 gap-2">
                {FINISHES.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFinish(f.key)}
                    className={[
                      "rounded-xl border p-3 text-left transition-all",
                      finish === f.key
                        ? "border-magenta bg-magenta/5 shadow-card"
                        : "border-border hover:border-magenta/40",
                    ].join(" ")}
                  >
                    <div className="text-sm font-semibold">{f.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.desc}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Identity */}
            <Section title="3. Ton identité">
              <div className="space-y-3">
                <Input label="Nom affiché" value={name} onChange={setName} placeholder="Marie Dupont" max={28} />
                <Input label="Poste / métier" value={role} onChange={setRole} placeholder="Designer freelance" max={40} />
              </div>
            </Section>

            {/* Logo */}
            <Section title="4. Logo (optionnel)">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleLogo}
                className="hidden"
              />
              {logo ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
                  <img src={logo} alt="Logo" className="h-12 w-12 object-contain rounded" />
                  <div className="flex-1 text-sm text-foreground">Logo ajouté</div>
                  <button
                    type="button"
                    onClick={() => setLogo(null)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                    aria-label="Retirer le logo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border hover:border-magenta hover:bg-magenta/5 text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  <Upload className="h-4 w-4" />
                  Téléverser ton logo (PNG, JPG, SVG)
                </button>
              )}
            </Section>

            {/* Price + CTA */}
            <div className="rounded-2xl bg-gradient-cta text-primary-foreground p-6 shadow-glow">
              <div className="flex items-baseline justify-between mb-1">
                <div className="text-sm opacity-90">Carte NFC personnalisée</div>
                <div className="text-3xl font-bold tracking-tight">{total}€</div>
              </div>
              <div className="text-xs opacity-80 mb-5">
                Paiement unique · Livraison offerte · S'ajoute à ton abonnement
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-background text-magenta py-3.5 text-sm font-semibold hover:bg-background/90 transition-all shadow-card"
              >
                <CreditCard className="h-4 w-4" />
                Ajouter ma carte à la commande
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Non merci, continuer sans carte physique
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-12 max-w-md mx-auto">
          Tu pourras commander ta carte plus tard depuis ton tableau de bord. Cette offre de personnalisation
          est disponible uniquement à l'inscription.
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Mini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
      <div className="h-7 w-7 rounded-full bg-magenta/10 text-magenta flex items-center justify-center">
        {icon}
      </div>
      <span className="leading-tight">{label}</span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      <input
        type="text"
        value={value}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-magenta transition-all"
      />
    </label>
  );
}
