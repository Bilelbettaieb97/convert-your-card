import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique de cookies — Carte Visite Digitale" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CookiesPage,
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

type CookieRow = { name: string; provider: string; purpose: string; duration: string; consent: string };

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-3 font-semibold text-foreground">Cookie</th>
            <th className="text-left py-2 pr-3 font-semibold text-foreground">Fournisseur</th>
            <th className="text-left py-2 pr-3 font-semibold text-foreground">Finalité</th>
            <th className="text-left py-2 pr-3 font-semibold text-foreground">Durée</th>
            <th className="text-left py-2 font-semibold text-foreground">Consentement</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/50">
              <td className="py-2 pr-3 font-mono text-foreground">{r.name}</td>
              <td className="py-2 pr-3">{r.provider}</td>
              <td className="py-2 pr-3">{r.purpose}</td>
              <td className="py-2 pr-3 whitespace-nowrap">{r.duration}</td>
              <td className="py-2 whitespace-nowrap">{r.consent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Politique de cookies</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Conforme au RGPD et aux recommandations de la CNIL — En vigueur au 1er juin 2026
        </p>

        <Section title="1. Qu'est-ce qu'un cookie ?">
          <p>Un cookie est un petit fichier texte déposé sur votre navigateur lorsque vous visitez un site web. Il peut contenir des informations sur votre navigation, vos préférences ou votre session de connexion.</p>
          <p>Les cookies ont une durée de vie limitée et sont automatiquement supprimés à leur expiration. Vous pouvez les supprimer à tout moment depuis les paramètres de votre navigateur.</p>
          <EnClair>
            Un cookie, c'est une petite note que votre navigateur garde pour se souvenir de vous. Rien de mystérieux — et vous pouvez les supprimer quand vous voulez.
          </EnClair>
        </Section>

        <Section title="2. Cookies strictement nécessaires">
          <p>Ces cookies sont indispensables au fonctionnement du site et du service. Ils ne nécessitent pas votre consentement (article 82 de la loi Informatique et Libertés).</p>
          <CookieTable rows={[
            {
              name: "sb-*-auth-token",
              provider: "Supabase",
              purpose: "Maintien de votre session de connexion sécurisée",
              duration: "7 jours",
              consent: "Non requis",
            },
            {
              name: "sb-*-auth-token-code-verifier",
              provider: "Supabase",
              purpose: "Sécurisation du flux d'authentification OAuth",
              duration: "Session",
              consent: "Non requis",
            },
            {
              name: "cyk.card.v1",
              provider: "cartevisitedigitale.fr",
              purpose: "Sauvegarde locale temporaire de votre carte (localStorage)",
              duration: "Permanent (local)",
              consent: "Non requis",
            },
          ]} />
          <EnClair>
            Ces cookies vous maintiennent connecté et sauvegardent votre travail localement. Sans eux, le service ne fonctionne pas. C'est pour ça qu'on ne demande pas votre avis.
          </EnClair>
        </Section>

        <Section title="3. Cookies analytiques">
          <p>Ces cookies nous permettent de comprendre comment les visiteurs utilisent le site, quelles pages sont les plus consultées, et d'améliorer notre service en continu. Ils sont déposés uniquement avec votre consentement préalable.</p>
          <p>Les données collectées sont anonymisées et agrégées — elles ne permettent pas de vous identifier personnellement.</p>
          <CookieTable rows={[
            {
              name: "_ga",
              provider: "Google Analytics (GA4)",
              purpose: "Identification unique du navigateur pour les statistiques d'audience",
              duration: "13 mois",
              consent: "Requis",
            },
            {
              name: "_ga_XXXXXXX",
              provider: "Google Analytics (GA4)",
              purpose: "Maintien de l'état de session pour Google Analytics",
              duration: "13 mois",
              consent: "Requis",
            },
            {
              name: "_gid",
              provider: "Google Analytics",
              purpose: "Distinction des sessions sur 24h pour les statistiques",
              duration: "24 heures",
              consent: "Requis",
            },
          ]} />
          <p className="mt-3">Google Analytics est configuré avec l'anonymisation des adresses IP activée. Aucune donnée personnelle identifiante n'est transmise à Google.</p>
          <p>Pour en savoir plus : <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Politique de confidentialité Google</a></p>
          <EnClair>
            Ces cookies nous disent combien de gens visitent le site et quelles pages sont populaires. Les adresses IP sont anonymisées. On ne sait pas qui vous êtes, juste qu'il y a eu une visite.
          </EnClair>
        </Section>

        <Section title="4. Cookies publicitaires">
          <p>Ces cookies sont utilisés pour mesurer l'efficacité de nos campagnes publicitaires sur Meta (Facebook et Instagram) et pour diffuser des publicités pertinentes aux personnes susceptibles d'être intéressées par notre service. Ils sont déposés uniquement avec votre consentement explicite.</p>
          <CookieTable rows={[
            {
              name: "_fbp",
              provider: "Meta (Facebook / Instagram)",
              purpose: "Identification du navigateur pour la mesure des conversions publicitaires",
              duration: "90 jours",
              consent: "Requis",
            },
            {
              name: "_fbc",
              provider: "Meta (Facebook / Instagram)",
              purpose: "Attribution d'un clic sur une publicité Facebook/Instagram",
              duration: "90 jours",
              consent: "Requis",
            },
          ]} />
          <p className="mt-3">L'ID du Pixel Meta utilisé est : <strong className="text-foreground">517991158551582</strong></p>
          <p>Pour en savoir plus : <a href="https://fr-fr.facebook.com/privacy/policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Politique de confidentialité Meta</a></p>
          <EnClair>
            Ces cookies permettent à Meta de savoir qu'une personne a visité notre site et a ensuite souscrit via une pub Facebook ou Instagram. Refuser ces cookies n'affecte pas votre utilisation du service.
          </EnClair>
        </Section>

        <Section title="5. Gérer vos préférences cookies">
          <p>Vous pouvez gérer vos préférences cookies à tout moment :</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong className="text-foreground">Via votre navigateur :</strong> les paramètres de votre navigateur vous permettent de bloquer ou supprimer les cookies.
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                <li><a href="https://support.mozilla.org/fr/kb/effacer-cookies-donnees-site-firefox" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
              </ul>
            </li>
            <li>
              <strong className="text-foreground">Google Analytics :</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Extension de désinscription Google Analytics</a>
            </li>
            <li>
              <strong className="text-foreground">Meta :</strong> <a href="https://www.facebook.com/ads/preferences" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Préférences publicitaires Meta</a> — ou l'outil <a href="https://optout.aboutads.info/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">About Ads</a>
            </li>
          </ul>
          <p className="mt-3">Le refus des cookies analytiques et publicitaires n'affecte en aucun cas le fonctionnement de votre carte de visite digitale.</p>
          <EnClair>
            Vous pouvez refuser tous les cookies optionnels sans que ça change quoi que ce soit à votre carte. Votre service reste complet.
          </EnClair>
        </Section>

        <Section title="6. Durée de conservation">
          <p>Les cookies sont automatiquement supprimés à leur expiration. Vous pouvez les supprimer manuellement à tout moment depuis les paramètres de votre navigateur.</p>
          <p>La durée maximale de conservation d'un cookie soumis à consentement est de 13 mois, conformément aux recommandations de la CNIL.</p>
          <EnClair>
            Les cookies disparaissent d'eux-mêmes après leur durée de vie, ou vous pouvez les effacer manuellement depuis votre navigateur.
          </EnClair>
        </Section>

        <Section title="7. Contact">
          <p>Pour toute question relative aux cookies ou pour exercer vos droits RGPD :</p>
          <p><strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
          <p>Voir aussi notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité complète</a>.</p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10 border-t border-border pt-6">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
