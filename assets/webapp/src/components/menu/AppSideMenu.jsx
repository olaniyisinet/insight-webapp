import React, {useContext} from 'react'
import { Menu } from 'antd'
import {
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    PieChartOutlined
  } from '@ant-design/icons'
import './AppSideMenu.css'
import { AuthedContext } from "../../context/AuthedContext"

const AppSideMenu = ({onMenuClick, selectedKey}) => {
  
  const { authedState } = useContext(AuthedContext);
  const { tenantType } = authedState.tenantUser;

  const isBuyer= tenantType === 'HYBRID' || tenantType === 'BUYER';
  const isSeller = tenantType === 'HYBRID' || tenantType === 'SELLER';

    return (
             <Menu onClick={onMenuClick} theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}
            items={[
              isBuyer && {
                key: '/',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              isBuyer && {
                key: 'ppa-kpi',
                icon: <BarChartOutlined />,
                label: 'PPA KPI',
              },
              isSeller && {
                key: 'assets',
                icon: <PieChartOutlined />,
                label: 'Assets Dashboard',
              }, 
              isSeller && {
                key: 'assets-ppa',
                icon: <BarChartOutlined />,
                label: 'Assets PPA KPI',
              },
              {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'User Profile',
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
              },
            ].filter(Boolean)}
            className="AppSideMenu"
        />
    );
};

export default AppSideMenu;