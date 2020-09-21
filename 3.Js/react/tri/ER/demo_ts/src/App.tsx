import React from 'react';
import Login from './containers/login';
import ForgotPassword from './containers/ForgotPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './core/store/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact  component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Router>
    </Provider>
  );
}

export default App;
