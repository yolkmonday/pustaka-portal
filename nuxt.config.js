// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      script: [{
          src: "https://kit.fontawesome.com/70e13c3477.js"
        },

      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  ssr: true,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/select2.css',
    '~/assets/css/vue-json.css',
    '~/assets/css/final-modal.css',

  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
      apiKey: process.env.API_KEY,
      siteKey: process.env.CAPTCHA_SITE_KEY,
      secretKey: process.env.CAPTCHA_SECRET_KEY
    }
  },

  components: [{
    path: '~/components', // will get any components nested in let's say /components/test too
    pathPrefix: false
  }],

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  }
})
