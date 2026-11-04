// ---------------------------------------------------------------------------
// Packages, prices and plans. Every price on the site is read from this file.
//
// Matches the Fieldd catalog (Nov 4 2026): one Full Detail, booked inside and
// out or interior only, an exterior-only detail, and $50 add-ons. Plans are the
// same detail on a schedule, with the same amount off every visit on every
// vehicle (set in Fieldd under each service's Recurring booking).
//
// Ceramic coating is quoted per vehicle, not listed: the price depends on the
// size and on how much correction the paint needs, so no ceramic prices are
// posted anywhere on the site.
// ---------------------------------------------------------------------------

export type Size = { id: string; label: string; examples: string };
export const SIZES: Size[] = [
  { id: 'sedan', label: 'Coupe / Sedan', examples: 'Coupes, sedans, hatchbacks' },
  { id: 'suv5', label: '5-Seat SUV / Truck', examples: 'Crossovers, 5-seat SUVs, pickups' },
  { id: 'suv7', label: '7-Seat SUV / Minivan', examples: 'Three-row SUVs, minivans' },
];

/** One price per size, in SIZES order. */
export type PriceRow = [number, number, number];

/** Vans and anything bigger than a minivan are quoted, not listed. */
export const OVERSIZED = {
  label: 'Sprinter / Oversized',
  examples: 'Sprinter, Transit, box trucks, RVs',
  href: '/rv-wash-and-rv-detailing-oakland-california/',
};

export const DETAIL = {
  id: 'full-detail',
  name: 'Full Detail',
  tagline: 'One detail, done properly. Cleaned, sanitized and protected, inside and out.',
  insideOut: [299, 349, 399] as PriceRow,
  /** Interior only is the same interior work, $50 less. */
  interiorOnly: [249, 299, 349] as PriceRow,
  hoursInsideOut: '2.5 to 3.5 hours',
  hoursInterior: '2 to 3 hours',
  interior: [
    'Double vacuum: seats, carpets, mats and trunk',
    'Air purge of vents, seams, cupholders and crevices',
    'Steam clean of seats, carpets, mats, door panels, console and plastics',
    'Spot stain treatment',
    'Leather cleaned and conditioned, matte finish',
    'Plastics cleaned and protected, matte finish',
    'Windows, mirrors and visors',
    'Trunk detailed, headliner spot-cleaned as needed',
  ],
  exterior: [
    'Pre-soak for bugs, bird droppings and road grime',
    'Professional hand wash',
    'High-gloss spray wax',
    'Wheel wells pressure-washed',
    'Rim faces and tires detailed',
    'Exterior trim and tires dressed',
    'Door jambs and exterior windows',
  ],
};

export const EXTERIOR_ONLY = {
  id: 'exterior-detail',
  name: 'Exterior Only Detail',
  tagline: 'A thorough hand wash and exterior detail. No interior.',
  hours: 'About 1 to 2 hours',
  prices: [175, 175, 175] as PriceRow,
  /** It is the minimum service call: promo codes and plan discounts do not apply. */
  note: 'Our minimum service call, so promo codes and plan discounts do not apply.',
  items: [
    'Pre-soak and professional hand wash',
    'High-gloss spray wax',
    'Wheel wells, rim faces and tires',
    'Trim and tires dressed',
    'Door jambs and exterior windows',
  ],
};

/** Heavy dirt, sand or buildup beyond a normal clean, agreed before we start. */
export const EXTRA_TIME = { price: 50, per: '30 minutes' };

export type Cadence = { id: string; label: string; every: string; save: PriceRow; note?: string };

// A plan is the same Full Detail on a schedule, with the same amount off every
// visit whatever the vehicle, on inside-and-out and interior-only plans alike.
// The plan price holds once three visits are completed.
export const MEMBERSHIP = {
  name: 'Membership',
  minimumVisits: 3,
  cadences: [
    { id: 'monthly', label: 'Monthly', every: 'every month', save: [150, 150, 150], note: 'Lowest price' },
    { id: 'bimonthly', label: 'Bi-monthly', every: 'every two months', save: [100, 100, 100] },
    { id: 'quarterly', label: 'Quarterly', every: 'every three months', save: [50, 50, 50] },
  ] as Cadence[],
};

