-- IndustryOps AI Supabase schema. Run once in the Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.plants (
  id uuid primary key,
  name text not null,
  timezone text not null default 'Asia/Kolkata',
  created_at timestamptz not null default now()
);

create table if not exists public.plant_members (
  plant_id uuid not null references public.plants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'operator' check (role in ('admin','manager','maintenance','operator','viewer')),
  display_name text not null default '',
  created_at timestamptz not null default now(),
  primary key (plant_id, user_id)
);
alter table public.plant_members add column if not exists display_name text not null default '';

create table if not exists public.assets (
  plant_id uuid not null references public.plants(id) on delete cascade,
  id text not null,
  name text not null,
  type text not null default 'Uncategorized',
  location text not null default 'Production floor',
  health integer not null default 100 check (health between 0 and 100),
  temp text not null default '—',
  vibration text not null default '—',
  runtime text not null default '—',
  tag text not null default 'Healthy',
  notes text not null default '',
  thresholds jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (plant_id, id)
);

create table if not exists public.incidents (
  plant_id uuid not null references public.plants(id) on delete cascade,
  id text not null,
  title text not null,
  asset text not null default 'Unknown asset',
  asset_id text,
  location text not null default 'Production floor',
  priority text not null default 'Medium' check (priority in ('Critical','High','Medium','Low')),
  status text not null default 'Open' check (status in ('Open','In progress','Resolved')),
  department text not null default 'Mechanical',
  assignee text not null default 'Unassigned',
  initials text not null default '—',
  sla text not null default '04:00',
  reporter text not null default 'Plant operator',
  source text not null default 'Worker report',
  description text not null default '',
  confidence text not null default 'Pending',
  recommendation text not null default '',
  evidence text not null default '',
  signals text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (plant_id, id)
);

create table if not exists public.work_orders (
  plant_id uuid not null references public.plants(id) on delete cascade,
  id text not null,
  title text not null,
  incident text not null default 'Unlinked',
  asset text not null default 'Unknown asset',
  asset_id text,
  priority text not null default 'Medium' check (priority in ('Critical','High','Medium','Low')),
  status text not null default 'Awaiting assignment' check (status in ('Awaiting assignment','Scheduled','In progress','Complete')),
  department text not null default 'Mechanical',
  assignee text not null default 'Unassigned',
  initials text not null default '—',
  due text not null default 'Unscheduled',
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (plant_id, id)
);

