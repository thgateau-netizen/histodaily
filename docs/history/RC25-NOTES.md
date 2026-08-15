# HistoDaily — RC25 Dossier fusionné

## Objectif
Réduire l’impression d’accumulation dans l’Expédition en fusionnant les informations qui faisaient doublon.

## Expédition
- Suppression des deux blocs successifs « Ta mission » puis « Contexte ».
- Nouveau bloc unique « Le dossier » : question principale, contexte utile, type de réponse/période et première piste.
- La première piste gratuite est intégrée au dossier au lieu d’apparaître comme une carte autonome.
- Les indices supplémentaires s’ajoutent dans le même dossier : ils ne créent plus une nouvelle section entre le contexte et la réponse.
- Zone de réponse remontée et simplifiée : « Ta réponse » ou « Choisis la réponse ».
- Suppression de la phrase d’instruction redondante sous la mission ; l’aide sur les formulations acceptées devient une micro-information près de la réponse.
- Le mode guidé, le coût des indices supplémentaires, les scores et les archives restent inchangés.

## Livraison
- Version : 1.0.0-rc.25.0
- Cache PWA : histodaily-rc25-dossier-merge-v1
- 60 fichiers JavaScript validés par `node --check`.
- 65 références du service worker contrôlées, 0 asset manquant.
- Ancien markup `hd300-mission` / `hd300-expedition-prompt` retiré du renderer actif.
