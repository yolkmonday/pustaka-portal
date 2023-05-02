import {
  defineStore
} from 'pinia'

import {
  axiosPost,
  axiosGet
} from '../../composables/useAxios'

export const useTransaksi = defineStore('transaksi', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    lastId: 0,
    error: '',
    message: '',
    detail: {},
    errorAction: '',
    messageAction: '',
    loadingAction: false,
    errorTrxVendor: '',
    dataTrxVendor: {},
    loadingVendor: false
  }),
  actions: {
    async getData(payload) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/transaksi/list', {
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
        const res = await axiosGet('/transaksi/' + id)
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
    },
    async sendWebhook(payload) {
      try {
        this.loadingAction = true
        const res = await axiosPost('/transaksi/send/webhook', payload)
        this.loadingAction = false
        if (res.data.status) {
          this.messageAction = res.data.message
        } else {
          this.errorAction = res.data.error_msg
        }
      } catch (error) {
        this.loadingAction = false
        this.errorAction = error
      }
    },
    async getTrxVendor(id) {
      try {
        this.loadingVendor = true
        this.errorTrxVendor = ''
        const res = await axiosGet('/transaksi/get-status-vendor/' + id)
        this.loadingVendor = false
        if (res.status === 200) {
          this.dataTrxVendor = res.data
        }
        if (res.data.status === 0) {
          this.errorTrxVendor = res.data.error_msg
        }
      } catch (error) {
        this.loadingVendor = false
        this.errorTrxVendor = error
      }
    },
    async actionTransaksi(payload) {
      try {
        this.loadingAction = true
        const res = await axiosPost('/transaksi/approve', payload)
        this.loadingAction = false
        if (res.data.status) {
          this.messageAction = res.data.message
        } else {
          this.errorAction = res.data.error_msg
        }
      } catch (error) {
        this.loadingAction = false
        this.errorAction = error
      }
    },
  },
})
