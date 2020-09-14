import React, {Component} from 'react';

interface ipprop {
    name?: string;
}
/**
 *
 * Example function component
 */
class DemoParent extends Component<{}, ipprop> {
     static defaultProps: { name: string };
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
            </div>
        )
    }

}

DemoParent.defaultProps = {
    name: "Example component parent to child",
};

export default DemoParent;
