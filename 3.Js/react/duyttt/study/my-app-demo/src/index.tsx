import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./container/Register/Register";
import Search from "./container/Search/Search";
import * as serviceWorker from './serviceWorker';
import DemoParent from "./container/DemoParent/DemoParent";
ReactDOM.render(
    <React.StrictMode>
        <Header />
        <Register />
        <Search />
        <Footer />
        <DemoParent />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
