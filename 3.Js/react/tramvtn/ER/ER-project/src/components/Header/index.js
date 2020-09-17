import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../../containers/Login';
import Home from '../../containers/HomePage';

class Header extends Component {
	render() {
		return (
			<div>
				<Router>
					<Route exact path="/home" component={Home} />
					<Route path="/login" component={Login} />
				</Router>
			</div>
		);
	}
}

export default Header;