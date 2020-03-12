import axios from 'axios';

import store from '@/store/index.js'

//克隆axios
let requestQ = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

});



//请求拦截
requestQ.interceptors.request.use(
    config => {

        // console.log('请求拦截:', config);
        if (store.state.token) {
            config.headers.Authorization = 'Bearer ' + store.state.token

        }
        // console.log(config)
        // console.log(store.state.token)

        return config

    },
    err => {
        return Promise.reject(err)
    })


//响应拦截
requestQ.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        // return response
        return response.data
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })


//抛出requestQ
export default requestQ