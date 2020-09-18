import funcApi from '@/core/api'
import Axios from 'axios'

const authService = {}

authService.login = (data) => {
  return funcApi.post('login', data)
}
authService.login = (data) => {
  return funcApi.post('register', data)
}
authService.login = (data) => {
  return funcApi.post('change', data)
}
authService.login = (data) => {
  return funcApi.post('login', data)
}
authService.Authorization = (data) => {
  return Axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
}
export default authService
