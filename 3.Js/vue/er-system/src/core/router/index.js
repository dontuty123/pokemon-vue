import Vue from 'vue'
import VueRouter from 'vue-router'
import funcMemory from '@/core/service/memory.service.js';

Vue.use(VueRouter)

const routes = [
  //Login
  {
    path: '/login',
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
//Check login
router.beforeEach((to, from, next) => {
  const loginPage = ['/login', '/login/'];
  
  const authRequired = !loginPage.includes(to.path);
  const loggedIn = funcMemory.getCookie('token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if (!authRequired && loggedIn) {
    return next('/om-project-management');
  }
  next();
});
export default router
