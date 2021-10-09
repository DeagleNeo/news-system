import axios from "axios";
import store from "../redux/store.js"

axios.defaults.baseURL = `http://localhost:8888`

axios.interceptors.request.use(function (config) {
    // 显示 loading
    store.dispatch({
        type: "change_loading",
        payload: true
    })
    return config;
}, function (error) {

    return Promise.reject(error)
})

axios.interceptors.response.use(function (config) {
    // 隐藏 loading
    store.dispatch({
        type: "change_loading",
        payload: false
    })
    return config;
}, function (error) {
    // 隐藏 loading
    store.dispatch({
        type: "change_loading",
        payload: false
    })
    return Promise.reject(error)
})