# HistoDaily beta 258 — réparation Astronomie et rotation quotidienne

## Causes trouvées

1. Le bloc historique `beta231` forçait systématiquement `astro-mystery-black-hole-231` pour l’Astronomie dès que le décalage de test était à zéro. Le dossier Astronomie ne pouvait donc jamais suivre la rotation quotidienne normale.
2. Un mystère sélectionné restait considéré comme jouable sans limite de date. Après minuit, `currentMysteryId` pouvait ainsi masquer le nouveau dossier du jour.
3. Le sélecteur moderne de disciplines (`visual-v4.js`) changeait le domaine affiché mais ne synchronisait pas `currentMysteryId` et `currentMysteryDiscipline`. L’accueil pouvait montrer l’Astronomie tandis que l’état interne gardait encore le mystère Histoire.

## Corrections

- suppression complète de l’épinglage Astronomie beta231 ;
- même moteur de rotation pour les neuf disciplines ;
- horodatage local des ouvertures de mystères avec `currentMysteryOpenedDay` ;
- invalidation automatique d’une sélection non résolue après changement de date ;
- synchronisation du mystère lors d’un changement de discipline sur l’accueil ;
- migration automatique des anciens états au premier démarrage de beta 258.

## Périmètre protégé

Les routes API sociales, le moteur serveur, `vercel.json` et les fichiers SQL Supabase sont inchangés par rapport à beta 257.
