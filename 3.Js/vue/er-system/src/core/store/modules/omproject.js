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
  },
  
  mutations: {
    ACTION_ERROR (state) {
      state.isLoading = false;
    }, 
    ACTION_SUCCESS (state) {
      state.isLoading = !state.isLoading;
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
  },

  actions: {
    //List OM Project
    async getOmProject (vuexContext, paramsOmProject){
      omProjectService.getOmProject(paramsOmProject).then(res => { 
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.omProject);
          vuexContext.commit('GET_DATA_LIST_EMPLOYEE', res.data.result.employeeWorking);
          vuexContext.commit('GET_DATA_LIST_EMPLOYEE_PROJECT', res.data.result.employeeProject);
        } else {
          vuexContext.commit('ACTION_ERROR');
          return res;
        }
      });
    },

    //Search OM Project
    async searchOmProject (vuexContext, paramsOmProject){
      omProjectService.searchOmProject(paramsOmProject).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_EMPLOYEE_PROJECT', res.data.result.employeeProject);
        } else {
          vuexContext.commit('ACTION_ERROR');
          return res;
        }
      })
    },

    //Add OM Project
    async addOmProject (vuexContext, newProject){
      omProjectService.addOmProject(newProject).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('ACTION_SUCCESS');
        } else {
          vuexContext.commit('ACTION_ERROR');
          return res;
        }
      })
    },

    //Update Om Project
    async updateOmProject (vuexContext, projectUpdate){
      omProjectService.updateOmProject(projectUpdate).then(res => {
        if (res.data.http_code === 201) {
          vuexContext.commit('ACTION_SUCCESS');
        } else {
          vuexContext.commit('ACTION_ERROR');
          return res;
        }
      })
    },

    //Delete Om Project
    async deleteOmProject (vuexContext, omProjectId){
      omProjectService.deleteOmProject(omProjectId).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('ACTION_SUCCESS');
        } else {
          vuexContext.commit('ACTION_ERROR');
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
    
  }, 

  getters: {

  }
}
export default omproject;