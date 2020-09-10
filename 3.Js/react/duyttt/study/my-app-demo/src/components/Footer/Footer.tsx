import React, {Component} from 'react';
type ClockState = {
    time: Date,
}
/**
 *
 * Example class component
 */
class Footer extends Component<{},ClockState> {
    tick() {
        this.setState({
            time: new Date()
        });
    }
    componentWillMount() {
        this.tick();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        Footer example demo class component
                        <p>The current time is {this.state.time.toLocaleTimeString()}</p>
                    </div>
                </header>
            </div>
        );
    }
}

export default Footer;
