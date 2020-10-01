import axios from 'axios';
import * as CONTANT from '../constant';
import qs from 'qs';
import HeaderSever from './header';

const postApi = (url: string, data: any) => {
    return axios({
        method: 'post',
        headers: HeaderSever(),
        url: CONTANT.SERVER_API + url,
        data: qs.stringify(data)
    });
}

const putApi = (url: string, data: any) => {
    return axios({
        method: 'put',
        headers: HeaderSever(),
        url: CONTANT.SERVER_API + url,
        data: qs.stringify(data)
    });
}

const getApi = (url: string, data: any) => {
    return axios({
        method: 'get',
        headers: HeaderSever(),
        url: CONTANT.SERVER_API + url + '?' + qs.stringify(data),
    });
}

export {
    postApi,
    putApi,
    getApi
}
