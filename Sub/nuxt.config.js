export default {
  ssr: false,
  env: {
    version: 'Avengers: Endgame',
    dev: process.env.NODE_ENV !== 'production'
  },
  globalName: 'ecom',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  router: {
    mode: 'hash',
    middleware: ['withBootstrap', 'withLegalHelper']
    /*
  ** Headers of the page
  */
  },
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    title: 'PCH Shopping',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      process.env.NODE_ENV !== 'production' && { src: '/js/spectrum.js' },
      process.env.NODE_ENV !== 'production' && { src: '/js/display_ads_examples.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fafafa' },
  /*
  ** Global CSS
  */
  css: ['~/assets/styling/main.scss', '~/vendors/animate.min.css'],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/dismissible.js', mode: 'client' },
    { src: '~/plugins/injectHelperMethods.js', mode: 'client' },
    { src: '~/plugins/matchMedia.js', mode: 'client' },
    { src: '~/plugins/registerAppEvents.js', mode: 'client' },
    { src: '~/plugins/ripple.js', mode: 'client' },
    { src: '~/plugins/ui.js', mode: 'client' },
    { src: '~/plugins/vueAwesomeSwiper.js', mode: 'client' },
    '~/plugins/axios.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/global-components'
    // '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-polyfill'
  ],
  polyfill: {
    features: [
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window
      }
    ]
  },
  /**
   ** https://www.npmjs.com/package/@nuxtjs/style-resources
   */
  styleResources: {
    scss: ['~/assets/styling/mixins.scss']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[local]_[hash:base64:6]'
        }
      }
    }
  },
  hooks: {
    generate: {
      page (b) {
        b.html = b.html.replace(/<\/body>/, '<div id="scriptContainer"></div></body>')
        return b
      }
    }
  }
}
