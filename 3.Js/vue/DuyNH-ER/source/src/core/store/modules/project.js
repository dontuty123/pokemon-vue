import Vue from 'vue';
import Vuex from 'vuex';
import CONTANT from '@/core/contant';
import projectService from '@/core/service/project.service';
import MESSAGE from '@/core/message';

Vue.use(Vuex);
const project = {
  namespaced: true,
  strict: true,
  state: {
    errorCode: {
      status: false,
      message: '',
    },
    paramsProject: {
      isSearch: 1,
      projectCode: '',
      projectName: '',
      projectTypeId: '',
      aliasName: '',
      currentPage: 1,
      active: null,
      defaultProject: null,
      pageRecord: 300,
      sortBy: 'projectCode-ASC',
    },

    paramsProjectType: {
      isSearch: 0,
      projectTypeCode: '',
      projectTypeName: '',
      currentPage: 1,
      pageRecord: 20,
      sortBy: 'projectTypeCode-ASC',
    },
    listProjects: [],
    totalRecord: 0,
    totalRecordType: 0,
    listProjectType: [],
    newProject: {},
    newTypeProject: {},
    getDefaultState() { },
    isLoading: false,
    messageResult: '',
    secretKey: '',
    secretKeylPjType: '',    
    linkExportExcel: '',
    linkExportExcelPjType: '',
  },

  mutations: {
    GET_MESSAGE_FROM_API(state, msg) {
      state.messageResult = msg;
    },

    RESET_MESSAGE(state, msg) {
      setTimeout(() => {
        state.messageResult = ''
      }, 3000);
    },

    PROJECT_ERROR(state) {
      state.isLoading = false;
    },

    PROJECT_SUCCESS(state) {
      state.isLoading = true;
    },
    
    GET_DATA_LIST_PROJECT: (state, listProjects) => {
      state.listProjects = listProjects;
    },

    GET_TOTAL_PROJECT(state, total) {
      state.totalRecord = total;
    },
    GET_TOTAL_PROJECT_TYPE(state, total) {
      state.totalRecordType = total;
    },
    GET_PARAMS_LIST_PROJECT: (state, paramsProjects) => {
      state.paramsProject = paramsProjects;
    },

    GET_PARAMS_TYPE_PROJECT: (state, paramsTypeProjects) => {
      state.paramsProjectType = paramsTypeProjects;
    },

    GET_DATA_LIST_PROJECT_TYPE: (state, listProjectType) => {
      state.listProjectType = listProjectType;
    },

    GET_NEW_PROJECT(state, newProject) {
      state.newProject = newProject;
    },

    GET_NEW_TYPE_PROJECT(state, newType) {
      state.newTypeProject = newType;
    },
  },

  actions: {
    //******************PROJECT********************
    //Show list project
    async getListProject(vuexContext, paramsProject){
      projectService.getProject(paramsProject).then(res => {
        if (res.data.http_code === 200) {
          const tmp = {}
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.result);
          vuexContext.commit('GET_TOTAL_PROJECT', res.data.result.totalRecord);
          vuexContext.commit('PROJECT_ERROR')
          if (res.data.result.totalRecord === undefined) {
            vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['018']);
            vuexContext.commit('RESET_MESSAGE');
          }
        } else {
          vuexContext.commit('PROJECT_ERROR');
          return res;
        }
      });
    },

    //Add 1 project
    async addProject(vuexContext, newProject){
      projectService.addProject(newProject).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_NEW_PROJECT', newProject);
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')      
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['013']);
          vuexContext.commit('RESET_MESSAGE');
          return res;
        }
      });
    },

    // Get id projecttype when search
    async searchProject(vuexContext, paramsProject){
      paramsProject = vuexContext.state['paramsProject']
      projectService.searchProject(paramsProject).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.result);
          vuexContext.commit('GET_TOTAL_PROJECT', res.data.result.totalRecord);
          //No data
          if (res.data.result.totalRecord === undefined) {
            vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['018']);
            vuexContext.commit('RESET_MESSAGE');
          }
        } else {
          return res;
        }
      });
    },

    //Update 1 project
    async updateProject(vuexContext, idProject){
      projectService.updateProject(idProject).then(res => {
        if (res.data.http_code === 201) {
          vuexContext.commit('GET_NEW_PROJECT');
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')   
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', res.data.result);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    //Delete 1 project
    async deleteProject(vuexContext, idProject){
      projectService.deleteProject(idProject).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_NEW_PROJECT');
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', res.data.result);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    // Get key
    async getSecretKey(vuexContext){
      projectService.getSecretKey().then(res => {
        if (res.data.http_code === 200) {
          vuexContext.state['secretKey'] = res.data.result.secretKey
        }
      });
    },

    //Export Project
    async exportExcel(vuexContext, dataExport){
      vuexContext.state['linkExportExcel'] = projectService.exportFile(dataExport)
    },

    //Import File
    async importExcel(dataImport){
      projectService.importExcel(dataImport).then(res => {
        if (res.data === '/error/404') {
          window.open(CONTANT.linkError, '_self')   
        } else{
          window.location.reload()
        }
      });
    },
    
    //Add 1 project type
    async addProjectType(vuexContext, newPjType){
      projectService.addProjectType(newPjType).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_NEW_TYPE_PROJECT', newPjType);
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['014']);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    //Delete 1 project Type
    async deleteProjectType(vuexContext, idPjType) {
      projectService.deleteProjectType(idPjType).then(res => {
        if (res.data.http_code === 200){
          vuexContext.commit('GET_NEW_PROJECT');
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', res.data.result);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    //Show list project type
    async listProjectType(vuexContext, listProjectType){
      projectService.getProjectType(listProjectType).then(res => {
        if (res.data.http_code === 200){
          vuexContext.commit('GET_DATA_LIST_PROJECT_TYPE', res.data.result.projectTypeList);
          vuexContext.commit('GET_TOTAL_PROJECT_TYPE', res.data.result.totalRecord);
          vuexContext.commit('PROJECT_ERROR')
        } else {
          vuexContext.commit('PROJECT_ERROR');
          return res;
        }
      });
    },

    // Get id projecttype when search
    async searchProjectType(vuexContext, paramsProjectType){
      paramsProjectType = vuexContext.state['paramsProjectType']
      projectService.searchProjectType(paramsProjectType).then(res => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_PROJECT_TYPE', res.data.result.projectTypeList);
          vuexContext.commit('GET_TOTAL_PROJECT_TYPE', res.data.result.totalRecord);
        } else {
          return res;
        }
      });
    },

    //Update 1 project Type
    async updateProjectType(vuexContext, idProject){
      projectService.updateProjectType(idProject).then(res => {
        if (res.data.http_code === 201) {
          vuexContext.commit('GET_NEW_PROJECT');
          vuexContext.commit('PROJECT_SUCCESS');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', res.data.result);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    // Get key
    async getSecretKeyPjType(vuexContext){
      projectService.getSecretKeyPjType().then(res => {
        if (res.data.http_code === 200) {
          vuexContext.state['secretKeylPjType'] = res.data.result.secretKey
        }
      });
    },
    
    //Export project Type
    async exportExcelPjType(vuexContext, dataExport){
      vuexContext.state['linkExportExcelPjType'] = projectService.exportExcelPjType(dataExport)
    },
  },

  getters: {
    getParamsProjects: (state) => {
      return state.paramsProject;
    },
    getParamsTypeProjects: (state) => {
      return state.paramsProjectType;
    },
  },
};
export default project;
