-- HistoDaily beta 254 — nettoyage optionnel, sans nouvelle table.
-- Le moteur social v2 fonctionne avec SUPABASE-SOCIAL-SCHEMA.sql.

-- Normalise les codes existants.
update public.hd_profiles
set friend_code = upper(trim(friend_code))
where friend_code is not null and friend_code <> upper(trim(friend_code));

update public.hd_friends
set friend_code = upper(trim(friend_code))
where friend_code is not null and friend_code <> upper(trim(friend_code));

-- Ferme les demandes abandonnées depuis plus de 30 jours.
update public.hd_friend_requests
set status = 'cancelled', updated_at = now()
where status = 'pending' and created_at < now() - interval '30 days';

-- Supprime uniquement les doublons stricts de relation, en gardant la ligne la plus ancienne.
delete from public.hd_friends newer
using public.hd_friends older
where newer.ctid > older.ctid
  and newer.player_id = older.player_id
  and coalesce(newer.friend_player_id, '') = coalesce(older.friend_player_id, '')
  and coalesce(newer.friend_code, '') = coalesce(older.friend_code, '');

create unique index if not exists hd_friends_unique_player_pair
on public.hd_friends (player_id, friend_player_id)
where friend_player_id is not null and friend_player_id <> '';
