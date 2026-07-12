-- HistoDaily beta 254 — schéma social additif et fonctions atomiques
-- À relancer dans SQL Editor sur le projet existant. Script idempotent, sans suppression de données.

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

-- beta242 : aucune migration supplémentaire obligatoire.
-- La fiabilité a été renforcée côté client et API : écritures locales transactionnelles,
-- files d'attente hors ligne, bornes calendaires locales et déduplication des scores.
-- Les tables et index ci-dessus restent nécessaires pour les amis et classements multi-appareils.


-- beta248 : aucune migration obligatoire.
-- Les profils sont fusionnés de manière monotone côté API et les demandes croisées
-- sont acceptées automatiquement sans créer deux relations concurrentes.

-- beta249 : fonctions atomiques recommandées pour le multi-appareils.
-- Elles sont additives et peuvent être relancées sans supprimer de données.

create or replace function public.hd_merge_profile(
  p_player_id text,
  p_pseudo text,
  p_friend_code text,
  p_level integer,
  p_xp integer,
  p_solved_count integer,
  p_streak integer,
  p_allow_pseudo_change boolean default false
)
returns table (
  player_id text,
  pseudo text,
  friend_code text,
  level integer,
  xp integer,
  solved_count integer,
  streak integer,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.hd_profiles as hp (
    player_id, pseudo, friend_code, level, xp, solved_count, streak, updated_at
  ) values (
    nullif(trim(p_player_id), ''),
    coalesce(nullif(trim(p_pseudo), ''), 'Invité'),
    nullif(upper(trim(p_friend_code)), ''),
    greatest(1, coalesce(p_level, 1)),
    greatest(0, coalesce(p_xp, 0)),
    greatest(0, coalesce(p_solved_count, 0)),
    greatest(0, coalesce(p_streak, 0)),
    now()
  )
  on conflict (player_id) do update set
    pseudo = case
      when p_allow_pseudo_change and nullif(trim(excluded.pseudo), '') is not null then excluded.pseudo
      when lower(coalesce(hp.pseudo, '')) in ('', 'invite', 'invité', 'joueur', 'local-player') then excluded.pseudo
      else hp.pseudo
    end,
    friend_code = coalesce(nullif(hp.friend_code, ''), nullif(excluded.friend_code, '')),
    level = greatest(hp.level, excluded.level),
    xp = greatest(hp.xp, excluded.xp),
    solved_count = greatest(hp.solved_count, excluded.solved_count),
    streak = greatest(hp.streak, excluded.streak),
    updated_at = now();

  return query
  select hp.player_id, hp.pseudo, hp.friend_code, hp.level, hp.xp,
         hp.solved_count, hp.streak, hp.updated_at
  from public.hd_profiles hp
  where hp.player_id = nullif(trim(p_player_id), '')
     or (nullif(upper(trim(p_friend_code)), '') is not null
         and hp.friend_code = nullif(upper(trim(p_friend_code)), ''))
  order by case when hp.player_id = nullif(trim(p_player_id), '') then 0 else 1 end
  limit 1;
end;
$$;

create or replace function public.hd_upsert_best_score(
  p_player_id text,
  p_pseudo text,
  p_friend_code text,
  p_mystery_id text,
  p_period_key text,
  p_score integer,
  p_hints integer,
  p_tries integer,
  p_difficulty text,
  p_level integer,
  p_xp integer,
  p_solved_count integer,
  p_streak integer,
  p_solved_at timestamptz
)
returns table (
  player_id text,
  pseudo text,
  friend_code text,
  mystery_id text,
  period_key text,
  scope text,
  score integer,
  hints integer,
  tries integer,
  difficulty text,
  level integer,
  xp integer,
  solved_count integer,
  streak integer,
  solved_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cap integer := case lower(coalesce(p_difficulty, 'moyen'))
    when 'facile' then 95
    when 'difficile' then 150
    when 'expert' then 180
    else 120
  end;
  v_score integer := greatest(0, least(coalesce(p_score, 0), v_cap));
begin
  insert into public.hd_scores as hs (
    player_id, pseudo, friend_code, mystery_id, period_key, scope,
    score, hints, tries, difficulty, level, xp, solved_count, streak, solved_at
  ) values (
    trim(p_player_id), coalesce(nullif(trim(p_pseudo), ''), 'Joueur'),
    nullif(upper(trim(p_friend_code)), ''), trim(p_mystery_id), trim(p_period_key), 'daily',
    v_score, greatest(0, coalesce(p_hints, 0)), greatest(1, coalesce(p_tries, 1)),
    coalesce(nullif(trim(p_difficulty), ''), 'moyen'), greatest(1, coalesce(p_level, 1)),
    greatest(0, coalesce(p_xp, 0)), greatest(0, coalesce(p_solved_count, 0)),
    greatest(0, coalesce(p_streak, 0)), coalesce(p_solved_at, now())
  )
  on conflict (player_id, mystery_id, period_key, scope) do update set
    pseudo = case when excluded.score >= hs.score then excluded.pseudo else hs.pseudo end,
    friend_code = coalesce(nullif(hs.friend_code, ''), excluded.friend_code),
    score = greatest(case when hs.score > v_cap then 0 else hs.score end, excluded.score),
    hints = case when excluded.score > hs.score or hs.score > v_cap then excluded.hints else hs.hints end,
    tries = case when excluded.score > hs.score or hs.score > v_cap then excluded.tries else hs.tries end,
    difficulty = case when excluded.score > hs.score or hs.score > v_cap then excluded.difficulty else hs.difficulty end,
    level = greatest(hs.level, excluded.level),
    xp = greatest(hs.xp, excluded.xp),
    solved_count = greatest(hs.solved_count, excluded.solved_count),
    streak = greatest(hs.streak, excluded.streak),
    solved_at = case when excluded.score > hs.score or hs.score > v_cap then excluded.solved_at else hs.solved_at end;

  return query
  select hs.player_id, hs.pseudo, hs.friend_code, hs.mystery_id, hs.period_key,
         hs.scope, hs.score, hs.hints, hs.tries, hs.difficulty, hs.level,
         hs.xp, hs.solved_count, hs.streak, hs.solved_at
  from public.hd_scores hs
  where hs.player_id = trim(p_player_id)
    and hs.mystery_id = trim(p_mystery_id)
    and hs.period_key = trim(p_period_key)
    and hs.scope = 'daily'
  limit 1;
end;
$$;

create or replace function public.hd_leaderboard_period(
  p_scope text,
  p_period_key text default null,
  p_range_start timestamptz default null,
  p_range_end timestamptz default null,
  p_limit integer default 100
)
returns table (
  player_id text,
  pseudo text,
  friend_code text,
  score bigint,
  level integer,
  xp integer,
  solved_count integer,
  streak integer
)
language sql
stable
security definer
set search_path = public
as $$
  with filtered as (
    select s.*,
           row_number() over (
             partition by s.player_id, s.mystery_id, s.period_key, s.scope
             order by s.score desc, s.solved_at asc
           ) as dedupe_rank
    from public.hd_scores s
    where s.scope = 'daily'
      and (
        (lower(coalesce(p_scope, 'daily')) = 'daily' and s.period_key = p_period_key)
        or
        (lower(coalesce(p_scope, 'daily')) in ('week', 'year')
          and s.solved_at >= coalesce(p_range_start, '-infinity'::timestamptz)
          and s.solved_at < coalesce(p_range_end, 'infinity'::timestamptz))
      )
  ), aggregated as (
    select f.player_id,
           max(f.pseudo) as score_pseudo,
           max(f.friend_code) as score_friend_code,
           sum(
             greatest(0, least(f.score,
               case lower(coalesce(f.difficulty, 'moyen'))
                 when 'facile' then 95
                 when 'difficile' then 150
                 when 'expert' then 180
                 else 120
               end
             ))
           )::bigint as total_score,
           max(f.level) as score_level,
           max(f.xp) as score_xp,
           max(f.solved_count) as score_solved_count,
           max(f.streak) as score_streak
    from filtered f
    where f.dedupe_rank = 1
    group by f.player_id
  )
  select a.player_id,
         coalesce(nullif(p.pseudo, ''), nullif(a.score_pseudo, ''), 'Joueur') as pseudo,
         coalesce(nullif(p.friend_code, ''), nullif(a.score_friend_code, '')) as friend_code,
         a.total_score as score,
         greatest(coalesce(p.level, 1), coalesce(a.score_level, 1))::integer as level,
         greatest(coalesce(p.xp, 0), coalesce(a.score_xp, 0))::integer as xp,
         greatest(coalesce(p.solved_count, 0), coalesce(a.score_solved_count, 0))::integer as solved_count,
         greatest(coalesce(p.streak, 0), coalesce(a.score_streak, 0))::integer as streak
  from aggregated a
  left join public.hd_profiles p on p.player_id = a.player_id
  order by a.total_score desc, pseudo asc
  limit greatest(1, least(coalesce(p_limit, 100), 500));
$$;

-- Accès réservé au serveur utilisant la service role. Aucun droit public supplémentaire.
revoke all on function public.hd_merge_profile(text,text,text,integer,integer,integer,integer,boolean) from public;
revoke all on function public.hd_upsert_best_score(text,text,text,text,text,integer,integer,integer,text,integer,integer,integer,integer,timestamptz) from public;
revoke all on function public.hd_leaderboard_period(text,text,timestamptz,timestamptz,integer) from public;

-- Le retrait des droits PUBLIC évite les appels directs anonymes, mais la route serveur
-- Supabase utilise explicitement le rôle service_role : il doit conserver EXECUTE.
grant execute on function public.hd_merge_profile(text,text,text,integer,integer,integer,integer,boolean) to service_role;
grant execute on function public.hd_upsert_best_score(text,text,text,text,text,integer,integer,integer,text,integer,integer,integer,integer,timestamptz) to service_role;
grant execute on function public.hd_leaderboard_period(text,text,timestamptz,timestamptz,integer) to service_role;
