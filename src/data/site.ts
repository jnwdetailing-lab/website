// ---------------------------------------------------------------------------
// Single source of truth for NAP, services, areas, reviews, FAQs.
// Every page and every JSON-LD block reads from here so nothing drifts.
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'J&W Mobile Detailing',
  legalName: 'J&W Mobile Detailing – Ceramic Coating & Paint Correction',
  url: 'https://jnwdetailing.com',
  tagline: 'Oakland Mobile Detailing & Ceramic Coating',
  phone: '510-756-4995',
  phoneE164: '+15107564995',
  phoneDisplay: '(510) 756-4995',
  email: 'jnwdetailing@gmail.com',
  booking: 'https://jnwdetail.fieldd.co/',
  founder: 'Jalil Wren',
  founded: '2022',
  address: {
    street: '2127 23rd Ave',
    city: 'Oakland',
    region: 'CA',
    zip: '94606',
    country: 'US',
  },
  geo: { lat: 37.7895, lng: -122.2347 },
  hours: { open: '08:00', close: '20:00', label: 'Mon – Sun · 8:00 AM – 8:00 PM' },
  rating: { value: 4.9, count: 223 },
  stats: { reviews: '220+', customers: '1,000+', since: '2022', cities: '8+' },
  social: {
    instagram: 'https://www.instagram.com/jnwdetail/',
    facebook: 'https://www.facebook.com/jnwdetail/',
    yelp: 'https://www.yelp.com/biz/j-and-w-mobile-detailing-oakland-3',
    nextdoor: 'https://nextdoor.com/pages/jw-mobile-detailing-oakland-ca/',
    google: 'https://g.page/r/CZci0PNb56snEBM/',
    googleReview: 'https://g.page/r/CZci0PNb56snEBM/review',
    maps: 'https://maps.app.goo.gl/WDyZbLKVoXMR8HTt7',
  },
  ogImage: '/images/og-default.jpg',
};

// ---------------------------------------------------------------------------
// CTA — single source of truth for every call-to-action on the site.
//
// Lead capture first: every primary button points at the on-page #quote form
// so we get a name and a number BEFORE anyone sees a price list. The fieldd
// booking portal is kept only as a low-key secondary link for the minority who
// want to self-serve into the calendar.
//
// Change `label` here and every button on every page changes with it.
// ---------------------------------------------------------------------------
export const CTA = {
  label: 'Get Quote Now',
  short: 'Get Quote',
  href: '#quote',
  /** Use on pages that have no #quote section of their own (404, thank-you). */
  hrefHome: '/#quote',
  bookLabel: 'or book instantly online',
};

// ---------------------------------------------------------------------------
// Which form engine the #quote sections render.
//
//   'native' — the built-in QuoteForm, posting to Netlify Forms.
//   'ghl'    — the GoHighLevel embed in src/components/GhlForm.astro.
//
// Switch to 'ghl' only AFTER pasting the embed into GhlForm.astro, so the site
// never renders an empty form. Changing this one value swaps the form on all
// 20 pages that render it.
// ---------------------------------------------------------------------------
export const FORM_PROVIDER: 'native' | 'ghl' = 'ghl';

export type NavItem = { label: string; href: string; children?: NavItem[] };

// Google map shown on the home page. To use your Business Profile pin instead of
// the street address: Google Maps, find your business, Share, "Embed a map", then
// copy the src="..." URL out of the iframe code and paste it here.
export const GOOGLE_MAP_EMBED =
  'https://www.google.com/maps?q=2127+23rd+Ave,+Oakland,+CA+94606&output=embed&z=14';

// BBB seal. Get these from your BBB business profile ("Get the Seal"): the link to
// your profile, and the seal image URL BBB gives you. Both must be filled in or the
// seal is not rendered, so nothing claims an accreditation that is not verifiable.
export const BBB = {
  profileUrl: '',
  sealImage: '',
};

