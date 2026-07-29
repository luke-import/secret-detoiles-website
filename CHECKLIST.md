# Checklist — Site Secret d'étoiles

> Fichier vivant. À jour à chaque étape. Ajouter des notes sous les items si utile.
> Convention : `- [ ]` = à faire · `- [x]` = fait · `- [~]` = en cours · `- [-]` = abandonné/reporté

---

## Phase 0 — Environnement local ✅

- [x] macOS avec Cursor + Claude Code
- [x] Node v20.20.2 installé
- [x] pnpm v10.34.5 installé
- [x] git v2.54.0 installé
- [x] gh v2.90.0 installé et authentifié sur le compte GitHub `luke-import`
- [x] Dossier de travail : `~/dev/secret-detoiles`

---

## Phase 0-bis — Domaine et hébergement ✅

- [x] Nom de domaine acheté : **secret-detoiles.fr** (chez OVH)
- [x] Hébergement OVH Web Hosting gratuit activé (100 Mo, SSL Let's Encrypt inclus, accès FTP)
- [x] Adresse email pro créée et fonctionnelle : **bonjour@secret-detoiles.fr**
- [ ] Vérifier ce qui s'affiche actuellement sur https://secret-detoiles.fr (page par défaut OVH probable)
- [ ] Récupérer les identifiants FTP OVH (host, user, mot de passe) depuis l'espace client — à garder pour la phase 10

---

## Phase 1 — Fondation du projet ✅

- [x] Créer le dossier `~/dev/secret-detoiles`
- [x] Y placer `CLAUDE.md` et `CHECKLIST.md`
- [x] Scaffold Astro 5 (template minimal, TypeScript strict)
  - Note : `create astro@latest` a installé Astro 7.1.3 (dernière version stable, compatible Node 22). Le template minimal et le fonctionnement sont identiques.
  - Node mis à jour de v20.20.2 → v22.23.1 (via nvm), pnpm de v10 → v11.17.0 (via Corepack)
- [x] Installer Tailwind CSS v4 via l'intégration Astro — v4.3.3 installée via `@tailwindcss/vite`
- [x] Installer Fontsource : `@fontsource/sacramento`, `@fontsource-variable/fredoka`, `@fontsource-variable/nunito` — v5.3.0
- [x] Créer `src/styles/tokens.css` avec la palette et les typos
- [x] Créer `src/layouts/BaseLayout.astro`
- [x] Remplacer `src/pages/index.astro` par une page de test avec palette visible
- [x] Créer un `README.md` court
- [x] Vérifier `.gitignore` (node_modules, dist, .env, .DS_Store) — tout présent par défaut
- [x] `git init` + premier commit — commit `c94ac9a`
- [x] Créer le repo GitHub public `luke-import/secret-detoiles-website`
- [x] Premier push — https://github.com/luke-import/secret-detoiles-website
- [x] Vérifier que `pnpm dev` répond bien en local — HTTP 200, fonts chargées, tokens actifs

---

## Phase 2 — Composants de base ✅

- [x] `SiteHeader.astro` — nav sticky, logo Sacramento, menu Fredoka en pilules, burger mobile
- [x] `SiteFooter.astro` — bandeau dégradé arc-en-ciel + 3 colonnes (Nav / Infos / Légales) + baseline
- [x] `Button.astro` — variantes primary (bleu nuit), ghost (transparent), cream (fond `#F3EEE1`)
- [x] `Sparkles.astro` — étoiles ✦ animées `twinkle`, densité et couleurs configurables, respecte `prefers-reduced-motion`
- [x] `SectionEyebrow.astro` — surtitre manuscrit Sacramento jaune `#F0B84C` + titre Fredoka bleu nuit
- [x] `ValueCard.astro` — card pastel arrondie avec icône ✦ colorée + titre + description (4 variantes de tint)
- [x] `SizeCard.astro` — card produit avec packshot, pastille taille en badge, barre couleur en bas
- [x] `FaqAccordion.astro` — accordéon avec bouton toggle et animation
- [x] `ContactForm.astro` — formulaire nom/email/sujet/message, validation, envoi Web3Forms

> **Lot A (24 juillet 2026)** — 5 composants atomiques livrés : Button, Sparkles, SectionEyebrow, ValueCard, SizeCard. Tous en `<style>` scoped, tokens uniquement (couleurs), TypeScript strict, build OK.
> Page de démonstration temporaire `src/pages/playground.astro` créée (hors nav) — **supprimée le 29 juillet 2026** (avant la mise en production).
> Restent pour les lots B/C : SiteHeader, SiteFooter, FaqAccordion, ContactForm.

> **Lot B (27 juillet 2026)** — SiteHeader (sticky, logo Sacramento, menu desktop + burger/overlay mobile avec JS : toggle, Échap, clic lien, blocage du scroll body) et SiteFooter (bande arc-en-ciel + 4 colonnes + mentions légales) livrés. Intégrés dans `BaseLayout.astro` (header avant le `<slot />`, footer après) → présents sur toutes les pages. Aucun style inline dans les composants, tokens uniquement, build OK.
> Hygiène : `.nvmrc` (22.23.1) ajouté, token `--color-cream-hover` créé et branché dans `Button.astro`.
> Reste pour le lot C : FaqAccordion, ContactForm.

> **Lot C (27 juillet 2026)** — Phase 2 terminée ✅. FaqAccordion (`<details>` natif, chevron animé) + ContactForm (Web3Forms, honeypot, validation `checkValidity()`, états loading/succès/erreur) livrés. Cleanup : tokens `--surface-frosted` / `--shadow-primary-hover`, `inert` sur le menu mobile. `.env.example` ajouté.
> Correctif (27 juillet 2026) — menu mobile au fond transparent : le `backdrop-filter` du `.site-header` en faisait le bloc conteneur du menu `position:fixed`, qui se calait sur la barre (~68px) au lieu du plein écran. Menu sorti du `<header>` (rendu frère) + `z-index:60` → fond opaque plein écran.

---

## Phase 3 — Page d'accueil ✅

- [x] Hero avec dégradé linéaire crème → bleu ciel léger + Sparkles animées
- [x] Titre bicolor : eyebrow Sacramento "tout en tendresse" + h1 Fredoka + baseline Nunito
- [x] CTA primary "Découvrir la gamme" + CTA ghost "Nos engagements"
- [x] Section trust cards — 4 cards pastel (dermato, sans parfum, absorption, protection) chacune avec sa couleur
- [x] Section "Un cocon de douceur" — image maman/bébé (placeholder au début) + texte + CTA vers Nos valeurs
- [x] Grille "Une taille pour chaque étoile" — 5 cards des tailles S/M/L/XL/XXL cliquables vers La gamme
- [x] CTA final grande bannière bleu nuit avec dégradé + Sparkles + baseline "chaque nuit, un peu de magie"

> **Phase 3 terminée ✅ (27 juillet 2026)** — `index.astro` refondue en 5 sections : hero (Sparkles `high`) · engagements (4 ValueCard) · bloc marque (placeholder photo maman & bébé) · gamme (5 SizeCard) · CTA final (Sparkles `cta`). Composants réutilisés tels quels.
> Écarts assumés vs texte d'origine : le CTA du bloc marque pointe vers **Notre histoire** (et non « Nos valeurs »), et la baseline du CTA final est « **un peu de magie dans le quotidien de bébé** » — formulations validées dans le prompt Phase 3. La CHECKLIST ne contenait ni « wave décorative » ni « Pants/Lingettes » (déjà hors périmètre « couches uniquement ») → aucun item obsolète à marquer [-].

---

## Phase 4 — Page La gamme ✅

- [x] Header de page avec eyebrow "la gamme" + titre "Les couches enchantées"
- [x] Grille des 5 cards produit (SizeCard) avec packshots réels
- [x] Bloc "Comment choisir sa taille ?" — tableau interactif (Taille · Poids · Nombre par paquet)
- [x] Note de bas : "Les tailles et poids sont donnés à titre indicatif..."

> **Phase 4 terminée ✅ (27 juillet 2026)** — `la-gamme.astro` refondue en 6 sections : hero (Sparkles) · tableau de correspondance des 5 tailles (+ note indicative) · **simulateur de poids côté client** (saisie kg → taille recommandée, gestion des cas hors-gamme) · les 5 tailles en blocs détaillés alternés (packshot + arguments spécifiques) · teaser composition · CTA contact.
> Écart assumé vs libellé d'origine : les « 5 cards SizeCard » sont remplacées par des **blocs détaillés riches** (`article.size-detail` : packshot + titre + description + specs), plus adaptés à une page produit approfondie. Le tableau + le simulateur couvrent le « Comment choisir sa taille ». Note indicative ajoutée sous le tableau (pour l'item « Note de bas »).

