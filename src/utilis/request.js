import axios from 'axios';

import store from '@/store/index.js'

import JSONBig from 'json-bigint'
import {
    setToken
} from '@/utilis/token.js'
//克隆axios
let requestQ = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }




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
        try {
            //转换json时加try/catch ,因为有可能服务器返回的不是JSon字符串,如果不加trycatch,把不是JSON字符串的用JSONBIG.parse就会报错
            return JSONBig.parse(data);
        } catch {
            //如果报错,就把正常响应返回
            return data
        }
    }],

});


let requestQ2 = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', //!基地址
})

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
    async error => {


        // console.dir(error)

        //如果是401报错就是token不对
        if (error.response.status == 401) {

            //refresh_token调用重新获取新token
            console.log('1', store.state.refresh_token);


            let res = await requestQ2({
                url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + store.state.refresh_token
                }
            })

            //把请求到的新的token存起来替换之前的
            store.commit('changeToken', res.data.data.token);
            console.log('2', res.data.data.token);

            let obj = {
                token: res.data.data.token,
                refresh_token: store.state.refresh_token
            }


            //把新的tokeninfo存到本地存储
            setToken("tokenInfo", JSON.stringify(obj))
            // console.log(res);

            //再重新发送一次上次报错的请求(这次已经更新token了)
            let res2 = await requestQ(error.config)
            //error.config里面是上次请求的请求体
            //把重新发送请求后的res2返回出去
            return res2
            // return '123'
        } else {
            //如果不是401就是其他错误,正常返回

            return Promise.reject(error) // 返回接口返回的错误信息
        }

    })


//抛出requestQ
export default requestQ