# HistoDaily beta168 — correctif navigation cours/quiz

Correctif ciblé après beta167.

- les boutons `data-lesson-view` sont maintenant capturés globalement ;
- `Passer au cours complet` et `Continuer vers le quiz` répondent aussi sur `touchend` et `pointerup`, pas seulement sur `click` ;
- dédoublonnage anti double-tap iOS ;
- priorité CSS sur les boutons du cours pour éviter une interception par une couche de rendu ;
- conservation des correctifs beta166/beta167.
