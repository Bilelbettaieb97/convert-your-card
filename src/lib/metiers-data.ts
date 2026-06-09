export interface MetierData {
  slug: string;
  templateId: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterDescription: string;
  badge: string;
  h1Line1: string;
  h1Line2: string;
  heroSubtitle: string;
  heroImages: [string, string, string];
  heroSocialProof: string;
  heroCtaLabel: string;
  breadcrumbLabel: string;
  statsHeadline: string;
  statsSubheadline: string;
  stats: [
    { stat: string; label: string; src: string },
    { stat: string; label: string; src: string },
    { stat: string; label: string; src: string },
    { stat: string; label: string; src: string },
  ];
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: Array<{ icon: string; title: string; desc: string }>;
  typesTitle: string;
  typesSubtitle: string;
  types: Array<{ title: string; keyword: string; desc: string; tags: string[] }>;
  stepsTitle: string;
  steps: [
    { n: string; title: string; desc: string },
    { n: string; title: string; desc: string },
    { n: string; title: string; desc: string },
  ];
  comparisonTitle: string;
  comparisonSubtitle: string;
  comparison: Array<{ feature: string; paper: boolean | string; digital: boolean | string }>;
  testimonialsTitle: string;
  testimonials: [
    { quote: string; name: string; role: string; photo: string; duration: string },
    { quote: string; name: string; role: string; photo: string; duration: string },
  ];
  pricingTitle: string;
  pricingSubtitle: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  finalCtaLine1: string;
  finalCtaLine2: string;
  finalCtaSubtitle: string;
  finalCtaButton: string;
  finalCtaSocialProof: string;
  ctaLabel: string;
}

