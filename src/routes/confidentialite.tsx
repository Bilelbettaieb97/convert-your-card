import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Carte Visite Digitale" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfidentialitePage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-muted-foreground mb-10">Conforme au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) — En vigueur au 1er juin 2026</p>

        <Section title="1. Responsable du traitement">
          <p><strong className="text-foreground">Bilel Bettaieb</strong></p>
          <p>Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p>Email : contact@cartevisitedigitale.fr</p>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Données d'inscription :</strong> adresse email, nom, numéro de téléphone (optionnel)</li>
            <li><strong className="text-foreground">Données de profil :</strong> nom, prénom, titre, entreprise, photo, bio, liens, coordonnées — que vous saisissez pour créer votre carte</li>
            <li><strong className="text-foreground">Données de connexion :</strong> adresse IP, navigateur, date et heure de connexion</li>
            <li><strong className="text-foreground">Données de paiement :</strong> traité exclusivement par Stripe — nous ne stockons aucune donnée bancaire</li>
            <li><strong className="text-foreground">Données d'utilisation :</strong> pages visitées, clics sur votre carte (analytics anonymisés)</li>
            <li><strong className="text-foreground">Cookies :</strong> cookies de session, cookies analytiques (Google Analytics, Meta Pixel)</li>
          </ul>
        </Section>

        <Section title="3. Finalités du traitement">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Création et gestion de votre compte et de votre carte de visite digitale</li>
            <li>Traitement des paiements et gestion des abonnements</li>
            <li>Envoi d'emails transactionnels (confirmation, relances, notifications)</li>
            <li>Amélioration du service et analyse d'audience</li>
            <li>Respect des obligations légales et fiscales</li>
          </ul>
        </Section>

        <Section title="4. Base légale">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Exécution du contrat</strong> : création de compte, gestion de l'abonnement</li>
            <li><strong className="text-foreground">Consentement</strong> : cookies analytiques, emails marketing</li>
            <li><strong className="text-foreground">Intérêt légitime</strong> : sécurité du service, prévention de la fraude</li>
            <li><strong className="text-foreground">Obligation légale</strong> : conservation des données comptables</li>
          </ul>
        </Section>

        <Section title="5. Durée de conservation">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Données de compte :</strong> durée de l'abonnement + 3 ans après résiliation</li>
            <li><strong className="text-foreground">Données de paiement :</strong> 10 ans (obligation comptable légale)</li>
            <li><strong className="text-foreground">Logs de connexion :</strong> 12 mois</li>
            <li><strong className="text-foreground">Cookies analytiques :</strong> 13 mois maximum</li>
          </ul>
        </Section>

        <Section title="6. Sous-traitants et transferts">
          <p>Vos données peuvent être transmises aux prestataires suivants, dans le cadre de leur mission uniquement :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Supabase</strong> (base de données) — serveurs en Europe (eu-west-3, Paris)</li>
            <li><strong className="text-foreground">Stripe</strong> (paiement) — certifié PCI DSS, transfert encadré par clauses contractuelles types</li>
            <li><strong className="text-foreground">Resend</strong> (emails transactionnels) — États-Unis, clauses contractuelles types UE</li>
            <li><strong className="text-foreground">Vercel</strong> (hébergement) — États-Unis, clauses contractuelles types UE</li>
            <li><strong className="text-foreground">Google Analytics</strong> (audience) — États-Unis, anonymisation IP activée</li>
            <li><strong className="text-foreground">Meta Pixel</strong> (publicité) — États-Unis, avec votre consentement</li>
          </ul>
        </Section>

        <Section title="7. Vos droits (RGPD)">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Accès</strong> : obtenir une copie de vos données personnelles</li>
            <li><strong className="text-foreground">Rectification</strong> : corriger des données inexactes</li>
            <li><strong className="text-foreground">Suppression</strong> : demander l'effacement de vos données</li>
            <li><strong className="text-foreground">Portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong className="text-foreground">Opposition</strong> : vous opposer à certains traitements</li>
            <li><strong className="text-foreground">Limitation</strong> : limiter le traitement dans certains cas</li>
          </ul>
          <p className="mt-3">Pour exercer vos droits, contactez : <strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
          <p>Réponse sous 30 jours. En cas de litige, vous pouvez saisir la <strong className="text-foreground">CNIL</strong> : <a href="https://www.cnil.fr" className="text-[#c026d3] hover:underline" target="_blank" rel="noopener noreferrer">cnil.fr</a></p>
        </Section>

        <Section title="8. Cookies">
          <p>Ce site utilise les cookies suivants :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Cookies essentiels :</strong> session d'authentification, préférences — sans consentement (nécessaires au fonctionnement)</li>
            <li><strong className="text-foreground">Google Analytics (GA4) :</strong> mesure d'audience anonymisée — avec consentement</li>
            <li><strong className="text-foreground">Meta Pixel :</strong> ciblage publicitaire — avec consentement</li>
          </ul>
          <p className="mt-2">Vous pouvez retirer votre consentement à tout moment via les paramètres de votre navigateur ou en nous contactant.</p>
        </Section>

        <Section title="9. Sécurité">
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement TLS, accès restreint aux données, Row Level Security (RLS) sur la base de données, tokens d'authentification sécurisés.</p>
        </Section>

        <Section title="10. Modifications">
          <p>Cette politique peut être mise à jour. En cas de modification substantielle, vous serez informé par email. La date de dernière mise à jour est indiquée en bas de page.</p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
