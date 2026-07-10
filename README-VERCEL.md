# Déployer HistoDaily 1.0.0-beta.177 sur Vercel

1. Extraire entièrement le zip.
2. Remplacer **tous** les fichiers de l’ancien déploiement, y compris le dossier `api` et le dossier `lib`.
3. Dans Vercel, conserver ou ajouter les variables d’environnement :
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Vérifier que `SUPABASE-SOCIAL-SCHEMA.sql` a été exécuté au moins une fois dans le projet Supabase.
5. Déployer le dossier racine contenant `index.html`, `vercel.json`, `api/` et `lib/`.
6. Effectuer une actualisation forcée. Pour une PWA installée, la fermer complètement puis la rouvrir afin d’activer le cache `beta177`.

Aucune nouvelle colonne n’est nécessaire si le schéma social fourni avec les versions précédentes a déjà été appliqué.

## Vérification rapide après déploiement

- Ouvrir `/api/v1/health` : la réponse doit indiquer la version `1.0.0-beta.177`.
- Créer ou synchroniser deux profils distincts.
- Envoyer une demande avec le code ami du second profil, puis l’accepter depuis ce second profil.
- Vérifier que chacun apparaît dans la liste de l’autre.
- Résoudre un mystère et vérifier que le classement affiche le score du mystère, pas l’XP totale du compte.

Le mode solo, les cours, les quiz et les mystères restent utilisables lorsque Supabase est momentanément indisponible.
