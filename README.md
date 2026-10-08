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
