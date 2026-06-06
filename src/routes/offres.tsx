import { createFileRoute } from "@tanstack/react-router";
import { Nav, PromoBar, Footer, Pricing } from "./index";
import { CheckoutFlow } from "@/components/landing/CheckoutFlow";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Nos offres OneTap — Choisissez votre formule" },
      { name: "description", content: "Comparez les formules OneTap : Essentiel à 19,80€, Physique (NFC) à 28,80€, Premium à 48€. Paiement unique, sans abonnement. Garantie 30 jours." },
      { property: "og:title", content: "Nos offres OneTap — Choisissez votre formule" },
      { property: "og:description", content: "Essentiel, Physique NFC ou Premium : trouvez la formule adaptée. Paiement unique, sans abonnement." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/offres" },
    ],
    links: [{ rel: "canonical", href: "/offres" }],
  }),
  component: OffresPage,
});

function OffresPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <PromoBar />
      <Nav />
      <Pricing />
      <Footer />
      <CheckoutFlow />
    </div>
  );
}
