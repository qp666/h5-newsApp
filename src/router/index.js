import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/home/home.vue'
import layout from '@/views/layout/layout.vue'
import video from '@/views/video/video.vue'
import mine from '@/views/mine/mine.vue'
import question from '@/views/question/question.vue'
//如果不写 index.js 默认会帮我们找到home里面的 index.js或者indxe.vue
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [{
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: '/video',
        name: 'video',
        component: video
      },
      {
        path: '/mine',
        name: 'mine',
        component: mine

      },
      {
        path: '/question',
        name: 'question',
        component: question

      },
    ]

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router