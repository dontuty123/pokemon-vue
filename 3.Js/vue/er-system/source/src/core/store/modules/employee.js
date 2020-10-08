import Vue from 'vue'
import Vuex from 'vuex'
import employeeService from '@/core/service/employee.service'

Vue.use(Vuex)
const employee = {
  strict: true,
  namespaced: true,
  state: {
    dataList: {},
    totalRecord: '',
    positionList: [],
    departmentList: [],
    resultMess: {
      content: '',
      status: false
    },
    successMess: {
      content: '',
      status: false
    },
    error_code: '',
    http_code: '',
    secretKey: '',
    linkExport:''
  },
  
  mutations: {
    LOAD_LIST(state, data){
      state.dataList = data.result.employeeList
      state.totalRecord = data.result.totalRecord
      state.error_code = data.error_code
    },
    LOAD_LIST_EMPTY(state, data){
      state.error_code = data.error_code
      state.dataList = data.employeeList
      state.resultMess.content = data.error_code
      state.resultMess.status = true
      state.totalRecord = data.totalRecord
    },
    POSITION_LIST(state, data){
      state.positionList = data.positionList
    },
    DEPARTMENT_LIST(state, data){
      state.departmentList = data.departmentList
    },
    API_SUCCESS(state, data){
      state.http_code = data.http_code
      state.successMess.content = '004'
      state.successMess.status = true
    },
    API_FAIL(state, data){
      state.http_code = data.http_code
      state.resultMess.content = data.error_code
      state.resultMess.status = true
    },
    RESET_DATA(state, data){
      state.resultMess.content = data
      state.resultMess.status = false
      state.successMess.content = data
      state.successMess.status = false
    },
    LINK_EXPORT(state, data) {
      state.linkExport = data
    },
    SECRET_KEY(state, data) {
      state.http_code = data.http_code
      state.secretKey = data.result.secretKey
    },
  },

  actions: {
    // Load list employeeList when call API employee-list
    async employeeList( { commit }, param) {
      const respon = await employeeService.getList(param)
      if (respon.data.http_code === 200) {
        if (respon.data.error_code === '') {
          commit('LOAD_LIST', respon.data)
        } else {
          commit('LOAD_LIST_EMPTY', respon.data)
        }
      }
    },
    // Load list positionList when call API position-list
    async positionList( { commit }, param) {
      const respon = await employeeService.getPositionList(param)
      commit('POSITION_LIST', respon.data.result)
    },

    // Load list departmentList when call API department-list
    async departmentList( { commit }, param) {
      const respon = await employeeService.getdepartmentList(param)
      commit('DEPARTMENT_LIST', respon.data.result)
    },
    
    //Call API employeeList get error_code, http_code,employeeList
    async searchList( { commit }, param) {
      const respon = await employeeService.searchList(param)
      if (respon.data.http_code === 200) {
        if (respon.data.error_code === '') {
          commit('LOAD_LIST', respon.data)
        } else {
          commit('LOAD_LIST_EMPTY', respon.data)
        }
      }
    },
    
    //Call Api employee-create get status http_code and error_code
    async addList( { commit }, param) {
      const respon = await employeeService.addList(param)
      if (respon.data.http_code === 200) {
        commit('API_SUCCESS', respon.data)
      } else {
        commit('API_FAIL', respon.data)
      }
    },

    //Call Api employee-update get status http_code and error_code
    async updateList( { commit }, param) {
      const respon = await employeeService.updateList(param)
      if (respon.data.http_code === 201) {
        commit('API_SUCCESS', respon.data)
      } else {
        commit('API_FAIL', respon.data)
      }
    },

    //Call Api employee-delete get status http_code and error_code
    async deleteList( { commit }, param) {
      const respon = await employeeService.deleteList(param)
      if (respon.data.http_code === 200) {
        commit('API_SUCCESS', respon.data)
      } else {
        commit('API_FAIL', respon.data)
      }
    },

    //Call Api get new secretKey
    async secretKey( {commit} , param) {
      const respon = await employeeService.getKey(param)
      if (respon.data.http_code === 200) {
        commit('SECRET_KEY',respon.data)
      }
    },

    //check link to call Api and get link url 
    exportFile( { commit }, param) {
      const link = employeeService.exportFile(param)
      commit('LINK_EXPORT', link)
    },

    //Reset messages to ''
    resetMess ( { commit }, param) {
      setTimeout(() => {
        commit('RESET_DATA', param)
      }, 3000);
    }
  }
};
export default employee
