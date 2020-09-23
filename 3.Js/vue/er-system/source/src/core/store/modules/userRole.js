import Vue from 'vue'
import Vuex from 'vuex'
import funcMemory from '@/core/service/memory.service.js'

Vue.use(Vuex)
const userRole = {
  strict: true,
  namespaced: true,
  state: {
    dataRole: {
      role: '',
      level: '',
      isLogin: false
    },
    listRole: [
      {
        name:'Staff&TeamLeader',
        role: 'staff',
        level: 'teamLeader',
      },
      {
        name:'Staff&Manager',
        role: 'staff',
        level: 'manager',
      },
      {
        name:'Staff&Director',
        role: 'staff',
        level: 'director',
      },
      {
        name:'Staff&Supervisor',
        role: 'staff',
        level: 'supervisor',
      },
      {
        name:'Staff&Staff',
        role: 'staff',
        level: 'staff',
      },
      {
        name:'Staff&TeamLeader',
        role: 'staff',
        level: 'teamLeader',
      },
      {
        name:'Director&Admin',
        role: 'director',
        level: 'admin',
      },
      {
        name:'Admin&Admin',
        role: 'admin',
        level: 'admin',
      },
      {
        name:'HR&Admin',
        role: 'hr',
        level: 'admin',
      },

    ]
  },

  mutations: {
    SET_DATA_ROLE(state, data) {
      state.dataRole = data
    }
  },

  actions: {
    getDataUser(vuexContext) {
      let data = {}
      if (funcMemory.getCookie('token')) {
        data = {
          level: funcMemory.getCookie('level'),
          role: funcMemory.getCookie('role'),
          isLogin: true
        }
      } else {
        data = {
          level: '',
          role: '',
          isLogin: false
        }
      }
      vuexContext.commit('SET_DATA_ROLE', data)
    }
  },

  getters: {

  },
};
export default userRole