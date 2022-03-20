import axios from "axios";

const BASE_URL = "http://localhost:3000/"

const _baseGetRequest = async (path) => {
    const res = await axios.get(BASE_URL + path)
    return res.data;
}

const getOrderList = async () => {
    const res = await _baseGetRequest('order')
    return res.data;
}

export default {
    getOrderList
}