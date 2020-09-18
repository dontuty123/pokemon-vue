import Vue from 'vue';
import Vuex from 'vuex';
import projectService from '@/core/service/project.service';

Vue.use(Vuex);
const omproject = {
  namespaced: true,
  strict: true,
  state: {
    listProjects: [],
    dataProjectDemo:[
      {
        id: '1',
        projectCode: 'projectCode1',
        projectName: 'projectName01',
        aliasName: 'aliasName1',
        projectType: 'projectType1',
        activeProject: 1,
      },
      {
        id: '2',
        projectCode: 'projectCode2',
        projectName: 'projectName02',
        aliasName: 'aliasName2',
        projectType: 'projectType2',
        activeProject: 1,
      },
      {
        id: '3',
        projectCode: 'projectCode3',
        projectName: 'projectName03',
        aliasName: 'aliasName3',
        projectType: 'projectType3',
        activeProject: 0,
      },
      {
        id: '4',
        projectCode: 'projectCode4',
        projectName: 'projectName04',
        aliasName: 'aliasName4',
        projectType: 'projectType4',
        activeProject: 1,
      },
      {
        id: '5',
        projectCode: 'projectCode5',
        projectName: 'projectName05',
        aliasName: 'aliasName5',
        projectType: '',
        activeProject: 0,
      },
      
    ]
  },
  
  mutations: {
    GET_DATA_LIST_PROJECT: (state, listProjects) => {
      state.listProjects = listProjects;
    },
  },

  actions: {
    //Show list project
    async getProject(vuexContext, paramsProject, dataDemo){
      // projectService.getProject(paramsProject).then(res => {
      //   if (res.data.http_code === 200) {
      //     const tmp = {}
      //     vuexContext.commit('GET_DATA_LIST_PROJECT', res.data.result.result);
      //     vuexContext.commit('GET_TOTAL_PROJECT', res.data.result.totalRecord);
      //     vuexContext.commit('PROJECT_ERROR')
      //     if (res.data.result.totalRecord === undefined) {
      //       vuexContext.commit('GET_MESSAGE_FROM_API', MESSAGE['018']);
      //       vuexContext.commit('RESET_MESSAGE');
      //     }
      //   } else {
      //     vuexContext.commit('PROJECT_ERROR');
      //     return res;
      //   }
      // });
      dataDemo = vuexContext.state['dataProjectDemo']
      vuexContext.commit('GET_DATA_LIST_PROJECT', dataDemo);
    },
  }, 

  getters: {

  }
}
export default omproject;
