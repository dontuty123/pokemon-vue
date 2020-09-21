
import Vue from 'vue'
import en from '@/core/translate/en.json'
import vn from '@/core/translate/vn.json'
import VueI18n from 'vue-i18n'
import cookie from 'js-cookie'
Vue.use(VueI18n)

const messages = {
  'en': en,
  'vn': vn
}
let defaultLng = cookie.get('userLang')
defaultLng = !defaultLng ? 'en' : defaultLng
export let i18n = new VueI18n({
  locale: defaultLng, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})