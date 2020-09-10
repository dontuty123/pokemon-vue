import React from 'react';
import './Login.scss';

type LoginProps = {
    title?: string,
}
/**
 * Example function component
 */
const Login = ({ title }: LoginProps) => <aside>
    <p>{ title }</p>
</aside>

Login.defaultProps = {
    title: 'aaaaaaaaaaaaa',
};

export default Login;
