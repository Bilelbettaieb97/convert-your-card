# SYSTEME.md — Bible Technique Complète · Carte Visite Digitale

> Dernière mise à jour : 13 juin 2026 · Bilel Bettaieb  
> Projet : `cartevisitedigitale.fr` · Supabase `fubbjkcxbomoshyunjnn` · GitHub `convert-your-card`

---

## 1. VUE D'ENSEMBLE

**Framework** : TanStack Start 1.167 (React 19 + TypeScript 5.8) — full-stack SSR  
**Styling** : Tailwind CSS 4.2 + shadcn/ui (Radix UI)  
**Hébergement** : Vercel (compte `bilelbettaieb97`)  
**Live** : https://www.cartevisitedigitale.fr  
**Package manager** : npm  

### Ce que c'est
SaaS B2C — carte de visite digitale (page publique, QR code, analytics) pour entrepreneurs et indépendants français.

### Plans actuels (système live)

| Plan | Prix | Essai | Description |
|------|------|-------|-------------|
| **Essentielle** | Gratuit | — | Carte basique avec branding CVD |
| **Vitrine** | 4,80€/mois ou ~57€/an | 3 jours | Carte premium sans branding, stats, sections avancées |
| **Carte connectée** (add-on) | 29€ one-time (39€ métal) | — | Carte NFC physique gravée, livrée en 48h–5j ouvrés |

> **Pages orphelines bloquées** : Les fichiers `inscription.selection-de-plan.tsx`, `inscription.offre.$plan.tsx` et `checkout-embedded.ts` existent dans le code (plans Free/Starter/Pro/Premium) mais sont des **pages zombies non liées depuis la navigation**. Bloquées par redirect Vercel → `/inscription`. À supprimer lors d'un refactor.

---

## 2. SUPABASE — TOUTES LES TABLES

**Projet** : `fubbjkcxbomoshyunjnn`  
**URL** : https://fubbjkcxbomoshyunjnn.supabase.co  
**Région** : eu-west-3 (Paris)  
**PostgreSQL version** : 14.5  
**Auth** : OAuth Google + Magic Link Email + Password  

---

### 2.1 `nfc_profiles` — Cartes utilisateurs (TABLE CORE)

La table centrale. 1 ligne = 1 carte de visite digitale.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | Identifiant unique de la carte |
| `user_id` | UUID (FK → auth.users, nullable) | Propriétaire |
| `slug` | TEXT | URL publique : `/{slug}` (unique) |
| `plan` | TEXT | `"free"` / `"essentielle"` / `"vitrine"` |
| `actif` | BOOL | Carte visible publiquement ou non |
| `email` | TEXT | Email affiché sur la carte |
| `nom` | TEXT | Nom complet |
| `fonction` | TEXT | Titre / poste |
| `entreprise` | TEXT | Nom de l'entreprise |
| `telephone` | TEXT | Numéro de téléphone |
| `bio` | TEXT | Texte de présentation |
| `site_web` | TEXT | URL du site web |
| `photo_url` | TEXT | URL photo de profil |
| `cover_url` | TEXT | URL photo de couverture / bannière |
| `logo_url` | TEXT | Logo de l'entreprise |
| `couleur_accent` | TEXT | Thème : `"gold"`, `"noir"`, `"navy"`, etc. |
| `template_id` | TEXT | ID du template visuel |
| `bg_type` | TEXT | Type de fond |
| `font_family` | TEXT | Police personnalisée |
| `gradient_start` | TEXT | Couleur début gradient (perso) |
| `gradient_end` | TEXT | Couleur fin gradient (perso) |
| `custom_domain` | TEXT | Domaine personnalisé (feature avancée) |
| `show_branding` | BOOL | Afficher le branding CVD ou non |
| `card_data` | JSONB | Config complète carte (source of truth éditeur) |
| `boutons` | JSONB | Boutons d'action (call, email, WhatsApp, RDV…) |
| `reseaux` | JSONB | Liens réseaux sociaux |
| `secteur` | TEXT | Secteur d'activité / profession |
| `badges` | JSONB | Badges et certifications |
| `services` | JSONB | Liste des services proposés |
| `temoignages` | JSONB | Témoignages clients |
| `stats_cles` | JSONB | Chiffres clés (KPIs) |
| `langues` | JSONB | Langues parlées |
| `biens` | JSONB | Biens immobiliers (usage immobilier) |
| `cta` | JSONB | Bannière CTA (titre, texte, bouton) |
| `vcard_enabled` | BOOL | Téléchargement vCard activé |
| `video_url` | TEXT | URL vidéo YouTube intégrée |
| `sections_active` | JSONB | Sections visibles (booléens par section) |
| `sections_order` | JSONB | Ordre des sections (drag & drop) |
| `last_seen_at` | TIMESTAMP | Dernière connexion au dashboard |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Dernière modification |

**Source of truth** : `card_data` (JSONB) — c'est le JSON complet de la carte tel qu'édité dans le dashboard. Les colonnes plates (`nom`, `bio`, etc.) sont une duplication partielle pour la lisibilité.

**RLS** : Lecture publique par slug · Écriture uniquement par le propriétaire (`user_id = auth.uid()`)

---

### 2.2 `subscriptions` — Abonnements Stripe

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `user_id` | UUID (FK → auth.users) | Propriétaire |
| `stripe_customer_id` | TEXT | ID customer Stripe (`cus_xxx`) |
| `stripe_subscription_id` | TEXT | ID abonnement Stripe (`sub_xxx`) |
| `plan` | TEXT | `"free"` / `"essentielle"` / `"vitrine"` |
| `status` | TEXT | `"trialing"` / `"active"` / `"canceled"` / `"past_due"` / `"incomplete_expired"` / `"unpaid"` |
| `current_period_end` | TIMESTAMP | Prochaine facturation ou fin de trial |
| `had_trial` | BOOL | `true` si essai déjà consommé (ne revient jamais à false) |
| `payment_method_set` | BOOL | CB fournie pendant le trial ? |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

**⚠️ Important** : `subscriptions.plan` peut être `"free"` même si l'user est sur un plan payant (webhook pas encore passé). `nfc_profiles.plan` est la source of truth finale pour le plan affiché. Le code `billing.tsx` gère explicitement ce cas.

**Logique status** :
- `"trialing"` → essai en cours (3 jours)
- `"active"` → abonné payant (ou trialing si `payment_method_collection="if_required"` — Stripe bug connu)
- `"canceled"` / `"past_due"` / `"incomplete_expired"` / `"unpaid"` → désactivé → `actif=false` + `plan="free"`

---

### 2.3 `nfc_analytics` — Tracking événements carte

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `profile_id` | UUID (FK → nfc_profiles) | Carte concernée |
| `event_type` | TEXT | `"view"` / `"click_button"` / `"click_social"` / `"vcard_download"` / `"qr_scan"` |
| `event_data` | JSONB | Métadonnées : bouton cliqué, source, ville… |
| `created_at` | TIMESTAMP | Timestamp de l'événement |

**RLS** : Insertion publique (sans auth) · Lecture uniquement par le propriétaire du profil.

