import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/'
import index from '@/views/index/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    name: 'index',
    component: index
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router