import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: 'frontend',

  modules: ['@nuxtjs/google-fonts'],

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components/ui', prefix: '' },
    { path: '~/components/layout', prefix: '' },
    { path: '~/components/commission', prefix: '' },
    { path: '~/components' },
  ],

  build: {
    transpile: ['gsap'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  googleFonts: {
    families: {
      'Playfair Display': [400, 500, 600, 700],
      'Cormorant Garamond': [300, 400, 500, 600, 700],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    preload: true,
  },

  app: {
    head: {
      title: 'Atelier Tenebris — Art Portfolio',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cinematic 2D illustration portfolio — commissions, concept art, and digital painting by Atelier Tenebris.' },
        { name: 'theme-color', content: '#121212' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  routeRules: {
    '/': { redirect: '/landing' },
  },
})