---

### 2.4 `nfc_contacts` — CRM des personnes qui ont scanné

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `profile_id` | UUID (FK → nfc_profiles) | Carte scannée |
| `user_id` | UUID | Propriétaire de la carte |
| `name` | TEXT | Nom du contact |
| `email` | TEXT | Email du contact |
| `phone` | TEXT | Téléphone |
| `company` | TEXT | Entreprise du contact |
| `role` | TEXT | Poste du contact |
| `city` | TEXT | Ville |
| `source` | TEXT | Source (QR, lien, tap…) |
| `notes` | TEXT | Notes manuelles |
| `tags` | TEXT[] | Tags (array, pas JSONB) |
| `starred` | BOOL | Contact favori |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

### 2.5 `nfc_leads` — Pipeline commercial Kanban

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `profile_id` | UUID (FK → nfc_profiles) | Carte associée |
| `user_id` | UUID | Propriétaire |
| `name` | TEXT | Nom du lead |
| `email` | TEXT | Email |
| `phone` | TEXT | Téléphone |
| `company` | TEXT | Entreprise |
| `status` | TEXT | Statut Kanban (ex: `"nouveau"`, `"en_cours"`, `"gagné"`, `"perdu"`) |
| `value` | NUMERIC | Valeur estimée du deal |
| `notes` | TEXT | Notes |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

### 2.6 `nfc_orders` — Commandes cartes physiques

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `profile_id` | UUID (FK → nfc_profiles) | Carte associée |
| `user_id` | UUID | Propriétaire |
| `order_ref` | TEXT | Référence commande |
| `model` | TEXT | Modèle commandé (mat, brillant, métal) |
| `qty` | INT | Quantité |
| `total_cents` | INT | Total en centimes |
| `shipping_address` | JSONB | Adresse de livraison complète |
| `status` | TEXT | `"pending"` / `"processing"` / `"shipped"` / `"delivered"` |
| `tracking_number` | TEXT | Numéro de suivi |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

### 2.7 `card_previews` — Prévisualisations temporaires 24h

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `token` | TEXT | Token unique URL `/preview/:token` |
| `card_data` | JSONB | Données de la carte |
| `expires_at` | TIMESTAMP | Expiration à 24h |
| `created_at` | TIMESTAMP | — |

---

### 2.8 `notification_prefs` — Préférences de notifications

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `user_id` | UUID | — |
| `scan_email` | BOOL | Notif email à chaque scan |
| `scan_push` | BOOL | Notif push à chaque scan |
| `click_email` | BOOL | Notif email à chaque clic |
| `click_push` | BOOL | Notif push à chaque clic |
| `save_email` | BOOL | Notif email si contact sauvegardé |
| `save_push` | BOOL | — |
| `order_email` | BOOL | Notif email commande physique |
| `order_push` | BOOL | — |
| `tips_email` | BOOL | Emails de conseils CVD |
| `tips_push` | BOOL | — |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

### 2.9 `builder_progress` — Suivi funnel Builderia

| Colonne | Type | Description |
|---------|------|-------------|
| `user_id` | UUID (PK) | Unique par user |
| `step` | INT | Étape numérotée |
| `step_name` | TEXT | `null` / `"builderia"` / `"builderia-resultat"` / `"stripe-checkout"` |
| `updated_at` | TIMESTAMP | — |

---

### 2.10 Tables séries email automatiques

Chaque table a `UNIQUE(email, step)` — protection anti-doublon garantie.

| Table | Série | Steps | Durée |
|-------|-------|-------|-------|
| `email_relance_series` | ① NC (email non confirmé) | 4 | 2 jours |
| `builder_relance_series` | ② BR (Builderia abandonné) | 6 | 9 jours |
| `trial_relance_series` | ③ TR (essai Vitrine) | 3 | 3 jours |
| `vitrine_upgrade_series` | ④ VU (upgrade Essentielle → Vitrine) | 12 | 50 jours |

Schéma commun : `id`, `email`, `step`, `click_token`, `sent_at`, `clicked_at`

---

### 2.11 `cron_execution_logs` — Logs du cron

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `ran_at` | TIMESTAMP | Horodatage d'exécution |
| `total_sent` | INT | Emails envoyés |
| `results` | JSONB | Détail par série et étape |
| `errors` | TEXT | Erreur fatale si présente |
| `duration_ms` | INT | Durée d'exécution |

---

### 2.12 `cookie_consents` — RGPD consent tracking

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `consent_id` | TEXT | ID unique de consentement |
| `action` | TEXT | `"accept"` / `"refuse"` / `"customize"` |
| `necessary` | BOOL | Cookies nécessaires (toujours true) |
| `analytics` | BOOL | Google Analytics accepté |
| `marketing` | BOOL | Meta Pixel accepté |
| `preferences` | BOOL | Cookies préférences |
| `page_url` | TEXT | Page où le consentement a été donné |
| `referrer` | TEXT | Page précédente |
| `user_agent` | TEXT | — |
| `ip_country` | TEXT | Pays de l'IP |
| `created_at` | TIMESTAMP | — |

---

### 2.13 `blog_articles` — Blog CVD

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID (PK) | — |
| `slug` | TEXT | URL de l'article |
| `title` | TEXT | Titre |
| `content` | TEXT | Contenu (Markdown ou HTML) |
| `excerpt` | TEXT | Résumé |
| `category` | TEXT | Catégorie |
| `tags` | JSONB | Tags |
| `author_name` | TEXT | Auteur |
| `image` | TEXT | Image principale |
| `meta_description` | TEXT | SEO |
| `published` | BOOL | Publié ou brouillon |
| `published_at` | TIMESTAMP | Date de publication |
| `read_time` | TEXT | Temps de lecture estimé |
| `user_id` | UUID | Auteur (FK auth.users) |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

### 2.14 Tables outils marketing ConvertiLab (partagées)

Ces tables sont dans le même projet Supabase mais appartiennent à l'écosystème ConvertiLab (outils gratuits de la landing page) :

| Table | Description |
|-------|-------------|
| `ads_estimations` | Outil estimation budget Meta Ads (budget_monthly, sector, estimated_leads, estimated_roas…) |
| `chatbot_leads` | Leads chatbot avec score global et grade (A/B/C/D) |
| `contact_submissions` | Formulaire de contact landing (name, email, phone, project, urgency, budget…) |
| `design_audits` | Audit design avec scores détaillés (score_global, score_mobile, score_cta, grade, report_html) |
| `devis_submissions` | Formulaire devis (company, sector, offer, message) |
| `mentions_legales` | Outil mentions légales auto (siret, company_type, host) |
| `mockup_requests` | Demandes de mockup site web |
| `offer_reservations` | Réservations d'offres spéciales |
| `price_estimations` | Estimations de prix site web (site_type, pages, features, budget) |
| `robots_generations` | Outil génération robots.txt (domain, urls_discovered) |
| `sector_reports` | Rapports sectoriels (sector_name, sector_slug) |
| `seo_audits` | Audit SEO avec scores par catégorie (onpage, mobile, technique, contenu, geo…) |
| `newsletter_subscriptions` | Capture email landing |
| `email_queue` | File d'attente emails legacy (form_type, series_index, send_at, status) |

