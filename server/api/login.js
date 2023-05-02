import axios from 'axios'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const API_URL = config.public.apiURL
  const SECRET = config.public.secretKey
  // check captcha
  const check = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${body.token}`, {}
  )
  if (check.data.success) {
    const login = await axios.post(API_URL + '/auth/login', {
      email: body.email,
      password: body.password
    }, {
      headers: {
        "User-Agent": event.node.req.headers['user-agent'],
      }
    })
    if (login.data.status) {
      setCookie(event, '_tpj', login.data.data.jwt.token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setCookie(event, '_tpa', JSON.stringify(login.data.data.admin), {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setCookie(event, 'isLogin', true, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
    }
    return login.data
  } else {
    return {
      status: 0,
      rc: 403,
      error_msg: 'Captcha tidak valid'
    }
  }
})
