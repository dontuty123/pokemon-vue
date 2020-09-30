import React from 'react';
import Header from '../../components/Header';
import { getApi } from '../../core/api';
import Table from '../../components/Table';
import Form from '../../components/Form';
import Menu from '../../components/Menu';
import {withTranslation} from "react-i18next";
interface Props {
    t?: any
}

interface State {
    projects: any;
    formProject: object;
    projectType: Array<any>,
    projectTypeName: Array<any>
}

class OmProjectManagement extends React.Component<Props, State> {

    state: State = {
        projects: {
            result: []
        },
        projectType: [],
        projectTypeName: [],
        formProject: {}
    }

    componentDidMount = () => {
        this.getProjects();
        this.getProjectType();
        this.getProjectTypeName();
    }

    getProjects = async () => {
        const {projects} = this.state;

        const data = await getApi('omproject-list', {
            "isSearch": 0,
            "projectId": "",
            "employeeId":"",
            "employeeBy": "firstName-ASC",
            "projectBy": "projectCode-ASC",
            "currentPage": projects.currentPage || "",
            "pageRecord": 20,
            "sortBy": "projectCode-ASC",
        })
        const result = {
            ...data.data.result,
            result: data.data.result.employeeProject
        }
        this.setState({projects: result})
    }

    getProjectType = async () => {

        const data = await getApi('omproject-list', {
            "isSearch": 0,
            "projectId": "",
            "employeeId":"",
            "employeeBy": "firstName-ASC",
            "projectBy": "projectCode-ASC",
            "currentPage": "",
            "pageRecord": 20,
            "sortBy": "projectCode-ASC",
        })
        this.setState({projectType: data.data.result.omProject})
    }
    getProjectTypeName = async () => {

        const data = await getApi('omproject-list', {
            "isSearch": 0,
            "projectId": "",
            "employeeId":"",
            "employeeBy": "firstName-ASC",
            "projectBy": "projectCode-ASC",
            "currentPage": "",
            "pageRecord": 20,
            "sortBy": "projectCode-ASC",
        })
        this.setState({projectTypeName: data.data.result.employeeWorking})
    }

    getTableColumns = () => {
        const columns = [
            {
                title: "Mã dự án",
                idIndex: "projectCode",
            },
            {
                title: "Tên dự án",
                idIndex: "projectName",
            },
            {
                title: "Mã nhân viên",
                idIndex: "employeeCode",
            },
            {
                title: "Tên nhân viên",
                idIndex: "employeeName",
            },
        ]

        return columns
    }

    getFormColumns = () => {
        const {projectType,projectTypeName} = this.state;
        const optionsCode = [{title: "All", value: 0}].concat(projectType.map(item => ({title: item.projectCode, value: item.id})));
        const options = [{title: "All", value: 0}].concat(projectTypeName.map(item => ({title: item.employeeName, value: item.id})));
        const columns = [
            {
                title: "Dự án",
                idIndex: "projectCode",
                validate: true,
                type: "select",
                options: optionsCode
            },
            {
                title: "Nhân viên",
                idIndex: "employeeName",
                validate: true,
                type: "select",
                options: options
            },
        ]

        return columns
    }

    render() {
        const {projects, formProject} = this.state;
        const tableColumns = this.getTableColumns(),
            formColumns = this.getFormColumns();
        const {t} = this.props;
        return (
            <div>
                <Header />
                <h1>{t('title')}</h1>
                <Menu />
                <div className="form">
                    <Form
                        idForm={"project"}
                        dataSource={formProject}
                        columns={formColumns}
                        onChange={formProject => {
                            this.setState({formProject})
                        }}
                    />
                </div>
                <Table
                    idTable={"project"}
                    dataSource={projects}
                    columns={tableColumns}
                    onChange={projects => {
                        this.setState({projects}, () => this.getProjects())
                    }}
                    onClick={formProject => {
                        this.setState({formProject})
                    }}
                />
            </div>

        )
    }
}
export default (withTranslation(["om-project"])(OmProjectManagement));
