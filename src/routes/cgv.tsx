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

function CgvPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-muted-foreground mb-10">
          En vigueur au 1er juin 2026 — applicables à tout achat effectué sur cartevisitedigitale.fr
        </p>

        <Section title="1. Vendeur">
          <p><strong className="text-foreground">Responsable :</strong> Bilel Bettaieb</p>
          <p><strong className="text-foreground">Activité :</strong> Micro-entreprise — services numériques</p>
          <p><strong className="text-foreground">Adresse :</strong> Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p><strong className="text-foreground">Email :</strong> contact@cartevisitedigitale.fr</p>
          <p><strong className="text-foreground">Téléphone :</strong> 06 16 47 72 45</p>
          <p><strong className="text-foreground">SIRET :</strong> [à compléter]</p>
          <EnClair>
            Vous achetez directement auprès de Bilel Bettaieb, entrepreneur individuel basé à Rueil-Malmaison (92).
          </EnClair>
        </Section>

        <Section title="2. Produits et services">
          <p>Carte Visite Digitale propose les offres suivantes :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Plan Essentielle</strong> — Gratuit, sans limitation de durée, sans engagement</li>
            <li><strong className="text-foreground">Plan Vitrine</strong> — 4,80 € / mois TTC, avec essai gratuit de 3 jours sans CB requise</li>
            <li><strong className="text-foreground">Carte NFC physique</strong> — 29 € TTC (achat unique, frais de port inclus en France métropolitaine)</li>
          </ul>
          <p className="mt-2">Les prix sont indiqués en euros toutes taxes comprises (TTC). Bilel Bettaieb, micro-entrepreneur non assujetti à la TVA, applique l'article 293 B du CGI : aucune TVA n'est collectée.</p>
          <EnClair>
            Il y a trois offres : gratuit, 4,80€/mois ou une carte NFC à 29€ en une fois. Les prix affichés sont les prix finaux — pas de surprise.
          </EnClair>
        </Section>

        <Section title="3. Essai gratuit">
          <p>Le plan Vitrine inclut un essai gratuit de <strong className="text-foreground">3 jours</strong>. Aucun moyen de paiement n'est requis pour démarrer l'essai.</p>
          <p>À l'issue des 3 jours, si vous choisissez d'activer votre abonnement, vous renseignez vos informations bancaires via Stripe Billing Portal et le premier prélèvement de 4,80 € intervient à la date d'activation.</p>
          <p>Si vous n'activez pas l'abonnement avant la fin de l'essai, votre carte reste accessible en lecture seule mais les fonctionnalités Vitrine sont désactivées. Vos données sont conservées 30 jours.</p>
          <EnClair>
            3 jours d'essai sans CB. Après, c'est vous qui choisissez d'activer ou non. Pas d'activation = pas de prélèvement, jamais.
          </EnClair>
        </Section>

        <Section title="4. Commande et souscription">
          <p>Toute souscription au plan Vitrine ou tout achat de carte NFC vaut acceptation des présentes CGV.</p>
          <p>Un email de confirmation récapitulatif est envoyé à l'adresse fournie lors de l'inscription dans les minutes suivant la souscription.</p>
          <p>Carte Visite Digitale se réserve le droit de refuser toute commande pour un motif légitime (fraude suspectée, usurpation d'identité, violation des CGU).</p>
          <EnClair>
            En souscrivant, vous acceptez ces CGV. Vous recevez un email de confirmation. On peut refuser une commande si on suspecte une fraude.
          </EnClair>
        </Section>

        <Section title="5. Paiement">
          <p>Les paiements sont traités de manière sécurisée par <strong className="text-foreground">Stripe</strong> (Stripe Payments Europe, Ltd — certifié PCI DSS Niveau 1). Carte Visite Digitale ne stocke aucune donnée bancaire.</p>
          <p>Moyens de paiement acceptés : carte bancaire (Visa, Mastercard, American Express, Carte Bleue).</p>
          <p>Pour l'abonnement Vitrine : le paiement est mensuel et reconduit automatiquement chaque mois à la date anniversaire de souscription.</p>
          <p>Pour la carte NFC physique : paiement unique à la commande.</p>
          <EnClair>
            Paiement 100% sécurisé via Stripe. On ne voit jamais votre numéro de carte. L'abonnement se renouvelle chaque mois automatiquement.
          </EnClair>
        </Section>

        <Section title="6. Résiliation de l'abonnement">
          <p><strong className="text-foreground">Comment résilier :</strong> depuis votre tableau de bord → Compte → Gérer l'abonnement, en 1 clic, à tout moment, sans frais ni pénalité.</p>
          <p><strong className="text-foreground">Effet de la résiliation :</strong> la résiliation prend effet à la fin de la période mensuelle en cours. Vous conservez l'accès au plan Vitrine jusqu'à cette date.</p>
          <p><strong className="text-foreground">Remboursement :</strong> aucun remboursement au prorata n'est effectué pour la période entamée. Si vous résiliez le 5 du mois, vous gardez l'accès jusqu'à la fin du mois.</p>
          <p>Pour toute demande exceptionnelle : <strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
          <EnClair>
            Résiliez en 1 clic depuis votre dashboard. Pas d'engagement, pas de frais. Vous gardez l'accès jusqu'à la fin du mois payé.
          </EnClair>
        </Section>

        <Section title="7. Droit de rétractation">
          <p>Conformément à l'article L.221-18 du Code de la consommation, vous disposez d'un délai de <strong className="text-foreground">14 jours</strong> à compter de la souscription pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
          <p>Pour exercer ce droit, contactez-nous par email à <strong className="text-foreground">contact@cartevisitedigitale.fr</strong> en indiquant votre demande de rétractation. Le remboursement interviendra dans les 14 jours suivant la réception de votre demande.</p>
          <p><strong className="text-foreground">Exception :</strong> conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique pas à la carte NFC physique, produit fabriqué sur mesure selon vos spécifications (personnalisation du profil).</p>
          <EnClair>
            Pour l'abonnement : vous avez 14 jours pour changer d'avis et être remboursé intégralement. Pour la carte NFC physique : pas de rétractation possible car elle est personnalisée à votre nom.
          </EnClair>
        </Section>

        <Section title="8. Livraison de la carte NFC physique">
          <p>Les cartes NFC physiques sont expédiées dans un délai de <strong className="text-foreground">5 à 10 jours ouvrés</strong> après validation de la commande, en France métropolitaine.</p>
          <p>Un email de confirmation avec numéro de suivi est envoyé à l'expédition.</p>
          <p>En cas de colis perdu ou endommagé, contactez-nous dans les 30 jours suivant la commande.</p>
          <EnClair>
            Votre carte NFC arrive sous 5 à 10 jours ouvrés. On vous envoie le numéro de suivi par email.
          </EnClair>
        </Section>

        <Section title="9. Disponibilité du service">
          <p>Carte Visite Digitale s'efforce de maintenir le service disponible 24h/24 et 7j/7. Des interruptions temporaires peuvent survenir pour maintenance ou raisons techniques.</p>
          <p>Une indisponibilité du service ne donne pas droit à remboursement, sauf indisponibilité continue supérieure à <strong className="text-foreground">72 heures consécutives</strong> imputable à Carte Visite Digitale, auquel cas un avoir mensuel proratisé sera accordé sur demande.</p>
          <EnClair>
            En cas de panne de plus de 3 jours de notre fait, on vous rembourse les jours perdus. En dessous, c'est inclus dans les aléas normaux du service.
          </EnClair>
        </Section>

        <Section title="10. Protection des données">
          <p>Le traitement de vos données personnelles est détaillé dans notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>, conforme au RGPD. Vos données ne sont jamais revendues à des tiers.</p>
          <EnClair>
            Vos données restent vos données. On ne les vend pas.
          </EnClair>
        </Section>

        <Section title="11. Médiation des litiges">
          <p>En cas de litige non résolu amiablement dans un délai de 2 mois après réclamation écrite adressée à <strong className="text-foreground">contact@cartevisitedigitale.fr</strong>, le consommateur peut recourir gratuitement à la médiation de la consommation.</p>
          <p>La Commission Européenne met à disposition une plateforme de Règlement en Ligne des Litiges (RLL) : <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></p>
          <EnClair>
            Un problème ? Écrivez-nous d'abord. Si on ne trouve pas de solution en 2 mois, vous pouvez saisir un médiateur gratuitement.
          </EnClair>
        </Section>

        <Section title="12. Droit applicable">
          <p>Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence des tribunaux du ressort de Nanterre (92), sauf disposition légale impérative contraire applicable aux consommateurs.</p>
          <EnClair>
            Droit français, tribunal de Nanterre. Vos droits légaux de consommateur restent entiers.
          </EnClair>
        </Section>

        <p className="text-xs text-muted-foreground mt-10 border-t border-border pt-6">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
