import { BASE_URL } from './host'
import axios from 'axios';

const customer = axios.create({
    // baseURL: BASE_URL + 'customer/'
    baseURL: BASE_URL
})

const admin = axios.create({
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

admin.interceptors.request.use(
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
const getCustomerInfoAdmin = async (id) => {
    const { data } = await admin.get(`admin/reservation/${id}`)
    return data;
}

const getHolidaysAdmin = async (id) => {
    const { data } = await admin.get(`admin/holiday/${id}`);
    return data;
}

const putReservationAdmin = async (reservationData, id) => {
    const { data } = await admin.put(`admin/reservation/${id}`, reservationData);
    return data;
}
const putReservation = async (reservationData) => {
    const { data } = await customer.put('reservation', reservationData);
    return data;
}

const getCompose = async () => {
    const { data } = await customer.get('compose')
    const ingredients = data.data.ingredients.map(item => item.name);
    const products = data.data.products.map(item => item.name);
    return [ingredients, products];
}

const getExcludes = async () => {
    const { data } = await customer.get('exclude');
    return {
        excludeIngredients: data.data.ingredients.map(item => item.name),
        excludeProducts: data.data.products.map(item => item.name)
    }
}

const patchCarboType = async (carboType) => {
    const { data } = await customer.patch('carboType', { carboType });
    return data;
}

const putExcludes = async (excludeData) => {
    const { data } = await customer.put("exclude", excludeData);
    return data
}

const postDelivery = async (deliveryData) => {
    const { data } = await customer.post('delivery', deliveryData);
    return data
}

const getHolidays = async () => {
    const { data } = await customer.get('holiday');
    return data;
}

export default {
    login,
    check,
    getCustomerInfo,
    putReservation,
    getCompose,
    getExcludes,
    patchCarboType,
    putExcludes,
    postDelivery,
    getHolidays,
    //관리자 페이지
    getCustomerInfoAdmin,
    putReservationAdmin,
    getHolidaysAdmin,
}