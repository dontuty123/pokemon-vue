
export const initialState = {
    errorCode : ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                errorCode: action.error
            }
        case 'FORGOT':
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
