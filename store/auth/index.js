import {
  defineStore
} from 'pinia'
import axios from 'axios'
export const useAuth = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    token: '',
    data: {},
    loading: false,
    error: '',
    isLogin: false,
    me: {}
  }),

  actions: {
    // async loginAct(payload) {
    //   try {
    //     this.loading = true
    //     this.error = ''
    //     const res = await axios.post("/api/login", payload)
    //     if (res.data.status) {
    //       this.isLogin = true
    //       this.token = res.data.data.jwt.token
    //       this.data = res.data.data.admin
    //       setTimeout(() => {
    //         this.loading = false
    //         window.location = '/'
    //       }, 500);
    //     } else {
    //       this.loading = false
    //       this.error = res.data.error_msg
    //     }
    //   } catch (error) {
    //     this.loading = false
    //     this.error = error

    //   }
    // },
    setToken(data) {
      this.token = data
    },
    setData(data) {
      this.data = data
    },
    setLogin(data) {
      this.isLogin = data
    },
    logout() {
      this.isLogin = false
      this.data = {}
      this.token = {}
      useCookie("isLogin").value = null;
      useCookie("_tpa").value = null;
      window.location = "/login";
    },
    async getMe() {
      try {
        this.loading = true
        const res = await axiosGet(`/v1/me`)
        this.loading = false

        if (res.data.success) {
          this.me = res.data.data
          return res.data.data
        } else {
          this.me = {}
          this.error = res.data.message
        }
      } catch (error) {
        this.loading = false
        this.error = error
      }
    }
  },
})
