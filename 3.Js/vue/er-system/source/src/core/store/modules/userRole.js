import Vue from 'vue'
import Vuex from 'vuex'
import funcMemory from '@/core/service/memory.service.js'

Vue.use(Vuex)
const userRole = {
  strict: true,
  namespaced: true,
  state: {
    dataRole: {
      level: '',
      role: '',
      isLogin: false
    }
  },

  mutations: {
    SET_DATA_ROLE(state, data) {
      state.dataRole = data
    }
  },

  actions: {
    getDataUser(vuexContext) {
      let data = {}
      if (funcMemory.getCookie('token')) {
        data = {
          level: funcMemory.getCookie('level'),
          role: funcMemory.getCookie('role'),
          isLogin: true
        }
      } else {
        data = {
          level: '',
          role: '',
          isLogin: false
        }
      }
      vuexContext.commit('SET_DATA_ROLE', data)
    }
  },

  getters: {

  },
};
export default userRole