import {
  defineStore
} from 'pinia'

import {
  axiosGet
} from '../../composables/useAxios'

export const useRekening = defineStore('rekening', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    error: ''
  }),

  actions: {
    async getData(payload) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosGet('/rekening/list/' + payload)
        this.loading = false
        if (res.data.status) {
          this.data = res.data.data
        } else {
          this.data = []
          this.error = res.data.error_msg
        }
      } catch (error) {
        this.loading = false
        this.error = error
      }
    }
  },
})
