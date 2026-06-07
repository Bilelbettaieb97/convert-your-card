## Objectif
Remplacer le flux magic-link (clic depuis l'email) par un flux OTP à 6 chiffres saisis directement sur le site, puis redirection automatique vers `/inscription/selection-de-plan`.

## Flux cible
1. `/inscription` — l'utilisateur saisit son email + clique **Continue**
2. Envoi d'un code OTP à 6 chiffres par email (au lieu d'un lien magique)
3. Affichage d'une vue **"Vérification du code"** sur la même page (ou nouvelle route `/inscription/verification`) avec :
   - Titre : « Vérifie ton e-mail »
   - Sous-titre : « On vient de t'envoyer un code à 6 chiffres à `email@…` »
   - 6 cases OTP (un caractère par case, auto-focus, paste support)
   - Bouton **Renvoyer le code** (avec timer 30 s) + lien **Modifier l'e-mail**
4. À la saisie du 6ᵉ chiffre → vérification automatique via `supabase.auth.verifyOtp({ type: "email", email, token })`
5. Si succès → toast « Compte créé ! » + `navigate({ to: "/inscription/selection-de-plan" })`
6. Si erreur → message sous les cases « Code invalide ou expiré »

## Changements techniques

**`src/routes/inscription.tsx`**
- Ajouter un state `step: "email" | "otp"` (par défaut `"email"`)
- Étape email :
  - Remplacer `signInWithOtp` options : supprimer `emailRedirectTo` (inutile pour OTP code), garder `shouldCreateUser: true`, garder `data: { marketing_opt_in }`
  - Sur succès → passer `step` à `"otp"`
- Étape OTP :
  - Nouveau composant inline `OtpVerification` (6 inputs séparés, navigation flèches/backspace, paste auto-split)
  - Soumission auto à 6 chiffres → `supabase.auth.verifyOtp({ email, token, type: "email" })`
  - Sur succès → `navigate({ to: "/inscription/selection-de-plan" })`
  - Bouton « Renvoyer le code » → rappelle `signInWithOtp` + reset timer 30 s
  - Lien « Utiliser une autre adresse » → revient à `step = "email"`
- Conserver la colonne droite CRO desktop et les boutons Google/Apple (uniquement affichés à l'étape email)

**Aucun changement** côté base de données, RLS, ou routes ; Supabase envoie le code OTP automatiquement quand on appelle `signInWithOtp` sans `emailRedirectTo`.

## Composant OTP — détail UI
- 6 `<input maxLength={1} inputMode="numeric" pattern="[0-9]*">` dans une grille `gap-2`
- Auto-focus suivant à la frappe, focus précédent au backspace si vide
- Support paste : si l'utilisateur colle 6 chiffres, remplir toutes les cases
- État `verifying` désactive les inputs et affiche un spinner sur le bouton

## Hors scope
- Pas de modification du template d'email Supabase (le code par défaut est déjà inclus dans le template magic-link via `{{ .Token }}`). Si le code n'apparaît pas dans l'email reçu, il faudra activer/scaffolder les templates d'auth — à confirmer après test.
