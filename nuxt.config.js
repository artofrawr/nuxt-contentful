export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    CONTENTFUL_PREVIEW: process.env.CONTENTFUL_PREVIEW || false,
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE || '',
    CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN || '',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-contentful',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { path: './' }],
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Tailwind Config
  tailwindcss: {
    mode: 'jit',
    configPath: './tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
