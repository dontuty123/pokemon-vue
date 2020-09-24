import qs from 'qs';
import Cookie from 'js-cookie'

const funcMemory = {
  getCookie(param) {
    const valueCookie = qs.parse(Cookie.get('userData'))
    return valueCookie[param]
  }
}
export default funcMemory
