import {
  defineNuxtPlugin
} from '#app'

import * as vt from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: "top-center",
    timeout: 1996,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false
  }
  nuxtApp.vueApp.use(vt.default, options);
  return {
    provide: {
      toast: vt.useToast()
    },
  };
});
