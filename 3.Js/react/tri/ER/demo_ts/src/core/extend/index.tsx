
const validate = {
    validEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    
    validPassword(password: string) {
        const re = /\w{8,}/;
        return re.test(password);
    },

    validPasswordStrong(password: string) {
        const re = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
        return re.test(password);
    },

    validPasswordComfirm(password: string, comfirmPassword: string) {
        return password === comfirmPassword;
    }
}

export {
    validate
}
