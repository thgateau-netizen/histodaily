# HistoDaily — paquet de déploiement beta104

Version : `1.0.0-beta.104`

Build public resserré pour test privé.

## Contenu public

- 42 cours prêts
- 17 mystères publics reliés à des cours disponibles
- PWA installable
- Scores locaux toujours disponibles hors ligne
- Classements et amis activables avec les variables Supabase

## Déploiement Vercel

Déposer le contenu du dossier sur Vercel. Les variables en ligne restent optionnelles pour l’usage local, mais nécessaires pour partager les scores entre appareils.

Variables optionnelles :

```text
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Notes

Les cours non prêts ne sont pas embarqués dans ce build public.
Les rapports qualité sont fournis à côté du zip, pas dans le paquet de déploiement.
