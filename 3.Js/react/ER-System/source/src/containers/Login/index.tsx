import React, {Component, FormEvent} from 'react';
import './style.scss';
import Logo from '../../assets/images/kobelco.png';
import * as FromInput from "../../components/Login/textbox";
import axios from 'axios';
import * as Constant from '../../core/constant';
import * as Common from '../../core/common';
import {connect} from 'react-redux';
import {setLogin} from '../../core/actions/auth';
import {Dispatch} from 'redux';
import {AppActions} from "../../core/actions/type";
import {user} from "../../core/reducers/userReducer";
import Footer from "../../components/Footer";
import {withTranslation, WithTranslation} from "react-i18next";

interface State {
    email: string,
    pwd: string,
    messageLogin: string,
    loading: boolean,
    checked: boolean,
    [name: string]: any;
}

interface CSSObject {

}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setLogin: (data: user) => dispatch(setLogin(data))
})

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps>, WithTranslation {

}

class Login extends Component<Props, State> {
    
    state: State = {
        email: "",
        pwd: "",
        messageLogin: "",
        loading: false,
        checked: false
    }

    handleChange = (e:any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value , messageLogin: ""});
    }

    handleSubmit = async () => {
        const {email, pwd} = this.state;
        const paramUser = "email=" + email + "&password=" + pwd;

        let messageLogin = "";

        this.setState({checked: true, loading: true, messageLogin});

        if (email && pwd) {
            await axios({
                method: 'post',
                url: Constant.SERVER_API + 'login',
                data: paramUser,
            }).then((res) => {
                if (res.data.http_code === 403) {
                    messageLogin = Constant.MESSAGE_CODE["001"];
                    return;
                }
                if (res.data.http_code !== 200) {
                    messageLogin = Constant.MESSAGE_CODE["010"];
                   return;
                }
                console.log(
                    this.props.setLogin({
                        employeeId: res.data.result.employeeId,
                        employeeName: res.data.result.employeeName,
                        token: res.data.result.token
                    })
                )
                Common.setCookie('result', JSON.stringify(res.data.result), 120 * 60);
            })
        }

        this.setState({loading: false, messageLogin});

    }

    validateEmail = () => {
        const {email, checked} = this.state;
        const valid = {
            display: !checked || email ? 'none' : null,
            mess: Constant.MESSAGE_CODE["002"]
        };

        return valid;
    }

    validatePassword = () => {
        const {pwd, checked} = this.state;
        const valid = {
            display: !checked || pwd ? 'none' : null,
            mess: Constant.MESSAGE_CODE["003"]
        };

        return valid;
    }

    render() {
        const { t } = this.props;
        console.log(this.props)
        const {email, pwd, loading, messageLogin} = this.state;
        const validEmail = this.validateEmail(),
            validPassword = this.validatePassword();
        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo"/>
                    <div style={{textAlign: 'center'}} onKeyDown={(e) => {
                        if (e.keyCode === 13 && !loading) this.handleSubmit()
                    }}>
                        <h2>Login</h2>
                        <h1>{t("login")}</h1>
                        <h1>{t("title")}</h1>
                        <FromInput.TextBox
                            id="email"
                            type="user"
                            name="email"
                            value={email}
                            placeholder="E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate"
                           style={{display: validEmail.display} as Pick<CSSObject, keyof CSSObject>}>{validEmail.mess}</p>
                        <FromInput.TextBox
                            id="password"
                            type="password"
                            name="pwd"
                            value={pwd}
                            placeholder="Password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate"
                           style={{display: validPassword.display} as Pick<CSSObject, keyof CSSObject>}>{validPassword.mess}</p>
                        <FromInput.Button
                            value="Login"
                            onClick={() => this.handleSubmit()}
                            disabled={loading}
                        />
                        <p className="validate"
                           style={{display: messageLogin.length > 0 ? null : 'none'} as Pick<CSSObject, keyof CSSObject>}>
                            {messageLogin}
                        </p>
                        <a href="/forgot-password" style={{textDecoration: 'none', color: '#0088D3'}}>Forgot your
                            password ?</a>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(["loginLang"])(Login));
