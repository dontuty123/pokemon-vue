import React, {Component} from 'react';
import './login.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';
import * as Constant from '../../core/constant';
import { connect } from 'react-redux';
import { setLogin, userInfo } from '../../core/store/actions/userAction';
import { Dispatch } from 'redux';
import { AppActions } from '../../core/store/types/actions';
import { user } from '../../core/store/types/user';
import * as API from '../../core/api';


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
    userInfo: user
}

interface StoreDispatchProp {
    setUserInfo: (data: user) => void,
    setLogin: (data: user) => void
}

type Props = StoreStateProp & StoreDispatchProp

class Login extends Component<Props, State> {

    state: State = {
        userInfo: {
            email: "",
            password: ""
        },
        messageLogin: "",
        loading: false,
        checked: false,
    }

    handleChange = (e:any) => {
        const { label, value } = e.target;
        this.setState({ [label]: value , messageLogin: ""});
    }

    handleSubmit = async () => {
        const {userInfo} = this.state;
        let messageLogin = "";

        this.setState({checked: true, loading: true});

        if (userInfo.email && userInfo.password) {
            const fnAPI = await API.postApi("login", userInfo);
            if (fnAPI.data.http_code === 403) {
                messageLogin = Constant.MESSAGE_CODE["001"];
            }
            if (fnAPI.data.http_code !== 200) {
                messageLogin = Constant.MESSAGE_CODE["010"];
            }
            this.props.setLogin(fnAPI.data.result);
        }

        this.setState({loading: false, messageLogin});
    }

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
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{ textAlign: "center" }} onKeyDown={(e) => { if (e.keyCode === 13 && !loading) this.handleSubmit() }}>
                    <h1>LOGIN</h1>
                        <TextBox
                            id="email"
                            type="user"
                            name="email"
                            value={userInfo.email}
                            placeholder="E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate" style={{ display: validEmail.display } as Pick<CSSObject, keyof CSSObject>}>{validEmail.mess}</p>
                        <TextBox
                            id="password"
                            type="password"
                            name="password"
                            value={userInfo.password}
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



const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setUserInfo: (data: user) => dispatch(userInfo(data)),
    setLogin: (data: user) => dispatch(setLogin(data))
})

export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(Login)
