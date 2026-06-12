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

function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mentions légales</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
        </p>

        <Section title="1. Éditeur du site">
          <p><strong className="text-foreground">Responsable de publication :</strong> Bilel Bettaieb</p>
          <p><strong className="text-foreground">Activité :</strong> Micro-entreprise — services numériques</p>
          <p><strong className="text-foreground">Adresse :</strong> Rueil-Malmaison, 92500, Île-de-France, France</p>
          <p><strong className="text-foreground">Email :</strong> contact@cartevisitedigitale.fr</p>
          <p><strong className="text-foreground">Téléphone :</strong> 06 16 47 72 45</p>
          <EnClair>
            Ce site est édité et géré personnellement par Bilel Bettaieb, depuis Rueil-Malmaison (92). Vous pouvez le contacter directement par email ou téléphone.
          </EnClair>
        </Section>

        <Section title="2. Hébergement">
          <p><strong className="text-foreground">Hébergeur web :</strong> Vercel Inc.</p>
          <p>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
          <p>Site : <a href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          <p className="mt-2"><strong className="text-foreground">Base de données :</strong> Supabase Inc.</p>
          <p>Données stockées en Europe — région eu-west-3 (Paris, France)</p>
          <p>Site : <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a></p>
          <EnClair>
            Votre carte de visite digitale est hébergée sur des serveurs Vercel (États-Unis) et vos données personnelles sont stockées en Europe (Paris) chez Supabase.
          </EnClair>
        </Section>

        <Section title="3. Propriété intellectuelle">
          <p>L'ensemble des éléments constituant ce site — textes, visuels, logotypes, code source, architecture — sont la propriété exclusive de Bilel Bettaieb, sauf mentions contraires.</p>
          <p>Toute reproduction, représentation, modification ou exploitation partielle ou totale, sans autorisation écrite préalable, est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
          <p>Les marques et logos de tiers éventuellement présents sur le site appartiennent à leurs propriétaires respectifs.</p>
          <EnClair>
            Vous ne pouvez pas copier ou réutiliser le contenu de ce site sans permission écrite. Le contenu que vous créez sur votre carte de visite vous appartient entièrement.
          </EnClair>
        </Section>

        <Section title="4. Données personnelles et RGPD">
          <p>Le traitement des données personnelles collectées sur ce site est détaillé dans notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.</p>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679), vous disposez de droits d'accès, de rectification, de suppression et de portabilité de vos données.</p>
          <p>Pour exercer vos droits : <strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
          <p>En cas de litige non résolu, vous pouvez saisir la <strong className="text-foreground">CNIL</strong> : <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">cnil.fr</a></p>
          <EnClair>
            Vos données sont protégées selon la loi européenne. Vous pouvez demander à tout moment à les voir, les corriger ou les supprimer.
          </EnClair>
        </Section>

        <Section title="5. Cookies">
          <p>Ce site utilise des cookies pour le bon fonctionnement du service (authentification) et des cookies analytiques et publicitaires déposés avec votre consentement (Google Analytics, Meta Pixel).</p>
          <p>Pour en savoir plus : <a href="/cookies" className="text-primary hover:underline">Politique de cookies</a></p>
          <EnClair>
            On utilise des cookies obligatoires pour que vous restiez connecté, et des cookies d'analyse uniquement si vous acceptez.
          </EnClair>
        </Section>

        <Section title="6. Limitation de responsabilité">
          <p>Bilel Bettaieb s'efforce de maintenir les informations de ce site à jour et exactes, mais ne peut garantir l'exactitude ou l'exhaustivité des contenus publiés.</p>
          <p>La responsabilité de l'éditeur ne peut être engagée en cas d'erreurs, d'omissions, ou d'indisponibilité temporaire du service pour des raisons techniques indépendantes de sa volonté.</p>
          <p>L'éditeur ne peut être tenu responsable du contenu des sites tiers vers lesquels ce site renvoie.</p>
          <EnClair>
            On fait notre maximum pour que tout soit juste et disponible, mais on ne peut pas être tenu responsable d'une panne technique ou d'un contenu externe.
          </EnClair>
        </Section>

        <Section title="7. Droit applicable">
          <p>Les présentes mentions légales sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux du ressort de Nanterre (92).</p>
          <EnClair>
            En cas de problème juridique, c'est le droit français qui s'applique et les tribunaux de Nanterre qui sont compétents.
          </EnClair>
        </Section>

        <p className="text-xs text-muted-foreground mt-10 border-t border-border pt-6">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
