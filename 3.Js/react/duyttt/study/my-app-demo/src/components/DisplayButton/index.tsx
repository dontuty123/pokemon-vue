import React from 'react';
import './style.scss'

interface Props {
    ClickHandler: (event: string) => void;
}

/**
 *
 * Example function component
 */
const DisplayButton = (Props: Props) => {
    return (
        <div>
            <button onClick={() => Props.ClickHandler('in')}>+</button>
            <button onClick={() => Props.ClickHandler('de')}>-</button>
        </div>
    );
};

export default DisplayButton;
