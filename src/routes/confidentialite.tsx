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

function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Conforme au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) — En vigueur au 1er juin 2026
        </p>

        <Section title="1. Responsable du traitement">
          <p><strong className="text-foreground">Bilel Bettaieb</strong> — Micro-entrepreneur</p>
          <p>Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p>Email : <strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
          <p>Téléphone : 06 16 47 72 45</p>
          <EnClair>
            C'est Bilel Bettaieb qui est responsable de vos données. Vous pouvez le contacter directement par email ou téléphone pour toute question.
          </EnClair>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Données d'inscription :</strong> adresse email (obligatoire), mot de passe chiffré</li>
            <li><strong className="text-foreground">Données de profil :</strong> nom, prénom, titre, entreprise, photo, bio, liens, coordonnées — que vous saisissez librement pour créer votre carte</li>
            <li><strong className="text-foreground">Données de connexion :</strong> adresse IP, navigateur, date et heure de connexion (logs de sécurité)</li>
            <li><strong className="text-foreground">Données de paiement :</strong> traitement exclusif par Stripe — nous ne stockons aucune donnée bancaire, uniquement l'identifiant client Stripe</li>
            <li><strong className="text-foreground">Données d'utilisation de votre carte :</strong> nombre de vues, clics sur les boutons, villes de provenance — données agrégées et anonymisées</li>
            <li><strong className="text-foreground">Données analytiques du site :</strong> pages visitées, durée de session (Google Analytics, Meta Pixel — avec consentement)</li>
          </ul>
          <EnClair>
            On collecte votre email pour votre compte, ce que vous mettez sur votre carte (c'est vous qui décidez), et des statistiques anonymes sur les visites. Pas de données bancaires chez nous.
          </EnClair>
        </Section>

        <Section title="3. Finalités du traitement">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Création, personnalisation et affichage de votre carte de visite digitale</li>
            <li>Gestion de votre compte, de votre abonnement et des paiements</li>
            <li>Envoi d'emails transactionnels (confirmation d'inscription, factures, alertes de sécurité)</li>
            <li>Affichage de statistiques de consultation de votre carte (analytics)</li>
            <li>Amélioration du service et analyse d'audience globale du site</li>
            <li>Prévention de la fraude et sécurité du service</li>
            <li>Respect des obligations légales et fiscales</li>
          </ul>
          <EnClair>
            Vos données servent uniquement à faire fonctionner le service que vous avez demandé, vous envoyer des emails utiles, et améliorer le produit. Pas de publicité avec vos données personnelles.
          </EnClair>
        </Section>

        <Section title="4. Base légale du traitement">
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong className="text-foreground">Exécution du contrat (Art. 6.1.b RGPD) :</strong> création de compte, affichage de la carte, gestion de l'abonnement</li>
            <li><strong className="text-foreground">Consentement (Art. 6.1.a RGPD) :</strong> cookies analytiques (GA4), cookies publicitaires (Meta Pixel), communications marketing</li>
            <li><strong className="text-foreground">Intérêt légitime (Art. 6.1.f RGPD) :</strong> sécurité du service, prévention de la fraude, amélioration du produit</li>
            <li><strong className="text-foreground">Obligation légale (Art. 6.1.c RGPD) :</strong> conservation des données comptables et fiscales</li>
          </ul>
          <EnClair>
            On a une raison légale pour chaque utilisation de vos données. On ne traite que ce dont on a besoin pour la raison prévue.
          </EnClair>
        </Section>

        <Section title="5. Durée de conservation">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Données de compte et de carte :</strong> pendant toute la durée de l'abonnement actif + 3 ans après résiliation (prescription commerciale)</li>
            <li><strong className="text-foreground">Données de paiement et factures :</strong> 10 ans (obligation comptable légale)</li>
            <li><strong className="text-foreground">Logs de connexion :</strong> 12 mois (obligation légale LCEN)</li>
            <li><strong className="text-foreground">Cookies analytiques :</strong> 13 mois maximum (recommandation CNIL)</li>
            <li><strong className="text-foreground">Données supprimées à votre demande :</strong> effacement dans les 30 jours, sauf obligations légales de conservation</li>
          </ul>
          <EnClair>
            On garde vos données le temps nécessaire au service, puis on les supprime. Les données de paiement sont conservées 10 ans pour la comptabilité — c'est la loi.
          </EnClair>
        </Section>

        <Section title="6. Sous-traitants et transferts hors UE">
          <p>Vos données peuvent être transmises aux prestataires suivants, uniquement pour réaliser leur mission :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Supabase</strong> (base de données) — données stockées en Europe, région eu-west-3 (Paris, France) — <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">politique de confidentialité</a></li>
            <li><strong className="text-foreground">Stripe</strong> (paiement) — certifié PCI DSS Niveau 1 — transfert hors UE encadré par clauses contractuelles types (CCT) — <a href="https://stripe.com/fr/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">politique de confidentialité</a></li>
            <li><strong className="text-foreground">Resend</strong> (emails transactionnels) — États-Unis — clauses contractuelles types UE</li>
            <li><strong className="text-foreground">Vercel</strong> (hébergement web) — États-Unis — clauses contractuelles types UE — <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">politique de confidentialité</a></li>
            <li><strong className="text-foreground">Google Analytics GA4</strong> (audience) — États-Unis — anonymisation IP activée — avec votre consentement</li>
            <li><strong className="text-foreground">Meta Pixel</strong> (publicité) — États-Unis — avec votre consentement explicite</li>
          </ul>
          <p className="mt-2">Aucune de ces données n'est vendue à des tiers. Chaque prestataire n'accède qu'aux données strictement nécessaires à sa mission.</p>
          <EnClair>
            On utilise des prestataires de confiance pour faire fonctionner le service. Certains sont aux États-Unis mais encadrés par des garanties légales européennes. On ne vend vos données à personne.
          </EnClair>
        </Section>

        <Section title="7. Vos droits (RGPD)">
          <p>Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong className="text-foreground">Droit d'accès (Art. 15) :</strong> obtenir une copie de l'ensemble de vos données personnelles</li>
            <li><strong className="text-foreground">Droit de rectification (Art. 16) :</strong> corriger des données inexactes ou incomplètes</li>
            <li><strong className="text-foreground">Droit à l'effacement (Art. 17) :</strong> demander la suppression de vos données (« droit à l'oubli »)</li>
            <li><strong className="text-foreground">Droit à la portabilité (Art. 20) :</strong> recevoir vos données dans un format structuré et lisible par machine</li>
            <li><strong className="text-foreground">Droit d'opposition (Art. 21) :</strong> vous opposer à certains traitements, notamment à des fins marketing</li>
            <li><strong className="text-foreground">Droit à la limitation (Art. 18) :</strong> demander la suspension temporaire d'un traitement</li>
            <li><strong className="text-foreground">Droit de retirer le consentement :</strong> à tout moment, sans préjudice des traitements antérieurs</li>
          </ul>
          <p className="mt-3">
            <strong className="text-foreground">Comment exercer vos droits :</strong> envoyez un email à <strong className="text-foreground">contact@cartevisitedigitale.fr</strong> en précisant votre demande. Réponse garantie sous 30 jours.
          </p>
          <p>En cas de litige non résolu, vous pouvez saisir la <strong className="text-foreground">CNIL</strong> en ligne sur <a href="https://www.cnil.fr/fr/plaintes" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">cnil.fr/fr/plaintes</a> ou par courrier : CNIL, 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07.</p>
          <EnClair>
            Vous avez le contrôle total sur vos données. Demandez à les voir, les corriger, les supprimer ou les exporter à tout moment. On vous répond sous 30 jours.
          </EnClair>
        </Section>

        <Section title="8. Cookies">
          <p>Ce site utilise trois catégories de cookies :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Cookies essentiels :</strong> session d'authentification Supabase, préférences locales — sans consentement requis (strictement nécessaires)</li>
            <li><strong className="text-foreground">Cookies analytiques (GA4) :</strong> mesure d'audience anonymisée — déposés uniquement avec votre consentement</li>
            <li><strong className="text-foreground">Cookies publicitaires (Meta Pixel) :</strong> ciblage et mesure de nos campagnes publicitaires — déposés uniquement avec votre consentement</li>
          </ul>
          <p className="mt-2">Vous pouvez retirer votre consentement à tout moment. Consulter notre <a href="/cookies" className="text-primary hover:underline">Politique de cookies complète</a> pour le détail de chaque cookie.</p>
          <EnClair>
            Les cookies de connexion sont obligatoires pour que ça fonctionne. Les autres (stats, pub) sont optionnels et ne sont déposés qu'avec votre accord.
          </EnClair>
        </Section>

        <Section title="9. Sécurité des données">
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre tout accès non autorisé, perte ou divulgation :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Chiffrement des communications via TLS/HTTPS</li>
            <li>Chiffrement des mots de passe (bcrypt via Supabase Auth)</li>
            <li>Row Level Security (RLS) sur la base de données — chaque utilisateur ne voit que ses propres données</li>
            <li>Tokens d'authentification sécurisés avec expiration automatique</li>
            <li>Accès aux données de production restreint aux seules personnes autorisées</li>
          </ul>
          <p className="mt-2">En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits, vous serez notifié dans les délais prévus par le RGPD (72h pour la CNIL, sans délai indu pour les personnes concernées).</p>
          <EnClair>
            Vos données sont chiffrées, cloisonnées et protégées. En cas de problème de sécurité, on vous préviendra rapidement.
          </EnClair>
        </Section>

        <Section title="10. Modifications de cette politique">
          <p>Cette politique de confidentialité peut être mise à jour pour refléter les évolutions de notre service ou de la réglementation applicable.</p>
          <p>En cas de modification substantielle, vous serez informé par email au moins 15 jours avant l'entrée en vigueur des changements. La date de dernière mise à jour est indiquée en bas de page.</p>
          <EnClair>
            Si on change quelque chose d'important, on vous prévient par email 15 jours avant. Vous pouvez toujours supprimer votre compte si ça ne vous convient pas.
          </EnClair>
        </Section>

        <p className="text-xs text-muted-foreground mt-10 border-t border-border pt-6">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
