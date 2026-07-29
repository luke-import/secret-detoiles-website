# CLAUDE.md — Instructions Claude Code · Secret d'étoiles

> Ce fichier est lu automatiquement au début de chaque session Claude Code. Il contient les règles et le contexte du projet. À maintenir à jour au fil du projet.

---

## 1. Contexte du projet

**Marque** : Secret d'étoiles — marque de couches bébé (5 tailles : S, M, L, XL, XXL).
**Propriétaire** : Luke Import (33 rue Suffren, Saint-Pierre, La Réunion).
**Nature du site** : vitrine (pas d'e-commerce), grand public uniquement (pas d'espace pro).
**Périmètre produit** : uniquement les **Couches Enchantées**. Les Pants et Lingettes de la plaquette d'origine sont **retirés du site** (décision définitive).
**Univers narratif** : doux, rassurant, un ciel étoilé bienveillant, cocon de tendresse. Le ton est **mesuré** — ni clinique, ni trop lyrique. On évite le vocabulaire précieux.
**Cible** : parents de bébés (0 à ~3 ans).
**Vocabulaire signature à utiliser** (issu du bundle Claude Design validé) : "les couches enchantées", "un cocon de douceur", "un peu de magie", "un ciel étoilé", "tout en tendresse", "chaque nuit, un peu de magie", "née sous une bonne étoile".
**Vocabulaire abandonné** (trop lyrique, à ne PAS utiliser) : "voile stellaire", "constellation de douceur", "nébuleuse de confort", "étincelle de style", "pants merveilleux", "lingettes féériques".
**Arguments produit factuels** (mis en avant partout) : testées sous contrôle dermatologique, sans parfum, absorption longue durée, protection douce et fiable.

---

## 2. Interlocuteur

L'utilisateur, **Grégory Desbois, n'est pas développeur**. Il travaille avec deux instances Claude en parallèle :
- **Toi (Claude Code)** = l'exécutant, sur sa machine
- **Un autre Claude** = le chef de projet / architecte, dans une conversation à part

Grégory fait le pont entre nous par copier-coller. Tu ne dialogues jamais directement avec l'autre Claude ; tu ne t'adresses qu'à Grégory.

### Règles d'interaction (strictes)

