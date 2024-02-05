import Axios, { AxiosResponse } from 'axios'

const axios = Axios.create({
    withXSRFToken: true,
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

axios.interceptors.response.use(
    async (response: AxiosResponse) => response.data,
)

export default axios
