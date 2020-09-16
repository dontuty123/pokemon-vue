import React, {Component} from "react";
import "./style.scss"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DemoParent from "../DemoParent";

interface Props {
    id?: number,
}

interface State {
    id: number,
}

const Introduce = () => {
    return <h2 className="title">This is a page for product </h2>;
}
const Home = () => {
    return (
        <Router>
            <div id="menu">
                <ul>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/introduce">Giới thiệu</Link></li>
                </ul>
                <Route path="/" exact component={DemoParent}/>
                <Route path="/introduce" component={Introduce}/>
            </div>
        </Router>
    );
}

export default Home;
