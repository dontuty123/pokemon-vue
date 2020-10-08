import React, { Component } from 'react';
import LoginLogo from '../../assets/images/logo-company.png';
import CONST_API from '../../core/constant/constant';
import axios from 'axios';
import functionCommon from '../../core/common/function';
import qs from 'qs';
import EnLogo from './../../assets/images/en_logo.svg';
import ViLogo from './../../assets/images/vi_logo.png';
import { Button, Form, Input } from 'antd';
import {
    CaretDownOutlined, CaretUpOutlined, UserOutlined, SearchOutlined, PlusCircleFilled, EditFilled,
    DeleteFilled, FileExcelFilled, ClearOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons';
import "antd/dist/antd.less";
// import * as errorData from '../../core/data/en-error.json';

import { listPositionAction, createPositionAction, clearError } from '../../core/actions/authAction';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './styles.scss';

class Position extends Component {

    constructor(props) {
        super(props)
        this.state = {
            param: {
                isSearch: '0',
                positionCode: '',
                positionName: '',
                currentPage: '1',
                pageRecord: '20',
                sortBy: 'positionCode-ASC'
            },
            position: {
                positionCode: '',
                positionName: ''
            },
            listdata: [],
            value: '',
            totalPage: ''
        };
    }

    componentWillMount = async () => {
        const data = await axios({
            method: 'GET',
            url: CONST_API.apiUrl + 'position-list?' + qs.stringify(this.state.param),
            headers: functionCommon.getApiHeader()
        })
        this.setState({
            listdata: data.data.result.positionList,
            totalpage: data.data.result.totalPage
        });
    }

    sortDescCode = async () => {
        await this.setState({
            param: {
                isSearch: '0',
                positionCode: '',
                positionName: '',
                currentPage: '1',
                pageRecord: '20',
                sortBy: this.state.param.sortBy === 'positionCode-ASC' ? 'positionCode-DESC' : 'positionCode-ASC'
            }
        });
        const data = await axios({
            method: 'GET',
            url: CONST_API.apiUrl + 'position-list?' + qs.stringify(this.state.param),
            headers: functionCommon.getApiHeader()
        })
        this.setState({
            listdata: data.data.result.positionList
        });
    }

    sortDescName = async () => {
        await this.setState({
            param: {
                isSearch: '0',
                positionCode: '',
                positionName: '',
                currentPage: '1',
                pageRecord: '20',
                sortBy: this.state.param.sortBy === 'positionName-DESC' ? 'positionName-ASC' : 'positionName-DESC'
            }
        });
        const data = await axios({
            method: 'GET',
            url: CONST_API.apiUrl + 'position-list?' + qs.stringify(this.state.param),
            headers: functionCommon.getApiHeader()
        })
        this.setState({
            listdata: data.data.result.positionList
        });
    }

    onRowClick = async (val) => {
        this.setState({
            position: {
                positionCode: val.positionCode,
                positionName: val.positionName
            }
        });
    }

    createPages(n){
        var elements = [];
        for(let i =1; i <= n; i++){
            elements.push(<li className={(this.state.param.currentPage === i? 'active': '')} key={i} onClick={() => { this.clickPage(i);}}>{i}</li>);
        }
        return elements;
    }

    clickPage= async (n) => {
        await this.setState({
            param: {
                isSearch: '0',
                positionCode: '',
                positionName: '',
                currentPage: n,
                pageRecord: '20',
                sortBy: 'positionName-ASC'
            }
        });
        const data = await axios({
            method: 'GET',
            url: CONST_API.apiUrl + 'position-list?' + qs.stringify(this.state.param),
            headers: functionCommon.getApiHeader()
        })
        this.setState({
            listdata: data.data.result.positionList
        });
    }

    prevClick = () =>{
        if(this.state.param.currentPage>1){
            const prevnum = this.state.param.currentPage;
            {this.clickPage( prevnum- 1)}
        }
    }

    nextClick = () =>{
        if(this.state.param.currentPage < this.state.totalPage){
            const nextvnum = this.state.param.currentPage;
            {this.clickPage( nextvnum+ 1)}
        }
    }
    render() {
        const items = this.state.listdata.map((item) =>
            <tr key={item.id} onClick={() => this.onRowClick(item)}>
                <td >{item.id}</td>
                <td>{item.positionCode}</td>
                <td>{item.positionName}</td>
            </tr>
        );
        
        return (
            <div className="body-content">
                <header>
                    <div className="nav-left">
                        <div className="header-logo">
                            <a href="/#">
                                <img src={LoginLogo} alt="Header Logo" />
                            </a>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <a href="/#">
                                        MASTER
                                        <CaretDownOutlined />
                                    </a>
                                    <ul>
                                        <li><a href="/#">EMPLOYEE</a></li>
                                        <li><a href="/#">PROJECT</a></li>
                                        <li><a href="/#">OM PROJECT MANAGEMENT</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="/#">
                                        ENGINEER HOUR RECORD
                                        <CaretDownOutlined />
                                    </a>
                                    <ul>
                                        <li><a href="/#">UPDATE WORKING HOUR</a></li>
                                        <li><a href="/#">TOTAL RECORD</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="/#">APPROVE</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="nav-right">
                        <ul>
                            <li className="user-options">
                                <a href="/#">
                                    <UserOutlined />
                                    FE0588-Ngoc Tram
                                    <CaretDownOutlined />
                                </a>
                                <ul>
                                    <li><a href="/#">CHANGE PASSWORD</a></li>
                                    <li><a href="/#">LOGOUT</a></li>
                                </ul>
                            </li>
                            <li className="lang-options">
                                <a href="/#">
                                    <img className="lang-logo" src={EnLogo} alt="Header Logo" />
                                    EN
                                    <CaretDownOutlined />
                                </a>
                                <ul>
                                    <li>
                                        <a href="/#">
                                            <img className="lang-logo" src={EnLogo} alt="Header Logo" />
                                            EN
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <img className="lang-logo" src={ViLogo} alt="Header Logo" />
                                            VN
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="page-position">
                    <p className="page-title">
                        <span>Master</span>/
                        <span><a href="/employee"> Employee</a></span>/
                        <span><a href="/position"> Position</a></span>
                    </p>
                    <div className="list-button">
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                        <Button type="primary" icon={<PlusCircleFilled />}>
                            Add
                        </Button>
                        <Button type="primary" className="disable" icon={<EditFilled />}>
                            Update
                        </Button>
                        <Button type="primary" className="disable" icon={<DeleteFilled />}>
                            Delete
                        </Button>
                        <Button type="primary" className="btn-export" icon={<FileExcelFilled />}>
                            Export
                        </Button>
                        <Button type="primary" className="btn-export" icon={<ClearOutlined />}>
                            Clear All
                        </Button>
                    </div>
                    <div className="position-form">
                        <Form>
                            <Form.Item className="input-position">
                                <p className="label">Position Code</p>
                                <Input value={this.state.position.positionCode} />
                            </Form.Item>
                            <Form.Item  className="input-position">
                                <p className="label">Description</p>
                                <Input value={this.state.position.positionName} />
                            </Form.Item>
                        </Form>
                        
                    </div>
                    <div className="position-list">
                        <table className="ui small celled sortable table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th onClick={this.sortDescCode}>Position Code <span>{this.state.param.sortBy === 'positionCode-ASC' ? <CaretDownOutlined /> : <CaretUpOutlined />}</span></th>
                                    <th onClick={this.sortDescName}>Description <span>{this.state.param.sortBy === 'positionName-DESC' ? <CaretUpOutlined /> : <CaretDownOutlined />}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                        <ul className="pagination">
                            <li className="list" onClick={this.prevClick}>
                                <span><LeftOutlined /></span>
                            </li>
                            {this.createPages(this.state.totalpage)}
                            <li className="list" onClick={this.nextClick}>
                                <span><RightOutlined /></span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        );
    }
};

// // const gets the return value
const mapStateToProps = state => {
    return {
        // list: state.authReducer.
        errorCode: state.authReducer.errorCode
    }
};

// const calls action using dispatch function
const mapDispatchToProps = dispatch => ({
    createposition: (param) => dispatch(createPositionAction(param)),
    listposition: (param) => dispatch(listPositionAction(param)),
    clear: () => dispatch(clearError())
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Position);
