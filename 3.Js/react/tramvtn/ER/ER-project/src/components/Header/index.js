import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../containers/HomePage';
import Login from '../../containers/Login';
import ForgotPassword from '../../containers/ForgotPassword';
import ChangePassword from '../../containers/ChangePassword';
import ResetPassword from '../../containers/ResetPassword';
import Position from '../../containers/Position';
import Employee from '../../containers/Employee';

class Header extends Component {
	render() {
		return (
			<div>
				<Router>
					<Route exact path="/home" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/forgot-password" component={ForgotPassword} />
					<Route path="/change-password" component={ChangePassword} />
					<Route path="/reset-password" component={ResetPassword} />
					<Route path="/position" component={Position} />
					<Route path="/employee" component={Employee} />
				</Router>
			</div>
		);
	}
}

export default Header;