import {
  defineStore
} from 'pinia'

import {
  axiosGet,
  axiosPost
} from '../../composables/useAxios'

export const useAuth = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    error: '',
    message: ''
  }),

  actions: {
    async signIn({
      email,
      password
    }) {
      try {
        this.loading = true
        const res = await axiosPost(`/auth/client/login`, {
          email,
          password
        })
        this.loading = false

        this.data = res.data

      } catch (error) {
        this.loading = false
        this.error = error
        return error
      }
    }
  },
})
