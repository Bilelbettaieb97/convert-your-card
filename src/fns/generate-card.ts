import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CardData, BrickId, ThemeAccent } from "@/lib/card-types";

const schema = z.object({
  input: z.string().min(3).max(400),
  name: z.string().optional(),
  email: z.string().optional(),
});

export type GeneratedCard = Partial<CardData>;

// Ordre canonique fixe — toujours respecté, jamais négligé
const BASE_ORDER: BrickId[] = [
  "identity",      // 1. Identité
  "actions",       // 2. Boutons d'action (call, whatsapp, email, site)
  "socials",       // 3. Réseaux sociaux (linkedin, instagram)
  "about",         // 4. À propos
  "vcard",         // 5. Ajouter au répertoire
  "calendar",      // 6. Agenda / prise de RDV
  "services",      // 7. Services & prestations
  "testimonials",  // 8. Témoignages
  "cta",           // 9. Bannière d'appel à l'action
  "stats", "contact", "gallery", "listings", "video", "languages", "theme",
];

const SYSTEM_PROMPT = `Tu es un expert en création de contenu pour cartes de visite digitales françaises.
Tu ne décides PAS de la structure — toutes les sections sont toujours actives, l'ordre est fixe.
Tu remplis UNIQUEMENT le contenu, avec un maximum de personnalisation et de précision pour le métier décrit.

THÈMES disponibles :
- gold → luxe, immobilier prestige, joaillerie, finance, notaire
- navy → urgence, plomberie, électricité, serrurier, sécurité, BTP
- emerald → bien-être, santé, naturopathe, coach, sophrologue, kiné
- violet → digital, agence web, créatif, consultant, marketing, SEO
- slate → artisanat, industrie, menuiserie, maçonnerie, mécanique
- bordeaux → restaurant, gastronomie, traiteur, chef, vin, bistro
- rose → beauté, esthétique, coiffure, mariage, mode, makeup
- sapphire → formation, conseil, juridique, RH, audit, B2B
- graphite → photographie, architecture, design, vidéo, cinéma
- forest → nature, agriculture, jardinage, écologie, bien-être nature
- crimson → sport, coaching sportif, fitness, nutrition sportive
- copper → artisan d'art, décoration intérieure, céramique

ORDRE DES SECTIONS — TOUJOURS RESPECTER EXACTEMENT :
identity → actions → socials → about → vcard → calendar → services → testimonials → cta
(puis stats, contact, gallery, listings, video, languages, theme à la fin)

RÈGLES ABSOLUES :
- stats : EXACTEMENT 4 chiffres ultra-spécifiques au métier (délai d'intervention, note, volume, années, taux...)
- services : 3 à 4 prestations avec titre court + description d'une phrase concrète et vendeuse
- testimonials : EXACTEMENT 3 avis avec prénoms + initiale du nom réalistes, rôle très précis, texte crédible et enthousiaste
- cta : offre irrésistible propre au métier (bilan gratuit 30 min, devis en 24h, 1ère séance offerte, diagnostic offert...)
- bio : à la 1ère personne, accrocheuse, concrète, 70 mots max
- badges : 3 à 4 labels de crédibilité (certifications, labels, spécialités reconnues dans le métier)
- actions : call et whatsapp pour les métiers urgence/artisan ; whatsapp + email + website pour conseil/coach/créatif`;

const JSON_SCHEMA = `{
  "title": "Titre professionnel court et percutant (max 6 mots)",
  "accent": "une des couleurs disponibles",
  "bio": "Bio à la 1ère personne, 70 mots max, accrocheuse et concrète",
  "badges": [{"id":"b1","label":"Label court de crédibilité"}],
  "stats": [
    {"label":"Libellé court","value":"Valeur ou texte court"},
    {"label":"Libellé court","value":"Valeur ou texte court"},
    {"label":"Libellé court","value":"Valeur ou texte court"},
    {"label":"Libellé court","value":"Valeur ou texte court"}
  ],
  "services": [
    {"id":"s1","title":"Nom service","description":"Description 1 phrase concrète et vendeuse"},
    {"id":"s2","title":"Nom service","description":"Description 1 phrase concrète et vendeuse"},
    {"id":"s3","title":"Nom service","description":"Description 1 phrase concrète et vendeuse"}
  ],
  "testimonials": [
    {"id":"t1","name":"Prénom N.","role":"Rôle très précis","text":"Avis court et enthousiaste","rating":5,"photo":"","link":""},
    {"id":"t2","name":"Prénom N.","role":"Rôle très précis","text":"Avis court et enthousiaste","rating":5,"photo":"","link":""},
    {"id":"t3","name":"Prénom N.","role":"Rôle très précis","text":"Avis court et enthousiaste","rating":5,"photo":"","link":""}
  ],
  "ctaTitle": "Titre de l'offre irrésistible",
  "ctaText": "Texte d'accompagnement court, 1 phrase max",
  "ctaButtonLabel": "Libellé bouton (5 mots max)",
  "calendarLabel": "Libellé bouton prise de RDV",
  "actions": {"call":true,"whatsapp":true,"email":false,"website":false},
  "sectionOrder": ["identity","actions","socials","about","vcard","calendar","services","testimonials","cta","stats","contact","gallery","listings","video","languages","theme"]
}`;

// ─── Mock unique pour les tests dev (sans clé API) ───────────────────────────

