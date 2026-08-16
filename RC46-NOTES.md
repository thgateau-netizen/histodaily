# HistoDaily RC46 — Product Health Audit

## Portée
Audit global hors contenu : cohérence frontend/backend, classements, état utilisateur, PWA/offline, sécurité navigateur, données, performance de démarrage, observabilité et maintenabilité.

## Défauts critiques trouvés et corrigés

### 1. Catalogue quotidien client/serveur désynchronisé
La RC45 chargeait 158 mystères côté application, tandis que `lib/hd-data.js` n'en contenait que 17. Le moteur client choisit désormais les dossiers selon la discipline, l'historique et la difficulté adaptative, alors que `social-v2/score` continuait d'exiger l'ancien mystère global déterminé uniquement par la date.

Conséquence possible : un mystère parfaitement légitime pouvait être refusé par le serveur et ne jamais entrer dans Jour/Semaine.

RC46 :
- catalogue serveur = 158/158 mystères client ;
- validation du score par appartenance au catalogue canonique ;
- une seule expédition peut compter par joueur et par journée ;
- les anciennes doubles lignes d'une même journée sont réduites au meilleur score lors de l'agrégation.

### 2. Backend figé en RC32
`hd-api.js` et `hd-social-v2.js` annonçaient encore `1.0.0-rc.32.0`, alors que l'app était RC45. Le health endpoint annonçait également 74 cours.

RC46 : version alignée partout et health = 219 cours / 158 mystères.

### 3. CSP inutilement permissive
L'index utilisait un script inline uniquement pour définir `HD_SOCIAL_V2_ONLY`. Cela forçait `script-src 'unsafe-inline'`.

RC46 : le flag est maintenant dans le bundle externe et la CSP script devient `script-src 'self'`.

### 4. Export de travail potentiellement déployé
`catalogue-export-temp.json` (~2,5 Mo) n'était pas exclu de Vercel. Il contient le catalogue de travail complet et n'a aucune raison d'être servi publiquement.

RC46 : exclusion explicite dans `.vercelignore`.

## Faiblesses importantes qui restent

### P1 — Identité / intégrité des classements
Il n'existe pas encore d'authentification de compte forte. `playerId`, code ami, XP et statistiques sont en grande partie déclarés par le client. Les garde-fous serveur évitent plusieurs corruptions accidentelles, mais un client volontairement modifié peut encore usurper ou gonfler un profil.

**Conclusion : acceptable pour une bêta familiale/privée, pas pour un classement public réellement compétitif.**

### P1 — Progression détaillée non synchronisée
Le serveur stocke les éléments sociaux et agrégés (pseudo, XP, niveau, scores, série...), mais la progression fine — cours terminés, quiz, historique de révision, mystères détaillés — reste locale. L'app possède une bonne sauvegarde JSON manuelle, mais un téléphone perdu sans sauvegarde peut perdre cette granularité.

### P1 — Suppression des données serveur
La suppression en ligne est volontairement admin-only, précisément parce que l'app n'a pas encore d'authentification permettant de prouver l'identité du demandeur. Avant diffusion publique large, il faudra une suppression autonome et vérifiée.

### P2 — Performance de démarrage
Les trois bundles et le CSS représentent environ **1,20 MiB gzip** avant images. Le bundle contenu fait à lui seul ~604 Ko gzip : les 219 cours sont téléchargés même si l'utilisateur ne visite qu'une discipline.

Le prochain vrai gain de performance sera du **lazy-loading par discipline**, pas une nouvelle micro-optimisation CSS.

### P2 — Observabilité
Le client contient encore **408 `catch {}` vides**. Une partie est volontaire (fallbacks compatibilité/localStorage), mais ce volume peut masquer des pannes réelles. Il existe des gestionnaires d'erreurs locaux, pas encore une observabilité de production structurée.

### P2 — Architecture runtime
Mesures RC46 :
- 58 modules client hérités ;
- 17 occurrences de `MutationObserver` ;
- 138 écritures `window.*` ;
- 349 `addEventListener` dans les sources ;
- 52 réassignations de fonctions côté backend ;
- 2 397 `!important` CSS.

La dette n'empêche pas l'app de fonctionner, mais augmente le coût et le risque de chaque modification.

### P2 — Protection contre l'abus API
Aucun rate limiting applicatif n'est détecté. À ajouter avant une exposition publique significative, surtout sur score/profil/amis/push.

## Points solides constatés
- sauvegarde locale principale + backup + journal de progression ;
- export/import manuel complet ;
- file d'attente des scores hors ligne ;
- service worker versionné et stratégie offline prudente ;
- headers de sécurité déjà présents ;
- diagnostics privés non exposés par la route publique ;
- caméra, micro et géolocalisation explicitement interdits par Permissions-Policy ;
- aucune régression détectée par les audits UX, difficulté et parcours existants.

## Verdict
La RC46 corrige une vraie incohérence backend/frontend qui pouvait fausser Jour/Semaine. Après cette correction, la priorité n'est plus d'ajouter des fonctionnalités : pour franchir le cap « produit public », il faudra sécuriser l'identité et la synchronisation de progression, puis alléger progressivement le runtime.
