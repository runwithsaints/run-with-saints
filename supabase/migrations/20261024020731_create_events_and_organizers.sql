-- Run With Saints, migration 1: organizers and events
-- Build plan: Phase 1. Places, profiles and RSVPs come in later migrations.

-- ---------------------------------------------------------------
-- Organizers: the parishes, ministries, dioceses and people who host events
-- ---------------------------------------------------------------
create table public.organizers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        text not null default 'individual'
              check (type in ('parish', 'ministry', 'diocese', 'organization', 'individual')),
  slug        text not null unique,
  logo_url    text,
  website     text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Events: one row per event
-- ---------------------------------------------------------------
create table public.events (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,

  -- Times are stored in UTC. "timezone" says how to display them.
  starts_at         timestamptz not null,
  ends_at           timestamptz,
  timezone          text not null default 'America/New_York',

  is_online         boolean not null default false,
  venue_name        text,
  address           text,
  latitude          double precision,
  longitude         double precision,

  organizer_id      uuid not null references public.organizers (id) on delete restrict,
  created_by        uuid references auth.users (id) on delete set null,

  description       text,
  image_url         text,
  registration_url  text,
  category          text
                    check (category in (
                      'young_adults', 'faith_formation', 'social', 'service',
                      'sports_outdoors', 'mass_adoration', 'conferences',
                      'retreats', 'festivals', 'family'
                    )),
  status            text not null default 'draft'
                    check (status in ('draft', 'published', 'cancelled')),

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint ends_after_start check (ends_at is null or ends_at > starts_at)
);

-- Speeds up "upcoming published events, soonest first" (the Discover page)
create index events_upcoming_idx on public.events (starts_at) where status = 'published';
create index events_organizer_idx on public.events (organizer_id);

-- ---------------------------------------------------------------
-- Security rules (Row Level Security)
-- With RLS on and no policy for an action, that action is blocked.
-- So for now: anyone may READ; nobody may write through the website.
-- ---------------------------------------------------------------
alter table public.organizers enable row level security;
alter table public.events     enable row level security;

grant select on public.organizers to anon, authenticated;
grant select on public.events     to anon, authenticated;

create policy "Anyone can read organizers"
  on public.organizers for select
  to anon, authenticated
  using (true);

-- Cancelled events stay readable so a shared link says "cancelled"
-- instead of "not found". Drafts are hidden.
create policy "Anyone can read published or cancelled events"
  on public.events for select
  to anon, authenticated
  using (status in ('published', 'cancelled'));
