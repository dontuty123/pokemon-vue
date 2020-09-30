import { AppActions, USER_INFO, SET_LOGIN, SET_LOGOUT } from '../types/actions';
import * as Cookie from '../../cookie';
import { user } from '../types/user';

const userInfo = (data: user): AppActions => {
    return {
        type: USER_INFO,
        data
    }
}

const setLogin = (data: user): AppActions => {
    Cookie.setCookie('result', JSON.stringify(data), 120 * 60)
    return {
        type: SET_LOGIN,
        data
    }
}

const setLogout = (): AppActions => {
    Cookie.removeCookie('result');
    return {
        type: SET_LOGOUT,
    }
}

export {
    USER_INFO,
    SET_LOGIN,
    SET_LOGOUT,
    userInfo,
    setLogin,
    setLogout
}