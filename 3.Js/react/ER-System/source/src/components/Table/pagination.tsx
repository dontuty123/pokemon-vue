import React, {Component} from 'react';

interface Props {
    totalPage: number;
    currentPage: number;
    onChange: (i: number) => void;
}

interface State {
    currentPage: number;
}

class Pagination extends Component<Props, State> {

    state: State = {
        currentPage: 1
    };

    renderNumberPage = () => {
        const {totalPage} = this.props;
        const {currentPage} = this.state;
        let render: Array<any> = [];

        for (let i = 1; i < totalPage + 1; i++) {
            const actived = currentPage === i;
            render.push(<li key={"page_" + i}><button onClick={e => this.handleChange(e, i)} className={actived ? "active" : ""} >{i}</button></li>);
        }

        return render;
    };

    handleChange = (e: any, index: number) => {
        this.setState({currentPage: index}, () => this.props.onChange(index));
    };

    handleMoveLeft = () => {
        const checkButtonLeft = this.checkButtonLeft();

        if (checkButtonLeft) {
            const currentPage = this.state.currentPage - 1;
            this.setState({currentPage}, () => this.props.onChange(currentPage));
        }
    };

    handleMoveRight = () => {
        const checkButtonRight = this.checkButtonRight();

        if (checkButtonRight) {
            const currentPage = this.state.currentPage + 1;
            this.setState({currentPage}, () => this.props.onChange(currentPage));
        }
    };

    checkButtonLeft = () => {
        return this.state.currentPage > 1;
    };

    checkButtonRight = () => {
        return this.state.currentPage < this.props.totalPage;
    };

    render() {
        const {totalPage} = this.props;
        const checkButtonLeft = this.checkButtonLeft(),
            checkButtonRight = this.checkButtonRight();

        return !totalPage ? null : (
            <div className="pagination">
                <ul>
                    <li><button disabled={!checkButtonLeft} onClick={() => this.handleMoveLeft()} className="button-left">{"<"}</button></li>
                    {this.renderNumberPage()}
                    <li><button disabled={!checkButtonRight} onClick={() => this.handleMoveRight()} className="button-right">{">"}</button></li>
                </ul>
            </div>
        );
    }
}

export default Pagination;
