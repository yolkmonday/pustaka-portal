import {
  VueReCaptcha
} from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const siteKey = config.public.siteKey;
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: siteKey,
    loaderOptions: {
      autoHideBadge: true,
      explicitRenderParameters: {
        badge: 'bottomright',
      },
    },
  });
});
