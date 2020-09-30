import React, {Component} from 'react';
import './form-style.scss';

interface Props {
    idForm: any;
    columns: Array<any>;
    dataSource: object;
    onChange: (e: any) => void;
}

interface State {
    dataSource: any;
}

class Form extends Component<Props, State> {

    state: State = {
        dataSource: {},
    }

    componentDidUpdate = (prevProps: Props, prevState: State) => {
        if (JSON.stringify(prevProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            this.setState({dataSource: this.props.dataSource})
        }
    }

    onChangeData = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {dataSource} = this.state;
        const value = e.currentTarget.value,
            name = e.currentTarget.name,
            data = {
                ...dataSource,
                [name]: value
            };

        this.setState({dataSource: data}, () => this.props.onChange(data))
    }

    renderInput = (item: any) => {
        const {dataSource} = this.state;

        return <input
            type="text"
            name={item.idIndex}
            maxLength={item.maxLength}
            className="text-form"
            onChange={(e) => this.onChangeData(e)}
            value={dataSource[item.idIndex]}
        />
    }

    renderSelect = (item: any) => {
        const {dataSource} = this.state;
        const options: Array<any> = item.options;

        return <select
            className="select-form"
            onChange={(e) => this.onChangeData(e)}
            name={item.idIndex}
            value={dataSource[item.idIndex]}
        >
            {options.map(ele => (<option value={ele.value}>{ele.title}</option>))}
        </select>
    }

    renderFile = (item: any) => {

        return <input
            type="file"
            name={item.idIndex}
            maxLength={item.maxLength}
            onChange={(e) => this.onChangeData(e)}
            className="file-form"
        />
    }

    renderCheckbox = (item: any) => {
        const {dataSource} = this.state;
        const checked = dataSource[item.idIndex] === "1";

        return <input
            type="checkbox"
            name={item.idIndex}
            onChange={(e) => this.onChangeData(e)}
            checked={checked}
        />
    }

    renderForm = () => {
        const {columns} = this.props;
        let renderType: any;
        return columns.map(item => {
            switch (item.type) {
                case 'select':
                    renderType = this.renderSelect(item);
                    break;
                case 'file':
                    renderType = this.renderFile(item);
                    break;
                case 'checkbox':
                    renderType = this.renderCheckbox(item);
                    break;
                default:
                    renderType = this.renderInput(item);
                    break;
            }

            return <tr key={item.idForm + "_" + item.idIndex}>
                <td>
                    <span>{item.title}</span>
                    {item.validate ? <span className="required">*</span> : null}
                </td>
                <td className="field-form">
                    {renderType}
                </td>
            </tr>
        })
    }

    render() {
        return (
            <div className="form-table">
                <table>
                    <tbody>
                    {this.renderForm()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Form
