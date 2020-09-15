import funcCommon from '@/core/common'

const projectService = {}
//Show list project
projectService.getProject = (data) => {
  return funcCommon.getApi('project-list', data)
}

//Add 1 project
projectService.addProject = (data) => {
  return funcCommon.postApi('project-create', data)
}

// search Project 
projectService.searchProject = (data) => {
  return funcCommon.getApi('project-list', data)
}

//Update 1 project
projectService.updateProject = (data) => {
  return funcCommon.postApi('project-update', data)
}

//Delete 1 project
projectService.deleteProject = (data) => {
  return funcCommon.postApi('project-delete', data)
}

 // Get key (import, export)
projectService.getSecretKey = () => {
  return funcCommon.getApi('Project/requestSecretKey')
}

 //Import File
projectService.importExcel = () => {
  return funcCommon.importFile('project/projectImport')
}

//Export Project
projectService.exportFile = (data) => {
  return funcCommon.exportFile('Project/projectExport', data)
}

//Add 1 project type
projectService.addProjectType = (data) => {
  return funcCommon.postApi('projecttype-create', data)
}

 //Delete 1 project Type
projectService.deleteProjectType = (data) => {
  return funcCommon.postApi('projecttype-delete', data)
}

//Show list project type
projectService.getProjectType = (data) => {
  return funcCommon.getApi('projecttype-list', data)
}

//Search Project type
projectService.searchProjectType = (data) => {
  return funcCommon.getApi('projecttype-list', data)
}

 //Update 1 project Type
projectService.updateProjectType = (data) => {
  return funcCommon.postApi('projecttype-update', data)
}

 // Get key (import, export)
projectService.getSecretKeyPjType = () => {
  return funcCommon.getApi('ProjectType/requestSecretKey')
}

//Export project Type
projectService.exportExcelPjType = (data) => {
  return funcCommon.exportFile('ProjectType/projectTypeExport', data)
}

export default projectService