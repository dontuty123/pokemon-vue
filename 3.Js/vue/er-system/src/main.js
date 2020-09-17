import Vue from 'vue'
import App from '@/App.vue'
import router from '@/core/router'
import store from '@/core/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/assets/scss/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { i18n } from '@/core/util/i18n';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  BootstrapVue,
  i18n,
  render: h => h(App)
}).$mount('#app')