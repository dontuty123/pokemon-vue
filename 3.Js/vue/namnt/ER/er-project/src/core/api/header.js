import storage from '@/core/util/Storage'
const service = {}
  service.header = () => {
    const token = storage.getDataStorage('token')
    const email = storage.getDataStorage('email')
    const employeeCode = storage.getDataStorage('employeeCode')
    if (token === '' || token === null ) {
      return {
        token: '',
        email: '',
        employeeCode: ''
      }
    } else {
      return {
        token: token,
        email: email,
        employeeCode: employeeCode
      }
    }
  }

export default service