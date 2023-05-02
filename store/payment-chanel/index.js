import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const usePaymentChanel = defineStore('paymentChanel', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        lastId: 0,
        loadingAction: false,
        error: '',
        message: '',
        response: {},
        dataDetail: [],
        loadingDetail: false,
        errorDetail: ''
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                const res = await axiosGet('/payment/channel/list')
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
        async getDataPaging(payload) {
            try {
                this.loading = true
                this.error = ''
                const res = await axiosPost('/payment/channel/list', {
                    ...payload,
                    last_id: payload.mode === "next" ? this.lastId : 0
                })
                this.loading = false
                if (res.data.status) {
                    this.lastId = res.data.data.last_id
                    if (payload.mode === "next") {
                        this.data = this.data.concat(res.data.data.data);
                    } else {
                        // mode pertama
                        this.data = res.data.data.data;
                    }
                } else {
                    if (payload.mode !== 'next') {
                        this.data = []
                    }
                    this.error = res.data.error_msg
                }
            } catch (error) {
                this.loading = false
                if (payload.mode !== 'next') {
                    this.data = []
                }
                this.error = error
            }
        },
        async getDetail(id) {
            try {
                this.loadingDetail = true
                const res = await axiosGet('/payment/channel/' + id)
                this.loadingDetail = false
                if (res.data.status) {
                    this.dataDetail = res.data.data
                } else {
                    this.dataDetail = []
                    this.errorDetail = res.data.error_msg
                }
            } catch (error) {
                this.loadingDetail = false
                this.errorDetail = error
            }
        },
        async action(payload) {
            try {
                this.loadingAction = true
                const res = await axiosPost('/payment/channel/action', payload)
                this.loadingAction = false
                this.response = res.data

                if (!payload.id) {
                    window.history.back()
                }
            } catch (error) {
                this.loadingAction = false
                this.error = error
            }
        }
    },
})
