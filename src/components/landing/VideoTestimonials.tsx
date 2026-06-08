import { useEffect, useRef, useState } from "react";
import { Play, X, BadgeCheck, Star, ChevronLeft, ChevronRight } from "lucide-react";

type VideoT = {
  name: string;
  role: string;
  poster: string;
  duration: string;
  quote: string;
  result: string;
  // src can be empty; we gracefully fallback to poster + quote overlay
  src?: string;
};

const VIDEOS: VideoT[] = [
  {
    name: "Sophie Morel",
    role: "Consultante freelance · Lyon",
    poster: "/testimonials/video-sophie.jpg",
    duration: "0:22",
    quote:
      "En 3 minutes ma carte était prête. J'ai signé 3 clients en 15 jours juste en partageant mon lien en rendez-vous.",
    result: "+3 clients en 15 jours",
  },
  {
    name: "Karim Lahbabi",
    role: "Commercial B2B · Paris",
    poster: "/testimonials/video-karim.jpg",
    duration: "0:28",
    quote:
      "Je tape ma carte sur le téléphone du prospect, ses coordonnées sont enregistrées. +40 % de rappels depuis.",
    result: "+40 % de rappels",
  },
  {
    name: "Élodie Rousseau",
    role: "Architecte d'intérieur · Bordeaux",
    poster: "/testimonials/video-elodie.jpg",
    duration: "0:19",
    quote:
      "Mes clients adorent l'effet 'wow'. Je mets à jour mes projets en 10 secondes, sans réimprimer.",
    result: "100 % de retours positifs",
  },
];

export function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild?.clientWidth ?? 280;
    el.scrollBy({ left: dir === "left" ? -cardW - 16 : cardW + 16, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
            <Play className="w-3.5 h-3.5 fill-current" />
            Témoignages vidéo
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ils racontent leur CVD en 30 secondes
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Des vraies personnes, des vrais résultats. Cliquez pour lancer la vidéo.
          </p>
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.name} v={v} onPlay={() => setActive(i)} />
          ))}
        </div>

        {/* Mobile & Tablet: carousel */}
        <div className="lg:hidden relative -mx-4">
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/95 border border-border shadow-lg items-center justify-center text-foreground hover:bg-background transition"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/95 border border-border shadow-lg items-center justify-center text-foreground hover:bg-background transition"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {VIDEOS.map((v, i) => (
              <div
                key={v.name}
                className="snap-center shrink-0 w-[70vw] max-w-[280px] sm:w-[42vw] sm:max-w-[320px]"
              >
                <VideoCard v={v} onPlay={() => setActive(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {active !== null && (
        <VideoModal v={VIDEOS[active]} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function VideoCard({ v, onPlay }: { v: VideoT; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group relative aspect-[9/14] rounded-2xl overflow-hidden text-left border border-border bg-card shadow-sm hover:shadow-xl transition-all"
    >
      <img
        src={v.poster}
        alt={`Témoignage vidéo de ${v.name}`}
        loading="lazy"
        width={576}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

      {/* Top: duration + verified */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/55 backdrop-blur-sm text-white text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {v.duration}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 text-foreground text-[11px] font-semibold">
          <BadgeCheck className="w-3.5 h-3.5 text-primary" />
          Vérifié
        </span>
      </div>

      {/* Center play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 rounded-full bg-white animate-pulse-ring opacity-60" />
          <Play className="w-6 h-6 ml-1 fill-current" />
        </span>
      </div>

      {/* Bottom: identity + result */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="font-semibold text-sm leading-tight">{v.name}</div>
        <div className="text-xs text-white/80">{v.role}</div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/15 backdrop-blur-sm text-[11px] font-medium">
          {v.result}
        </div>
      </div>
    </button>
  );
}

function VideoModal({ v, onClose }: { v: VideoT; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {v.src ? (
          <video
            ref={videoRef}
            src={v.src}
            poster={v.poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              src={v.poster}
              alt={v.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-display text-lg leading-snug">“{v.quote}”</p>
              <div className="mt-4 border-t border-white/15 pt-3">
                <div className="font-semibold">{v.name}</div>
                <div className="text-sm text-white/75">{v.role}</div>
              </div>
            </div>
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/15 backdrop-blur-sm text-white text-xs">
              Vidéo bientôt disponible
            </div>
          </>
        )}
      </div>
    </div>
  );
}
