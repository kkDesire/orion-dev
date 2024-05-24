// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
  modules: ['nuxt-auth-utils', '@nuxthub/core'],
  hub: {
    database: true,
  },
})
