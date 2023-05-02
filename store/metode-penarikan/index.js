import {
    defineStore
} from 'pinia'

import {
    axiosGet, axiosPost
} from '../../composables/useAxios'

export const useMetodePenarikan = defineStore('metodePenarikan', {
    // a function that returns a fresh state
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
                const res = await axiosGet('/metode/list')
                this.loading = false
                if (res.data.status) {
                    this.data = res.data.data
                } else {
                    this.data = []
                    this.error = res.data.error_msg
                }
            } catch (error) {
                this.error = error
            }
        },
        async actionMetodePenarikan(payload) {
            try {
                this.loadingAction = true
                const url = payload.act === "Tambah" ? '/metode/insert' : '/metode/update'
                const res = await axiosPost(url, payload)
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
