import React from 'react';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import OmProjectManagement from './containers/OmProjectManagement';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Router } from 'react-router-dom';
import history from './history';
import { getCookie } from './core/cookie';
import { user } from './core/store/types/user';
import { AppActions } from './core/store/types/actions';
import { setLogin } from './core/store/actions/userAction';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';


type Props = StoreDispatchProp & StoreStateProp

class App extends React.Component<Props, {}> {

  checkAuth = () => {
    const result = getCookie("result") ? JSON.parse(getCookie("result")) : "";
    if (result) {
      this.props.setLogin(result)
    }
  }

  componentDidMount = () => {
    this.checkAuth()
  }

  render() {
    const isLogin = this.props.userInfo.isLoggedIn;

    return (
      <div>
        {isLogin ? <Header /> : null}
        <div className={`body-content ${isLogin ? "has-header" : ""}`}>
          <Router history={history}>
            <Redirect from="*" to='/' />
            <PublicRoute restricted={true} component={ResetPassword} path="/reset-password" />
            <PublicRoute restricted={true} component={ForgotPassword} path="/forgot-password" exact />
            <PublicRoute restricted={true} component={Login} path="/" exact />
            <PrivateRoute component={OmProjectManagement} path="/om-project-management" exact />
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
})

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  setLogin: (data: user) => dispatch(setLogin(data))
})

export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(App);
