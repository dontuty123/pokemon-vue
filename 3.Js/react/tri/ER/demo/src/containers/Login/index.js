import React from 'react';
import './login.css';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';
import * as Cookie from '../../core/cookie';
import axios from 'axios';
import * as Constant from '../../core/constant';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            userPassword: "",
            messageLogin: "",
            loading: false,
            checked: false,
        }
    }

    validEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    handleChange = (value, label) => {
        let messageLogin = this.state.messageLogin;

        if (label === "userName") {
            let validEmail = this.validEmail(value);
            messageLogin = validEmail ? "" : messageLogin;
        }
        this.setState({[label]: value, messageLogin});
    }

    handleSubmit = async () => {
        let {userName, userPassword} = this.state;
        let messageLogin = "", validEmail = this.validEmail(userName);

        this.setState({checked: true, loading: true, messageLogin});

        if (userName.length > 0 && !validEmail) {
            messageLogin = "Email sai định dạng";
        }
        else if (userName.length > 0 && userPassword.length > 0) {
            await axios({
                method: 'post',
                url: `${Constant.SERVER_API}login`,
                auth: {
                        username: 'er_management', 
                        password: 'er_management@2020^!'
                },
                body: {
                        email: userName,
                        password: userPassword
                }
            })
            .then(function (res) {

            })
            .catch(function (err) {
                messageLogin = Constant.MESSAGE_CODE["010"];
            })
        }
        
        this.setState({loading: false, messageLogin});
    }

    render() {
        let {userName, userPassword, loading, checked, messageLogin} = this.state;
        
        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{textAlign: "center"}} onKeyDown={(e) => {if (e.keyCode === 13 && !loading) this.handleSubmit()}}>
                        <h2>LOGIN</h2>
                        <TextBox 
                            type="email" 
                            value={userName} 
                            placeholder="E-mail address"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e.target.value, 'userName')} 
                        />
                        <p className="validate" style={{ display: !checked || userName.length > 0 ? 'none' : null }}>{Constant.MESSAGE_CODE["002"]}</p>
                        <TextBox 
                            type="password" 
                            value={userPassword} 
                            placeholder="Password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e.target.value, 'userPassword')} 
                        />
                        <p className="validate" style={{ display: !checked || userPassword.length > 0 ? 'none' : null }}>{Constant.MESSAGE_CODE["003"]}</p>
                        <Button 
                            value="Login" 
                            onClick={() => this.handleSubmit()} 
                            disabled={loading}
                        />
                        <p className="validate" style={{ display: messageLogin.length > 0 ? null : 'none' }}>{messageLogin}</p>
                        <a href="#" style={{textDecoration: "none"}}>Forgot your password ?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login