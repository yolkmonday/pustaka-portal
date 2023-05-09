import axios from "axios"

const axiosPost = (url, payload) => {
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
  return instance.post(url, payload)
}


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
  axiosGet,
  axiosPost
}
