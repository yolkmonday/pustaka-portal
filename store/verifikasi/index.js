import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const useVerifikasi = defineStore('verifikasi', {
    // a function that returns a fresh state
    state: () => ({
        data: {},
        mode: '', //siklus, koleksi
        loading: false,
        error: '',
    }),

    actions: {
        async sendOTP() {
            try {
                this.loading = true
                const res = await axiosGet(`/v1/send-otp`)
                this.loading = false
                if (res.data.success) {
                    return res.data
                } else {
                    this.data = []
                    this.error = res.data.message
                }
            } catch (error) {
                this.loading = false
                this.error = error
            }
        },
        async verifOTP(OTP) {
            try {
                this.loading = true
                const res = await axiosPost(`/v1/verifikasi-wa`, {
                    otp: OTP
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
