import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/core/store/login'
import forgotPass from '@/core/store/forgotPass'
import resetPass from '@/core/store/resetPass'
import changePass from '@/core/store/changePass'
import position from '@/core/store/position'
import project from '@/core/store/project'
Vue.use(Vuex)
export default new Vuex.Store( {
  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    login : login,
    forgotPass : forgotPass,
    resetPass : resetPass,
    changePass : changePass,
    position : position,
    project: project
  }  
})
