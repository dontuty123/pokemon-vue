import React from 'react';
import './css.scss';

interface ButtonProps {
    value: string;
    onClick: (e: React.FormEvent<HTMLInputElement>) => void;
    disabled?: boolean; 
}

interface ButtonState {
    
}

class Button extends React.Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return (<input className="button" {...this.props} type="button" />)
    }
}

export default Button
