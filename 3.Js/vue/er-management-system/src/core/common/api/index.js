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
const headerImport = headers
headerImport['Content-Type'] = 'multipart/form-data'

const funcApi = {
  importFile(url, data) {
    return axios({
      method: 'post',
      url: CONTANT.apiURL + url,
      headers:headerImport,
      data: data
    });
  },

  exportFile(url, data){
    return CONTANT.apiURL + url + '?' + qs.stringify(data)
  },

  post(url, data){
    return axios({
      method: 'post',
      url: CONTANT.apiURL + url + '?' + qs.stringify(data),
      headers: headers
    });
  },

  put(url, data){
    return axios({
      method: 'put',
      url: CONTANT.apiURL + url,
      data: qs.stringify(data),
      headers: headers
    });
  },

  get(url, data){
    return axios({
      method: 'get',
      url: CONTANT.apiURL + url + '?' + qs.stringify(data),
      headers: headers
    });
  },
}

export default funcApi
