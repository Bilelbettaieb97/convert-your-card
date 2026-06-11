import { createFileRoute, Link } from "@tanstack/react-router";
import { getCardPreview } from "@/fns/get-card-preview";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/preview/$token")({
  loader: async ({ params }) => {
    const card = await getCardPreview({ data: { token: params.token } });
    return { card };
  },
  head: () => ({
    meta: [
      { title: "Aperçu de carte de visite digitale" },
      { name: "description", content: "Découvrez cette carte de visite digitale générée par IA." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const { card } = Route.useLoaderData();

  if (!card) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground text-sm">Ce lien a expiré ou n'existe pas.</p>
        <Link
          to="/builderia"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-medium"
        >
          Créer ma propre carte
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0014] via-[#12002a] to-[#0a0018] flex flex-col items-center justify-center px-4 py-12">
      {/* Badge */}
      <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c026d3]/30 bg-[#c026d3]/10">
        <Sparkles className="w-3.5 h-3.5 text-[#c026d3]" />
        <span className="text-xs font-medium text-[#c026d3]">Aperçu · Carte Visite Digitale</span>
      </div>

      <h1 className="text-xl font-bold text-white text-center mb-8">
        {card.title || `La carte de ${card.name}`}
      </h1>

      <PhoneFrame>
        <BusinessCard data={card} />
      </PhoneFrame>

      <div className="mt-10 text-center space-y-3">
        <p className="text-white/40 text-xs">
          Cette carte est disponible pendant 24h
        </p>
        <Link
          to="/builderia"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white text-sm font-semibold hover:opacity-90 transition"
        >
          <Sparkles className="w-4 h-4" />
          Créer ma carte gratuitement
        </Link>
      </div>
    </div>
  );
}
