import axios from 'axios'
import {
    defineStore
} from 'pinia'

import {
    axiosPost
} from '../../composables/useAxios'

export const useKliring = defineStore('kliring', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        error: '',
        message: '',
        errorDetail: '',
        loadingDetail: false,
        dataDetail: 0
    }),

    actions: {
        async getData(payload) {
            try {
                this.loading = true
                this.error = ''
                const res = await axiosPost('/kliring/list', {
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
        async getDetail(payload) {
            try {
                this.loadingDetail = true
                this.dataDetail = 0
                const res = await axiosPost('/kliring/detail', payload)
                this.loadingDetail = false
                if (res.data.status) {
                    this.dataDetail = res.data.data
                } else {
                    this.dataDetail = 0
                }
            } catch (error) {
                this.loadingDetail = false
                this.errorDetail = error

            }
        }

    },
})
