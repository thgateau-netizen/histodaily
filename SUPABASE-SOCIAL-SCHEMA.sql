-- HistoDaily beta125 — table des demandes d’amis
-- À exécuter dans Supabase SQL Editor si la table n’existe pas encore.

create table if not exists public.hd_friend_requests (
  id bigserial primary key,
  requester_player_id text not null,
  requester_friend_code text,
  requester_pseudo text,
  target_player_id text,
  target_friend_code text,
  target_pseudo text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists hd_friend_requests_requester_idx on public.hd_friend_requests (requester_player_id, status, created_at desc);
create index if not exists hd_friend_requests_target_player_idx on public.hd_friend_requests (target_player_id, status, created_at desc);
create index if not exists hd_friend_requests_target_code_idx on public.hd_friend_requests (target_friend_code, status, created_at desc);

-- Optionnel mais conseillé : éviter les doublons exacts de demandes en attente.
create unique index if not exists hd_friend_requests_pending_unique
  on public.hd_friend_requests (requester_player_id, coalesce(target_player_id, ''), coalesce(target_friend_code, ''))
  where status = 'pending';


-- Beta126 : accélère la recherche d’un profil ouvert depuis le classement.
create index if not exists hd_profiles_friend_code_idx on public.hd_profiles (friend_code);
create index if not exists hd_profiles_updated_idx on public.hd_profiles (updated_at desc);

-- Beta126 : historique plus lisible des demandes traitées.
create index if not exists hd_friend_requests_status_updated_idx on public.hd_friend_requests (status, updated_at desc);


-- Beta128 : annulation et récupération des demandes sortantes.
create index if not exists hd_friend_requests_requester_target_player_idx
  on public.hd_friend_requests (requester_player_id, target_player_id, status, updated_at desc);

create index if not exists hd_friend_requests_requester_target_code_idx
  on public.hd_friend_requests (requester_player_id, target_friend_code, status, updated_at desc);

-- Beta128 : nettoyage plus rapide des liens d’amitié réciproques.
create index if not exists hd_friends_friend_player_idx on public.hd_friends (friend_player_id);
create index if not exists hd_friends_friend_code_idx on public.hd_friends (friend_code);