create table if not exists public.sensor_readings (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  asset_id text not null,
  metric text not null,
  value double precision not null,
  unit text not null default '',
  observed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_documents (
  plant_id uuid not null references public.plants(id) on delete cascade,
  id text not null,
  type text not null default 'DOC',
  title text not null,
  detail text not null default '',
  tags text[] not null default '{}',
  storage_path text,
  updated_label text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (plant_id, id)
);

create table if not exists public.escalation_policies (
  plant_id uuid not null references public.plants(id) on delete cascade,
  id text not null,
  priority text not null check (priority in ('Critical','High','Medium','Low')),
  after_minutes integer not null default 0 check (after_minutes >= 0),
  notify_role text not null default 'manager',
  channel text not null default 'dashboard',
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (plant_id, id),
  unique (plant_id, priority)
);

create table if not exists public.escalation_events (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  incident_id text not null,
  policy_id text not null,
  priority text not null,
  notified_role text not null,
  channel text not null,
  created_at timestamptz not null default now(),
  unique (plant_id, incident_id, policy_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  title text not null,
  body text not null,
  kind text not null default 'info',
  incident_id text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  actor_id uuid default auth.uid(),
  entity text not null,
  entity_id text not null,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.integration_outbox (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  destination text not null,
  event_type text not null,
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  delivered_at timestamptz
);

create index if not exists incidents_plant_created_idx on public.incidents (plant_id, created_at desc);
create index if not exists incidents_plant_open_idx on public.incidents (plant_id, status, priority);
create index if not exists work_orders_plant_created_idx on public.work_orders (plant_id, created_at desc);
create index if not exists sensor_readings_asset_time_idx on public.sensor_readings (plant_id, asset_id, observed_at desc);
create index if not exists notifications_plant_time_idx on public.notifications (plant_id, created_at desc);

create or replace function public.is_plant_member(target_plant uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.plant_members where plant_id = target_plant and user_id = auth.uid()) $$;

create or replace function public.current_plant_role(target_plant uuid)
returns text language sql stable security definer set search_path = public
as $$ select role from public.plant_members where plant_id = target_plant and user_id = auth.uid() $$;

create or replace function public.can_edit_plant(target_plant uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce(public.current_plant_role(target_plant) in ('admin','manager','maintenance','operator'), false) $$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array['assets','incidents','work_orders','knowledge_documents','escalation_policies'] loop
    execute format('drop trigger if exists touch_updated_at on public.%I', table_name);
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function public.touch_updated_at()', table_name);
  end loop;
end $$;

create or replace function public.write_audit_event()
returns trigger language plpgsql security definer set search_path = public
as $$
declare row_json jsonb; row_id text; plant uuid;
begin
  row_json := case when TG_OP = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
  row_id := row_json->>'id';
  plant := (row_json->>'plant_id')::uuid;
  insert into public.audit_events (plant_id, actor_id, entity, entity_id, action, before, after)
  values (plant, auth.uid(), TG_TABLE_NAME, row_id, TG_OP, case when TG_OP = 'INSERT' then null else to_jsonb(old) end, case when TG_OP = 'DELETE' then null else to_jsonb(new) end);
  return case when TG_OP = 'DELETE' then old else new end;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array['assets','incidents','work_orders'] loop
    execute format('drop trigger if exists audit_changes on public.%I', table_name);
    execute format('create trigger audit_changes after insert or update or delete on public.%I for each row execute function public.write_audit_event()', table_name);
  end loop;
end $$;

alter table public.plants enable row level security;
alter table public.plant_members enable row level security;
drop policy if exists "members can view their memberships" on public.plant_members;
create policy "members can view their memberships" on public.plant_members for select to authenticated using (public.is_plant_member(plant_id));
create policy "members can view their plant" on public.plants for select to authenticated using (public.is_plant_member(id));

do $$
declare table_name text;
begin
  foreach table_name in array array['assets','incidents','work_orders','sensor_readings','knowledge_documents','escalation_policies','escalation_events','notifications','audit_events','integration_outbox'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop policy if exists "plant members can access rows" on public.%I', table_name);
    execute format('drop policy if exists "plant members can read rows" on public.%I', table_name);
    execute format('drop policy if exists "plant operators can insert rows" on public.%I', table_name);
    execute format('drop policy if exists "plant operators can update rows" on public.%I', table_name);
    execute format('drop policy if exists "plant managers can delete rows" on public.%I', table_name);
    execute format('create policy "plant members can read rows" on public.%I for select to authenticated using (public.is_plant_member(plant_id))', table_name);
    execute format('create policy "plant operators can insert rows" on public.%I for insert to authenticated with check (public.can_edit_plant(plant_id))', table_name);
    execute format('create policy "plant operators can update rows" on public.%I for update to authenticated using (public.can_edit_plant(plant_id)) with check (public.can_edit_plant(plant_id))', table_name);
    execute format('create policy "plant managers can delete rows" on public.%I for delete to authenticated using (public.current_plant_role(plant_id) in (''admin'',''manager''))', table_name);
  end loop;
end $$;

grant usage on schema public to authenticated;
grant select on public.plants, public.plant_members to authenticated;
grant select, insert, update, delete on public.assets, public.incidents, public.work_orders, public.sensor_readings, public.knowledge_documents, public.escalation_policies, public.escalation_events, public.notifications, public.integration_outbox to authenticated;
grant select on public.audit_events to authenticated;
grant execute on function public.is_plant_member(uuid) to authenticated;
grant execute on function public.current_plant_role(uuid), public.can_edit_plant(uuid) to authenticated;

insert into public.plants (id, name) values ('00000000-0000-4000-8000-000000000001', 'Riverton Works') on conflict (id) do nothing;
insert into public.escalation_policies (plant_id, id, priority, after_minutes, notify_role, channel) values
  ('00000000-0000-4000-8000-000000000001','POL-CRITICAL','Critical',0,'manager','dashboard'),
  ('00000000-0000-4000-8000-000000000001','POL-HIGH','High',30,'maintenance','dashboard'),
  ('00000000-0000-4000-8000-000000000001','POL-MEDIUM','Medium',240,'maintenance','dashboard'),
  ('00000000-0000-4000-8000-000000000001','POL-LOW','Low',480,'manager','dashboard')
on conflict (plant_id, priority) do nothing;
