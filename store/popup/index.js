import {
    defineStore
} from 'pinia'

import {
    axiosGet,
    axiosPost
} from '../../composables/useAxios'

export const usePopup = defineStore('popup', {
    // a function that returns a fresh state
    state: () => ({
        msg: {},
        isError: false,
        time: null
    }),

    actions: {
        setPopup(msg, isError) {
            this.time = new Date()
            this.msg = msg
            this.isError = isError
        }
    },
})
