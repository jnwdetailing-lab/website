// ---------------------------------------------------------------------------
// Packages, prices and plans. Every price on the site is read from this file.
//
// PROPOSED STRUCTURE (Nov 2026), pending sign-off. Where each number comes from:
//   Level 2 Full Detail, inside & out   = Fieldd "Gold Full (ultimate)" today
//   Level 3 Deep Reset, inside & out    = Fieldd "Diamond Full (masterpiece)" today
//   Level 3 Deep Reset, interior only   = Fieldd "Diamond Reset" today
//   Exterior Detail                     = Fieldd "Exterior Detail (Clay & Seal)" today
//   Ceramic Bronze / Silver / Gold      = Fieldd ceramic packages today
//   Add-on prices                       = Fieldd add-ons today
//   NEW, needs a decision: Level 2 interior only ($75 under inside & out) and
//   the Level 1 membership prices (monthly starts from the existing $130
//   Maintenance Package; other sizes and cadences are scaled from it).
//
// SIZES: Fieldd prices every service at four levels; the labels below are the
// assumed order, smallest to largest. Rename them here to match Fieldd.
// ---------------------------------------------------------------------------

export type Size = { id: string; label: string; examples: string };
export const SIZES: Size[] = [
  { id: 'car', label: 'Car', examples: 'Sedans, coupes, hatchbacks' },
  { id: 'small-suv', label: 'Small SUV', examples: 'Crossovers, compact SUVs' },
  { id: 'suv', label: 'SUV / Truck', examples: '5-seat SUVs, pickups' },
  { id: 'xl', label: '3-Row / Van', examples: '7-seat SUVs, minivans' },
];

/** One price per size, in SIZES order. */
export type PriceRow = [number, number, number, number];

export type Package = {
  id: string;
  level: number;
  name: string;
  tagline: string;
  bestFor: string;
  hours: string;
  insideOut: PriceRow;
  interiorOnly?: PriceRow;
  interior: string[];
  exterior: string[];
  featured?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: 'full-detail',
    level: 2,
    name: 'Full Detail',
    tagline: 'The detail most cars need. Cleaned, sanitized and protected, inside and out.',
    bestFor: 'Daily drivers that get cleaned a few times a year',
    hours: '3 to 4 hours',
    insideOut: [275, 310, 325, 345],
    interiorOnly: [200, 235, 250, 270],
    featured: true,
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
  },
  {
    id: 'deep-reset',
    level: 3,
    name: 'Deep Reset',
    tagline: 'For the car that needs more than a clean: stains, pet hair, spills and smells.',
    bestFor: 'Family cars, dog cars, neglected or pre-sale vehicles',
    hours: '4 to 6 hours',
    insideOut: [425, 475, 485, 515],
    interiorOnly: [335, 375, 385, 405],
    interior: [
      'Everything in the Full Detail interior',
      'Hot-water shampoo extraction of seats and carpets',
      'Stain spot treatment on fabric and carpet',
      'Leather cleaned and conditioned',
      'Light headliner spot cleaning',
      'Double vacuum to pull out embedded grit',
    ],
    exterior: [
      'Everything in the Full Detail exterior',
      'Full paint decontamination before the clay',
      'Ceramic sealant, about 6 months of protection',
    ],
  },
];

export const EXTERIOR_ONLY = {
  id: 'exterior-detail',
  name: 'Exterior Detail',
  tagline: 'Hand wash, decontamination and sealant. No interior.',
  hours: '1.5 to 2 hours',
  prices: [145, 175, 185, 205] as PriceRow,
  items: [
    'Foam pre-soak and two-bucket hand wash',
    'Iron remover and clay bar',
    'Wheels, tires and door jambs',
    'Glass and mirrors',
    'Ceramic sealant, about 3 months',
  ],
};

export type Cadence = { id: string; label: string; every: string; prices: PriceRow; note?: string };

