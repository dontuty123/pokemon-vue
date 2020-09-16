import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login/index.vue')
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ForgotPass/index.vue')
  },
  {
    path: '/resetpassword/:paramPage',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ResetPass/index.vue')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ChangePass/index.vue')
  },
  {
    path: '/position',
    name: 'position',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Position/index.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Project/index.vue')
  }
]

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
