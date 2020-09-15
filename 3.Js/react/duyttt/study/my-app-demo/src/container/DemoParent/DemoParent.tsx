import React, {Component} from 'react';
import DisplayButton from "../../components/DisplayButton/DisplayButton";
import "./DemoParent.scss";
interface Props {
    name: string,
    count: number
}

interface State {
    name: string,
    count: number;
}

/**
 *
 * Example function component
 */
class DemoParent extends Component<Props, State> {
    static defaultProps: { name: string };

    render() {
        const {name, count} = this.props;
        return (
            <div>
                <h1 className="title-txt">{name}</h1>
                <DisplayButton count={count}/>
            </div>
        )
    }

}

DemoParent.defaultProps = {
    name: "Example component parent, child",
};

export default DemoParent;
