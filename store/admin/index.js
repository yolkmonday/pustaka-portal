import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'


export const useAdmin = defineStore('admin', {
    state: () => ({
        data: [],
        loading: false,
        loadingChange: false,
        errorChange: '',
        error: '',
        message: '',
        response: {
            status: '',
            message: ''
        }
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                this.error = ''
                const res = await axiosGet('/me/detail')
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
        async changePassword(payload) {
            try {
                this.loadingChange = true
                this.errorChange = ''
                const res = await axiosPost('/me/update/password', payload)
                this.loadingChange = false
                this.response = res.data
            } catch (error) {
                this.status = 0
                this.loadingChange = false
                this.errorChange = error
            }
        }
    },
})
