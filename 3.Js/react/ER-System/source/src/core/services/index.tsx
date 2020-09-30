/**
 *
 * Call api backend
 */

import HeaderSever from './header';
import axios from 'axios';
import qs from 'qs';
import * as CONSTANT from '../constant';

const getApi = (url: string, data: any) => {
    return axios({
        method: 'get',
        url: CONSTANT.SERVER_API + url + "?" + qs.stringify(data),
        headers: HeaderSever(),
    });
}

const postApi = (url: string, data: any) => {
    return axios({
        method: 'post',
        url: CONSTANT.SERVER_API + url,
        headers: HeaderSever(),
        data: qs.stringify(data)
    });
}

const putApi = (url: string, data: any) => {
    return axios({
        method: 'put',
        url: CONSTANT.SERVER_API + url,
        headers: HeaderSever(),
        data: qs.stringify(data)
    });
}

export {
    getApi,
    postApi,
    putApi
}