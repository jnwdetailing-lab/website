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
- /paint-enhancement/ : Paint enhancement (one-step polish for light swirls and haze), ${usd(addonPrice('Polish'))} add-on
- /paint-sealant/ : Ceramic paint sealant in place of the spray wax, about six months, ${usd(addonPrice('Ceramic sealant upgrade (6 months)'))} add-on
- /headlight-polishing/ : Headlight polishing, lenses sanded, polished and sealed, ${usd(addonPrice('Headlight restoration (pair)'))} a pair, add-on
- /engine-detailing/ : Engine bay detail, ${usd(addonPrice('Engine bay detail'))} add-on
- /steam-cleaning/ : Interior steam cleaning, included in every ${DETAIL.name} and Interior Only Detail
- /seat-shampooing/ : Cloth seat shampoo (hot-water extraction), ${usd(addonPrice('Shampoo seats (stain removal)'))} add-on; carpets ${usd(addonPrice('Shampoo carpets (stain removal)'))}
- /upholstery-cleaning-service/ : Vehicle, RV and boat upholstery cleaning (not home furniture)
- /auto-restoration-service/ : Cosmetic auto restoration (paint, headlights, trim, interior); no bodywork, rust repair or repainting
- /ceramic-coating/ : Ceramic coating — ${CERAMIC.map((c) => c.name).join(' / ')} packages (the difference is the paint correction first). Quoted per vehicle and paint condition; no posted price
- /odor-removal-oakland/ : Ozone odor treatment — ${usd(addonPrice('Ozone odor treatment'))} add-on
- ${OVERSIZED.href} : RV, Sprinter and oversized vehicle wash & detailing — quoted
- /rv-exterior-hand-wash/ : RV exterior hand wash and wax (roof, sides, oxidation), quoted
- /boat-cleaning-service/ : Boat cleaning (maintenance wash), quoted
- /boat-detailing-service/ : Boat detailing (gelcoat oxidation, polish, wax, interior), quoted

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
- /blog/car-wash-vs-full-detail/
- /blog/is-car-detailing-worth-it/
- /blog/what-does-a-car-detailer-do/
- /blog/how-much-to-tip-for-car-detailing/
- /blog/how-often-should-you-detail-your-car/
- /blog/is-300-too-much-for-a-car-detail/
- /blog/whats-included-in-a-basic-car-detail/
- /blog/why-is-auto-detailing-so-expensive/
- /blog/should-you-detail-a-new-car/
- /blog/car-detailing-in-winter/
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
