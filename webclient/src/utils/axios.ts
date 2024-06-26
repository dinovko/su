import axios from "axios";
import store from "store/store";
import {setLoading} from "features/loading/loadingSlice"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5145/api', 
    // baseURL: 'http://85.159.27.162:81/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config)=>{
        store.dispatch(setLoading(true));
        return config;
    },
    error => {
        store.dispatch(setLoading(false));
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(setLoading(false));
        return response
    },
    error => {
        store.dispatch(setLoading(false));
        if(error?.response?.status == 401) {
            sessionStorage.clear();
            window.location.pathname = '/login'
        } else {
            return Promise.reject(error)
        }
    }
);

export default axiosInstance;