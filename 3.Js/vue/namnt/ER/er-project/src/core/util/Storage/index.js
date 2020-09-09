const storage = {
  getDataStorage(nameData){
    let data = JSON.parse(localStorage.getItem('result'))
    if(data === '' || data === null) {
      return 
    } else {
      return JSON.parse(localStorage.getItem('result'))[nameData]
    }
    
  }
}
export default storage