/** Plan price per size for a one-time price row. */
export const planRow = (row: PriceRow, save: PriceRow) => row.map((v, i) => v - save[i]) as PriceRow;
/** Lowest monthly Full Detail price, for "monthly from $X" lines. */
export const MONTHLY_FROM = Math.min(...planRow(DETAIL.insideOut, MEMBERSHIP.cadences[0].save));

export type Addon = { name: string; price: number; desc: string };

export const ADDONS_INTERIOR: Addon[] = [
  { name: 'Pet hair removal', price: 50, desc: 'Needed if there is pet hair. Rubber blades, pet-hair stones and air pull it out of carpet and cloth.' },
  { name: 'Extreme pet hair removal', price: 100, desc: 'For heavy shedding woven deep into carpet and seats.' },
  { name: 'Shampoo seats (stain removal)', price: 50, desc: 'Hot-water extraction on cloth seats for spills, sweat and food stains.' },
  { name: 'Shampoo carpets (stain removal)', price: 50, desc: 'Hot-water extraction on carpet and floor mats for coffee, mud and salt lines.' },
  { name: 'Kids car seat cleaning', price: 50, desc: 'Seat shell and fabric cleaned and sanitized.' },
  { name: 'Headliner deep cleaning', price: 50, desc: 'Careful low-moisture cleaning of a stained headliner, beyond the spot clean.' },
  { name: 'Ozone odor treatment', price: 75, desc: 'Ozone for smoke, pet and food smells, after the cabin is cleaned.' },
  { name: 'Bio cleaning (vomit, urine, etc.)', price: 150, desc: 'Bodily fluids extracted, enzyme-treated and sanitized.' },
];

export const ADDONS_EXTERIOR: Addon[] = [
  { name: 'Clay bar treatment', price: 50, desc: 'Lifts bonded grit, tar and overspray so the paint feels smooth again.' },
  { name: 'Engine bay detail', price: 50, desc: 'Safe degrease, rinse and dressing under the hood.' },
  { name: 'Headlight restoration (pair)', price: 100, desc: 'Yellowed lenses sanded, polished and sealed.' },
  { name: 'Ceramic sealant upgrade (6 months)', price: 100, desc: 'Swaps the spray wax for a ceramic sealant that lasts about six months.' },
  { name: 'Polish', price: 149, desc: 'Machine polish that takes out light swirls and brings back gloss.' },
  { name: 'Windshield ceramic coating', price: 95, desc: 'Rain beads up and blows off the glass at speed.' },
];

/** Price of a listed add-on by its exact name (build fails loudly on a typo). */
export const addonPrice = (name: string) => {
  const a = [...ADDONS_INTERIOR, ...ADDONS_EXTERIOR].find((x) => x.name === name);
  if (!a) throw new Error(`Unknown add-on: ${name}`);
  return a.price;
};

// Quoted per vehicle: the packages differ only in the prep under the coating.
export type CeramicTier = { id: string; name: string; prep: string; bestFor: string; featured?: boolean };

export const CERAMIC: CeramicTier[] = [
  { id: 'bronze', name: 'Bronze', prep: 'Paint enhancement polish', bestFor: 'Newer cars with paint in good shape' },
  { id: 'silver', name: 'Silver', prep: 'One-step paint correction', bestFor: 'Most cars: light swirls and wash marks removed first', featured: true },
  { id: 'gold', name: 'Gold', prep: 'Two-step paint correction', bestFor: 'Dark, swirled or neglected paint, or a show-level finish' },
];

/** Coatings that can go on with any package, quoted together with it. */
export const CERAMIC_ADDONS: { name: string; desc: string }[] = [
  { name: 'Interior ceramic coating', desc: 'Fabric and leather protection that makes spills easier to clean.' },
  { name: 'All windows ceramic coating', desc: 'Every window coated so rain and grime sheet off.' },
  { name: 'Windshield ceramic coating', desc: 'Rain beads up and blows off the glass at speed.' },
];

export const from = (row: PriceRow) => Math.min(...row);
export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
export const range = (row: PriceRow) => (from(row) === Math.max(...row) ? usd(from(row)) : `${usd(from(row))} to ${usd(Math.max(...row))}`);
