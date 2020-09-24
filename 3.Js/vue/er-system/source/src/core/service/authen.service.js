// API call in page login
import funcApi from '@/core/api'

const loginService = {}

loginService.postUser = (data) => {
  return funcApi.post('login', data)
}

export default loginService
