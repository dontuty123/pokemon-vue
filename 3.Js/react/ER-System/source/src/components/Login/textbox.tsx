import React, {FormEvent} from 'react';
import {BsFillPersonFill, BsFillLockFill} from "react-icons/bs";
import './style.scss';
interface Props {
    id?:string,
    name?:string,
    value?:string,
    placeholder?:string,
    disabled?:boolean,
    type?: string,
    style?: any,
    onChange: (e: FormEvent<HTMLInputElement>) => void;
}

interface PropsButton {
    value?: string,
    disabled?: boolean,
    onClick?: (e: FormEvent<HTMLInputElement>) => void,
}

/**
 *
 * Input form login
 */
export const TextBox = (Props:Props) => {

    const getIcon = () => {
        let icon = null;

        switch(Props.type) {
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
            {getIcon() ? <span className="icon-text-box">{getIcon()}</span> : null}
            <input className="text-box" style={getIcon() ? ({paddingLeft: '40px', width: '84%'}) : null}
             type="text" {...Props} />
        </div>

    )
}

/**
 *
 * Display button login
 */
export const Button = (PropsButton:PropsButton) => {
    return (<input className="button" {...PropsButton} type="button" />)
}
