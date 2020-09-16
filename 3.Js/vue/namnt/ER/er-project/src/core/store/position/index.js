import Vue from 'vue'
import Vuex from 'vuex'
import authPosition from '@/core/service/auth.position'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const position = {
  namespaced: true,
  state: {
    positionList: {
      positionCode: '',
      positionName: ''
    },
    isLoading: false,
    record: {
      positionCode: '',
      positionName: ''
    },
    sortLoad: false,
    messError: {
      status: true,
      mess: '',
      color: ''
    },
    totalPage:'',
    status: '',
    searchError:{
      status: true,
      mess: '',
      color: ''
    },
    errorCode:''
  },
  mutations: {
    POSITION_LIST(state, data) {
      state.positionList = data.positionList 
      state.isLoading = false
      state.totalPage = data.totalPage
    },

    POSITION_ERROR(state, data) {
      state.isLoading = false
      state.totalPage = data.totalPage
      state.searchError.status = false
      state.searchError.mess = CONTANT.message['018']
      state.searchError.color = 'text-danger'
    },

    RECORD_DATA(state, data) {
      state.record = data
    },

    LOADING_DATA(state, data) {
      state.isLoading = data
    },
    ADD_LIST(state, data) {
      state.errorCode = data.http_code 
      state.isLoading = true
      state.messError.status = false
      state.messError.mess = CONTANT.message['004']
      state.messError.color = 'text-success'
    },
    ADD_ERROR(state, data) {
      state.errorCode = data.http_code 
      state.messError.status = false
      state.messError.mess = CONTANT.message[data.error_code]
      state.messError.color = 'text-danger'
    },
    RESET_ERROR(state, data) {
      state.messError.status = data
      state.messError.mess = ''
      state.searchError.status = data
      state.searchError.mess = ''
    },
    UPDATE_LIST(state, data) {
      state.errorCode = data.http_code 
      state.isLoading = true
      state.messError.status = false
      state.messError.mess = CONTANT.message['004']
      state.messError.color = 'text-success'
    },
    UPDATE_ERROR(state, data) {
      state.errorCode = data.http_code 
      state.messError.status = false
      state.messError.mess = CONTANT.message[data.error_code]
      state.messError.color = 'text-danger'
    },
    DELETE_LIST(state, data) {
      state.errorCode = data.http_code 
      state.positionList = data 
      state.isLoading = true
      state.messError.status = false
      state.messError.mess = CONTANT.message['004']
      state.messError.color = 'text-success'
    },
    DELETE_ERROR(state, data) {
      state.errorCode = data.http_code 
      state.messError.status = false
      state.messError.mess = CONTANT.message[data.error_code]
      state.messError.color = 'text-danger'
    },
  },
  actions: {
    async positionData( { commit }, param) {
      const respon = await authPosition.getList(param)
      if (respon.data.error_code === '018') {
        commit('POSITION_ERROR', respon.data.result)
      } else {
        commit('POSITION_LIST', respon.data.result)
      }  
    },

    recordTable( { commit }, param) { 
      commit('RECORD_DATA', param)
    },

    loadingData( { commit }, param) {
      commit('LOADING_DATA', param)
    },

    async addPosition( { commit }, param) {
      const respon = await authPosition.addRecordPosition(param)
      if (respon.data.http_code === 200) {
        commit('ADD_LIST', respon.data)
      } else {
        commit('ADD_ERROR', respon.data)
      }
    },

    async updatePosition( { commit }, param) {
      const respon = await authPosition.updateRecordPosition(param)
      if (respon.data.http_code === 201) {
        commit('UPDATE_LIST', respon.data)
      } else {
        commit('UPDATE_ERROR', respon.data)
      }
    },

    async deletePosition( { commit }, param) {
      const respon = await authPosition.deleteRecordPosition(param)
      if (respon.data.http_code === 200) {
        commit('DELETE_LIST', respon.data)
      } else {
        commit('DELETE_ERROR', respon.data)
      }
    },

    resetMess( { commit }, param) {
      setTimeout( () => {
        commit('RESET_ERROR', param)
      }, 3000)
    }
  }
}
export default position
