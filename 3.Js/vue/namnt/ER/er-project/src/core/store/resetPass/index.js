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
    async resetPass( { commit }, param){
      const respon = await authService.reset(param)
      commit('RESETPASS', respon.data)
      router.push('/') 
    },

    async secretPass( { commit }, param){
      const respon = await authService.secret(param)  
      commit('SECRETPASS', respon.data)
      if (respon.data.http_code !== 200) {
        router.push('/')
      }
    }
  }
}
export default resetPass
