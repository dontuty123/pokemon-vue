import React from 'react';
import './css.css';

class Button extends React.Component {
    constructor(props){
        super();
    }
    render() {
        return (<input className="button" {...this.props} type="button" />)
    }
}

export default Button