# CVD — Récapitulatif Système Complet
> Dernière mise à jour : 2026-06-11  
> Projet : `cartevisitedigitale.fr` · Supabase `fubbjkcxbomoshyunjnn` · GitHub `convert-your-card`

---

## 1. Architecture globale

```
Utilisateur
  │
  ├─ S'inscrit → Supabase Auth (email + password)
  │     └─ Supabase envoie l'email de confirmation
  │           └─ Clic → magic link → /builderia (step_name = "builderia")
  │
  ├─ /builderia → entre un prompt IA → génère la carte
  │     └─ builder_progress.step_name = "builderia-resultat"
  │
  ├─ Voit le résultat → clique "Activer"
  │     └─ builder_progress.step_name = "stripe-checkout"
  │
  └─ Passe en caisse Stripe (essai 3 jours)
        └─ checkout.session.completed → stripe-webhook.ts
              ├─ Crée/met à jour nfc_profiles (plan, actif=true)
              ├─ Upsert subscriptions (status="trialing", had_trial=true)
              └─ Envoie email de bienvenue + notif admin
```

---

## 2. Supabase — Tables

### `auth.users` (géré par Supabase)
| Champ | Type | Rôle |
|-------|------|------|
| id | uuid | Clé primaire |
| email | text | Email de connexion |
| created_at | timestamptz | Date d'inscription |
| email_confirmed_at | timestamptz | Date de confirmation email (null si pas confirmé) |

---

### `nfc_profiles` — La carte de visite
| Champ | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → auth.users (nullable si checkout avant signup) |
| slug | text | URL publique : `cartevisitedigitale.fr/{slug}` |
| nom, fonction, entreprise | text | Infos pro |
| plan | text | `'free'` / `'essentielle'` / `'vitrine'` |
| actif | boolean | `false` = carte désactivée (trial expiré, annulation) |
| boutons, reseaux | jsonb | CTAs et liens réseaux |
| services, temoignages | jsonb | Sections Vitrine |
| template_id, couleur_accent, bg_type | text | Personnalisation visuelle |
| card_data | jsonb | Données générées par l'IA Builderia |

---

### `subscriptions` — Abonnements Stripe
| Champ | Type | Notes |
|-------|------|-------|
| user_id | uuid | FK → auth.users |
| stripe_customer_id | text | ID client Stripe |
| stripe_subscription_id | text | ID subscription Stripe |
| plan | text | `'essentielle'` / `'vitrine'` / `'free'` |
| status | text | `trialing` / `active` / `past_due` / `canceled` / `incomplete_expired` / `unpaid` |
| current_period_end | timestamptz | Date de fin de période (= trial_end si en essai) |
| had_trial | boolean | `true` si l'utilisateur a eu un essai à un moment (ne revient pas à false) |

**Logique plan :**
- `status = trialing` → essai en cours
- `status = active` → abonné payant
- `status ∈ {past_due, canceled, incomplete_expired, unpaid}` → désactivé → `plan = free` + `nfc_profiles.actif = false`
- `had_trial = true` + `plan = free` → ancien trial non converti (reçoit la série Vitrine Upgrade)

---

### `builder_progress` — Position dans le funnel Builderia
| Champ | Type | Notes |
|-------|------|-------|
| user_id | uuid | PK unique par user |
| step | integer | Étape numérotée |
| step_name | text | `'builderia'` / `'builderia-resultat'` / `'stripe-checkout'` / `null` (pré-Builderia) |
| updated_at | timestamptz | Dernière mise à jour |

**Valeurs `step_name` et leur signification :**
| Valeur | Signification |
|--------|---------------|
| `null` | User pré-lancement Builderia — n'a jamais vu le générateur |
| `'builderia'` | A vu la page prompt mais n'a pas généré |
| `'builderia-resultat'` | A généré et vu sa carte, mais n'a pas activé |
| `'stripe-checkout'` | A cliqué "Activer" et est allé sur Stripe, mais n'a pas payé |

---

### `email_relance_series` — Série email non confirmé (NC)
| Champ | Type | Notes |
|-------|------|-------|
| email | text | UNIQUE(email, step) |
| step | integer | 1 à 4 |
| click_token | uuid | Token de tracking clic |
| sent_at | timestamptz | Date d'envoi |
| clicked_at | timestamptz | Date de clic (null si pas cliqué) |

