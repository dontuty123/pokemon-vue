import Vue from 'vue'
import App from './App.vue'
import router from '@/core/router'
import store from '@/core/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/assets/scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
