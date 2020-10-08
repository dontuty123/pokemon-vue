import {matchPath} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const functionCommon = {};


/**
 * Function check validate of mail
 *
 */
functionCommon.validateEmail = (email) => {
    const validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validate.test(email)
}

/**
 * Function check validate of password
 * 
 * At least one lowercase character
 * At least one uppercase character
 * At least one number
 * At least one special character
 * At least 8 characters
 */
functionCommon.validatePass = (password) => {
    const validate = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const isValidate = validate.test(password) ? true : false;
    return isValidate;
}

/**
 * function get value key 
 * get path 
 */
functionCommon.getCurrentPath = (pathname, _path) => {
    const match = matchPath(
        pathname,
        { path: _path }
    );
    if (match !== null){
        return match.params.code;
    } else {
        window.location = '/login';
    } 
    
}
/**
 * function set cookie 
 * set result 
 */
functionCommon.setCookie = (data, cookiesName) => {
    const timestamp = new Date().getTime();
    const expire = timestamp + (60 * 60 * 24 * 1000 * 1);
    const expireDate = new Date(expire);
    cookies.set(cookiesName, data, { expires: expireDate });
}

/**
 * function get cookie 
 * get result 
 */
functionCommon.getCookie = (cookiesName) => {
    let result = cookies.get(cookiesName);
    return result;
}

/**
 * function get api header 
 * 
 */
functionCommon.getApiHeader = () =>{
    const result = functionCommon.getCookie('result') 
    // check = !result ? true : false;
    // console.log("result", result, check);

    if (result) {
        return { 
            'token': result.token,
            'email': result.email,
            'employeeCode': result.employeeCode
        };
    } else {
        return {
            'token': '',
            'email': '',
            'employeeCode': ''
        };
    }
}


export default functionCommon;
