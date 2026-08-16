# HistoDaily RC45 — UI/CSS Cleanup

## Objectif
Réduire la dette UI accumulée par les anciennes couches sans modifier le parcours fonctionnel validé en RC44.

## Nettoyage conservateur
La feuille CSS a été analysée contre le HTML et l'ensemble des sources/bundles client réellement livrés. Une règle n'a été supprimée que lorsque **toutes** les classes/IDs qui la ciblent sont absentes du runtime.

Résultat :
- 1 060 règles CSS inatteignables supprimées ;
- CSS : 781 199 → 663 188 octets (-15,1 %) ;
- `!important` : 2 866 → 2 397 (-469, -16,4 %) ;
- 8 anciens assets visuels inutilisés retirés ;
- aucun asset référencé manquant après nettoyage.

Cette passe est volontairement prudente : les anciennes règles encore potentiellement actives n'ont pas été supprimées simplement parce qu'une couche plus récente semble les recouvrir.

## Packaging / déploiement
- version : `1.0.0-rc.45.0` ;
- cache PWA : `histodaily-rc45-ui-css-cleanup-v1` ;
- manifest de bundle RC45 généré ;
- audit `architecture:audit` ajouté au projet ;
- l'audit complet vérifie désormais que les sélecteurs manifestement inatteignables et les assets obsolètes ne réapparaissent pas.

## Ce qui n'a pas été fait
Aucun changement de contenu, de difficulté, de parcours ou de hiérarchie UX. Pas de suppression agressive des anciennes couches visuelles encore actives : cela demandera une validation visuelle navigateur fiable avant d'aller plus loin.

## Validation
- 3 bundles JavaScript : syntaxe OK ;
- quality pipeline complet : OK ;
- ergonomie RC44 : 30/30 ;
- UI/CSS cleanup : OK ;
- 219 cours / 158 mystères inchangés ;
- un avertissement structurel reste volontairement documenté : la feuille CSS dépasse encore 10 000 lignes.
