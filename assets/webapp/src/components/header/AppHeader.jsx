import React, { useContext } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { AuthedContext } from "../../context/AuthedContext"
import HeaderTenant from './HeaderTenant'
import logo from '../../assets/logo_full.png'
import './AppHeader.css'

const AppHeader = ({collapsed, setCollapsed, isDesktop, title}) => {

    const { authedState } = useContext(AuthedContext);

    const onCollapsedClick = () => {
      setCollapsed(!collapsed);
    };

    return (
      <div className='AppHeader'>
        { collapsed && !isDesktop && 
            <div>
                <img src={logo}  height="36" alt="logo" className='AppHeader_Logo' onClick={onCollapsedClick}/>
            </div>
        }
        <div>
            {collapsed && <MenuUnfoldOutlined className='AppHeader_Trigger' onClick={onCollapsedClick}/>}
            {!collapsed && <MenuFoldOutlined className='AppHeader_Trigger' onClick={onCollapsedClick}/>}
        </div>
        <div className="AppHeader_Title">{title}</div>
        <div className="AppHeader_CompanyInfo">
          <HeaderTenant tenantUser={authedState.tenantUser} />
        </div>
      </div>
    );
};

export default AppHeader;