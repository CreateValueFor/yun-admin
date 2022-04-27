import axios from "axios";
import qs from 'querystring'

// const BASE_URL = "http://3.35.9.130:3000/"
// const BASE_URL = "./"
const BASE_URL = "http://localhost:3000/"

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