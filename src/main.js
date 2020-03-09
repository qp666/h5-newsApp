import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/base.css'
import './style/icon.css'

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')