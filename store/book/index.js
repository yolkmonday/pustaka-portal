import {
    defineStore
} from 'pinia'

import {
    axiosGet
} from '../../composables/useAxios'

export const useBook = defineStore('book', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: ''
    }),

    actions: {
        async getData(collection, query, limit, page) {
            try {
                this.loading = true
                const res = await axiosGet(`/search?c=${collection}&q=${query}&limit=${limit}&page=${page}`)
                this.loading = false
                console.log(res);
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
        }
    },
})
