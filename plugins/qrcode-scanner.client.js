import QrReader from 'vue3-qr-reader';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(QrReader)
})
