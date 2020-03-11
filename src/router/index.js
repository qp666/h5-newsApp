import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/'
import layout from '@/views/layout/layout.vue'
import home from '@/views/home/home.vue'
import mine from '@/views/mine/mine.vue'
import video from '@/views/video/video.vue'
import question from '@/views/question/question.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: login
  }, {
    path: '/layout',
    name: 'layout',
    component: layout,
    children:[{
      path: '/home',
      component: home,
    },{
      path: '/mine',
      component: mine,
    },{
      path: '/video',
      component: video,
    },{
      path: '/question',
      component: question,
    }]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router