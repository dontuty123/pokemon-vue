import React from 'react';
import DisplayButton from "../../components/DisplayButton/DisplayButton";
import "./DemoParent.scss";

interface Props {
    name: string,
    count: number
}

/**
 *
 * Example function component
 */
const DemoParent = (Props: Props) => {
    return (
        <div>
            <h1 className="title-txt">{Props.name}</h1>
            <DisplayButton count={Props.count}/>
        </div>
    );
}
DemoParent.defaultProps = {
    name: "Example component parent, child",
};
export default DemoParent;
