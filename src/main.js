import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import '@/style/base.css'
import '@/style/icon.css'
import App from './App.vue'
import router from './router'
import store from './store'

//导入时间插件
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

Vue.filter('filterTime', function (val) {
  return dayjs().from(val) // 可以得到现在距离你传入的时间相对有多久了

})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')