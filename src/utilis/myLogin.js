import store from '@/store/' //导入vuex
import router from '@/router/' //导入router
import Vue from 'vue'
import {
    Toast
} from 'vant';


let myLogin = {
    checkLogin() {
        if (store.state.token) {
            return true;
        } else {
            //弹出提示
            Toast.fail('请先登录!')

            //跳回登录页
            router.push('/checkLogin');
            return false;
        }
    },



    //插件内的对象要提供一个install方法
    install(Vue) {
        //把判断登录的方法给vue 的原型添加
        Vue.prototype.checkLogin = myLogin.checkLogin;
    }
}
Vue.use(myLogin);
//把这个对象暴露出去
export default myLogin