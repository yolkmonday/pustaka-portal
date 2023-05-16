import {
  useAuth
} from "@/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  const token = useCookie('_paytoken').value
  const data = useCookie('_paydata').value
  const isLogin = useCookie('isLogin').value

  if (!isLogin) {
    return navigateTo('/login')
  }

  if (process.server) {
    auth.setToken(token)
  }

  auth.setData(data)
  auth.setLogin(true)
})
