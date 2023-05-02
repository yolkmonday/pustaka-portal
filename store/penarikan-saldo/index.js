import {
  defineStore
} from 'pinia'
import {
  axiosPost
} from '../../composables/useAxios'

export const usePenarikanSaldo = defineStore('penarikan-saldo', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    lastId: 0,
    error: '',
    message: '',
    messageAction: '',
    errorAction: '',
    loadingAction: false
  }),

  actions: {
    async getData(payload) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/penarikan/saldo/list', {
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
    async tarikSaldo(id) {
      try {
        this.loadingAction = true
        this.errorAction = ''
        const res = await axiosGet('/penarikan/saldo/action/' + id)
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
    }
  },
})
