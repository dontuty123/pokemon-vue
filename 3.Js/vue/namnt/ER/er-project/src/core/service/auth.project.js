import fnAPI from '@/core/api'
const authProject = {}

authProject.getProject = (data) => {
  return fnAPI.getApi('project-list', data)
},
authProject.getProjectType = (data) => {
  return fnAPI.getApi('projecttype-list', data)
},
authProject.addProjectData = (data) => {
  return fnAPI.postApi('project-create', data)
},
authProject.updateProjectData = (data) => {
  return fnAPI.postApi('project-update', data)
},
authProject.deleteProjectData = (data) => {
  return fnAPI.postApi('project-delete', data)
}
export default authProject