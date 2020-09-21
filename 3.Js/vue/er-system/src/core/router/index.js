import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //Login
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login')
  },

  //Home
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/DashBoard')
  },

  //OM Project Management
  {
    path: '/om-project-management',
    name: 'OMProject',
    component: () => import('@/views/OMProject')
  },

   //Department
   {
    path: '/department',
    name: 'Department',
    component: () => import('@/views/Department')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
