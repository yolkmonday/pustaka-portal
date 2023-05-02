
import {
    defineStore
} from 'pinia'

import {
    axiosGet, axiosPost
} from '../../composables/useAxios'

export const useVendor = defineStore('vendor', {

    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: '',
        loadingSaldo: false,
        dataSaldo: {},
        errorSaldo: ''
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                this.error = ''

                const res = await axiosGet('/vendor/list')

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
        },
        async getSaldoVendor(payload) {
            try {
                this.loadingSaldo = true
                this.errorSaldo = ''
                const res = await axiosPost('/vendor/get-saldo-api', payload)
                this.loadingSaldo = false
                if (res.data.status) {
                    this.dataSaldo = res.data.data
                } else {
                    this.errorSaldo = res.data.error_msg
                }
            } catch (error) {
                this.loadingSaldo = false
                this.errorSaldo = error
            }
        }
    },
})
