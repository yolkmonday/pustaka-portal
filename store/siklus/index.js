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
                if (res.data.success) {
                    this.data = res.data.data
                } else {
                    this.data = []
                    this.error = res.data.message
                }
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
    },
})
