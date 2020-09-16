import fnAPI from '@/core/api'
const authService = {}

authService.login = (data) => {
  return fnAPI.postApi('login', data)
},

authService.forgot = (data) => {
  return fnAPI.postApi('forgot-password', data)
},

authService.reset = (data) => {
  return fnAPI.putApi('reset-password', data)
},

authService.secret = (data) => {
  return fnAPI.postApi('check-reset-pass-secret-key', data)
},

authService.changePass = (data) => {
  return fnAPI.putApi('change-password', data)
}

// authService.getList = (data) => {
//   return fnAPI.getApi('position-list', data)
// },

// authService.addRecordPosition = (data) => {
//   return fnAPI.postApi('position-create', data)
// },

// authService.updateRecordPosition = (data) => {
//   return fnAPI.postApi('position-update', data)
// },
// authService.deleteRecordPosition = (data) => {
//   return fnAPI.postApi('position-delete', data)
// },
// authService.getProject = (data) => {
//   return fnAPI.getApi('project-list', data)
// },
// authService.getProjectType = (data) => {
//   return fnAPI.getApi('projecttype-list', data)
// },
// authService.addProjectData = (data) => {
//   return fnAPI.postApi('project-create', data)
// }


export default authService
