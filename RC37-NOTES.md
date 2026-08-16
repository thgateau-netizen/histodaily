# HistoDaily RC37 — English Rework

## Pourquoi cette RC
L’anglais utilisait encore trop souvent le modèle éditorial des autres disciplines : une notion expliquée, puis un QCM de reconnaissance avec des distracteurs parfois trop faciles. Pour une langue, ce modèle mesure mal la compréhension réelle et la capacité à agir dans une conversation.

## Nouvel angle
Le parcours anglais suit désormais : **scène → intention / formulation naturelle → production personnelle**.

Principes :
- comprendre le message global avant la traduction mot à mot ;
- choisir selon le contexte, le registre et l’intention ;
- préférer les collocations et les blocs naturels aux équivalences isolées ;
- entraîner la paraphrase et la réparation d’une incompréhension ;
- utiliser l’écoute TTS quand elle apporte une information de ton ou de rythme ;
- terminer chaque cours par une production en anglais, avec une réponse-modèle non prescriptive.

## Contenu refait
- **16/16 cours anglais** remplacés par des versions situationnelles ; les IDs restent identiques pour conserver la progression existante.
- **80/80 questions** réécrites.
- **0 question de traduction directe** dans le nouvel audit anglais.
- **71/80 questions explicitement contextualisées** ; les autres travaillent une structure ou une collocation dans un cadre précis.
- **38 types de tâches** recensés : inférence, registre, collocation, paraphrase, clarification, implicite, hedging, production, etc.
- **320/320 réponses et options** sont formulées comme de l’anglais à comprendre ou à utiliser.

## Cours interactifs
- **16/16 cours** possèdent une pause de situation et une vraie consigne de production personnelle.
- **16/16** ont une réponse naturelle possible pour l’auto-comparaison.
- **15/16** ont une phrase écoutable via TTS ; le cours de paraphrase pure privilégie volontairement la production libre.
- La deuxième pause n’est plus « explique ce que tu as compris en français » : elle demande une **réponse en anglais** adaptée à la situation.

## Expéditions anglaises
Les **14 expéditions anglaises existantes** gardent leurs IDs mais ont été transformées en scènes de langue : choisir une réponse, interpréter une intention, réparer une incompréhension ou sélectionner une structure naturelle. Elles ne sont plus des mini-fiches de traduction.

## Audit différencié
Le quality check ne juge plus l’anglais exactement comme un cours d’histoire :
- longueur du texte = garde-fou secondaire, avec un plancher plus court pour l’anglais ;
- audit dédié au contexte, à la variété des tâches, à la production, à l’audio et à la disparition de la traduction directe ;
- l’audit éditorial reconnaît désormais les tâches linguistiques (inférence, pragmatique, reformulation, registre…) comme du raisonnement propre à la discipline.

## Validation
- `npm run check:client` : 3 bundles valides.
- `npm run quality:check` : passé.
- Catalogue : 209 cours / 158 mystères intact.
- Audit éditorial : 0 issue.
- Audit de structure : 0 erreur / 0 warning.
- Audit anglais : 16 cours, 80 questions, 16 labs de production, 14 expéditions situationnelles, 0 erreur / 0 warning.
- UI Flow : 15/15.
- Product Polish : 16/16.
- Lean Flow : 13/13.
