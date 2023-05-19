import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useCart = defineStore('cart', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        lastId: 0,
        loading: false,
        error: '',
        message: '',
        detail: {},
        response: {},
        loadingCart: false,
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/cart`)
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
        async addToCart(item_code, biblio_id) {
            try {
                this.loading = true
                const res = await axiosPost(`/v1/cart`, {
                    "biblio_id": biblio_id,
                    "item_code": item_code
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
