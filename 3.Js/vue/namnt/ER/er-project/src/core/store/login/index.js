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
    loginData( { commit }, param) {
      authService.login(param)
      .then(response => {
        if (response.data.http_code === 403) {
          commit('LOGINERROR', false)
        } else {
          localStorage.setItem('result',JSON.stringify(response.data.result));
          commit('DATALOGIN', response.data)
          if (response.data.http_code === 200) {
            router.push('/position')
          }
        }
      })
    },
    resetMess({ commit }){
      commit('RESETERROR', true)
    }
  },
}
export default login
