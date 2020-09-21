import Vue from 'vue';
import Vuex from 'vuex';
import omProjectService from '@/core/service/omproject.service';
import qs from 'qs';

Vue.use(Vuex);
const omproject = {
  namespaced: true,
  strict: true,
  state: {
    isLoading: false,
    listOmEmployeeProject: [],
    listOmproject: [],
    listOmEmployee: [],
    linkExportExcel: '',
    secretKey: '',
    totalRecord: 0,
    status: {
      http_code: '',
      error_code: ''
    },
  },
  
  mutations: {
    ACTION_DONT_RELOAD (state, data) {
      state.isLoading = false;
      state.status.error_code = data.error_code
      state.status.http_code = data.http_code
    }, 
    ACTION_SUCCESS (state, data) {
      state.isLoading = !state.isLoading;
      state.status.error_code = data.error_code
      state.status.http_code = data.http_code
    },

    GET_DATA_LIST_PROJECT: (state, listOmProject) => {
      state.listOmproject = listOmProject;
    },

    GET_DATA_LIST_EMPLOYEE: (state, listOmEmployee) => {
      state.listOmEmployee = listOmEmployee;
    },

    GET_DATA_LIST_EMPLOYEE_PROJECT: (state, listOmEmployeeProject) => {
      state.listOmEmployeeProject = listOmEmployeeProject;
    },

    GET_TOTAL_OM_PROJECT(state, total) {
      state.totalRecord = total;
    },
  },

  actions: {
    //List OM Project
    async getOmProject (vuexContext, paramsOmProject){
      const res = await omProjectService.getOmProject(paramsOmProject)
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.omProject);
          vuexContext.commit('GET_DATA_LIST_EMPLOYEE', res.data.result.employeeWorking);
          vuexContext.commit('GET_TOTAL_OM_PROJECT', res.data.result.totalRecord);
          vuexContext.commit('GET_DATA_LIST_EMPLOYEE_PROJECT', res.data.result.employeeProject);
          vuexContext.commit('ACTION_DONT_RELOAD', res.data);
        } else {
          vuexContext.commit('ACTION_DONT_RELOAD', res.data);
          return res;
        }
    },

    //Search OM Project
    async searchOmProject (vuexContext, paramsOmProject){
      const res = await omProjectService.searchOmProject(paramsOmProject)
      if (res.data.http_code === 200) {
        vuexContext.commit('GET_DATA_LIST_EMPLOYEE_PROJECT', res.data.result.employeeProject);
        vuexContext.commit('GET_TOTAL_OM_PROJECT', res.data.result.totalRecord);
        vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      } else {
        vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      }

    },

    //Add OM Project
    async addOmProject (vuexContext, newProject){
      const res = await omProjectService.addOmProject(newProject)
      if (res.data.http_code === 200) {
        vuexContext.commit('ACTION_SUCCESS', res.data);
      } else {
        vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      }
    },

    //Update Om Project
    async updateOmProject (vuexContext, projectUpdate){
      const res = await omProjectService.updateOmProject(projectUpdate)
      if (res.data.http_code === 201) {
        vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      } else {
        vuexContext.commit('ACTION_DONT_RELOAD', res.data);
      }
    },

    //Delete Om Project
    async deleteOmProject (vuexContext, omProjectId){
      await omProjectService.deleteOmProject(omProjectId).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('ACTION_SUCCESS', res.data);
        } else {
          vuexContext.commit('ACTION_DONT_RELOAD', res.data);
          return res;
        }
      })
    },

    // Get key
    async getSecretKey(vuexContext){
      omProjectService.getSecretKey().then(res => {     
        if (res.data.http_code === 200) {
          vuexContext.state['secretKey'] = res.data.result.secretKey    
        }
      });
    },

    //Export Project
    async exportExcel(vuexContext, dataExport){
      vuexContext.state['linkExportExcel'] = omProjectService.exportFile(dataExport)
    },
    
  }, 

  getters: {

  }
}
export default omproject;