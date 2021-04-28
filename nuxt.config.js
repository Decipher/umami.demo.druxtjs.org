export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'demo.druxtjs.org',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', { id: 'UA-172677199-2' }],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // Custom Search API Lunr module.
    [
      '~/modules/search-api-lunr',
      {
        server: 'druxt',
        index: 'default',
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    // Nuxt.js Lunr.
    [
      '@nuxtjs/lunr-module',
      {
        fields: [
          'title',
          'body',
          'field_ingredients',
          'field_recipe_instruction',
        ],
      },
    ],
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // DruxtJS Site.
    'druxt-site',
    '~/modules/storybook-proxy',
  ],

  auth: {
    redirect: {
      callback: '/callback',
      logout: '/',
    },
    strategies: {
      drupal: {
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.BASE_URL + '/oauth/authorize',
          token: process.env.BASE_URL + '/oauth/token',
          userInfo: process.env.BASE_URL + '/oauth/userinfo'
        },
        clientId: process.env.OAUTH_CLIENT_ID,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: false,
      },
    },
  },

  bootstrapVue: {
    components: ['BBadge', 'BButton', 'BCollapse', 'BImg', 'BLink'],
    componentPlugins: [
      'BreadcrumbPlugin',
      'CardPlugin',
      'FormPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'FormSelectPlugin',
      'FormTextareaPlugin',
      'InputGroupPlugin',
      'LayoutPlugin',
      'ListGroupPlugin',
      'ModalPlugin',
      'NavbarPlugin',
      'SidebarPlugin',
      'SpinnerPlugin',
    ],
  },

  // Druxt Configuration
  druxt: {
    baseUrl: process.env.BASE_URL,
    entity: {
      query: {
        schema: true,
      },
    },
    views: {
      query: {
        bundleFilter: true,
      },
    },
  },

  // Proxy Configuration
  proxy: {
    '/core/profiles/demo_umami/themes/umami/logo.svg': process.env.BASE_URL,
    '/sites/default/files': process.env.BASE_URL,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
    },
  },

  storybook: {},
}
