import React from 'react';
import './style.scss';

interface Props {
    value: string;
    onClick: (e: React.FormEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const Button = (props:Props) => {
    return (<input className="button" {...props} type="button" />);
};

export default Button;
