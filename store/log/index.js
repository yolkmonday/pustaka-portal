import {
    defineStore
} from 'pinia'

import {
    axiosGet
} from '../../composables/useAxios'

export const useLogTrx = defineStore('log', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: ''
    }),

    actions: {
        async getData(payload) {
            try {
                this.loading = true
                const res = await axiosGet('/log/trx/' + payload)
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
        }
    },
})

export const useLogVendor = defineStore('useLogVendor', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: ''
    }),

    actions: {
        async getData(payload) {
            try {
                this.loading = true
                const res = await axiosGet('/log/vendor/' + payload)
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
        }
    },
})

export const useLogWebhook = defineStore('useLogWebhook', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: ''
    }),

    actions: {
        async getData(payload) {
            try {
                this.loading = true
                const res = await axiosGet('/log/webhook/' + payload)
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
        }
    },
})
