-- HistoDaily RC54 — retention analytics event store.
-- Run once in the Supabase SQL editor before expecting centralized event storage.
-- The browser never talks to this table directly: only the Vercel API uses the service role.

create table if not exists public.hd_analytics_events (
  event_id text primary key,
  player_id text not null,
  event_type text not null,
  event_day date not null,
  occurred_at timestamptz not null default now(),
  first_seen_day date not null,
  discipline_id text not null default '',
  mystery_id text not null default '',
  lesson_id text not null default '',
  source text not null default '',
  app_version text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists hd_analytics_events_first_seen_idx
  on public.hd_analytics_events (first_seen_day, player_id);
create index if not exists hd_analytics_events_type_day_idx
  on public.hd_analytics_events (event_type, event_day);
create index if not exists hd_analytics_events_player_time_idx
  on public.hd_analytics_events (player_id, occurred_at);

alter table public.hd_analytics_events enable row level security;
-- Intentionally no anon/authenticated policies. Service-role API access bypasses RLS.
