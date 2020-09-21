import CONST_API from '../../core/constant/constant';
import axios from 'axios';


export const loginAction =(data) => {
    return dispatch => {
       
       auth.login(data)
       .then(
           res=>{
               if(!res) return;
                dispatch(rerponresult(res['error_code']));
           }
       )
    };
    function rerponresult(error) {
        return {
            type: 'LOGIN',
            error
        }
    }
}

export const auth={};
auth.login= async(param)=>{
    const _body = "email=" + param.email + "&password=" + param.password;

    return axios({
            method: 'post',
            url: CONST_API.apiUrl + 'login',
            data: _body
        }).then((response) => {
            return response.data;
            // if (response.data.error_code !== '') {
            //     this.setState({
            //         errorCode: response.data.error_code
            //     })
            // } else {
            //     this.setState({
            //         errorCode: ''
            //     })
            // }
        }).catch((err) => console.log(err))
}

export const forgotAction =(data) => {
    return {
        type: 'abc'
    };
}

export const success =() => {
    return {
        type: 'SUCCESS'
    };
}

export const fail =() =>{
    return {
        type: 'FAIL'
    };
}
