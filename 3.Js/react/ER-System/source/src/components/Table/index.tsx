import React from 'react';
import './table-style.scss';
import Pagination from './pagination';

interface Props {
    idTable: string;
    dataSource: any;
    columns: Array<any>;
    onChange: (e: any) => void;
    onClick: (e: any) => void;
}

interface State {
    dataSource: any
}

class Table extends React.Component<Props, State> {

    state: State = {
        dataSource: {
            result: [],
            currentPage: ""
        },
    }

    componentDidUpdate = (prevProps: Props, prevState: State) => {
        if (JSON.stringify(prevProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            this.setState({ dataSource: this.props.dataSource})
        }
    }

    renderTableHeader() {
        const header = this.props.columns

        return header.map((item, index) => {
            return <th key={index}>{item.title}</th>
        })
    }

    renderTableData() {
        const { dataSource } = this.state;
        const { columns } = this.props;
        const widthColumn = `${100 / columns.length}%`;

        const result: Array<any> = dataSource.result;

        return result.length > 0 && result.map((data: any, index) => {
            return (
                <tr onClick={() => this.props.onClick(data)} key={this.props.idTable + "_" + index}>
                    <td className="align-center">{index + 1}</td>
                    {columns.map((item, indexTd) => (
                    <td
                        width={item.width || widthColumn}
                        key={this.props.idTable + "_td_" + indexTd}>
                        {data[item.idIndex]}
                    </td>))}
                </tr>
            )
        })
    }

    render() {
        const { dataSource } = this.state;

        return (
            <div className="table">
                <table>
                    <thead>
                        <tr><th className="align-center">STT</th>{this.renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <Pagination
                    totalPage={dataSource.totalPage}
                    currentPage={dataSource.currentPage}
                    onChange={currentPage => {
                        const data = {...dataSource, currentPage}
                        this.props.onChange(data)
                    }}
                />
            </div>
        )
    }
}


export default Table;
