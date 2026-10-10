-- ============================================================================
-- 0002 — Privileges + admin bootstrap
--
-- Fixes: "permission denied for table listings" (Postgres 42501) on /admin.
-- That error is a missing table-level GRANT — RLS alone can never produce it
-- (RLS would only hide rows). Run this whole file in the Supabase SQL editor
-- after 0001_init.sql. Idempotent: safe to re-run any time.
-- ============================================================================

-- Schema usage
grant usage on schema public to anon, authenticated;

-- listings: visitors may read published rows (RLS decides which);
-- signed-in admins may read/write everything they're allowed to (RLS again).
grant select on public.listings to anon;
grant select, insert, update, delete on public.listings to authenticated;

grant select on public.listing_photos to anon;
grant select, insert, update, delete on public.listing_photos to authenticated;

grant select on public.admin_users to authenticated;

-- is_admin() is SECURITY DEFINER (runs as its owner), but be explicit anyway.
grant execute on function public.is_admin() to anon, authenticated;

-- Storage bucket access for photo uploads. Row access stays guarded by the
-- storage.objects RLS policies from 0001 (public read, admin write).
-- Wrapped because some projects already grant these and the role running this
-- file may lack grant rights on the storage schema.
do $$
begin
  execute 'grant usage on schema storage to anon, authenticated';
  execute 'grant select on storage.objects to anon';
  execute 'grant select, insert, update, delete on storage.objects to authenticated';
exception when others then
  null; -- already granted / not grantable here: Supabase defaults cover it
end $$;

-- ----------------------------------------------------------------------------
-- Admin bootstrap: if nobody has been granted admin yet, promote every
-- existing auth user (single-operator site — removes the need to copy user
-- UUIDs by hand). Once at least one admin exists this block does nothing.
-- ----------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from public.admin_users) then
    insert into public.admin_users (user_id)
    select id from auth.users
    on conflict (user_id) do nothing;
  end if;
end $$;

-- To grant (or add) a specific admin later, run:
--   insert into public.admin_users (user_id)
--   select id from auth.users where email = 'you@example.com'
--   on conflict (user_id) do nothing;