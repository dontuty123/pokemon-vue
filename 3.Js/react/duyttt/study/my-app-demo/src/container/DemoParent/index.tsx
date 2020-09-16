import React, {Component} from 'react';
import DisplayText from "../../components/DisplayText";
import DisplayButton from "../../components/DisplayButton";
import "./style.scss";

interface Props {
    count?: number,
    name?: string,
}

interface State {
    count: number,
    name?: string
}

/**
 *
 * Example function component
 */
class DemoParent extends Component<Props, State> {
    static defaultProps: { name: string };

    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    increment = (): void => {
        this.setState({
            count: (this.state.count + 1)
        });
    };

    decrement = (): void => {
        this.setState({
            count: (this.state.count - 1)
        });
    };

    changeValueCount = (val: string): void => {
        if (val === 'in') {
            this.increment();
        } else {
            this.decrement();
        }
    };

    render() {
        const {count} = this.state;
        const {name} = this.props;
        return (
            <div className="btn-submit">
                <h1 className="title-txt">{name}</h1>
                <DisplayText count={count}/>
                <DisplayButton ClickHandler={val => this.changeValueCount(val)}/>
            </div>
        )
    }
}

DemoParent.defaultProps = {
    name: "Example component",
};
export default DemoParent;
