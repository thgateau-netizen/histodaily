# HistoDaily RC49 — Flow Fix & English Clarity

## Pourquoi cette RC
Une capture réelle a révélé trois défauts sur le parcours quotidien :

1. la carte **Approfondir le sujet** de l’accueil ne faisait rien ;
2. **Dossier résolu** était affiché deux fois dans la solution ;
3. certains mystères d’anglais, notamment le starter autour de *sensible*, utilisaient une formulation abstraite et artificielle qui ressemblait à une consigne de générateur de QCM.

## Correctifs

### Approfondir depuis l’accueil
Le clic dépendait d’un helper `openLesson(...)` défini localement dans un autre renderer et donc inaccessible depuis le Daily Hook. RC49 utilise désormais `openDeepDiveLesson()` : le cours lié est routé directement avec `setState`, en conservant discipline, monde, groupe et vue `complete`.

Un test comportemental reproduit le chemin exact : **accueil terminé → Approfondir le sujet → cours lié**.

### Dossier résolu en double
Le rendu HTML contenait le vrai libellé `Dossier résolu`, tandis qu’une ancienne règle `.solution:before` ajoutait le même texte visuellement. Le pseudo-élément est neutralisé ; le libellé HTML reste la source unique.

### Anglais
Les 14 mystères anglais ont reçu une passe de clarté RC49 :
- scène concrète avant la question ;
- consigne courte et compréhensible ;
- indices spécifiques au cas au lieu des trois mêmes phrases génériques ;
- distracteurs basés sur des erreurs plausibles d’apprenant ;
- explication de la nuance après résolution.

Le cas montré dans la capture devient notamment :

> Ton collègue propose le plan le plus simple : même résultat, moins de risque. Que réponds-tu ?

avec la scène anglaise correspondante, plutôt qu’une phrase abstraite sur « le caractère pratique et raisonnable du choix ».

Le garde-fou de longueur des prompts anglais a aussi été abaissé : pour une scène de langue, la clarté et la présence d’un contexte réel sont contrôlées par l’audit anglais dédié, plutôt que de rajouter artificiellement des mots pour atteindre 20.

## Validation
- bundles JS : syntaxe OK ;
- Daily Hook : 13/13 contrôles ;
- test comportemental discipline + approfondissement : OK ;
- audit anglais : 16 cours, 80 questions, 16 ateliers, 14 mystères : OK ;
- pipeline qualité complet : OK ;
- catalogue inchangé : 219 cours / 158 mystères.
