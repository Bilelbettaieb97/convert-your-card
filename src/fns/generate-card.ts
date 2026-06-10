import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CardData, BrickId, ThemeAccent } from "@/lib/card-types";

const schema = z.object({
  input: z.string().min(3).max(400),
});

export type GeneratedCard = Partial<CardData>;

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

RÈGLES DE CONVERSION PAR TYPE :
- Urgence (plombier, électricien, serrurier) : stats "dispo+délai", services clairs, call+whatsapp, PAS de calendar/gallery/testimonials
- Gros achat/confiance (immobilier, avocat, architecte) : stats + testimonials + services + calendar. listings si immo.
- Expertise conseil (coach, consultant, formateur, thérapeute) : badges, services=offres, testimonials=transformations, calendar, cta=bilan gratuit
- Visuel (photographe, coiffeur, tatoueur, esthéticienne) : gallery EN PREMIER dans sectionOrder, services, about
- Restauration (restaurant, traiteur, chef) : gallery, services=menu/formules, socials
- Médical (médecin, kiné, ostéo, dentiste) : services, calendar, badges certifications, PAS de testimonials
- Artisan (menuisier, maçon, peintre, carreleur) : gallery=réalisations, services, stats=années+projets, call+whatsapp

SECTIONORDER : Commence TOUJOURS par "identity" puis "actions". Ensuite les sections activées dans l'ordre de priorité pour la conversion. Termine par les sections inactives. Inclure les 16 identifiants exacts dans la liste.`;

const JSON_SCHEMA = `{
  "title": "Titre professionnel court (max 6 mots)",
  "accent": "un des thèmes disponibles",
  "bio": "Bio à la 1ère personne, 2-3 phrases, 70 mots max, concrète et accrocheuse",
  "aboutEnabled": true/false,
  "badges": [{"id":"b1","label":"Badge court"}],
  "statsEnabled": true/false,
  "stats": [{"label":"Libellé court","value":"Valeur chiffrée ou texte court"}],
  "servicesEnabled": true/false,
  "services": [{"id":"s1","title":"Nom service","description":"Description 1 phrase concrète"}],
  "testimonialsEnabled": true/false,
  "testimonials": [{"id":"t1","name":"Prénom N.","role":"Profil client","text":"Avis court réaliste","rating":5,"photo":"","link":""}],
  "calendarEnabled": true/false,
  "calendarLabel": "Libellé du bouton RDV",
  "galleryEnabled": true/false,
  "listingsEnabled": true/false,
  "ctaEnabled": true/false,
  "ctaTitle": "Titre accroche CTA",
  "ctaText": "Texte court CTA",
  "ctaButtonLabel": "Libellé bouton CTA",
  "actions": {"call":true/false,"whatsapp":true/false,"email":true/false,"website":true/false},
  "sectionOrder": ["identity","actions","stats","about","services","testimonials","calendar","gallery","listings","cta","socials","vcard","languages","theme"]
}`;

// ─── Mocks riches pour tester sans clé API ───────────────────────────────────

const MOCK_PLOMBIER: GeneratedCard = {
  title: "Plombier · Dépannage Urgent",
  accent: "navy",
  bio: "Plombier professionnel, j'interviens rapidement pour tous vos dépannages — fuites, chauffe-eau, canalisations bouchées. Devis gratuit, intervention garantie.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Artisan RGE certifié" },
    { id: "b2", label: "Devis gratuit" },
    { id: "b3", label: "Garantie décennale" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Disponibilité", value: "24h/24 7j/7" },
    { label: "Délai intervention", value: "< 1 heure" },
    { label: "Années d'expérience", value: "15 ans" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Dépannage urgence", description: "Intervention rapide pour fuites, pannes chauffe-eau et canalisations bouchées." },
    { id: "s2", title: "Installation sanitaire", description: "Pose de salles de bain, WC, robinetterie et équipements sanitaires." },
    { id: "s3", title: "Détartrage & entretien", description: "Maintenance préventive de vos installations pour éviter les pannes." },
  ],
  testimonialsEnabled: false,
  testimonials: [],
  calendarEnabled: false,
  calendarLabel: "Prendre RDV",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: false,
  actions: { call: true, whatsapp: true, email: false, website: false },
  sectionOrder: ["identity", "actions", "stats", "services", "about", "vcard", "socials", "theme", "video", "gallery", "listings", "testimonials", "calendar", "languages", "cta", "contact"],
};

