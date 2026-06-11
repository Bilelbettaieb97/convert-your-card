import { defineEventHandler, readBody } from "h3";

const SYSTEM_PROMPT = `Tu es un expert en création de contenu pour cartes de visite digitales françaises.
Tu génères le contenu d'une carte de visite professionnelle, UN CHAMP PAR LIGNE, en NDJSON strict.
Format de chaque ligne : {"f":"nom_champ","v":valeur}

ORDRE OBLIGATOIRE (une ligne par champ, dans cet ordre exact) :
{"f":"accent","v":"couleur"}
{"f":"title","v":"Titre court et percutant (max 6 mots)"}
{"f":"bio","v":"Bio à la 1ère personne, 70 mots max, accrocheuse"}
{"f":"badges","v":[{"id":"b1","label":"..."},{"id":"b2","label":"..."},{"id":"b3","label":"..."},{"id":"b4","label":"..."}]}
{"f":"stats","v":[{"label":"...","value":"..."},{"label":"...","value":"..."},{"label":"...","value":"..."},{"label":"...","value":"..."}]}
{"f":"services","v":[{"id":"s1","title":"...","description":"..."},{"id":"s2","title":"...","description":"..."},{"id":"s3","title":"...","description":"..."}]}
{"f":"testimonials","v":[{"id":"t1","name":"Prénom N.","role":"Rôle précis","text":"Avis court","rating":5,"photo":"","link":""},{"id":"t2","name":"Prénom N.","role":"Rôle précis","text":"Avis court","rating":5,"photo":"","link":""},{"id":"t3","name":"Prénom N.","role":"Rôle précis","text":"Avis court","rating":5,"photo":"","link":""}]}
{"f":"ctaTitle","v":"Titre offre irrésistible"}
{"f":"ctaText","v":"Texte court, 1 phrase max"}
{"f":"ctaButtonLabel","v":"Libellé bouton (5 mots max)"}
{"f":"calendarLabel","v":"Libellé bouton RDV"}
{"f":"actions","v":{"call":true,"whatsapp":true,"email":false,"website":false}}
{"f":"coverKeyword","v":"2 mots anglais pour recherche photo Unsplash"}

THÈMES : gold=luxe/immo, navy=urgence/BTP/plomberie, emerald=bien-être/santé/coach,
violet=digital/créatif/agence, slate=artisanat/industrie, bordeaux=restaurant/gastronomie,
rose=beauté/mode, sapphire=conseil/formation/B2B, graphite=photo/archi/design,
forest=nature/écologie, crimson=sport/fitness, copper=artisan d'art/déco

RÈGLES :
- stats : EXACTEMENT 4 chiffres ultra-spécifiques (délai, note, volume, années...)
- testimonials : EXACTEMENT 3 avis, prénoms+initiale réalistes, rôle très précis
- bio : 1ère personne, concrète, accrocheuse, 70 mots max
- badges : 3-4 labels de crédibilité propres au secteur
- cta : offre irrésistible adaptée (bilan gratuit, devis 24h, 1ère séance offerte...)
- actions : call+whatsapp pour urgence/artisan ; whatsapp+email+website pour coach/créatif
- coverKeyword : 2 mots anglais simples (ex: "plumber tools", "yoga meditation", "restaurant food", "business meeting")

SORTIR UNIQUEMENT LES 13 LIGNES NDJSON, RIEN D'AUTRE, PAS DE MARKDOWN.`;

