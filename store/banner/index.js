import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useBanner = defineStore('banner', {
    // a function that returns a fresh state
    state: () => ({
        data: [{
            img: 'https://www.perpusnas.go.id/_next/image?url=https%3A%2F%2Fbackend.perpusnas.go.id%2Fuploads%2Fbanner%2F1683259481_26c46f1bc76af6172e73.png&w=1920&q=75'
        }],
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
                const res = await axiosGet(`/v1/banner`)
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
    },
})
