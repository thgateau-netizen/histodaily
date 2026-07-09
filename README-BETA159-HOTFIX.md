# HistoDaily beta159 — stabilité + social

Version corrective après les essais beta157/beta158.

## Priorité
- retour à la base beta156, sans optimisation JS agressive ;
- correction des amis qui pouvaient rester affichés comme "en attente de validation" après acceptation ;
- réparation automatique si `friends` a été transformé en tableau au lieu de map ;
- nettoyage de la file locale de demandes sortantes si la personne est déjà amie ;
- écran de secours remplacé par une version simple avec boutons capturés globalement.

## Test rapide recommandé
1. Déployer le zip.
2. Sur téléphone/PWA : fermer complètement l'app puis rouvrir.
3. Aller dans Profil puis Classement puis Cours.
4. Ouvrir le profil de Manon : si elle est amie, l'état doit être "Ami", pas "En attente de validation".
5. Si un vieux cache revient, utiliser Profil > outils d'assistance > recharger proprement l'app.
