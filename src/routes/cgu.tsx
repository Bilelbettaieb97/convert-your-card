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
    <section className="mb-10">
      <h2 className="text-base font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function EnClair({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
      <p className="text-[11px] font-semibold text-primary mb-1 uppercase tracking-wide">✦ En clair</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function CguPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-sm text-muted-foreground mb-10">
          En accédant à cartevisitedigitale.fr et en utilisant le service, vous acceptez sans réserve les présentes CGU. Dernière version en vigueur : juin 2026.
        </p>

        <Section title="1. Objet">
          <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du service <strong className="text-foreground">Carte Visite Digitale</strong>, accessible sur <strong className="text-foreground">cartevisitedigitale.fr</strong>, édité par Bilel Bettaieb (Rueil-Malmaison, 92500).</p>
          <p>Ce service permet à tout professionnel ou entrepreneur de créer, personnaliser et partager une carte de visite digitale accessible en ligne via un lien, un QR code ou une carte physique connectée.</p>
          <EnClair>
            Carte Visite Digitale est un outil pour créer votre carte de visite numérique en ligne. Ces CGU définissent les règles du jeu entre vous et nous.
          </EnClair>
        </Section>

        <Section title="2. Accès au service">
          <p>L'accès est ouvert à toute personne physique majeure (18 ans ou plus) ou morale disposant d'une adresse email valide.</p>
          <p>L'inscription est gratuite (plan Essentielle). Des fonctionnalités avancées sont disponibles via le plan Vitrine à 4,80 € / mois, avec essai gratuit de 3 jours.</p>
          <p>L'utilisateur est responsable de la confidentialité de ses identifiants de connexion et de toute activité effectuée depuis son compte.</p>
          <EnClair>
            N'importe qui peut s'inscrire gratuitement. Si vous partagez votre mot de passe avec quelqu'un, c'est votre responsabilité.
          </EnClair>
        </Section>

        <Section title="3. Compte utilisateur">
          <p>Chaque utilisateur ne peut créer qu'un seul compte. Tout compte créé avec de fausses informations ou à des fins frauduleuses sera suspendu sans préavis.</p>
          <p>L'utilisateur peut supprimer son compte à tout moment depuis son tableau de bord ou en contactant <strong className="text-foreground">contact@cartevisitedigitale.fr</strong>.</p>
          <p>En cas de suppression, toutes les données associées au compte (carte, contacts, analytics) sont effacées dans un délai maximum de 30 jours, sauf obligation légale de conservation.</p>
          <EnClair>
            Un compte par personne. Vous pouvez partir quand vous voulez — on supprimera tout dans les 30 jours.
          </EnClair>
        </Section>

        <Section title="4. Contenu publié">
          <p>L'utilisateur est seul responsable du contenu qu'il publie sur sa carte (textes, images, liens, coordonnées, vidéos).</p>
          <p>Il est strictement interdit de publier :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Des contenus illicites, diffamatoires, injurieux ou discriminatoires</li>
            <li>Des contenus à caractère pornographique, violent ou incitant à la haine</li>
            <li>Des informations personnelles de tiers sans leur consentement explicite</li>
            <li>Des contenus portant atteinte aux droits de propriété intellectuelle d'autrui</li>
            <li>Des liens vers des sites malveillants, frauduleux ou de phishing</li>
            <li>Tout contenu faisant la promotion d'activités illégales</li>
          </ul>
          <p className="mt-2">Carte Visite Digitale se réserve le droit de supprimer tout contenu non conforme et de suspendre le compte associé sans préavis ni remboursement.</p>
          <EnClair>
            Votre carte, c'est votre responsabilité. Restez dans la légalité : pas de contenus haineux, trompeurs ou qui enfreignent les droits d'autrui.
          </EnClair>
        </Section>

        <Section title="5. Propriété intellectuelle">
          <p><strong className="text-foreground">Votre contenu :</strong> l'utilisateur conserve l'intégralité des droits de propriété intellectuelle sur le contenu qu'il publie sur sa carte (textes, photos, logos, etc.). En publiant ce contenu, il accorde à Carte Visite Digitale une licence non exclusive, mondiale et gratuite, limitée à l'affichage du contenu dans le cadre du service.</p>
          <p><strong className="text-foreground">Notre service :</strong> le service, son code source, son design, ses algorithmes, ses marques et logos restent la propriété exclusive de Bilel Bettaieb. Toute reproduction ou imitation est interdite.</p>
          <EnClair>
            Votre contenu vous appartient. On a juste le droit de l'afficher pour faire fonctionner le service. Notre code et notre design nous appartiennent.
          </EnClair>
        </Section>

        <Section title="6. Disponibilité du service">
          <p>Carte Visite Digitale s'efforce d'assurer une disponibilité du service 24h/24, 7j/7, 365 jours par an. Des interruptions ponctuelles peuvent survenir pour des raisons de maintenance, de mise à jour ou d'incident technique.</p>
          <p>Des maintenances planifiées seront annoncées par email avec un préavis raisonnable.</p>
          <p>Carte Visite Digitale ne peut être tenu responsable des conséquences d'une indisponibilité temporaire du service, notamment la perte de données ou de revenus.</p>
          <EnClair>
            On fait tout pour que le service soit toujours accessible. Si ça tombe en panne, on ne peut pas être tenus responsables des conséquences.
          </EnClair>
        </Section>

        <Section title="7. Données personnelles">
          <p>La collecte et le traitement de vos données personnelles sont régis par notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>, conforme au RGPD (Règlement UE 2016/679).</p>
          <p>Vos données ne sont jamais vendues à des tiers.</p>
          <EnClair>
            On ne vend pas vos données. Tout est expliqué dans notre politique de confidentialité — conforme à la loi européenne.
          </EnClair>
        </Section>

        <Section title="8. Suspension et résiliation">
          <p>Carte Visite Digitale se réserve le droit de suspendre ou de résilier un compte sans préavis en cas de :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Non-respect des présentes CGU</li>
            <li>Utilisation frauduleuse, abusive ou contraire à l'ordre public</li>
            <li>Défaut de paiement après relance</li>
            <li>Usurpation d'identité ou création de faux profils</li>
          </ul>
          <p className="mt-2">L'utilisateur peut résilier son abonnement à tout moment depuis son dashboard, sans pénalité ni engagement. La résiliation prend effet à la fin de la période en cours.</p>
          <EnClair>
            On peut suspendre un compte qui ne respecte pas les règles. De votre côté, vous pouvez partir à tout moment sans frais.
          </EnClair>
        </Section>

        <Section title="9. Limitation de responsabilité">
          <p>Dans les limites autorisées par la loi, Carte Visite Digitale ne peut être tenu responsable de dommages indirects, incidents ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le service, y compris :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Perte de données ou de contenu</li>
            <li>Manque à gagner ou perte de chiffre d'affaires</li>
            <li>Interruption d'activité professionnelle</li>
            <li>Atteinte à la réputation</li>
          </ul>
          <p className="mt-2">La responsabilité totale de Carte Visite Digitale, toutes causes confondues, est limitée au montant effectivement payé par l'utilisateur au cours des 12 derniers mois.</p>
          <EnClair>
            Si le service dysfonctionne, notre responsabilité est limitée à ce que vous avez payé dans l'année. On ne peut pas être tenus responsables de préjudices indirects.
          </EnClair>
        </Section>

        <Section title="10. Modification des CGU">
          <p>Carte Visite Digitale se réserve le droit de modifier les présentes CGU à tout moment pour s'adapter aux évolutions légales, réglementaires ou du service.</p>
          <p>Les utilisateurs seront informés par email de toute modification substantielle au moins 15 jours avant son entrée en vigueur. La poursuite de l'utilisation du service après cette date vaut acceptation des nouvelles CGU.</p>
          <p>En cas de désaccord, l'utilisateur peut résilier son compte avant l'entrée en vigueur des nouvelles conditions.</p>
          <EnClair>
            On peut mettre à jour ces règles. On vous préviendra par email 15 jours avant. Si ça ne vous convient pas, vous pourrez partir sans frais.
          </EnClair>
        </Section>

        <Section title="11. Médiation des litiges (consommateurs)">
          <p>Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, Carte Visite Digitale propose un dispositif de médiation de la consommation.</p>
          <p>En cas de litige non résolu amiablement dans un délai de 2 mois après réclamation écrite adressée à <strong className="text-foreground">contact@cartevisitedigitale.fr</strong>, vous pouvez saisir gratuitement un médiateur de la consommation.</p>
          <p>La Commission Européenne met également à disposition une plateforme de Règlement en Ligne des Litiges (RLL) : <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></p>
          <EnClair>
            En cas de litige, contactez-nous d'abord. Si on ne trouve pas de solution sous 2 mois, vous pouvez faire appel gratuitement à un médiateur indépendant.
          </EnClair>
        </Section>

        <Section title="12. Droit applicable">
          <p>Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution sera soumis aux tribunaux compétents du ressort de Nanterre (92), sauf disposition légale impérative contraire applicable aux consommateurs.</p>
          <EnClair>
            C'est le droit français qui s'applique. En cas de problème judiciaire, c'est le tribunal de Nanterre qui est compétent.
          </EnClair>
        </Section>

        <p className="text-xs text-muted-foreground mt-10 border-t border-border pt-6">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
