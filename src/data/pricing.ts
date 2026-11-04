// ---------------------------------------------------------------------------
// Packages, prices and plans. Every price on the site is read from this file.
//
// Structure (Nov 2026): one Full Detail, booked inside and out or interior
// only ($50 less), an exterior-only detail, flat-price add-ons, and plans that
// take a fixed amount off every visit. The detail prices match the "NEW" Coupe /
// Sedan, 5-Seat SUV / Truck and 7-Seat SUV / Minivan services in Fieldd.
//
// Ceramic is still priced at four sizes in Fieldd. Until it moves to three, the
// rows below use the smallest, the "SUV / Truck" and the largest of those four.
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
  insideOut: [249, 299, 349] as PriceRow,
  /** Interior only is the same interior work, $50 less. */
  interiorOnly: [199, 249, 299] as PriceRow,
  hoursInsideOut: '2.5 to 3.5 hours',
  hoursInterior: '2 to 3 hours',
  interior: [
    'Full vacuum: seats, carpet, trunk and under the seats',
    'Compressed-air blowout of vents, seams and seat rails',
    'Steam cleaning of plastics, cup holders and high-touch areas',
    'Every hard surface wiped down and dressed, satin not greasy',
    'Floor mats cleaned and restored',
    'Inside glass and mirrors, streak-free',
  ],
  exterior: [
    'Foam pre-soak and two-bucket hand wash',
    'Iron remover and clay bar on the paint',
    'Wheels, tires and wheel wells cleaned, tires dressed',
    'Door jambs wiped down',
    'Outside glass and mirrors',
    'Ceramic sealant, about 3 months of protection',
  ],
};

export const EXTERIOR_ONLY = {
  id: 'exterior-detail',
  name: 'Exterior Only Detail',
  tagline: 'The outside of the Full Detail on its own.',
  hours: 'About 2 hours',
  prices: [150, 150, 150] as PriceRow,
  items: [
    'Foam pre-soak and two-bucket hand wash',
    'Iron remover and clay bar',
    'Wheels, tires and door jambs',
    'Glass and mirrors',
    'Ceramic sealant, about 3 months',
  ],
};

export type Cadence = { id: string; label: string; every: string; save: number; note?: string };

// A plan is the same Full Detail on a schedule, with a fixed amount off every
// visit. The plan price holds once three visits are completed.
export const MEMBERSHIP = {
  name: 'Membership',
  minimumVisits: 3,
  maxSave: 100,
  cadences: [
    { id: 'monthly', label: 'Monthly', every: 'every month', save: 100, note: 'Biggest savings' },
    { id: 'bimonthly', label: 'Bi-monthly', every: 'every two months', save: 70 },
    { id: 'quarterly', label: 'Quarterly', every: 'every three months', save: 50 },
  ] as Cadence[],
};

/** Plan price per size for a one-time price row. */
export const planRow = (row: PriceRow, save: number) => row.map((v) => v - save) as PriceRow;

export type Addon = { name: string; price: number; desc: string };

export const ADDONS_INTERIOR: Addon[] = [
  { name: 'Pet hair removal', price: 45, desc: 'Rubber blades, pet-hair stones and air to pull embedded hair out of carpet and cloth.' },
  { name: 'Shampoo seats and carpet', price: 135, desc: 'Hot-water extraction for the whole cabin: stains, spills and ground-in dirt.' },
  { name: 'Shampoo seats only', price: 80, desc: 'Extraction on cloth seats when the carpet is fine.' },
  { name: 'Shampoo carpet only', price: 80, desc: 'Extraction on carpet and mats when the seats are fine.' },
  { name: 'Leather treatment', price: 45, desc: 'Clean and condition leather so it stays soft and does not crack.' },
  { name: 'Child car seat cleaning', price: 35, desc: 'Seat shell and fabric cleaned, crumbs and spills removed.' },
  { name: 'Headliner shampoo', price: 70, desc: 'Careful low-moisture cleaning of a stained headliner.' },
  { name: 'Ozone odor removal', price: 80, desc: 'Ozone treatment for smoke, pet and mildew smells after the cabin is cleaned.' },
  { name: 'Biohazard cleanup', price: 250, desc: 'Vomit, urine and other bodily fluids, extracted and sanitized.' },
  { name: 'Mold remediation', price: 250, desc: 'Mold and mildew treated, and the source dried out.' },
];

export const ADDONS_EXTERIOR: Addon[] = [
  { name: 'Engine bay detail', price: 75, desc: 'Safe degrease, rinse and dressing under the hood.' },
  { name: 'Headlight restoration', price: 95, desc: 'Yellowed lenses sanded, polished and sealed.' },
  { name: '6-month paint protection', price: 50, desc: 'Upgrades the sealant from about three months to about six.' },
  { name: 'Windshield ceramic coating', price: 95, desc: 'Rain beads up and blows off the glass at speed.' },
  { name: 'One-step polish', price: 165, desc: 'Machine polish that takes out light swirls and brings back gloss.' },
];

export type CeramicTier = { id: string; name: string; prices: PriceRow; prep: string; bestFor: string; featured?: boolean };

export const CERAMIC: CeramicTier[] = [
  { id: 'bronze', name: 'Bronze', prices: [750, 895, 950], prep: 'Paint enhancement polish', bestFor: 'Newer cars with paint in good shape' },
  { id: 'silver', name: 'Silver', prices: [850, 995, 1050], prep: 'One-step paint correction', bestFor: 'Most cars: light swirls and wash marks removed first', featured: true },
  { id: 'gold', name: 'Gold', prices: [1250, 1550, 1550], prep: 'Two-step paint correction', bestFor: 'Dark, swirled or neglected paint, or a show-level finish' },
];

export const CERAMIC_ADDONS: Addon[] = [
  { name: 'Interior ceramic coating', price: 150, desc: 'Fabric and leather protection that makes spills easier to clean.' },
  { name: 'All windows ceramic coating', price: 150, desc: 'Every window coated so rain and grime sheet off.' },
];

export const from = (row: PriceRow) => Math.min(...row);
export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
export const range = (row: PriceRow) => (from(row) === Math.max(...row) ? usd(from(row)) : `${usd(from(row))} to ${usd(Math.max(...row))}`);
