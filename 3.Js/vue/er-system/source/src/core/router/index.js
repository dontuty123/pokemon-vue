import Vue from 'vue'
import VueRouter from 'vue-router'
import funcMemory from '@/core/service/memory.service.js';
import auth from '@/core/service/checkAuth';

Vue.use(VueRouter)
Vue.use(auth)

const routes = [
  //Login
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },

  //Employe
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('@/views/Employee'),
  },

  //Projec
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/Project'),
  },

  //OM Project Management
  {
    path: '/om-project-management',
    name: 'OMProject',
    component: () => import('@/views/OMProject'),
  },

  //Update working hour
  {
    path: '/update-working-hour',
    name: 'UpdateWkHour',
    component: () => import('@/views/UpdateWkHouse'),
  },

  //Total record
  {
    path: '/total-record',
    name: 'TotalRecord',
    component: () => import('@/views/TotalRecord'),
  },
  //Appove
  {
    path: '/approve',
    name: 'Approve',
    component: () => import('@/views/Approve'),
  },
  //Department
  {
    path: '/department',
    name: 'Department',
    component: () => import('@/views/Department')
  },

  //Error
  {
    path: '/error/404',
    name: 'Error',
    component: () => import('@/views/Error')
  },
  //Position
  {
    path: '/Position',
    name: 'Position',
    component: () => import('@/views/Position'),
  },
]
const checkInitScreen = (page, check, auth) => {
  let result = ''
  //Login page but already logged in ==> Go Home
  if (page === 'Login' && check) result = 'UpdateWkHour'
  //Login page and not login yet ==> Login
  if (page === 'Login' && !check) result = 'Next'
  //Go inside page but  not login yet ==> Login
  if (page !== 'Login' && !check) result = 'Login'
  // //Go inside page  and already logged in ==> Check user role
  if (page !== 'Login' && check) {
    if (!auth) result = 'UpdateWkHour'
    else result = 'Next'
  }
  if (page === 'Error' && (!check || check)) result = 'Next'
  return result
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//Check login
router.beforeEach((to, from, next) => {
  const loggedIn = funcMemory.getCookie('token');
  const isAuthenticated = auth.checkAuth(to.name);
  if (checkInitScreen(to.name, loggedIn, isAuthenticated) === 'Login') {
    next({ name: 'Login' })
  }
  if (checkInitScreen(to.name, loggedIn, isAuthenticated) === 'UpdateWkHour') {
    next({ name: 'UpdateWkHour' })
  }
  if (checkInitScreen(to.name, loggedIn, isAuthenticated) === 'Next') {
    next()
  }
});

export default router
