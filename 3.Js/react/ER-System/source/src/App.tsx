import React, {Component} from 'react';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import OmProjectManagement from './containers/OmProjectManagement';
import Project from './containers/Project';
import Approve from './containers/Approve';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import {getCookie} from './core/cookie';
import {user} from './core/types/user';
import {AppActions} from './core/types/actions';
import {setLogin} from './core/actions/userAction';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';

type Props = StoreDispatchProp & StoreStateProp;

class App extends Component<Props, {}> {

    checkAuth = () => {
        const result = getCookie("result") ? JSON.parse(getCookie("result")) : "";
        if (result) {
            this.props.setLogin(result);
        }
    }

    componentDidMount = () => {
        this.checkAuth();
    }

    render() {
        const isLogin = this.props.userInfo.isLoggedIn;

        return (
            <div>
                <div className={`body-content ${isLogin ? "has-header" : ""}`}>
                    <Router history={history}>
                        {isLogin ? <Header/> : null}
                        <PublicRoute restricted={true} component={ResetPassword} path="/reset-password" />
                        <PublicRoute restricted={true} component={ForgotPassword} path="/forgot-password" exact />
                        <PublicRoute restricted={true} component={Login} path="/" exact />
                        <PrivateRoute component={OmProjectManagement} path="/om-project-management" exact />
                        <PrivateRoute component={Project} path="/project" exact />
                        <PrivateRoute component={Approve} path="/approve" exact />
                    </Router>
                </div>
                <Footer />
            </div>
        );
    }
}

interface StoreStateProp {
    userInfo: user
}

interface StoreDispatchProp {
    setLogin: (data: user) => void
}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setLogin: (data: user) => dispatch(setLogin(data))
});

export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(App);
