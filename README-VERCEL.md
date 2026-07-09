# HistoDaily — paquet de déploiement beta113

Version : `1.0.0-beta.113`

Build public resserré pour test privé. Ajout du journal de version sur l’accueil.

## Contenu public

- 42 cours d’histoire prêts
- grands chapitres préparés pour Art, Cinéma, Sciences & inventions, Économie et Géographie
- accueil piloté par le mode actif : mystère et propositions changent selon la discipline
- profil culturel avec jeton de progression par discipline
- PWA installable
- scores locaux disponibles hors ligne
- classements et amis activables avec les variables Supabase
- validation des réponses de mystère renforcée sur mobile

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


## Beta 109
- Ajout de 6 vrais cours longs, sans bourrage : impressionnisme, Hollywood classique, Pasteur/microbes, inflation, Mercator et naissance du jazz.
- Ajout de nouveaux mystères liés à ces domaines pour que l’accueil reste cohérent avec le mode choisi.
- Les contenus gardent la structure validée : express court, cours complet narratif, points à retenir et 5 questions vraiment tirées du texte.

## Beta 110
- Correctif ciblé sur les mystères : validation robuste, feedback visible et réponses Napoléon/Bonaparte acceptées.

## Beta 111
- Ajout d’une carte “Journal de version” sur l’accueil.
- Affichage visible de la version courante sur l’accueil.
- Préparation d’un suivi propre des nouveautés à chaque push de mise à jour.

## Beta 112
- Correctif performance mobile : mode fluide activé par défaut.
- Navigation entre onglets allégée : les simples changements d’écran ne déclenchent plus de grosse sauvegarde locale.
- Suppression des flous, animations et ombres lourdes en mode fluide.
- Le garde-fou de cohérence ne tourne plus à chaque rendu : il reste au démarrage, pas sur chaque tap.


## Beta 113

- Animations intelligentes réactivées sans flous lourds.
- Rendu cadencé avec requestAnimationFrame pour éviter plusieurs rendus lors de taps rapides.
- Trois modes : Fluide animé, Statique, Visuel.
