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
    dataList: [],
    totalPage: 0,
  },

  mutations: {
    LOAD_SUCCESS(state, data) {
      state.dataList = data.departmentList
      state.totalPage = data.totalPage
    },
    LOAD_FAIL(state, data) {
      state.dataList = []
      state.resultMess.content= data.error_code
    },
  },

  actions: {
    async loadList( { commit }, param) {
      const respon = await departmentService.getList(param)
      if (respon.data.http_code === 200){
        commit('LOAD_SUCCESS', respon.data.result)
      } else {
        commit('LOAD_FAIL', respon.data)
      }
    },
  },

  getters: {
   
  },
};
export default department