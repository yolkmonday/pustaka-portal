import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useBook = defineStore('book', {
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
        async getData(collection, query, limit, page) {
            try {
                this.loading = true
                const res = await axiosGet(`/search?c=${collection}&q=${query}&limit=${limit}&page=${page}`)
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
        async byItemCode(item_code) {
            try {
                this.loading = true
                const res = await axiosGet(`/search/items?q=${item_code}`)
                this.loading = false
                return res.data
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
        bookDetail(data) {
            this.detail = data
        },
        async addToWishlist(wishlist_id, biblio_id, data) {
            try {
                this.loadingWishlist = true
                const res = await axiosPost('/v1/wishlist', {
                    wishlist_id,
                    biblio_id,
                    data: JSON.stringify(data)
                })
                this.loadingWishlist = false
                this.response = res
            } catch (error) {
                this.loadingWishlist = false
                this.response = error.response
            }
        },

    },
})