const MOCK_FIELDS = [
  { f: "accent", v: "violet" },
  { f: "title", v: "Consultant · Stratégie & Développement" },
  { f: "bio", v: "J'accompagne dirigeants et entrepreneurs à clarifier leur stratégie et accélérer leur croissance. Méthode directe, résultats mesurables dès les premières semaines — sans bullshit." },
  { f: "badges", v: [{ id: "b1", label: "MBA HEC Paris" }, { id: "b2", label: "15 ans d'expérience" }, { id: "b3", label: "Certifié PMP" }, { id: "b4", label: "Audit offert" }] },
  { f: "stats", v: [{ label: "Clients accompagnés", value: "120+" }, { label: "Croissance moyenne", value: "+38%" }, { label: "Satisfaction", value: "4.9/5" }, { label: "Années d'expérience", value: "15 ans" }] },
  { f: "services", v: [{ id: "s1", title: "Audit stratégique offert", description: "45 min pour identifier vos 3 leviers prioritaires et repartir avec un plan d'action." }, { id: "s2", title: "Optimisation commerciale", description: "Structuration de l'offre, pricing, prospection et closing — des résultats mesurables." }, { id: "s3", title: "Accompagnement mensuel", description: "Suivi bi-mensuel, KPIs suivis, ajustements en temps réel pour tenir le cap." }] },
  { f: "testimonials", v: [{ id: "t1", name: "Pierre L.", role: "Gérant PME — Bordeaux", text: "En 6 mois notre CA a augmenté de 40%. Le meilleur investissement de l'année.", rating: 5, photo: "", link: "" }, { id: "t2", name: "Amina T.", role: "Freelance — Paris", text: "Il a restructuré mon offre et mes tarifs. Je me sens enfin professionnelle.", rating: 5, photo: "", link: "" }, { id: "t3", name: "Bertrand G.", role: "Dirigeant — Toulouse", text: "Plan d'action en 3 semaines. Méthode carrée, résultats au rendez-vous.", rating: 5, photo: "", link: "" }] },
  { f: "ctaTitle", v: "Audit stratégique offert — 45 min" },
  { f: "ctaText", v: "Identifions ensemble les 3 leviers prioritaires pour accélérer votre activité." },
  { f: "ctaButtonLabel", v: "Je réserve mon audit" },
  { f: "calendarLabel", v: "Réserver mon audit gratuit" },
  { f: "actions", v: { call: false, whatsapp: true, email: true, website: true } },
  { f: "coverKeyword", v: "business strategy meeting" },
];

async function fetchUnsplashPhoto(keyword: string): Promise<string> {
  try {
    const url = `https://source.unsplash.com/featured/1200x400/?${encodeURIComponent(keyword)},professional`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" });
    clearTimeout(timeout);
    if (res.ok && res.url && !res.url.includes("source.unsplash.com")) {
      return res.url;
    }
    return "";
  } catch {
    return "";
  }
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") return;
  if (!event.path?.startsWith("/api/generate-card-stream")) return;

  const body = (await readBody(event)) as { input?: string; name?: string; email?: string };

  const { res } = event.node;
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const send = (data: unknown) => {
    try {
      const str = typeof data === "string" ? data : JSON.stringify(data);
      res.write(`data: ${str}\n\n`);
    } catch {}
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Mock mode
  if (!apiKey || apiKey === "REPLACE_WITH_YOUR_KEY") {
    for (const field of MOCK_FIELDS) {
      await new Promise((r) => setTimeout(r, 250));
      send(field);
    }
    // Mock cover photo
    await new Promise((r) => setTimeout(r, 300));
    send({ f: "coverPhoto", v: "" });
    send("[DONE]");
    res.end();
    return;
  }

  // Real Anthropic streaming
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const userCtx = body.name ? `Le professionnel s'appelle ${body.name}. ` : "";

    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `${userCtx}Description de l'activité : "${body.input ?? ""}"\n\nGénère le contenu NDJSON maintenant, 13 lignes exactement :`,
      }],
    });

    let buffer = "";
    let coverKeyword = "";

    for await (const evt of stream) {
      if (evt.type === "content_block_delta" && evt.delta.type === "text_delta") {
        buffer += evt.delta.text;
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const parsed = JSON.parse(trimmed) as { f: string; v: unknown };
            if (parsed.f && parsed.v !== undefined) {
              if (parsed.f === "coverKeyword" && typeof parsed.v === "string") {
                coverKeyword = parsed.v;
              }
              send(parsed);
            }
          } catch {}
        }
      }
    }

    // Process remaining buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim()) as { f: string; v: unknown };
        if (parsed.f && parsed.v !== undefined) {
          if (parsed.f === "coverKeyword" && typeof parsed.v === "string") {
            coverKeyword = parsed.v;
          }
          send(parsed);
        }
      } catch {}
    }

    // Fetch Unsplash cover photo
    if (coverKeyword) {
      const photoUrl = await fetchUnsplashPhoto(coverKeyword);
      if (photoUrl) send({ f: "coverPhoto", v: photoUrl });
    }
  } catch {
    send({ f: "error", v: "Génération échouée" });
  }

  send("[DONE]");
  res.end();
});
