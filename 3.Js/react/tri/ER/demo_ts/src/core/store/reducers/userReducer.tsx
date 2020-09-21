import { USER_INFO, SET_LOGIN } from '../actions/userAction';
import { UserActionTypes } from '../types/actions';
import { user } from '../types/user';

const initialState: user = {
    isLoggedIn: false,
    user_id: 0,
    token: ""
}

const userReducer = (state = initialState, action: UserActionTypes): user => {
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

export {
    userReducer
}