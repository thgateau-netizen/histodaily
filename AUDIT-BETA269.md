# HistoDaily beta 270 — défilement Android des cours

## Cause traitée
Les cours et le catalogue n’étaient pas inclus dans la couche de sécurité de défilement créée pour les archives. Sur certains WebView/PWA Android, un verrou de modale ou un conteneur dimensionné à la hauteur du viewport pouvait donc rester actif et empêcher le document de défiler.

## Correctifs
- document unique comme conteneur vertical ;
- suppression des verrous obsolètes hors modale ;
- hauteurs et débordements forcés en mode naturel sur les écrans Cours ;
- gestes verticaux autorisés sur lecteur, quiz et catalogue ;
- en-tête collant Android simplifié sans flou lourd ;
- marge basse du lecteur et du catalogue sécurisée.

Aucun changement du contenu, des scores, de Supabase ou du moteur social.
