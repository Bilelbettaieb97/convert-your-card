import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente — Carte Visite Digitale" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CgvPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function CgvPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-muted-foreground mb-10">En vigueur au 1er juin 2026 — applicables à tout achat effectué sur cartevisitedigitale.fr</p>

        <Section title="1. Vendeur">
          <p><strong className="text-foreground">Responsable :</strong> Bilel Bettaieb</p>
          <p><strong className="text-foreground">Adresse :</strong> Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p><strong className="text-foreground">Email :</strong> contact@cartevisitedigitale.fr</p>
          <p><strong className="text-foreground">SIRET :</strong> Entreprise en cours de création</p>
        </Section>

        <Section title="2. Produits et services">
          <p>Carte Visite Digitale propose les offres suivantes :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Plan Essentielle</strong> — Gratuit, sans limitation de durée</li>
            <li><strong className="text-foreground">Plan Vitrine</strong> — 4,80 € / mois TTC, avec essai gratuit de 7 jours</li>
            <li><strong className="text-foreground">Carte NFC physique</strong> — 29 € TTC (achat unique, frais de port inclus)</li>
          </ul>
          <p className="mt-2">Les prix sont indiqués en euros toutes taxes comprises (TTC). La TVA applicable est celle en vigueur en France au moment de la commande.</p>
        </Section>

        <Section title="3. Essai gratuit">
          <p>Le plan Vitrine inclut un essai gratuit de 7 jours. Aucun prélèvement n'est effectué pendant cette période.</p>
          <p>À l'issue de l'essai, l'abonnement est automatiquement activé et le montant de 4,80 € / mois est prélevé sur le moyen de paiement renseigné.</p>
          <p>L'utilisateur peut annuler à tout moment avant la fin de l'essai depuis son dashboard, sans aucun frais.</p>
        </Section>

        <Section title="4. Paiement">
          <p>Les paiements sont traités de manière sécurisée par <strong className="text-foreground">Stripe</strong> (Stripe Payments Europe, Ltd). Carte Visite Digitale ne stocke aucune donnée bancaire.</p>
          <p>Moyens de paiement acceptés : carte bancaire (Visa, Mastercard, American Express).</p>
          <p>Le paiement est dû à la souscription pour la carte NFC et mensuellement pour les abonnements.</p>
        </Section>

        <Section title="5. Résiliation et remboursement">
          <p><strong className="text-foreground">Abonnement Vitrine :</strong> Résiliable à tout moment en 1 clic depuis le dashboard. La résiliation prend effet à la fin de la période en cours. Aucun remboursement au prorata n'est effectué pour la période entamée.</p>
          <p><strong className="text-foreground">Carte NFC physique :</strong> Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux produits personnalisés fabriqués selon les spécifications du consommateur.</p>
          <p>Pour toute demande de remboursement exceptionnelle, contactez : contact@cartevisitedigitale.fr</p>
        </Section>

        <Section title="6. Droit de rétractation">
          <p>Conformément à l'article L.221-18 du Code de la consommation, vous disposez d'un délai de 14 jours à compter de la souscription pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
          <p>Ce droit ne s'applique pas si le service a été pleinement exécuté avant la fin du délai de rétractation et si l'exécution a commencé avec votre accord préalable.</p>
          <p>Pour exercer ce droit : contact@cartevisitedigitale.fr</p>
        </Section>

        <Section title="7. Disponibilité du service">
          <p>Carte Visite Digitale s'efforce de maintenir le service disponible 24h/24 et 7j/7. Des interruptions temporaires peuvent survenir pour maintenance ou raisons techniques. Elles ne donnent pas droit à remboursement sauf indisponibilité prolongée supérieure à 72 heures consécutives.</p>
        </Section>

        <Section title="8. Responsabilité">
          <p>Carte Visite Digitale est responsable du bon fonctionnement du service. L'utilisateur est seul responsable du contenu qu'il publie sur sa carte (photos, textes, liens).</p>
          <p>Sont interdits : les contenus illicites, diffamatoires, à caractère pornographique ou incitant à la haine. Tout manquement peut entraîner la suspension immédiate du compte sans remboursement.</p>
        </Section>

        <Section title="9. Protection des données">
          <p>Le traitement de vos données personnelles est détaillé dans notre <a href="/confidentialite" className="text-[#c026d3] hover:underline">Politique de confidentialité</a>, conforme au RGPD.</p>
        </Section>

        <Section title="10. Médiation">
          <p>En cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation. La Commission Européenne met à disposition une plateforme de règlement en ligne des litiges accessible sur <a href="https://ec.europa.eu/consumers/odr" className="text-[#c026d3] hover:underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.</p>
        </Section>

        <Section title="11. Droit applicable">
          <p>Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence des tribunaux du ressort de Nanterre (92), sauf disposition légale contraire applicable aux consommateurs.</p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
