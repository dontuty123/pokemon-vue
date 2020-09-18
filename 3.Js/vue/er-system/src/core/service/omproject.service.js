import funcApi from '@/core/api'
const omProjectService = {}

//Show list project
omProjectService.getOmProject = (data) => {
  return funcApi.get('omproject-list', data)
}
//Add 1 project
omProjectService.addOmProject = (data) => {
  return funcApi.post('omproject-create', data)
}

// search Project 
omProjectService.searchOmProject = (data) => {
  return funcApi.get('omproject-list', data)
}

//Update 1 project
omProjectService.updateOmProject = (data) => {
  return funcApi.post('omproject-update', data)
}

//Delete 1 project
omProjectService.deleteOmProject = (data) => {
  return funcApi.post('omproject-delete', data)
}

 // Get key (import, export)

 //Export OM Project


 export default omProjectService