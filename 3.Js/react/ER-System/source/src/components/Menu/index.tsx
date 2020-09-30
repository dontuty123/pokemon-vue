import React from 'react';
import './menu-style.scss';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <button className="primary-button">Tìm</button>
                <button className="primary-button">Thêm</button>
                <button className="primary-button">Cập nhật</button>
                <button className="primary-button">Xóa</button>
                <button>Nhập dữ liệu</button>
                <button>Kết xuất</button>
                <button>Làm mới</button>
            </div>
        )
    }
}

export default Menu