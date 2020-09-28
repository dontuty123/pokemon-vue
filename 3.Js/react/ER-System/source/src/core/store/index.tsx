import React from 'react';
import Login from '../../containers/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers';
import HeaderComponent from "../../App";
const store = createStore(rootReducer, applyMiddleware(thunk));

const Store = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={Login} />
                <Route path="/demo" component={HeaderComponent} />
            </Router>
        </Provider>
    );
}
 export default Store;
