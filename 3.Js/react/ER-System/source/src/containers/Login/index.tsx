import React from 'react';
import './style.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/Textbox';
import Button from '../../components/Button';
import * as Cookie from '../../core/cookie';
import * as Constant from '../../core/constant';
import {connect} from 'react-redux';
import {setLogin, userInfo} from '../../core/actions/userAction';
import {Dispatch} from 'redux';
import {AppActions} from '../../core/types/actions';
import {user} from '../../core/types/user';
import * as API from '../../core/services';

interface State {
    userInfo: any;
    messageLogin: string;
    loading: boolean;
    checked: boolean;

    [label: string]: any;
}

interface CSSObject {

}

interface StoreStateProp {
    userInfo: user;
}

interface StoreDispatchProp {
    setUserInfo: (data: user) => void,
    setLogin: (data: user) => void;
}

type Props = StoreStateProp & StoreDispatchProp;

class Login extends React.Component<Props, State> {

    state: State = {
        userInfo: {
            email: "",
            password: ""
        },
        messageLogin: "",
        loading: false,
        checked: false
    };

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget.name,
            value = e.currentTarget.value,
            userInfo = {
                ...this.state.userInfo,
                [label]: value
            };

        this.setState({userInfo, messageLogin: ""});
    };

    handleSubmit = async () => {
        const {userInfo} = this.state;
        const paramUser = userInfo;
        let messageLogin = "";

        this.setState({checked: true, loading: true});

        if (userInfo.email.length > 0 && userInfo.password.length > 0) {
            const fnAPI = await API.postApi("login", paramUser);
            if (fnAPI.data.http_code === 403) {
                messageLogin = Constant.MESSAGE_CODE["001"];
            } else if (fnAPI.data.http_code === 200) {
                Cookie.setCookie('result', JSON.stringify(fnAPI.data.result), 120 * 60);
                this.props.setLogin({
                    user_id: fnAPI.data.result.employeeId,
                    token: fnAPI.data.result.token
                });
            } else {
                messageLogin = Constant.MESSAGE_CODE["010"];
            }
        }
        this.setState({loading: false, messageLogin});
    };

    validateEmail() {
        const {userInfo, checked} = this.state;

        const valid = {
            display: !checked || userInfo.email.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["002"]
        };

        return valid;
    }

    validatePassword() {
        const {userInfo, checked} = this.state;

        const valid = {
            display: !checked || userInfo.password.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["003"]
        };

        return valid;
    }

    render() {
        const {userInfo, loading, messageLogin} = this.state;
        const validEmail = this.validateEmail(),
            validPassword = this.validatePassword();

        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo"/>
                    <div style={{textAlign: "center"}} onKeyDown={(e) => {
                        if (e.keyCode === 13 && !loading) this.handleSubmit()
                    }}>
                        <h2>LOGIN</h2>
                        <TextBox
                            id="email"
                            type="user"
                            name="email"
                            value={userInfo.email}
                            placeholder="E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate"
                           style={{display: validEmail.display} as Pick<CSSObject, keyof CSSObject>}>{validEmail.mess}</p>
                        <TextBox
                            id="password"
                            type="password"
                            name="password"
                            value={userInfo.password}
                            placeholder="Password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate"
                           style={{display: validPassword.display} as Pick<CSSObject, keyof CSSObject>}>{validPassword.mess}</p>
                        <Button
                            value="Login"
                            onClick={() => this.handleSubmit()}
                            disabled={loading}
                        />
                        <p className="validate"
                           style={{display: messageLogin.length > 0 ? null : 'none'} as Pick<CSSObject, keyof CSSObject>}>{messageLogin}</p>
                        <a href="/forgot-password" style={{textDecoration: "none"}}>Forgot your password ?</a>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setUserInfo: (data: user) => dispatch(userInfo(data)),
    setLogin: (data: user) => dispatch(setLogin(data))
});

export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(Login);
