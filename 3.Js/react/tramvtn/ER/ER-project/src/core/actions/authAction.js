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

export const auth = {};

auth.login= async(param)=>{
    const _body = "email=" + param.email + "&password=" + param.password;
    if (param.email !== '' && param.password !== ''){
        return axios({
            method: 'post',
            url: CONST_API.apiUrl + 'login',
            data: _body
        }).then((response) => {
            if (response.data.error_code !== ''){
                return response.data;
            }else{
                response.data.error_code = '004'
                return response.data;
            }
        }).catch((err) => console.log(err))

    }
   
}

export const forgotAction =(data) => {
    return dispatch => {
       
       auth.forgot(data)
       .then(
           res=>{
               if(!res) return;
                dispatch(rerponresult(res['error_code']));
           }
       )
    };
    function rerponresult(error) {
        return {
            type: 'FORGOT',
            error
        }
    }
}

auth.forgot = async(param) => {
    const _body = "email=" + param.email;
    if (param.email !== ''){
        return axios({
            method: 'post',
            url: CONST_API.apiUrl + 'forgot-password',
            data: _body
        }).then((response) => {
            if (response.data.error_code !== '') {
                return response.data;
            }else{
                response.data.error_code = '004'
                return response.data;
            }
        }).catch((err) => console.log('err: ',err))// loi goi api that bai 
    }
}

export const clearError  =() => {
    return {
        type: 'CLEAR'
    }
}