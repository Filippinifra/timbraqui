create or replace function public.current_clerk_id()
returns text
language sql stable
as $$
  select (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
$$;

-- org dell'utente corrente, risolta via users.clerk_id  (bypassa RLS)
create or replace function public.current_org_id()
returns text
language sql stable security definer
set search_path = public
as $$
  select u.org_id
  from public.users u
  where u.clerk_id = public.current_clerk_id()
  limit 1
$$;

-- org di una registration, data la FK a users.id  (bypassa RLS)
create or replace function public.user_org_id_by_users_id(p_users_id text)
returns text
language sql stable security definer
set search_path = public
as $$
  select u.org_id
  from public.users u
  where u.id = p_users_id
  limit 1
$$;



drop policy if exists users_claim_select on public.users;
create policy users_claim_select
on public.users
for select
to authenticated
using (lower((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) = email);

drop policy if exists users_claim_update on public.users;
create policy users_claim_update
on public.users
for update
to authenticated
using ((clerk_id is null and lower((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) = email)
)
with check (
  true
);

drop policy if exists users_select_same_org on public.users;
create policy users_select_same_org
on public.users
for select
to authenticated
using (org_id = public.current_org_id());

drop policy if exists users_update_same_org on public.users;
create policy users_update_same_org
on public.users
for update
to authenticated
using (org_id = public.current_org_id());

drop policy if exists users_delete_same_org on public.users;
create policy users_delete_same_org
on public.users
for delete
to authenticated
using (org_id = public.current_org_id());

drop policy if exists users_insert_same_org on public.users;
create policy users_insert_same_org
on public.users
for insert
to authenticated
with check (org_id = public.current_org_id());



-- SELECT: vedi SOLO registrations della tua org
drop policy if exists registrations_select_same_org on public.registrations;
create policy registrations_select_same_org
on public.registrations
for select
to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
);

-- INSERT: puoi creare SOLO nella tua org e (tipico) solo per TE stesso
drop policy if exists registrations_insert_same_org on public.registrations;
create policy registrations_insert_same_org
on public.registrations
for insert
to authenticated
with check (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
  and registrations.user_id = (
    select u.id from public.users u
    where u.clerk_id = public.current_clerk_id() limit 1
  )
);

-- UPDATE: puoi modificare SOLO registrations della tua org
drop policy if exists registrations_update_same_org on public.registrations;
create policy registrations_update_same_org
on public.registrations
for update
to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
)
with check (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
);

-- DELETE: puoi cancellare SOLO registrations della tua org
drop policy if exists registrations_delete_same_org on public.registrations;
create policy registrations_delete_same_org
on public.registrations
for delete
to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
);
