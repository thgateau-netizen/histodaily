-- HistoDaily beta132 — migration Supabase additive complète
-- À lancer dans SQL Editor sur le projet existant. Ne supprime aucune donnée.

-- Profils
alter table public.hd_profiles add column if not exists friend_code text;
alter table public.hd_profiles add column if not exists level integer not null default 1;
alter table public.hd_profiles add column if not exists xp integer not null default 0;
alter table public.hd_profiles add column if not exists solved_count integer not null default 0;
alter table public.hd_profiles add column if not exists streak integer not null default 0;
alter table public.hd_profiles add column if not exists created_at timestamptz not null default now();
alter table public.hd_profiles add column if not exists updated_at timestamptz not null default now();
create unique index if not exists hd_profiles_friend_code_unique on public.hd_profiles (friend_code) where friend_code is not null and friend_code <> '';
create index if not exists hd_profiles_friend_code_idx on public.hd_profiles (friend_code);
create index if not exists hd_profiles_updated_idx on public.hd_profiles (updated_at desc);

-- Scores : colonnes nécessaires au classement daily/week/year/friends
alter table public.hd_scores add column if not exists friend_code text;
alter table public.hd_scores add column if not exists mystery_id text;
alter table public.hd_scores add column if not exists period_key text;
alter table public.hd_scores add column if not exists scope text not null default 'daily';
alter table public.hd_scores add column if not exists hints integer not null default 0;
alter table public.hd_scores add column if not exists tries integer not null default 1;
alter table public.hd_scores add column if not exists difficulty text;
alter table public.hd_scores add column if not exists level integer not null default 1;
alter table public.hd_scores add column if not exists xp integer not null default 0;
alter table public.hd_scores add column if not exists solved_count integer not null default 0;
alter table public.hd_scores add column if not exists streak integer not null default 0;
alter table public.hd_scores add column if not exists solved_at timestamptz not null default now();
alter table public.hd_scores add column if not exists created_at timestamptz not null default now();

-- Remplit les anciennes lignes si besoin.
update public.hd_scores set period_key = to_char(coalesce(solved_at, created_at, now()), 'YYYY-MM-DD') where period_key is null or period_key = '';
update public.hd_scores set mystery_id = coalesce(mystery_id, 'legacy-score') where mystery_id is null or mystery_id = '';
update public.hd_scores set scope = coalesce(scope, 'daily') where scope is null or scope = '';

create unique index if not exists hd_scores_unique_daily on public.hd_scores (player_id, mystery_id, period_key, scope);
create index if not exists hd_scores_daily_rank_idx on public.hd_scores (period_key, scope, score desc);
create index if not exists hd_scores_player_idx on public.hd_scores (player_id, solved_at desc);
create index if not exists hd_scores_solved_at_idx on public.hd_scores (solved_at desc);

-- Amis
alter table public.hd_friends add column if not exists friend_player_id text;
alter table public.hd_friends add column if not exists friend_code text;
alter table public.hd_friends add column if not exists friend_pseudo text not null default 'Ami';
alter table public.hd_friends add column if not exists created_at timestamptz not null default now();
create unique index if not exists hd_friends_unique_code on public.hd_friends (player_id, friend_code);
create index if not exists hd_friends_player_idx on public.hd_friends (player_id, created_at desc);
create index if not exists hd_friends_friend_player_idx on public.hd_friends (friend_player_id);
create index if not exists hd_friends_friend_code_idx on public.hd_friends (friend_code);

-- Demandes d'amis
create table if not exists public.hd_friend_requests (
  id bigserial primary key,
  requester_player_id text not null,
  requester_friend_code text,
  requester_pseudo text,
  target_player_id text,
  target_friend_code text,
  target_pseudo text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists hd_friend_requests_requester_idx on public.hd_friend_requests (requester_player_id, status, created_at desc);
create index if not exists hd_friend_requests_target_player_idx on public.hd_friend_requests (target_player_id, status, created_at desc);
create index if not exists hd_friend_requests_target_code_idx on public.hd_friend_requests (target_friend_code, status, created_at desc);
create index if not exists hd_friend_requests_status_updated_idx on public.hd_friend_requests (status, updated_at desc);
create index if not exists hd_friend_requests_requester_target_player_idx on public.hd_friend_requests (requester_player_id, target_player_id, status, updated_at desc);
create index if not exists hd_friend_requests_requester_target_code_idx on public.hd_friend_requests (requester_player_id, target_friend_code, status, updated_at desc);
create unique index if not exists hd_friend_requests_pending_unique on public.hd_friend_requests (requester_player_id, coalesce(target_player_id, ''), coalesce(target_friend_code, '')) where status = 'pending';


-- beta142 : aucun changement obligatoire si les tables existent déjà.
-- Le serveur utilise maintenant friend_code comme point d'ancrage canonique pour éviter
-- les profils fantômes quand le player_id local change pendant les tests.


-- beta143 : diagnostic optionnel, aucune migration obligatoire.
-- Requête utile pour inspecter les profils de test sans rien supprimer :
-- select player_id, pseudo, friend_code, level, xp, solved_count, streak, created_at, updated_at
-- from public.hd_profiles
-- order by updated_at desc;


-- beta144 : aucune migration obligatoire.
-- Diagnostics utiles si tu veux inspecter plus tard les doublons de test.
-- Profils ayant le même pseudo :
-- select lower(pseudo) as pseudo, count(*) as nb, max(updated_at) as dernier
-- from public.hd_profiles
-- group by lower(pseudo)
-- having count(*) > 1
-- order by nb desc, dernier desc;
-- Scores potentiellement dupliqués par code ami sur le même mystère/jour :
-- select friend_code, mystery_id, period_key, count(*) as nb
-- from public.hd_scores
-- where friend_code is not null and friend_code <> ''
-- group by friend_code, mystery_id, period_key
-- having count(*) > 1;


-- beta147 : aucune migration obligatoire.
-- Diagnostic utile après déploiement :
-- /api/v1/health doit afficher schemaChecks.profiles/scores/friends/friendRequests à true.
-- /api/v1/social/state?playerId=TON_PLAYER_ID&friendCode=TON_CODE permet de vérifier un profil sans modifier les données.


-- beta148 : aucune migration obligatoire. Pré-vérification via /api/v1/system/preflight.


-- beta149 : aucune migration obligatoire. Auto-test non destructif via /api/v1/system/selftest.
