import React from 'react';
import '../login/login.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';
import axios from 'axios';
import * as Constant from '../../core/constant';
import {validate} from '../../core/extend';


interface Props {

}

interface State {
    userName: string;
    messageLogin: string;
    loading: boolean;
    checked: boolean;
    statusLogin: boolean;
    [label: string]: any;
}

interface CSSObject {

}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: "",
            messageLogin: "",
            statusLogin: false,
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
        const {userName} = this.state;
        const validEmail = validate.validEmail(userName),
            paramUser = "email=" + userName;
        let messageLogin = "",
            statusLogin = false;

        this.setState({checked: true, loading: true, messageLogin});

        if (userName.length > 0) {
            if (validEmail) {
                await axios.post(`${Constant.SERVER_API}forgot-password`, paramUser)
                .then(function (res) {
                    console.log(res)

                    let code_error = res.data.error_code;

                    if (res.data.http_code === 200) {
                        messageLogin = Constant.MESSAGE_CODE["004"];
                        statusLogin = true;
                    } else {
                        messageLogin = Constant.MESSAGE_CODE[code_error];
                    }
                })
                .catch(function (err) {
                    messageLogin = Constant.MESSAGE_CODE["010"];
                })
            } else if (!validEmail) {
                messageLogin = "Email định dạng sai";
            }
        }
        
        this.setState({loading: false, messageLogin, statusLogin});

    }

    validateEmail() {
        const {userName, checked} = this.state;

        const valid = {
            display: !checked || userName.length > 0 ? 'none' : null,
            mess: Constant.MESSAGE_CODE["002"]
        };

        return valid
    }

    render() {
        const {userName, loading, messageLogin, statusLogin} = this.state;
        const validEmail = this.validateEmail();

        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{ textAlign: "center" }} onKeyDown={(e) => { if (e.keyCode === 13 && !loading) this.handleSubmit() }}>
                    <h2>FORGOT YOUR PASSWORD ?</h2>
                    <p>Send a link to your email to reset your password</p>
                        <TextBox 
                            id="email"
                            type="email" 
                            name="userName"
                            value={userName} 
                            placeholder="Enter your E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)} 
                        />
                        <p className="validate" style={{ display: validEmail.display } as Pick<CSSObject, keyof CSSObject>}>{validEmail.mess}</p>
                        <Button 
                            value="Send" 
                            onClick={() => this.handleSubmit()} 
                            disabled={loading}
                        />
                        <p className={statusLogin ? "success" : "validate"} style={{ display: messageLogin.length > 0 ? null : 'none' } as Pick<CSSObject, keyof CSSObject>}>{messageLogin}</p>
                        <a href="/" style={{textDecoration: "none"}}>Back to Login</a>

                    </div>
                </div>
            </div>


        )
    }
}

export default Login