import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useSiklus = defineStore('siklus', {
    // a function that returns a fresh state

    // siklus kasih kode siklues di depan qr nya, contoh
    // siklus@nfeun0i34n01ni13bv0i1bvb10v
    state: () => ({
        data: {},
        mode: '', //siklus, koleksi
        loading: false,
        error: '',
    }),

    actions: {
        async checkSiklus() {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/siklus/check`)
                this.loading = false
                return res.data
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
        async masuk(code) {
            try {
                this.loading = true
                const res = await axiosPost(`/v1/siklus/validasi`, {
                    text: code
                })
                this.loading = false
                return res.data
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
    },
})
