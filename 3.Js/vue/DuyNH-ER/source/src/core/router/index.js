import Vue from 'vue';
import VueRouter from 'vue-router';
import Project from '@/views/Project/Basic';
import funcMemory from '@/core/service/memory.service.js';

Vue.use(VueRouter);
const routes = [
  //Home
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/DashBoard'),
  },

  //Login
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },

  //Project
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/Project/Basic'),
  },

  //Project Type
  {
    path: '/project-type',
    name: 'ProjectBasicType',
    component: () => import('@/views/Project/Basic/Type'),
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
//Check login
router.beforeEach((to, from, next) => {
  const loginPage = ['/login', '/login/'];
  const authRequired = !loginPage.includes(to.path);
  const loggedIn = funcMemory.getCookie('token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if (!authRequired && loggedIn) {
    return next('/');
  }
  next();
});

export default router;
