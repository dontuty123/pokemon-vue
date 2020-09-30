import React from 'react';
import './header-style.scss';
import Logo from '../../assets/img/kobelco.png';
import VnImg from '../../assets/img/img_vn.png';
import EnImg from '../../assets/img/img_en.png';
import { AppActions } from '../../core/store/types/actions';
import { user } from '../../core/store/types/user';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLogout } from '../../core/store/actions/userAction';
import i18n from "../../core/util/i18n";
import {withTranslation} from "react-i18next";
type Props = StoreStateProp & StoreDispatchProp & MultiLanguage

interface MultiLanguage {
    t?: any
}
const Header: React.FC<Props> = (props) => {

    const getEmployee = () => {
        const code = props.userInfo.employeeCodeSimple, name = props.userInfo.employeeName
        return `${code}-${name}`
    }

    const logout = () => {
        props.setLogout()
    }
    const {t} = props;
    return (
        <div className="header">
            <div className="main-header">
                <a href="/"><img className="logo" src={Logo} alt="Logo" /></a>
                <ul role="menu">
                    <li className="dropdown">
                        <a href="/project">{t('master')}</a>
                        <ul className="dropdown-content">
                            <li><a href="/project">{t('employee')}</a></li>
                            <li><a href="#">{t('project')}</a></li>
                            <li><a href="/om-project-management">{t('om')}</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#">{t('engineer')}</a>
                        <ul className="dropdown-content">
                            <li><a href="/project">{t('update_work')}</a></li>
                            <li><a href="#">{t('total')}</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#">{t('approve')}</a>
                    </li>
                </ul>
            </div>
            <div className="right-header">
                <ul>
                    <li className="dropdown">
                        <a href="/project">{getEmployee()}</a>
                        <ul className="dropdown-content">
                            <li><a href="/project">{t('change_pwd')}</a></li>
                            <li onClick={() => logout()}><a href="#">{t('logout')}</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#">VI</a>
                        <ul className="dropdown-content">
                            <li><a onClick={() => i18n.changeLanguage('vi-VN')}><img className="img-flag" src={VnImg} alt="VnImg" /> vi</a></li>
                            <li><a onClick={() => i18n.changeLanguage('en-US')}><img className="img-flag-en" src={EnImg} alt="EnImg" /> en</a></li>
                        </ul>
                    </li>


                </ul>
            </div>
        </div>
    )
}

interface StoreStateProp {
    userInfo: user
  }

  interface StoreDispatchProp {
    setLogout: () => void
  }

  const mapStateToProps = (state: any) => ({
    userInfo: state.userReducer
  })

  const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
    setLogout: () => dispatch(setLogout())
  })
export default connect<StoreStateProp, StoreDispatchProp>(mapStateToProps, mapDispatchToProps)(withTranslation(["menu"])(Header));
