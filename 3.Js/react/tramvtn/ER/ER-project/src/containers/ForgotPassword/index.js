import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import * as errorData from '../../core/data/en-error.json';

import { forgotAction, clearError } from '../../core/actions/authAction';
import { compose } from 'redux';
import { connect } from 'react-redux';

class ForgotPassword extends Component {

	constructor(props) {
		super(props)
		this.state = {
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

		this.props.clear();

		this.setState ({
			[name]: value
		})
			
		if (name === 'email'){
			if (value === '') {
				this.setState({
					errorMail: '002'
				});
			}else{
				this.setState({
					errorMail: ''
				});
			}
		}
	}

	/**
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {
		
		this.props.forgot({
			'email':this.state.email
		});

		if (this.state.email === '') {
			this.setState({
                errorMail: '002'
			});
		}else {
            this.setState({
                errorMail :''
            });
        }
	};

	/**
	 * Function return message error by code
	 *
	 */
	errorMessage = (code) => {
		const errorName = errorData.error[code];
		if (code === '004'){
			return (
				<p className="success-message">{errorName}</p>
			);
		}else {
			return (
				<p className="error-message">{errorName}</p>
			);
		}
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
				{this.errorMessage(this.props.errorCode)}
				<Form.Item name="email">
					<Input prefix={<MailOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						placeholder="Enter your E-mail address" type="email" name="email" onChange={this.handleChange} />
				</Form.Item>
				{this.errorMessage(this.state.errorMail)}
				<Form.Item>
					<Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-block ant-btn-lg login-button" >Send</Button>
				</Form.Item>
				<Form.Item><Link to="/login" className="form-login-forgot">Back to Login</Link></Form.Item>
			</Form>
		);
	}
};

// const nhan gia tri tra ve
const mapStateToProps = state => {
	return {
		errorCode : state.authReducer.errorCode
	}
};

// const goi action bang ham dispatch
const mapDispatchToProps = dispatch => ({
	forgot: (param) => dispatch(forgotAction(param)),
	clear: () => dispatch(clearError())
});


export default compose(
	connect (mapStateToProps,mapDispatchToProps)
)(ForgotPassword);
