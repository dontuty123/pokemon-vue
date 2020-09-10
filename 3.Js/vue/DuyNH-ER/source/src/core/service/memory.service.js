import qs from 'qs';
import Cookie from 'js-cookie'


const funcMemory = {
  getCookie(param) {
    const valueCookie = qs.parse(Cookie.get('user_data'))
    return valueCookie[param]
  }
}
export default funcMemory
