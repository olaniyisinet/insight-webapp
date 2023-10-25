import React, { useState, useEffect, useContext } from 'react'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import { BrowserRouter } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import AppSideMenu from '../components/menu/AppSideMenu'
import AuthedAppRoutes from './AuthedAppRoutes'
import MenuLogo from '../components/menu/MenuLogo'
import AppHeader from '../components/header/AppHeader'
import { AuthedContext } from "../context/AuthedContext";
import './AuthedAppLayout.css'


function AuthedAppLayout({signOut}) {
  const { authedState } = useContext(AuthedContext);

    const titleConfig = {
      '/': 'Dashboard',
      'ppa-kpi': 'PPA KPI',
      'profile': 'User Profile',
      'assets': 'Assets Dashboard',
      'assets-ppa': 'Assets PPA KPI',
    }

    //check the tenantType change the default selected key
    const isSeller = authedState.tenantUser.tenantType === 'SELLER';
    const defaultSelectedKey = isSeller ? 'assets' : '/';

    const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
    const [collapsed, setCollapsed] = useState(true);
    const [collapsedWidth, setCollapsedWidth] = useState(0);
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
 
    useEffect(() => {
      if(isDesktop) {
        setCollapsed(false);
        setCollapsedWidth(70);
      }
    }, []);


    const onMenuClick = ({key}) => {
      if(key === 'logout') {
        signOut();
      } else {
        setSelectedKey(key);
      }

      if(!isDesktop) {
        setCollapsed(true);
      }
    };
  
    return (
      <Layout className="AuthedAppLayout">
      <Sider 
        className="AuthedAppLayout_Sider" 
        breakpoint="md" 
        collapsedWidth={collapsedWidth} 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>
        <MenuLogo collapsed={collapsed}/>
        <AppSideMenu onMenuClick={onMenuClick} selectedKey={selectedKey}/>
      </Sider>
      <Layout className="AuthedAppLayout_Wrapper">
        <Header className="AuthedAppLayout_Header">
          <AppHeader 
            collapsed={collapsed} 
            setCollapsed={setCollapsed} 
            isDesktop={isDesktop} 
            title={titleConfig[selectedKey]}/>
        </Header>
        <Content className="AuthedAppLayout_Content">
          <div className="AuthedAppLayout_ContenInner">
          <BrowserRouter>
            <AuthedAppRoutes path={selectedKey}/>
          </BrowserRouter>
          </div>
        </Content>
      </Layout>
    </Layout>
    )
  }
  
  export default AuthedAppLayout