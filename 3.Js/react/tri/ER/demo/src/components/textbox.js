import React from 'react';
import './css.css';

class TextBox extends React.Component {
    constructor(props){
        super();
    }

    onChange(e){
        this.props.onChange(e)
    }

    render() {
        return <input className="textbox" type="text" {...this.props} onChange={e => this.onChange(e)} />
    }
}

export default TextBox