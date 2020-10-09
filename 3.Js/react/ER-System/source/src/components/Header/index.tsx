import React from 'react';
import './style.scss';
import Logo from '../../assets/img/kobelco.png';
import {AppActions} from "../../core/types/actions";
import {user} from "../../core/types/user";
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {setLogout} from "../../core/actions/userAction";
import i18n from "../../core/util/i18n";
import {withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';

type Props = StoreStateProp & StoreDispatchProp & MultiLanguage & WithTranslation;

interface StoreStateProp {
    userInfo: user;
}

interface StoreDispatchProp {
    setLogout: () => void;
}

interface MultiLanguage {
    t?: any;
}

const Header = (props: Props) => {

    const getEmployee = () => {
        const code = props.userInfo.employeeCodeSimple, name = props.userInfo.employeeName;
        return `${code}-${name}`;
    };

    const logout = () => {
        props.setLogout();
    };
    const {t} = props;
    return (
        <div className="header">
            <div className="main-header">
                <a href="/"><img className="logo" src={Logo} alt="Logo"/></a>
                <ul role="menu">
                    <li className="dropdown">
                        <NavLink to="/employee">{t('master')}</NavLink>
                        <ul className="dropdown-content">
                            <li><NavLink to="/employee">{t('employee')}</NavLink></li>
                            <li><NavLink to="/project">{t('project')}</NavLink></li>
                            <li><NavLink to="/om-project-management">{t('om')}</NavLink></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <NavLink to="#">{t('engineer')}</NavLink>
                        <ul className="dropdown-content">
                            <li><NavLink to="/update-working-hour">{t('update_work')}</NavLink></li>
                            <li><NavLink to="/total-record">{t('total')}</NavLink></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <NavLink to="/approve">{t('approve')}</NavLink>
                    </li>
                </ul>
            </div>
            <div className="right-header">
                <ul>
                    <li className="dropdown">
                        <a href="/project">{getEmployee()}</a>
                        <ul className="dropdown-content">
                            <li><NavLink to="/change-password">{t('change_pwd')}</NavLink></li>
                            <li onClick={() => logout()}><a href="#">{t('logout')}</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#">VI</a>
                        <ul className="dropdown-content">
                            <li><a onClick={() => i18n.changeLanguage('vi-VN')}>
                                <img className="img-flag" src='' alt="VnImg"/> vi</a></li>
                            <li><a onClick={() => i18n.changeLanguage('en-US')}>
                                <img className="img-flag-en" src='' alt="EnImg"/> en</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
};


const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setLogout: () => dispatch(setLogout())
});
export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(withTranslation(["menu"])(Header));
