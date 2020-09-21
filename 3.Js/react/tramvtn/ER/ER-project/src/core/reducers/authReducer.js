
export const initialState = {
    errorCode : ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                errorCode: action.error
            }
        default:
            return state;
    }
}

export default authReducer;
