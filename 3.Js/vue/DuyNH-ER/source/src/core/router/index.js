import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/DashBoard';
import Login from '@/views/Login';
import Project from '@/views/Project/UseBootstrap';
import ProjectType from '@/views/Project/UseBootstrap/Type';

import ProjectBasic from '@/views/Project/Basic';
import ProjectBasicType from '@/views/Project/Basic/Type';

import funcMemory from '@/core/service/memory.service.js';

Vue.use(VueRouter);
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
//Login
{
  path: '/login',
  name: 'Login',
  component: Login,
},
//Project
{
  path: '/project-use-bootstrap',
  name: 'Project',
  component: Project,
},
//Project Type
{
  path: '/project-type-use-bootstrap',
  name: 'ProjectType',
  component: ProjectType,
},

//Project Basic
{
  path: '/project',
  name: 'ProjectBasic',
  component: ProjectBasic,
},

//Project Basic Type
{
  path: '/project-type',
  name: 'ProjectBasicType',
  component: ProjectBasicType,
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
