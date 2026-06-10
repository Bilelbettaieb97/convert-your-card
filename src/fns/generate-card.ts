import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CardData, BrickId, ThemeAccent } from "@/lib/card-types";

const schema = z.object({
  input: z.string().min(3).max(400),
});

export type GeneratedCard = Partial<CardData>;

// Ordre de sections fixe — toujours respecté
// identity → actions → stats → socials → about → vcard → cta → services → testimonials → contact
// (gallery peut s'insérer après stats pour les métiers visuels)
const BASE_ORDER: BrickId[] = [
  "identity", "actions", "stats", "socials", "about", "vcard",
  "cta", "services", "testimonials", "contact",
  "calendar", "gallery", "listings", "video", "languages", "theme",
];

const VISUAL_ORDER: BrickId[] = [
  "identity", "actions", "stats", "gallery", "socials", "about", "vcard",
  "cta", "services", "testimonials", "contact",
  "calendar", "listings", "video", "languages", "theme",
];

const SYSTEM_PROMPT = `Tu es un expert en conversion digitale pour cartes de visite professionnelles françaises.
Tu génères des configurations complètes, optimisées pour chaque métier.

SECTIONS DISPONIBLES — liste exhaustive, n'en invente aucune autre :
Plan Essentielle (toujours disponibles) :
- identity : nom, titre, photo, zone géographique — toujours activé
- actions : boutons call/whatsapp/email/website — toujours activé
- about : bio à la 1ère personne + badges (certifications, spécialités)
- socials : liens réseaux sociaux (linkedin, instagram)
- vcard : bouton d'export de contact numérique
- contact : bloc coordonnées (téléphone, email, site)

Plan Vitrine (sections premium) :
- stats : 2-4 chiffres clés de crédibilité (ex: "24h/24", "200 biens vendus", "4.9★")
- services : liste de 2-4 prestations avec titre et description courte
- testimonials : 2-3 avis clients avec nom, rôle et texte court
- calendar : bouton de prise de RDV (Calendly, Doctolib...)
- gallery : galerie de photos (réalisations, plats, portraits...)
- listings : portefeuille de biens — UNIQUEMENT pour l'immobilier
- cta : bannière d'appel à l'action (offre, bilan gratuit, promo...)
- video : lien vidéo YouTube de présentation
- languages : langues parlées

IDENTIFIANTS EXACTS pour sectionOrder (utilise uniquement ces valeurs) :
identity, actions, vcard, stats, about, video, services, listings, gallery, testimonials, calendar, languages, cta, contact, socials, theme

THÈMES PAR SECTEUR :
- gold → luxe, immobilier prestige, joaillerie, finance
- navy → confiance, plomberie, électricité, droit, sécurité
- emerald → santé, bien-être, naturopathe, coach
- violet → créatif, consultant, coach, digital
- slate → artisanat, BTP, industrie, mécanique
- bordeaux → restaurant, gastronomie, traiteur, vin
- rose → beauté, esthétique, mariage, mode
- sapphire → formation, conseil, entreprise B2B
- graphite → architecture, design, photographie
- forest → nature, agriculture, jardinage, écologie
- crimson → sport, coaching sportif, fitness
- copper → artisan d'art, décoration, intérieur

ORDRE DES SECTIONS — RÈGLE ABSOLUE :
Toujours utiliser exactement cet ordre :
identity → actions → stats → socials → about → vcard → cta → services → testimonials → contact → calendar → gallery → listings → video → languages → theme

Exception pour les métiers visuels (photographe, coiffeur, artiste, tatoueur) : insérer gallery juste après stats.

SECTIONS TOUJOURS ACTIVÉES — sans exception :
statsEnabled: true, servicesEnabled: true, testimonialsEnabled: true, ctaEnabled: true, aboutEnabled: true

Activer aussi calendar pour : coaches, consultants, thérapeutes, médecins, avocats, architectes, agents immobiliers.
Activer gallery pour : photographes, restaurateurs, artisans, coiffeurs, tatoueurs.

CONTENU ULTRA PERSONNALISÉ :
- stats : 4 chiffres très spécifiques au métier (délai, avis, années, projets...)
- services : 3-4 prestations réalistes avec descriptions concrètes
- testimonials : 3 avis avec vrais prénoms, rôles spécifiques, textes crédibles
- cta : offre irrésistible adaptée au métier (bilan gratuit, devis, consultation...)
- badges : 3-4 certifications et labels propres au secteur

L'objectif est une carte tellement impressionnante que le visiteur veut immédiatement activer le plan Vitrine.`;

