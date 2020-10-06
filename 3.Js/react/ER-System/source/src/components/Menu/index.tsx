import React from 'react';
import './style.scss';
import { AiOutlineSearch, AiFillPlusCircle, AiOutlineFileExcel } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import {WithTranslation, withTranslation} from "react-i18next";

type IProps = Props & WithTranslation;

interface Props {
    t?: any;
    buttons: Array<any>;
    checkValidate: any;
}

interface State {

}

class Menu extends React.Component<IProps, State> {

    checkValidate = () => {
        const { checkValidate } = this.props;

        return Object.values(checkValidate).length === 0 || Object.values(checkValidate).some(item => item);
    }


    renderSearch = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><AiOutlineSearch />{this.props.t('search')}</button>
    }

    renderAdd = (item: any) => {
        const onClick = !this.checkValidate() ? item.onClick : null;

        return <button key={"Menu" + item.type} className="primary-button" {...item} onClick={onClick}><AiFillPlusCircle />{this.props.t('add')}</button>
    }

    renderUpdate = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><BiEdit />{this.props.t('update')}</button>
    }

    renderDelete = (item: any) => {
        return <button key={"Menu" + item.type} className="primary-button" {...item}><RiDeleteBin6Line />{this.props.t('delete')}</button>
    }

    renderImport = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><AiOutlineFileExcel />{this.props.t('input_data')}</button>
    }

    renderExport = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><AiOutlineFileExcel />{this.props.t('export_data')}</button>
    }

    renderRest = (item: any) => {
        return <button key={"Menu" + item.type} {...item}><FiRefreshCw />{this.props.t('refresh')}</button>
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

//export default Menu
export default (withTranslation(["menu"])(Menu));
