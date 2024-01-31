import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

export default axios
