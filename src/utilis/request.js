import axios from 'axios';

import store from '@/store/index.js'

<<<<<<< HEAD
import JSONBig from 'json-bigint'

=======
>>>>>>> parent of d806e46... 第四天内容第二遍完成/加油
//克隆axios
let requestQ = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

<<<<<<< HEAD



    /* 
    - 我们需要在.then之前就用JSON-bigint做转换，所以我们优先想到了响应拦截
    - 但是在响应拦截里打印响应体的时候，发现早就被JSON.parse转换完了
    - 所以找了一个配置：transformResponse
    - 他在响应拦截之前触发，并且他的参数data就是原汁原味服务器返回的JSON字符串，还没做转换
    - 所以我们，如果想自己用JSON-bigint来对响应体做转换，就该写到这个方法里
    */

    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        // console.log('transformResponse',data);

        // 我把响应体用JSONBig转换一下再返回给你的.then用
        // 如果你转换了，.then拿到的响应体就是经过大数字处理后的对象了
        return JSONBig.parse(data);
    }],

=======
>>>>>>> parent of d806e46... 第四天内容第二遍完成/加油
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