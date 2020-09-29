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
    positionList: {},
    departmentList: {},
  },
  mutations: {
    LOAD_LIST(state, data){
      state.dataList = data.employeeList
      state.totalRecord = data.totalRecord
    },
    POSITION_LIST(state, data){
      state.positionList = data.positionList
    },
    department_LIST(state, data){
      state.departmentList = data.departmentList
    }
  },
  actions: {
    async employeeList( { commit }, param) {
      const respon = await employeeService.getList(param)
      commit('LOAD_LIST', respon.data.result)
    },

    async positionList( { commit }, param) {
      const respon = await employeeService.getPositionList(param)
      commit('POSITION_LIST', respon.data.result)
    },

    async departmentList( { commit }, param) {
      const respon = await employeeService.getdepartmentList(param)
      console.log(respon)
      commit('DEPARTMENT_LIST', respon.data.result)
    }
    
  }
};
export default employee
