import { SITE, type FAQ } from './site';

export const breadcrumbSchema = (items: { label: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', href: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: new URL(it.href, SITE.url).href,
  })),
});

export const faqSchema = (faqs: FAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  path: string;
  minPrice?: number;
  maxPrice?: number;
  image?: string;
  areaServed?: string[];
  offers?: { name: string; description: string; price?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}${opts.path}#service`,
  name: opts.name,
  serviceType: opts.name,
  description: opts.description,
  url: `${SITE.url}${opts.path}`,
  image: opts.image ? `${SITE.url}${opts.image}` : undefined,
  provider: { '@id': `${SITE.url}/#business` },
  areaServed: (opts.areaServed ?? ['Oakland', 'Alameda', 'Berkeley', 'San Leandro', 'Piedmont', 'Emeryville', 'Orinda', 'Walnut Creek']).map((c) => ({ '@type': 'City', name: c })),
  ...(opts.minPrice
    ? {
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: opts.minPrice, maxPrice: opts.maxPrice, priceCurrency: 'USD' },
          availability: 'https://schema.org/InStock',
          url: SITE.booking,
        },
      }
    : {}),
  ...(opts.offers
    ? {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${opts.name} packages`,
          itemListElement: opts.offers.map((o) => ({
            '@type': 'Offer',
            name: o.name,
            description: o.description,
            ...(o.price ? { price: o.price, priceCurrency: 'USD' } : {}),
          })),
        },
      }
    : {}),
});

export const reviewSchema = (reviews: { name: string; text: string }[]) =>
  reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${SITE.url}/#business` },
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: r.text,
    publisher: { '@type': 'Organization', name: 'Google' },
  }));

export const articleSchema = (opts: { title: string; path: string; date: string; image: string; description: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  image: `${SITE.url}${opts.image}`,
  datePublished: opts.date,
  dateModified: opts.date,
  author: { '@type': 'Person', name: SITE.founder, url: `${SITE.url}/about-us/`, jobTitle: 'Founder & Lead Detailer' },
  publisher: { '@id': `${SITE.url}/#business` },
  mainEntityOfPage: `${SITE.url}${opts.path}`,
});
