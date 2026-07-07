# HistoDaily beta 48 — debug accueil et cours

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
- API health passée en beta 48.
- Cache/service-worker passés en beta 48.
- Navigation Express / Complet / Quiz intégrée sans animation lourde.

## Note GitHub/Vercel
Cette variante retire `vercel.json` pour éviter l'erreur "Invalid Vercel file provided". Vercel déploie automatiquement les fichiers statiques et les fonctions présentes dans `/api`.


## Beta 48 debug
- Accueil simplifié : mystère du jour, cours du jour, progression.
- Correction du bouton Valider XP.
- Express renforcé avec cadre, enjeu, preuve et piège.
- Service worker beta48 pour éviter les caches beta47 mélangés.
