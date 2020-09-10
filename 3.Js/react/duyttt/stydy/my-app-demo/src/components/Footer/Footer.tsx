import React, {Component} from 'react';
type ClockState = {
    time: Date,
    msg?: string;
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
                        Example class Footer
                        <p>The current time is {this.state.time.toLocaleTimeString()}</p>
                    </div>
                </header>
            </div>
        );
    }
}

export default Footer;
