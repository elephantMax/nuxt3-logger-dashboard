// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
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
  css: ['~/assets/css/index.css'],
  ssr: false,
});
