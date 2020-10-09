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
};

// get secretKey export
const getSecretKey = async (nameExport:string) => {
    const _nameExport = nameExport;
    const secretKey = await getApi(_nameExport, '');
    return secretKey.data.result.secretKey;
};

// common get keyExport
const common = async (param: any, url: string, _secretKey:string) => {
    const secretKey = _secretKey;
    const _param = param;
    _param.secretKey = secretKey;
    const secretParams = qs.stringify(param);
    const urlLink = CONSTANT.SERVER_API + url + secretParams;
    window.open(urlLink, "_blank");
};

export {
    getApi,
    postApi,
    putApi,
    common,
    getSecretKey
}
