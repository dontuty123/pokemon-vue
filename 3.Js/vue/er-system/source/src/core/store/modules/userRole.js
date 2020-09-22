import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
import qs from 'qs'
import funcMemory from '@/core/service/memory.service.js'
Vue.use(Vuex)
const userRole = {
  strict: true,
  namespaced: true,
  state: {
    dataRole: {
      level: '',
      role: '',
    }
  },

  mutations: {
    SET_DATA_ROLE(state, data) {
      state.dataRole = data
    }
  },

  actions: {
    getDataUser(vuexContext) {
      let data = {
        level: funcMemory.getCookie('level'),
        role: funcMemory.getCookie('role'),
      }
      vuexContext.commit('SET_DATA_ROLE', data)
    }
  },

  getters: {

  },
};
export default userRole