import funcCommon from '@/core/common'
import Axios from 'axios'

const authService = {}

authService.login = (data) => {
  return funcCommon.postApi('login', data)
}
authService.login = (data) => {
  return funcCommon.postApi('register', data)
}
authService.login = (data) => {
  return funcCommon.postApi('change', data)
}
authService.login = (data) => {
  return funcCommon.postApi('login', data)
}
authService.Authorization = (data) => {
  return Axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
}
export default authService
