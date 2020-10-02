import React, {Component} from 'react';
import axios from 'axios';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import CONST_API from '../../core/constant/constant';
import * as errorData from '../../core/data/en-error.json';


class ChangePassword extends Component {

	constructor(props) {
		super(props)
		this.state = {
			errorCode: '',
			errorPass: '',
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
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {
		if (this.state.password === '') {
			this.setState({
				errorPass: '003'
			});
		}
		
		if (values.password !== '') {
			//call API login
			const _body ="&password=" + values.password;

			axios({
				method: 'put',
				url: CONST_API.apiUrl + 'change-password',
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
				className="auth-page form-change-password"
			>
				<div className="form-header">
					<img src={Logo} alt="KOBELCO" />
					<p className="form-title">CHANGE PASSWORD</p>
				</div>
				{this.errorMessage(this.state.errorCode)}
				<Form.Item>
					<Input
						prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						type="password"
						placeholder="Enter your current password" name="password" onChange={this.handleChange}
					/>
				</Form.Item>
				{this.errorMessage(this.state.errorPass)}
				<Form.Item>
					<Input
						prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						type="password"
						placeholder="Enter your new password" name="password" onChange={this.handleChange}
					/>
				</Form.Item>
				{this.errorMessage(this.state.errorPass)}
				<Form.Item>
					<Input
						prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						type="password"
						placeholder="Confirm your new password" name="password" onChange={this.handleChange}
					/>
				</Form.Item>
				{this.errorMessage(this.state.errorPass)}
				<Form.Item>
					<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button">Save new Password</Button>
				</Form.Item>
			</Form>
		);
	}
};
export default ChangePassword;
