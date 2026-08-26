import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jnwdetailing.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  redirects: {
    '/paint-correction-2/': '/paint-correction/',
    '/location/': '/service-areas/',
    '/cart-detailing/': '/services/',
    '/homepage-1/': '/',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) => !/\/(thank-you|404|paint-correction-2|location|cart-detailing|homepage-1)\/?$/.test(page),
      serialize(item) {
        // Priority: home > money pages > areas > blog > legal
        const u = item.url;
        if (u === 'https://jnwdetailing.com/') item.priority = 1.0;
        else if (/ceramic-coating|paint-correction|interior-auto|exterior-auto|services\/$/.test(u)) item.priority = 0.9;
        else if (/auto-detailing-.*-ca|service-areas/.test(u)) item.priority = 0.8;
        else if (/privacy|terms/.test(u)) item.priority = 0.2;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],
});
