import Vue from 'vue';
import Vuex from 'vuex';
import inquiryDataService from '@/core/service/inquiryData.service';

Vue.use(Vuex);
const inquiryData = {
  namespaced: true,
  strict: true,
  state: {
   listProject: [],
   listWorkLog: [],
   isLoading: false,
   status: {
    http_code: '',
    error_code: ''
  },
  },
  
  mutations: {
    ACTION_DONT_RELOAD: (state, data) => {
      state.isLoading = false;
      state.status.error_code = data.error_code
      state.status.http_code = data.http_code
    }, 

    ACTION_SUCCESS: (state, data) => {
      state.isLoading = !state.isLoading;
      state.status.error_code = data.error_code
      state.status.http_code = data.http_code
    },

    GET_LIST_PROJECT: (state, data) => {
      state.listProject = data
      //Add 1 option is All
      state.listProject.unshift(
        {
          defaultProject:false,
          id:0,
          projectCode: '',
          projectName: 'All'
        },
      )
    },
    GET_WORK_LOG: (state, data) => {
      state.listWorkLog = data
    }
  },

  actions: {
   //Get data Inquiry
   async getDataInquiry(vuexContext, params) {
    const res = await inquiryDataService.getDataInQuiry(params)
    if (res.data.http_code === 200) {
      vuexContext.commit('GET_LIST_PROJECT', res.data.result.project) 
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
    } else {
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
    }
   },

   //Get work log
   async getWorkLog(vuexContext, params) {
    const res = await inquiryDataService.getWorkLog(params)
    if (res.data.http_code === 200) {
      vuexContext.commit('GET_WORK_LOG', res.data.result.workLog)
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
    } else {
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      return res;
    }
   },

   //Search work log
   async searchWorkLog(vuexContext, params) {
    const res = await inquiryDataService.searchWorkLog(params)
    if (res.data.http_code === 200) {
      vuexContext.commit('GET_WORK_LOG', res.data.result.workLog)
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
    } else {
      vuexContext.commit('ACTION_DONT_RELOAD', res.data);
    }
   },
  }, 

  getters: {

  }
}
export default inquiryData;
