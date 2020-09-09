import Vue from 'vue'
import Vuex from 'vuex'
import authService from '@/core/service/auth.service'
import CONTANT from '@/core/contant'
Vue.use(Vuex)
const project = {
  namespaced: true,
  state: {
    isLoading: false,
    projectList: [],
    projectTypeList: [],
    messCode: {
      mess: '',
      class: ''
    },
    errorCode: ''
  },
  mutations: {
    LOADING_DATA(state, data) {
      state.isLoading = data
    },
    PROJECT_LIST(state, data) {
      state.isLoading = false
      state.projectList = data
    },
    PROJECT_TYPE_LIST(state, data) {
      state.projectTypeList = data
    },
    ADD_PROJECT(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['004']
      state.messCode.class = 'text-success'
    },
    ADD_ERROR(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['023']
      state.messCode.class = 'text-danger'
    },
    RESET_ERROR(state, data) {
      state.messCode.mess = data
    }
  },
  actions: {
    async loadingData( { commit }, param) {
      commit('LOADING_DATA', param)
    },

    async projectList( { commit }, param) {
      let respon = await authService.getProject(param)
        commit('PROJECT_LIST', respon.data.result)
    },

    async projecType( { commit }, param) {
      let respon = await authService.getProjectType(param)
        commit('PROJECT_TYPE_LIST', respon.data.result.projectTypeList)
    },

    async addProject( { commit }, param) {
      let respon = await authService.addProjectData(param)
      console.log(respon.data.http_code)
      if ( respon.data.http_code === 200 ) {
        commit('ADD_PROJECT', respon.data)
      } else {
        console.log(respon.data.error_code)
        commit('ADD_ERROR', respon.data)
      }
    },
    resetMess( { commit }, param) {
      setTimeout( () => {
        commit('RESET_ERROR', param)
      }, 3000)
    }
  }
}
export default project
