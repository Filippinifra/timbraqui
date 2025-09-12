-- 1) clerk_id corrente letto dai claims (Clerk userId in 'sub')
create or replace function public.current_clerk_id()
returns text
language sql stable
as $$
  select (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
$$;

-- 2) org corrente, risolta via users.clerk_id
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

-- 3) org di una registration
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

-- user_id interno (public.users.id) ricavato dal clerk_id nel JWT
create or replace function public.current_user_id()
returns text
language sql stable security definer
set search_path = public
as $$
  select u.id
  from public.users u
  where u.clerk_id = public.current_clerk_id()
  limit 1
$$;

-- è admin dell'org corrente? (confronta users.id ∈ organizations.admin_id[])
create or replace function public.current_is_org_admin()
returns boolean
language plpgsql stable security definer
set search_path = public
as $$
declare
  uid text := public.current_user_id();
  oid text := public.current_org_id();
begin
  if uid is null or oid is null then
    return false;
  end if;

  return exists (
    select 1
    from public.organizations o
    where o.id = oid
      and uid = any (coalesce(o.admin_id, array[]::text[]))
  );
end;
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



drop policy if exists registrations_select_same_org on public.registrations;
create policy registrations_select_same_org
on public.registrations for select to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
);

drop policy if exists registrations_insert_same_org on public.registrations;
create policy registrations_insert_same_org
on public.registrations for insert to authenticated
with check (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
  and (
    -- posso creare per me stesso
    registrations.user_id = (select u.id from public.users u where u.clerk_id = public.current_clerk_id() limit 1)
    -- oppure sono admin dell'org (admin può creare per altri)
    or public.current_is_org_admin()
  )
);

drop policy if exists registrations_update_same_org on public.registrations;
create policy registrations_update_same_org
on public.registrations for update to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
  and (
    registrations.user_id = (select u.id from public.users u where u.clerk_id = public.current_clerk_id() limit 1)
    or public.current_is_org_admin()
  )
)
with check (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
);

drop policy if exists registrations_delete_same_org on public.registrations;
create policy registrations_delete_same_org
on public.registrations for delete to authenticated
using (
  public.user_org_id_by_users_id(registrations.user_id) = public.current_org_id()
  and (
    registrations.user_id = (select u.id from public.users u where u.clerk_id = public.current_clerk_id() limit 1)
    or public.current_is_org_admin()
  )
);