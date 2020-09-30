import React from 'react';
import './style.scss';
import Pagination from './pagination';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

interface Props {
    idTable: string;
    dataSource: any;
    columns: Array<any>;
    onChange: (e: any) => void;
    onClick: (e: any) => void;
}

interface State {
    dataSource: any;
}

class Table extends React.Component<Props, State> {

    state: State = {
        dataSource: this.props.dataSource || {
            result: [],
            currentPage: "",
            sortBy: ""
        },
    }

    componentDidUpdate = (prevProps: Props, prevState: State) => {
        if (JSON.stringify(prevProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            this.setState({ dataSource: this.props.dataSource });
        }
    }

    triggleSortBy = (item: any) => {
        const sortBy = this.state.dataSource.sortBy;
        let currentBy = "", data = this.state.dataSource;

        if(sortBy) {
            const [name, nameBy] = sortBy ? sortBy.split('-') : [];
            if (name && name === item.idIndex && nameBy && nameBy === "DESC") {
                currentBy = item.idIndex + "-ASC";
            } else {
                currentBy = item.idIndex + "-DESC";
            }
        }

        data = {
            ...data,
            sortBy: currentBy
        }

        this.setState({dataSource: data}, () => this.props.onChange(data));
    }

    iconSortBy = (data: any) => {
        const sortBy = this.state.dataSource.sortBy;

        if (data.sort) {
            const [name, nameBy] = sortBy ? sortBy.split('-') : [];

            if (name && name === data.idIndex && nameBy && nameBy === "DESC") {
                return <BsFillCaretUpFill />
            } else {
                return <BsFillCaretDownFill />
            }
        }
    }

    renderTableHeader() {
        const header = this.props.columns;

        return header.map((item, index) => {
            return <th
                        className={item.sort ? "sort-column" : ""}
                        key={index}
                        onClick={() => item.sort ? this.triggleSortBy(item) : null}
                    >
                        {item.title}
                        {this.iconSortBy(item)}
                    </th>
        })
    }

    renderTableData() {
        const { dataSource } = this.state;
        const { columns } = this.props;
        const widthColumn = `${100 / columns.length}%`;

        const result: Array<any> = dataSource.result;

        return result && result.length > 0 && result.map((data: any, index) => {
            return (
                <tr onClick={() => this.props.onClick(data)} key={this.props.idTable + "_" + index}>
                    <td className="align-center">{index + 1}</td>
                    {columns.map((item, indexTd) => (
                        <td
                            width={item.width || widthColumn}
                            key={this.props.idTable + "_td_" + indexTd}>
                            {item.render ? item.render(data[item.idIndex], data) : data[item.idIndex]}
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
                        const data = { ...dataSource, currentPage }
                        this.props.onChange(data)
                    }}
                />
            </div>
        )
    }

}


export default Table
