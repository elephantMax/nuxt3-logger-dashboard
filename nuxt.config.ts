// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
    checker: true,
  },
  colorMode: {
    preference: 'light',
  },
  components: {
    dirs: [
      {
        path: '~/widgets',
        pathPrefix: false,
      },
      {
        path: '~/features',
        pathPrefix: false,
      },
      {
        path: '~/entities',
        pathPrefix: false,
      },
      {
        path: '~/shared',
        pathPrefix: false,
      },
    ],
  },
  css: ['~/assets/css/index.css'],
  ssr: false,
  srcDir: 'src/',
  alias: {
    widgets: fileURLToPath(new URL('./widgets', import.meta.url)),
    features: fileURLToPath(new URL('./features', import.meta.url)),
    entities: fileURLToPath(new URL('./entities', import.meta.url)),
    shared: fileURLToPath(new URL('./shared', import.meta.url)),
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
    },
    vueI18n: 'src/i18n.config.ts',
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'ru',
        name: 'Русский',
      },
    ],
  },
  routeRules: {
    '/': {
      redirect: '/login',
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_API_BASE_URL,
    },
  },
  imports: {
    dirs: [
      'shared/composables/**',
    ],
  },

});
