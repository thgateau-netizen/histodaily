# HistoDaily beta 50 — debug accueil et cours

Cette beta corrige deux retours de test importants : le champ de réponse du mystère doit être parfaitement utilisable sur ordinateur, et les cours ne doivent plus donner l’impression d’un gros pavé imposé.

## Base héritée beta 47

- Champ de réponse du mystère renforcé : `type="text"`, focus forcé au clic, meilleure priorité CSS, validation clavier avec Entrée.
- Les cours sont maintenant séparés en trois onglets : **Rapide**, **Complet**, **Quiz**.
- Le mode rapide n’affiche plus le cours complet, ni les approfondissements, ni le quiz en bloc sous le texte.
- Après un mystère résolu, le bouton “Résumé 1 min” ouvre vraiment l’onglet rapide, et “Cours complet” ouvre vraiment l’onglet complet.
- Ajout de styles dédiés pour garder le rendu propre sur ordinateur et mobile.

## Pourquoi cette passe

Le contenu est devenu riche, mais il ne faut pas que l’app donne une sensation de manuel scolaire interminable. Le mystère doit rester immédiat, et le cours doit laisser choisir : lire vite, creuser, ou réviser.

## Vérifications

- Syntaxe JS vérifiée.
- API health passée en beta 50.
- Cache/service-worker passés en beta 50.
- Navigation Express / Complet / Quiz intégrée sans animation lourde.

## Note GitHub/Vercel
Cette variante retire `vercel.json` pour éviter l'erreur "Invalid Vercel file provided". Vercel déploie automatiquement les fichiers statiques et les fonctions présentes dans `/api`.


## Beta 48 debug
- Accueil simplifié : mystère du jour, cours du jour, progression.
- Correction du bouton Valider XP.
- Express renforcé avec cadre, enjeu, preuve et piège.
- Service worker beta50 pour éviter les caches beta47 mélangés.


## Beta 49 — contenu et anti-spoil
- Le cours du jour n’affiche plus son titre ni son résumé tant que le mystère du jour n’est pas résolu.
- Les indices des mystères ont été réécrits pour progresser sans donner directement la réponse.
- Le contenu ne cherche pas à ajouter des blocs : il nettoie ce qui cassait l’expérience de jeu.


## Beta 50 - correction contenu réelle
- Le cours du jour est indépendant du mystère du jour : il ne peut plus afficher la réponse juste sous le dossier.
- Le cours lié au mystère reste uniquement dans l’écran de résolution, après succès.
- Suppression des fiches gadget dans l’Express : remplacement par contexte, mécanisme, conséquence, à retenir.
- Cache PWA beta50 pour éviter les mélanges de versions.
