import React from 'react'
import { Menu } from 'antd'
import {
    UserAddOutlined,
    LogoutOutlined
  } from '@ant-design/icons'
import './UserSetupSideMenu.css'

const UserSetupSideMenu = ({onMenuClick, selectedKey}) => {
    return (
        <Menu onClick={onMenuClick} theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}
            items={[
              {
                key: '/',
                icon: <UserAddOutlined />,
                label: 'User Setup',
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
              },
            ]}
            className="UserSetupSideMenu"
        />
    );
};

export default UserSetupSideMenu;