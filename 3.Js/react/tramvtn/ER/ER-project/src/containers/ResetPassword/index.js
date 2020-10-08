import React, { Component } from 'react';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import * as errorData from '../../core/data/en-error.json';
import functionCommon from '../../core/common/function';
import { createBrowserHistory } from "history";

import { resetAction, checkKeyAction, clearError } from '../../core/actions/authAction';
import { compose } from 'redux';
import { connect } from 'react-redux';

const history = createBrowserHistory()

class ResetPassword extends Component {

	constructor(props) {
		super(props)
		this.state = {
			code: '',
			errorCode: '',
			errorPass: '',
			errorRePass: '',
			errorVaPass: '',
			password: '',
			repassword: ''
		};
	}

	/**
	 * Function check change of input
	 *
	 */

	componentDidMount() {
		const code = functionCommon.getCurrentPath(history.location.pathname, '/reset-password/:code');
		this.setState({
			code: code,
		});
		this.props.checkkey({ 'checkkey': code });
	}

	handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		})
		//this.props.clear();

		if (name === 'password') {
			if (value === '') {
				this.setState({
					errorPass: '006',
					errorCode: ''
				});
			} else {
				this.setState({
					errorPass: '',
					errorCode: ''
				});
			}
		}

		if (name === 'repassword') {
			if (value === '') {
				this.setState({
					errorRePass: '006',
					errorCode: ''
				});
			} else {
				this.setState({
					errorRePass: '',
					errorCode: ''
				});
			}
		}
	}

	/**
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {
		if (this.state.password === '' && this.state.repassword === '') {
			this.setState({
				errorPass: '005',
				errorRePass: '006'
			});
		} else if (this.state.password !== '' && this.state.repassword !== '') {
			//validate
			const isValidatePassword = functionCommon.validatePass(this.state.password);
			if (!isValidatePassword) {
				this.setState({
					errorVaPass: '015'
				});
			} else {
				//check mapching pass anf repass
				if (this.state.password !== this.state.repassword) {
					this.setState({
						errorCode: '007'
					});
				} else {
					console.log("Da doi pass");
					this.props.reset({
						'code': this.state.code,
						'password': this.state.password
					});
					window.location = "/login";
				}
			}
			//end
		} else {
			if (this.state.password !== '' && this.state.repassword === '') {
				//validate
				const isValidatePassword = functionCommon.validatePass(this.state.password);
				if (!isValidatePassword) {
					this.setState({
						errorVaPass: '015',
						errorRePass: '006'
					});
				} else {
					this.setState({
						errorVaPass: '',
						errorRePass: '006'
					});
				}
				//end
			} else if (this.state.password === '' && this.state.repassword !== '') {
				this.setState({
					errorVaPass: '',
					errorPass: '005'
				});
			}
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
		if (this.props.errorCode && this.props.errorCode !== "secretKey") {
			return (
				<div>
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
							<p className="form-title">RESET PASSWORD</p>
						</div>
						{this.errorMessage(this.state.errorCode)}
						<Form.Item name="password">
							<Input
								prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
								type="password"
								placeholder="Enter your new password" name="password" onChange={this.handleChange}
							/>
						</Form.Item>
						{this.errorMessage(this.state.errorVaPass)}
						{this.errorMessage(this.state.errorPass)}
						<Form.Item name="repassword">
							<Input
								prefix={<LockOutlined className="site-form-item-icon ant-input-lg" />} size="large"
								type="password"
								placeholder="Confirm your new password" name="repassword" onChange={this.handleChange}
							/>
						</Form.Item>
						{this.errorMessage(this.state.errorRePass)}
						<Form.Item>
							<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button">Save new Password</Button>
						</Form.Item>
					</Form>

				</div>

			);
		}
		return (
			<div>
				ERROR PAGE
			</div>
		);
	}
};

// const gets the return value
const mapStateToProps = state => {
	return {
		errorCode: state.authReducer.errorCode,
		errorCodeReset: state.authReducer.errorCodeReset
	}
};

// calls action using dispatch function
const mapDispatchToProps = dispatch => ({
	reset: (param) => dispatch(resetAction(param)),
	checkkey: (param) => dispatch(checkKeyAction(param)),
	clear: () => dispatch(clearError())
});


export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(ResetPassword);
