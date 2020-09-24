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
    totalPage: 0,
    http_code:''
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
    SEARCH_SUCCESS(state, data) {
      state.http_code = data.http_code
      state.dataMess.content = '004'
      state.dataMess.class = 'text-success'
      state.dataMess.status = true 
    },
    RESET(state){
      state.dataMess.class = 'text-success'
      state.dataMess.status = false
    }
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

    async searchData( {commit}, param) {
      const respon = await departmentService.searchList(param)
      if (respon.data.http_code === 200) {
        commit('SEARCH_SUCCESS', respon.data)
      }
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