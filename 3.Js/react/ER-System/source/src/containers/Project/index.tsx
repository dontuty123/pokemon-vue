import React from 'react';
import Table from '../../components/Table';
import Form from '../../components/Form';
import { setCookie } from '../../core/common';
import { getApi, postApi } from '../../core/services';
import * as CONSTANT from '../../core/constant';

interface Props {

}

interface State {
    dataSource: any;
    projectsType: Array<any>;
    formProject: any;
    params: any;
    paramsProjectType: any;
    loading: boolean;
}

class Project extends React.Component<Props, State> {

    form: any

    state: State = {
        dataSource: {},
        projectsType: [],
        formProject: {
            projectCode: "",
            projectName: "",
            aliasName: "",
            projectTypeId: "",
            defaultProject: "",
            active: "0"
        },
        params: {
            isSearch: "0",
            projectCode: "",
            projectName: "",
            projectTypeId: "",
            aliasName: "",
            active: "",
            defaultProject: "",
            currentPage: "1",
            pageRecord: "20",
            sortBy: "projectCode-ASC"
        },
        paramsProjectType: {
            isSearch: "0",
            projectTypeCode: "",
            projectTypeName: "",
            projectTypeId: "",
            currentPage: "",
            pageRecord: "24",
            sortBy: "projectTypeCode-ASC"
        },
        loading: false,
    }

    componentDidMount = async () => {
        await this.login();
        this.getDataProjects();
    }

    login = async () => {
        const fnAPI = await postApi("login", {
            email: "trinc@runsystem.net",
            password: "Taone123@"
        });

        if (fnAPI.data.http_code === 403) {
            return;
        } else if (fnAPI.data.http_code === 200) {
            setCookie('result', JSON.stringify(fnAPI.data.result), 120 * 60)
        }
    }

    getDataProjects = async () => {
        const { params, paramsProjectType } = this.state;

        const [data, dataType] = await Promise.all([
            getApi("project-list", params),
            getApi("projecttype-list", paramsProjectType)
        ])

        if (data.data.http_code === 200 && dataType.data.http_code === 200) {
            const result = {
                ...data.data.result,
                sortBy: params.sortBy
            }
            this.setState({ 
                dataSource: result,
                projectsType: dataType.data.result.projectTypeList
             })
        }
    }

    createProject = async () => {
        const { formProject } = this.state;
        let project = {
            ...formProject
        }
        delete project.id;
        delete project.projectTypeName;
        delete project.projectTypeCode;

        const data = await postApi("project-create", project)

        if (data.data.http_code === 200) {
            this.resetProject();
            this.getDataProjects();
            console.log(CONSTANT.MESSAGE_CODE["004"]);
        } else {
            console.log(CONSTANT.MESSAGE_CODE["023"]);
        }
    }

    updateProject = async () => {
        const { formProject } = this.state;
        let project = {
            ...formProject
        }
        delete project.projectTypeName;
        delete project.projectTypeCode;

        const data = await postApi("project-update", project);

        if (data.data.http_code === 201) {
            this.resetProject();
            this.getDataProjects();
            console.log(CONSTANT.MESSAGE_CODE["004"]);
        } else {
            console.log(CONSTANT.MESSAGE_CODE["023"]);
        }
    }

    deleteProject = async () => {
        const { formProject } = this.state;

        const data = await postApi("project-delete", { id: formProject.id });

        if (data.data.http_code === 200) {
            this.resetProject();
            this.getDataProjects();
            console.log(CONSTANT.MESSAGE_CODE["004"]);
        } else {
            console.log(CONSTANT.MESSAGE_CODE["023"]);
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
        }, () => this.getDataProjects())
    }

    resetProject = () => {
        this.setState({
            formProject: {
                projectCode: "",
                projectName: "",
                aliasName: "",
                projectTypeId: "",
                defaultProject: "",
                active: ""
            },
            params: {
                isSearch: 0,
                projectCode: "",
                projectName: "",
                projectTypeId: "",
                aliasName: "",
                active: "",
                defaultProject: "",
                currentPage: "1",
                pageRecord: "20",
                sortBy: "projectCode-ASC"
            }
        }, () => this.form.resetValidate())
    }

    getButtonMenu = () => {
        const { formProject } = this.state;
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
                type: "import",
                onClick: () => { }
            },
            {
                type: "export",
                onClick: () => {
                    this.form.resetValidate()
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
        const { projectsType } = this.state;
        const options = [{ title: "All", value: "" }].concat(projectsType.map(item => ({ title: item.projectTypeName, value: item.id })));

        const columns = [
            {
                title: "Mã dự án",
                idIndex: "projectCode",
                validate: true,
                maxLength: 12,
                type: "text"
            },
            {
                title: "Tên dự án",
                idIndex: "projectName",
                validate: true,
                maxLength: 100,
                type: "text"
            },
            {
                title: "Tên bí danh",
                idIndex: "aliasName",
                maxLength: 50,
                type: "text"
            },
            {
                title: "Loại dự án",
                idIndex: "projectTypeId",
                validate: true,
                type: "select",
                options: options
            },
            {
                title: "Tải lên tệp tin",
                maxLength: 50,
                type: "file"
            },
            {
                title: "Mặc định hiển thị",
                idIndex: "defaultProject",
                type: "checkbox",
            },
        ]

        return columns
    }

    getColumnsTable = () => {
        const columns = [
            {
                title: "Loại dự án",
                idIndex: "projectTypeName",
                sort: true
            },
            {
                title: "Mã dự án",
                idIndex: "projectCode",
                sort: true
            },
            {
                title: "Tên dự án",
                idIndex: "projectName",
                width: "25%",
            },
            {
                title: "Tên bí danh",
                idIndex: "aliasName",
            },
            {
                title: "Dự án hoạt động",
                idIndex: "active",
                width: "15%",
                render: (value: string, record: any) => {
                    const checked = value === "1";
                    return <input
                        readOnly
                        type="checkbox"
                        checked={checked}
                    />
                }
            },
        ]

        return columns
    }

    render() {
        const { dataSource, params, formProject } = this.state;
        const columnsTable = this.getColumnsTable(),
            columnsForm = this.getColumnsForm(),
            buttonsMenu = this.getButtonMenu();
            
        return (
            <div style={{ padding: 30 }}>                
                <Form
                    idForm="project"
                    ref={c => this.form = c}
                    dataSource={formProject}
                    columns={columnsForm}
                    menu={buttonsMenu}
                    onChange={project => {
                        this.setState({ formProject: { ...formProject, ...project }, params: { ...params, ...project } })
                    }}
                />
                <Table
                    idTable="project"
                    dataSource={dataSource}
                    columns={columnsTable}
                    onChange={dataSource => {
                        const currentParams = {
                            ...params,
                            currentPage: dataSource.currentPage,
                            sortBy: dataSource.sortBy
                        }

                        this.setState({ dataSource, params: currentParams }, () => this.getDataProjects())
                    }}
                    onClick={(project) => {
                        this.setState({ formProject: project }, () => this.form.setValidate(project))
                    }}
                />
            </div>

        )
    }
}

export default Project