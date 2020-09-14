
const validateData = {
  validateEmail(email) {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)+$/;
    return mailFormat.test(email)
  },

  validateFormatPass(pass) {
    const formatpass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    return formatpass.test(pass)
  },

  validateComfirm(pass,comfirm) {
    return comfirm !== pass ? false : true
  },
  validateCurrent(pass) {
    return pass ? true : false
  }

}

export default validateData