---

### `builder_relance_series` — Série Builderia relance (BR)
| Champ | Type | Notes |
|-------|------|-------|
| email | text | UNIQUE(email, step) |
| step | integer | 1 à 6 |
| click_token | uuid | Token de tracking clic |
| sent_at | timestamptz | Date d'envoi |
| clicked_at | timestamptz | Date de clic |
| builder_step_at_send | integer | Étape Builderia au moment de l'envoi (info) |

---

### `trial_relance_series` — Série essai (TR)
| Champ | Type | Notes |
|-------|------|-------|
| email | text | UNIQUE(email, step) |
| step | integer | 1 à 3 |
| sent_at | timestamptz | Date d'envoi |
| clicked_at | timestamptz | (présent dans le schéma mais pas utilisé dans le code) |

*Pas de click_token — les CTAs pointent directement vers /pricing avec UTMs.*

---

### `vitrine_upgrade_series` — Série upgrade Vitrine (VU)
| Champ | Type | Notes |
|-------|------|-------|
| email | text | UNIQUE(email, step) |
| step | integer | 1 à 12 |
| click_token | text | Token de tracking |
| sent_at | timestamptz | Date d'envoi |
| clicked_at | timestamptz | Date de clic |

---

### `cron_execution_logs` — Logs d'exécution du cron
| Champ | Type | Notes |
|-------|------|-------|
| ran_at | timestamptz | Horodatage d'exécution |
| total_sent | integer | Nombre total d'emails envoyés |
| results | jsonb | Détail par série et étape |
| errors | text | Erreur fatale si présente |
| duration_ms | integer | Durée d'exécution |

---

## 3. RPC `get_user_funnel()`

Fonction SQL `SECURITY DEFINER` qui joint toutes les tables en une seule vue par user.

**Champs retournés :**
```
user_id, email, inscrit_le, email_confirme_le,
plan, actif, slug, nom, entreprise, fonction,
profil_cree_le, subscription_cree_le,
stripe_subscription_id, subscription_status,
trial_end, had_trial,
relance_step, relance_sent_at, relance_clicked_at,
builder_step, builder_step_name,
builder_relance_step, builder_relance_sent_at, builder_relance_clicked_at,
vitrine_relance_step, vitrine_relance_sent_at, vitrine_relance_clicked_at,
trial_relance_step, trial_relance_sent_at
```

*Utilisé exclusivement par le cron. Toujours recréer avec `DROP + CREATE` si la signature change.*

---

## 4. Séries email — Vue d'ensemble

### ① Série NC — Email Non Confirmé (`email_relance_series`)
**Déclencheur :** `email_confirme_le IS NULL`  
**Condition d'arrêt :** dès que l'email est confirmé → l'user quitte ce segment

| Step | Délai depuis inscription | Sujet | Couleur |
|------|--------------------------|-------|---------|
| 1 | J+10 min | "Tu es à 1 clic de ta carte digitale" (confirmation) | Amber |
| 2 | J+1h | "Une phrase suffit. L'IA génère ta carte entière." | Violet |
| 3 | J+1 | "Voici ce qu'un plombier a généré en tapant une seule phrase." | Violet |
| 4 | J+2 | "C'est mon dernier message." (breakup) | Neutre |

**Click tracking :** OUI — magic link → `/builderia` avec UTMs  
**UTM campaign :** `email-non-clique`

---

### ② Série BR — Builderia Relance (`builder_relance_series`)
**Déclencheur :** `email_confirme_le IS NOT NULL` + `plan IS NULL` + `builder_step_name IS NOT NULL`  
**Condition d'arrêt :** dès que `plan` est défini (a souscrit)

3 variants selon `builder_step_name` :

