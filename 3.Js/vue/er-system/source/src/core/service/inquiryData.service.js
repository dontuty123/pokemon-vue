import funcApi from '@/core/api'
const inquiryDataService = {}
inquiryDataService.getDataInQuiry = (data) => {
  return funcApi.get('projectemployeesort', data)
}

inquiryDataService.getWorkLog = (data) => {
  return funcApi.get('inquirydata-list', data)
}

//Search inquiryData 
inquiryDataService.searchWorkLog = (data) => {
  return funcApi.get('inquirydata-list', data)
}


 export default inquiryDataService
 