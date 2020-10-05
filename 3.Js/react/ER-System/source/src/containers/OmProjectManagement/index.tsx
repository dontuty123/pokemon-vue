import React, {Component} from 'react';
import Header from '../../components/Header';
import {getApi} from '../../core/services';
import Table from '../../components/Table';
import Form from '../../components/Form';
import {withTranslation, WithTranslation} from "react-i18next";

type IProps = Props & WithTranslation

interface Props {
    t?: any
}

interface State {
    projects: any;
    params: any;
    formProject: object;
    projectType: Array<any>,
    projectTypeName: Array<any>
}

class OmProjectManagement extends Component<IProps, State> {

    state: State = {
        projects: {
            result: []
        },
        params: {
            isSearch: 0,
            projectId: "",
            employeeId: "",
            employeeBy: "firstName-ASC",
            projectBy: "projectCode-ASC",
            currentPage: 1,
            pageRecord: 20,
            sortBy: "projectCode-ASC"
        },
        projectType: [],
        projectTypeName: [],
        formProject: {}
    }

    componentDidMount = () => {
        this.getProjects();
    }

    getProjects = async () => {
        const {projects} = this.state;

        const data = await getApi('omproject-list', {
            "isSearch": 0,
            "projectId": "",
            "employeeId": "",
            "employeeBy": "firstName-ASC",
            "projectBy": "projectCode-ASC",
            "currentPage": projects.currentPage || "",
            "pageRecord": 20,
            "sortBy": "projectCode-ASC",
        })
        if (data.data.http_code === 200) {
            const result = {
                ...data.data.result,
                result: data.data.result.employeeProject
            }
            this.setState({
                projects: result,
                projectType: data.data.result.omProject,
                projectTypeName: data.data.result.employeeWorking
            })
        }
    }

    searchProject = () => {
        const { params, formProject } = this.state;

        let paramsProject = {
            ...params,
            ...formProject,
            isSearch: 1
        }
        delete paramsProject.id;
        delete paramsProject.projectTypeCode;
        delete paramsProject.projectTypeName;
        this.setState({
            params: paramsProject
        }, () => this.getProjects())
    }
    getButtonMenu = () => {
        const buttons = [
            {
                type: "search",
                onClick: () => {
                    this.searchProject();
                }
            },
            {
                type: "add",
                onClick: () => {
                }
            },
            {
                type: "update",
                onClick: () => {
                }
            },
            {
                type: "delete",
                onClick: () => {
                }
            },
            {
                type: "export",
                onClick: () => {
                }
            },
            {
                type: "reset",
                onClick: () => {
                }
            },
        ]

        return buttons
    }

    getFormColumns = () => {
        const {t} = this.props;
        const {projectType, projectTypeName} = this.state;
        const optionsCode = [{
            title: "All",
            value: 0
        }].concat(projectType.map(item => ({
            title: item.projectCode + '-' + item.projectName,
            value: item.projectCode
        })));

        const options = [{title: "All", value: 0}].concat(projectTypeName.map(item => ({
            title: item.employeeName,
            value: item.employeeName
        })));
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

        return columns;
    }

    render() {
        const {projects, formProject} = this.state;
        const formColumns = this.getFormColumns(),
            buttonsMenu = this.getButtonMenu();
        const {t} = this.props;
        return (
            <div>
                <Header/>
                <h1>{t('title')}</h1>
                <Form
                    idForm={"project"}
                    dataSource={formProject}
                    columns={formColumns}
                    menu={buttonsMenu}
                    onChange={formProject => {
                        this.setState({formProject})
                    }}
                />
                <Table
                    idTable={"project"}
                    dataSource={projects}
                    columns={[
                        {
                            title: t('project_code'),
                            idIndex: "projectCode",
                        },
                        {
                            title: t('project_name'),
                            idIndex: "projectName",
                        },
                        {
                            title: t('employee_code'),
                            idIndex: "employeeCode",
                        },
                        {
                            title: t('employee_name'),
                            idIndex: "employeeName",
                        },
                    ]}
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
