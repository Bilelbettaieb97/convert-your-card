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
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

type CookieRow = { name: string; provider: string; purpose: string; duration: string };

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Cookie</th>
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Fournisseur</th>
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Finalité</th>
            <th className="text-left py-2 font-semibold text-foreground">Durée</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/50">
              <td className="py-2 pr-4 font-mono text-foreground">{r.name}</td>
              <td className="py-2 pr-4">{r.provider}</td>
              <td className="py-2 pr-4">{r.purpose}</td>
              <td className="py-2">{r.duration}</td>
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
        <p className="text-sm text-muted-foreground mb-10">Conforme au RGPD et aux recommandations de la CNIL — En vigueur au 1er juin 2026</p>

        <Section title="1. Qu'est-ce qu'un cookie ?">
          <p>Un cookie est un petit fichier texte déposé sur votre navigateur lors de la visite d'un site web. Il permet de mémoriser des informations sur votre navigation et d'améliorer votre expérience.</p>
        </Section>

        <Section title="2. Cookies strictement nécessaires">
          <p>Ces cookies sont indispensables au fonctionnement du site. Ils ne nécessitent pas votre consentement.</p>
          <CookieTable rows={[
            { name: "sb-*", provider: "Supabase", purpose: "Session d'authentification et maintien de connexion", duration: "7 jours" },
            { name: "cyk.card.v1", provider: "cartevisitedigitale.fr", purpose: "Sauvegarde locale de votre carte (localStorage)", duration: "Permanent (local)" },
          ]} />
        </Section>

        <Section title="3. Cookies analytiques">
          <p>Ces cookies nous permettent de mesurer l'audience du site et d'améliorer nos services. Ils sont déposés uniquement avec votre consentement.</p>
          <CookieTable rows={[
            { name: "_ga, _ga_*", provider: "Google Analytics (GA4)", purpose: "Mesure d'audience anonymisée (pages vues, sessions, sources)", duration: "13 mois" },
            { name: "_gid", provider: "Google Analytics", purpose: "Identification de session pour les statistiques", duration: "24 heures" },
          ]} />
        </Section>

        <Section title="4. Cookies publicitaires">
          <p>Ces cookies sont utilisés pour diffuser des publicités pertinentes sur nos campagnes Meta (Facebook / Instagram). Ils sont déposés uniquement avec votre consentement.</p>
          <CookieTable rows={[
            { name: "_fbp", provider: "Meta (Facebook)", purpose: "Ciblage publicitaire et mesure des conversions", duration: "90 jours" },
            { name: "_fbc", provider: "Meta (Facebook)", purpose: "Attribution des clics publicitaires", duration: "90 jours" },
          ]} />
        </Section>

        <Section title="5. Gérer vos préférences">
          <p>Vous pouvez à tout moment modifier vos préférences cookies :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong className="text-foreground">Via votre navigateur :</strong> les paramètres de votre navigateur vous permettent de bloquer ou supprimer les cookies (Chrome → Paramètres → Confidentialité, Firefox → Préférences → Vie privée)</li>
            <li><strong className="text-foreground">Google Analytics :</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#c026d3] hover:underline" target="_blank" rel="noopener noreferrer">Extension de désinscription Google Analytics</a></li>
            <li><strong className="text-foreground">Meta :</strong> <a href="https://www.facebook.com/ads/preferences" className="text-[#c026d3] hover:underline" target="_blank" rel="noopener noreferrer">Préférences publicitaires Meta</a></li>
          </ul>
          <p className="mt-2">Le refus des cookies analytiques et publicitaires n'affecte pas le fonctionnement du service.</p>
        </Section>

        <Section title="6. Contact">
          <p>Pour toute question relative aux cookies : <strong className="text-foreground">contact@cartevisitedigitale.fr</strong></p>
        </Section>

        <p className="text-xs text-muted-foreground mt-10">Dernière mise à jour : juin 2026</p>
      </div>
    </div>
  );
}
