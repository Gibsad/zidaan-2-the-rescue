-- Zidaan 2 The Rescue — RSVP table
-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  adult_count integer not null default 0 check (adult_count between 0 and 6),
  child_count integer not null default 0 check (child_count between 0 and 6),
  message text,
  created_at timestamptz not null default now()
);

-- Row Level Security: the site only ever needs to INSERT using the public
-- anon key. There is deliberately no SELECT policy for anon/authenticated,
-- so the public key can never be used to read the guest list back out —
-- see README.md "Viewing RSVP Responses" for how to view results securely
-- as the project owner (Table Editor / SQL Editor / service role key).
alter table public.rsvps enable row level security;

drop policy if exists "Allow public RSVP submissions" on public.rsvps;
create policy "Allow public RSVP submissions"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT / UPDATE / DELETE policies are created for anon/authenticated,
-- so those operations are denied by default under RLS.
