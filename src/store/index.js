import Vue from 'vue'
import Vuex from 'vuex'

import {
  getToken
}
from '@/utilis/token.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken('token'),
    refresh_token: getToken('refresh_token')
  },
  mutations: {
    changeToken(state, val) {
      state.token = val
    },
    changeRefresh_token(state, val) {
      state.refresh_token = val
    }
  },
  actions: {},
  modules: {}
})