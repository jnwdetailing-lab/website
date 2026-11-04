// /llms.txt: a plain-text summary for AI assistants, built from the same data
// as the site so the prices never drift from what the pages say.
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { DETAIL, EXTERIOR_ONLY, SIZES, OVERSIZED, MEMBERSHIP, CERAMIC, addonPrice, usd, type PriceRow } from '../data/pricing';

const row = (r: PriceRow) => r.map(usd).join(' / ');
const [monthly, bimonthly, quarterly] = MEMBERSHIP.cadences;

const body = `# J&W Mobile Detailing — llms.txt
# Mobile auto detailing & ceramic coating, Oakland CA + Bay Area. Founded ${SITE.founded} by Jalil Wren.
# Phone: ${SITE.phoneDisplay} · Email: ${SITE.email} · Book: ${SITE.booking}
# Rating: ${SITE.rating.value}/5 on Google (${SITE.stats.reviews} reviews). Hours: Mon–Sun 8:00 AM–8:00 PM. 100% mobile — brings own water & power.
# Service area: ${SITE.stats.cities} Bay Area cities, including Oakland, Alameda, Berkeley, San Leandro, Piedmont, Emeryville, Orinda, Walnut Creek, Richmond (plus San Pablo, El Cerrito, Pinole, Hercules, El Sobrante, Albany).

## Services (USD; prices by vehicle size: ${SIZES.map((s) => s.label).join(' / ')})
- /pricing/ : Every price, add-on and plan
- /services/ : All services
- ${DETAIL.name} (Interior + Exterior): ${row(DETAIL.insideOut)} · ${DETAIL.hoursInsideOut}
- /interior-auto-detailing-oakland-california/ : Interior Only Detail — ${row(DETAIL.interiorOnly)}
- /exterior-auto-detailing-oakland-california/ : ${EXTERIOR_ONLY.name} — ${usd(EXTERIOR_ONLY.prices[0])} any size
- /membership/ : The ${DETAIL.name} on a schedule — ${usd(monthly.save[0])} off every visit monthly, ${usd(bimonthly.save[0])} bi-monthly, ${usd(quarterly.save[0])} quarterly. No contract; ${MEMBERSHIP.minimumVisits}-visit minimum
- /paint-correction/ : One-step polish ${usd(addonPrice('Polish'))} add-on; two-step correction quoted after inspection
- /ceramic-coating/ : Ceramic coating — ${CERAMIC.map((c) => c.name).join(' / ')} packages (the difference is the paint correction first). Quoted per vehicle and paint condition; no posted price
- /odor-removal-oakland/ : Ozone odor treatment — ${usd(addonPrice('Ozone odor treatment'))} add-on
- ${OVERSIZED.href} : RV, Sprinter and oversized vehicle wash & detailing — quoted

## Service areas
- /service-areas/ : All Bay Area areas served
- /auto-detailing-alameda-ca/ , /auto-detailing-berkeley-ca/ , /auto-detailing-walnut-creek-ca/ , /auto-detailing-richmond-ca/

## Trust
- /reviews/ : Verbatim Google reviews
- /about-us/ : Owner Jalil Wren, founded ${SITE.founded}, eco-friendly products
- /gallery/ : Real work photos

## Guides
- /blog/what-does-auto-detailing-cost-in-oakland-ca/
- /blog/what-does-ceramic-coating-cost-in-oakland-ca/
- /blog/whats-included-in-a-full-detailing-service/
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
