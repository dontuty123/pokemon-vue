/**
 * Validate password and email
 */
export const validate = {
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

    validPasswordConfirm(password: string, confirmPassword: string) {
        return password === confirmPassword;
    }
}

/**
 * setCookie login
 * @param cname
 * @param cvalue
 * @param exTime
 */
export const setCookie = (cname: string, cvalue: string, exTime?: any) => {
    const d = new Date();
    d.setTime(d.getTime() + (exTime * 1000));
    const expires = "expires=" + d.toString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * getCookie login
 * @param cname
 */
export const getCookie = (cname: string) => {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const removeCookie = (cname: string) => {
    const name = cname + "=";
    document.cookie = name +" ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}