export const NAV: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Interior Detailing', href: '/interior-auto-detailing-oakland-california/' },
      { label: 'Exterior Detailing', href: '/exterior-auto-detailing-oakland-california/' },
      { label: 'Paint Correction', href: '/paint-correction/' },
      { label: 'Ceramic Coating', href: '/ceramic-coating/' },
      { label: 'Odor Removal', href: '/odor-removal-oakland/' },
      { label: 'RV Wash & Detailing', href: '/rv-wash-and-rv-detailing-oakland-california/' },
    ],
  },
  { label: 'Ceramic Coating', href: '/ceramic-coating/' },
  { label: 'Reviews', href: '/reviews/' },
  {
    label: 'Service Areas',
    href: '/service-areas/',
    children: [
      { label: 'Alameda', href: '/auto-detailing-alameda-ca/' },
      { label: 'Berkeley', href: '/auto-detailing-berkeley-ca/' },
      { label: 'Emeryville', href: '/auto-detailing-emeryville-ca/' },
      { label: 'Piedmont', href: '/auto-detailing-piedmont-ca/' },
      { label: 'San Leandro', href: '/auto-detailing-san-leandro-ca/' },
      { label: 'Orinda', href: '/auto-detailing-orinda-ca/' },
      { label: 'Walnut Creek', href: '/auto-detailing-walnut-creek-ca/' },
      { label: 'All areas', href: '/service-areas/' },
    ],
  },
  { label: 'About', href: '/about-us/' },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  menuName: string;
  image: string;
  alt: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    slug: '/interior-auto-detailing-oakland-california/',
    name: 'Interior Detailing',
    menuName: 'Interior Deep Clean',
    short:
      'Full vacuum, steam cleaning, shampoo, stain & odor removal, leather conditioning. Your cabin reset to like-new.',
    image: '/images/interior-detailing-steam-cleaning-oakland.jpg',
    alt: 'Jalil steam cleaning a car interior during a mobile interior detail in Oakland, CA',
    icon: 'seat',
  },
  {
    slug: '/exterior-auto-detailing-oakland-california/',
    name: 'Exterior Detailing',
    menuName: 'Exterior Detail',
    short:
      'Two-bucket hand wash, clay bar decontamination, wheels & tires, then wax or sealant. Shine that lasts months, not days.',
    image: '/images/exterior-detailing-oakland.jpg',
    alt: 'Foam pre-soak on a white sedan during a mobile exterior detail in Oakland',
    icon: 'wash',
  },
  {
    slug: '/paint-correction/',
    name: 'Paint Correction',
    menuName: 'Paint Correction',
    short:
      'Machine polishing that removes swirl marks, scratches and oxidation. One-step or two-step. The right prep before any coating.',
    image: '/images/paint-correction-polishing-oakland.jpg',
    alt: 'Dual-action polisher removing swirl marks during paint correction in Oakland, CA',
    icon: 'polish',
  },
  {
    slug: '/ceramic-coating/',
    name: 'Ceramic Coating',
    menuName: 'Ceramic Coating',
    short:
      'Multi-year, hydrophobic protection bonded to your paint. Includes prep, decontamination and correction, applied in your driveway.',
    image: '/images/ceramic-coating-oakland.jpg',
    alt: 'Ceramic coating being poured onto an applicator before application in Oakland',
    icon: 'shield',
  },
  {
    slug: '/odor-removal-oakland/',
    name: 'Odor Removal',
    menuName: 'Ozone Odor Removal',
    short:
      'Ozone treatment that destroys smoke, pet, mildew and food odors at the source, not an air freshener that masks them.',
    image: '/images/odor-removal-oakland.jpg',
    alt: 'Ozone generator running inside a vehicle for odor removal in Oakland',
    icon: 'wind',
  },
  {
    slug: '/rv-wash-and-rv-detailing-oakland-california/',
    name: 'RV Wash & Detailing',
    menuName: 'RV Wash & Wax',
    short:
      'Motorhomes, travel trailers, fifth wheels & campers washed, de-bugged, oxidation-treated and waxed wherever they are parked.',
    image: '/images/rv-wash-wax-oakland.jpg',
    alt: 'Technician washing the roof line of a motorhome during mobile RV detailing in Oakland',
    icon: 'rv',
  },
];

export const ADDONS = [
  { name: 'Headlight Restoration', desc: 'Sand, polish and re-seal yellowed, hazy lenses for clear light output and a newer look.' },
  { name: 'Engine Bay Cleaning', desc: 'Safe degrease, rinse and dressing of the engine compartment.' },
  { name: 'Trim Restoration', desc: 'Brings faded, chalky black plastic trim and bumpers back to deep black.' },
  { name: 'Pet Hair Removal', desc: 'Dedicated tools and extra time for embedded pet hair in carpet and upholstery.' },
  { name: 'Ozone Odor Treatment', desc: 'Neutralizes smoke, pet, mildew and food odors at the source.' },
  { name: 'Windows & Rims Coating', desc: 'Extend ceramic protection to glass and wheels for easier cleaning.' },
];

export type Area = {
  slug: string;
  city: string;
  blurb: string;
  neighborhoods: string[];
  hasPage: boolean;
};

