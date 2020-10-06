const setCookie = (cname: string, cvalue: string, exTime?: any) => {
    const d = new Date();
    d.setTime(d.getTime() + (exTime * 1000));
    const expires = "expires=" + d.toString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname: string) => {
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

const removeCookie = (cname: string) => {
    const name = cname + "=";
    document.cookie = name +" ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

export {
    setCookie,
    getCookie,
    removeCookie,
}
