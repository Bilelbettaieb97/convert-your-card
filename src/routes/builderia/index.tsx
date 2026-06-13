import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { supabase } from "@/integrations/supabase/client";
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

const EXAMPLES = [
  { icon: "🔧", short: "Plombier Paris",         full: "Plombier urgence 24h/24, Paris" },
  { icon: "🧘", short: "Coach bien-être",         full: "Coach bien-être & développement perso" },
  { icon: "🏠", short: "Agent immobilier",        full: "Agent immo spécialisé biens de prestige" },
  { icon: "📷", short: "Photographe",             full: "Photographe portrait & mariage" },
  { icon: "👨‍🍳", short: "Chef cuisinier",         full: "Chef cuisinier, restaurant gastronomique" },
  { icon: "💇", short: "Coiffeur / Barbier",      full: "Coiffeur et barbier, salon de coiffure moderne" },
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
  const [profileChecked, setProfileChecked] = useState(false);

  const animDoneRef = useRef(false);
  const resultReady = useRef(false);
  const partialRef = useRef<Partial<CardData>>({});
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/connexion" });
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop";
    supabase.rpc("track_builderia_step", { p_user_id: user.id, p_step: 1, p_step_name: "builderia", p_device: device }).then(() => {});

    supabase.from("nfc_profiles").select("id").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data) {
        navigate({ to: "/dashboard", replace: true });
        return;
      }
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "CompleteRegistration");
      }
      setProfileChecked(true);
    });
  }, [user?.id]);

  const userName: string =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";
  const rawFirst = userName.split(" ")[0] || "";
  // Email prefixes (e.g. "jean.dupont97") look bad in the headline; allow hyphenated names
  const firstName = /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/.test(rawFirst) ? rawFirst : "toi";

  function triggerFlip() {
    setIsFlipping(true);
    setTimeout(() => {
      navigate({ to: "/builderia/resultat" });
    }, 450);
  }

  async function runGeneration(text: string) {
    if (!text.trim()) return;
    if (text.trim().length < 3 || !/[a-zA-ZÀ-ÿ]/.test(text)) {
      setError("Décris ton activité en quelques mots — ex : Plombier Paris, Coach bien-être…");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

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
        signal: controller.signal,
        body: JSON.stringify({
          input: text.trim(),
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

      const p = partialRef.current;
      const merged: CardData = {
        ...DEFAULT_CARD,
        ...p,
        name: userName || DEFAULT_CARD.name,
        photo: user?.user_metadata?.avatar_url || DEFAULT_CARD.photo,
        email: user?.email || localStorage.getItem("cyk.pending_email") || DEFAULT_CARD.email,
        // Sanitize array fields — AI may send null instead of an array
        stats: Array.isArray(p.stats) ? p.stats : DEFAULT_CARD.stats,
        badges: Array.isArray(p.badges) ? p.badges : DEFAULT_CARD.badges,
        services: Array.isArray(p.services) ? p.services : DEFAULT_CARD.services,
        testimonials: Array.isArray(p.testimonials) ? p.testimonials : DEFAULT_CARD.testimonials,
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

      // Si Claude n'a pas généré de bio, le contenu est inutilisable (gibberish input)
      if (!partialRef.current.bio) {
        setPhase("prompt");
        setError("Je n'ai pas réussi à identifier ton activité. Essaie d'être plus précis — ex : Plombier Paris, Coach bien-être…");
        return;
      }

      setData(merged);
      localStorage.setItem("cyk.builderia.generated", "1");
      resultReady.current = true;
      if (animDoneRef.current) triggerFlip();

    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setPhase("prompt");
      setError("Une erreur est survenue, réessaie.");
    }
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    runGeneration(input);
  }

  function handleChipClick(full: string) {
    setInput(full);
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

  if (loading || !user || !profileChecked) {
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
      <div className="min-h-screen bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018] flex flex-col px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-5">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-2 pt-1">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#c026d3]/30 bg-[#c026d3]/10">
              <Sparkles className="w-3 h-3 text-[#c026d3]" />
              <span className="text-[11px] font-semibold text-[#c026d3]">Carte générée en 30 secondes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {firstName},{" "}
              <span className="bg-gradient-to-r from-[#c026d3] to-[#7c3aed] bg-clip-text text-transparent">
                dis-moi ce que tu fais.
              </span>
            </h1>

            {/* Sous-titre émotionnel */}
            <p className="text-white/65 text-sm leading-snug max-w-xs">
              Ta carte en ligne, partageable en 30 secondes.
            </p>

            {/* Social proof — visible */}
            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
              <span>⭐ 4,9/5 Trustpilot</span>
              <span className="text-white/20">·</span>
              <span>2 400+ professionnels</span>
            </div>

            {/* Ce que l'IA génère */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { icon: "📝", label: "Bio" },
                { icon: "💼", label: "Services" },
                { icon: "⭐", label: "Avis clients" },
                { icon: "📊", label: "Stats" },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-[11px]">
                  <span>{icon}</span>{label}
                </span>
              ))}
              <span className="text-white/40 text-[11px]">+ thème couleur</span>
            </div>
          </div>

          {/* ── Textarea — ACTION PRINCIPALE ── */}
          <form onSubmit={handleGenerate} className="flex flex-col gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex : Plombier à Paris, urgence 24h/24, rénovation salle de bain…"
              rows={2}
              inputMode="text"
              enterKeyHint="send"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(e as unknown as React.FormEvent); }
              }}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 text-base focus:outline-none focus:ring-2 focus:ring-[#c026d3]/50 focus:border-[#c026d3]/50 transition resize-none backdrop-blur"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white font-bold py-4 text-base active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              {input.trim() ? "Générer ma carte" : "Décris ton activité…"}
            </button>
            <p className="text-center text-[11px] text-emerald-400/80 font-medium">
              ✓ Gratuit · Sans carte bancaire · Prête en 30 sec
            </p>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </form>

          {/* ── Séparateur ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-xs shrink-0">ou choisis ton métier</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ── Chips métier — ACTION SECONDAIRE ── */}
          <div className="pb-6">
            <div className="grid grid-cols-2 gap-2.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.full}
                  type="button"
                  onClick={() => handleChipClick(ex.full)}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] hover:border-[#c026d3]/50 px-4 py-4 text-left transition-all active:scale-95"
                >
                  <span className="text-2xl shrink-0">{ex.icon}</span>
                  <span className="text-sm text-white/80 font-semibold leading-snug">{ex.short}</span>
                </button>
              ))}
            </div>
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
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018]">
      <div className="min-h-full flex flex-col items-center justify-center py-6 px-4">
      <div className="mb-4 sm:mb-8 text-center">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">IA au travail</p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold">Construction de ta carte…</h2>
      </div>

      <div style={phoneStyle}>
        <div className="relative w-[190px] h-[360px] sm:w-[220px] sm:h-[420px] rounded-[2rem] sm:rounded-[2.5rem] border-2 border-white/15 bg-white/[0.03] shadow-[0_0_80px_rgba(192,38,211,0.25)] overflow-hidden">
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

      <div className="mt-4 sm:mt-8 text-center">
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
    </div>
  );
}