---

### 2.15 RPC `get_user_funnel()`

Fonction SQL `SECURITY DEFINER` — joint toutes les tables en une vue complète par user. Utilisée exclusivement par le cron `/api/cron-daily`.

**Champs** : `user_id`, `email`, `inscrit_le`, `email_confirme_le`, `plan`, `actif`, `slug`, `nom`, `entreprise`, `profil_cree_le`, `stripe_subscription_id`, `subscription_status`, `trial_end`, `had_trial`, `relance_step`, `relance_sent_at`, `relance_clicked_at`, `builder_step`, `builder_step_name`, `builder_relance_step`, `vitrine_relance_step`, `trial_relance_step`

---

### 2.16 Auth Supabase

| Méthode | Route | Description |
|---------|-------|-------------|
| OAuth Google | Toutes les pages | `supabase.auth.signInWithOAuth()` |
| Magic Link Email | `/inscription` | `supabase.auth.signInWithOtp()` |
| Password | `/connexion` | `supabase.auth.signInWithPassword()` |
| Callback | `/auth/callback` | Exchange code → session + pré-remplit carte |
| Reset | `/reset-password` | `supabase.auth.updateUser({ password })` |

**Champ custom** : `user_metadata.has_password` (bool) → déclenche `PasswordGate` si absent (obligatoire pour OAuth users).

**Session stockage côté client** : `localStorage` via SDK Supabase (auto-refresh token).

---

## 3. STRIPE

**Mode** : Live (production)  
**API Version** : `2026-05-27.dahlia`  
**Bibliothèque** : `stripe` 22.2 + `@stripe/react-stripe-js` 6.6  

---

### 3.1 Plans & Price IDs

#### Système principal (actuel)

| Plan | Billing | Env var | Price ID |
|------|---------|---------|----------|
| Vitrine | Mensuel | `STRIPE_PRICE_VITRINE_MONTHLY` | `price_1TgkuQPH3gwARGh9pKxOcR3Y` |
| Vitrine | Annuel | `STRIPE_PRICE_VITRINE_YEARLY` | `price_1TgnLtPH3gwARGh91YsyqtEI` |
| Essentielle | — | Gratuit | — |
| Carte connectée | One-time | `price_data` inline | 29€ mat/brillant · 39€ métal |

#### Système alternatif (`/inscription/offre/$plan`)

| Plan | Billing | Env var |
|------|---------|---------|
| Starter | Monthly | `STRIPE_PRICE_STARTER_MONTHLY` |
| Starter | Annual | `STRIPE_PRICE_STARTER_ANNUAL` |
| Pro | Monthly | `STRIPE_PRICE_PRO_MONTHLY` |
| Pro | Annual | `STRIPE_PRICE_PRO_ANNUAL` |
| Premium | Monthly | `STRIPE_PRICE_PREMIUM_MONTHLY` |
| Premium | Annual | `STRIPE_PRICE_PREMIUM_ANNUAL` |

---

### 3.2 `checkout.ts` — Abonnement Vitrine (redirect checkout)

**Fonction** : `createCheckoutSession({ plan, billing, email, userId? })`  
**Mode Stripe** : `"subscription"` avec `payment_method_types: ["card"]`

```
1. Vérifie si stripe_customer_id existe dans subscriptions
   → Si oui : trial déjà consommé (had_trial = true)
2. Si trial disponible :
   - payment_method_collection = "if_required"
   - trial_period_days = 3
   - trial_settings.end_behavior.missing_payment_method = "cancel"
3. Si trial consommé :
   - payment_method_collection = "always"
   - Pas de trial
4. Réutilise le customer Stripe existant si disponible
5. allow_promotion_codes = true
6. metadata = { plan, billing, email, user_id, has_trial }
7. Success URL → /bienvenue?session_id={CHECKOUT_SESSION_ID}
8. Cancel URL → /dashboard/account (rétente) ou /builderia/resultat (1ère fois)
```

---

### 3.3 `checkout-embedded.ts` — Plans Starter/Pro/Premium (embedded checkout) ⚠️ DEAD CODE

**Fonction** : `createEmbeddedCheckout({ plan, billing, email })`  
**Mode Stripe** : `"subscription"` avec `ui_mode: "embedded"`  
**Retourne** : `{ clientSecret }` (pas une URL)  
**Rendu** : `<EmbeddedCheckoutProvider>` + `<EmbeddedCheckout>` dans la page React  
**Trial** : 3 jours pour Pro et Premium (pas pour Starter)  
**⚠️ Non utilisé** : pages d'entrée bloquées par redirect Vercel → `/inscription`. À supprimer lors d'un refactor.  

---

### 3.4 `checkout-nfc.ts` — Carte connectée physique