// Level 1 is the membership visit. It is a maintenance detail, not a one-off
// service: it only works because the car is kept on a schedule.
export const MEMBERSHIP = {
  name: 'Maintenance Membership',
  visitName: 'Maintenance Detail',
  level: 1,
  minimumVisits: 3,
  cadences: [
    { id: 'monthly', label: 'Monthly', every: 'every month', prices: [130, 145, 155, 165], note: 'Most popular' },
    { id: 'bimonthly', label: 'Every 2 months', every: 'every two months', prices: [150, 165, 175, 185] },
    { id: 'quarterly', label: 'Quarterly', every: 'every three months', prices: [175, 190, 200, 210] },
  ] as Cadence[],
  visit: [
    'Vacuum and wipe-down of every surface',
    'Spot treatment on new stains',
    'Plastics cleaned and protected',
    'Inside and outside glass',
    'Hand wash, wheels and tires',
    'Spray sealant topped up',
  ],
};

export type Addon = { name: string; price: number; desc: string; includedIn?: string };

export const ADDONS_INTERIOR: Addon[] = [
  { name: 'Pet hair removal', price: 45, desc: 'Rubber blades, pet-hair stones and air to pull embedded hair out of carpet and cloth.' },
  { name: 'Shampoo seats and carpet', price: 135, desc: 'Hot-water extraction for the whole cabin on a Full Detail.', includedIn: 'Deep Reset' },
  { name: 'Shampoo seats only', price: 80, desc: 'Extraction on cloth seats when the carpet is fine.', includedIn: 'Deep Reset' },
  { name: 'Shampoo carpet only', price: 80, desc: 'Extraction on carpet and mats when the seats are fine.', includedIn: 'Deep Reset' },
  { name: 'Leather treatment', price: 45, desc: 'Clean and condition leather so it stays soft and does not crack.', includedIn: 'Deep Reset' },
  { name: 'Child car seat cleaning', price: 35, desc: 'Seat shell and fabric cleaned, crumbs and spills removed.' },
  { name: 'Headliner shampoo', price: 70, desc: 'Careful low-moisture cleaning of a stained headliner.' },
  { name: 'Ozone odor removal', price: 80, desc: 'Ozone treatment for smoke, pet and mildew smells after the cabin is cleaned.' },
  { name: 'Biohazard cleanup', price: 250, desc: 'Vomit, urine and other bodily fluids, extracted and sanitized.' },
  { name: 'Mold remediation', price: 250, desc: 'Mold and mildew treated, and the source dried out.' },
];

export const ADDONS_EXTERIOR: Addon[] = [
  { name: 'Engine bay detail', price: 75, desc: 'Safe degrease, rinse and dressing under the hood.' },
  { name: 'Headlight restoration', price: 95, desc: 'Yellowed lenses sanded, polished and sealed.' },
  { name: '6-month paint protection', price: 50, desc: 'Upgrades the Full Detail sealant to about six months.', includedIn: 'Deep Reset' },
  { name: 'Windshield ceramic coating', price: 95, desc: 'Rain beads up and blows off the glass at speed.' },
  { name: 'One-step polish', price: 165, desc: 'Machine polish that takes out light swirls and brings back gloss.' },
];

export type CeramicTier = { id: string; name: string; prices: PriceRow; prep: string; bestFor: string; featured?: boolean };

export const CERAMIC: CeramicTier[] = [
  { id: 'bronze', name: 'Bronze', prices: [750, 850, 895, 950], prep: 'Paint enhancement polish', bestFor: 'Newer cars with paint in good shape' },
  { id: 'silver', name: 'Silver', prices: [850, 950, 995, 1050], prep: 'One-step paint correction', bestFor: 'Most cars: light swirls and wash marks removed first', featured: true },
  { id: 'gold', name: 'Gold', prices: [1250, 1400, 1550, 1550], prep: 'Two-step paint correction', bestFor: 'Dark, swirled or neglected paint, or a show-level finish' },
];

export const CERAMIC_ADDONS: Addon[] = [
  { name: 'Interior ceramic coating', price: 150, desc: 'Fabric and leather protection that makes spills easier to clean.' },
  { name: 'All windows ceramic coating', price: 150, desc: 'Every window coated so rain and grime sheet off.' },
];

export const from = (row: PriceRow) => Math.min(...row);
export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
