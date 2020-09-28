import { user } from '../reducers/userReducer';

export const USER_INFO = 'USER_INFO';
export const SET_LOGIN = "SET_LOGIN";

export interface setUserInfo {
    type: typeof USER_INFO,
    data: user
}

export interface setUserLogin {
    type: typeof SET_LOGIN,
    data: user
}

export type UserActionTypes = setUserInfo | setUserLogin

export type AppActions = UserActionTypes
