import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/core/router'
import authService from '@/core/service/auth.service'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const changePass = {
  namespaced: true,
  state: {
    changeError: {
      status: false,
      message: ''
    }
  },
  mutations: {
    CHANGEPASSWORD(state, data) {
      state.changeError.status = data
      state.changeError.message = CONTANT.message['008']
    },
    RESETERROR(state, data) {
      state.changeError.status = data
      state.changeError.message = ''
    },

  },
  actions: {
    async changePassword( { commit }, param){
    const respon = await authService.changePass(param)
    if (respon.data.http_code === 200) {
      router.push('/')
    }
    if (respon.data.http_code === 403) {
      commit('CHANGEPASSWORD', false)
    }
    },

    resetMess( { commit }, param ){
      commit('RESETERROR', param)
    }
  },
}
export default changePass