export const METIERS_DATA: MetierData[] = [
  {
    slug: "agent-immobilier",
    templateId: "imm-1",
    seoTitle: "Carte de visite digitale pour Agent Immobilier — CVD | Partagez vos biens en 1 scan",
    seoDescription: "Créez votre carte de visite numérique d'agent immobilier en 3 minutes. Portfolio de biens, prise de RDV, QR code sur panneaux et flyers. Essai gratuit 7 jours sans CB.",
    ogTitle: "Carte de visite digitale pour Agent Immobilier — CVD",
    ogDescription: "La carte de visite numérique pensée pour les agents immobiliers : portfolio de biens, lien de contact direct, QR code sur panneaux. Modifiable à tout moment sans réimpression.",
    twitterDescription: "Carte de visite numérique pour agent immobilier : portfolio de biens, prise de RDV, QR code. Partagez votre profil en 1 scan.",
    badge: "Carte de visite numérique pour agents immobiliers",
    h1Line1: "Carte de visite digitale",
    h1Line2: "pour Agent Immobilier",
    heroSubtitle: "Partagez votre profil d'agent en 1 scan : portfolio de biens, lien de contact direct, avis clients et réseaux sociaux. Fini les contacts perdus après un salon ou une visite.",
    heroImages: ["photo-1519085360753-af0119f7cbe7", "photo-1573497019940-1c28c88b4f3e", "photo-1472099645785-5658abf4ff4e"],
    heroSocialProof: "+150 agents immobiliers utilisent CVD",
    heroCtaLabel: "Créer ma carte gratuitement",
    breadcrumbLabel: "Agent immobilier",
    statsHeadline: "Combien de mandats avez-vous perdus par manque de suivi ?",
    statsSubheadline: "Un prospect rencontré lors d'un salon ou d'une visite qui n'a pas votre contact direct dans les 5 minutes oublie votre nom. La carte de visite digitale pour agent immobilier supprime ce risque.",
    stats: [
      { stat: "88%", label: "des acheteurs recherchent un agent en ligne avant de prendre contact", src: "NAR 2024" },
      { stat: "3×", label: "plus de mandats signés avec un lien de contact direct accessible en 1 scan", src: "Données CVD" },
      { stat: "73%", label: "des cartes papier jetées ou perdues en moins d'une semaine", src: "Adobe 2023" },
      { stat: "0€", label: "de réimpression quand vous changez d'agence, de numéro ou de secteur", src: "" },
    ],
    benefitsTitle: "Tout ce dont un agent immobilier a besoin, en 1 carte numérique",
    benefitsSubtitle: "CVD est conçu pour les professionnels de l'immobilier qui veulent convertir chaque contact en mandat ou en vente.",
    benefits: [
      { icon: "Home", title: "Portfolio de biens intégré", desc: "Affichez vos annonces actives ou votre sélection de biens directement sur votre carte. Vos prospects accèdent à votre offre en 1 tap sans passer par un portail." },
      { icon: "Calendar", title: "Prise de RDV directe", desc: "Intégrez votre lien Calendly ou votre numéro click-to-call. Vos vendeurs et acheteurs organisent une visite ou un estimatif sans délai." },
      { icon: "Users", title: "Avis clients visibles", desc: "Affichez vos témoignages de vendeurs satisfaits et vos résultats (délai de vente, prix obtenu). La preuve sociale, toujours à portée de scan." },
      { icon: "RefreshCw", title: "Toujours à jour", desc: "Vous changez d'agence, de secteur ou de numéro ? Modifiez votre carte en 1 minute — le QR code sur vos panneaux reste identique." },
      { icon: "QrCode", title: "QR code sur panneaux et flyers", desc: "Imprimez votre QR code sur vos panneaux À VENDRE, vos flyers de secteur et votre signature email. Chaque support devient un point de contact." },
      { icon: "BarChart3", title: "Statistiques de consultation", desc: "Suivez combien de prospects ont consulté votre profil, depuis quel support, et optimisez votre prospection de secteur." },
    ],
    typesTitle: "Une carte adaptée à chaque profil d'agent immobilier",
    typesSubtitle: "Agent résidentiel, commercial, mandataire ou luxe — CVD s'adapte à votre spécialité et à votre clientèle.",
    types: [
      {
        title: "Agent immobilier résidentiel",
        keyword: "carte de visite agent immobilier résidentiel",
        desc: "Vous travaillez sur les appartements et maisons en secteur urbain ou périurbain. Votre carte digitale met en avant votre secteur de prédilection, vos annonces actives, vos résultats de vente et votre lien d'estimation en ligne.",
        tags: ["Résidentiel", "Appartements", "Maisons", "Estimation gratuite"],
      },
      {
        title: "Agent immobilier commercial",
        keyword: "carte de visite agent immobilier commercial",
        desc: "Locaux professionnels, entrepôts, fonds de commerce — votre clientèle est exigeante. Votre carte numérique présente vos références B2B, votre expertise sectorielle et votre lien de contact direct pour les dirigeants pressés.",
        tags: ["Locaux pro", "Fonds de commerce", "Entrepôts", "B2B"],
      },
      {
        title: "Mandataire immobilier",
        keyword: "carte de visite mandataire immobilier",
        desc: "Indépendant rattaché à un réseau, votre réputation personnelle est votre actif principal. CVD vous donne une vitrine professionnelle indépendante de votre réseau, avec vos propres témoignages et votre propre QR code.",
        tags: ["Réseau indépendant", "Mandataire", "Prospection", "Multi-secteur"],
      },
      {
        title: "Agent immobilier de prestige",
        keyword: "carte de visite agent immobilier luxe",
        desc: "Votre clientèle haut de gamme attend une image irréprochable. La carte digitale CVD vous offre un profil premium avec palette prestige, sélection de biens d'exception et prise de RDV discrète — à la hauteur de votre positionnement.",
        tags: ["Luxe", "Biens d'exception", "Prestige", "Clientèle premium"],
      },
    ],
    stepsTitle: "Créez votre carte de visite d'agent immobilier en 3 minutes",
    steps: [
      { n: "01", title: "Créez votre profil en 3 minutes", desc: "Entrez votre nom, agence, secteur, photo professionnelle et lien de contact. L'éditeur CVD guide chaque étape sans compétence technique." },
      { n: "02", title: "Obtenez votre QR code", desc: "Votre QR code et votre lien unique sont générés instantanément. Intégrez-les sur vos panneaux À VENDRE, vos flyers de secteur et votre signature email." },
      { n: "03", title: "Convertissez chaque contact", desc: "Le prospect scanne, voit votre profil complet et vous contacte directement. Vous ne perdez plus aucun vendeur ou acheteur potentiel." },
    ],
    comparisonTitle: "Carte papier vs carte de visite digitale pour agent immobilier",
    comparisonSubtitle: "Pourquoi les agents qui passent au numérique ne reviennent jamais en arrière.",
    comparison: [
      { feature: "Portfolio de biens cliquable", paper: false, digital: true },
      { feature: "Lien de prise de RDV direct", paper: false, digital: true },
      { feature: "Avis clients visibles", paper: false, digital: true },
      { feature: "Mise à jour sans réimpression", paper: false, digital: true },
      { feature: "QR code sur panneaux de vente", paper: false, digital: true },
      { feature: "Statistiques de consultation", paper: false, digital: true },
      { feature: "Coût sur le long terme", paper: "Réimpression à chaque modif", digital: "Inclus dans l'abonnement" },
      { feature: "Perte ou oubli possible", paper: true, digital: false },
    ],
    testimonialsTitle: "Ce que disent les agents immobiliers qui utilisent CVD",
    testimonials: [
      {
        quote: "Depuis que j'ai mis mon QR code CVD sur mes panneaux À VENDRE, je reçois des appels de propriétaires qui ont scanné le panneau devant leur maison. En 3 mois, j'ai signé 4 mandats supplémentaires directement grâce à ça.",
        name: "Camille D.",
        role: "Agent immobilier · Paris 15e",
        photo: "photo-1573497019940-1c28c88b4f3e",
        duration: "Cliente CVD depuis 9 mois",
      },
      {
        quote: "J'ai arrêté de commander des cartes papier. Avec CVD, quand je change d'agence ou de numéro, je modifie mon profil en 2 minutes et tous mes QR codes sont automatiquement mis à jour. Un gain de temps et d'argent considérable.",
        name: "Julien M.",
        role: "Mandataire immobilier · Lyon",
        photo: "photo-1507003211169-0a1dd7228f2d",
        duration: "Client CVD depuis 11 mois",
      },
    ],
    pricingTitle: "Un seul mandat converti rentabilise votre abonnement pour l'année",
    pricingSubtitle: "Soit moins qu'une boîte de cartes papier.",
    faqTitle: "Questions fréquentes sur la carte de visite digitale pour agent immobilier",
    faqs: [
      {
        q: "À quoi sert une carte de visite digitale pour un agent immobilier ?",
        a: "Elle centralise tout ce dont votre prospect a besoin : votre photo professionnelle, votre agence, votre secteur, vos annonces actives, vos avis clients et votre lien de prise de RDV. En 1 scan de QR code après une visite ou un salon, la personne accède à votre profil complet et peut vous contacter directement.",
      },
      {
        q: "Puis-je mettre mon QR code CVD sur mes panneaux À VENDRE ?",
        a: "Oui, c'est l'un des usages les plus efficaces. Vous imprimez votre QR code CVD sur vos panneaux, vos flyers de prospection et vos vitres d'agence. Les passants qui scannent accèdent à votre profil complet et à vos autres biens. Le QR code ne change jamais, même si vous modifiez votre profil.",
      },
      {
        q: "Puis-je afficher mes annonces immobilières sur ma carte de visite digitale ?",
        a: "Oui. CVD vous permet d'ajouter des boutons d'action qui redirigent vers vos annonces SeLoger, Leboncoin, Logic-Immo ou votre site d'agence. Vos prospects voient votre offre complète en 1 tap depuis votre profil.",
      },
      {
        q: "La carte de visite digitale fonctionne-t-elle pour tous les types d'agents immobiliers ?",
        a: "Oui. CVD est utilisé par des agents résidentiels, des agents commerciaux, des mandataires indépendants et des agents spécialisés dans le luxe. Le profil est entièrement personnalisable selon votre spécialité, votre secteur et votre positionnement.",
      },
      {
        q: "Combien coûte une carte de visite digitale pour agent immobilier ?",
        a: "L'offre Essentielle est à 9,80€/mois sans engagement, avec essai gratuit 7 jours sans CB. L'offre Vitrine à 13,16€/mois ajoute les avis clients visibles, les statistiques de consultation et la section profil enrichie.",
      },
      {
        q: "Puis-je modifier ma carte si je change d'agence ou de numéro de téléphone ?",
        a: "Oui, à tout moment depuis votre tableau de bord. Vous modifiez votre agence, votre numéro ou votre secteur en moins d'une minute. Les modifications sont visibles immédiatement sur votre QR code existant — sans réimpression, sans coût supplémentaire.",
      },
      {
        q: "Comment partager ma carte de visite digitale en tant qu'agent immobilier ?",
        a: "Plusieurs façons : (1) faire scanner le QR code lors d'une visite ou d'un salon immobilier, (2) imprimer le QR code sur vos panneaux À VENDRE et vos flyers, (3) envoyer le lien par SMS ou WhatsApp après un appel entrant, (4) l'intégrer dans votre signature email.",
      },
      {
        q: "La carte de visite numérique fonctionne-t-elle sans application pour mes clients ?",
        a: "Absolument. Vos vendeurs et acheteurs ouvrent votre carte directement dans leur navigateur mobile — iPhone ou Android. Aucune installation, aucun téléchargement requis de leur côté.",
      },
      {
        q: "Puis-je afficher mes avis Google ou SeLoger sur ma carte ?",
        a: "Oui. Avec l'offre Vitrine, vous pouvez afficher jusqu'à 5 témoignages clients sur votre profil CVD. Vous pouvez également ajouter un lien vers votre page d'avis Google My Business ou SeLoger Pro.",
      },
      {
        q: "Y a-t-il un engagement minimum ou un contrat ?",
        a: "Non. Les abonnements CVD sont sans engagement, sans contrat et annulables à tout moment depuis votre espace client. Vous bénéficiez également d'une garantie satisfait ou remboursé de 30 jours.",
      },
    ],
    finalCtaLine1: "Prêt à ne plus perdre",
    finalCtaLine2: "aucun prospect immobilier ?",
    finalCtaSubtitle: "Créez votre carte de visite digitale d'agent immobilier en 3 minutes. Essai gratuit 7 jours, sans carte bancaire.",
    finalCtaButton: "Créer ma carte gratuitement",
    finalCtaSocialProof: "+150 agents immobiliers sur CVD · 4,9★ · Garantie 30 jours",
    ctaLabel: "Planifier une visite",
  },
];
