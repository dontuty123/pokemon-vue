import React, {Component} from 'react';

interface props {
    time: Date,
    name?: string;
}
/**
 *
 * Example class component
 */
class Footer extends Component<{}, props > {
    static defaultProps: { name: string };
    tick() {
        this.setState({
            time: new Date(),
        });
    }

    //action function define
    componentWillMount() {
        this.tick();
    }

    //  AJAX requests, DOM or update state request, connect js framework: setTimeout or setInterval
    componentDidMount = () => {
        setInterval(() => {
            this.tick()
        }, 1000)
    }

    render() {
        const name = this.props.name;
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <p>Footer The current time is {this.state.time.toLocaleTimeString()}</p>
                        <p>FooterName: {name} </p>
                    </div>
                </header>
            </div>
        );
    }
}

Footer.defaultProps = {
    name: "demo class component",
};
export default Footer;
