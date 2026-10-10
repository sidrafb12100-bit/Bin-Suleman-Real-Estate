# Bin Suleman Real Estate & Builders — Official Website

Official sales partner website for DHA Phase 9 Prism, Lahore.

## Pages
- `index.html` — Home (hero, project showcase, promo showreel, booking CTA)
- `listings.html` — Listings (**DHA Prism 9 Plots**: all active listings as direct-plot cards with dated demands, schedule of payments and one-tap WhatsApp enquiry; **DHA Phase 5**: M Block pair plots #46+47 and #180+181, price on request)
- `about.html` — About Us (leadership, DHA standards, testimonials)
- `services.html` — Services (plot advisory, commercial trading, transfers, construction)
- `blog.html` — Market Insights (DHA Phase 9 Prism market intelligence)
- `contact.html` — Contact Us (private advisory booking)

## Tech
Static HTML + Tailwind CSS (CDN), Google Fonts (Manrope / Plus Jakarta Sans), local assets in `assets/`.
Fully responsive (mobile + desktop). Favicon: `favicon.ico`.

## Rebuild
Pages are generated from the Stitch sources in the `*_bin_suleman_real_estate/` folders by `build-pages.ps1`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File build-pages.ps1
```

## Live listings (Supabase)

The **Next.js app** (`next/`) serves property listings live from Supabase —
edits in the admin dashboard appear on `/listings` instantly (realtime), with
**no rebuild**. The static HTML pages above are a separate, frozen copy.

| Piece | Where |
|---|---|
| Database schema + RLS + seed | `next/supabase/migrations/0001_init.sql` (run once in the Supabase SQL editor) |
| Table grants + admin bootstrap | `next/supabase/migrations/0002_grants.sql` (run after 0001 — fixes `permission denied for table listings` on `/admin`) |
| Public env vars | `next/.env.local` (copy `next/.env.example`) |
| Public page data fetch | `next/src/hooks/useListings.ts` (anon key, RLS: `published = true`) |
| Admin dashboard | `/admin` (login: `/admin/login`, editor: `/admin/editor`) |
| Client (RLS-enforced writes) | `next/src/lib/supabase/client.ts` |

**Security model:** the browser only ever holds the public anon key; every
write is authorised by Supabase Auth + row-level `is_admin()` policies. No
service-role key exists anywhere in the app.

### Admin setup
1. Create a Supabase project → run every file in `next/supabase/migrations/`
   in order (`0001_init.sql`, then `0002_grants.sql`) in the SQL editor.
   Re-run `0002_grants.sql` any time you see `permission denied for table …`.
2. Copy `next/.env.example` → `next/.env.local` and fill in the URL + anon key.
3. Create a user under **Authentication → Users**. If `admin_users` was empty
   when you ran `0002_grants.sql`, the user is already an admin; otherwise grant it:
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```
4. Sign in at `/admin` (locally: `npm.cmd run dev` in `next/`).

### Build (Next.js)
```powershell
cd next
npm.cmd run build     # static export → next/out
```

