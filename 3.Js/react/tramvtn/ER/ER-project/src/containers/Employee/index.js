import React, {Component} from 'react';
import "antd/dist/antd.less";
import { compose } from 'redux';

class Employee extends Component {

	render() {
		return (
			<h1>Employee</h1>
		);
	}
};


export default compose(
)(Employee);
