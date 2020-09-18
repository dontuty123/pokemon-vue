import React from 'react';
import './login.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';
import * as Cookie from '../../core/cookie';
import axios, {AxiosResponse} from 'axios';
import * as Constant from '../../core/constant';
import {validate} from '../../core/extend';


interface LoginProps {

}

interface LoginState {
    userName: string;
    userPassword: string;
    messageLogin: string;
    loading: boolean;
    checked: boolean;
}

interface CSSObject {

}

interface ServerResponse {
    data: ServerData
  }
  
  interface ServerData {
    foo: string
    bar: number
  }

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            messageLogin: "",
            loading: false,
            checked: false,
        }
    }

    handleChange = (e: any) => {
        let label = e.currentTarget.name, 
            value = e.target.value;

        this.setState({[label]: value, messageLogin: ""} as Pick<LoginState, keyof LoginState>);
    }


    handleSubmit = async () => {
        let {userName, userPassword} = this.state;
        let messageLogin = "", 
            validEmail = validate.validEmail(userName),
            validPassword = validate.validPassword(userPassword),
            paramUser = "email=" + userName + "&password=" + userPassword;

        this.setState({checked: true, loading: true, messageLogin});

        if (userName.length > 0 && userPassword.length > 0) {
            if (validEmail && validPassword) {
                await axios.post(`${Constant.SERVER_API}login`, paramUser)
                .then(function (res) {
                    if (res.data.http_code === 403) {
                        messageLogin = Constant.MESSAGE_CODE["001"];
                    } else if (res.data.http_code === 200) {
                        Cookie.setCookie('result', JSON.stringify(res.data.result), 120 * 60)
                    } else {
                        messageLogin = Constant.MESSAGE_CODE["010"];
                    }
                })
                .catch(function (err) {
                    messageLogin = Constant.MESSAGE_CODE["010"];
                })
            } else if (!validEmail) {
                messageLogin = "Email định dạng sai";
            } else if (!validPassword) {
                messageLogin = "Password phải từ 8 ký tự";
            }
        }
        
        this.setState({loading: false, messageLogin});

    }

    validateEmail() {
        let {userName, checked} = this.state;

        let valid = {
            display: !checked || userName.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["002"]
        };

        return valid
    }

    validatePassword() {
        let {userPassword, checked} = this.state;

        let valid = {
            display: !checked || userPassword.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["003"]
        };

        return valid
    }


    render() {
        let {userName, userPassword, loading, messageLogin} = this.state;
        let validEmail = this.validateEmail(),
        validPassword = this.validatePassword();

        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{ textAlign: "center" }} onKeyDown={(e) => { if (e.keyCode === 13 && !loading) this.handleSubmit() }}>
                    <h2>LOGIN</h2>
                        <TextBox 
                            id="email"
                            type="email" 
                            name="userName"
                            value={userName} 
                            placeholder="E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)} 
                        />
                        <p className="validate" style={{ display: validEmail.display } as Pick<CSSObject, keyof CSSObject>}>{validEmail.mess}</p>
                        <TextBox 
                            id="password"
                            type="password" 
                            name="userPassword"
                            value={userPassword} 
                            placeholder="Password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)} 
                        />
                        <p className="validate" style={{ display: validPassword.display } as Pick<CSSObject, keyof CSSObject>}>{validPassword.mess}</p>
                        <Button 
                            value="Login" 
                            onClick={() => this.handleSubmit()} 
                            disabled={loading}
                        />
                        <p className="validate" style={{ display: messageLogin.length > 0 ? null : 'none' } as Pick<CSSObject, keyof CSSObject>}>{messageLogin}</p>
                        <a href="#" style={{textDecoration: "none"}}>Forgot your password ?</a>

                    </div>
                </div>
            </div>


        )
    }
}

export default Login