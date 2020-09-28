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
    const validate = /([-+=_!@#$%^&*.,;:'\"<>/?`~\[\]\(\)\{\}\\\|\s])^(?=.*[\d]).+$^(?=.*[A-Z]).+$^(?=.*[a-z]).+$/
    const isValidate = validate.test(password) ? true : false;
}