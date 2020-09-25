import Vue from 'vue'
import Vuex from 'vuex'
import departmentService from '@/core/service/department.service'

Vue.use(Vuex)
const department = {
  strict: true,
  namespaced: true,
  state: {
    resultMess: {
      content: '',
      class: 'text-danger',
      status: false
    },
    dataMess: {
      content: '',
      class: 'text-danger',
      status: false
    },
    dataList: [],
    totalRecord: 0,
    http_code: '',
    secretKey: '',
    linkExport: ''
  },

  mutations: {
    LOAD_SUCCESS(state, data) {
      state.dataList = data.departmentList
      state.totalRecord = data.totalRecord
    },
    LOAD_FAIL(state, data) {
      state.dataList = []
      state.resultMess.content= data.error_code
    },
    DATA_NULL(state, data) {
      state.dataList = data.result.departmentList
      state.resultMess = {
        content: data.error_code,
        class: 'text-danger',
        status: true
      }
    },
    API_SUCCESS(state, data) {
      state.http_code = data.http_code
      state.dataMess = {
        content: '004',
        class: 'text-success',
        status: true
      }
    },
    NO_DATA(state, data) {
      state.http_code = data.http_code
      state.dataMess = {
        content: '004',
        class: 'text-success',
        status: true
      }
      state.resultMess = {
        content: data.error_code,
        class: 'text-danger',
        status: true
      }
    },
    API_FAIL(state, data) {
      state.http_code = data.http_code
      state.resultMess = {
        content: data.error_code,
        class: 'text-danger',
        status: true
      }
    },
    RESET(state){
      state.dataMess.status = false
      state.resultMess.status = false
    },
    SECRET_KEY(state, data) {
      state.http_code = data.http_code
      state.secretKey = data.result.secretKey
    },
    LINK_EXPORT(state, data) {
      state.linkExport = data
    },
  },

  actions: {
    // Call Api load data,get department list 
    async loadList( { commit } , param) {
      const respon = await departmentService.getList(param)
      if (respon.data.http_code === 200) {
        if (respon.data.error_code === '') {
          commit('LOAD_SUCCESS', respon.data.result)
        } else {
          commit('DATA_NULL', respon.data)
        }
        
      } else {
        commit('LOAD_FAIL', respon.data)
      }
    },

    // Search data in department list
    async searchData( {commit} , param) {
      const respon = await departmentService.searchList(param)
      if (respon.data.http_code === 200) {
        if (respon.data.error_code === ''){
          commit('API_SUCCESS', respon.data)
        } else {
          commit('NO_DATA', respon.data)
        }   
      }
    },

    // Add data in department list
    async addData( {commit} , param) {
      const respon = await departmentService.addList(param)
      if (respon.data.http_code === 200) {
        commit('API_SUCCESS', respon.data)     
      } else {
        commit('API_FAIL', respon.data)  
      }
    },

    // Update data in department list
    async updateData( {commit} , param ) {
      const respon = await departmentService.updateList(param)
      if (respon.data.http_code === 201) {
        commit('API_SUCCESS', respon.data)
      } else {
        commit('API_FAIL', respon.data)
      }
    },

    // delete data in department list
    async deleteData( {commit} , param ) {
      const respon = await departmentService.deleteList(param)
      if (respon.data.http_code === 200) {
        commit('API_SUCCESS', respon.data)     
      } else {
        commit('API_FAIL', respon.data)  
      }
    },

    async secretKey( {commit} , param) {
      const respon = await departmentService.getKey(param)
      if (respon.data.http_code === 200) {
        commit('SECRET_KEY',respon.data)
      }
    },
    exportFile( {commit} , param) {
      const link = departmentService.exportFile(param)
      commit('LINK_EXPORT', link)
    },

    resetMess( {commit} ) {
      setTimeout(() => {
        commit('RESET')
      }, 3000)      
    }
  },

  getters: {
   
  },
};
export default department
