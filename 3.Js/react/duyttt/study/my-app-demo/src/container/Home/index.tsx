import React, {Component} from "react";
import "./style.scss"
import {BrowserRouter as Router, Route, Link, RouteComponentProps} from "react-router-dom";
import DemoParent from "../DemoParent";

interface Props {
    id?: string,
}

function Product({match}: RouteComponentProps<Props>) {
    return <h2 className="title">This is a page for product with ID: {match.params.id} </h2>;
}

const Home = () => {
    return (
        <Router>
            <div id="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to="#">Product</Link>
                        <ul className="sub-menu">
                            <li><Link to="/product/1">Product 1</Link></li>
                            <li><Link to="/product/2">Product 2</Link></li>
                        </ul>
                    </li>
                </ul>
                <Route path="/" exact component={DemoParent} />
                <Route path="/product/:id" component={Product} />
            </div>
        </Router>
    );
}

export default Home;
