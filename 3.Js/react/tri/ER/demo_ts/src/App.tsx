import React from 'react';
import Login from './containers/login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';

import { Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './core/store/reducers';
import history from './history';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" exact  component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
      </Router>
    </Provider>
  );
}

export default App;