const MOCK_DEFAULT: GeneratedCard = {
  title: "Consultant · Stratégie & Développement",
  accent: "violet",
  bio: "J'accompagne dirigeants et entrepreneurs à clarifier leur stratégie et accélérer leur croissance. Méthode directe, résultats mesurables dès les premières semaines — sans bullshit.",
  aboutEnabled: true,
  badges: [
    { id: "b1", label: "MBA HEC Paris" },
    { id: "b2", label: "15 ans d'expérience" },
    { id: "b3", label: "Certifié PMP" },
    { id: "b4", label: "Audit offert" },
  ],
  statsEnabled: true,
  stats: [
    { label: "Clients accompagnés", value: "120+" },
    { label: "Croissance moyenne", value: "+38%" },
    { label: "Satisfaction", value: "4.9/5" },
    { label: "Années d'expérience", value: "15 ans" },
  ],
  servicesEnabled: true,
  services: [
    { id: "s1", title: "Audit stratégique offert", description: "45 min pour identifier vos 3 leviers prioritaires et repartir avec un plan d'action." },
    { id: "s2", title: "Optimisation commerciale", description: "Structuration de l'offre, pricing, prospection et closing — des résultats mesurables." },
    { id: "s3", title: "Accompagnement mensuel", description: "Suivi bi-mensuel, KPIs suivis, ajustements en temps réel pour tenir le cap." },
  ],
  testimonialsEnabled: true,
  testimonials: [
    { id: "t1", name: "Pierre L.", role: "Gérant PME — Bordeaux", text: "En 6 mois notre CA a augmenté de 40%. Le meilleur investissement de l'année.", rating: 5, photo: "", link: "" },
    { id: "t2", name: "Amina T.", role: "Freelance marketing — Paris", text: "Il a restructuré toute mon offre et mes tarifs. Je me sens enfin professionnelle et légitime.", rating: 5, photo: "", link: "" },
    { id: "t3", name: "Bertrand G.", role: "Dirigeant — Toulouse", text: "Diagnostic en 2 semaines, plan d'action en 3. Méthode carrée, résultats au rendez-vous.", rating: 5, photo: "", link: "" },
  ],
  calendarEnabled: true,
  calendarLabel: "Réserver mon audit stratégique — 45 min",
  galleryEnabled: false,
  gallery: [],
  listingsEnabled: false,
  ctaEnabled: true,
  ctaTitle: "Audit stratégique offert — 45 min",
  ctaText: "Identifions ensemble les 3 leviers prioritaires pour accélérer votre activité. Offert, sans engagement.",
  ctaButtonLabel: "Je réserve mon audit",
  actions: { call: false, whatsapp: true, email: true, website: true },
  sectionOrder: [...BASE_ORDER],
};

// ─── Server function ──────────────────────────────────────────────────────────

export const generateCard = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }): Promise<GeneratedCard> => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Mode dev sans clé → mock unique après délai réaliste
    if (!apiKey || apiKey === "REPLACE_WITH_YOUR_KEY") {
      await new Promise((r) => setTimeout(r, 1800));
      return MOCK_DEFAULT;
    }

    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const userContext = data.name ? `Le professionnel s'appelle ${data.name}. ` : "";

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `${userContext}Description de son activité : "${data.input}"

Génère le contenu de sa carte de visite digitale.
Réponds UNIQUEMENT avec ce JSON, rien d'autre :
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
        try { parsed = JSON.parse(match[0]); } catch { return MOCK_DEFAULT; }
      } else {
        return MOCK_DEFAULT;
      }
    }

    const validAccents: ThemeAccent[] = ["gold","noir","emerald","forest","navy","sapphire","graphite","bordeaux","slate","violet","crimson","magenta","copper","cream","sand","clay","rose","blush","mint","sky","paper","sun"];
    const accent = validAccents.includes(parsed.accent as ThemeAccent) ? parsed.accent as ThemeAccent : "sapphire";

    // Garantit exactement 4 stats
    const rawStats = (Array.isArray(parsed.stats) ? parsed.stats : []) as NonNullable<GeneratedCard["stats"]>;
    const stats = rawStats.slice(0, 4);

    // Garantit 3 testimonials
    const rawTestimonials = (Array.isArray(parsed.testimonials) ? parsed.testimonials : []) as NonNullable<GeneratedCard["testimonials"]>;
    const testimonials = rawTestimonials.slice(0, 3);

    return {
      title: typeof parsed.title === "string" ? parsed.title : "",
      accent,
      bio: typeof parsed.bio === "string" ? parsed.bio : "",
      aboutEnabled: true,
      badges: Array.isArray(parsed.badges) ? parsed.badges as GeneratedCard["badges"] : [],
      // Toutes les sections toujours actives
      statsEnabled: true,
      stats,
      servicesEnabled: true,
      services: Array.isArray(parsed.services) ? parsed.services as GeneratedCard["services"] : [],
      testimonialsEnabled: true,
      testimonials,
      calendarEnabled: true,
      calendarLabel: typeof parsed.calendarLabel === "string" ? parsed.calendarLabel : "Prendre rendez-vous",
      galleryEnabled: false,
      gallery: [],
      listingsEnabled: false,
      ctaEnabled: true,
      ctaTitle: typeof parsed.ctaTitle === "string" ? parsed.ctaTitle : "",
      ctaText: typeof parsed.ctaText === "string" ? parsed.ctaText : "",
      ctaButtonLabel: typeof parsed.ctaButtonLabel === "string" ? parsed.ctaButtonLabel : "En savoir plus",
      actions: parsed.actions && typeof parsed.actions === "object"
        ? parsed.actions as CardData["actions"]
        : { call: true, whatsapp: true, email: true, website: false },
      sectionOrder: BASE_ORDER,
    };
  });
