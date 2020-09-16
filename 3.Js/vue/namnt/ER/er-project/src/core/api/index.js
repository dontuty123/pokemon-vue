import axios from 'axios'
import CONTANT from '@/core/contant'
import service from '@/core/api/header'
import qs from 'qs'
const fnAPI = {
  postApi(url, data) {
    return axios( {
      method: 'post',
      headers: service.header(),
      url: CONTANT.apiURL + url ,
      data: qs.stringify(data)
    });
  },

  putApi(url, data) {
    return axios( {
      method: 'put',
      headers: service.header(),
      url: CONTANT.apiURL + url ,
      data: qs.stringify(data)
    });
  },
   
  getApi(url, data) {
    return axios( {
      method: 'get',
      headers: service.header(),
      url: CONTANT.apiURL + url + '?' + qs.stringify(data),
    });
  }
}
export default fnAPI
