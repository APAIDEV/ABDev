-- =============================================================================
-- AB Development: initial database schema
-- Run this once in Supabase (Dashboard → SQL Editor → New query → paste → Run),
-- or with the Supabase CLI: `supabase db push`.
-- =============================================================================

-- ---------------------------------------------------------------- Roles ------
-- admin  : full access, manages team members and roles
-- staff  : can sign in and view the dashboard, submissions, and consultations
-- client : reserved for the future client portal (no dashboard access)
create type public.app_role as enum ('admin', 'staff', 'client');

-- ------------------------------------------------------------- Profiles -----
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text not null default '',
  title       text not null default '',
  role        public.app_role not null default 'client',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

-- Every new auth user gets a profile. The role is ALWAYS 'client' here: it is
-- never read from user-supplied metadata, so nobody can grant themselves access.
-- Admins assign 'staff' / 'admin' from the Team page (or the seed script).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, title, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(left(new.raw_user_meta_data ->> 'full_name', 120), ''),
    coalesce(left(new.raw_user_meta_data ->> 'title', 120), ''),
    'client'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Role helpers used by Row Level Security policies.
create function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = auth.uid();
$$;

create function public.is_team_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() in ('admin', 'staff'), false);
$$;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() = 'admin', false);
$$;

-- --------------------------------------------------------- Submissions ------
create table public.submissions (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  name                    text not null check (char_length(name) <= 120),
  email                   text not null check (char_length(email) <= 254),
  phone                   text check (char_length(phone) <= 40),
  project_type            text not null,
  region                  text not null,
  town                    text,
  budget                  text,
  timeline                text,
  referral                text,
  message                 text not null check (char_length(message) <= 5000),

  -- Consultation request (optional preferred date/time from the form)
  preferred_date          date,
  preferred_time          text,

  -- Staff workflow
  status                  text not null default 'new'
                          check (status in ('new', 'contacted', 'scheduled', 'closed', 'spam')),
  scheduled_at            timestamptz,
  staff_notes             text not null default '',

  -- Consent snapshot (full audit trail lives in consent_records)
  privacy_consent_at      timestamptz not null,
  marketing_email_opt_in  boolean not null default false,
  marketing_sms_opt_in    boolean not null default false,
  consent_version         text not null,

  -- Security metadata. IPs are stored only as a salted one-way hash.
  ip_hash                 text,
  user_agent              text
);

create index submissions_created_idx on public.submissions (created_at desc);
create index submissions_status_idx on public.submissions (status);
create index submissions_scheduled_idx on public.submissions (scheduled_at);
create index submissions_preferred_idx on public.submissions (preferred_date);

create trigger submissions_touch before update on public.submissions
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------ Consent records -----
-- Immutable log of every consent decision with the exact wording shown.
create table public.consent_records (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  submission_id  uuid references public.submissions (id) on delete set null,
  email          text not null,
  phone          text,
  consent_type   text not null check (consent_type in ('privacy_terms', 'marketing_email', 'marketing_sms')),
  granted        boolean not null,
  consent_text   text not null,
  text_version   text not null,
  ip_hash        text,
  user_agent     text
);

create index consent_records_email_idx on public.consent_records (email);
create index consent_records_submission_idx on public.consent_records (submission_id);

-- ---------------------------------------------------------- Rate limits -----
create table public.rate_limits (
  key           text primary key,
  window_start  timestamptz not null default now(),
  count         integer not null default 0
);

-- Returns true when the action is allowed. Old rows are cleaned up so hashed
-- identifiers are kept for no more than about a day.
create function public.check_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if random() < 0.02 then
    delete from public.rate_limits where window_start < now() - interval '1 day';
  end if;

  insert into public.rate_limits as r (key, window_start, count)
  values (p_key, now(), 1)
  on conflict (key) do update set
    count = case when r.window_start < now() - make_interval(secs => p_window_seconds) then 1 else r.count + 1 end,
    window_start = case when r.window_start < now() - make_interval(secs => p_window_seconds) then now() else r.window_start end
  returning count into v_count;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.check_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_rate_limit(text, integer, integer) to service_role;

-- --------------------------------------------------- Row Level Security -----
-- The website's server inserts submissions with the service-role key after
-- validating them, so anonymous visitors get NO direct table access at all.
alter table public.profiles        enable row level security;
alter table public.submissions     enable row level security;
alter table public.consent_records enable row level security;
alter table public.rate_limits     enable row level security;

-- Profiles: team members can see the team; everyone can see their own profile.
create policy "Read own profile or team reads all"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_team_member());

-- Only admins can change profiles (including roles).
create policy "Admins update profiles"
  on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Submissions: admin + staff can read and update workflow fields.
create policy "Team reads submissions"
  on public.submissions for select to authenticated
  using (public.is_team_member());

create policy "Team updates submissions"
  on public.submissions for update to authenticated
  using (public.is_team_member()) with check (public.is_team_member());

-- Consent records: read-only for the team; never editable from the app.
create policy "Team reads consent records"
  on public.consent_records for select to authenticated
  using (public.is_team_member());

-- Staff may only change workflow columns, never what the client submitted or consented to.
revoke update on public.submissions from authenticated;
grant update (status, scheduled_at, staff_notes) on public.submissions to authenticated;

-- Nobody but admins (via the server) changes roles.
revoke update on public.profiles from authenticated;
grant update (full_name, title, role) on public.profiles to authenticated;
