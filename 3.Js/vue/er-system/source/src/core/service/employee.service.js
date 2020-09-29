//API call in page deparimport funcApi from '@/core/api'
import funcApi from '@/core/api'
const employeeService = {}
//Get list
employeeService.getList = (data) => {
  return funcApi.get('employee-list', data)
}

employeeService.getPositionList = (data) => {
  return funcApi.get('position-list', data)
}

employeeService.getdepartmentList = (data) => {
  return funcApi.get('department-list', data)
}

//Search data in list
// departmentService.searchList = (data) => {
//   return funcApi.get('department-list', data)
// }

//Add data in list
// departmentService.addList = (data) => {
//   return funcApi.post('department-create', data)
// }

//Update data in lisst
// departmentService.updateList = (data) => {
//   return funcApi.post('department-update', data)
// }

//Delete data in list
// departmentService.deleteList = (data) => {
//   return funcApi.post('department-delete', data)
// }

//Get new secret key
// departmentService.getKey = (data) => {
//   return funcApi.get('Department/requestSecretKey', data)
// }

//Export file excel
// departmentService.exportFile = (data) => {
//   return funcApi.exportFile('Department/departmentExport', data)
// }
export default employeeService
