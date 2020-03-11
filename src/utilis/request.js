import axios from 'axios';

import store from '@/store/index.js'

//克隆axios
let requestQ = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

});


// http request 请求 拦截器
requestQ.interceptors.request.use(
    config => {
        console.log('token值:', store.state.token);
        if (store.state.token) {
            config.headers.Authorization = 'Bearer ' + store.state.token
        }
        //拦截请求，做统一处理 
        console.log('请求拦截:', config);

        return config
    },
    err => {
        return Promise.reject(err)
    })


// http response 响应 拦截器
requestQ.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        console.log('响应拦截:', response);
        return response.data
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
    })


export default requestQ