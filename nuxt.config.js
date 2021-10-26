export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'flash_ticketing',
    htmlAttrs: {
      lang: 'zh-Hant-HK',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Flash Ticketing 是以出售香港藝文節目票劵為主的平台，致力以方便可靠的票務功能，為大眾提供及推廣本地各種文化活動。',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/stylesheets/all.scss'],
  loading: '~/components/LoadingBar.vue',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/cookie.js' },
    { src: '~plugins/bus.js' },
    { src: '~plugins/vue-loading.js', ssr: false },
    { src: '~plugins/v-calendar.js', ssr: false },
    { src: '~plugins/ckeditor.js', ssr: false },
    { src: '~plugins/myFavourite.js', ssr: false },
    { src: '~plugins/sweetAlert.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

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
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    proxy: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Add exception
    transpile: ['vee-validate/dist/rules'],
  },
  server: {
    port: process.env.PORT || 3000,
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
    apiPath: process.env.API_PATH,
  },
}
