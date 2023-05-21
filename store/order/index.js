import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useOrder = defineStore('order', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        detail: {},
        lastId: 0,
        loading: false,
        error: '',
        message: '',
        detail: {},
        response: {},
        loadingWishlist: false,
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/order`)
                this.loading = false

                if (res.data.success) {
                    this.data = res.data.data.data
                    this.data.forEach(b => {
                        b.book = JSON.parse(b.data)
                    })
                    this.lastId = res.data.data.last_id
                } else {
                    this.data = []
                    this.error = res.data.message
                }
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
        async getDetail(order_id) {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/order/${order_id}`)
                this.loading = false
                if (res.data.success) {
                    this.detail = res.data.data
                } else {
                    this.detail = []
                    this.error = res.data.message
                }
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
    },
})
