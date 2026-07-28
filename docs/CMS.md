# Utiliser le CMS localement

Le CMS Decap permet d'éditer les textes du site via une interface graphique.

## Lancer le CMS en local

Dans un terminal :

    pnpm dev:cms

Cela lance en parallèle :
- Le serveur Astro sur http://localhost:4321
- Le proxy CMS sur http://localhost:8081

## Accéder à l'admin

Ouvrir **http://localhost:4321/admin/index.html** dans un navigateur.

> ⚠️ En local, mettre l'URL complète `/admin/index.html` : le serveur de dev
> Astro ne résout pas un dossier (`/admin/`) vers son `index.html`. En production
> (Cloudflare Pages), `/admin/` fonctionnera directement.

Cliquer sur "Login" (aucun mot de passe requis en mode local).

Éditer les textes, cliquer "Save" — les modifications sont écrites directement
dans les fichiers `src/content/pages/*.yaml`.

## Publier les modifications

Après édition, ouvrir un terminal et faire :

    git add src/content/pages/
    git commit -m "content: modifications via CMS local"
    git push

Le déploiement Cloudflare Pages redéploiera automatiquement le site.

## Note pour la production

En production (Étape 3, à venir), le CMS sera connecté à GitHub via OAuth.
Il ne sera plus nécessaire de lancer le proxy local — les modifications
seront committées directement sur GitHub depuis l'interface web.
