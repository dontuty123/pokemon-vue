//API call in page deparimport funcApi from '@/core/api'
import funcApi from '@/core/api'
const departmentService = {}

departmentService.getList = (data) => {
  return funcApi.get('department-list', data)
}
departmentService.searchList = (data) => {
  return funcApi.get('department-list', data)
}
departmentService.addList = (data) => {
  return funcApi.post('department-create', data)
}
departmentService.updateList = (data) => {
  return funcApi.post('department-update', data)
}
departmentService.deleteList = (data) => {
  return funcApi.post('department-delete', data)
}
departmentService.getKey = (data) => {
  return funcApi.get('Department/requestSecretKey', data)
}
departmentService.exportFile = (data) => {
  return funcApi.exportFile('Department/departmentExport', data)
}
export default departmentService
