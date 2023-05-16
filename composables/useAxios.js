import axios from "axios"
import {
  useAuth
} from "@/store/auth"

const axiosPost = (url, payload) => {
  const config = useRuntimeConfig()
  const defaultUrl = config.public.apiURL;
  const apiKey = config.public.apiKey;
  const auth = useAuth()
  const instance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        'api-key': apiKey,
        'Authorization': auth.token ? 'Bearer ' + auth.token : '',
      },
    },
    timeout: 120000
  });
  return instance.post(url, payload)
}


const axiosGet = (url) => {
  const config = useRuntimeConfig()
  const defaultUrl = config.public.apiURL;
  const apiKey = config.public.apiKey;
  const auth = useAuth()
  const instance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        'api-key': apiKey,
        'Authorization': auth.token ? 'Bearer ' + auth.token : '',
      },
    },
    timeout: 120000
  });
  return instance.get(url)
}

export {
  axiosGet,
  axiosPost
}
