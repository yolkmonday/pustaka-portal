import {
  defineStore
} from 'pinia'

import {
  axiosGet,
  axiosPost
} from '../../composables/useAxios'

export const useMerchant = defineStore('merchant', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    lastId: 0,
    loading: false,
    error: '',
    message: '',
    detail: {}
  }),

  actions: {
    async getData(payload) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/merchant/list', {
          ...payload,
          last_id: payload.mode === "next" ? this.lastId : 0
        })
        this.loading = false
        if (res.data.status) {
          this.lastId = res.data.data.last_id
          if (payload.mode === "next") {
            this.data = this.data.concat(res.data.data.data);
          } else {
            // mode pertama
            this.data = res.data.data.data;
          }
        } else {
          if (payload.mode !== 'next') {
            this.data = []
          }
          this.error = res.data.error_msg
        }
      } catch (error) {
        this.loading = false
        if (payload.mode !== 'next') {
          this.data = []
        }
        this.error = error
      }
    },
    async getDetail(id) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/merchant/detail', {
          merchant_id: id
        })
        this.loading = false
        if (res.data.status) {
          this.detail = res.data.data
        } else {
          this.error = res.data.error_msg
        }
      } catch (error) {
        this.loading = false
        this.error = error
      }
    }
  },
})
