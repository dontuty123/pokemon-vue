import React from 'react';
import './login.css';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/textbox';
import Button from '../../components/button';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userName: "",
            userPassword: "",
            loading: false,
        }
    }

    handleChange(value, label) {
        this.setState({[label]: value});
    }

    handleSubmit() {

    }

    render() {
        let { userName, userPassword, loading } = this.state;

        return (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{textAlign: "center"}} onKeyDown={(e) => {if (e.keyCode === 13 && !loading) this.handleSubmit()}}>
                        <h2>LOGIN</h2>
                        <TextBox type="email" value={userName} onChange={(e) => this.handleChange(e.target.value, 'userName')}/>
                        <p className="validate" style={{display: userName?.length > 0 ? 'none' : null }}>Bắt buộc nhập Email</p>
                        <TextBox type="password" value={userPassword} onChange={(e) => this.handleChange(e.target.value, 'userPassword')}/>
                        <p className="validate" style={{display: userPassword?.length > 0 ? 'none' : null}}>Bắt buộc nhập Password</p>
                        <Button value="Login" onClick={() => this.handleSubmit()} disabled={loading}/>
                        <a href="#" style={{textDecoration: "none"}}>Forgot your password ?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login