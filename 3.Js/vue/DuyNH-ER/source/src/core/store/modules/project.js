import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs';
import axios from 'axios';
import CONTANT from '@/core/contant';
import Cookie from 'js-cookie';
import authService from '@/core/service/auth.service';
import router from '@/core/router';
import MESSAGE from '@/core/message';
import funcCommon from '@/core/common';
import funcMemory from '@/core/service/memory.service.js'

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
    valueSelected: [],
    valueTypeSelected: {},
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
    GET_DATA_PROJECT_TYPE_SELECTED: (state, valueTypeSelected) => {
      state.valueTypeSelected = valueTypeSelected;
    },

    GET_DATA_VALUE_SELECTED(state, valueSelected) {
      state.valueSelected = valueSelected;
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
      funcCommon.getApi('project-list', paramsProject).then((res) => {
        if (res.data.http_code === 200) {
          const tmp = {}
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.result);
          vuexContext.commit('GET_DATA_VALUE_SELECTED', tmp);
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
      funcCommon.postApi('project-create', newProject).then((res) => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_NEW_PROJECT', newProject);
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
          vuexContext.commit('PROJECT_SUCCESS');
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
      funcCommon.getApi('project-list', paramsProject).then((res) => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.result);
          vuexContext.commit('GET_TOTAL_PROJECT', res.data.result.totalRecord);
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
      funcCommon.postApi('project-update', idProject).then((res) => {
        if (res.data.http_code === 201) {
          vuexContext.commit('GET_NEW_PROJECT');
          vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['000']);
          vuexContext.commit('RESET_MESSAGE')
          vuexContext.commit('PROJECT_SUCCESS');
        } else {
          vuexContext.commit('PROJECT_ERROR');
          vuexContext.commit('GET_MESSAGE_FROM_API', res.data.result);
          vuexContext.commit('RESET_MESSAGE')
          return res;
        }
      });
    },

    //Selected project
    async selectedProject(vuexContext, selectedParams){
      vuexContext.commit('GET_DATA_VALUE_SELECTED', selectedParams);
    },

    //Delete 1 project
    async deleteProject(vuexContext, idProject){
      funcCommon.postApi('project-delete', idProject).then((res) => {
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
      funcCommon.getApi('Project/requestSecretKey').then((res) => {
        if (res.data.http_code === 200) {
          vuexContext.state['secretKey'] = res.data.result.secretKey
        }
      });
    },

    //Export Project
    async exportExcel(vuexContext, dataExport){
      vuexContext.state['linkExportExcel'] = funcCommon.exportFile('Project/projectExport', dataExport)
    },

    //Import File
    async importExcel(dataImport){
      funcCommon.importFile('project/projectImport', dataImport).then((res) => {   
        if (res.data === '/error/404') {
          window.open(CONTANT.linkError, '_self')   
        } else{
          window.location.reload()
        }
      });
    },
    
    //Add 1 project type
    async addProjectType(vuexContext, newPjType){
      funcCommon.postApi('projecttype-create', newPjType).then((res) => {
        if (res.data.http_code === 200) {
          vuexContext.commit('GET_NEW_TYPE_PROJECT', newPjType);
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

    //Selected project Type
    async selectedProjectType(vuexContext, selectedParams){
      vuexContext.commit('GET_DATA_VALUE_SELECTED', selectedParams);
    },

    //Delete 1 project Type
    async deleteProjectType(vuexContext, idPjType) {
      funcCommon.postApi('projecttype-delete', idPjType).then((res) => {
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
      funcCommon.getApi('projecttype-list', listProjectType).then((res) => {
        if (res.data.http_code === 200){
          vuexContext.commit('GET_DATA_LIST_PROJECT_TYPE', res.data.result.projectTypeList);
          // vuexContext.commit('GET_DATA_PROJECT_TYPE_SELECTED', tmp);
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
      funcCommon.getApi('projecttype-list', paramsProjectType).then((res) => {
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
      funcCommon.postApi('projecttype-update', idProject).then((res) => {
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
      funcCommon.getApi('ProjectType/requestSecretKey').then((res) => {
        if (res.data.http_code === 200) {
          vuexContext.state['secretKeylPjType'] = res.data.result.secretKey
        }
      });
    },
    //Export project Type
    async exportExcelPjType(vuexContext, dataExport){
      vuexContext.state['linkExportExcelPjType'] = funcCommon.exportFile('ProjectType/projectTypeExport', dataExport)
    },
  },

  getters: {
    getParamsProjects: (state) => {
      return state.paramsProject;
    },
    getParamsTypeProjects: (state) => {
      return state.paramsProjectType;
    },
    getlistProjects: (state) => {
      return state.listProjects;
    },

    getListProjectType: (state) => {
      return state.listProjectType;
    },

    getListValueSelected: (state) => {
      return state.valueSelected;
    },

    addNewProject: (state) => {
      return state.newProject;
    },
  },
};
export default project;
