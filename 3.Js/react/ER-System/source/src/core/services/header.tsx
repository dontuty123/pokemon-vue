import { getCookie } from '../cookie';

const HeaderSever = () => {
    const resutl = getCookie('result') !== "" ? JSON.parse(getCookie('result')) : null;

    if (resutl) {
        return {
            token: resutl.token,
            email: resutl.email,
            employeeCode: resutl.employeeCode,
        };
    } else {
        return {
            token: "",
            email: "",
            employeeCode: "",
        };
    }
};

export default HeaderSever;
