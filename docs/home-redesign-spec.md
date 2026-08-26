# J&W Home Page — Final Redesign Spec (merged from 10 reviews)

Files verified: `src/pages/index.astro`, `Base.astro`, `Nav.astro`, `StickyCta.astro`, `CtaBand.astro`, `FielddWidget.astro` (exists, **not imported anywhere**), `QuoteForm.astro`, `Reviews.astro`, `Faq.astro`, `ServicesGrid.astro`, `TrustBar.astro`, `BeforeAfter.astro`, `AreasGrid.astro`, `Process.astro`, `global.css`, `data/site.ts`.

---

## 1. Diagnosis summary

- **Booking is last and split.** The only on-page capture is an 8-field Netlify form (+ required SMS consent) at section 15 of 16; every "Book" (nav, hero, quote, band, sticky, mobile menu — 9 fieldd links) opens a new tab. `FielddWidget.astro` was built with FIELDD:START/END markers and never placed.
- **Above the fold fails on mobile.** At 375×812 the hero button's top edge is ~777px (under the fold and under the 70px sticky bar). 17-word uppercase H1 (5 lines) + 50-word subhead + 3-part proof row with Yelp/Nextdoor exits + two equal buttons + floating "Roo S., Oakland" card (name abbreviated, city invented).
- **Not minimal: ~27,000px / 33 phone screens, ~2,900 words, 14 H2s, ~25 buttons, 25 images.** The same four claims (owner on every job, own water & power, eco products, inspect-before-pay) appear 5–7 times; prices appear in 6 places.
- **Red means nothing.** Hero radial glow, H1 `<em>`, eyebrows, checklist dots, card icons, step numerals, ceramic badge, pills, FAQ open state, full-bleed red CtaBand, a second red primary ("Ceramic coating packages & FAQ") — so the Book button has no visual monopoly.
- **Headings don't scan and proof is diluted.** "Five reasons…" heads six cards; "Real cars, real driveways, no filters", a 24-word owner H2; verifiable 4.9★/223 sits at equal weight with unverifiable "1,000+ vehicles" and "one of the only detailers in the Bay Area". Perf: 342 KB hero JPEG, no srcset, 102 KB logo, ~3 MB images, range-input hijacks touch scroll, `<h3>` inside `<summary>`.

### Vote tally (10 reviewers)

