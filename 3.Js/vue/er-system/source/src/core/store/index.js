import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import omproject from './modules/omproject'
import login from './modules/login'
import department from './modules/department'
import userRole from './modules/userRole'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    omproject,
    project,
    login,
    department,
    userRole
  }
})
