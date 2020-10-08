import React from 'react';
import './style.scss';
import {BsFillPersonFill, BsFillLockFill, BsFillEnvelopeFill} from "react-icons/bs";

interface Props {
    id?: any;
    name?: string;
    type?: string;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    style?: any;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextBox = (props:Props) => {

    const getIcon = () => {
        let icon = null;

        switch(props.type) {
            case "email":
                icon = <BsFillEnvelopeFill size="1.5em" />;
                break;
            case "password":
                icon = <BsFillLockFill size="1.5em" />;
                break;
            case "user":
                icon = <BsFillPersonFill size="1.5em" />;
                break;
            default:
                icon = null;
        }

        return icon;
    }

    return (
        <div>
            {getIcon() ? <span className="icon-textbox">{getIcon()}</span> : null}
            <input className="textbox" style={getIcon() ? ({paddingLeft: '40px', width: '84%'}) : null} type="text" {...props} />
        </div>
    )
}

export default TextBox;
