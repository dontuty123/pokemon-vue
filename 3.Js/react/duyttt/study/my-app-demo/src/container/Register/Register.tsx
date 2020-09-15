import React, {PureComponent} from 'react';
import './Register.scss';

interface Props {
    text: string,
    clickCount: number;
}

interface State {
    text: string,
    clickCount: number;
}

/**
 *
 * Example demo pure component
 */
class Register extends PureComponent<Props, State> {
    //setting state component
    constructor(props: Props) {
        //are component
        super(props);
        this.state = {
            text: "Please Click me!",
            clickCount: 0
        };
    }

    // Method updateCount()
    updateCount = () => {
        this.setState((prevState, props) => {
            return {
                clickCount: prevState.clickCount + 1,
            };
        });
    }

    render() {
        const {text, clickCount} = this.state;
        return (
            <div>
                <button onClick={() => this.updateCount()}>
                    {text} : {clickCount}
                </button>
            </div>
        );
    }
}

export default Register;