const MOCK_IMMOBILIER: GeneratedCard = {
  title: "Agent Immobilier · Paris & IDF",
  accent: "gold",
  bio: "Spécialiste de l'immobilier parisien depuis 10 ans, j'accompagne acheteurs et vendeurs avec rigueur et disponibilité. Estimation gratuite sous 48h.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Certifié FNAIM" },
    { id: "b2", label: "Top 1% Paris" },
    { id: "b3", label: "Mandataire exclusif" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Biens vendus", value: "200+" },
    { label: "Satisfaction client", value: "4.9★" },
    { label: "Délai moyen vente", value: "42 jours" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Estimation gratuite", description: "Évaluation précise de votre bien sous 48h, basée sur le marché local." },
    { id: "s2", title: "Accompagnement vendeur", description: "De la mise en valeur à la signature chez le notaire, je gère tout." },
    { id: "s3", title: "Chasse immobilière", description: "Recherche sur-mesure pour acquéreurs exigeants, accès aux biens off-market." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Sophie M.", role: "Vendeuse — Paris 16e", text: "Vente conclue en 3 semaines, au prix souhaité. Professionnel et à l'écoute.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Thomas R.", role: "Acquéreur — Neuilly", text: "Il a trouvé l'appartement parfait en moins d'un mois. Je recommande vivement.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Planifier une estimation gratuite",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: true,
  listings: [],
  ctaEnabled: true,
  ctaTitle: "Vous vendez ou achetez ?",
  ctaText: "Échangeons 20 minutes pour cadrer votre projet, sans engagement.",
  ctaButtonLabel: "Réserver un appel gratuit",
  actions: { call: true, whatsapp: true, email: true, website: false },
  sectionOrder: ["identity", "actions", "stats", "testimonials", "services", "calendar", "listings", "about", "cta", "socials", "vcard", "theme", "video", "gallery", "languages", "contact"],
};

const MOCK_COACH: GeneratedCard = {
  title: "Coach Bien-être & Performance",
  accent: "emerald",
  bio: "J'accompagne les professionnels et entrepreneurs à retrouver équilibre et performance. Séances individuelles, en présentiel ou en ligne, sur mesure.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Certifié ICF" },
    { id: "b2", label: "PNL praticien" },
    { id: "b3", label: "200+ clients accompagnés" },
    { id: "b4", label: "10 ans d'expérience" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Clients accompagnés", value: "200+" },
    { label: "Satisfaction", value: "4.9/5" },
    { label: "Séances réalisées", value: "1 500+" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Coaching individuel", description: "Programme sur-mesure de 3 ou 6 mois pour atteindre vos objectifs." },
    { id: "s2", title: "Bilan de vie gratuit", description: "30 minutes pour identifier vos blocages et définir votre cap. Offert." },
    { id: "s3", title: "Ateliers collectifs", description: "Sessions en groupe sur la gestion du stress, la confiance en soi, la productivité." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Claire B.", role: "Directrice commerciale", text: "En 3 mois j'ai retrouvé confiance et clarté. Un accompagnement qui change vraiment.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Maxime L.", role: "Entrepreneur", text: "Le bilan gratuit m'a tout de suite convaincu. Résultats concrets dès la 2e séance.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver mon bilan gratuit",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Première séance offerte",
  ctaText: "30 min de bilan pour identifier vos blocages et définir votre cap.",
  ctaButtonLabel: "Je réserve mon bilan gratuit",
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: ["identity", "actions", "cta", "testimonials", "services", "stats", "about", "calendar", "socials", "vcard", "theme", "video", "gallery", "listings", "languages", "contact"],
};

const MOCK_RESTAURANT: GeneratedCard = {
  title: "Chef Restaurateur · Cuisine du Marché",
  accent: "bordeaux",
  bio: "Une cuisine généreuse et créative, élaborée chaque matin avec des produits frais et locaux. Réservations conseillées le week-end.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Produits locaux" },
    { id: "b2", label: "Fait maison" },
    { id: "b3", label: "Ouvert 7j/7" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Note Google", value: "4.8★ (312 avis)" },
    { label: "Couverts / service", value: "60 places" },
    { label: "Depuis", value: "2014" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Menu déjeuner", description: "Entrée + plat + dessert à 19€. Formule express 13€. Midi en semaine." },
    { id: "s2", title: "Menu du soir", description: "Carte renouvelée chaque semaine selon les arrivages du marché." },
    { id: "s3", title: "Privatisation & séminaires", description: "Salle privatisable jusqu'à 60 personnes, forfaits sur devis." },
  ],
  testimonialsEnabled: false,
  testimonials: [],
  calendarEnabled: false,
  calendarLabel: "Réserver une table",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: false,
  actions: { call: true, whatsapp: false, email: true, website: true },
  sectionOrder: ["identity", "actions", "gallery", "services", "stats", "about", "socials", "vcard", "theme", "video", "listings", "testimonials", "calendar", "languages", "cta", "contact"],
};

const MOCK_PHOTOGRAPHE: GeneratedCard = {
  title: "Photographe · Portrait & Événement",
  accent: "graphite",
  bio: "Photographe professionnel spécialisé en portrait et événements d'entreprise. Je capture les instants qui comptent, avec une approche discrète et naturelle.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "Reportage entreprise" },
    { id: "b2", label: "Portrait professionnel" },
    { id: "b3", label: "Mariage & événements" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Événements couverts", value: "500+" },
    { label: "Photos livrées", value: "50 000+" },
    { label: "Délai livraison", value: "72h" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Portrait professionnel", description: "Séance photo en studio ou en extérieur. Retouches incluses, livraison sous 72h." },
    { id: "s2", title: "Reportage événement", description: "Couverture complète de vos séminaires, soirées et événements d'entreprise." },
    { id: "s3", title: "Shooting produit", description: "Mise en valeur de vos produits pour vos supports web et print." },
  ],
  testimonialsEnabled: false,
  testimonials: [],
  calendarEnabled: true,
  calendarLabel: "Réserver une séance",
  galleryEnabled: true,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: false,
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: ["identity", "actions", "gallery", "services", "stats", "about", "calendar", "socials", "vcard", "theme", "video", "listings", "testimonials", "languages", "cta", "contact"],
};

function detectMock(input: string): GeneratedCard {
  const i = input.toLowerCase();
  if (i.includes("plomb") || i.includes("dépann") || i.includes("électric") || i.includes("serrurier")) return MOCK_PLOMBIER;
  if (i.includes("immo") || i.includes("agence") || i.includes("bien") || i.includes("appartement")) return MOCK_IMMOBILIER;
  if (i.includes("coach") || i.includes("thérapeut") || i.includes("bien-être") || i.includes("psy") || i.includes("consultant")) return MOCK_COACH;
  if (i.includes("restaur") || i.includes("chef") || i.includes("cuisine") || i.includes("traiteur") || i.includes("brasserie")) return MOCK_RESTAURANT;
  if (i.includes("photo") || i.includes("vidéo") || i.includes("vidéaste")) return MOCK_PHOTOGRAPHE;
  // Fallback générique
  return {
    title: "Professionnel Indépendant",
    accent: "sapphire",
    bio: "Expert dans mon domaine, j'accompagne mes clients avec rigueur et bienveillance. Contactez-moi pour discuter de vos besoins.",
    aboutEnabled: true,
    badges: [{ id: "b1", label: "Expert certifié" }, { id: "b2", label: "Devis gratuit" }],
    statsEnabled: true,
    stats: [{ label: "Années d'expérience", value: "10+" }, { label: "Clients satisfaits", value: "100+" }],
    servicesEnabled: true,
    services: [{ id: "s1", title: "Consultation", description: "Échangeons sur vos besoins et définissons ensemble la meilleure solution." }],
    testimonialsEnabled: false,
    testimonials: [],
    calendarEnabled: false,
    galleryEnabled: false,
    listingsEnabled: false,
    ctaEnabled: false,
    actions: { call: true, whatsapp: true, email: true, website: false },
    sectionOrder: ["identity", "actions", "stats", "services", "about", "socials", "vcard", "theme", "video", "gallery", "listings", "testimonials", "calendar", "languages", "cta", "contact"],
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
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `L'utilisateur dit : "${data.input}"

Génère la configuration complète de sa carte de visite digitale.
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
    const sectionOrder = Array.isArray(parsed.sectionOrder)
      ? (parsed.sectionOrder as string[]).filter((s): s is BrickId => validBricks.includes(s as BrickId))
      : validBricks;

    return {
      title: typeof parsed.title === "string" ? parsed.title : "",
      accent,
      bio: typeof parsed.bio === "string" ? parsed.bio : "",
      aboutEnabled: !!parsed.aboutEnabled,
      badges: Array.isArray(parsed.badges) ? parsed.badges as GeneratedCard["badges"] : [],
      statsEnabled: !!parsed.statsEnabled,
      stats: Array.isArray(parsed.stats) ? parsed.stats as GeneratedCard["stats"] : [],
      servicesEnabled: !!parsed.servicesEnabled,
      services: Array.isArray(parsed.services) ? parsed.services as GeneratedCard["services"] : [],
      testimonialsEnabled: !!parsed.testimonialsEnabled,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials as GeneratedCard["testimonials"] : [],
      calendarEnabled: !!parsed.calendarEnabled,
      calendarLabel: typeof parsed.calendarLabel === "string" ? parsed.calendarLabel : "Prendre rendez-vous",
      galleryEnabled: !!parsed.galleryEnabled,
      gallery: [],
      listingsEnabled: !!parsed.listingsEnabled,
      listings: [],
      ctaEnabled: !!parsed.ctaEnabled,
      ctaTitle: typeof parsed.ctaTitle === "string" ? parsed.ctaTitle : "",
      ctaText: typeof parsed.ctaText === "string" ? parsed.ctaText : "",
      ctaButtonLabel: typeof parsed.ctaButtonLabel === "string" ? parsed.ctaButtonLabel : "En savoir plus",
      actions: parsed.actions && typeof parsed.actions === "object"
        ? parsed.actions as CardData["actions"]
        : { call: true, whatsapp: true, email: true, website: false },
      sectionOrder,
    };
  });
