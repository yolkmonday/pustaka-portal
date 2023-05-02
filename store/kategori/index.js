import {
    defineStore
} from 'pinia'
import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'


export const useKategori = defineStore('kategori', {
    // a function that returns a fresh state
    state: () => ({
        data: [],
        loading: false,
        loadingUpdate: false,
        error: '',
        message: '',
        response: {}
    }),

    actions: {
        async getData() {
            try {
                this.loading = true
                const res = await axiosGet('/kategori/list')
                this.loading = false
                if (res.data.status) {
                    this.data = res.data.data
                } else {
                    this.data = []
                    this.error = res.data.error_msg
                }
            } catch (error) {
                this.error = error
            }
        },
        async update() {
            try {
                this.loadingUpdate = true
                const res = await axiosPost('/kategori/update', payload)
                this.loadingUpdate = false
                this.response = res.data

            } catch (error) {
                this.loadingUpdate = false
            }
        }
    },
})
