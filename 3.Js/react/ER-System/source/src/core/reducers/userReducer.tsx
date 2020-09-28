import { USER_INFO, SET_LOGIN, UserActionTypes } from '../actions/type';

export interface user {
    isLoggedIn?: boolean,
    employeeId: number,
    employeeName: string,
    token: string;
}

const initialState: user = {
    isLoggedIn: false,
    employeeId: 0,
    employeeName: "",
    token: ""
}

export const userReducer = (state = initialState, action: UserActionTypes): user => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                ...action.data,
                isLoggedIn: true
            }
        case USER_INFO:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}
