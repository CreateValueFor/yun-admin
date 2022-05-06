import axios from "axios";
import qs from 'querystring'
import { BASE_URL } from './host'

const _baseGetRequest = async (path) => {
    const res = await axios.get(BASE_URL + path)
    return res.data;
}

const _basePostRequest = async (path, param) => {
    const res = await axios.post(BASE_URL + path, param)
    return res.data;
}


const getOrderList = async (query) => {
    console.log(query)
    const res = await _baseGetRequest('order?' + qs.stringify(query))
    return res.data;
}


const postDeliveryList = async (date, param) => {
    const res = await _basePostRequest(`order/delivery/${date}`, param)
    return res.data;
}

const postOrderList = async (param) => {
    const res = await _basePostRequest('order', param)
    return res.data;
}

const getProductDetails = async (param) => {
    const res = await _basePostRequest('product', param)
    return res.data;
}

export default {
    getOrderList,
    postOrderList,
    //배송 불러오기
    postDeliveryList,
    getProductDetails,
}