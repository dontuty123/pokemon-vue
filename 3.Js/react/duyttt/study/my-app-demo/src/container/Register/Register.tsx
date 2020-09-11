import React, {PureComponent} from 'react';
import './Register.scss';
/**
 *
 * Example demo pure component
 */
class Register extends PureComponent{
    //setting state component
    constructor(props) {
        //are component
        super(props);
        this.state = {
            text: "Please Click me!",
            clickCount: 0
        };
    }


    // Method updateCount()
    updateCount() {
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