**Fonction** : `createNfcCheckoutSession({ finish, color, name, role, email, userId? })`  
**Mode Stripe** : `"payment"` (one-time, pas d'abonnement)  
**Prix** : 29€ (mat/brillant) · 39€ (métal) — `price_data` inline  
**Collecte adresse** : FR, BE, CH, LU, MC uniquement  
**Success URL** → `/dashboard?nfc=success`  
**Cancel URL** → `/carte-physique`  
**allow_promotion_codes** : true  

---

### 3.5 `verify-upgrade.ts` — Confirmation post-checkout

**Fonction** : `verifyUpgrade({ sessionId })`  
**Appelée depuis** : `/bienvenue` page au retour de Stripe

```
1. Stripe.checkout.sessions.retrieve(sessionId)
2. Vérifie status="complete" + payment_status="paid"
3. Trouve profil par email (metadata) ou user_id
4. Met à jour nfc_profiles.plan = "vitrine" + actif = true
5. Upsert subscriptions (stripe_customer_id, stripe_subscription_id, status, current_period_end)
6. Idempotent — les webhooks peuvent avoir déjà mis à jour
```

---

### 3.6 `billing-portal.ts` — Portail facturation

**Fonction** : `createPortalSession({ customerId, returnUrl })`  
**Redirige vers** : Portail Stripe natif (CB, résiliation, factures, changement de plan)  
**Appelée depuis** : `dashboard/billing.tsx` et `dashboard/account.tsx`  

---

### 3.7 `stripe-card.ts` — Info carte bancaire

**Fonction** : `getStripeCard({ email, customerId? })`  
**Retourne** : `{ customerId, brand, last4, exp_month, exp_year }` ou `null`  
**Utilisation** : Affichage "Visa •••• 4242" dans `dashboard/billing.tsx`  

---

### 3.8 `stripe-invoices.ts` — Historique factures

**Fonction** : `getStripeInvoices({ customerId })`  
**Retourne** : 12 dernières factures avec `{ id, number, amount, currency, status, created, pdf, period_start, period_end }`  
**Utilisation** : Section "Historique des factures" dans `dashboard/billing.tsx`  

---

### 3.9 Webhook Stripe (`/webhook/stripe`)

| Événement | Action |
|-----------|--------|
| `checkout.session.completed` | Crée `nfc_profiles` + `subscriptions`, envoie email bienvenue + notif admin |
| `customer.subscription.updated` | Met à jour `status`, `current_period_end`, `had_trial`. Si statut inactif → `plan="free"` + `actif=false` |
| `customer.subscription.deleted` | `plan="free"`, `status="canceled"`, `actif=false` |

**Sécurité** : Vérification HMAC-SHA256 (`STRIPE_WEBHOOK_SECRET`)

---

## 4. VERCEL

**Compte** : bilelbettaieb97  
**Domaine** : cartevisitedigitale.fr + www.cartevisitedigitale.fr  

### 4.1 `vercel.json`

```json
{
  "redirects": [
    { "source": "/pricing",  "destination": "/",          "permanent": false },
    { "source": "/builder",  "destination": "/builderia", "permanent": false }
  ],
  "crons": [
    { "path": "/api/cron-daily",  "schedule": "0 * * * *"   },
    { "path": "/api/cron-nc-fast","schedule": "*/10 * * * *" }
  ]
}
```

**Crons** :
- `/api/cron-daily` : toutes les heures à H:00 → séries email automatiques
- `/api/cron-nc-fast` : toutes les 10 minutes → actions rapides

### 4.2 Headers de sécurité (appliqués à toutes les routes)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy:
  default-src 'self'
  script-src 'self' 'unsafe-inline' 'unsafe-eval' GTM google-analytics facebook stripe
  style-src 'self' 'unsafe-inline' fonts.googleapis.com
  font-src 'self' data: fonts.gstatic.com
  img-src 'self' data: blob: https:
  connect-src 'self' *.supabase.co wss://*.supabase.co api.stripe.com api.resend.com google-analytics.com
  frame-src js.stripe.com hooks.stripe.com youtube.com youtube-nocookie.com
  object-src 'none'
```

### 4.3 Variables d'environnement complètes

**Publiques (préfixe `VITE_` — exposées au client)**
```
VITE_SUPABASE_URL               = https://fubbjkcxbomoshyunjnn.supabase.co
VITE_SUPABASE_ANON_KEY          = eyJhbGc... (JWT anon)
VITE_SUPABASE_PUBLISHABLE_KEY   = eyJhbGc... (alias anon)
VITE_SUPABASE_PROJECT_ID        = fubbjkcxbomoshyunjnn
VITE_APP_URL                    = https://www.cartevisitedigitale.fr
VITE_STRIPE_PUBLISHABLE_KEY     = pk_live_51SdAxj...
VITE_ANTHROPIC_API_KEY          = (si exposé — sinon côté serveur uniquement)
```

**Serveur uniquement**
```
SUPABASE_URL                    = https://fubbjkcxbomoshyunjnn.supabase.co
SUPABASE_SERVICE_ROLE_KEY       = eyJhbGc... (service role — accès total sans RLS)
STRIPE_SECRET_KEY               = sk_live_...
STRIPE_WEBHOOK_SECRET           = whsec_...
STRIPE_PRICE_VITRINE_MONTHLY    = price_1TgkuQPH3gwARGh9pKxOcR3Y
STRIPE_PRICE_VITRINE_YEARLY     = price_1TgnLtPH3gwARGh91YsyqtEI
STRIPE_PRICE_STARTER_MONTHLY    = (plans alternatifs)
STRIPE_PRICE_STARTER_ANNUAL     = ...
STRIPE_PRICE_PRO_MONTHLY        = ...
STRIPE_PRICE_PRO_ANNUAL         = ...
STRIPE_PRICE_PREMIUM_MONTHLY    = ...
STRIPE_PRICE_PREMIUM_ANNUAL     = ...
RESEND_API_KEY                  = re_...
ANTHROPIC_API_KEY               = sk-ant-... (Claude Haiku pour Builderia)
CRON_SECRET                     = ... (authentifie les appels cron Vercel)
```

---

## 5. ROUTES — CARTE COMPLÈTE

### 5.1 Pages publiques

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | `index.tsx` | Landing : Hero, Pricing, Features, Témoignages, FAQ, CTA |
| `/templates` | `templates.tsx` | Galerie de templates |
| `/offres` | `offres.tsx` | Page pricing détaillée |
| `/carte-physique` | `carte-physique.tsx` | Vente carte connectée physique |
| `/metiers` | `metiers/index.tsx` | Hub SEO — 47 métiers listés |
| `/metiers/coach` | `metiers/coach.tsx` | Page statique Coach |
| `/metiers/:slug` | `metiers/$slug.tsx` | Pages dynamiques métier (~40 slugs : plombier, avocat, dentiste…) |
| `/:slug` | `$slug.tsx` | Page publique d'une carte (sans auth, SSR via adminSupabase) |
| `/preview/:token` | `preview.$token.tsx` | Prévisualisation temporaire 24h |

**Métiers disponibles** : coach, agent-immobilier, conseiller-immobilier, mandataire-immobilier, chef-restaurateur, gerant-cafe, pizzaiolo, chef-etoile, osteopathe, dentiste, naturopathe, kinesitherapeute, macon, charpentier, electricien, plombier, coiffeuse, barbier, estheticienne, maquilleuse, consultant, designer-freelance, account-executive, sales-manager, business-developer, avocat, notaire, juriste, photographe, videaste, graphiste, coach-sportif, yoga, coach-crossfit, menuisier, fleuriste, bijoutier, mecanicien, carrossier, conseiller-auto, formateur, coach-carriere, professeur-particulier

### 5.2 Auth

| Route | Fichier | Description |
|-------|---------|-------------|
| `/inscription` | `inscription.tsx` | Layout inscription (outlet) |
| `/inscription/` | `inscription.index.tsx` | Formulaire inscription (magic link + Google) |
| `/inscription/selection-de-plan` | `inscription.selection-de-plan.tsx` | Sélection plan avant checkout |
| `/inscription/offre/:plan` | `inscription.offre.$plan.tsx` | Checkout embedded Stripe (starter/pro/premium) |
| `/inscription/carte-physique` | `inscription.carte-physique.tsx` | Achat carte physique depuis flux inscription |
| `/connexion` | `connexion.tsx` | Connexion password + Google OAuth |
| `/auth/callback` | `auth.callback.tsx` | Handler OAuth → session + pré-remplit carte |
| `/reset-password` | `reset-password.tsx` | Reset mot de passe |
| `/bienvenue` | `bienvenue.tsx` | Post-checkout : verifyUpgrade + sync carte + redirect |
| `/onboarding` | `onboarding.tsx` | Redirect permanent → `/builderia` |

### 5.3 Funnel Builderia (IA)

| Route | Fichier | Description |
|-------|---------|-------------|
| `/builderia` | `builderia.tsx` | Layout (outlet) |
| `/builderia/` | `builderia/index.tsx` | Générateur IA — prompt texte → card animée |
| `/builderia/resultat` | `builderia/resultat.tsx` | Résultat — score, aperçu, thèmes, CTA upgrade |

### 5.4 Dashboard (protégées — auth requise)

**Layout** : `dashboard.tsx` → header sticky + sidebar + `<Outlet />`

**Accès plan Essentielle** : uniquement `/content`, `/account`, `/billing`, `/settings`, `/help` — tout le reste → redirect `/dashboard/content`

| Route | Fichier | Plan | Description |
|-------|---------|------|-------------|
| `/dashboard` | `dashboard/index.tsx` | Tous | Redirect → `/dashboard/content` |
| `/dashboard/card` | `dashboard/card.tsx` | Vitrine | Aperçu, QR code, lien public, ShareGrid |
| `/dashboard/carte` | `dashboard/carte.tsx` | Vitrine | Alias de `/dashboard/card` |
| `/dashboard/content` | `dashboard/content.tsx` | Tous | Éditeur BrickList drag & drop, preview phone |
| `/dashboard/theme` | `dashboard/theme.tsx` | Vitrine | Thème couleur (accent) |
| `/dashboard/style` | `dashboard/style.tsx` | Vitrine | Variants visuels par section |
| `/dashboard/media` | `dashboard/media.tsx` | Vitrine | Upload photo, couverture, logo |
| `/dashboard/links` | `dashboard/links.tsx` | — | Redirect → `/dashboard/content` |
| `/dashboard/statistiques` | `dashboard/statistiques.tsx` | Vitrine (partiel) | Analytics 7j, graphes, top clics |
| `/dashboard/contacts` | `dashboard/contacts.tsx` | Vitrine | CRM nfc_contacts |
| `/dashboard/leads` | `dashboard/leads.tsx` | Vitrine | Pipeline Kanban nfc_leads |
| `/dashboard/analytics` | `dashboard/analytics.tsx` | Vitrine | Stats avancées : heatmap, sources |
| `/dashboard/notifications` | `dashboard/notifications.tsx` | Vitrine | Feed temps réel + préférences |
| `/dashboard/team` | `dashboard/team.tsx` | Vitrine | Multi-cartes, membres (à venir) |
| `/dashboard/modeles` | `dashboard/modeles.tsx` | Vitrine | Galerie modèles |
| `/dashboard/integrations` | `dashboard/integrations.tsx` | Vitrine | HubSpot, Zapier, Calendly… |
| `/dashboard/orders` | `dashboard/orders.tsx` | Tous | Historique commandes cartes physiques |
| `/dashboard/commander` | `dashboard/commander.tsx` | Tous | Commander la carte connectée physique |
| `/dashboard/account` | `dashboard/account.tsx` | Tous | Plan, upgrade, trial, déconnexion |
| `/dashboard/billing` | `dashboard/billing.tsx` | Tous | Factures, CB, portail Stripe |
| `/dashboard/settings` | `dashboard/settings.tsx` | Tous | Profil, sécurité, RGPD, export JSON |
| `/dashboard/help` | `dashboard/help.tsx` | Tous | Checklist onboarding, tutos YouTube |

### 5.5 Légal

| Route | Description |
|-------|-------------|
| `/cgu` | Conditions Générales d'Utilisation |
| `/cgv` | Conditions Générales de Vente |
| `/confidentialite` | Politique de confidentialité |
| `/mentions-legales` | Mentions légales |
| `/cookies` | Politique cookies |
| `/unsubscribe` | Désinscription email (paramètre `e=email`) |

---

## 6. FONCTIONS SERVEUR (src/fns/)

Créées avec `createServerFn` de TanStack Start. S'exécutent exclusivement côté serveur, exposées comme endpoints POST.

| Fichier | Fonction | Input | Output |
|---------|----------|-------|--------|
| `checkout.ts` | `createCheckoutSession` | `{ plan, billing, email, userId? }` | `{ url }` |
| `checkout-embedded.ts` | `createEmbeddedCheckout` | `{ plan, billing, email }` | `{ clientSecret }` |
| `checkout-nfc.ts` | `createNfcCheckoutSession` | `{ finish, color, name, role, email, userId? }` | `{ url }` |
| `verify-upgrade.ts` | `verifyUpgrade` | `{ sessionId }` | `{ ok, plan }` |
| `activate-free.ts` | `activateFree` | `{ email, accessToken }` | `{ url: "/bienvenue" }` |
| `billing-portal.ts` | `createPortalSession` | `{ customerId, returnUrl }` | `{ url }` |
| `stripe-card.ts` | `getStripeCard` | `{ email, customerId? }` | `CardInfo \| null` |
| `stripe-invoices.ts` | `getStripeInvoices` | `{ customerId }` | `Invoice[]` (12 max) |
| `generate-card.ts` | `generateCard` | `{ input, name?, email? }` | `Partial<CardData>` |
| `get-card-preview.ts` | `getCardPreview` | `{ token }` | `CardData \| null` |
| `save-card-preview.ts` | `saveCardPreview` | `{ cardData }` | `{ token }` |
| `signup.ts` | `signUpWithAutoConfirm` | `{ email, password }` | `{ exists: bool }` |

**`activateFree` — sécurité** : Vérifie le JWT du caller avec le client Supabase anon avant de créer le profil. Rejette les emails jetables (`isDisposableEmail()`). Non-falsifiable côté client.

**`generateCard` — IA** : Utilise `claude-haiku-4-5-20251001` (Claude Haiku), `max_tokens: 1400`. Mode mock si `ANTHROPIC_API_KEY` absent. Garantit exactement 4 stats et 3 témoignages. Ordre de sections fixe.

---

## 7. STORES & LIBRAIRIES (src/lib/)

### `use-plan.ts` — État du plan utilisateur

```typescript
// Requêtes parallèles :
// - nfc_profiles (id, slug, plan, actif, created_at)
// - subscriptions (status, current_period_end, payment_method_set)

export const TRIAL_DAYS = 3;

// Retourne :
{
  plan: "essentielle" | "vitrine" | "free",
  slug, profileId, hasProfile, actif, loading,
  isInTrial,         // trialing OU period_end ≤ 4j depuis created_at
  trialDaysLeft,     // Jours restants (via trialEnd si dispo, sinon daysOld)
  trialExpired,      // daysOld >= 3 ET plan !== "vitrine"
  paymentMethodSet,  // CB enregistrée pendant le trial
  daysLeft,          // TRIAL_DAYS - daysOld
}
```

**⚠️ Double vérification trial** : Stripe peut retourner `status="active"` même en trial quand `payment_method_collection="if_required"` (bug Stripe connu). La logique `isInTrialPeriod` le détecte via `trialEnd - created_at <= 4 jours`.

### `card-store.ts` — Carte (localStorage)

**Clé** : `"cyk.card.v1"`  
Données de la carte éditée localement, synchronisées avec Supabase via `card-actions.ts`.  
**Méthodes** : `update(key, value)`, `setData(card)`, `reset()`, `loadCard()`, `saveCard(data)`

### `auth-store.ts` — Session Supabase

Singleton avec `supabase.auth.onAuthStateChange()`. Cache `cachedUser`, `cachedSession`. Retourne `{ user, session, loading }`.

### `profile-store.ts` — Cache profil

**Clé** : `"nfc_profile"` — Cache léger `{ id, slug, plan, actif }`.  
**Fonctions** : `getProfileMeta()`, `setProfileMeta(meta)`, `clearProfileMeta()`

### `card-actions.ts` — CRUD carte Supabase

- `loadMyCard()` — Charge depuis `nfc_profiles` (par user_id)
- `createCard(data)` — INSERT dans `nfc_profiles`
- `updateCard(profileId, data)` — UPDATE `card_data` + colonnes plates
- `publishCard(profileId)` / `unpublishCard(profileId)` — Toggle `actif`

### `stripe.ts` — Client Stripe + utilitaires

```typescript
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-05-27.dahlia" });

export const PRICE_IDS = {
  essentielle: { monthly: "", yearly: "" },
  vitrine: { monthly: STRIPE_PRICE_VITRINE_MONTHLY, yearly: STRIPE_PRICE_VITRINE_YEARLY },
}

export function generateSlug(nom: string): string  // Normalise + kebab-case + 30 chars max
export async function ensureUniqueSlug(baseSlug, checkExists): Promise<string>  // Ajoute -1, -2...
```

### `supabase-admin.ts` — Client service role (serveur uniquement)

```typescript
export const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})
```
Utilisé uniquement dans les `createServerFn` et les routes SSR comme `$slug.tsx`.

### `vcard.ts` — Génération vCard

**Format** : vCard 3.0 (compatible iPhone, Android, Outlook)  
**Champs** : N, FN, ORG, TITLE, TEL, EMAIL, URL, PHOTO, ADR, socialProfiles  
**Déclenche** : download automatique du fichier `.vcf`

### `card-themes.ts` — Catalogue des 22 thèmes

```typescript
export type ThemeAccent =
  "gold" | "noir" | "emerald" | "forest" | "navy" | "sapphire" |
  "graphite" | "bordeaux" | "slate" | "violet" | "crimson" | "magenta" |
  "copper" | "cream" | "sand" | "clay" | "rose" | "blush" |
  "mint" | "sky" | "paper" | "sun"
