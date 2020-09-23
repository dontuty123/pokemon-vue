import { AppActions, USER_INFO, SET_LOGIN } from '../types/actions';
import { user } from '../types/user';

const userInfo = (data: user): AppActions => {
    return {
        type: USER_INFO,
        data
    }
}

const setLogin = (data: user): AppActions => {
    return {
        type: SET_LOGIN,
        data
    }
}

export {
    USER_INFO,
    SET_LOGIN,
    userInfo,
    setLogin
}