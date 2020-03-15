import axios from 'axios';

import store from '@/store/index.js'


import JSONBig from 'json-bigint'

//克隆axios
let requestQ = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        // console.log('transformResponse',data);

        // 我把响应体用JSONBig转换一下再返回给你的.then用
        // 如果你转换了，.then拿到的响应体就是经过大数字处理后的对象了
        return JSONBig.parse(data);
    }],

});


// http request 请求 拦截器
requestQ.interceptors.request.use(
    config => {
        // console.log('token值:', store.state.token);
        if (store.state.token) {
            config.headers.Authorization = 'Bearer ' + store.state.token
        }
        //拦截请求，做统一处理 
        // console.log('请求拦截:', config);

        return config
    },
    err => {
        return Promise.reject(err)
    })


// http response 响应 拦截器
requestQ.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        // console.log('响应拦截:', response);
        return response.data
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
    })


export default requestQ