```

Chaque thème a : `{ id, palette: { accent, bg, text, gradient, mode: "light"|"dark" } }`

**Thèmes legacy** (anciens, encore supportés sur `$slug.tsx`) : violet, rose, bleu, vert, sombre, clair

### `is-disposable-email.ts` — Blacklist emails jetables

Utilisée dans `activate-free.ts` et `signup.ts` pour rejeter les adresses temporaires (mailinator, yopmail, guerrillamail…).

---

## 8. MODÈLE `CardData` — Structure Complète

```typescript
interface CardData {
  // Identité (toujours visible)
  name: string;          // Nom complet
  title: string;         // Titre professionnel
  agency: string;        // Entreprise
  area: string;          // Zone géographique
  photo: string;         // URL photo profil
  coverPhoto: string;    // URL bannière

  // Thème
  accent: ThemeAccent;   // 22 valeurs possibles
  profession?: string;   // Persona Builderia (plombier, coach…)

  // Sections toggles (boolean)
  vcardEnabled: boolean;
  statsEnabled: boolean;
  aboutEnabled: boolean;
  videoEnabled: boolean;
  servicesEnabled: boolean;
  listingsEnabled: boolean;
  galleryEnabled: boolean;
  testimonialsEnabled: boolean;
  calendarEnabled: boolean;
  languagesEnabled: boolean;
  ctaEnabled: boolean;
  contactEnabled: boolean;
  socialsEnabled: boolean;

