import { routeRedirects } from './config/redirects';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/image',
    '@vercel/analytics',
    '@vercel/speed-insights',
  ],

  devtools: {
    enabled: true,
  },

  css: ['flag-icons/css/flag-icons.min.css', '~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    ...routeRedirects,
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  fonts: {
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        weights: ['100 900'],
        styles: ['normal', 'italic'],
        global: true,
      },
      {
        name: 'Geist',
        provider: 'google',
        weights: ['100 900'],
        global: true,
      },
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: ['100 800'],
        global: true,
      },
      {
        name: 'Roboto',
        provider: 'google',
        weights: ['100 900'],
        global: true,
      },
    ],
  },
});
