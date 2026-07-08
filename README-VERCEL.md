# HistoDaily — paquet de déploiement beta106

Version : `1.0.0-beta.106`

Build public resserré pour test privé.

## Contenu public

- 42 cours d’histoire prêts
- grands chapitres préparés pour Art, Cinéma, Sciences & inventions, Économie et Géographie
- accueil piloté par le mode actif : mystère et propositions changent selon la discipline
- profil culturel avec jeton de progression par discipline
- PWA installable
- scores locaux disponibles hors ligne
- classements et amis activables avec les variables Supabase

## Déploiement Vercel

Déposer le contenu du dossier sur Vercel. Les variables en ligne restent optionnelles pour l’usage local, mais nécessaires pour partager les scores entre appareils.

Variables optionnelles :

```text
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Notes beta 106

- Les modes se choisissent depuis l’accueil.
- Le mystère du jour suit la discipline active.
- Les disciplines non historiques restent volontairement légères : structure et grands chapitres d’abord, vrais cours ensuite.
- Réglages testés sans erreur avec le mode performance.


## Beta 108
- Thème couleur dynamique par discipline.
- Ajout de 5 vrais cours courts+complets+quiz : art, cinéma, sciences, économie, géographie.
- Accueil des modes non historiques : propositions de cours réels quand disponibles.


## Beta 108
- Ajout du mode Musique.
- Recentrage Art/Cinéma/Sciences sur l’histoire des œuvres, films, sciences et inventions.
- Ajout de quelques vrais cours longs : Renaissance, naissance du cinéma, Galilée, chant médiéval/polyphonie.
- Les modules de méthode restent présents mais passent en hors-série.
