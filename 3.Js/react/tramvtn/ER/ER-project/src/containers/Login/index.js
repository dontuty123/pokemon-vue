import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-company.png';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.less";
import * as errorData from '../../core/data/en-error.json';

import { loginAction } from '../../core/actions/authAction';
import { compose } from 'redux';
import { connect } from 'react-redux';

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

		if (name === 'password'){
			if (value === '') {
				this.setState({
                    errorPass: '003',
                    errorCode: ''
				});
			} else{
				this.setState({
                    errorPass: '',
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
  

    }
	
	/**
	 * Function when submit button
	 *
	 */
	onFinish = (values) => {

		this.props.login({
			'email':this.state.email,
			'password':this.state.password
		});

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
        
        if (this.state.password === '') {
			this.setState({
                errorPass: '003',
                errorCode: ''
			});
		} else {
            this.setState({
                errorPass :''
            });
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
				{this.errorMessage(this.props.errorCode)}
				<Form.Item name="email">
					<Input prefix={<UserOutlined className="site-form-item-icon ant-input-lg" />} size="large"
						placeholder="E-mail address" type="email" name="email" onChange={this.handleChange} />
				</Form.Item>
				{this.errorMessage(this.state.errorMail)}
				<Form.Item name="password">
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

// const nhan gia tri tra ve
const mapStateToProps = state => {
	return {
		errorCode : state.authReducer.errorCode
	}
};

// const goi action bang ham dispatch
const mapDispatchToProps = dispatch => ({
	login: (param) => dispatch(loginAction(param))
});


export default compose(
	connect (mapStateToProps,mapDispatchToProps)
)(Login);
