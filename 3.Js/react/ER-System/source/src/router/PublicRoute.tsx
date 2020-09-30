import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../core/types/user';


const PublicRoute = ({component: Component, restricted, ...rest}: any) => {
    return (
        <Route {...rest} render={props => (
            rest.userInfo.isLoggedIn && restricted ?
                <Redirect to="/om-project-management" />
            : <Component {...props} />
        )} />
    );
};

interface StoreStateProp {
    userInfo: user
}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
})

export default connect<StoreStateProp>(mapStateToProps)(PublicRoute);
