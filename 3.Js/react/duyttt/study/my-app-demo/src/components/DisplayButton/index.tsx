import React, {Component} from 'react';
import DisplayText from "../DisplayText";
import "./style.scss";

interface Props {
    count?: number,
}

interface State {
    count: number,
}

/**
 *
 * Example function component
 */
class DisplayButton extends Component<Props, State> {
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
    }

    render() {
        const {count} = this.state;
        return (
            <div className="btn-submit">
                <DisplayText count={count} />
                <button onClick={() => this.increment()}>+</button>
                <button onClick={() => this.decrement()}>-</button>
            </div>
        )
    }
}

export default DisplayButton;