#### Variant A — `builderia` (vu le prompt, pas généré)
| Step | Délai | Sujet |
|------|-------|-------|
| 1 | J+1h | "Tu étais à 30 secondes de voir ta carte." |
| 2 | J+1 | "Pas sûr de quoi écrire ? Voici des exemples." |
| 3 | J+3 | Preuve sociale (Thomas l'électricien) |
| 4 | J+5 | Les 5 objections |
| 5 | J+7 | Le calcul 5 clients perdus |
| 6 | J+9 | Breakup |

#### Variant B — `builderia-resultat` (vu la carte, pas activé)
| Step | Délai | Sujet |
|------|-------|-------|
| 1 | J+1h | "Ta carte générée t'attend. Elle ne sera plus là indéfiniment." |
| 2 | J+1 | "Ce que tes clients voient sur ta carte Vitrine." |
| 3 | J+3 | Preuve sociale (Thomas l'électricien) |
| 4 | J+5 | Les 5 objections |
| 5 | J+7 | Le calcul 5 clients perdus |
| 6 | J+9 | Breakup |

#### Variant C — `stripe-checkout` (abandonné la caisse)
| Step | Délai | Sujet |
|------|-------|-------|
| 1 | J+1h | "Ta carte est créée. Il manque juste l'activation." |
| 2 | J+1 | "Pas de CB. 3 jours gratuits. Voici pourquoi tu peux y aller." |
| 3–6 | J+3–9 | "Dernière relance. Ta carte sera désactivée sous peu." |

**Click tracking :** OUI — magic link → `/pricing` avec UTMs  
**UTM campaign :** `builder-relance`

---

### ③ Série TR — Trial Relance (`trial_relance_series`)
**Déclencheur :** `subscription_status = 'trialing'`  
**Condition d'arrêt :** Stripe tente le prélèvement à J+3 automatiquement

| Step | Délai depuis souscription | Sujet | Design |
|------|--------------------------|-------|--------|
| 1 | J+1 | "Votre carte est en ligne — partagez-la ce soir 🚀" | Header violet gradient |
| 2 | J+2 | "⏰ Votre carte expire demain soir" | Header rouge urgence |
| 3 | J+3 | "⚠️ Votre carte est désactivée ce soir à minuit" | Header bordeaux + rouge + orange |

**Click tracking :** NON — pas de token, UTMs directs dans les URLs  
**UTM campaign :** `trial-relance`  
**From :** `bilel@cartevisitedigitale.fr` (différent des autres séries)

---

### ④ Série VU — Vitrine Upgrade (`vitrine_upgrade_series`)
**Déclencheur :** `plan = 'essentielle'` OU (`plan = 'free'` ET `had_trial = true`)  
*→ inclut les anciens trials non convertis pour les re-cibler vers Vitrine*

| Step | Délai depuis `profil_cree_le` | Thème principal |
|------|-------------------------------|-----------------|
| 1 | J+1 | Offre -50% (72h) |
| 2 | J+3 | Curiosité — analytics invisibles |
| 3 | J+7 | Sections manquantes (Services, Galerie, etc.) |
| 4 | J+10 | ROI : 4,80€ = 0,16€/jour |
| 5 | J+15 | Design & 15+ thèmes premium |
| 6 | J+18 | Témoignage Sophie (consultante RH) |
| 7 | J+22 | Analytics — vole à l'aveugle |
| 8 | J+25 | 3 vraies objections répondues |
| 9 | J+28 | Image pro — 1ère impression |
| 10 | J+35 | 5 sections absentes = 5 raisons de ne pas rappeler |
| 11 | J+42 | Benchmark concurrentiel |
| 12 | J+50 | Offre finale — 14 jours Vitrine gratuits (breakup) |

**Click tracking :** OUI — magic link → `/pricing` avec UTMs  
**UTM campaign :** `vitrine-upgrade`

---

## 5. Webhook Stripe (`/webhook/stripe`)

### Événements gérés

#### `checkout.session.completed`
1. Récupère l'email + plan depuis `session.metadata`
2. Cherche l'user dans `auth.users`
3. Génère un slug unique pour `nfc_profiles`
4. Crée ou met à jour `nfc_profiles` (`plan`, `actif = true`)
5. Fetch la subscription Stripe pour avoir `status` et `trial_end`
6. Upsert `subscriptions` : `plan`, `status`, `current_period_end`, `had_trial = trialEnd !== null`
7. Envoie l'email de bienvenue au client
8. Envoie une notif admin (convertilab@gmail.com)

#### `customer.subscription.updated`
- Statuts inactifs : `past_due`, `canceled`, `incomplete_expired`, `unpaid`
- Si inactif → `plan = 'free'` + `nfc_profiles.actif = false`
- Si `trial_end` présent → `had_trial = true`
- Met à jour `status` et `current_period_end`

#### `customer.subscription.deleted`
- Met `plan = 'free'`, `status = 'canceled'`
- Met `nfc_profiles.actif = false`

**Sécurité :** Vérification HMAC-SHA256 de la signature Stripe (5 min max age)

---

## 6. Cron Vercel (`/api/cron-daily`)

**Schedule :** toutes les heures (`0 * * * *`)  
**Auth :** `Authorization: Bearer {CRON_SECRET}`

### Séquence d'exécution

```
1. Watchdog — vérifie la dernière exécution (alerte si > 25h de silence)
2. Ping Resend — vérifie que la clé API est valide
3. get_user_funnel() — charge tous les users en une requête
4. Série NC — pour chaque step, envoie aux éligibles
5. Série BR — pour chaque step, envoie aux éligibles
6. Série TR — pour chaque step, envoie aux éligibles
7. Série VU — pour chaque step, envoie aux éligibles
8. Log dans cron_execution_logs
9. Alerte email si erreur fatale
```

### Délais par série

```typescript
NC_DELAYS = { 1: 10/1440, 2: 1/24, 3: 1, 4: 2 }  // en jours
BR_DELAYS = { 1: 1/24, 2: 1, 3: 3, 4: 5, 5: 7, 6: 9 }
TR_DELAYS = { 1: 1, 2: 2, 3: 3 }
VU_DELAYS = { 1:1, 2:3, 3:7, 4:10, 5:15, 6:18, 7:22, 8:25, 9:28, 10:35, 11:42, 12:50 }
```

### Protection anti-doublon
Chaque table email a une contrainte `UNIQUE(email, step)`. L'insert échoue silencieusement si déjà envoyé → pas de doublons possible.

---

## 7. Tracking clics et Magic Links

| Série | Endpoint click | Destination | Magic link |
|-------|----------------|-------------|------------|
| NC | `/api/relance-click?t=TOKEN` | `/builderia` + UTMs | OUI — auto-login |
| BR | `/api/builder-relance-click?t=TOKEN` | `/pricing` + UTMs | OUI — auto-login |
| VU | `/api/vitrine-upgrade-click?t=TOKEN` | `/pricing` + UTMs | OUI — auto-login |
| TR | Pas de tracking | `/pricing` ou `/{slug}` + UTMs | NON |

**Magic link flow :** token → `clicked_at` enregistré → `admin.auth.admin.generateLink()` → redirect vers la destination avec l'user déjà connecté

---

## 8. Variables d'environnement (`.env.local`)

```
SUPABASE_URL                  → URL du projet Supabase
SUPABASE_SERVICE_ROLE_KEY     → Clé service role (accès total)
VITE_SUPABASE_URL             → Même URL (exposée au frontend)
VITE_SUPABASE_ANON_KEY        → Clé publique Supabase
VITE_APP_URL                  → https://www.cartevisitedigitale.fr
RESEND_API_KEY                → Clé Resend (envoi emails)
STRIPE_SECRET_KEY             → Clé secrète Stripe
STRIPE_WEBHOOK_SECRET         → Secret de signature webhook Stripe
CRON_SECRET                   → Secret pour authentifier les appels cron Vercel
```

---

## 9. Endpoints API

| Path | Méthode | Auth | Rôle |
|------|---------|------|------|
| `/webhook/stripe` | POST | Stripe signature | Webhook Stripe |
| `/api/cron-daily` | GET | Bearer CRON_SECRET | Cron email quotidien |
| `/api/send-relance` | POST | Bearer SERVICE_KEY | Envoie emails NC |
| `/api/send-builder-relance` | POST | Bearer SERVICE_KEY | Envoie emails BR |
| `/api/send-trial-relance` | POST | Bearer SERVICE_KEY | Envoie emails TR |
| `/api/send-vitrine-relance` | POST | Bearer SERVICE_KEY | Envoie emails VU |
| `/api/relance-click` | GET | — | Track clic NC + magic link |
| `/api/builder-relance-click` | GET | — | Track clic BR + magic link |
| `/api/vitrine-upgrade-click` | GET | — | Track clic VU + magic link |

---

## 10. Dashboard (`dashboard-cvd.html`)

Fichier HTML autonome sur le Desktop. Se connecte directement à Supabase via la clé anon.

### Vues
- **Tous les comptes** — table avec filtres par étape
- **Emails** — statistiques des 4 séries + prévisualisations emails

### Filtres `ETAPE_FILTERS`
| Filtre | Condition |
|--------|-----------|
| `non-confirme` | `!email_confirme_le` |
| `builderia` | confirmé + pas de plan + `builder_step_name` (non null) |
| `trial` | `subscription_status === 'trialing'` |
| `ancien-trial` | `plan === 'free'` && `had_trial === true` |
| `essentielle` | `plan ∈ ['essentielle', 'free']` && `!had_trial` |
| `ancien-null` | confirmé + pas de profil + `builder_step_name` null |

### Segments dans la vue Emails
1. ① Email non confirmé — 4 emails
2. ② Builderia — prompt · 6 emails
3. ② Builderia — résultat vu · 6 emails
4. ② Builderia → Stripe abandonné · 6 emails
5. ③ Essai Vitrine — 3 emails
6. ④ Essentielle — upgrade Vitrine — 12 emails

---

## 11. Emails transactionnels (hors séries)

### Email de bienvenue (envoyé par stripe-webhook.ts)
- **Déclencheur :** `checkout.session.completed`
- **From :** `Carte Visite Digitale <contact@cartevisitedigitale.fr>`
- **Contenu :** Lien carte, liste des avantages Vitrine, lien dashboard
- **Style :** Header violet, fond vert pour le lien public

### Notif admin (envoyé par stripe-webhook.ts)
- **To :** `convertilab@gmail.com`
- **Sujet :** `🆕 Nouveau client CVD — {email} ({plan})`
- **Contenu :** Tableau email / plan / carte / date

### Alertes cron (envoyées par cron-daily.ts)
- **Déclencheurs :** Exécution manquée (> 25h) ou erreur fatale
- **To :** `convertilab@gmail.com`
- **Style :** Header rouge #dc2626

---

## 12. Points d'attention

### Ce qui est automatique
- ✅ Envoi de tous les emails (cron toutes les heures)
- ✅ Désactivation carte si paiement échoué (`subscription.updated`)
- ✅ Désactivation carte si annulation explicite (`subscription.deleted`)
- ✅ `had_trial = true` posé à la création ET à chaque update Stripe
- ✅ Protection anti-doublon par contrainte UNIQUE en base

### Ce qui est manuel
- ❌ Réactivation manuelle si faux positif désactivation
- ❌ La VU step 12 propose "14 jours Vitrine gratuits" — c'est une promesse marketing, pas encore implémentée côté Stripe (coupon à créer si conversion)

### Segments exclus volontairement du cron
| Segment | Raison |
|---------|--------|
| `builder_step_name = null` | Anciens users pré-Builderia. N'ont jamais vu le générateur. Trop loin dans le funnel. |
| `plan = 'essentielle'` avec `had_trial = false` | Plan gratuit direct — inclus dans VU pour upgrade vers Vitrine |

### Conformité email
- Lien de désabonnement présent dans le footer de tous les emails (`/unsubscribe`)
- Subject lines personnalisées avec le prénom si disponible

---

## 13. Funnel complet résumé

```
[Inscription] 
   └─ email non confirmé → Série NC (4 emails sur 2 jours)
         └─ Confirmation → /builderia
               └─ Prompt non tapé → Série BR variant "builderia" (6 emails sur 9 jours)
               └─ Résultat vu → Série BR variant "builderia-resultat"
               └─ Stripe abandonné → Série BR variant "stripe-checkout"
               └─ Paiement OK → Email bienvenue + Série TR (3 emails sur 3 jours)
                     └─ Trial → Stripe prélève automatiquement à J+3
                           └─ CB OK → plan=essentielle → Série VU (12 emails sur 50 jours)
                           └─ Pas de CB / échec → plan=free + had_trial=true → Série VU
```
