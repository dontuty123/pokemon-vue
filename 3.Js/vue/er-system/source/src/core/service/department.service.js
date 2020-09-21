//API call in page deparimport funcApi from '@/core/api'
import funcApi from '@/core/api'
const departmentService = {}

departmentService.getList = (data) => {
  return funcApi.get('department-list', data)
}
export default departmentService