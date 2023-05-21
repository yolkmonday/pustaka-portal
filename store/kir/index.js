import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useKir = defineStore('kir', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: '',
        detail: {},
        response: {},
        loadingWishlist: false,

    }),

    actions: {
        async bookDetail(biblio_id) {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/kir/${biblio_id}`)
                this.loading = false
                return res.data
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
    },
})
