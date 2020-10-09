import React, {Component} from 'react';
import Table from '../../components/Table';
import { user } from '../../core/types/user';
import { getApi } from '../../core/services';
import { connect } from 'react-redux';

type IProps = Props & StoreStateProp

interface StoreStateProp {
    userInfo: user
}

interface Props {

}

interface State {
    dataSource: any;
    params: any;
    loading: boolean;
}

class Project extends Component<IProps, State> {

    form: any;

    state: State = {
        dataSource: {},
        params: {
            approveId: this.props.userInfo.employeeId,
            date: "2020-10",
            sortBy: "employeeCode-ASC",
            supervisorId: this.props.userInfo.employeeId
        },
        loading: false,
    };

    componentDidMount = async () => {
        this.getDataProjects();
    };

    getDataProjects = async () => {
        const { params } = this.state;

        const data = await getApi("approve-list", params);

        if (data.data.http_code === 200) {
            const result = {
                ...data.data.result,
                result: data.data.result.employeeWorkLog,
                sortBy: params.sortBy
            }
            this.setState({
                dataSource: result,
             })
        }
    };

    getColumnsTable = () => {
        const columns = [
            {
                title: "Mã nhân viên",
                idIndex: "employeeCode",
            },
            {
                title: "Tên nhân viên",
                idIndex: "employeeName",
            },
            {
                title: "Trạng thái",
                idIndex: "status",
            },
            {
                title: "Dự án hoạt động",
                idIndex: "active",
                render: (value: string) => {
                    return <button>{value}</button>;
                }
            },
        ];

        return columns;
    };

    render() {
        const { dataSource, params } = this.state;
        const columnsTable = this.getColumnsTable();

        return (
            <div>
                <Table
                    idTable="project"
                    dataSource={dataSource}
                    columns={columnsTable}
                    onChange={dataSource => {
                        const currentParams = {
                            ...params,
                            sortBy: dataSource.sortBy
                        };

                        this.setState({ dataSource, params: currentParams }, () => this.getDataProjects())
                    }}
                    onClick={() => {
                    }}
                />
            </div>

        )
    }
}

const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
});

export default connect<StoreStateProp, {}>(mapStateToProps, {})(Project);
