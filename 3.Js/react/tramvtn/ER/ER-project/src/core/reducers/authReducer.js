
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
        case 'LISTPOSSITION':
            return {
                errorCode: action.error

            }
        case 'CREATEPOSSITION':
            return {
                errorCode: action.error
            }
        case 'UPDATEPOSSITION':
            return {
                errorCode: action.error
            }
        case 'SEARCHPOSSITION':
            return {
                errorCode: action.error
            }
        case 'DELETEPOSSITION':
            return {
                errorCode: action.error
            }
        case 'EXPORTPOSSITION':
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
