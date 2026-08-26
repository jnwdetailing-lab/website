# J&W Mobile Detailing — website (v2)

SEO-first rebuild of [jnwdetailing.com](https://jnwdetailing.com) as a static [Astro](https://astro.build) site.
Zero runtime JS frameworks, inline critical CSS, every page ships LocalBusiness + Service + FAQPage + BreadcrumbList JSON-LD.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in ./dist
npm run preview
```

## Live deployment

Deployed to Netlify (site `jnw-mobile-detailing`, team `muzaffarbek007`):
- Production: https://jnw-mobile-detailing.netlify.app
- Admin: https://app.netlify.com/projects/jnw-mobile-detailing
- Redeploy: `npx netlify deploy --prod --build` (folder is linked via `.netlify/`)
- **Enable Forms**: Admin → Forms → *Enable form detection*, then redeploy once so the `quote` form is registered; add `jnwdetailing@gmail.com` under Forms → Notifications.
- **Custom domain**: Admin → Domain management → Add `jnwdetailing.com` (+ `www`), then at the registrar point the apex to Netlify's load balancer / use Netlify DNS as instructed. SSL is automatic.

## Deploy (pick one)

| Host | Steps |
|---|---|
| **Netlify** (recommended — forms work out of the box) | Connect repo → build `npm run build`, publish `dist`. `netlify.toml` + `public/_redirects` are already set. The quote form uses Netlify Forms (`data-netlify`) — enable form notifications to `jnwdetailing@gmail.com` in Site settings → Forms. |
| **Vercel** | Import repo (framework: Astro). `vercel.json` carries redirects + cache headers. Forms: point `action` in `src/components/QuoteForm.astro` at a Formspree/Basin endpoint or add a serverless function. |
| **Cloudflare Pages** | Build `npm run build`, output `dist`. `_redirects` is honored. Forms: same as Vercel. |

After go-live: point DNS for `jnwdetailing.com` at the host, keep HTTPS forced, and **submit `https://jnwdetailing.com/sitemap-index.xml` in Google Search Console**.

## URL map (old WordPress slugs preserved)

All existing ranking URLs are kept verbatim. Changed ones are 301'd (both in host config and as static meta-refresh pages):

| Old | New |
|---|---|
| `/paint-correction-2/` | `/paint-correction/` |
| `/location/` | `/service-areas/` |
| `/cart-detailing/` | `/services/` |
| `/homepage-1/`, `/?page_id=*` | `/` |

New pages: `/services/`, `/odor-removal-oakland/`, `/service-areas/`, `/gallery/`, `/blog/` (3 existing posts re-homed at their original `/blog/<slug>/` URLs).

## Home page v2 (minimal / easy-book / high-converting)

Rebuilt 2026-08-21 from a 10-persona design review (spec saved at `docs/home-redesign-spec.md`). 8 sections, 6 H2s, one CTA label everywhere (**Get My Price & Book** → `#book`), booking card in the hero.

**Installing the fieldd quoting widget:** open `src/components/FielddWidget.astro`, paste the snippet between `<!-- FIELDD:START -->` / `<!-- FIELDD:END -->` (add `is:inline` to any `<script>` tag), set `hasEmbed = true`, run `npx netlify deploy --prod --build`. The slot is already in the home hero (`#book`) and on `/contact/`; the fallback button (→ jnwdetail.fieldd.co) shows until then. The old Netlify `QuoteForm.astro` is kept in the repo but no longer used.

## Where to edit things

| What | File |
|---|---|
| Phone, email, hours, address, rating/review count, socials, booking URL | `src/data/site.ts` → `SITE` |
| Nav menu | `src/data/site.ts` → `NAV` |
| Services (name, price range, blurb, image) | `src/data/site.ts` → `SERVICES` |
| Reviews shown on site | `src/data/site.ts` → `REVIEWS` (verbatim Google reviews only — never invent) |
| Home FAQ | `src/data/site.ts` → `HOME_FAQS` |
| Gallery images | `src/data/site.ts` → `GALLERY` + drop files in `public/images/` |
| Per-page copy / FAQs / schema | `src/pages/*.astro` |
| City pages | `src/pages/auto-detailing-<city>-ca.astro` (uses `src/components/LocationPage.astro`) |
| Blog posts | `src/content/blog/<slug>.html` + `meta.json`; SEO titles in `src/pages/blog/[slug].astro` |
| Global LocalBusiness schema | `src/layouts/Base.astro` |
| Colors / type | `src/styles/global.css` |

**Keep these in sync** (entity consistency is a ranking factor): the `rating.count` in `site.ts` with your live Google count; the prices in `site.ts` / service pages / blog posts; and your GBP services list with the pages here.

## SEO checklist that is already done

- Unique `<title>` (service + city first) and meta description with CTA on every page
- One H1 per page with the primary keyword; question-format H2/H3s feeding AI Overviews
- First-100-words answer block on every service/location page with concrete prices & times
- JSON-LD: `AutoDetailing/LocalBusiness` (geo, hours, areaServed, aggregateRating, offer catalog, ReserveAction) on every page; `Service` + `FAQPage` + `BreadcrumbList` on service/location pages; `Review` on /reviews/; `Article` on blog posts; `Person` on /about-us/; `ImageGallery` on /gallery/
- Canonicals, OG/Twitter cards, `robots.txt` (AI crawlers allowed), `llms.txt`, XML sitemap with priorities
- Descriptive image filenames + alt text; width/height on images (no CLS); hero `fetchpriority=high` + preload; everything else lazy
- Click-to-call / SMS everywhere, sticky mobile CTA bar, FUD reducers under every CTA
- 301s for changed URLs; security + cache headers in host configs

## Next steps (not code)

1. **Google Business Profile**: make the services list match `/services/`, set hours Mon–Sun 8–8, add the 8 service-area cities, upload the `public/images/` photos, post weekly, reply to every review. Link website → `https://jnwdetailing.com/`.
2. Fix **NAP consistency** on Yelp / Nextdoor / Facebook: phone `(510) 756-4995`, same name, same hours.
3. **Search Console**: submit sitemap, request indexing for `/`, `/ceramic-coating/`, `/services/`, the 3 city pages.
4. Ask happy customers for reviews that mention the service + city (“ceramic coating in Alameda”).
5. Add more real before/after photos to `GALLERY` — original photos beat everything for E-E-A-T.
6. Replace the Google Maps `<iframe>` with a static image if you ever need to squeeze more speed; it's lazy-loaded already.

## Claims to confirm with the owner before launch

Everything priced is from the business's own published ranges (blog posts + 2026 pricing graphics). A few operational statements were written as sensible defaults and should be confirmed or edited (all live in `src/data/site.ts` or the page files):

- Hours **Mon–Sun 8 AM–8 PM** (about page said so; old homepage template said Mon–Fri 8–6)
- Payment methods: cash, card, **Zelle, Venmo** · "**no deposit** to book" · "**24 h** cancellation notice, no fee"
- "**No travel fee**" inside the 8-city core area; nearby cities "by request" (Lafayette, Pleasant Hill, Concord, Alamo, Albany, Kensington, El Cerrito, Castro Valley, Hayward, Richmond)
- "**Licensed & insured**"
- Time estimates: exterior 1.5–3 h, interior 2–4 h, ceramic full day (full detail 3–7 h is published)
- Street address in schema (`2127 23rd Ave`) — if your GBP hides the address (service-area business), delete `streetAddress` from `Base.astro` and keep city/zip only
- Alternate phone `(341) 226-2850` appeared once on the old about page — site uses `(510) 756-4995` everywhere
