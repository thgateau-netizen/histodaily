# HistoDaily beta 185 — passe de débogage globale

Cette version stabilise l’ensemble des ajouts des beta 178 à 184.

## Corrections

- titre du document synchronisé avec l’écran, le cours et la discipline réellement ouverts ;
- suppression des numéros de chapitres discontinus lorsque certains groupes sans contenu sont filtrés ;
- vérification des protections contre les doubles gains pour les cours, mystères, sauvetages, révisions, programme quotidien et objectif hebdomadaire ;
- validation de la compatibilité des anciennes sauvegardes et du repli sur la sauvegarde de secours ;
- cache PWA aligné sur `histodaily-beta185-debug-global-v1`.

## Audit de contenu

- 86 cours vérifiés ;
- chaque cours possède ses deux formats et 5 questions ;
- 55 mystères vérifiés, sans identifiant dupliqué ni cours lié manquant.

## Limite du test

Les écrans et les interactions ont été rejoués dans un environnement Chromium isolé. Le cycle d’installation et de mise à jour du service worker n’a pas pu être exécuté sur une URL locale dans cet environnement ; sa liste de ressources et ses versions ont donc été contrôlées statiquement.
