import React, { Component } from 'react';
import {
    CaretDownOutlined, CaretUpOutlined
} from '@ant-design/icons';
import "antd/dist/antd.less";

class Table extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            sortBy: 'positionCode-ASC',
            stateCode: false,
            stateName: false, 
            stateSort: ''
        }
    }
    

    //onRowClick
    onRowClick= (val) =>{
        this.props.onRowClick(val);
    }
    //sortDescCode
    sortDescCode = async () => {
        await this.setState({
            sortBy: this.state.sortBy === 'positionCode-ASC' ? 'positionCode-DESC' : 'positionCode-ASC',
            stateCode: this.state.stateCode === false ? true : false,
        });
        await this.props.sortDescCode(this.state.sortBy);
        this.setState({
            stateSort: 'positionCode'
        });
        if(this.state.sortBy === 'positionName-ASC' ){
            await this.setState({
                sortBy:'positionCode-DESC'
            });
        }
    }

    //sortDescName
    sortDescName = async () => {
        console.log("this.state.sortBy: ", this.state.sortBy)
        if(this.state.sortBy === 'positionCode-DESC' ){
            await this.setState({
                sortBy:'positionName-DESC'
            });
        }
        await this.setState({
            sortBy: this.state.sortBy === 'positionName-DESC' ? 'positionName-ASC' : 'positionName-DESC',
            stateName: this.state.stateName === true ? false : true,
        });
        await this.props.sortDescName(this.state.sortBy);
        this.setState({
            stateSort: 'positionName'
        });
    }

    
	render() {
        
        const dataHeader = this.props.dataHeader;
        const dataBody = this.props.dataBody;

        //header
        const header = dataHeader.map((item, index) =>
            <th onClick={item.type === 'positionCode' ? this.sortDescCode : this.sortDescName } key={index+1}>{item.label}
                {this.state.stateSort !== item.type ? <CaretDownOutlined /> : <CaretUpOutlined />}
                
            </th>
        );

        //body
        const items = dataBody.map((item, index) =>
            <tr key={item.id} onClick={() => this.onRowClick(item)}>
                <td >{index +1}</td>
                {dataHeader.map((header, idx) =>
                    <td key={idx}>{item[header.type]}</td>
                )}
            </tr>
        );
        
		return (
            <div>
               <table className="ui small celled sortable table">
                    <thead>
                        <tr>
                            <th>No</th>
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
		);
	}
}

export default Table;
