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
const _basePutRequest = async (path, param) => {
    const res = await axios.put(BASE_URL + path, param)
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

const getAllProducts = async () => {
    const res = await _baseGetRequest('product');
    return res.data;
}

const getAllIngredients = async () => {
    const res = await _baseGetRequest('product/ingredient');
    return res.data;
}

const putSingleOrder = async (param, orderId) => {
    const res = await _basePutRequest(`order/${orderId}`, param);
    return res;
}
// 식재료 부분
const getIngredientsBySearch = async (keyword) => {
    const res = await _baseGetRequest(`product/ingredient/${keyword}`);
    return res
}
const createIngredient = async (param) => {
    const res = await _basePostRequest('product/ingredient', param);
    return res;
}
const createProduct = async (name) => {
    const res = await _basePostRequest(`product/${name}`);
    return res;
}

const createProductIngredient = async (param) => {
    const res = await _basePutRequest('product', param);
    return res;
}


export default {
    getOrderList,
    postOrderList,
    //배송 불러오기
    postDeliveryList,
    getProductDetails,
    getAllProducts,
    getAllIngredients,
    putSingleOrder,
    //식재료 
    getIngredientsBySearch,
    createIngredient,
    createProduct,
    //제품 세트 추가
    createProductIngredient,

}