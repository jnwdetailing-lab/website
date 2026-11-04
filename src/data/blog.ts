// ---------------------------------------------------------------------------
// Live prices for the blog posts in src/content/blog.
//
// The posts are plain HTML, so prices are written as tokens instead of
// numbers: {{FULL_SEDAN}} or {{addon:Pet hair removal}}. They are filled in
// from pricing.ts at build time, so a price change in pricing.ts reaches the
// posts too. An unknown token fails the build instead of showing on the page.
// ---------------------------------------------------------------------------
import { SITE } from './site';
import { DETAIL, EXTERIOR_ONLY, EXTRA_TIME, MEMBERSHIP, MONTHLY_FROM, SIZES, addonPrice, usd } from './pricing';

const [monthly, bimonthly, quarterly] = MEMBERSHIP.cadences;
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const BLOG_TOKENS: Record<string, string> = {
  FULL_SEDAN: usd(DETAIL.insideOut[0]),
  FULL_SUV5: usd(DETAIL.insideOut[1]),
  FULL_SUV7: usd(DETAIL.insideOut[2]),
  INT_SEDAN: usd(DETAIL.interiorOnly[0]),
  INT_SUV5: usd(DETAIL.interiorOnly[1]),
  INT_SUV7: usd(DETAIL.interiorOnly[2]),
  EXT: usd(EXTERIOR_ONLY.prices[0]),
  FULL_HOURS: DETAIL.hoursInsideOut,
  INT_HOURS: DETAIL.hoursInterior,
  EXT_HOURS: lower(EXTERIOR_ONLY.hours),
  MONTHLY_FROM: usd(MONTHLY_FROM),
  SAVE_M: usd(monthly.save[0]),
  SAVE_B: usd(bimonthly.save[0]),
  SAVE_Q: usd(quarterly.save[0]),
  MIN_VISITS: String(MEMBERSHIP.minimumVisits),
  EXTRA_TIME: usd(EXTRA_TIME.price),
  EXTRA_PER: EXTRA_TIME.per,
  SIZE1: SIZES[0].label,
  SIZE2: SIZES[1].label,
  SIZE3: SIZES[2].label,
  RATING: String(SITE.rating.value),
  REVIEWS: SITE.stats.reviews,
  CITIES: SITE.stats.cities,
};

/** Replace every {{TOKEN}} and {{addon:Name}} in a post. */
export const fillTokens = (html: string, where = 'blog post') =>
  html.replace(/\{\{([^{}]+)\}\}/g, (_, raw: string) => {
    const key = raw.trim();
    if (key.startsWith('addon:')) return usd(addonPrice(key.slice(6).trim()));
    if (key in BLOG_TOKENS) return BLOG_TOKENS[key];
    throw new Error(`Unknown price token {{${key}}} in ${where}`);
  });

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const text = (s: string) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** The visible FAQ of a post, for its FAQPage schema. */
export const postFaqs = (html: string) =>
  [...html.matchAll(/<p class="bg-faq-q">([\s\S]*?)<\/p>\s*<p class="bg-faq-a">([\s\S]*?)<\/p>/g)].map((m) => ({ q: text(m[1]), a: text(m[2]) }));
