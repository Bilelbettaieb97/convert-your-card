import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Carte Visite Digitale" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsLegalesPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mentions légales</h1>
        <p className="text-sm text-muted-foreground mb-10">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.</p>

        <Section title="1. Éditeur du site">
          <p><strong className="text-foreground">Responsable de publication :</strong> Bilel Bettaieb</p>
          <p><strong className="text-foreground">Adresse :</strong> Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p><strong className="text-foreground">Email :</strong> contact@cartevisitedigitale.fr</p>
          <p><strong className="text-foreground">Téléphone :</strong> 06 16 47 72 45</p>
          <p><strong className="text-foreground">SIRET :</strong> [À COMPLÉTER]</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Activité exercée à titre individuel en cours d'immatriculation.</p>
        </Section>

        <Section title="2. Hébergement">
          <p><strong className="text-foreground">Hébergeur :</strong> Vercel Inc.</p>
          <p>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
          <p>Site : <a href="https://vercel.com" className="text-[#c026d3] hover:underline">vercel.com</a></p>
        </Section>

        <Section title="3. Propriété intellectuelle">
          <p>L'ensemble du contenu de ce site (textes, images, logotypes, code source) est la propriété exclusive de Bilel Bettaieb, sauf mention contraire.</p>
          <p>Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation écrite préalable est interdite.</p>
        </Section>

        <Section title="4. Données personnelles">
          <p>Le traitement des données personnelles collectées sur ce site est détaillé dans notre <a href="/confidentialite" className="text-[#c026d3] hover:underline">Politique de confidentialité</a>.</p>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : contact@cartevisitedigitale.fr</p>
        </Section>

        <Section title="5. Cookies">
          <p>Ce site utilise des cookies à des fins d'analyse d'audience (Google Analytics, Meta Pixel). Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
        </Section>

        <Section title="6. Limitation de responsabilité">
          <p>Bilel Bettaieb s'efforce de maintenir les informations de ce site à jour et exactes. Il ne peut être tenu responsable des erreurs, omissions ou indisponibilités du service.</p>
        </Section>

        <Section title="7. Droit applicable">
          <p>Les présentes mentions légales sont soumises au droit français. Tout litige relève de la compétence exclusive des tribunaux français.</p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
