import React from 'react';
import './css.css';
import {BsFillPersonFill, BsFillLockFill} from "react-icons/bs";

class TextBox extends React.Component {

    onChange(e) {
        this.props.onChange(e)
    }

    getIcon() {
        let {type} = this.props;
        let icon;

        switch(type) {
            case "email":
                icon = <BsFillPersonFill size="1.5em" />;
                break;
            case "password":
                icon = <BsFillLockFill size="1.5em" />;
                break;
            default: 
                icon = null;
        }

        return icon;
    }

    render() {
        let icon = this.getIcon();
        
        return (
            <div>
                {icon ? <span className="icon-textbox">{icon}</span> : null}
                <input className="textbox" style={icon ? ({paddingLeft: '40px', width: '84%'}) : null} type="text" {...this.props} onChange={e => this.onChange(e)} />
            </div>
        )
    }
}

export default TextBox