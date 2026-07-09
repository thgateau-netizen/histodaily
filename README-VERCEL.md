# HistoDaily — beta156 release readiness

Version `1.0.0-beta.156`.

Cette version continue le durcissement pré-test public sans ajouter de contenu ni fonctionnalité lourde.

## beta156

- Nouveau contrôle final non destructif : `/api/v1/system/release-check`.
- `health` indique maintenant `releaseCheckReady`.
- Assistance profil enrichie avec un bouton discret **Contrôle final**.
- Nettoyage local supplémentaire des états impossibles avant test privé.
- Détection plus claire d’un ancien cache PWA ou d’une version API différente.
- Service worker/cache renouvelés en `1.0.0-beta.156`.

## Déploiement

1. Déployer le contenu du zip sur Vercel.
2. Garder les variables d’environnement Supabase existantes.
3. Ouvrir l’app avec `?fresh=156` si une PWA installée garde un ancien cache.
4. Dans Profil → Assistance, lancer **Contrôle final** si besoin.

Aucun changement SQL obligatoire.
