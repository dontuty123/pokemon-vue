import React, {Component} from 'react';
import './DisplayText.scss'

interface Props {
    count: number,
}

interface State {
    count: number,
}

/**
 *
 * Example function component
 */
class DisplayText extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    render() {
        const {count} = this.props;
        return (
            <h2 className="result-txt">{count}</h2>
        )
    }

}

export default DisplayText;
