import React from 'react';

interface ipprop {
    name?: string;
}
/**
 *
 * Example function component
 */
const Header: React.FC<ipprop> = (props: ipprop) => {
    return <h1>Example function component.. hello {props.name}</h1>;
};
Header.defaultProps = {
    name: 'wossssssssssss',
};

export default Header;
