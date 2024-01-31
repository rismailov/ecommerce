import Axios from 'axios'

const axios = Axios.create({
    withXSRFToken: true,
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

export default axios