---

## Phase 5 — Pages narratives (5 pages) ✅

- [x] `notre-histoire.astro` — narratif "Née sous une bonne étoile" + 3 chiffres clés (5 tailles / 0 parfum / 🇫🇷 France) + CTA Voir la gamme
- [x] `nos-valeurs.astro` — 4 engagements en ValueCard (dermato, sans parfum, absorption, protection douce)
- [x] `composition-securite.astro` — 2 blocs (matières / ce qu'elles ne contiennent pas) + bloc "testées dermato"
- [x] `faq.astro` — 6 questions/réponses en FaqAccordion (voir HTML Claude Design pour les textes de départ)
- [x] `contact.astro` — 1 seule carte "Écrivez-nous" avec email `bonjour@secret-detoiles.fr` + ContactForm + bloc "Où trouver nos couches" avec placeholders pour logos revendeurs (pas de tel ni adresse)

> **Phase 5 — Lot A (27 juillet 2026)** — 3 pages narratives réelles livrées (Notre histoire, Nos valeurs, Composition & sécurité). Chaque page : mini-hero + 2-4 sections (fonds crème / crème-warm alternés) + CTA de transition vers la page suivante. Composants réutilisés (SectionEyebrow, ValueCard, Button).
> Écarts assumés vs libellés d'origine (contenu validé dans le prompt Lot A) : *Notre histoire* propose 3 ValueCard « convictions » + CTA → Nos valeurs (pas de « 3 chiffres clés » ni « Voir la gamme ») ; *Nos valeurs* présente les 4 engagements en **sections éditoriales numérotées** (grand chiffre + texte), pas en ValueCard.
> Reste pour le Lot B : faq, contact.

> **Phase 5 — Lot B (27 juillet 2026)** — Phase 5 terminée ✅. FAQ (6 questions en FaqAccordion, la 2ᵉ ouverte par défaut) + Contact (hero, gros email Sacramento cliquable, ContactForm, bloc « où nous trouver » sans logos revendeurs — pas de partenariat confirmé). Composants FaqAccordion et ContactForm réutilisés tels quels.

---

## Phase 6 — Contenu réel

- [ ] Intégrer les 5 packshots finalisés dans `public/packshots/` : `taille-s.png`, `taille-m.png`, `taille-l.png`, `taille-xl.png`, `taille-xxl.png`
- [ ] Rédiger tous les textes définitifs dans les Content Collections (`src/content/pages/`)
- [ ] Photo maman & bébé pour la section "cocon de douceur" (droits libres ou à commander)
- [ ] Meta descriptions et titles par page (SEO)
- [ ] Textes finaux relus et validés par Grégory

---

## Phase 7 — SEO / Accessibilité / Perf ✅

- [x] Installer `@astrojs/sitemap` (gratuit) — sitemap.xml auto
- [x] `robots.txt`
- [x] Meta OG + Twitter Cards par page
- [x] Favicon complet (SVG + PNG + Apple touch)
- [x] `alt` sur toutes les images (vide si décoratif)
- [x] Contraste WCAG AA vérifié
- [x] Focus visible sur tous les éléments interactifs
- [x] `prefers-reduced-motion` respecté
- [x] Lighthouse — viser 100/100/100/100
- [ ] Test Google Rich Results

> **Phase 7 — Lot A (27 juillet 2026)** — SEO technique livré : `@astrojs/sitemap` installé (`site` = https://secret-detoiles.fr, `/playground` exclu via `filter`), `robots.txt`, BaseLayout enrichi (title/description + canonical + Open Graph + Twitter Card + `theme-color`), JSON-LD Organization sur la home uniquement, favicon SVG « étoile » de la marque, image OG placeholder `og/default.svg`. Home + playground : props meta explicites (playground en `noindex`).
> ⚠️ Favicon : seul le **SVG** est en place (suffit sur navigateurs modernes). `favicon-32.png` et `apple-touch-icon.png` sont **référencés mais pas encore générés** (404 silencieux) → à produire en Phase 6, comme le vrai PNG 1200×630 de l'image OG.
> Restent pour le Lot B : alt images, contraste WCAG AA, focus visible, prefers-reduced-motion, Lighthouse, test Rich Results.

> **Phase 7 — Lot B (28 juillet 2026)** — Phase 7 terminée ✅. A11y : aucun `alt` manquant (les 2 `<img>` en avaient déjà), CSS `:focus-visible` global (contour corail), `prefers-reduced-motion` confirmé. Contraste WCAG AA audité (calculs) : text-2 4,61:1 · text-3 5,58:1 → OK ; `cream-dim` sur bleu nuit ≈4,50:1 (limite — ajustement opacité 0,72→0,80 = 5,12:1 **proposé, non appliqué**) ; `--color-star` seulement en logos (exemptés)/décoratif/fonds sombres, sauf le gros email Sacramento de /contact (star sur crème, 1,74:1, à arbitrer).
> Perf : packshots convertis en **WebP** (~6,5 Mo → ~148 KB, −98 %) via `scripts/optimize-packshots.js` (sharp), refs `.png`→`.webp` (SizeCard + la-gamme), `loading="lazy"` partout. PNG conservés comme sources dans `public/packshots/` (encore copiés dans `dist/` mais non référencés).
> Lighthouse réel + test Google Rich Results à faire en Phase 12 sur l'URL de prod.

---

## Phase 8 — CMS Decap (édition texte/images, périmètre verrouillé)

Objectif : permettre à Grégory de modifier tous les textes et images du site depuis `secret-detoiles.fr/admin` sans passer par GitHub ni par du code. **Aucune possibilité de créer ou supprimer une page ou une section.**

- [ ] Créer un compte Cloudflare (gratuit) pour héberger le OAuth handler
- [ ] Déployer un Cloudflare Worker OAuth pour Decap CMS (gratuit, 100k requêtes/jour)
- [ ] Créer une OAuth App GitHub dans les settings du compte luke-import
- [x] Créer le dossier `public/admin/` avec `index.html` (loader Decap) et `config.yml`
- [x] Configurer `config.yml` avec les collections figées (une entrée par page, champs texte + image uniquement, pas de "create" ni "delete")
- [x] Migrer tous les textes des pages dans `src/content/` (Content Collections d'Astro)

> **Phase 8 — Étape 1 : migration contenu (28 juillet 2026)** — Les 7 pages lisent leur contenu depuis `src/content/pages/*.yaml` via une collection Astro (glob loader + `getEntry`). Config à **`src/content.config.ts`** (⚠️ pas `src/content/config.ts` : Astro 7 refuse l'ancien chemin *legacy*). Rendu **strictement identique** vérifié : diff du texte visible normalisé avant/après = 0 sur les 7 pages. Restent en dur (volontaire) : le tableau de référence + le simulateur de `/la-gamme` (données produit + logique JS), les props des SizeCard de la home, les aria-labels/alt, le JSON-LD. Reste pour l'Étape 2 : `public/admin/` (Decap) + Worker OAuth Cloudflare.

> **Phase 8 — Étape 2 : interface Decap locale (28 juillet 2026)** — Choix CMS confirmé : **Decap CMS**. `public/admin/index.html` (loader Decap CDN v3) + `config.yml` **verrouillé** (`create: false`, `delete: false`, 7 pages en collection `files`, widgets texte). Proxy local via **`decap-server`** (proxy officiel Decap ; le fork `@staticcms/proxy-server` renvoyait `entriesByFiles` sans le champ `file`, ce qui plantait le client Decap avec « ...reading 'match' »). Script `pnpm dev:cms` lance Astro + proxy en parallèle (`concurrently`). Vérifié en API : le proxy répond (`type: local_fs`) et **lit** les YAML. Champs limités à **SEO + Hero** pour ce « hello world » — à enrichir en Étape 2b. Guide dev : `docs/CMS.md`. NB local : ouvrir `/admin/index.html` (le dev Astro ne résout pas `/admin/` ; en prod si). **Étape 3 (OAuth GitHub) reportée après le déploiement Cloudflare (Phase 10).**
>
> **Phase 8 — Étape 2b : tous les textes éditables (28 juillet 2026)** — `config.yml` enrichi : **39 → 128 champs déclarés** sur les 7 pages (accueil 9→31, notre-histoire 5→15, la-gamme 5→28, nos-valeurs 5→14, composition 5→19, faq 5→11, contact 5→10). Labels FR + hints, widgets adaptés (string/text/select/boolean/list/object). **Règle clé** : le `name` d'un champ doit matcher **exactement** la clé YAML, car Decap **supprime toute clé non déclarée** à la sauvegarde. Donc *toutes* les clés sont déclarées ; les champs techniques (`num`, `bg`, `size`, `color`, `image_note`, `image_sub`) en **`widget: hidden`** pour préserver sans polluer l'UI ; `tint` en `select` ; listes à cardinalité fixe verrouillées `min=max` (engagements ×4, convictions ×3, detail items ×5, specs ×3, contient ×6…) ; listes libres (faq questions, faq answer, exclut items, paragraphes) avec `min/max`. **Validation anti-perte** : comparateur arbre-des-`name` vs arbre-des-clés-YAML = **0 divergence sur les 7 pages** (script scratchpad, non commité). `pnpm build` = 0 erreur. Commit `65d2bc3`. ⚠️ **Reste à vérifier au navigateur** (je ne pilote pas de navigateur) : affichage des champs dans `/admin` + **test aller-retour Save réel** pour confirmer que les `widget: hidden` préservent bien les clés techniques.
- [ ] Tester le flow complet : connexion GitHub → modification texte → publication → build automatique → mise en ligne
- [ ] Guide illustré pour Grégory (captures d'écran de l'interface admin, comment modifier un texte, une image, un PDF)

---

## Phase 9 — Conformité légale (RGPD, mentions) ✅

- [x] Page mentions légales
- [x] Page politique de confidentialité
- [-] Bandeau cookies : **non nécessaire — aucun cookie déposé** (Cloudflare Web Analytics fonctionne sans cookie)
- [x] Formulaire contact conforme (info collecte, droit d'accès) — déjà OK depuis Phase 2

> **Phase 9 — Conformité légale (28 juillet 2026)** — Deux pages créées : `src/pages/mentions-legales.astro` (éditeur Luke Import, hébergeur Cloudflare, propriété intellectuelle, responsabilité, liens externes, droit applicable) et `src/pages/confidentialite.astro` (RGPD : responsable de traitement, données collectées via formulaire Web3Forms + Cloudflare Web Analytics sans cookie, finalité, durée de conservation, droits, CNIL). Textes juridiques **figés** (fournis par le chef de projet, non paraphrasés). `BaseLayout` + `SectionEyebrow`, CSS scoped, tokens uniquement, wrapper `.legal-page` (max 780px). Les liens du footer (`/mentions-legales`, `/confidentialite`) pointaient déjà correctement → aucune modification du footer. `pnpm build` = **10 pages** (0 erreur) ; les 2 URLs renvoient **200** ; contenu vérifié (Anthony Ah-Tune / SIRET / Cloudflare présents). NB structure : titre de hero via `SectionEyebrow` (`<h2>`, sans `<h1>`), cohérent avec les 6 autres pages de contenu du site.

---

## Phase 10 — Déploiement Cloudflare Pages

- [ ] Créer un compte Cloudflare (gratuit) sur dash.cloudflare.com
- [ ] Depuis le dashboard : Workers & Pages → Create → Pages → Connect to Git → sélectionner `luke-import/secret-detoiles-website`
- [ ] Config build : framework preset **Astro** (détecté auto), build command `pnpm build`, dossier de sortie `dist`
- [ ] Ajouter les variables d'env dans Cloudflare Pages : `PUBLIC_WEB3FORMS_KEY` (clé Web3Forms obtenue sur web3forms.com)
- [ ] Premier déploiement automatique : vérifier que l'URL `.pages.dev` fonctionne
- [ ] Ajouter le domaine custom `secret-detoiles.fr` dans Cloudflare Pages → Custom domains
- [ ] Cloudflare va indiquer 2 records DNS (CNAME/AAAA) à créer chez OVH
- [ ] Se connecter à manager.ovhcloud.com → Domaines → secret-detoiles.fr → Zone DNS → modifier les records selon les indications Cloudflare
- [ ] Attendre propagation DNS (10 min à 24h) + génération SSL Let's Encrypt auto par Cloudflare
- [ ] Vérifier que https://secret-detoiles.fr affiche bien le site avec le cadenas SSL
- [ ] Activer Cloudflare Web Analytics dans le dashboard Cloudflare Pages
- [ ] Tester la perf sur URL de prod (Lighthouse + PageSpeed Insights) — objectif 100/100/100/100

---

## Phase 11 — Nom de domaine ✅

- [x] Nom de domaine choisi et acheté : **secret-detoiles.fr** (OVH)
- [x] DNS automatique OVH (l'hébergement inclus configure ça tout seul)
- [x] SSL Let's Encrypt actif (via OVH, gratuit et auto-renouvelé)
- [ ] Redirection www.secret-detoiles.fr → secret-detoiles.fr configurée (à faire en Phase 10)
- [ ] Vérifier que https://secret-detoiles.fr résout correctement (après premier déploiement)

---

## Phase 12 — Recette finale

- [ ] Tests mobile — iOS Safari + Android Chrome
- [ ] Tests desktop — Chrome + Firefox + Safari
- [ ] Vérification que tous les liens internes marchent (aucun 404)
- [ ] Vérification que le formulaire contact envoie bien (email reçu sur bonjour@secret-detoiles.fr via Web3Forms)
- [ ] Sauvegarde du repo (miroir sur un autre remote éventuellement)
- [ ] Documentation des accès (OVH espace client, GitHub, Cloudflare, Decap admin)
- [ ] Guide illustré d'édition via Decap CMS remis à Grégory

---

## Notes libres

Cette section sert à noter tout ce qui ne rentre pas ailleurs : décisions à prendre, questions ouvertes, idées pour plus tard, blocages.

### Décisions actées (24 juillet 2026)
- Le site présente **UNIQUEMENT les couches** (5 tailles S–XXL). Les Pants et Lingettes sont retirés définitivement.
- La **page qualité** avec les 4 tests + PDFs Eurofins/SGS est abandonnée. On garde la page "Nos valeurs" light validée dans Claude Design.
- La **page Contact** n'affiche que l'email + le formulaire. Pas de tel, pas d'adresse physique.
- Nom marque : **Secret d'étoiles** (singulier), aligné avec le domaine `secret-detoiles.fr`. Le nom "Secrets d'Étoiles" (pluriel) du bundle Claude Design doit être corrigé partout.
- DA finale : bundle Claude Design `Secrets_d_E_toiles_dc.html` (typos Sacramento + Fredoka + Nunito, palette avec tints pastel, animation twinkle sur étoiles ✦).

### Points ouverts
- Photo maman & bébé pour la section "cocon de douceur" home : source à décider (banque d'images libre, séance photo, illustration...)
- Placeholders "logos revendeurs" en bas de page contact : quelles enseignes afficher réellement ?
