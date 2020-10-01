import { user } from './user';

export const USER_INFO = 'USER_INFO';
export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";

export interface setUserInfo {
    type: typeof USER_INFO,
    data: user
}

export interface setUserLogin {
    type: typeof SET_LOGIN,
    data: user
}

export interface setUserLogout {
    type: typeof SET_LOGOUT
}

export type UserActionTypes = setUserInfo | setUserLogin | setUserLogout

export type AppActions = UserActionTypes