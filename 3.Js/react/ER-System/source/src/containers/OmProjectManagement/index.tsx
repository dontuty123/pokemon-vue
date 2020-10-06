import React, {Component} from 'react';
import Table from '../../components/Table';
import Form from '../../components/Form';
import {getApi, postApi} from '../../core/services';
import * as CONSTANT from '../../core/constant';
import {withTranslation, WithTranslation} from "react-i18next";
import './style.scss';
import {get} from "https";

type IProps = Props & WithTranslation

interface Props {
    t?: any
}

interface CSSObject {

}

interface State {
    dataSource: Array<any>;
    projectsType: Array<any>;
    projectTypeName: Array<any>;
    formProject: any;
    params: any;
    paramsExport:any;
    loading: boolean;
    messageLogin: string;
}

class OmProjectManagement extends Component<IProps, State> {

    form: any

    state: State = {
        dataSource: [],
        projectsType: [],
        projectTypeName: [],
        formProject: {
            projectId: "",
            employeeId: "",
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
        paramsExport: {
            secretKey: ""
        },
        messageLogin: "",
        loading: false,
    }

    componentDidMount = async () => {
        this.getDataProjects();
    }

    getDataProjects = async () => {
        const {params} = this.state;
        const data = await getApi('omproject-list', params);
        if (data.data.http_code === 200) {
            const result = {
                ...data.data.result,
                result: data.data.result.employeeProject,
                sortBy: params.sortBy
            }
            this.setState({
                dataSource: result,
                projectsType: data.data.result.omProject,
                projectTypeName: data.data.result.employeeWorking
            })
        }
    }

    createProject = async () => {
        const {formProject} = this.state;
        let project = {
            ...formProject
        }
        let messageLogin = "";
        this.setState({loading: true});
        const data = await postApi("omproject-create", project);
        if (data.data.http_code === 200) {
            this.resetProject();
            this.getDataProjects();
            messageLogin = CONSTANT.MESSAGE_CODE["004"];
        } else {
            messageLogin = CONSTANT.MESSAGE_CODE["027"];
        }
        this.setState({loading: false, messageLogin});
    }

    updateProject = async () => {
        const {formProject} = this.state;
        let project = {
            ...formProject
        }
        let messageLogin = "";
        this.setState({loading: true});
        const data = await postApi("omproject-update", project);
        if (data.data.http_code === 201) {
            this.resetProject();
            this.getDataProjects();
            messageLogin = CONSTANT.MESSAGE_CODE["004"];
        } else {
            messageLogin = CONSTANT.MESSAGE_CODE["027"];
        }
        this.setState({loading: false, messageLogin});
    }

    deleteProject = async () => {
        const {formProject} = this.state;
        let messageLogin = "";
        this.setState({loading: true});
        const data = await postApi("omproject-delete", {id: formProject.id});

        if (data.data.http_code === 200) {
            this.resetProject();
            this.getDataProjects();
            messageLogin = CONSTANT.MESSAGE_CODE["004"];
        } else {
            messageLogin = CONSTANT.MESSAGE_CODE["010"];
        }
        this.setState({loading: false, messageLogin});
    }

    searchProject = () => {
        const {params, formProject} = this.state;

        let paramsProject = {
            ...params,
            ...formProject,
            isSearch: 1
        }
        this.setState({
            params: paramsProject
        }, () => this.getDataProjects())
    }

    secretKey = async () => {
        const {paramsExport} = this.state;
        const data = await get('requestSecretKey');
        const dataExport = await getApi('omProjectExport', data);
console.log(dataExport);




    }

    resetProject = () => {
        this.setState({
            formProject: {
                projectId: "",
                employeeId: "",
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
            }
        }, () => this.form.resetValidate())
    }

    getButtonMenu = () => {
        const {formProject} = this.state;
        const checkId = formProject.id && formProject.id !== ""

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
                    this.form.setValidate(formProject);
                    this.createProject();
                }
            },
            {
                type: "update",
                disabled: !checkId,
                onClick: () => {
                    this.updateProject();
                }
            },
            {
                type: "delete",
                disabled: !checkId,
                onClick: () => {
                    this.deleteProject();
                }
            },
            {
                type: "export",
                disabled: !checkId,
                onClick: () => {
                    this.secretKey();
                }
            },
            {
                type: "reset",
                onClick: () => {
                    this.resetProject();
                }
            },
        ]

        return buttons
    }

    getColumnsForm = () => {
        const {projectsType, projectTypeName} = this.state;
        const {t} = this.props;
        const optionsCode = [{
            title: "All",
            value: ""
        }].concat(projectsType.map(item => ({title: item.projectCode + '-' + item.projectName, value: item.id})));
        const options = [{title: "All", value: ""}].concat(projectTypeName.map(item => ({
            title: item.employeeName,
            value: item.id
        })));
        const columns = [
            {
                title: t('project_om'),
                idIndex: "projectId",
                validate: true,
                type: "select",
                options: optionsCode
            },
            {
                title: t('employee'),
                idIndex: "employeeId",
                validate: true,
                type: "select",
                options: options
            },
        ]

        return columns;
    }

    render() {
        const {dataSource, params, formProject, messageLogin} = this.state;
        const columnsForm = this.getColumnsForm(),
            buttonsMenu = this.getButtonMenu();
        const {t} = this.props;
        return (
            <div>
                <Form
                    idForm="project"
                    ref={c => this.form = c}
                    dataSource={formProject}
                    columns={columnsForm}
                    menu={buttonsMenu}
                    onChange={project => {
                        this.setState({formProject: {...formProject, ...project}, params: {...params, ...project}})
                    }}
                />
                <p className="validate"
                   style={{display: messageLogin.length > 0 ? null : 'none'} as Pick<CSSObject, keyof CSSObject>}>{messageLogin}</p>
                <Table
                    idTable="project"
                    dataSource={dataSource}
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
                    onChange={dataSource => {
                        const currentParams = {
                            ...params,
                            currentPage: dataSource.currentPage,
                            sortBy: dataSource.sortBy
                        }

                        this.setState({dataSource, params: currentParams}, () => this.getDataProjects())
                    }}
                    onClick={(project) => {
                        this.setState({formProject: project}, () => this.form.setValidate(project))
                    }}
                />
            </div>
        )
    }
}

export default (withTranslation(["om-project"])(OmProjectManagement));
