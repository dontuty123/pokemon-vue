import React, {Component} from 'react';
import PropTypes from 'prop-types';
type ClockState = {
    time: Date,
    name?: string;
}

/**
 *
 * Example class component
 */
class Footer extends Component<{}, ClockState> {
    tick() {
        this.setState({
            time: new Date()
        });
    }
    //action function define
    componentWillMount() {
        this.tick();
    }
   // action render
    componentDidMount() {
        setInterval(() => {
            this.tick()
        }, 1000)
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <p>Footer The current time is {this.state.time.toLocaleTimeString()}</p>
                        <p>FooterName: {this.props.name} </p>
                    </div>
                </header>
            </div>
        );
    }
}
//validate input type value
Footer.propTypes ={
    name:PropTypes.string.isRequired
}
Footer.defaultProps = {
    name: 'Footer class component with prop',
};
export default Footer;
