import React from 'react';
import './App.scss';
import Header from './components/Header';
import { Router } from 'react-router-dom';
import history from './history';
import Project from './containers/Project';

function App() {
  return (
    <div className="body-content">
      <Router history={history}>
        <Header />
        <div style={{ marginTop: 100 }}>
          <Project />
        </div>
      </Router>
    </div>
  );
}

export default App;
