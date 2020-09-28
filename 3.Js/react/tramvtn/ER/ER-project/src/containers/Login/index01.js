import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.less";
import CONST_API from '../../core/constant/constant';
import * as errorData from '../../core/data/en-error.json';

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			errorCode: '',
			errorMail: '',
			errorPass: '',
			email: '',
			password: ''
		};
	}

	/**
	 * Function check change of input
	 *
	 */
	handleChange =(e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		
		this.setState ({
			[name]: value
		})

		if (name === 'email'){
			if (value === '') {
				this.setState({
					errorMail: '002'
				});
			} else{
				this.setState({
					errorMail: ''
				});
			}
		}

		if (name === 'password'){
			if (value === '') {
				this.setState({
					errorPass: '003'
				});
			} else{
				this.setState({
					errorPass: ''
				});
			}
		}
    }

    /**
	 * Check validate when submit button
	 *
	 */
    onSubmit = () => {
        if (this.state.email === '') {
			this.setState({
				errorMail: '002'
			});
		} else {
            this.setState({
                errorMail :''
            });
        }
        
        if (this.state.password === '') {
			this.setState({
				errorPass: '003'
			});
		} else {
            this.setState({
                errorPass :''
            });
		}

    }
	
	/**
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {
		console.log(values)
		if (values.email !== '' && values.password !== '') {
			//call API login
			const _body = "email=" + values.email + "&password=" + values.password;

			axios({
				method: 'post',
				url: CONST_API.apiUrl + 'login',
				data: _body
			}).then((response) => {
				if (response.data.error_code !== '') {
					this.setState({
						errorCode: response.data.error_code
					})
				} else {
					this.setState({
						errorCode: ''
					})
				}
			}).catch((err) => console.log(err))// loi goi api that bai , 403
		}
	};

	/**
	 * Function return message error by code
	 *
	 */
	errorMessage = (code) => {
		const errorName = errorData.error[code];
		return (
			<p className="error-message">{errorName}</p>
		);
	}

	render() {
		return (
			<Form
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={this.onFinish}
				className="auth-page form-login"
			>
				<div className="form-header">
					<img src={Logo} alt="KOBELCO" />
					<p className="form-title">LOGIN</p>
				</div>
				{this.errorMessage(this.state.errorCode)}
				<Form.Item>
					<Input prefix={<UserOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						placeholder="E-mail address" type="email" name="email" onChange={this.handleChange} />
				</Form.Item>
				{this.errorMessage(this.state.errorMail)}
				<Form.Item>
					<Input
						prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						type="password"
						placeholder="Password" name="password" onChange={this.handleChange}
					/>
				</Form.Item>
				{this.errorMessage(this.state.errorPass)}
				<Form.Item>
					<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button" onClick={() => this.onSubmit()}>Login</Button>
				</Form.Item>
				<Form.Item><Link to="/forgot-password" className="form-login-forgot">Forgot your password ?</Link></Form.Item>
			</Form>
		);
	}
};
export default Login;
