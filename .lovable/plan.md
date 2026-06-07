# Optimisation de la page /templates

Objectif : transformer les modèles en véritables **previews de cartes de visite digitales** (photo, identité, contact, réseaux sociaux, CTAs), ajouter une vue détaillée plein écran type mobile, et fiabiliser les filtres déjà en place.

Tout reste sur `src/routes/templates.tsx` (aucune nouvelle route, aucune logique backend).

---

## 1. Enrichir le modèle de données

Étendre le type `Template` pour qu'il contienne tout ce qu'on retrouve sur une vraie carte digitale :

- `avatar` (URL photo réaliste — Unsplash/portrait) + fallback initiales
- `cover` (URL image bandeau optionnelle)
- `company` (entreprise)
- `bio` (1–2 phrases)
- `location` (ville)
- `website`, `phone`, `email`
- `socials` : tableau d'objets `{ type: 'linkedin' | 'instagram' | 'x' | 'tiktok' | 'youtube' | 'whatsapp' | 'facebook', handle }`

Compléter les ~40 modèles existants avec des données démo cohérentes par métier (un avocat → LinkedIn only ; un photographe → Instagram + TikTok ; un restaurateur → Insta + Facebook + WhatsApp, etc.). Photos via URLs Unsplash signées (portrait, par métier).

## 2. Refondre la mini-preview (carte dans le mockup téléphone)

Dans `CardPreview` :

- Ajouter une **bande cover** colorée (gradient à partir de `palette.accent`)
- **Photo de profil ronde** chevauchant la cover (fallback initiales si pas d'avatar)
- Nom + poste + entreprise
- Tagline (courte)
- **Rangée d'actions rapides** (icônes ronds) : 📞 Appeler · ✉️ Email · 💾 vCard · 🔗 Partager
- **Rangée d'icônes sociales** rendues dynamiquement depuis `socials` (lucide icons : Linkedin, Instagram, Youtube, Facebook + SVG inline pour X/TikTok/WhatsApp non présents dans lucide)
- CTA principal coloré (réservation/contact selon secteur — déjà géré via `sector.cta`)

## 3. Ajouter une vue détaillée plein écran (modal mobile)

- Au clic sur une carte → ouvre un **modal centré** avec mockup smartphone grand format (≈ 360×740) montrant la carte digitale en taille réelle, interactive (hover sur les liens, scroll si besoin)
- Header du modal : nom du modèle + secteur + bouton fermer
- Footer du modal : bouton "Utiliser ce modèle" → `/offres`, et "Personnaliser" → `/inscription/carte-physique`
- Fermeture : clic backdrop, ESC, bouton X
- Géré en local state (`selected: Template | null`), pas de Dialog lib supplémentaire (réutiliser le pattern existant ou un simple overlay Tailwind)

## 4. Améliorer le grid + filtres existants

- Garder filtres secteurs + recherche tels quels (déjà bons)
- Ajouter un sous-filtre **style** (Minimal · Bold · Elegant · Dark · Soft · Neo) en chips secondaires
- Sur chaque card du grid : un bouton "Voir en grand" (ouvre le modal) en plus du bouton "Utiliser ce modèle"

## 5. Détails techniques

- Tout en TSX dans `src/routes/templates.tsx` (1 seul fichier touché)
- Icônes sociales : lucide-react pour celles dispo (`Linkedin`, `Instagram`, `Youtube`, `Facebook`) + composants SVG inline minimaux pour `x`, `tiktok`, `whatsapp`
- Photos : URLs Unsplash directes (pas d'upload d'assets — démo uniquement)
- Aucun changement de routes, aucune migration DB, pas de nouveau package npm
- Respect des design tokens existants (`bg-card`, `text-foreground`, etc.) — couleurs des modèles restent dans `palette` inline (volontaire, car ce sont des thèmes de cartes)

---

## Fichier modifié
- `src/routes/templates.tsx`

## Fichier NON modifié
- `src/routes/inscription.carte-physique.tsx` (l'éditeur reste tel quel)
