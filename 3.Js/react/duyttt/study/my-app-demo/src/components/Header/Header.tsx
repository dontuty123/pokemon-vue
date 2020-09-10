import React from 'react';

interface ipprop {
    name?: string;
}
/**
 *
 * Example function component
 */
const Header: React.FC<ipprop> = (props: ipprop) => {
    return <h1>Example function component..{props.name}</h1>;
};
Header.defaultProps = {
    name: 'Header example function component',
};

export default Header;
