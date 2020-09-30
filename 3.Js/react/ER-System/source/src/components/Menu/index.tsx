import React from 'react';
import './style.scss';
import { AiOutlineSearch, AiFillPlusCircle, AiOutlineFileExcel } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';


interface Props {
    buttons: Array<any>;
}

interface State {

}

class Menu extends React.Component<Props, State> {


    renderSearch = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><AiOutlineSearch />Tìm</button>
    }

    renderAdd = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><AiFillPlusCircle />Thêm</button>
    }

    renderUpdate = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><BiEdit />Cập nhật</button>
    }

    renderDelete = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><RiDeleteBin6Line />Xóa</button>
    }

    renderImport = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><AiOutlineFileExcel />Nhập dữ liệu</button>
    }

    renderExport = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><AiOutlineFileExcel />Kết xuất</button>
    }

    renderRest = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><FiRefreshCw />Làm mới</button>
    }

    renderButtons = () => {
        const { buttons } = this.props;
        let renderType: any;
        
        return buttons.map(item => {
            switch (item.type) {
                case 'search':
                    renderType = this.renderSearch(item);
                    break;
                case 'add':
                    renderType = this.renderAdd(item);
                    break;
                case 'update':
                    renderType = this.renderUpdate(item);
                    break;
                case 'delete':
                    renderType = this.renderDelete(item);
                    break;
                case 'import':
                    renderType = this.renderImport(item);
                    break;
                case 'export':
                    renderType = this.renderExport(item);
                    break;
                default:
                    renderType = this.renderRest(item);
                    break;
            }

            return renderType
        })
    }

    render() {
        return (
            <div className="menu">
                {this.renderButtons()}
            </div>
        )
    }
}

export default Menu
