import Vue from 'vue'
import Vuex from 'vuex'
import authProject from '@/core/service/auth.project'
import CONTANT from '@/core/contant'
import qs from 'qs'
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
    errorCode: '',
    searchError: {
      status: true,
      mess: '',
      color: ''
    },
    totalPage: '',
    secretKey: ''
  },
  mutations: {
    LOADING_DATA(state, data) {
      state.isLoading = data
    }, 

    PROJECT_LIST(state, data) {
      state.isLoading = false
      state.projectList = data
      state.totalPage = data.totalPage
    },

    PROJECT_ERROR(state, data) {
      state.errorCode = data.http_code
      state.projectList = data
      state.totalPage = data.totalPage
      state.isLoading = false
      state.messCode.mess = CONTANT.message['004']
      state.messCode.class = 'text-success'
      state.searchError.mess = CONTANT.message['018']
      state.searchError.class = 'text-danger'
      state.searchError.status = false
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
      state.searchError.mess = data
      state.searchError.status = true
    },

    SEARCH_DATA(state, data) {
      state.errorCode = data.http_code
    },

    SEARCH_ERROR(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['004']
      state.messCode.class = 'text-success'
      state.searchError.mess = CONTANT.message['018']
      state.searchError.class = 'text-danger'
      state.searchError.status = false
    },

    UPDATE_DATA(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['004']
      state.messCode.class = 'text-success'
    },

    UPDATE_ERROR(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['023']
      state.messCode.class = 'text-danger'
    },

    DELETE_DATA(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message['004']
      state.messCode.class = 'text-success'
    },

    DELETE_ERROR(state, data) {
      state.errorCode = data.http_code
      state.messCode.mess = CONTANT.message[data.errorCode]
      state.messCode.class = 'text-danger'
    },

    SECRET_KEY(state, data) {
      state.secretKey = data.secretKey
    }
  },
  actions: {
    async loadingData( { commit }, param) {
      commit('LOADING_DATA', param)
    },

    async projectList( { commit }, param) {
      const respon = await authProject.getProject(param)
      if (respon.data.error_code === '' ) {
        commit('PROJECT_LIST', respon.data.result)
      } else {
        commit('PROJECT_ERROR', respon.data.result)
      }
    },

    async projecType( { commit }, param) {
      const respon = await authProject.getProjectType(param)
        commit('PROJECT_TYPE_LIST', respon.data.result.projectTypeList)
    },

    async addProject( { commit }, param) {
      const respon = await authProject.addProjectData(param)
      if (respon.data.http_code === 200 ) {
        commit('ADD_PROJECT', respon.data)
      } else {
        commit('ADD_ERROR', respon.data)
      }
    },
    async searchData( { commit }, param) {
      const respon = await authProject.getProject(param)
      if (respon.data.error_code === '' ) {
        commit('SEARCH_DATA', respon.data)        
      } else {
        commit('SEARCH_ERROR', respon.data)
      }
    },

    async updateProject( { commit }, param) {
      const respon = await authProject.updateProjectData(param)
      if (respon.data.http_code === 201 ) {
        commit('UPDATE_DATA', respon.data)
      } else {
        commit('UPDATE_ERROR', respon.data)
      }
    },

    async deleteProject( { commit }, param) {
      const respon = await authProject.deleteProjectData(param)
      if (respon.data.http_code === 200 ) {
        commit('DELETE_DATA', respon.data)
      } else {
        commit('DELETE_ERROR', respon.data)
      }
    },    

    async secretKey( { commit }, param) {
      const respon = await authProject.getKey(param)
      if (respon.data.http_code === 200){
        commit('SECRET_KEY', respon.data.result)
      } else {
        console.log('a')
      }
    },

    exportFile( { commit }, param) {
      const link = CONTANT.apiURL + 'Project/projectExport?' + qs.stringify(param)
      window.open(link, '_blank')
      commit('RESET_ERROR', '')
    },
   
    resetMess( { commit }, param) {
      setTimeout( () => {
        commit('RESET_ERROR', param)
      }, 3000)
    }
  }
}
export default project
