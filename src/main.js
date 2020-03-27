import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/base.css'
import './style/icon.css'

//导入适配rem
// {/* <script src="../node_modules/amfe-flexible/index.js"></script> */}
import 'amfe-flexible/index.js'

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

//时间插件
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
//全局过滤器 过滤时间
Vue.filter('filterTime', function (val) {

  return dayjs().from(val);

})

Vue.use(Vant);



//导入自己创建的跳转登录方法
import myLogin from '@/utilis/myLogin.js'
// Vue.use(myLogin);

Vue.config.productionTip = false

new Vue({
  myLogin,
  router,
  store,
  render: h => h(App)
}).$mount('#app')