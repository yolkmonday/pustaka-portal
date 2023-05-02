export default defineNuxtPlugin(() => {
  return {
    provide: {
      rupiah: (value) => {
        const val = (value / 1).toFixed(0).replace('.', ',')
        return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      currency: (value) => {
        const val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },

    }
  }
})
