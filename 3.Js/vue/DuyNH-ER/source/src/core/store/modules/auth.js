import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import Cookie from 'js-cookie'
import authService from '@/core/service/auth.service'
import router from '@/core/router'
import MESSAGE from '@/core/message';
Vue.use(Vuex)
const getDefaultState = () => {
  return {
    token: '',
    user: '',
  }
}
const auth = {
  namespaced: true,
  strict: true,

  state: {
    isLoading: false,
    messageResult: '',
  },
  mutations: {
    SET_COOKIE: (state, token, user) => {
      state.token = token
      state.user = user
    },

    LOGIN_ERROR(state) {
      state.isLoading = false
      state.messageResult = MESSAGE['001']
    },

    LOGIN_SUCCESS(state) {
      state.isLoading = true
      state.messageResult = ''
    },
    
    RESET: state => {
      Object.assign(state, getDefaultState())
    },
  },

  actions: {
    //Login
    async setUserData(vuexContext, userData) {
      const numberTime = 20000
      authService.login(userData).then(res => {
        if (res.data.http_code === 200) {
          const userDataResponse = res.data.result
          vuexContext.commit('SET_COOKIE', userDataResponse.token, userDataResponse.employeeName);
          Cookie.set('user_data', qs.stringify(userDataResponse));
          Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(numberTime) * 1000);
          authService.Authorization(userDataResponse.token);
          vuexContext.commit('LOGIN_SUCCESS')
          router.push('/')
        } else {
          vuexContext.commit('LOGIN_ERROR')
        }
      })
    },

    removeCookie: (params) => {
      Cookie.remove(params)
    },

    //Logout
    logout: ({ commit }) => {
      commit('RESET', '');
      //Clear cookie
      Cookie.remove('user_data')
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.token
    },

    getUser: state => {
      return state.user
    },

    getMessageFromApi: state => {
      return state.messageResult
    }
  }
};
export default auth;
