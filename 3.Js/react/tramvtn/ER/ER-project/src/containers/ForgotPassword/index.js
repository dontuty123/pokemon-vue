import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import CONST_API from '../../core/constant/constant';
import * as errorData from '../../core/data/en-error.json';


class ForgotPassword extends Component {

	constructor(props) {
		super(props)
		this.state = {
			errorCode: '',
			errorCode: '',
			errorMail: '',
			email: ''
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
					errorMail: '002',
					errorCode: ''
				});
			} else{
				this.setState({
					errorMail: '',
					errorCode: ''
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
				errorMail: '002',
				errorCode: ''
			});
			
		} else {
            this.setState({
				errorMail :''
            });
        }
    }

	/**
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {
		
		if (values.email !== undefined) {
			//call API login
			const _body = "email=" + values.email;
			
			axios({
				method: 'post',
				url: CONST_API.apiUrl + 'forgot-password',
				data: _body
			}).then((response) => {
				
				if (response.data.error_code !== '') {
					this.setState({
						errorCode: response.data.error_code
					})
				} else {
					this.setState({
						errorCode: '004'
					})

				}
			}).catch((err) => console.log('err: ',err))// loi goi api that bai , 403
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

	successMessage = (code) => {
		const successName = errorData.error[code];
		return (
			<p className="success-message">{successName}</p>
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
					<p className="form-title">FORGOT YOUR PASSWORD</p>
					<p className="center">Send a link to your email to reset your password</p>
				</div>
				{this.successMessage(this.state.errorCode)}
				<Form.Item name="email">
					<Input prefix={<MailOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						placeholder="Enter your E-mail address" type="email" name="email" onChange={this.handleChange} />
				</Form.Item>
				{this.errorMessage(this.state.errorMail)}
				<Form.Item>
					<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button" onClick={() => this.onSubmit()}>Send</Button>
				</Form.Item>
				<Form.Item><Link to="/login" className="form-login-forgot">Back to Login</Link></Form.Item>
			</Form>
		);
	}
};
export default ForgotPassword;
