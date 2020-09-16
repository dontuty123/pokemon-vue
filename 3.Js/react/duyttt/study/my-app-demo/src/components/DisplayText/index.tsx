import React from 'react';
import './style.scss'

interface Props {
    count: number,
}

/**
 *
 * Example function component
 */
const DisplayText = (Props: Props) => {
    return (<h2 className="result-txt">{Props.count}</h2>);
};
export default DisplayText;
