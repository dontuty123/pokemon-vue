import React from 'react';
import './style.scss';
import Logo from '../../assets/images/kobelco.png';
import { NavLink } from 'react-router-dom';

interface Props {

}

interface State {

}

class Header extends React.Component<Props, State> {

    state: State = {

    }

    render() {
        return (
            <div className="header">
                <div className="main-header">
                    <a href="/"><img className="logo" src={Logo} alt="Logo" /></a>
                    <ul role="menu">
                        <li className="dropdown">
                            <NavLink to='/employee'>Danh mục</NavLink>
                            <ul className="dropdown-content">
                                <li><NavLink to='/employee'>Nhân viên</NavLink></li>
                                <li><NavLink to='/project'>Dự án</NavLink></li>
                                <li><NavLink to='/om-project-management'>Quản lý dự án</NavLink></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <NavLink to="/update-working-hour">Giờ công</NavLink>
                            <ul className="dropdown-content">
                                <li><NavLink to="/update-working-hour">Cập nhập giờ công</NavLink></li>
                                <li><NavLink to="/total-record">Tổng giờ công</NavLink></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <NavLink to="/approve">Phê duyệt</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="right-header">
                    <ul>
                        <li className="dropdown">
                            <NavLink to="#">user</NavLink>
                            <ul className="dropdown-content">
                                <li><NavLink to="/change-password">Thay đổi mật khẩu</NavLink></li>
                                <li><a href="#">Đăng xuất</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#">VI</a>
                            <ul className="dropdown-content">
                                <li><a href="#">EN</a></li>
                                <li><a href="#">VI</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default Header