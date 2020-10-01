import React from 'react';
import Menu from '../../components/Menu';
import './style.scss';

interface Props {
    idForm: any;
    columns: Array<any>;
    menu: Array<any>;
    dataSource: object;
    onChange: (e: any) => void;
}

interface State {
    dataSource: any;
    checkValidate: any;
}

class Form extends React.Component<Props, State> {

    state: State = {
        dataSource: {},
        checkValidate: {},
    }

    componentDidUpdate = (prevProps: Props, prevState: State) => {
        if (JSON.stringify(prevProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            this.setState({ dataSource: this.props.dataSource })
        }
    }

    onChangeData = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { dataSource, checkValidate } = this.state;
        const type = e.currentTarget.type,
            value = type === "checkbox" ? (e.currentTarget.checked ? "1" : "0") : e.currentTarget.value,
            name = e.currentTarget.name,
            data = {
                ...dataSource,
                [name]: value
            },
            check = {
                ...checkValidate,
                [name]: false,
            };

        this.setState({ dataSource: data, checkValidate: check}, () => this.props.onChange(data))
    }

    
    setValidate = (data: any) => {
        const { columns } = this.props;
        let setValidate = {};

        columns.forEach(item => {

            if (item.validate && (!data[item.idIndex] || data[item.idIndex] === "")) {
                setValidate = {
                    ...setValidate,
                    [item.idIndex]: true
                }
            } else if (item.validate && data[item.idIndex] !== "") {
                setValidate = {
                    ...setValidate,
                    [item.idIndex]: false
                }
            }
        })

        this.setState({checkValidate: setValidate})
    }

    resetValidate = () => {
        this.setState({checkValidate: {}})
    }

    renderInput = (item: any) => {
        const { dataSource } = this.state;

        return <input
            type="text"
            name={item.idIndex}
            maxLength={item.maxLength}
            className="text-form"
            onChange={(e) => this.onChangeData(e)}
            value={dataSource[item.idIndex] || ""}
        />
    }

    renderSelect = (item: any) => {
        const { dataSource } = this.state;
        const options: Array<any> = item.options;

        return <select
            className="select-form"
            onChange={(e) => this.onChangeData(e)}
            name={item.idIndex}
            value={dataSource[item.idIndex] || ""}
        >
            {options.map((ele, index) => (<option key={this.props.idForm + "_" + index} value={ele.value}>{ele.title}</option>))}
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
        const { dataSource } = this.state;
        const checked = dataSource[item.idIndex] !== "" && dataSource[item.idIndex] === "1";

        return <input
            type="checkbox"
            name={item.idIndex}
            onChange={(e) => this.onChangeData(e)}
            checked={checked}
        />
    }

    renderForm = () => {
        const { checkValidate } = this.state;
        const { columns } = this.props;
        let renderType: any, action: string;
        return columns.map(item => {
            switch (item.type) {
                case 'select':
                    renderType = this.renderSelect(item);
                    action = "chọn";
                    break;
                case 'file':
                    renderType = this.renderFile(item);
                    action = "chọn";
                    break;
                case 'checkbox':
                    renderType = this.renderCheckbox(item);
                    action = "chọn";
                    break;
                default:
                    renderType = this.renderInput(item);
                    action = "nhập";
                    break;
            }

            return [
                <tr key={item.idForm + "_" + item.idIndex}>
                    <td>
                        <span>{item.title}</span>
                        {item.validate ? <span className="required">*</span> : null}
                    </td>
                    <td className="field-form">
                        {renderType}
                    </td>
                </tr>,
                checkValidate[item.idIndex] ?
                    <tr key={item.idForm + "_validate_" + item.idIndex}>
                        <td></td>
                        <td className="field-form-error">
                            {`Bắt buộc ${action} ${item.title}`}
                        </td>
                    </tr> : null
            ]
        })
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        // this.setValidate(this.state.dataSource);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Menu
                    buttons={this.props.menu}
                    checkValidate={this.state.checkValidate}
                />
                <div className="form-content form-table">
                    <table>
                        <tbody>
                            {this.renderForm()}
                        </tbody>
                    </table>
                </div>
            </form>
        )
    }
}

export default Form
