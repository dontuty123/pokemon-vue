
export const initialState = {
    errorCode: '',
    errorCodeReset: 0
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                errorCode: action.error
            }
        case 'FORGOT':
            return {
                errorCode: action.error
            }
        case 'RESET':
            return {
                errorCodeReset: action.error
            }
        case 'CHECKKEY':
            return {
                errorCode: action.error
            }
        case 'CLEAR':
            return {
                errorCode: ''
            }
        default:
            return state;
    }
}

export default authReducer;