export const AREAS: Area[] = [
  { slug: '/', city: 'Oakland', hasPage: true, neighborhoods: ['Rockridge', 'Temescal', 'Fruitvale', 'Lake Merritt', 'Montclair', 'Jack London Square', 'Oakland Hills', 'Dimond'], blurb: 'Our home base. Daily drivers in Rockridge, family SUVs in Montclair, fleet vans near the Port — we cover every neighborhood.' },
  { slug: '/auto-detailing-alameda-ca/', city: 'Alameda', hasPage: true, neighborhoods: ['Bay Farm Island', 'Gold Coast', 'Park Street', 'Alameda Point', 'South Shore'], blurb: 'Island living means salt air on your paint year-round. Decontamination and sealant matter more here than almost anywhere.' },
  { slug: '/auto-detailing-berkeley-ca/', city: 'Berkeley', hasPage: true, neighborhoods: ['Elmwood', 'North Berkeley', 'Claremont', 'Berkeley Hills', 'West Berkeley', 'Downtown'], blurb: 'Tree-lined streets, tight parking and street sweeping schedules. We work around all of it — curbside or in your driveway.' },
  { slug: '/auto-detailing-walnut-creek-ca/', city: 'Walnut Creek', hasPage: true, neighborhoods: ['Rossmoor', 'Northgate', 'Downtown', 'Saranap', 'Walnut Heights'], blurb: 'Inland heat bakes interiors and fades paint fast. Ceramic coating and interior conditioning are our most-booked services here.' },
  { slug: '/auto-detailing-san-leandro-ca/', city: 'San Leandro', hasPage: true, neighborhoods: ['Bay-O-Vista', 'Washington Manor', 'Estudillo Estates', 'Marina Faire'], blurb: 'A quick hop down 880 from our base — same-week appointments are usually available.' },
  { slug: '/auto-detailing-piedmont-ca/', city: 'Piedmont', hasPage: true, neighborhoods: ['Piedmont Hills', 'Baja Piedmont', 'Upper Piedmont'], blurb: 'Multi-car households and ceramic coatings for newer vehicles — we book recurring maintenance details here often.' },
  { slug: '/auto-detailing-emeryville-ca/', city: 'Emeryville', hasPage: true, neighborhoods: ['Watergate', 'Bay Street', 'Park Avenue District'], blurb: 'Condo garages and office parking lots are no problem — we bring our own water and power.' },
  { slug: '/auto-detailing-orinda-ca/', city: 'Orinda', hasPage: true, neighborhoods: ['Orinda Village', 'Sleepy Hollow', 'Orinda Downs', 'Glorietta'], blurb: 'Through the Caldecott and up the hill. Driveway details, coatings and RV washes for the Lamorinda side.' },
];

export type Review = { name: string; text: string; service?: string; source: 'Google'; date?: string; city?: string };

// Verbatim Google reviews shown on jnwdetailing.com (Trustindex widget) and Trustindex profile.
export const REVIEWS: Review[] = [
  { name: 'Luis Carranza', source: 'Google', service: 'Interior + Exterior + Ceramic', text: 'I was looking for a detail on short notice, I came across J&W because of their rating and reached out. Scheduling an appointment was super easy through their site on my phone. Jalil came out and handled business on a blazing hot day. My car looks amazing and super glossy. I went with an interior and exterior detail plus ceramic coat. I am very happy with the results!!' },
  { name: 'Mathew Quintanilla', source: 'Google', service: 'Paint Correction', text: 'Jalil did an amazing job on my car, he was very detailed and brought my paint back — it looks like a brand new car! There were a bunch of swirls in the paint and he took them right out. Thanks for the great service!' },
  { name: 'Lorie Curtis', source: 'Google', service: 'Full Detail', text: 'Jalil and his team did a fantastic job! He contacted and scheduled me quickly for a time that accommodated my busy work week schedule, was friendly, professional, and communicative, and left my car sparkling and spotless inside and out. Thank you, Jalil!' },
  { name: 'Roo Sczesnak', source: 'Google', service: 'Mobile Detail', text: "You can stop looking — this is the shop you want. They come to you, they don't need a power hookup or water hookup, and they do a great job!" },
  { name: 'Necole Miller', source: 'Google', service: 'Full Detail', text: 'Great price for a full inside and out detail. Arrived on time and the car looks better than ever. I’ll definitely be rebooking.' },
  { name: 'Tommy', source: 'Google', service: 'Diamond Reset', text: 'Not only does Jalil do amazing work, he is a consummate professional and easy to work with. Highly recommend J&W and their Diamond service!' },
  { name: 'David Dent', source: 'Google', service: 'Full Detail', text: "What an amazing job he did on my wife's new car. Couldn't be happier. Already scheduled an appointment for him to do my truck next month. GREAT JOB!" },
  { name: 'Jamie Badgett', source: 'Google', service: 'Ceramic Coating', date: 'Aug 2026', text: 'Just got my car about 2 weeks ago and wanted a ceramic coating… paint was really brought to life.' },
  { name: 'Dane Tikunoff', source: 'Google', service: 'Engine Bay', date: 'Aug 2026', text: 'Engine bay had never been cleaned before and looked brand new afterward. I highly recommend J&W!' },
  { name: 'Anthony Mikell', source: 'Google', service: 'Ceramic Coating', date: 'Aug 2026', text: 'Jalil explained the process… impressed by his attention to detail… very pleased at the finish.' },
  { name: 'Ajinder Plahey', source: 'Google', text: 'Very communicative, great work! Definitely hiring again.' },
  { name: 'Faridha Adhan', source: 'Google', text: 'Jalil was very friendly and he did an amazing job on my car. I will continue to use him.' },
];

