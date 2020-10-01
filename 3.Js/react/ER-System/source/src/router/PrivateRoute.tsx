import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../core/types/user';

const PrivateRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route {...rest} render={props => (
            rest.userInfo.isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

interface StoreStateProp {
    userInfo: user
}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
})

export default connect<StoreStateProp, {}>(mapStateToProps, {})(PrivateRoute);
