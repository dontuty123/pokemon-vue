
import Vue from 'vue';
import en from '@/core/translate/en.json'
import vn from '@/core/translate/vn.json'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);
const messages = {
  'en': en,
  'vn': vn
}
export let i18n = new VueI18n({
  locale: 'vn', // set locale
  fallbackLocale: 'vn', // set fallback locale
  messages, // set locale messages
});