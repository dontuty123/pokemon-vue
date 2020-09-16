import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './styles.scss';
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

	handleChange =(e) =>{
		let target = e.target;
		let name = target.name;
		let value = target.value;
		
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

	validateEmail (email) {
		const validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return validate.test(email)
	}

	onFinish = (values) => {
		console.log('abc', values)

		if (this.state.email === '') {
			this.setState({
				errorMail: '002'
			});
		} else {
			let resValidate = this.validateEmail(this.state.email)
			console.log(resValidate)
			if (resValidate){
				this.setState({
					errorMail :''
				});
			}
		}
		if (this.state.password === '') {
			this.setState({
				errorPass: '003'
			});
		}
		
		if (values.email !== '' && values.password !== '') {
			console.log('Success:', values);
			//call API login
			const _body = "email=" + values.email + "&password=" + values.password;

			axios({
				method: 'post',
				url: CONST_API.apiUrl + 'login',
				data: _body
			}).then((response) => {
				console.log('Call API success');
				if (response.data.error_code !== '') {
					this.setState({
						errorCode: response.data.error_code
					})
				} else {
					this.setState({
						errorCode: ''
					})
					console.log('Dang nhap thanh cong');
				}
				console.log('response', response);
			}).catch((err) => console.log('loi goi api that bai :', err))// loi goi api that bai , 403
		}
	};

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

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
				onFinishFailed={this.onFinishFailed}
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
					<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button">Login</Button>
				</Form.Item>
				<Form.Item><Link to="/forgotpassword" className="form-login-forgot">Forgot your password ?</Link></Form.Item>
			</Form>
		);
	}
};
export default Login;
