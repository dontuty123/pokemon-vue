
const validateData = {
  validateEmail(email) {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)+$/;
    if (mailFormat.test(email)) {
      return true
    } else {
      return  false 
    }  
  },

  validateFormatPass(pass) {
    let formatpass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (formatpass.test(pass)) {
      return  true
    } else {
      return  false
    }      
  },

  validateComfirm(pass,comfirm) {
    if (comfirm !== pass) {
      return  false
    } else {
      return true
    }
  },
  validateCurrent(pass) {
    if (pass === '') {
      return  false
    } else {
      return true
    }
  }

}

export default validateData
