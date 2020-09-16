import fnAPI from '@/core/api'
const authPosition = {}

authPosition.getList = (data) => {
  return fnAPI.getApi('position-list', data)
},

authPosition.addRecordPosition = (data) => {
  return fnAPI.postApi('position-create', data)
},

authPosition.updateRecordPosition = (data) => {
  return fnAPI.postApi('position-update', data)
},
authPosition.deleteRecordPosition = (data) => {
  return fnAPI.postApi('position-delete', data)
}

export default authPosition