import axios from "axios";
import { Mutex } from "async-mutex";
const mutex = new Mutex();
const instance = axios.create({
    baseURL: 'https://webbansach-backend.onrender.com/',
    withCredentials: true,
});
instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
// Add a request interceptor

const handleRefreshToken = async () => {
    // const res = await instance.get('/api/v1/auth/refresh');
    // if (res && res.data) return res.data.access_token;
    // else null;
    // đoạn code này là để cho các request api chạy lần lượt , không cho chạy song song 
    return await mutex.runExclusive(async () => {
        const res = await instance.get('api/v1/auth/refresh');
        if (res && res.data) return res.data.data.access_token;
        else return null;
    });
}
const NO_RETRY_HEADER = 'x-no-retry'

instance.interceptors.request.use(function (config) {
    if (
        typeof window !== "undefined" &&
        window &&
        window.localStorage &&
        window.localStorage.getItem("access_token")
    ) {
        config.headers.Authorization =
            "Bearer " + window.localStorage.getItem("access_token");
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const access_token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token)
            return instance.request(error.config);
        }
    }

    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url === 'api/v1/auth/refresh'
    ) {
        if (
            window.location.pathname !== '/'
            && !window.location.pathname.startsWith('/book')
        ) {
            window.location.href = '/login';
        }
    }
    return error?.response?.data ?? Promise.reject(error);
});
export default instance;