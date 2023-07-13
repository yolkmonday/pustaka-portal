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
        },

      ],
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
  modules: ['@pinia/nuxt', 'nuxt-icon','@vite-pwa/nuxt'],

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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Main Lib',
      short_name: 'Main Lib',
      theme_color: '#ffffff',
      icons: [
       {
      "src": "/icon.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/icon.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