| Section | keep | shrink | merge | cut | move | **Decision** |
|---|---|---|---|---|---|---|
| Nav | 1 | 7 | – | – | – | **Shrink** to 5 items + phone + one red button → `#book` |
| Hero | 2 | 8 | – | – | – | **Shrink** hard; right column = booking card |
| TrustBar | – | 2 | 6 | 2 | – | **Merge** (4.9★ → hero; 3 facts → thin strip); component removed from home |
| PAS + BeforeAfter | 3 | 4 | 3 | – | – | **Shrink** (H2 + 1 para + slider; no checklist, no buttons) |
| ServicesGrid | 6 | 4 | – | – | – | **Shrink to price list** (see §2 for why keep-votes still get what they want) |
| Ceramic spotlight | – | 6 | 1 | 2 | 1 | **Merge** into price list row + size tiers in FAQ |
| Why J&W | – | – | 6 | 4 | – | **Merge** into 3-line trust strip; grid cut |
| Process | 1 | 6 | 3 | – | – | **Merge** into 3-step line inside booking card |
| Reviews | 7 | 3 | – | – | – | **Keep**, 3 reviews, move up, fix verification |
| Gallery strip | – | – | – | 10 | – | **Cut** |
| AreasGrid | – | 10 | – | – | – | **Shrink** to one linked line |
| About / owner | – | 5 | 4 | – | 1 | **Shrink** to owner card beside reviews + avatar in booking card |
| Oakland SEO prose | – | 4 | 4 | 1 | 1 | **Merge** ~110 words into FAQ intro |
| FAQ | 3 | 7 | – | – | – | **Shrink** 8 → 6, schema kept |
| Blog cards | – | – | – | 10 | – | **Cut** (footer + cost-guide text link) |
| Quote (#quote + Netlify form) | – | – | 1 | 8 | 1 | **Cut** form; slot moves to hero |
| CtaBand | 5 | 3 | – | 1 | 1 | **Keep**, dark variant, one button → `#book` |
| StickyCta | 7 | 2 | – | – | – | **Keep** 3 targets, retarget + auto-hide |
| Footer | 3 | – | – | – | – | **Keep** (absorbs Gallery/Blog/Contact/areas) |

---

## 2. FINAL SECTION ORDER (new home page)

Primary CTA label everywhere: **"Get My Price & Book"**. Phone always as text link / sticky, never a second pill.

### 0. Nav (`Nav.astro`, shared) — 60px mobile / 72px desktop
- NAV in `site.ts` → `Services ▾` (6 children), `Ceramic Coating`, `Reviews`, `Service Areas ▾` (drop the `Oakland → /` child; keep Alameda, Berkeley, Walnut Creek, All areas), `About`. Gallery, Blog, Contact move to footer.
- Right side: phone (text, `tel:`), one `btn--primary btn--sm` **"Get My Price & Book"** `href="/#book"` (same tab; on home it's `#book`). Mobile menu CTA same label → `#book`.
- Fix: remove `aria-haspopup` from plain links; move focus to `#navClose` on open; `--nav-h: 60px` ≤560px.

### 1. Hero + Booking card `#book` — mobile ≈ 520px copy + ≈ 640px card
Purpose: 5-second test + the conversion mechanism in one screen (desktop) / one thumb-scroll (mobile).
- Eyebrow: none. Kicker: cut.
- **H1:** `Mobile Car Detailing in Oakland — Done in Your Driveway`
- **Subhead:** `Owner-operated. We bring our own water and power. Interior, exterior, paint correction and ceramic coating from $120 — exact price before you book.`
- **Proof line:** `★★★★★ 4.9 · 223 Google reviews` (whole thing linked to `SITE.social.google`, `rel=noopener`, new tab is OK here).
- **Primary CTA:** `Get My Price & Book` → `#book` (desktop: also `focus()` the card). Full-width ≥56px on mobile.
- **Secondary:** plain text link under button: `or call / text (510) 756-4995` (`tel:`; `sms:` in sticky).
- **FUD line:** `Exact price before you book · No deposit · Same-week slots · You inspect before you pay`
- **Booking card** (white, `#book`, alias empty `<span id="quote">` right before it so any `/#quote` deep links still land):
  - Header: 40px round Jalil avatar + `Get your exact price` (h2 styled as h3) + `Jalil Wren, owner — on every job since 2022`.
  - 3-step line: `1 Pick service & time · 2 We come to you · 3 Inspect, then pay`
  - `FielddWidget` embed slot (`min-height: 520px`, skeleton border). Fallback until snippet: red `Get My Price & Book` → `https://jnwdetail.fieldd.co/` (same tab) + `.fud` `60 seconds · No deposit · Exact price shown before you confirm`.
  - Alt row: `Prefer to talk? Call (510) 756-4995 · Text us`
  - Under the card (desktop) one verbatim quote: `"You can stop looking — this is the shop you want. They come to you, they don't need a power hookup or water hookup, and they do a great job!" — Roo Sczesnak, Google` (linked).
- Removed: kicker, `1,000+ vehicles`, Yelp/Nextdoor, second pill button, floating card with "Roo S., Oakland", foam-wash image from the hero, red radial gradient, H1 `<em>`.

### 2. Trust strip — ≈ 150px mobile
Purpose: say the three differentiators once, scannably (replaces TrustBar + Why J&W + PAS checklist).
- No H2. Three items, ink icons, one line each:
  `Owner on every job — Jalil, since 2022` · `100% mobile — our own water & power` · `pH-neutral, eco-safe products`
- Removed: "1,000+" stat, "~3 yrs" stat, "one of the only detailers in the Bay Area", 6-card grid.

### 3. Problem → Proof (PAS + Before/After) — ≈ 720px mobile
- **H2:** `Tunnel washes swirl your paint. We fix it in your driveway.`
- One paragraph (≤55 words): `Salt air off the estuary, brake dust from I-880, sap from Rockridge street trees — East Bay cars get etched and hazy fast, and most "full details" are a wash and a vacuum. Every J&W detail is a two-bucket hand wash, clay and iron decon, steam and shampoo extraction. That seat is a real Oakland interior detail — drag to compare.`
- BeforeAfter slider (interior seat) — keep; fix: handle-only drag hit area on touch (or `touch-action: pan-y` on the range), visible `:focus-visible` ring on handle, WebP pair ≤120 KB.
- Removed: 4-item checklist, "See services & pricing" / "Read 220+ reviews" buttons.

### 4. Services & prices `#services` — ≈ 620px mobile
Purpose: the logic step + the cost answer block + 6 SEO service links, stated **once**.
- **H2:** `Services & 2026 prices — we come to you`
- One-line intro (the answer block): `Real East Bay ranges; the exact price for your vehicle shows before you book.`
- Price list (no images, 1px rules, price is the biggest element, each name links to its page):
  - `Interior Detailing` — `$150 – $350` — by size & condition
  - `Exterior Detailing` — `$120 – $250` — wash & wax to clay & seal
  - `Paint Correction` — `$250 – $800+` — one-step vs. two-step
  - `Ceramic Coating` — `$800 – $1,550` — complete, incl. correction · sedan $800–$1,000 · mid SUV $1,000–$1,250 · large SUV/truck $1,250–$1,550 · ~3 yrs
  - `Odor Removal` — `Add-on` with any interior detail
  - `RV Wash & Detailing` — `Custom quote`
- Footer line: `Add-ons: headlight restoration · engine bay · trim · pet hair · windows & rims coating — ` link `/services/` · `Full Oakland cost guide →` (blog link, text).
- One CTA: `Get My Price & Book` → `#book`.
- Why the keep-voters are satisfied: every service link, every real price and the ceramic tiers survive; only the 800×600 images, 3-line blurbs and the separate dark ceramic band (with its second red primary) go.

### 5. Reviews + owner card — ≈ 900px mobile
- **H2:** `4.9★ from 223 Google reviews — here's what they say` (the count links to Google).
- 3 verbatim reviews: **Luis Carranza** (easy booking on phone), **Roo Sczesnak**, **Lorie Curtis**. Card = name 600-weight, 5 gold stars, `Google` (+ date if present) in muted, Google "G" glyph; no initials avatar; service as muted text, not red pill. Whole card links to the Google profile.
- One text link: `Read all 223 reviews on Google →`. Drop the duplicate score box and "Read all reviews" button.
- Owner mini-card beside/below: 96px Jalil photo (WebP ≤40 KB), `Hi, I'm Jalil. I started J&W in Oakland in 2022 with one van and one standard: every car leaves looking like I'd want mine to.` + `About J&W →` (`/about-us/`).

### 6. FAQ `#faq` — ≈ 800px mobile
- **H2:** `Before you book` (carries the message alone).
- Intro paragraph (~110 words, the retained Oakland local copy): marine-layer salt, I-880/580 brake dust, Lake Merritt–Piedmont Ave tree sap; links to `/exterior-auto-detailing-oakland-california/`, `/interior-auto-detailing-oakland-california/`, `/ceramic-coating/`. Ends `Text (510) 756-4995 if your question isn't here.`
- 6 FAQs (FAQPage schema from the same array): cost; do you really come to me / what do I need; how long; what areas; how do I book (rewrite: `Use the price & booking form at the top of this page — about 60 seconds, no deposit — or call/text (510) 756-4995.`); ceramic cost & lifespan.
- Layout: single centered 680px column (drop sticky two-column), none open by default, `<button>`/`<summary>` without `<h3>` inside (question as styled `<span>`; heading semantics via the H2).
- Removed: "products safe" and "Why choose J&W" FAQs; the 330-word prose block and its duplicate H3s.

### 7. Service areas line — ≈ 120px mobile
- One sentence, linked: `We come to you across Oakland (Rockridge · Temescal · Montclair · Fruitvale · Lake Merritt · Jack London Square) and Alameda, Berkeley, Piedmont, Emeryville, San Leandro, Orinda and Walnut Creek — all areas →` (city pages + `/service-areas/#...` anchors).

### 8. Closing CtaBand — ≈ 320px mobile
- `variant="dark"`. **H2:** `Ready for a showroom finish — without leaving home?` Text: `Exact price in 60 seconds. No deposit. We come to you anywhere in Oakland & the East Bay.`
- One red `Get My Price & Book` → `#book`; phone as text; FUD line kept.

### 9. Footer (`Footer.astro`) — keep; add Gallery, Blog, Contact, all area links, Yelp/Nextdoor, NAP, hours; 240px logo.

**Totals:** 8 content sections (was 16), 6 H2s (was 14), ~950 words (was ~2,900), ≈5,200px / ~6.5 phone screens (was 27,000px), 5 images (hero avatar, before/after pair, Jalil, logo).

---

## 3. Above-the-fold spec

| Element | Copy / spec |
|---|---|
| H1 | `Mobile Car Detailing in Oakland — Done in Your Driveway` (Barlow Condensed 800, uppercase, `clamp(2.2rem,4.5vw,3.6rem)`; 2 lines desktop, 3 lines at 375px). Chosen over "We Come to You" because "Mobile + we come to you" is redundant (copywriter) and "driveway" is the concrete benefit; keyword stays first. |
| Subhead | `Owner-operated. We bring our own water and power. Interior, exterior, paint correction and ceramic coating from $120 — exact price before you book.` (Inter 1.05rem mobile / 1.15rem desktop, ≤60ch) |
| Proof 1 | `★★★★★ 4.9 · 223 Google reviews` — single linked line, stars `role="img" aria-label="5 stars"` |
| Proof 2 | Roo Sczesnak verbatim quote + `— Roo Sczesnak, Google` (under the card on desktop; under FUD on mobile) |
| Primary CTA | `Get My Price & Book` → `#book` (red pill, the only red above the fold) |
| Secondary | `or call / text (510) 756-4995` plain white text link |
| FUD | `Exact price before you book · No deposit · Same-week slots · You inspect before you pay` |
| Image | **Desktop:** no photo; the white booking card is the visual, with Jalil's 40px avatar in its header. Background plain charcoal `#0f1115` (no gradient). **Mobile:** no hero image (H1 is LCP); first big image is the before/after slider in section 3. If owner insists on a photo, use `jalil-owner-…jpg` as a dimmed desktop background at ≤25% opacity, WebP ≤80 KB. |
| Desktop layout (≥960px) | Grid `1.1fr / 0.9fr`, gap 4rem. Left: H1 → subhead → proof → CTA + phone → FUD. Right: booking card (max-width 440px, white, 1px `--line`, radius 14, `--shadow`), quote under it. Everything fits 1280×800 with the card top visible. |
| Mobile layout (375px) | Order: H1 (3 lines) → subhead (3 lines) → proof → full-width button → phone link → FUD → booking card. Copy stack ≈ 500px so the card's top edge is inside 812px. Hero padding 2rem; `--nav-h` 60px. |

---

## 4. Booking / quote UX spec

- **One slot:** `<section id="book">` = the hero's right column (desktop) / stacked under hero copy (mobile). Wraps `<FielddWidget heading="Get your exact price" />`. Set `.fieldd__embed{min-height:520px}` (not 120px) so the embed doesn't shift layout; `iframe{width:100%;border:0}` with `title="Book J&W Mobile Detailing"`; if the snippet is a `<script>`, load it `is:inline` after first paint (IntersectionObserver rootMargin 400px) and keep the fallback button visible until it initialises. `scroll-margin-top: var(--nav-h)` on `#book`; hidden `<span id="quote">` alias directly before the card.
- **Fallback (now):** inside the card, red `Get My Price & Book` → `https://jnwdetail.fieldd.co/` (same tab, `rel=noopener`) + FUD line + `Call / Text` row. Owner pastes snippet between FIELDD:START/END, flips `hasEmbed = true`; nothing else moves.
- **Every other CTA anchors to `#book`** (nav button, mobile-menu button, price-list button, CtaBand button, sticky "Book"). No `target=_blank` on any booking link; the only new-tab links are the Google-profile links.
- **Delete** `QuoteForm` import and the `#quote` section (form, email, Instagram list) from `index.astro`. Keep `QuoteForm.astro` only for `/contact/` if wanted.
- **StickyCta (≤820px):** Call (`tel:`) · Text (`sms:`) · red **Get Price & Book** → `#book` (cols `1fr 1fr 1.6fr`, 52px tall). Add `body{padding-bottom:calc(64px + env(safe-area-inset-bottom))}` at ≤820px. Hide the bar (IntersectionObserver, `#book` ≥40% in view) so it never covers the widget's submit. Confirm the Netlify drawer badge is off in production.
- **CTA inventory:** 5 primary buttons (nav, hero, booking card, price list, CtaBand — all same label) + sticky "Book" on mobile; 5 phone touchpoints (nav, hero text, card alt row, CtaBand, sticky). Down from ~25 buttons / 9 fieldd / 8 tel.
- **Tracking:** events for `#book` anchor clicks, widget load, fallback click, `tel:`/`sms:` taps, sticky taps.

---

## 5. CUT from the home page / moved elsewhere

**Cut entirely:** Netlify `QuoteForm` + `#quote` section (email/Instagram DM as booking channels); `TrustBar`; Why J&W 6-card grid; `Process` 4-card section; Gallery strip (8 tiles); Blog / "Pricing guides" cards; Ceramic spotlight dark band + 4-row table + red badge + "Full cost guide" button; `AreasGrid` dark 8-card band; Oakland prose block (~220 of 330 words); hero kicker, `1,000+ vehicles`, Yelp/Nextdoor, floating "Roo S., Oakland" card, red radial gradient, H1 `<em>`, second pill button; PAS checklist + its 2 buttons; About section's second paragraph + "About J&W" / "Ask me anything" buttons; FAQs "products safe" and "Why choose J&W"; all secondary exit buttons ("See services & pricing", "Read 220+ reviews", "Full gallery", "All service areas", "All guides", "See us on Google", "Read all reviews"); red CtaBand variant; "one of the only detailers in the Bay Area" claim; all `target=_blank` on booking links; initials avatars; red service pills; sticky two-column FAQ.

**Moves to other pages:** ceramic size-tier table → `/ceramic-coating/` (kept on home only as a row + FAQ answer); gallery → `/gallery/` (footer link); blog cards → `/blog/` + one text link in price list; neighborhood roll-call → `/service-areas/` + one line on home; full owner story → `/about-us/`; Netlify form → `/contact/` only.

---

## 6. Visual / design-system changes

- **Type:** `h1 clamp(2.2rem,4.5vw,3.6rem)`, ≤10 words; `h2 clamp(1.7rem,3vw,2.4rem)`, ≤8 words, keep uppercase Barlow 800 (only 6 of them now); `h3` Barlow 700 1.3rem; body Inter 17px/1.65; hero sub 1.05–1.15rem; `.lead` capped at 2 sentences. Self-host Barlow 700/800 + Inter 400/600 as preloaded woff2 (`font-display: swap`, size-adjusted fallback) and drop the render-blocking Google Fonts link — or at minimum cut to those 4 weights.
- **Color:** red `#e11d2a` reserved for: primary button, sticky "Book", before/after handle. Eyebrows (where any remain) → `--muted` without the red bar; icons/step numerals/checklist dots → `--ink`; FAQ open state → `--ink` border; no `.section--red`; only two dark blocks (hero, closing band). Stars stay `--gold`.
- **Buttons:** two styles on home — `.btn--primary` (red pill, no glow shadow) and text links with underline offset. Remove `.btn--dark/--light/--ghost/--ghost-light` usage from home. One label for the primary.
- **Cards:** one card system — white, 1px `--line`, radius 14, `--shadow-sm`, no hover `translateY`. Price list uses 1px rules, no cards. Booking card is the only shadowed/brightest object above the fold.
- **Spacing / rhythm:** `.section` padding `clamp(2.5rem,5vw,4rem)`; rhythm = charcoal hero → white strip → white PAS → soft-grey pricing → white reviews → soft-grey FAQ → white areas line → charcoal band. Never two bordered-card grids back to back.
- **Imagery:** 5 images total, all via `astro:assets`/WebP+srcset with width/height: Jalil avatar (40px + 96px), before/after pair (≤120 KB total), logo 240px (~5 KB). Target <500 KB images (from ~3 MB). Aspect: 1:1 for before/after; no forced squares elsewhere.
- **Tables:** none on home (the 520px `min-width` side-scrolls at 375px).
- **A11y:** stars in `role="img"` spans; no `<h3>` inside `<summary>`; visible focus on slider handle and `#book` (`tabindex=-1` + `focus()` on CTA click); mobile menu moves focus to close button; sticky bar 48px+ targets; keep skip link, `prefers-reduced-motion` rule.

---

## 7. SEO guardrails kept (minimum)

- **H1:** contains "Mobile Car Detailing in Oakland". `<title>` `Mobile Car Detailing Oakland, CA | J&W Mobile Detailing` and current meta description unchanged; canonical `/`.
- **Answer block:** price list H2 `Services & 2026 prices — we come to you` + one-sentence intro + the real ranges (Interior $150–$350, Exterior $120–$250, Paint Correction $250–$800+, Ceramic $800–$1,550 with tiers); cost FAQ retains the verbatim HOME_FAQS #1 answer (full detail $180–$250 etc.).
- **FAQ:** 6 questions from `HOME_FAQS` with FAQPage JSON-LD (cost, come-to-me, duration, areas, how-to-book, ceramic cost/lifespan).
- **Internal links in body (not just footer):** all 6 service pages, `/ceramic-coating/`, `/services/`, `/auto-detailing-alameda-ca/`, `/auto-detailing-berkeley-ca/`, `/auto-detailing-walnut-creek-ca/`, `/service-areas/`, `/about-us/`, `/blog/what-does-auto-detailing-cost-in-oakland-ca/`; footer adds `/gallery/`, `/blog/`, `/contact/`, `/reviews/`.
- **Local copy:** ~110-word Oakland paragraph (marine layer, I-880/580, tree sap) in FAQ intro + the neighborhood/city sentence in section 7. Target ≥900 words on page.
- **Schema:** `LocalBusiness/AutoDetailing` + `WebSite` in `Base.astro` untouched (aggregateRating 4.9/223, hasOfferCatalog prices, ReserveAction → fieldd, NAP, hours, areaServed); FAQPage from trimmed array. Footer NAP + hours.
- **Proof verifiability:** 4.9/223 linked to `SITE.social.google`; reviews full names + "Google"; no invented cities or abbreviations.

---

## 8. Top 3 A/B tests after launch

1. **Widget placement:** booking card in the hero right column (spec) **vs** hero photo + button with the widget as its own section directly under the hero. Metric: widget engagement + fieldd bookings per session.
2. **H1:** `…Done in Your Driveway` **vs** `…We Come to You` (keyword prefix constant). Metric: scroll-to-`#book` rate and bounce.
3. **Primary CTA label:** `Get My Price & Book` **vs** `Book Online — Pick a Time` (same everywhere). Secondary test if traffic allows: sticky bar 3 targets (Call/Text/Book) **vs** 2 (Call-Text/Book). Metric: clicks on `#book` + sticky taps + sms/tel taps.