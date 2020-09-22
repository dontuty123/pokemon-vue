//common function call api GET/POST/PUT/DELETE 
import axios from 'axios';
import CONTANT from '@/core/contant';
import qs from 'qs';
import funcMemory from '@/core/service/memory.service.js'

const headers = {
  token: funcMemory.getCookie('token'),
  email: funcMemory.getCookie('email'),
  employeeCode: funcMemory.getCookie('employeeCode'),
  Pragma: 'no-cache'
}
console.log('headers: ', headers);
const headerImport = headers
headerImport['Content-Type'] = 'multipart/form-data'
const funcApi = {
  post(url, data){
    return axios({
      method: 'post',
      url: CONTANT.url + url + '?' + qs.stringify(data),
      headers: headers
    });
  },

  put(url, data){
    return axios({
      method: 'put',
      url: CONTANT.url + url,
      data: qs.stringify(data),
      headers: headers
    });
  },

  get(url, data){
    return axios({
      method: 'get',
      url: CONTANT.url + url + '?' + qs.stringify(data),
      headers: headers
    });
  },

  exportFile(url, data){
    return CONTANT.url + url + '?' + qs.stringify(data)
  },
}
export default funcApi
