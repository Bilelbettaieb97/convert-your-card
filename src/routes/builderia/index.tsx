import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/card/BusinessCard";
import { DEFAULT_CARD, type CardData, type BrickId } from "@/lib/card-types";

export const Route = createFileRoute("/builderia/")({
  head: () => ({
    meta: [
      { title: "Créer ma carte avec l'IA — Carte Visite Digitale" },
      { name: "description", content: "Décris ton activité, l'IA génère ta carte de visite digitale complète en temps réel." },
    ],
  }),
  component: BuilderIAPromptPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_ORDER: BrickId[] = [
  "identity", "actions", "socials", "about", "vcard",
  "calendar", "services", "testimonials", "cta",
  "stats", "contact", "gallery", "listings", "video", "languages", "theme",
];

const BRICKS = [
  { icon: "🪪", label: "Identité & photo" },
  { icon: "⚡", label: "Boutons d'action" },
  { icon: "📊", label: "Statistiques clés" },
  { icon: "💼", label: "Services & prestations" },
  { icon: "⭐", label: "Avis clients" },
  { icon: "📅", label: "Prise de rendez-vous" },
  { icon: "🖼", label: "Photo de couverture" },
  { icon: "🎯", label: "Appel à l'action" },
];

type Phase = "prompt" | "building";

function applyField(card: Partial<CardData>, f: string, v: unknown) {
  switch (f) {
    case "title":          card.title = v as string; break;
    case "accent":         card.accent = v as CardData["accent"]; break;
    case "bio":            card.bio = v as string; break;
    case "badges":         card.badges = v as CardData["badges"]; break;
    case "stats":          card.stats = v as CardData["stats"]; break;
    case "services":       card.services = v as CardData["services"]; break;
    case "testimonials":   card.testimonials = v as CardData["testimonials"]; break;
    case "ctaTitle":       card.ctaTitle = v as string; break;
    case "ctaText":        card.ctaText = v as string; break;
    case "ctaButtonLabel": card.ctaButtonLabel = v as string; break;
    case "calendarLabel":  card.calendarLabel = v as string; break;
    case "actions":        card.actions = v as CardData["actions"]; break;
    case "coverPhoto":     card.coverPhoto = v as string; break;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BuilderIAPromptPage() {
  const { user, loading } = useAuthStore();
  const { setData } = useCardStore();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("prompt");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [buildStep, setBuildStep] = useState(0);
  const [liveCard, setLiveCard] = useState<Partial<CardData>>({});
  const [isFlipping, setIsFlipping] = useState(false);

  const animDoneRef = useRef(false);
  const resultReady = useRef(false);
  const partialRef = useRef<Partial<CardData>>({});

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    supabase.rpc("track_builderia_step", { p_user_id: user.id, p_step: 1, p_step_name: "builderia" }).then(() => {});

    // Si profil déjà existant → user a déjà complété le checkout → dashboard
    supabase.from("nfc_profiles").select("id").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data) {
        navigate({ to: "/dashboard", replace: true });
        return;
      }
      // CompleteRegistration — uniquement pour les nouveaux inscrits
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "CompleteRegistration");
      }
    });
  }, [user?.id]);

  const userName: string =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";
  const firstName = userName.split(" ")[0] || "toi";

  // ── Flip → navigate to /builderia/resultat ──
  function triggerFlip() {
    setIsFlipping(true);
    setTimeout(() => {
      navigate({ to: "/builderia/resultat" });
    }, 450);
  }

  // ── Génération streaming ──
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setPhase("building");
    setBuildStep(0);
    setLiveCard({});
    partialRef.current = {};
    animDoneRef.current = false;
    resultReady.current = false;
    setError("");

    try {
      const response = await fetch("/api/generate-card-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          name: userName || undefined,
          email: user?.email || undefined,
        }),
      });

      if (!response.ok || !response.body) throw new Error("Stream failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data) as { f: string; v: unknown };
            if (evt.f && evt.v !== undefined) {
              applyField(partialRef.current, evt.f, evt.v);
              setLiveCard({ ...partialRef.current });
            }
          } catch {}
        }
      }

      const merged: CardData = {
        ...DEFAULT_CARD,
        ...partialRef.current,
        name: userName || DEFAULT_CARD.name,
        photo: user?.user_metadata?.avatar_url || DEFAULT_CARD.photo,
        email: user?.email || DEFAULT_CARD.email,
        agency: "",
        phone: "",
        website: "",
        statsEnabled: true,
        servicesEnabled: true,
        testimonialsEnabled: true,
        ctaEnabled: true,
        aboutEnabled: true,
        calendarEnabled: true,
        galleryEnabled: false,
        listingsEnabled: false,
        sectionOrder: [...BASE_ORDER],
      };

      setData(merged);
      localStorage.setItem("cyk.builderia.generated", "1");
      resultReady.current = true;
      if (animDoneRef.current) triggerFlip();

    } catch {
      setPhase("prompt");
      setError("Une erreur est survenue, réessaie.");
    }
  }

  // ── Animation brique ──
  useEffect(() => {
    if (phase !== "building") return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setBuildStep(current);
      if (current >= BRICKS.length) {
        clearInterval(timer);
        animDoneRef.current = true;
        if (resultReady.current) triggerFlip();
      }
    }, 380);
    return () => clearInterval(timer);
  }, [phase]);

  const currentBrickLabel =
    buildStep > 0 && buildStep <= BRICKS.length
      ? BRICKS[buildStep - 1].label
      : "Initialisation…";

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // PHASE 1 — Prompt
  // ═══════════════════════════════════════════════════════
  if (phase === "prompt") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018] flex flex-col items-center justify-center px-4 py-16">

        <div className="mb-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c026d3]/30 bg-[#c026d3]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#c026d3]" />
          <span className="text-xs font-medium text-[#c026d3]">Carte complète générée en 30 secondes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center mb-4 leading-tight">
          {firstName ? (
            <>{firstName}, dis-moi{" "}<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#c026d3] to-[#7c3aed] bg-clip-text text-transparent">
              ce que tu fais.
            </span></>
          ) : (
            <>Dis-moi ce que tu fais.{" "}
            <span className="bg-gradient-to-r from-[#c026d3] to-[#7c3aed] bg-clip-text text-transparent">
              Je crée ta carte.
            </span></>
          )}
        </h1>

        <p className="text-white/60 text-center mb-3 max-w-lg text-sm sm:text-base leading-relaxed">
          Une phrase suffit. L'IA génère ta bio, tes services, tes témoignages,<br className="hidden sm:block" />
          ta prise de RDV et ton thème couleur — <span className="text-white/90 font-medium">en temps réel, devant toi.</span>
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center mb-8 max-w-sm">
          {["Bio percutante", "Services", "Avis clients", "Stats", "Prise de RDV", "CTA", "Photo de couverture"].map((item) => (
            <span key={item} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/50">
              {item}
            </span>
          ))}
        </div>

        <form onSubmit={handleGenerate} className="w-full max-w-2xl">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex : Plombier à Paris, dépannage 24h/24, spécialisé en rénovation salle de bain…"
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(e as unknown as React.FormEvent); }
              }}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 pr-16 text-white placeholder:text-white/30 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#c026d3]/50 focus:border-[#c026d3]/50 transition resize-none backdrop-blur"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] flex items-center justify-center hover:opacity-90 transition disabled:opacity-30"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          <p className="text-center text-white/25 text-xs mt-3">
            Entrée pour générer · Shift+Entrée pour aller à la ligne
          </p>
        </form>

        <div className="mt-6">
          <p className="text-center text-white/25 text-[11px] mb-2 uppercase tracking-widest">Essaie avec</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-xl">
            {[
              "Plombier urgence 24h/24, Paris",
              "Coach bien-être & développement perso",
              "Agent immo spécialisé biens de prestige",
              "Photographe portrait & mariage",
              "Chef cuisinier, restaurant gastronomique",
            ].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setInput(ex)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/25 transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // PHASE 2 — Building
  // ═══════════════════════════════════════════════════════
  const phoneStyle: React.CSSProperties = {
    transform: isFlipping ? "perspective(900px) rotateY(90deg)" : "perspective(900px) rotateY(0deg)",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.6, 1)",
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018]">
      <div className="mb-8 text-center px-4">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">IA au travail</p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold">Construction de ta carte…</h2>
      </div>

      <div style={phoneStyle}>
        <div className="relative w-[220px] h-[420px] rounded-[2.5rem] border-2 border-white/15 bg-white/[0.03] shadow-[0_0_80px_rgba(192,38,211,0.25)] overflow-hidden">
          <div className="h-7 flex items-center justify-center border-b border-white/10 shrink-0">
            <div className="w-16 h-1.5 bg-white/20 rounded-full" />
          </div>

          {liveCard.coverPhoto ? (
            <div className="h-16 overflow-hidden shrink-0">
              <img src={liveCard.coverPhoto} alt="cover" className="w-full h-full object-cover opacity-70" />
            </div>
          ) : (
            <div className="h-14 bg-gradient-to-r from-[#c026d3]/20 to-[#7c3aed]/20 shrink-0 flex items-center justify-center">
              <div className="w-32 h-2 bg-white/10 rounded-full animate-pulse" />
            </div>
          )}

          <div className="px-3 pt-2 pb-1 flex items-center gap-2 shrink-0">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="profil" className="w-9 h-9 rounded-full border-2 border-white/20 shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c026d3] to-[#7c3aed] shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-white text-[11px] font-bold truncate">{userName || "Votre nom"}</p>
              {liveCard.title ? (
                <p className="text-white/60 text-[9px] truncate">{liveCard.title}</p>
              ) : (
                <div className="w-24 h-1.5 bg-white/15 rounded-full animate-pulse mt-0.5" />
              )}
            </div>
          </div>

          <div className="px-3 py-1.5 shrink-0">
            {liveCard.bio ? (
              <p className="text-white/60 text-[8.5px] leading-relaxed line-clamp-3">{liveCard.bio}</p>
            ) : (
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-white/10 rounded-full animate-pulse" />
                <div className="w-4/5 h-1.5 bg-white/10 rounded-full animate-pulse" />
              </div>
            )}
          </div>

          <div className="px-3 py-1 space-y-1 overflow-hidden">
            {[
              { field: "stats", icon: "📊", label: `${liveCard.stats?.length ?? 0} statistiques` },
              { field: "services", icon: "💼", label: `${liveCard.services?.length ?? 0} services` },
              { field: "testimonials", icon: "⭐", label: `${liveCard.testimonials?.length ?? 0} avis` },
              { field: "ctaTitle", icon: "🎯", label: "Offre irrésistible" },
              { field: "coverPhoto", icon: "🖼", label: "Photo de couverture" },
            ].map(({ field, icon, label }) => {
              const has = field === "stats" ? (liveCard.stats?.length ?? 0) > 0
                : field === "services" ? (liveCard.services?.length ?? 0) > 0
                : field === "testimonials" ? (liveCard.testimonials?.length ?? 0) > 0
                : field === "ctaTitle" ? !!liveCard.ctaTitle
                : !!liveCard.coverPhoto;
              return (
                <div
                  key={field}
                  style={{
                    opacity: has ? 1 : 0.3,
                    transform: has ? "translateX(0)" : "translateX(-8px)",
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                  className="flex items-center gap-1.5 text-[9px]"
                >
                  <span>{icon}</span>
                  <span className={has ? "text-emerald-400" : "text-white/30"}>{label}</span>
                  {has && <span className="text-emerald-400 ml-auto">✓</span>}
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#c026d3]/20 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm font-medium transition-all duration-300 min-h-[1.25rem]">
          {currentBrickLabel}
        </p>
      </div>
      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#c026d3] to-[#7c3aed] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(buildStep / BRICKS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
