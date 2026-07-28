# Utiliser le CMS

Le CMS Decap permet à Grégory d'éditer les textes du site via une interface
graphique accessible sur /admin, sans jamais toucher au code.

## Accès

- URL locale (dev) : http://localhost:4321/admin/index.html
- URL production : https://secret-detoiles.fr/admin/index.html

## Se connecter

1. Cliquer "Login with GitHub"
2. Autoriser l'application "Secret d'étoiles CMS"
3. Éditer les textes dans l'interface, cliquer "Save"
4. Chaque "Save" = 1 commit sur la branche `main` du repo
5. Cloudflare Pages redéploie automatiquement en 1-2 minutes

## Note importante — dev local

Le CMS ne peut fonctionner à 100% en local (localhost) qu'après un premier
déploiement en production. La raison : l'OAuth GitHub redirige vers
https://api.netlify.com/auth/done, qui elle-même redirige vers l'origine
appelante. Depuis localhost, cette dernière étape peut échouer.

Pour tester le CMS avant la production : soit passer par ngrok/cloudflared
pour exposer localhost sur une URL publique temporaire, soit attendre le
premier déploiement Cloudflare Pages (Phase 10) et tester directement là.

## Prérequis pour éditer

- Avoir un compte GitHub avec accès en écriture au repo
  luke-import/secret-detoiles-website
- Autoriser l'app OAuth "Secret d'étoiles CMS" la première fois

## Comportement

- Chaque "Save" dans le CMS = 1 commit auto sur GitHub
- Le déploiement Cloudflare Pages se déclenche à chaque commit
- Le site est mis à jour en 1-2 minutes après le "Save"
- Aucun mot de passe à gérer, l'auth se fait via GitHub
