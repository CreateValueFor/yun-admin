import { BASE_URL } from './host'
import axios from 'axios';

const customer = axios.create({
    baseURL: BASE_URL + 'customer/'
})

customer.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('YUN-TOKEN');
            if (token && token.length > 0) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);



const _baseGetRequest = async (path) => {
    const res = await customer.get(path)
    return res.data;
}

const _basePostRequest = async (path, param) => {
    const res = await customer.post(path, param)
    return res.data;
}

const login = async (loginData) => {

    const res = await _basePostRequest('login', loginData)
    const { accessToken } = res
    localStorage.setItem('YUN-TOKEN', accessToken)
    return res
}

const check = async () => {
    const res = await _baseGetRequest('check')
    return res
}

const getCustomerInfo = async () => {
    const res = await _baseGetRequest('reservation')
    return res;
}

const putReservation = async (reservationData) => {
    const { data } = await customer.put('reservation', reservationData);
    return data;
}

export default {
    login,
    check,
    getCustomerInfo,
    putReservation
}