import React from 'react';
import './Login.scss';

type LoginProps = {
    title?: string,
}
/**
 * Example function component
 */
const Login = ({title}: LoginProps) => <aside>
    <p className="title-login">{title}</p>
</aside>

Login.defaultProps = {
    title: 'Login demo with function component',
};

export default Login;