const JSON_SCHEMA = `{
  "title": "Titre professionnel court (max 6 mots)",
  "accent": "un des thèmes disponibles",
  "bio": "Bio à la 1ère personne, 2-3 phrases, 70 mots max, concrète et accrocheuse",
  "aboutEnabled": true,
  "badges": [{"id":"b1","label":"Badge court"}],
  "statsEnabled": true,
  "stats": [{"label":"Libellé court","value":"Valeur chiffrée ou texte court"}],
  "servicesEnabled": true,
  "services": [{"id":"s1","title":"Nom service","description":"Description 1 phrase concrète"}],
  "testimonialsEnabled": true,
  "testimonials": [{"id":"t1","name":"Prénom N.","role":"Profil client","text":"Avis court réaliste","rating":5,"photo":"","link":""}],
  "calendarEnabled": true/false,
  "calendarLabel": "Libellé du bouton RDV",
  "galleryEnabled": true/false,
  "listingsEnabled": true/false,
  "ctaEnabled": true,
  "ctaTitle": "Titre accroche CTA",
  "ctaText": "Texte court CTA",
  "ctaButtonLabel": "Libellé bouton CTA",
  "actions": {"call":true/false,"whatsapp":true/false,"email":true/false,"website":true/false},
  "sectionOrder": ["identity","actions","stats","socials","about","vcard","cta","services","testimonials","contact","calendar","gallery","listings","video","languages","theme"]
}`;

// ─── Mocks riches — toutes sections actives, ordre fixe ──────────────────────

