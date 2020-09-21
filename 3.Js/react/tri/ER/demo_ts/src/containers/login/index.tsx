import React from 'react';
import './login.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';
import * as Cookie from '../../core/cookie';
import axios from 'axios';
import * as Constant from '../../core/constant';
import { validate } from '../../core/extend';
import { connect } from 'react-redux';
import { setLogin, userInfo } from '../../core/store/actions/userAction';
import { Dispatch } from 'redux';
import { AppActions } from '../../core/store/types/actions';
import { user } from '../../core/store/types/user';

interface LoginProps {

}

interface State {
    userName: string;
    userPassword: string;
    messageLogin: string;
    loading: boolean;
    checked: boolean;
    [label: string]: any;
}

interface CSSObject {

}

type Props = LoginProps & StoreStateProp & StoreDispatchProp

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            messageLogin: "",
            loading: false,
            checked: false,
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget.name, 
            value = e.currentTarget.value;

        this.setState({[label]: value, messageLogin: ""});
    }


    handleSubmit = async () => {
        const {userName, userPassword} = this.state;
        const validEmail = validate.validEmail(userName),
            validPassword = validate.validPassword(userPassword),
            paramUser = "email=" + userName + "&password=" + userPassword;
        let messageLogin = ""; 

        this.setState({checked: true, loading: true, messageLogin});

        if (userName.length > 0 && userPassword.length > 0) {
            if (validEmail && validPassword) {
                await axios.post(`${Constant.SERVER_API}login`, paramUser)
                .then((res) => {
                    if (res.data.http_code === 403) {
                        messageLogin = Constant.MESSAGE_CODE["001"];
                    } else if (res.data.http_code === 200) {
                        this.props.setLogin({
                            user_id: res.data.result.employeeId,
                            token: res.data.result.token
                        });
                        Cookie.setCookie('result', JSON.stringify(res.data.result), 120 * 60)
                    } else {
                        messageLogin = Constant.MESSAGE_CODE["010"];
                    }
                })
                .catch(() => {
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
        const {userName, checked} = this.state;

        const valid = {
            display: !checked || userName.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["002"]
        };

        return valid
    }

    validatePassword() {
        const {userPassword, checked} = this.state;

        const valid = {
            display: !checked || userPassword.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["003"]
        };

        return valid
    }


    render() {
        const {userName, userPassword, loading, messageLogin} = this.state;
        const validEmail = this.validateEmail(),
            validPassword = this.validatePassword();
            
        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{ textAlign: "center" }} onKeyDown={(e) => { if (e.keyCode === 13 && !loading) this.handleSubmit() }}>
                    <h2>LOGIN</h2>
                        <TextBox 
                            id="email"
                            type="user" 
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
                        <a href="/forgot-password" style={{textDecoration: "none"}}>Forgot your password ?</a>

                    </div>
                </div>
            </div>


        )
    }
}

interface StoreStateProp {
    userInfo: user
}

interface StoreDispatchProp {
    setUserInfo: (data: user) => void,
    setLogin: (data: user) => void
}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setUserInfo: (data: user) => dispatch(userInfo(data)),
    setLogin: (data: user) => dispatch(setLogin(data))
})

export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(Login)