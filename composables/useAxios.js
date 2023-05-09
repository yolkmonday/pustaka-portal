import axios from "axios"

// const axiosPost = (url, payload) => {
//   const config = useRuntimeConfig()
//   const defaultUrl = config.public.apiURL;
//   const auth = useAuth()

//   const instance = axios.create({
//     baseURL: defaultUrl,
//     headers: {
//       common: {
//         'Authorization': auth.token || '',
//       },
//     },
//     timeout: 120000
//   });
//   instance.interceptors.response.use(
//     response => {
//       if (response.data) {
//         if (response.data.rc) {
//           if (response.data.rc === 401 || response.data.rc === 403) {
//             window.location = '/logout'
//           } else {
//             return response
//           }
//         }
//       }
//     }, error => {
//       return error.response
//     }
//   )

//   return instance.post(url, payload)
// }

const axiosGet = (url) => {
  const config = useRuntimeConfig()
  const defaultUrl = config.public.apiURL;
  const apiKey = config.public.apiKey;

  const instance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        'api-key': apiKey,
      },
    },
    timeout: 120000
  });
  return instance.get(url)
}

export {
  axiosGet
}