const MOCK_PLOMBIER: GeneratedCard = {
  title: "Plombier · Dépannage Urgent 24h/24",
  accent: "navy",
  bio: "Plombier certifié RGE, j'interviens en moins d'une heure pour tous vos dépannages — fuites, chauffe-eau, canalisations. Devis gratuit sur place, travail soigné et garanti.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Artisan RGE certifié" },
    { id: "b2", label: "Garantie décennale" },
    { id: "b3", label: "Devis gratuit" },
    { id: "b4", label: "Intervention < 1h" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Disponibilité", value: "24h/24 · 7j/7" },
    { label: "Délai intervention", value: "< 1 heure" },
    { label: "Clients dépannés", value: "2 000+" },
    { label: "Note Google", value: "4.9★ (180 avis)" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Dépannage urgence", description: "Fuite, canalisation bouchée, chauffe-eau en panne — j'arrive en moins d'une heure." },
    { id: "s2", title: "Installation sanitaire", description: "Pose de salles de bain complètes, WC, douche italienne et robinetterie haut de gamme." },
    { id: "s3", title: "Remplacement chauffe-eau", description: "Ballon électrique, chauffe-eau thermodynamique ou gaz — pose et mise en service." },
    { id: "s4", title: "Détartrage & entretien", description: "Maintenance préventive annuelle pour prolonger la durée de vie de vos équipements." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Martine C.", role: "Propriétaire — Paris 15e", text: "Intervention un dimanche à 7h du matin. En 45 minutes tout était réglé. Tarif honnête, propre et efficace.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "François D.", role: "Locataire — Boulogne", text: "Fuite sous évier réparée en un coup de main. Très pro, explique ce qu'il fait. Je le rappellerai.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Sophie & Marc B.", role: "Propriétaires — Neuilly", text: "Remplacement chauffe-eau complet en 3h. Prix conforme au devis, aucune mauvaise surprise.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: false,
  calendarLabel: "Planifier une intervention",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Urgence plomberie ? J'arrive.",
  ctaText: "Appelez maintenant — intervention garantie en moins d'une heure, devis gratuit sur place.",
  ctaButtonLabel: "Appeler pour une urgence",
  actions: { call: true, whatsapp: true, email: false, website: false },
  sectionOrder: BASE_ORDER,
};

const MOCK_IMMOBILIER: GeneratedCard = {
  title: "Agent Immobilier · Paris & Île-de-France",
  accent: "gold",
  bio: "Spécialiste de l'immobilier parisien depuis 12 ans, j'accompagne acheteurs et vendeurs avec rigueur et disponibilité. Estimation gratuite en 48h, réseau exclusif de biens off-market.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Certifié FNAIM" },
    { id: "b2", label: "Top 1% Paris" },
    { id: "b3", label: "Mandataire exclusif" },
    { id: "b4", label: "12 ans d'expérience" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Biens vendus", value: "240+" },
    { label: "Satisfaction client", value: "4.9★" },
    { label: "Délai moyen vente", value: "38 jours" },
    { label: "Prix obtenu vs estimé", value: "102%" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Estimation gratuite", description: "Évaluation précise de votre bien sous 48h, basée sur les transactions réelles du quartier." },
    { id: "s2", title: "Accompagnement vendeur", description: "De la mise en valeur à la signature chez le notaire — je gère tout, vous signez." },
    { id: "s3", title: "Chasse immobilière", description: "Recherche sur-mesure pour acquéreurs exigeants, accès aux biens avant mise en marché." },
    { id: "s4", title: "Investissement locatif", description: "Sélection, simulation de rendement, gestion locative — je suis à vos côtés de A à Z." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Sophie M.", role: "Vendeuse — Paris 16e", text: "Vente conclue en 3 semaines, au-dessus du prix demandé. Toujours disponible, vraiment à l'écoute.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Thomas & Léa R.", role: "Acquéreurs — Neuilly", text: "Il nous a trouvé l'appartement parfait en 3 visites. Réactif, honnête, pas de pression commerciale.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Patrick G.", role: "Investisseur — Levallois", text: "3 appartements acquis avec lui en 2 ans. Rendement conforme à ce qui était annoncé. Je recommande.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Planifier mon estimation gratuite",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: true,
  listings: [],
  ctaEnabled: true,
  ctaTitle: "Vous vendez ou achetez ?",
  ctaText: "Réservez 20 minutes d'échange. Je vous donne une estimation réaliste et une stratégie claire.",
  ctaButtonLabel: "Réserver un appel gratuit",
  actions: { call: true, whatsapp: true, email: true, website: false },
  sectionOrder: [
    "identity", "actions", "stats", "socials", "about", "vcard",
    "cta", "services", "testimonials", "contact",
    "calendar", "listings", "gallery", "video", "languages", "theme",
  ],
};

const MOCK_COACH: GeneratedCard = {
  title: "Coach Bien-être & Performance",
  accent: "emerald",
  bio: "J'accompagne les professionnels et entrepreneurs à retrouver clarté, énergie et performance. Méthode certifiée ICF, résultats mesurables dès la 2e séance.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Certifiée ICF" },
    { id: "b2", label: "PNL praticienne" },
    { id: "b3", label: "200+ clients accompagnés" },
    { id: "b4", label: "10 ans d'expérience" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Clients accompagnés", value: "200+" },
    { label: "Satisfaction", value: "4.9/5" },
    { label: "Séances réalisées", value: "1 500+" },
    { label: "Taux de transformation", value: "94%" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Programme coaching 3 mois", description: "8 séances individuelles pour atteindre vos objectifs de vie et de performance." },
    { id: "s2", title: "Bilan de vie offert — 30 min", description: "On identifie ensemble vos blocages et définit votre cap. Offert, sans engagement." },
    { id: "s3", title: "Ateliers collectifs", description: "Sessions thématiques en groupe : gestion du stress, confiance en soi, productivité." },
    { id: "s4", title: "Suivi mensuel", description: "Accompagnement léger pour maintenir cap et momentum entre deux programmes." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Claire B.", role: "Directrice commerciale — Paris", text: "En 3 mois j'ai retrouvé confiance et clarté totale. Un accompagnement qui change vraiment la donne.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Maxime L.", role: "Entrepreneur — Lyon", text: "Le bilan gratuit m'a tout de suite convaincu. Résultats concrets dès la 2e séance. Je recommande.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Nadia R.", role: "Cadre reconvertie — Bordeaux", text: "Elle m'a aidée à oser ma reconversion. Aujourd'hui j'exerce le métier que j'aime. Merci infiniment.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver mon bilan gratuit — 30 min",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "30 min offertes pour clarifier votre cap",
  ctaText: "Bilan sans engagement — on identifie vos 3 blocages principaux et un plan d'action immédiat.",
  ctaButtonLabel: "Je réserve mon bilan gratuit",
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: BASE_ORDER,
};

const MOCK_RESTAURANT: GeneratedCard = {
  title: "Chef Restaurateur · Cuisine du Marché",
  accent: "bordeaux",
  bio: "Une cuisine généreuse et créative, élaborée chaque matin avec des producteurs locaux. Salle chaleureuse, 60 couverts, réservations conseillées le week-end.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Produits locaux & bio" },
    { id: "b2", label: "Fait maison 100%" },
    { id: "b3", label: "Ouvert 7j/7" },
    { id: "b4", label: "Salle privatisable" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Note Google", value: "4.8★ (312 avis)" },
    { label: "Couverts / service", value: "60 places" },
    { label: "Ouvert depuis", value: "2014" },
    { label: "Plats faits maison", value: "100%" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Menu déjeuner", description: "Entrée + plat + dessert à 19€ · Formule express 13€ · Du lundi au vendredi." },
    { id: "s2", title: "Carte du soir", description: "Carte renouvelée chaque semaine selon les arrivages du marché et la saison." },
    { id: "s3", title: "Brunch du dimanche", description: "Formule brunch convivial de 11h à 15h — tout en illimité à 29€ par personne." },
    { id: "s4", title: "Privatisation & séminaires", description: "Salle disponible jusqu'à 60 personnes, forfaits cocktail ou dîner sur devis." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Julie M.", role: "Cliente fidèle — depuis 5 ans", text: "Toujours des saveurs nouvelles et des produits au top. Le meilleur rapport qualité-plaisir du quartier.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Karim B.", role: "Event manager — Paris", text: "Soirée d'entreprise pour 40 personnes — du menu au service, tout était parfait. On revient.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Émilie & Romain T.", role: "Clients réguliers", text: "Notre cantine favorite du dimanche. Le brunch est imbattable et l'équipe est adorable.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver une table",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Privatisez notre salle pour votre événement",
  ctaText: "Anniversaire, séminaire, repas d'affaires — jusqu'à 60 personnes. Devis personnalisé sous 24h.",
  ctaButtonLabel: "Demander un devis privatisation",
  actions: { call: true, whatsapp: false, email: true, website: true },
  sectionOrder: VISUAL_ORDER,
};

const MOCK_PHOTOGRAPHE: GeneratedCard = {
  title: "Photographe · Portrait & Événement Pro",
  accent: "graphite",
  bio: "Photographe professionnel spécialisé en portrait corporate et événements d'entreprise. J'immortalise vos moments avec une approche naturelle et discrète — retouches incluses, livraison en 72h.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Reportage entreprise" },
    { id: "b2", label: "Portrait professionnel" },
    { id: "b3", label: "500+ événements couverts" },
    { id: "b4", label: "Livraison 72h garantie" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Événements couverts", value: "500+" },
    { label: "Photos livrées", value: "50 000+" },
    { label: "Délai livraison", value: "72h" },
    { label: "Satisfaction", value: "4.9★" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Portrait professionnel", description: "Séance studio ou extérieur — retouches incluses, jusqu'à 10 photos HD livrées sous 72h." },
    { id: "s2", title: "Reportage événement", description: "Couverture complète de vos séminaires, soirées et conférences. Pack à partir de 4h." },
    { id: "s3", title: "Shooting produit & corporate", description: "Photos de produits, locaux, équipes — visuels pour votre site et réseaux sociaux." },
    { id: "s4", title: "Shooting mariage", description: "Reportage complet du jour J — de la préparation à la soirée, 400+ photos livrées." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Élise R.", role: "Dirigeante — cabinet conseil", text: "Des portraits qui me ressemblent vraiment — pro sans être figée. Retouches impeccables, livraison rapide.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Samuel N.", role: "Event manager — Paris", text: "Couverture de notre soirée annuelle (300 personnes). Discret, réactif, des shots magnifiques.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Marina & Loïc", role: "Mariés — juin 2025", text: "Les plus belles photos de notre vie. Il a capté chaque instant avec une sensibilité rare.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver une séance",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Votre portrait pro livré en 72h",
  ctaText: "Séance studio ou extérieur — retouches professionnelles incluses. Tarif fixe, sans mauvaise surprise.",
  ctaButtonLabel: "Voir les disponibilités & tarifs",
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: VISUAL_ORDER,
};

const MOCK_AGENCE: GeneratedCard = {
  title: "Agence Web · Sites & Marketing Digital",
  accent: "violet",
  bio: "Nous créons des sites web qui convertissent — design premium, SEO, publicités Meta & Google. 150+ entrepreneurs accompagnés, résultats mesurables garantis dès le premier mois.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Google Partner" },
    { id: "b2", label: "Meta Business Partner" },
    { id: "b3", label: "150+ sites livrés" },
    { id: "b4", label: "Avis 4.9★ Trustpilot" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Sites livrés", value: "150+" },
    { label: "Leads générés", value: "12 000+" },
    { label: "ROI moyen annonceurs", value: "×4,2" },
    { label: "Satisfaction client", value: "4.9★" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Site vitrine premium", description: "Design sur-mesure, mobile-first, SEO optimisé. Livré en 7 jours chrono." },
    { id: "s2", title: "Campagnes Meta & Google Ads", description: "Publicités ciblées qui ramènent des prospects qualifiés — pas juste des clics." },
    { id: "s3", title: "Carte de visite digitale", description: "Carte interactive avec prise de RDV, galerie et statistiques de partage en temps réel." },
    { id: "s4", title: "Audit & refonte de site", description: "Diagnostic complet de votre présence en ligne + plan d'action prioritaire offert." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Stéphanie V.", role: "Sophrologue — Lyon", text: "Site livré en 5 jours, 18 demandes de RDV le premier mois. Je n'aurais jamais pensé que ça irait si vite.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Rachid M.", role: "Plombier — Île-de-France", text: "Les pubs Meta ont doublé mes appels en 3 semaines. Investissement rentabilisé dès le premier mois.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Noémie C.", role: "Coach — Paris", text: "Agence réactive, à l'écoute, qui livre vraiment. On travaille ensemble depuis 2 ans maintenant.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver mon audit gratuit",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Audit de votre présence en ligne — Offert",
  ctaText: "30 minutes pour identifier ce qui freine vos leads et repartir avec un plan d'action concret.",
  ctaButtonLabel: "Je veux mon audit gratuit",
  actions: { call: true, whatsapp: true, email: true, website: true },
  sectionOrder: BASE_ORDER,
};

const MOCK_CONSULTANT: GeneratedCard = {
  title: "Consultant · Stratégie & Performance",
  accent: "sapphire",
  bio: "J'accompagne dirigeants et indépendants dans l'optimisation de leur activité. Diagnostic précis, stratégie claire, mise en œuvre terrain — des résultats concrets et durables.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "MBA HEC Paris" },
    { id: "b2", label: "15 ans d'expérience" },
    { id: "b3", label: "Certifié PMP" },
    { id: "b4", label: "Bilan offert — 45 min" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Clients accompagnés", value: "120+" },
    { label: "Croissance moyenne", value: "+38%" },
    { label: "Satisfaction", value: "4.8/5" },
    { label: "Années d'expérience", value: "15 ans" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Diagnostic stratégique", description: "Analyse complète de votre activité — forces, faiblesses, opportunités à saisir en priorité." },
    { id: "s2", title: "Optimisation commerciale", description: "Structuration de l'offre, pricing, prospection et process de vente — des résultats rapides." },
    { id: "s3", title: "Accompagnement mensuel", description: "Suivi régulier, points de contrôle et ajustements en temps réel pour tenir le cap." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Pierre L.", role: "Gérant PME — Bordeaux", text: "En 6 mois notre CA a augmenté de 40%. Le meilleur investissement que j'ai fait cette année.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Amina T.", role: "Freelance — Paris", text: "Il a restructuré toute mon offre et mes tarifs. Je me sens enfin professionnelle et légitime.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Bertrand G.", role: "Dirigeant — Toulouse", text: "Diagnostic en 2 semaines, plan d'action en 3. Méthode carrée, résultats au rendez-vous.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver un bilan stratégique — 45 min",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Bilan stratégique offert — 45 min",
  ctaText: "Identifions ensemble les 3 leviers prioritaires pour accélérer votre activité. Offert, sans engagement.",
  ctaButtonLabel: "Je réserve mon bilan gratuit",
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: BASE_ORDER,
};

function detectMock(input: string): GeneratedCard {
  const i = input.toLowerCase();
  if (i.includes("plomb") || i.includes("dépann") || i.includes("électric") || i.includes("serrurier")) return MOCK_PLOMBIER;
  if (i.includes("immo") || i.includes("notaire") || i.includes("bien") || i.includes("appartement") || i.includes("fnaim")) return MOCK_IMMOBILIER;
  if (i.includes("agence") || i.includes("web") || i.includes("digital") || i.includes("convertilab") || i.includes("studio") || i.includes("marketing") || i.includes("seo") || i.includes("ads")) return MOCK_AGENCE;
  if (i.includes("coach") || i.includes("thérapeut") || i.includes("bien-être") || i.includes("psy") || i.includes("sophrolog") || i.includes("hypno")) return MOCK_COACH;
  if (i.includes("consultant") || i.includes("conseil") || i.includes("stratégie") || i.includes("formateur") || i.includes("expert")) return MOCK_CONSULTANT;
  if (i.includes("restaur") || i.includes("chef") || i.includes("cuisine") || i.includes("traiteur") || i.includes("brasserie") || i.includes("bistro") || i.includes("café")) return MOCK_RESTAURANT;
  if (i.includes("photo") || i.includes("vidéo") || i.includes("vidéaste") || i.includes("cinéaste")) return MOCK_PHOTOGRAPHE;
  // Fallback générique — toutes sections Vitrine actives
  return {
    title: "Expert · Accompagnement Sur-Mesure",
    accent: "sapphire",
    bio: "Professionnel passionné, j'accompagne mes clients avec expertise et bienveillance. Mon objectif : des résultats concrets, mesurables et durables dès les premières semaines.",
    aboutEnabled: true,
    badges: [
      { id: "b1", label: "Expert certifié" },
      { id: "b2", label: "10 ans d'expérience" },
      { id: "b3", label: "Devis gratuit" },
    ],
    statsEnabled: true,
    stats: [
      { label: "Années d'expérience", value: "10+" },
      { label: "Clients accompagnés", value: "200+" },
      { label: "Satisfaction", value: "4.8/5" },
      { label: "Projets réalisés", value: "300+" },
    ],
    servicesEnabled: true,
    services: [
      { id: "s1", title: "Consultation initiale", description: "30 minutes pour analyser votre situation et définir ensemble le meilleur plan d'action." },
      { id: "s2", title: "Accompagnement sur-mesure", description: "Suivi personnalisé adapté à vos objectifs — à votre rythme, à votre niveau." },
      { id: "s3", title: "Suivi & optimisation", description: "Points réguliers pour ajuster la stratégie et maximiser vos résultats." },
    ],
    testimonialsEnabled: true,
    testimonials: [
      { id: "t1", name: "Marie-Claire D.", role: "Cliente — Paris", text: "Un professionnel à l'écoute qui délivre vraiment. Suivi impeccable, résultats au-delà de mes attentes.", rating: 5, photo: "", link: "" },
      { id: "t2", name: "Julien P.", role: "Client — Lyon", text: "Communication claire, engagement réel. Je recommande sans hésitation à tous mes proches.", rating: 5, photo: "", link: "" },
      { id: "t3", name: "Fatima K.", role: "Cliente — Toulouse", text: "Enfin un professionnel qui tient ses promesses. Méthode sérieuse et vraie bienveillance.", rating: 5, photo: "", link: "" },
    ],
    calendarEnabled: true,
    calendarLabel: "Réserver une consultation gratuite",
    galleryEnabled: true,
    gallery: [],
    listingsEnabled: false,
    ctaEnabled: true,
    ctaTitle: "Consultation offerte — 30 min",
    ctaText: "Discutons de votre projet sans engagement. Je vous donne mon avis d'expert gratuitement.",
    ctaButtonLabel: "Je réserve ma consultation",
    actions: { call: true, whatsapp: true, email: true, website: false },
    sectionOrder: BASE_ORDER,
  };
}

// ─── Server function ──────────────────────────────────────────────────────────

export const generateCard = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }): Promise<GeneratedCard> => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey || apiKey === "REPLACE_WITH_YOUR_KEY") {
      await new Promise((r) => setTimeout(r, 1600));
      return detectMock(data.input);
    }

    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `L'utilisateur dit : "${data.input}"

Génère la configuration complète de sa carte de visite digitale.
Rappel : statsEnabled, servicesEnabled, testimonialsEnabled, ctaEnabled et aboutEnabled doivent TOUJOURS être true.
L'ordre sectionOrder doit TOUJOURS suivre : identity → actions → stats → socials → about → vcard → cta → services → testimonials → contact (puis les sections inactives).
Réponds UNIQUEMENT avec le JSON suivant, rien d'autre :
${JSON_SCHEMA}`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "{}";

    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try { parsed = JSON.parse(match[0]); } catch { return detectMock(data.input); }
      } else {
        return detectMock(data.input);
      }
    }

    const validAccents: ThemeAccent[] = ["gold","noir","emerald","forest","navy","sapphire","graphite","bordeaux","slate","violet","crimson","magenta","copper","cream","sand","clay","rose","blush","mint","sky","paper","sun"];
    const validBricks: BrickId[] = ["identity","actions","vcard","stats","about","video","services","listings","gallery","testimonials","calendar","languages","cta","contact","socials","theme"];

    const accent = validAccents.includes(parsed.accent as ThemeAccent) ? parsed.accent as ThemeAccent : "sapphire";
    const rawOrder = Array.isArray(parsed.sectionOrder)
      ? (parsed.sectionOrder as string[]).filter((s): s is BrickId => validBricks.includes(s as BrickId))
      : BASE_ORDER;
    // Garantir que tous les bricks valides sont présents (append manquants à la fin)
    const sectionOrder: BrickId[] = [
      ...rawOrder,
      ...validBricks.filter((b) => !rawOrder.includes(b)),
    ];

    return {
      title: typeof parsed.title === "string" ? parsed.title : "",
      accent,
      bio: typeof parsed.bio === "string" ? parsed.bio : "",
      aboutEnabled: true,
      badges: Array.isArray(parsed.badges) ? parsed.badges as GeneratedCard["badges"] : [],
      statsEnabled: true,
      stats: Array.isArray(parsed.stats) ? parsed.stats as GeneratedCard["stats"] : [],
      servicesEnabled: true,
      services: Array.isArray(parsed.services) ? parsed.services as GeneratedCard["services"] : [],
      testimonialsEnabled: true,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials as GeneratedCard["testimonials"] : [],
      calendarEnabled: !!parsed.calendarEnabled,
      calendarLabel: typeof parsed.calendarLabel === "string" ? parsed.calendarLabel : "Prendre rendez-vous",
      galleryEnabled: !!parsed.galleryEnabled,
      gallery: [],
      listingsEnabled: !!parsed.listingsEnabled,
      listings: [],
      ctaEnabled: true,
      ctaTitle: typeof parsed.ctaTitle === "string" ? parsed.ctaTitle : "",
      ctaText: typeof parsed.ctaText === "string" ? parsed.ctaText : "",
      ctaButtonLabel: typeof parsed.ctaButtonLabel === "string" ? parsed.ctaButtonLabel : "En savoir plus",
      actions: parsed.actions && typeof parsed.actions === "object"
        ? parsed.actions as CardData["actions"]
        : { call: true, whatsapp: true, email: true, website: false },
      sectionOrder,
    };
  });
