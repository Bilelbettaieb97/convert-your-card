import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cgu")({
  head: () => ({
    meta: [
      { title: "Conditions Générales d'Utilisation — Carte Visite Digitale" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CguPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function CguPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-sm text-muted-foreground mb-10">En utilisant cartevisitedigitale.fr, vous acceptez les présentes CGU.</p>

        <Section title="1. Objet">
          <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du service Carte Visite Digitale, accessible sur <strong className="text-foreground">cartevisitedigitale.fr</strong>, édité par Bilel Bettaieb.</p>
          <p>Le service permet la création, la personnalisation et le partage d'une carte de visite digitale en ligne.</p>
        </Section>

        <Section title="2. Accès au service">
          <p>L'accès au service est ouvert à toute personne physique majeure ou morale disposant d'une adresse email valide.</p>
          <p>L'inscription est gratuite. Certaines fonctionnalités avancées sont soumises à un abonnement payant (plan Vitrine).</p>
          <p>L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.</p>
        </Section>

        <Section title="3. Compte utilisateur">
          <p>Chaque utilisateur ne peut créer qu'un seul compte. Tout compte créé avec de fausses informations ou à des fins frauduleuses sera suspendu.</p>
          <p>L'utilisateur peut supprimer son compte à tout moment depuis son dashboard ou en contactant contact@cartevisitedigitale.fr.</p>
          <p>En cas de suppression, toutes les données associées au compte sont effacées dans un délai de 30 jours.</p>
        </Section>

        <Section title="4. Contenu publié">
          <p>L'utilisateur est seul responsable du contenu qu'il publie sur sa carte (textes, images, liens, coordonnées).</p>
          <p>Il est strictement interdit de publier :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Des contenus illicites, diffamatoires, injurieux ou discriminatoires</li>
            <li>Des contenus à caractère pornographique ou violent</li>
            <li>Des informations personnelles de tiers sans leur consentement</li>
            <li>Des contenus portant atteinte aux droits de propriété intellectuelle d'autrui</li>
            <li>Des liens vers des sites malveillants ou frauduleux</li>
          </ul>
          <p className="mt-2">Carte Visite Digitale se réserve le droit de supprimer tout contenu non conforme et de suspendre le compte associé sans préavis ni remboursement.</p>
        </Section>

        <Section title="5. Propriété intellectuelle">
          <p>L'utilisateur conserve la propriété de l'ensemble du contenu qu'il publie sur sa carte.</p>
          <p>En publiant ce contenu, il accorde à Carte Visite Digitale une licence non exclusive, mondiale et gratuite pour afficher et diffuser ce contenu dans le cadre du service.</p>
          <p>Le service, son code source, son design et ses fonctionnalités restent la propriété exclusive de Bilel Bettaieb.</p>
        </Section>

        <Section title="6. Disponibilité du service">
          <p>Carte Visite Digitale s'efforce d'assurer la disponibilité du service 24h/24, 7j/7. Des interruptions peuvent survenir pour maintenance, mise à jour ou incident technique.</p>
          <p>Carte Visite Digitale ne peut être tenu responsable des conséquences d'une indisponibilité temporaire du service.</p>
        </Section>

        <Section title="7. Suspension et résiliation">
          <p>Carte Visite Digitale se réserve le droit de suspendre ou résilier un compte en cas de :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Non-respect des présentes CGU</li>
            <li>Utilisation frauduleuse ou abusive du service</li>
            <li>Défaut de paiement</li>
          </ul>
          <p className="mt-2">L'utilisateur peut résilier son abonnement à tout moment depuis son dashboard, sans pénalité.</p>
        </Section>

        <Section title="8. Limitation de responsabilité">
          <p>Carte Visite Digitale ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service, notamment en cas de perte de données, de manque à gagner ou d'interruption d'activité.</p>
        </Section>

        <Section title="9. Modification des CGU">
          <p>Carte Visite Digitale se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email en cas de modification substantielle. La poursuite de l'utilisation du service après modification vaut acceptation des nouvelles CGU.</p>
        </Section>

        <Section title="10. Droit applicable">
          <p>Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents du ressort de Nanterre (92).</p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
