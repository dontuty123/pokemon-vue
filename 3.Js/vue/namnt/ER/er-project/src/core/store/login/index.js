import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/core/router'
import authService from '@/core/service/auth.service'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const login = {
  namespaced: true,
  state: {
    token: [],
    errorCode: {
      status: true,
      message: '123'
    },
  },
  mutations: {
    DATALOGIN(state, data) {
      state.token = data 
    },

    LOGINERROR(state, data) {
      state.errorCode.status = data,
      state.errorCode.message = CONTANT.message['001']
    },
    
    RESETERROR(state, data) {
      state.errorCode.status = data
      state.errorCode.message = ''
    }
  },
  actions: {
    async loginData( { commit }, param) {
      const respon = await authService.login(param)
        if (respon.data.http_code === 403) {
          commit('LOGINERROR', false)
        } else {
          localStorage.setItem('result',JSON.stringify(respon.data.result));
          commit('DATALOGIN', respon.data)
          if (respon.data.http_code === 200) {
            router.push('/position')
          }
        }
    },
    resetMess({ commit }){
      commit('RESETERROR', true)
    }
  },
}
export default login
