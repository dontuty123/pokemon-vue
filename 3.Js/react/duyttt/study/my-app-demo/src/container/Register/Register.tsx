import React, {PureComponent} from 'react';
import './Register.scss';

interface props {
    text: string,
    clickCount: number;
}

/**
 *
 * Example demo pure component
 */
class Register extends PureComponent<{}, props> {
    //setting state component
    constructor(props: Readonly<{}>) {
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
        return (
            <div>
                <button onClick={() => this.updateCount()}>
                    {this.state.text} : {this.state.clickCount}
                </button>
            </div>
        );
    }
}

export default Register;
