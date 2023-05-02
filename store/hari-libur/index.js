import {
  defineStore
} from 'pinia'

import {
  axiosGet,
  axiosPost
} from '../../composables/useAxios'

export const useHariLibur = defineStore('hariLibur', {

  state: () => ({
    data: [],
    loading: false,
    error: '',
    message: '',
    loadingAction: false,
    errorAction: '',
    messageAction: ''
  }),

  actions: {
    async getData() {
      try {
        this.loading = true
        this.error = ''
        this.errorAction = ''
        this.messageAction = ''
        const res = await axiosGet('/libur/list')

        this.loading = false
        if (res.data.status) {
          const dt = res.data.data
          if (dt.length) {
            dt.forEach(ev => {
              this.data.push({
                start: ev.tanggal,
                end: ev.tanggal,
                title: ev.deskripsi,
              })
            })
          }
        } else {
          this.data = []
          this.error = res.data.error_msg
        }
      } catch (error) {
        this.loading = false
        this.error = error
      }
    },
    async editData(payload) {
      try {
        this.loadingAction = true
        const res = await axiosPost('/libur/update', payload)
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
    async insertData(payload) {
      try {
        this.loadingAction = true
        const res = await axiosPost('/libur/insert', payload)
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
