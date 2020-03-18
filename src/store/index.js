import Vue from 'vue'
import Vuex from 'vuex'

import {
  getToken
} from "@/utilis/token.js";
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    token: getToken('tokenInfo') && getToken('tokenInfo').token,
    refresh_token: getToken('tokenInfo') && getToken('tokenInfo').refresh_token
  },
  mutations: {
    //修改token的方法
    changeToken(state, val) {
      state.token = val
    },
    //修改refresh_token的方法
    changeRefresh_token(state, val) {
      state.refresh_token = val
    }
  },
  actions: {},
  modules: {}
})