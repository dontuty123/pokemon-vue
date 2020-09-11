import React, {Component} from 'react';
import './Login.scss';
/**
 *
 * Example demo pure component
 */
class Login extends Component {
    render() {
        const children = this.props.title;
        return (
            <div>
                {children}
            </div>
        );
    }
}
Login.defaultProps = {
    title: 'ssaaaaa'
}
export default Login;
