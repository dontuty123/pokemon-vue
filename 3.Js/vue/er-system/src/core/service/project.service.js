import funcApi from '@/core/api'

const projectService = {}
//Show list project
projectService.getProject = (data) => {
  return funcApi.get('project-list', data)
}

//Add 1 project
projectService.addProject = (data) => {
  return funcApi.post('project-create', data)
}

// search Project 
projectService.searchProject = (data) => {
  return funcApi.get('project-list', data)
}

//Update 1 project
projectService.updateProject = (data) => {
  return funcApi.post('project-update', data)
}

//Delete 1 project
projectService.deleteProject = (data) => {
  return funcApi.post('project-delete', data)
}

 // Get key (import, export)
projectService.getSecretKey = () => {
  return funcApi.get('Project/requestSecretKey')
}

 //Import File
projectService.importExcel = () => {
  return funcApi.importFile('project/projectImport')
}

//Export Project
projectService.exportFile = (data) => {
  return funcApi.exportFile('Project/projectExport', data)
}

//Add 1 project type
projectService.addProjectType = (data) => {
  return funcApi.post('projecttype-create', data)
}

 //Delete 1 project Type
projectService.deleteProjectType = (data) => {
  return funcApi.post('projecttype-delete', data)
}

//Show list project type
projectService.getProjectType = (data) => {
  return funcApi.get('projecttype-list', data)
}

//Search Project type
projectService.searchProjectType = (data) => {
  return funcApi.get('projecttype-list', data)
}

 //Update 1 project Type
projectService.updateProjectType = (data) => {
  return funcApi.post('projecttype-update', data)
}

 // Get key (import, export)
projectService.getSecretKeyPjType = () => {
  return funcApi.get('ProjectType/requestSecretKey')
}

//Export project Type
projectService.exportExcelPjType = (data) => {
  return funcApi.exportFile('ProjectType/projectTypeExport', data)
}

export default projectService