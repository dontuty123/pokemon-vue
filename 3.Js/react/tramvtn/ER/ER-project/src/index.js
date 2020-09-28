import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import './assets/styles/style.scss';
import './assets/styles/form.scss';

import store from './core/store/store';

ReactDOM.render(
  <Provider store={store()}>
    <Header />
  </Provider>,
  document.getElementById('root')
);


