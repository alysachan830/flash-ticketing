export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'flash_ticketing',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        rel: 'stylesheet',
      },
    ],
    // metaInfo: {
    //   link: [
    //     {
    //       rel: 'stylesheet',
    //       href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    //     },
    //   ],
    // },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/stylesheets/all.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~plugins/ckeditor.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: {
    dirs: ['~/components', '~/components/admin', '~/components/user'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    proxy: true,
  },
  proxy: {
    '/api': {
      target: 'https://vue3-course-api.hexschool.io', //'http://example.com',
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: process.env.PORT || 3000,
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
    apiPath: process.env.API_PATH,
  },
  // privateRuntimeConfig: {
  //   apiBaseUrl: process.env.API_BASE_URL,
  //   apiPath: process.env.API_PATH
  // }
}
