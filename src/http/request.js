import axios from 'axios'
import router from '../router'

const server = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    // baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
})

server.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token');

    return config
})

server.interceptors.response.use(res => {

    if (res.data.meta.status == 401) {
        sessionStorage.removeItem('token')
        router.push('/login')
    }
    return res
})

export default server