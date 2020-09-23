import Vue from 'vue'
import Vuex from 'vuex'
import loginService from '@/core/service/authen.service'
import router from '@/core/router'
import cookie from 'js-cookie'
import qs from 'qs'
Vue.use(Vuex)
const login = {
  strict: true,
  namespaced: true,
  state: {
    status: {
      http_code: '',
      error_code: ''
    },
  },

  mutations: {
    LOGIN_SUCCESS(state, data) {
      state.status.http_code = data.http_code
    },
    LOGIN_FAIL(state, data) {
      state.status.http_code = data.http_code
      state.status.error_code = data.error_code
    }
  },

  actions: {
    async userLogin( { commit }, param) {
      const respon = await loginService.postUser(param)
      if (respon.data.http_code === 200) {
        commit('LOGIN_SUCCESS', respon.data)
        cookie.set('userData', qs.stringify(respon.data.result))
        // router.push('/om-project-management')
      } else {
        commit('LOGIN_FAIL', respon.data)
      }
    }
  },

  getters: {
   
  },
};
export default login