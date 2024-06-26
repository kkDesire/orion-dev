// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        dir: 'ltr',
        class: 'scroll-smooth',
      },
    },
  },

  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['nuxt-auth-utils', '@nuxthub/core', '@nuxt/ui', '@nuxt/eslint'],
  runtimeConfig: {
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'grommet-icons'],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  hub: {
    database: true,
  },
})
