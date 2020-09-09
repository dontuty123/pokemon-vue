import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/core/router'
import authService from '@/core/service/auth.service'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const resetPass = {
  namespaced: true,
  state: {
    secretPassCode:[],
    changeError:{
      status: false,
      message: ''
    }
  },
  mutations: {
    RESETPASS(state, data) {
      state.changeError.status = data
      state.changeError.message = CONTANT.message['008']
    },
    SECRETPASS(state, data) {
      state.secretPassCode = data
    },
  },
  actions: {
    resetPass( { commit }, param){
      authService.reset(param)
      .then(response => {
        commit('RESETPASS', response.data)
        router.push('/') 
      })
    },

    secretPass( { commit }, param){
      authService.secret(param)
      .then(response => {
        commit('SECRETPASS', response.data)
        if (response.data.http_code !== 200) {
          router.push('/')
        }
      })
    }
  }
}
export default resetPass
