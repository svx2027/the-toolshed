-- "Work with me" leads. Paste once into Supabase > SQL Editor > New query > Run.
-- The site's publishable (anon) key can INSERT rows and never read them, same as the subscribers table.

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email text not null,
  channel text,
  note text,
  source text not null default 'work-with-me'
);

alter table public.leads enable row level security;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert to anon
  with check (true);

-- No select policy on purpose: read the leads in the Supabase dashboard (Table Editor > leads), newest first.