  // Actions (boutons flottants)
  actions: { call: boolean; whatsapp: boolean; email: boolean; website: boolean; rdv: boolean }

  // Contact
  phone: string;
  phoneDisplay: string;  // Format affiché
  email: string;
  website: string;
  whatsapp: string;      // Numéro sans "+"

  // Données sections
  bio: string;
  badges: { id, label }[]
  stats: { label, value }[]
  services: { id, title, description, url? }[]
  listings: { id, img, title, meta, price, url? }[]    // Biens ou produits
  gallery: { id, img, caption, url? }[]
  testimonials: { id, name, role, text, rating, photo, link }[]
  testimonialsStyle: "cards" | "stacked" | "compact"
  languages: { id, name, level }[]

  // Vidéo YouTube
  videoTitle: string;
  videoUrl: string;

  // Calendrier / RDV
  calendarLabel: string;
  calendarUrl: string;   // Calendly ou autre

  // CTA bannière
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;

  // Réseaux sociaux
  linkedin, instagram, whatsappSocial, facebook, tiktok,
  youtube, twitter, snapchat, pinterest: string;

  // UI
  sectionOrder: BrickId[];
  variants: BrickVariants;  // Style par section (cards/stacked/minimal)
  noIndex?: boolean;        // Mode privé (noindex Google)
}
```

**16 BrickIds** : identity, actions, vcard, stats, about, video, services, listings, gallery, testimonials, calendar, languages, cta, contact, socials, theme

---

## 9. PAGE `/bienvenue` — Flux Post-Checkout

```
1. Attends session Supabase (jusqu'à 4 secondes via onAuthStateChange)
2. Si pas de session → redirect /connexion
3. Récupère localStorage["cyk.card.pending"] (données carte en attente)
   → Crée ou met à jour nfc_profiles avec ces données
4. Supprime localStorage["cyk.card.pending"] et ["cyk.builderia.generated"]
5. Si session_id présent : appelle verifyUpgrade(sessionId)
   → Met à jour plan + subscriptions dans Supabase
6. Affiche état "Bienvenue sur Vitrine ✓" (1,2s) ou spinner
7. Fallback forcé → /dashboard après 8s (si rien ne répond)
8. Redirect → /dashboard
```

---

## 10. SÉRIES EMAIL AUTOMATIQUES (cron)

**Déclencheur** : `/api/cron-daily` toutes les heures  
**Auth** : `Authorization: Bearer {CRON_SECRET}`  
**Séquence** : get_user_funnel() → NC → BR → TR → VU → log → alerte si erreur

### ① Série NC — Email Non Confirmé

**Condition** : `email_confirme_le IS NULL`

| Step | Délai | Sujet |
|------|-------|-------|
| 1 | +10 min | Confirmation email |
| 2 | +1h | L'IA génère ta carte en une phrase |
| 3 | +1j | Exemple plombier |
| 4 | +2j | Dernier message (breakup) |

**Click tracking** : OUI → magic link → `/builderia`

---

### ② Série BR — Builderia Relance (3 variants)

**Condition** : Confirmé + pas de plan + `step_name` non null

| Variant | `step_name` | Step 1 |
|---------|------------|--------|
| A | `builderia` | "Tu étais à 30 secondes de ta carte" |
| B | `builderia-resultat` | "Ta carte générée t'attend" |
| C | `stripe-checkout` | "Ta carte est créée, il manque l'activation" |

6 emails sur 9 jours (J+1h, J+1, J+3, J+5, J+7, J+9)  
**Click tracking** : OUI → magic link → `/pricing`

---

### ③ Série TR — Trial Relance

**Condition** : `subscription_status = "trialing"`  
**From** : `bilel@cartevisitedigitale.fr` (différent des autres)

| Step | Délai | Sujet |
|------|-------|-------|
| 1 | +1j | "Ta carte est en ligne — partage-la ce soir" |
| 2 | +2j | "Ta carte expire demain soir" |
| 3 | +3j | "Ta carte est désactivée ce soir à minuit" |

**Pas de click tracking** (UTMs directs)

---

### ④ Série VU — Vitrine Upgrade

**Condition** : `plan = "essentielle"` OU (`plan = "free"` ET `had_trial = true`)

12 emails sur 50 jours. Thèmes clés : offre -50% (J+1), analytics manquants (J+3), sections absentes (J+7), ROI 0,16€/jour (J+10), design 15 thèmes (J+15), témoignage Sophie (J+18), 3 objections (J+25), 5 raisons de pas rappeler (J+35), offre finale 14j gratuits (J+50).

**Click tracking** : OUI → magic link → `/pricing`

---

### Délais exacts (en jours)

```
NC_DELAYS  = { 1: 10/1440, 2: 1/24, 3: 1, 4: 2 }
BR_DELAYS  = { 1: 1/24, 2: 1, 3: 3, 4: 5, 5: 7, 6: 9 }
TR_DELAYS  = { 1: 1, 2: 2, 3: 3 }
VU_DELAYS  = { 1:1, 2:3, 3:7, 4:10, 5:15, 6:18, 7:22, 8:25, 9:28, 10:35, 11:42, 12:50 }
```

---

## 11. SERVICES EXTERNES

| Service | Usage | Clé env | Config |
|---------|-------|---------|--------|
| **Supabase** | Auth + DB | `VITE_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` | Projet `fubbjkcxbomoshyunjnn` |
| **Stripe** | Paiements | `STRIPE_SECRET_KEY` + `VITE_STRIPE_PUBLISHABLE_KEY` | Live mode |
| **Resend** | Emails | `RESEND_API_KEY` | From: `contact@cartevisitedigitale.fr` |
| **Anthropic** | IA Builderia | `ANTHROPIC_API_KEY` | claude-haiku-4-5-20251001 |
| **Google Analytics** | Trafic | ID: `G-N9NTVTE0R6` | Via GTM |
| **Google Tag Manager** | Scripts | ID: `GTM-5TDHTDHP` | Container centralisé |
| **Meta Pixel** | Conversions FB | ID: `1413733970752208` | — |
| **Google AdSense** | Monétisation | ID: `ca-pub-5844925774606937` | — |
| **qrcode** | QR Code | — | Lib npm, PNG + SVG |
| **dnd-kit** | Drag & drop | — | Réordonnancement sections |

**Emails From** : `Carte Visite Digitale <contact@cartevisitedigitale.fr>`  
**Support billing** : `bilel@convertilab.com`  
**Notifs admin** : `Convertilab@gmail.com`  

---

## 12. ENDPOINTS API

| Path | Méthode | Auth | Rôle |
|------|---------|------|------|
| `/webhook/stripe` | POST | Signature Stripe | Webhook events |
| `/api/cron-daily` | GET | `Bearer CRON_SECRET` | Séries email automatiques |
| `/api/cron-nc-fast` | GET | `Bearer CRON_SECRET` | Actions rapides |
| `/api/relance-click?t=TOKEN` | GET | — | Track clic NC + magic link auto-login |
| `/api/builder-relance-click?t=TOKEN` | GET | — | Track clic BR + magic link |
| `/api/vitrine-upgrade-click?t=TOKEN` | GET | — | Track clic VU + magic link |

**Note** : Les `createServerFn` TanStack Start sont auto-exposées comme des routes POST internes, pas des endpoints REST classiques.

---

## 13. CLÉS localStorage / sessionStorage

| Clé | Stockage | Usage |
|-----|----------|-------|
| `"cyk.card.v1"` | localStorage | Données complètes de la carte (card-store) |
| `"cyk.card.pending"` | localStorage | Carte à créer/synchroniser après checkout (nettoyée dans /bienvenue) |
| `"cyk.builderia.generated"` | localStorage | Signal que l'IA a généré → redirect /builderia/resultat au lieu de /builderia (nettoyée dans /bienvenue) |
| `"nfc_profile"` | localStorage | Cache profil : `{ id, slug, plan, actif }` (profile-store) |
| `"cyk.cookie-consent"` | localStorage | Choix RGPD cookies : `"accept"` / `"refuse"` / `"customize"` (CookieBanner.tsx) |
| `"cvd_email"` | **sessionStorage** | Email mis en cache pour le checkout embedded ⚠️ dead code (pages bloquées) |
| `"cvd_desired_slug"` | **sessionStorage** | Slug tapé avant inscription — pré-remplit la carte au retour (index.tsx) |
| `"cvd_exit_intent_seen"` | **sessionStorage** | Flag exit-intent popup landing — évite de ré-afficher dans la même session (CroEnhancements.tsx) |

---

## 14. SÉCURITÉ

| Mécanisme | Implémentation |
|-----------|----------------|
| Auth requise dashboard | `useEffect` → redirect `/connexion` si `!user` |
| RLS Supabase | Activé sur toutes les tables core (nfc_profiles, subscriptions, nfc_analytics…) |
| Service role | Uniquement dans `supabase-admin.ts` côté serveur |
| JWT validation côté serveur | `activateFree` vérifie le token via client anon avant d'écrire |
| Plan locking | Redirect `/dashboard/content` si `plan !== "vitrine"` sur routes premium |
| PasswordGate | Oblige à définir un mot de passe (OAuth users sans `has_password`) |
| Trial anti-abus | Vérification `stripe_customer_id` côté serveur dans `checkout.ts` |
| Headers HTTP | X-Frame-Options, CSP complète, HSTS, nosniff |
| Emails jetables | Blacklistés dans `activate-free.ts` et `signup.ts` |
| Signature webhook | HMAC-SHA256 Stripe obligatoire |
| Livraison physique | Pays whitelist : FR, BE, CH, LU, MC |

---

## 15. FLUX PRINCIPAUX

### Inscription gratuite (Essentielle)
```
/inscription → magic link email OU Google OAuth
→ /auth/callback (échange code → session + pré-remplit carte depuis Google metadata)
→ /builderia (5 questions → generateCard via Claude Haiku)
→ génération animée → localStorage["cyk.builderia.generated"]
→ /builderia/resultat (score, aperçu phone, 5 thèmes, CTA)
→ "Activer gratuitement" → activateFree({ email, accessToken }) [serveur]
   → vérifie JWT, rejette email jetable
   → crée nfc_profiles (plan=essentielle) + subscriptions (status=active)
   → email bienvenue + notif admin (Resend)
→ /bienvenue → /dashboard
```

### Upgrade Vitrine
```
dashboard/account → "Passer à Vitrine"
→ createCheckoutSession({ plan:"vitrine", billing:"monthly", email })
   → vérifie trial consommé
   → crée session Stripe (3j trial si première fois)
→ Stripe checkout (redirect)
→ /bienvenue?session_id=xxx
   → verifyUpgrade() → nfc_profiles.plan="vitrine" + subscriptions upsert
→ /dashboard (plan Vitrine actif)
```

### Vue carte publique
```
Visiteur → /{slug}
→ Server: adminSupabase.nfc_profiles WHERE slug=slug AND actif=true
→ Si 404 → notFound()
→ Affichage SSR (thèmes legacy + CARD_THEMES catalog)
→ Client: INSERT nfc_analytics (event_type="view")
→ Clic bouton → INSERT nfc_analytics (event_type="click_button")
→ Download vCard → INSERT nfc_analytics (event_type="vcard_download")
```

### Commande carte physique
```
/dashboard/commander → formulaire (couleur, finition, nom, rôle)
→ createNfcCheckoutSession({ finish, color, name, role, email })
→ Stripe checkout mode:payment 29€/39€ + adresse livraison
→ /dashboard?nfc=success
→ (gestion commande manuelle ou via webhook → nfc_orders)
```

---

## 16. ARCHITECTURE DOSSIERS

```
/convert-your-card
├── vercel.json                   ← Crons, redirects, headers sécu
├── package.json
├── SYSTEME.md                    ← Ce fichier
├── src/
│   ├── routes/
│   │   ├── __root.tsx            ← Layout racine (Nav, Toaster, metas globales, GTM)
│   │   ├── index.tsx             ← Landing page complète
│   │   ├── dashboard.tsx         ← Layout dashboard (header + sidebar + Outlet)
│   │   ├── dashboard/            ← Pages dashboard (20 fichiers)
│   │   ├── builderia.tsx         ← Layout Builderia (Outlet)
│   │   ├── builderia/            ← index.tsx + resultat.tsx
│   │   ├── inscription.tsx       ← Layout inscription
│   │   ├── inscription.*.tsx     ← index, selection-de-plan, offre.$plan, carte-physique
│   │   ├── auth.callback.tsx     ← Handler OAuth
│   │   ├── bienvenue.tsx         ← Post-checkout
│   │   ├── onboarding.tsx        ← Redirect → /builderia
│   │   ├── $slug.tsx             ← Carte publique SSR
│   │   ├── preview.$token.tsx    ← Preview temporaire
│   │   ├── metiers.tsx           ← Layout métiers
│   │   ├── metiers/              ← index.tsx + coach.tsx + $slug.tsx
│   │   ├── carte-physique.tsx    ← Page vente add-on physique
│   │   ├── connexion.tsx
│   │   ├── reset-password.tsx
│   │   ├── cgu.tsx / cgv.tsx / confidentialite.tsx / mentions-legales.tsx
│   │   ├── cookies.tsx / unsubscribe.tsx
│   │   ├── offres.tsx / templates.tsx
│   │   └── bienvenue.tsx
│   ├── fns/                      ← Fonctions serveur (12 fichiers)
│   ├── components/
│   │   ├── /dashboard/           ← DashboardSidebar, UpsellSection, ShareGrid, MetricCard, CommandPalette, PasswordGate
│   │   ├── /card/                ← BusinessCard, PhoneFrame, ShareDialog
│   │   ├── /builder/             ← BrickList, BuilderSections, bricks.tsx, AiGenerateButton
│   │   ├── /landing/             ← CheckoutFlow, Countdown, CroEnhancements, HeroCards, VideoTestimonials
│   │   ├── /auth/                ← AuthShell
│   │   ├── /ui/                  ← shadcn/ui (50+ composants)
│   │   ├── CelebrationModal.tsx
│   │   └── CookieBanner.tsx
│   ├── lib/
│   │   ├── use-plan.ts           ← Hook plan + trial (TRIAL_DAYS = 3)
│   │   ├── card-store.ts         ← Store carte localStorage
│   │   ├── auth-store.ts         ← Store session Supabase
│   │   ├── profile-store.ts      ← Cache profil localStorage
│   │   ├── card-actions.ts       ← CRUD carte Supabase
│   │   ├── card-types.ts         ← Types + DEFAULT_CARD + BrickId + ThemeAccent
│   │   ├── card-themes.ts        ← 22 thèmes avec palette complète
│   │   ├── brick-variants.ts     ← Variants visuels par section
│   │   ├── stripe.ts             ← Client Stripe + PRICE_IDS + generateSlug
│   │   ├── supabase-admin.ts     ← Client service role (serveur uniquement)
│   │   ├── vcard.ts              ← Génération vCard 3.0
│   │   └── is-disposable-email.ts ← Blacklist emails jetables
│   └── integrations/
│       └── supabase/
│           ├── client.ts         ← Client Supabase anon (browser)
│           └── types.ts          ← Types générés (30+ tables)
└── public/                       ← Images, favicon, og-image.jpg
```

---

## 17. POINTS D'ATTENTION CRITIQUES

1. **`nfc_profiles.plan` est la source of truth** — pas `subscriptions.plan` qui peut être `"free"` si le webhook Stripe n'est pas encore passé. Le code `billing.tsx` gère ce cas explicitement.

2. **Double détection trial** — Stripe peut retourner `status="active"` même pendant le trial (quand `payment_method_collection="if_required"`). La logique `isInTrialPeriod` compense avec `trialEnd - created_at <= 4 jours`.

3. **`payment_method_set`** — Mis à jour uniquement par les webhooks Stripe. Si les webhooks échouent, ce flag reste `false` même si la CB est renseignée → la bannière verte "Abonnement confirmé" n'apparaît pas.

4. **`had_trial`** — Ne revient jamais à `false`. Empêche de re-consommer un trial en créant un nouveau compte (vérifié côté serveur via `stripe_customer_id`).

5. **`actif = false`** — Carte désactivée : page `/:slug` retourne 404 + barre rouge dans le dashboard.

6. **`localStorage["cyk.builderia.generated"]`** — Clé critique : si présente, le dashboard redirige vers `/builderia/resultat`. Nettoyée dans `/bienvenue`. Si elle reste bloquée, l'user ne peut plus accéder au dashboard directement.

7. **`localStorage["cyk.card.pending"]`** — Carte à synchroniser post-checkout. Si `/bienvenue` plante avant de la nettoyer, elle sera re-appliquée à la prochaine visite de `/bienvenue`.

8. **Série VU Step 12** — Promet "14 jours Vitrine gratuits". Le coupon Stripe n'est **pas encore créé**. À implémenter avant que ce step parte.

9. **Thèmes legacy** — La page `$slug.tsx` supporte les anciens IDs (`bleu`, `vert`, `sombre`, `clair`) en plus des 22 `ThemeAccent`. Ne pas les supprimer.

10. **Deux systèmes Stripe** — L'embedded checkout (`checkout-embedded.ts`) avec plans starter/pro/premium coexiste avec le redirect checkout (essentielle/vitrine). S'assurer qu'ils ne créent pas de doublons de customers.

11. **`custom_domain`** — Colonne présente en base, fonctionnalité non implémentée dans le code actuel.

12. **`blog_articles`** — Table en base, aucune route `/blog` dans le code actuel.

---

*Mettre à jour ce fichier à chaque modification majeure : nouveaux plans, nouvelles tables, nouvelles routes, nouvelles variables d'env.*
