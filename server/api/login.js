import axios from 'axios'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const API_URL = config.public.apiURL
    const SECRET = config.public.secretKey
    const API_KEY = config.public.apiKey

    // check captcha
    const check = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${body.token}`, {}
    )
    if (check.data.success) {
      const login = await axios.post(API_URL + '/auth/client/login', {
        email: body.email,
        password: body.password
      }, {
        headers: {
          "api-key": API_KEY,
          "User-Agent": event.node.req.headers['user-agent'],
        }
      })

      if (login.data.success) {
        setCookie(event, '_mk', login.data.data.token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        })
        setCookie(event, '_md', JSON.stringify(login.data.data), {
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
  } catch (error) {
    console.log(error)
    if (error.response.data) {
      return error.response.data
    } else {
      return error
    }
  }


})
