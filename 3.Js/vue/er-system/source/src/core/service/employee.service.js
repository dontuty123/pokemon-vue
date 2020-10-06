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

// Search data in list
employeeService.searchList = (data) => {
  return funcApi.get('employee-list', data)
}

employeeService.addList = (data) => {
  return funcApi.post('employee-create', data)
}

employeeService.updateList = (data) => {
  return funcApi.post('employee-update', data)
}

employeeService.deleteList = (data) => {
  return funcApi.post('employee-delete', data)
}

employeeService.getKey = (data) => {
  return funcApi.get('Employee/requestSecretKey', data)
}

// Export file excel
employeeService .exportFile = (data) => {
  return funcApi.exportFile('Employee/employeeExport', data)
}
export default employeeService
