import Vue from 'vue'
import Vuex from 'vuex'
import authService from '@/core/service/auth.service'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const forgotPass = {
  namespaced: true,
  state: {
    dataForget: {
      status : true,
      message: '',
      color : 'text-success',
      isLoading: false
    },
  },
  mutations: {
    DATAFORGET(state, data) {
      const message = {
        status: data,
        message: CONTANT.message['004'],
        color: 'text-success',
        isLoading: false
      }
      state.dataForget = message
    },

    DATAFORGETFAIL(state, data) {
      const message = {
        status: data,
        message: CONTANT.message['012'],
        color: 'text-danger',
        isLoading: false
      }
      state.dataForget = message
    },
    RESETERROR(state, data) {
      state.dataForget.status = data
      state.dataForget.message = ''
    },
    LOADING(state, data) {
      state.dataForget.isLoading = data
    }
  },
  actions: {
    async forgotPass( { commit }, param){
      const respon = await authService.forgot(param)
      if (respon.data.http_code === 403) {
        commit('DATAFORGETFAIL', false) 
      } else {
        commit('DATAFORGET', false)
      }
    },

    resetMess( { commit }, data ){
      commit('RESETERROR', data)
    },

    loading( { commit } , data){
      commit('LOADING', data)
    }
  },
}
export default forgotPass