- Toujours répondre en **français**.
- Toujours **expliquer** ce que tu fais et pourquoi, en langage clair (Grégory n'est pas dev).
- **Ne jamais improviser** une décision de stack, d'architecture, de nommage ou de contenu : demander.
- **Ne jamais installer** un package non listé dans ce fichier sans validation explicite.
- Remonter **toutes les erreurs**, complètes, brutes — ne jamais les cacher ou les paraphraser.
- Si une commande échoue : **ARRÊTER**, remonter la sortie, ne pas tenter de contournement seul.
- Si une question interactive apparaît (prompt Y/n, choix multiple) : **ARRÊTER** et demander.
- Si tu dois faire un choix imprévu : **ARRÊTER** et demander.
- Ne **modifier aucun fichier** en dehors de ce qui est explicitement demandé.
- Toujours **consulter et mettre à jour** `CHECKLIST.md` à chaque fin d'étape.

---

## 3. Stack figée (ne pas dévier sans validation)

| Rôle | Choix | Version |
|---|---|---|
| Framework | Astro | 7.x |
| Style | Tailwind CSS | v4 |
| Langage | TypeScript strict | — |
| Package manager | pnpm | 11.x |
| Node | 22.x LTS | v22.23.1 |
| Fonts | Fontsource (auto-hébergées) | Sacramento, Fredoka Variable, Nunito Variable |
| CMS | Decap CMS (édition texte/images uniquement, périmètre verrouillé) | — |
| Hébergement | Cloudflare Pages (gratuit, CDN mondial, bande passante illimitée, SSL auto) | — |
| Déploiement | Git push sur main → Cloudflare Pages build & deploy auto | — |
| Analytics | Cloudflare Web Analytics (gratuit, RGPD, aucun cookie, via snippet JS) | — |
| Formulaire contact | Web3Forms (gratuit illimité, endpoint API simple) | — |
| Nom de domaine | **secret-detoiles.fr** (OVH, ~10€/an au renouvellement) | — |

### Interdictions absolues

- **Aucun SaaS payant**, aucun free trial payant à terme.
- **Aucun package** non listé sans validation explicite (pas de framer-motion, pas de shadcn/ui, pas de radix, pas de headless UI, etc.).
- **Aucun React, Vue ou Svelte** : on reste en Astro pur avec CSS/JS vanilla. Des îlots React ne seront ajoutés que si strictement nécessaire et après validation.
- **npm et yarn interdits** : pnpm uniquement.
- **Aucun style inline** dans les .astro sauf exception dûment justifiée (préférer classes ou `<style>` scoped).

---

## 4. Design tokens (source de vérité)

Ces valeurs sont dans `src/styles/tokens.css`. Ne jamais hardcoder ailleurs.

### Palette principale
| Nom | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FDFBF6` | Fond principal (blanc cassé chaud) |
| `--color-cream-warm` | `#F3EEE1` | Boutons secondaires, bandeau nav mobile |
| `--color-cream-deep` | `#EEE7DA` | Bordures douces, séparateurs |
| `--color-blue-sky` | `#8FB4CE` | Taille S, accents ciel |
| `--color-mint` | `#A8CDBA` | Taille M, accents nature |
| `--color-star` | `#F0B84C` | Taille L, **logo cursif Sacramento**, accents chaleur |
| `--color-peach` | `#E8A87C` | Taille XL |
| `--color-coral` | `#D97A6C` | Taille XXL, liens, accents chauds |
| `--color-coral-deep` | `#C6685A` | Liens hover |
| `--color-blue-night` | `#3C5A7A` | **Texte principal, titres, boutons primaires, fond CTA/footer** |
| `--color-blue-night-2` | `#4A6B8E` | Second gradient step (utilisé sur CTA final home) |
| `--color-text-2` | `#5C7590` | Texte secondaire, leads, sub-titres |
| `--color-text-3` | `#4E6884` | Texte tertiaire (paragraphes narratifs) |
| `--color-muted` | `#9AA9B8` | Notes et mentions discrètes |

### Palette tints (fonds pastels des cards produit et sections)
| Nom | Hex | Usage |
|---|---|---|
| `--tint-blue-sky` | `#EAF1F6` | Fond card taille S, section contact "Écrivez-nous" |
| `--tint-mint` | `#EBF3EE` | Fond card taille M, section engagement dermato |
| `--tint-star` | `#FCF2DC` | Fond card taille L, section engagement absorption |
| `--tint-peach` | `#FBEEE3` | Fond card taille XL, section engagement protection |
| `--tint-coral` | `#F7E4DF` | Fond card taille XXL |

### Typographies (validées via Claude Design)
- `--font-hand` : `'Sacramento', cursive` — **logo, eyebrows manuscrits**, accents doux uniquement
- `--font-display` : `'Fredoka Variable', system-ui, sans-serif` — titres, sous-titres, boutons, labels
- `--font-body` : `'Nunito Variable', system-ui, sans-serif` — corps de texte (plus rond et chaleureux qu'Inter, cohérent avec l'univers bébé)

### Rayons (généreux, cohérents avec Claude Design)
- `--radius-sm` : `14px` (petits éléments, inputs)
- `--radius` : `16px` (icônes rondes)
- `--radius-md` : `22px` (cards standard)
- `--radius-lg` : `24px` (cards importantes)
- `--radius-xl` : `26px` (cards produit, sections encart)
- `--radius-2xl` : `32px` (CTA final, grandes sections)
- `--radius-pill` : `999px` (pills, boutons ronds)

### Animations signature (à respecter, définies dans le bundle Claude Design)
```css
@keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-16px) } }
@keyframes twinkle { 0%,100% { opacity: .2; transform: scale(.85) } 50% { opacity: .95; transform: scale(1) } }
```
Étoiles décoratives (unicode `✦` et `✧`) placées en absolute, animées `twinkle` avec des durées variées entre 3s et 4.4s. Respecter `prefers-reduced-motion`.

### Layout
- `--max-width` : `1160px` (aligné Claude Design)

---

## 5. Structure de dossiers attendue

```
secret-detoiles/
├─ CLAUDE.md               (ce fichier)
├─ CHECKLIST.md            (à mettre à jour à chaque étape)
├─ README.md               (résumé technique du projet)
├─ .gitignore
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json
├─ design-sources/          (⚠️ NON publié en ligne — hors de public/)
│  └─ packshots/           (5 PNG sources 3000×3000, versionnés dans git, jamais servis publiquement)
├─ public/
│  ├─ favicon.svg
│  ├─ packshots/           (UNIQUEMENT des WebP générés par `pnpm optimize:packshots` : taille-X.webp 800px + taille-X-large.webp 1200px)
│  └─ admin/               (Decap CMS : index.html + config.yml, à créer Phase 8)
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css        (design tokens, source de vérité)
│  │  └─ global.css        (reset, base, animations twinkle/floaty)
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ components/
│  │  ├─ SiteHeader.astro     (nav sticky + burger mobile)
│  │  ├─ SiteFooter.astro     (dégradé arc-en-ciel + colonnes)
│  │  ├─ Button.astro         (variantes primary, ghost, cream)
│  │  ├─ Sparkles.astro       (étoiles ✦ animées, positionnable)
│  │  ├─ SectionEyebrow.astro (surtitre manuscrit Sacramento + h2 Fredoka)
│  │  ├─ ValueCard.astro      (card pastel avec icône ✦)
│  │  ├─ SizeCard.astro       (card produit avec packshot + pastille + barre couleur)
│  │  ├─ FaqAccordion.astro   (accordéon question/réponse)
│  │  └─ ContactForm.astro    (formulaire → Web3Forms)
│  ├─ content/               (Content Collections Astro — SOURCE éditable via Decap)
│  │  ├─ pages/              (une entrée MD par page : accueil, histoire, gamme, valeurs, composition, faq, contact)
│  │  └─ config.ts
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ notre-histoire.astro
│  │  ├─ la-gamme.astro
│  │  ├─ nos-valeurs.astro
│  │  ├─ composition-securite.astro
│  │  ├─ faq.astro
│  │  └─ contact.astro
│  └─ lib/                  (utilitaires TypeScript)
```

> **Packshots — sources vs. WebP publiés** : les PNG sources haute résolution (3000×3000) vivent dans `design-sources/packshots/`, **hors de `public/`** — ils sont versionnés dans git mais **jamais publiés en ligne** (donc non téléchargeables). Le dossier `public/packshots/` ne contient **que les WebP générés** par `pnpm optimize:packshots`, qui produit pour chaque taille une vignette `taille-X.webp` (800px) et une version hero `taille-X-large.webp` (1200px). Pour changer un packshot : remplacer le PNG dans `design-sources/packshots/` puis relancer `pnpm optimize:packshots`.

---

## 6. Conventions

- **Composants** : `PascalCase.astro` (ex. `HeroSection.astro`)
- **Utilitaires** : `kebab-case.ts` (ex. `format-date.ts`)
- **CSS** : privilégier les CSS variables et le CSS natif ; utiliser Tailwind pour l'utilitaire rapide (spacing, flex, grid) mais **ne jamais hardcoder une couleur** — passer par les tokens.
- **HTML** : sémantique correcte (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, headings hiérarchiques).
- **Accessibilité** :
  - `alt` obligatoire sur toutes les images (vide `alt=""` si purement décoratif)
  - Contraste minimum WCAG AA (le bleu nuit sur crème passe)
  - Focus visible partout (ne pas supprimer les outlines sans les remplacer)
  - Respect de `prefers-reduced-motion` pour les animations
- **Mobile-first** : media queries en `min-width` uniquement.
- **Images** : composant `<Image>` d'Astro obligatoire pour toute image significative (optimisation auto).
- **Aucun `console.log`** en production.

---

## 7. Workflow pour chaque étape

1. **Lire `CHECKLIST.md`** au début de la session pour savoir où on en est.
2. **Exécuter** l'étape demandée par Grégory (qui la transmet depuis le Claude chef de projet).
3. **Vérifier** que ça marche : `pnpm build` sans erreur, `pnpm dev` répond, aucune régression visible.
4. **Mettre à jour `CHECKLIST.md`** : cocher les cases, ajouter des notes utiles sous les items si pertinent.
5. **Commit git** avec un message conventionnel :
   - `feat: description` — nouvelle fonctionnalité
   - `fix: description` — correction de bug
   - `chore: description` — tâche technique (config, deps)
   - `style: description` — style/CSS pur
   - `refactor: description` — réorganisation sans changement de comportement
   - `docs: description` — documentation, CLAUDE.md, CHECKLIST.md
6. **Remonter à Grégory** un résumé propre : ce qui a été fait, les fichiers touchés, les warnings s'il y en a, la prochaine étape suggérée.

---

## 8. Ne pas oublier

- Le contenu textuel doit toujours **utiliser le vocabulaire signature** de la marque (voir §1).
- **Réutiliser** les composants existants avant d'en créer un nouveau.
- La **DA validée** est celle du **bundle Claude Design** (fichier de référence `Secrets_d_E_toiles_dc.html` fourni par Grégory). Palette blanc cassé chaud + accents pastel + typographies Sacramento + Fredoka + Nunito. Ne pas s'en éloigner sans validation explicite.
- La **structure de site validée** = 7 pages exactement : Accueil, Notre histoire, La gamme, Nos valeurs, Composition & sécurité, FAQ, Contact. Ne pas ajouter ni retirer de page sans validation.
- Ce site est fait pour **rester 100% gratuit** en fonctionnement (hors nom de domaine). Toute proposition qui introduit un coût récurrent doit être flaggée.

---

## 9. URLs, identifiants et coordonnées

### Domaine et emails
- **Domaine de production** : https://secret-detoiles.fr
- **Email de contact** : bonjour@secret-detoiles.fr (hébergé chez OVH, activé)
- **Interface admin (CMS)** : https://secret-detoiles.fr/admin (Decap CMS, une fois installé)

### Repos et infrastructure
- **Repo GitHub** : github.com/luke-import/secret-detoiles-website (public)
- **Espace client OVH** : manager.ovhcloud.com (uniquement pour le domaine et l'email — plus d'hébergement)
- **Cloudflare** : dash.cloudflare.com (hébergement Pages, Web Analytics, futur OAuth Decap CMS)

### Répartition des secrets
Les variables et secrets sont gérés dans **Cloudflare Pages → Settings → Environment variables**, avec équivalent local via `.env` (non commité). Jamais de secret dans le code source.
Secrets prévus :
- Les variables d'environnement (`PUBLIC_WEB3FORMS_KEY`, etc.) sont gérées dans **Cloudflare Pages → Settings → Environment variables**. Le fichier `.env` local sert uniquement au développement.

---

## 10. Principe d'édition du contenu

L'utilisateur **ne veut PAS passer par GitHub pour éditer** le contenu. Il éditera via **Decap CMS** (interface web à `/admin`), qui commit en arrière-plan pour lui.

Conséquences pour l'architecture :
- **Séparer strictement le contenu du code**. Tous les textes éditables et les images éditables doivent vivre dans des fichiers Markdown/YAML sous `src/content/` (Content Collections d'Astro), pas hardcodés dans les composants.
- Chaque page `.astro` importe son contenu depuis une collection.
- Chaque image éditable est référencée par un chemin dans le contenu, pas embarquée dans le composant.
- Le fichier `admin/config.yml` de Decap doit refléter exactement cette structure : une entrée par page, avec les mêmes champs que le fichier Markdown correspondant.
- Le périmètre d'édition est **verrouillé** : aucun bouton pour créer/supprimer des pages ou des sections. Uniquement des champs texte + upload d'image sur les entrées existantes.

---

## 11. Référence produit (à ne pas modifier sans validation)

### Correspondance des 5 tailles
| Taille | Sous-titre | Poids | Nb par paquet | Couleur d'accent | Fond tint | Packshot |
|---|---|---|---|---|---|---|
| **S** | Taille 1-2 | 3 – 6 kg | 42 couches | `--color-blue-sky` `#8FB4CE` | `--tint-blue-sky` `#EAF1F6` | `/packshots/taille-s.png` |
| **M** | Taille 3 | 5 – 10 kg | 36 couches | `--color-mint` `#A8CDBA` | `--tint-mint` `#EBF3EE` | `/packshots/taille-m.png` |
| **L** | Taille 4 | 9 – 13 kg | 32 couches | `--color-star` `#F0B84C` | `--tint-star` `#FCF2DC` | `/packshots/taille-l.png` |
| **XL** | Taille 5 | 12 – 15 kg | 28 couches | `--color-peach` `#E8A87C` | `--tint-peach` `#FBEEE3` | `/packshots/taille-xl.png` |
| **XXL** | Taille 6+ | + 15 kg | 24 couches | `--color-coral` `#D97A6C` | `--tint-coral` `#F7E4DF` | `/packshots/taille-xxl.png` |

### Contact affiché sur le site
- **Email** : `bonjour@secret-detoiles.fr` (seule coordonnée affichée publiquement)
- **Formulaire** : envoyé via Web3Forms vers `bonjour@secret-detoiles.fr`
- **Pas de téléphone affiché**
- **Pas d'adresse physique affichée** (Luke Import Saint-Pierre / La Réunion reste dans le CLAUDE.md pour info interne, mais n'apparaît PAS sur le site public)
