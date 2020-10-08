import CONST_API from '../../core/constant/constant';
import axios from 'axios';
import functionCommon from '../common/function';

//Login Action
export const loginAction = (data) => {
    return dispatch => {

        auth.login(data)
            .then(
                res => {
                    if (!res) return;
                    dispatch(rerponresult(res['error_code']));
                    functionCommon.setCookie(res['result'],'result');
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'LOGIN',
            error
        }
    }
    
}

export const auth = {};

auth.login = async (param) => {
    const _body = "email=" + param.email + "&password=" + param.password;
    if (param.email !== '' && param.password !== '') {
        return axios({
            method: 'post',
            url: CONST_API.apiUrl + 'login',
            data: _body
        }).then((response) => {
            if (response.data.error_code !== '') {
                return response.data;
            } else {
                response.data.error_code = '004'
                return response.data;
            }
        }).catch((err) => console.log(err))

    }

}

//Forgot Action
export const forgotAction = (data) => {
    return dispatch => {

        auth.forgot(data)
            .then(
                res => {
                    if (!res) return;
                    dispatch(rerponresult(res['error_code']));
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'FORGOT',
            error
        }
    }
}

auth.forgot = async (param) => {
    const _body = "email=" + param.email;
    if (param.email !== '') {
        return axios({
            method: 'post',
            url: CONST_API.apiUrl + 'forgot-password',
            data: _body
        }).then((response) => {
            if (response.data.error_code !== '') {
                return response.data;
            } else {
                response.data.error_code = '004'
                return response.data;
            }
        }).catch((err) => console.log('err: ', err))// call api fail
    }
}

//Reset Action
export const resetAction = (data) => {
    return dispatch => {

        auth.reset(data)
            .then(
                res => {
                    if (!res) return;
                    dispatch(rerponresult(res['http_code']));
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'RESET',
            error
        }
    }
}

auth.reset = async (param) => {
    const _body = "resetPassSecretKey=" + param.code + "&newPassword=" + param.password;
    if (param.password !== '') {
        return axios({
            method: 'PUT',
            url: CONST_API.apiUrl + 'reset-password',
            data: _body
        }).then(res => {
            return res.data;
        }).catch((err) => console.log(err))
    }
}

//Check key Action
export const checkKeyAction = (data) => {
    return dispatch => {

        auth.checkkey(data)
            .then(
                res => {
                    if (!res) return;
                    switch (res['http_code']) {
                        case 200:
                            dispatch(rerponresult('OK'));
                            break;

                        default:
                            dispatch(rerponresult('secretKey'));
                            break;
                    }
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'CHECKKEY',
            error
        }
    }
}

auth.checkkey = (param) => {
    const _body = "resetPassSecretKey=" + param.checkkey;
    return axios({
        method: 'post',
        url: CONST_API.apiUrl + 'check-reset-pass-secret-key',
        data: _body
    }).then(res => {
        return res.data;
    }).catch((err) => console.log(err))
}

//List position Action
export const listPositionAction = (data) => {
    return dispatch => {
        auth.listposition(data)
            .then(
                res => {
                    if (!res) return;
                    dispatch(rerponresult(res['error_code']));
                    functionCommon.setCookie(res['result'],'result');
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'LISTPOSSITION',
            error
        }
    }
    
}

auth.listposition = async (param) => {
    //header api
    //isSearch
    //positionCode
    //positionName
    //currentPage
    //pageRecord
    //sortBy
    
}


//Create position Action
export const createPositionAction = (data) => {
    return dispatch => {
        auth.createposition(data)
            .then(
                res => {
                    if (!res) return;
                    dispatch(rerponresult(res['error_code']));
                    functionCommon.setCookie(res['result'],'result');
                }
            )
    };
    function rerponresult(error) {
        return {
            type: 'CREATEPOSSITION',
            error
        }
    }
    
}

auth.createposition = async (param) => {
}


//Clear Action
export const clearError = () => {
    return {
        type: 'CLEAR'
    }
}