export type FAQ = { q: string; a: string };

export const HOME_FAQS: FAQ[] = [
  { q: 'How much does mobile car detailing cost in Oakland?', a: 'Every vehicle is quoted individually. Size, condition and the service you want all move the number, so a blanket price list would only mislead you. Tell us what you drive and Jalil sends your price personally, usually within the hour during business hours. No deposit, and you approve the price before anything is booked.' },
  { q: 'Do you really come to me? What do I need to provide?', a: 'Yes, we are 100% mobile across Oakland and the East Bay. Our van is fully self-contained with its own water and power. All you need is a parking spot with enough room to open the doors and work around the vehicle: a driveway, a flat legal curb spot, or a roomy garage stall.' },
  { q: 'How long does a detail take?', a: 'An exterior detail takes about 1.5–3 hours, an interior deep clean 2–4 hours, and a full detail 3–7 hours depending on vehicle size and condition. Ceramic coating with paint correction is typically a full-day appointment.' },
  { q: 'What areas do you serve?', a: 'We serve Oakland, Alameda, Berkeley, San Leandro, Piedmont, Emeryville, Orinda, Walnut Creek and nearby East Bay communities. If you are just outside that list, call us — we can usually make it work.' },
  { q: 'How do I book?', a: 'Fill in the quote form on this page. Name, phone and what you drive, about 30 seconds. Jalil sends back a price personally, usually within the hour during business hours, and you pick a time from there. No deposit, and you inspect the work before you pay. Prefer to talk? Call or text (510) 756-4995. Same-week appointments are often available.' },
  { q: 'How long does a ceramic coating last?', a: 'Our coatings are built to last around three years with proper hand-wash maintenance. Every coating is quoted after we see the vehicle, because the price covers full prep — decontamination and paint correction — not just the coating itself, and how much correction your paint needs is the variable. Send us your vehicle and we will come back with an exact number.' },
];

export const GALLERY = [
  { src: '/images/interior-detailing-oakland-before.jpg', alt: 'Before: stained cloth seat in a sedan prior to interior detailing in Oakland', label: 'Interior before', w: 1080, h: 1080 },
  { src: '/images/interior-detailing-oakland-after.jpg', alt: 'After: the same seat shampooed and steam cleaned by J&W Mobile Detailing', label: 'Interior after', w: 1080, h: 1080 },
  { src: '/images/interior-detailing-steam-cleaning-oakland.jpg', alt: 'Jalil steam cleaning a rear seat during a mobile interior detail', label: 'Steam cleaning', w: 1080, h: 1080 },
  { src: '/images/exterior-detailing-oakland.jpg', alt: 'Foam pre-soak on a white sedan during a mobile exterior detail', label: 'Foam pre-soak', w: 1080, h: 1080 },
  { src: '/images/paint-correction-polishing-oakland.jpg', alt: 'Machine polishing a hood during paint correction', label: 'Paint correction', w: 1080, h: 1080 },
  { src: '/images/paint-correction-oakland.jpg', alt: 'Swirl marks visible under inspection light before paint correction', label: 'Swirl inspection', w: 1080, h: 1080 },
  { src: '/images/ceramic-coating-oakland.jpg', alt: 'Ceramic coating poured onto an applicator pad', label: 'Ceramic coating', w: 1080, h: 1080 },
  { src: '/images/work-1.jpg', alt: 'Black sedan freshly ceramic coated in an Oakland driveway by J&W Mobile Detailing', label: 'Ceramic coated sedan', w: 1376, h: 768 },
  { src: '/images/work-2.jpg', alt: 'Jalil applying ceramic coating to a black sedan at a customer home', label: 'Coating application', w: 1376, h: 768 },
  { src: '/images/odor-removal-oakland.jpg', alt: 'Ozone generator running for odor removal treatment', label: 'Ozone odor removal', w: 1080, h: 1080 },
  { src: '/images/rv-wash-wax-oakland.jpg', alt: 'Washing the roof line of a motorhome', label: 'RV wash & wax', w: 1080, h: 1080 },
  { src: '/images/jalil-owner-jw-mobile-detailing-oakland.jpg', alt: 'Jalil Wren, owner of J&W Mobile Detailing, detailing a steering wheel', label: 'Owner-operated', w: 1080, h: 1080 },
];
