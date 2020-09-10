import React from 'react';

interface ipprop {
    name?: string;
}
/**
 *
 * Example function component
 */
const Header: React.FC<ipprop> = (props: ipprop) => {
    return <h1>hello {props.name}</h1>;
};
Header.defaultProps = {
    name: 'wo',
};

export default Header;
