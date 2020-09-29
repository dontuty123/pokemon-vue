import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import omProject from './modules/omProject'
import login from './modules/login'
import department from './modules/department'
import employee from './modules/employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    omProject,
    project,
    login,
    department,
    employee
  }
})
