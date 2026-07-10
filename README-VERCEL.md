# Déployer HistoDaily 1.0.0-beta.175 sur Vercel

1. Extraire entièrement le zip.
2. Remplacer tous les fichiers de l’ancien déploiement par ceux de cette version.
3. Conserver les variables d’environnement Supabase déjà configurées dans Vercel.
4. Déployer le dossier racine, qui contient `index.html` et `vercel.json`.
5. Après le déploiement, effectuer une actualisation forcée du navigateur.
6. Pour une PWA déjà installée, la fermer complètement puis la rouvrir afin que le cache `beta175` soit activé.

Aucune modification du schéma Supabase n’est requise pour cette mise à jour de contenu.

## Vérification rapide

- Ouvrir un cours puis son quiz.
- Vérifier que chaque question affiche quatre propositions.
- Choisir volontairement une mauvaise réponse : la bonne réponse, l’explication, le piège et le passage à revoir doivent apparaître.
