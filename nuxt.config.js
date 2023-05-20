// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      meta: [{
        name: 'google',
        content: 'notranslate'
      }, {
        name: 'format-detection',
        content: 'telephone=no'
      }, ],
      link: [{
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap"
        }, {
          rel: "preconnect",
          crossorigin: true,
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          crossorigin: true,
          href: "https://fonts.gstatic.com"
        }
      ]
    },
    // pageTransition: {
    //   name: 'page',
    //   mode: 'out-in'
    // }
  },

  ssr: true,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/select2.css',
    '~/assets/css/vue-json.css',
    '~/assets/css/final-modal.css',
    '~/assets/css/bottom-sheet.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-icon'],

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
  },
  // pwa: {
  //   // workbox: {
  //   //   enabled: true
  //   // },
  //   // icon: {
  //   //   /* icon options */
  //   // }
  // }
})
